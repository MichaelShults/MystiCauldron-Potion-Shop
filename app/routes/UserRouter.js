const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

router.post("/delete/:id",ensureLoggedIn("/login"), userController.deleteUser);
router.get("/admin", ensureLoggedIn("/login"), (req, res, next) =>{
    if(req.user.username !== "admin"){res.redirect("/");}else{next()}
}, (req, res, next) =>{
    userController.getAllUsers().then((users)=>{
        res.render("admin", {users});
    });
});

module.exports = router;