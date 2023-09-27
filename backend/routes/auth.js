const { Router } = require("express");
const { body } = require("express-validator");

const router = Router();
const authController = require("../controllers/auth");

// create new user
// POST -> /register
router.post(
  "/register",
  [
    body("name").trim().isEmpty().withMessage("Name must have."),
    body("password").trim().isEmpty().withMessage("Password must have."),
    body("email").trim().isEmail().withMessage("Please enter a vaild E-mail !"),
  ],
  authController.register
);

// login user
// POST -> /login
router.post(
  "/login",
  [
    body("password").trim().isEmpty().withMessage("Password must have."),
    body("email").trim().isEmail().withMessage("Please enter a vaild E-mail !"),
  ],
  authController.login
);

module.exports = router;
