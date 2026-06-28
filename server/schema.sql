-- SQL Schema for Physiohub production database
CREATE DATABASE IF NOT EXISTS vital_physio_hub;
USE vital_physio_hub;

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
  status ENUM('Active', 'Suspended', 'Pending', 'Rejected', 'Need More Details') DEFAULT 'Pending',
  image LONGTEXT NOT NULL,
  experience VARCHAR(100) NOT NULL,
  rating DECIMAL(3, 2) DEFAULT 4.8,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  available TINYINT DEFAULT 1,
  email VARCHAR(255) DEFAULT NULL,
  cv_file LONGTEXT DEFAULT NULL,
  cv_name VARCHAR(255) DEFAULT NULL,
  certificates_file LONGTEXT DEFAULT NULL,
  certificates_name VARCHAR(255) DEFAULT NULL,
  degrees_file LONGTEXT DEFAULT NULL,
  degrees_name VARCHAR(255) DEFAULT NULL,
  rewards_file LONGTEXT DEFAULT NULL,
  rewards_name VARCHAR(255) DEFAULT NULL,
  other_files LONGTEXT DEFAULT NULL,
  other_files_name VARCHAR(255) DEFAULT NULL,
  social_linkedin VARCHAR(255) DEFAULT NULL,
  social_facebook VARCHAR(255) DEFAULT NULL,
  social_instagram VARCHAR(255) DEFAULT NULL,
  social_twitter VARCHAR(255) DEFAULT NULL,
  admin_note TEXT DEFAULT NULL,
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
  patient_report LONGTEXT DEFAULT NULL,
  patient_report_name VARCHAR(255) DEFAULT NULL,
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
  type VARCHAR(50) DEFAULT 'blog',
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
('Jane Doe', 'patient@physiohub.com', '$2b$10$7S8QApO5SaPChSuHmXGrNeDB4tG5cqiQ0qw84tmAWjRVdlpSXAXtS', 'patient'),
('Dr. Sarah Ahmed', 'doctor@physiohub.com', '$2b$10$7S8QApO5SaPChSuHmXGrNeDB4tG5cqiQ0qw84tmAWjRVdlpSXAXtS', 'doctor'),
('Director Admin', 'admin@physiohub.com', '$2b$10$7S8QApO5SaPChSuHmXGrNeDB4tG5cqiQ0qw84tmAWjRVdlpSXAXtS', 'admin'),
('Reception Desk', 'staff@physiohub.com', '$2b$10$7S8QApO5SaPChSuHmXGrNeDB4tG5cqiQ0qw84tmAWjRVdlpSXAXtS', 'receptionist')
ON DUPLICATE KEY UPDATE id=id;

-- Seed Doctors List with extended attributes
INSERT INTO doctors (name, specialty, fee, branch, status, image, experience, rating, title, slug, available, email, social_linkedin, social_facebook, social_instagram) VALUES
('Dr. Sarah Ahmed', 'Skin & Dermatology', '₨ 3,000', 'Gulberg, DHA', 'Active', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80', '14 Years', 4.90, 'MBBS, FCPS (Dermatology)', 'dr-sarah-ahmed', 1, 'doctor@physiohub.com', 'https://linkedin.com/in/dr-sarah', 'https://facebook.com/dr-sarah', 'https://instagram.com/dr-sarah'),
('Dr. Omar Farooq', 'Dental Care', '₨ 2,500', 'Gulberg', 'Active', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80', '11 Years', 4.80, 'BDS, FCPS (Oral Surgery)', 'dr-omar-farooq', 1, 'doctor-omar@physiohub.com', 'https://linkedin.com/in/dr-omar', 'https://facebook.com/dr-omar', 'https://instagram.com/dr-omar'),
('Dr. Fatima Malik', 'Gynecology & Obstetrics', '₨ 3,500', 'DHA', 'Active', 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80', '16 Years', 5.00, 'MBBS, MRCOG (Gynecology)', 'dr-fatima-malik', 1, 'doctor-fatima@physiohub.com', 'https://linkedin.com/in/dr-fatima', 'https://facebook.com/dr-fatima', 'https://instagram.com/dr-fatima')
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

-- Seed Articles (Both Blog Posts and News Press Releases)
INSERT INTO articles (id, title, excerpt, content, category, author, image, type) VALUES
(1, '10 Warning Signs You Should Never Ignore — Visit a Doctor Immediately', 'Your body sends signals before serious conditions develop. Learn the critical symptoms that demand immediate medical attention and could save your life.', '[{"type":"p","text":"Many people tend to brush off minor body aches, fatigue, or mild changes in their physical capabilities. However, clinical science teaches us that the human body rarely experiences abnormalities without a reason. Often, serious cardiovascular, neurological, or endocrinological disorders manifest as seemingly minor warning signs weeks before a critical emergency occurs."},{"type":"h2","text":"1. Sudden Chest Pain or Discomfort"},{"type":"p","text":"Chest pain is the classic hallmark of cardiovascular distress. Any pain that feels like crushing weight, pressure, squeezing, or fullness in the center of your chest that lasts more than a few minutes—or goes away and comes back—requires immediate triage. It can radiate to your jaw, neck, left arm, or back."},{"type":"callout","text":"CLINICAL TIP: Do not drive yourself to the emergency department if you are experiencing active chest distress. Call our ambulance lifeline +92 (51) 111-911-273 or local responders immediately so that paramedic monitoring can start on-site."},{"type":"h2","text":"2. Sudden Weakness or Numbness on One Side"},{"type":"p","text":"If you experience sudden weakness, numbness, or loss of motor control in your face, arm, or leg—especially on just one side of your body—this is a primary indicator of an ischemic or hemorrhagic stroke. Time is brain tissue; every minute of delay reduces recovery chances."},{"type":"p","text":"Use the FAST test: Face drooping, Arm weakness, Speech difficulty, Time to call emergency support."},{"type":"h2","text":"3. Unexplained Shortness of Breath"},{"type":"p","text":"Difficulty catching your breath without strenuous exertion can indicate pulmonary embolism (a blood clot in the lungs), severe asthma exacerbation, heart failure, or arrhythmia. If it is accompanied by swollen legs, coughing up blood, or fainting, seek urgent care."},{"type":"quote","text":"Prevention is always better than cure. Recognizing these clinical alarms early is the single most effective tool we have to save lives and prevent permanent organ damage."},{"type":"h2","text":"Conclusion and Next Steps"},{"type":"p","text":"Never let fear or embarrassment stop you from consulting a doctor. Early diagnostic panels, blood work, or electrocardiograms (ECG) are safe, quick, and highly effective at catching conditions before they escalate. Make sure to consult your general physician annually for standard screenings."}]', 'General Health', 'Dr. Sadia Noor', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=700&q=80', 'blog'),

(2, 'The Complete Guide to Laser Skin Treatments in 2026', 'From fractional CO₂ to PicoSure — understand how each laser works, what skin concerns it addresses, and what results you can realistically expect.', '[{"type":"p","text":"Laser technology has revolutionized modern dermatology. Today, we can resolve severe acne scarring, unwanted pigmentation, sun damage, and signs of aging with highly targeted wavelengths of light. However, patients are often confused by the terminology—Fractional CO2, Erbium, Q-Switched, and Picosecond lasers all operate differently."},{"type":"h2","text":"Understanding Ablative vs. Non-Ablative Lasers"},{"type":"p","text":"Ablative lasers (like Fractional CO2) remove the outer layers of damaged skin, forcing the body to regenerate a completely new dermal layer rich in collagen. These treatments are outstanding for deep wrinkles and severe acne scars, but require 5-7 days of downtime."},{"type":"p","text":"Non-ablative lasers bypass the surface layer, heating the underlying tissue to stimulate collagen without damaging the skin surface. These are excellent for mild texture issues and have virtually zero downtime."},{"type":"callout","text":"CLINICAL TIP: Sun protection is mandatory post-treatment. Always apply a broad-spectrum SPF 50+ sunscreen and avoid direct sunlight for at least two weeks after any laser procedure to prevent hyperpigmentation."},{"type":"h2","text":"The Rise of Picosecond Technology (PicoSure)"},{"type":"p","text":"Picosecond lasers deliver ultra-short energy pulses in trillionths of a second. Instead of heating and burning pigment, they shatter it mechanically into tiny particles that the body''s immune system clears naturally. This makes Pico lasers extremely safe for darker skin types with minimal risk of burn complications."},{"type":"quote","text":"Modern lasers are not magic wands; they are precise clinical instruments. The success of a laser treatment depends entirely on customizing the wavelength and pulse duration to the patient''s specific skin type and target conditions."},{"type":"h2","text":"What to Expect During Recovery"},{"type":"p","text":"For ablative procedures, expect a sensation similar to mild sunburn, followed by redness, swelling, and light peeling. Keeping the skin moist with sterile recovery ointments is key to speeding up cellular repair. Consultation with a certified dermatologist ensures the safest settings for your skin tone."}]', 'Skin Care', 'Dr. Sarah Ahmed', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80', 'blog'),

(3, 'FUE vs DHI Hair Transplant: Which Is Right for You?', 'Two of the most advanced hair restoration techniques compared side-by-side. Cost, recovery time, density outcomes, and the ideal candidate profile for each.', '[{"type":"p","text":"Hair loss affects millions of men and women worldwide, impacting self-confidence and quality of life. Modern hair transplantation is no longer about plugs or artificial hairlines. Techniques like Follicular Unit Extraction (FUE) and Direct Hair Implantation (DHI) yield completely natural, high-density results."},{"type":"h2","text":"What is FUE (Follicular Unit Extraction)?"},{"type":"p","text":"In an FUE transplant, individual hair follicles are extracted from the donor zone (usually the back of the head) using a micro-punch tool. Next, the surgeon manually creates tiny channels or incisions in the balding recipient area before inserting the extracted grafts. This method is outstanding for covering large bald areas in a single session."},{"type":"h2","text":"What is DHI (Direct Hair Implantation)?"},{"type":"p","text":"DHI is a modification of FUE. Grafts are extracted from the donor area in the same way, but they are loaded into a specialized pen-like device called a Choi Implanter. The implanter creates the channel and deposits the graft simultaneously. This gives the surgeon absolute control over the depth, angle, and direction of each implanted hair."},{"type":"callout","text":"CLINICAL TIP: DHI allows for higher implantation density and often does not require fully shaving the recipient area, making it popular for women and patients with localized balding. However, it is more time-consuming and expensive than FUE."},{"type":"quote","text":"Both FUE and DHI are highly effective. The key factor is not which technique is superior, but rather the surgeon''s artistry in mapping a natural hairline and placing grafts at correct angles."},{"type":"h2","text":"Post-Op Recovery & Hair Growth Timeline"},{"type":"p","text":"The first 10 days are critical for graft survival. Sleep with your head elevated and wash the area gently with saline spray. The transplanted hairs will shed after 3-4 weeks—this is completely normal (shock loss). New hair growth begins at month 3, and final density is visible at 9-12 months."}]', 'Hair Restoration', 'Dr. Imran Sheikh', 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&w=800&q=80', 'blog'),

(4, 'Managing Diabetes: Nutrition, Exercise & Monitoring Tips', 'Evidence-based lifestyle changes that help patients with Type 2 diabetes maintain healthy blood sugar levels, reduce medication dependency, and live fully.', '[{"type":"p","text":"Type 2 diabetes is a chronic metabolic condition characterized by insulin resistance. While medication is necessary for many, clinical evidence shows that structured lifestyle adjustments are the most powerful tool for stabilizing blood glucose, lowering HbA1c levels, and in some cases, achieving diabetes remission."},{"type":"h2","text":"1. The Power of Complex Carbohydrates"},{"type":"p","text":"Nutrition is the foundation of diabetes control. Simple carbohydrates (white bread, white rice, sugary drinks) cause rapid spikes in blood sugar. Shift to complex carbohydrates (oats, brown rice, lentils, quinoa, fresh vegetables) which release energy slowly due to their high fiber content, keeping insulin demands stable."},{"type":"callout","text":"CLINICAL TIP: Follow the ''Plate Method''. Fill half of your plate with non-starchy vegetables (spinach, broccoli, cucumbers), one-quarter with lean protein (chicken, fish, tofu), and one-quarter with healthy complex carbs."},{"type":"h2","text":"2. Resistance Training vs. Cardio"},{"type":"p","text":"Physical exercise acts like a natural insulin sensitizer. Muscles use glucose for energy even without insulin during muscle contractions. A combination of moderate cardio (brisk walking 30 mins a day) and light resistance training (bodyweight exercises 3 times a week) dramatically improves glucose clearance."},{"type":"quote","text":"Our goal is not just to lower blood sugar with medications, but to restore the body''s natural insulin sensitivity through consistent, daily lifestyle practices."},{"type":"h2","text":"3. Continuous Monitoring & Tracking HbA1c"},{"type":"p","text":"Self-monitoring using a glucose meter or a Continuous Glucose Monitor (CGM) helps you understand how specific foods and activities affect your blood sugar. Track your HbA1c (three-month blood sugar average) every 90 days. Keeping HbA1c below 6.5% drastically reduces cardiovascular and kidney complications."}]', 'Diabetes', 'Dr. Zara Ahmed', 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=800&q=80', 'blog'),

(5, 'Pregnancy Nutrition: What to Eat & Avoid Each Trimester', 'A trimester-by-trimester nutritional guide from our expert gynecologists covering essential nutrients, safe foods, and common myths that expecting mothers should know.', '[{"type":"p","text":"Nutrition during pregnancy plays a vital role in maternal health and fetal development. While the old saying ''eating for two'' is a myth, you do require higher densities of specific vitamins and minerals to support key phases of embryonic and fetal growth."},{"type":"h2","text":"First Trimester: Folate & Nausea Support"},{"type":"p","text":"The first 12 weeks are critical for organogenesis and neural tube development. Folate (Vitamin B9) is highly mandatory. Eat dark leafy greens, citrus fruits, and legumes, and take a daily 400mcg folic acid supplement. To combat morning sickness, eat small, frequent meals high in protein and sip ginger tea."},{"type":"h2","text":"Second Trimester: Calcium & Iron Demands"},{"type":"p","text":"Between weeks 13 and 26, the baby''s skeletal structure hardens, and maternal blood volume expands by up to 50%. Focus on Calcium (dairy, almonds, leafy greens) for bone density, and Iron (lean meat, beans, fortified cereals) paired with Vitamin C to enhance absorption and prevent gestational anemia."},{"type":"callout","text":"CLINICAL TIP: Avoid foods with high bacterial risks: raw/unpasteurized dairy, soft cheeses, raw seafood/sushi, and cold deli meats, which can harbor Listeria."},{"type":"quote","text":"Every pregnancy is unique. The key is focused, nutrient-dense eating rather than increasing sheer calorie intake. Focus on natural, unprocessed whole foods for optimal maternal health."},{"type":"h2","text":"Third Trimester: Energy & Healthy Fats"},{"type":"p","text":"During the final stretch, the baby gains weight rapidly and brain development peaks. Introduce healthy omega-3 fatty acids (walnuts, chia seeds, wild salmon) for fetal brain growth. Maintain light physical activity and consult your obstetrician to track growth scans and blood pressure regularly."}]', 'Gynecology', 'Dr. Fatima Malik', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80', 'blog'),

(6, 'Knee Pain Solutions: When to Try Physio vs Surgery', 'Not every knee problem needs an operation. Our orthopedic specialists explain the decision tree between conservative management, physiotherapy, and surgical intervention.', '[{"type":"p","text":"Knee pain is one of the most common musculoskeletal complaints among adults. Whether it is caused by osteoarthritis, ligament sprains, or meniscus tears, many patients assume that surgery is the only path to permanent recovery. In reality, a large majority of knee conditions can be treated successfully without ever entering an operating theater."},{"type":"h2","text":"Conservative Management & Physiotherapy"},{"type":"p","text":"For conditions like mild osteoarthritis, patellofemoral pain syndrome, or partial tendon sprains, structured physiotherapy is the gold standard of care. Focus on strengthening the quadriceps, hamstrings, and hip stabilizers to take the mechanical load off the joint. Joint lubrication injections (hyaluronic acid) can also provide relief."},{"type":"callout","text":"CLINICAL TIP: Weight management is incredibly effective. Losing just 1 kg of body weight removes approximately 4 kg of pressure from your knees during daily activities like walking."},{"type":"h2","text":"When Surgical Intervention Is Necessary"},{"type":"p","text":"Surgery becomes the recommended option under specific clinical criteria:"},{"type":"p","text":"• Mechanical locking: Meniscus tears that cause the joint to catch or lock physically.\\n• Joint instability: Complete ACL/PCL tears in active individuals, which cause the knee to give out.\\n• End-stage arthritis: Severe, bone-on-bone osteoarthritis that fails to respond to physical therapy and impairs basic mobility."},{"type":"quote","text":"Surgery is a tool, not a first resort. We always exhaust conservative physical protocols first, as muscle strengthening and structural re-alignment are vital for long-term joint health."},{"type":"h2","text":"Conclusion"},{"type":"p","text":"An accurate diagnosis via physical examination and MRI scanning is key. Speak to an orthopedic specialist to map out a phased recovery plan tailored to your activity level."}]', 'Orthopedic', 'Dr. Hassan Raza', 'https://images.unsplash.com/photo-1597764690523-15bea4c581c9?auto=format&fit=crop&w=800&q=80', 'blog'),

(7, 'Vital Physio Hub Awarded JCI Gold Seal of Approval', 'Joint Commission International (JCI) has awarded Vital Physio Hub the gold seal of approval for patient safety and rehabilitation excellence.', 'Vital Physio Hub has officially been accredited by the Joint Commission International (JCI), the world''s premier body for healthcare quality evaluation. This prestigious gold seal recognizes our commitment to meeting the highest global safety standards, infection control protocols, and rehabilitation outcome metrics. The accreditation audit analyzed over 300 standards across patient rights, medication management, and clinical training. Our CEO stated: ''This is a testament to our relentless pursuit of safety, compassion, and innovation.''', 'Accreditation', 'Director Admin', 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80', 'news'),

(8, 'Launch of AI-Powered Telemedicine & Virtual Care Center', 'Introducing our new, secure online consulting suite powered by AI-driven symptom triage. Patients can now access top specialists from home.', 'We are proud to unveil our next-generation Online Consultation Hub. Integrated with advanced diagnostics, live high-definition video consulting, and secure HIPAA-compliant electronic medical records (EMR), the platform allows patients to connect with over 24 board-certified doctors. Additionally, our new AI-powered triage helper assists patients in identifying their symptoms and automatically routes them to the correct medical department, ensuring faster and more accurate diagnostics.', 'Technology', 'Director Admin', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', 'news'),

(9, 'Expansion of DHA Branch & Specialty Surgery Center', 'Vital Physio Hub has completed the second phase of its DHA facility expansion, featuring six state-of-the-art rehabilitation units.', 'Our DHA Phase 5 wing has completed expansion construction. The newly launched wing adds three ultra-hygienic surgical wards, a specialized pediatric critical care zone, and advanced dermatology suites. Equipped with German-engineered anesthesia towers and robotic-assisted surgical arm systems, the center is prepared to perform highly complex neurosurgical and orthopedic operations. This expansion increases our capacity to serve an additional 15,000 patients annually.', 'Infrastructure', 'Director Admin', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80', 'news'),

(10, 'Annual Health Outreach Campaign Reaches 10,000 Families', 'Our medical teams successfully conducted 12 free healthcare camps in remote and underserved areas, providing diagnostics and treatments.', 'Under our CSR umbrella, Vital Physio Hub mobilized four emergency physical therapy fleets to establish temporary diagnostic and rehabilitation hubs in underserved rural districts. Over 10,000 patients received comprehensive physiological checks, physical therapy sessions, pediatric reviews, and complimentary care packages. Over 150 complex orthopedic and neurological referrals were sponsored directly by our clinic, helping families access critical treatments free of charge.', 'Community Outreach', 'Director Admin', 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80', 'news')
ON DUPLICATE KEY UPDATE id=id;

-- Seed Comments
INSERT INTO article_comments (id, article_id, author_name, comment_text, status) VALUES
(1, 1, 'Jane Doe', 'Thank you for this informative guide, very helpful!', 'Approved'),
(2, 2, 'Alex Smith', 'Is laser safe for hyperpigmented skin?', 'Pending')
ON DUPLICATE KEY UPDATE id=id;

-- 10. Shop Products Table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  description TEXT NOT NULL,
  stock INT DEFAULT 10,
  image LONGTEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 11. Shop Orders Table (with guest details)
CREATE TABLE IF NOT EXISTS shop_orders (
  id VARCHAR(100) PRIMARY KEY,
  patient_name VARCHAR(255) NOT NULL,
  patient_email VARCHAR(255) NOT NULL,
  shipping_address TEXT NOT NULL,
  phone VARCHAR(50) NOT NULL,
  total_amount INT NOT NULL,
  payment_method VARCHAR(100) NOT NULL,
  payment_status ENUM('Unpaid', 'Pending Verification', 'Paid', 'Rejected') DEFAULT 'Unpaid',
  payment_screenshot LONGTEXT DEFAULT NULL,
  order_status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
  admin_note TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_order_email (patient_email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 12. Shop Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(100) NOT NULL,
  product_id INT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES shop_orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Shop Products
INSERT INTO products (id, name, category, price, description, stock, image) VALUES
(1, 'Resistance Bands Set', 'Rehabilitation', 1200, 'Set of 5 high-quality latex resistance bands with different resistance levels. Perfect for physical therapy, strength training, and rehabilitation.', 25, 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80'),
(2, 'Foam Roller', 'Recovery', 1500, 'High-density foam roller for muscle massage, trigger point therapy, and physical therapy recovery.', 15, 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=400&q=80'),
(3, 'Orthopedic Seat Cushion', 'Supports & Braces', 2200, 'Memory foam seat cushion designed to relieve pressure on the tailbone and improve sitting posture.', 20, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80'),
(4, 'TENS Unit Muscle Stimulator', 'Rehabilitation', 3500, 'Dual-channel TENS machine with 8 modes for muscle pain relief, recovery, and electrical muscle stimulation.', 10, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80'),
(5, 'Hot & Cold Gel Compression Pack', 'Recovery', 950, 'Reusable gel pack for targeted hot or cold therapy, ideal for reducing swelling, muscle spasms, and joint pain.', 30, 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=400&q=80')
ON DUPLICATE KEY UPDATE id=id;

-- 13. Services Table
CREATE TABLE IF NOT EXISTS services (
  id VARCHAR(100) PRIMARY KEY,
  category VARCHAR(255) NOT NULL,
  tagline VARCHAR(255) NOT NULL,
  shortDesc TEXT NOT NULL,
  overview TEXT NOT NULL,
  symptoms TEXT NOT NULL,
  benefits TEXT NOT NULL,
  treatments TEXT NOT NULL,
  procedure_text TEXT NOT NULL,
  duration VARCHAR(100) NOT NULL,
  recovery VARCHAR(100) NOT NULL,
  fee VARCHAR(100) NOT NULL,
  popular TINYINT DEFAULT 0,
  type VARCHAR(100) DEFAULT 'therapy',
  image LONGTEXT DEFAULT NULL,
  gradient VARCHAR(100) DEFAULT NULL,
  solidColor VARCHAR(100) DEFAULT NULL,
  lightBg VARCHAR(100) DEFAULT NULL,
  border VARCHAR(100) DEFAULT NULL,
  accent VARCHAR(100) DEFAULT NULL,
  badgeBg VARCHAR(100) DEFAULT NULL,
  badgeText VARCHAR(100) DEFAULT NULL,
  tag VARCHAR(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Services
INSERT INTO services (id, category, tagline, shortDesc, overview, symptoms, benefits, treatments, procedure_text, duration, recovery, fee, popular, type, image, gradient, solidColor, lightBg, border, accent, badgeBg, badgeText, tag) VALUES
('physiotherapy', 'Physiotherapy', 'Restoring Movement, Improving Quality of Life', 'Comprehensive physical rehabilitation to recover mobility, strength, and function after injury.', 'Physiotherapy is the core clinical facility at Vital Physio Hub, specializing in dynamic movement restoration. Our certified manual therapists design custom physical rehabilitation programs to target skeletal stiffness, neurological path retraining, and post-surgical functional delays.', '["Post-surgical stiffness", "Chronic joint dysfunction", "Arthritis limitations", "Muscle weakness", "Gait & balance instability"]', '["Custom recovery timeline", "Manual therapy adjustments", "Skilled guidance & home planning", "Safe non-pharmacological pain relief"]', '["Joint Mobilization", "Therapeutic Exercise", "Postural Correction", "Gait Retraining", "Manual Stretch Therapy"]', 'Clinical evaluation → Biomechanical mapping → Custom rehab plan → Supervised session → Independent home regime', '45 – 60 min', '2 – 12 weeks', '₨ 2,500', 1, 'therapy', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', 'from-sky-600 to-cyan-400', '#0ea5e9', 'from-sky-50 to-cyan-50', 'border-sky-200', 'text-sky-600', 'bg-sky-100', 'text-sky-700', 'physiotherapy'),
('chiropractic', 'Chiropractic Adjustments', 'Realigning Your Spine, Relieving Your Pain', 'Advanced manual adjustments and spinal decompression therapies for optimal skeletal alignment.', 'Our chiropractic clinic specializes in safe, hands-on adjustments. We target vertebral subluxation, nerve compressions, and functional pelvic tilts to restore structural homeostasis and eliminate back, neck, and sciatic nerve pain.', '["Chronic lumbar back pain", "Cervical stiffness & headaches", "Sciatica & radiating leg pain", "Postural imbalances", "Scoliotic pain management"]', '["Instant decompression & relief", "Restored range of motion", "Non-surgical, drug-free protocol", "Female chiropractor specialist available"]', '["Spinal Manipulation", "Lumbar Decompression", "Postural Realignment", "Flexion-Distraction", "Instrument Assisted Adjustments"]', 'Posture mapping → Spinal palpation → Motion testing → Targeted adjustments → Soft-tissue release → Ergonomic guidance', '20 – 30 min', 'Immediate recovery', '₨ 3,000', 1, 'therapy', 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=800&q=80', 'from-pink-500 to-rose-400', '#ec4899', 'from-pink-50 to-rose-50', 'border-pink-200', 'text-pink-600', 'bg-pink-100', 'text-pink-700', 'chiropractic'),
('hijama', 'Hijama Therapy (Wet Cupping)', 'Detoxification According to Prophetic Medicine', 'Sterile wet cupping treatments to promote detoxification, blood circulation, and general well-being.', 'We provide clinical wet cupping (Hijama) in a certified sterile environment. Practicing strictly under Prophetic medical guidelines combined with modern anatomical mapping, our specialists perform precise micro-incisions to withdraw cellular debris and inflammatory agents.', '["Body pain & muscle fatigue", "Poor blood circulation", "Chronic tension headaches", "High blood pressure symptoms", "General lethargy & stress"]', '["Sterile disposable equipment", "Prophetic sunnah days schedule options", "Natural systemic detoxification", "Boosted immune system performance"]', '["Wet Cupping (Hijama)", "Dry Cupping", "Moving Massage Cupping", "Detoxification Therapy", "Pain Management Cupping"]', 'Skin disinfection → Light dry suction → Sterile micro-scratches → Hijama suction → Antiseptic dressing → Hydration protocol', '30 – 45 min', '1 – 3 days', '₨ 2,000', 1, 'therapy', 'https://images.unsplash.com/photo-1578991624414-276ef23a534f?auto=format&fit=crop&w=800&q=80', 'from-purple-600 to-indigo-400', '#8b5cf6', 'from-purple-50 to-indigo-50', 'border-purple-200', 'text-purple-600', 'bg-purple-100', 'text-purple-700', 'hijama'),
('electrotherapy', 'Electrotherapy', 'Accelerating Healing Through Smart Stimulation', 'Targeted electrical therapies (TENS, EMS) to manage chronic pain and build muscle function.', 'Our electrotherapy suite offers cutting-edge modalities like TENS, Interferential Current (IFT), and Electrical Muscle Stimulation (EMS). We use specific therapeutic frequencies to block pain signals and stimulate healing.', '["Severe muscle spasms", "Acute post-injury pain", "Muscle atrophy", "Chronic neuropathic pain", "Joint inflammation"]', '["Non-addictive pain block", "Rapid swelling reduction", "Complements active rehab", "Adjustable frequency settings"]', '["TENS Stimulation", "Interferential Therapy (IFT)", "EMS Muscle Retraining", "Ultrasound Therapy", "Combined Laser-Electro Therapy"]', 'Electrode mapping → Skin prep → Freq calibration → Active stimulation → Post-stim check', '15 – 30 min', 'Immediate recovery', '₨ 1,800', 0, 'therapy', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80', 'from-amber-600 to-orange-450', '#d97706', 'from-amber-50 to-orange-50', 'border-amber-200', 'text-amber-600', 'bg-amber-100', 'text-amber-700', 'electrotherapy')
ON DUPLICATE KEY UPDATE id=id;

-- 14. FAQs Table
CREATE TABLE IF NOT EXISTS faqs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  question VARCHAR(255) NOT NULL,
  answer TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed FAQs
INSERT INTO faqs (category, question, answer) VALUES
('appointments', 'How do I book an appointment at Vital Physio Hub?', 'You can book through our website''s booking page, call our helpline at +92-300-8786187, or send us a message on WhatsApp. Online bookings are available 24/7 and confirmed instantly.'),
('appointments', 'Can I choose a specific doctor for my appointment?', 'Yes, absolutely. During the booking process you can browse all available doctors, view their profiles, specializations, and available time slots, and select the one that suits you best.'),
('appointments', 'What is your cancellation and rescheduling policy?', 'You can cancel or reschedule up to 4 hours before your appointment at no charge. Cancellations within 4 hours may incur a small processing fee. Emergency cancellations are always waived.'),
('services', 'What specialties does Vital Physio Hub offer?', 'We offer 8 clinical facilities including Physiotherapy, Chiropractic Adjustments, Cupping, Hijama, Electrotherapy, Kinesio Taping, Fitness Training, and Dry Needling.'),
('services', 'Do you offer online video consultations?', 'Yes. Our telemedicine platform supports video, audio, and chat consultations. You can consult with any of our doctors from the comfort of your home via Zoom or our in-app system.'),
('billing', 'What payment methods do you accept?', 'We accept JazzCash, Easypaisa, Visa/Mastercard debit & credit cards, bank transfers, and cash. Online appointments can be partially or fully paid in advance through our secure portal.'),
('billing', 'Will I receive an invoice or receipt for my visit?', 'A detailed digital invoice is automatically sent to your registered email after every consultation and procedure. You can also access all past invoices from your Patient Portal account.'),
('general', 'What are your clinic timings?', 'We are open Monday to Saturday from 09:00 AM to 09:00 PM. Sundays are reserved for emergencies and pre-scheduled sessions only.');

-- 15. Gallery Items Table
CREATE TABLE IF NOT EXISTS gallery_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  src LONGTEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  span VARCHAR(50) DEFAULT 'normal'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Gallery
INSERT INTO gallery_items (src, category, title, description, span) VALUES
('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80', 'facility', 'Main Reception & Waiting Lobby', 'Premium glassmorphic waiting area with botanical healing aesthetics.', 'wide'),
('https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=800&q=80', 'equipment', 'Advanced Diagnostic Wing', 'German-engineered biomechanical diagnostic terminals.', 'normal'),
('https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&w=800&q=80', 'team', 'Team of Expert Consultants', 'Board-certified medical and manual therapy practitioners.', 'normal'),
('https://images.unsplash.com/photo-1578991624414-276ef23a534f?auto=format&fit=crop&w=800&q=80', 'treatment', 'Laser Treatment Suite', 'Advanced clinical skin laser devices.', 'normal'),
('https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80,https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80', 'before-after', 'Acne & Skin Resurfacing', 'Clinical results after 3 sessions of fractional CO2 laser treatment. Acne scarring and hyperpigmentation reduced by 85%.', 'Dermatology'),
('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80,https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', 'before-after', 'Smile Makeover (Veneers)', 'Full mouth porcelain veneers smile design completed in 2 visits. Corrected bite alignment and tooth discoloration.', 'Dentistry');

-- 16. Careers Job Openings Table
CREATE TABLE IF NOT EXISTS careers_jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  experience VARCHAR(100) NOT NULL,
  salary VARCHAR(100) NOT NULL,
  deadline VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Careers
INSERT INTO careers_jobs (title, department, type, location, experience, salary, deadline, description, requirements) VALUES
('Senior Physiotherapist', 'Physiotherapy', 'Full-Time', 'Lahore (Gulberg)', '5+ years', 'PKR 1,50,000 - 2,50,000', 'July 25, 2026', 'We are looking for a senior manual physical therapist to lead our sports rehab and skeletal adjustments wing. Master''s degree or equivalent clinical training required.', '["DPT or equivalent degree", "Demonstrated experience in manual therapy adjustive techniques", "Excellent diagnostic and patient care abilities", "Strong team coordination skills"]'),
('Chiropractor', 'Chiropractic', 'Full-Time', 'Lahore (DHA)', '3+ years', 'PKR 2,00,000 - 3,50,000', 'July 30, 2026', 'Seeking a certified Chiropractor with hands-on expertise in spinal manipulation, decompression therapy, and posture correction.', '["Doctor of Chiropractic (DC) or equivalent board certification", "3+ years clinical experience", "Active registration with PMDC", "Familiarity with biomechanical posture mapping"]');

-- 17. Verified Reviews / Testimonials Table
CREATE TABLE IF NOT EXISTS reviews_list (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  avatar LONGTEXT DEFAULT NULL,
  rating INT NOT NULL,
  service VARCHAR(255) NOT NULL,
  doctor VARCHAR(255) NOT NULL,
  date VARCHAR(100) NOT NULL,
  text TEXT NOT NULL,
  helpful INT DEFAULT 0,
  verified TINYINT DEFAULT 1,
  tag VARCHAR(100) DEFAULT NULL,
  source VARCHAR(100) DEFAULT 'google',
  featured TINYINT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Reviews
INSERT INTO reviews_list (name, avatar, rating, service, doctor, date, text, helpful, verified, tag, source, featured) VALUES
('Ayesha Tariq', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80', 5, 'Physiotherapy', 'Dr. Sarah Ahmed', '2 days ago', 'Absolutely phenomenal experience at Vital Physio Hub! The team completely transformed my recovery process after spinal disk decompression.', 47, 1, 'physiotherapy', 'google', 1),
('Bilal Hussain', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80', 5, 'Chiropractic Adjustments', 'Dr. Haseeb Ur Rehman', '1 week ago', 'I was struggling with chronic lumbar instability and radiating back pain. Dr. Haseeb''s adjustments provided instant decompression.', 63, 1, 'chiropractic', 'google', 1);

-- 18. Clinic Settings Table
CREATE TABLE IF NOT EXISTS clinic_settings (
  setting_key VARCHAR(255) PRIMARY KEY,
  setting_value TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Settings
INSERT INTO clinic_settings (setting_key, setting_value) VALUES
('clinic_phone', '+92 300 8786187'),
('clinic_email', 'info@vitalphysiohub.com'),
('clinic_address', 'First Floor, Building 14-B, Main Boulevard, Gulberg, Lahore, Pakistan'),
('clinic_hours', 'Mon - Sat: 09:00 AM - 09:00 PM'),
('ambulance_phone', '+92 (51) 111-911-273'),
('why_us_headline', 'Why Choose Vital Physio Hub?'),
('why_us_description', 'We combine gold-standard physical adjustments with dynamic clinical technologies to ensure faster, safer, and complete muscular rehabilitation.');

-- 19. User Activity Logs Table
CREATE TABLE IF NOT EXISTS user_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  action VARCHAR(255) NOT NULL,
  details TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Activity Logs
INSERT INTO user_logs (user_email, action, details, timestamp) VALUES
('admin@physiohub.com', 'System Initialization', 'Clinic database and seed schemas deployed successfully.', NOW() - INTERVAL 2 HOUR),
('doctor@physiohub.com', 'Specialist Synced', 'Doctor profile synced with administrative registry.', NOW() - INTERVAL 1 HOUR);

-- 20. Registered Clinics Table (Multi-Tenancy)
CREATE TABLE IF NOT EXISTS clinics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  subdomain VARCHAR(100) NOT NULL UNIQUE,
  address VARCHAR(255) DEFAULT NULL,
  status ENUM('Active', 'Suspended') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Default Master Clinic
INSERT INTO clinics (id, name, subdomain, address, status) VALUES
(1, 'Vital Physio Hub', 'vitalphysio', 'Lahore, Pakistan', 'Active')
ON DUPLICATE KEY UPDATE id=id;

