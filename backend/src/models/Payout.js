const mongoose = require("mongoose");

const payoutSchema = new mongoose.Schema(
  {
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["requested", "approved", "rejected", "paid"],
      default: "requested"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payout", payoutSchema);
