const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require("../database/sqlite3.database");
const crypto = require("crypto");


passport.use(new LocalStrategy(async function verify(username, password, cb){
    try {
        const user = await db("users").where("username", username).first();
        if(!user){
            print("user not found")
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

const register = (req, res, next) =>{
    let salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, "sha256", (err, hashedPassword) =>{
        if(err){
            return next(err);
        }
        db("users").insert({
            username: req.body.username,
            hashedPassword,
            salt
            }).returning("id").asCallback((err, id) =>{
                console.log(id[0].id);
                if(err){
                    return next(err);
                }
                let user = {id:id[0].id, username: req.body.username}
                req.login(user, (err) =>{
                    if(err){
                        return next(err);
                    }
                    res.redirect("/");
                });

            });
    }
    );

}

const logout = (req, res, next) => {
    req.logOut((err) => {
        if(err){
            return next(err);
        }
        res.redirect("/");
    });
}

const AuthController = { passport: passport, register, logout};

module.exports = AuthController;