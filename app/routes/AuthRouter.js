const express = require("express");
const router = express.Router();



router.get("/login", (req, res, next) => {
    res.render("login");
});
router.post("/login/password", (req, res, next)=>{
    if(req.body.username === "bob"){
        console.log("Hello bob!");
        res.send("Correct username.");
    }
    else{
        res.send("Invalid login");
    }
    
});

module.exports = router;