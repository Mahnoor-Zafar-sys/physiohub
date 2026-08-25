const mysql = require("mysql2");

const poolConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "vital_physio_hub",
  connectionLimit: 150,
  queueLimit: 0,
  waitForConnections: true,
  connectTimeout: 2000
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

  // 3. User Logs Table Creation Migration
  dbPool.query("SHOW TABLES LIKE 'user_logs'", (err, results) => {
    if (err) {
      console.warn("Migration warning: user_logs table check failed:", err.message);
      return;
    }
    if (results.length === 0) {
      console.log("Migrating database: creating user_logs table...");
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS user_logs (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_email VARCHAR(255) NOT NULL,
          action VARCHAR(255) NOT NULL,
          details TEXT,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `;
      dbPool.query(createTableQuery, (createErr) => {
        if (createErr) {
          console.error("Failed to create user_logs table:", createErr.message);
        } else {
          console.log("Successfully created user_logs table.");
          // Seed initial setup log
          dbPool.query("INSERT INTO user_logs (user_email, action, details) VALUES ('admin@physiohub.com', 'System Initialization', 'Clinic database and seed schemas deployed successfully.')");
        }
      });
    } else {
      console.log("Database migrations checked: user_logs table already exists.");
    }
  });

  // 4. Clinics Table Creation Migration
  dbPool.query("SHOW TABLES LIKE 'clinics'", (err, results) => {
    if (err) {
      console.warn("Migration warning: clinics table check failed:", err.message);
      return;
    }
    const checkColumnsAndAddClinicId = () => {
      const tenantTables = [
        "users", "doctors", "appointments", "emr_records", "prescriptions", 
        "invoices", "articles", "article_comments", "products", "shop_orders", 
        "services", "faqs", "gallery_items", "careers_jobs", "reviews_list", 
        "clinic_settings", "user_logs"
      ];
      tenantTables.forEach(tableName => {
        dbPool.query(`SHOW COLUMNS FROM ${tableName} LIKE 'clinic_id'`, (colErr, colResults) => {
          if (colErr) {
            console.warn(`Migration warning: checking columns for ${tableName} failed:`, colErr.message);
            return;
          }
          if (colResults.length === 0) {
            console.log(`Migrating database: adding clinic_id column to ${tableName} table...`);
            dbPool.query(`ALTER TABLE ${tableName} ADD COLUMN clinic_id INT DEFAULT 1`, (alterErr) => {
              if (alterErr) {
                console.error(`Failed to add clinic_id column to ${tableName}:`, alterErr.message);
              } else {
                console.log(`Successfully added clinic_id column to ${tableName}.`);
              }
            });
          }
        });
      });
    };

    if (results.length === 0) {
      console.log("Migrating database: creating clinics table...");
      const createClinicsTableQuery = `
        CREATE TABLE IF NOT EXISTS clinics (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          subdomain VARCHAR(100) NOT NULL UNIQUE,
          address VARCHAR(255) DEFAULT NULL,
          status ENUM('Active', 'Suspended') DEFAULT 'Active',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `;
      dbPool.query(createClinicsTableQuery, (createErr) => {
        if (createErr) {
          console.error("Failed to create clinics table:", createErr.message);
        } else {
          console.log("Successfully created clinics table. Seeding default clinic...");
          dbPool.query(
            "INSERT INTO clinics (id, name, subdomain, address, status) VALUES (1, 'Vital Physio Hub', 'vitalphysio', 'Lahore, Pakistan', 'Active') ON DUPLICATE KEY UPDATE id=id",
            (seedErr) => {
              if (seedErr) {
                console.error("Failed to seed default clinic:", seedErr.message);
              } else {
                console.log("Successfully seeded default clinic 'Vital Physio Hub'.");
                checkColumnsAndAddClinicId();
              }
            }
          );
        }
      });
    } else {
      console.log("Database migrations checked: clinics table already exists.");
      checkColumnsAndAddClinicId();
    }
  });

  // 5. Articles HTML Content Migration
  dbPool.query("SHOW COLUMNS FROM articles LIKE 'html_content'", (err, results) => {
    if (err) {
      console.warn("Migration warning: articles table check failed:", err.message);
      return;
    }
    if (results.length === 0) {
      console.log("Migrating database: adding html_content column to articles table...");
      dbPool.query("ALTER TABLE articles ADD COLUMN html_content LONGTEXT DEFAULT NULL", (alterErr) => {
        if (alterErr) {
          console.error("Failed to add html_content column to articles:", alterErr.message);
        } else {
          console.log("Successfully added html_content column to articles table.");
        }
      });
    } else {
      console.log("Database migrations checked: html_content column already exists in articles table.");
    }
  });

  // 6. Appointments: add consult_channel and meeting_credentials columns
  dbPool.query("SHOW COLUMNS FROM appointments LIKE 'consult_channel'", (err, results) => {
    if (err) { console.warn("Migration warning: appointments consult_channel check failed:", err.message); return; }
    if (results.length === 0) {
      console.log("Migrating database: adding consult_channel and meeting_credentials to appointments...");
      dbPool.query(
        "ALTER TABLE appointments ADD COLUMN consult_channel VARCHAR(100) DEFAULT NULL, ADD COLUMN meeting_credentials TEXT DEFAULT NULL",
        (alterErr) => {
          if (alterErr) console.error("Failed to add consult_channel/meeting_credentials:", alterErr.message);
          else console.log("Successfully added consult_channel and meeting_credentials to appointments.");
        }
      );
    } else {
      console.log("Database migrations checked: consult_channel already exists in appointments table.");
    }
  });

  // 7. Doctors: add whatsapp_number and whatsapp_username columns
  dbPool.query("SHOW COLUMNS FROM doctors LIKE 'whatsapp_number'", (err, results) => {
    if (err) { console.warn("Migration warning: doctors whatsapp_number check failed:", err.message); return; }
    if (results.length === 0) {
      console.log("Migrating database: adding whatsapp_number and whatsapp_username to doctors...");
      dbPool.query(
        "ALTER TABLE doctors ADD COLUMN whatsapp_number VARCHAR(50) DEFAULT NULL, ADD COLUMN whatsapp_username VARCHAR(255) DEFAULT NULL",
        (alterErr) => {
          if (alterErr) console.error("Failed to add whatsapp columns:", alterErr.message);
          else console.log("Successfully added whatsapp_number and whatsapp_username to doctors.");
        }
      );
    } else {
      console.log("Database migrations checked: whatsapp_number already exists in doctors table.");
    }
  });

  // 8. Branches table creation
  dbPool.query("SHOW TABLES LIKE 'branches'", (err, results) => {
    if (err) { console.warn("Migration warning: branches table check failed:", err.message); return; }
    if (results.length === 0) {
      console.log("Migrating database: creating branches table...");
      const createBranchesQuery = `
        CREATE TABLE IF NOT EXISTS branches (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          address VARCHAR(255) DEFAULT NULL,
          city VARCHAR(255) DEFAULT NULL,
          clinic_id INT DEFAULT 1,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_clinic (clinic_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `;
      dbPool.query(createBranchesQuery, (createErr) => {
        if (createErr) {
          console.error("Failed to create branches table:", createErr.message);
        } else {
          console.log("Successfully created branches table. Seeding default branches...");
          dbPool.query(
            "INSERT INTO branches (name, address, city, clinic_id) VALUES ('Gulberg', 'Main Boulevard, Gulberg III', 'Lahore', 1), ('DHA', 'Phase 5, Commercial Zone', 'Lahore', 1)",
            (seedErr) => {
              if (seedErr) console.error("Failed to seed default branches:", seedErr.message);
              else console.log("Default branches seeded successfully.");
            }
          );
        }
      });
    } else {
      console.log("Database migrations checked: branches table already exists.");
    }
  });

  // 9. Sync/repair doctor registry entries (ensure doctor users have a profile in doctors table)
  dbPool.query(
    `INSERT INTO doctors (name, email, specialty, fee, branch, status, image, experience, title, slug)
     SELECT name, email, 'Physical Therapy', '₨ 2,500', 'Gulberg', 'Pending', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80', '10 Years', 'Consultant', LOWER(REPLACE(name, ' ', '-'))
     FROM users
     WHERE role = 'doctor' AND NOT EXISTS (SELECT 1 FROM doctors WHERE doctors.email = users.email)`,
    (syncErr, syncResults) => {
      if (syncErr) {
        console.warn("Migration warning: failed to sync/repair doctors entries from users:", syncErr.message);
      } else if (syncResults && syncResults.affectedRows > 0) {
        console.log(`Database sync: created ${syncResults.affectedRows} pending doctor profiles for orphan doctor accounts.`);
      }
    }
  );
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
