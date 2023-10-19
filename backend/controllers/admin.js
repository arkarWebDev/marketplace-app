const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const productDocs = await Product.find()
      .populate("seller", "name")
      .sort({ createdAt: -1 });
    console.log(productDocs);
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
