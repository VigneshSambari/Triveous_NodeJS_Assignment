const express = require("express")

const {  
    createOrder,
    cancelOrder,
    fetchOrderByIds,
    orderFromCart
} = require("../controllers/orderController")

const {
    authMiddleware,
} = require("../middlewares/authMiddleware");

const router = express.Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     ProductInOrder:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: ID of the product in the order
 *         quantity:
 *           type: number
 *           description: Quantity of the product
 */

/**
 * @swagger
 * /order/create:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order with the provided list of products.
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/ProductInOrder'
 *                 description: List of products in the order
 *     responses:
 *       201:
 *         description: Order created successfully
 *       401:
 *         description: Unauthorized or token not provided
 *       400:
 *         description: Bad request or invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/create", authMiddleware, createOrder);

/**
 * @swagger
 * /order/cancel:
 *   post:
 *     summary: Cancel an order
 *     description: Cancel an existing order with the provided order ID.
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: ID of the order to cancel
 *     responses:
 *       200:
 *         description: Order canceled successfully
 *       401:
 *         description: Unauthorized or token not provided
 *       500:
 *         description: Internal server error
 */
router.post("/cancel", authMiddleware, cancelOrder);


/**
 * @swagger
 * /order/fetchbyids:
 *   post:
 *     summary: Fetch orders by IDs
 *     description: Fetch orders by a list of order IDs.
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of order IDs
 *     responses:
 *       200:
 *         description: Successful response with the list of orders
 *       401:
 *         description: Unauthorized or token not provided
 *       500:
 *         description: Internal server error
 */
router.post("/fetchbyids", authMiddleware, fetchOrderByIds);

/**
 * @swagger
 * /order/orderfromcart:
 *   post:
 *     summary: Create an order from the user's cart
 *     description: Create an order using the products in the user's cart.
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/ProductInOrder'
 *                 description: List of products in the order
 *     responses:
 *       201:
 *         description: Order created successfully
 *       401:
 *         description: Unauthorized or token not provided
 *       500:
 *         description: Internal server error
 */
router.post("/orderfromcart", authMiddleware, orderFromCart);


module.exports = router;