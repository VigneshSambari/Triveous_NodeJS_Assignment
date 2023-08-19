const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        name:{
            type:String,
        },
        mobile: {
            type: String,
        },
        orderHistory: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Order",
                }
            }
        ],
        cart: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    default: 1,
                }
            }
        ]
    },
    {timestamps: true},
);

module.exports = User = mongoose.model("User", UserSchema);