const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [{ type: mongoose.Schema.Types.Mixed }],
    total: { type: Number, required: true },
    shippingAddress: { type: mongoose.Schema.Types.Mixed },
    paymentMethod: {
      type: String,
      enum: ["sslcommerz", "bkash", "cod"],
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending"
    },
    status: {
      type: String,
      enum: ["placed", "processing", "shipped", "delivered", "cancelled", "disputed"],
      default: "placed"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
