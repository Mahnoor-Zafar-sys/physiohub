// src/components/BookAppointmentModal.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX, FiCalendar, FiClock, FiUser, FiPhone, FiMail,
  FiChevronRight, FiChevronLeft, FiCheck, FiMapPin,
  FiVideo, FiSearch, FiStar, FiAlertCircle,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { LuCalendar, LuClock, LuCreditCard, LuMapPin } from "react-icons/lu";

// ─── DOCTORS DATA (synced from Doctors.jsx) ────────────────────────────────────
import { doctors as DOCTORS } from "../data/mockData";

const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
  "06:00 PM", "06:30 PM", "07:00 PM",
];

const CONSULTATION_TYPES = [
  { value: "in-person", label: "In-Person Visit", icon: FiUser, desc: "Visit us at our clinic" },
  { value: "video", label: "Video Consultation", icon: FiVideo, desc: "Online video call" },
  { value: "whatsapp", label: "WhatsApp Consult", icon: FaWhatsapp, desc: "Chat or call on WhatsApp" },
];

const BRANCHES = ["Gulberg", "DHA"];

const SPECIALTIES = [
  { label: "All Specialties", value: "all" },
  { label: "Physiotherapy", value: "physiotherapy" },
  { label: "Chiropractic Adjustments", value: "chiropractic" },
  { label: "Cupping Therapy", value: "cupping" },
  { label: "Hijama Therapy", value: "hijama" },
  { label: "Electrotherapy", value: "electrotherapy" },
  { label: "Kinesio Taping", value: "kinesio" },
  { label: "Fitness Training", value: "fitness" },
  { label: "Dry Needling", value: "needling" },
];

// Generate next 7 days
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

// Step indicator component
function StepDot({ step, current, label }) {
  const done = current > step;
  const active = current === step;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <motion.div
        animate={{
          scale: active ? 1.15 : 1,
          backgroundColor: done ? "#0ea5e9" : active ? "#db2777" : "#e2e8f0",
        }}
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
        style={{ color: done || active ? "white" : "#94a3b8" }}
      >
        {done ? <FiCheck size={14} /> : step}
      </motion.div>
      <span className={`text-[10px] font-semibold hidden sm:block ${active ? "text-pink-600" : done ? "text-sky-500" : "text-slate-400"}`}>
        {label}
      </span>
    </div>
  );
}

// Doctor card in selector
function DoctorSelectCard({ doctor, selected, onSelect }) {
  const isSelected = selected?.id === doctor.id;
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(doctor)}
      className={`w-full text-left rounded-2xl border-2 p-3 transition-all duration-200 relative overflow-hidden ${
        isSelected
          ? "border-transparent shadow-lg shadow-pink-200/50"
          : "border-slate-100 hover:border-slate-200 bg-white"
      }`}
      style={isSelected ? { background: `linear-gradient(135deg, ${doctor.solidColor}15, #db277715)`, borderColor: doctor.solidColor } : {}}
    >
      <div className="flex items-center gap-3">
        <div className="relative flex-shrink-0">
          <img src={doctor.image} alt={doctor.name}
            className="w-12 h-12 rounded-xl object-cover object-top" />
          {doctor.available && (
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1">
            <p className="font-bold text-slate-800 text-sm truncate">{doctor.name}</p>
            <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-500 flex-shrink-0">
              <FiStar size={9} fill="currentColor" /> {doctor.rating}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 truncate">{doctor.specialty}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-semibold text-slate-400">{doctor.experience}</span>
            <span className="text-slate-200">·</span>
            <span className={`text-[10px] font-bold ${doctor.available ? "text-emerald-500" : "text-slate-400"}`}>
              {doctor.available ? "Available" : doctor.nextSlot}
            </span>
          </div>
        </div>
        {isSelected && (
          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: doctor.solidColor }}>
            <FiCheck size={11} className="text-white" />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
        <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
          <FiMapPin size={9} /> {doctor.branch.join(" · ")}
        </span>
        <span className="text-[10px] font-bold text-slate-600">{doctor.fee}</span>
      </div>
    </motion.button>
  );
}

// ─── MAIN MODAL ─────────────────────────────────────────────────────────────────
export default function BookAppointmentModal({ isOpen, onClose, preselectedDoctor = null }) {
  const [step, setStep] = useState(1);
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
  const scrollRef = useRef(null);
  const days = getNext7Days();

  // Reset when preselectedDoctor changes
  useEffect(() => {
    if (preselectedDoctor) {
      setSelectedDoctor(preselectedDoctor);
      setStep(2);
    }
  }, [preselectedDoctor]);

  // Reset fully on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(preselectedDoctor ? 2 : 1);
        setSubmitted(false);
        setSelectedTime(null);
        setErrors({});
        if (!preselectedDoctor) setSelectedDoctor(null);
      }, 400);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const filteredDoctors = DOCTORS.filter(d => {
    const q = searchQ.toLowerCase();
    const matchSpec = specFilter === "all" || d.tag === specFilter || (d.tags && d.tags.includes(specFilter));
    const matchQ = !q || d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q);
    return matchSpec && matchQ;
  });

  function validateStep3() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^(\+92|0)3[0-9]{9}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Enter a valid Pakistani number";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validateStep3()) return;
    setSubmitted(true);
  }

  const canNext1 = !!selectedDoctor;
  const canNext2 = !!selectedTime;

  const stepLabels = ["Doctor", "Schedule", "Details", "Confirm"];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-6 pointer-events-none"
          >
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col"
              style={{ maxHeight: "92vh" }}>

              {/* Header */}
              <div className="relative px-6 pt-6 pb-4 flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #e0f2fe 0%, #fce7f3 100%)" }}>
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20"
                  style={{ background: "radial-gradient(circle, #db2777, transparent)", transform: "translate(30%, -30%)" }} />
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-15"
                  style={{ background: "radial-gradient(circle, #0ea5e9, transparent)", transform: "translate(-30%, 30%)" }} />

                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #0ea5e9, #db2777)" }}>
                        <FiCalendar size={13} className="text-white" />
                      </div>
                      <h2 className="text-lg font-extrabold text-slate-800">Book Appointment</h2>
                    </div>
                    <p className="text-xs text-slate-500 ml-9">Vital Physio Hub · Physical Therapy & Rehab</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-white/70 hover:bg-white flex items-center justify-center shadow-sm transition-colors">
                    <FiX size={16} className="text-slate-500" />
                  </motion.button>
                </div>

                {/* Step indicator */}
                {!submitted && (
                  <div className="relative mt-5 flex items-center justify-between">
                    {/* Connector line */}
                    <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-200 z-0" />
                    <motion.div
                      className="absolute top-4 left-4 h-0.5 z-0 rounded-full"
                      style={{ background: "linear-gradient(90deg, #0ea5e9, #db2777)" }}
                      animate={{ width: `${((step - 1) / 3) * (100 - 8)}%` }}
                      transition={{ duration: 0.4 }}
                    />
                    {stepLabels.map((label, i) => (
                      <div key={i} className="relative z-10">
                        <StepDot step={i + 1} current={step} label={label} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Body */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-5">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <SuccessView key="success" doctor={selectedDoctor} day={days[selectedDay]} time={selectedTime}
                      consultType={consultType} branch={selectedBranch} form={form} onClose={onClose} />
                  ) : step === 1 ? (
                    <Step1 key="s1" doctors={filteredDoctors} selectedDoctor={selectedDoctor}
                      setSelectedDoctor={setSelectedDoctor} searchQ={searchQ} setSearchQ={setSearchQ}
                      specFilter={specFilter} setSpecFilter={setSpecFilter} />
                  ) : step === 2 ? (
                    <Step2 key="s2" doctor={selectedDoctor} days={days} selectedDay={selectedDay}
                      setSelectedDay={setSelectedDay} selectedTime={selectedTime} setSelectedTime={setSelectedTime}
                      consultType={consultType} setConsultType={setConsultType}
                      selectedBranch={selectedBranch} setSelectedBranch={setSelectedBranch} />
                  ) : step === 3 ? (
                    <Step3 key="s3" form={form} setForm={setForm} errors={errors} setErrors={setErrors} />
                  ) : (
                    <Step4 key="s4" doctor={selectedDoctor} day={days[selectedDay]} time={selectedTime}
                      consultType={consultType} branch={selectedBranch} form={form} />
                  )}
                </AnimatePresence>
              </div>

              {/* Footer nav */}
              {!submitted && (
                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-3 flex-shrink-0 bg-slate-50/80">
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={() => step > 1 ? setStep(s => s - 1) : onClose()}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-bold hover:border-slate-300 transition-colors bg-white">
                    <FiChevronLeft size={15} />
                    {step === 1 ? "Cancel" : "Back"}
                  </motion.button>

                  <div className="flex items-center gap-1.5">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === step ? "w-6 bg-pink-500" : i < step ? "w-3 bg-sky-400" : "w-3 bg-slate-200"
                      }`} />
                    ))}
                  </div>

                  {step < 4 ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      disabled={(step === 1 && !canNext1) || (step === 2 && !canNext2)}
                      onClick={() => {
                        if (step === 1 && canNext1) setStep(2);
                        else if (step === 2 && canNext2) setStep(3);
                        else if (step === 3) { if (validateStep3()) setStep(4); }
                      }}
                      className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-white text-sm font-bold shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      style={{ background: "linear-gradient(135deg, #0ea5e9, #db2777)" }}>
                      Continue
                      <FiChevronRight size={15} />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={handleSubmit}
                      className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-white text-sm font-bold shadow-lg"
                      style={{ background: "linear-gradient(135deg, #0ea5e9, #db2777)" }}>
                      <FiCheck size={15} /> Confirm Booking
                    </motion.button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── STEP 1: Choose Doctor ───────────────────────────────────────────────────
function Step1({ doctors, selectedDoctor, setSelectedDoctor, searchQ, setSearchQ, specFilter, setSpecFilter }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}>
      <div className="mb-4">
        <h3 className="text-base font-extrabold text-slate-800">Choose Your Doctor</h3>
        <p className="text-xs text-slate-400 mt-0.5">Select a specialist for your appointment</p>
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <FiSearch size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={searchQ} onChange={e => setSearchQ(e.target.value)}
          placeholder="Search doctor or specialty…"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border-2 border-slate-100 focus:border-sky-300 outline-none text-sm text-slate-700 bg-slate-50 focus:bg-white transition-all"
        />
      </div>

      {/* Specialty filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {SPECIALTIES.map(s => (
          <button key={s.value}
            onClick={() => setSpecFilter(s.value)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border ${
              specFilter === s.value
                ? "text-white border-transparent shadow-md"
                : "border-slate-200 text-slate-500 bg-white hover:border-sky-200"
            }`}
            style={specFilter === s.value ? { background: "linear-gradient(135deg,#0ea5e9,#db2777)" } : {}}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Doctor list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {doctors.map(doc => (
          <DoctorSelectCard key={doc.id} doctor={doc} selected={selectedDoctor} onSelect={setSelectedDoctor} />
        ))}
        {doctors.length === 0 && (
          <div className="col-span-2 text-center py-10 text-slate-400 text-sm">
            No doctors found. Try clearing the search.
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── STEP 2: Date, Time & Consultation Type ─────────────────────────────────
function Step2({ doctor, days, selectedDay, setSelectedDay, selectedTime, setSelectedTime,
  consultType, setConsultType, selectedBranch, setSelectedBranch }) {

  // Randomly mark some slots as unavailable for realism
  const unavailable = ["09:30 AM", "11:00 AM", "02:30 PM", "05:00 PM", "06:30 PM"];

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}>

      {/* Selected doctor recap */}
      <div className="flex items-center gap-3 p-3 rounded-2xl mb-5"
        style={{ background: `linear-gradient(135deg, ${doctor.solidColor}12, ${doctor.solidColor}06)`, border: `1.5px solid ${doctor.solidColor}30` }}>
        <img src={doctor.image} alt={doctor.name} className="w-11 h-11 rounded-xl object-cover object-top flex-shrink-0" />
        <div>
          <p className="font-bold text-slate-800 text-sm">{doctor.name}</p>
          <p className="text-xs text-slate-500">{doctor.specialty} · {doctor.fee}</p>
        </div>
      </div>

      {/* Consultation type */}
      <div className="mb-5">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Consultation Type</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {CONSULTATION_TYPES.map(ct => {
            const Icon = ct.icon;
            const active = consultType === ct.value;
            return (
              <motion.button key={ct.value} whileTap={{ scale: 0.96 }}
                onClick={() => setConsultType(ct.value)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all text-center ${
                  active ? "border-transparent shadow-md" : "border-slate-100 bg-white hover:border-slate-200"
                }`}
                style={active ? { background: "linear-gradient(135deg,#e0f2fe,#fce7f3)", borderColor: "#0ea5e9" } : {}}>
                <Icon size={18} style={{ color: active ? "#0ea5e9" : "#94a3b8" }} />
                <span className={`text-[10px] font-bold leading-tight ${active ? "text-sky-600" : "text-slate-500"}`}>{ct.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Branch (only for in-person) */}
      {consultType === "in-person" && (
        <div className="mb-5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Branch</p>
          <div className="flex gap-2">
            {BRANCHES.filter(b => doctor.branch.includes(b)).map(b => (
              <button key={b}
                onClick={() => setSelectedBranch(b)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                  selectedBranch === b ? "text-sky-600 border-sky-400 bg-sky-50" : "border-slate-200 text-slate-500 bg-white"
                }`}>
                <FiMapPin size={11} /> {b}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Date selection */}
      <div className="mb-5">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Date</p>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {days.map((d, i) => (
            <motion.button key={i} whileTap={{ scale: 0.95 }}
              onClick={() => { setSelectedDay(i); setSelectedTime(null); }}
              className={`flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-2.5 rounded-2xl border-2 transition-all min-w-[58px] ${
                selectedDay === i
                  ? "border-transparent text-white shadow-md"
                  : "border-slate-100 bg-white text-slate-600 hover:border-slate-200"
              }`}
              style={selectedDay === i ? { background: "linear-gradient(135deg,#0ea5e9,#db2777)" } : {}}>
              <span className="text-[9px] font-bold opacity-80">{d.label}</span>
              <span className="text-sm font-extrabold">{d.date}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Time slots */}
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Available Time Slots</p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {TIME_SLOTS.map(slot => {
            const busy = unavailable.includes(slot);
            const active = selectedTime === slot;
            return (
              <motion.button key={slot} whileTap={{ scale: 0.93 }}
                disabled={busy}
                onClick={() => setSelectedTime(slot)}
                className={`py-2 rounded-xl text-[11px] font-bold border-2 transition-all ${
                  busy ? "border-slate-100 text-slate-300 bg-slate-50 cursor-not-allowed line-through"
                  : active ? "border-transparent text-white shadow-md"
                  : "border-slate-100 text-slate-600 bg-white hover:border-sky-200 hover:text-sky-600"
                }`}
                style={active ? { background: "linear-gradient(135deg,#0ea5e9,#db2777)" } : {}}>
                {slot}
              </motion.button>
            );
          })}
        </div>
        {!selectedTime && (
          <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
            <FiClock size={10} /> Please select a time slot to continue
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
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}>
      <div className="mb-4">
        <h3 className="text-base font-extrabold text-slate-800">Patient Information</h3>
        <p className="text-xs text-slate-400 mt-0.5">Please fill in your details for the appointment</p>
      </div>

      {/* New / Returning */}
      <div className="flex gap-2 mb-5">
        {[{ v: "new", l: "New Patient" }, { v: "returning", l: "Returning Patient" }].map(o => (
          <button key={o.v} onClick={() => update("isNew", o.v)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${
              form.isNew === o.v ? "border-transparent text-white shadow-sm" : "border-slate-200 text-slate-500 bg-white"
            }`}
            style={form.isNew === o.v ? { background: "linear-gradient(135deg,#0ea5e9,#db2777)" } : {}}>
            {o.l}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {/* Name */}
        <div>
          <label className="text-xs font-bold text-slate-600 mb-1 block">
            Full Name <span className="text-pink-500">*</span>
          </label>
          <div className="relative">
            <FiUser size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={form.name} onChange={e => update("name", e.target.value)}
              placeholder="Enter your full name"
              className={`w-full pl-9 pr-4 py-2.5 rounded-xl border-2 outline-none text-sm transition-all ${
                errors.name ? "border-red-300 bg-red-50" : "border-slate-100 focus:border-sky-300 bg-slate-50 focus:bg-white"
              }`} />
          </div>
          {errors.name && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><FiAlertCircle size={10} />{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs font-bold text-slate-600 mb-1 block">
            Phone Number <span className="text-pink-500">*</span>
          </label>
          <div className="relative">
            <FiPhone size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={form.phone} onChange={e => update("phone", e.target.value)}
              placeholder="03XX XXXXXXX"
              className={`w-full pl-9 pr-4 py-2.5 rounded-xl border-2 outline-none text-sm transition-all ${
                errors.phone ? "border-red-300 bg-red-50" : "border-slate-100 focus:border-sky-300 bg-slate-50 focus:bg-white"
              }`} />
          </div>
          {errors.phone && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><FiAlertCircle size={10} />{errors.phone}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="text-xs font-bold text-slate-600 mb-1 block">Email Address <span className="text-slate-400 font-normal">(optional)</span></label>
          <div className="relative">
            <FiMail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={form.email} onChange={e => update("email", e.target.value)}
              placeholder="your@email.com"
              className={`w-full pl-9 pr-4 py-2.5 rounded-xl border-2 outline-none text-sm transition-all ${
                errors.email ? "border-red-300 bg-red-50" : "border-slate-100 focus:border-sky-300 bg-slate-50 focus:bg-white"
              }`} />
          </div>
          {errors.email && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><FiAlertCircle size={10} />{errors.email}</p>}
        </div>

        {/* Age + Gender row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-600 mb-1 block">Age</label>
            <input value={form.age} onChange={e => update("age", e.target.value)}
              placeholder="e.g. 32" type="number" min="1" max="120"
              className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-100 focus:border-sky-300 outline-none text-sm bg-slate-50 focus:bg-white transition-all" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 mb-1 block">Gender</label>
            <select value={form.gender} onChange={e => update("gender", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-100 focus:border-sky-300 outline-none text-sm bg-slate-50 focus:bg-white transition-all">
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="text-xs font-bold text-slate-600 mb-1 block">Symptoms / Notes <span className="text-slate-400 font-normal">(optional)</span></label>
          <textarea value={form.notes} onChange={e => update("notes", e.target.value)}
            rows={3} placeholder="Briefly describe your symptoms or reason for visit…"
            className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-100 focus:border-sky-300 outline-none text-sm bg-slate-50 focus:bg-white transition-all resize-none" />
        </div>
      </div>
    </motion.div>
  );
}

// ─── STEP 4: Confirm ─────────────────────────────────────────────────────────
function Step4({ doctor, day, time, consultType, branch, form }) {
  const ctLabel = CONSULTATION_TYPES.find(c => c.value === consultType)?.label;
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}>
      <div className="mb-4">
        <h3 className="text-base font-extrabold text-slate-800">Review & Confirm</h3>
        <p className="text-xs text-slate-400 mt-0.5">Please confirm your appointment details</p>
      </div>

      {/* Doctor */}
      <div className="flex items-center gap-3 p-4 rounded-2xl mb-4"
        style={{ background: `linear-gradient(135deg, ${doctor.solidColor}15, transparent)`, border: `1.5px solid ${doctor.solidColor}25` }}>
        <img src={doctor.image} alt={doctor.name} className="w-14 h-14 rounded-2xl object-cover object-top flex-shrink-0 shadow-md" />
        <div>
          <p className="font-extrabold text-slate-800">{doctor.name}</p>
          <p className="text-xs text-slate-500">{doctor.title}</p>
          <p className="text-xs font-bold mt-0.5" style={{ color: doctor.solidColor }}>{doctor.specialty}</p>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { icon: FiCalendar, label: "Date", value: `${day.label}, ${day.date}` },
          { icon: FiClock, label: "Time", value: time },
          { icon: FiVideo, label: "Type", value: ctLabel },
          { icon: FiMapPin, label: "Branch", value: consultType === "in-person" ? branch : "—" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Icon size={12} className="text-slate-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-sm font-bold text-slate-700">{value}</p>
          </div>
        ))}
      </div>

      {/* Patient */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-pink-50 border border-sky-100">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Patient Info</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
          {[
            ["Name", form.name || "—"],
            ["Phone", form.phone || "—"],
            form.email ? ["Email", form.email] : null,
            form.age ? ["Age", form.age] : null,
            form.gender ? ["Gender", form.gender] : null,
            ["Status", form.isNew === "new" ? "New Patient" : "Returning"],
          ].filter(Boolean).map(([k, v]) => (
            <div key={k}>
              <span className="text-[10px] text-slate-400 font-semibold">{k}: </span>
              <span className="text-[11px] font-bold text-slate-700">{v}</span>
            </div>
          ))}
        </div>
        {form.notes && (
          <div className="mt-2 pt-2 border-t border-sky-100">
            <p className="text-[10px] text-slate-400 font-semibold mb-0.5">Notes:</p>
            <p className="text-xs text-slate-600">{form.notes}</p>
          </div>
        )}
      </div>

      {/* Fee */}
      <div className="mt-4 p-3 rounded-2xl flex items-center justify-between"
        style={{ background: "linear-gradient(135deg, #e0f2fe, #fce7f3)" }}>
        <span className="text-sm font-bold text-slate-600">Consultation Fee</span>
        <span className="text-base font-extrabold" style={{ color: doctor.solidColor }}>{doctor.fee}</span>
      </div>
    </motion.div>
  );
}

// ─── SUCCESS VIEW ─────────────────────────────────────────────────────────────
function SuccessView({ doctor, day, time, consultType, branch, form, onClose }) {
  const bookingRef = `PC-${Date.now().toString().slice(-6)}`;
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
      className="flex flex-col items-center text-center py-4">

      {/* Success icon */}
      <div className="relative mb-6">
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
          className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl"
          style={{ background: "linear-gradient(135deg, #0ea5e9, #db2777)" }}>
          <FiCheck size={36} className="text-white" strokeWidth={3} />
        </motion.div>
        {/* Rings */}
        {[1, 2].map(i => (
          <motion.div key={i}
            initial={{ scale: 0, opacity: 0.5 }} animate={{ scale: 1.5 + i * 0.5, opacity: 0 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.8 }}
            className="absolute inset-0 rounded-full border-2 border-pink-400" />
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h3 className="text-xl font-extrabold text-slate-800 mb-1">Appointment Confirmed!</h3>
        <p className="text-xs text-slate-400 mb-1">Booking Reference: <span className="font-bold text-sky-600">{bookingRef}</span></p>
        <p className="text-sm text-slate-500 mb-6">Our team will contact you shortly to confirm your slot.</p>

        {/* Summary card */}
        <div className="w-full p-4 rounded-2xl text-left mb-5"
          style={{ background: "linear-gradient(135deg, #e0f2fe 0%, #fce7f3 100%)" }}>
          <div className="flex items-center gap-3 mb-3">
            <img src={doctor.image} alt={doctor.name} className="w-10 h-10 rounded-xl object-cover object-top" />
            <div>
              <p className="font-bold text-slate-800 text-sm">{doctor.name}</p>
              <p className="text-[11px] text-slate-500">{doctor.specialty}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: LuCalendar, label: "Date", value: `${day.label}, ${day.date}` },
              { icon: LuClock, label: "Time", value: time },
              { icon: LuCreditCard, label: "Fee", value: doctor.fee },
              { icon: LuMapPin, label: "Mode", value: CONSULTATION_TYPES.find(c => c.value === consultType)?.label },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white/70 rounded-xl px-3 py-2">
                <div className="flex items-center gap-1.5 text-slate-400 mb-0.5">
                  <Icon size={12} className="text-sky-500" />
                  <p className="text-[9px] font-bold uppercase">{label}</p>
                </div>
                <p className="text-xs font-bold text-slate-700">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 w-full">
          <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            href={`https://wa.me/923008786187?text=${encodeURIComponent(`Hello! I just booked an appointment.\nRef: ${bookingRef}\nDoctor: ${doctor.name}\nDate: ${day.label}, ${day.date}\nTime: ${time}\nName: ${form.name}\nPhone: ${form.phone}`)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white text-sm font-bold shadow-md">
            <FaWhatsapp size={16} /> WhatsApp Confirm
          </motion.a>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-white text-sm font-bold shadow-md"
            style={{ background: "linear-gradient(135deg,#0ea5e9,#db2777)" }}>
            Done
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}