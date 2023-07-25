const express = require("express");
const path = require("path");
const session = require('express-session');
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

const app = express();
const port = 3000;
const passport = require("./app/controllers/AuthController").passport;
const sqlite = require("better-sqlite3");
const SqliteStore = require("better-sqlite3-session-store")(session);
const sessionDB = new sqlite("sessions.db", { verbose: console.log });



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/app/views/"));
app.use(express.static('public'));
app.use(express.static('src'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(
    session({
      store: new SqliteStore({
        client: sessionDB, 
        expired: {
          clear: true,
          intervalMs: 900000
        }
      }),
      secret: "shrek the third",
      resave: false,
      saveUninitialized: false,
    })
  )
app.use(passport.authenticate("session"));

const indexRouter = require("./app/routes/IndexRouter");
const authRouter = require("./app/routes/AuthRouter");
const productRouter = require("./app/routes/ProductRouter");
const userRouter = require("./app/routes/UserRouter");
app.use("/", authRouter);
app.use("/", indexRouter);
app.use("/products/", productRouter);
app.use("/users", userRouter);


app.listen(port, () => {
    console.log(`listening to port ${port}`);
});