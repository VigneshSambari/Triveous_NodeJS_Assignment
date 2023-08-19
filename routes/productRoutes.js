const express = require("express")

const {  
    createProduct,
    deleteProduct,
    updateProduct,
    fetchProduct,
    fetchByCategoryIds
} = require("../controllers/productController")

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     CategoryInfo:
 *       type: object
 *       properties:
 *         categoryId:
 *           type: string
 *           description: ID of the category
 *           required: true
 *         availability:
 *           type: number
 *           default: 1
 *     ProductData:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           required: true
 *           unique: true
 *         price:
 *           type: number
 *           required: true
 *         description:
 *           type: string
 *         category:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CategoryInfo'
 *           required: true
 */

/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with the provided data.
 *     tags:
 *       - Product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductData'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request or invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/create", createProduct);

/**
 * @swagger
 * /product/update:
 *   post:
 *     summary: Update a product
 *     description: Update a product with the provided data.
 *     tags:
 *       - Product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productData:
 *                 type: object
 *                 $ref: '#/components/schemas/ProductData'
 *               productId:
 *                 type: string
 *                 description: ID of the product to update
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       500:
 *         description: Internal server error
 */
router.post("/update", updateProduct);

/**
 * @swagger
 * /product/delete:
 *   post:
 *     summary: Delete a product
 *     description: Delete a product with the provided ID.
 *     tags:
 *       - Product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Bad request or invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/delete", deleteProduct);

/**
 * @swagger
 * /product/fetchbyid:
 *   post:
 *     summary: Fetch a product by ID
 *     description: Fetch a product with the provided ID.
 *     tags:
 *       - Product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to fetch
 *     responses:
 *       200:
 *         description: Successful response with the product data
 *       500:
 *         description: Internal server error
 */
router.post("/fetchbyid", fetchProduct);

/**
 * @swagger
 * /product/fetchbycategoryids:
 *   post:
 *     summary: Fetch products by category IDs
 *     description: Fetch products with the provided list of category IDs.
 *     tags:
 *       - Product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of category IDs
 *     responses:
 *       200:
 *         description: Successful response with the list of products
 *       400:
 *         description: Bad request or invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/fetchbycategoryids", fetchByCategoryIds);


module.exports = router;