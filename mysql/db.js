// db.js (MySQL connection)
const mysql = require('mysql2/promise');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost', // or your database host
  user: 'root',      // your MySQL username
  password: 'Sameer@123', // your MySQL password
  database: 'e_commerce', // your database name
});

// Export the pool for querying the database
module.exports = pool;
