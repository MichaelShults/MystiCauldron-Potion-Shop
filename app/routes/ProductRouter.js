const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

router.get("/:id", productController.getProductByIdAndRender);
module.exports = router;