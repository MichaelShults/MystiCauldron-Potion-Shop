const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const crypto = require("crypto");
const db = require("../database/sqlite3.database");
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

router.get("/login", (req, res, next) => {
    res.render("login");
});
router.post("/login/password", authController.passport.authenticate("local", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login",
    keepSessionInfo: true
}));

router.post("/logout",ensureLoggedIn("/login"), authController.logout );

router.post("/register",  authController.register);
router.get("/register",  (req, res, next) =>{
    res.render("register");
});

module.exports = router;