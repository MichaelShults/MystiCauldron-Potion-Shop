const db = require("../database/sqlite3.database");
const IndexController = {
    getAllProductAndRender: async (req, res, next) => {
        try {
            const products = await db("products").select("*");
            res.render("index" , {products});
        }
        catch(error){
            next(error);
        }
    }
};
module.exports = IndexController;