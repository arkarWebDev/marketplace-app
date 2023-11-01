const Notification = require("../models/Notification");

exports.pushNofification = async (req, res) => {
  const { message, title, owner_id, product_id, phone_number } = req.body;
  try {
    await Notification.create({
      title,
      message,
      owner_id,
      product_id,
      phone_number,
    });

    return res.status(201).json({
      isSuccess: true,
      message: "Notification is pushed.",
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notiDocs = await Notification.find({ owner_id: req.userId }).sort({
      createdAt: -1,
    });

    if (!notiDocs || notiDocs.length === 0) {
      throw new Error("No notifications yet.");
    }

    return res.status(200).json({
      isSuccess: true,
      notiDocs,
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const notiDoc = await Notification.findById(id);

    if (!notiDoc) {
      throw new Error("notifications not found.");
    }

    notiDoc.isRead = true;
    notiDoc.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Done.",
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.deleteNoti = async (req, res) => {
  const { id } = req.params;
  try {
    await Notification.findByIdAndRemove(id);

    return res.status(200).json({
      isSuccess: true,
      message: "Notification is deleted.",
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.deleteAllNoti = async (req, res) => {
  try {
    await Notification.deleteMany({ owner_id: req.userId });

    return res.status(200).json({
      isSuccess: true,
      message: "Notification are cleared.",
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
};
