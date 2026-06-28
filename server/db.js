const mysql = require("mysql2");

const poolConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "vital_physio_hub",
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
      runMigrations(pool);
    }
  });
} catch (e) {
  console.warn("Could not establish MySQL connection pool. Fallback mockup is enabled.", e.message);
}

function runMigrations(dbPool) {
  // 1. Appointments Table Migration
  dbPool.query("SHOW COLUMNS FROM appointments LIKE 'patient_report'", (err, results) => {
    if (err) {
      console.warn("Migration warning: Appointments table check failed (maybe schema.sql has not been run yet):", err.message);
      return;
    }
    if (results.length === 0) {
      console.log("Migrating database: adding patient_report and patient_report_name columns to appointments table...");
      dbPool.query("ALTER TABLE appointments ADD COLUMN patient_report LONGTEXT DEFAULT NULL, ADD COLUMN patient_report_name VARCHAR(255) DEFAULT NULL", (alterErr) => {
        if (alterErr) {
          console.error("Failed to add columns to appointments:", alterErr.message);
        } else {
          console.log("Successfully migrated appointments table structure (added patient_report and patient_report_name).");
        }
      });
    } else {
      console.log("Database migrations checked: patient_report columns already exist in appointments table.");
    }
  });

  // 2. Doctors Table Migration
  dbPool.query("SHOW COLUMNS FROM doctors LIKE 'cv_file'", (err, results) => {
    if (err) {
      console.warn("Migration warning: Doctors table check failed:", err.message);
      return;
    }
    if (results.length === 0) {
      console.log("Migrating database: altering doctors table to support CV, degrees, certificates, email, social links, status enums and notes...");
      const alterQueries = [
        "ALTER TABLE doctors MODIFY COLUMN status ENUM('Active', 'Suspended', 'Pending', 'Rejected', 'Need More Details') DEFAULT 'Pending'",
        "ALTER TABLE doctors ADD COLUMN email VARCHAR(255) DEFAULT NULL",
        "ALTER TABLE doctors ADD COLUMN cv_file LONGTEXT DEFAULT NULL",
        "ALTER TABLE doctors ADD COLUMN cv_name VARCHAR(255) DEFAULT NULL",
        "ALTER TABLE doctors ADD COLUMN certificates_file LONGTEXT DEFAULT NULL",
        "ALTER TABLE doctors ADD COLUMN certificates_name VARCHAR(255) DEFAULT NULL",
        "ALTER TABLE doctors ADD COLUMN degrees_file LONGTEXT DEFAULT NULL",
        "ALTER TABLE doctors ADD COLUMN degrees_name VARCHAR(255) DEFAULT NULL",
        "ALTER TABLE doctors ADD COLUMN rewards_file LONGTEXT DEFAULT NULL",
        "ALTER TABLE doctors ADD COLUMN rewards_name VARCHAR(255) DEFAULT NULL",
        "ALTER TABLE doctors ADD COLUMN other_files LONGTEXT DEFAULT NULL",
        "ALTER TABLE doctors ADD COLUMN other_files_name VARCHAR(255) DEFAULT NULL",
        "ALTER TABLE doctors ADD COLUMN social_linkedin VARCHAR(255) DEFAULT NULL",
        "ALTER TABLE doctors ADD COLUMN social_facebook VARCHAR(255) DEFAULT NULL",
        "ALTER TABLE doctors ADD COLUMN social_instagram VARCHAR(255) DEFAULT NULL",
        "ALTER TABLE doctors ADD COLUMN social_twitter VARCHAR(255) DEFAULT NULL",
        "ALTER TABLE doctors ADD COLUMN admin_note TEXT DEFAULT NULL"
      ];
      
      let promiseChain = Promise.resolve();
      alterQueries.forEach(queryStr => {
        promiseChain = promiseChain.then(() => {
          return new Promise((resolve) => {
            dbPool.query(queryStr, (alterErr) => {
              if (alterErr) {
                console.warn(`Doctor migration step warning on query [${queryStr.slice(0, 40)}...]: ${alterErr.message}`);
              }
              resolve();
            });
          });
        });
      });
      
      promiseChain.then(() => {
        console.log("Doctors table migration steps completed successfully.");
      });
    } else {
      console.log("Database migrations checked: cv_file column already exists in doctors table.");
    }
  });
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
