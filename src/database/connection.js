const mysql = require("mysql");
const config = require("../settings/database");
const { promisify } = require("util");

const pool = mysql.createPool(config);

pool.getConnection((error, connection) => {

    if (error) throw error;

    connection.release();
    
    console.log("connected!");
});

pool.query = promisify(pool.query);

module.exports = pool;