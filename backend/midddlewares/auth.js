const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    if (!token) {
      throw new Error("Unauthorized");
    }
    const decryptedTokenDetails = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decryptedTokenDetails.userId;
    next();
  } catch (err) {
    return res.status(401).json({
      isSuccess: false,
      messgae: err.message,
    });
  }
};
