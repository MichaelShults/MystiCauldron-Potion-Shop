const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require("../database/sqlite3.database");
const crypto = require("crypto");

passport.use(new LocalStrategy(function verify(username, password, cb){
    try {
        const user = db("users").where("username", username).first();
        if(!user){
            return cb(null, false, {message: "Incorrect username or password."});
        }
        crypto.pbkdf2(password, user.salt, 310000, 32, "sha256", (err, hashedPassword) =>{
            if(err){
                return cb(err);
            }
            if(!crypto.timingSafeEqual(user.hashedPassword, hashedPassword)){
                return cb(null, false, {message: "Incorrect username or password."})
            }
            return cb(null, user)
        });
    }
    catch (err){
        return cb(err);
    }
    
}));

passport.serializeUser((user, cb) =>{
    process.nextTick(() =>{
        return cb(null, {
            id: user.id,
            username: user.username
        });
    });
});

passport.deserializeUser((user, cb) =>{
    process.nextTick(() =>{
        return cb(null, user);
    });
}
);
const AuthController = { passport: passport};

module.exports = AuthController;