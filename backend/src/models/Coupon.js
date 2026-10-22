const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    discountPercent: { type: Number, required: true },
    expiresAt: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
