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

exports.getProductsByFilters = async (req, res) => {
  try {
    const { searchKey, category } = req.query;
    const query = {};

    if (searchKey) {
      query.name = { $regex: searchKey, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    const productDocs = await Product.find(query);

    if (!productDocs || productDocs.length === 0) {
      throw new Error("Products not found.");
    }

    return res.status(200).json({
      isSuccess: true,
      productDocs,
    });
  } catch (err) {
    return res.status(404).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productDoc = await Product.findById(req.params.id).populate(
      "seller",
      "email name"
    );

    if (!productDoc) {
      throw new Error("Product not found.");
    }

    return res.status(200).json({
      isSuccess: true,
      productDoc,
    });
  } catch (err) {
    return res.status(404).json({
      isSuccess: false,
      message: err.message,
    });
  }
};
