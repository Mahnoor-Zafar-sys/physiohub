const mysql = require("mysql2");

const poolConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "premium_clinic",
  connectionLimit: 150,
  queueLimit: 0,
  waitForConnections: true
};

let pool;
let dbEnabled = false;

try {
  pool = mysql.createPool(poolConfig);
  // Perform an initial verification query
  pool.query("SELECT 1", (err) => {
    if (err) {
      console.warn("MySQL Database pool initialized but connection test failed. Server running in local mock fallback mode.");
    } else {
      dbEnabled = true;
      console.log("MySQL Database connected and pool initialized successfully (150 connections limit).");
    }
  });
} catch (e) {
  console.warn("Could not establish MySQL connection pool. Fallback mockup is enabled.", e.message);
}

module.exports = {
  isDbEnabled: () => dbEnabled,
  query: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      if (!dbEnabled) {
        return reject(new Error("MySQL database is offline."));
      }
      pool.query(sql, params, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
};
