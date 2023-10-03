const { Router } = require("express");
const { body } = require("express-validator");

const router = Router();

const productController = require("../controllers/product");
const authMiddleware = require("../midddlewares/auth");

// add product
// POST /create-product
router.post(
  "/create-product",
  authMiddleware,
  [
    body("product_name")
      .trim()
      .notEmpty()
      .withMessage("product name must have."),
    body("product_description")
      .trim()
      .notEmpty()
      .withMessage("product description must have."),
    body("product_price")
      .trim()
      .notEmpty()
      .withMessage("product price must have."),
    body("product_category")
      .trim()
      .notEmpty()
      .withMessage("product category must have."),
    body("product_used_for")
      .trim()
      .notEmpty()
      .withMessage("product usedFor must have."),
    body("product_details")
      .isArray()
      .withMessage("product details must array."),
  ],
  productController.addNewProduct
);

module.exports = router;
