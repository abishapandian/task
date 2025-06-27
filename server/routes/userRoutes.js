const express = require("express");
const db = require("../db.js")
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        [result] = await db.execute("select * from userdetails");
        res.json({ message: "Success...", result })
    } catch (error) {
        res.json({ message: "failed", error: error.message })
    }
})

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
        await db.execute("insert into userdetails (username , password) values (? , ?)", [username, parseInt(password)]);
        res.json({ message: "success..." })
    } catch (error) {
        res.json({ message: "failed", error: error.message })
    }
})
router.put('/:id', async (req, res) => {
    const { username, password } = req.body;
    const { id } = req.params;
    try {
        await db.execute("update userdetails set username = ? ,password = ? where id = ? ", [username, password, id]);
        res.json({ message: "Successfully Updated" })
    } catch (error) {
        res.json({ message: "failed", error: (error.message) })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute("delete from userdetails where id = ?", [id]);
        res.json({ message: "Successfully Updated" })
    } catch (error) {
        res.json({ message: "failed", error: (error.message) })
    }
})

module.exports = router;