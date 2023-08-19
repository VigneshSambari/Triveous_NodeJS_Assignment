const express = require("express")

const {  
    createCategory,
    updateCategory,
    fetchAll,
} = require("../controllers/categoryController")

const router = express.Router()

/**
 * @swagger
 * /category/fetch:
 *   get:
 *     summary: Fetch all Categories
 *     description: Fetch all categories from the database.
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: Successful response with the list of items
 *       500:
 *         description: Internal server error
 */
router.get("/fetch", fetchAll);

/**
 * @swagger
 * /category/create:
 *   post:
 *     summary: Create a new category
 *     description: Create a new category with the provided title.
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the new category
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request or invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/create", createCategory);


/**
 * @swagger
 * /category/update:
 *   post:
 *     summary: Update a category
 *     description: Update the title of a category.
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *                 description: ID of the category to update
 *               title:
 *                 type: string
 *                 description: New title for the category
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Bad request or invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/update", updateCategory);


module.exports = router;