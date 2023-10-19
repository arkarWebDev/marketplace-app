const { Router } = require("express");

const router = Router();
const adminController = require("../controllers/admin");
const authMiddleware = require("../midddlewares/auth");
const adminMiddleware = require("../midddlewares/isAdmin");

// get all products
// GET /admin/products
router.get(
  "/products",
  authMiddleware,
  adminMiddleware,
  adminController.getAllProducts
);
module.exports = router;
