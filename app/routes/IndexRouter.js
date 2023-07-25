const express = require("express");
const router = express.Router();
const IndexController = require("../controllers/IndexController")
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
router.get("/",ensureLoggedIn("/login"), IndexController.getAllProductAndRender)
module.exports = router;