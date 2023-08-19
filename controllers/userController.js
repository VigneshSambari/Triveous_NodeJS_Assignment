const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { responseHandler,respondToError } = require("../utils/responseHandler");
const {statusEnum} = require("../utils/statusCodes");
const User = require("../models/User.model");


//Generate encryped password
const generateEncryptedPassword = async (password) => {
    let salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

//Generate token from email and id
const generateToken = ({_id,email}) =>{
    return jwt.sign({
        _id,
        email,
    }, config.get("JwtKey"))
}


//Signup user
const signup = async (req, res) => {
   // normal form signup
   const {email, password} = req.body;
   console.log(email, password);
   try {
       if(!email || !password){
            return res.status(statusEnum.BAD_REQUEST).json(respondToError("Email and Password should not be empty")); 
       }

       const existingUser = await User.findOne({email})

       if (existingUser){
            return res.status(statusEnum.BAD_REQUEST).json(responseHandler.USER_EXISTS);
       } 
           
       const hashedPassword = await generateEncryptedPassword(password);

       const result = await User.create({email, password: hashedPassword})
       
       const token = generateToken({_id: result._id, email: email})
       const newResult = {...result.toObject(), token}
       return res.status(statusEnum.CREATED).json(newResult);
   } catch (err) {
       console.log(err);
       return res.status(statusEnum.BAD_REQUEST).json({
        error: respondToError(err.message),
        message: "Failed to Sign up user!",
       });
   }

    
}


//SignIn a user with email and password 

const signin = async (req, res) => {
    const {email, password} = req.body;
    console.log(email, password);
    if (email === "" || password === ""){
        return res.status(statusEnum.BAD_REQUEST).json(respondToError("Invalid Fields!"));
    } 
    
    try {
        const existingUser = await User.findOne({email})

        if (!existingUser){
            return res.status(statusEnum.NOT_FOUND).json(responseHandler.USER_NOT_EXISTS);
        } 
            
        const isPasswordOk = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordOk){
            return res.status(statusEnum.NOT_FOUND).json(respondToError("Invalid Password!"));
        } 
            

        const token = generateToken({_id: existingUser._id, email: email})
        
        const result = {...existingUser.toObject(),token};
        return res.status(statusEnum.OK).json(result);

    } catch (err) {
        console.log(err);
        return res.status(statusEnum.BAD_REQUEST).json({
            error: respondToError(err.message),
            message: "Failed to Sign in user!"
        });
    }    
        
}


//Change password of the user
const changePassword = async (req,res) => {
    const {email, newPassword, oldPassword} = req.body;

        if (email === "") 
            return res.status(statusEnum.NOT_ALLOWED).json(respondToError("Email fiels is empty"));
        try {
            const existingUser = await User.findOne({email});
    
            if (!existingUser) 
                return res.status(statusEnum.NOT_FOUND).json(responseHandler.USER_NOT_EXISTS);
    
            const isPasswordOk = await bcrypt.compare(oldPassword, existingUser.password);
            
             if (!isPasswordOk) 
                 return res.status(statusEnum.NOT_ALLOWED).json(respondToError("Invalid credentials!"));
    
            
            const hashedPassword = await generateEncryptedPassword(newPassword);
            
            existingUser.password=hashedPassword

            existingUser.save()
            
            return res.status(statusEnum.OK).json({result: existingUser, "message":"Succesfully changed password"})
        } catch (err) {
            console.log(err);
            return res.status(statusEnum.BAD_REQUEST).json({
                error: respondToError("Unable to change password!"),
                message: err.message,
            });
        }
}


const fetchOrderHistory = async (req, res) => {
    try{
        const {
            user
        } = req.body;

        console.log(req.body);
        const history = await User.findOne({_id: user._id})
                                    .select("orderHistory")        
                                    .populate("orderHistory.productId");

        return res.status(statusEnum.OK).json(history);
    }
    catch(err){
        console.log(err);
        return res.status(statusEnum.SERVER_ERROR).json({
            error: responseHandler.ERROR_FETCH,
            message: "Error in fetching order history!"
        });
    }
}

const addToCart = async (req, res) => {
    try{
        const {
            productId,
            user,
        } = req.body;

        const matchProduct = await User.findOne({
            _id: user._id,
            cart: {
              $elemMatch: {
                productId: productId
              }
            }
          }).select('cart').populate("cart.productId");

        if(matchProduct){
            return res.status(statusEnum.OK).json(matchProduct);
        }

        const updatedCart = await User.findOneAndUpdate(
            { _id: user._id },
            {
                $addToSet: {
                    cart: {
                        productId: productId,
                    }
                }
            },
            { new: true},
        ).select("cart").populate("cart.productId");

        return res.status(statusEnum.OK).json(updatedCart);
    }
    catch(err){
        console.log(err);
        return res.status(statusEnum.SERVER_ERROR).json({
            error: responseHandler.ERROR,
            message: "Error in adding product to cart!"
        });
    }
}

const updateQuantityCart = async (req, res) => {
    try{
        const {
            productId,
            quantity,
            user,
        } = req.body;

        const updatedCart = await User.findOneAndUpdate(
            {_id: user._id, 'cart.productId': productId},
            {
                'cart.$.quantity': quantity
            },
            {new: true}
        ).select("cart");

        return res.status(statusEnum.ACCEPTED).json(updatedCart);
    }
    catch(err){
        console.log(err);
        return res.status(statusEnum.BAD_GATEWAY).json({
            error: responseHandler.ERROR,
            message: "Error in updating quantity!"
        });
    }
}

const removeFromCart = async (req, res) => {
    try{
        const {
            productId,
            user,
        } = req.body;

        const updatedCart = await User.findOneAndUpdate(
            { _id: user._id },
            {
                $pull: {
                    cart: {
                        productId: productId,
                    }
                }
            },
            {new : true},
        ).select("cart").populate("cart.productId");

        return res.status(statusEnum.OK).json(updatedCart);
    }
    catch(err){
        console.log(err);
        return res.status(statusEnum.SERVER_ERROR).json({
            error: responseHandler.ERROR,
            message: "Error in removing product from cart!"
        });
    }
}


const viewCart = async (req, res) => {
    try{
        const {
            user
        } = req.body;

        const cart = await User.findOne({_id: user._id})
                                .select("cart").populate("cart.productId");

        return res.status(statusEnum.OK).json(cart);
    }
    catch(err){
        console.log(err);
        return res.status(statusEnum.SERVER_ERROR).json({
            error: responseHandler.ERROR,
            message: "Error in fetching cart details!"
        });
    }
}

module.exports = {
    signin,
    signup,
    changePassword,
    fetchOrderHistory,
    addToCart,
    removeFromCart,
    viewCart,
    addToCart,
    updateQuantityCart
}
