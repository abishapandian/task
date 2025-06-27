const { createPool } = require("mysql2");
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"abis@12927",
    database:"profile",
    port:3306
})

module.exports = pool;