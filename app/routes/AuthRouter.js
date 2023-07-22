const express = require("express");
const router = express.Router();
const passport = require("../controllers/AuthController").passport;


router.get("/login", (req, res, next) => {
    res.render("login");
});
router.post("/login/password", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}));
module.exports = router;