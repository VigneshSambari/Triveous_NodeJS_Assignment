const express = require("express")

const {  
    signin, 
    signup, 
    changePassword,
    fetchOrderHistory,
    addToCart,
    removeFromCart,
    viewCart,
    updateQuantityCart
} = require("../controllers/userController")

const {
    authMiddleware,
} = require("../middlewares/authMiddleware");

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     SignInSignUpRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 */


/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: User sign-up
 *     tags:
 *       - User
 *     requestBody:
 *       description: User registration details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInSignUpRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User Signup Failed
 */
router.post("/signup", signup);



/**
 * @swagger
 * /user/signin:
 *   post:
 *     summary: User sign-in
 *     tags:
 *       - User
 *     requestBody:
 *       description: User registration details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInSignUpRequest'
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: User Signin Failed
 */
router.post("/signin", signin)


/**
 * @swagger
 * /user/changepassword:
 *   post:
 *     summary: Change user's password
 *     description: Change the password of a user.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       500:
 *         description: Bad request or validation error
 *       401:
 *         description: Unauthorized or token not provided
 */
router.post("/changepassword", authMiddleware, changePassword);

/**
 * @swagger
 * /user/orderhistory:
 *   post:
 *     summary: Fetch user's order history
 *     description: Retrieve the order history for a user.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized or token not provided
 */
router.post("/orderhistory", authMiddleware, fetchOrderHistory);

/**
 * @swagger
 * /user/addtocart:
 *   post:
 *     summary: Add a product to the user's cart
 *     description: Add a product to the user's cart.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to add to the cart
 *     responses:
 *       200:
 *         description: Product added to cart or already in cart
 *       401:
 *         description: Unauthorized or token not provided
 *       500:
 *         description: Internal server error
 */
router.post("/addtocart", authMiddleware, addToCart);

/**
 * @swagger
 * /user/removefromcart:
 *   post:
 *     summary: Remove a product from the user's cart
 *     description: Remove a product from the user's cart.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to remove from the cart
 *     responses:
 *       200:
 *         description: Product removed from cart or not found in cart
 *       401:
 *         description: Unauthorized or token not provided
 *       500:
 *         description: Internal server error
 */
router.post("/removefromcart", authMiddleware, removeFromCart);

/**
 * @swagger
 * /user/viewcart:
 *   post:
 *     summary: View user's cart
 *     description: Retrieve and view the products in the user's cart.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Successful response with the user's cart
 *       401:
 *         description: Unauthorized or token not provided
 *       500:
 *         description: Internal server error
 */
router.post("/viewcart", authMiddleware, viewCart);

/**
 * @swagger
 * /user/updatequantitycart:
 *   post:
 *     summary: Update quantity of a product in the user's cart
 *     description: Update the quantity of a product in the user's cart.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to update quantity for
 *               quantity:
 *                 type: integer
 *                 description: New quantity of the product
 *     responses:
 *       200:
 *         description: Quantity updated successfully
 *       401:
 *         description: Unauthorized or token not provided
 *       500:
 *         description: Internal server error
 */
router.post("/updatequantitycart", authMiddleware, updateQuantityCart);


module.exports = router;