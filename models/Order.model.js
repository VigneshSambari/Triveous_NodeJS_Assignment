const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
      products: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            default: 1,
          },
        }
      ],
      status: {
        type: String,
        default: "Ordered",
      },
      amount: {
        type: Number,
      },
      paymentMode: {
        type: String,
      },
      shippingInfo: {
        type: String,
        default: "Informed to seller",
      }
  },
  { timestamps: true }
);

module.exports = Order = mongoose.model("Order", OrderSchema);