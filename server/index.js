const express = require("express");
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")
const adminRoutes = require('./routes/adminRoutes')
const courseRoutes = require('./routes/courseRoutes')

const app = express();

app.use(express.json());
app.use(cors());
app.use('/users' , userRoutes)
app.use('/admin' , adminRoutes)
app.use('/course', courseRoutes)

app.listen(4000 , ()=>{
    console.log("server is running...")
})
