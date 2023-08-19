const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
        type: String,
    },
    category: [
        {
            categoryId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
                required: true,
            },
            availability: {
                type: Number,
                default: 1,
            }
        }
    ]
  },
);

module.exports = Product = mongoose.model("Product", ProductSchema);