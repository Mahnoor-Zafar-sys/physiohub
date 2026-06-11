-- SQL Schema for Premium Clinic production database
CREATE DATABASE IF NOT EXISTS premium_clinic;
USE premium_clinic;

-- 1. Users / Auth credentials
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('patient', 'doctor', 'admin', 'receptionist') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Doctor registry (extended with rich profile assets)
CREATE TABLE IF NOT EXISTS doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  specialty VARCHAR(255) NOT NULL,
  fee VARCHAR(100) NOT NULL,
  branch VARCHAR(255) NOT NULL,
  status ENUM('Active', 'Suspended') DEFAULT 'Active',
  image LONGTEXT NOT NULL,
  experience VARCHAR(100) NOT NULL,
  rating DECIMAL(3, 2) DEFAULT 4.8,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  available TINYINT DEFAULT 1,
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Appointments list (includes payment verification workflow)
CREATE TABLE IF NOT EXISTS appointments (
  id VARCHAR(100) PRIMARY KEY,
  doctor_name VARCHAR(255) NOT NULL,
  date VARCHAR(100) NOT NULL,
  time VARCHAR(100) NOT NULL,
  type VARCHAR(100) NOT NULL,
  branch VARCHAR(255) NOT NULL,
  status ENUM('Pending', 'Confirmed', 'Checked In', 'In Room', 'Completed', 'Cancelled') DEFAULT 'Pending',
  patient_name VARCHAR(255) NOT NULL,
  payment_status ENUM('Unpaid', 'Pending Verification', 'Paid', 'Rejected') DEFAULT 'Pending Verification',
  payment_method VARCHAR(100) DEFAULT NULL,
  payment_screenshot LONGTEXT DEFAULT NULL,
  admin_note TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_patient (patient_name),
  INDEX idx_date (date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. EMR electronic medical records
CREATE TABLE IF NOT EXISTS emr_records (
  id VARCHAR(100) PRIMARY KEY,
  patient_name VARCHAR(255) NOT NULL,
  doctor_name VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  diagnosis VARCHAR(255) NOT NULL,
  vitals VARCHAR(255) NOT NULL,
  assessment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_patient_emr (patient_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Prescriptions list (Rx)
CREATE TABLE IF NOT EXISTS prescriptions (
  id VARCHAR(100) PRIMARY KEY,
  patient_name VARCHAR(255) NOT NULL,
  doctor_name VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  medicine VARCHAR(255) NOT NULL,
  dosage VARCHAR(255) NOT NULL,
  duration VARCHAR(255) NOT NULL,
  instructions VARCHAR(255) NOT NULL,
  status VARCHAR(100) DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_patient_rx (patient_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Billing invoices
CREATE TABLE IF NOT EXISTS invoices (
  id VARCHAR(100) PRIMARY KEY,
  patient_name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  amount VARCHAR(100) NOT NULL,
  status ENUM('Paid', 'Unpaid') DEFAULT 'Unpaid',
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_patient_inv (patient_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Clinical articles (Blog posts)
CREATE TABLE IF NOT EXISTS articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  author VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Article comments (moderation system)
CREATE TABLE IF NOT EXISTS article_comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  article_id INT NOT NULL,
  author_name VARCHAR(255) NOT NULL,
  comment_text TEXT NOT NULL,
  status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. Seed Initial Data
-- Seed Users (passwords are simple mock references)
INSERT INTO users (name, email, password, role) VALUES
('Jane Doe', 'patient@premiumclinic.com', 'password123', 'patient'),
('Dr. Sarah Ahmed', 'doctor@premiumclinic.com', 'password123', 'doctor'),
('Director Admin', 'admin@premiumclinic.com', 'password123', 'admin'),
('Reception Desk', 'staff@premiumclinic.com', 'password123', 'receptionist')
ON DUPLICATE KEY UPDATE id=id;

-- Seed Doctors List with extended attributes
INSERT INTO doctors (name, specialty, fee, branch, status, image, experience, rating, title, slug, available) VALUES
('Dr. Sarah Ahmed', 'Skin & Dermatology', '₨ 3,000', 'Gulberg, DHA', 'Active', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80', '14 Years', 4.90, 'MBBS, FCPS (Dermatology)', 'dr-sarah-ahmed', 1),
('Dr. Omar Farooq', 'Dental Care', '₨ 2,500', 'Gulberg', 'Active', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80', '11 Years', 4.80, 'BDS, FCPS (Oral Surgery)', 'dr-omar-farooq', 1),
('Dr. Fatima Malik', 'Gynecology & Obstetrics', '₨ 3,500', 'DHA', 'Active', 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80', '16 Years', 5.00, 'MBBS, MRCOG (Gynecology)', 'dr-fatima-malik', 1)
ON DUPLICATE KEY UPDATE id=id;

-- Seed EMR records
INSERT INTO emr_records (id, patient_name, doctor_name, date, diagnosis, vitals, assessment) VALUES
('EMR-101', 'Jane Doe', 'Dr. Sarah Ahmed', '2026-05-15', 'Mild Atopic Dermatitis', 'BP: 120/80, Temp: 98.6°F', 'Patient presented with dry, itchy skin patches. Prescribed topical Hydrozole cream.'),
('EMR-102', 'Jane Doe', 'Dr. Omar Farooq', '2026-06-01', 'Localized Gingivitis', 'BP: 118/75, Temp: 98.4°F', 'Slight inflammation in upper gums. Completed scaling and advised antiseptic mouthwash twice daily.')
ON DUPLICATE KEY UPDATE id=id;

-- Seed Prescriptions
INSERT INTO prescriptions (id, patient_name, doctor_name, date, medicine, dosage, duration, instructions, status) VALUES
('RX-9901', 'Jane Doe', 'Dr. Sarah Ahmed', '2026-06-01', 'Hydrozole Topical Cream', 'Apply twice daily', '7 Days', 'External skin application only', 'Active'),
('RX-9902', 'Jane Doe', 'Dr. Omar Farooq', '2026-06-05', 'Amoxicillin 500mg', '1 tablet thrice daily', '5 Days', 'After meals', 'Active')
ON DUPLICATE KEY UPDATE id=id;

-- Seed Appointments (starts as Pending and Pending Verification)
INSERT INTO appointments (id, doctor_name, date, time, type, branch, status, patient_name, payment_status) VALUES
('PC-88201', 'Dr. Sarah Ahmed', '15 Jun, 2026', '04:30 PM', 'Video Consultation', 'Online', 'Confirmed', 'Jane Doe', 'Paid'),
('PC-88202', 'Dr. Omar Farooq', '18 Jun, 2026', '11:30 AM', 'In-Person Visit', 'Gulberg Branch', 'Pending', 'Jane Doe', 'Pending Verification')
ON DUPLICATE KEY UPDATE id=id;

-- Seed Invoices
INSERT INTO invoices (id, patient_name, description, amount, status, date) VALUES
('INV-5001', 'Jane Doe', 'Dermatological Laser Consultation', '₨ 3,000', 'Unpaid', '2026-06-10'),
('INV-5002', 'Jane Doe', 'Dental Routine Prophylaxis', '₨ 2,500', 'Paid', '2026-06-05')
ON DUPLICATE KEY UPDATE id=id;

-- Seed Articles
INSERT INTO articles (id, title, excerpt, content, category, author, image) VALUES
(1, '10 Warning Signs You Should Never Ignore', 'Critical symptoms that demand immediate medical attention and could save your life.', 'Your body sends signals before serious conditions develop. Learn to watch for persistent chest pain, sudden numbness, extreme headaches, or unexplained weight loss. Consult our specialists promptly.', 'General Health', 'Dr. Sarah Ahmed', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=700&q=80'),
(2, 'The Complete Guide to Laser Skin Treatments', 'Understand how lasers address skin concerns and what results to expect.', 'From fractional CO2 lasers to PicoSure, skin rejuvenation has advanced dramatically. Understand your skin type, recovery times, and expected sessions before choosing cosmetic therapies.', 'Skin Care', 'Dr. Sarah Ahmed', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80')
ON DUPLICATE KEY UPDATE id=id;

-- Seed Comments
INSERT INTO article_comments (id, article_id, author_name, comment_text, status) VALUES
(1, 1, 'Jane Doe', 'Thank you for this informative guide, very helpful!', 'Approved'),
(2, 2, 'Alex Smith', 'Is laser safe for hyperpigmented skin?', 'Pending')
ON DUPLICATE KEY UPDATE id=id;
