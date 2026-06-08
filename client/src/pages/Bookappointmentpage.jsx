// src/pages/BookAppointmentPage.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCalendar, FiClock, FiUser, FiPhone, FiMail,
  FiChevronRight, FiChevronLeft, FiCheck, FiMapPin,
  FiVideo, FiSearch, FiStar, FiAlertCircle, FiArrowLeft,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const DOCTORS = [
  {
    id: 1, name: "Dr. Sarah Ahmed", title: "MBBS, FCPS (Dermatology)",
    specialty: "Skin & Dermatology", tag: "skin",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
    experience: "14 Years", fee: "PKR 3,000", rating: 4.9, available: true,
    nextSlot: "Today, 4:00 PM", gender: "Female", branch: ["Gulberg", "DHA"],
    solidColor: "#ec4899",
    schedule: ["Mon 10AM–2PM", "Wed 3PM–7PM", "Fri 10AM–1PM", "Sat 4PM–8PM"],
  },
  {
    id: 2, name: "Dr. Omar Farooq", title: "BDS, FCPS (Oral Surgery)",
    specialty: "Dental Care", tag: "dental",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
    experience: "11 Years", fee: "PKR 2,500", rating: 4.8, available: true,
    nextSlot: "Today, 5:30 PM", gender: "Male", branch: ["Gulberg"],
    solidColor: "#0ea5e9",
    schedule: ["Mon 9AM–1PM", "Tue 2PM–6PM", "Thu 9AM–1PM", "Sat 10AM–3PM"],
  },
  {
    id: 3, name: "Dr. Fatima Malik", title: "MBBS, MRCOG (Gynecology)",
    specialty: "Gynecology & Obstetrics", tag: "gynecology",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80",
    experience: "16 Years", fee: "PKR 4,000", rating: 5.0, available: false,
    nextSlot: "Tomorrow, 10:00 AM", gender: "Female", branch: ["Gulberg", "DHA"],
    solidColor: "#a855f7",
    schedule: ["Tue 10AM–2PM", "Thu 3PM–7PM", "Sat 9AM–1PM"],
  },
  {
    id: 4, name: "Dr. Hassan Raza", title: "MBBS, FCPS (Orthopedics)",
    specialty: "Orthopedic Surgery", tag: "orthopedic",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
    experience: "18 Years", fee: "PKR 3,500", rating: 4.9, available: true,
    nextSlot: "Today, 7:00 PM", gender: "Male", branch: ["Gulberg"],
    solidColor: "#f59e0b",
    schedule: ["Mon 9AM–12PM", "Wed 4PM–8PM", "Fri 9AM–12PM", "Sun 11AM–3PM"],
  },
  {
    id: 5, name: "Dr. Zara Khan", title: "MBBS, FCPS (ENT)",
    specialty: "ENT Specialist", tag: "ent",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=400&q=80",
    experience: "9 Years", fee: "PKR 2,800", rating: 4.7, available: true,
    nextSlot: "Today, 3:30 PM", gender: "Female", branch: ["DHA"],
    solidColor: "#14b8a6",
    schedule: ["Tue 10AM–2PM", "Thu 3:30PM–7PM", "Sat 10AM–2PM"],
  },
  {
    id: 6, name: "Dr. Bilal Siddiqui", title: "MBBS, FCPS (Neurology)",
    specialty: "Neurology", tag: "neurology",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80",
    experience: "20 Years", fee: "PKR 5,000", rating: 4.9, available: false,
    nextSlot: "Tomorrow, 2:00 PM", gender: "Male", branch: ["Gulberg", "DHA"],
    solidColor: "#6366f1",
    schedule: ["Mon 2PM–6PM", "Wed 2PM–6PM", "Fri 2PM–5PM"],
  },
  {
    id: 7, name: "Dr. Nadia Hussain", title: "MBBS, Fellowship Hair Restoration",
    specialty: "Hair Transplant", tag: "hair",
    image: "https://images.unsplash.com/photo-1643297654416-05795d62e39c?auto=format&fit=crop&w=400&q=80",
    experience: "10 Years", fee: "Consultation Free", rating: 4.8, available: true,
    nextSlot: "Today, 6:00 PM", gender: "Female", branch: ["Gulberg"],
    solidColor: "#8b5cf6",
    schedule: ["Mon 11AM–3PM", "Thu 4PM–8PM", "Sat 10AM–2PM"],
  },
  {
    id: 8, name: "Dr. Kamran Ali", title: "MBBS, FCPS (General Medicine)",
    specialty: "General Medicine", tag: "general",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
    experience: "22 Years", fee: "PKR 2,000", rating: 4.9, available: true,
    nextSlot: "Today, 2:00 PM", gender: "Male", branch: ["Gulberg", "DHA"],
    solidColor: "#10b981",
    schedule: ["Mon 9AM–1PM", "Tue 2PM–6PM", "Thu 9AM–1PM", "Fri 2PM–6PM", "Sat 10AM–2PM"],
  },
];

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

const SPECIALTIES = [
  { label: "All", value: "all" },
  { label: "Skin", value: "skin" },
  { label: "Dental", value: "dental" },
  { label: "Gynecology", value: "gynecology" },
  { label: "Orthopedic", value: "orthopedic" },
  { label: "ENT", value: "ent" },
  { label: "Neurology", value: "neurology" },
  { label: "Hair Transplant", value: "hair" },
  { label: "General", value: "general" },
];

const UNAVAILABLE_SLOTS = ["09:30 AM", "11:00 AM", "02:30 PM", "05:00 PM", "06:30 PM"];

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

// ─── STEP SIDEBAR ─────────────────────────────────────────────────────────────
function StepSidebar({ step, selectedDoctor, selectedDay, selectedTime, consultType, days }) {
  const steps = [
    { num: 1, label: "Choose Doctor", desc: "Select your specialist" },
    { num: 2, label: "Pick Schedule", desc: "Date, time & visit type" },
    { num: 3, label: "Your Details", desc: "Patient information" },
    { num: 4, label: "Confirm", desc: "Review & book" },
  ];

  return (
    <div className="flex flex-col gap-2">
      {steps.map((s) => {
        const done = step > s.num;
        const active = step === s.num;
        return (
          <motion.div
            key={s.num}
            animate={{ opacity: active ? 1 : done ? 0.9 : 0.5 }}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
              active ? "bg-white shadow-md shadow-slate-100 border border-slate-100" :
              done ? "bg-white/60" : "bg-transparent"
            }`}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-extrabold transition-all duration-300"
              style={{
                background: done
                  ? "linear-gradient(135deg,#0ea5e9,#db2777)"
                  : active
                  ? "linear-gradient(135deg,#0ea5e9,#db2777)"
                  : "#f1f5f9",
                color: done || active ? "white" : "#94a3b8",
              }}
            >
              {done ? <FiCheck size={15} /> : s.num}
            </div>
            <div>
              <p className={`text-sm font-extrabold ${active ? "text-slate-800" : done ? "text-slate-600" : "text-slate-400"}`}>
                {s.label}
              </p>
              <p className={`text-xs mt-0.5 ${active ? "text-slate-400" : "text-slate-300"}`}>{s.desc}</p>
            </div>
            {active && (
              <motion.div
                layoutId="activeArrow"
                className="ml-auto w-1.5 h-8 rounded-full"
                style={{ background: "linear-gradient(180deg,#0ea5e9,#db2777)" }}
              />
            )}
          </motion.div>
        );
      })}

      {/* Mini summary card — shows after doctor selected */}
      {selectedDoctor && step >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-2xl border border-slate-100 bg-white"
        >
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Booking Summary</p>
          <div className="flex items-center gap-3 mb-3">
            <img src={selectedDoctor.image} alt={selectedDoctor.name}
              className="w-10 h-10 rounded-xl object-cover object-top flex-shrink-0" />
            <div>
              <p className="text-xs font-extrabold text-slate-800">{selectedDoctor.name}</p>
              <p className="text-[10px] text-slate-500">{selectedDoctor.specialty}</p>
            </div>
          </div>
          <div className="space-y-1.5">
            {selectedTime && (
              <>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <FiCalendar size={10} className="text-sky-400" />
                  <span>{days[selectedDay]?.label}, {days[selectedDay]?.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <FiClock size={10} className="text-pink-400" />
                  <span>{selectedTime}</span>
                </div>
              </>
            )}
            <div className="flex items-center gap-1.5 text-[11px] font-bold pt-1 border-t border-slate-50">
              <span className="text-slate-400">Fee:</span>
              <span style={{ color: selectedDoctor.solidColor }}>{selectedDoctor.fee}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Clinic info */}
      <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-pink-50 border border-sky-100/60">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Premium Clinic</p>
        <div className="space-y-1.5">
          {[
            { icon: FiMapPin, text: "Gulberg · DHA, Lahore" },
            { icon: FiPhone, text: "+92 300 123 4567" },
            { icon: FiClock, text: "Mon–Sat, 9AM–9PM" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-[11px] text-slate-500">
              <Icon size={10} className="text-sky-400 flex-shrink-0" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── DOCTOR CARD ──────────────────────────────────────────────────────────────
function DoctorCard({ doctor, selected, onSelect }) {
  const isSelected = selected?.id === doctor.id;
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(doctor)}
      className="w-full text-left rounded-2xl border-2 p-4 transition-all duration-200 relative overflow-hidden"
      style={
        isSelected
          ? { background: `linear-gradient(135deg, ${doctor.solidColor}12, #db277710)`, borderColor: doctor.solidColor }
          : { borderColor: "#f1f5f9", background: "white" }
      }
    >
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <img src={doctor.image} alt={doctor.name}
            className="w-14 h-14 rounded-2xl object-cover object-top shadow-sm" />
          {doctor.available && (
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-extrabold text-slate-800 text-sm leading-tight">{doctor.name}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{doctor.title}</p>
            </div>
            <span className="flex items-center gap-0.5 text-[11px] font-bold text-amber-500 flex-shrink-0 mt-0.5">
              <FiStar size={10} fill="currentColor" /> {doctor.rating}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${doctor.solidColor}15`, color: doctor.solidColor }}>
              {doctor.specialty}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-slate-400 font-semibold">{doctor.experience}</span>
              <span className="flex items-center gap-1 text-[10px] text-slate-400">
                <FiMapPin size={8} /> {doctor.branch.join(" · ")}
              </span>
            </div>
            <span className="text-xs font-extrabold text-slate-700">{doctor.fee}</span>
          </div>
        </div>
      </div>
      {!doctor.available && (
        <div className="absolute top-3 right-3 text-[9px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
          {doctor.nextSlot}
        </div>
      )}
      {isSelected && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ backgroundColor: doctor.solidColor }}>
          <FiCheck size={11} className="text-white" />
        </div>
      )}
    </motion.button>
  );
}

// ─── STEP 1: Choose Doctor ───────────────────────────────────────────────────
function Step1({ doctors, selectedDoctor, setSelectedDoctor, searchQ, setSearchQ, specFilter, setSpecFilter }) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-extrabold text-slate-800">Choose Your Doctor</h2>
        <p className="text-sm text-slate-400 mt-1">Select a specialist for your appointment</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <FiSearch size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={searchQ}
          onChange={e => setSearchQ(e.target.value)}
          placeholder="Search by doctor name or specialty…"
          className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-sky-300 outline-none text-sm text-slate-700 bg-slate-50 focus:bg-white transition-all"
        />
      </div>

      {/* Specialty pills */}
      <div className="flex gap-2 flex-wrap mb-6">
        {SPECIALTIES.map(s => (
          <button
            key={s.value}
            onClick={() => setSpecFilter(s.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              specFilter === s.value
                ? "text-white border-transparent shadow-sm"
                : "border-slate-200 text-slate-500 bg-white hover:border-sky-200"
            }`}
            style={specFilter === s.value ? { background: "linear-gradient(135deg,#0ea5e9,#db2777)" } : {}}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Doctor grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {doctors.map(doc => (
          <DoctorCard key={doc.id} doctor={doc} selected={selectedDoctor} onSelect={setSelectedDoctor} />
        ))}
        {doctors.length === 0 && (
          <div className="col-span-2 text-center py-16 text-slate-400 text-sm">
            <FiSearch size={32} className="mx-auto mb-3 opacity-30" />
            No doctors found. Try clearing the search.
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── STEP 2: Schedule ────────────────────────────────────────────────────────
function Step2({ doctor, days, selectedDay, setSelectedDay, selectedTime, setSelectedTime,
  consultType, setConsultType, selectedBranch, setSelectedBranch }) {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-extrabold text-slate-800">Pick Your Schedule</h2>
        <p className="text-sm text-slate-400 mt-1">Choose a date, time and consultation type</p>
      </div>

      {/* Consultation type */}
      <div className="mb-6">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Consultation Type</p>
        <div className="grid grid-cols-3 gap-3">
          {CONSULTATION_TYPES.map(ct => {
            const Icon = ct.icon;
            const active = consultType === ct.value;
            return (
              <motion.button
                key={ct.value}
                whileTap={{ scale: 0.96 }}
                onClick={() => setConsultType(ct.value)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-center ${
                  active ? "border-transparent shadow-md" : "border-slate-100 bg-white hover:border-slate-200"
                }`}
                style={active ? { background: "linear-gradient(135deg,#e0f2fe,#fce7f3)", borderColor: "#0ea5e9" } : {}}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: active ? "linear-gradient(135deg,#0ea5e9,#db2777)" : "#f1f5f9" }}>
                  <Icon size={17} style={{ color: active ? "white" : "#94a3b8" }} />
                </div>
                <div>
                  <p className={`text-[11px] font-extrabold leading-tight ${active ? "text-sky-700" : "text-slate-600"}`}>{ct.label}</p>
                  <p className={`text-[10px] mt-0.5 ${active ? "text-sky-400" : "text-slate-400"}`}>{ct.desc}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Branch selector */}
      {consultType === "in-person" && (
        <div className="mb-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Select Branch</p>
          <div className="flex gap-3">
            {BRANCHES.filter(b => doctor.branch.includes(b)).map(b => (
              <button
                key={b}
                onClick={() => setSelectedBranch(b)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                  selectedBranch === b
                    ? "text-sky-700 border-sky-400 bg-sky-50"
                    : "border-slate-200 text-slate-500 bg-white hover:border-sky-200"
                }`}
              >
                <FiMapPin size={12} /> {b}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Date picker */}
      <div className="mb-6">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Select Date</p>
        <div className="grid grid-cols-7 gap-2">
          {days.map((d, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.93 }}
              onClick={() => { setSelectedDay(i); setSelectedTime(null); }}
              className={`flex flex-col items-center gap-1 py-3 rounded-2xl border-2 transition-all ${
                selectedDay === i
                  ? "border-transparent text-white shadow-md"
                  : "border-slate-100 bg-white text-slate-600 hover:border-slate-200"
              }`}
              style={selectedDay === i ? { background: "linear-gradient(135deg,#0ea5e9,#db2777)" } : {}}
            >
              <span className="text-[9px] font-bold opacity-80">{d.label}</span>
              <span className="text-sm font-extrabold leading-tight">{d.date.split(" ")[0]}</span>
              <span className="text-[9px] opacity-70">{d.date.split(" ")[1]}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Time slots */}
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Available Time Slots</p>
        <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-2">
          {TIME_SLOTS.map(slot => {
            const busy = UNAVAILABLE_SLOTS.includes(slot);
            const active = selectedTime === slot;
            return (
              <motion.button
                key={slot}
                whileTap={{ scale: 0.93 }}
                disabled={busy}
                onClick={() => setSelectedTime(slot)}
                className={`py-2.5 rounded-xl text-[11px] font-bold border-2 transition-all ${
                  busy
                    ? "border-slate-100 text-slate-300 bg-slate-50 cursor-not-allowed line-through"
                    : active
                    ? "border-transparent text-white shadow-md"
                    : "border-slate-100 text-slate-600 bg-white hover:border-sky-200 hover:text-sky-600"
                }`}
                style={active ? { background: "linear-gradient(135deg,#0ea5e9,#db2777)" } : {}}
              >
                {slot}
              </motion.button>
            );
          })}
        </div>
        {!selectedTime && (
          <p className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
            <FiClock size={11} /> Please select a time slot to continue
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── STEP 3: Patient Info ─────────────────────────────────────────────────────
function Step3({ form, setForm, errors, setErrors }) {
  const update = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: undefined }));
  };

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-extrabold text-slate-800">Patient Information</h2>
        <p className="text-sm text-slate-400 mt-1">Please fill in your details for the appointment</p>
      </div>

      {/* New / Returning */}
      <div className="flex gap-3 mb-6">
        {[{ v: "new", l: "New Patient" }, { v: "returning", l: "Returning Patient" }].map(o => (
          <button
            key={o.v}
            onClick={() => update("isNew", o.v)}
            className={`flex-1 py-3 rounded-2xl text-sm font-bold border-2 transition-all ${
              form.isNew === o.v
                ? "border-transparent text-white shadow-sm"
                : "border-slate-200 text-slate-500 bg-white hover:border-sky-200"
            }`}
            style={form.isNew === o.v ? { background: "linear-gradient(135deg,#0ea5e9,#db2777)" } : {}}
          >
            {o.l}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="text-xs font-bold text-slate-600 mb-1.5 block">
            Full Name <span className="text-pink-500">*</span>
          </label>
          <div className="relative">
            <FiUser size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={form.name}
              onChange={e => update("name", e.target.value)}
              placeholder="Enter your full name"
              className={`w-full pl-11 pr-4 py-3 rounded-2xl border-2 outline-none text-sm transition-all ${
                errors.name ? "border-red-300 bg-red-50" : "border-slate-100 focus:border-sky-300 bg-slate-50 focus:bg-white"
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-[11px] text-red-500 mt-1.5 flex items-center gap-1">
              <FiAlertCircle size={11} /> {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs font-bold text-slate-600 mb-1.5 block">
            Phone Number <span className="text-pink-500">*</span>
          </label>
          <div className="relative">
            <FiPhone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={form.phone}
              onChange={e => update("phone", e.target.value)}
              placeholder="03XX XXXXXXX"
              className={`w-full pl-11 pr-4 py-3 rounded-2xl border-2 outline-none text-sm transition-all ${
                errors.phone ? "border-red-300 bg-red-50" : "border-slate-100 focus:border-sky-300 bg-slate-50 focus:bg-white"
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-[11px] text-red-500 mt-1.5 flex items-center gap-1">
              <FiAlertCircle size={11} /> {errors.phone}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-xs font-bold text-slate-600 mb-1.5 block">
            Email Address <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <div className="relative">
            <FiMail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={form.email}
              onChange={e => update("email", e.target.value)}
              placeholder="your@email.com"
              className={`w-full pl-11 pr-4 py-3 rounded-2xl border-2 outline-none text-sm transition-all ${
                errors.email ? "border-red-300 bg-red-50" : "border-slate-100 focus:border-sky-300 bg-slate-50 focus:bg-white"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-[11px] text-red-500 mt-1.5 flex items-center gap-1">
              <FiAlertCircle size={11} /> {errors.email}
            </p>
          )}
        </div>

        {/* Age + Gender */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-600 mb-1.5 block">Age</label>
            <input
              value={form.age}
              onChange={e => update("age", e.target.value)}
              placeholder="e.g. 32"
              type="number" min="1" max="120"
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-sky-300 outline-none text-sm bg-slate-50 focus:bg-white transition-all"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 mb-1.5 block">Gender</label>
            <select
              value={form.gender}
              onChange={e => update("gender", e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-sky-300 outline-none text-sm bg-slate-50 focus:bg-white transition-all"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="text-xs font-bold text-slate-600 mb-1.5 block">
            Symptoms / Notes <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <textarea
            value={form.notes}
            onChange={e => update("notes", e.target.value)}
            rows={4}
            placeholder="Briefly describe your symptoms or reason for visit…"
            className="w-full px-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-sky-300 outline-none text-sm bg-slate-50 focus:bg-white transition-all resize-none"
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── STEP 4: Confirm ──────────────────────────────────────────────────────────
function Step4({ doctor, day, time, consultType, branch, form }) {
  const ctLabel = CONSULTATION_TYPES.find(c => c.value === consultType)?.label;
  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-extrabold text-slate-800">Review & Confirm</h2>
        <p className="text-sm text-slate-400 mt-1">Please review your appointment details before confirming</p>
      </div>

      {/* Doctor card */}
      <div
        className="flex items-center gap-4 p-5 rounded-2xl mb-5"
        style={{
          background: `linear-gradient(135deg, ${doctor.solidColor}12, transparent)`,
          border: `1.5px solid ${doctor.solidColor}25`,
        }}
      >
        <img src={doctor.image} alt={doctor.name}
          className="w-16 h-16 rounded-2xl object-cover object-top flex-shrink-0 shadow-md" />
        <div>
          <p className="font-extrabold text-slate-800 text-base">{doctor.name}</p>
          <p className="text-xs text-slate-500 mt-0.5">{doctor.title}</p>
          <p className="text-xs font-bold mt-1" style={{ color: doctor.solidColor }}>{doctor.specialty}</p>
        </div>
      </div>

      {/* Detail grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { icon: FiCalendar, label: "Date", value: `${day.label}, ${day.date}` },
          { icon: FiClock, label: "Time", value: time },
          { icon: FiVideo, label: "Consultation", value: ctLabel },
          { icon: FiMapPin, label: "Branch", value: consultType === "in-person" ? branch : "Online" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5 mb-1">
              <Icon size={12} className="text-slate-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-sm font-extrabold text-slate-700">{value}</p>
          </div>
        ))}
      </div>

      {/* Patient info */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-pink-50 border border-sky-100 mb-5">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Patient Information</p>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
          {[
            ["Name", form.name || "—"],
            ["Phone", form.phone || "—"],
            form.email ? ["Email", form.email] : null,
            form.age ? ["Age", form.age] : null,
            form.gender ? ["Gender", form.gender] : null,
            ["Patient", form.isNew === "new" ? "New Patient" : "Returning"],
          ].filter(Boolean).map(([k, v]) => (
            <div key={k}>
              <span className="text-[10px] text-slate-400 font-bold">{k}: </span>
              <span className="text-xs font-bold text-slate-700">{v}</span>
            </div>
          ))}
        </div>
        {form.notes && (
          <div className="mt-3 pt-3 border-t border-sky-100">
            <p className="text-[10px] text-slate-400 font-bold mb-1">Notes:</p>
            <p className="text-xs text-slate-600 leading-relaxed">{form.notes}</p>
          </div>
        )}
      </div>

      {/* Fee */}
      <div
        className="p-4 rounded-2xl flex items-center justify-between"
        style={{ background: "linear-gradient(135deg,#e0f2fe,#fce7f3)" }}
      >
        <span className="text-sm font-bold text-slate-600">Consultation Fee</span>
        <span className="text-lg font-extrabold" style={{ color: doctor.solidColor }}>{doctor.fee}</span>
      </div>
    </motion.div>
  );
}

// ─── SUCCESS VIEW ─────────────────────────────────────────────────────────────
function SuccessView({ doctor, day, time, consultType, form, onNavigate }) {
  const bookingRef = `PC-${Date.now().toString().slice(-6)}`;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
      className="flex flex-col items-center text-center py-8"
    >
      {/* Icon */}
      <div className="relative mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
          className="w-24 h-24 rounded-full flex items-center justify-center shadow-xl"
          style={{ background: "linear-gradient(135deg,#0ea5e9,#db2777)" }}
        >
          <FiCheck size={44} className="text-white" strokeWidth={3} />
        </motion.div>
        {[1, 2].map(i => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 1.5 + i * 0.5, opacity: 0 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.8 }}
            className="absolute inset-0 rounded-full border-2 border-pink-400"
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-md"
      >
        <h2 className="text-2xl font-extrabold text-slate-800 mb-1">Appointment Confirmed!</h2>
        <p className="text-sm text-slate-400 mb-1">
          Booking Reference: <span className="font-extrabold text-sky-600">{bookingRef}</span>
        </p>
        <p className="text-sm text-slate-500 mb-8">Our team will contact you shortly to confirm your slot.</p>

        {/* Summary card */}
        <div
          className="w-full p-5 rounded-2xl text-left mb-6"
          style={{ background: "linear-gradient(135deg,#e0f2fe 0%,#fce7f3 100%)" }}
        >
          <div className="flex items-center gap-4 mb-4">
            <img src={doctor.image} alt={doctor.name}
              className="w-12 h-12 rounded-2xl object-cover object-top shadow-sm" />
            <div>
              <p className="font-extrabold text-slate-800">{doctor.name}</p>
              <p className="text-xs text-slate-500">{doctor.specialty}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["📅 Date", `${day.label}, ${day.date}`],
              ["🕐 Time", time],
              ["💊 Fee", doctor.fee],
              ["📍 Mode", CONSULTATION_TYPES.find(c => c.value === consultType)?.label],
            ].map(([k, v]) => (
              <div key={k} className="bg-white/70 rounded-xl px-3 py-2.5">
                <p className="text-[9px] text-slate-400 font-bold uppercase">{k}</p>
                <p className="text-xs font-extrabold text-slate-700">{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 w-full">
          <motion.a
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            href={`https://wa.me/923001234567?text=${encodeURIComponent(
              `Hello! I just booked an appointment.\nRef: ${bookingRef}\nDoctor: ${doctor.name}\nDate: ${day.label}, ${day.date}\nTime: ${time}\nName: ${form.name}\nPhone: ${form.phone}`
            )}`}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#25D366] text-white text-sm font-extrabold shadow-md"
          >
            <FaWhatsapp size={17} /> WhatsApp Confirm
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate("home")}
            className="flex-1 py-3.5 rounded-2xl text-white text-sm font-extrabold shadow-md"
            style={{ background: "linear-gradient(135deg,#0ea5e9,#db2777)" }}
          >
            Back to Home
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function BookAppointmentPage({ onNavigate, preselectedDoctor = null }) {
  const [step, setStep] = useState(preselectedDoctor ? 2 : 1);
  const [searchQ, setSearchQ] = useState("");
  const [specFilter, setSpecFilter] = useState("all");
  const [selectedDoctor, setSelectedDoctor] = useState(preselectedDoctor);
  const [consultType, setConsultType] = useState("in-person");
  const [selectedBranch, setSelectedBranch] = useState("Gulberg");
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", age: "", gender: "", notes: "", isNew: "new" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const contentRef = useRef(null);
  const days = getNext7Days();

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const filteredDoctors = DOCTORS.filter(d => {
    const q = searchQ.toLowerCase();
    const matchSpec = specFilter === "all" || d.tag === specFilter;
    const matchQ = !q || d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q);
    return matchSpec && matchQ;
  });

  function validateStep3() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^(\+92|0)3[0-9]{9}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Enter a valid Pakistani number";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email address";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (step === 1 && selectedDoctor) setStep(2);
    else if (step === 2 && selectedTime) setStep(3);
    else if (step === 3 && validateStep3()) setStep(4);
    else if (step === 4) setSubmitted(true);
  }

  function handleBack() {
    if (step > 1) setStep(s => s - 1);
    else onNavigate?.("home");
  }

  const canNext =
    (step === 1 && !!selectedDoctor) ||
    (step === 2 && !!selectedTime) ||
    step === 3 ||
    step === 4;

  const stepLabels = ["Doctor", "Schedule", "Details", "Confirm"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-pink-50">
      {/* ── Page Header ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#e0f2fe 0%,#f0f9ff 50%,#fce7f3 100%)" }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle,#db2777,transparent)", transform: "translate(30%,-30%)" }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle,#0ea5e9,transparent)", transform: "translate(-30%,30%)" }} />

        <div className="max-w-6xl mx-auto px-6 py-8 relative">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate?.("home")}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm font-bold transition-colors"
            >
              <FiArrowLeft size={16} /> Back
            </motion.button>
            <div className="h-5 w-px bg-slate-200" />
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm"
                style={{ background: "linear-gradient(135deg,#0ea5e9,#db2777)" }}
              >
                <FiCalendar size={15} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-extrabold text-slate-800 leading-none">Book Appointment</h1>
                <p className="text-xs text-slate-400 mt-0.5">Premium Clinic · Advanced Healthcare</p>
              </div>
            </div>
          </div>

          {/* Step progress bar (mobile only) */}
          {!submitted && (
            <div className="mt-6 flex items-center gap-2 lg:hidden">
              {stepLabels.map((label, i) => (
                <div key={i} className="flex items-center gap-2 flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold"
                      style={{
                        background: step > i + 1 ? "linear-gradient(135deg,#0ea5e9,#db2777)"
                          : step === i + 1 ? "linear-gradient(135deg,#0ea5e9,#db2777)"
                          : "#e2e8f0",
                        color: step >= i + 1 ? "white" : "#94a3b8",
                      }}
                    >
                      {step > i + 1 ? <FiCheck size={11} /> : i + 1}
                    </div>
                    <span className={`text-[9px] font-bold mt-1 ${step === i + 1 ? "text-pink-600" : step > i + 1 ? "text-sky-500" : "text-slate-300"}`}>
                      {label}
                    </span>
                  </div>
                  {i < 3 && (
                    <div className="flex-1 h-0.5 mb-3 rounded-full overflow-hidden bg-slate-200">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg,#0ea5e9,#db2777)" }}
                        animate={{ width: step > i + 1 ? "100%" : "0%" }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {submitted ? (
          /* Success — full width centered */
          <SuccessView
            doctor={selectedDoctor}
            day={days[selectedDay]}
            time={selectedTime}
            consultType={consultType}
            form={form}
            onNavigate={onNavigate}
          />
        ) : (
          <div className="flex gap-8 items-start">
            {/* ── Left Sidebar (desktop only) ── */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-8">
                <StepSidebar
                  step={step}
                  selectedDoctor={selectedDoctor}
                  selectedDay={selectedDay}
                  selectedTime={selectedTime}
                  consultType={consultType}
                  days={days}
                />
              </div>
            </div>

            {/* ── Main Form Area ── */}
            <div className="flex-1 min-w-0">
              <div
                ref={contentRef}
                className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
              >
                {/* Form content */}
                <div className="p-6 sm:p-8">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <Step1
                        key="s1"
                        doctors={filteredDoctors}
                        selectedDoctor={selectedDoctor}
                        setSelectedDoctor={setSelectedDoctor}
                        searchQ={searchQ}
                        setSearchQ={setSearchQ}
                        specFilter={specFilter}
                        setSpecFilter={setSpecFilter}
                      />
                    )}
                    {step === 2 && (
                      <Step2
                        key="s2"
                        doctor={selectedDoctor}
                        days={days}
                        selectedDay={selectedDay}
                        setSelectedDay={setSelectedDay}
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                        consultType={consultType}
                        setConsultType={setConsultType}
                        selectedBranch={selectedBranch}
                        setSelectedBranch={setSelectedBranch}
                      />
                    )}
                    {step === 3 && (
                      <Step3
                        key="s3"
                        form={form}
                        setForm={setForm}
                        errors={errors}
                        setErrors={setErrors}
                      />
                    )}
                    {step === 4 && (
                      <Step4
                        key="s4"
                        doctor={selectedDoctor}
                        day={days[selectedDay]}
                        time={selectedTime}
                        consultType={consultType}
                        branch={selectedBranch}
                        form={form}
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer nav */}
                <div className="px-6 sm:px-8 py-5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-slate-200 text-slate-600 text-sm font-bold hover:border-slate-300 hover:bg-white transition-all bg-white"
                  >
                    <FiChevronLeft size={15} />
                    {step === 1 ? "Cancel" : "Back"}
                  </motion.button>

                  {/* Dots */}
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4].map(i => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === step ? "w-7 bg-pink-500" : i < step ? "w-3 bg-sky-400" : "w-3 bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    disabled={!canNext && step !== 3}
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-3 rounded-2xl text-white text-sm font-extrabold shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    style={{ background: "linear-gradient(135deg,#0ea5e9,#db2777)" }}
                  >
                    {step < 4 ? (
                      <>Continue <FiChevronRight size={15} /></>
                    ) : (
                      <><FiCheck size={15} /> Confirm Booking</>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}