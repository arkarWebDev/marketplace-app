const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const productDocs = await Product.find({ status: "approve" }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      isSuccess: true,
      productDocs,
    });
  } catch (err) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};
