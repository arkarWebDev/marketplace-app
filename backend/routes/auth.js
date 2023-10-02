const { Router } = require("express");
const { body } = require("express-validator");

const router = Router();
const authController = require("../controllers/auth");
const authMiddleware = require("../midddlewares/auth");

// create new user
// POST -> /register
router.post(
  "/register",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name must have.")
      .isLength({ min: 3 })
      .withMessage("Name must have 3 characters."),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password must have.")
      .isLength({ min: 5 })
      .withMessage("Password must have 5 characters."),
    body("email").trim().isEmail().withMessage("Please enter a vaild E-mail !"),
  ],
  authController.register
);

// login user
// POST -> /login
router.post(
  "/login",
  [
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password must have.")
      .isLength({ min: 5 })
      .withMessage("Password must have 5 characters."),
    body("email").trim().isEmail().withMessage("Please enter a vaild E-mail !"),
  ],
  authController.login
);

// check user is login or not
// get -> /get-current-user
router.get(
  "/get-current-user",
  authMiddleware,
  authController.checkCurrentUser
);

module.exports = router;
