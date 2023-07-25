const db = require("../database/sqlite3.database");
const deleteUser =  (req, res) => {
    db("users").where("id", parseInt(req.params.id)).del().catch((err)=>{
        res.send(err.message, "User does not exist! <br><a style='border: 1px solid black;' href='/admin'> Back to Admin Panel </a>");
    });
    res.redirect("/users/admin");
}; 
const getAllUsers = async () => {
    const users = await db("users").select("*");
    return users;
};


module.exports = {deleteUser, getAllUsers };