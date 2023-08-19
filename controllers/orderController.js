const Order = require("../models/Order.model");
const User = require("../models/User.model");
const {responseHandler, respondToError} = require("../utils/responseHandler");
const {statusEnum} = require("../utils/statusCodes");

const createOrder = async (req, res) => {
    try{
        const {
            products,
        } = req.body;

        const newOrderData = {
            products,
        }

        const {
            user 
        } = req.body;
        console.log(products);
        const newOrder = new Order(newOrderData);
        await newOrder.save();
        const userUpdated = await User.findOneAndUpdate(
            {_id: user._id},
            {
                $addToSet: {
                    orderHistory: {
                        productId: newOrder._id,
                    }
                }
            },
            { new : true }
        ).populate("orderHistory.productId");

        return res.status(statusEnum.CREATED).json({newOrder, userUpdated});
    }
    catch(err){
        console.log(err);
        return res.status(statusEnum.SERVER_ERROR).json({
            error: respondToError(err.message),
            message: "Error in creating order!",
        });
    }
}

const cancelOrder = async (req, res) => {
    try{
        const {
            orderId
        } = req.body;

        const updatedOrder = await Order.findOneAndUpdate(
            {
                _id: orderId,
            },
            {
                status: "Cancelled",
            },
            { new : true},
        );

        return res.status(statusEnum.OK).json(updatedOrder);
    }
    catch(err){
        return res.status(statusEnum.SERVER_ERROR).json({
            error: respondToError(err.message),
            message: "Error in cancelling order!",
        });
    }
}

const fetchOrderByIds = async (req, res) => {
    try{
        const {
            orderIds
        } = req.body;

        const orders = await Order.find({
            _id: {
                $in: orderIds,
            }
        })

        return res.status(statusEnum.OK).json(orders);
    }   
    catch(err){
        return res.status(statusEnum.SERVER_ERROR).json({
            error: respondToError(err.message),
            message: "Error in fetching orders by ID!"
        });
    }
}

const orderFromCart = async (req, res) => {
    try{
        const {
            products,
        } = req.body;

        const newOrderData = {
            products,
        }

        const {
            user 
        } = req.body;
        console.log(products);
        const newOrder = new Order(newOrderData);
        await newOrder.save();
        const userUpdated = await User.findOneAndUpdate(
            {_id: user._id},
            {
                $addToSet: {
                    orderHistory: {
                        productId: newOrder._id,
                    }
                }
            },
            { new : true }
        ).populate("orderHistory.productId");

        const productIdsToRemove = products.map(product => product.productId);    

        const updatedCart = await User.findOneAndUpdate(
            { _id: user._id },
            {
                $pull: {
                    cart: {
                        productId: {
                             $in: productIdsToRemove, 
                        },
                    }
                }
            },
            {new : true},
        ).select("cart").populate("cart.productId");

        return res.status(statusEnum.CREATED).json({newOrder, updatedCart});
    }
    catch(err){
        console.log(err);
        return res.status(statusEnum.SERVER_ERROR).json(responseHandler.ERROR);
    }
}


module.exports = {
    createOrder,
    cancelOrder,
    fetchOrderByIds,
    orderFromCart,
}