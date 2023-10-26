const { Schema, model } = require("mongoose");

const savedProductSchema = new Schema({
  user_id: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});

const savedProductModel = model("SavedProduct", savedProductSchema);

module.exports = savedProductModel;
