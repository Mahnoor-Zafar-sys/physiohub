// src/pages/BookAppointmentPage.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import {
  FiCalendar, FiClock, FiUser, FiPhone, FiMail,
  FiCheck, FiMapPin, FiChevronDown,
  FiVideo, FiAlertCircle, FiShield,
  FiUpload, FiFileText, FiTrash2
} from "react-icons/fi";
import { FaWhatsapp, FaUserMd } from "react-icons/fa";
import { LuCalendar, LuClock, LuCreditCard, LuMapPin } from "react-icons/lu";

import { doctors as MOCK_DOCTORS } from "../data/mockData";
import { api } from "../services/api";
import Footer from "../components/Footer";

/* ─── CONSTANTS ──────────────────────────────────────────── */
const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
  "06:00 PM", "06:30 PM", "07:00 PM",
];

const CONSULTATION_TYPES = [
  { value: "in-person", label: "In-Person Visit", icon: FiUser, desc: "Visit our clinic" },
  { value: "video", label: "Video Consultation", icon: FiVideo, desc: "Online video call" },
  { value: "whatsapp", label: "WhatsApp Consult", icon: FaWhatsapp, desc: "Chat on WhatsApp" },
];

const BRANCHES = ["Gulberg", "DHA"];

const REASONS_FOR_VISIT = [
  "Routine Checkup",
  "Follow-up Visit",
  "Physiotherapy Session",
  "Chiropractic Adjustment",
  "Cupping / Hijama",
  "Pain Management",
  "Sports Injury",
  "Post-Surgery Rehab",
  "Electrotherapy",
  "Fitness Training",
  "Other",
];

const DEPARTMENTS = [
  "Physiotherapy",
  "Chiropractic",
  "Cupping Therapy",
  "Hijama Therapy",
  "Electrotherapy",
  "Kinesio Taping",
  "Fitness Training",
  "Dry Needling",
];

const UNAVAILABLE_SLOTS = ["09:30 AM", "11:00 AM", "02:30 PM", "05:00 PM", "06:30 PM"];

/* ─── HELPERS ──────────────────────────────────────────── */
const getTagFromSpecialty = (specialty) => {
  if (!specialty) return "all";
  const s = specialty.toLowerCase();
  if (s.includes("physio")) return "physiotherapy";
  if (s.includes("chiro")) return "chiropractic";
  if (s.includes("cup")) return "cupping";
  if (s.includes("hij")) return "hijama";
  if (s.includes("electro")) return "electrotherapy";
  if (s.includes("kinesio")) return "kinesio";
  if (s.includes("fit")) return "fitness";
  if (s.includes("needl")) return "needling";
  return "all";
};

const getStylesForTag = (tag) => {
  const stylesMap = {
    physiotherapy: { solidColor: "#0ea5e9" },
    chiropractic: { solidColor: "#8b5cf6" },
    cupping: { solidColor: "#0d9488" },
    hijama: { solidColor: "#4f46e5" },
    electrotherapy: { solidColor: "#dc2626" },
    kinesio: { solidColor: "#ec4899" },
    fitness: { solidColor: "#d97706" },
    needling: { solidColor: "#10b981" },
  };
  return stylesMap[tag] || { solidColor: "#0ea5e9" };
};

function getNext7Days() {
  const days = [];
  const today = new Date();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : dayNames[d.getDay()],
      date: `${d.getDate()} ${monthNames[d.getMonth()]}`,
      full: d.toLocaleDateString("en-PK", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
      dayIndex: d.getDay(),
    });
  }
  return days;
}

/* ─── CUSTOM SELECT DROPDOWN ─────────────────────────── */
function CustomSelect({ value, onChange, options, placeholder, icon: Icon }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 16px",
          borderRadius: 16,
          border: "1.5px solid #e2e8f0",
          background: "white",
          cursor: "pointer",
          fontSize: 14,
          color: value ? "#1e293b" : "#94a3b8",
          fontWeight: value ? 600 : 400,
          transition: "all 0.2s",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {Icon && <Icon size={15} style={{ color: "#94a3b8" }} />}
          {value || placeholder}
        </span>
        <FiChevronDown
          size={16}
          style={{ color: "#94a3b8", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
        />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            background: "white",
            borderRadius: 16,
            border: "1.5px solid #e2e8f0",
            boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
            zIndex: 50,
            maxHeight: 240,
            overflowY: "auto",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "11px 16px",
                border: "none",
                background: value === opt ? "linear-gradient(135deg, #e0f2fe, #fce7f3)" : "transparent",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: value === opt ? 700 : 500,
                color: value === opt ? "#0369a1" : "#475569",
                display: "block",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { if (value !== opt) e.target.style.background = "#f8fafc"; }}
              onMouseLeave={(e) => { if (value !== opt) e.target.style.background = "transparent"; }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── DATE PICKER POPOVER ───────────────────────────── */
function DatePickerField({ selectedDate, onSelect }) {
  const [open, setOpen] = useState(false);
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayNamesShort = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const startDayOfWeek = firstDayOfMonth.getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const dayCells = [];
  for (let i = 0; i < startDayOfWeek; i++) dayCells.push(null);
  for (let d = 1; d <= totalDays; d++) dayCells.push(d);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 16px",
          borderRadius: 16,
          border: "1.5px solid #e2e8f0",
          background: "white",
          cursor: "pointer",
          fontSize: 14,
          color: selectedDate ? "#1e293b" : "#94a3b8",
          fontWeight: selectedDate ? 600 : 400,
          transition: "all 0.2s",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <FiCalendar size={15} style={{ color: "#94a3b8" }} />
          {selectedDate ? selectedDate.full : "Select appointment date"}
        </span>
        <FiChevronDown
          size={16}
          style={{ color: "#94a3b8", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
        />
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
          background: "white", borderRadius: 20, border: "1.5px solid #e2e8f0",
          boxShadow: "0 16px 48px rgba(0,0,0,0.12)", zIndex: 50, padding: 20,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <button type="button"
              onClick={() => setCurrentMonthDate(new Date(year, month - 1, 1))}
              style={{ width: 32, height: 32, borderRadius: "50%", border: "none", background: "#f1f5f9", cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#475569" }}
            >◀</button>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#1e293b", textTransform: "uppercase", letterSpacing: 1 }}>
              {monthNames[month]} {year}
            </span>
            <button type="button"
              onClick={() => setCurrentMonthDate(new Date(year, month + 1, 1))}
              style={{ width: 32, height: 32, borderRadius: "50%", border: "none", background: "#f1f5f9", cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#475569" }}
            >▶</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, textAlign: "center", marginBottom: 6 }}>
            {dayNamesShort.map(n => (
              <span key={n} style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>{n}</span>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3, textAlign: "center" }}>
            {dayCells.map((dayNum, idx) => {
              if (dayNum === null) return <div key={`e-${idx}`} />;
              const dateObj = new Date(year, month, dayNum);
              const isPast = dateObj < new Date(new Date().setHours(0, 0, 0, 0));
              const shortMonth = shortMonthNames[month];
              const dateStr = `${dayNum} ${shortMonth}`;
              const fullStr = dateObj.toLocaleDateString("en-PK", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
              const isSelected = selectedDate && selectedDate.date === dateStr;
              return (
                <button key={`d-${dayNum}`} type="button" disabled={isPast}
                  onClick={() => { onSelect({ date: dateStr, full: fullStr, label: dateStr }); setOpen(false); }}
                  style={{
                    height: 36, borderRadius: 10, border: "none", cursor: isPast ? "not-allowed" : "pointer",
                    fontSize: 12, fontWeight: isSelected ? 800 : 600,
                    background: isSelected ? "linear-gradient(135deg, #0ea5e9, #db2777)" : isPast ? "transparent" : "#f8fafc",
                    color: isSelected ? "white" : isPast ? "#cbd5e1" : "#334155",
                    transition: "all 0.15s",
                  }}
                >{dayNum}</button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── TIME PICKER POPOVER ───────────────────────────── */
function TimePickerField({ selectedTime, onSelect, appointments, doctor, selectedDate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 16px",
          borderRadius: 16,
          border: "1.5px solid #e2e8f0",
          background: "white",
          cursor: "pointer",
          fontSize: 14,
          color: selectedTime ? "#1e293b" : "#94a3b8",
          fontWeight: selectedTime ? 600 : 400,
          transition: "all 0.2s",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <FiClock size={15} style={{ color: "#94a3b8" }} />
          {selectedTime || "Select preferred time"}
        </span>
        <FiChevronDown
          size={16}
          style={{ color: "#94a3b8", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
        />
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, minWidth: 280,
          background: "white", borderRadius: 20, border: "1.5px solid #e2e8f0",
          boxShadow: "0 16px 48px rgba(0,0,0,0.12)", zIndex: 50, padding: 16,
        }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            Available Time Slots
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
            {TIME_SLOTS.map(slot => {
              const busy = UNAVAILABLE_SLOTS.includes(slot);
              const booked = doctor && selectedDate ? appointments.some(appt =>
                appt.doctor === doctor.name &&
                appt.date?.toLowerCase().includes(selectedDate.date?.toLowerCase()) &&
                appt.time === slot &&
                appt.status !== "Cancelled"
              ) : false;
              const disabled = busy || booked;
              const active = selectedTime === slot;
              return (
                <button key={slot} type="button" disabled={disabled}
                  onClick={() => { onSelect(slot); setOpen(false); }}
                  style={{
                    padding: "8px 4px", borderRadius: 10, border: "none", cursor: disabled ? "not-allowed" : "pointer",
                    fontSize: 11, fontWeight: active ? 800 : 600,
                    background: active ? "linear-gradient(135deg, #0ea5e9, #db2777)" : disabled ? "#f8fafc" : "white",
                    color: active ? "white" : disabled ? "#cbd5e1" : "#475569",
                    textDecoration: busy && !booked ? "line-through" : "none",
                    boxShadow: active ? "0 4px 12px rgba(14,165,233,0.3)" : "none",
                    transition: "all 0.15s",
                  }}
                >{slot}</button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── SUCCESS VIEW ─────────────────────────────────── */
function SuccessView({ doctor, day, time, consultType, form }) {
  const navigate = useNavigate();
  const bookingRef = `PC-${Date.now().toString().slice(-6)}`;
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAlert(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  let startFormat = "";
  let endFormat = "";
  let googleCalendarUrl = "";

  try {
    const year = new Date().getFullYear();
    const datePart = day.date;
    const timePart = time;
    const [hourStr, minStrPart] = timePart.split(":");
    const [minStr, ampm] = minStrPart.split(" ");
    let hour = parseInt(hourStr);
    if (ampm === "PM" && hour < 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;
    const minutes = parseInt(minStr);
    const [dayNum, monthName] = datePart.split(" ");
    const months = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
    const monthNum = months[monthName] || 0;
    const dayInt = parseInt(dayNum) || 1;
    const apptDate = new Date(year, monthNum, dayInt, hour, minutes);
    const pad = (n) => String(n).padStart(2, "0");
    startFormat = `${apptDate.getFullYear()}${pad(apptDate.getMonth() + 1)}${pad(apptDate.getDate())}T${pad(apptDate.getHours())}${pad(apptDate.getMinutes())}00`;
    const endDate = new Date(apptDate.getTime() + 30 * 60 * 1000);
    endFormat = `${endDate.getFullYear()}${pad(endDate.getMonth() + 1)}${pad(endDate.getDate())}T${pad(endDate.getHours())}${pad(endDate.getMinutes())}00`;
    googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Appointment with ${doctor.name}`)}&dates=${startFormat}/${endFormat}&details=${encodeURIComponent(`Consultation with ${doctor.name}\nPatient: ${form.name}\nRef: ${bookingRef}\nMode: ${consultType}`)}&location=${encodeURIComponent(consultType === "in-person" ? "Vital Physio Hub, Plaza 56, Block L, Blue Area, Islamabad" : "Online HD Video Consult")}`;
  } catch (err) {
    console.error("Error generating calendar links:", err);
  }

  const handleDownloadICS = () => {
    try {
      const calendarData = [
        "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Vital Physio Hub//NONSGML Appointment System//EN",
        "BEGIN:VEVENT",
        `UID:${bookingRef}-${Date.now()}@vitalphysiohub.com`,
        `SUMMARY:Doctor Appointment: ${doctor.name}`,
        `DESCRIPTION:Your appointment is scheduled with ${doctor.name} (${doctor.specialty}). Patient: ${form.name}. Reference: ${bookingRef}.`,
        `LOCATION:${consultType === "in-person" ? "Vital Physio Hub, Plaza 56, Block L, Blue Area, Islamabad" : "Online Video Consult"}`,
        `DTSTART:${startFormat}`, `DTEND:${endFormat}`,
        "END:VEVENT", "END:VCALENDAR"
      ].join("\n");
      const blob = new Blob([calendarData], { type: "text/calendar;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `appointment-${bookingRef}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert("Failed to download calendar invite file.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
      className="flex flex-col items-center text-center py-8"
    >
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
            className="fixed top-24 right-4 z-[200] max-w-sm w-full bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-800 flex gap-3 text-left items-start"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-md shadow-emerald-500/20">
              <FaWhatsapp size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-black uppercase tracking-wider text-emerald-400">WhatsApp Notification</span>
                <button onClick={() => setShowAlert(false)} className="text-slate-400 hover:text-white text-xs bg-transparent border-none cursor-pointer p-0.5">✕</button>
              </div>
              <p className="text-[11px] font-bold text-slate-100">Booking Verification Initialized, Vital Physio Hub</p>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                Dear <strong>{form.name}</strong>, your slot with <strong>{doctor.name}</strong> on <strong>{day.date}</strong> at <strong>{time}</strong> has been submitted. It is pending admin payment verification. Ref: <strong>{bookingRef}</strong>.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative mb-8">
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
          className="w-24 h-24 rounded-full flex items-center justify-center shadow-xl"
          style={{ background: "linear-gradient(135deg,#0ea5e9,#db2777)" }}
        >
          <FiCheck size={44} className="text-white" strokeWidth={3} />
        </motion.div>
        {[1, 2].map(i => (
          <motion.div key={i}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 1.5 + i * 0.5, opacity: 0 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.8 }}
            className="absolute inset-0 rounded-full border-2 border-pink-400" />
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="w-full max-w-md animate-none">
        <h2 className="text-2xl font-extrabold text-slate-800 mb-1">Booking Pending Verification</h2>
        <p className="text-sm text-slate-400 mb-1">
          Booking Reference: <span className="font-extrabold text-sky-600">{bookingRef}</span>
        </p>
        <p className="text-sm text-slate-500 mb-8">Your slot is reserved. Once the admin verifies your payment, it will be forwarded to {doctor.name}'s workspace queue.</p>
        <div className="w-full p-5 rounded-2xl text-left mb-5" style={{ background: "linear-gradient(135deg,#e0f2fe 0%,#fce7f3 100%)" }}>
          <div className="flex items-center gap-4 mb-4">
            <img src={doctor.image} alt={doctor.name} className="w-12 h-12 rounded-2xl object-cover object-top shadow-sm" />
            <div>
              <p className="font-extrabold text-slate-800">{doctor.name}</p>
              <p className="text-xs text-slate-500">{doctor.specialty}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: LuCalendar, label: "Date", value: day.label === day.date ? day.date : `${day.label}, ${day.date}` },
              { icon: LuClock, label: "Time", value: time },
              { icon: LuCreditCard, label: "Fee", value: doctor.fee },
              { icon: LuMapPin, label: "Mode", value: CONSULTATION_TYPES.find(c => c.value === consultType)?.label },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white/70 rounded-xl px-3 py-2.5">
                <div className="flex items-center gap-1.5 text-slate-400 mb-0.5">
                  <Icon size={12} className="text-sky-500" />
                  <p className="text-[9px] font-bold uppercase">{label}</p>
                </div>
                <p className="text-xs font-extrabold text-slate-700">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col gap-2.5 mb-6 text-left shadow-sm">
          <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
            <LuCalendar size={11} className="text-pink-500 animate-pulse" /> Add to Calendar Schedule
          </p>
          <div className="flex gap-2.5">
            <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer"
              className="flex-1 py-2 px-3 bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-600 rounded-xl text-xs font-bold border border-slate-100 flex items-center justify-center gap-1.5 transition-colors"
              style={{ textDecoration: "none" }}
            >Add to Google</a>
            <button onClick={handleDownloadICS}
              className="flex-1 py-2 px-3 bg-slate-50 hover:bg-pink-50 text-slate-700 hover:text-pink-600 rounded-xl text-xs font-bold border border-slate-100 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >Download iCal/ICS</button>
          </div>
        </div>
        <div className="flex gap-3 w-full">
          <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            href={`https://wa.me/923008786187?text=${encodeURIComponent(`Hello! I just booked an appointment.\nRef: ${bookingRef}\nDoctor: ${doctor.name}\nDate: ${day.label}, ${day.date}\nTime: ${time}\nName: ${form.name}\nPhone: ${form.phone}`)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#25D366] text-white text-sm font-extrabold shadow-md"
            style={{ textDecoration: "none" }}
          ><FaWhatsapp size={17} /> WhatsApp Confirm</motion.a>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/")}
            className="flex-1 py-3.5 rounded-2xl text-white text-sm font-extrabold shadow-md border-none cursor-pointer"
            style={{ background: "linear-gradient(135deg,#0ea5e9,#db2777)" }}
          >Back to Home</motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function BookAppointmentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState(() => localStorage.getItem("pc_user_role") || null);
  const [authForm, setAuthForm] = useState({ email: "patient@premiumclinic.com", password: "password123", role: "patient" });
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    const res = await api.login(authForm.email, authForm.password, authForm.role);
    if (res && res.success) {
      setUserRole(res.user.role);
      localStorage.setItem("pc_user_role", res.user.role);
    } else {
      setLoginError(res?.error || "Invalid credentials or role selected.");
    }
  };

  /* ─── AUTH GATE ─── */
  if (!userRole) {
    return (
      <div className="min-h-screen font-sans flex flex-col justify-center items-center p-4" style={{ background: "linear-gradient(135deg, #fce4ec 0%, #e0f2fe 60%, #fdf4ff 100%)" }}>
        <div className="max-w-md w-full bg-white/70 backdrop-blur-md rounded-3xl border border-white/50 shadow-2xl overflow-hidden text-left">
          <div className="h-1.5 w-full bg-gradient-to-r from-sky-400 to-pink-500" />
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg mb-4">
                <FiShield size={24} />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">Authorization Required</h2>
              <p className="text-xs text-slate-400 mt-1">Please authorize your profile to schedule an appointment</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="p-3 bg-rose-50 text-rose-700 rounded-xl border border-rose-100 text-[11px] font-bold flex items-center gap-1.5">
                  <FiAlertCircle className="shrink-0" />{loginError}
                </div>
              )}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Select Role Profile</label>
                <select value={authForm.role}
                  onChange={e => {
                    const r = e.target.value;
                    setAuthForm({
                      role: r,
                      email: r === "patient" ? "patient@premiumclinic.com" : r === "doctor" ? "doctor@premiumclinic.com" : r === "admin" ? "admin@premiumclinic.com" : "staff@premiumclinic.com",
                      password: "password123"
                    });
                  }}
                  className="w-full border border-slate-200 bg-white rounded-xl p-3 text-xs outline-none focus:border-pink-400 transition-colors"
                >
                  <option value="patient">Patient Portal (Jane Doe)</option>
                  <option value="doctor">Doctor Portal (Dr. Sarah Ahmed)</option>
                  <option value="admin">Administrator Dashboard (Clinical Analytics)</option>
                  <option value="receptionist">Receptionist / Staff Desk</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Email Address</label>
                <input type="email" required value={authForm.email}
                  onChange={e => setAuthForm({ ...authForm, email: e.target.value })}
                  className="w-full border border-slate-200 bg-white text-slate-800 rounded-xl p-3 text-xs outline-none focus:border-pink-400 transition-colors"
                  placeholder="e.g. patient@premiumclinic.com" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Password</label>
                <input type="password" required value={authForm.password}
                  onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
                  className="w-full border border-slate-200 bg-white text-slate-800 rounded-xl p-3 text-xs outline-none focus:border-pink-400 transition-colors"
                  placeholder="e.g. password123" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit"
                  className="flex-1 py-3.5 bg-slate-900 hover:bg-pink-600 text-white text-xs font-bold rounded-xl shadow-md transition-colors border-none cursor-pointer flex items-center justify-center gap-1.5"
                >Authorize & Book</button>
                <button type="button" onClick={() => navigate("/")}
                  className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl border-none cursor-pointer"
                >Home</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  /* ─── MAIN BOOKING STATE ─── */
  const preselectedDoctor = location.state?.doctor || null;
  const [form, setForm] = useState({ name: "", phone: "", medicalRecord: "", reason: "", department: "", notes: "", email: "", age: "", gender: "", isNew: "new" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(preselectedDoctor);
  const [selectedCustomDate, setSelectedCustomDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [consultType, setConsultType] = useState("in-person");
  const [selectedBranch, setSelectedBranch] = useState("Gulberg");

  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("Easypaisa");
  const [verificationMode, setVerificationMode] = useState("manual");
  const [txnRef, setTxnRef] = useState("");
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [screenshotBase64, setScreenshotBase64] = useState("");
  const [reportBase64, setReportBase64] = useState("");
  const [reportName, setReportName] = useState("");

  const days = getNext7Days();

  const handleScreenshotChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) { alert("File size is too large. Please select an image under 1MB."); return; }
      const reader = new FileReader();
      reader.onloadend = () => { setScreenshotPreview(reader.result); setScreenshotBase64(reader.result); };
      reader.readAsDataURL(file);
    }
  };

  const handleReportChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setReportBase64(reader.result); setReportName(file.name); };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveReport = () => { setReportBase64(""); setReportName(""); };

  useEffect(() => {
    api.getAppointments().then(res => { if (res) setAppointments(res); });
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      const dbDocs = await api.getDoctors();
      const mergedDocs = dbDocs.map(dbDoc => {
        const mockDoc = MOCK_DOCTORS.find(m => m.name.toLowerCase() === dbDoc.name.toLowerCase());
        let branches = ["Gulberg", "DHA"];
        if (typeof dbDoc.branch === "string") branches = dbDoc.branch.split(",").map(b => b.trim());
        else if (Array.isArray(dbDoc.branch)) branches = dbDoc.branch;
        return {
          id: dbDoc.id, name: dbDoc.name, specialty: dbDoc.specialty, fee: dbDoc.fee,
          branch: branches, status: dbDoc.status || "Active",
          slug: dbDoc.slug || mockDoc?.slug || dbDoc.name.toLowerCase().replace(/\s+/g, "-"),
          title: dbDoc.title || mockDoc?.title || "Consultant Specialist",
          tag: mockDoc?.tag || getTagFromSpecialty(dbDoc.specialty),
          image: dbDoc.image || mockDoc?.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
          experience: dbDoc.experience || mockDoc?.experience || "10 Years",
          patients: mockDoc?.patients || "5,000+",
          rating: dbDoc.rating || mockDoc?.rating || 4.8,
          reviews: mockDoc?.reviews || 120,
          languages: mockDoc?.languages || ["Urdu", "English"],
          available: dbDoc.status === "Active" ? (mockDoc?.available !== undefined ? mockDoc.available : true) : false,
          nextSlot: mockDoc?.nextSlot || "Today, 4:00 PM",
          gender: mockDoc?.gender || "Female",
          schedule: mockDoc?.schedule || ["Mon 10AM–2PM", "Wed 3PM–7PM", "Fri 10AM–1PM"],
          solidColor: mockDoc?.solidColor || getStylesForTag(mockDoc?.tag || getTagFromSpecialty(dbDoc.specialty)).solidColor,
        };
      });
      setDoctors(mergedDocs.filter(d => d.status === "Active"));
    };
    fetchDoctors();
  }, []);

  const update = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: undefined }));
  };

  function validateForm() {
    const e = {};
    if (!form.name.trim()) e.name = "Patient full name is required.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    else if (!/^(\+92|0)3[0-9]{9}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Enter a valid Pakistani phone number.";
    if (!selectedCustomDate) e.date = "Please select a date.";
    if (!selectedTime) e.time = "Please select a time.";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const handleFormSubmitClick = () => {
    if (validateForm()) setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const patientName = form.name || "Jane Doe";
    const dateInfo = selectedCustomDate || days[0];
    await api.createAppointment({
      doctor: selectedDoctor?.name || form.department || "General",
      date: dateInfo.date,
      time: selectedTime,
      type: consultType === "in-person" ? "In-Person Visit" : consultType === "video" ? "Video Consultation" : "WhatsApp Consult",
      branch: selectedBranch + " Branch",
      status: "Pending",
      payment_status: "Pending Verification",
      patient: patientName,
      payment_method: selectedMethod,
      payment_screenshot: screenshotBase64 || txnRef,
      patient_report: reportBase64 || null,
      patient_report_name: reportName || null,
    });
    await api.createInvoice({
      patientName: patientName,
      description: `Consultation Booking${selectedDoctor ? ` - ${selectedDoctor.name}` : ""}`,
      amount: selectedDoctor?.fee || "Rs. 3,000",
      status: "Unpaid",
    });
    setShowPaymentModal(false);
    setSubmitted(true);
  };

  // Build doctor options for the Department/Doctor select
  const doctorOptions = doctors.map(d => d.name);

  /* ═══════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════ */
  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#f8fafc" }}>
      <Navbar />

      {/* ════════════════════════════════════════════════════
          HERO BANNER (Inspired by the reference image)
          ════════════════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 30%, #e0f2fe 60%, #f0f9ff 100%)",
        paddingTop: 100,
      }}>
        {/* Decorative wave SVG at bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
            <path d="M0 40C240 100 480 0 720 60C960 120 1200 20 1440 80V120H0V40Z" fill="#f8fafc" />
          </svg>
        </div>

        {/* Decorative blobs */}
        <div style={{
          position: "absolute", top: -80, right: -60, width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(14,165,233,0.15), transparent 70%)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 20, left: -40, width: 200, height: 200, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(219,39,119,0.1), transparent 70%)", pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap", position: "relative", zIndex: 2 }}>
          {/* Left side: Doctor image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ flex: "0 0 auto", maxWidth: 380, position: "relative" }}
          >
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80"
              alt="Professional Doctor"
              style={{
                width: "100%",
                maxHeight: 380,
                objectFit: "cover",
                objectPosition: "top",
                borderRadius: "24px 24px 0 0",
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.08))",
              }}
            />
            {/* Floating badge: Doctors Online */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{
                position: "absolute",
                bottom: 24,
                left: 16,
                background: "white",
                borderRadius: 40,
                padding: "8px 18px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: 28, height: 28, borderRadius: "50%", border: "2px solid white",
                    background: `linear-gradient(135deg, ${["#0ea5e9", "#ec4899", "#8b5cf6"][i]}, ${["#38bdf8", "#f472b6", "#a78bfa"][i]})`,
                    marginLeft: i > 0 ? -8 : 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, color: "white", fontWeight: 700,
                  }}>
                    <FaUserMd size={14} className="text-white" />
                  </div>
                ))}
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 800, color: "#0ea5e9", margin: 0, lineHeight: 1.2 }}>
                  {doctors.length > 0 ? `${doctors.length}+` : "10+"} Doctors Online
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side: Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            style={{ flex: 1, minWidth: 280, paddingBottom: 60 }}
          >
            <h1 style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 900,
              color: "#0c4a6e",
              lineHeight: 1.15,
              margin: "0 0 16px 0",
              fontStyle: "italic",
            }}>
              Don't Let Your Health<br />Take a Backseat!
            </h1>
            <p style={{
              fontSize: "clamp(14px, 1.6vw, 17px)",
              color: "#64748b",
              lineHeight: 1.7,
              maxWidth: 420,
              margin: 0,
            }}>
              Fill out the appointment form below to schedule a consultation with one of our healthcare professionals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          MAIN CONTENT: Form + Contact Info (Two Column)
          ════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 64px" }}>
        {submitted ? (
          <SuccessView
            doctor={selectedDoctor || { name: form.department || "General", specialty: form.department || "Consultation", fee: "Rs. 3,000", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80", solidColor: "#0ea5e9" }}
            day={selectedCustomDate || days[0]}
            time={selectedTime}
            consultType={consultType}
            form={form}
          />
        ) : (
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap", alignItems: "flex-start" }}>
            {/* ── LEFT COLUMN: Appointment Form ── */}
            <div style={{ flex: "1 1 520px", minWidth: 0 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: "#0f172a", margin: "0 0 32px 0" }}>
                Appointment
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* Row 1: Name + Phone */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Name</label>
                    <div style={{ position: "relative" }}>
                      <FiUser size={15} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                      <input
                        value={form.name}
                        onChange={e => update("name", e.target.value)}
                        placeholder="David John"
                        style={{
                          ...inputStyle,
                          paddingLeft: 42,
                          borderColor: errors.name ? "#fca5a5" : "#e2e8f0",
                          background: errors.name ? "#fef2f2" : "white",
                        }}
                      />
                    </div>
                    {errors.name && <p style={errorStyle}><FiAlertCircle size={11} /> {errors.name}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <div style={{ position: "relative" }}>
                      <FiPhone size={15} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                      <input
                        value={form.phone}
                        onChange={e => update("phone", e.target.value)}
                        placeholder="(123) 456 - 789"
                        style={{
                          ...inputStyle,
                          paddingLeft: 42,
                          borderColor: errors.phone ? "#fca5a5" : "#e2e8f0",
                          background: errors.phone ? "#fef2f2" : "white",
                        }}
                      />
                    </div>
                    {errors.phone && <p style={errorStyle}><FiAlertCircle size={11} /> {errors.phone}</p>}
                  </div>
                </div>

                {/* Row 2: Medical Record Number */}
                <div>
                  <label style={labelStyle}>Medical Record Number</label>
                  <div style={{ position: "relative" }}>
                    <FiFileText size={15} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                    <input
                      value={form.medicalRecord}
                      onChange={e => update("medicalRecord", e.target.value)}
                      placeholder="12345-7890-0987"
                      style={{ ...inputStyle, paddingLeft: 42 }}
                    />
                  </div>
                </div>

                {/* Row 3: Email */}
                <div>
                  <label style={labelStyle}>Email Address <span style={{ color: "#94a3b8", fontWeight: 400 }}>(optional)</span></label>
                  <div style={{ position: "relative" }}>
                    <FiMail size={15} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                    <input
                      value={form.email}
                      onChange={e => update("email", e.target.value)}
                      placeholder="your@email.com"
                      style={{
                        ...inputStyle,
                        paddingLeft: 42,
                        borderColor: errors.email ? "#fca5a5" : "#e2e8f0",
                        background: errors.email ? "#fef2f2" : "white",
                      }}
                    />
                  </div>
                  {errors.email && <p style={errorStyle}><FiAlertCircle size={11} /> {errors.email}</p>}
                </div>

                {/* Row 4: Reason for Visit + Department */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Reason for Visit</label>
                    <CustomSelect
                      value={form.reason}
                      onChange={(val) => update("reason", val)}
                      options={REASONS_FOR_VISIT}
                      placeholder="Routine Checkup"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Department</label>
                    <CustomSelect
                      value={form.department}
                      onChange={(val) => update("department", val)}
                      options={DEPARTMENTS}
                      placeholder="Select Department"
                    />
                  </div>
                </div>

                {/* Row 5: Select Doctor (dynamic from DB) */}
                {doctors.length > 0 && (
                  <div>
                    <label style={labelStyle}>Select Doctor</label>
                    <CustomSelect
                      value={selectedDoctor?.name || ""}
                      onChange={(val) => {
                        const doc = doctors.find(d => d.name === val);
                        setSelectedDoctor(doc || null);
                      }}
                      options={doctorOptions}
                      placeholder="Choose your specialist"
                      icon={FiUser}
                    />
                  </div>
                )}

                {/* Row 6: Consultation Type */}
                <div>
                  <label style={labelStyle}>Consultation Type</label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                    {CONSULTATION_TYPES.map(ct => {
                      const Icon = ct.icon;
                      const active = consultType === ct.value;
                      return (
                        <button
                          key={ct.value}
                          type="button"
                          onClick={() => setConsultType(ct.value)}
                          style={{
                            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                            padding: "14px 8px", borderRadius: 16,
                            border: active ? "2px solid #0ea5e9" : "1.5px solid #e2e8f0",
                            background: active ? "linear-gradient(135deg, #e0f2fe, #fce7f3)" : "white",
                            cursor: "pointer", transition: "all 0.2s", textAlign: "center",
                          }}
                        >
                          <div style={{
                            width: 36, height: 36, borderRadius: 10,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            background: active ? "linear-gradient(135deg, #0ea5e9, #db2777)" : "#f1f5f9",
                          }}>
                            <Icon size={16} style={{ color: active ? "white" : "#94a3b8" }} />
                          </div>
                          <span style={{ fontSize: 11, fontWeight: 700, color: active ? "#0369a1" : "#64748b" }}>{ct.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Branch selector (in-person) */}
                {consultType === "in-person" && (
                  <div>
                    <label style={labelStyle}>Select Branch</label>
                    <div style={{ display: "flex", gap: 12 }}>
                      {BRANCHES.map(b => (
                        <button key={b} type="button" onClick={() => setSelectedBranch(b)}
                          style={{
                            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                            padding: "12px 16px", borderRadius: 14,
                            border: selectedBranch === b ? "2px solid #0ea5e9" : "1.5px solid #e2e8f0",
                            background: selectedBranch === b ? "#e0f2fe" : "white",
                            cursor: "pointer", fontSize: 13, fontWeight: 700,
                            color: selectedBranch === b ? "#0369a1" : "#64748b",
                            transition: "all 0.2s",
                          }}
                        >
                          <FiMapPin size={14} /> {b}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Row 7: Preferred Date + Preferred Time */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Preferred Date</label>
                    <DatePickerField
                      selectedDate={selectedCustomDate}
                      onSelect={(d) => { setSelectedCustomDate(d); setSelectedTime(null); }}
                    />
                    {errors.date && <p style={errorStyle}><FiAlertCircle size={11} /> {errors.date}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Preferred Time</label>
                    <TimePickerField
                      selectedTime={selectedTime}
                      onSelect={setSelectedTime}
                      appointments={appointments}
                      doctor={selectedDoctor}
                      selectedDate={selectedCustomDate}
                    />
                    {errors.time && <p style={errorStyle}><FiAlertCircle size={11} /> {errors.time}</p>}
                  </div>
                </div>

                {/* Row 8: Notes */}
                <div>
                  <label style={labelStyle}>Symptoms / Notes <span style={{ color: "#94a3b8", fontWeight: 400 }}>(optional)</span></label>
                  <textarea
                    value={form.notes}
                    onChange={e => update("notes", e.target.value)}
                    rows={3}
                    placeholder="Briefly describe your symptoms or reason for visit..."
                    style={{ ...inputStyle, resize: "none", minHeight: 80 }}
                  />
                </div>

                {/* Row 9: Upload Reports */}
                <div>
                  <label style={labelStyle}>Upload Medical Reports <span style={{ color: "#94a3b8", fontWeight: 400 }}>(optional)</span></label>
                  <div style={{ position: "relative" }}>
                    <input type="file" onChange={handleReportChange}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer", zIndex: 10 }} />
                    <div style={{
                      border: "2px dashed #e2e8f0", borderRadius: 16, padding: "20px 16px",
                      textAlign: "center", background: "#fafbfc", display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center", gap: 6, transition: "border-color 0.2s",
                    }}>
                      <FiUpload size={22} style={{ color: "#94a3b8" }} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#475569" }}>Choose files or drag & drop</span>
                      <span style={{ fontSize: 11, color: "#94a3b8" }}>PDFs, Word documents, images, or test reports</span>
                    </div>
                  </div>
                  {reportName && (
                    <div style={{
                      marginTop: 10, padding: "12px 16px", background: "#f8fafc", borderRadius: 14,
                      border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        {reportBase64.startsWith("data:image/") ? (
                          <img src={reportBase64} alt="Report" style={{ width: 40, height: 40, borderRadius: 10, objectFit: "cover" }} />
                        ) : (
                          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#e0f2fe", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <FiFileText size={18} style={{ color: "#0ea5e9" }} />
                          </div>
                        )}
                        <div>
                          <p style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", margin: 0 }}>{reportName}</p>
                          <p style={{ fontSize: 10, color: "#94a3b8", margin: 0 }}>Attached medical file</p>
                        </div>
                      </div>
                      <button type="button" onClick={handleRemoveReport}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: 6, borderRadius: 8, color: "#94a3b8" }}>
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(14,165,233,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleFormSubmitClick}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "16px 36px",
                    background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                    color: "white",
                    border: "none",
                    borderRadius: 50,
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(14,165,233,0.25)",
                    transition: "all 0.3s",
                    alignSelf: "flex-start",
                    marginTop: 8,
                  }}
                >
                  Submit <FiChevronDown size={16} style={{ transform: "rotate(-90deg)" }} />
                </motion.button>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Contact Info ── */}
            <div style={{ flex: "0 0 340px", minWidth: 0 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: "#0f172a", margin: "0 0 32px 0" }}>
                Contact Info
              </h2>

              {/* Contact image */}
              <div style={{
                borderRadius: 20,
                overflow: "hidden",
                marginBottom: 32,
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
              }}>
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80"
                  alt="Healthcare professional"
                  style={{ width: "100%", height: 220, objectFit: "cover" }}
                />
              </div>

              {/* Contact details */}
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", margin: "0 0 6px 0", display: "flex", alignItems: "center", gap: 8 }}>
                    <FiPhone size={16} style={{ color: "#0ea5e9" }} /> Phone
                  </h3>
                  <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>+92 300 8786187</p>
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", margin: "0 0 6px 0", display: "flex", alignItems: "center", gap: 8 }}>
                    <FiMail size={16} style={{ color: "#0ea5e9" }} /> Email Us
                  </h3>
                  <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>contact@vitalphysiohub.com</p>
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", margin: "0 0 6px 0", display: "flex", alignItems: "center", gap: 8 }}>
                    <FiMapPin size={16} style={{ color: "#0ea5e9" }} /> Our Location
                  </h3>
                  <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
                    Plaza 56, Block L, Blue Area,<br />Islamabad, Pakistan
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", margin: "0 0 6px 0", display: "flex", alignItems: "center", gap: 8 }}>
                    <FiClock size={16} style={{ color: "#0ea5e9" }} /> Working Hours
                  </h3>
                  <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>Monday - Saturday, 9AM - 9PM</p>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="https://wa.me/923008786187?text=Hello!%20I%20would%20like%20to%20book%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  marginTop: 32, padding: "14px 24px", borderRadius: 50,
                  background: "#25D366", color: "white",
                  fontWeight: 700, fontSize: 14,
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(37,211,102,0.3)",
                  transition: "all 0.3s",
                }}
              >
                <FaWhatsapp size={20} /> Chat on WhatsApp
              </motion.a>
            </div>
          </div>
        )}
      </div>

      {/* ═══ PAYMENT MODAL ═══ */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 max-w-lg w-full text-slate-800 shadow-2xl relative border border-white/50 overflow-y-auto max-h-[90vh]"
            >
              <button onClick={() => setShowPaymentModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center text-slate-500 transition-colors border-none cursor-pointer"
              >✕</button>
              <div className="text-center pb-4 border-b border-slate-100">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg mb-3">
                  <FiShield size={22} />
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg">Secure Local Payment Gateway</h3>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Fee Amount: <span className="font-black text-pink-600">{selectedDoctor?.fee || "Rs. 3,000"}</span></p>
              </div>
              <form onSubmit={handlePaymentSubmit} className="space-y-5 mt-6 text-left">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2.5">Select Payment Method</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "Easypaisa", color: "border-emerald-500 text-emerald-600 bg-emerald-50/30", brand: "Easypaisa" },
                      { name: "JazzCash", color: "border-yellow-500 text-yellow-600 bg-yellow-50/30", brand: "JazzCash" },
                      { name: "SadaPay", color: "border-teal-500 text-teal-600 bg-teal-50/30", brand: "SadaPay" },
                      { name: "Bank Transfer", color: "border-blue-500 text-blue-600 bg-blue-50/30", brand: "Bank Account" },
                    ].map((method) => {
                      const isSelected = selectedMethod === method.name;
                      return (
                        <button key={method.name} type="button" onClick={() => setSelectedMethod(method.name)}
                          className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between h-20 w-full cursor-pointer ${isSelected ? `${method.color} border-2 shadow-sm font-bold` : "border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50"}`}
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{method.brand}</span>
                          <span className="text-xs font-extrabold text-slate-800">{method.name}</span>
                          {isSelected && (
                            <div className="absolute right-2 top-2 w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center text-[8px]">✓</div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Recipient Info</span>
                    <span className="px-2 py-0.5 bg-slate-200 rounded text-[9px] font-bold text-slate-600">{selectedMethod}</span>
                  </div>
                  {selectedMethod === "Bank Transfer" ? (
                    <div className="space-y-1 text-slate-700 text-xs">
                      <p className="font-extrabold text-slate-900">Bank: <span className="font-normal text-slate-600">Allied Bank Limited (ABL)</span></p>
                      <p className="font-extrabold text-slate-900">Account Title: <span className="font-normal text-slate-600">Vital Physio Hub (Pvt) Ltd</span></p>
                      <p className="font-extrabold text-slate-900">IBAN / Account #: <span className="font-mono bg-white px-1.5 py-0.5 border border-slate-200 rounded text-pink-600 font-bold select-all">PK12ALBL0012345678901234</span></p>
                    </div>
                  ) : (
                    <div className="space-y-1 text-slate-700 text-xs">
                      <p className="font-extrabold text-slate-900">Account Title: <span className="font-normal text-slate-600">Vital Physio Hub</span></p>
                      <p className="font-extrabold text-slate-900">Mobile Wallet Number: <span className="font-mono bg-white px-1.5 py-0.5 border border-slate-200 rounded text-pink-600 font-bold select-all">0300-8786187</span></p>
                    </div>
                  )}
                  <p className="text-[10px] text-slate-400 mt-1 italic">
                    {selectedMethod === "Bank Transfer"
                      ? "Please perform an IBAN bank transfer from your mobile banking app."
                      : `Please send the consultation fee (${selectedDoctor?.fee || "Rs. 3,000"}) to the wallet number above.`}
                  </p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-2">Verification Protocol</label>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setVerificationMode("manual")}
                      className={`flex-1 py-3 px-4 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${verificationMode === "manual" ? "bg-slate-900 text-white border-slate-900" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                    >Manual Receipt Check</button>
                    <button type="button" disabled
                      className="flex-1 py-3 px-4 rounded-xl border border-slate-100 text-slate-300 text-center text-xs font-medium cursor-not-allowed flex items-center justify-center gap-1 bg-slate-50/50"
                      title="Automated payment check is coming soon!"
                    >Auto Verify <span className="text-[9px] bg-slate-200 text-slate-500 font-bold px-1.5 py-0.5 rounded leading-none">Soon</span></button>
                  </div>
                </div>
                <div className="space-y-4 pt-1 border-t border-slate-100">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Transaction ID / Reference ID</label>
                    <input type="text" required value={txnRef} onChange={e => setTxnRef(e.target.value)}
                      placeholder="Enter 12-digit payment Transaction ID"
                      className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-pink-400 text-slate-800" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Upload Receipt Screenshot</label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 relative">
                        <input type="file" accept="image/*" onChange={handleScreenshotChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className="border-2 border-dashed border-slate-200 hover:border-pink-300 rounded-xl p-4 text-center transition-colors bg-slate-50/50 flex flex-col items-center justify-center gap-1">
                          <span className="text-xs font-bold text-slate-600">Select receipt image</span>
                          <span className="text-[9px] text-slate-400">PNG, JPG or JPEG up to 1MB</span>
                        </div>
                      </div>
                      {screenshotPreview && (
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0 group">
                          <img src={screenshotPreview} alt="Receipt Preview" className="w-full h-full object-cover" />
                          <button type="button"
                            onClick={() => { setScreenshotPreview(null); setScreenshotBase64(""); }}
                            className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity border-none cursor-pointer"
                          >Remove</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl flex items-start gap-2 border border-emerald-100/50 font-semibold text-[10px] leading-relaxed">
                  <FiShield size={14} className="shrink-0 mt-0.5" />
                  <p>Our billing desk manually verifies receipts within 1-2 hours. You will receive an update notification on your patient profile feed immediately.</p>
                </div>
                <button type="submit"
                  className="w-full py-3.5 bg-slate-900 hover:bg-pink-600 text-white text-xs font-bold rounded-xl shadow-lg border-none cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                >Submit Payment Verification</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

/* ─── SHARED STYLES ─── */
const labelStyle = {
  display: "block",
  fontSize: 13,
  fontWeight: 700,
  color: "#475569",
  marginBottom: 8,
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 16,
  border: "1.5px solid #e2e8f0",
  background: "white",
  fontSize: 14,
  color: "#1e293b",
  outline: "none",
  transition: "all 0.2s",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

const errorStyle = {
  fontSize: 11,
  color: "#ef4444",
  marginTop: 6,
  display: "flex",
  alignItems: "center",
  gap: 4,
};