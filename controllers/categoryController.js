const Category = require("../models/Category.model");
const {responseHandler, respondToError} = require("../utils/responseHandler");
const {statusEnum} = require("../utils/statusCodes");

const createCategory = async (req, res) => {
    try{
        const {
            title,
        } = req.body;

        const newCategory = new Category({title});
        await newCategory.save();

        return res.status(statusEnum.CREATED).json(newCategory);
    }
    catch(err){
        console.log(err);
        return res.status(statusEnum.SERVER_ERROR).json({
            error: respondToError(err.message),
            message: "Error in creating category!",
        });
    }
}

const updateCategory = async (req, res) => {
    try{
        const {
            categoryId,
            title,
        } = req.body;

        console.log(categoryId, title);
        const updatedCategory = await Category.findOneAndUpdate(
            {
                _id: categoryId,
            },
            {
                title: title,
            },
            { new : true},
        );
         
        return res.status(statusEnum.OK).json(updatedCategory);
    }
    catch(err){
        return res.status(statusEnum.BAD_GATEWAY).json({
            error: respondToError(err.message),
            message: "Error in updating category!"
        });
    }
}

const fetchAll = async (req, res) => {
    try{
        const categories = await Category.find();
        return res.status(statusEnum.OK).json(categories); 
    }
    catch(err){
        return res.status(statusEnum.SERVER_ERROR).json({
            error: respondToError(err.message),
            message: "Error in fetching categories",
        });
    }
}

module.exports = {
    createCategory,
    updateCategory,
    fetchAll,
}