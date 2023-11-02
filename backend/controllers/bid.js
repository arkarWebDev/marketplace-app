const Bid = require("../models/Bid");

exports.savedNewBid = async (req, res) => {
  const { message, phone, product_id, seller_id, buyer_id } = req.body;

  try {
    if (seller_id === buyer_id) {
      throw new Error("Authorization Failed.");
    }
    await Bid.create({
      product_id,
      seller_id,
      buyer_id,
      text: message,
      phone_number: phone,
    });

    return res.status(201).json({
      isSuccess: true,
      message: "Your bid is placed.",
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.getAllBids = async (req, res) => {
  const { product_id } = req.params;
  try {
    const bidDocs = await Bid.find({ product_id })
      .populate("buyer_id", "name")
      .select("text phone_number createdAt")
      .sort({ createdAt: -1 });
    if (!bidDocs || bidDocs.length === 0) {
      throw new Error("No bids are not placed yet.");
    }

    return res.status(200).json({
      isSuccess: true,
      bidDocs,
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
};
