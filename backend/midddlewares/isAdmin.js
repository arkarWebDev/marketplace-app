const User = require("../models/User");
module.exports = async (req, res, next) => {
  try {
    const { userId } = req;
    const userDoc = await User.findById(userId).select("role");
    if (userDoc.role !== "admin") {
      throw new Error("Unauthorized admin.");
    }
    req.userId = userId;
    next();
  } catch (err) {
    return res.status(401).json({
      isSuccess: false,
      messgae: err.message,
    });
  }
};
