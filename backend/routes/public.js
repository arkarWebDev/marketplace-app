const { Router } = require("express");
const publicController = require("../controllers/public");

const router = Router();

// get all product
// GET /api/products
router.get("/products", publicController.getProducts);

module.exports = router;
