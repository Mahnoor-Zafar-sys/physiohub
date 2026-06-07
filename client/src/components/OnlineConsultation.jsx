
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiVideo, FiPhone, FiMessageCircle, FiSearch, FiX,
  FiCalendar, FiCheck, FiUpload, FiSend,
  FiPaperclip, FiDownload, FiShield,
  FiGlobe, FiUser, FiFileText, FiActivity, FiArrowLeft,
} from "react-icons/fi";
import { FaWhatsapp, FaStar } from "react-icons/fa";
import { GiTooth, GiBrain, GiBabyFace } from "react-icons/gi";
import { TbStethoscope, TbBone, TbEar } from "react-icons/tb";
import { MdFace, MdOutlineContentCut } from "react-icons/md";

// ─── ALL 24 DOCTORS ───────────────────────────────────────────────────────────
const doctors = [
  { id: 1, name: "Dr. Sarah Ahmed", title: "MBBS, FCPS (Dermatology)", specialty: "Skin & Dermatology", tag: "skin", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80", experience: "14 Years", rating: 4.9, reviews: 312, fee: "PKR 3,000", languages: ["Urdu", "English"], available: true, nextSlot: "Today, 4:00 PM", IconComp: MdFace, solidColor: "#ec4899", availabilitySchedule: [{ day: "Monday", time: "10:00 AM – 2:00 PM" }, { day: "Wednesday", time: "3:00 PM – 7:00 PM" }, { day: "Friday", time: "10:00 AM – 1:00 PM" }], bio: "Dr. Sarah Ahmed is one of Pakistan's leading dermatologists with over 14 years of clinical experience. Trained at KEMU and fellowship-certified, she specializes in advanced laser therapies and cosmetic procedures." },
  { id: 2, name: "Dr. Omar Farooq", title: "BDS, FCPS (Oral Surgery)", specialty: "Dental Care", tag: "dental", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80", experience: "11 Years", rating: 4.8, reviews: 489, fee: "PKR 2,500", languages: ["Urdu", "English", "Punjabi"], available: true, nextSlot: "Today, 5:30 PM", IconComp: GiTooth, solidColor: "#0ea5e9", availabilitySchedule: [{ day: "Monday", time: "9:00 AM – 1:00 PM" }, { day: "Tuesday", time: "2:00 PM – 6:00 PM" }, { day: "Thursday", time: "9:00 AM – 1:00 PM" }], bio: "Dr. Omar Farooq is a board-certified oral surgeon and cosmetic dentist with 11 years of expertise in painless root canals and dental implants." },
  { id: 3, name: "Dr. Fatima Malik", title: "MBBS, MRCOG (Gynecology)", specialty: "Gynecology & Obstetrics", tag: "gynecology", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80", experience: "16 Years", rating: 5.0, reviews: 267, fee: "PKR 4,000", languages: ["Urdu", "English"], available: false, nextSlot: "Tomorrow, 10:00 AM", IconComp: GiBabyFace, solidColor: "#a855f7", availabilitySchedule: [{ day: "Tuesday", time: "10:00 AM – 2:00 PM" }, { day: "Thursday", time: "3:00 PM – 7:00 PM" }, { day: "Saturday", time: "9:00 AM – 1:00 PM" }], bio: "Dr. Fatima Malik is an internationally trained gynecologist with London MRCOG credentials, specializing in high-risk pregnancies and minimally invasive gynecological surgeries." },
  { id: 4, name: "Dr. Hassan Raza", title: "MBBS, FCPS (Orthopedics)", specialty: "Orthopedic Surgery", tag: "orthopedic", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80", experience: "18 Years", rating: 4.9, reviews: 543, fee: "PKR 3,500", languages: ["Urdu", "English"], available: true, nextSlot: "Today, 7:00 PM", IconComp: TbBone, solidColor: "#f59e0b", availabilitySchedule: [{ day: "Monday", time: "9:00 AM – 12:00 PM" }, { day: "Wednesday", time: "4:00 PM – 8:00 PM" }, { day: "Friday", time: "9:00 AM – 12:00 PM" }], bio: "Dr. Hassan Raza is a senior orthopedic surgeon with 18 years of experience. He uses robotic-assisted surgery systems and has performed over 3,000 successful joint replacement surgeries." },
  { id: 5, name: "Dr. Zara Khan", title: "MBBS, FCPS (ENT)", specialty: "ENT Specialist", tag: "ent", image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=400&q=80", experience: "9 Years", rating: 4.7, reviews: 198, fee: "PKR 2,800", languages: ["Urdu", "English"], available: true, nextSlot: "Today, 3:30 PM", IconComp: TbEar, solidColor: "#14b8a6", availabilitySchedule: [{ day: "Tuesday", time: "10:00 AM – 2:00 PM" }, { day: "Thursday", time: "3:30 PM – 7:00 PM" }, { day: "Saturday", time: "10:00 AM – 2:00 PM" }], bio: "Dr. Zara Khan is a skilled ENT specialist known for compassionate care and surgical precision, with special expertise in pediatric ENT cases." },
  { id: 6, name: "Dr. Bilal Siddiqui", title: "MBBS, FCPS (Neurology)", specialty: "Neurology", tag: "neurology", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80", experience: "20 Years", rating: 4.9, reviews: 421, fee: "PKR 5,000", languages: ["Urdu", "English"], available: false, nextSlot: "Tomorrow, 2:00 PM", IconComp: GiBrain, solidColor: "#6366f1", availabilitySchedule: [{ day: "Monday", time: "2:00 PM – 6:00 PM" }, { day: "Wednesday", time: "2:00 PM – 6:00 PM" }, { day: "Friday", time: "2:00 PM – 5:00 PM" }], bio: "Dr. Bilal Siddiqui is one of Pakistan's most respected neurologists with a Johns Hopkins fellowship. Expert in stroke prevention, epilepsy, and movement disorders." },
  { id: 7, name: "Dr. Nadia Hussain", title: "MBBS, Fellowship Hair Restoration", specialty: "Hair Transplant", tag: "hair", image: "https://images.unsplash.com/photo-1643297654416-05795d62e39c?auto=format&fit=crop&w=400&q=80", experience: "10 Years", rating: 4.8, reviews: 175, fee: "Free Consultation", languages: ["Urdu", "English"], available: true, nextSlot: "Today, 6:00 PM", IconComp: MdOutlineContentCut, solidColor: "#8b5cf6", availabilitySchedule: [{ day: "Monday", time: "11:00 AM – 3:00 PM" }, { day: "Thursday", time: "4:00 PM – 8:00 PM" }, { day: "Saturday", time: "10:00 AM – 2:00 PM" }], bio: "Dr. Nadia Hussain is a certified hair restoration specialist with an ISHRS fellowship, pioneer of the DHI hair implant technique in Lahore." },
  { id: 8, name: "Dr. Kamran Ali", title: "MBBS, FCPS (General Medicine)", specialty: "General Medicine", tag: "general", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80", experience: "22 Years", rating: 4.9, reviews: 712, fee: "PKR 2,000", languages: ["Urdu", "English", "Punjabi"], available: true, nextSlot: "Today, 2:00 PM", IconComp: TbStethoscope, solidColor: "#10b981", availabilitySchedule: [{ day: "Monday", time: "9:00 AM – 1:00 PM" }, { day: "Tuesday", time: "2:00 PM – 6:00 PM" }, { day: "Thursday", time: "9:00 AM – 1:00 PM" }], bio: "Dr. Kamran Ali is Premium Clinic's most senior physician with 22 years of comprehensive clinical practice, managing complex multi-system conditions." },
  { id: 9, name: "Dr. Ayesha Tariq", title: "MBBS, MCPS (Dermatology)", specialty: "Skin & Dermatology", tag: "skin", image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&w=400&q=80", experience: "8 Years", rating: 4.7, reviews: 184, fee: "PKR 2,500", languages: ["Urdu", "English"], available: true, nextSlot: "Today, 5:00 PM", IconComp: MdFace, solidColor: "#ec4899", availabilitySchedule: [{ day: "Tuesday", time: "11:00 AM – 3:00 PM" }, { day: "Thursday", time: "4:00 PM – 8:00 PM" }, { day: "Sunday", time: "10:00 AM – 1:00 PM" }], bio: "Dr. Ayesha Tariq specializes in medical and cosmetic dermatology with a focus on vitiligo, eczema, and skin allergies." },
  { id: 10, name: "Dr. Usman Ghani", title: "MBBS, FCPS (Dermatology)", specialty: "Skin & Dermatology", tag: "skin", image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=400&q=80", experience: "12 Years", rating: 4.8, reviews: 256, fee: "PKR 3,500", languages: ["Urdu", "English", "Punjabi"], available: false, nextSlot: "Tomorrow, 11:00 AM", IconComp: MdFace, solidColor: "#ec4899", availabilitySchedule: [{ day: "Monday", time: "9:00 AM – 1:00 PM" }, { day: "Wednesday", time: "5:00 PM – 9:00 PM" }, { day: "Friday", time: "9:00 AM – 12:00 PM" }], bio: "Dr. Usman Ghani is a seasoned dermatologist skilled in dermoscopy and skin cancer screening, with 12 years of clinical experience." },
  { id: 11, name: "Dr. Hina Riaz", title: "BDS, FCPS (Orthodontics)", specialty: "Dental Care", tag: "dental", image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=400&q=80", experience: "9 Years", rating: 4.9, reviews: 310, fee: "PKR 2,000", languages: ["Urdu", "English"], available: true, nextSlot: "Today, 3:00 PM", IconComp: GiTooth, solidColor: "#0ea5e9", availabilitySchedule: [{ day: "Monday", time: "10:00 AM – 2:00 PM" }, { day: "Wednesday", time: "3:00 PM – 7:00 PM" }, { day: "Saturday", time: "10:00 AM – 2:00 PM" }], bio: "Dr. Hina Riaz is one of Lahore's top orthodontists specializing in Invisalign and modern braces techniques." },
  { id: 12, name: "Dr. Salman Qureshi", title: "BDS, MSc (Prosthodontics)", specialty: "Dental Care", tag: "dental", image: "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?auto=format&fit=crop&w=400&q=80", experience: "13 Years", rating: 4.8, reviews: 401, fee: "PKR 3,000", languages: ["Urdu", "English"], available: true, nextSlot: "Today, 6:30 PM", IconComp: GiTooth, solidColor: "#0ea5e9", availabilitySchedule: [{ day: "Tuesday", time: "9:00 AM – 1:00 PM" }, { day: "Thursday", time: "4:00 PM – 8:00 PM" }, { day: "Saturday", time: "11:00 AM – 3:00 PM" }], bio: "Dr. Salman Qureshi is a London-trained prosthodontist with expertise in full mouth rehabilitation and dental prosthetics." },
  { id: 13, name: "Dr. Sana Javed", title: "MBBS, FCPS (OB/GYN)", specialty: "Gynecology & Obstetrics", tag: "gynecology", image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=400&q=80", experience: "11 Years", rating: 4.8, reviews: 213, fee: "PKR 3,000", languages: ["Urdu", "English"], available: true, nextSlot: "Today, 5:00 PM", IconComp: GiBabyFace, solidColor: "#a855f7", availabilitySchedule: [{ day: "Monday", time: "10:00 AM – 2:00 PM" }, { day: "Thursday", time: "4:00 PM – 7:00 PM" }, { day: "Saturday", time: "9:00 AM – 12:00 PM" }], bio: "Dr. Sana Javed is a compassionate gynecologist dedicated to women's health at every life stage, from adolescent care to menopause management." },
  { id: 14, name: "Dr. Rabia Nawaz", title: "MBBS, MCPS (Gynecology)", specialty: "Gynecology & Obstetrics", tag: "gynecology", image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=400&q=80", experience: "7 Years", rating: 4.6, reviews: 142, fee: "PKR 2,500", languages: ["Urdu", "English", "Punjabi"], available: false, nextSlot: "Tomorrow, 9:00 AM", IconComp: GiBabyFace, solidColor: "#a855f7", availabilitySchedule: [{ day: "Tuesday", time: "9:00 AM – 1:00 PM" }, { day: "Friday", time: "3:00 PM – 6:00 PM" }, { day: "Sunday", time: "10:00 AM – 1:00 PM" }], bio: "Dr. Rabia Nawaz is an enthusiastic gynecologist known for patient-friendly approach and modern management of complex gynecological conditions." },
  { id: 15, name: "Dr. Imran Sheikh", title: "MBBS, FCPS (Orthopedic Surgery)", specialty: "Orthopedic Surgery", tag: "orthopedic", image: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&w=400&q=80", experience: "15 Years", rating: 4.8, reviews: 387, fee: "PKR 4,000", languages: ["Urdu", "English"], available: true, nextSlot: "Today, 4:30 PM", IconComp: TbBone, solidColor: "#f59e0b", availabilitySchedule: [{ day: "Monday", time: "2:00 PM – 6:00 PM" }, { day: "Wednesday", time: "9:00 AM – 1:00 PM" }, { day: "Saturday", time: "10:00 AM – 2:00 PM" }], bio: "Dr. Imran Sheikh is a highly skilled orthopedic surgeon with special interest in sports medicine and pediatric orthopedics, with 2,000+ arthroscopic procedures." },
  { id: 16, name: "Dr. Amna Waseem", title: "MBBS, MCPS (Orthopedics)", specialty: "Orthopedic Surgery", tag: "orthopedic", image: "https://cdn.prod.website-files.com/6768674161a0e0eca2f41278/69833af4c81e1d905ed53e2d_68c3c5edf2ff8968eb707d5e_Dr%2520amna%2520ahmed%2520butt.jpeg", experience: "10 Years", rating: 4.7, reviews: 229, fee: "PKR 3,000", languages: ["Urdu", "English"], available: false, nextSlot: "Tomorrow, 3:00 PM", IconComp: TbBone, solidColor: "#f59e0b", availabilitySchedule: [{ day: "Tuesday", time: "10:00 AM – 2:00 PM" }, { day: "Thursday", time: "4:00 PM – 8:00 PM" }, { day: "Sunday", time: "11:00 AM – 2:00 PM" }], bio: "Dr. Amna Waseem is one of the few female orthopedic surgeons in Lahore, excelling in arthritis, osteoporosis, and chronic back pain management." },
  { id: 17, name: "Dr. Faisal Mehmood", title: "MBBS, FCPS (ENT & Head-Neck)", specialty: "ENT Specialist", tag: "ent", image: "https://smh.org.pk/wp-content/uploads/2024/10/Dr.-Faisal-Rafiq.jpg", experience: "16 Years", rating: 4.9, reviews: 362, fee: "PKR 3,500", languages: ["Urdu", "English"], available: true, nextSlot: "Today, 6:00 PM", IconComp: TbEar, solidColor: "#14b8a6", availabilitySchedule: [{ day: "Monday", time: "9:00 AM – 1:00 PM" }, { day: "Wednesday", time: "4:00 PM – 8:00 PM" }, { day: "Friday", time: "9:00 AM – 12:00 PM" }], bio: "Dr. Faisal Mehmood is a senior ENT and head-neck surgeon with extensive experience in endoscopic sinus surgery and cochlear implants." },
  { id: 18, name: "Dr. Maham Iqbal", title: "MBBS, MCPS (ENT)", specialty: "ENT Specialist", tag: "ent", image: "https://media.licdn.com/dms/image/v2/D4D03AQG5RHOUkmmoPg/profile-displayphoto-shrink_200_200/0/1721228681896?e=2147483647&v=beta&t=f-jbsRJg3ZteTWcO0KTMkP7jEdbJ_28hMnCIogAkRY0", experience: "6 Years", rating: 4.6, reviews: 128, fee: "PKR 2,200", languages: ["Urdu", "English", "Punjabi"], available: true, nextSlot: "Today, 2:30 PM", IconComp: TbEar, solidColor: "#14b8a6", availabilitySchedule: [{ day: "Tuesday", time: "10:00 AM – 2:00 PM" }, { day: "Thursday", time: "3:00 PM – 7:00 PM" }, { day: "Saturday", time: "10:00 AM – 1:00 PM" }], bio: "Dr. Maham Iqbal is a dedicated ENT specialist with growing expertise in pediatric ENT and sleep-related disorders." },
  { id: 19, name: "Dr. Tariq Mahmood", title: "MBBS, FCPS (Neurology)", specialty: "Neurology", tag: "neurology", image: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?fm=jpg&q=60&w=3000&auto=format&fit=crop", experience: "17 Years", rating: 4.8, reviews: 334, fee: "PKR 4,500", languages: ["Urdu", "English"], available: true, nextSlot: "Today, 7:00 PM", IconComp: GiBrain, solidColor: "#6366f1", availabilitySchedule: [{ day: "Monday", time: "3:00 PM – 7:00 PM" }, { day: "Thursday", time: "3:00 PM – 7:00 PM" }, { day: "Saturday", time: "10:00 AM – 2:00 PM" }], bio: "Dr. Tariq Mahmood is a Toronto-trained neurologist with deep expertise in dementia, multiple sclerosis, and cerebrovascular disease." },
  { id: 20, name: "Dr. Noor Fatima", title: "MBBS, MCPS (Neurology)", specialty: "Neurology", tag: "neurology", image: "https://plus.unsplash.com/premium_photo-1682089144957-f48bbcf706b2?fm=jpg&q=60&w=3000&auto=format&fit=crop", experience: "8 Years", rating: 4.7, reviews: 196, fee: "PKR 3,500", languages: ["Urdu", "English"], available: false, nextSlot: "Tomorrow, 11:00 AM", IconComp: GiBrain, solidColor: "#6366f1", availabilitySchedule: [{ day: "Tuesday", time: "10:00 AM – 2:00 PM" }, { day: "Friday", time: "4:00 PM – 7:00 PM" }, { day: "Sunday", time: "10:00 AM – 1:00 PM" }], bio: "Dr. Noor Fatima is a compassionate neurologist focusing on headache disorders, vertigo, and pediatric neurology." },
  { id: 21, name: "Dr. Ahsan Baig", title: "MBBS, Diploma Hair Restoration", specialty: "Hair Transplant", tag: "hair", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", experience: "8 Years", rating: 4.8, reviews: 152, fee: "PKR 1,500", languages: ["Urdu", "English", "Punjabi"], available: true, nextSlot: "Today, 4:00 PM", IconComp: MdOutlineContentCut, solidColor: "#8b5cf6", availabilitySchedule: [{ day: "Tuesday", time: "11:00 AM – 3:00 PM" }, { day: "Thursday", time: "4:00 PM – 8:00 PM" }, { day: "Saturday", time: "11:00 AM – 3:00 PM" }], bio: "Dr. Ahsan Baig is a dedicated hair restoration specialist with strong reputation for natural-looking FUE results and eyebrow transplants." },
  { id: 22, name: "Dr. Zainab Mirza", title: "MBBS, Fellowship Hair & Aesthetics", specialty: "Hair Transplant", tag: "hair", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80", experience: "6 Years", rating: 4.9, reviews: 117, fee: "Free Consultation", languages: ["Urdu", "English"], available: false, nextSlot: "Tomorrow, 12:00 PM", IconComp: MdOutlineContentCut, solidColor: "#8b5cf6", availabilitySchedule: [{ day: "Monday", time: "12:00 PM – 4:00 PM" }, { day: "Wednesday", time: "4:00 PM – 8:00 PM" }, { day: "Friday", time: "12:00 PM – 3:00 PM" }], bio: "Dr. Zainab Mirza is a rising star in female hair restoration, specializing in alopecia treatment and hairline feminization." },
  { id: 23, name: "Dr. Lubna Khalid", title: "MBBS, FCPS (Internal Medicine)", specialty: "General Medicine", tag: "general", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsFbGCZ8Yhsa99c9CHbTiKjmYFv5c1lyquNQ&s", experience: "14 Years", rating: 4.9, reviews: 521, fee: "PKR 2,500", languages: ["Urdu", "English"], available: true, nextSlot: "Today, 3:00 PM", IconComp: TbStethoscope, solidColor: "#10b981", availabilitySchedule: [{ day: "Monday", time: "9:00 AM – 1:00 PM" }, { day: "Wednesday", time: "3:00 PM – 7:00 PM" }, { day: "Saturday", time: "10:00 AM – 2:00 PM" }], bio: "Dr. Lubna Khalid is a highly experienced internal medicine specialist with focus on diabetes, thyroid disorders, and preventive care." },
  { id: 24, name: "Dr. Adeel Hanif", title: "MBBS, MRCP (UK)", specialty: "General Medicine", tag: "general", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80", experience: "19 Years", rating: 4.9, reviews: 634, fee: "PKR 3,500", languages: ["Urdu", "English"], available: true, nextSlot: "Today, 5:00 PM", IconComp: TbStethoscope, solidColor: "#10b981", availabilitySchedule: [{ day: "Tuesday", time: "9:00 AM – 1:00 PM" }, { day: "Wednesday", time: "3:00 PM – 7:00 PM" }, { day: "Saturday", time: "4:00 PM – 8:00 PM" }], bio: "Dr. Adeel Hanif is an MRCP-certified physician from the Royal College of Physicians London, with 19 years of internal medicine practice." },
];

const TAGS = [
  { value: "all", label: "All", icon: TbStethoscope, color: "#0ea5e9" },
  { value: "skin", label: "Skin", icon: MdFace, color: "#ec4899" },
  { value: "dental", label: "Dental", icon: GiTooth, color: "#0ea5e9" },
  { value: "gynecology", label: "Gynecology", icon: GiBabyFace, color: "#a855f7" },
  { value: "orthopedic", label: "Orthopedic", icon: TbBone, color: "#f59e0b" },
  { value: "ent", label: "ENT", icon: TbEar, color: "#14b8a6" },
  { value: "neurology", label: "Neurology", icon: GiBrain, color: "#6366f1" },
  { value: "hair", label: "Hair", icon: MdOutlineContentCut, color: "#8b5cf6" },
  { value: "general", label: "General", icon: TbStethoscope, color: "#10b981" },
];

const CONSULT_TYPES = [
  { id: "video", label: "Video Consultation", icon: FiVideo, desc: "Face-to-face via HD video", color: "#0ea5e9" },
  { id: "audio", label: "Audio Call", icon: FiPhone, desc: "Voice-only consultation", color: "#10b981" },
  { id: "chat", label: "Chat Consultation", icon: FiMessageCircle, desc: "Text-based messaging", color: "#8b5cf6" },
  { id: "whatsapp", label: "WhatsApp", icon: FaWhatsapp, desc: "Consult via WhatsApp", color: "#25d366" },
];

const TIME_SLOTS = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <FaStar key={s} size={11} color={s <= Math.floor(rating) ? "#f59e0b" : "#e5e7eb"} />
      ))}
      <span className="ml-1 text-xs font-semibold text-gray-600">{rating}</span>
    </div>
  );
}

// ─── BOOKING MODAL ────────────────────────────────────────────────────────────
function BookingModal({ doctor, onClose }) {
  const [step, setStep] = useState(1);
  const [consultType, setConsultType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [symptoms, setSymptoms] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", age: "" });
  const [booked, setBooked] = useState(false);
  const fileRef = useRef();

  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today); d.setDate(today.getDate() + i); return d;
  });
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const canProceed1 = consultType, canProceed2 = selectedDate && selectedSlot, canProceed3 = form.name && form.phone;

  if (booked) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-2xl">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}>
          <FiCheck size={36} color="white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Consultation Booked!</h2>
        <p className="text-gray-500 mb-1">Your {consultType} consultation with</p>
        <p className="font-bold text-gray-900 mb-1">{doctor.name}</p>
        <p className="text-gray-500 mb-6">confirmed for <span className="font-semibold text-gray-800">{selectedDate && `${dayNames[selectedDate.getDay()]}, ${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]}`}</span> at <span className="font-semibold text-gray-800">{selectedSlot}</span></p>
        <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-sm text-left space-y-2">
          <div className="flex items-center gap-2 text-gray-600"><FiPhone size={14} /> Confirmation sent to {form.phone}</div>
          <div className="flex items-center gap-2 text-gray-600"><FaWhatsapp size={14} color="#25d366" /> WhatsApp reminder 30 min before</div>
          <div className="flex items-center gap-2 text-gray-600"><FiShield size={14} color="#10b981" /> Data encrypted & secure</div>
        </div>
        <button onClick={onClose} className="w-full py-3 rounded-2xl text-white font-bold text-sm" style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}>Done</button>
      </motion.div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}>
      <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden" style={{ maxHeight: "90vh", overflowY: "auto" }}>
        <div className="p-6 pb-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <img src={doctor.image} alt={doctor.name} className="w-12 h-12 rounded-2xl object-cover" />
            <div><p className="font-bold text-gray-900 text-sm">{doctor.name}</p><p className="text-xs text-gray-500">{doctor.specialty}</p></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              {[1,2,3].map(s => (<div key={s} className="h-2 rounded-full transition-all duration-300" style={{ width: step === s ? 24 : 8, background: step >= s ? doctor.solidColor : "#e5e7eb" }} />))}
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"><FiX size={16} /></button>
          </div>
        </div>
        <div className="p-6">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Choose Consultation Type</h3>
              <p className="text-sm text-gray-500 mb-5">How would you like to consult with {doctor.name}?</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {CONSULT_TYPES.map(ct => {
                  const Icon = ct.icon; const sel = consultType === ct.id;
                  return (
                    <button key={ct.id} onClick={() => setConsultType(ct.id)} className="p-4 rounded-2xl border-2 text-left transition-all duration-200" style={{ borderColor: sel ? ct.color : "#e5e7eb", background: sel ? `${ct.color}10` : "white" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: sel ? ct.color : "#f3f4f6" }}><Icon size={20} color={sel ? "white" : ct.color} /></div>
                      <p className="font-bold text-sm text-gray-900">{ct.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{ct.desc}</p>
                    </button>
                  );
                })}
              </div>
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Describe Symptoms <span className="text-gray-400 font-normal">(optional)</span></label>
                <textarea value={symptoms} onChange={e => setSymptoms(e.target.value)} placeholder="e.g. headaches for 3 days, skin rash..." className="w-full border border-gray-200 rounded-2xl p-3 text-sm resize-none focus:outline-none focus:border-blue-400 transition-colors" rows={3} />
              </div>
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Upload Reports / X-rays <span className="text-gray-400 font-normal">(optional)</span></label>
                <button onClick={() => fileRef.current.click()} className="w-full border-2 border-dashed border-gray-200 rounded-2xl p-4 flex items-center justify-center gap-2 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors">
                  <FiUpload size={16} />
                  {uploadedFile ? <span className="text-green-600 font-medium">{uploadedFile.name}</span> : "Click to upload (PDF, JPG, PNG)"}
                </button>
                <input ref={fileRef} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setUploadedFile(e.target.files[0])} />
              </div>
              <button onClick={() => canProceed1 && setStep(2)} className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-200" style={{ background: canProceed1 ? `linear-gradient(135deg,${doctor.solidColor},${doctor.solidColor}cc)` : "#e5e7eb", cursor: canProceed1 ? "pointer" : "not-allowed", color: canProceed1 ? "white" : "#9ca3af" }}>Continue to Schedule →</button>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Pick Date & Time</h3>
              <p className="text-sm text-gray-500 mb-5">Available slots for {doctor.name}</p>
              <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
                {dates.map((d, i) => {
                  const sel = selectedDate && d.toDateString() === selectedDate.toDateString();
                  return (
                    <button key={i} onClick={() => setSelectedDate(d)} className="flex-shrink-0 flex flex-col items-center py-3 px-4 rounded-2xl border-2 transition-all duration-200 min-w-[60px]" style={{ borderColor: sel ? doctor.solidColor : "#e5e7eb", background: sel ? doctor.solidColor : "white" }}>
                      <span className="text-xs font-medium" style={{ color: sel ? "rgba(255,255,255,0.8)" : "#9ca3af" }}>{dayNames[d.getDay()]}</span>
                      <span className="text-lg font-black" style={{ color: sel ? "white" : "#1f2937" }}>{d.getDate()}</span>
                      <span className="text-xs" style={{ color: sel ? "rgba(255,255,255,0.8)" : "#9ca3af" }}>{monthNames[d.getMonth()]}</span>
                    </button>
                  );
                })}
              </div>
              <div className="grid grid-cols-3 gap-2 mb-5">
                {TIME_SLOTS.map((slot, i) => {
                  const sel = selectedSlot === slot; const avail = i % 3 !== 1;
                  return (
                    <button key={slot} onClick={() => avail && setSelectedSlot(slot)} disabled={!avail} className="py-2.5 px-3 rounded-xl text-xs font-bold border-2 transition-all duration-200" style={{ borderColor: sel ? doctor.solidColor : avail ? "#e5e7eb" : "#f3f4f6", background: sel ? doctor.solidColor : avail ? "white" : "#f9fafb", color: sel ? "white" : avail ? "#1f2937" : "#d1d5db", cursor: avail ? "pointer" : "not-allowed" }}>
                      {slot}{!avail && <span className="block text-[9px] mt-0.5" style={{ color: "#d1d5db" }}>Booked</span>}
                    </button>
                  );
                })}
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Regular Schedule</p>
                <div className="space-y-1.5">
                  {doctor.availabilitySchedule.map((s, i) => (
                    <div key={i} className="flex items-center justify-between text-xs"><span className="font-medium text-gray-700">{s.day}</span><span className="text-gray-500">{s.time}</span></div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-2xl border-2 border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">← Back</button>
                <button onClick={() => canProceed2 && setStep(3)} className="flex-1 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200" style={{ background: canProceed2 ? `linear-gradient(135deg,${doctor.solidColor},${doctor.solidColor}cc)` : "#e5e7eb", cursor: canProceed2 ? "pointer" : "not-allowed", color: canProceed2 ? "white" : "#9ca3af" }}>Continue →</button>
              </div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Your Details</h3>
              <p className="text-sm text-gray-500 mb-5">We'll send confirmation here</p>
              <div className="space-y-3 mb-5">
                {[{ k: "name", label: "Full Name *", placeholder: "Enter your full name", type: "text" }, { k: "phone", label: "Phone / WhatsApp *", placeholder: "+92 300 1234567", type: "tel" }, { k: "email", label: "Email Address", placeholder: "your@email.com", type: "email" }, { k: "age", label: "Age", placeholder: "e.g. 32", type: "number" }].map(f => (
                  <div key={f.k}><label className="text-xs font-bold text-gray-700 mb-1 block">{f.label}</label><input value={form[f.k]} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))} type={f.type} placeholder={f.placeholder} className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition-colors" /></div>
                ))}
              </div>
              <div className="rounded-2xl p-4 mb-5 border-2" style={{ borderColor: `${doctor.solidColor}40`, background: `${doctor.solidColor}08` }}>
                <p className="text-xs font-bold text-gray-600 mb-3 uppercase tracking-wide">Booking Summary</p>
                <div className="space-y-2 text-sm">
                  {[["Doctor", doctor.name], ["Type", `${consultType} Consultation`], ["Date", selectedDate ? `${dayNames[selectedDate.getDay()]}, ${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]}` : "—"], ["Time", selectedSlot || "—"]].map(([k, v]) => (
                    <div key={k} className="flex justify-between"><span className="text-gray-500">{k}</span><span className="font-semibold text-gray-900 capitalize">{v}</span></div>
                  ))}
                  <div className="flex justify-between border-t border-gray-200 pt-2 mt-2"><span className="font-bold text-gray-700">Fee</span><span className="font-black" style={{ color: doctor.solidColor }}>{doctor.fee}</span></div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 py-3.5 rounded-2xl border-2 border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">← Back</button>
                <button onClick={() => canProceed3 && setBooked(true)} className="flex-1 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200" style={{ background: canProceed3 ? `linear-gradient(135deg,${doctor.solidColor},${doctor.solidColor}cc)` : "#e5e7eb", cursor: canProceed3 ? "pointer" : "not-allowed", color: canProceed3 ? "white" : "#9ca3af" }}>Confirm Booking</button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ─── CHAT WIDGET ──────────────────────────────────────────────────────────────
function ChatWidget({ doctor, onClose }) {
  const [messages, setMessages] = useState([{ from: "doc", text: `Hello! I'm ${doctor.name}. How can I help you today?` }]);
  const [input, setInput] = useState("");
  const bottomRef = useRef();
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  function send() {
    if (!input.trim()) return;
    setMessages(p => [...p, { from: "user", text: input }]);
    setInput("");
    setTimeout(() => setMessages(p => [...p, { from: "doc", text: "Thank you for sharing. Please book a formal consultation for a detailed evaluation. I'll ensure you receive the best care." }]), 1200);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-6" style={{ pointerEvents: "none" }}>
      <motion.div initial={{ y: 40, opacity: 0, scale: 0.95 }} animate={{ y: 0, opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col" style={{ width: 360, height: 520, pointerEvents: "all" }}>
        <div className="p-4 flex items-center gap-3" style={{ background: `linear-gradient(135deg,${doctor.solidColor},${doctor.solidColor}cc)` }}>
          <div className="relative"><img src={doctor.image} alt="" className="w-10 h-10 rounded-xl object-cover" /><div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" /></div>
          <div className="flex-1"><p className="font-bold text-white text-sm">{doctor.name}</p><p className="text-xs text-white/70">Online • Replies in 5 min</p></div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"><FiX size={14} color="white" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              {m.from === "doc" && <img src={doctor.image} alt="" className="w-6 h-6 rounded-lg object-cover mr-2 mt-1 flex-shrink-0" />}
              <div className="max-w-[75%] px-3 py-2 rounded-2xl text-sm" style={{ background: m.from === "user" ? doctor.solidColor : "white", color: m.from === "user" ? "white" : "#1f2937", borderRadius: m.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>{m.text}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
          <button className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"><FiPaperclip size={14} color="#6b7280" /></button>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a message..." className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-400 transition-colors" />
          <button onClick={send} className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200" style={{ background: input.trim() ? doctor.solidColor : "#e5e7eb" }}><FiSend size={14} color={input.trim() ? "white" : "#9ca3af"} /></button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── DOCTOR CARD ──────────────────────────────────────────────────────────────
function DoctorCard({ doc, onBook, onChat }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = doc.IconComp;
  return (
    <div className="relative" style={{ perspective: 1000, height: 380 }}>
      <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.5, type: "spring", stiffness: 70 }} style={{ width: "100%", height: "100%", transformStyle: "preserve-3d", position: "relative" }}>
        {/* Front */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden bg-white shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300" style={{ backfaceVisibility: "hidden" }}>
          <div className="h-2 w-full" style={{ background: `linear-gradient(90deg,${doc.solidColor},${doc.solidColor}80)` }} />
          <div className="p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="relative flex-shrink-0">
                <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-2xl object-cover" />
                {doc.available && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-gray-900 text-sm leading-tight">{doc.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5 leading-tight">{doc.title}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${doc.solidColor}20` }}><Icon size={11} color={doc.solidColor} /></div>
                  <span className="text-xs font-semibold" style={{ color: doc.solidColor }}>{doc.specialty}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[{ label: "Experience", value: doc.experience }, { label: "Fee", value: doc.fee }, { label: "Reviews", value: doc.reviews + " reviews" }, { label: "Languages", value: doc.languages.slice(0, 2).join(", ") }].map(item => (
                <div key={item.label} className="bg-gray-50 rounded-xl p-2.5"><p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">{item.label}</p><p className="text-xs font-bold text-gray-800 mt-0.5 truncate">{item.value}</p></div>
              ))}
            </div>
            <div className="flex items-center justify-between mb-4">
              <StarRating rating={doc.rating} />
              <span className="text-xs px-2.5 py-1 rounded-full font-bold" style={{ background: doc.available ? "#dcfce7" : "#fef3c7", color: doc.available ? "#16a34a" : "#d97706" }}>
                {doc.available ? "● Available Now" : `Next: ${doc.nextSlot}`}
              </span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onBook(doc)} className="flex-1 py-2.5 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 hover:opacity-90 active:scale-95" style={{ background: `linear-gradient(135deg,${doc.solidColor},${doc.solidColor}cc)` }}>
                <FiCalendar size={12} /> Book Consultation
              </button>
              <button onClick={() => setFlipped(true)} className="w-9 h-9 rounded-xl border-2 flex items-center justify-center flex-shrink-0 hover:bg-gray-50 transition-colors" style={{ borderColor: doc.solidColor }}><FiUser size={14} color={doc.solidColor} /></button>
              <button onClick={() => onChat(doc)} className="w-9 h-9 rounded-xl border-2 flex items-center justify-center flex-shrink-0 hover:bg-gray-50 transition-colors" style={{ borderColor: "#25d366" }}><FaWhatsapp size={14} color="#25d366" /></button>
            </div>
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden bg-white shadow-md border border-gray-100" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <div className="h-2 w-full" style={{ background: `linear-gradient(90deg,${doc.solidColor},${doc.solidColor}80)` }} />
          <div className="p-5 h-full flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <p className="font-black text-gray-900 text-sm">{doc.name}</p>
              <button onClick={() => setFlipped(false)} className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"><FiX size={12} /> Close</button>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">{doc.bio}</p>
            <p className="text-xs font-black text-gray-700 uppercase tracking-wide mb-2">Weekly Schedule</p>
            <div className="space-y-1.5 flex-1">
              {doc.availabilitySchedule.map((s, i) => (
                <div key={i} className="flex items-center justify-between text-xs bg-gray-50 rounded-xl px-3 py-2">
                  <span className="font-bold text-gray-700">{s.day}</span><span className="text-gray-500">{s.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={() => { setFlipped(false); onBook(doc); }} className="flex-1 py-2.5 rounded-xl text-white text-xs font-bold transition-all hover:opacity-90 active:scale-95" style={{ background: `linear-gradient(135deg,${doc.solidColor},${doc.solidColor}cc)` }}>Book Now</button>
              <button onClick={() => onChat(doc)} className="flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition-colors hover:bg-gray-50" style={{ borderColor: "#25d366", color: "#25d366" }}>Chat</button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── SYMPTOM CHECKER ──────────────────────────────────────────────────────────
const SYMPTOM_MAP = {
  fever: { issue: "Possible Infection / Viral Illness", specialist: "General Medicine", urgency: "medium", doctor: 8 },
  acne: { issue: "Acne Vulgaris / Skin Condition", specialist: "Skin & Dermatology", urgency: "low", doctor: 1 },
  "hair fall": { issue: "Alopecia / Hair Loss Disorder", specialist: "Hair Transplant", urgency: "low", doctor: 7 },
  "tooth pain": { issue: "Dental Caries / Abscess", specialist: "Dental Care", urgency: "high", doctor: 2 },
  headache: { issue: "Tension Headache / Migraine", specialist: "Neurology", urgency: "medium", doctor: 6 },
  "joint pain": { issue: "Arthritis / Musculoskeletal Issue", specialist: "Orthopedic Surgery", urgency: "medium", doctor: 4 },
  "ear pain": { issue: "Otitis / Ear Infection", specialist: "ENT Specialist", urgency: "medium", doctor: 5 },
  "irregular periods": { issue: "Hormonal Imbalance / PCOS", specialist: "Gynecology & Obstetrics", urgency: "medium", doctor: 3 },
  diabetes: { issue: "Diabetes Management Required", specialist: "General Medicine", urgency: "high", doctor: 8 },
  "back pain": { issue: "Musculoskeletal / Disc Issue", specialist: "Orthopedic Surgery", urgency: "medium", doctor: 4 },
};
const URGENCY_COLOR = {
  low: { bg: "#dcfce7", text: "#16a34a", label: "Not Urgent" },
  medium: { bg: "#fef3c7", text: "#d97706", label: "See Doctor Soon" },
  high: { bg: "#fee2e2", text: "#dc2626", label: "Urgent Care Needed" },
};

function SymptomChecker({ onBook }) {
  const [symptom, setSymptom] = useState("");
  const [result, setResult] = useState(null);
  const [checked, setChecked] = useState(false);

  function check() {
    const key = Object.keys(SYMPTOM_MAP).find(k => symptom.toLowerCase().includes(k));
    setResult(key ? SYMPTOM_MAP[key] : { issue: "Symptom not recognized. Please consult a General Physician.", specialist: "General Medicine", urgency: "low", doctor: 8 });
    setChecked(true);
  }
  const resultDoc = result ? doctors.find(d => d.id === result.doctor) : null;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}><FiActivity size={18} color="white" /></div>
        <div><h3 className="font-black text-gray-900">AI Symptom Checker</h3><p className="text-xs text-gray-500">Enter symptoms for doctor recommendation</p></div>
      </div>
      <div className="flex gap-2 mb-4">
        <input value={symptom} onChange={e => setSymptom(e.target.value)} onKeyDown={e => e.key === "Enter" && check()} placeholder="e.g. fever, acne, tooth pain, headache..." className="flex-1 border border-gray-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400 transition-colors" />
        <button onClick={check} className="px-5 py-2.5 rounded-2xl text-white text-sm font-bold transition-all hover:opacity-90 active:scale-95" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>Check</button>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {["Fever", "Acne", "Hair Fall", "Tooth Pain", "Headache", "Joint Pain", "Ear Pain", "Back Pain"].map(s => (
          <button key={s} onClick={() => { setSymptom(s.toLowerCase()); setChecked(false); setResult(null); }} className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors font-medium">{s}</button>
        ))}
      </div>
      <AnimatePresence>
        {checked && result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
            <div className="rounded-2xl p-4 border" style={{ background: `${URGENCY_COLOR[result.urgency].bg}50`, borderColor: `${URGENCY_COLOR[result.urgency].text}40` }}>
              <div className="flex items-start justify-between gap-3">
                <div><p className="text-xs font-bold text-gray-600 mb-1">Possible Condition</p><p className="font-black text-gray-900 text-sm">{result.issue}</p><p className="text-xs text-gray-600 mt-1">Recommended: <span className="font-bold">{result.specialist}</span></p></div>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0" style={{ background: URGENCY_COLOR[result.urgency].bg, color: URGENCY_COLOR[result.urgency].text }}>{URGENCY_COLOR[result.urgency].label}</span>
              </div>
            </div>
            {resultDoc && (
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <img src={resultDoc.image} alt="" className="w-10 h-10 rounded-xl object-cover" />
                <div className="flex-1 min-w-0"><p className="font-bold text-sm text-gray-900 truncate">{resultDoc.name}</p><p className="text-xs text-gray-500">{resultDoc.specialty} • {resultDoc.fee}</p></div>
                <button onClick={() => onBook(resultDoc)} className="text-xs font-bold px-4 py-2 rounded-xl text-white transition-all hover:opacity-90 active:scale-95 flex-shrink-0" style={{ background: resultDoc.solidColor }}>Book</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const HOW_STEPS = [
  { step: "01", title: "Choose Your Doctor", desc: "Browse specialists, read profiles, and pick your preferred doctor.", icon: FiSearch, color: "#0ea5e9" },
  { step: "02", title: "Select Consult Type", desc: "Pick from Video, Audio, Chat, or WhatsApp consultation.", icon: FiVideo, color: "#8b5cf6" },
  { step: "03", title: "Book a Slot", desc: "Choose a convenient date and time from available slots.", icon: FiCalendar, color: "#10b981" },
  { step: "04", title: "Join & Consult", desc: "Get a secure link and consult from anywhere in the world.", icon: FiShield, color: "#f59e0b" },
];

// ─── FLOATING HERO ILLUSTRATION ───────────────────────────────────────────────
function HeroIllustration() {
  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-full max-w-sm mx-auto"
    >
      {/* Glow ring */}
      <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(96,165,250,0.25) 0%, transparent 70%)", transform: "scale(1.3)" }} />

      {/* Main card */}
      <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/20 shadow-2xl">
        {/* Doctor row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80" alt="Doctor" className="w-14 h-14 rounded-2xl object-cover border-2 border-white/30" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Dr. Sarah Ahmed</p>
            <p className="text-white/60 text-xs">Dermatologist • 14 Yrs</p>
            <div className="flex items-center gap-1 mt-1">
              {[1,2,3,4,5].map(i => <FaStar key={i} size={9} color="#fbbf24" />)}
              <span className="text-white/70 text-[10px] ml-1">4.9</span>
            </div>
          </div>
          <div className="ml-auto text-right">
            <div className="bg-green-400/20 text-green-300 text-[10px] font-bold px-2 py-1 rounded-full border border-green-400/30">● Live</div>
          </div>
        </div>

        {/* Consult type pills */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {[{ label: "Video", color: "#0ea5e9", icon: "📹" }, { label: "Audio", color: "#10b981", icon: "📞" }, { label: "Chat", color: "#8b5cf6", icon: "💬" }].map(t => (
            <div key={t.label} className="flex items-center gap-1 px-3 py-1.5 rounded-full text-white text-[11px] font-semibold" style={{ background: `${t.color}30`, border: `1px solid ${t.color}50` }}>
              <span>{t.icon}</span> {t.label}
            </div>
          ))}
        </div>

        {/* Time slot row */}
        <div className="bg-white/10 rounded-2xl p-3 mb-3">
          <p className="text-white/50 text-[10px] uppercase tracking-wide mb-2 font-semibold">Next Available</p>
          <div className="flex gap-2">
            {["3:00 PM", "4:00 PM", "5:30 PM"].map((t, i) => (
              <div key={t} className="flex-1 text-center py-1.5 rounded-xl text-xs font-bold" style={{ background: i === 0 ? "rgba(96,165,250,0.5)" : "rgba(255,255,255,0.1)", color: i === 0 ? "white" : "rgba(255,255,255,0.5)" }}>{t}</div>
            ))}
          </div>
        </div>

        {/* Book button */}
        <div className="w-full py-2.5 rounded-xl text-center text-white text-sm font-bold" style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa)" }}>
          Book Consultation →
        </div>
      </div>

      {/* Floating badge: Secure */}
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -top-4 -right-4 bg-white rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "#dcfce7" }}>🔒</div>
        <div><p className="text-xs font-black text-gray-900">Secure</p><p className="text-[10px] text-gray-400">HIPAA</p></div>
      </motion.div>

      {/* Floating badge: Patients */}
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "#dbeafe" }}>👥</div>
        <div><p className="text-xs font-black text-gray-900">50K+</p><p className="text-[10px] text-gray-400">Patients</p></div>
      </motion.div>
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function OnlineConsultation() {
  const [activeTag, setActiveTag] = useState("all");
  const [search, setSearch] = useState("");
  const [availOnly, setAvailOnly] = useState(false);
  const [bookingDoc, setBookingDoc] = useState(null);
  const [chatDoc, setChatDoc] = useState(null);

  const filtered = doctors.filter(d => {
    const matchTag = activeTag === "all" || d.tag === activeTag;
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase());
    const matchAvail = !availOnly || d.available;
    return matchTag && matchSearch && matchAvail;
  });

  return (
    <div className="min-h-screen" style={{ background: "#f8fafc", fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ── HERO ── */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0c1445 0%,#1a237e 50%,#0d47a1 100%)" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 15% 50%, rgba(99,102,241,0.35) 0%, transparent 55%), radial-gradient(circle at 85% 20%, rgba(14,165,233,0.3) 0%, transparent 50%)" }} />

        {/* Back to Home */}
        <div className="relative max-w-6xl mx-auto px-4 pt-6">
          <a href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold transition-colors group">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <FiArrowLeft size={14} />
            </div>
            Back to Home
          </a>
        </div>

        {/* Hero Content: Left text + Right illustration */}
        <div className="relative max-w-6xl mx-auto px-4 py-14 flex flex-col md:flex-row items-center gap-12">
          {/* LEFT: Text */}
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur mb-5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/80 text-xs font-semibold">Doctors Online Now — Live</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Online Consultation<br />
              <span style={{ background: "linear-gradient(90deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Anywhere, Anytime</span>
            </h1>
            <p className="text-white/70 text-base mb-7 max-w-lg">Consult certified specialists via Video, Audio, Chat, or WhatsApp. Get prescriptions, reports & follow-ups — all online, all secure.</p>

            {/* Stats */}
            <div className="flex gap-7 mb-7">
              {[{ v: "24+", l: "Specialists" }, { v: "50K+", l: "Consultations" }, { v: "4.9★", l: "Avg Rating" }, { v: "5 Min", l: "Response" }].map(s => (
                <div key={s.l}>
                  <p className="text-2xl font-black text-white">{s.v}</p>
                  <p className="text-xs text-white/50 font-medium">{s.l}</p>
                </div>
              ))}
            </div>

            {/* Consult type pills */}
            <div className="flex gap-2 flex-wrap">
              {CONSULT_TYPES.map(ct => {
                const Icon = ct.icon;
                return (
                  <div key={ct.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur text-white text-xs font-semibold border border-white/20">
                    <Icon size={12} color={ct.color} /> {ct.label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Bouncing illustration */}
          <div className="flex-shrink-0 w-full md:w-[380px]">
            <HeroIllustration />
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-black text-gray-900 text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {HOW_STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="text-center p-5 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: `${s.color}15` }}><Icon size={20} color={s.color} /></div>
                <p className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.step}</p>
                <p className="font-bold text-gray-900 text-sm mb-1">{s.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── SYMPTOM CHECKER ── */}
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <SymptomChecker onBook={setBookingDoc} />
      </div>

      {/* ── DOCTOR LIST ── */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-black text-gray-900">Our Online Specialists</h2>
              <p className="text-sm text-gray-500 mt-0.5">{filtered.length} doctors available</p>
            </div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 cursor-pointer select-none">
              <div onClick={() => setAvailOnly(p => !p)} className="w-10 h-5 rounded-full relative transition-colors duration-200 flex-shrink-0" style={{ background: availOnly ? "#10b981" : "#e5e7eb" }}>
                <div className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200" style={{ left: availOnly ? 22 : 2 }} />
              </div>
              Available Now
            </label>
          </div>
          <div className="relative">
            <FiSearch size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search doctor name or specialty..."
              className="w-full pl-10 pr-10 py-3 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-blue-400 transition-colors shadow-sm" />
            {search && <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><FiX size={14} /></button>}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {TAGS.map(t => {
              const Icon = t.icon; const sel = activeTag === t.value;
              return (
                <button key={t.value} onClick={() => setActiveTag(t.value)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0" style={{ background: sel ? t.color : "white", color: sel ? "white" : "#6b7280", border: `2px solid ${sel ? t.color : "#e5e7eb"}` }}>
                  <Icon size={12} /> {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <FiSearch size={40} className="mx-auto mb-3 opacity-20 text-gray-400" />
            <p className="font-bold text-gray-500">No doctors found</p>
            <p className="text-sm text-gray-400 mt-1">Try a different filter or search</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {filtered.map(doc => (
                <motion.div key={doc.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25 }}>
                  <DoctorCard doc={doc} onBook={setBookingDoc} onChat={setChatDoc} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* ── FEATURES BAR ── */}
      <div className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ icon: FiShield, color: "#10b981", title: "100% Secure", desc: "Encrypted & HIPAA-compliant" },
            { icon: FiGlobe, color: "#0ea5e9", title: "Consult Anywhere", desc: "Pakistan or internationally" },
            { icon: FiFileText, color: "#8b5cf6", title: "Digital Prescription", desc: "Receive after consultation" },
            { icon: FiDownload, color: "#f59e0b", title: "Download Reports", desc: "Access all records anytime" }].map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${f.color}15` }}><Icon size={18} color={f.color} /></div>
                <div><p className="font-bold text-sm text-gray-900">{f.title}</p><p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{f.desc}</p></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MODALS ── */}
      <AnimatePresence>
        {bookingDoc && <BookingModal doctor={bookingDoc} onClose={() => setBookingDoc(null)} />}
        {chatDoc && <ChatWidget doctor={chatDoc} onClose={() => setChatDoc(null)} />}
      </AnimatePresence>

      {/* ── WhatsApp Float ── */}
      <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95"
        style={{ background: "#25d366" }}>
        <FaWhatsapp size={26} color="white" />
      </a>
    </div>
  );
}
