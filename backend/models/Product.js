const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    price: { required: true, type: String },
    category: {
      required: true,
      type: String,
    },
    usedFor: {
      required: true,
      type: String,
    },
    details: {
      type: Array,
    },
    images: {
      type: [String],
    },
    status: {
      type: String,
      default: "pending",
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = model("Product", productSchema);

module.exports = productModel;
