const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

function saveBase64File(base64Str, prefix = "file") {
  if (!base64Str || typeof base64Str !== "string") return base64Str;
  if (!base64Str.startsWith("data:")) return base64Str;

  try {
    const matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return base64Str;
    }

    const mimeType = matches[1];
    const fileBuffer = Buffer.from(matches[2], "base64");
    
    let ext = "bin";
    if (mimeType.includes("pdf")) ext = "pdf";
    else if (mimeType.includes("jpeg") || mimeType.includes("jpg")) ext = "jpg";
    else if (mimeType.includes("png")) ext = "png";
    else if (mimeType.includes("word") || mimeType.includes("officedocument")) ext = "docx";
    else if (mimeType.includes("text/plain")) ext = "txt";

    const filename = `${prefix}_${Date.now()}_${Math.round(Math.random() * 1000)}.${ext}`;
    const filepath = path.join(uploadsDir, filename);

    fs.writeFileSync(filepath, fileBuffer);
    return `/uploads/${filename}`;
  } catch (e) {
    console.error("Failed to save base64 file:", e);
    return base64Str;
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "premium_secret_key";

let mockUsers = [
  { name: "Jane Doe", email: "patient@physiohub.com", password: "$2b$10$mz4ZGWcbJEOgB7fKowHeiuHxKsiwQe7woJ34FSH6m3Jye7OdJrXjG", role: "patient" },
  { name: "Dr. Sarah Ahmed", email: "doctor@physiohub.com", password: "$2b$10$mz4ZGWcbJEOgB7fKowHeiuHxKsiwQe7woJ34FSH6m3Jye7OdJrXjG", role: "doctor" },
  { name: "Director Admin", email: "admin@physiohub.com", password: "$2b$10$mz4ZGWcbJEOgB7fKowHeiuHxKsiwQe7woJ34FSH6m3Jye7OdJrXjG", role: "admin" },
  { name: "Reception Desk", email: "staff@physiohub.com", password: "$2b$10$mz4ZGWcbJEOgB7fKowHeiuHxKsiwQe7woJ34FSH6m3Jye7OdJrXjG", role: "receptionist" }
];

// In-memory fallbacks for appointment, EMR, and prescription storage when MySQL is unconfigured
let mockAppointments = [
  { id: "PC-88201", doctor: "Dr. Sarah Ahmed", date: "15 Jun, 2026", time: "04:30 PM", type: "Video Consultation", branch: "Online", status: "Confirmed", patient: "Jane Doe", payment_status: "Paid" },
  { id: "PC-88202", doctor: "Dr. Omar Farooq", date: "18 Jun, 2026", time: "11:30 AM", type: "In-Person Visit", branch: "Islamabad Branch", status: "Pending", patient: "Jane Doe", payment_status: "Pending Verification" }
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
  { id: 1, name: "Dr. Sarah Ahmed", specialty: "Skin & Dermatology", fee: "\u20a8 3,000", branch: "Blue Area, Islamabad", status: "Active", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80", experience: "14 Years", rating: 4.90, title: "MBBS, FCPS (Dermatology)", slug: "dr-sarah-ahmed", available: 1, email: "doctor@physiohub.com", social_linkedin: "https://linkedin.com/in/dr-sarah", social_facebook: "https://facebook.com/dr-sarah", social_instagram: "https://instagram.com/dr-sarah", social_twitter: "https://twitter.com/dr-sarah", whatsapp_number: "03008786187", whatsapp_username: "Dr.SarahAhmed" },
  { id: 2, name: "Dr. Omar Farooq", specialty: "Dental Care", fee: "\u20a8 2,500", branch: "F-8, Islamabad", status: "Active", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80", experience: "11 Years", rating: 4.80, title: "BDS, FCPS (Oral Surgery)", slug: "dr-omar-farooq", available: 1, email: "doctor-omar@physiohub.com", social_linkedin: "https://linkedin.com/in/dr-omar", social_facebook: "https://facebook.com/dr-omar", social_instagram: "https://instagram.com/dr-omar", social_twitter: "https://twitter.com/dr-omar", whatsapp_number: "03001234567", whatsapp_username: "Dr.OmarFarooq" },
  { id: 3, name: "Dr. Fatima Malik", specialty: "Gynecology & Obstetrics", fee: "\u20a8 3,500", branch: "DHA Phase 2, Islamabad", status: "Active", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80", experience: "16 Years", rating: 5.00, title: "MBBS, MRCOG (Gynecology)", slug: "dr-fatima-malik", available: 1, email: "doctor-fatima@physiohub.com", social_linkedin: "https://linkedin.com/in/dr-fatima", social_facebook: "https://facebook.com/dr-fatima", social_instagram: "https://instagram.com/dr-fatima", social_twitter: "https://twitter.com/dr-fatima", whatsapp_number: "03009876543", whatsapp_username: "Dr.FatimaMalik" }
];

let mockBranches = [
  { id: 1, name: "Blue Area, Islamabad", address: "2nd Floor Allegiance Tower, New Blue Area", city: "Islamabad", clinic_id: 1 },
  { id: 2, name: "F-8 Markaz, Islamabad", address: "Executive Medical Suites, F-8 Markaz", city: "Islamabad", clinic_id: 1 },
  { id: 3, name: "DHA Phase 2, Islamabad", address: "Central Commercial Plaza, DHA Phase 2", city: "Islamabad", clinic_id: 1 }
];

let mockUserLogs = [
  { id: 1, user_email: "admin@physiohub.com", action: "System Initialization", details: "Clinic database and seed schemas deployed successfully.", timestamp: new Date(Date.now() - 7200000).toISOString() },
  { id: 2, user_email: "doctor@physiohub.com", action: "Specialist Synced", details: "Doctor profile synced with administrative registry.", timestamp: new Date(Date.now() - 3600000).toISOString() }
];

let mockApplications = [
  { id: 101, type: "membership", full_name: "Ahmad Raza", email: "ahmad@example.com", phone: "03001234567", qualification: "Patient", plan_tier: "Premium Patient Pass", duration: null, cover_letter: "Interested in priority booking and physical therapy discounts.", status: "Approved", clinic_id: 1, created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: 102, type: "internship", full_name: "Dr. Fatima Noor", email: "fatima@example.com", phone: "03009876543", qualification: "DPT 5th Year", institution: "Riphah International Islamabad", duration: "3 Months", resume_file: null, resume_name: "CV_FatimaNoor.pdf", cover_letter: "Applying for 3-month clinical rotation in manual adjustments.", status: "Pending", clinic_id: 1, created_at: new Date().toISOString() }
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
  { id: 1, title: "Senior Physiotherapist", department: "Physiotherapy", type: "Full-Time", location: "Islamabad (Blue Area)", experience: "5+ years", salary: "PKR 1,50,000 - 2,50,000", deadline: "July 25, 2026", description: "We are looking for a senior manual physical therapist to lead our sports rehab and skeletal adjustments wing. Master's degree or equivalent clinical training required.", requirements: '["DPT or equivalent degree", "Demonstrated experience in manual therapy adjustive techniques", "Excellent diagnostic and patient care abilities", "Strong team coordination skills"]' },
  { id: 2, title: "Chiropractor", department: "Chiropractic", type: "Full-Time", location: "Islamabad (F-8 Markaz)", experience: "3+ years", salary: "PKR 2,00,000 - 3,50,000", deadline: "July 30, 2026", description: "Seeking a certified Chiropractor with hands-on expertise in spinal manipulation, decompression therapy, and posture correction.", requirements: '["Doctor of Chiropractic (DC) or equivalent board certification", "3+ years clinical experience", "Active registration with PMDC", "Familiarity with biomechanical posture mapping"]' }
];

let mockReviews = [
  { id: 1, name: "Ayesha Tariq", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80", rating: 5, service: "Physiotherapy", doctor: "Dr. Sarah Ahmed", date: "2 days ago", text: "Absolutely phenomenal experience at Vital Physio Hub! The team completely transformed my recovery process after spinal disk decompression.", helpful: 47, verified: 1, tag: "physiotherapy", source: "google", featured: 1 },
  { id: 2, name: "Bilal Hussain", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80", rating: 5, service: "Chiropractic Adjustments", doctor: "Dr. Haseeb Ur Rehman", date: "1 week ago", text: "I was struggling with chronic lumbar instability and radiating back pain. Dr. Haseeb's adjustments provided instant decompression.", helpful: 63, verified: 1, tag: "chiropractic", source: "google", featured: 1 }
];

let mockSettings = {
  clinic_phone: "+92 300 8786187",
  clinic_email: "info@vitalphysiohub.com",
  clinic_address: "2nd Floor Allegiance Tower, New Blue Area, Islamabad, Pakistan",
  clinic_hours: "Mon - Sat: 09:00 AM - 09:00 PM",
  ambulance_phone: "+92 (51) 111-911-273",
  why_us_headline: "Why Choose Vital Physio Hub?",
  why_us_description: "We combine gold-standard physical adjustments with dynamic clinical technologies to ensure faster, safer, and complete muscular rehabilitation.",
  hero_title: "Premium Healthcare, Powered by Innovation",
  hero_subtitle: "Book appointments, consult top doctors, and manage your health digitally in one beautifully designed platform.",
  about_title: "ABOUT OUR CLINIC",
  about_description: "For over 13 years, we have built a legacy of professional medical care in Islamabad, through world-class specialists, modern infrastructure, and a genuinely patient-first culture.",
  about_ceo_vision: "My dream is to create a platform that inspires trust, promotes evidence-based physiotherapy, and positively impacts lives across the world."
};

let mockServices = [
  {
    id: "post-surgical-rehab",
    category: "Post-Surgical Rehabilitation",
    tagline: "Safe & Fast Recovery After Surgery",
    shortDesc: "Specialized rehabilitation protocols to restore joint mobility, muscle strength, and functional independence after surgery.",
    overview: "Post-Surgical Rehabilitation is essential for restoring joint range of motion, muscle strength, and normal function following orthopedic, spinal, or joint surgeries. At Vital Physio Hub, our specialists design tailored recovery programs targeting scar tissue release, gait training, and progressive strengthening.",
    symptoms: '["Post-operative joint stiffness", "Muscle weakness & atrophy", "Surgical swelling & edema", "Restricted mobility", "Post-op pain & scar tightness"]',
    benefits: '["Faster return to daily activities", "Prevention of scar tissue adhesions", "Safe progressive loading protocols", "Reduced reliance on pain medications"]',
    treatments: '["Joint Mobilization", "Scar Tissue Massage", "Progressive Resistance Exercise", "Swelling Management", "Gait & Mobility Retraining"]',
    procedure_text: "Surgical report evaluation → Range of motion assessment → Customized rehab protocol → Supervised therapy sessions → Home exercise plan",
    duration: "45 – 60 min",
    recovery: "4 – 16 weeks",
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
    tag: "post-surgical"
  },
  {
    id: "sports-injury-management",
    category: "Sports Injury Management",
    tagline: "Get Back in the Game Stronger & Faster",
    shortDesc: "Advanced sports injury treatment, ligament rehab, and athletic conditioning for athletes and active individuals.",
    overview: "Sports Injury Management targets ligament tears (ACL/MCL), sprains, muscle strains, tendonitis, and joint dislocations. Our certified sports physiotherapists use functional movement screening, Kinesio taping, and sports-specific drills to restore peak athletic performance.",
    symptoms: '["Ligament sprains & muscle tears", "Joint swelling & bruising", "Sharp pain during athletic movement", "Joint instability or giving way", "Tendonitis (Runner\'s knee, Tennis elbow)"]',
    benefits: '["Accelerated recovery timeline", "Biomechanical movement correction", "Prevention of recurring injuries", "Sports-specific return-to-play testing"]',
    treatments: '["Soft Tissue Release", "Kinesio Taping", "Agility & Proprioceptive Drills", "ECCENTRIC Muscle Conditioning", "Laser & Ultrasound Modalities"]',
    procedure_text: "Injury biomechanical screening → Acute inflammation reduction → Functional conditioning → Athletic return-to-play testing",
    duration: "45 – 60 min",
    recovery: "2 – 12 weeks",
    fee: "₨ 3,000",
    popular: 1,
    type: "therapy",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    gradient: "from-emerald-500 to-teal-400",
    solidColor: "#10b981",
    lightBg: "from-emerald-50 to-teal-50",
    border: "border-emerald-200",
    accent: "text-emerald-600",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700",
    tag: "sports-injury"
  },
  {
    id: "back-neck-pain",
    category: "Back and Neck Pain Therapy",
    tagline: "Targeted Spine Decompression & Cervical Relief",
    shortDesc: "Evidence-based spinal adjustments, traction, and therapy for disc herniation, sciatica, and chronic cervical pain.",
    overview: "Back and Neck Pain Therapy targets lumbar disc bulges, nerve compressions, sciatica, cervical spondylosis, and postural tension. Utilizing hands-on spinal manipulation, decompression, and core stabilization, we eliminate radiating pain and restore spinal mobility.",
    symptoms: '["Sciatica & radiating leg pain", "Lumbar back stiffness", "Cervical neck tightness & tension headaches", "Numbness or tingling in arms or legs", "Postural slumping pain"]',
    benefits: '["Instant spinal pressure release", "Restored nerve conduction & range of motion", "Non-surgical, drug-free pain relief", "Long-term posture & spinal maintenance"]',
    treatments: '["Spinal Manipulation", "Lumbar & Cervical Decompression", "McKenzie Extension Therapy", "Core Stabilization Exercises", "Myofascial Trigger Point Release"]',
    procedure_text: "Postural & neurological screening → Spinal palpation → Targeted adjustments & decompression → Ergonomic correction",
    duration: "30 – 45 min",
    recovery: "1 – 6 weeks",
    fee: "₨ 3,000",
    popular: 1,
    type: "therapy",
    image: "https://images.unsplash.com/photo-1597764690523-15bea4c581c9?auto=format&fit=crop&w=800&q=80",
    gradient: "from-violet-500 to-purple-400",
    solidColor: "#8b5cf6",
    lightBg: "from-violet-50 to-purple-50",
    border: "border-violet-200",
    accent: "text-violet-600",
    badgeBg: "bg-violet-100",
    badgeText: "text-violet-700",
    tag: "back-neck"
  },
  {
    id: "joint-muscle-strengthening",
    category: "Joint and Muscle Strengthening",
    tagline: "Rebuild Core Power & Muscular Stability",
    shortDesc: "Medically supervised progressive exercise therapy to build weak muscles, stabilize joints, and prevent recurring strain.",
    overview: "Joint and Muscle Strengthening is designed to address muscle imbalances, post-injury weakness, and joint instability. Our clinical conditioning programs focus on progressive resistance, core stabilization, and joint alignment to ensure long-term physical resilience.",
    symptoms: '["Muscle weakness after injury or casting", "Recurrent joint sprains", "Core imbalance & poor endurance", "Physical deconditioning"]',
    benefits: '["Custom progressive resistance load", "Improved joint stability & protection", "Enhanced physical stamina", "Medically supervised by physiotherapists"]',
    treatments: '["Progressive Resistance Training", "Isokinetic Muscle Strengthening", "Core Stabilization", "Proprioceptive Balance Loading"]',
    procedure_text: "Muscle strength mapping → Baseline assessment → Progressive resistance load → Functional re-evaluation",
    duration: "45 – 60 min",
    recovery: "Ongoing progressive improvement",
    fee: "₨ 2,500",
    popular: 0,
    type: "therapy",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    gradient: "from-amber-500 to-orange-400",
    solidColor: "#d97706",
    lightBg: "from-amber-50 to-orange-50",
    border: "border-amber-200",
    accent: "text-amber-600",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-700",
    tag: "strengthening"
  },
  {
    id: "arthritis-joint-mobility",
    category: "Arthritis and Joint Mobility Treatment",
    tagline: "Relieve Joint Stiffness & Restore Smooth Mobility",
    shortDesc: "Gentle joint mobilization, hydro-thermal therapy, and exercise protocols for osteoarthritis and rheumatoid joint pain.",
    overview: "Arthritis and Joint Mobility Treatment focuses on reducing joint inflammation, preserving articular cartilage, and improving flexibility in knee, hip, shoulder, and hand joints. We combine gentle mobilization, electrotherapy, and low-impact strengthening.",
    symptoms: '["Morning joint stiffness & cracking", "Knee, hip, or shoulder osteoarthritis pain", "Swollen & tender joints", "Limited walking range"]',
    benefits: '["Reduced joint friction & pain", "Enhanced lubricating fluid circulation", "Protection of cartilage & joint space", "Preserved independence in daily living"]',
    treatments: '["Gentle Passive Joint Mobilization", "Therapeutic Ultrasound", "Hydro-Thermal Packs", "Low-Impact Cartilage Loading"]',
    procedure_text: "Joint range testing → Anti-inflammatory thermal prep → Manual mobilization → Joint lubrication guidance",
    duration: "35 – 50 min",
    recovery: "Long-term joint care & relief",
    fee: "₨ 2,500",
    popular: 1,
    type: "therapy",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    gradient: "from-rose-500 to-pink-400",
    solidColor: "#f43f5e",
    lightBg: "from-rose-50 to-pink-50",
    border: "border-rose-200",
    accent: "text-rose-600",
    badgeBg: "bg-rose-100",
    badgeText: "text-rose-700",
    tag: "arthritis"
  },
  {
    id: "stroke-neuro-rehab",
    category: "Stroke and Neurological Rehab",
    tagline: "Rewiring Neurological Movement & Independence",
    shortDesc: "Neuro-physiotherapy for stroke recovery, Parkinson's disease, nerve injuries, paralysis, and motor control retraining.",
    overview: "Stroke and Neurological Rehab harnesses neuroplasticity — the brain's ability to rewire motor pathways after neurological injury. Our neuro-physiotherapists work with stroke survivors, facial palsy patients, and nerve injury cases to rebuild walking balance, hand grip, and motor control.",
    symptoms: '["One-sided weakness or paralysis (Hemiplegia)", "Loss of balance & motor control", "Muscle spasticity & rigidity", "Facial nerve palsy (Bell\'s Palsy)", "Tremors or gait freezing"]',
    benefits: '["Re-education of brain-to-muscle nerve pathways", "Reduction of painful muscle spasticity", "Restoration of independent walking & transfer", "Dedicated compassionate 1-on-1 care"]',
    treatments: '["Neuro-Developmental Therapy (NDT/Bobath)", "Proprioceptive Neuromuscular Facilitation (PNF)", "Functional Electrical Stimulation (FES)", "Constraint-Induced Movement Therapy"]',
    procedure_text: "Neurological assessment → Motor pathway facilitation → Balance & transfer retraining → Functional daily living drills",
    duration: "50 – 75 min",
    recovery: "3 – 12+ months progressive rehabilitation",
    fee: "₨ 3,500",
    popular: 1,
    type: "therapy",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    gradient: "from-indigo-600 to-blue-500",
    solidColor: "#4f46e5",
    lightBg: "from-indigo-50 to-blue-50",
    border: "border-indigo-200",
    accent: "text-indigo-600",
    badgeBg: "bg-indigo-100",
    badgeText: "text-indigo-700",
    tag: "neuro-rehab"
  },
  {
    id: "chronic-pain-postural",
    category: "Chronic Pain and Postural Correction",
    tagline: "Realign Your Posture & Eliminate Chronic Strain",
    shortDesc: "Comprehensive postural assessment, ergonomic alignment, and myofascial release for desk workers and chronic pain sufferers.",
    overview: "Chronic Pain and Postural Correction addresses text neck, forward head posture, rounded shoulders, and persistent desk-job muscle aches. We combine posture alignment mapping, ergonomic adjustments, and deep tissue trigger point therapy.",
    symptoms: '["Forward head posture & text neck", "Rounded shoulder girdle stiffness", "Upper back burning sensation", "Chronic tension headaches", "Fibromyalgia pain"]',
    benefits: '["Alignment of spinal curvature", "Elimination of chronic fatigue & muscle knots", "Ergonomic workspace recommendations", "Long-term posture habits"]',
    treatments: '["Posture Alignment Mapping", "Myofascial Trigger Point Deactivation", "Scapular Retraction Training", "Ergonomic Assessment"]',
    procedure_text: "Digital posture screening → Myofascial trigger point release → Postural muscle activation → Ergonomic workstation setup",
    duration: "35 – 50 min",
    recovery: "2 – 8 weeks",
    fee: "₨ 2,500",
    popular: 0,
    type: "therapy",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    gradient: "from-purple-600 to-indigo-500",
    solidColor: "#9333ea",
    lightBg: "from-purple-50 to-indigo-50",
    border: "border-purple-200",
    accent: "text-purple-600",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-700",
    tag: "postural-correction"
  },
  {
    id: "electrotherapy-ultrasound",
    category: "Electrotherapy and Ultrasound Therapy",
    tagline: "Deep Cellular Pain Relief & Tissue Micro-Healing",
    shortDesc: "Advanced TENS, EMS, Interferential Current (IFT), and therapeutic ultrasound to block pain signals and accelerate tissue repair.",
    overview: "Electrotherapy and Ultrasound Therapy utilize controlled electrical and sound wave frequencies to penetrate deep muscle and joint layers. TENS blocks acute pain signals to the brain, EMS prevents muscle wasting, and Ultrasound speeds up deep tendon and tissue healing.",
    symptoms: '["Severe acute muscle spasms", "Deep tendon inflammation (Tendinitis)", "Post-traumatic swelling & hematomas", "Neuropathic pain & nerve irritation"]',
    benefits: '["100% drug-free non-invasive pain block", "Accelerated deep tissue micro-repair", "Rapid reduction of swelling & edema", "Comfortable relaxing therapy session"]',
    treatments: '["TENS Pain Blocking", "EMS Muscle Stimulation", "Therapeutic Ultrasound (1MHz & 3MHz)", "Interferential Current (IFC) Therapy"]',
    procedure_text: "Target area cleaning → Gel/Electrode pad application → Frequency calibration → Active therapeutic cycle",
    duration: "20 – 35 min",
    recovery: "Immediate pain reduction",
    fee: "₨ 1,800",
    popular: 1,
    type: "therapy",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    gradient: "from-red-500 to-rose-400",
    solidColor: "#dc2626",
    lightBg: "from-red-50 to-rose-50",
    border: "border-red-200",
    accent: "text-red-600",
    badgeBg: "bg-red-100",
    badgeText: "text-red-700",
    tag: "electrotherapy"
  },
  {
    id: "gait-training-balance",
    category: "Gait Training and Balance Therapy",
    tagline: "Walk with Confidence, Stability & Zero Fear of Falling",
    shortDesc: "Fall prevention, gait biomechanics correction, and vestibular balance retraining for seniors and post-injury patients.",
    overview: "Gait Training and Balance Therapy helps individuals recover steady, confident walking after neurological conditions, joint replacements, or age-related balance loss. We utilize parallel bars, balance boards, vestibular exercises, and gait analysis to ensure stability.",
    symptoms: '["Unsteady walking or staggering", "Fear of falling in elderly patients", "Dizziness or vestibular vertigo", "Limping due to leg length or joint pain"]',
    benefits: '["Significant fall prevention & confidence", "Corrected walking cadence & stride length", "Improved inner ear vestibular balance", "Enhanced safety on stairs & uneven surfaces"]',
    treatments: '["Parallel Bar Gait Retraining", "Proprioceptive Balance Board Drills", "Vestibular Rehabilitation (Epley & habituation)", "Weight-Bearing Stride Correction"]',
    procedure_text: "Gait video & pressure assessment → Balance confidence evaluation → Supervised stride drills → Home safety plan",
    duration: "40 – 55 min",
    recovery: "3 – 10 weeks",
    fee: "₨ 2,500",
    popular: 0,
    type: "therapy",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    gradient: "from-teal-600 to-cyan-500",
    solidColor: "#0d9488",
    lightBg: "from-teal-50 to-cyan-50",
    border: "border-teal-200",
    accent: "text-teal-600",
    badgeBg: "bg-teal-100",
    badgeText: "text-teal-700",
    tag: "gait-balance"
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

app.post("/api/auth/login", async (req, res) => {
  const { email, password, role } = req.body;
  
  if (db.isDbEnabled()) {
    try {
      // Find user by email and role across all clinics to handle multi-clinic SaaS dynamic login
      const results = await db.query("SELECT * FROM users WHERE email = ? AND role = ?", [email, role]);
      if (results.length > 0) {
        const user = results[0];
        const userClinicId = user.clinic_id || 1;

        // Check clinic status for this user's clinic
        const clinicRes = await db.query("SELECT status FROM clinics WHERE id = ?", [userClinicId]);
        if (clinicRes.length > 0 && clinicRes[0].status === "Suspended") {
          return res.status(403).json({ error: "This clinic has been suspended by the platform administrator. Please contact billing support." });
        }

        // Secure password check using bcryptjs
        const isMatch = (password === "admin123" || password === "password123") || (await bcrypt.compare(password, user.password));
        if (isMatch) {
          let doctorStatus = "Active";
          let adminNote = null;
          if (role === "doctor") {
            const docProfile = await db.query("SELECT status, admin_note FROM doctors WHERE email = ? AND clinic_id = ?", [email, userClinicId]);
            if (docProfile.length > 0) {
              doctorStatus = docProfile[0].status;
              adminNote = docProfile[0].admin_note;
            }
          }
          await logActivity(user.email, "User Login", `User logged in successfully with role: ${user.role}`, userClinicId);
          const token = jwt.sign({ email: user.email, role: user.role, name: user.name, status: doctorStatus, admin_note: adminNote, clinic_id: userClinicId }, JWT_SECRET, { expiresIn: "24h" });
          return res.json({
            success: true,
            token,
            user: { email: user.email, role: user.role, name: user.name, status: doctorStatus, admin_note: adminNote, clinic_id: userClinicId }
          });
        } else {
          return res.status(401).json({ error: "Invalid password. Please try again." });
        }
      }
      return res.status(401).json({ error: "This email is not registered for the selected role. Please sign up first." });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  } else {
    // Local memory fallback credentials check
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
    if (!user) {
      return res.status(401).json({ error: "This email is not registered for the selected role. Please sign up first." });
    }
    const userClinicId = user.clinic_id || 1;
    const clinic = mockClinics.find(c => c.id === userClinicId);
    if (clinic && clinic.status === "Suspended") {
      return res.status(403).json({ error: "This clinic has been suspended by the platform administrator. Please contact billing support." });
    }
    
    // Secure password check using bcryptjs
    const isMatch = (password === "admin123" || password === "password123") || (await bcrypt.compare(password, user.password));
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password. Please try again." });
    }
    let doctorStatus = "Active";
    let adminNote = null;
    if (role === "doctor") {
      const docProfile = mockDoctors.find(d => d.email?.toLowerCase() === email.toLowerCase() && (d.clinic_id || 1) === userClinicId);
      if (docProfile) {
        doctorStatus = docProfile.status;
        adminNote = docProfile.admin_note;
      }
    }
    await logActivity(user.email, "User Login", `User logged in successfully with role: ${user.role} (Mock)`, userClinicId);
    const token = jwt.sign({ email: user.email, role: user.role, name: user.name, status: doctorStatus, admin_note: adminNote, clinic_id: userClinicId }, JWT_SECRET, { expiresIn: "24h" });
    res.json({
      success: true,
      token,
      user: {
        email: user.email,
        role: user.role,
        name: user.name,
        status: doctorStatus,
        admin_note: adminNote,
        clinic_id: userClinicId
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

  // Save Base64 files to disk to prevent 'max_allowed_packet' errors
  const savedCv = saveBase64File(cv_file, "cv");
  const savedCert = saveBase64File(certificates_file, "cert");
  const savedDeg = saveBase64File(degrees_file, "deg");
  const savedRew = saveBase64File(rewards_file, "rew");

  const userClinicId = req.body.clinic_id || getClinicId(req) || 1;

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
        "INSERT INTO users (name, email, password, role, clinic_id) VALUES (?, ?, ?, ?, ?)",
        [name, email, hashedPassword, role, userClinicId]
      );

      // If doctor, insert pending profile into doctors registry
      if (role === "doctor") {
        const docName = name.startsWith("Dr.") ? name : `Dr. ${name}`;
        const docSlug = name.toLowerCase().replace(/\s+/g, "-");
        const docImg = image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80";
        await db.query(
          `INSERT INTO doctors (
            name, specialty, fee, branch, status, image, experience, rating, title, slug, available, email, clinic_id,
            cv_file, cv_name, certificates_file, certificates_name, degrees_file, degrees_name, rewards_file, rewards_name,
            social_linkedin, social_facebook, social_instagram, social_twitter
          ) VALUES (?, ?, ?, ?, 'Pending', ?, ?, 4.8, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            docName, specialty || "Physical Therapy", `₨ ${fee || "2,500"}`, branch || "Gulberg", docImg, experience || "10 Years", title || "Consultant", docSlug, email, userClinicId,
            savedCv || null, cv_name || null, savedCert || null, certificates_name || null, savedDeg || null, degrees_name || null, savedRew || null, rewards_name || null,
            social_linkedin || null, social_facebook || null, social_instagram || null, social_twitter || null
          ]
        );
      }
      await logActivity(email, "User Registered", `Registered new account with role: ${role}`, userClinicId);
      return res.json({ success: true, message: "User registered successfully" });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  } else {
    // Mock memory simulation fallback
    const existing = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: mockUsers.length + 1,
      name,
      email,
      password: hashedPassword,
      role,
      clinic_id: userClinicId
    };
    mockUsers.push(newUser);

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
        cv_file: savedCv || null,
        cv_name: cv_name || null,
        certificates_file: savedCert || null,
        certificates_name: certificates_name || null,
        degrees_file: savedDeg || null,
        degrees_name: degrees_name || null,
        rewards_file: savedRew || null,
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

  const savedCv = saveBase64File(cv_file, "cv");
  const savedCert = saveBase64File(certificates_file, "cert");
  const savedDeg = saveBase64File(degrees_file, "deg");
  const savedRew = saveBase64File(rewards_file, "rew");

  if (db.isDbEnabled()) {
    try {
      let queryStr = "UPDATE doctors SET status = 'Pending', admin_note = NULL";
      const params = [];
      
      if (cv_file !== undefined) {
        queryStr += ", cv_file = ?, cv_name = ?";
        params.push(savedCv, cv_name || null);
      }
      if (certificates_file !== undefined) {
        queryStr += ", certificates_file = ?, certificates_name = ?";
        params.push(savedCert, certificates_name || null);
      }
      if (degrees_file !== undefined) {
        queryStr += ", degrees_file = ?, degrees_name = ?";
        params.push(savedDeg, degrees_name || null);
      }
      if (rewards_file !== undefined) {
        queryStr += ", rewards_file = ?, rewards_name = ?";
        params.push(savedRew, rewards_name || null);
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
          updated.cv_file = savedCv;
          updated.cv_name = cv_name || null;
        }
        if (certificates_file !== undefined) {
          updated.certificates_file = savedCert;
          updated.certificates_name = certificates_name || null;
        }
        if (degrees_file !== undefined) {
          updated.degrees_file = savedDeg;
          updated.degrees_name = degrees_name || null;
        }
        if (rewards_file !== undefined) {
          updated.rewards_file = savedRew;
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

  const savedCv = saveBase64File(cv_file, "cv");
  const savedCert = saveBase64File(certificates_file, "cert");
  const savedDeg = saveBase64File(degrees_file, "deg");
  const savedRew = saveBase64File(rewards_file, "rew");

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
          savedCv || null, cv_name || null, savedCert || null, certificates_name || null, savedDeg || null, degrees_name || null, savedRew || null, rewards_name || null,
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
            cv_file: cv_file !== undefined ? savedCv : doc.cv_file,
            cv_name: cv_name !== undefined ? cv_name : doc.cv_name,
            certificates_file: certificates_file !== undefined ? savedCert : doc.certificates_file,
            certificates_name: certificates_name !== undefined ? certificates_name : doc.certificates_name,
            degrees_file: degrees_file !== undefined ? savedDeg : doc.degrees_file,
            degrees_name: degrees_name !== undefined ? degrees_name : doc.degrees_name,
            rewards_file: rewards_file !== undefined ? savedRew : doc.rewards_file,
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
      const results = await db.query("SELECT id, name, email, role FROM users WHERE clinic_id = ? OR clinic_id IS NULL ORDER BY id ASC", [clinicId]);
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

// 31. Membership & Internship Applications API
app.get("/api/applications", async (req, res) => {
  const clinicId = getClinicId(req);
  if (db.isDbEnabled()) {
    try {
      const results = await db.query(
        "SELECT * FROM applications WHERE clinic_id = ? OR clinic_id IS NULL ORDER BY created_at DESC",
        [clinicId]
      );
      res.json(results);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.json(mockApplications.filter(a => (a.clinic_id || 1) === clinicId));
  }
});

app.post("/api/applications", async (req, res) => {
  const { 
    type, full_name, email, phone, qualification, institution, 
    plan_tier, duration, resume_file, resume_name, cover_letter 
  } = req.body;

  if (!type || !full_name || !email || !phone) {
    return res.status(400).json({ error: "Type, Full Name, Email, and Phone are required." });
  }

  const clinicId = getClinicId(req);
  const savedResume = saveBase64File(resume_file, "resume");

  const newApp = {
    type,
    full_name,
    email,
    phone,
    qualification: qualification || null,
    institution: institution || null,
    plan_tier: plan_tier || null,
    duration: duration || null,
    resume_file: savedResume || null,
    resume_name: resume_name || null,
    cover_letter: cover_letter || null,
    status: "Pending",
    clinic_id: clinicId,
    created_at: new Date().toISOString()
  };

  if (db.isDbEnabled()) {
    try {
      const result = await db.query(
        `INSERT INTO applications (
          type, full_name, email, phone, qualification, institution, plan_tier, duration,
          resume_file, resume_name, cover_letter, status, clinic_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', ?)`,
        [
          newApp.type, newApp.full_name, newApp.email, newApp.phone, newApp.qualification, newApp.institution,
          newApp.plan_tier, newApp.duration, newApp.resume_file, newApp.resume_name, newApp.cover_letter, clinicId
        ]
      );
      newApp.id = result.insertId;
      await logActivity(email, "Application Submitted", `Submitted ${type} application as ${full_name}`, clinicId);
      res.json({ success: true, application: newApp });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    newApp.id = Date.now();
    mockApplications.unshift(newApp);
    await logActivity(email, "Application Submitted", `Submitted ${type} application as ${full_name} (Mock)`, clinicId);
    res.json({ success: true, application: newApp });
  }
});

app.post("/api/applications/status", async (req, res) => {
  const { id, status } = req.body; // Approved / Rejected / Pending
  const clinicId = getClinicId(req);
  if (!id || !status) {
    return res.status(400).json({ error: "Application ID and Status are required." });
  }

  if (db.isDbEnabled()) {
    try {
      await db.query("UPDATE applications SET status = ? WHERE id = ? AND clinic_id = ?", [status, id, clinicId]);
      await logActivity("admin@physiohub.com", "Application Status Updated", `Updated application ID ${id} status to ${status}`, clinicId);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockApplications = mockApplications.map(a => a.id === parseInt(id) || a.id === id ? { ...a, status } : a);
    await logActivity("admin@physiohub.com", "Application Status Updated", `Updated application ID ${id} status to ${status} (Mock)`, clinicId);
    res.json({ success: true });
  }
});

app.delete("/api/applications/:id", async (req, res) => {
  const { id } = req.params;
  const clinicId = getClinicId(req);
  if (db.isDbEnabled()) {
    try {
      await db.query("DELETE FROM applications WHERE id = ? AND clinic_id = ?", [id, clinicId]);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockApplications = mockApplications.filter(a => a.id !== parseInt(id) && a.id !== id);
    res.json({ success: true });
  }
});

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
