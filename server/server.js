const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const JWT_SECRET = process.env.JWT_SECRET || "premium_secret_key";

let mockUsers = [
  { name: "Jane Doe", email: "patient@physiohub.com", password: "$2b$10$7S8QApO5SaPChSuHmXGrNeDB4tG5cqiQ0qw84tmAWjRVdlpSXAXtS", role: "patient" },
  { name: "Dr. Sarah Ahmed", email: "doctor@physiohub.com", password: "$2b$10$7S8QApO5SaPChSuHmXGrNeDB4tG5cqiQ0qw84tmAWjRVdlpSXAXtS", role: "doctor" },
  { name: "Director Admin", email: "admin@physiohub.com", password: "$2b$10$7S8QApO5SaPChSuHmXGrNeDB4tG5cqiQ0qw84tmAWjRVdlpSXAXtS", role: "admin" },
  { name: "Reception Desk", email: "staff@physiohub.com", password: "$2b$10$7S8QApO5SaPChSuHmXGrNeDB4tG5cqiQ0qw84tmAWjRVdlpSXAXtS", role: "receptionist" }
];

// In-memory fallbacks for appointment, EMR, and prescription storage when MySQL is unconfigured
let mockAppointments = [
  { id: "PC-88201", doctor: "Dr. Sarah Ahmed", date: "15 Jun, 2026", time: "04:30 PM", type: "Video Consultation", branch: "Online", status: "Confirmed", patient: "Jane Doe", payment_status: "Paid" },
  { id: "PC-88202", doctor: "Dr. Omar Farooq", date: "18 Jun, 2026", time: "11:30 AM", type: "In-Person Visit", branch: "Gulberg Branch", status: "Pending", patient: "Jane Doe", payment_status: "Pending Verification" }
];

let mockEMR = [
  { id: "EMR-101", patientId: "Jane Doe", date: "2026-05-15", doctor: "Dr. Sarah Ahmed", diagnosis: "Mild Atopic Dermatitis", vitals: "BP: 120/80, Temp: 98.6°F", assessment: "Patient presented with dry, itchy skin patches. Prescribed topical Hydrozole cream." },
  { id: "EMR-102", patientId: "Jane Doe", date: "2026-06-01", doctor: "Dr. Omar Farooq", diagnosis: "Localized Gingivitis", vitals: "BP: 118/75, Temp: 98.4°F", assessment: "Slight inflammation in upper gums. Completed scaling and advised antiseptic mouthwash twice daily." }
];

let mockPrescriptions = [
  { id: "RX-9901", date: "2026-06-01", doctor: "Dr. Sarah Ahmed", medicine: "Hydrozole Topical Cream", dosage: "Apply twice daily", duration: "7 Days", instructions: "External skin application only", status: "Active" },
  { id: "RX-9902", date: "2026-06-05", doctor: "Dr. Omar Farooq", medicine: "Amoxicillin 500mg", dosage: "1 tablet thrice daily", duration: "5 Days", instructions: "After meals", status: "Active" }
];

let mockInvoices = [
  { id: "INV-5001", description: "Dermatological Laser Consultation", amount: "₨ 3,000", status: "Unpaid", date: "2026-06-10" },
  { id: "INV-5002", description: "Dental Routine Prophylaxis", amount: "₨ 2,500", status: "Paid", date: "2026-06-05" }
];

let mockDoctors = [
  { id: 1, name: "Dr. Sarah Ahmed", specialty: "Skin & Dermatology", fee: "\u20a8 3,000", branch: "Gulberg, DHA", status: "Active", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80", experience: "14 Years", rating: 4.90, title: "MBBS, FCPS (Dermatology)", slug: "dr-sarah-ahmed", available: 1, email: "doctor@physiohub.com", social_linkedin: "https://linkedin.com/in/dr-sarah", social_facebook: "https://facebook.com/dr-sarah", social_instagram: "https://instagram.com/dr-sarah", social_twitter: "https://twitter.com/dr-sarah", whatsapp_number: "03008786187", whatsapp_username: "Dr.SarahAhmed" },
  { id: 2, name: "Dr. Omar Farooq", specialty: "Dental Care", fee: "\u20a8 2,500", branch: "Gulberg", status: "Active", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80", experience: "11 Years", rating: 4.80, title: "BDS, FCPS (Oral Surgery)", slug: "dr-omar-farooq", available: 1, email: "doctor-omar@physiohub.com", social_linkedin: "https://linkedin.com/in/dr-omar", social_facebook: "https://facebook.com/dr-omar", social_instagram: "https://instagram.com/dr-omar", social_twitter: "https://twitter.com/dr-omar", whatsapp_number: "03001234567", whatsapp_username: "Dr.OmarFarooq" },
  { id: 3, name: "Dr. Fatima Malik", specialty: "Gynecology & Obstetrics", fee: "\u20a8 3,500", branch: "DHA", status: "Active", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80", experience: "16 Years", rating: 5.00, title: "MBBS, MRCOG (Gynecology)", slug: "dr-fatima-malik", available: 1, email: "doctor-fatima@physiohub.com", social_linkedin: "https://linkedin.com/in/dr-fatima", social_facebook: "https://facebook.com/dr-fatima", social_instagram: "https://instagram.com/dr-fatima", social_twitter: "https://twitter.com/dr-fatima", whatsapp_number: "03009876543", whatsapp_username: "Dr.FatimaMalik" }
];

let mockBranches = [
  { id: 1, name: "Gulberg", address: "Main Boulevard, Gulberg III", city: "Lahore", clinic_id: 1 },
  { id: 2, name: "DHA", address: "Phase 5, Commercial Zone", city: "Lahore", clinic_id: 1 }
];

let mockUserLogs = [
  { id: 1, user_email: "admin@physiohub.com", action: "System Initialization", details: "Clinic database and seed schemas deployed successfully.", timestamp: new Date(Date.now() - 7200000).toISOString() },
  { id: 2, user_email: "doctor@physiohub.com", action: "Specialist Synced", details: "Doctor profile synced with administrative registry.", timestamp: new Date(Date.now() - 3600000).toISOString() }
];

async function logActivity(email, action, details, clinicId = 1) {
  if (db.isDbEnabled()) {
    try {
      await db.query(
        "INSERT INTO user_logs (user_email, action, details, clinic_id) VALUES (?, ?, ?, ?)",
        [email, action, details, clinicId]
      );
    } catch (e) {
      console.error("Failed to log activity in MySQL:", e.message);
    }
  } else {
    mockUserLogs.unshift({
      id: mockUserLogs.length + 1,
      user_email: email,
      action: action,
      details: details,
      clinic_id: clinicId,
      timestamp: new Date().toISOString()
    });
  }
}

let mockArticles = [
  { id: 1, title: "10 Warning Signs You Should Never Ignore", excerpt: "Critical symptoms that demand immediate medical attention and could save your life.", content: "Your body sends signals before serious conditions develop. Learn to watch for persistent chest pain, sudden numbness, extreme headaches, or unexplained weight loss. Consult our specialists promptly.", category: "General Health", author: "Dr. Sarah Ahmed", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=700&q=80" },
  { id: 2, title: "The Complete Guide to Laser Skin Treatments", excerpt: "Understand how lasers address skin concerns and what results to expect.", content: "From fractional CO2 lasers to PicoSure, skin rejuvenation has advanced dramatically. Understand your skin type, recovery times, and expected sessions before choosing cosmetic therapies.", category: "Skin Care", author: "Dr. Sarah Ahmed", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80" }
];

let mockComments = [
  { id: 1, article_id: 1, author_name: "Jane Doe", comment_text: "Thank you for this informative guide, very helpful!", status: "Approved" },
  { id: 2, article_id: 2, author_name: "Alex Smith", comment_text: "Is laser safe for hyperpigmented skin?", status: "Pending" }
];

let mockProducts = [
  { id: 1, name: "Resistance Bands Set", category: "Rehabilitation", price: 1200, description: "Set of 5 high-quality latex resistance bands with different resistance levels. Perfect for physical therapy, strength training, and rehabilitation.", stock: 25, image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Foam Roller", category: "Recovery", price: 1500, description: "High-density foam roller for muscle massage, trigger point therapy, and physical therapy recovery.", stock: 15, image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Orthopedic Seat Cushion", category: "Supports & Braces", price: 2200, description: "Memory foam seat cushion designed to relieve pressure on the tailbone and improve sitting posture.", stock: 20, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "TENS Unit Muscle Stimulator", category: "Rehabilitation", price: 3500, description: "Dual-channel TENS machine with 8 modes for muscle pain relief, recovery, and electrical muscle stimulation.", stock: 10, image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Hot & Cold Gel Compression Pack", category: "Recovery", price: 950, description: "Reusable gel pack for targeted hot or cold therapy, ideal for reducing swelling, muscle spasms, and joint pain.", stock: 30, image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=400&q=80" }
];

let mockOrders = [];
let mockOrderItems = [];

let mockFaqs = [
  { id: 1, category: "appointments", question: "How do I book an appointment at Vital Physio Hub?", answer: "You can book through our website's booking page, call our helpline at +92-300-8786187, or send us a message on WhatsApp. Online bookings are available 24/7 and confirmed instantly." },
  { id: 2, category: "appointments", question: "Can I choose a specific doctor for my appointment?", answer: "Yes, absolutely. During the booking process you can browse all available doctors, view their profiles, specializations, and available time slots, and select the one that suits you best." },
  { id: 3, category: "appointments", question: "What is your cancellation and rescheduling policy?", answer: "You can cancel or reschedule up to 4 hours before your appointment at no charge. Cancellations within 4 hours may incur a small processing fee. Emergency cancellations are always waived." },
  { id: 4, category: "services", question: "What specialties does Vital Physio Hub offer?", answer: "We offer 8 clinical facilities including Physiotherapy, Chiropractic Adjustments, Cupping, Hijama, Electrotherapy, Kinesio Taping, Fitness Training, and Dry Needling." },
  { id: 5, category: "services", question: "Do you offer online video consultations?", answer: "Yes. Our telemedicine platform supports video, audio, and chat consultations. You can consult with any of our doctors from the comfort of your home via Zoom or our in-app system." },
  { id: 6, category: "billing", question: "What payment methods do you accept?", answer: "We accept JazzCash, Easypaisa, Visa/Mastercard debit & credit cards, bank transfers, and cash. Online appointments can be partially or fully paid in advance through our secure portal." },
  { id: 7, category: "billing", question: "Will I receive an invoice or receipt for my visit?", answer: "A detailed digital invoice is automatically sent to your registered email after every consultation and procedure. You can also access all past invoices from your Patient Portal account." },
  { id: 8, category: "general", question: "What are your clinic timings?", answer: "We are open Monday to Saturday from 09:00 AM to 09:00 PM. Sundays are reserved for emergencies and pre-scheduled sessions only." }
];

let mockGallery = [
  { id: 1, src: "/gallery/Reciption-desk.jpeg", category: "facility", title: "Main Reception Desk", description: "Our main reception area designed to welcome you with a professional and friendly environment.", span: "wide" },
  { id: 2, src: "/gallery/Reciption-desk-view-2.jpeg", category: "facility", title: "Reception Desk Lobby View", description: "A spacious waiting lobby next to the reception counter featuring modern comforts.", span: "normal" },
  { id: 3, src: "/gallery/ceo-room-inside.jpeg", category: "facility", title: "Executive Consultation Room", description: "The primary office where board-certified specialists conduct detailed clinical assessments.", span: "normal" },
  { id: 4, src: "/gallery/gallery-outside-ceo-office.jpeg", category: "facility", title: "Main Walkway and Lounge Corridor", description: "Clean, spacious corridors leading to consulting rooms and therapy bays.", span: "normal" },
  { id: 5, src: "/gallery/patient-bed.jpeg", category: "equipment", title: "Physiotherapy Treatment Bed", description: "Ergonomically designed treatment beds optimized for therapeutic manual manipulation and rehabilitation exercises.", span: "normal" },
  { id: 6, src: "/gallery/patient-bed-view-2.jpeg", category: "equipment", title: "Dedicated Therapy Bay", description: "Private treatment spaces equipped with electrotherapy and support systems for targeted recovery.", span: "normal" },
  { id: 7, src: "/gallery/patient-waiting-launch.jpeg", category: "facility", title: "Patient Waiting Lounge", description: "Comfortable and calming waiting lounge featuring premium amenities and soothing aesthetics.", span: "wide" }
];

let mockCareers = [
  { id: 1, title: "Senior Physiotherapist", department: "Physiotherapy", type: "Full-Time", location: "Lahore (Gulberg)", experience: "5+ years", salary: "PKR 1,50,000 - 2,50,000", deadline: "July 25, 2026", description: "We are looking for a senior manual physical therapist to lead our sports rehab and skeletal adjustments wing. Master's degree or equivalent clinical training required.", requirements: '["DPT or equivalent degree", "Demonstrated experience in manual therapy adjustive techniques", "Excellent diagnostic and patient care abilities", "Strong team coordination skills"]' },
  { id: 2, title: "Chiropractor", department: "Chiropractic", type: "Full-Time", location: "Lahore (DHA)", experience: "3+ years", salary: "PKR 2,00,000 - 3,50,000", deadline: "July 30, 2026", description: "Seeking a certified Chiropractor with hands-on expertise in spinal manipulation, decompression therapy, and posture correction.", requirements: '["Doctor of Chiropractic (DC) or equivalent board certification", "3+ years clinical experience", "Active registration with PMDC", "Familiarity with biomechanical posture mapping"]' }
];

let mockReviews = [
  { id: 1, name: "Ayesha Tariq", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80", rating: 5, service: "Physiotherapy", doctor: "Dr. Sarah Ahmed", date: "2 days ago", text: "Absolutely phenomenal experience at Vital Physio Hub! The team completely transformed my recovery process after spinal disk decompression.", helpful: 47, verified: 1, tag: "physiotherapy", source: "google", featured: 1 },
  { id: 2, name: "Bilal Hussain", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80", rating: 5, service: "Chiropractic Adjustments", doctor: "Dr. Haseeb Ur Rehman", date: "1 week ago", text: "I was struggling with chronic lumbar instability and radiating back pain. Dr. Haseeb's adjustments provided instant decompression.", helpful: 63, verified: 1, tag: "chiropractic", source: "google", featured: 1 }
];

let mockSettings = {
  clinic_phone: "+92 300 8786187",
  clinic_email: "info@vitalphysiohub.com",
  clinic_address: "First Floor, Building 14-B, Main Boulevard, Gulberg, Lahore, Pakistan",
  clinic_hours: "Mon - Sat: 09:00 AM - 09:00 PM",
  ambulance_phone: "+92 (51) 111-911-273",
  why_us_headline: "Why Choose Vital Physio Hub?",
  why_us_description: "We combine gold-standard physical adjustments with dynamic clinical technologies to ensure faster, safer, and complete muscular rehabilitation.",
  hero_title: "Premium Healthcare, Powered by Innovation",
  hero_subtitle: "Book appointments, consult top doctors, and manage your health digitally — all in one beautifully designed platform.",
  about_title: "ABOUT OUR CLINIC",
  about_description: "For over 13 years, we have built a legacy of professional medical care in Karachi — through world-class specialists, modern infrastructure, and a genuinely patient-first culture.",
  about_ceo_vision: "My dream is to create a platform that inspires trust, promotes evidence-based physiotherapy, and positively impacts lives across the world."
};

let mockServices = [
  {
    id: "physiotherapy",
    category: "Physiotherapy",
    tagline: "Restoring Movement, Improving Quality of Life",
    shortDesc: "Comprehensive physical rehabilitation to recover mobility, strength, and function after injury.",
    overview: "Physiotherapy is the core clinical facility at Vital Physio Hub, specializing in dynamic movement restoration. Our certified manual therapists design custom physical rehabilitation programs to target skeletal stiffness, neurological path retraining, and post-surgical functional delays.",
    symptoms: '["Post-surgical stiffness", "Chronic joint dysfunction", "Arthritis limitations", "Muscle weakness", "Gait & balance instability"]',
    benefits: '["Custom recovery timeline", "Manual therapy adjustments", "Skilled guidance & home planning", "Safe non-pharmacological pain relief"]',
    treatments: '["Joint Mobilization", "Therapeutic Exercise", "Postural Correction", "Gait Retraining", "Manual Stretch Therapy"]',
    procedure_text: "Clinical evaluation → Biomechanical mapping → Custom rehab plan → Supervised session → Independent home regime",
    duration: "45 – 60 min",
    recovery: "2 – 12 weeks",
    fee: "₨ 2,500",
    popular: 1,
    type: "therapy",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    gradient: "from-sky-600 to-cyan-400",
    solidColor: "#0ea5e9",
    lightBg: "from-sky-50 to-cyan-50",
    border: "border-sky-200",
    accent: "text-sky-600",
    badgeBg: "bg-sky-100",
    badgeText: "text-sky-700",
    tag: "physiotherapy"
  },
  {
    id: "chiropractic",
    category: "Chiropractic Adjustments",
    tagline: "Realigning Your Spine, Relieving Your Pain",
    shortDesc: "Advanced manual adjustments and spinal decompression therapies for optimal skeletal alignment.",
    overview: "Our chiropractic clinic specializes in safe, hands-on adjustments. We target vertebral subluxation, nerve compressions, and functional pelvic tilts to restore structural homeostasis and eliminate back, neck, and sciatic nerve pain.",
    symptoms: '["Chronic lumbar back pain", "Cervical stiffness & headaches", "Sciatica & radiating leg pain", "Postural imbalances", "Scoliotic pain management"]',
    benefits: '["Instant decompression & relief", "Restored range of motion", "Non-surgical, drug-free protocol", "Female chiropractor specialist available"]',
    treatments: '["Spinal Manipulation", "Lumbar Decompression", "Postural Realignment", "Flexion-Distraction", "Instrument Assisted Adjustments"]',
    procedure_text: "Posture mapping → Spinal palpation → Motion testing → Targeted adjustments → Soft-tissue release → Ergonomic guidance",
    duration: "20 – 30 min",
    recovery: "Immediate recovery",
    fee: "₨ 3,000",
    popular: 1,
    type: "therapy",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=800&q=80",
    gradient: "from-pink-500 to-rose-400",
    solidColor: "#ec4899",
    lightBg: "from-pink-50 to-rose-50",
    border: "border-pink-200",
    accent: "text-pink-600",
    badgeBg: "bg-pink-100",
    badgeText: "text-pink-700",
    tag: "chiropractic"
  },
  {
    id: "hijama",
    category: "Hijama Therapy (Wet Cupping)",
    tagline: "Detoxification According to Prophetic Medicine",
    shortDesc: "Sterile wet cupping treatments to promote detoxification, blood circulation, and general well-being.",
    overview: "We provide clinical wet cupping (Hijama) in a certified sterile environment. Practicing strictly under Prophetic medical guidelines combined with modern anatomical mapping, our specialists perform precise micro-incisions to withdraw cellular debris and inflammatory agents.",
    symptoms: '["Body pain & muscle fatigue", "Poor blood circulation", "Chronic tension headaches", "High blood pressure symptoms", "General lethargy & stress"]',
    benefits: '["Sterile disposable equipment", "Prophetic sunnah days schedule options", "Natural systemic detoxification", "Boosted immune system performance"]',
    treatments: '["Wet Cupping (Hijama)", "Dry Cupping", "Moving Massage Cupping", "Detoxification Therapy", "Pain Management Cupping"]',
    procedure_text: "Skin disinfection → Light dry suction → Sterile micro-scratches → Hijama suction → Antiseptic dressing → Hydration protocol",
    duration: "30 – 45 min",
    recovery: "1 – 3 days",
    fee: "₨ 2,000",
    popular: 1,
    type: "therapy",
    image: "https://images.unsplash.com/photo-1578991624414-276ef23a534f?auto=format&fit=crop&w=800&q=80",
    gradient: "from-purple-600 to-indigo-400",
    solidColor: "#8b5cf6",
    lightBg: "from-purple-50 to-indigo-50",
    border: "border-purple-200",
    accent: "text-purple-600",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-700",
    tag: "hijama"
  },
  {
    id: "electrotherapy",
    category: "Electrotherapy",
    tagline: "Accelerating Healing Through Smart Stimulation",
    shortDesc: "Targeted electrical therapies (TENS, EMS) to manage chronic pain and build muscle function.",
    overview: "Our electrotherapy suite offers cutting-edge modalities like TENS, Interferential Current (IFT), and Electrical Muscle Stimulation (EMS). We use specific therapeutic frequencies to block pain signals and stimulate healing.",
    symptoms: '["Severe muscle spasms", "Acute post-injury pain", "Muscle atrophy", "Chronic neuropathic pain", "Joint inflammation"]',
    benefits: '["Non-addictive pain block", "Rapid swelling reduction", "Complements active rehab", "Adjustable frequency settings"]',
    treatments: '["TENS Stimulation", "Interferential Therapy (IFT)", "EMS Muscle Retraining", "Ultrasound Therapy", "Combined Laser-Electro Therapy"]',
    procedure_text: "Electrode mapping → Skin prep → Freq calibration → Active stimulation → Post-stim check",
    duration: "15 – 30 min",
    recovery: "Immediate recovery",
    fee: "₨ 1,800",
    popular: 0,
    type: "therapy",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
    gradient: "from-amber-600 to-orange-450",
    solidColor: "#d97706",
    lightBg: "from-amber-50 to-orange-50",
    border: "border-amber-200",
    accent: "text-amber-600",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-700",
    tag: "electrotherapy"
  }
];

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Physiohub Scale-Optimized Backend Running");
});

const getClinicId = (req) => {
  return parseInt(req.headers["x-clinic-id"] || "1", 10);
};

let mockClinics = [
  { id: 1, name: "Vital Physio Hub", subdomain: "vitalphysio", address: "Lahore, Pakistan", status: "Active" }
];

// Startup mock data mapper
mockUsers = mockUsers.map((u, idx) => ({ ...u, id: u.id || idx + 1, clinic_id: 1 }));
mockDoctors = mockDoctors.map((d, idx) => ({ ...d, id: d.id || idx + 1, clinic_id: 1 }));
mockAppointments = mockAppointments.map(a => ({ ...a, clinic_id: 1 }));
mockEMR = mockEMR.map(e => ({ ...e, clinic_id: 1 }));
mockPrescriptions = mockPrescriptions.map(p => ({ ...p, clinic_id: 1 }));
mockInvoices = mockInvoices.map(i => ({ ...i, clinic_id: 1 }));
mockArticles = mockArticles.map(a => ({ ...a, clinic_id: 1 }));
mockUserLogs = mockUserLogs.map(l => ({ ...l, clinic_id: 1 }));
let mockSettingsList = [{ clinic_id: 1, settings: mockSettings }];

// 1. Auth Login Simulation (JWT generation)
app.post("/api/auth/login", async (req, res) => {
  const { email, password, role } = req.body;
  const clinicId = getClinicId(req);
  
  if (db.isDbEnabled()) {
    try {
      // Check clinic status
      const clinicRes = await db.query("SELECT status FROM clinics WHERE id = ?", [clinicId]);
      if (clinicRes.length > 0 && clinicRes[0].status === "Suspended") {
        return res.status(403).json({ error: "This clinic has been suspended by the platform administrator. Please contact billing support." });
      }

      const results = await db.query("SELECT * FROM users WHERE email = ? AND role = ? AND clinic_id = ?", [email, role, clinicId]);
      if (results.length > 0) {
        const user = results[0];
        // Secure password check using bcryptjs
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          let doctorStatus = "Active";
          let adminNote = null;
          if (role === "doctor") {
            const docProfile = await db.query("SELECT status, admin_note FROM doctors WHERE email = ? AND clinic_id = ?", [email, clinicId]);
            if (docProfile.length > 0) {
              doctorStatus = docProfile[0].status;
              adminNote = docProfile[0].admin_note;
            }
          }
          await logActivity(user.email, "User Login", `User logged in successfully with role: ${user.role}`, clinicId);
          const token = jwt.sign({ email: user.email, role: user.role, name: user.name, status: doctorStatus, admin_note: adminNote, clinic_id: clinicId }, JWT_SECRET, { expiresIn: "24h" });
          return res.json({
            success: true,
            token,
            user: { email: user.email, role: user.role, name: user.name, status: doctorStatus, admin_note: adminNote, clinic_id: clinicId }
          });
        } else {
          return res.status(401).json({ error: "Invalid password. Please try again." });
        }
      }
      return res.status(401).json({ error: "This email is not registered for the selected clinic & role. Please sign up first." });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  } else {
    // Local memory fallback credentials check
    const clinic = mockClinics.find(c => c.id === clinicId);
    if (clinic && clinic.status === "Suspended") {
      return res.status(403).json({ error: "This clinic has been suspended by the platform administrator. Please contact billing support." });
    }
    const user = mockUsers.find(u => u.email === email && u.role === role && (u.clinic_id || 1) === clinicId);
    if (!user) {
      return res.status(401).json({ error: "This email is not registered for the selected clinic & role. Please sign up first." });
    }
    // Secure password check using bcryptjs
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password. Please try again." });
    }
    let doctorStatus = "Active";
    let adminNote = null;
    if (role === "doctor") {
      const docProfile = mockDoctors.find(d => d.email?.toLowerCase() === email.toLowerCase() && (d.clinic_id || 1) === clinicId);
      if (docProfile) {
        doctorStatus = docProfile.status;
        adminNote = docProfile.admin_note;
      }
    }
    await logActivity(user.email, "User Login", `User logged in successfully with role: ${user.role} (Mock)`, clinicId);
    const token = jwt.sign({ email: user.email, role: user.role, name: user.name, status: doctorStatus, admin_note: adminNote, clinic_id: clinicId }, JWT_SECRET, { expiresIn: "24h" });
    res.json({
      success: true,
      token,
      user: {
        email: user.email,
        role: user.role,
        name: user.name,
        status: doctorStatus,
        admin_note: adminNote,
        clinic_id: clinicId
      }
    });
  }
});

// 1b. Signup Endpoint
app.post("/api/auth/signup", async (req, res) => {
  const { 
    name, email, password, role, specialty, branch, fee, experience, title, image,
    cv_file, cv_name, certificates_file, certificates_name, degrees_file, degrees_name, rewards_file, rewards_name,
    social_linkedin, social_facebook, social_instagram, social_twitter
  } = req.body;
  
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (role !== "patient" && role !== "doctor") {
    return res.status(403).json({ error: "Registration is restricted to Patients and Doctors only. Administrative credentials must be provisioned internally." });
  }

  if (db.isDbEnabled()) {
    try {
      // Check if user already exists
      const existing = await db.query("SELECT 1 FROM users WHERE email = ?", [email]);
      if (existing.length > 0) {
        return res.status(400).json({ error: "Email is already registered" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert into users
      await db.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, role]
      );

      // If doctor, insert pending profile into doctors registry
      if (role === "doctor") {
        const docName = name.startsWith("Dr.") ? name : `Dr. ${name}`;
        const docSlug = name.toLowerCase().replace(/\s+/g, "-");
        const docImg = image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80";
        await db.query(
          `INSERT INTO doctors (
            name, specialty, fee, branch, status, image, experience, rating, title, slug, available, email,
            cv_file, cv_name, certificates_file, certificates_name, degrees_file, degrees_name, rewards_file, rewards_name,
            social_linkedin, social_facebook, social_instagram, social_twitter
          ) VALUES (?, ?, ?, ?, 'Pending', ?, ?, 4.8, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            docName, specialty || "Physical Therapy", `₨ ${fee || "2,500"}`, branch || "Gulberg", docImg, experience || "10 Years", title || "Consultant", docSlug, email,
            cv_file || null, cv_name || null, certificates_file || null, certificates_name || null, degrees_file || null, degrees_name || null, rewards_file || null, rewards_name || null,
            social_linkedin || null, social_facebook || null, social_instagram || null, social_twitter || null
          ]
        );
      }
      await logActivity(email, "User Registered", `Registered new account with role: ${role}`);
      return res.json({ success: true, message: "User registered successfully" });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  } else {
    // Mock memory simulation fallback
    const existing = mockUsers.find(u => u.email === email);
    if (existing) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    mockUsers.push({ name, email, password: hashedPassword, role });

    if (role === "doctor") {
      const docName = name.startsWith("Dr.") ? name : `Dr. ${name}`;
      const docSlug = name.toLowerCase().replace(/\s+/g, "-");
      const docImg = image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80";
      mockDoctors.push({
        id: mockDoctors.length + 1,
        name: docName,
        specialty: specialty || "Physical Therapy",
        fee: `₨ ${fee || "2,500"}`,
        branch: branch || "Gulberg",
        status: "Pending", // Needs activation
        image: docImg,
        experience: experience || "10 Years",
        rating: 4.8,
        title: title || "Consultant",
        slug: docSlug,
        available: 1,
        email,
        cv_file: cv_file || null,
        cv_name: cv_name || null,
        certificates_file: certificates_file || null,
        certificates_name: certificates_name || null,
        degrees_file: degrees_file || null,
        degrees_name: degrees_name || null,
        rewards_file: rewards_file || null,
        rewards_name: rewards_name || null,
        social_linkedin: social_linkedin || null,
        social_facebook: social_facebook || null,
        social_instagram: social_instagram || null,
        social_twitter: social_twitter || null,
        admin_note: null
      });
    }
    await logActivity(email, "User Registered", `Registered new account with role: ${role} (Mock)`);
    return res.json({ success: true, message: "User registered successfully (Mock fallback)" });
  }
});

// 2. Fetch Appointments
app.get("/api/appointments", async (req, res) => {
  const clinicId = getClinicId(req);
  if (db.isDbEnabled()) {
    try {
      const results = await db.query("SELECT * FROM appointments WHERE clinic_id = ? ORDER BY created_at DESC", [clinicId]);
      // Map columns to match frontend
      const mapped = results.map(row => ({
        id: row.id,
        doctor: row.doctor_name,
        date: row.date,
        time: row.time,
        type: row.type,
        branch: row.branch,
        status: row.status,
        patient: row.patient_name,
        payment_status: row.payment_status,
        payment_method: row.payment_method,
        payment_screenshot: row.payment_screenshot,
        admin_note: row.admin_note,
        patient_report: row.patient_report,
        patient_report_name: row.patient_report_name,
        consult_channel: row.consult_channel || null,
        meeting_credentials: row.meeting_credentials || null
      }));
      res.json(mapped);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.json(mockAppointments.filter(appt => (appt.clinic_id || 1) === clinicId));
  }
});

// 3. Create Appointment
app.post("/api/appointments", async (req, res) => {
  const { doctor, date, time, type, branch, status, patient, payment_status, payment_method, payment_screenshot, patient_report, patient_report_name, consult_channel } = req.body;
  const clinicId = getClinicId(req);
  const newAppt = {
    id: `PC-${Date.now().toString().slice(-5)}`,
    doctor: doctor,
    date,
    time,
    type,
    branch,
    status: status || "Pending",
    patient: patient || "Jane Doe",
    payment_status: payment_status || "Pending Verification",
    payment_method: payment_method || null,
    payment_screenshot: payment_screenshot || null,
    admin_note: null,
    patient_report: patient_report || null,
    patient_report_name: patient_report_name || null,
    consult_channel: consult_channel || null,
    meeting_credentials: null,
    clinic_id: clinicId
  };

  if (db.isDbEnabled()) {
    try {
      await db.query(
        "INSERT INTO appointments (id, doctor_name, date, time, type, branch, status, patient_name, payment_status, payment_method, payment_screenshot, patient_report, patient_report_name, consult_channel, meeting_credentials, clinic_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [newAppt.id, doctor, date, time, type, branch, newAppt.status, newAppt.patient, newAppt.payment_status, newAppt.payment_method, newAppt.payment_screenshot, newAppt.patient_report, newAppt.patient_report_name, newAppt.consult_channel, null, clinicId]
      );
      res.json({ success: true, appointment: newAppt });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockAppointments.unshift(newAppt);
    res.json({ success: true, appointment: newAppt });
  }
});

// 4. Update Appointment status
app.post("/api/appointments/status", async (req, res) => {
  const { id, status, date, time } = req.body;
  const clinicId = getClinicId(req);
  if (db.isDbEnabled()) {
    try {
      if (date && time) {
        await db.query("UPDATE appointments SET status = ?, date = ?, time = ? WHERE id = ? AND clinic_id = ?", [status, date, time, id, clinicId]);
      } else {
        await db.query("UPDATE appointments SET status = ? WHERE id = ? AND clinic_id = ?", [status, id, clinicId]);
      }
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockAppointments = mockAppointments.map(appt => 
      appt.id === id && (appt.clinic_id || 1) === clinicId
        ? { ...appt, status, ...(date ? { date } : {}), ...(time ? { time } : {}) } 
        : appt
    );
    res.json({ success: true });
  }
});

// 4b. Approve/Reject Appointment Payment (Forward or Cancel)
app.post("/api/appointments/approve-payment", async (req, res) => {
  const { id, status, admin_note } = req.body;
  const clinicId = getClinicId(req);
  const targetPaymentStatus = status === "Paid" ? "Paid" : "Rejected";
  const targetApptStatus = status === "Paid" ? "Confirmed" : "Cancelled";
  
  if (db.isDbEnabled()) {
    try {
      await db.query(
        "UPDATE appointments SET payment_status = ?, status = ?, admin_note = ? WHERE id = ? AND clinic_id = ?",
        [targetPaymentStatus, targetApptStatus, admin_note || null, id, clinicId]
      );
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockAppointments = mockAppointments.map(appt => 
      appt.id === id && (appt.clinic_id || 1) === clinicId
        ? { ...appt, payment_status: targetPaymentStatus, status: targetApptStatus, admin_note: admin_note || null } 
        : appt
    );
    res.json({ success: true });
  }
});

// 4c. Update Appointment Payment Screenshot Proof
app.post("/api/appointments/proof", async (req, res) => {
  const { id, method, screenshot } = req.body;
  if (!id) return res.status(400).json({ error: "Appointment ID is required" });
  const clinicId = getClinicId(req);

  if (db.isDbEnabled()) {
    try {
      await db.query(
        "UPDATE appointments SET payment_status = 'Pending Verification', payment_method = ?, payment_screenshot = ? WHERE id = ? AND clinic_id = ?",
        [method, screenshot, id, clinicId]
      );
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockAppointments = mockAppointments.map(appt => 
      appt.id === id && (appt.clinic_id || 1) === clinicId
        ? { ...appt, payment_status: "Pending Verification", payment_method: method, payment_screenshot: screenshot } 
        : appt
    );
    res.json({ success: true });
  }
});

// 4d. Assign Meeting Credentials (Doctor assigns meeting link/ID)
app.post("/api/appointments/meeting-credentials", async (req, res) => {
  const { id, meeting_credentials } = req.body;
  if (!id || !meeting_credentials) return res.status(400).json({ error: "Appointment ID and credentials are required" });
  const clinicId = getClinicId(req);
  if (db.isDbEnabled()) {
    try {
      await db.query(
        "UPDATE appointments SET meeting_credentials = ? WHERE id = ? AND clinic_id = ?",
        [meeting_credentials, id, clinicId]
      );
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockAppointments = mockAppointments.map(appt =>
      appt.id === id && (appt.clinic_id || 1) === clinicId
        ? { ...appt, meeting_credentials }
        : appt
    );
    res.json({ success: true });
  }
});

// ── BRANCHES ──────────────────────────────────────────────────────

// GET all branches
app.get("/api/branches", async (req, res) => {
  const clinicId = getClinicId(req);
  if (db.isDbEnabled()) {
    try {
      const results = await db.query("SELECT * FROM branches WHERE clinic_id = ? ORDER BY id ASC", [clinicId]);
      res.json(results);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.json(mockBranches.filter(b => (b.clinic_id || 1) === clinicId));
  }
});

// POST create branch
app.post("/api/branches", async (req, res) => {
  const { name, address, city } = req.body;
  if (!name) return res.status(400).json({ error: "Branch name is required" });
  const clinicId = getClinicId(req);
  if (db.isDbEnabled()) {
    try {
      const result = await db.query(
        "INSERT INTO branches (name, address, city, clinic_id) VALUES (?, ?, ?, ?)",
        [name, address || "", city || "", clinicId]
      );
      res.json({ success: true, branch: { id: result.insertId, name, address, city, clinic_id: clinicId } });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    const newBranch = { id: mockBranches.length + 1, name, address: address || "", city: city || "", clinic_id: clinicId };
    mockBranches.push(newBranch);
    res.json({ success: true, branch: newBranch });
  }
});

// PUT update branch
app.put("/api/branches/:id", async (req, res) => {
  const { id } = req.params;
  const { name, address, city } = req.body;
  const clinicId = getClinicId(req);
  if (db.isDbEnabled()) {
    try {
      await db.query(
        "UPDATE branches SET name = ?, address = ?, city = ? WHERE id = ? AND clinic_id = ?",
        [name, address || "", city || "", id, clinicId]
      );
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockBranches = mockBranches.map(b => parseInt(b.id) === parseInt(id) ? { ...b, name, address: address || "", city: city || "" } : b);
    res.json({ success: true });
  }
});

// DELETE branch
app.delete("/api/branches/:id", async (req, res) => {
  const { id } = req.params;
  const clinicId = getClinicId(req);
  if (db.isDbEnabled()) {
    try {
      await db.query("DELETE FROM branches WHERE id = ? AND clinic_id = ?", [id, clinicId]);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockBranches = mockBranches.filter(b => parseInt(b.id) !== parseInt(id));
    res.json({ success: true });
  }
});


app.get("/api/emr/:patientName", async (req, res) => {
  const { patientName } = req.params;
  const clinicId = getClinicId(req);
  if (db.isDbEnabled()) {
    try {
      const results = await db.query(
        "SELECT * FROM emr_records WHERE patient_name = ? AND clinic_id = ? ORDER BY date DESC",
        [patientName, clinicId]
      );
      const mapped = results.map(row => ({
        id: row.id,
        date: row.date.toISOString().split("T")[0],
        doctor: row.doctor_name,
        diagnosis: row.diagnosis,
        vitals: row.vitals,
        assessment: row.assessment
      }));
      res.json(mapped);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    const filtered = mockEMR.filter(
      (rec) => ((rec.patientId.toLowerCase() === patientName.toLowerCase() || patientName === "me" || patientName === "all") && (rec.clinic_id || 1) === clinicId)
    );
    res.json(filtered);
  }
});

// 6. Append Doctor EMR Record
app.post("/api/emr", async (req, res) => {
  const { patientName, doctor, diagnosis, vitals, assessment } = req.body;
  const clinicId = getClinicId(req);
  const newRec = {
    id: `EMR-${Date.now().toString().slice(-3)}`,
    date: new Date().toISOString().split("T")[0],
    doctor: doctor,
    diagnosis,
    vitals: vitals || "BP: 120/80, Temp: 98.6°F",
    assessment,
    clinic_id: clinicId
  };

  if (db.isDbEnabled()) {
    try {
      await db.query(
        "INSERT INTO emr_records (id, patient_name, doctor_name, date, diagnosis, vitals, assessment, clinic_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [newRec.id, patientName || "Jane Doe", doctor, newRec.date, diagnosis, newRec.vitals, assessment, clinicId]
      );
      res.json({ success: true, record: newRec });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    const legacyRec = { ...newRec, patientId: patientName || "Jane Doe" };
    mockEMR.unshift(legacyRec);
    res.json({ success: true, record: legacyRec });
  }
});

// 7. Fetch Prescriptions (Rx)
app.get("/api/prescriptions/:patientName", async (req, res) => {
  const { patientName } = req.params;
  const clinicId = getClinicId(req);
  if (db.isDbEnabled()) {
    try {
      const results = await db.query(
        "SELECT * FROM prescriptions WHERE patient_name = ? AND clinic_id = ? ORDER BY date DESC",
        [patientName, clinicId]
      );
      const mapped = results.map(row => ({
        id: row.id,
        date: row.date.toISOString().split("T")[0],
        doctor: row.doctor_name,
        medicine: row.medicine,
        dosage: row.dosage,
        duration: row.duration,
        instructions: row.instructions,
        status: row.status
      }));
      res.json(mapped);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.json(mockPrescriptions.filter(rx => (rx.clinic_id || 1) === clinicId));
  }
});

// 8. Create Prescription
app.post("/api/prescriptions", async (req, res) => {
  const { patientName, doctor, medicine, dosage, duration, instructions } = req.body;
  const clinicId = getClinicId(req);
  const newRx = {
    id: `RX-${Date.now().toString().slice(-4)}`,
    date: new Date().toISOString().split("T")[0],
    doctor: doctor,
    medicine,
    dosage,
    duration: duration || "7 Days",
    instructions: instructions || "After meals",
    status: "Active",
    clinic_id: clinicId
  };

  if (db.isDbEnabled()) {
    try {
      await db.query(
        "INSERT INTO prescriptions (id, patient_name, doctor_name, date, medicine, dosage, duration, instructions, status, clinic_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [newRx.id, patientName || "Jane Doe", doctor, newRx.date, medicine, dosage, newRx.duration, newRx.instructions, newRx.status, clinicId]
      );
      res.json({ success: true, prescription: newRx });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockPrescriptions.unshift(newRx);
    res.json({ success: true, prescription: newRx });
  }
});

// 9. Fetch Invoices
app.get("/api/invoices/:patientName", async (req, res) => {
  const { patientName } = req.params;
  const clinicId = getClinicId(req);
  if (db.isDbEnabled()) {
    try {
      const results = await db.query(
        "SELECT * FROM invoices WHERE patient_name = ? AND clinic_id = ? ORDER BY date DESC",
        [patientName, clinicId]
      );
      const mapped = results.map(row => ({
        id: row.id,
        description: row.description,
        amount: row.amount,
        status: row.status,
        date: row.date.toISOString().split("T")[0]
      }));
      res.json(mapped);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.json(mockInvoices.filter(inv => (inv.clinic_id || 1) === clinicId));
  }
});

// 10. Create Invoice
app.post("/api/invoices", async (req, res) => {
  const { patientName, description, amount, status } = req.body;
  const clinicId = getClinicId(req);
  const newInv = {
    id: `INV-${Date.now().toString().slice(-4)}`,
    description,
    amount,
    status: status || "Unpaid",
    date: new Date().toISOString().split("T")[0],
    clinic_id: clinicId
  };

  if (db.isDbEnabled()) {
    try {
      await db.query(
        "INSERT INTO invoices (id, patient_name, description, amount, status, date, clinic_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [newInv.id, patientName || "Jane Doe", description, amount, newInv.status, newInv.date, clinicId]
      );
      res.json({ success: true, invoice: newInv });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockInvoices.unshift(newInv);
    res.json({ success: true, invoice: newInv });
  }
});

// 11. Pay Invoice (Mark paid)
app.post("/api/invoices/pay", async (req, res) => {
  const { id } = req.body;
  const clinicId = getClinicId(req);
  if (db.isDbEnabled()) {
    try {
      await db.query("UPDATE invoices SET status = 'Paid' WHERE id = ? AND clinic_id = ?", [id, clinicId]);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockInvoices = mockInvoices.map(inv => (inv.id === id && (inv.clinic_id || 1) === clinicId) ? { ...inv, status: "Paid" } : inv);
    res.json({ success: true });
  }
});

// 12. Fetch Doctors
app.get("/api/doctors", async (req, res) => {
  const clinicId = getClinicId(req);
  if (db.isDbEnabled()) {
    try {
      const results = await db.query("SELECT * FROM doctors WHERE clinic_id = ? ORDER BY id ASC", [clinicId]);
      res.json(results);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.json(mockDoctors.filter(d => (d.clinic_id || 1) === clinicId));
  }
});

// 13. Create Doctor CRUD
app.post("/api/doctors", async (req, res) => {
  const { name, specialty, fee, branch, image, experience, rating, title, slug, whatsapp_number, whatsapp_username } = req.body;
  const clinicId = getClinicId(req);
  const docImg = image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80";
  const docExp = experience || "10 Years";
  const docTitle = title || "Consultant Specialist";
  const docSlug = slug || name.toLowerCase().replace(/\s+/g, "-");
  const docRating = rating || 4.80;

  if (db.isDbEnabled()) {
    try {
      const results = await db.query(
        "INSERT INTO doctors (name, specialty, fee, branch, status, image, experience, rating, title, slug, available, whatsapp_number, whatsapp_username, clinic_id) VALUES (?, ?, ?, ?, 'Active', ?, ?, ?, ?, ?, 1, ?, ?, ?)",
        [name, specialty, fee, branch, docImg, docExp, docRating, docTitle, docSlug, whatsapp_number || null, whatsapp_username || null, clinicId]
      );
      res.json({ success: true, doctor: { id: results.insertId, name, specialty, fee, branch, status: "Active", image: docImg, experience: docExp, rating: docRating, title: docTitle, slug: docSlug, available: 1, whatsapp_number, whatsapp_username, clinic_id: clinicId } });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    const newDoc = { id: mockDoctors.length + 1, name, specialty, fee, branch, status: "Active", image: docImg, experience: docExp, rating: docRating, title: docTitle, slug: docSlug, available: 1, whatsapp_number: whatsapp_number || "", whatsapp_username: whatsapp_username || "", clinic_id: clinicId };
    mockDoctors.push(newDoc);
    res.json({ success: true, doctor: newDoc });
  }
});

// 14. Toggle Doctor Status
app.post("/api/doctors/status", async (req, res) => {
  const { id, status, admin_note } = req.body;
  if (db.isDbEnabled()) {
    try {
      await db.query("UPDATE doctors SET status = ?, admin_note = ? WHERE id = ?", [status, admin_note || null, id]);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockDoctors = mockDoctors.map(doc => doc.id === parseInt(id) ? { ...doc, status, admin_note: admin_note || null } : doc);
    res.json({ success: true });
  }
});

// 14a. Resubmit Doctor Application
app.post("/api/doctors/resubmit", async (req, res) => {
  const {
    id, email,
    cv_file, cv_name,
    certificates_file, certificates_name,
    degrees_file, degrees_name,
    rewards_file, rewards_name
  } = req.body;

  if (db.isDbEnabled()) {
    try {
      let queryStr = "UPDATE doctors SET status = 'Pending', admin_note = NULL";
      const params = [];
      
      if (cv_file !== undefined) {
        queryStr += ", cv_file = ?, cv_name = ?";
        params.push(cv_file, cv_name || null);
      }
      if (certificates_file !== undefined) {
        queryStr += ", certificates_file = ?, certificates_name = ?";
        params.push(certificates_file, certificates_name || null);
      }
      if (degrees_file !== undefined) {
        queryStr += ", degrees_file = ?, degrees_name = ?";
        params.push(degrees_file, degrees_name || null);
      }
      if (rewards_file !== undefined) {
        queryStr += ", rewards_file = ?, rewards_name = ?";
        params.push(rewards_file, rewards_name || null);
      }

      if (id) {
        queryStr += " WHERE id = ?";
        params.push(id);
      } else if (email) {
        queryStr += " WHERE email = ?";
        params.push(email);
      } else {
        return res.status(400).json({ error: "Doctor ID or Email is required for resubmission." });
      }

      await db.query(queryStr, params);
      res.json({ success: true, message: "Application resubmitted successfully" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    // Mock
    mockDoctors = mockDoctors.map(doc => {
      const match = (id && doc.id === parseInt(id)) || (email && doc.email?.toLowerCase() === email.toLowerCase());
      if (match) {
        const updated = {
          ...doc,
          status: "Pending",
          admin_note: null
        };
        if (cv_file !== undefined) {
          updated.cv_file = cv_file;
          updated.cv_name = cv_name || null;
        }
        if (certificates_file !== undefined) {
          updated.certificates_file = certificates_file;
          updated.certificates_name = certificates_name || null;
        }
        if (degrees_file !== undefined) {
          updated.degrees_file = degrees_file;
          updated.degrees_name = degrees_name || null;
        }
        if (rewards_file !== undefined) {
          updated.rewards_file = rewards_file;
          updated.rewards_name = rewards_name || null;
        }
        return updated;
      }
      return doc;
    });
    res.json({ success: true, message: "Application resubmitted successfully (Mock fallback)" });
  }
});

// 14b. Update Doctor profile details
app.post("/api/doctors/update", async (req, res) => {
  const { 
    id, name, specialty, fee, branch, image, experience, rating, title, slug,
    email, social_linkedin, social_facebook, social_instagram, social_twitter,
    cv_file, cv_name, certificates_file, certificates_name, degrees_file, degrees_name, rewards_file, rewards_name,
    status, admin_note, whatsapp_number, whatsapp_username
  } = req.body;
  if (db.isDbEnabled()) {
    try {
      await db.query(
        `UPDATE doctors SET 
          name = ?, specialty = ?, fee = ?, branch = ?, image = ?, experience = ?, rating = ?, title = ?, slug = ?,
          email = ?, social_linkedin = ?, social_facebook = ?, social_instagram = ?, social_twitter = ?,
          cv_file = ?, cv_name = ?, certificates_file = ?, certificates_name = ?, degrees_file = ?, degrees_name = ?, rewards_file = ?, rewards_name = ?,
          status = ?, admin_note = ?, whatsapp_number = ?, whatsapp_username = ?
         WHERE id = ?`,
        [
          name, specialty, fee, branch, image, experience, rating || null, title, slug,
          email || null, social_linkedin || null, social_facebook || null, social_instagram || null, social_twitter || null,
          cv_file || null, cv_name || null, certificates_file || null, certificates_name || null, degrees_file || null, degrees_name || null, rewards_file || null, rewards_name || null,
          status || 'Active', admin_note || null, whatsapp_number || null, whatsapp_username || null,
          id
        ]
      );
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockDoctors = mockDoctors.map(doc => 
      doc.id === parseInt(id) 
        ? { 
            ...doc, 
            name, specialty, fee, branch, image, experience, rating: parseFloat(rating) || doc.rating, title, slug,
            email: email !== undefined ? email : doc.email,
            social_linkedin: social_linkedin !== undefined ? social_linkedin : doc.social_linkedin,
            social_facebook: social_facebook !== undefined ? social_facebook : doc.social_facebook,
            social_instagram: social_instagram !== undefined ? social_instagram : doc.social_instagram,
            social_twitter: social_twitter !== undefined ? social_twitter : doc.social_twitter,
            cv_file: cv_file !== undefined ? cv_file : doc.cv_file,
            cv_name: cv_name !== undefined ? cv_name : doc.cv_name,
            certificates_file: certificates_file !== undefined ? certificates_file : doc.certificates_file,
            certificates_name: certificates_name !== undefined ? certificates_name : doc.certificates_name,
            degrees_file: degrees_file !== undefined ? degrees_file : doc.degrees_file,
            degrees_name: degrees_name !== undefined ? degrees_name : doc.degrees_name,
            rewards_file: rewards_file !== undefined ? rewards_file : doc.rewards_file,
            rewards_name: rewards_name !== undefined ? rewards_name : doc.rewards_name,
            status: status !== undefined ? status : doc.status,
            admin_note: admin_note !== undefined ? admin_note : doc.admin_note,
            whatsapp_number: whatsapp_number !== undefined ? whatsapp_number : doc.whatsapp_number,
            whatsapp_username: whatsapp_username !== undefined ? whatsapp_username : doc.whatsapp_username
          } 
        : doc
    );
    res.json({ success: true });
  }
});

// 14c. Delete Doctor profile
app.delete("/api/doctors/:id", async (req, res) => {
  const { id } = req.params;
  if (db.isDbEnabled()) {
    try {
      await db.query("DELETE FROM doctors WHERE id = ?", [id]);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockDoctors = mockDoctors.filter(doc => doc.id !== parseInt(id));
    res.json({ success: true });
  }
});

// 15. Articles API (Blog posts)
app.get("/api/articles", async (req, res) => {
  if (db.isDbEnabled()) {
    try {
      const results = await db.query("SELECT * FROM articles ORDER BY created_at DESC");
      res.json(results);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.json(mockArticles);
  }
});

app.post("/api/articles", async (req, res) => {
  const { title, excerpt, content, category, author, image, type, html_content } = req.body;
  const artImg = image || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=700&q=80";
  const artType = type || "blog";
  const newArt = {
    id: Date.now(),
    title,
    excerpt,
    content,
    html_content: html_content || null,
    category: category || "General Health",
    author: author || "Director Admin",
    image: artImg,
    type: artType
  };
  if (db.isDbEnabled()) {
    try {
      const results = await db.query(
        "INSERT INTO articles (title, excerpt, content, html_content, category, author, image, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [title, excerpt, content, html_content || null, newArt.category, newArt.author, artImg, artType]
      );
      newArt.id = results.insertId;
      res.json({ success: true, article: newArt });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockArticles.unshift(newArt);
    res.json({ success: true, article: newArt });
  }
});

app.delete("/api/articles/:id", async (req, res) => {
  const { id } = req.params;
  if (db.isDbEnabled()) {
    try {
      await db.query("DELETE FROM articles WHERE id = ?", [id]);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockArticles = mockArticles.filter(art => art.id !== parseInt(id));
    res.json({ success: true });
  }
});

// 16. Comments API (Moderation system)
app.get("/api/comments", async (req, res) => {
  if (db.isDbEnabled()) {
    try {
      const results = await db.query("SELECT * FROM article_comments ORDER BY created_at DESC");
      res.json(results);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.json(mockComments);
  }
});

app.post("/api/comments", async (req, res) => {
  const { articleId, authorName, commentText } = req.body;
  const newComm = {
    id: Date.now(),
    article_id: articleId,
    author_name: authorName,
    comment_text: commentText,
    status: "Pending"
  };
  if (db.isDbEnabled()) {
    try {
      const results = await db.query(
        "INSERT INTO article_comments (article_id, author_name, comment_text, status) VALUES (?, ?, ?, 'Pending')",
        [articleId, authorName, commentText]
      );
      newComm.id = results.insertId;
      res.json({ success: true, comment: newComm });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockComments.unshift(newComm);
    res.json({ success: true, comment: newComm });
  }
});

app.post("/api/comments/status", async (req, res) => {
  const { id, status } = req.body; // Approved / Rejected
  if (db.isDbEnabled()) {
    try {
      await db.query("UPDATE article_comments SET status = ? WHERE id = ?", [status, id]);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockComments = mockComments.map(c => c.id === parseInt(id) ? { ...c, status } : c);
    res.json({ success: true });
  }
});

app.delete("/api/comments/:id", async (req, res) => {
  const { id } = req.params;
  if (db.isDbEnabled()) {
    try {
      await db.query("DELETE FROM article_comments WHERE id = ?", [id]);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockComments = mockComments.filter(c => c.id !== parseInt(id));
    res.json({ success: true });
  }
});

// --- SHOP E-COMMERCE API ENDPOINTS ---

// 17. Fetch Products
app.get("/api/products", async (req, res) => {
  if (db.isDbEnabled()) {
    try {
      const results = await db.query("SELECT * FROM products ORDER BY id ASC");
      res.json(results);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.json(mockProducts);
  }
});

// 18. Create Product
app.post("/api/products", async (req, res) => {
  const { name, category, price, description, stock, image } = req.body;
  const prodImg = image || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80";
  const prodStock = stock !== undefined ? parseInt(stock) : 10;
  const prodPrice = parseInt(price) || 1000;

  if (db.isDbEnabled()) {
    try {
      const results = await db.query(
        "INSERT INTO products (name, category, price, description, stock, image) VALUES (?, ?, ?, ?, ?, ?)",
        [name, category, prodPrice, description, prodStock, prodImg]
      );
      res.json({
        success: true,
        product: { id: results.insertId, name, category, price: prodPrice, description, stock: prodStock, image: prodImg }
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    const newProduct = {
      id: mockProducts.length > 0 ? Math.max(...mockProducts.map(p => p.id)) + 1 : 1,
      name,
      category,
      price: prodPrice,
      description,
      stock: prodStock,
      image: prodImg
    };
    mockProducts.push(newProduct);
    res.json({ success: true, product: newProduct });
  }
});

// 19. Update Product
app.post("/api/products/update", async (req, res) => {
  const { id, name, category, price, description, stock, image } = req.body;
  const prodPrice = parseInt(price);
  const prodStock = parseInt(stock);

  if (db.isDbEnabled()) {
    try {
      await db.query(
        "UPDATE products SET name = ?, category = ?, price = ?, description = ?, stock = ?, image = ? WHERE id = ?",
        [name, category, prodPrice, description, prodStock, image, id]
      );
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockProducts = mockProducts.map(p =>
      p.id === parseInt(id)
        ? { ...p, name, category, price: prodPrice, description, stock: prodStock, image }
        : p
    );
    res.json({ success: true });
  }
});

// 20. Delete Product
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  if (db.isDbEnabled()) {
    try {
      await db.query("DELETE FROM products WHERE id = ?", [id]);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockProducts = mockProducts.filter(p => p.id !== parseInt(id));
    res.json({ success: true });
  }
});

// 21. Fetch Orders (Admin)
app.get("/api/orders", async (req, res) => {
  if (db.isDbEnabled()) {
    try {
      const orders = await db.query("SELECT * FROM shop_orders ORDER BY created_at DESC");
      const items = await db.query("SELECT * FROM order_items");
      const mapped = orders.map(o => ({
        id: o.id,
        patient_name: o.patient_name,
        patient_email: o.patient_email,
        shipping_address: o.shipping_address,
        phone: o.phone,
        total_amount: o.total_amount,
        payment_method: o.payment_method,
        payment_status: o.payment_status,
        payment_screenshot: o.payment_screenshot,
        order_status: o.order_status,
        admin_note: o.admin_note,
        created_at: o.created_at,
        items: items.filter(i => i.order_id === o.id).map(i => ({
          product_id: i.product_id,
          product_name: i.product_name,
          price: i.price,
          quantity: i.quantity
        }))
      }));
      res.json(mapped);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    const mapped = mockOrders.map(o => ({
      ...o,
      items: mockOrderItems.filter(i => i.order_id === o.id)
    }));
    res.json(mapped);
  }
});

// 22. Submit Order
app.post("/api/orders", async (req, res) => {
  const { patient_name, patient_email, shipping_address, phone, total_amount, payment_method, payment_screenshot, items } = req.body;
  const orderId = `ORD-${Date.now().toString().slice(-5)}`;
  const initialPaymentStatus = payment_method === "COD" ? "Unpaid" : (payment_screenshot ? "Pending Verification" : "Unpaid");
  
  const newOrder = {
    id: orderId,
    patient_name,
    patient_email,
    shipping_address,
    phone,
    total_amount: parseInt(total_amount),
    payment_method,
    payment_status: initialPaymentStatus,
    payment_screenshot: payment_screenshot || null,
    order_status: "Pending",
    admin_note: null,
    created_at: new Date().toISOString()
  };

  if (db.isDbEnabled()) {
    try {
      await db.query(
        "INSERT INTO shop_orders (id, patient_name, patient_email, shipping_address, phone, total_amount, payment_method, payment_status, payment_screenshot, order_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')",
        [orderId, patient_name, patient_email, shipping_address, phone, newOrder.total_amount, payment_method, initialPaymentStatus, newOrder.payment_screenshot]
      );
      for (const item of items) {
        await db.query(
          "INSERT INTO order_items (order_id, product_id, product_name, price, quantity) VALUES (?, ?, ?, ?, ?)",
          [orderId, item.product_id, item.product_name, parseInt(item.price), parseInt(item.quantity)]
        );
        // Decrease stock
        await db.query("UPDATE products SET stock = GREATEST(0, stock - ?) WHERE id = ?", [parseInt(item.quantity), item.product_id]);
      }
      res.json({ success: true, orderId });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockOrders.unshift(newOrder);
    for (const item of items) {
      mockOrderItems.push({
        order_id: orderId,
        product_id: parseInt(item.product_id),
        product_name: item.product_name,
        price: parseInt(item.price),
        quantity: parseInt(item.quantity)
      });
      // Decrease stock in mock
      const p = mockProducts.find(prod => prod.id === parseInt(item.product_id));
      if (p) {
        p.stock = Math.max(0, p.stock - parseInt(item.quantity));
      }
    }
    res.json({ success: true, orderId });
  }
});

// 23. Upload Order Payment Proof
app.post("/api/orders/proof", async (req, res) => {
  const { id, method, screenshot } = req.body;
  if (!id) return res.status(400).json({ error: "Order ID is required" });

  if (db.isDbEnabled()) {
    try {
      await db.query(
        "UPDATE shop_orders SET payment_status = 'Pending Verification', payment_method = ?, payment_screenshot = ? WHERE id = ?",
        [method, screenshot, id]
      );
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockOrders = mockOrders.map(o => 
      o.id === id 
        ? { ...o, payment_status: "Pending Verification", payment_method: method, payment_screenshot: screenshot } 
        : o
    );
    res.json({ success: true });
  }
});

// 24. Update Order Shipping Status
app.post("/api/orders/status", async (req, res) => {
  const { id, status } = req.body;
  if (db.isDbEnabled()) {
    try {
      await db.query("UPDATE shop_orders SET order_status = ? WHERE id = ?", [status, id]);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockOrders = mockOrders.map(o => o.id === id ? { ...o, order_status: status } : o);
    res.json({ success: true });
  }
});

// 25. Approve/Reject Order Payment
app.post("/api/orders/approve-payment", async (req, res) => {
  const { id, status, admin_note } = req.body; // status is Paid / Rejected
  const targetPaymentStatus = status === "Paid" ? "Paid" : "Rejected";
  
  if (db.isDbEnabled()) {
    try {
      await db.query(
        "UPDATE shop_orders SET payment_status = ?, admin_note = ? WHERE id = ?",
        [targetPaymentStatus, admin_note || null, id]
      );
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockOrders = mockOrders.map(o => 
      o.id === id 
        ? { ...o, payment_status: targetPaymentStatus, admin_note: admin_note || null } 
        : o
    );
    res.json({ success: true });
  }
});

// 26. Track Order
app.get("/api/orders/track/:orderId", async (req, res) => {
  const { orderId } = req.params;
  if (db.isDbEnabled()) {
    try {
      const orders = await db.query("SELECT * FROM shop_orders WHERE id = ?", [orderId]);
      if (orders.length === 0) return res.status(404).json({ error: "Order not found" });
      const order = orders[0];
      const items = await db.query("SELECT * FROM order_items WHERE order_id = ?", [orderId]);
      res.json({
        ...order,
        items: items.map(i => ({
          product_id: i.product_id,
          product_name: i.product_name,
          price: i.price,
          quantity: i.quantity
        }))
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    const order = mockOrders.find(o => o.id.toLowerCase() === orderId.toLowerCase());
    if (!order) return res.status(404).json({ error: "Order not found" });
    const items = mockOrderItems.filter(i => i.order_id.toLowerCase() === orderId.toLowerCase());
    res.json({ ...order, items });
  }
});

// 27. CMS FAQs Endpoints
app.get("/api/faqs", async (req, res) => {
  if (db.isDbEnabled()) {
    try {
      const results = await db.query("SELECT * FROM faqs ORDER BY id ASC");
      res.json(results);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.json(mockFaqs);
  }
});

app.post("/api/faqs", async (req, res) => {
  const { id, category, question, answer } = req.body;
  if (db.isDbEnabled()) {
    try {
      if (id) {
        await db.query("UPDATE faqs SET category = ?, question = ?, answer = ? WHERE id = ?", [category, question, answer, id]);
        res.json({ success: true, faq: { id, category, question, answer } });
      } else {
        const result = await db.query("INSERT INTO faqs (category, question, answer) VALUES (?, ?, ?)", [category, question, answer]);
        res.json({ success: true, faq: { id: result.insertId, category, question, answer } });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    if (id) {
      mockFaqs = mockFaqs.map(f => f.id === parseInt(id) ? { ...f, category, question, answer } : f);
      res.json({ success: true, faq: { id: parseInt(id), category, question, answer } });
    } else {
      const newFaq = { id: mockFaqs.length > 0 ? Math.max(...mockFaqs.map(f => f.id)) + 1 : 1, category, question, answer };
      mockFaqs.push(newFaq);
      res.json({ success: true, faq: newFaq });
    }
  }
});

app.delete("/api/faqs/:id", async (req, res) => {
  const { id } = req.params;
  if (db.isDbEnabled()) {
    try {
      await db.query("DELETE FROM faqs WHERE id = ?", [id]);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockFaqs = mockFaqs.filter(f => f.id !== parseInt(id));
    res.json({ success: true });
  }
});

// 28. CMS Gallery Endpoints
app.get("/api/gallery", async (req, res) => {
  if (db.isDbEnabled()) {
    try {
      const results = await db.query("SELECT * FROM gallery_items ORDER BY id ASC");
      res.json(results);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.json(mockGallery);
  }
});

app.post("/api/gallery", async (req, res) => {
  const { id, src, category, title, description, span } = req.body;
  if (db.isDbEnabled()) {
    try {
      if (id) {
        await db.query("UPDATE gallery_items SET src = ?, category = ?, title = ?, description = ?, span = ? WHERE id = ?", [src, category, title, description, span || 'normal', id]);
        res.json({ success: true, item: { id, src, category, title, description, span } });
      } else {
        const result = await db.query("INSERT INTO gallery_items (src, category, title, description, span) VALUES (?, ?, ?, ?, ?)", [src, category, title, description, span || 'normal']);
        res.json({ success: true, item: { id: result.insertId, src, category, title, description, span } });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    if (id) {
      mockGallery = mockGallery.map(g => g.id === parseInt(id) ? { ...g, src, category, title, description, span } : g);
      res.json({ success: true, item: { id: parseInt(id), src, category, title, description, span } });
    } else {
      const newImg = { id: mockGallery.length > 0 ? Math.max(...mockGallery.map(g => g.id)) + 1 : 1, src, category, title, description, span: span || 'normal' };
      mockGallery.push(newImg);
      res.json({ success: true, item: newImg });
    }
  }
});

app.delete("/api/gallery/:id", async (req, res) => {
  const { id } = req.params;
  if (db.isDbEnabled()) {
    try {
      await db.query("DELETE FROM gallery_items WHERE id = ?", [id]);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockGallery = mockGallery.filter(g => g.id !== parseInt(id));
    res.json({ success: true });
  }
});

// 29. CMS Careers Endpoints
app.get("/api/careers", async (req, res) => {
  if (db.isDbEnabled()) {
    try {
      const results = await db.query("SELECT * FROM careers_jobs ORDER BY id ASC");
      const mapped = results.map(job => {
        let reqArr = [];
        try {
          reqArr = typeof job.requirements === 'string' ? JSON.parse(job.requirements) : job.requirements;
        } catch(e) {
          reqArr = [job.requirements];
        }
        return {
          ...job,
          requirements: reqArr
        };
      });
      res.json(mapped);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    const mapped = mockCareers.map(job => {
      let reqArr = [];
      try {
        reqArr = typeof job.requirements === 'string' ? JSON.parse(job.requirements) : job.requirements;
      } catch(e) {
        reqArr = [job.requirements];
      }
      return { ...job, requirements: reqArr };
    });
    res.json(mapped);
  }
});

app.post("/api/careers", async (req, res) => {
  const { id, title, department, type, location, experience, salary, deadline, description, requirements } = req.body;
  const reqStr = Array.isArray(requirements) ? JSON.stringify(requirements) : (requirements || "[]");
  if (db.isDbEnabled()) {
    try {
      if (id) {
        await db.query("UPDATE careers_jobs SET title = ?, department = ?, type = ?, location = ?, experience = ?, salary = ?, deadline = ?, description = ?, requirements = ? WHERE id = ?", [title, department, type, location, experience, salary, deadline, description, reqStr, id]);
        res.json({ success: true, job: { id, title, department, type, location, experience, salary, deadline, description, requirements } });
      } else {
        const result = await db.query("INSERT INTO careers_jobs (title, department, type, location, experience, salary, deadline, description, requirements) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [title, department, type, location, experience, salary, deadline, description, reqStr]);
        res.json({ success: true, job: { id: result.insertId, title, department, type, location, experience, salary, deadline, description, requirements } });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    if (id) {
      mockCareers = mockCareers.map(c => c.id === parseInt(id) ? { ...c, title, department, type, location, experience, salary, deadline, description, requirements: reqStr } : c);
      res.json({ success: true, job: { id: parseInt(id), title, department, type, location, experience, salary, deadline, description, requirements } });
    } else {
      const newJob = { id: mockCareers.length > 0 ? Math.max(...mockCareers.map(c => c.id)) + 1 : 1, title, department, type, location, experience, salary, deadline, description, requirements: reqStr };
      mockCareers.push(newJob);
      res.json({ success: true, job: { ...newJob, requirements } });
    }
  }
});

app.delete("/api/careers/:id", async (req, res) => {
  const { id } = req.params;
  if (db.isDbEnabled()) {
    try {
      await db.query("DELETE FROM careers_jobs WHERE id = ?", [id]);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockCareers = mockCareers.filter(c => c.id !== parseInt(id));
    res.json({ success: true });
  }
});

// 30. CMS Services Endpoints
app.get("/api/services", async (req, res) => {
  if (db.isDbEnabled()) {
    try {
      const results = await db.query("SELECT * FROM services ORDER BY id ASC");
      const mapped = results.map(s => {
        let sym = [];
        let ben = [];
        let trt = [];
        try { sym = typeof s.symptoms === 'string' ? JSON.parse(s.symptoms) : s.symptoms; } catch(e) { sym = [s.symptoms]; }
        try { ben = typeof s.benefits === 'string' ? JSON.parse(s.benefits) : s.benefits; } catch(e) { ben = [s.benefits]; }
        try { trt = typeof s.treatments === 'string' ? JSON.parse(s.treatments) : s.treatments; } catch(e) { trt = [s.treatments]; }
        return {
          ...s,
          symptoms: sym,
          benefits: ben,
          treatments: trt,
          popular: s.popular ? 1 : 0
        };
      });
      res.json(mapped);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    const mapped = mockServices.map(s => {
      let sym = [];
      let ben = [];
      let trt = [];
      try { sym = typeof s.symptoms === 'string' ? JSON.parse(s.symptoms) : s.symptoms; } catch(e) { sym = s.symptoms; }
      try { ben = typeof s.benefits === 'string' ? JSON.parse(s.benefits) : s.benefits; } catch(e) { ben = s.benefits; }
      try { trt = typeof s.treatments === 'string' ? JSON.parse(s.treatments) : s.treatments; } catch(e) { trt = s.treatments; }
      return {
        ...s,
        symptoms: sym,
        benefits: ben,
        treatments: trt
      };
    });
    res.json(mapped);
  }
});

app.post("/api/services", async (req, res) => {
  const { id, category, tagline, shortDesc, overview, symptoms, benefits, treatments, procedure_text, duration, recovery, fee, popular, type, image, gradient, solidColor, lightBg, border, accent, badgeBg, badgeText, tag } = req.body;
  const symStr = Array.isArray(symptoms) ? JSON.stringify(symptoms) : (symptoms || "[]");
  const benStr = Array.isArray(benefits) ? JSON.stringify(benefits) : (benefits || "[]");
  const trtStr = Array.isArray(treatments) ? JSON.stringify(treatments) : (treatments || "[]");
  const isPopular = popular ? 1 : 0;
  
  if (db.isDbEnabled()) {
    try {
      const existing = await db.query("SELECT 1 FROM services WHERE id = ?", [id]);
      if (existing.length > 0) {
        await db.query(
          "UPDATE services SET category = ?, tagline = ?, shortDesc = ?, overview = ?, symptoms = ?, benefits = ?, treatments = ?, procedure_text = ?, duration = ?, recovery = ?, fee = ?, popular = ?, type = ?, image = ?, gradient = ?, solidColor = ?, lightBg = ?, border = ?, accent = ?, badgeBg = ?, badgeText = ?, tag = ? WHERE id = ?",
          [category, tagline, shortDesc, overview, symStr, benStr, trtStr, procedure_text, duration, recovery, fee, isPopular, type || 'therapy', image, gradient, solidColor, lightBg, border, accent, badgeBg, badgeText, tag, id]
        );
      } else {
        await db.query(
          "INSERT INTO services (id, category, tagline, shortDesc, overview, symptoms, benefits, treatments, procedure_text, duration, recovery, fee, popular, type, image, gradient, solidColor, lightBg, border, accent, badgeBg, badgeText, tag) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [id, category, tagline, shortDesc, overview, symStr, benStr, trtStr, procedure_text, duration, recovery, fee, isPopular, type || 'therapy', image, gradient, solidColor, lightBg, border, accent, badgeBg, badgeText, tag]
        );
      }
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    const existingIndex = mockServices.findIndex(s => s.id === id);
    const serviceItem = { id, category, tagline, shortDesc, overview, symptoms, benefits, treatments, procedure_text, duration, recovery, fee, popular: isPopular, type: type || 'therapy', image, gradient, solidColor, lightBg, border, accent, badgeBg, badgeText, tag };
    if (existingIndex > -1) {
      mockServices[existingIndex] = serviceItem;
    } else {
      mockServices.push(serviceItem);
    }
    res.json({ success: true, service: serviceItem });
  }
});

app.delete("/api/services/:id", async (req, res) => {
  const { id } = req.params;
  if (db.isDbEnabled()) {
    try {
      await db.query("DELETE FROM services WHERE id = ?", [id]);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockServices = mockServices.filter(s => s.id !== id);
    res.json({ success: true });
  }
});

// 31. CMS Reviews Endpoints
app.get("/api/reviews", async (req, res) => {
  if (db.isDbEnabled()) {
    try {
      const results = await db.query("SELECT * FROM reviews_list ORDER BY id DESC");
      res.json(results);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.json(mockReviews);
  }
});

app.post("/api/reviews", async (req, res) => {
  const { id, name, avatar, rating, service, doctor, date, text, helpful, verified, tag, source, featured } = req.body;
  const isVerified = verified ? 1 : 0;
  const isFeatured = featured ? 1 : 0;
  if (db.isDbEnabled()) {
    try {
      if (id) {
        await db.query(
          "UPDATE reviews_list SET name = ?, avatar = ?, rating = ?, service = ?, doctor = ?, date = ?, text = ?, helpful = ?, verified = ?, tag = ?, source = ?, featured = ? WHERE id = ?",
          [name, avatar, parseInt(rating), service, doctor, date, text, parseInt(helpful || 0), isVerified, tag, source || 'google', isFeatured, id]
        );
        res.json({ success: true });
      } else {
        const result = await db.query(
          "INSERT INTO reviews_list (name, avatar, rating, service, doctor, date, text, helpful, verified, tag, source, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [name, avatar, parseInt(rating), service, doctor, date, text, parseInt(helpful || 0), isVerified, tag, source || 'google', isFeatured]
        );
        res.json({ success: true, id: result.insertId });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    if (id) {
      mockReviews = mockReviews.map(r => r.id === parseInt(id) ? { ...r, name, avatar, rating: parseInt(rating), service, doctor, date, text, helpful: parseInt(helpful || 0), verified: isVerified, tag, source: source || 'google', featured: isFeatured } : r);
      res.json({ success: true });
    } else {
      const newReview = { id: mockReviews.length > 0 ? Math.max(...mockReviews.map(r => r.id)) + 1 : 1, name, avatar, rating: parseInt(rating), service, doctor, date, text, helpful: parseInt(helpful || 0), verified: isVerified, tag, source: source || 'google', featured: isFeatured };
      mockReviews.unshift(newReview);
      res.json({ success: true, review: newReview });
    }
  }
});

app.delete("/api/reviews/:id", async (req, res) => {
  const { id } = req.params;
  if (db.isDbEnabled()) {
    try {
      await db.query("DELETE FROM reviews_list WHERE id = ?", [id]);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockReviews = mockReviews.filter(r => r.id !== parseInt(id));
    res.json({ success: true });
  }
});

// 32. CMS Clinic Settings Endpoints
app.get("/api/settings", async (req, res) => {
  const clinicId = getClinicId(req);
  if (db.isDbEnabled()) {
    try {
      const results = await db.query("SELECT * FROM clinic_settings WHERE clinic_id = ?", [clinicId]);
      const settingsObj = {};
      results.forEach(row => {
        settingsObj[row.setting_key] = row.setting_value;
      });
      const finalSettings = { ...mockSettings, ...settingsObj };
      res.json(finalSettings);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.json(mockSettings);
  }
});

app.post("/api/settings", async (req, res) => {
  const settingsData = req.body;
  const clinicId = getClinicId(req);
  if (db.isDbEnabled()) {
    try {
      if (settingsData.settings && typeof settingsData.settings === 'object') {
        for (const [key, val] of Object.entries(settingsData.settings)) {
          await db.query(
            "INSERT INTO clinic_settings (setting_key, setting_value, clinic_id) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE setting_value = ?",
            [key, val, clinicId, val]
          );
        }
      } else if (settingsData.setting_key || settingsData.key) {
        const key = settingsData.setting_key || settingsData.key;
        const val = settingsData.setting_value || settingsData.value;
        await db.query(
          "INSERT INTO clinic_settings (setting_key, setting_value, clinic_id) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE setting_value = ?",
          [key, val, clinicId, val]
        );
      }
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    if (settingsData.settings && typeof settingsData.settings === 'object') {
      mockSettings = { ...mockSettings, ...settingsData.settings };
    } else if (settingsData.setting_key || settingsData.key) {
      const key = settingsData.setting_key || settingsData.key;
      const val = settingsData.setting_value || settingsData.value;
      mockSettings[key] = val;
    }
    res.json({ success: true, settings: mockSettings });
  }
});

// 17. User Management CRUD & Logs Endpoints
app.get("/api/users", async (req, res) => {
  const clinicId = getClinicId(req);
  if (db.isDbEnabled()) {
    try {
      const results = await db.query("SELECT id, name, email, role FROM users WHERE clinic_id = ? ORDER BY id ASC", [clinicId]);
      res.json(results);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    const sanitized = mockUsers.filter(u => (u.clinic_id || 1) === clinicId).map((u, index) => ({ id: u.id || index + 1, name: u.name, email: u.email, role: u.role }));
    res.json(sanitized);
  }
});

app.post("/api/users", async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const adminEmail = req.headers["x-admin-email"] || "admin@physiohub.com";
  const clinicId = getClinicId(req);
  
  if (db.isDbEnabled()) {
    try {
      const existing = await db.query("SELECT 1 FROM users WHERE email = ? AND clinic_id = ?", [email, clinicId]);
      if (existing.length > 0) {
        return res.status(400).json({ error: "Email is already registered" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const results = await db.query(
        "INSERT INTO users (name, email, password, role, clinic_id) VALUES (?, ?, ?, ?, ?)",
        [name, email, hashedPassword, role, clinicId]
      );
      
      if (role === "doctor") {
        const docName = name.startsWith("Dr.") ? name : `Dr. ${name}`;
        const docSlug = name.toLowerCase().replace(/\s+/g, "-");
        await db.query(
          "INSERT INTO doctors (name, specialty, fee, branch, status, image, experience, rating, title, slug, available, email, clinic_id) VALUES (?, 'Physical Therapy', '₨ 2,500', 'Gulberg', 'Active', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80', '10 Years', 4.8, 'Consultant Specialist', ?, 1, ?, ?)",
          [docName, docSlug, email, clinicId]
        );
      }
      
      await logActivity(adminEmail, "User Created", `Registered new ${role}: ${email}`);
      res.json({ success: true, user: { id: results.insertId, name, email, role } });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    const existing = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && (u.clinic_id || 1) === clinicId);
    if (existing) {
      return res.status(400).json({ error: "Email is already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: mockUsers.length + 1, name, email, password: hashedPassword, role, clinic_id: clinicId };
    mockUsers.push(newUser);
    
    if (role === "doctor") {
      const docName = name.startsWith("Dr.") ? name : `Dr. ${name}`;
      const docSlug = name.toLowerCase().replace(/\s+/g, "-");
      mockDoctors.push({
        id: mockDoctors.length + 1,
        name: docName,
        specialty: "Physical Therapy",
        fee: "₨ 2,500",
        branch: "Gulberg",
        status: "Active",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
        experience: "10 Years",
        rating: 4.8,
        title: "Consultant Specialist",
        slug: docSlug,
        available: 1,
        email: email,
        clinic_id: clinicId
      });
    }
    
    await logActivity(adminEmail, "User Created", `Registered new ${role}: ${email} (Mock)`);
    res.json({ success: true, user: { id: newUser.id, name, email, role } });
  }
});

app.post("/api/users/update", async (req, res) => {
  const { id, name, email, role } = req.body;
  if (!id || !name || !email || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const adminEmail = req.headers["x-admin-email"] || "admin@physiohub.com";
  
  if (db.isDbEnabled()) {
    try {
      await db.query(
        "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?",
        [name, email, role, id]
      );
      if (role === "doctor") {
        await db.query("UPDATE doctors SET name = ? WHERE email = ?", [name, email]);
      }
      await logActivity(adminEmail, "User Updated", `Modified profile of ${email} (${role})`);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    const user = mockUsers.find((u, index) => u.id === id || index + 1 === id);
    if (user) {
      user.name = name;
      user.email = email;
      user.role = role;
      if (role === "doctor") {
        const doc = mockDoctors.find(d => d.email?.toLowerCase() === email.toLowerCase());
        if (doc) doc.name = name;
      }
      await logActivity(adminEmail, "User Updated", `Modified profile of ${email} (${role}) (Mock)`);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  }
});

app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const adminEmail = req.headers["x-admin-email"] || "admin@physiohub.com";
  
  if (db.isDbEnabled()) {
    try {
      const results = await db.query("SELECT email FROM users WHERE id = ?", [id]);
      if (results.length > 0) {
        const targetEmail = results[0].email;
        await db.query("DELETE FROM users WHERE id = ?", [id]);
        await db.query("DELETE FROM doctors WHERE email = ?", [targetEmail]);
        await logActivity(adminEmail, "User Deleted", `Revoked access for user ${targetEmail}`);
      }
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    const idx = mockUsers.findIndex((u, index) => u.id == id || index + 1 == id);
    if (idx !== -1) {
      const targetEmail = mockUsers[idx].email;
      mockUsers.splice(idx, 1);
      const docIdx = mockDoctors.findIndex(d => d.email?.toLowerCase() === targetEmail.toLowerCase());
      if (docIdx !== -1) {
        mockDoctors.splice(docIdx, 1);
      }
      await logActivity(adminEmail, "User Deleted", `Revoked access for user ${targetEmail} (Mock)`);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  }
});

app.get("/api/users/logs", async (req, res) => {
  const clinicId = getClinicId(req);
  if (db.isDbEnabled()) {
    try {
      const results = await db.query("SELECT * FROM user_logs WHERE clinic_id = ? ORDER BY id DESC LIMIT 200", [clinicId]);
      res.json(results);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.json(mockUserLogs.filter(l => (l.clinic_id || 1) === clinicId));
  }
});

// 18. SaaS Clinics Endpoints (Multi-Tenancy)
app.get("/api/clinics", async (req, res) => {
  if (db.isDbEnabled()) {
    try {
      const results = await db.query("SELECT * FROM clinics ORDER BY id ASC");
      res.json(results);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.json(mockClinics);
  }
});

app.post("/api/clinics", async (req, res) => {
  const { name, subdomain, address, adminName, adminEmail, adminPassword } = req.body;
  if (!name || !subdomain || !adminName || !adminEmail || !adminPassword) {
    return res.status(400).json({ error: "Clinic name, subdomain, admin details are required" });
  }
  
  if (db.isDbEnabled()) {
    try {
      const existing = await db.query("SELECT 1 FROM clinics WHERE subdomain = ?", [subdomain]);
      if (existing.length > 0) {
        return res.status(400).json({ error: "Clinic subdomain is already registered" });
      }
      
      const clinicResult = await db.query(
        "INSERT INTO clinics (name, subdomain, address, status) VALUES (?, ?, ?, 'Active')",
        [name, subdomain, address || ""]
      );
      const newClinicId = clinicResult.insertId;
      
      const defaultSettings = [
        ['clinic_phone', '+92 300 0000000'],
        ['clinic_email', adminEmail],
        ['clinic_address', address || 'Clinic Address'],
        ['clinic_hours', 'Mon - Sat: 09:00 AM - 09:00 PM'],
        ['ambulance_phone', '+92 (51) 111-911-273'],
        ['why_us_headline', 'Why Choose Our Clinic?'],
        ['why_us_description', 'We combine gold-standard clinical practices with dynamic rehabilitation technologies to ensure faster, safer, and complete rehabilitation.']
      ];
      for (const [key, val] of defaultSettings) {
        await db.query("INSERT INTO clinic_settings (setting_key, setting_value, clinic_id) VALUES (?, ?, ?)", [key, val, newClinicId]);
      }
      
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await db.query(
        "INSERT INTO users (name, email, password, role, clinic_id) VALUES (?, ?, ?, 'admin', ?)",
        [adminName, adminEmail, hashedPassword, newClinicId]
      );
      
      await logActivity(adminEmail, "Clinic Registered", `SaaS registered new clinic network: ${name} (ID: ${newClinicId})`, 1);
      res.json({ success: true, clinicId: newClinicId });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    const existing = mockClinics.find(c => c.subdomain.toLowerCase() === subdomain.toLowerCase());
    if (existing) {
      return res.status(400).json({ error: "Clinic subdomain is already registered" });
    }
    const newClinicId = mockClinics.length + 1;
    const newClinic = { id: newClinicId, name, subdomain, address: address || "", status: "Active" };
    mockClinics.push(newClinic);
    
    mockSettingsList.push({
      clinic_id: newClinicId,
      settings: {
        clinic_phone: "+92 300 0000000",
        clinic_email: adminEmail,
        clinic_address: address || "Clinic Address",
        clinic_hours: "Mon - Sat: 09:00 AM - 09:00 PM",
        ambulance_phone: "+92 (51) 111-911-273",
        why_us_headline: "Why Choose Our Clinic?",
        why_us_description: "We combine gold-standard clinical practices with dynamic rehabilitation technologies to ensure faster, safer, and complete rehabilitation."
      }
    });
    
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    mockUsers.push({
      id: mockUsers.length + 1,
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      clinic_id: newClinicId
    });
    
    await logActivity(adminEmail, "Clinic Registered", `SaaS registered new clinic network: ${name} (ID: ${newClinicId}) (Mock)`, 1);
    res.json({ success: true, clinicId: newClinicId });
  }
});

app.post("/api/clinics/status", async (req, res) => {
  const { id, status } = req.body;
  if (!id || !status) {
    return res.status(400).json({ error: "Clinic ID and status are required" });
  }
  const adminEmail = req.headers["x-admin-email"] || "admin@physiohub.com";
  
  if (db.isDbEnabled()) {
    try {
      await db.query("UPDATE clinics SET status = ? WHERE id = ?", [status, id]);
      await logActivity(adminEmail, "Clinic Status Modified", `Modified status of clinic ID ${id} to ${status}`, 1);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    const clinic = mockClinics.find(c => c.id == id);
    if (clinic) {
      clinic.status = status;
      await logActivity(adminEmail, "Clinic Status Modified", `Modified status of clinic ID ${id} to ${status} (Mock)`, 1);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Clinic not found" });
    }
  }
});

app.post("/api/newsletter/subscribe", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  const clinicId = req.headers["x-clinic-id"] || 1;
  if (db.isDbEnabled()) {
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) NOT NULL,
          clinic_id INT DEFAULT 1,
          subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE KEY unique_email_clinic (email, clinic_id)
        )
      `);
      await db.query("INSERT IGNORE INTO newsletter_subscribers (email, clinic_id) VALUES (?, ?)", [email, clinicId]);
      res.json({ success: true, message: "Subscribed successfully!" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    console.log("[Mock Newsletter] Subscribed email: " + email + " for clinic ID: " + clinicId);
    res.json({ success: true, message: "Subscribed successfully (Mock)!" });
  }
});

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
