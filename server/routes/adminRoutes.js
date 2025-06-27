const express = require("express")
const db = require("../db.js");
const router = express.Router();

router.post('/', async(req , res)=>{
    const {username , password} = req.body;
    try {
        await db.execute("insert into admindetails (username , password) values(? , ?)",[username ,parseInt(password)]);
        res.json({message:"Successfully added..."});
    } catch (error) {
        res.json({message:"failed" , error:(error.message)})
    }
})
router.get('/', async(req , res)=>{
    try {
        [result] = await db.execute("select * from admindetails");
        res.json({ message: "success" , result });
    } catch (error) {
        res.json({message:"failed" , error:(error.message)})
    }
})
module.exports = router;