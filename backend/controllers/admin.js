const Product = require("../models/Product");
const User = require("../models/User");

exports.getAllProducts = async (req, res) => {
  try {
    const productDocs = await Product.find()
      .populate("seller", "name")
      .sort({ createdAt: -1 });
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

exports.approveProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const productDoc = await Product.findById(id);

    if (!productDoc) {
      throw new Error("Product not found.");
    }

    productDoc.status = "approve";
    await productDoc.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Product was approved.",
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.rejectProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const productDoc = await Product.findById(id);

    if (!productDoc) {
      throw new Error("Product not found.");
    }

    productDoc.status = "reject";
    await productDoc.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Product was reject.",
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.rollbackProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const productDoc = await Product.findById(id);

    if (!productDoc) {
      throw new Error("Product not found.");
    }

    productDoc.status = "pending";
    await productDoc.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Product was roll back.",
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const userDocs = await User.find()
      .select("name email role createdAt status")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      isSuccess: true,
      userDocs,
    });
  } catch (err) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.banUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userDoc = await User.findById(id);

    if (!userDoc) {
      throw new Error("User not found.");
    }

    userDoc.status = "banned";
    await userDoc.save();

    return res.status(200).json({
      isSuccess: true,
      message: "User was banned",
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.unbanUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userDoc = await User.findById(id);

    if (!userDoc) {
      throw new Error("User not found.");
    }

    userDoc.status = "active";
    await userDoc.save();

    return res.status(200).json({
      isSuccess: true,
      message: "User was unbanned",
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};
