const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }

  const { name, email, password } = req.body;

  try {
    // check user-email already exist
    const userDoc = await User.findOne({ email });

    if (userDoc) {
      throw new Error("User already exists.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      email,
      name,
      password: hashedPassword,
    });

    return res.status(201).json({
      isSuccess: true,
      message: "User created successfully.",
    });
  } catch (error) {
    return res.status(409).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }

  const { email, password } = req.body;
  try {
    // is email exists
    const userDoc = await User.findOne({ email });

    if (!userDoc) {
      throw new Error("E-mail doest not exists.");
    }

    // check password
    const isMatch = await bcrypt.compare(password, userDoc.password);

    if (!isMatch) {
      throw new Error("Invalid password.");
    }

    // account status check
    if (userDoc.status === "banned") {
      throw new Error("This account was banned.");
    }

    // create jwt token
    const token = jwt.sign({ userId: userDoc._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      isSuccess: true,
      message: "Logged in successfully.",
      token,
    });
  } catch (error) {
    return res.status(401).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.checkCurrentUser = async (req, res) => {
  try {
    const userDoc = await User.findById(req.userId).select("name email role");
    if (!userDoc) {
      throw new Error("Unauthorized User");
    }
    return res.status(200).json({
      isSuccess: true,
      message: "User is authorized",
      userDoc,
    });
  } catch (error) {
    return res.status(401).json({
      isSuccess: false,
      message: error.message,
    });
  }
};
