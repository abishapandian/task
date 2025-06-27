const express = require("express");
const db = require("../db.js");
const router = express.Router();

router.get('/', async(req , res)=>{
    try {
        const [result] = await db.execute("select * from coursedetails");
        res.json({message:"success..." , result})
    } catch (error) {
        res.json({message:"failed...", error:error.message})
    }
})

router.post('/', async(req , res)=>{
    const {username , course} = req.body;
    try {
        await db.execute("insert into coursedetails (username , course) values (? , ?)", [username , course]);
        res.json({message:"success..."})
    } catch (error) {
        res.json({message:"failed" , error:error.message})
    }
})

router.put("/:id" , async(req , res)=>{
    const {id} = req.params;
    const {editusername , editcourse} = req.body;
    try {
        await db.execute("update coursedetails set username = ? , course = ? where id = ?" , [ editusername , editcourse , id]);
        res.json({message:"success"})
    } catch (error) {
        res.json({message:"failed..." , error:error.message})
    }
})

router.delete('/:id' , async(req , res)=>{
    const {id} = req.params;
    try {
        await db.execute("delete from coursedetails where id = ?" , [id]);
        res . json({message:"success..."})
    } catch (error) {
        res.json({message:"failed..." , error:error.message})
    }
})

module.exports = router;