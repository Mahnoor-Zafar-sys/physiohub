

// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence, useInView } from "framer-motion";
// import {
//   FiStar, FiCalendar, FiMessageCircle, FiVideo,
//   FiAward, FiClock, FiSearch, FiX, FiChevronDown,
//   FiGlobe, FiPhone, FiMail, FiLinkedin, FiFilter,
//   FiMapPin, FiCheckCircle, FiHeart, FiTwitter,
// } from "react-icons/fi";
// import {
//   FaWhatsapp, FaLinkedinIn, FaFacebook, FaTwitter, FaInstagram,
//   FaStar, FaRegStar, FaStarHalfAlt, FaHeartbeat,
// } from "react-icons/fa";
// import { GiTooth, GiHeartBeats, GiBrain, GiBabyFace } from "react-icons/gi";
// import { TbStethoscope, TbBone, TbEar, TbEye, TbBrandWhatsapp } from "react-icons/tb";
// import { MdFace, MdOutlineContentCut } from "react-icons/md";
// import { HiOutlineArrowRight, HiOutlineBadgeCheck } from "react-icons/hi";

// // ─── DOCTOR DATA ──────────────────────────────────────────────────────────────
// const doctors = [
//   {
//     id: 1,
//     name: "Dr. Sarah Ahmed",
//     slug: "dr-sarah-ahmed",
//     title: "MBBS, FCPS (Dermatology)",
//     specialty: "Skin & Dermatology",
//     tag: "skin",
//     image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
//     experience: "14 Years",
//     patients: "8,500+",
//     rating: 4.9,
//     reviews: 312,
//     fee: "PKR 3,000",
//     languages: ["Urdu", "English"],
//     available: true,
//     nextSlot: "Today, 4:00 PM",
//     gender: "Female",
//     branch: ["Gulberg", "DHA"],
//     availabilitySchedule: [
//       { day: "Monday", time: "10:00 AM – 2:00 PM" },
//       { day: "Wednesday", time: "3:00 PM – 7:00 PM" },
//       { day: "Friday", time: "10:00 AM – 1:00 PM" },
//       { day: "Saturday", time: "4:00 PM – 8:00 PM" },
//     ],
//     specializations: ["Laser Therapy", "Acne Treatment", "Anti-Aging", "PRP Rejuvenation"],
//     services: ["Laser Resurfacing", "Chemical Peels", "Botox & Fillers", "Skin Biopsy", "Mole Removal"],
//     education: [
//       { degree: "MBBS", institution: "King Edward Medical University", year: "2008" },
//       { degree: "FCPS (Dermatology)", institution: "College of Physicians & Surgeons Pakistan", year: "2013" },
//     ],
//     bio: "Dr. Sarah Ahmed is one of Pakistan's leading dermatologists with over 14 years of clinical experience. Trained at KEMU and fellowship-certified, she specializes in advanced laser therapies, cosmetic procedures, and medically complex skin conditions. She has treated thousands of patients suffering from acne, pigmentation, eczema, and premature aging.",
//     certifications: ["CPSP Fellow", "EADV Member", "AAD Associate"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#ec4899",
//     gradient: "from-pink-500 to-rose-400",
//     lightBg: "from-pink-50 to-rose-50",
//     borderColor: "border-pink-200",
//     accentText: "text-pink-600",
//     badgeBg: "bg-pink-100",
//     badgeText: "text-pink-700",
//     IconComp: MdFace,
//   },
//   {
//     id: 2,
//     name: "Dr. Omar Farooq",
//     slug: "dr-omar-farooq",
//     title: "BDS, FCPS (Oral Surgery)",
//     specialty: "Dental Care",
//     tag: "dental",
//     image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
//     experience: "11 Years",
//     patients: "12,000+",
//     rating: 4.8,
//     reviews: 489,
//     fee: "PKR 2,500",
//     languages: ["Urdu", "English", "Punjabi"],
//     available: true,
//     nextSlot: "Today, 5:30 PM",
//     gender: "Male",
//     branch: ["Gulberg"],
//     availabilitySchedule: [
//       { day: "Monday", time: "9:00 AM – 1:00 PM" },
//       { day: "Tuesday", time: "2:00 PM – 6:00 PM" },
//       { day: "Thursday", time: "9:00 AM – 1:00 PM" },
//       { day: "Saturday", time: "10:00 AM – 3:00 PM" },
//     ],
//     specializations: ["Dental Implants", "Root Canal", "Cosmetic Dentistry", "Orthodontics"],
//     services: ["Teeth Whitening", "Veneers", "Dental Crowns", "Tooth Extraction", "Braces & Aligners"],
//     education: [
//       { degree: "BDS", institution: "University of Health Sciences, Lahore", year: "2011" },
//       { degree: "FCPS (Oral Surgery)", institution: "CPSP", year: "2016" },
//     ],
//     bio: "Dr. Omar Farooq is a board-certified oral surgeon and cosmetic dentist with 11 years of expertise. He is renowned for his painless root canal technique and natural-looking dental implants. His clinic sees over 50 patients daily, making him one of the most sought-after dental specialists in Lahore.",
//     certifications: ["CPSP Fellow", "IAOI Member", "ICOI Associate"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#0ea5e9",
//     gradient: "from-sky-500 to-cyan-400",
//     lightBg: "from-sky-50 to-cyan-50",
//     borderColor: "border-sky-200",
//     accentText: "text-sky-600",
//     badgeBg: "bg-sky-100",
//     badgeText: "text-sky-700",
//     IconComp: GiTooth,
//   },
//   {
//     id: 3,
//     name: "Dr. Fatima Malik",
//     slug: "dr-fatima-malik",
//     title: "MBBS, MRCOG (Gynecology)",
//     specialty: "Gynecology & Obstetrics",
//     tag: "gynecology",
//     image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80",
//     experience: "16 Years",
//     patients: "9,200+",
//     rating: 5.0,
//     reviews: 267,
//     fee: "PKR 4,000",
//     languages: ["Urdu", "English"],
//     available: false,
//     nextSlot: "Tomorrow, 10:00 AM",
//     gender: "Female",
//     branch: ["Gulberg", "DHA"],
//     availabilitySchedule: [
//       { day: "Tuesday", time: "10:00 AM – 2:00 PM" },
//       { day: "Thursday", time: "3:00 PM – 7:00 PM" },
//       { day: "Saturday", time: "9:00 AM – 1:00 PM" },
//     ],
//     specializations: ["High-Risk Pregnancy", "Infertility", "Laparoscopy", "PCOS Management"],
//     services: ["Antenatal Care", "Ultrasound", "Fertility Evaluation", "Hysteroscopy", "Normal & C-Section Delivery"],
//     education: [
//       { degree: "MBBS", institution: "Fatima Jinnah Medical University", year: "2006" },
//       { degree: "MRCOG", institution: "Royal College of Obstetricians, London", year: "2012" },
//     ],
//     bio: "Dr. Fatima Malik is an internationally trained gynecologist and obstetrician with London MRCOG credentials. Specializing in high-risk pregnancies and minimally invasive gynecological surgeries, she brings global medical standards to Lahore. She is deeply committed to women's reproductive health and patient education.",
//     certifications: ["MRCOG (London)", "CPSP Fellow", "FOGSI Member"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#a855f7",
//     gradient: "from-violet-500 to-purple-400",
//     lightBg: "from-violet-50 to-purple-50",
//     borderColor: "border-violet-200",
//     accentText: "text-violet-600",
//     badgeBg: "bg-violet-100",
//     badgeText: "text-violet-700",
//     IconComp: GiBabyFace,
//   },
//   {
//     id: 4,
//     name: "Dr. Hassan Raza",
//     slug: "dr-hassan-raza",
//     title: "MBBS, FCPS (Orthopedics)",
//     specialty: "Orthopedic Surgery",
//     tag: "orthopedic",
//     image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
//     experience: "18 Years",
//     patients: "15,000+",
//     rating: 4.9,
//     reviews: 543,
//     fee: "PKR 3,500",
//     languages: ["Urdu", "English"],
//     available: true,
//     nextSlot: "Today, 7:00 PM",
//     gender: "Male",
//     branch: ["Gulberg"],
//     availabilitySchedule: [
//       { day: "Monday", time: "9:00 AM – 12:00 PM" },
//       { day: "Wednesday", time: "4:00 PM – 8:00 PM" },
//       { day: "Friday", time: "9:00 AM – 12:00 PM" },
//       { day: "Sunday", time: "11:00 AM – 3:00 PM" },
//     ],
//     specializations: ["Joint Replacement", "Sports Injuries", "Spine Surgery", "Arthroscopy"],
//     services: ["Hip Replacement", "Knee Replacement", "Fracture Surgery", "Spinal Fusion", "Shoulder Repair"],
//     education: [
//       { degree: "MBBS", institution: "Allama Iqbal Medical College", year: "2004" },
//       { degree: "FCPS (Orthopedics)", institution: "CPSP", year: "2010" },
//     ],
//     bio: "Dr. Hassan Raza is a senior orthopedic surgeon with 18 years of experience in complex joint replacements and spinal procedures. He uses the latest robotic-assisted surgery systems to achieve faster recovery times. He has performed over 3,000 successful knee and hip replacement surgeries.",
//     certifications: ["CPSP Fellow", "AOTrauma Member", "POAS President"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#f59e0b",
//     gradient: "from-amber-500 to-orange-400",
//     lightBg: "from-amber-50 to-orange-50",
//     borderColor: "border-amber-200",
//     accentText: "text-amber-600",
//     badgeBg: "bg-amber-100",
//     badgeText: "text-amber-700",
//     IconComp: TbBone,
//   },
//   {
//     id: 5,
//     name: "Dr. Zara Khan",
//     slug: "dr-zara-khan",
//     title: "MBBS, FCPS (ENT)",
//     specialty: "ENT Specialist",
//     tag: "ent",
//     image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=400&q=80",
//     experience: "9 Years",
//     patients: "6,800+",
//     rating: 4.7,
//     reviews: 198,
//     fee: "PKR 2,800",
//     languages: ["Urdu", "English"],
//     available: true,
//     nextSlot: "Today, 3:30 PM",
//     gender: "Female",
//     branch: ["DHA"],
//     availabilitySchedule: [
//       { day: "Tuesday", time: "10:00 AM – 2:00 PM" },
//       { day: "Thursday", time: "3:30 PM – 7:00 PM" },
//       { day: "Saturday", time: "10:00 AM – 2:00 PM" },
//     ],
//     specializations: ["Hearing Loss", "Sinus Surgery", "Vocal Cord Treatment", "Tonsillectomy"],
//     services: ["Audiometry", "Endoscopy", "Adenoidectomy", "Septoplasty", "Tympanoplasty"],
//     education: [
//       { degree: "MBBS", institution: "Nishtar Medical University", year: "2013" },
//       { degree: "FCPS (ENT)", institution: "CPSP", year: "2019" },
//     ],
//     bio: "Dr. Zara Khan is a skilled ENT specialist known for her compassionate approach and surgical precision. She handles a wide spectrum of ear, nose, and throat conditions, from chronic sinusitis to complex hearing disorders. She has special expertise in pediatric ENT cases.",
//     certifications: ["CPSP Fellow", "PAES Member", "ENTUK Associate"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#14b8a6",
//     gradient: "from-teal-500 to-emerald-400",
//     lightBg: "from-teal-50 to-emerald-50",
//     borderColor: "border-teal-200",
//     accentText: "text-teal-600",
//     badgeBg: "bg-teal-100",
//     badgeText: "text-teal-700",
//     IconComp: TbEar,
//   },
//   {
//     id: 6,
//     name: "Dr. Bilal Siddiqui",
//     slug: "dr-bilal-siddiqui",
//     title: "MBBS, FCPS (Neurology)",
//     specialty: "Neurology",
//     tag: "neurology",
//     image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80",
//     experience: "20 Years",
//     patients: "11,000+",
//     rating: 4.9,
//     reviews: 421,
//     fee: "PKR 5,000",
//     languages: ["Urdu", "English"],
//     available: false,
//     nextSlot: "Tomorrow, 2:00 PM",
//     gender: "Male",
//     branch: ["Gulberg", "DHA"],
//     availabilitySchedule: [
//       { day: "Monday", time: "2:00 PM – 6:00 PM" },
//       { day: "Wednesday", time: "2:00 PM – 6:00 PM" },
//       { day: "Friday", time: "2:00 PM – 5:00 PM" },
//     ],
//     specializations: ["Stroke Management", "Epilepsy", "Migraine", "Parkinson's Disease"],
//     services: ["EEG", "EMG / NCS", "Neurosonography", "Memory Assessment", "Headache Clinic"],
//     education: [
//       { degree: "MBBS", institution: "Dow University of Health Sciences", year: "2002" },
//       { degree: "FCPS (Neurology)", institution: "CPSP", year: "2009" },
//       { degree: "Fellowship (Neurology)", institution: "Johns Hopkins University, USA", year: "2011" },
//     ],
//     bio: "Dr. Bilal Siddiqui is one of Pakistan's most respected neurologists with a Johns Hopkins fellowship. His clinical interests include stroke prevention, epilepsy management, and movement disorders. He has published research in international medical journals and is a senior trainer for neurology residents.",
//     certifications: ["CPSP Fellow", "AAN Member", "WFN Member"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#6366f1",
//     gradient: "from-indigo-500 to-blue-400",
//     lightBg: "from-indigo-50 to-blue-50",
//     borderColor: "border-indigo-200",
//     accentText: "text-indigo-600",
//     badgeBg: "bg-indigo-100",
//     badgeText: "text-indigo-700",
//     IconComp: GiBrain,
//   },
//   {
//     id: 7,
//     name: "Dr. Nadia Hussain",
//     slug: "dr-nadia-hussain",
//     title: "MBBS, Fellowship Hair Restoration",
//     specialty: "Hair Transplant",
//     tag: "hair",
//     image: "https://images.unsplash.com/photo-1643297654416-05795d62e39c?auto=format&fit=crop&w=400&q=80",
//     experience: "10 Years",
//     patients: "4,200+",
//     rating: 4.8,
//     reviews: 175,
//     fee: "Consultation Free",
//     languages: ["Urdu", "English"],
//     available: true,
//     nextSlot: "Today, 6:00 PM",
//     gender: "Female",
//     branch: ["Gulberg"],
//     availabilitySchedule: [
//       { day: "Monday", time: "11:00 AM – 3:00 PM" },
//       { day: "Thursday", time: "4:00 PM – 8:00 PM" },
//       { day: "Saturday", time: "10:00 AM – 2:00 PM" },
//     ],
//     specializations: ["FUE Technique", "DHI Implant", "PRP Hair Treatment", "Beard Transplant"],
//     services: ["Free Hair Analysis", "FUE Hair Transplant", "DHI Implant", "PRP Therapy", "Scalp Micropigmentation"],
//     education: [
//       { degree: "MBBS", institution: "University of Health Sciences", year: "2012" },
//       { degree: "Fellowship (Hair Restoration)", institution: "ISHRS, International", year: "2017" },
//     ],
//     bio: "Dr. Nadia Hussain is a certified hair restoration specialist with an international ISHRS fellowship. She has pioneered the DHI hair implant technique in Lahore, offering her patients natural density and hairline design with minimal downtime. Her before-and-after results consistently receive top ratings.",
//     certifications: ["ISHRS Fellow", "ABHRS Certified", "CPSP Member"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#8b5cf6",
//     gradient: "from-violet-600 to-purple-500",
//     lightBg: "from-violet-50 to-purple-50",
//     borderColor: "border-violet-200",
//     accentText: "text-violet-600",
//     badgeBg: "bg-violet-100",
//     badgeText: "text-violet-700",
//     IconComp: MdOutlineContentCut,
//   },
//   {
//     id: 8,
//     name: "Dr. Kamran Ali",
//     slug: "dr-kamran-ali",
//     title: "MBBS, FCPS (General Medicine)",
//     specialty: "General Medicine",
//     tag: "general",
//     image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
//     experience: "22 Years",
//     patients: "20,000+",
//     rating: 4.9,
//     reviews: 712,
//     fee: "PKR 2,000",
//     languages: ["Urdu", "English", "Punjabi"],
//     available: true,
//     nextSlot: "Today, 2:00 PM",
//     gender: "Male",
//     branch: ["Gulberg", "DHA"],
//     availabilitySchedule: [
//       { day: "Monday", time: "9:00 AM – 1:00 PM" },
//       { day: "Tuesday", time: "2:00 PM – 6:00 PM" },
//       { day: "Thursday", time: "9:00 AM – 1:00 PM" },
//       { day: "Friday", time: "2:00 PM – 6:00 PM" },
//       { day: "Saturday", time: "10:00 AM – 2:00 PM" },
//     ],
//     specializations: ["Diabetes Management", "Hypertension", "Infectious Diseases", "Preventive Care"],
//     services: ["General Check-up", "ECG", "Diabetes Screening", "Vaccination", "Chronic Disease Management"],
//     education: [
//       { degree: "MBBS", institution: "Punjab Medical College, Faisalabad", year: "2000" },
//       { degree: "FCPS (Medicine)", institution: "CPSP", year: "2007" },
//     ],
//     bio: "Dr. Kamran Ali is Premium Clinic's most senior physician with 22 years of comprehensive clinical practice. He is the primary care physician for thousands of families in Lahore. Known for his thorough diagnoses and patient-friendly communication, he manages complex multi-system conditions with exceptional skill.",
//     certifications: ["CPSP Fellow", "PAP Life Member", "PMDC Gold Medalist"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#10b981",
//     gradient: "from-emerald-500 to-green-400",
//     lightBg: "from-emerald-50 to-green-50",
//     borderColor: "border-emerald-200",
//     accentText: "text-emerald-600",
//     badgeBg: "bg-emerald-100",
//     badgeText: "text-emerald-700",
//     IconComp: TbStethoscope,
//   },

//   // ── SKIN (2 more) ──────────────────────────────────────────────────────────
//   {
//     id: 9,
//     name: "Dr. Ayesha Tariq",
//     slug: "dr-ayesha-tariq",
//     title: "MBBS, MCPS (Dermatology)",
//     specialty: "Skin & Dermatology",
//     tag: "skin",
//     image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&w=400&q=80",
//     experience: "8 Years",
//     patients: "5,200+",
//     rating: 4.7,
//     reviews: 184,
//     fee: "PKR 2,500",
//     languages: ["Urdu", "English"],
//     available: true,
//     nextSlot: "Today, 5:00 PM",
//     gender: "Female",
//     branch: ["DHA"],
//     availabilitySchedule: [
//       { day: "Tuesday", time: "11:00 AM – 3:00 PM" },
//       { day: "Thursday", time: "4:00 PM – 8:00 PM" },
//       { day: "Sunday", time: "10:00 AM – 1:00 PM" },
//     ],
//     specializations: ["Vitiligo Treatment", "Eczema", "Skin Allergy", "Cosmetic Dermatology"],
//     services: ["Patch Testing", "Microdermabrasion", "Carbon Peel", "Mesotherapy", "Thread Lift"],
//     education: [
//       { degree: "MBBS", institution: "Allama Iqbal Medical College", year: "2014" },
//       { degree: "MCPS (Dermatology)", institution: "CPSP", year: "2019" },
//     ],
//     bio: "Dr. Ayesha Tariq specializes in medical and cosmetic dermatology with a focus on vitiligo, eczema, and skin allergies. Known for her gentle approach and thorough consultations, she has built a loyal patient base across Lahore's DHA area.",
//     certifications: ["MCPS Fellow", "PDA Member", "EADV Associate"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#ec4899",
//     gradient: "from-pink-500 to-rose-400",
//     lightBg: "from-pink-50 to-rose-50",
//     borderColor: "border-pink-200",
//     accentText: "text-pink-600",
//     badgeBg: "bg-pink-100",
//     badgeText: "text-pink-700",
//     IconComp: MdFace,
//   },
//   {
//     id: 10,
//     name: "Dr. Usman Ghani",
//     slug: "dr-usman-ghani",
//     title: "MBBS, FCPS (Dermatology & Venereology)",
//     specialty: "Skin & Dermatology",
//     tag: "skin",
//     image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=400&q=80",
//     experience: "12 Years",
//     patients: "7,000+",
//     rating: 4.8,
//     reviews: 256,
//     fee: "PKR 3,500",
//     languages: ["Urdu", "English", "Punjabi"],
//     available: false,
//     nextSlot: "Tomorrow, 11:00 AM",
//     gender: "Male",
//     branch: ["Gulberg"],
//     availabilitySchedule: [
//       { day: "Monday", time: "9:00 AM – 1:00 PM" },
//       { day: "Wednesday", time: "5:00 PM – 9:00 PM" },
//       { day: "Friday", time: "9:00 AM – 12:00 PM" },
//     ],
//     specializations: ["Psoriasis", "Skin Cancer Screening", "Hair Loss", "Nail Disorders"],
//     services: ["Dermoscopy", "Biopsy", "Excision", "Cryotherapy", "Phototherapy"],
//     education: [
//       { degree: "MBBS", institution: "Punjab Medical College", year: "2010" },
//       { degree: "FCPS (Dermatology)", institution: "CPSP", year: "2016" },
//     ],
//     bio: "Dr. Usman Ghani is a seasoned dermatologist with over 12 years of clinical experience in both medical and cosmetic dermatology. He is particularly skilled in dermoscopy and skin cancer screening, and has trained several junior dermatologists across Pakistan.",
//     certifications: ["CPSP Fellow", "PDA President (2022)", "AAD Member"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#ec4899",
//     gradient: "from-pink-500 to-rose-400",
//     lightBg: "from-pink-50 to-rose-50",
//     borderColor: "border-pink-200",
//     accentText: "text-pink-600",
//     badgeBg: "bg-pink-100",
//     badgeText: "text-pink-700",
//     IconComp: MdFace,
//   },

//   // ── DENTAL (2 more) ────────────────────────────────────────────────────────
//   {
//     id: 11,
//     name: "Dr. Hina Riaz",
//     slug: "dr-hina-riaz",
//     title: "BDS, FCPS (Orthodontics)",
//     specialty: "Dental Care",
//     tag: "dental",
//     image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=400&q=80",
//     experience: "9 Years",
//     patients: "6,300+",
//     rating: 4.9,
//     reviews: 310,
//     fee: "PKR 2,000",
//     languages: ["Urdu", "English"],
//     available: true,
//     nextSlot: "Today, 3:00 PM",
//     gender: "Female",
//     branch: ["DHA"],
//     availabilitySchedule: [
//       { day: "Monday", time: "10:00 AM – 2:00 PM" },
//       { day: "Wednesday", time: "3:00 PM – 7:00 PM" },
//       { day: "Saturday", time: "10:00 AM – 2:00 PM" },
//     ],
//     specializations: ["Braces", "Invisalign", "Teeth Alignment", "Retainers"],
//     services: ["Metal Braces", "Clear Aligners", "Retainer Fitting", "Space Maintainers", "Jaw Correction"],
//     education: [
//       { degree: "BDS", institution: "De'Montmorency College of Dentistry", year: "2013" },
//       { degree: "FCPS (Orthodontics)", institution: "CPSP", year: "2019" },
//     ],
//     bio: "Dr. Hina Riaz is one of Lahore's top orthodontists specializing in Invisalign and modern braces techniques. Her meticulous approach to smile correction and jaw alignment has earned her an outstanding reputation among teen and adult patients alike.",
//     certifications: ["CPSP Fellow", "POS Member", "WFO Associate"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#0ea5e9",
//     gradient: "from-sky-500 to-cyan-400",
//     lightBg: "from-sky-50 to-cyan-50",
//     borderColor: "border-sky-200",
//     accentText: "text-sky-600",
//     badgeBg: "bg-sky-100",
//     badgeText: "text-sky-700",
//     IconComp: GiTooth,
//   },
//   {
//     id: 12,
//     name: "Dr. Salman Qureshi",
//     slug: "dr-salman-qureshi",
//     title: "BDS, MSc (Prosthodontics)",
//     specialty: "Dental Care",
//     tag: "dental",
//     image: "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?auto=format&fit=crop&w=400&q=80",
//     experience: "13 Years",
//     patients: "9,800+",
//     rating: 4.8,
//     reviews: 401,
//     fee: "PKR 3,000",
//     languages: ["Urdu", "English"],
//     available: true,
//     nextSlot: "Today, 6:30 PM",
//     gender: "Male",
//     branch: ["Gulberg", "DHA"],
//     availabilitySchedule: [
//       { day: "Tuesday", time: "9:00 AM – 1:00 PM" },
//       { day: "Thursday", time: "4:00 PM – 8:00 PM" },
//       { day: "Saturday", time: "11:00 AM – 3:00 PM" },
//     ],
//     specializations: ["Dental Prosthetics", "Full Mouth Rehabilitation", "Crowns & Bridges", "Dentures"],
//     services: ["Complete Dentures", "Partial Dentures", "Porcelain Crowns", "Zirconia Bridges", "Full Mouth Restoration"],
//     education: [
//       { degree: "BDS", institution: "University of Health Sciences", year: "2009" },
//       { degree: "MSc (Prosthodontics)", institution: "King's College London", year: "2013" },
//     ],
//     bio: "Dr. Salman Qureshi is a London-trained prosthodontist with expertise in full mouth rehabilitation and dental prosthetics. He has transformed the smiles of thousands of patients using modern zirconia and porcelain restorations.",
//     certifications: ["GDC Registered", "CPSP Fellow", "IAAP Member"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#0ea5e9",
//     gradient: "from-sky-500 to-cyan-400",
//     lightBg: "from-sky-50 to-cyan-50",
//     borderColor: "border-sky-200",
//     accentText: "text-sky-600",
//     badgeBg: "bg-sky-100",
//     badgeText: "text-sky-700",
//     IconComp: GiTooth,
//   },

//   // ── GYNECOLOGY (2 more) ────────────────────────────────────────────────────
//   {
//     id: 13,
//     name: "Dr. Sana Javed",
//     slug: "dr-sana-javed",
//     title: "MBBS, FCPS (Obstetrics & Gynecology)",
//     specialty: "Gynecology & Obstetrics",
//     tag: "gynecology",
//     image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=400&q=80",
//     experience: "11 Years",
//     patients: "7,400+",
//     rating: 4.8,
//     reviews: 213,
//     fee: "PKR 3,000",
//     languages: ["Urdu", "English"],
//     available: true,
//     nextSlot: "Today, 5:00 PM",
//     gender: "Female",
//     branch: ["DHA"],
//     availabilitySchedule: [
//       { day: "Monday", time: "10:00 AM – 2:00 PM" },
//       { day: "Thursday", time: "4:00 PM – 7:00 PM" },
//       { day: "Saturday", time: "9:00 AM – 12:00 PM" },
//     ],
//     specializations: ["Normal Delivery", "PCOS", "Menstrual Disorders", "Infertility"],
//     services: ["Antenatal Checkups", "Pap Smear", "Hormonal Evaluation", "Ovulation Induction", "IUD Insertion"],
//     education: [
//       { degree: "MBBS", institution: "Fatima Jinnah Medical University", year: "2011" },
//       { degree: "FCPS (OB/GYN)", institution: "CPSP", year: "2017" },
//     ],
//     bio: "Dr. Sana Javed is a compassionate gynecologist dedicated to women's health at every life stage. From adolescent care to menopause management, she offers comprehensive services with a focus on patient education and minimal intervention.",
//     certifications: ["CPSP Fellow", "SOGP Member", "FOGSI Member"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#a855f7",
//     gradient: "from-violet-500 to-purple-400",
//     lightBg: "from-violet-50 to-purple-50",
//     borderColor: "border-violet-200",
//     accentText: "text-violet-600",
//     badgeBg: "bg-violet-100",
//     badgeText: "text-violet-700",
//     IconComp: GiBabyFace,
//   },
//   {
//     id: 14,
//     name: "Dr. Rabia Nawaz",
//     slug: "dr-rabia-nawaz",
//     title: "MBBS, MCPS (Gynecology)",
//     specialty: "Gynecology & Obstetrics",
//     tag: "gynecology",
//     image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=400&q=80",
//     experience: "7 Years",
//     patients: "4,100+",
//     rating: 4.6,
//     reviews: 142,
//     fee: "PKR 2,500",
//     languages: ["Urdu", "English", "Punjabi"],
//     available: false,
//     nextSlot: "Tomorrow, 9:00 AM",
//     gender: "Female",
//     branch: ["Gulberg"],
//     availabilitySchedule: [
//       { day: "Tuesday", time: "9:00 AM – 1:00 PM" },
//       { day: "Friday", time: "3:00 PM – 6:00 PM" },
//       { day: "Sunday", time: "10:00 AM – 1:00 PM" },
//     ],
//     specializations: ["Pregnancy Care", "Cervical Health", "Uterine Fibroids", "Menopause"],
//     services: ["Ultrasound Obstetric", "Colposcopy", "LEEP Procedure", "Hormone Therapy", "Family Planning"],
//     education: [
//       { degree: "MBBS", institution: "Nishtar Medical University", year: "2015" },
//       { degree: "MCPS (Gynecology)", institution: "CPSP", year: "2020" },
//     ],
//     bio: "Dr. Rabia Nawaz is an enthusiastic young gynecologist known for her patient-friendly approach and modern management of complex gynecological conditions. She is well-versed in minimally invasive procedures and women's preventive health.",
//     certifications: ["MCPS Fellow", "SOGP Member", "APGO Associate"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#a855f7",
//     gradient: "from-violet-500 to-purple-400",
//     lightBg: "from-violet-50 to-purple-50",
//     borderColor: "border-violet-200",
//     accentText: "text-violet-600",
//     badgeBg: "bg-violet-100",
//     badgeText: "text-violet-700",
//     IconComp: GiBabyFace,
//   },

//   // ── ORTHOPEDIC (2 more) ────────────────────────────────────────────────────
//   {
//     id: 15,
//     name: "Dr. Imran Sheikh",
//     slug: "dr-imran-sheikh",
//     title: "MBBS, FCPS (Orthopedic Surgery)",
//     specialty: "Orthopedic Surgery",
//     tag: "orthopedic",
//     image: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&w=400&q=80",
//     experience: "15 Years",
//     patients: "10,200+",
//     rating: 4.8,
//     reviews: 387,
//     fee: "PKR 4,000",
//     languages: ["Urdu", "English"],
//     available: true,
//     nextSlot: "Today, 4:30 PM",
//     gender: "Male",
//     branch: ["DHA"],
//     availabilitySchedule: [
//       { day: "Monday", time: "2:00 PM – 6:00 PM" },
//       { day: "Wednesday", time: "9:00 AM – 1:00 PM" },
//       { day: "Saturday", time: "10:00 AM – 2:00 PM" },
//     ],
//     specializations: ["Knee Arthroscopy", "Shoulder Surgery", "Pediatric Orthopedics", "Trauma Surgery"],
//     services: ["Arthroscopic Surgery", "Fracture Fixation", "Clubfoot Correction", "ACL Reconstruction", "Cast Application"],
//     education: [
//       { degree: "MBBS", institution: "King Edward Medical University", year: "2007" },
//       { degree: "FCPS (Orthopedics)", institution: "CPSP", year: "2013" },
//     ],
//     bio: "Dr. Imran Sheikh is a highly skilled orthopedic surgeon with a special interest in sports medicine and pediatric orthopedics. He has successfully performed over 2,000 arthroscopic procedures and is known for his meticulous surgical technique.",
//     certifications: ["CPSP Fellow", "PPOS Member", "AOTrauma Certified"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#f59e0b",
//     gradient: "from-amber-500 to-orange-400",
//     lightBg: "from-amber-50 to-orange-50",
//     borderColor: "border-amber-200",
//     accentText: "text-amber-600",
//     badgeBg: "bg-amber-100",
//     badgeText: "text-amber-700",
//     IconComp: TbBone,
//   },
//   {
//     id: 16,
//     name: "Dr. Amna Waseem",
//     slug: "dr-amna-waseem",
//     title: "MBBS, MCPS (Orthopedics)",
//     specialty: "Orthopedic Surgery",
//     tag: "orthopedic",
//     image: "https://cdn.prod.website-files.com/6768674161a0e0eca2f41278/69833af4c81e1d905ed53e2d_68c3c5edf2ff8968eb707d5e_Dr%2520amna%2520ahmed%2520butt.jpeg",
//     experience: "10 Years",
//     patients: "6,500+",
//     rating: 4.7,
//     reviews: 229,
//     fee: "PKR 3,000",
//     languages: ["Urdu", "English"],
//     available: false,
//     nextSlot: "Tomorrow, 3:00 PM",
//     gender: "Female",
//     branch: ["Gulberg"],
//     availabilitySchedule: [
//       { day: "Tuesday", time: "10:00 AM – 2:00 PM" },
//       { day: "Thursday", time: "4:00 PM – 8:00 PM" },
//       { day: "Sunday", time: "11:00 AM – 2:00 PM" },
//     ],
//     specializations: ["Rheumatoid Arthritis", "Osteoporosis", "Back Pain", "Physiotherapy Referral"],
//     services: ["Joint Aspiration", "Steroid Injections", "Bone Density Scan", "Tendon Repair", "Splinting"],
//     education: [
//       { degree: "MBBS", institution: "Allama Iqbal Medical College", year: "2012" },
//       { degree: "MCPS (Orthopedics)", institution: "CPSP", year: "2018" },
//     ],
//     bio: "Dr. Amna Waseem is one of the few female orthopedic surgeons in Lahore, bringing a unique perspective to musculoskeletal care. She excels in managing arthritis, osteoporosis, and chronic back pain with conservative and surgical approaches.",
//     certifications: ["CPSP Fellow", "PAR Member", "BOA Associate"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#f59e0b",
//     gradient: "from-amber-500 to-orange-400",
//     lightBg: "from-amber-50 to-orange-50",
//     borderColor: "border-amber-200",
//     accentText: "text-amber-600",
//     badgeBg: "bg-amber-100",
//     badgeText: "text-amber-700",
//     IconComp: TbBone,
//   },

//   // ── ENT (2 more) ───────────────────────────────────────────────────────────
//   {
//     id: 17,
//     name: "Dr. Faisal Mehmood",
//     slug: "dr-faisal-mehmood",
//     title: "MBBS, FCPS (ENT & Head-Neck Surgery)",
//     specialty: "ENT Specialist",
//     tag: "ent",
//     image: "https://smh.org.pk/wp-content/uploads/2024/10/Dr.-Faisal-Rafiq.jpg",
//     experience: "16 Years",
//     patients: "11,000+",
//     rating: 4.9,
//     reviews: 362,
//     fee: "PKR 3,500",
//     languages: ["Urdu", "English"],
//     available: true,
//     nextSlot: "Today, 6:00 PM",
//     gender: "Male",
//     branch: ["Gulberg", "DHA"],
//     availabilitySchedule: [
//       { day: "Monday", time: "9:00 AM – 1:00 PM" },
//       { day: "Wednesday", time: "4:00 PM – 8:00 PM" },
//       { day: "Friday", time: "9:00 AM – 12:00 PM" },
//       { day: "Sunday", time: "11:00 AM – 3:00 PM" },
//     ],
//     specializations: ["Endoscopic Sinus Surgery", "Cochlear Implant", "Thyroid Surgery", "Head & Neck Tumors"],
//     services: ["Nasal Endoscopy", "Audiological Assessment", "FESS", "Thyroidectomy", "Voice Therapy"],
//     education: [
//       { degree: "MBBS", institution: "Dow Medical College", year: "2006" },
//       { degree: "FCPS (ENT)", institution: "CPSP", year: "2012" },
//       { degree: "Head-Neck Fellowship", institution: "Aga Khan University Hospital", year: "2014" },
//     ],
//     bio: "Dr. Faisal Mehmood is a senior ENT and head-neck surgeon with extensive experience in endoscopic sinus surgery and cochlear implants. He leads the ENT department at Premium Clinic and regularly participates in national ENT conferences as a faculty speaker.",
//     certifications: ["CPSP Fellow", "PAES President", "IFOS Member"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#14b8a6",
//     gradient: "from-teal-500 to-emerald-400",
//     lightBg: "from-teal-50 to-emerald-50",
//     borderColor: "border-teal-200",
//     accentText: "text-teal-600",
//     badgeBg: "bg-teal-100",
//     badgeText: "text-teal-700",
//     IconComp: TbEar,
//   },
//   {
//     id: 18,
//     name: "Dr. Maham Iqbal",
//     slug: "dr-maham-iqbal",
//     title: "MBBS, MCPS (ENT)",
//     specialty: "ENT Specialist",
//     tag: "ent",
//     image: "https://media.licdn.com/dms/image/v2/D4D03AQG5RHOUkmmoPg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1721228681896?e=2147483647&v=beta&t=f-jbsRJg3ZteTWcO0KTMkP7jEdbJ_28hMnCIogAkRY0",
//     experience: "6 Years",
//     patients: "3,900+",
//     rating: 4.6,
//     reviews: 128,
//     fee: "PKR 2,200",
//     languages: ["Urdu", "English", "Punjabi"],
//     available: true,
//     nextSlot: "Today, 2:30 PM",
//     gender: "Female",
//     branch: ["DHA"],
//     availabilitySchedule: [
//       { day: "Tuesday", time: "10:00 AM – 2:00 PM" },
//       { day: "Thursday", time: "3:00 PM – 7:00 PM" },
//       { day: "Saturday", time: "10:00 AM – 1:00 PM" },
//     ],
//     specializations: ["Pediatric ENT", "Allergic Rhinitis", "Snoring & Sleep Apnea", "Ear Infections"],
//     services: ["Myringotomy", "Microsuction", "Nasal Cauterization", "Sleep Study Referral", "Allergy Skin Test"],
//     education: [
//       { degree: "MBBS", institution: "Nishtar Medical University", year: "2016" },
//       { degree: "MCPS (ENT)", institution: "CPSP", year: "2021" },
//     ],
//     bio: "Dr. Maham Iqbal is a young and dedicated ENT specialist with growing expertise in pediatric ENT and sleep-related disorders. Her warm, patient approach and detailed examination technique have made her a preferred choice for families across DHA.",
//     certifications: ["MCPS Fellow", "PAES Member", "SEAP Associate"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#14b8a6",
//     gradient: "from-teal-500 to-emerald-400",
//     lightBg: "from-teal-50 to-emerald-50",
//     borderColor: "border-teal-200",
//     accentText: "text-teal-600",
//     badgeBg: "bg-teal-100",
//     badgeText: "text-teal-700",
//     IconComp: TbEar,
//   },

//   // ── NEUROLOGY (2 more) ─────────────────────────────────────────────────────
//   {
//     id: 19,
//     name: "Dr. Tariq Mahmood",
//     slug: "dr-tariq-mahmood",
//     title: "MBBS, FCPS (Neurology)",
//     specialty: "Neurology",
//     tag: "neurology",
//    image: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?fm=jpg&q=60&w=3000&auto=format&fit=crop",
//     experience: "17 Years",
//     patients: "9,600+",
//     rating: 4.8,
//     reviews: 334,
//     fee: "PKR 4,500",
//     languages: ["Urdu", "English"],
//     available: true,
//     nextSlot: "Today, 7:00 PM",
//     gender: "Male",
//     branch: ["Gulberg"],
//     availabilitySchedule: [
//       { day: "Monday", time: "3:00 PM – 7:00 PM" },
//       { day: "Thursday", time: "3:00 PM – 7:00 PM" },
//       { day: "Saturday", time: "10:00 AM – 2:00 PM" },
//     ],
//     specializations: ["Dementia", "Multiple Sclerosis", "Neuropathy", "TIA & Stroke"],
//     services: ["MRI Brain Review", "Lumbar Puncture", "VEEG Monitoring", "Cognitive Testing", "Botox for Migraine"],
//     education: [
//       { degree: "MBBS", institution: "King Edward Medical University", year: "2005" },
//       { degree: "FCPS (Neurology)", institution: "CPSP", year: "2012" },
//       { degree: "Clinical Fellowship", institution: "University of Toronto, Canada", year: "2014" },
//     ],
//     bio: "Dr. Tariq Mahmood is a Toronto-trained neurologist with deep expertise in dementia, multiple sclerosis, and cerebrovascular disease. He brings a systematic, evidence-based approach to complex neurological cases and is a sought-after second opinion specialist in Lahore.",
//     certifications: ["CPSP Fellow", "AAN Member", "MSA Pakistan Chapter Head"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#6366f1",
//     gradient: "from-indigo-500 to-blue-400",
//     lightBg: "from-indigo-50 to-blue-50",
//     borderColor: "border-indigo-200",
//     accentText: "text-indigo-600",
//     badgeBg: "bg-indigo-100",
//     badgeText: "text-indigo-700",
//     IconComp: GiBrain,
//   },
//   {
//     id: 20,
//     name: "Dr. Noor Fatima",
//     slug: "dr-noor-fatima",
//     title: "MBBS, MCPS (Neurology)",
//     specialty: "Neurology",
//     tag: "neurology",
//     image: "https://plus.unsplash.com/premium_photo-1682089144957-f48bbcf706b2?fm=jpg&q=60&w=3000&auto=format&fit=crop",
//     experience: "8 Years",
//     patients: "5,100+",
//     rating: 4.7,
//     reviews: 196,
//     fee: "PKR 3,500",
//     languages: ["Urdu", "English"],
//     available: false,
//     nextSlot: "Tomorrow, 11:00 AM",
//     gender: "Female",
//     branch: ["DHA"],
//     availabilitySchedule: [
//       { day: "Tuesday", time: "10:00 AM – 2:00 PM" },
//       { day: "Friday", time: "4:00 PM – 7:00 PM" },
//       { day: "Sunday", time: "10:00 AM – 1:00 PM" },
//     ],
//     specializations: ["Headache Clinic", "Vertigo", "Anxiety-Related Neurology", "Pediatric Neurology"],
//     services: ["Neurology Consultation", "EEG", "Balance Testing", "Pediatric Brain Assessment", "ADHD Evaluation"],
//     education: [
//       { degree: "MBBS", institution: "Fatima Jinnah Medical University", year: "2014" },
//       { degree: "MCPS (Neurology)", institution: "CPSP", year: "2020" },
//     ],
//     bio: "Dr. Noor Fatima is a compassionate neurologist focusing on headache disorders, vertigo, and pediatric neurology. She is particularly skilled at evaluating anxiety-related neurological symptoms and provides a calm, reassuring environment for her patients.",
//     certifications: ["MCPS Fellow", "PNA Member", "ICHD Certified"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#6366f1",
//     gradient: "from-indigo-500 to-blue-400",
//     lightBg: "from-indigo-50 to-blue-50",
//     borderColor: "border-indigo-200",
//     accentText: "text-indigo-600",
//     badgeBg: "bg-indigo-100",
//     badgeText: "text-indigo-700",
//     IconComp: GiBrain,
//   },

//   // ── HAIR (2 more) ──────────────────────────────────────────────────────────
//   {
//     id: 21,
//     name: "Dr. Ahsan Baig",
//     slug: "dr-ahsan-baig",
//     title: "MBBS, Diploma Hair Restoration",
//     specialty: "Hair Transplant",
//     tag: "hair",
//     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
//     experience: "8 Years",
//     patients: "3,600+",
//     rating: 4.8,
//     reviews: 152,
//     fee: "PKR 1,500",
//     languages: ["Urdu", "English", "Punjabi"],
//     available: true,
//     nextSlot: "Today, 4:00 PM",
//     gender: "Male",
//     branch: ["Gulberg"],
//     availabilitySchedule: [
//       { day: "Tuesday", time: "11:00 AM – 3:00 PM" },
//       { day: "Thursday", time: "4:00 PM – 8:00 PM" },
//       { day: "Saturday", time: "11:00 AM – 3:00 PM" },
//     ],
//     specializations: ["FUE Hair Transplant", "Eyebrow Transplant", "Hairline Design", "Scalp PRP"],
//     services: ["Hair Density Analysis", "FUE Procedure", "Eyebrow Restoration", "PRP Sessions", "Post-Op Care"],
//     education: [
//       { degree: "MBBS", institution: "Allama Iqbal Medical College", year: "2014" },
//       { degree: "Diploma (Hair Restoration)", institution: "European Hair Research Society", year: "2018" },
//     ],
//     bio: "Dr. Ahsan Baig is a dedicated hair restoration specialist who has earned a strong reputation for natural-looking FUE results. His expertise in hairline design and eyebrow transplants attracts patients from across Pakistan.",
//     certifications: ["EHRS Member", "ABHRS Candidate", "CPSP Member"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#8b5cf6",
//     gradient: "from-violet-600 to-purple-500",
//     lightBg: "from-violet-50 to-purple-50",
//     borderColor: "border-violet-200",
//     accentText: "text-violet-600",
//     badgeBg: "bg-violet-100",
//     badgeText: "text-violet-700",
//     IconComp: MdOutlineContentCut,
//   },
//   {
//     id: 22,
//     name: "Dr. Zainab Mirza",
//     slug: "dr-zainab-mirza",
//     title: "MBBS, Fellowship Hair & Aesthetics",
//     specialty: "Hair Transplant",
//     tag: "hair",
//     image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
//     experience: "6 Years",
//     patients: "2,800+",
//     rating: 4.9,
//     reviews: 117,
//     fee: "Consultation Free",
//     languages: ["Urdu", "English"],
//     available: false,
//     nextSlot: "Tomorrow, 12:00 PM",
//     gender: "Female",
//     branch: ["DHA"],
//     availabilitySchedule: [
//       { day: "Monday", time: "12:00 PM – 4:00 PM" },
//       { day: "Wednesday", time: "4:00 PM – 8:00 PM" },
//       { day: "Friday", time: "12:00 PM – 3:00 PM" },
//     ],
//     specializations: ["Female Hair Loss", "Alopecia", "DHI Technique", "Hairline Feminization"],
//     services: ["Female Pattern Analysis", "DHI Implant", "Platelet-Rich Plasma", "Laser Hair Growth", "Micro-Needling"],
//     education: [
//       { degree: "MBBS", institution: "University of Health Sciences", year: "2016" },
//       { degree: "Fellowship (Hair & Aesthetics)", institution: "ISHRS, USA", year: "2021" },
//     ],
//     bio: "Dr. Zainab Mirza is a rising star in female hair restoration, specializing in alopecia treatment and hairline feminization. Her in-depth consultations and tailored treatment plans have made her a top choice for women experiencing hair loss.",
//     certifications: ["ISHRS Fellow", "PDA Member", "CPSP Member"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#8b5cf6",
//     gradient: "from-violet-600 to-purple-500",
//     lightBg: "from-violet-50 to-purple-50",
//     borderColor: "border-violet-200",
//     accentText: "text-violet-600",
//     badgeBg: "bg-violet-100",
//     badgeText: "text-violet-700",
//     IconComp: MdOutlineContentCut,
//   },

//   // ── GENERAL MEDICINE (2 more) ──────────────────────────────────────────────
//   {
//     id: 23,
//     name: "Dr. Lubna Khalid",
//     slug: "dr-lubna-khalid",
//     title: "MBBS, FCPS (Internal Medicine)",
//     specialty: "General Medicine",
//     tag: "general",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsFbGCZ8Yhsa99c9CHbTiKjmYFv5c1lyquNQ&s",
//     experience: "14 Years",
//     patients: "13,000+",
//     rating: 4.9,
//     reviews: 521,
//     fee: "PKR 2,500",
//     languages: ["Urdu", "English"],
//     available: true,
//     nextSlot: "Today, 3:00 PM",
//     gender: "Female",
//     branch: ["DHA"],
//     availabilitySchedule: [
//       { day: "Monday", time: "9:00 AM – 1:00 PM" },
//       { day: "Wednesday", time: "3:00 PM – 7:00 PM" },
//       { day: "Thursday", time: "9:00 AM – 1:00 PM" },
//       { day: "Saturday", time: "10:00 AM – 2:00 PM" },
//     ],
//     specializations: ["Diabetes", "Thyroid Disorders", "Anemia", "Chronic Disease Management"],
//     services: ["Routine Blood Work", "Thyroid Function Test", "Diabetic Foot Exam", "Nutritional Counseling", "Wellness Screening"],
//     education: [
//       { degree: "MBBS", institution: "Fatima Jinnah Medical University", year: "2008" },
//       { degree: "FCPS (Internal Medicine)", institution: "CPSP", year: "2014" },
//     ],
//     bio: "Dr. Lubna Khalid is a highly experienced internal medicine specialist with a particular focus on diabetes and thyroid disorders. She is passionate about preventive care and patient education, believing that empowered patients lead healthier lives.",
//     certifications: ["CPSP Fellow", "PAP Life Member", "IDF Member"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#10b981",
//     gradient: "from-emerald-500 to-green-400",
//     lightBg: "from-emerald-50 to-green-50",
//     borderColor: "border-emerald-200",
//     accentText: "text-emerald-600",
//     badgeBg: "bg-emerald-100",
//     badgeText: "text-emerald-700",
//     IconComp: TbStethoscope,
//   },
//   {
//     id: 24,
//     name: "Dr. Adeel Hanif",
//     slug: "dr-adeel-hanif",
//     title: "MBBS, MRCP (UK)",
//     specialty: "General Medicine",
//     tag: "general",
//     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
//     experience: "19 Years",
//     patients: "16,500+",
//     rating: 4.9,
//     reviews: 634,
//     fee: "PKR 3,500",
//     languages: ["Urdu", "English"],
//     available: true,
//     nextSlot: "Today, 5:00 PM",
//     gender: "Male",
//     branch: ["Gulberg", "DHA"],
//     availabilitySchedule: [
//       { day: "Tuesday", time: "9:00 AM – 1:00 PM" },
//       { day: "Wednesday", time: "3:00 PM – 7:00 PM" },
//       { day: "Friday", time: "9:00 AM – 12:00 PM" },
//       { day: "Saturday", time: "4:00 PM – 8:00 PM" },
//     ],
//     specializations: ["Cardiology Interface", "Respiratory Medicine", "Geriatric Medicine", "Infectious Disease"],
//     services: ["Echocardiogram Review", "Pulmonary Function Test", "Elderly Care", "Travel Medicine", "IV Drip Therapy"],
//     education: [
//       { degree: "MBBS", institution: "Dow University of Health Sciences", year: "2003" },
//       { degree: "MRCP (UK)", institution: "Royal College of Physicians, London", year: "2009" },
//     ],
//     bio: "Dr. Adeel Hanif is an MRCP-certified physician from the Royal College of Physicians London, with 19 years of comprehensive internal medicine practice. He is an expert in complex multi-system disease management and geriatric care, bringing international clinical standards to every consultation.",
//     certifications: ["MRCP (UK)", "CPSP Fellow", "BSG Member"],
//     social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
//     solidColor: "#10b981",
//     gradient: "from-emerald-500 to-green-400",
//     lightBg: "from-emerald-50 to-green-50",
//     borderColor: "border-emerald-200",
//     accentText: "text-emerald-600",
//     badgeBg: "bg-emerald-100",
//     badgeText: "text-emerald-700",
//     IconComp: TbStethoscope,
//   },
// ];

// const TAGS = [
//   { value: "all",         label: "All Doctors",     color: "#0ea5e9", icon: TbStethoscope },
//   { value: "skin",        label: "Skin Care",        color: "#ec4899", icon: MdFace },
//   { value: "dental",      label: "Dental",           color: "#0ea5e9", icon: GiTooth },
//   { value: "gynecology",  label: "Gynecology",       color: "#a855f7", icon: GiBabyFace },
//   { value: "orthopedic",  label: "Orthopedic",       color: "#f59e0b", icon: TbBone },
//   { value: "ent",         label: "ENT",              color: "#14b8a6", icon: TbEar },
//   { value: "neurology",   label: "Neurology",        color: "#6366f1", icon: GiBrain },
//   { value: "hair",        label: "Hair Transplant",  color: "#8b5cf6", icon: MdOutlineContentCut },
//   { value: "general",     label: "General",          color: "#10b981", icon: TbStethoscope },
// ];

// const GENDERS  = ["all", "Male", "Female"];
// const BRANCHES = ["all", "Gulberg", "DHA"];

// // ─── Star Rating ──────────────────────────────────────────────────────────────
// function StarRating({ rating, color = "#f59e0b" }) {
//   return (
//     <span className="flex items-center gap-0.5">
//       {[1,2,3,4,5].map(i => {
//         if (i <= Math.floor(rating)) return <FaStar key={i} style={{ color, fontSize: 11 }} />;
//         if (i - 0.5 <= rating)      return <FaStarHalfAlt key={i} style={{ color, fontSize: 11 }} />;
//         return <FaRegStar key={i} style={{ color, fontSize: 11 }} />;
//       })}
//     </span>
//   );
// }

// // ─── Typewriter Hook ──────────────────────────────────────────────────────────
// function useTypewriter(text, speed = 55, startDelay = 400) {
//   const [displayed, setDisplayed] = useState("");
//   const [done, setDone] = useState(false);
//   useEffect(() => {
//     setDisplayed("");
//     setDone(false);
//     let i = 0;
//     const timeout = setTimeout(() => {
//       const interval = setInterval(() => {
//         i++;
//         setDisplayed(text.slice(0, i));
//         if (i >= text.length) { clearInterval(interval); setDone(true); }
//       }, speed);
//       return () => clearInterval(interval);
//     }, startDelay);
//     return () => clearTimeout(timeout);
//   }, [text, speed, startDelay]);
//   return { displayed, done };
// }

// // ─── Floating Icons ───────────────────────────────────────────────────────────
// const floatIcons = [
//   { Icon: TbStethoscope, style:{ top:"18%",   left:"4%" },     size:26, delay:0    },
//   { Icon: GiHeartBeats,  style:{ top:"22%",   right:"7%" },    size:30, delay:0.5  },
//   { Icon: GiBrain,       style:{ bottom:"22%",left:"7%" },     size:24, delay:0.9  },
//   { Icon: TbBone,        style:{ bottom:"28%",right:"5%" },    size:22, delay:1.3  },
//   { Icon: MdFace,        style:{ top:"58%",   left:"2.5%" },   size:20, delay:0.7  },
//   { Icon: TbEar,         style:{ top:"12%",   right:"19%" },   size:19, delay:1.1  },
//   { Icon: GiTooth,       style:{ bottom:"12%",right:"22%" },   size:18, delay:1.6  },
//   { Icon: GiBabyFace,    style:{ top:"42%",   right:"3%" },    size:21, delay:0.3  },
// ];

// // ─── BANNER ───────────────────────────────────────────────────────────────────
// function Banner() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true });

//   const line1 = "World-Class Medical Experts";
//   const line2 = "At Your Service";
//   const { displayed: tw1, done: done1 } = useTypewriter(line1, 50, 600);
//   const { displayed: tw2 } = useTypewriter(done1 ? line2 : "", 65, 200);

//   return (
//     <section ref={ref} className="relative overflow-hidden py-20 sm:py-28"
//       style={{ background:"linear-gradient(135deg,#f0f9ff 0%,#ffffff 45%,#fdf2f8 100%)" }}>

//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-sky-200/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration:"9s" }} />
//         <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-pink-200/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration:"13s" }} />
//         <div className="absolute inset-0 opacity-[0.18]"
//           style={{ backgroundImage:`linear-gradient(rgba(14,165,233,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(219,39,119,.05) 1px,transparent 1px)`, backgroundSize:"48px 48px" }} />
//       </div>

//       {floatIcons.map(({ Icon, style, size, delay }, i) => (
//         <motion.div key={i}
//           className="absolute hidden lg:flex items-center justify-center w-14 h-14 rounded-2xl bg-white/70 border border-slate-100 shadow-md"
//           style={style}
//           initial={{ opacity:0, y:20 }}
//           animate={inView ? { opacity:[0,0.65,0.65], y:[20,0,-6,0] } : {}}
//           transition={{ delay, duration:3.5, repeat:Infinity, repeatType:"reverse", ease:"easeInOut" }}>
//           <Icon size={size} style={{ color:"#0ea5e9", opacity:0.7 }} />
//         </motion.div>
//       ))}

//       <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
//         <motion.div initial={{ opacity:0, scale:0.85 }} animate={inView ? { opacity:1, scale:1 } : {}}
//           transition={{ duration:0.6 }}
//           className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-sky-200/70 text-sky-600 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm backdrop-blur-sm">
//           <FaHeartbeat className="animate-pulse text-pink-500" />
//           Meet Our Specialists
//         </motion.div>

//         {/* Typewriter Heading */}
//         <div className="text-4xl sm:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight font-serif mb-5 min-h-[5rem] sm:min-h-[7.5rem]">
//           <span>{tw1.split(" ").map((word, wi) => {
//             const gradientWords = ["Medical", "Experts"];
//             const isGrad = gradientWords.includes(word);
//             return (
//               <span key={wi}>
//                 {isGrad
//                   ? <span style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{word}</span>
//                   : word}
//                 {" "}
//               </span>
//             );
//           })}</span>
//           {done1 && (
//             <><br /><span>{tw2}</span></>
//           )}
//           <span className="inline-block w-0.5 h-8 sm:h-12 bg-sky-500 align-middle ml-1 animate-pulse" style={{ opacity: tw2.length >= line2.length ? 0 : 1 }} />
//         </div>

//         <motion.p initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
//           transition={{ duration:0.9, delay:0.25 }}
//           className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
//           Board-certified specialists with international training — delivering compassionate, cutting-edge care across 8 medical disciplines.
//         </motion.p>

//         <motion.div initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
//           transition={{ duration:0.8, delay:0.4 }}
//           className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10">
//           {[
//             {num:"30+", label:"Specialists"},
//             {num:"8",   label:"Disciplines"},
//             {num:"50K+",label:"Patients Served"},
//             {num:"15+", label:"Years Avg. Exp."},
//           ].map((s,i) => (
//             <motion.div key={s.label} initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
//               transition={{ delay:0.4+i*0.08 }} className="text-center">
//               <p className="text-3xl font-extrabold"
//                 style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//                 {s.num}
//               </p>
//               <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">{s.label}</p>
//             </motion.div>
//           ))}
//         </motion.div>

//         <motion.div initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
//           transition={{ duration:0.8, delay:0.55 }}
//           className="flex flex-wrap justify-center gap-4">
//           <a href="#booking"
//             className="px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-xl hover:opacity-90 transition-opacity flex items-center gap-2"
//             style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)" }}>
//             <FiCalendar size={15} /> Book Appointment
//           </a>
//           <a href="tel:+923001234567"
//             className="px-8 py-3.5 rounded-xl font-bold text-sm text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex items-center gap-2">
//             <FiPhone size={15} /> Call Us Now
//           </a>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// // ─── AUTO-SCROLL CATEGORY SLIDER ─────────────────────────────────────────────
// function CategorySlider({ activeTag, setActiveTag }) {
//   const trackRef = useRef(null);
//   const [isPaused, setIsPaused] = useState(false);
//   const posRef = useRef(0);
//   const rafRef = useRef(null);
//   const SPEED = 0.6;

//   // Duplicate tags for seamless loop
//   const doubled = [...TAGS, ...TAGS];

//   useEffect(() => {
//     const track = trackRef.current;
//     if (!track) return;
//     const halfW = track.scrollWidth / 2;

//     const step = () => {
//       if (!isPaused) {
//         posRef.current += SPEED;
//         if (posRef.current >= halfW) posRef.current = 0;
//         track.style.transform = `translateX(-${posRef.current}px)`;
//       }
//       rafRef.current = requestAnimationFrame(step);
//     };
//     rafRef.current = requestAnimationFrame(step);
//     return () => cancelAnimationFrame(rafRef.current);
//   }, [isPaused]);

//   return (
//     <div className="w-full overflow-hidden py-3 bg-white/60 backdrop-blur-sm border-b border-slate-100">
//       <div className="relative flex"
//         onMouseEnter={() => setIsPaused(true)}
//         onMouseLeave={() => setIsPaused(false)}>
//         <div ref={trackRef} className="flex gap-3 will-change-transform" style={{ whiteSpace:"nowrap" }}>
//           {doubled.map(({ value, label, color, icon: TagIcon }, idx) => {
//             const active = activeTag === value;
//             return (
//               <motion.button
//                 key={idx}
//                 onClick={() => setActiveTag(value)}
//                 whileHover={{ scale: 1.06 }}
//                 whileTap={{ scale: 0.95 }}
//                 className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold flex-shrink-0 transition-all duration-200 border ${
//                   active
//                     ? "text-white border-transparent shadow-lg"
//                     : "text-slate-600 bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
//                 }`}
//                 style={active ? {
//                   background: value === "all"
//                     ? "linear-gradient(135deg,#0ea5e9,#db2777)"
//                     : `linear-gradient(135deg,${color}ee,${color}99)`,
//                   boxShadow: `0 4px 14px -2px ${color ?? "#0ea5e9"}55`
//                 } : {}}>
//                 <TagIcon size={12} style={{ color: active ? "white" : color }} />
//                 {label}
//               </motion.button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── FILTER BAR ───────────────────────────────────────────────────────────────
// function FilterBar({ activeTag, setActiveTag, gender, setGender, branch, setBranch, avail, setAvail, search, setSearch, count }) {
//   return (
//     <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm">
//       {/* Auto-scroll category slider */}
//       <CategorySlider activeTag={activeTag} setActiveTag={setActiveTag} />

//       <div className="px-4 py-4">
//         <div className="max-w-7xl mx-auto space-y-3">
//           {/* Row: search + dropdowns */}
//           <div className="flex flex-wrap gap-3 items-center">
//             <div className="relative flex-1 min-w-[180px] max-w-xs">
//               <FiSearch size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
//               <input value={search} onChange={e => setSearch(e.target.value)}
//                 placeholder="Search doctors, specialties..."
//                 className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-slate-700 bg-slate-50 border border-slate-200 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all" />
//               {search && (
//                 <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
//                   <FiX size={13} />
//                 </button>
//               )}
//             </div>

//             <select value={gender} onChange={e => setGender(e.target.value)}
//               className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200 focus:outline-none focus:border-sky-400 transition-all appearance-none pr-7">
//               {GENDERS.map(g => <option key={g} value={g}>{g === "all" ? "All Genders" : g}</option>)}
//             </select>

//             <select value={branch} onChange={e => setBranch(e.target.value)}
//               className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200 focus:outline-none focus:border-sky-400 transition-all appearance-none pr-7">
//               {BRANCHES.map(b => <option key={b} value={b}>{b === "all" ? "All Branches" : b}</option>)}
//             </select>

//             <select value={avail} onChange={e => setAvail(e.target.value)}
//               className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200 focus:outline-none focus:border-sky-400 transition-all appearance-none pr-7">
//               <option value="all">All Availability</option>
//               <option value="available">Available Now</option>
//             </select>

//             <motion.span key={count} initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
//               className="text-sm font-bold ml-auto hidden sm:block"
//               style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//               {count} doctor{count !== 1 ? "s" : ""}
//             </motion.span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── DOCTOR MODAL ─────────────────────────────────────────────────────────────
// function DoctorModal({ doctor: d, onClose }) {
//   const whatsappMsg = encodeURIComponent(`Hello, I'd like to book an appointment with ${d.name}.`);
//   return (
//     <AnimatePresence>
//       <motion.div
//         className="fixed inset-0 z-[100] flex items-center justify-center p-4"
//         initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>

//         <motion.div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
//           onClick={onClose} initial={{ opacity:0 }} animate={{ opacity:1 }} />

//         <motion.div
//           initial={{ opacity:0, scale:0.93, y:30 }}
//           animate={{ opacity:1, scale:1, y:0 }}
//           exit={{ opacity:0, scale:0.95, y:20 }}
//           transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
//           className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
//           style={{ scrollbarWidth:"none" }}>

//           <div className="h-1.5 rounded-t-3xl w-full"
//             style={{ background:`linear-gradient(90deg,${d.solidColor},#db2777)` }} />

//           {/* Header */}
//           <div className={`relative p-6 sm:p-8 bg-gradient-to-br ${d.lightBg}`}>
//             <button onClick={onClose}
//               className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 hover:border-slate-300 transition-all shadow-sm">
//               <FiX size={16} />
//             </button>

//             <div className="flex flex-col sm:flex-row gap-6 items-start">
//               <div className="relative flex-shrink-0">
//                 <img src={d.image} alt={d.name}
//                   className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-xl"
//                   style={{ border:`3px solid ${d.solidColor}40` }} />
//                 {d.available && (
//                   <span className="absolute -bottom-1.5 -right-1.5 flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
//                     <span className="w-1.5 h-1.5 bg-white rounded-full" />
//                     Available
//                   </span>
//                 )}
//               </div>

//               <div className="flex-1 min-w-0">
//                 <div className="flex flex-wrap items-center gap-2 mb-1">
//                   <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${d.badgeBg} ${d.badgeText}`}>
//                     {d.specialty}
//                   </span>
//                   {d.certifications.slice(0,1).map(c => (
//                     <span key={c} className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">{c}</span>
//                   ))}
//                 </div>
//                 <h2 className="text-2xl font-extrabold text-slate-900 font-serif mb-0.5">{d.name}</h2>
//                 <p className={`text-sm font-semibold ${d.accentText} mb-3`}>{d.title}</p>

//                 <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 mb-4">
//                   <span className="flex items-center gap-1.5"><FiAward size={13} style={{color:d.solidColor}} /> {d.experience} Experience</span>
//                   <span className="flex items-center gap-1.5"><FiHeart size={13} style={{color:d.solidColor}} /> {d.patients} Patients</span>
//                   <span className="flex items-center gap-1.5"><FiMapPin size={13} style={{color:d.solidColor}} /> {d.branch.join(", ")}</span>
//                   <span className="flex items-center gap-1.5"><FiGlobe size={13} style={{color:d.solidColor}} /> {d.languages.join(", ")}</span>
//                 </div>

//                 <div className="flex items-center gap-2 mb-4">
//                   <StarRating rating={d.rating} color={d.solidColor} />
//                   <span className="font-bold text-slate-800 text-sm">{d.rating}</span>
//                   <span className="text-slate-400 text-xs">({d.reviews} reviews)</span>
//                 </div>

//                 {/* Social Links */}
//                 {d.social && (
//                   <div className="flex items-center gap-2">
//                     {d.social.linkedin && (
//                       <a href={d.social.linkedin} target="_blank" rel="noopener noreferrer"
//                         className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#0077b5]/10 hover:bg-[#0077b5]/20 transition-colors">
//                         <FaLinkedinIn size={13} style={{color:"#0077b5"}} />
//                       </a>
//                     )}
//                     {d.social.facebook && (
//                       <a href={d.social.facebook} target="_blank" rel="noopener noreferrer"
//                         className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#1877f2]/10 hover:bg-[#1877f2]/20 transition-colors">
//                         <FaFacebook size={13} style={{color:"#1877f2"}} />
//                       </a>
//                     )}
//                     {d.social.instagram && (
//                       <a href={d.social.instagram} target="_blank" rel="noopener noreferrer"
//                         className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#e1306c]/10 hover:bg-[#e1306c]/20 transition-colors">
//                         <FaInstagram size={13} style={{color:"#e1306c"}} />
//                       </a>
//                     )}
//                     {d.social.twitter && (
//                       <a href={d.social.twitter} target="_blank" rel="noopener noreferrer"
//                         className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors">
//                         <FaTwitter size={13} className="text-slate-600" />
//                       </a>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* CTA Row */}
//             <div className="flex flex-wrap gap-3 mt-6">
//               <motion.a whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
//                 href="#booking"
//                 className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-sm shadow-lg"
//                 style={{ background:`linear-gradient(135deg,${d.solidColor},#db2777)` }}>
//                 <FiCalendar size={14} /> Book Appointment
//               </motion.a>
//               <motion.a whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
//                 href={`https://wa.me/923001234567?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer"
//                 className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-sm bg-[#25D366] shadow-lg">
//                 <FaWhatsapp size={14} /> WhatsApp
//               </motion.a>
//               <motion.a whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
//                 href="#consultation"
//                 className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border-2 text-slate-700 bg-white hover:bg-slate-50 transition-all"
//                 style={{ borderColor:`${d.solidColor}40` }}>
//                 <FiVideo size={14} style={{ color:d.solidColor }} /> Video Consult
//               </motion.a>
//             </div>
//           </div>

//           {/* Body */}
//           <div className="p-6 sm:p-8 space-y-7">

//             {/* Next Slot + Fee + Languages */}
//             <div className="grid grid-cols-3 gap-3">
//               {[
//                 { icon:<FiClock size={15}/>, label:"Next Available", val:d.nextSlot, color:d.solidColor },
//                 { icon:<span className="text-sm font-bold" style={{color:d.solidColor}}>₨</span>, label:"Consultation Fee", val:d.fee, color:d.solidColor },
//                 { icon:<FiGlobe size={15}/>, label:"Languages", val:d.languages.join(", "), color:d.solidColor },
//               ].map(item => (
//                 <div key={item.label} className="rounded-2xl p-4 text-center" style={{ background:`${d.solidColor}08`, border:`1px solid ${d.solidColor}20` }}>
//                   <div className="flex justify-center mb-1" style={{color:d.solidColor}}>{item.icon}</div>
//                   <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">{item.label}</p>
//                   <p className="text-slate-800 font-bold text-xs">{item.val}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Availability Schedule */}
//             {d.availabilitySchedule && (
//               <div>
//                 <h4 className="text-slate-900 font-extrabold text-base mb-3 flex items-center gap-2">
//                   <span className="w-1 h-4 rounded-full inline-block" style={{ background:d.solidColor }} />
//                   Availability Schedule
//                 </h4>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//                   {d.availabilitySchedule.map((slot, i) => (
//                     <div key={i} className="rounded-xl p-3" style={{ background:`${d.solidColor}08`, border:`1px solid ${d.solidColor}18` }}>
//                       <p className="text-xs font-extrabold" style={{color:d.solidColor}}>{slot.day}</p>
//                       <p className="text-slate-600 text-[11px] font-medium mt-0.5">{slot.time}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Bio */}
//             <div>
//               <h4 className="text-slate-900 font-extrabold text-base mb-3 flex items-center gap-2">
//                 <span className="w-1 h-4 rounded-full inline-block" style={{ background:d.solidColor }} />
//                 About Dr. {d.name.split(" ").slice(-1)[0]}
//               </h4>
//               <p className="text-slate-500 text-sm leading-relaxed">{d.bio}</p>
//             </div>

//             {/* Specializations */}
//             <div>
//               <h4 className="text-slate-900 font-extrabold text-base mb-3 flex items-center gap-2">
//                 <span className="w-1 h-4 rounded-full inline-block" style={{ background:d.solidColor }} />
//                 Specializations
//               </h4>
//               <div className="flex flex-wrap gap-2">
//                 {d.specializations.map(s => (
//                   <span key={s} className={`px-3 py-1 rounded-full text-xs font-bold ${d.badgeBg} ${d.badgeText}`}>{s}</span>
//                 ))}
//               </div>
//             </div>

//             {/* Doctor-Specific Services */}
//             {d.services && (
//               <div>
//                 <h4 className="text-slate-900 font-extrabold text-base mb-3 flex items-center gap-2">
//                   <span className="w-1 h-4 rounded-full inline-block" style={{ background:d.solidColor }} />
//                   Services Offered
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {d.services.map(s => (
//                     <span key={s} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700">
//                       <FiCheckCircle size={11} style={{color:d.solidColor}} /> {s}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Education */}
//             <div>
//               <h4 className="text-slate-900 font-extrabold text-base mb-3 flex items-center gap-2">
//                 <span className="w-1 h-4 rounded-full inline-block" style={{ background:d.solidColor }} />
//                 Education & Training
//               </h4>
//               <div className="space-y-3">
//                 {d.education.map((e, i) => (
//                   <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background:`${d.solidColor}06`, border:`1px solid ${d.solidColor}15` }}>
//                     <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-black" style={{ background:`${d.solidColor}15`, color:d.solidColor }}>
//                       {e.year.slice(-2)}
//                     </div>
//                     <div>
//                       <p className="text-slate-800 font-bold text-sm">{e.degree}</p>
//                       <p className="text-slate-400 text-xs">{e.institution}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Certifications */}
//             <div>
//               <h4 className="text-slate-900 font-extrabold text-base mb-3 flex items-center gap-2">
//                 <span className="w-1 h-4 rounded-full inline-block" style={{ background:d.solidColor }} />
//                 Certifications & Memberships
//               </h4>
//               <div className="flex flex-wrap gap-2">
//                 {d.certifications.map(c => (
//                   <span key={c} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700">
//                     <HiOutlineBadgeCheck size={13} style={{color:d.solidColor}} /> {c}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Ratings & Reviews summary */}
//             <div className="rounded-2xl p-5" style={{ background:`${d.solidColor}06`, border:`1px solid ${d.solidColor}20` }}>
//               <h4 className="text-slate-900 font-extrabold text-base mb-3 flex items-center gap-2">
//                 <span className="w-1 h-4 rounded-full inline-block" style={{ background:d.solidColor }} />
//                 Ratings & Reviews
//               </h4>
//               <div className="flex items-center gap-4">
//                 <div className="text-center">
//                   <p className="text-4xl font-extrabold" style={{color:d.solidColor}}>{d.rating}</p>
//                   <StarRating rating={d.rating} color={d.solidColor} />
//                   <p className="text-slate-400 text-xs mt-1">{d.reviews} reviews</p>
//                 </div>
//                 <div className="flex-1 space-y-1.5">
//                   {[5,4,3,2,1].map(star => {
//                     const pct = star === 5 ? 72 : star === 4 ? 18 : star === 3 ? 6 : star === 2 ? 2 : 2;
//                     return (
//                       <div key={star} className="flex items-center gap-2">
//                         <span className="text-xs text-slate-400 w-3">{star}</span>
//                         <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
//                           <motion.div className="h-full rounded-full" style={{ background:d.solidColor, width:`${pct}%` }}
//                             initial={{ width:0 }} animate={{ width:`${pct}%` }} transition={{ delay:0.3, duration:0.8 }} />
//                         </div>
//                         <span className="text-[10px] text-slate-400 w-6">{pct}%</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// // ─── DOCTOR CARD ──────────────────────────────────────────────────────────────
// function DoctorCard({ doctor: d, onOpen, index }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin:"-40px" });
//   const whatsappMsg = encodeURIComponent(`Hello, I'd like to book an appointment with ${d.name}.`);

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity:0, y:60, scale:0.95 }}
//       animate={inView ? { opacity:1, y:0, scale:1 } : {}}
//       transition={{ duration:0.55, delay:index * 0.09, ease:[0.25,1,0.5,1] }}
//       whileHover={{ y:-8, transition:{ duration:0.25 } }}
//       className="group relative bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-400 overflow-hidden cursor-pointer flex flex-col"
//       onClick={() => onOpen(d)}>

//       <div className="h-1 w-full rounded-t-3xl"
//         style={{ background:`linear-gradient(90deg,${d.solidColor},#db2777)` }} />

//       {/* Availability badge */}
//       <div className="absolute top-4 right-4 z-10">
//         {d.available ? (
//           <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
//             <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
//             Available
//           </span>
//         ) : (
//           <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-bold px-2.5 py-1 rounded-full">
//             <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
//             Booked
//           </span>
//         )}
//       </div>

//       {/* Image section */}
//       <div className={`relative p-5 pb-0 bg-gradient-to-br ${d.lightBg}`}>
//         <div className="relative w-full h-[320px] overflow-hidden rounded-2xl flex items-start justify-center">
//           <img src={d.image} alt={d.name}
//           // className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"/>
//           className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"/>
//           <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
//           <div className="absolute bottom-3 left-3">
//             <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-md ${d.accentText}`}>
//               <d.IconComp size={12} /> {d.specialty}
//             </span>
//           </div>
//           {/* Social media mini-icons on hover */}
//           <motion.div
//             initial={{ opacity:0 }}
//             whileHover={{ opacity:1 }}
//             className="absolute top-3 left-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//             {d.social?.linkedin && (
//               <a href={d.social.linkedin} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
//                 className="w-7 h-7 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center shadow">
//                 <FaLinkedinIn size={10} style={{color:"#0077b5"}} />
//               </a>
//             )}
//             {d.social?.instagram && (
//               <a href={d.social.instagram} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
//                 className="w-7 h-7 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center shadow">
//                 <FaInstagram size={10} style={{color:"#e1306c"}} />
//               </a>
//             )}
//           </motion.div>
//         </div>
//       </div>

//       {/* Body */}
//       <div className="p-5 flex flex-col flex-1">
//         <div className="mb-3">
//           <h3 className="text-slate-900 font-extrabold text-lg font-serif leading-tight">{d.name}</h3>
//           <p className={`text-xs font-semibold ${d.accentText} mt-0.5`}>{d.title}</p>
//         </div>

//         <div className="flex items-center gap-2 mb-3">
//           <StarRating rating={d.rating} color={d.solidColor} />
//           <span className="font-bold text-slate-800 text-sm">{d.rating}</span>
//           <span className="text-slate-400 text-xs">({d.reviews})</span>
//         </div>

//         <div className="grid grid-cols-3 gap-2 mb-4">
//           {[
//             { icon:<FiAward size={12}/>, val:d.experience, label:"Exp." },
//             { icon:<FiHeart size={12}/>, val:d.patients,   label:"Patients" },
//             { icon:<span className="text-xs font-bold">₨</span>, val:d.fee.replace("PKR ",""), label:"Fee" },
//           ].map(s => (
//             <div key={s.label} className="text-center rounded-xl py-2"
//               style={{ background:`${d.solidColor}08`, border:`1px solid ${d.solidColor}15` }}>
//               <div className="flex justify-center mb-0.5" style={{color:d.solidColor}}>{s.icon}</div>
//               <p className="text-slate-800 font-bold text-xs leading-tight">{s.val}</p>
//               <p className="text-slate-400 text-[9px] uppercase tracking-wider">{s.label}</p>
//             </div>
//           ))}
//         </div>

//         <div className="flex items-center gap-2 mb-4 p-2.5 rounded-xl"
//           style={{ background:`${d.solidColor}08`, border:`1px solid ${d.solidColor}15` }}>
//           <FiClock size={12} style={{color:d.solidColor, flexShrink:0}} />
//           <span className="text-xs text-slate-600 font-medium">{d.nextSlot}</span>
//         </div>

//         <div className="flex flex-wrap gap-1.5 mb-5">
//           {d.languages.map(l => (
//             <span key={l} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">{l}</span>
//           ))}
//           {d.branch.map(b => (
//             <span key={b} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${d.badgeBg} ${d.badgeText}`}>{b}</span>
//           ))}
//         </div>

//         <div className="mt-auto flex gap-2">
//           <motion.button
//             whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
//             onClick={e => { e.stopPropagation(); }}
//             className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-white text-xs shadow-md"
//             style={{ background:`linear-gradient(135deg,${d.solidColor},#db2777)` }}>
//             <FiCalendar size={12} /> Book Now
//           </motion.button>
//           <motion.a
//             whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }}
//             href={`https://wa.me/923001234567?text=${whatsappMsg}`}
//             target="_blank" rel="noopener noreferrer"
//             onClick={e => e.stopPropagation()}
//             className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center shadow-md flex-shrink-0">
//             <FaWhatsapp size={16} className="text-white" />
//           </motion.a>
//           <motion.button
//             whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }}
//             onClick={e => { e.stopPropagation(); onOpen(d); }}
//             className="w-10 h-10 rounded-xl flex items-center justify-center border-2 flex-shrink-0 bg-white hover:bg-slate-50 transition-colors"
//             style={{ borderColor:`${d.solidColor}40` }}>
//             <HiOutlineArrowRight size={15} style={{color:d.solidColor}} />
//           </motion.button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// // ─── MAIN PAGE ────────────────────────────────────────────────────────────────
// export default function DoctorsPage({ onNavigate }) {
//   const [activeTag,  setActiveTag]  = useState("all");
//   const [gender,     setGender]     = useState("all");
//   const [branch,     setBranch]     = useState("all");
//   const [avail,      setAvail]      = useState("all");
//   const [search,     setSearch]     = useState("");
//   const [selected,   setSelected]   = useState(null);

//   const filtered = doctors.filter(d => {
//     const matchTag    = activeTag === "all" || d.tag === activeTag;
//     const matchGender = gender === "all"    || d.gender === gender;
//     const matchBranch = branch === "all"    || d.branch.includes(branch);
//     const matchAvail  = avail === "all"     || d.available;
//     const q = search.toLowerCase();
//     const matchSearch = !q
//       || d.name.toLowerCase().includes(q)
//       || d.specialty.toLowerCase().includes(q)
//       || d.specializations.some(s => s.toLowerCase().includes(q))
//       || d.title.toLowerCase().includes(q);
//     return matchTag && matchGender && matchBranch && matchAvail && matchSearch;
//   });

//   const whatsappNumber = "+923001234567";
//   const welcomeMessage = encodeURIComponent("Hello Premium Clinic, I want to inquire about your healthcare services.");

//   return (
//     <div className="min-h-screen bg-slate-50 font-body">
//       {selected && <DoctorModal doctor={selected} onClose={() => setSelected(null)} />}

//       <Banner />

//       <FilterBar
//         activeTag={activeTag}   setActiveTag={setActiveTag}
//         gender={gender}         setGender={setGender}
//         branch={branch}         setBranch={setBranch}
//         avail={avail}           setAvail={setAvail}
//         search={search}         setSearch={setSearch}
//         count={filtered.length}
//       />

//       {/* Cards Grid */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
//         <div className="flex items-center justify-between mb-7">
//           <div>
//             <h2 className="text-xl font-extrabold text-slate-900">
//               {activeTag === "all" ? "All Specialists" : TAGS.find(t => t.value === activeTag)?.label}
//             </h2>
//             <p className="text-sm text-slate-400 mt-0.5">
//               {filtered.length} result{filtered.length !== 1 ? "s" : ""} · click any card for full profile
//             </p>
//           </div>
//         </div>

//         <AnimatePresence mode="popLayout">
//           {filtered.length > 0 ? (
//             <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//               {filtered.map((doc, i) => (
//                 <DoctorCard key={doc.id} doctor={doc} onOpen={setSelected} index={i} />
//               ))}
//             </motion.div>
//           ) : (
//             <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
//               className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
//               <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
//                 <FiSearch size={26} className="text-slate-300" />
//               </div>
//               <h3 className="text-xl font-bold text-slate-600 mb-2">No doctors found</h3>
//               <p className="text-slate-400 text-sm mb-5">Try adjusting your search or filters.</p>
//               <button onClick={() => { setActiveTag("all"); setGender("all"); setBranch("all"); setAvail("all"); setSearch(""); }}
//                 className="px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow"
//                 style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)" }}>
//                 Reset All Filters
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Bottom CTA */}
//       <section className="relative overflow-hidden py-20 mt-4"
//         style={{ background:"linear-gradient(135deg,#0ea5e9 0%,#7c3aed 50%,#db2777 100%)" }}>
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
//           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
//         </div>
//         <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
//           <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 font-serif">
//             Not Sure Which Specialist You Need?
//           </h2>
//           <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto">
//             Our team will guide you to the right doctor. Book a free consultation or chat on WhatsApp.
//           </p>
//           <div className="flex flex-wrap justify-center gap-4">
//             <a href="#booking"
//               className="px-8 py-3.5 rounded-xl font-bold text-sky-600 bg-white shadow-xl hover:bg-white/90 transition-all flex items-center gap-2 text-sm">
//               <FiCalendar size={14} /> Book Free Consultation
//             </a>
//             <a href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`}
//               target="_blank" rel="noopener noreferrer"
//               className="px-8 py-3.5 rounded-xl font-bold text-white border-2 border-white/40 hover:bg-white/10 transition-all flex items-center gap-2 text-sm">
//               <FiMessageCircle size={14} /> Chat on WhatsApp
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Floating WhatsApp */}
//       <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
//         <div className="absolute w-16 h-16 bg-green-500 rounded-full animate-ping opacity-40 pointer-events-none" />
//         <motion.a
//           href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`}
//           target="_blank" rel="noopener noreferrer"
//           whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }}
//           initial={{ opacity:0, scale:0.6 }} animate={{ opacity:1, scale:1 }}
//           transition={{ type:"spring", stiffness:260, damping:20 }}
//           className="relative w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#20ba5a] transition-colors duration-200 cursor-pointer group">
//           <FaWhatsapp size={36} />
//           <span className="absolute right-20 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 pointer-events-none transition-all duration-200">
//             Chat With Us
//           </span>
//         </motion.a>
//       </div>
//     </div>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FiStar, FiCalendar, FiMessageCircle, FiVideo,
  FiAward, FiClock, FiSearch, FiX, FiChevronDown,
  FiGlobe, FiPhone, FiMail, FiLinkedin, FiFilter,
  FiMapPin, FiCheckCircle, FiHeart, FiTwitter, FiArrowLeft,
} from "react-icons/fi";
import {
  FaWhatsapp, FaLinkedinIn, FaFacebook, FaTwitter, FaInstagram,
  FaStar, FaRegStar, FaStarHalfAlt, FaHeartbeat,
} from "react-icons/fa";
import { GiTooth, GiHeartBeats, GiBrain, GiBabyFace } from "react-icons/gi";
import { TbStethoscope, TbBone, TbEar, TbEye, TbBrandWhatsapp } from "react-icons/tb";
import { MdFace, MdOutlineContentCut } from "react-icons/md";
import { HiOutlineArrowRight, HiOutlineBadgeCheck } from "react-icons/hi";

// ─── DOCTOR DATA ──────────────────────────────────────────────────────────────
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Ahmed",
    slug: "dr-sarah-ahmed",
    title: "MBBS, FCPS (Dermatology)",
    specialty: "Skin & Dermatology",
    tag: "skin",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
    experience: "14 Years",
    patients: "8,500+",
    rating: 4.9,
    reviews: 312,
    fee: "PKR 3,000",
    languages: ["Urdu", "English"],
    available: true,
    nextSlot: "Today, 4:00 PM",
    gender: "Female",
    branch: ["Gulberg", "DHA"],
    availabilitySchedule: [
      { day: "Monday", time: "10:00 AM – 2:00 PM" },
      { day: "Wednesday", time: "3:00 PM – 7:00 PM" },
      { day: "Friday", time: "10:00 AM – 1:00 PM" },
      { day: "Saturday", time: "4:00 PM – 8:00 PM" },
    ],
    specializations: ["Laser Therapy", "Acne Treatment", "Anti-Aging", "PRP Rejuvenation"],
    services: ["Laser Resurfacing", "Chemical Peels", "Botox & Fillers", "Skin Biopsy", "Mole Removal"],
    education: [
      { degree: "MBBS", institution: "King Edward Medical University", year: "2008" },
      { degree: "FCPS (Dermatology)", institution: "College of Physicians & Surgeons Pakistan", year: "2013" },
    ],
    bio: "Dr. Sarah Ahmed is one of Pakistan's leading dermatologists with over 14 years of clinical experience. Trained at KEMU and fellowship-certified, she specializes in advanced laser therapies, cosmetic procedures, and medically complex skin conditions. She has treated thousands of patients suffering from acne, pigmentation, eczema, and premature aging.",
    certifications: ["CPSP Fellow", "EADV Member", "AAD Associate"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#ec4899",
    gradient: "from-pink-500 to-rose-400",
    lightBg: "from-pink-50 to-rose-50",
    borderColor: "border-pink-200",
    accentText: "text-pink-600",
    badgeBg: "bg-pink-100",
    badgeText: "text-pink-700",
    IconComp: MdFace,
  },
  {
    id: 2,
    name: "Dr. Omar Farooq",
    slug: "dr-omar-farooq",
    title: "BDS, FCPS (Oral Surgery)",
    specialty: "Dental Care",
    tag: "dental",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
    experience: "11 Years",
    patients: "12,000+",
    rating: 4.8,
    reviews: 489,
    fee: "PKR 2,500",
    languages: ["Urdu", "English", "Punjabi"],
    available: true,
    nextSlot: "Today, 5:30 PM",
    gender: "Male",
    branch: ["Gulberg"],
    availabilitySchedule: [
      { day: "Monday", time: "9:00 AM – 1:00 PM" },
      { day: "Tuesday", time: "2:00 PM – 6:00 PM" },
      { day: "Thursday", time: "9:00 AM – 1:00 PM" },
      { day: "Saturday", time: "10:00 AM – 3:00 PM" },
    ],
    specializations: ["Dental Implants", "Root Canal", "Cosmetic Dentistry", "Orthodontics"],
    services: ["Teeth Whitening", "Veneers", "Dental Crowns", "Tooth Extraction", "Braces & Aligners"],
    education: [
      { degree: "BDS", institution: "University of Health Sciences, Lahore", year: "2011" },
      { degree: "FCPS (Oral Surgery)", institution: "CPSP", year: "2016" },
    ],
    bio: "Dr. Omar Farooq is a board-certified oral surgeon and cosmetic dentist with 11 years of expertise. He is renowned for his painless root canal technique and natural-looking dental implants. His clinic sees over 50 patients daily, making him one of the most sought-after dental specialists in Lahore.",
    certifications: ["CPSP Fellow", "IAOI Member", "ICOI Associate"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#0ea5e9",
    gradient: "from-sky-500 to-cyan-400",
    lightBg: "from-sky-50 to-cyan-50",
    borderColor: "border-sky-200",
    accentText: "text-sky-600",
    badgeBg: "bg-sky-100",
    badgeText: "text-sky-700",
    IconComp: GiTooth,
  },
  {
    id: 3,
    name: "Dr. Fatima Malik",
    slug: "dr-fatima-malik",
    title: "MBBS, MRCOG (Gynecology)",
    specialty: "Gynecology & Obstetrics",
    tag: "gynecology",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80",
    experience: "16 Years",
    patients: "9,200+",
    rating: 5.0,
    reviews: 267,
    fee: "PKR 4,000",
    languages: ["Urdu", "English"],
    available: false,
    nextSlot: "Tomorrow, 10:00 AM",
    gender: "Female",
    branch: ["Gulberg", "DHA"],
    availabilitySchedule: [
      { day: "Tuesday", time: "10:00 AM – 2:00 PM" },
      { day: "Thursday", time: "3:00 PM – 7:00 PM" },
      { day: "Saturday", time: "9:00 AM – 1:00 PM" },
    ],
    specializations: ["High-Risk Pregnancy", "Infertility", "Laparoscopy", "PCOS Management"],
    services: ["Antenatal Care", "Ultrasound", "Fertility Evaluation", "Hysteroscopy", "Normal & C-Section Delivery"],
    education: [
      { degree: "MBBS", institution: "Fatima Jinnah Medical University", year: "2006" },
      { degree: "MRCOG", institution: "Royal College of Obstetricians, London", year: "2012" },
    ],
    bio: "Dr. Fatima Malik is an internationally trained gynecologist and obstetrician with London MRCOG credentials. Specializing in high-risk pregnancies and minimally invasive gynecological surgeries, she brings global medical standards to Lahore. She is deeply committed to women's reproductive health and patient education.",
    certifications: ["MRCOG (London)", "CPSP Fellow", "FOGSI Member"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#a855f7",
    gradient: "from-violet-500 to-purple-400",
    lightBg: "from-violet-50 to-purple-50",
    borderColor: "border-violet-200",
    accentText: "text-violet-600",
    badgeBg: "bg-violet-100",
    badgeText: "text-violet-700",
    IconComp: GiBabyFace,
  },
  {
    id: 4,
    name: "Dr. Hassan Raza",
    slug: "dr-hassan-raza",
    title: "MBBS, FCPS (Orthopedics)",
    specialty: "Orthopedic Surgery",
    tag: "orthopedic",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
    experience: "18 Years",
    patients: "15,000+",
    rating: 4.9,
    reviews: 543,
    fee: "PKR 3,500",
    languages: ["Urdu", "English"],
    available: true,
    nextSlot: "Today, 7:00 PM",
    gender: "Male",
    branch: ["Gulberg"],
    availabilitySchedule: [
      { day: "Monday", time: "9:00 AM – 12:00 PM" },
      { day: "Wednesday", time: "4:00 PM – 8:00 PM" },
      { day: "Friday", time: "9:00 AM – 12:00 PM" },
      { day: "Sunday", time: "11:00 AM – 3:00 PM" },
    ],
    specializations: ["Joint Replacement", "Sports Injuries", "Spine Surgery", "Arthroscopy"],
    services: ["Hip Replacement", "Knee Replacement", "Fracture Surgery", "Spinal Fusion", "Shoulder Repair"],
    education: [
      { degree: "MBBS", institution: "Allama Iqbal Medical College", year: "2004" },
      { degree: "FCPS (Orthopedics)", institution: "CPSP", year: "2010" },
    ],
    bio: "Dr. Hassan Raza is a senior orthopedic surgeon with 18 years of experience in complex joint replacements and spinal procedures. He uses the latest robotic-assisted surgery systems to achieve faster recovery times. He has performed over 3,000 successful knee and hip replacement surgeries.",
    certifications: ["CPSP Fellow", "AOTrauma Member", "POAS President"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#f59e0b",
    gradient: "from-amber-500 to-orange-400",
    lightBg: "from-amber-50 to-orange-50",
    borderColor: "border-amber-200",
    accentText: "text-amber-600",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-700",
    IconComp: TbBone,
  },
  {
    id: 5,
    name: "Dr. Zara Khan",
    slug: "dr-zara-khan",
    title: "MBBS, FCPS (ENT)",
    specialty: "ENT Specialist",
    tag: "ent",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=400&q=80",
    experience: "9 Years",
    patients: "6,800+",
    rating: 4.7,
    reviews: 198,
    fee: "PKR 2,800",
    languages: ["Urdu", "English"],
    available: true,
    nextSlot: "Today, 3:30 PM",
    gender: "Female",
    branch: ["DHA"],
    availabilitySchedule: [
      { day: "Tuesday", time: "10:00 AM – 2:00 PM" },
      { day: "Thursday", time: "3:30 PM – 7:00 PM" },
      { day: "Saturday", time: "10:00 AM – 2:00 PM" },
    ],
    specializations: ["Hearing Loss", "Sinus Surgery", "Vocal Cord Treatment", "Tonsillectomy"],
    services: ["Audiometry", "Endoscopy", "Adenoidectomy", "Septoplasty", "Tympanoplasty"],
    education: [
      { degree: "MBBS", institution: "Nishtar Medical University", year: "2013" },
      { degree: "FCPS (ENT)", institution: "CPSP", year: "2019" },
    ],
    bio: "Dr. Zara Khan is a skilled ENT specialist known for her compassionate approach and surgical precision. She handles a wide spectrum of ear, nose, and throat conditions, from chronic sinusitis to complex hearing disorders. She has special expertise in pediatric ENT cases.",
    certifications: ["CPSP Fellow", "PAES Member", "ENTUK Associate"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#14b8a6",
    gradient: "from-teal-500 to-emerald-400",
    lightBg: "from-teal-50 to-emerald-50",
    borderColor: "border-teal-200",
    accentText: "text-teal-600",
    badgeBg: "bg-teal-100",
    badgeText: "text-teal-700",
    IconComp: TbEar,
  },
  {
    id: 6,
    name: "Dr. Bilal Siddiqui",
    slug: "dr-bilal-siddiqui",
    title: "MBBS, FCPS (Neurology)",
    specialty: "Neurology",
    tag: "neurology",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80",
    experience: "20 Years",
    patients: "11,000+",
    rating: 4.9,
    reviews: 421,
    fee: "PKR 5,000",
    languages: ["Urdu", "English"],
    available: false,
    nextSlot: "Tomorrow, 2:00 PM",
    gender: "Male",
    branch: ["Gulberg", "DHA"],
    availabilitySchedule: [
      { day: "Monday", time: "2:00 PM – 6:00 PM" },
      { day: "Wednesday", time: "2:00 PM – 6:00 PM" },
      { day: "Friday", time: "2:00 PM – 5:00 PM" },
    ],
    specializations: ["Stroke Management", "Epilepsy", "Migraine", "Parkinson's Disease"],
    services: ["EEG", "EMG / NCS", "Neurosonography", "Memory Assessment", "Headache Clinic"],
    education: [
      { degree: "MBBS", institution: "Dow University of Health Sciences", year: "2002" },
      { degree: "FCPS (Neurology)", institution: "CPSP", year: "2009" },
      { degree: "Fellowship (Neurology)", institution: "Johns Hopkins University, USA", year: "2011" },
    ],
    bio: "Dr. Bilal Siddiqui is one of Pakistan's most respected neurologists with a Johns Hopkins fellowship. His clinical interests include stroke prevention, epilepsy management, and movement disorders. He has published research in international medical journals and is a senior trainer for neurology residents.",
    certifications: ["CPSP Fellow", "AAN Member", "WFN Member"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#6366f1",
    gradient: "from-indigo-500 to-blue-400",
    lightBg: "from-indigo-50 to-blue-50",
    borderColor: "border-indigo-200",
    accentText: "text-indigo-600",
    badgeBg: "bg-indigo-100",
    badgeText: "text-indigo-700",
    IconComp: GiBrain,
  },
  {
    id: 7,
    name: "Dr. Nadia Hussain",
    slug: "dr-nadia-hussain",
    title: "MBBS, Fellowship Hair Restoration",
    specialty: "Hair Transplant",
    tag: "hair",
    image: "https://images.unsplash.com/photo-1643297654416-05795d62e39c?auto=format&fit=crop&w=400&q=80",
    experience: "10 Years",
    patients: "4,200+",
    rating: 4.8,
    reviews: 175,
    fee: "Consultation Free",
    languages: ["Urdu", "English"],
    available: true,
    nextSlot: "Today, 6:00 PM",
    gender: "Female",
    branch: ["Gulberg"],
    availabilitySchedule: [
      { day: "Monday", time: "11:00 AM – 3:00 PM" },
      { day: "Thursday", time: "4:00 PM – 8:00 PM" },
      { day: "Saturday", time: "10:00 AM – 2:00 PM" },
    ],
    specializations: ["FUE Technique", "DHI Implant", "PRP Hair Treatment", "Beard Transplant"],
    services: ["Free Hair Analysis", "FUE Hair Transplant", "DHI Implant", "PRP Therapy", "Scalp Micropigmentation"],
    education: [
      { degree: "MBBS", institution: "University of Health Sciences", year: "2012" },
      { degree: "Fellowship (Hair Restoration)", institution: "ISHRS, International", year: "2017" },
    ],
    bio: "Dr. Nadia Hussain is a certified hair restoration specialist with an international ISHRS fellowship. She has pioneered the DHI hair implant technique in Lahore, offering her patients natural density and hairline design with minimal downtime. Her before-and-after results consistently receive top ratings.",
    certifications: ["ISHRS Fellow", "ABHRS Certified", "CPSP Member"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#8b5cf6",
    gradient: "from-violet-600 to-purple-500",
    lightBg: "from-violet-50 to-purple-50",
    borderColor: "border-violet-200",
    accentText: "text-violet-600",
    badgeBg: "bg-violet-100",
    badgeText: "text-violet-700",
    IconComp: MdOutlineContentCut,
  },
  {
    id: 8,
    name: "Dr. Kamran Ali",
    slug: "dr-kamran-ali",
    title: "MBBS, FCPS (General Medicine)",
    specialty: "General Medicine",
    tag: "general",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
    experience: "22 Years",
    patients: "20,000+",
    rating: 4.9,
    reviews: 712,
    fee: "PKR 2,000",
    languages: ["Urdu", "English", "Punjabi"],
    available: true,
    nextSlot: "Today, 2:00 PM",
    gender: "Male",
    branch: ["Gulberg", "DHA"],
    availabilitySchedule: [
      { day: "Monday", time: "9:00 AM – 1:00 PM" },
      { day: "Tuesday", time: "2:00 PM – 6:00 PM" },
      { day: "Thursday", time: "9:00 AM – 1:00 PM" },
      { day: "Friday", time: "2:00 PM – 6:00 PM" },
      { day: "Saturday", time: "10:00 AM – 2:00 PM" },
    ],
    specializations: ["Diabetes Management", "Hypertension", "Infectious Diseases", "Preventive Care"],
    services: ["General Check-up", "ECG", "Diabetes Screening", "Vaccination", "Chronic Disease Management"],
    education: [
      { degree: "MBBS", institution: "Punjab Medical College, Faisalabad", year: "2000" },
      { degree: "FCPS (Medicine)", institution: "CPSP", year: "2007" },
    ],
    bio: "Dr. Kamran Ali is Premium Clinic's most senior physician with 22 years of comprehensive clinical practice. He is the primary care physician for thousands of families in Lahore. Known for his thorough diagnoses and patient-friendly communication, he manages complex multi-system conditions with exceptional skill.",
    certifications: ["CPSP Fellow", "PAP Life Member", "PMDC Gold Medalist"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#10b981",
    gradient: "from-emerald-500 to-green-400",
    lightBg: "from-emerald-50 to-green-50",
    borderColor: "border-emerald-200",
    accentText: "text-emerald-600",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700",
    IconComp: TbStethoscope,
  },

  // ── SKIN (2 more) ──────────────────────────────────────────────────────────
  {
    id: 9,
    name: "Dr. Ayesha Tariq",
    slug: "dr-ayesha-tariq",
    title: "MBBS, MCPS (Dermatology)",
    specialty: "Skin & Dermatology",
    tag: "skin",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&w=400&q=80",
    experience: "8 Years",
    patients: "5,200+",
    rating: 4.7,
    reviews: 184,
    fee: "PKR 2,500",
    languages: ["Urdu", "English"],
    available: true,
    nextSlot: "Today, 5:00 PM",
    gender: "Female",
    branch: ["DHA"],
    availabilitySchedule: [
      { day: "Tuesday", time: "11:00 AM – 3:00 PM" },
      { day: "Thursday", time: "4:00 PM – 8:00 PM" },
      { day: "Sunday", time: "10:00 AM – 1:00 PM" },
    ],
    specializations: ["Vitiligo Treatment", "Eczema", "Skin Allergy", "Cosmetic Dermatology"],
    services: ["Patch Testing", "Microdermabrasion", "Carbon Peel", "Mesotherapy", "Thread Lift"],
    education: [
      { degree: "MBBS", institution: "Allama Iqbal Medical College", year: "2014" },
      { degree: "MCPS (Dermatology)", institution: "CPSP", year: "2019" },
    ],
    bio: "Dr. Ayesha Tariq specializes in medical and cosmetic dermatology with a focus on vitiligo, eczema, and skin allergies. Known for her gentle approach and thorough consultations, she has built a loyal patient base across Lahore's DHA area.",
    certifications: ["MCPS Fellow", "PDA Member", "EADV Associate"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#ec4899",
    gradient: "from-pink-500 to-rose-400",
    lightBg: "from-pink-50 to-rose-50",
    borderColor: "border-pink-200",
    accentText: "text-pink-600",
    badgeBg: "bg-pink-100",
    badgeText: "text-pink-700",
    IconComp: MdFace,
  },
  {
    id: 10,
    name: "Dr. Usman Ghani",
    slug: "dr-usman-ghani",
    title: "MBBS, FCPS (Dermatology & Venereology)",
    specialty: "Skin & Dermatology",
    tag: "skin",
    image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=400&q=80",
    experience: "12 Years",
    patients: "7,000+",
    rating: 4.8,
    reviews: 256,
    fee: "PKR 3,500",
    languages: ["Urdu", "English", "Punjabi"],
    available: false,
    nextSlot: "Tomorrow, 11:00 AM",
    gender: "Male",
    branch: ["Gulberg"],
    availabilitySchedule: [
      { day: "Monday", time: "9:00 AM – 1:00 PM" },
      { day: "Wednesday", time: "5:00 PM – 9:00 PM" },
      { day: "Friday", time: "9:00 AM – 12:00 PM" },
    ],
    specializations: ["Psoriasis", "Skin Cancer Screening", "Hair Loss", "Nail Disorders"],
    services: ["Dermoscopy", "Biopsy", "Excision", "Cryotherapy", "Phototherapy"],
    education: [
      { degree: "MBBS", institution: "Punjab Medical College", year: "2010" },
      { degree: "FCPS (Dermatology)", institution: "CPSP", year: "2016" },
    ],
    bio: "Dr. Usman Ghani is a seasoned dermatologist with over 12 years of clinical experience in both medical and cosmetic dermatology. He is particularly skilled in dermoscopy and skin cancer screening, and has trained several junior dermatologists across Pakistan.",
    certifications: ["CPSP Fellow", "PDA President (2022)", "AAD Member"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#ec4899",
    gradient: "from-pink-500 to-rose-400",
    lightBg: "from-pink-50 to-rose-50",
    borderColor: "border-pink-200",
    accentText: "text-pink-600",
    badgeBg: "bg-pink-100",
    badgeText: "text-pink-700",
    IconComp: MdFace,
  },

  // ── DENTAL (2 more) ────────────────────────────────────────────────────────
  {
    id: 11,
    name: "Dr. Hina Riaz",
    slug: "dr-hina-riaz",
    title: "BDS, FCPS (Orthodontics)",
    specialty: "Dental Care",
    tag: "dental",
    image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=400&q=80",
    experience: "9 Years",
    patients: "6,300+",
    rating: 4.9,
    reviews: 310,
    fee: "PKR 2,000",
    languages: ["Urdu", "English"],
    available: true,
    nextSlot: "Today, 3:00 PM",
    gender: "Female",
    branch: ["DHA"],
    availabilitySchedule: [
      { day: "Monday", time: "10:00 AM – 2:00 PM" },
      { day: "Wednesday", time: "3:00 PM – 7:00 PM" },
      { day: "Saturday", time: "10:00 AM – 2:00 PM" },
    ],
    specializations: ["Braces", "Invisalign", "Teeth Alignment", "Retainers"],
    services: ["Metal Braces", "Clear Aligners", "Retainer Fitting", "Space Maintainers", "Jaw Correction"],
    education: [
      { degree: "BDS", institution: "De'Montmorency College of Dentistry", year: "2013" },
      { degree: "FCPS (Orthodontics)", institution: "CPSP", year: "2019" },
    ],
    bio: "Dr. Hina Riaz is one of Lahore's top orthodontists specializing in Invisalign and modern braces techniques. Her meticulous approach to smile correction and jaw alignment has earned her an outstanding reputation among teen and adult patients alike.",
    certifications: ["CPSP Fellow", "POS Member", "WFO Associate"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#0ea5e9",
    gradient: "from-sky-500 to-cyan-400",
    lightBg: "from-sky-50 to-cyan-50",
    borderColor: "border-sky-200",
    accentText: "text-sky-600",
    badgeBg: "bg-sky-100",
    badgeText: "text-sky-700",
    IconComp: GiTooth,
  },
  {
    id: 12,
    name: "Dr. Salman Qureshi",
    slug: "dr-salman-qureshi",
    title: "BDS, MSc (Prosthodontics)",
    specialty: "Dental Care",
    tag: "dental",
    image: "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?auto=format&fit=crop&w=400&q=80",
    experience: "13 Years",
    patients: "9,800+",
    rating: 4.8,
    reviews: 401,
    fee: "PKR 3,000",
    languages: ["Urdu", "English"],
    available: true,
    nextSlot: "Today, 6:30 PM",
    gender: "Male",
    branch: ["Gulberg", "DHA"],
    availabilitySchedule: [
      { day: "Tuesday", time: "9:00 AM – 1:00 PM" },
      { day: "Thursday", time: "4:00 PM – 8:00 PM" },
      { day: "Saturday", time: "11:00 AM – 3:00 PM" },
    ],
    specializations: ["Dental Prosthetics", "Full Mouth Rehabilitation", "Crowns & Bridges", "Dentures"],
    services: ["Complete Dentures", "Partial Dentures", "Porcelain Crowns", "Zirconia Bridges", "Full Mouth Restoration"],
    education: [
      { degree: "BDS", institution: "University of Health Sciences", year: "2009" },
      { degree: "MSc (Prosthodontics)", institution: "King's College London", year: "2013" },
    ],
    bio: "Dr. Salman Qureshi is a London-trained prosthodontist with expertise in full mouth rehabilitation and dental prosthetics. He has transformed the smiles of thousands of patients using modern zirconia and porcelain restorations.",
    certifications: ["GDC Registered", "CPSP Fellow", "IAAP Member"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#0ea5e9",
    gradient: "from-sky-500 to-cyan-400",
    lightBg: "from-sky-50 to-cyan-50",
    borderColor: "border-sky-200",
    accentText: "text-sky-600",
    badgeBg: "bg-sky-100",
    badgeText: "text-sky-700",
    IconComp: GiTooth,
  },

  // ── GYNECOLOGY (2 more) ────────────────────────────────────────────────────
  {
    id: 13,
    name: "Dr. Sana Javed",
    slug: "dr-sana-javed",
    title: "MBBS, FCPS (Obstetrics & Gynecology)",
    specialty: "Gynecology & Obstetrics",
    tag: "gynecology",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=400&q=80",
    experience: "11 Years",
    patients: "7,400+",
    rating: 4.8,
    reviews: 213,
    fee: "PKR 3,000",
    languages: ["Urdu", "English"],
    available: true,
    nextSlot: "Today, 5:00 PM",
    gender: "Female",
    branch: ["DHA"],
    availabilitySchedule: [
      { day: "Monday", time: "10:00 AM – 2:00 PM" },
      { day: "Thursday", time: "4:00 PM – 7:00 PM" },
      { day: "Saturday", time: "9:00 AM – 12:00 PM" },
    ],
    specializations: ["Normal Delivery", "PCOS", "Menstrual Disorders", "Infertility"],
    services: ["Antenatal Checkups", "Pap Smear", "Hormonal Evaluation", "Ovulation Induction", "IUD Insertion"],
    education: [
      { degree: "MBBS", institution: "Fatima Jinnah Medical University", year: "2011" },
      { degree: "FCPS (OB/GYN)", institution: "CPSP", year: "2017" },
    ],
    bio: "Dr. Sana Javed is a compassionate gynecologist dedicated to women's health at every life stage. From adolescent care to menopause management, she offers comprehensive services with a focus on patient education and minimal intervention.",
    certifications: ["CPSP Fellow", "SOGP Member", "FOGSI Member"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#a855f7",
    gradient: "from-violet-500 to-purple-400",
    lightBg: "from-violet-50 to-purple-50",
    borderColor: "border-violet-200",
    accentText: "text-violet-600",
    badgeBg: "bg-violet-100",
    badgeText: "text-violet-700",
    IconComp: GiBabyFace,
  },
  {
    id: 14,
    name: "Dr. Rabia Nawaz",
    slug: "dr-rabia-nawaz",
    title: "MBBS, MCPS (Gynecology)",
    specialty: "Gynecology & Obstetrics",
    tag: "gynecology",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=400&q=80",
    experience: "7 Years",
    patients: "4,100+",
    rating: 4.6,
    reviews: 142,
    fee: "PKR 2,500",
    languages: ["Urdu", "English", "Punjabi"],
    available: false,
    nextSlot: "Tomorrow, 9:00 AM",
    gender: "Female",
    branch: ["Gulberg"],
    availabilitySchedule: [
      { day: "Tuesday", time: "9:00 AM – 1:00 PM" },
      { day: "Friday", time: "3:00 PM – 6:00 PM" },
      { day: "Sunday", time: "10:00 AM – 1:00 PM" },
    ],
    specializations: ["Pregnancy Care", "Cervical Health", "Uterine Fibroids", "Menopause"],
    services: ["Ultrasound Obstetric", "Colposcopy", "LEEP Procedure", "Hormone Therapy", "Family Planning"],
    education: [
      { degree: "MBBS", institution: "Nishtar Medical University", year: "2015" },
      { degree: "MCPS (Gynecology)", institution: "CPSP", year: "2020" },
    ],
    bio: "Dr. Rabia Nawaz is an enthusiastic young gynecologist known for her patient-friendly approach and modern management of complex gynecological conditions. She is well-versed in minimally invasive procedures and women's preventive health.",
    certifications: ["MCPS Fellow", "SOGP Member", "APGO Associate"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#a855f7",
    gradient: "from-violet-500 to-purple-400",
    lightBg: "from-violet-50 to-purple-50",
    borderColor: "border-violet-200",
    accentText: "text-violet-600",
    badgeBg: "bg-violet-100",
    badgeText: "text-violet-700",
    IconComp: GiBabyFace,
  },

  // ── ORTHOPEDIC (2 more) ────────────────────────────────────────────────────
  {
    id: 15,
    name: "Dr. Imran Sheikh",
    slug: "dr-imran-sheikh",
    title: "MBBS, FCPS (Orthopedic Surgery)",
    specialty: "Orthopedic Surgery",
    tag: "orthopedic",
    image: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&w=400&q=80",
    experience: "15 Years",
    patients: "10,200+",
    rating: 4.8,
    reviews: 387,
    fee: "PKR 4,000",
    languages: ["Urdu", "English"],
    available: true,
    nextSlot: "Today, 4:30 PM",
    gender: "Male",
    branch: ["DHA"],
    availabilitySchedule: [
      { day: "Monday", time: "2:00 PM – 6:00 PM" },
      { day: "Wednesday", time: "9:00 AM – 1:00 PM" },
      { day: "Saturday", time: "10:00 AM – 2:00 PM" },
    ],
    specializations: ["Knee Arthroscopy", "Shoulder Surgery", "Pediatric Orthopedics", "Trauma Surgery"],
    services: ["Arthroscopic Surgery", "Fracture Fixation", "Clubfoot Correction", "ACL Reconstruction", "Cast Application"],
    education: [
      { degree: "MBBS", institution: "King Edward Medical University", year: "2007" },
      { degree: "FCPS (Orthopedics)", institution: "CPSP", year: "2013" },
    ],
    bio: "Dr. Imran Sheikh is a highly skilled orthopedic surgeon with a special interest in sports medicine and pediatric orthopedics. He has successfully performed over 2,000 arthroscopic procedures and is known for his meticulous surgical technique.",
    certifications: ["CPSP Fellow", "PPOS Member", "AOTrauma Certified"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#f59e0b",
    gradient: "from-amber-500 to-orange-400",
    lightBg: "from-amber-50 to-orange-50",
    borderColor: "border-amber-200",
    accentText: "text-amber-600",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-700",
    IconComp: TbBone,
  },
  {
    id: 16,
    name: "Dr. Amna Waseem",
    slug: "dr-amna-waseem",
    title: "MBBS, MCPS (Orthopedics)",
    specialty: "Orthopedic Surgery",
    tag: "orthopedic",
    image: "https://cdn.prod.website-files.com/6768674161a0e0eca2f41278/69833af4c81e1d905ed53e2d_68c3c5edf2ff8968eb707d5e_Dr%2520amna%2520ahmed%2520butt.jpeg",
    experience: "10 Years",
    patients: "6,500+",
    rating: 4.7,
    reviews: 229,
    fee: "PKR 3,000",
    languages: ["Urdu", "English"],
    available: false,
    nextSlot: "Tomorrow, 3:00 PM",
    gender: "Female",
    branch: ["Gulberg"],
    availabilitySchedule: [
      { day: "Tuesday", time: "10:00 AM – 2:00 PM" },
      { day: "Thursday", time: "4:00 PM – 8:00 PM" },
      { day: "Sunday", time: "11:00 AM – 2:00 PM" },
    ],
    specializations: ["Rheumatoid Arthritis", "Osteoporosis", "Back Pain", "Physiotherapy Referral"],
    services: ["Joint Aspiration", "Steroid Injections", "Bone Density Scan", "Tendon Repair", "Splinting"],
    education: [
      { degree: "MBBS", institution: "Allama Iqbal Medical College", year: "2012" },
      { degree: "MCPS (Orthopedics)", institution: "CPSP", year: "2018" },
    ],
    bio: "Dr. Amna Waseem is one of the few female orthopedic surgeons in Lahore, bringing a unique perspective to musculoskeletal care. She excels in managing arthritis, osteoporosis, and chronic back pain with conservative and surgical approaches.",
    certifications: ["CPSP Fellow", "PAR Member", "BOA Associate"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#f59e0b",
    gradient: "from-amber-500 to-orange-400",
    lightBg: "from-amber-50 to-orange-50",
    borderColor: "border-amber-200",
    accentText: "text-amber-600",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-700",
    IconComp: TbBone,
  },

  // ── ENT (2 more) ───────────────────────────────────────────────────────────
  {
    id: 17,
    name: "Dr. Faisal Mehmood",
    slug: "dr-faisal-mehmood",
    title: "MBBS, FCPS (ENT & Head-Neck Surgery)",
    specialty: "ENT Specialist",
    tag: "ent",
    image: "https://smh.org.pk/wp-content/uploads/2024/10/Dr.-Faisal-Rafiq.jpg",
    experience: "16 Years",
    patients: "11,000+",
    rating: 4.9,
    reviews: 362,
    fee: "PKR 3,500",
    languages: ["Urdu", "English"],
    available: true,
    nextSlot: "Today, 6:00 PM",
    gender: "Male",
    branch: ["Gulberg", "DHA"],
    availabilitySchedule: [
      { day: "Monday", time: "9:00 AM – 1:00 PM" },
      { day: "Wednesday", time: "4:00 PM – 8:00 PM" },
      { day: "Friday", time: "9:00 AM – 12:00 PM" },
      { day: "Sunday", time: "11:00 AM – 3:00 PM" },
    ],
    specializations: ["Endoscopic Sinus Surgery", "Cochlear Implant", "Thyroid Surgery", "Head & Neck Tumors"],
    services: ["Nasal Endoscopy", "Audiological Assessment", "FESS", "Thyroidectomy", "Voice Therapy"],
    education: [
      { degree: "MBBS", institution: "Dow Medical College", year: "2006" },
      { degree: "FCPS (ENT)", institution: "CPSP", year: "2012" },
      { degree: "Head-Neck Fellowship", institution: "Aga Khan University Hospital", year: "2014" },
    ],
    bio: "Dr. Faisal Mehmood is a senior ENT and head-neck surgeon with extensive experience in endoscopic sinus surgery and cochlear implants. He leads the ENT department at Premium Clinic and regularly participates in national ENT conferences as a faculty speaker.",
    certifications: ["CPSP Fellow", "PAES President", "IFOS Member"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#14b8a6",
    gradient: "from-teal-500 to-emerald-400",
    lightBg: "from-teal-50 to-emerald-50",
    borderColor: "border-teal-200",
    accentText: "text-teal-600",
    badgeBg: "bg-teal-100",
    badgeText: "text-teal-700",
    IconComp: TbEar,
  },
  {
    id: 18,
    name: "Dr. Maham Iqbal",
    slug: "dr-maham-iqbal",
    title: "MBBS, MCPS (ENT)",
    specialty: "ENT Specialist",
    tag: "ent",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQG5RHOUkmmoPg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1721228681896?e=2147483647&v=beta&t=f-jbsRJg3ZteTWcO0KTMkP7jEdbJ_28hMnCIogAkRY0",
    experience: "6 Years",
    patients: "3,900+",
    rating: 4.6,
    reviews: 128,
    fee: "PKR 2,200",
    languages: ["Urdu", "English", "Punjabi"],
    available: true,
    nextSlot: "Today, 2:30 PM",
    gender: "Female",
    branch: ["DHA"],
    availabilitySchedule: [
      { day: "Tuesday", time: "10:00 AM – 2:00 PM" },
      { day: "Thursday", time: "3:00 PM – 7:00 PM" },
      { day: "Saturday", time: "10:00 AM – 1:00 PM" },
    ],
    specializations: ["Pediatric ENT", "Allergic Rhinitis", "Snoring & Sleep Apnea", "Ear Infections"],
    services: ["Myringotomy", "Microsuction", "Nasal Cauterization", "Sleep Study Referral", "Allergy Skin Test"],
    education: [
      { degree: "MBBS", institution: "Nishtar Medical University", year: "2016" },
      { degree: "MCPS (ENT)", institution: "CPSP", year: "2021" },
    ],
    bio: "Dr. Maham Iqbal is a young and dedicated ENT specialist with growing expertise in pediatric ENT and sleep-related disorders. Her warm, patient approach and detailed examination technique have made her a preferred choice for families across DHA.",
    certifications: ["MCPS Fellow", "PAES Member", "SEAP Associate"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#14b8a6",
    gradient: "from-teal-500 to-emerald-400",
    lightBg: "from-teal-50 to-emerald-50",
    borderColor: "border-teal-200",
    accentText: "text-teal-600",
    badgeBg: "bg-teal-100",
    badgeText: "text-teal-700",
    IconComp: TbEar,
  },

  // ── NEUROLOGY (2 more) ─────────────────────────────────────────────────────
  {
    id: 19,
    name: "Dr. Tariq Mahmood",
    slug: "dr-tariq-mahmood",
    title: "MBBS, FCPS (Neurology)",
    specialty: "Neurology",
    tag: "neurology",
   image: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?fm=jpg&q=60&w=3000&auto=format&fit=crop",
    experience: "17 Years",
    patients: "9,600+",
    rating: 4.8,
    reviews: 334,
    fee: "PKR 4,500",
    languages: ["Urdu", "English"],
    available: true,
    nextSlot: "Today, 7:00 PM",
    gender: "Male",
    branch: ["Gulberg"],
    availabilitySchedule: [
      { day: "Monday", time: "3:00 PM – 7:00 PM" },
      { day: "Thursday", time: "3:00 PM – 7:00 PM" },
      { day: "Saturday", time: "10:00 AM – 2:00 PM" },
    ],
    specializations: ["Dementia", "Multiple Sclerosis", "Neuropathy", "TIA & Stroke"],
    services: ["MRI Brain Review", "Lumbar Puncture", "VEEG Monitoring", "Cognitive Testing", "Botox for Migraine"],
    education: [
      { degree: "MBBS", institution: "King Edward Medical University", year: "2005" },
      { degree: "FCPS (Neurology)", institution: "CPSP", year: "2012" },
      { degree: "Clinical Fellowship", institution: "University of Toronto, Canada", year: "2014" },
    ],
    bio: "Dr. Tariq Mahmood is a Toronto-trained neurologist with deep expertise in dementia, multiple sclerosis, and cerebrovascular disease. He brings a systematic, evidence-based approach to complex neurological cases and is a sought-after second opinion specialist in Lahore.",
    certifications: ["CPSP Fellow", "AAN Member", "MSA Pakistan Chapter Head"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#6366f1",
    gradient: "from-indigo-500 to-blue-400",
    lightBg: "from-indigo-50 to-blue-50",
    borderColor: "border-indigo-200",
    accentText: "text-indigo-600",
    badgeBg: "bg-indigo-100",
    badgeText: "text-indigo-700",
    IconComp: GiBrain,
  },
  {
    id: 20,
    name: "Dr. Noor Fatima",
    slug: "dr-noor-fatima",
    title: "MBBS, MCPS (Neurology)",
    specialty: "Neurology",
    tag: "neurology",
    image: "https://plus.unsplash.com/premium_photo-1682089144957-f48bbcf706b2?fm=jpg&q=60&w=3000&auto=format&fit=crop",
    experience: "8 Years",
    patients: "5,100+",
    rating: 4.7,
    reviews: 196,
    fee: "PKR 3,500",
    languages: ["Urdu", "English"],
    available: false,
    nextSlot: "Tomorrow, 11:00 AM",
    gender: "Female",
    branch: ["DHA"],
    availabilitySchedule: [
      { day: "Tuesday", time: "10:00 AM – 2:00 PM" },
      { day: "Friday", time: "4:00 PM – 7:00 PM" },
      { day: "Sunday", time: "10:00 AM – 1:00 PM" },
    ],
    specializations: ["Headache Clinic", "Vertigo", "Anxiety-Related Neurology", "Pediatric Neurology"],
    services: ["Neurology Consultation", "EEG", "Balance Testing", "Pediatric Brain Assessment", "ADHD Evaluation"],
    education: [
      { degree: "MBBS", institution: "Fatima Jinnah Medical University", year: "2014" },
      { degree: "MCPS (Neurology)", institution: "CPSP", year: "2020" },
    ],
    bio: "Dr. Noor Fatima is a compassionate neurologist focusing on headache disorders, vertigo, and pediatric neurology. She is particularly skilled at evaluating anxiety-related neurological symptoms and provides a calm, reassuring environment for her patients.",
    certifications: ["MCPS Fellow", "PNA Member", "ICHD Certified"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#6366f1",
    gradient: "from-indigo-500 to-blue-400",
    lightBg: "from-indigo-50 to-blue-50",
    borderColor: "border-indigo-200",
    accentText: "text-indigo-600",
    badgeBg: "bg-indigo-100",
    badgeText: "text-indigo-700",
    IconComp: GiBrain,
  },

  // ── HAIR (2 more) ──────────────────────────────────────────────────────────
  {
    id: 21,
    name: "Dr. Ahsan Baig",
    slug: "dr-ahsan-baig",
    title: "MBBS, Diploma Hair Restoration",
    specialty: "Hair Transplant",
    tag: "hair",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    experience: "8 Years",
    patients: "3,600+",
    rating: 4.8,
    reviews: 152,
    fee: "PKR 1,500",
    languages: ["Urdu", "English", "Punjabi"],
    available: true,
    nextSlot: "Today, 4:00 PM",
    gender: "Male",
    branch: ["Gulberg"],
    availabilitySchedule: [
      { day: "Tuesday", time: "11:00 AM – 3:00 PM" },
      { day: "Thursday", time: "4:00 PM – 8:00 PM" },
      { day: "Saturday", time: "11:00 AM – 3:00 PM" },
    ],
    specializations: ["FUE Hair Transplant", "Eyebrow Transplant", "Hairline Design", "Scalp PRP"],
    services: ["Hair Density Analysis", "FUE Procedure", "Eyebrow Restoration", "PRP Sessions", "Post-Op Care"],
    education: [
      { degree: "MBBS", institution: "Allama Iqbal Medical College", year: "2014" },
      { degree: "Diploma (Hair Restoration)", institution: "European Hair Research Society", year: "2018" },
    ],
    bio: "Dr. Ahsan Baig is a dedicated hair restoration specialist who has earned a strong reputation for natural-looking FUE results. His expertise in hairline design and eyebrow transplants attracts patients from across Pakistan.",
    certifications: ["EHRS Member", "ABHRS Candidate", "CPSP Member"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#8b5cf6",
    gradient: "from-violet-600 to-purple-500",
    lightBg: "from-violet-50 to-purple-50",
    borderColor: "border-violet-200",
    accentText: "text-violet-600",
    badgeBg: "bg-violet-100",
    badgeText: "text-violet-700",
    IconComp: MdOutlineContentCut,
  },
  {
    id: 22,
    name: "Dr. Zainab Mirza",
    slug: "dr-zainab-mirza",
    title: "MBBS, Fellowship Hair & Aesthetics",
    specialty: "Hair Transplant",
    tag: "hair",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    experience: "6 Years",
    patients: "2,800+",
    rating: 4.9,
    reviews: 117,
    fee: "Consultation Free",
    languages: ["Urdu", "English"],
    available: false,
    nextSlot: "Tomorrow, 12:00 PM",
    gender: "Female",
    branch: ["DHA"],
    availabilitySchedule: [
      { day: "Monday", time: "12:00 PM – 4:00 PM" },
      { day: "Wednesday", time: "4:00 PM – 8:00 PM" },
      { day: "Friday", time: "12:00 PM – 3:00 PM" },
    ],
    specializations: ["Female Hair Loss", "Alopecia", "DHI Technique", "Hairline Feminization"],
    services: ["Female Pattern Analysis", "DHI Implant", "Platelet-Rich Plasma", "Laser Hair Growth", "Micro-Needling"],
    education: [
      { degree: "MBBS", institution: "University of Health Sciences", year: "2016" },
      { degree: "Fellowship (Hair & Aesthetics)", institution: "ISHRS, USA", year: "2021" },
    ],
    bio: "Dr. Zainab Mirza is a rising star in female hair restoration, specializing in alopecia treatment and hairline feminization. Her in-depth consultations and tailored treatment plans have made her a top choice for women experiencing hair loss.",
    certifications: ["ISHRS Fellow", "PDA Member", "CPSP Member"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#8b5cf6",
    gradient: "from-violet-600 to-purple-500",
    lightBg: "from-violet-50 to-purple-50",
    borderColor: "border-violet-200",
    accentText: "text-violet-600",
    badgeBg: "bg-violet-100",
    badgeText: "text-violet-700",
    IconComp: MdOutlineContentCut,
  },

  // ── GENERAL MEDICINE (2 more) ──────────────────────────────────────────────
  {
    id: 23,
    name: "Dr. Lubna Khalid",
    slug: "dr-lubna-khalid",
    title: "MBBS, FCPS (Internal Medicine)",
    specialty: "General Medicine",
    tag: "general",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsFbGCZ8Yhsa99c9CHbTiKjmYFv5c1lyquNQ&s",
    experience: "14 Years",
    patients: "13,000+",
    rating: 4.9,
    reviews: 521,
    fee: "PKR 2,500",
    languages: ["Urdu", "English"],
    available: true,
    nextSlot: "Today, 3:00 PM",
    gender: "Female",
    branch: ["DHA"],
    availabilitySchedule: [
      { day: "Monday", time: "9:00 AM – 1:00 PM" },
      { day: "Wednesday", time: "3:00 PM – 7:00 PM" },
      { day: "Thursday", time: "9:00 AM – 1:00 PM" },
      { day: "Saturday", time: "10:00 AM – 2:00 PM" },
    ],
    specializations: ["Diabetes", "Thyroid Disorders", "Anemia", "Chronic Disease Management"],
    services: ["Routine Blood Work", "Thyroid Function Test", "Diabetic Foot Exam", "Nutritional Counseling", "Wellness Screening"],
    education: [
      { degree: "MBBS", institution: "Fatima Jinnah Medical University", year: "2008" },
      { degree: "FCPS (Internal Medicine)", institution: "CPSP", year: "2014" },
    ],
    bio: "Dr. Lubna Khalid is a highly experienced internal medicine specialist with a particular focus on diabetes and thyroid disorders. She is passionate about preventive care and patient education, believing that empowered patients lead healthier lives.",
    certifications: ["CPSP Fellow", "PAP Life Member", "IDF Member"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#10b981",
    gradient: "from-emerald-500 to-green-400",
    lightBg: "from-emerald-50 to-green-50",
    borderColor: "border-emerald-200",
    accentText: "text-emerald-600",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700",
    IconComp: TbStethoscope,
  },
  {
    id: 24,
    name: "Dr. Adeel Hanif",
    slug: "dr-adeel-hanif",
    title: "MBBS, MRCP (UK)",
    specialty: "General Medicine",
    tag: "general",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    experience: "19 Years",
    patients: "16,500+",
    rating: 4.9,
    reviews: 634,
    fee: "PKR 3,500",
    languages: ["Urdu", "English"],
    available: true,
    nextSlot: "Today, 5:00 PM",
    gender: "Male",
    branch: ["Gulberg", "DHA"],
    availabilitySchedule: [
      { day: "Tuesday", time: "9:00 AM – 1:00 PM" },
      { day: "Wednesday", time: "3:00 PM – 7:00 PM" },
      { day: "Friday", time: "9:00 AM – 12:00 PM" },
      { day: "Saturday", time: "4:00 PM – 8:00 PM" },
    ],
    specializations: ["Cardiology Interface", "Respiratory Medicine", "Geriatric Medicine", "Infectious Disease"],
    services: ["Echocardiogram Review", "Pulmonary Function Test", "Elderly Care", "Travel Medicine", "IV Drip Therapy"],
    education: [
      { degree: "MBBS", institution: "Dow University of Health Sciences", year: "2003" },
      { degree: "MRCP (UK)", institution: "Royal College of Physicians, London", year: "2009" },
    ],
    bio: "Dr. Adeel Hanif is an MRCP-certified physician from the Royal College of Physicians London, with 19 years of comprehensive internal medicine practice. He is an expert in complex multi-system disease management and geriatric care, bringing international clinical standards to every consultation.",
    certifications: ["MRCP (UK)", "CPSP Fellow", "BSG Member"],
    social: { linkedin: "#", facebook: "#", instagram: "#", twitter: "#" },
    solidColor: "#10b981",
    gradient: "from-emerald-500 to-green-400",
    lightBg: "from-emerald-50 to-green-50",
    borderColor: "border-emerald-200",
    accentText: "text-emerald-600",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700",
    IconComp: TbStethoscope,
  },
];

const TAGS = [
  { value: "all",         label: "All Doctors",     color: "#0ea5e9", icon: TbStethoscope },
  { value: "skin",        label: "Skin Care",        color: "#ec4899", icon: MdFace },
  { value: "dental",      label: "Dental",           color: "#0ea5e9", icon: GiTooth },
  { value: "gynecology",  label: "Gynecology",       color: "#a855f7", icon: GiBabyFace },
  { value: "orthopedic",  label: "Orthopedic",       color: "#f59e0b", icon: TbBone },
  { value: "ent",         label: "ENT",              color: "#14b8a6", icon: TbEar },
  { value: "neurology",   label: "Neurology",        color: "#6366f1", icon: GiBrain },
  { value: "hair",        label: "Hair Transplant",  color: "#8b5cf6", icon: MdOutlineContentCut },
  { value: "general",     label: "General",          color: "#10b981", icon: TbStethoscope },
];

const GENDERS  = ["all", "Male", "Female"];
const BRANCHES = ["all", "Gulberg", "DHA"];

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating, color = "#f59e0b" }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => {
        if (i <= Math.floor(rating)) return <FaStar key={i} style={{ color, fontSize: 11 }} />;
        if (i - 0.5 <= rating)      return <FaStarHalfAlt key={i} style={{ color, fontSize: 11 }} />;
        return <FaRegStar key={i} style={{ color, fontSize: 11 }} />;
      })}
    </span>
  );
}

// ─── Typewriter Hook ──────────────────────────────────────────────────────────
function useTypewriter(text, speed = 55, startDelay = 400) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);
  return { displayed, done };
}

// ─── Floating Icons ───────────────────────────────────────────────────────────
const floatIcons = [
  { Icon: TbStethoscope, style:{ top:"18%",   left:"4%" },     size:26, delay:0    },
  { Icon: GiHeartBeats,  style:{ top:"22%",   right:"7%" },    size:30, delay:0.5  },
  { Icon: GiBrain,       style:{ bottom:"22%",left:"7%" },     size:24, delay:0.9  },
  { Icon: TbBone,        style:{ bottom:"28%",right:"5%" },    size:22, delay:1.3  },
  { Icon: MdFace,        style:{ top:"58%",   left:"2.5%" },   size:20, delay:0.7  },
  { Icon: TbEar,         style:{ top:"12%",   right:"19%" },   size:19, delay:1.1  },
  { Icon: GiTooth,       style:{ bottom:"12%",right:"22%" },   size:18, delay:1.6  },
  { Icon: GiBabyFace,    style:{ top:"42%",   right:"3%" },    size:21, delay:0.3  },
];

// ─── BANNER ───────────────────────────────────────────────────────────────────
function Banner({ onNavigate }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const line1 = "World-Class Medical Experts";
  const line2 = "At Your Service";
  const { displayed: tw1, done: done1 } = useTypewriter(line1, 50, 600);
  const { displayed: tw2 } = useTypewriter(done1 ? line2 : "", 65, 200);

  return (
    <section ref={ref} className="relative overflow-hidden pt-14 pb-16"
      style={{ background:"linear-gradient(135deg,#f0f9ff 0%,#ffffff 45%,#fdf2f8 100%)" }}>

      {/* Back to Home — absolute top-left corner */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onNavigate("home")}
        className="absolute top-5 left-5 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 border border-slate-200 text-slate-600 text-sm font-bold hover:border-sky-300 hover:text-sky-600 transition-all shadow-sm backdrop-blur-sm"
      >
        <FiArrowLeft size={15} />
        Back to Home
      </motion.button>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-sky-200/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration:"9s" }} />
        <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-pink-200/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration:"13s" }} />
        <div className="absolute inset-0 opacity-[0.18]"
          style={{ backgroundImage:`linear-gradient(rgba(14,165,233,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(219,39,119,.05) 1px,transparent 1px)`, backgroundSize:"48px 48px" }} />
      </div>

      {floatIcons.map(({ Icon, style, size, delay }, i) => (
        <motion.div key={i}
          className="absolute hidden lg:flex items-center justify-center w-14 h-14 rounded-2xl bg-white/70 border border-slate-100 shadow-md"
          style={style}
          initial={{ opacity:0, y:20 }}
          animate={inView ? { opacity:[0,0.65,0.65], y:[20,0,-6,0] } : {}}
          transition={{ delay, duration:3.5, repeat:Infinity, repeatType:"reverse", ease:"easeInOut" }}>
          <Icon size={size} style={{ color:"#0ea5e9", opacity:0.7 }} />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <motion.div initial={{ opacity:0, scale:0.85 }} animate={inView ? { opacity:1, scale:1 } : {}}
          transition={{ duration:0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-sky-200/70 text-sky-600 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm backdrop-blur-sm">
          <FaHeartbeat className="animate-pulse text-pink-500" />
          Meet Our Specialists
        </motion.div>

        {/* Typewriter Heading */}
        <div className="text-4xl sm:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight font-serif mb-5 min-h-[5rem] sm:min-h-[7.5rem]">
          <span>{tw1.split(" ").map((word, wi) => {
            const gradientWords = ["Medical", "Experts"];
            const isGrad = gradientWords.includes(word);
            return (
              <span key={wi}>
                {isGrad
                  ? <span style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{word}</span>
                  : word}
                {" "}
              </span>
            );
          })}</span>
          {done1 && (
            <><br /><span>{tw2}</span></>
          )}
          <span className="inline-block w-0.5 h-8 sm:h-12 bg-sky-500 align-middle ml-1 animate-pulse" style={{ opacity: tw2.length >= line2.length ? 0 : 1 }} />
        </div>

        <motion.p initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.9, delay:0.25 }}
          className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
          Board-certified specialists with international training — delivering compassionate, cutting-edge care across 8 medical disciplines.
        </motion.p>

        <motion.div initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.8, delay:0.4 }}
          className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10">
          {[
            {num:"30+", label:"Specialists"},
            {num:"8",   label:"Disciplines"},
            {num:"50K+",label:"Patients Served"},
            {num:"15+", label:"Years Avg. Exp."},
          ].map((s,i) => (
            <motion.div key={s.label} initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ delay:0.4+i*0.08 }} className="text-center">
              <p className="text-3xl font-extrabold"
                style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                {s.num}
              </p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.8, delay:0.55 }}
          className="flex flex-wrap justify-center gap-4">
          <a href="#booking"
            className="px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-xl hover:opacity-90 transition-opacity flex items-center gap-2"
            style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)" }}>
            <FiCalendar size={15} /> Book Appointment
          </a>
          <a href="tel:+923001234567"
            className="px-8 py-3.5 rounded-xl font-bold text-sm text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex items-center gap-2">
            <FiPhone size={15} /> Call Us Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── AUTO-SCROLL CATEGORY SLIDER ─────────────────────────────────────────────
function CategorySlider({ activeTag, setActiveTag }) {
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const posRef = useRef(0);
  const rafRef = useRef(null);
  const SPEED = 0.6;

  // Duplicate tags for seamless loop
  const doubled = [...TAGS, ...TAGS];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const halfW = track.scrollWidth / 2;

    const step = () => {
      if (!isPaused) {
        posRef.current += SPEED;
        if (posRef.current >= halfW) posRef.current = 0;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused]);

  return (
    <div className="w-full overflow-hidden py-3 bg-white/60 backdrop-blur-sm border-b border-slate-100">
      <div className="relative flex"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}>
        <div ref={trackRef} className="flex gap-3 will-change-transform" style={{ whiteSpace:"nowrap" }}>
          {doubled.map(({ value, label, color, icon: TagIcon }, idx) => {
            const active = activeTag === value;
            return (
              <motion.button
                key={idx}
                onClick={() => setActiveTag(value)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold flex-shrink-0 transition-all duration-200 border ${
                  active
                    ? "text-white border-transparent shadow-lg"
                    : "text-slate-600 bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
                style={active ? {
                  background: value === "all"
                    ? "linear-gradient(135deg,#0ea5e9,#db2777)"
                    : `linear-gradient(135deg,${color}ee,${color}99)`,
                  boxShadow: `0 4px 14px -2px ${color ?? "#0ea5e9"}55`
                } : {}}>
                <TagIcon size={12} style={{ color: active ? "white" : color }} />
                {label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── FILTER BAR ───────────────────────────────────────────────────────────────
function FilterBar({ activeTag, setActiveTag, gender, setGender, branch, setBranch, avail, setAvail, search, setSearch, count }) {
  return (
    <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      {/* Auto-scroll category slider */}
      <CategorySlider activeTag={activeTag} setActiveTag={setActiveTag} />

      <div className="px-4 py-4">
        <div className="max-w-7xl mx-auto space-y-3">
          {/* Row: search + dropdowns */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <FiSearch size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search doctors, specialties..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-slate-700 bg-slate-50 border border-slate-200 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all" />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <FiX size={13} />
                </button>
              )}
            </div>

            <select value={gender} onChange={e => setGender(e.target.value)}
              className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200 focus:outline-none focus:border-sky-400 transition-all appearance-none pr-7">
              {GENDERS.map(g => <option key={g} value={g}>{g === "all" ? "All Genders" : g}</option>)}
            </select>

            <select value={branch} onChange={e => setBranch(e.target.value)}
              className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200 focus:outline-none focus:border-sky-400 transition-all appearance-none pr-7">
              {BRANCHES.map(b => <option key={b} value={b}>{b === "all" ? "All Branches" : b}</option>)}
            </select>

            <select value={avail} onChange={e => setAvail(e.target.value)}
              className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200 focus:outline-none focus:border-sky-400 transition-all appearance-none pr-7">
              <option value="all">All Availability</option>
              <option value="available">Available Now</option>
            </select>

            <motion.span key={count} initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
              className="text-sm font-bold ml-auto hidden sm:block"
              style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              {count} doctor{count !== 1 ? "s" : ""}
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DOCTOR MODAL ─────────────────────────────────────────────────────────────
function DoctorModal({ doctor: d, onClose }) {
  const whatsappMsg = encodeURIComponent(`Hello, I'd like to book an appointment with ${d.name}.`);
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>

        <motion.div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={onClose} initial={{ opacity:0 }} animate={{ opacity:1 }} />

        <motion.div
          initial={{ opacity:0, scale:0.93, y:30 }}
          animate={{ opacity:1, scale:1, y:0 }}
          exit={{ opacity:0, scale:0.95, y:20 }}
          transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          style={{ scrollbarWidth:"none" }}>

          <div className="h-1.5 rounded-t-3xl w-full"
            style={{ background:`linear-gradient(90deg,${d.solidColor},#db2777)` }} />

          {/* Header */}
          <div className={`relative p-6 sm:p-8 bg-gradient-to-br ${d.lightBg}`}>
            <button onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 hover:border-slate-300 transition-all shadow-sm">
              <FiX size={16} />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative flex-shrink-0">
                <img src={d.image} alt={d.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-xl"
                  style={{ border:`3px solid ${d.solidColor}40` }} />
                {d.available && (
                  <span className="absolute -bottom-1.5 -right-1.5 flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    Available
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${d.badgeBg} ${d.badgeText}`}>
                    {d.specialty}
                  </span>
                  {d.certifications.slice(0,1).map(c => (
                    <span key={c} className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">{c}</span>
                  ))}
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 font-serif mb-0.5">{d.name}</h2>
                <p className={`text-sm font-semibold ${d.accentText} mb-3`}>{d.title}</p>

                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1.5"><FiAward size={13} style={{color:d.solidColor}} /> {d.experience} Experience</span>
                  <span className="flex items-center gap-1.5"><FiHeart size={13} style={{color:d.solidColor}} /> {d.patients} Patients</span>
                  <span className="flex items-center gap-1.5"><FiMapPin size={13} style={{color:d.solidColor}} /> {d.branch.join(", ")}</span>
                  <span className="flex items-center gap-1.5"><FiGlobe size={13} style={{color:d.solidColor}} /> {d.languages.join(", ")}</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <StarRating rating={d.rating} color={d.solidColor} />
                  <span className="font-bold text-slate-800 text-sm">{d.rating}</span>
                  <span className="text-slate-400 text-xs">({d.reviews} reviews)</span>
                </div>

                {/* Social Links */}
                {d.social && (
                  <div className="flex items-center gap-2">
                    {d.social.linkedin && (
                      <a href={d.social.linkedin} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#0077b5]/10 hover:bg-[#0077b5]/20 transition-colors">
                        <FaLinkedinIn size={13} style={{color:"#0077b5"}} />
                      </a>
                    )}
                    {d.social.facebook && (
                      <a href={d.social.facebook} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#1877f2]/10 hover:bg-[#1877f2]/20 transition-colors">
                        <FaFacebook size={13} style={{color:"#1877f2"}} />
                      </a>
                    )}
                    {d.social.instagram && (
                      <a href={d.social.instagram} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#e1306c]/10 hover:bg-[#e1306c]/20 transition-colors">
                        <FaInstagram size={13} style={{color:"#e1306c"}} />
                      </a>
                    )}
                    {d.social.twitter && (
                      <a href={d.social.twitter} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors">
                        <FaTwitter size={13} className="text-slate-600" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* CTA Row */}
            <div className="flex flex-wrap gap-3 mt-6">
              <motion.a whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                href="#booking"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-sm shadow-lg"
                style={{ background:`linear-gradient(135deg,${d.solidColor},#db2777)` }}>
                <FiCalendar size={14} /> Book Appointment
              </motion.a>
              <motion.a whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                href={`https://wa.me/923001234567?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-sm bg-[#25D366] shadow-lg">
                <FaWhatsapp size={14} /> WhatsApp
              </motion.a>
              <motion.a whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                href="#consultation"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border-2 text-slate-700 bg-white hover:bg-slate-50 transition-all"
                style={{ borderColor:`${d.solidColor}40` }}>
                <FiVideo size={14} style={{ color:d.solidColor }} /> Video Consult
              </motion.a>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-7">

            {/* Next Slot + Fee + Languages */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon:<FiClock size={15}/>, label:"Next Available", val:d.nextSlot, color:d.solidColor },
                { icon:<span className="text-sm font-bold" style={{color:d.solidColor}}>₨</span>, label:"Consultation Fee", val:d.fee, color:d.solidColor },
                { icon:<FiGlobe size={15}/>, label:"Languages", val:d.languages.join(", "), color:d.solidColor },
              ].map(item => (
                <div key={item.label} className="rounded-2xl p-4 text-center" style={{ background:`${d.solidColor}08`, border:`1px solid ${d.solidColor}20` }}>
                  <div className="flex justify-center mb-1" style={{color:d.solidColor}}>{item.icon}</div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">{item.label}</p>
                  <p className="text-slate-800 font-bold text-xs">{item.val}</p>
                </div>
              ))}
            </div>

            {/* Availability Schedule */}
            {d.availabilitySchedule && (
              <div>
                <h4 className="text-slate-900 font-extrabold text-base mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full inline-block" style={{ background:d.solidColor }} />
                  Availability Schedule
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {d.availabilitySchedule.map((slot, i) => (
                    <div key={i} className="rounded-xl p-3" style={{ background:`${d.solidColor}08`, border:`1px solid ${d.solidColor}18` }}>
                      <p className="text-xs font-extrabold" style={{color:d.solidColor}}>{slot.day}</p>
                      <p className="text-slate-600 text-[11px] font-medium mt-0.5">{slot.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bio */}
            <div>
              <h4 className="text-slate-900 font-extrabold text-base mb-3 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full inline-block" style={{ background:d.solidColor }} />
                About Dr. {d.name.split(" ").slice(-1)[0]}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">{d.bio}</p>
            </div>

            {/* Specializations */}
            <div>
              <h4 className="text-slate-900 font-extrabold text-base mb-3 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full inline-block" style={{ background:d.solidColor }} />
                Specializations
              </h4>
              <div className="flex flex-wrap gap-2">
                {d.specializations.map(s => (
                  <span key={s} className={`px-3 py-1 rounded-full text-xs font-bold ${d.badgeBg} ${d.badgeText}`}>{s}</span>
                ))}
              </div>
            </div>

            {/* Doctor-Specific Services */}
            {d.services && (
              <div>
                <h4 className="text-slate-900 font-extrabold text-base mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full inline-block" style={{ background:d.solidColor }} />
                  Services Offered
                </h4>
                <div className="flex flex-wrap gap-2">
                  {d.services.map(s => (
                    <span key={s} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700">
                      <FiCheckCircle size={11} style={{color:d.solidColor}} /> {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            <div>
              <h4 className="text-slate-900 font-extrabold text-base mb-3 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full inline-block" style={{ background:d.solidColor }} />
                Education & Training
              </h4>
              <div className="space-y-3">
                {d.education.map((e, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background:`${d.solidColor}06`, border:`1px solid ${d.solidColor}15` }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-black" style={{ background:`${d.solidColor}15`, color:d.solidColor }}>
                      {e.year.slice(-2)}
                    </div>
                    <div>
                      <p className="text-slate-800 font-bold text-sm">{e.degree}</p>
                      <p className="text-slate-400 text-xs">{e.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h4 className="text-slate-900 font-extrabold text-base mb-3 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full inline-block" style={{ background:d.solidColor }} />
                Certifications & Memberships
              </h4>
              <div className="flex flex-wrap gap-2">
                {d.certifications.map(c => (
                  <span key={c} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700">
                    <HiOutlineBadgeCheck size={13} style={{color:d.solidColor}} /> {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Ratings & Reviews summary */}
            <div className="rounded-2xl p-5" style={{ background:`${d.solidColor}06`, border:`1px solid ${d.solidColor}20` }}>
              <h4 className="text-slate-900 font-extrabold text-base mb-3 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full inline-block" style={{ background:d.solidColor }} />
                Ratings & Reviews
              </h4>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-4xl font-extrabold" style={{color:d.solidColor}}>{d.rating}</p>
                  <StarRating rating={d.rating} color={d.solidColor} />
                  <p className="text-slate-400 text-xs mt-1">{d.reviews} reviews</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5,4,3,2,1].map(star => {
                    const pct = star === 5 ? 72 : star === 4 ? 18 : star === 3 ? 6 : star === 2 ? 2 : 2;
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 w-3">{star}</span>
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div className="h-full rounded-full" style={{ background:d.solidColor, width:`${pct}%` }}
                            initial={{ width:0 }} animate={{ width:`${pct}%` }} transition={{ delay:0.3, duration:0.8 }} />
                        </div>
                        <span className="text-[10px] text-slate-400 w-6">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── DOCTOR CARD ──────────────────────────────────────────────────────────────
function DoctorCard({ doctor: d, onOpen, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin:"-40px" });
  const whatsappMsg = encodeURIComponent(`Hello, I'd like to book an appointment with ${d.name}.`);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:60, scale:0.95 }}
      animate={inView ? { opacity:1, y:0, scale:1 } : {}}
      transition={{ duration:0.55, delay:index * 0.09, ease:[0.25,1,0.5,1] }}
      whileHover={{ y:-8, transition:{ duration:0.25 } }}
      className="group relative bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-400 overflow-hidden cursor-pointer flex flex-col"
      onClick={() => onOpen(d)}>

      <div className="h-1 w-full rounded-t-3xl"
        style={{ background:`linear-gradient(90deg,${d.solidColor},#db2777)` }} />

      {/* Availability badge */}
      <div className="absolute top-4 right-4 z-10">
        {d.available ? (
          <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Available
          </span>
        ) : (
          <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-bold px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
            Booked
          </span>
        )}
      </div>

      {/* Image section */}
      <div className={`relative p-5 pb-0 bg-gradient-to-br ${d.lightBg}`}>
        <div className="relative w-full h-[320px] overflow-hidden rounded-2xl flex items-start justify-center">
          <img src={d.image} alt={d.name}
          // className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"/>
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
          <div className="absolute bottom-3 left-3">
            <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-md ${d.accentText}`}>
              <d.IconComp size={12} /> {d.specialty}
            </span>
          </div>
          {/* Social media mini-icons on hover */}
          <motion.div
            initial={{ opacity:0 }}
            whileHover={{ opacity:1 }}
            className="absolute top-3 left-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {d.social?.linkedin && (
              <a href={d.social.linkedin} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
                className="w-7 h-7 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center shadow">
                <FaLinkedinIn size={10} style={{color:"#0077b5"}} />
              </a>
            )}
            {d.social?.instagram && (
              <a href={d.social.instagram} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
                className="w-7 h-7 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center shadow">
                <FaInstagram size={10} style={{color:"#e1306c"}} />
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="text-slate-900 font-extrabold text-lg font-serif leading-tight">{d.name}</h3>
          <p className={`text-xs font-semibold ${d.accentText} mt-0.5`}>{d.title}</p>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={d.rating} color={d.solidColor} />
          <span className="font-bold text-slate-800 text-sm">{d.rating}</span>
          <span className="text-slate-400 text-xs">({d.reviews})</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { icon:<FiAward size={12}/>, val:d.experience, label:"Exp." },
            { icon:<FiHeart size={12}/>, val:d.patients,   label:"Patients" },
            { icon:<span className="text-xs font-bold">₨</span>, val:d.fee.replace("PKR ",""), label:"Fee" },
          ].map(s => (
            <div key={s.label} className="text-center rounded-xl py-2"
              style={{ background:`${d.solidColor}08`, border:`1px solid ${d.solidColor}15` }}>
              <div className="flex justify-center mb-0.5" style={{color:d.solidColor}}>{s.icon}</div>
              <p className="text-slate-800 font-bold text-xs leading-tight">{s.val}</p>
              <p className="text-slate-400 text-[9px] uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4 p-2.5 rounded-xl"
          style={{ background:`${d.solidColor}08`, border:`1px solid ${d.solidColor}15` }}>
          <FiClock size={12} style={{color:d.solidColor, flexShrink:0}} />
          <span className="text-xs text-slate-600 font-medium">{d.nextSlot}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {d.languages.map(l => (
            <span key={l} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">{l}</span>
          ))}
          {d.branch.map(b => (
            <span key={b} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${d.badgeBg} ${d.badgeText}`}>{b}</span>
          ))}
        </div>

        <div className="mt-auto flex gap-2">
          <motion.button
            whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
            onClick={e => { e.stopPropagation(); }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-white text-xs shadow-md"
            style={{ background:`linear-gradient(135deg,${d.solidColor},#db2777)` }}>
            <FiCalendar size={12} /> Book Now
          </motion.button>
          <motion.a
            whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }}
            href={`https://wa.me/923001234567?text=${whatsappMsg}`}
            target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center shadow-md flex-shrink-0">
            <FaWhatsapp size={16} className="text-white" />
          </motion.a>
          <motion.button
            whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }}
            onClick={e => { e.stopPropagation(); onOpen(d); }}
            className="w-10 h-10 rounded-xl flex items-center justify-center border-2 flex-shrink-0 bg-white hover:bg-slate-50 transition-colors"
            style={{ borderColor:`${d.solidColor}40` }}>
            <HiOutlineArrowRight size={15} style={{color:d.solidColor}} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function DoctorsPage({ onNavigate }) {
  const [activeTag,  setActiveTag]  = useState("all");
  const [gender,     setGender]     = useState("all");
  const [branch,     setBranch]     = useState("all");
  const [avail,      setAvail]      = useState("all");
  const [search,     setSearch]     = useState("");
  const [selected,   setSelected]   = useState(null);

  const filtered = doctors.filter(d => {
    const matchTag    = activeTag === "all" || d.tag === activeTag;
    const matchGender = gender === "all"    || d.gender === gender;
    const matchBranch = branch === "all"    || d.branch.includes(branch);
    const matchAvail  = avail === "all"     || d.available;
    const q = search.toLowerCase();
    const matchSearch = !q
      || d.name.toLowerCase().includes(q)
      || d.specialty.toLowerCase().includes(q)
      || d.specializations.some(s => s.toLowerCase().includes(q))
      || d.title.toLowerCase().includes(q);
    return matchTag && matchGender && matchBranch && matchAvail && matchSearch;
  });

  const whatsappNumber = "+923001234567";
  const welcomeMessage = encodeURIComponent("Hello Premium Clinic, I want to inquire about your healthcare services.");

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      {selected && <DoctorModal doctor={selected} onClose={() => setSelected(null)} />}

      <Banner onNavigate={onNavigate} />

      <FilterBar
        activeTag={activeTag}   setActiveTag={setActiveTag}
        gender={gender}         setGender={setGender}
        branch={branch}         setBranch={setBranch}
        avail={avail}           setAvail={setAvail}
        search={search}         setSearch={setSearch}
        count={filtered.length}
      />

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              {activeTag === "all" ? "All Specialists" : TAGS.find(t => t.value === activeTag)?.label}
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} · click any card for full profile
            </p>
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((doc, i) => (
                <DoctorCard key={doc.id} doctor={doc} onOpen={setSelected} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <FiSearch size={26} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-600 mb-2">No doctors found</h3>
              <p className="text-slate-400 text-sm mb-5">Try adjusting your search or filters.</p>
              <button onClick={() => { setActiveTag("all"); setGender("all"); setBranch("all"); setAvail("all"); setSearch(""); }}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow"
                style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)" }}>
                Reset All Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden py-20 mt-4"
        style={{ background:"linear-gradient(135deg,#0ea5e9 0%,#7c3aed 50%,#db2777 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 font-serif">
            Not Sure Which Specialist You Need?
          </h2>
          <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto">
            Our team will guide you to the right doctor. Book a free consultation or chat on WhatsApp.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#booking"
              className="px-8 py-3.5 rounded-xl font-bold text-sky-600 bg-white shadow-xl hover:bg-white/90 transition-all flex items-center gap-2 text-sm">
              <FiCalendar size={14} /> Book Free Consultation
            </a>
            <a href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`}
              target="_blank" rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl font-bold text-white border-2 border-white/40 hover:bg-white/10 transition-all flex items-center gap-2 text-sm">
              <FiMessageCircle size={14} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        <div className="absolute w-16 h-16 bg-green-500 rounded-full animate-ping opacity-40 pointer-events-none" />
        <motion.a
          href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`}
          target="_blank" rel="noopener noreferrer"
          whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }}
          initial={{ opacity:0, scale:0.6 }} animate={{ opacity:1, scale:1 }}
          transition={{ type:"spring", stiffness:260, damping:20 }}
          className="relative w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#20ba5a] transition-colors duration-200 cursor-pointer group">
          <FaWhatsapp size={36} />
          <span className="absolute right-20 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 pointer-events-none transition-all duration-200">
            Chat With Us
          </span>
        </motion.a>
      </div>
    </div>
  );
}