const db = require("../database/sqlite3.database");
const ProductController = {
    getProductByIdAndRender: async (req, res) =>{
        const productId = req.params.id;
        try {
            const product = await db("products").where("id", parseInt(productId, 10)).first();
            if (!product){
                return res.status(404).json({message: "Product no found"});
            }
            res.render("product", {product});
        }
        catch(error){
            res.status(500).json({error: `Unable to get product. id = ${productId}`, error_msg:`${error.message}`});
        }
    }
};

module.exports = ProductController;