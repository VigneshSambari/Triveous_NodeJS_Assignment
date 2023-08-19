const Product = require("../models/Product.model");
const {responseHandler, respondToError} = require("../utils/responseHandler");
const {statusEnum} = require("../utils/statusCodes");

const createProduct = async (req, res) => {
    try{
        const {
            productData,
        } = req.body;

        const newProduct = new Product(productData);
        await newProduct.save();

        return res.status(statusEnum.CREATED).json(newProduct);
    }
    catch(err){
        console.log(err);
        return res.status(statusEnum.SERVER_ERROR).json({
            error: respondToError(err.message),
            message: "Error in creating product!",
        });
    }
}

const updateProduct = async (req, res) => {
    try{
        const {
            productData,
            productId,
        } = req.body;

        const updatedProduct = await Product.findOneAndUpdate(
            {_id: productId},
            productData,
            { new : true},
        )

        return res.status(statusEnum.OK).json(updatedProduct);
    }
    catch(err){
        console.log(err);
        return res.status(statusEnum.BAD_GATEWAY).json({
            error: respondToError(err.message),
            message: "Error in updating product!"
        });
    }
}

const deleteProduct = async (req, res) => {
    try{
        const {
            productId
        } = req.body;

        const deletedProd = await Product.findOneAndDelete(
            {
                _id: productId,
            },
        );

        return res.status(statusEnum.OK).json(deletedProd);
    }
    catch(err){
        return res.status(statusEnum.BAD_GATEWAY).json({
            error: respondToError(err.message),
            message: "Error in deleting the product!",
        });
    }
}

const fetchProduct = async (req, res) => {
    try{
        const {
            productId
        } = req.body;

        const product = await Product.findById({_id: productId});

        return res.status(statusEnum.OK).json(product);
    }
    catch(err){
        return res.status(statusEnum.BAD_GATEWAY).json({
            error: respondToError(err.message),
            message: "Unbale the product with given ID!"
        });
    }
}

const fetchByCategoryIds = async (req, res) => {
    try{
        const {
            categoryIds
        } = req.body;

        const products = await Product.find(
            {
                "category.categoryId" : {
                    $in: categoryIds,
                }
            }
        );

        return res.status(statusEnum.OK).json(products);
    }
    catch(err){
        return res.status(statusEnum.BAD_GATEWAY).json({
            error: respondToError(err.message),
            message: "Unable to fetch products by categoryID!"
        });
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    fetchProduct,
    fetchByCategoryIds
}