import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import SEOHead from "./SEOHead";
import {
  FiHome, FiPhone, FiMessageCircle, FiX,
  FiCalendar, FiCheck, FiUpload, FiShield,
  FiUser, FiActivity, FiArrowRight, FiInfo,
  FiChevronLeft, FiClock, FiLock, FiMapPin, FiMail,
  FiCheckCircle, FiPrinter, FiShare2, FiHeart, FiAlertCircle
} from "react-icons/fi";
import { FaWhatsapp, FaStar, FaUserNurse, FaBuilding, FaMoneyBillWave } from "react-icons/fa";
import { TbStethoscope, TbActivity } from "react-icons/tb";
import { doctors as mockDocs } from "../data/mockData";
import { api } from "../services/api";

const HOME_SERVICES = [
  {
    id: "physio",
    title: "General Physiotherapy at Home",
    desc: "Targeted pain relief for back, neck, knee & joint stiffness delivered at your doorstep.",
    fee: "PKR 4,000",
    rawFee: 4000,
    icon: "🩺",
    color: "#0ea5e9",
    lightColor: "rgba(14,165,233,0.08)",
    duration: "45 - 60 Min",
    availableDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  },
  {
    id: "stroke",
    title: "Stroke & Neuro Rehab at Home",
    desc: "Specialized neurological rehabilitation for paralysis, stroke recovery & gait re-training.",
    fee: "PKR 5,000",
    rawFee: 5000,
    icon: "🧠",
    color: "#8b5cf6",
    lightColor: "rgba(139,92,246,0.08)",
    duration: "60 - 75 Min",
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  },
  {
    id: "chiro",
    title: "Chiropractic & Spine Adjustment",
    desc: "Spinal alignment, disc decompression, posture correction & sciatica therapy.",
    fee: "PKR 4,500",
    rawFee: 4500,
    icon: "🦴",
    color: "#10b981",
    lightColor: "rgba(16,185,129,0.08)",
    duration: "45 Min",
    availableDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]
  },
  {
    id: "postop",
    title: "Post-Operative & Fracture Care",
    desc: "Post-surgery recovery, joint mobility restoration, scar release & strength building.",
    fee: "PKR 4,000",
    rawFee: 4000,
    icon: "🩹",
    color: "#f43f5e",
    lightColor: "rgba(244,63,94,0.08)",
    duration: "60 Min",
    availableDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  },
  {
    id: "elderly",
    title: "Elderly Mobility & Fall Prevention",
    desc: "Gentle physical therapy, balance training, fall prevention & senior wellness home care.",
    fee: "PKR 3,500",
    rawFee: 3500,
    icon: "👵",
    color: "#f59e0b",
    lightColor: "rgba(245,158,11,0.08)",
    duration: "45 Min",
    availableDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  },
  {
    id: "hijama",
    title: "Hijama & Cupping Therapy at Home",
    desc: "Sterile wet & dry cupping therapy for detox, blood circulation & deep muscle tension.",
    fee: "PKR 3,500",
    rawFee: 3500,
    icon: "🩸",
    color: "#06b6d4",
    lightColor: "rgba(6,182,212,0.08)",
    duration: "45 - 60 Min",
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Sat"]
  }
];

const TIME_SLOTS = [
  { id: "s1", time: "09:00 AM – 11:00 AM", period: "Morning", status: "Available" },
  { id: "s2", time: "11:00 AM – 01:00 PM", period: "Morning", status: "Available" },
  { id: "s3", time: "02:00 PM – 04:00 PM", period: "Afternoon", status: "Fast Filling" },
  { id: "s4", time: "04:00 PM – 06:00 PM", period: "Evening", status: "Available" },
  { id: "s5", time: "06:00 PM – 08:00 PM", period: "Evening", status: "Available" }
];

const ISLAMABAD_SECTORS = [
  "F-6 / F-7 / F-8",
  "F-10 / F-11 / E-11",
  "G-6 / G-7 / G-8 / G-9",
  "G-10 / G-11 / G-13 / G-14",
  "I-8 / I-9 / I-10",
  "DHA Phase 1 & 2 (Islamabad)",
  "Bahria Town Phase 1 - 8",
  "Gulberg Greens / Naval Anchorage",
  "Rawalpindi (Saddar / Satellite Town / Westridge)"
];

const FAQ_ITEMS = [
  { q: "What areas do your home visit specialists cover?", a: "We cover all main sectors in Islamabad (F-6, F-7, F-8, F-10, F-11, G-8, G-11, DHA, Bahria Town) and select areas in Rawalpindi. Our therapists arrive fully equipped at your doorstep.", accent: "#2563eb" },
  { q: "What medical equipment does the therapist bring?", a: "Our home physical therapists bring portable TENS/EMS electrotherapy units, therapeutic ultrasound machines, muscle stimulators, exercise resistance bands, cupping kits, and sanitized treatment mats.", accent: "#7c3aed" },
  { q: "How long is a typical home consultation session?", a: "Each home visit session lasts approximately 45 to 75 minutes. It includes a full biomechanical evaluation, targeted manual therapy, machine treatment, and guided exercises.", accent: "#0284c7" },
  { q: "How do I pay for the home visit consultation?", a: "You can pay via Cash on Arrival directly to the visiting doctor, or digitally via Easypaisa, JazzCash, or online Bank Transfer during booking.", accent: "#db2777" },
];

function HomeFaqAccordion() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className="space-y-4 max-w-3xl mx-auto text-left">
      {FAQ_ITEMS.map((faq, i) => (
        <div
          key={i}
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: openIdx === i ? `1.5px solid ${faq.accent}40` : "1.5px solid #f1f5f9",
            background: openIdx === i ? `linear-gradient(135deg, ${faq.accent}08 0%, #fff 100%)` : "#fff",
            boxShadow: openIdx === i ? `0 4px 24px ${faq.accent}18` : "0 1px 6px rgba(0,0,0,0.04)",
            transition: "all 0.3s ease"
          }}
        >
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between px-6 text-left border-none cursor-pointer"
            style={{ padding: "18px 24px", background: "transparent" }}
          >
            <div className="flex items-center gap-3">
              <div style={{ width: 8, height: 8, borderRadius: 99, background: faq.accent, flexShrink: 0, opacity: openIdx === i ? 1 : 0.4 }} />
              <span style={{ fontWeight: 800, fontSize: 14, color: openIdx === i ? faq.accent : "#334155" }}>{faq.q}</span>
            </div>
            <div
              style={{
                width: 28, height: 28, borderRadius: 99, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                background: openIdx === i ? faq.accent : "#f1f5f9",
                transition: "all 0.25s ease"
              }}
            >
              <FiChevronLeft size={14} style={{ color: openIdx === i ? "#fff" : "#94a3b8", transform: openIdx === i ? "rotate(-90deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }} />
            </div>
          </button>
          <AnimatePresence>
            {openIdx === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ padding: "0 24px 18px 44px", fontSize: 13, color: "#64748b", lineHeight: 1.7 }}
              >
                {faq.a}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function HomeConsultation() {
  const formRef = useRef(null);

  // Generate 7-day schedule objects
  const dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayNamesFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const getWeekDays = () => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return {
        index: i,
        dateObj: d,
        dayShort: dayNamesShort[d.getDay()],
        dayFull: dayNamesFull[d.getDay()],
        dayNumber: d.getDate(),
        monthShort: monthNames[d.getMonth()],
        isToday: i === 0,
        isTomorrow: i === 1,
        label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : dayNamesShort[d.getDay()],
        dateFormatted: `${d.getDate()} ${monthNames[d.getMonth()]}`
      };
    });
  };

  const weekDays = getWeekDays();
  const [selectedDay, setSelectedDay] = useState(weekDays[0]);
  const [selectedService, setSelectedService] = useState(HOME_SERVICES[0]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(TIME_SLOTS[0]);
  const [doctorsList, setDoctorsList] = useState([]);

  // Complete Patient Details Form State
  const [patientForm, setPatientForm] = useState({
    fullName: "",
    gender: "Male",
    age: "",
    phone: "",
    email: "",
    emergencyContact: "",
    emergencyRelation: "Family / Friend",
    address: "",
    sector: ISLAMABAD_SECTORS[0],
    floorElevator: "Ground Floor",
    landmark: "",
    primaryCondition: "Severe Back / Neck Pain",
    mobilityLevel: "Needs Assistance to Walk",
    notes: "",
    paymentMethod: "Cash on Arrival"
  });

  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedSuccess, setBookedSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  useEffect(() => {
    api.getDoctors().then(data => {
      if (data && data.length > 0) {
        setDoctorsList(data);
        setSelectedDoc(data[0]);
      } else {
        setDoctorsList(mockDocs || []);
        setSelectedDoc(mockDocs?.[0] || null);
      }
    }).catch(() => {
      setDoctorsList(mockDocs || []);
      setSelectedDoc(mockDocs?.[0] || null);
    });
  }, []);

  const handleSelectDay = (dayObj) => {
    setSelectedDay(dayObj);
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleConfirmAppointment = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!patientForm.fullName.trim()) {
      setFormError("Please enter Patient's Full Name.");
      return;
    }
    if (!patientForm.age || parseInt(patientForm.age) <= 0) {
      setFormError("Please enter a valid Patient Age.");
      return;
    }
    if (!patientForm.phone.trim()) {
      setFormError("Please enter Contact Phone Number.");
      return;
    }
    if (!patientForm.address.trim()) {
      setFormError("Please enter Full Home Address details.");
      return;
    }

    setIsSubmitting(true);
    const refCode = "VPH-HOME-" + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(refCode);

    const fullDateString = `${selectedDay.dayFull}, ${selectedDay.dateFormatted} 2026`;

    const appointmentPayload = {
      refCode,
      doctor: selectedDoc?.name || "Dr. Ghulam Jellani",
      date: fullDateString,
      time: selectedTimeSlot.time,
      type: "Home Visit Consultation",
      branch: "Home Visit (" + patientForm.sector + ")",
      status: "Pending",
      patient: patientForm.fullName,
      patient_gender: patientForm.gender,
      patient_age: patientForm.age,
      patient_email: patientForm.email || "N/A",
      patient_phone: patientForm.phone,
      emergency_contact: `${patientForm.emergencyContact} (${patientForm.emergencyRelation})`,
      patient_address: `${patientForm.address}, ${patientForm.sector} [Floor: ${patientForm.floorElevator}, Landmark: ${patientForm.landmark || "N/A"}]`,
      service: selectedService.title,
      fee: selectedService.fee,
      payment_method: patientForm.paymentMethod,
      condition: patientForm.primaryCondition,
      mobility: patientForm.mobilityLevel,
      notes: patientForm.notes || "None"
    };

    try {
      await api.createAppointment(appointmentPayload);
    } catch (err) {
      console.warn("Backend save fallback used for appointment:", err);
    }

    // Save locally for persistence
    try {
      const existing = JSON.parse(localStorage.getItem("vph_home_consultations") || "[]");
      existing.unshift({
        ...appointmentPayload,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("vph_home_consultations", JSON.stringify(existing));
    } catch (err) {
      console.error("Local storage error:", err);
    }

    setIsSubmitting(false);
    setBookedSuccess(true);
    scrollToForm();
  };

  const resetBookingForm = () => {
    setBookedSuccess(false);
    setPatientForm({
      fullName: "",
      gender: "Male",
      age: "",
      phone: "",
      email: "",
      emergencyContact: "",
      emergencyRelation: "Family / Friend",
      address: "",
      sector: ISLAMABAD_SECTORS[0],
      floorElevator: "Ground Floor",
      landmark: "",
      primaryCondition: "Severe Back / Neck Pain",
      mobilityLevel: "Needs Assistance to Walk",
      notes: "",
      paymentMethod: "Cash on Arrival"
    });
  };

  const generateWhatsAppUrl = () => {
    const text = `Hello Vital Physio Hub, I have booked a Home Consultation appointment on your website!\n\n` +
      `📌 Reference Code: ${bookingRef}\n` +
      `📅 Day & Date: ${selectedDay.dayFull}, ${selectedDay.dateFormatted}\n` +
      `⏰ Time Slot: ${selectedTimeSlot.time}\n` +
      `🩺 Service: ${selectedService.title} (${selectedService.fee})\n` +
      `👨‍⚕️ Doctor: ${selectedDoc?.name || "Assigned Specialist"}\n` +
      `👤 Patient: ${patientForm.fullName} (${patientForm.gender}, ${patientForm.age} yrs)\n` +
      `📞 Phone: ${patientForm.phone}\n` +
      `🏡 Address: ${patientForm.address}, ${patientForm.sector}\n\n` +
      `Please confirm the doctor arrival details. Thank you!`;
    return `https://wa.me/923008786187?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800 flex flex-col justify-between">
      <SEOHead 
        title="Home Consultation Schedule & Doorstep Care | Vital Physio Hub Islamabad"
        description="View available services, doctors, time slots by day and book doorstep home physical therapy in Islamabad & Rawalpindi. Complete patient appointment confirmation form."
        keywords="home consultation schedule, home physio doctor schedule, home visit appointment Islamabad, stroke rehab at home"
        canonicalUrl="https://physiohub.com/home-consultation"
      />
      <Navbar />

      {/* ── HERO BANNER ── */}
      <div
        className="relative flex items-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1600&q=80')",
          minHeight: "48vh",
          paddingTop: 100
        }}
      >
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950/95 via-slate-900/90 to-blue-950/80" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black uppercase tracking-wider mb-4">
              <FiHome size={14} /> Doorstep Care Schedule & Booking
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-serif leading-tight">
              Home Visit Consultation <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
                Day Schedule & Booking
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed max-w-2xl font-medium">
              Explore available home services, assigned doctors, and daily time slots by selecting your preferred day below. Confirm your appointment instantly with complete patient information.
            </p>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTAINER: SCHEDULE & CONFIRMATION FORM ── */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* ── SECTION 1: WEEKLY DAY SCHEDULE SELECTOR BAR ── */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl text-left space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-150 pb-5">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Step 1: Choose Day Schedule
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-serif">
                Select Available Day Schedule
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Click a day below to view services, available doctors, and open appointment time slots.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl shrink-0 self-start md:self-auto">
              <FiCalendar className="text-emerald-600 ml-2" size={16} />
              <span className="text-xs font-bold text-slate-700 pr-2">Weekly Schedule View</span>
            </div>
          </div>

          {/* Day Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {weekDays.map((dayObj) => {
              const isSelected = selectedDay.index === dayObj.index;
              return (
                <button
                  key={dayObj.index}
                  type="button"
                  onClick={() => handleSelectDay(dayObj)}
                  className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? "bg-gradient-to-b from-emerald-600 to-teal-700 text-white border-emerald-600 shadow-lg shadow-emerald-600/25 scale-[1.02]"
                      : "bg-slate-50 hover:bg-slate-100/80 text-slate-700 border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase tracking-wider ${isSelected ? "text-emerald-200" : "text-slate-400"}`}>
                      {dayObj.label}
                    </span>
                    {dayObj.isToday && (
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"}`}>
                        LIVE
                      </span>
                    )}
                  </div>
                  <div className="text-lg font-black mt-1 leading-none">
                    {dayObj.dayShort} <span className="text-sm font-extrabold opacity-90">{dayObj.dayNumber}</span>
                  </div>
                  <div className={`text-[10.5px] mt-1 font-medium ${isSelected ? "text-emerald-100" : "text-slate-500"}`}>
                    {dayObj.monthShort} • 5 Slots
                  </div>
                  {isSelected && (
                    <div className="absolute bottom-1 right-2 text-white/40">
                      <FiCheckCircle size={14} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Day Active Summary Ribbon */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                <FiClock size={18} />
              </div>
              <div>
                <span className="font-black text-slate-900 text-sm">
                  Active Schedule for {selectedDay.dayFull}, {selectedDay.dateFormatted}
                </span>
                <p className="text-slate-600 text-[11.5px] mt-0.5">
                  Home consultation doctors are operating in Islamabad & Rawalpindi from 09:00 AM to 08:00 PM.
                </p>
              </div>
            </div>
            <button
              onClick={scrollToForm}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm text-xs shrink-0 flex items-center gap-1.5 transition-all"
            >
              Skip to Booking Form <FiArrowRight />
            </button>
          </div>
        </section>

        {/* ── SECTION 2: SCHEDULE DETAILS BREAKDOWN (SERVICES, DOCTORS, TIME SLOTS) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          
          {/* LEFT COLUMN: AVAILABLE SERVICES SCHEDULE (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-150 pb-4">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600">
                    Day Schedule — Available Services
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-0.5">
                    Available Home Treatments on {selectedDay.label}
                  </h3>
                </div>
                <span className="text-xs bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full">
                  6 Services Listed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {HOME_SERVICES.map((srv) => {
                  const isSelected = selectedService.id === srv.id;
                  const isAvailableOnDay = srv.availableDays.includes(selectedDay.dayShort);
                  return (
                    <div
                      key={srv.id}
                      onClick={() => isAvailableOnDay && setSelectedService(srv)}
                      className={`p-4 rounded-2xl border transition-all relative flex flex-col justify-between ${
                        !isAvailableOnDay
                          ? "opacity-50 bg-slate-100 border-slate-200 cursor-not-allowed"
                          : isSelected
                          ? "bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-500/20 shadow-md cursor-pointer"
                          : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 cursor-pointer"
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <span className="text-2xl">{srv.icon}</span>
                          <span className="text-xs font-black text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            {srv.fee}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-xs mt-2.5 leading-snug">{srv.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-2">{srv.desc}</p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
                        <span className="font-bold text-slate-600">⏱ {srv.duration}</span>
                        {isAvailableOnDay ? (
                          <span className="font-black text-emerald-600 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Available {selectedDay.dayShort}
                          </span>
                        ) : (
                          <span className="font-bold text-rose-500">Not Available {selectedDay.dayShort}</span>
                        )}
                      </div>

                      {isSelected && (
                        <div className="absolute top-2 right-2 text-emerald-600">
                          <FiCheckCircle size={16} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DOCTORS SCHEDULE ON SELECTED DAY */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-150 pb-4">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-purple-600">
                    Day Schedule — Doctors on Duty
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-0.5">
                    Visiting Specialists Available ({selectedDay.label})
                  </h3>
                </div>
                <span className="text-xs text-purple-600 font-bold bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                  Licensed Doctors
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {(doctorsList.length > 0 ? doctorsList : mockDocs).slice(0, 4).map((doc) => {
                  const isSelected = selectedDoc?.id === doc.id;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDoc(doc)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 relative ${
                        isSelected
                          ? "bg-purple-50/70 border-purple-600 ring-2 ring-purple-500/20 shadow-md"
                          : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                      }`}
                    >
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[9.5px] font-extrabold uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md inline-block mb-1">
                          Home Visit On Call
                        </span>
                        <h4 className="font-extrabold text-slate-900 text-xs truncate">{doc.name}</h4>
                        <p className="text-[10.5px] text-slate-500 truncate">{doc.specialty}</p>
                        <div className="flex items-center gap-2 mt-1 text-[10px] font-bold text-amber-500">
                          <span className="flex items-center gap-1">
                            <FaStar size={10} className="fill-amber-400 text-amber-400" /> {doc.rating || "4.9"}
                          </span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-600">{doc.experience || "8+ Yrs"}</span>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="text-purple-600 shrink-0">
                          <FiCheckCircle size={18} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: AVAILABLE TIME SLOTS & APPOINTMENTS (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-5 sticky top-24">
              <div className="flex items-center justify-between border-b border-slate-150 pb-4">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-blue-600">
                    Day Schedule — Time Slots
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-0.5">
                    Available Appointment Slots
                  </h3>
                </div>
                <span className="text-xs bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-full border border-blue-200">
                  {selectedDay.dayShort} Slots
                </span>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-800 uppercase tracking-wider block">
                  Select Preferred Slot on {selectedDay.dayFull}:
                </label>
                <div className="space-y-2">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTimeSlot.id === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <FiClock size={16} className={isSelected ? "text-white" : "text-blue-600"} />
                          <div>
                            <div className="text-xs font-black">{slot.time}</div>
                            <div className={`text-[10px] font-medium ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                              {slot.period} Visit Window
                            </div>
                          </div>
                        </div>

                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : slot.status === "Fast Filling"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-700"
                        }`}>
                          {isSelected ? "Selected" : slot.status}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selection Summary Preview */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Selected Schedule:</span>
                  <span className="font-bold text-emerald-400">{selectedDay.dayFull}, {selectedDay.dateFormatted}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Selected Service:</span>
                  <span className="font-bold text-white truncate max-w-[160px]">{selectedService.title}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Selected Doctor:</span>
                  <span className="font-bold text-white truncate max-w-[160px]">{selectedDoc?.name || "Assigned Specialist"}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-400">Slot & Fee:</span>
                  <span className="font-black text-amber-400">{selectedTimeSlot.time} ({selectedService.fee})</span>
                </div>
              </div>

              <button
                type="button"
                onClick={scrollToForm}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                Proceed to Complete Patient Form <FiArrowRight />
              </button>
            </div>
          </div>

        </div>

        {/* ── SECTION 3: PROPER FORM TO CONFIRM APPOINTMENT WITH COMPLETE PATIENT DETAILS ── */}
        <section ref={formRef} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-2xl text-left space-y-8">
          
          <div className="border-b border-slate-150 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Step 2: Patient Confirmation Form
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-serif">
                Confirm Appointment & Patient Details
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Please complete patient details, home address in Islamabad/Rawalpindi, and medical condition for doctor dispatch.
              </p>
            </div>
            <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-2xl shrink-0 self-start md:self-auto">
              <span className="text-xs font-black text-emerald-700">Scheduled: {selectedDay.dayShort}, {selectedDay.dateFormatted} ({selectedTimeSlot.time})</span>
            </div>
          </div>

          {bookedSuccess ? (
            /* ── SUCCESS CONFIRMATION RECEIPT CARD ── */
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 sm:p-10 bg-emerald-50/80 border border-emerald-200 rounded-3xl space-y-6 text-center max-w-3xl mx-auto shadow-inner"
            >
              <div className="w-20 h-20 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-600/30">
                <FiCheckCircle size={44} />
              </div>

              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300">
                  Appointment Confirmed
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">Home Consultation Request Received!</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg mx-auto">
                  Reference Code: <strong className="text-emerald-700 font-mono text-base">{bookingRef}</strong>. Our home visit dispatch desk will call you shortly to confirm specialist arrival.
                </p>
              </div>

              {/* Digital Print Receipt */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 text-left text-xs space-y-3 shadow-md font-sans">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="font-black text-slate-900 text-sm">Vital Physio Hub — Doorstep Care Receipt</div>
                  <div className="font-mono font-bold text-emerald-600 text-xs">Ref: {bookingRef}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 font-medium block">Patient Name:</span>
                    <strong className="text-slate-900">{patientForm.fullName} ({patientForm.gender}, {patientForm.age} Yrs)</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Contact Phone:</span>
                    <strong className="text-slate-900">{patientForm.phone}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Scheduled Day & Time:</span>
                    <strong className="text-emerald-700">{selectedDay.dayFull}, {selectedDay.dateFormatted} ({selectedTimeSlot.time})</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Assigned Specialist:</span>
                    <strong className="text-slate-900">{selectedDoc?.name || "Assigned Specialist"}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Service Treatment:</span>
                    <strong className="text-slate-900">{selectedService.title}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Consultation Fee & Payment:</span>
                    <strong className="text-emerald-700">{selectedService.fee} ({patientForm.paymentMethod})</strong>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-3">
                  <span className="text-slate-400 font-medium block">Home Visit Address:</span>
                  <p className="text-slate-800 font-semibold mt-0.5">{patientForm.address}, {patientForm.sector} [Floor: {patientForm.floorElevator}]</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
                >
                  <FaWhatsapp size={18} /> Confirm via WhatsApp Chat
                </a>
                <button
                  onClick={resetBookingForm}
                  className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Book Another Appointment
                </button>
              </div>
            </motion.div>
          ) : (
            /* ── COMPLETE PATIENT DETAILS FORM ── */
            <form onSubmit={handleConfirmAppointment} className="space-y-8">
              
              {formError && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-bold flex items-center gap-2">
                  <FiAlertCircle size={18} /> {formError}
                </div>
              )}

              {/* 1. PATIENT PERSONAL DETAILS */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-150 pb-2">
                  <FiUser className="text-emerald-600" size={18} />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                    1. Patient Personal Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Patient Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad Ali"
                      value={patientForm.fullName}
                      onChange={(e) => setPatientForm({ ...patientForm, fullName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl text-xs outline-none focus:border-emerald-600 focus:bg-white font-medium"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Gender <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={patientForm.gender}
                      onChange={(e) => setPatientForm({ ...patientForm, gender: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-3 rounded-xl text-xs outline-none focus:border-emerald-600 focus:bg-white font-medium"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Age */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Patient Age (Years) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="120"
                      placeholder="e.g. 54"
                      value={patientForm.age}
                      onChange={(e) => setPatientForm({ ...patientForm, age: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl text-xs outline-none focus:border-emerald-600 focus:bg-white font-medium"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Contact Phone / WhatsApp <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0300 1234567"
                      value={patientForm.phone}
                      onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl text-xs outline-none focus:border-emerald-600 focus:bg-white font-medium"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. patient@example.com"
                      value={patientForm.email}
                      onChange={(e) => setPatientForm({ ...patientForm, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl text-xs outline-none focus:border-emerald-600 focus:bg-white font-medium"
                    />
                  </div>

                  {/* Emergency Contact Name */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Emergency Contact Person</label>
                    <input
                      type="text"
                      placeholder="Guardian / Attendant Name"
                      value={patientForm.emergencyContact}
                      onChange={(e) => setPatientForm({ ...patientForm, emergencyContact: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl text-xs outline-none focus:border-emerald-600 focus:bg-white font-medium"
                    />
                  </div>

                  {/* Emergency Relation */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Relation to Patient</label>
                    <select
                      value={patientForm.emergencyRelation}
                      onChange={(e) => setPatientForm({ ...patientForm, emergencyRelation: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-3 rounded-xl text-xs outline-none focus:border-emerald-600 focus:bg-white font-medium"
                    >
                      <option value="Self">Self</option>
                      <option value="Son / Daughter">Son / Daughter</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Parent">Parent</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Other Relative">Other Relative</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 2. HOME ADDRESS & LOCATION DETAILS */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-150 pb-2">
                  <FiMapPin className="text-emerald-600" size={18} />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                    2. Complete Home Address & Sector Location
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Full Address */}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      House / Flat # & Street Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. House # 14-A, Street # 32"
                      value={patientForm.address}
                      onChange={(e) => setPatientForm({ ...patientForm, address: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl text-xs outline-none focus:border-emerald-600 focus:bg-white font-medium"
                    />
                  </div>

                  {/* Sector / Area */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Sector / Area in Islamabad / Pindi <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={patientForm.sector}
                      onChange={(e) => setPatientForm({ ...patientForm, sector: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-3 rounded-xl text-xs outline-none focus:border-emerald-600 focus:bg-white font-medium"
                    >
                      {ISLAMABAD_SECTORS.map((sec, idx) => (
                        <option key={idx} value={sec}>{sec}</option>
                      ))}
                    </select>
                  </div>

                  {/* Floor & Elevator */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Floor & Elevator Status</label>
                    <select
                      value={patientForm.floorElevator}
                      onChange={(e) => setPatientForm({ ...patientForm, floorElevator: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-3 rounded-xl text-xs outline-none focus:border-emerald-600 focus:bg-white font-medium"
                    >
                      <option value="Ground Floor">Ground Floor</option>
                      <option value="Upper Floor (Elevator Available)">Upper Floor (Elevator Available)</option>
                      <option value="Upper Floor (Stairs Only)">Upper Floor (Stairs Only)</option>
                    </select>
                  </div>

                  {/* Landmark */}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">Nearby Landmark / Location Note</label>
                    <input
                      type="text"
                      placeholder="e.g. Opposite Commercial Market / Near Allied Bank"
                      value={patientForm.landmark}
                      onChange={(e) => setPatientForm({ ...patientForm, landmark: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl text-xs outline-none focus:border-emerald-600 focus:bg-white font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* 3. MEDICAL CONDITION & INSTRUCTIONS */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-150 pb-2">
                  <FiActivity className="text-emerald-600" size={18} />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                    3. Medical Condition & Mobility Status
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Primary Condition */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Primary Reason for Home Visit</label>
                    <select
                      value={patientForm.primaryCondition}
                      onChange={(e) => setPatientForm({ ...patientForm, primaryCondition: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-3 rounded-xl text-xs outline-none focus:border-emerald-600 focus:bg-white font-medium"
                    >
                      <option value="Severe Back / Neck Pain">Severe Back / Neck Pain</option>
                      <option value="Post-Stroke Paralysis Recovery">Post-Stroke Paralysis Recovery</option>
                      <option value="Knee / Hip Joint Stiffness">Knee / Hip Joint Stiffness</option>
                      <option value="Post-Surgical / Fracture Mobility">Post-Surgical / Fracture Mobility</option>
                      <option value="Elderly Balance & Fall Care">Elderly Balance & Fall Care</option>
                      <option value="Hijama & Cupping Therapy">Hijama & Cupping Therapy</option>
                    </select>
                  </div>

                  {/* Mobility Level */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Patient Mobility Level</label>
                    <select
                      value={patientForm.mobilityLevel}
                      onChange={(e) => setPatientForm({ ...patientForm, mobilityLevel: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-3 rounded-xl text-xs outline-none focus:border-emerald-600 focus:bg-white font-medium"
                    >
                      <option value="Needs Assistance to Walk">Needs Assistance to Walk</option>
                      <option value="Bedridden / Non-ambulatory">Bedridden / Non-ambulatory</option>
                      <option value="Uses Walker or Crutches">Uses Walker or Crutches</option>
                      <option value="Fully Mobile (Needs Therapy)">Fully Mobile (Needs Therapy)</option>
                    </select>
                  </div>

                  {/* Special Instructions / Notes */}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">Medical Symptoms / Special Instructions for Doctor</label>
                    <textarea
                      rows={3}
                      placeholder="Mention any past medical history, surgery dates, or specific instructions for the visiting physical therapist..."
                      value={patientForm.notes}
                      onChange={(e) => setPatientForm({ ...patientForm, notes: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 p-3.5 rounded-xl text-xs outline-none focus:border-emerald-600 focus:bg-white font-medium resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* 4. PAYMENT METHOD & CONFIRMATION ACTION */}
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-[11px] font-black uppercase text-emerald-700 tracking-wider">Final Step</span>
                    <h4 className="text-lg font-black text-slate-900">Select Preferred Payment Method</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 font-medium block">Total Consultation Fee</span>
                    <span className="text-2xl font-black text-emerald-600">{selectedService.fee}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "Cash on Arrival", label: "Cash on Arrival", desc: "Pay visiting doctor directly at home", icon: FaMoneyBillWave },
                    { id: "Easypaisa / JazzCash", label: "Easypaisa / JazzCash", desc: "Pay digitally via mobile wallet", icon: FiCheckCircle },
                    { id: "Bank Transfer", label: "Online Bank Transfer", desc: "Direct deposit to clinic account", icon: FaBuilding }
                  ].map((pm) => {
                    const isSelected = patientForm.paymentMethod === pm.id;
                    const IconC = pm.icon;
                    return (
                      <div
                        key={pm.id}
                        onClick={() => setPatientForm({ ...patientForm, paymentMethod: pm.id })}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                          isSelected
                            ? "bg-white border-emerald-600 ring-2 ring-emerald-500/20 shadow-md"
                            : "bg-white/60 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                          <IconC size={16} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{pm.label}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{pm.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-[11px] text-slate-500 font-medium text-left">
                    🔒 By confirming, your home consultation appointment will be registered and scheduled for <strong className="text-slate-900">{selectedDay.dayFull}, {selectedDay.dateFormatted}</strong> at <strong className="text-slate-900">{selectedTimeSlot.time}</strong>.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2.5 cursor-pointer transition-all hover:scale-[1.02] shrink-0"
                  >
                    <FiHome size={18} /> {isSubmitting ? "Processing..." : "Confirm & Book Home Consultation"}
                  </button>
                </div>
              </div>

            </form>
          )}

        </section>

        {/* ── KEY BENEFITS ── */}
        <section className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-left shadow-2xl">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-4xl font-extrabold font-serif">Why Choose Doorstep Home Visit Care?</h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                Hospital-grade physical therapy and rehabilitation delivered straight to your bedroom or living room.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Zero Travel Hassle", desc: "Ideal for acute back pain, post-surgical recovery, and elderly patients who cannot travel to the clinic.", icon: FiHome, grad: "from-emerald-500 to-teal-400" },
                { title: "Portable Medical Gear", desc: "Our specialists bring portable TENS machines, ultrasound units, cupping kits, and exercise accessories.", icon: FiShield, grad: "from-sky-500 to-blue-400" },
                { title: "Dedicated 1-on-1 Focus", desc: "Enjoy 60 full minutes of uninterrupted, individual physical rehabilitation with your assigned doctor.", icon: TbStethoscope, grad: "from-purple-500 to-indigo-400" },
              ].map((b, idx) => {
                const IconComp = b.icon;
                return (
                  <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 space-y-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${b.grad} flex items-center justify-center text-white shadow-md`}>
                      <IconComp size={22} />
                    </div>
                    <h3 className="font-bold text-base text-white">{b.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── HOME VISIT FAQ ── */}
        <section className="py-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
              Home Visit Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Everything you need to know about preparing for your home physical therapy appointment.
            </p>
          </div>
          <HomeFaqAccordion />
        </section>

      </main>

      
    </div>
  );
}

