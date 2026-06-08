

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FiStar, FiPlay, FiX, FiChevronLeft, FiChevronRight,
  FiHeart, FiShare2, FiCamera, FiVideo, FiGrid,
  FiMessageSquare, FiThumbsUp, FiCalendar, FiSearch,
  FiFilter, FiEye, FiAward, FiZoomIn, FiChevronDown,
  FiChevronUp, FiBookOpen, FiHelpCircle, FiShield, FiBriefcase,
  FiArrowRight, FiClock, FiTag, FiUser, FiMapPin, FiPhone,
  FiMail, FiCheck, FiDollarSign, FiUsers, FiHome,
} from "react-icons/fi";
import { FaWhatsapp, FaStar, FaRegStar, FaStarHalfAlt, FaQuoteLeft, FaGoogle } from "react-icons/fa";
import { HiOutlineBadgeCheck, HiSparkles } from "react-icons/hi";
import { MdVerified, MdOutlineHealthAndSafety } from "react-icons/md";
import { TbStethoscope } from "react-icons/tb";

// ─── THEME ────────────────────────────────────────────────────────────────────
const THEME = {
  pink:    "#e91e8c",
  sky:     "#0ea5e9",
  peach:   "#ff7f50",
  lavender:"#a78bfa",
  mint:    "#34d399",
  grad:    "linear-gradient(135deg, #fce4ec 0%, #e0f2fe 60%, #fdf4ff 100%)",
  gradBtn: "linear-gradient(135deg, #0ea5e9, #e91e8c)",
  gradPeach:"linear-gradient(135deg, #ff7f50, #f43f5e)",
};

// ─── PATIENT REVIEWS DATA ─────────────────────────────────────────────────────
const REVIEWS = [
  {
    id: 1,
    name: "Ayesha Tariq",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    service: "Skin & Dermatology",
    doctor: "Dr. Sarah Ahmed",
    date: "2 days ago",
    text: "Absolutely phenomenal experience at Premium Clinic! Dr. Sarah Ahmed completely transformed my skin in just 3 sessions. The laser therapy was painless and the results are beyond my expectations. The staff is so warm and professional.",
    helpful: 47,
    verified: true,
    tag: "dermatology",
    source: "google",
    featured: true,
  },
  {
    id: 2,
    name: "Bilal Hussain",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    service: "Dental Care",
    doctor: "Dr. Omar Farooq",
    date: "1 week ago",
    text: "I was terrified of root canals but Dr. Omar made the entire procedure completely painless. His technique is world-class. Best dental experience of my life. The clinic is hygienic, modern, and welcoming.",
    helpful: 63,
    verified: true,
    tag: "dental",
    source: "google",
    featured: true,
  },
  {
    id: 3,
    name: "Sana Mirza",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    service: "Gynecology",
    doctor: "Dr. Fatima Malik",
    date: "3 days ago",
    text: "Dr. Fatima is a blessing for every woman. She handled my high-risk pregnancy with such compassion and expertise. Her London training truly shows in her approach. I trusted her completely throughout my journey.",
    helpful: 89,
    verified: true,
    tag: "gynecology",
    source: "facebook",
    featured: true,
  },
  {
    id: 4,
    name: "Usman Khalid",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    service: "Orthopedic Surgery",
    doctor: "Dr. Hassan Raza",
    date: "5 days ago",
    text: "After 18 months of knee pain, Dr. Hassan's minimally invasive procedure gave me my life back. Within 3 weeks I was walking without pain. His team's post-op care is exceptional. Highly recommended!",
    helpful: 71,
    verified: true,
    tag: "orthopedic",
    source: "google",
    featured: false,
  },
  {
    id: 5,
    name: "Nadia Anwar",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    service: "Hair Transplant",
    doctor: "Dr. Imran Sheikh",
    date: "1 week ago",
    text: "The FUE hair transplant results are incredible. Natural hairline, zero scarring. Dr. Imran is an artist. 6 months post-op and I have full confidence back. The clinic's follow-up care is consistent and caring.",
    helpful: 54,
    verified: true,
    tag: "hair",
    source: "google",
    featured: false,
  },
  {
    id: 6,
    name: "Tariq Mehmood",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    service: "Cardiology",
    doctor: "Dr. Zara Ahmed",
    date: "2 weeks ago",
    text: "Came in with chest pains and left with complete peace of mind. Dr. Zara's thorough diagnosis caught an issue my previous doctor missed. Premium Clinic lives up to its name in every way. State-of-the-art equipment.",
    helpful: 92,
    verified: true,
    tag: "cardiology",
    source: "google",
    featured: false,
  },
  {
    id: 7,
    name: "Rabia Shaheen",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=120&q=80",
    rating: 4,
    service: "ENT",
    doctor: "Dr. Kamran Ali",
    date: "3 weeks ago",
    text: "Tonsil surgery done with extreme precision. Recovery was smooth thanks to the detailed care instructions. The booking process was seamless and the WhatsApp reminders are so helpful. Would recommend to everyone.",
    helpful: 38,
    verified: true,
    tag: "ent",
    source: "facebook",
    featured: false,
  },
  {
    id: 8,
    name: "Hamza Iqbal",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    service: "General Medicine",
    doctor: "Dr. Sadia Noor",
    date: "1 month ago",
    text: "Premium Clinic is hands down the best healthcare facility in Lahore. Everything from reception to the doctor's consultation is polished and professional. Felt genuinely cared for, not just processed.",
    helpful: 66,
    verified: true,
    tag: "general",
    source: "google",
    featured: false,
  },
];

const VIDEO_TESTIMONIALS = [
  {
    id: 1,
    name: "Maryam Aslam",
    thumbnail: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    service: "Dermatology",
    duration: "2:34",
    title: "My skin transformation journey",
  },
  {
    id: 2,
    name: "Ahmed Raza",
    thumbnail: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
    service: "Dental Implants",
    duration: "3:12",
    title: "Finally smiling with confidence",
  },
  {
    id: 3,
    name: "Fatima Khan",
    thumbnail: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80",
    service: "Gynecology",
    duration: "1:58",
    title: "Safe pregnancy journey at Premium",
  },
];

// ─── GALLERY DATA ─────────────────────────────────────────────────────────────
const GALLERY_ITEMS = [
  { id: 1, src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80", category: "facility", title: "Main Reception & Lounge", desc: "State-of-the-art welcoming area", span: "wide" },
  { id: 2, src: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=800&q=80", category: "equipment", title: "Advanced Diagnostic Lab", desc: "ISO-certified laboratory", span: "normal" },
  { id: 3, src: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&w=800&q=80", category: "team", title: "Our Expert Medical Team", desc: "Dedicated professionals", span: "normal" },
  { id: 4, src: "https://images.unsplash.com/photo-1578991624414-276ef23a534f?auto=format&fit=crop&w=800&q=80", category: "treatment", title: "Laser Treatment Suite", desc: "Advanced dermatology tech", span: "normal" },
  { id: 5, src: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80", category: "facility", title: "Private Consultation Rooms", desc: "Comfortable & confidential", span: "normal" },
  { id: 6, src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80", category: "equipment", title: "Digital X-Ray & Imaging", desc: "High-resolution diagnostics", span: "tall" },
  { id: 7, src: "https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?auto=format&fit=crop&w=800&q=80", category: "facility", title: "Modern Operation Theater", desc: "Sterile & fully equipped OT", span: "wide" },
  { id: 8, src: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=800&q=80", category: "team", title: "Dental Care Unit", desc: "Advanced oral health center", span: "normal" },
  { id: 9, src: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80", category: "results", title: "Patient Recovery Suite", desc: "Comfortable post-care rooms", span: "normal" },
  { id: 10, src: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80", category: "equipment", title: "In-House Pharmacy", desc: "Stocked with 5000+ medicines", span: "normal" },
];

const GALLERY_CATS = [
  { value: "all", label: "All Photos", icon: FiGrid },
  { value: "facility", label: "Facility", icon: FiCamera },
  { value: "equipment", label: "Equipment", icon: TbStethoscope },
  { value: "team", label: "Our Team", icon: MdOutlineHealthAndSafety },
  { value: "results", label: "Results", icon: HiSparkles },
];

const REVIEW_TAGS = [
  { value: "all", label: "All Reviews" },
  { value: "dermatology", label: "Skin & Laser" },
  { value: "dental", label: "Dental" },
  { value: "gynecology", label: "Gynecology" },
  { value: "orthopedic", label: "Orthopedic" },
  { value: "hair", label: "Hair Transplant" },
  { value: "cardiology", label: "Cardiology" },
];

// ─── BLOG DATA ────────────────────────────────────────────────────────────────
const BLOG_POSTS = [
  {
    id: 1,
    title: "10 Warning Signs You Should Never Ignore — Visit a Doctor Immediately",
    excerpt: "Your body sends signals before serious conditions develop. Learn the critical symptoms that demand immediate medical attention and could save your life.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=700&q=80",
    category: "General Health",
    categoryColor: "#0ea5e9",
    categoryBg: "#e0f2fe",
    author: "Dr. Sadia Noor",
    authorImg: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=80&q=80",
    date: "June 3, 2026",
    readTime: "5 min read",
    tag: "health",
    featured: true,
  },
  {
    id: 2,
    title: "The Complete Guide to Laser Skin Treatments in 2026",
    excerpt: "From fractional CO₂ to PicoSure — understand how each laser works, what skin concerns it addresses, and what results you can realistically expect.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80",
    category: "Skin Care",
    categoryColor: "#e91e8c",
    categoryBg: "#fce4ec",
    author: "Dr. Sarah Ahmed",
    authorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
    date: "May 28, 2026",
    readTime: "8 min read",
    tag: "skin",
    featured: true,
  },
  {
    id: 3,
    title: "FUE vs DHI Hair Transplant: Which Is Right for You?",
    excerpt: "Two of the most advanced hair restoration techniques compared side-by-side. Cost, recovery time, density outcomes, and the ideal candidate profile for each.",
    image: "https://images.unsplash.com/photo-1560486982-f1e771a6a8d1?auto=format&fit=crop&w=700&q=80",
    category: "Hair Restoration",
    categoryColor: "#a78bfa",
    categoryBg: "#ede9fe",
    author: "Dr. Imran Sheikh",
    authorImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
    date: "May 20, 2026",
    readTime: "6 min read",
    tag: "hair",
    featured: true,
  },
  {
    id: 4,
    title: "Managing Diabetes: Nutrition, Exercise & Monitoring Tips",
    excerpt: "Evidence-based lifestyle changes that help patients with Type 2 diabetes maintain healthy blood sugar levels, reduce medication dependency, and live fully.",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=700&q=80",
    category: "Diabetes",
    categoryColor: "#34d399",
    categoryBg: "#d1fae5",
    author: "Dr. Zara Ahmed",
    authorImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
    date: "May 14, 2026",
    readTime: "7 min read",
    tag: "health",
    featured: false,
  },
  {
    id: 5,
    title: "Pregnancy Nutrition: What to Eat & Avoid Each Trimester",
    excerpt: "A trimester-by-trimester nutritional guide from our expert gynecologists covering essential nutrients, safe foods, and common myths that expecting mothers should know.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=700&q=80",
    category: "Gynecology",
    categoryColor: "#f59e0b",
    categoryBg: "#fef3c7",
    author: "Dr. Fatima Malik",
    authorImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80",
    date: "May 7, 2026",
    readTime: "9 min read",
    tag: "gynecology",
    featured: false,
  },
  {
    id: 6,
    title: "Knee Pain Solutions: When to Try Physio vs Surgery",
    excerpt: "Not every knee problem needs an operation. Our orthopedic specialists explain the decision tree between conservative management, physiotherapy, and surgical intervention.",
    image: "https://images.unsplash.com/photo-1597764690523-15bea4c581c9?auto=format&fit=crop&w=700&q=80",
    category: "Orthopedic",
    categoryColor: "#ff7f50",
    categoryBg: "#fff0eb",
    author: "Dr. Hassan Raza",
    authorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80",
    date: "April 29, 2026",
    readTime: "6 min read",
    tag: "orthopedic",
    featured: false,
  },
];

const BLOG_TAGS = [
  { value: "all", label: "All Articles" },
  { value: "health", label: "General Health" },
  { value: "skin", label: "Skin Care" },
  { value: "hair", label: "Hair" },
  { value: "gynecology", label: "Gynecology" },
  { value: "orthopedic", label: "Orthopedic" },
];

// ─── FAQ DATA ─────────────────────────────────────────────────────────────────
const FAQ_CATEGORIES = [
  {
    id: "appointments",
    label: "Appointments",
    icon: FiCalendar,
    color: "#0ea5e9",
    bg: "#e0f2fe",
    questions: [
      { q: "How do I book an appointment at Premium Clinic?", a: "You can book through our website's booking page, call our helpline at +92-300-1234567, or send us a message on WhatsApp. Online bookings are available 24/7 and confirmed instantly." },
      { q: "Can I choose a specific doctor for my appointment?", a: "Yes, absolutely. During the booking process you can browse all available doctors, view their profiles, specializations, and available time slots, and select the one that suits you best." },
      { q: "What is your cancellation and rescheduling policy?", a: "You can cancel or reschedule up to 4 hours before your appointment at no charge. Cancellations within 4 hours may incur a small processing fee. Emergency cancellations are always waived." },
      { q: "Do you offer same-day or emergency appointments?", a: "Yes. We maintain dedicated emergency slots each day. Call our emergency line or walk in — our triage team will assess and accommodate you as quickly as possible." },
    ],
  },
  {
    id: "services",
    label: "Services & Treatments",
    icon: TbStethoscope,
    color: "#e91e8c",
    bg: "#fce4ec",
    questions: [
      { q: "What specialties does Premium Clinic offer?", a: "We cover over 15 medical specialties including Dermatology, Dentistry, Orthopedics, Gynecology, ENT, Cardiology, General Medicine, Hair Restoration, and more — all under one roof." },
      { q: "Do you offer online video consultations?", a: "Yes. Our telemedicine platform supports video, audio, and chat consultations. You can consult with any of our doctors from the comfort of your home via Zoom or our in-app system." },
      { q: "Are your treatments FDA-approved?", a: "All procedures, devices, and medications used at Premium Clinic are either FDA-approved or certified by equivalent international regulatory authorities. Patient safety is our highest priority." },
      { q: "Can I get a second opinion from your specialists?", a: "Of course. We welcome second-opinion consultations and can review previous reports, imaging, and diagnoses from other providers to give you a comprehensive independent assessment." },
    ],
  },
  {
    id: "billing",
    label: "Billing & Payments",
    icon: FiDollarSign,
    color: "#34d399",
    bg: "#d1fae5",
    questions: [
      { q: "What payment methods do you accept?", a: "We accept JazzCash, Easypaisa, Visa/Mastercard debit & credit cards, bank transfers, and cash. Online appointments can be partially or fully paid in advance through our secure portal." },
      { q: "Do you offer installment plans for expensive procedures?", a: "Yes, for procedures above PKR 30,000 we offer easy 3 to 12 month installment plans with zero markup through selected partner banks. Our billing team can assist with the application." },
      { q: "Will I receive an invoice or receipt for my visit?", a: "A detailed digital invoice is automatically sent to your registered email after every consultation and procedure. You can also access all past invoices from your Patient Portal account." },
    ],
  },
  {
    id: "general",
    label: "General Queries",
    icon: FiHelpCircle,
    color: "#a78bfa",
    bg: "#ede9fe",
    questions: [
      { q: "What are your clinic opening hours?", a: "Our main branch is open Saturday–Thursday 9:00 AM – 9:00 PM and Friday 2:00 PM – 9:00 PM. Emergency services are available 24/7 at all branches." },
      { q: "Do you have branches in multiple cities?", a: "Currently we have three branches — Lahore (DHA Phase 5), Islamabad (Blue Area), and Rawalpindi (Saddar). Each branch offers the full range of services with the same Premium standard." },
      { q: "Is parking available at the clinic?", a: "Yes, all three branches have dedicated free parking for patients. The Lahore branch also has a basement parking level with direct elevator access to the clinic floors." },
      { q: "How do I access my reports and prescriptions?", a: "All reports, lab results, and prescriptions are uploaded to your Patient Portal within 24 hours of your visit. You'll receive a notification via SMS and email once they're ready." },
    ],
  },
];

// ─── INSURANCE DATA ───────────────────────────────────────────────────────────
const INSURANCE_PARTNERS = [
  { name: "State Life", logo: "🏛️", type: "Government", color: "#0ea5e9", coverage: "OPD + IPD" },
  { name: "Jubilee Health", logo: "💙", type: "Private", color: "#e91e8c", coverage: "Full Coverage" },
  { name: "EFU Life", logo: "🛡️", type: "Private", color: "#a78bfa", coverage: "OPD + IPD" },
  { name: "Adamjee Insurance", logo: "⭐", type: "Private", color: "#34d399", coverage: "IPD Only" },
  { name: "TPL Health", logo: "🏥", type: "Private", color: "#ff7f50", coverage: "Full Coverage" },
  { name: "ChubbLife", logo: "🔵", type: "International", color: "#f59e0b", coverage: "Full Coverage" },
  { name: "SLIC", logo: "🌟", type: "Government", color: "#0ea5e9", coverage: "OPD + IPD" },
  { name: "Allianz EFU", logo: "🟣", type: "International", color: "#a78bfa", coverage: "Full Coverage" },
];

const INSURANCE_FAQS = [
  { q: "How do I use my insurance at Premium Clinic?", a: "Bring your insurance card and CNIC at reception. Our insurance desk will verify your coverage on the spot and handle all paperwork — you only pay the co-pay if applicable." },
  { q: "What if my insurer is not on your panel?", a: "We'll provide detailed itemized invoices that you can submit directly to your insurance company for reimbursement. Our billing team is happy to assist with any claim documentation." },
  { q: "Does insurance cover cosmetic procedures?", a: "Most cosmetic procedures (like laser skin treatments or hair transplants) are not covered unless medically indicated. However, reconstructive and medically necessary aesthetic procedures are often covered. Check with your insurer." },
  { q: "Can I get pre-authorization assistance?", a: "Yes. Our insurance coordination desk handles all pre-authorization requests on your behalf. Simply bring your insurance details 24–48 hours before your scheduled procedure." },
];

// ─── CAREERS DATA ─────────────────────────────────────────────────────────────
const JOB_OPENINGS = [
  {
    id: 1,
    title: "Senior Dermatologist",
    department: "Dermatology",
    type: "Full-Time",
    location: "Lahore (DHA)",
    experience: "5+ years",
    salary: "PKR 3,50,000 – 5,00,000",
    deadline: "July 15, 2026",
    color: "#e91e8c",
    bg: "#fce4ec",
    urgent: true,
    description: "We are looking for a board-certified Dermatologist with expertise in laser procedures, cosmetic dermatology, and skin disease management. FCPS or equivalent required.",
    requirements: ["FCPS/MCPS in Dermatology", "Experience with laser devices (Fractional CO₂, Q-Switch)", "Excellent patient communication skills", "Willingness to work flexible hours"],
  },
  {
    id: 2,
    title: "Orthopedic Surgeon",
    department: "Orthopedics",
    type: "Full-Time",
    location: "Islamabad",
    experience: "7+ years",
    salary: "PKR 4,00,000 – 6,50,000",
    deadline: "July 20, 2026",
    color: "#0ea5e9",
    bg: "#e0f2fe",
    urgent: true,
    description: "Seeking an experienced Orthopedic Surgeon specializing in minimally invasive joint surgeries and sports medicine. Fellowship training in arthroscopy is a strong plus.",
    requirements: ["FCPS Orthopedic Surgery or equivalent", "Proficiency in arthroscopic procedures", "Strong surgical and post-op management skills", "Active medical license from PMDC"],
  },
  {
    id: 3,
    title: "Dental Officer",
    department: "Dental Care",
    type: "Full-Time",
    location: "Rawalpindi",
    experience: "2+ years",
    salary: "PKR 1,20,000 – 1,80,000",
    deadline: "July 10, 2026",
    color: "#a78bfa",
    bg: "#ede9fe",
    urgent: false,
    description: "Looking for a passionate Dental Officer with proficiency in routine dental care, minor oral surgeries, and cosmetic procedures including teeth whitening and veneers.",
    requirements: ["BDS from recognized institution", "PMDC registered", "Experience in cosmetic dentistry preferred", "Friendly chairside manner"],
  },
  {
    id: 4,
    title: "Registered Nurse – ICU",
    department: "Nursing",
    type: "Full-Time",
    location: "Lahore (DHA)",
    experience: "3+ years",
    salary: "PKR 80,000 – 1,20,000",
    deadline: "June 30, 2026",
    color: "#34d399",
    bg: "#d1fae5",
    urgent: true,
    description: "We need experienced ICU nurses who can handle critical care patients, operate ventilators, and work efficiently under pressure in our expanding inpatient department.",
    requirements: ["BSN or Post-RN BSN degree", "ICU/CCU experience mandatory", "BLS/ACLS certification", "Ability to work rotating shifts"],
  },
  {
    id: 5,
    title: "Medical Receptionist",
    department: "Administration",
    type: "Full-Time",
    location: "All Branches",
    experience: "1+ year",
    salary: "PKR 50,000 – 70,000",
    deadline: "July 5, 2026",
    color: "#ff7f50",
    bg: "#fff0eb",
    urgent: false,
    description: "We are expanding our reception teams across all branches. Ideal candidates are organized, warm, and tech-savvy with experience in a clinical or hospitality environment.",
    requirements: ["Graduation from recognized university", "Fluent in Urdu & English", "Basic computer proficiency", "Professional appearance and communication"],
  },
  {
    id: 6,
    title: "Social Media & Content Manager",
    department: "Marketing",
    type: "Full-Time",
    location: "Lahore (DHA)",
    experience: "2+ years",
    salary: "PKR 90,000 – 1,30,000",
    deadline: "July 12, 2026",
    color: "#f59e0b",
    bg: "#fef3c7",
    urgent: false,
    description: "Looking for a creative content professional who understands the healthcare space and can build an engaging digital presence across Instagram, YouTube, and LinkedIn.",
    requirements: ["Degree in Marketing/Communications/Media", "Proven social media portfolio", "Video editing skills (Reels, Shorts)", "Healthcare content knowledge a plus"],
  },
];

const CAREER_PERKS = [
  { icon: "💰", title: "Competitive Pay", desc: "Above-market salaries reviewed annually with performance bonuses" },
  { icon: "📚", title: "CPD & Training", desc: "Fully funded Continuing Professional Development programs & workshops" },
  { icon: "🏥", title: "Health Coverage", desc: "Free medical care for you and immediate family at all Premium branches" },
  { icon: "⏰", title: "Flexible Hours", desc: "Multiple shift options and part-time arrangements for certain roles" },
  { icon: "🚀", title: "Career Growth", desc: "Clear promotion pathways, mentoring, and leadership development programs" },
  { icon: "🤝", title: "Great Culture", desc: "Collaborative, respectful environment focused on excellence and compassion" },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function StarRow({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => {
        if (rating >= s) return <FaStar key={s} size={size} color="#FBBF24" />;
        if (rating >= s - 0.5) return <FaStarHalfAlt key={s} size={size} color="#FBBF24" />;
        return <FaRegStar key={s} size={size} color="#FBBF24" />;
      })}
    </div>
  );
}

// ─── REVIEW CARD ──────────────────────────────────────────────────────────────
function ReviewCard({ review, index }) {
  const [liked, setLiked] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group relative bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-pink-50 hover:border-pink-100 overflow-hidden"
    >
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(circle, #fce4ec 0%, transparent 70%)" }} />
      <FaQuoteLeft size={20} className="text-pink-100 mb-3" />
      <div className="flex items-center justify-between mb-3">
        <StarRow rating={review.rating} />
        <div className="flex items-center gap-1.5">
          {review.source === "google" ? (
            <span className="flex items-center gap-1 text-xs font-semibold text-slate-400"><FaGoogle size={10} className="text-blue-500" /> Google</span>
          ) : (
            <span className="text-xs font-semibold text-slate-400">Facebook</span>
          )}
        </div>
      </div>
      <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-4">{review.text}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "#fce4ec", color: THEME.pink }}>{review.service}</span>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-50 text-slate-500">{review.doctor}</span>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img src={review.avatar} alt={review.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-pink-100" />
            {review.verified && <MdVerified size={14} className="absolute -bottom-0.5 -right-0.5 text-sky-500" />}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">{review.name}</p>
            <p className="text-xs text-slate-400">{review.date}</p>
          </div>
        </div>
        <button onClick={() => setLiked(!liked)} className="flex items-center gap-1.5 text-xs font-medium transition-colors" style={{ color: liked ? THEME.pink : "#94a3b8" }}>
          <FiThumbsUp size={13} />
          {review.helpful + (liked ? 1 : 0)}
        </button>
      </div>
    </motion.div>
  );
}

// ─── VIDEO CARD ───────────────────────────────────────────────────────────────
function VideoCard({ video, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500"
    >
      <img src={video.thumbnail} alt={video.name} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div whileHover={{ scale: 1.15 }} className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/50">
          <FiPlay size={20} className="text-white ml-1" />
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white font-bold text-sm">{video.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-white/70 text-xs">{video.name}</span>
          <span className="text-white/50 text-xs">·</span>
          <span className="text-white/70 text-xs">{video.service}</span>
          <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded-full text-white">{video.duration}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── GALLERY LIGHTBOX ─────────────────────────────────────────────────────────
function Lightbox({ items, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  const item = items[currentIndex];
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative max-w-4xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={item.src} alt={item.title} className="w-full rounded-2xl object-cover max-h-[75vh]" />
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
            <p className="text-white font-bold">{item.title}</p>
            <p className="text-white/70 text-sm">{item.desc}</p>
          </div>
          <button onClick={onClose} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <FiX size={16} />
          </button>
          <button onClick={onPrev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <FiChevronLeft size={18} />
          </button>
          <button onClick={onNext} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <FiChevronRight size={18} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── GALLERY ITEM ─────────────────────────────────────────────────────────────
function GalleryItem({ item, index, onOpen }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: (index % 6) * 0.07 }}
      onClick={() => onOpen(index)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ gridColumn: item.span === "wide" ? "span 2" : "span 1", gridRow: item.span === "tall" ? "span 2" : "span 1" }}
    >
      <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 p-4"
      >
        <p className="text-white font-bold text-sm">{item.title}</p>
        <p className="text-white/70 text-xs mt-0.5">{item.desc}</p>
        <div className="mt-2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
          <FiZoomIn size={14} className="text-white" />
        </div>
      </motion.div>
      <div className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full opacity-90" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", color: "white" }}>
        {item.category}
      </div>
    </motion.div>
  );
}

// ─── STATS COUNTER ────────────────────────────────────────────────────────────
function StatBubble({ value, label, color, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay, type: "spring", stiffness: 200 }} className="flex flex-col items-center gap-1">
      <div className="text-3xl font-black" style={{ background: `linear-gradient(135deg, ${color}, ${THEME.pink})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{value}</div>
      <div className="text-xs font-semibold text-slate-500 text-center">{label}</div>
    </motion.div>
  );
}

// ─── BLOG CARD ────────────────────────────────────────────────────────────────
function BlogCard({ post, index, featured = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  if (featured) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: index * 0.1 }}
        className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 cursor-pointer"
        style={{ transform: "translateY(0)" }}
        whileHover={{ y: -5 }}
      >
        <div className="relative h-48 overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: post.categoryBg, color: post.categoryColor }}>{post.category}</span>
        </div>
        <div className="p-5">
          <h3 className="font-black text-slate-800 text-base leading-snug mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">{post.title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
          <div className="flex items-center gap-3 pt-3 border-t border-slate-50">
            <img src={post.authorImg} alt={post.author} className="w-8 h-8 rounded-full object-cover ring-2 ring-pink-100" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-700 truncate">{post.author}</p>
              <p className="text-xs text-slate-400">{post.date}</p>
            </div>
            <span className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0">
              <FiClock size={11} /> {post.readTime}
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" style={{ background: THEME.gradBtn }} />
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-400 border border-slate-100 cursor-pointer"
    >
      <img src={post.image} alt={post.title} className="w-20 h-20 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform duration-400" />
      <div className="flex-1 min-w-0">
        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: post.categoryBg, color: post.categoryColor }}>{post.category}</span>
        <h4 className="font-bold text-slate-800 text-sm leading-snug mt-1.5 mb-1 line-clamp-2 group-hover:text-pink-600 transition-colors">{post.title}</h4>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>{post.author}</span>
          <span>·</span>
          <FiClock size={10} />
          <span>{post.readTime}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── FAQ ACCORDION ────────────────────────────────────────────────────────────
function FaqAccordion({ faqs, color, bg, delay = 0 }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: delay + i * 0.07 }}
          className="rounded-2xl overflow-hidden border"
          style={{ borderColor: openIdx === i ? color + "40" : "#f1f5f9" }}
        >
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
            style={{ background: openIdx === i ? bg : "white" }}
          >
            <span className="font-bold text-slate-700 text-sm pr-4">{faq.q}</span>
            <motion.div animate={{ rotate: openIdx === i ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
              <FiChevronDown size={16} style={{ color: openIdx === i ? color : "#94a3b8" }} />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIdx === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-5 pb-4 pt-1 text-sm text-slate-500 leading-relaxed bg-white"
              >
                {faq.a}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

// ─── JOB CARD ─────────────────────────────────────────────────────────────────
function JobCard({ job, index, onApply }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 overflow-hidden relative"
    >
      {/* top color line */}
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: `linear-gradient(90deg, ${job.color}, #e91e8c)` }} />

      {job.urgent && (
        <span className="absolute top-4 right-4 text-xs font-black px-2.5 py-1 rounded-full text-white" style={{ background: "#ef4444" }}>Urgent</span>
      )}

      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: job.bg }}>
          🏥
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-black text-slate-800 text-base leading-tight">{job.title}</h3>
          <p className="text-sm font-semibold mt-0.5" style={{ color: job.color }}>{job.department}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { icon: FiMapPin, text: job.location },
          { icon: FiBriefcase, text: job.type },
          { icon: FiUser, text: job.experience },
          { icon: FiDollarSign, text: job.salary },
        ].map(({ icon: Icon, text }, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-slate-500">
            <Icon size={11} style={{ color: job.color }} />
            <span className="truncate">{text}</span>
          </div>
        ))}
      </div>

      <p className="text-sm text-slate-500 leading-relaxed mb-3 line-clamp-2">{job.description}</p>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <p className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Requirements</p>
            <ul className="space-y-1.5">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
                  <FiCheck size={12} className="mt-0.5 flex-shrink-0" style={{ color: job.color }} />
                  {req}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
              <FiCalendar size={11} />
              <span>Deadline: <strong className="text-slate-600">{job.deadline}</strong></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2 pt-3 border-t border-slate-50">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onApply(job)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white shadow-md"
          style={{ background: `linear-gradient(135deg, ${job.color}, #e91e8c)` }}
        >
          Apply Now
        </motion.button>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all"
          style={{ borderColor: job.color + "40", color: job.color, background: job.bg }}
        >
          {expanded ? "Less" : "Details"}
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <FiChevronDown size={12} />
          </motion.span>
        </button>
      </div>
    </motion.div>
  );
}

// ─── MAIN RESOURCES PAGE ──────────────────────────────────────────────────────
export default function ResourcesPage({ onNavigate }) {
  const [activeSection, setActiveSection] = useState("reviews");
  const [reviewTag, setReviewTag] = useState("all");
  const [galleryCat, setGalleryCat] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [blogTag, setBlogTag] = useState("all");
  const [activeFaqCat, setActiveFaqCat] = useState("appointments");
  const [appliedJob, setAppliedJob] = useState(null);

  const filteredReviews = REVIEWS.filter((r) => {
    const matchTag = reviewTag === "all" || r.tag === reviewTag;
    const q = search.toLowerCase();
    const matchSearch = !q || r.text.toLowerCase().includes(q) || r.name.toLowerCase().includes(q) || r.doctor.toLowerCase().includes(q);
    return matchTag && matchSearch;
  });

  const filteredGallery = GALLERY_ITEMS.filter((g) => galleryCat === "all" || g.category === galleryCat);
  const filteredBlogFeatured = BLOG_POSTS.filter((p) => p.featured && (blogTag === "all" || p.tag === blogTag));
  const filteredBlogRest = BLOG_POSTS.filter((p) => !p.featured && (blogTag === "all" || p.tag === blogTag));

  const whatsappNumber = "+923001234567";
  const welcomeMessage = encodeURIComponent("Hello Premium Clinic, I want to book an appointment.");

  const TABS = [
    { id: "reviews",   label: "Patient Reviews",    icon: FiStar },
    { id: "gallery",   label: "Gallery",             icon: FiCamera },
    { id: "videos",    label: "Video Stories",       icon: FiVideo },
    { id: "blog",      label: "Blog & Articles",     icon: FiBookOpen },
    { id: "faq",       label: "FAQ",                 icon: FiHelpCircle },
    { id: "insurance", label: "Insurance",           icon: FiShield },
    { id: "careers",   label: "Careers / Jobs",      icon: FiBriefcase },
  ];

  return (
    <div className="min-h-screen font-sans" style={{ background: THEME.grad }}>
      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <Lightbox
          items={filteredGallery}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i - 1 + filteredGallery.length) % filteredGallery.length)}
          onNext={() => setLightboxIndex((i) => (i + 1) % filteredGallery.length)}
        />
      )}

      {/* ── APPLY MODAL ── */}
      <AnimatePresence>
        {appliedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setAppliedJob(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setAppliedJob(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                <FiX size={14} />
              </button>
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-xl font-black text-slate-800 mb-1">Apply for {appliedJob.title}</h3>
              <p className="text-slate-500 text-sm mb-6">Send your CV and cover letter to our HR team. We review applications within 3–5 working days.</p>
              <div className="space-y-3">
                <a
                  href={`mailto:hr@premiumclinic.com?subject=Application for ${appliedJob.title}`}
                  className="flex items-center gap-3 w-full px-5 py-3.5 rounded-2xl font-bold text-sm text-white shadow-lg"
                  style={{ background: THEME.gradBtn }}
                >
                  <FiMail size={16} />
                  Send CV via Email
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I'd like to apply for the ${appliedJob.title} position at Premium Clinic.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full px-5 py-3.5 rounded-2xl font-bold text-sm"
                  style={{ background: "#d1fae5", color: "#065f46" }}
                >
                  <FaWhatsapp size={16} />
                  Apply via WhatsApp
                </a>
              </div>
              <p className="text-xs text-slate-400 mt-4 text-center">hr@premiumclinic.com · +92-300-1234567</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden pt-10 pb-10 px-4">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => onNavigate?.("home")}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-pink-600 transition-colors mb-6 ml-4 sm:ml-8"
        >
          <FiChevronLeft size={18} />
          Back to Home
        </motion.button>

        {/* Animated blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 left-[10%] w-80 h-80 rounded-full opacity-30" style={{ background: "radial-gradient(circle, #fce4ec, transparent)" }} />
          <motion.div animate={{ x: [0, -25, 0], y: [0, 15, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 right-[15%] w-64 h-64 rounded-full opacity-25" style={{ background: "radial-gradient(circle, #e0f2fe, transparent)" }} />
          <motion.div animate={{ x: [0, 20, 0], y: [0, 25, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-0 left-[40%] w-96 h-48 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #fdf4ff, transparent)" }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 mb-4">
            <span className="cursor-pointer hover:text-pink-500 transition-colors flex items-center gap-1" onClick={() => onNavigate?.("home")}>
              <FiHome size={11} /> Home
            </span>
            <span>/</span>
            <span className="text-pink-500">Resources</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-4 shadow-sm" style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(10px)", color: THEME.pink, border: "1px solid #fce4ec" }}>
            <HiSparkles size={13} />
            Trusted by 20,000+ Patients Across Pakistan
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }} className="text-4xl sm:text-6xl font-black text-slate-800 mb-3 leading-tight">
            Real Stories,{" "}
            <span style={{ background: "linear-gradient(135deg, #e91e8c, #0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Real Results</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }} className="text-slate-500 text-lg max-w-2xl mx-auto mb-8">
            Explore patient experiences, health articles, career opportunities, insurance info, and more from Pakistan's leading clinic.
          </motion.p>

          {/* Stats row */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 mb-8">
            <StatBubble value="4.9★" label="Google Rating" color="#FBBF24" delay={0.4} />
            <StatBubble value="2,400+" label="Verified Reviews" color={THEME.sky} delay={0.45} />
            <StatBubble value="98%" label="Patient Satisfaction" color={THEME.mint} delay={0.5} />
            <StatBubble value="15+" label="Years of Excellence" color={THEME.peach} delay={0.55} />
          </motion.div>

          {/* Section tabs — scrollable pill bar */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex justify-center">
            <div
              className="flex gap-2 p-1.5 rounded-2xl shadow-md overflow-x-auto max-w-full"
              style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", scrollbarWidth: "none" }}
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap flex-shrink-0"
                  style={
                    activeSection === tab.id
                      ? { background: THEME.gradBtn, color: "white", boxShadow: "0 4px 20px rgba(233,30,140,0.3)" }
                      : { color: "#64748b" }
                  }
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTIONS ── */}
      <AnimatePresence mode="wait">

        {/* ── PATIENT REVIEWS ── */}
        {activeSection === "reviews" && (
          <motion.section key="reviews" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="px-4 pb-20 max-w-7xl mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ background: THEME.gradBtn }} />
                <h2 className="text-2xl font-black text-slate-800">Featured Reviews</h2>
                <div className="px-3 py-1 rounded-full text-xs font-bold ml-1" style={{ background: "#fce4ec", color: THEME.pink }}>Editor's Pick</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {REVIEWS.filter((r) => r.featured).map((review, i) => (
                  <motion.div key={review.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} className="relative rounded-3xl overflow-hidden p-7 shadow-lg hover:shadow-2xl transition-shadow duration-500" style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(252,228,236,0.3))", border: "1.5px solid rgba(233,30,140,0.1)" }}>
                    <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: THEME.gradBtn }} />
                    <FaQuoteLeft size={28} className="mb-3" style={{ color: "#fce4ec" }} />
                    <StarRow rating={review.rating} size={15} />
                    <p className="mt-3 mb-5 text-slate-700 text-sm leading-relaxed">{review.text}</p>
                    <div className="flex items-center gap-3 pt-3 border-t border-pink-50">
                      <img src={review.avatar} alt={review.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-pink-200" />
                      <div>
                        <p className="font-bold text-slate-800 text-sm flex items-center gap-1.5">{review.name}{review.verified && <MdVerified size={14} className="text-sky-500" />}</p>
                        <p className="text-xs text-slate-400">{review.service} · {review.date}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="rounded-3xl p-6 mb-10 flex flex-col sm:flex-row items-center gap-6 shadow-md" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(251, 191, 36, 0.2)" }}>
              <div className="flex items-center gap-5">
                <div className="text-center">
                  <div className="text-6xl font-black" style={{ color: "#1a1a2e" }}>4.9</div>
                  <StarRow rating={4.9} size={18} />
                  <p className="text-xs text-slate-400 mt-1">2,400+ reviews</p>
                </div>
                <div className="hidden sm:flex flex-col gap-1.5 min-w-[160px]">
                  {[{ stars: 5, pct: 87 }, { stars: 4, pct: 10 }, { stars: 3, pct: 2 }, { stars: 2, pct: 0.5 }, { stars: 1, pct: 0.5 }].map((row) => (
                    <div key={row.stars} className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="w-4 text-right">{row.stars}</span>
                      <FaStar size={9} color="#FBBF24" />
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${row.pct}%` }} transition={{ duration: 1, delay: 0.5 }} className="h-full rounded-full" style={{ background: THEME.gradBtn }} />
                      </div>
                      <span className="w-7">{row.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="sm:ml-auto flex flex-col items-center sm:items-end gap-3">
                <div className="flex items-center gap-2">
                  <FaGoogle size={18} className="text-blue-500" />
                  <span className="font-bold text-slate-700">Verified on Google</span>
                  <HiOutlineBadgeCheck size={18} className="text-green-500" />
                </div>
                <a href="#" className="px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg hover:shadow-xl transition-shadow" style={{ background: THEME.gradBtn }}>Write a Review</a>
              </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-3 mb-7">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl flex-1 max-w-sm" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid #fce4ec" }}>
                <FiSearch size={15} className="text-pink-400" />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search reviews by doctor, service..." className="bg-transparent text-sm text-slate-700 outline-none flex-1 placeholder-slate-300" />
              </div>
              <div className="flex flex-wrap gap-2">
                {REVIEW_TAGS.map((tag) => (
                  <button key={tag.value} onClick={() => setReviewTag(tag.value)} className="px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap" style={reviewTag === tag.value ? { background: THEME.gradBtn, color: "white", boxShadow: "0 2px 12px rgba(233,30,140,0.25)" } : { background: "rgba(255,255,255,0.8)", color: "#64748b", border: "1px solid #e2e8f0" }}>{tag.label}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredReviews.map((review, i) => <ReviewCard key={review.id} review={review} index={i} />)}
            </div>
            {filteredReviews.length === 0 && <div className="text-center py-16"><p className="text-slate-400 text-sm">No reviews found. Try a different filter.</p></div>}
            <div className="text-center mt-10">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="px-8 py-3.5 rounded-2xl font-bold text-sm text-white shadow-xl hover:shadow-2xl transition-shadow" style={{ background: THEME.gradBtn }}>Load More Reviews</motion.button>
            </div>
          </motion.section>
        )}

        {/* ── GALLERY ── */}
        {activeSection === "gallery" && (
          <motion.section key="gallery" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="px-4 pb-20 max-w-7xl mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-1 h-8 rounded-full" style={{ background: THEME.gradBtn }} />
                  <h2 className="text-2xl font-black text-slate-800">Clinic Gallery</h2>
                </div>
                <p className="text-slate-400 text-sm ml-4">World-class facilities & our expert team in action</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: "rgba(255,255,255,0.8)", color: "#64748b", border: "1px solid #e2e8f0" }}>
                <FiEye size={13} /> {filteredGallery.length} photos
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {GALLERY_CATS.map((cat) => (
                <button key={cat.value} onClick={() => setGalleryCat(cat.value)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200" style={galleryCat === cat.value ? { background: THEME.gradBtn, color: "white", boxShadow: "0 2px 12px rgba(233,30,140,0.25)" } : { background: "rgba(255,255,255,0.8)", color: "#64748b", border: "1px solid #e2e8f0" }}>
                  <cat.icon size={12} /> {cat.label}
                </button>
              ))}
            </div>
            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gridAutoRows: "200px" }}>
              {filteredGallery.map((item, i) => <GalleryItem key={item.id} item={item} index={i} onOpen={setLightboxIndex} />)}
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-12 rounded-3xl p-8 text-center overflow-hidden relative" style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #e91e8c 100%)" }}>
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10">
                <div className="text-4xl mb-3">🏥</div>
                <h3 className="text-2xl font-black text-white mb-2">Take a Virtual Tour</h3>
                <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">Experience our state-of-the-art facility from the comfort of your home with our 360° interactive tour.</p>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="px-7 py-3 rounded-xl font-bold text-sm shadow-xl bg-white hover:bg-white/90 transition-colors" style={{ color: THEME.pink }}>🌐 Start 360° Tour</motion.button>
              </div>
            </motion.div>
          </motion.section>
        )}

        {/* ── VIDEO STORIES ── */}
        {activeSection === "videos" && (
          <motion.section key="videos" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="px-4 pb-20 max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 rounded-full" style={{ background: THEME.gradBtn }} />
              <h2 className="text-2xl font-black text-slate-800">Video Testimonials</h2>
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#e0f2fe", color: THEME.sky }}>Real Patient Stories</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {VIDEO_TESTIMONIALS.map((v, i) => <VideoCard key={v.id} video={v} index={i} />)}
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-12 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6" style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", border: "1.5px solid rgba(233,30,140,0.1)" }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #fce4ec, #e0f2fe)" }}>
                <FiVideo size={26} style={{ color: THEME.pink }} />
              </div>
              <div>
                <h3 className="font-black text-slate-800 text-lg mb-1">Share Your Story</h3>
                <p className="text-slate-500 text-sm">Had a great experience at Premium Clinic? We'd love to feature your testimonial and inspire others on their health journey.</p>
              </div>
              <motion.a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("I want to share my experience at Premium Clinic")}`} target="_blank" whileHover={{ scale: 1.04 }} className="ml-auto flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg" style={{ background: "#25D366" }}>
                <FaWhatsapp size={16} /> Share on WhatsApp
              </motion.a>
            </motion.div>
          </motion.section>
        )}

        {/* ── BLOG & HEALTH ARTICLES ── */}
        {activeSection === "blog" && (
          <motion.section key="blog" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="px-4 pb-20 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 rounded-full" style={{ background: THEME.gradBtn }} />
              <h2 className="text-2xl font-black text-slate-800">Blog & Health Articles</h2>
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#fce4ec", color: THEME.pink }}>Doctor-Written</span>
            </div>
            <p className="text-slate-400 text-sm mb-8 ml-4">Evidence-based health advice from our specialists — straight to you.</p>

            {/* Tag filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {BLOG_TAGS.map((tag) => (
                <button key={tag.value} onClick={() => setBlogTag(tag.value)} className="px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap" style={blogTag === tag.value ? { background: THEME.gradBtn, color: "white", boxShadow: "0 2px 12px rgba(233,30,140,0.25)" } : { background: "rgba(255,255,255,0.8)", color: "#64748b", border: "1px solid #e2e8f0" }}>
                  {tag.label}
                </button>
              ))}
            </div>

            {/* Featured grid */}
            {filteredBlogFeatured.length > 0 && (
              <div className="mb-10">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-5">Featured Articles</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBlogFeatured.map((post, i) => <BlogCard key={post.id} post={post} index={i} featured />)}
                </div>
              </div>
            )}

            {/* More articles list */}
            {filteredBlogRest.length > 0 && (
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-5">More Articles</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredBlogRest.map((post, i) => <BlogCard key={post.id} post={post} index={i} />)}
                </div>
              </div>
            )}

            {filteredBlogFeatured.length === 0 && filteredBlogRest.length === 0 && (
              <div className="text-center py-16"><p className="text-slate-400 text-sm">No articles in this category yet.</p></div>
            )}

            {/* Newsletter CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-14 rounded-3xl p-8 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #a855f7 50%, #e91e8c 100%)" }}
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                <div className="text-4xl">📬</div>
                <div>
                  <h3 className="text-xl font-black text-white mb-1">Get Health Tips in Your Inbox</h3>
                  <p className="text-white/75 text-sm">Subscribe for weekly health articles, clinic news, and exclusive offers.</p>
                </div>
                <div className="sm:ml-auto flex gap-2 flex-shrink-0">
                  <input type="email" placeholder="Your email address" className="px-4 py-2.5 rounded-xl text-sm outline-none bg-white/20 text-white placeholder-white/60 border border-white/30 focus:border-white/60 transition-colors min-w-0 w-44" />
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="px-5 py-2.5 rounded-xl font-bold text-sm bg-white shadow-lg whitespace-nowrap" style={{ color: THEME.pink }}>Subscribe</motion.button>
                </div>
              </div>
            </motion.div>
          </motion.section>
        )}

        {/* ── FAQ ── */}
        {activeSection === "faq" && (
          <motion.section key="faq" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="px-4 pb-20 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 rounded-full" style={{ background: THEME.gradBtn }} />
              <h2 className="text-2xl font-black text-slate-800">Frequently Asked Questions</h2>
            </div>
            <p className="text-slate-400 text-sm mb-8 ml-4">Everything you need to know about Premium Clinic — answered clearly.</p>

            {/* Category tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {FAQ_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeFaqCat === cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setActiveFaqCat(cat.id)}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-300 text-center"
                    style={isActive ? { background: cat.bg, border: `1.5px solid ${cat.color}40`, boxShadow: `0 4px 20px ${cat.color}20` } : { background: "rgba(255,255,255,0.8)", border: "1px solid #f1f5f9" }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: isActive ? cat.color : "#f1f5f9" }}>
                      <Icon size={18} style={{ color: isActive ? "white" : "#94a3b8" }} />
                    </div>
                    <span className="text-xs font-bold" style={{ color: isActive ? cat.color : "#64748b" }}>{cat.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* FAQ accordion */}
            <AnimatePresence mode="wait">
              {FAQ_CATEGORIES.filter((c) => c.id === activeFaqCat).map((cat) => (
                <motion.div key={cat.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
                  <FaqAccordion faqs={cat.questions} color={cat.color} bg={cat.bg} />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Still have questions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12 rounded-3xl p-7 text-center"
              style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1.5px solid rgba(233,30,140,0.1)" }}
            >
              <div className="text-4xl mb-3">💬</div>
              <h3 className="text-xl font-black text-slate-800 mb-2">Still Have a Question?</h3>
              <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">Our team is available 7 days a week. Reach us instantly on WhatsApp or give us a call.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <motion.a href={`https://wa.me/${whatsappNumber}`} target="_blank" whileHover={{ scale: 1.04 }} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg" style={{ background: "#25D366" }}>
                  <FaWhatsapp size={16} /> WhatsApp Us
                </motion.a>
                <motion.a href="tel:+923001234567" whileHover={{ scale: 1.04 }} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg" style={{ background: THEME.gradBtn }}>
                  <FiPhone size={15} /> Call Us Now
                </motion.a>
              </div>
            </motion.div>
          </motion.section>
        )}

        {/* ── INSURANCE INFORMATION ── */}
        {activeSection === "insurance" && (
          <motion.section key="insurance" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="px-4 pb-20 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 rounded-full" style={{ background: THEME.gradBtn }} />
              <h2 className="text-2xl font-black text-slate-800">Insurance Information</h2>
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#d1fae5", color: "#065f46" }}>Panel Updated 2026</span>
            </div>
            <p className="text-slate-400 text-sm mb-10 ml-4">We work with Pakistan's leading insurers to make quality healthcare accessible and affordable.</p>

            {/* How it works */}
            <div className="mb-12">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">How Insurance Works at Premium Clinic</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { step: "01", icon: "🪪", title: "Bring Your Card", desc: "Bring your insurance card and CNIC to our reception desk." },
                  { step: "02", icon: "✅", title: "Instant Verification", desc: "Our insurance desk verifies your eligibility in real-time." },
                  { step: "03", icon: "🩺", title: "Receive Treatment", desc: "Get treated — our doctors focus on your care, not the paperwork." },
                  { step: "04", icon: "📋", title: "We Handle Claims", desc: "Premium Clinic submits all claims directly to your insurer." },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative bg-white rounded-3xl p-6 shadow-sm border border-slate-100 overflow-hidden group hover:shadow-lg transition-shadow duration-400"
                  >
                    <div className="absolute top-4 right-4 text-5xl font-black opacity-5 select-none">{step.step}</div>
                    <div className="text-3xl mb-3">{step.icon}</div>
                    <h4 className="font-black text-slate-800 text-sm mb-1.5">{step.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" style={{ background: THEME.gradBtn }} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Insurance partners grid */}
            <div className="mb-12">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Our Accepted Insurance Partners</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {INSURANCE_PARTNERS.map((ins, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    whileHover={{ y: -4, boxShadow: `0 12px 40px ${ins.color}20` }}
                    className="bg-white rounded-2xl p-5 text-center shadow-sm border border-slate-100 cursor-default transition-all duration-300"
                  >
                    <div className="text-3xl mb-2">{ins.logo}</div>
                    <p className="font-black text-slate-800 text-sm">{ins.name}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold mt-1.5 inline-block" style={{ background: ins.color + "15", color: ins.color }}>{ins.type}</span>
                    <p className="text-xs text-slate-400 mt-1.5 font-medium">{ins.coverage}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Coverage table */}
            <div className="mb-12 bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                <FiShield size={18} style={{ color: THEME.pink }} />
                <h3 className="font-black text-slate-800">What's Covered</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-6 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-wide">Service</th>
                      <th className="px-6 py-3 text-center text-xs font-black text-slate-500 uppercase tracking-wide">OPD</th>
                      <th className="px-6 py-3 text-center text-xs font-black text-slate-500 uppercase tracking-wide">IPD</th>
                      <th className="px-6 py-3 text-center text-xs font-black text-slate-500 uppercase tracking-wide">Surgical</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { service: "General Consultation", opd: true, ipd: true, surg: false },
                      { service: "Diagnostic Tests & Labs", opd: true, ipd: true, surg: false },
                      { service: "Emergency Services", opd: true, ipd: true, surg: true },
                      { service: "Surgical Procedures", opd: false, ipd: true, surg: true },
                      { service: "Physiotherapy", opd: true, ipd: true, surg: false },
                      { service: "Cosmetic Procedures", opd: false, ipd: false, surg: false },
                      { service: "Maternity Services", opd: true, ipd: true, surg: true },
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                        <td className="px-6 py-3.5 text-slate-700 font-medium text-sm">{row.service}</td>
                        {[row.opd, row.ipd, row.surg].map((v, j) => (
                          <td key={j} className="px-6 py-3.5 text-center">
                            {v ? <FiCheck size={16} className="mx-auto" style={{ color: "#34d399" }} /> : <FiX size={16} className="mx-auto text-slate-200" />}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-3 bg-slate-50/50 text-xs text-slate-400 border-t border-slate-100">* Coverage varies by insurer and policy. Confirm with your insurance company or contact our insurance desk.</div>
            </div>

            {/* Insurance FAQs */}
            <div className="mb-8">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-5">Insurance FAQs</p>
              <FaqAccordion faqs={INSURANCE_FAQS} color={THEME.sky} bg="#e0f2fe" />
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl p-7 flex flex-col sm:flex-row items-center gap-6"
              style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1.5px solid rgba(14,165,233,0.15)" }}
            >
              <div className="text-4xl flex-shrink-0">🛡️</div>
              <div>
                <h3 className="font-black text-slate-800 text-lg mb-1">Need Insurance Assistance?</h3>
                <p className="text-slate-500 text-sm">Our dedicated insurance desk is available 9 AM – 6 PM, 6 days a week. We'll guide you through everything.</p>
              </div>
              <div className="sm:ml-auto flex flex-shrink-0 gap-2">
                <motion.a href="tel:+923001234567" whileHover={{ scale: 1.04 }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white" style={{ background: THEME.gradBtn }}>
                  <FiPhone size={14} /> Call Desk
                </motion.a>
                <motion.a href={`https://wa.me/${whatsappNumber}`} target="_blank" whileHover={{ scale: 1.04 }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white" style={{ background: "#25D366" }}>
                  <FaWhatsapp size={15} /> WhatsApp
                </motion.a>
              </div>
            </motion.div>
          </motion.section>
        )}

        {/* ── CAREERS / JOBS ── */}
        {activeSection === "careers" && (
          <motion.section key="careers" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="px-4 pb-20 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 rounded-full" style={{ background: THEME.gradBtn }} />
              <h2 className="text-2xl font-black text-slate-800">Careers at Premium Clinic</h2>
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#fef3c7", color: "#b45309" }}>{JOB_OPENINGS.length} Open Positions</span>
            </div>
            <p className="text-slate-400 text-sm mb-10 ml-4">Join a team that's transforming healthcare in Pakistan. We hire passionate, skilled, and compassionate professionals.</p>

            {/* Why join us — perks */}
            <div className="mb-12">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Why Join Premium Clinic?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {CAREER_PERKS.map((perk, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className="group flex gap-4 items-start bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-pink-100 transition-all duration-300"
                  >
                    <div className="text-3xl flex-shrink-0">{perk.icon}</div>
                    <div>
                      <h4 className="font-black text-slate-800 text-sm mb-1">{perk.title}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{perk.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Current openings */}
            <div className="mb-8">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Current Openings</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {JOB_OPENINGS.map((job, i) => <JobCard key={job.id} job={job} index={i} onApply={setAppliedJob} />)}
              </div>
            </div>

            {/* Spontaneous application CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl p-8 relative overflow-hidden text-center"
              style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #a855f7 50%, #e91e8c 100%)" }}
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-2xl font-black text-white mb-2">Don't See a Matching Role?</h3>
                <p className="text-white/75 text-sm mb-7 max-w-md mx-auto">Send us a spontaneous application. We're always looking for exceptional talent across all departments.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <motion.a href="mailto:hr@premiumclinic.com" whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-white shadow-xl" style={{ color: THEME.pink }}>
                    <FiMail size={15} /> Email HR Team
                  </motion.a>
                  <motion.a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi, I'd like to discuss a career opportunity at Premium Clinic.")}`} target="_blank" whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm border-2 border-white/40 text-white hover:bg-white/10 transition-colors">
                    <FaWhatsapp size={15} /> Chat on WhatsApp
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.section>
        )}

      </AnimatePresence>

      {/* ── BOTTOM CTA ── */}
      <section className="relative overflow-hidden py-20 px-4" style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #a855f7 50%, #e91e8c 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-5xl font-black text-white mb-4">
            Ready to Experience Premium Healthcare?
          </motion.h2>
          <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto">Join 20,000+ patients who trust Premium Clinic for their health journey.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="px-8 py-3.5 rounded-xl font-bold text-sky-600 bg-white shadow-xl hover:bg-white/90 transition-all flex items-center gap-2 text-sm" onClick={() => onNavigate?.("booking")}>
              <FiCalendar size={14} /> Book Appointment
            </motion.button>
            <motion.a href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`} target="_blank" whileHover={{ scale: 1.05 }} className="px-8 py-3.5 rounded-xl font-bold text-white border-2 border-white/40 hover:bg-white/10 transition-all flex items-center gap-2 text-sm">
              <FaWhatsapp size={15} /> Chat on WhatsApp
            </motion.a>
          </div>
        </div>
      </section>

      {/* ── FLOATING WHATSAPP ── */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        <div className="absolute w-16 h-16 bg-green-500 rounded-full animate-ping opacity-40 pointer-events-none" />
        <motion.a
          href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#20ba5a] transition-colors duration-200 cursor-pointer group"
        >
          <FaWhatsapp size={36} />
          <span className="absolute right-20 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 pointer-events-none transition-all duration-200">Chat With Us</span>
        </motion.a>
      </div>
    </div>
  );
}