const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

router.get("/:id", ensureLoggedIn("/login"), productController.getProductByIdAndRender);
module.exports = router;