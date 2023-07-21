const express = require("express");
const path = require("path");

const app = express();
const port = 3000;




app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/app/views/"));
app.use(express.static('public'));
app.use(express.static('src'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const indexRouter = require("./app/routes/IndexRouter");
const authRouter = require("./app/routes/AuthRouter");
const productRouter = require("./app/routes/ProductRouter");

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/products/", productRouter);


app.listen(port, () => {
    console.log(`listening to port ${port}`);
});