// // src/components/booking/BookingModal.jsx
// // ── Pure Frontend Booking Modal — No Backend Required ────────
// // Static doctors data, full 5-step flow, sky-blue + pink theme

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiX, FiCalendar, FiClock, FiUser, FiPhone, FiMail,
//   FiMapPin, FiCheckCircle, FiChevronRight, FiChevronLeft,
//   FiVideo, FiMic, FiAlertCircle,
// } from "react-icons/fi";
// import { FaWhatsapp, FaHeartbeat, FaStar } from "react-icons/fa";
// import { TbStethoscope } from "react-icons/tb";

// // ─── STATIC DOCTORS ──────────────────────────────────────────
// const STATIC_DOCTORS = [
//   {
//     id: 1, name: "Dr. Sarah Ahmed", title: "MBBS, FCPS (Dermatology)",
//     specialty: "Skin & Dermatology", fee: "PKR 3,000", rating: 4.9,
//     available: true, color: "#ec4899",
//     image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80",
//     branch: ["Gulberg", "DHA"],
//     schedule: { Monday: "10:00–14:00", Wednesday: "15:00–19:00", Friday: "10:00–13:00", Saturday: "16:00–20:00" },
//   },
//   {
//     id: 2, name: "Dr. Omar Farooq", title: "BDS, FCPS (Oral Surgery)",
//     specialty: "Dental Care", fee: "PKR 2,500", rating: 4.8,
//     available: true, color: "#0ea5e9",
//     image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=120&q=80",
//     branch: ["Gulberg"],
//     schedule: { Monday: "09:00–13:00", Tuesday: "14:00–18:00", Thursday: "09:00–13:00", Saturday: "10:00–15:00" },
//   },
//   {
//     id: 3, name: "Dr. Fatima Malik", title: "MBBS, MRCOG (Gynecology)",
//     specialty: "Gynecology & Obstetrics", fee: "PKR 4,000", rating: 5.0,
//     available: false, color: "#a855f7",
//     image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=120&q=80",
//     branch: ["Gulberg", "DHA"],
//     schedule: { Tuesday: "10:00–14:00", Thursday: "15:00–19:00", Saturday: "09:00–13:00" },
//   },
//   {
//     id: 4, name: "Dr. Hassan Raza", title: "MBBS, FCPS (Orthopedics)",
//     specialty: "Orthopedic Surgery", fee: "PKR 3,500", rating: 4.9,
//     available: true, color: "#f59e0b",
//     image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80",
//     branch: ["Gulberg"],
//     schedule: { Monday: "09:00–12:00", Wednesday: "16:00–20:00", Friday: "09:00–12:00", Sunday: "11:00–15:00" },
//   },
//   {
//     id: 5, name: "Dr. Zara Khan", title: "MBBS, FCPS (ENT)",
//     specialty: "ENT Specialist", fee: "PKR 2,800", rating: 4.7,
//     available: true, color: "#14b8a6",
//     image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=120&q=80",
//     branch: ["DHA"],
//     schedule: { Tuesday: "10:00–14:00", Thursday: "15:30–19:00", Saturday: "10:00–14:00" },
//   },
//   {
//     id: 6, name: "Dr. Bilal Siddiqui", title: "MBBS, FCPS (Neurology)",
//     specialty: "Neurology", fee: "PKR 5,000", rating: 4.9,
//     available: false, color: "#6366f1",
//     image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=120&q=80",
//     branch: ["Gulberg", "DHA"],
//     schedule: { Monday: "14:00–18:00", Wednesday: "14:00–18:00", Friday: "14:00–17:00" },
//   },
//   {
//     id: 7, name: "Dr. Nadia Hussain", title: "MBBS, Fellowship Hair Restoration",
//     specialty: "Hair Transplant", fee: "Consultation Free", rating: 4.8,
//     available: true, color: "#8b5cf6",
//     image: "https://images.unsplash.com/photo-1643297654416-05795d62e39c?auto=format&fit=crop&w=120&q=80",
//     branch: ["Gulberg"],
//     schedule: { Monday: "11:00–15:00", Thursday: "16:00–20:00", Saturday: "10:00–14:00" },
//   },
//   {
//     id: 8, name: "Dr. Kamran Ali", title: "MBBS, FCPS (General Medicine)",
//     specialty: "General Medicine", fee: "PKR 2,000", rating: 4.9,
//     available: true, color: "#10b981",
//     image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=120&q=80",
//     branch: ["Gulberg", "DHA"],
//     schedule: { Monday: "09:00–13:00", Tuesday: "14:00–18:00", Thursday: "09:00–13:00", Friday: "14:00–18:00", Saturday: "10:00–14:00" },
//   },
// ];

// // Generate 30-min time slots from "HH:MM–HH:MM"
// function generateSlots(rangeStr) {
//   if (!rangeStr) return [];
//   const [start, end] = rangeStr.split("–");
//   const [sh, sm] = start.split(":").map(Number);
//   const [eh, em] = end.split(":").map(Number);
//   const slots = [];
//   let cur = sh * 60 + sm;
//   const endMin = eh * 60 + em;
//   while (cur < endMin) {
//     const h = Math.floor(cur / 60);
//     const m = cur % 60;
//     const ampm = h >= 12 ? "PM" : "AM";
//     const hour = h % 12 || 12;
//     slots.push(`${hour}:${m.toString().padStart(2, "0")} ${ampm}`);
//     cur += 30;
//   }
//   return slots;
// }

// function getNext14Days() {
//   const days = [];
//   const DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
//   for (let i = 0; i < 14; i++) {
//     const d = new Date();
//     d.setDate(d.getDate() + i);
//     days.push({
//       date: d.toISOString().split("T")[0],
//       dayName: DAY_NAMES[d.getDay()],
//       display: d.getDate(),
//       shortDay: DAY_NAMES[d.getDay()].slice(0, 3),
//       isToday: i === 0,
//     });
//   }
//   return days;
// }

// // ─── STEP INDICATOR ──────────────────────────────────────────
// const STEPS = ["Doctor", "Date & Branch", "Time", "Your Info", "Confirm"];

// function StepBar({ current }) {
//   return (
//     <div className="flex items-center justify-center gap-0 px-6 py-3">
//       {STEPS.map((label, i) => {
//         const stepNum = i + 1;
//         const done = current > stepNum;
//         const active = current === stepNum;
//         return (
//           <div key={label} className="flex items-center">
//             <div className="flex flex-col items-center gap-0.5">
//               <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
//                 done   ? "border-emerald-400 bg-emerald-400 text-white" :
//                 active ? "border-sky-500 bg-sky-500 text-white shadow-lg shadow-sky-200" :
//                          "border-slate-200 bg-white text-slate-400"
//               }`}>
//                 {done ? <FiCheckCircle size={13} /> : stepNum}
//               </div>
//               <span className={`text-[9px] font-bold hidden sm:block whitespace-nowrap ${
//                 active ? "text-sky-600" : done ? "text-emerald-500" : "text-slate-400"
//               }`}>{label}</span>
//             </div>
//             {i < STEPS.length - 1 && (
//               <div className={`w-6 sm:w-8 h-0.5 mx-1 rounded transition-all duration-300 ${done ? "bg-emerald-400" : "bg-slate-200"}`} />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // ─── STEP 1: DOCTOR SELECT ────────────────────────────────────
// function StepDoctor({ selected, onSelect }) {
//   const [search, setSearch] = useState("");
//   const filtered = STATIC_DOCTORS.filter(d =>
//     !search || d.name.toLowerCase().includes(search.toLowerCase()) ||
//     d.specialty.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-5">
//       <p className="text-xs text-slate-400 mb-3 font-medium">
//         {STATIC_DOCTORS.length} specialists available across 2 branches
//       </p>
//       <div className="relative mb-4">
//         <FiUser size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
//         <input
//           value={search} onChange={e => setSearch(e.target.value)}
//           placeholder="Search by name or specialty…"
//           className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border border-slate-200 bg-slate-50 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all"
//         />
//       </div>
//       <div className="space-y-2 max-h-[360px] overflow-y-auto pr-0.5" style={{ scrollbarWidth: "thin" }}>
//         {filtered.map(d => (
//           <motion.button
//             key={d.id}
//             whileHover={{ x: 3 }}
//             whileTap={{ scale: 0.99 }}
//             onClick={() => onSelect(d)}
//             className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 text-left transition-all duration-200 ${
//               selected?.id === d.id
//                 ? "border-sky-400 bg-gradient-to-r from-sky-50 to-pink-50 shadow-md"
//                 : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm"
//             }`}
//           >
//             <div className="relative flex-shrink-0">
//               <img src={d.image} alt={d.name}
//                 className="w-12 h-12 rounded-xl object-cover"
//                 style={{ border: `2px solid ${d.color}30` }}
//               />
//               {d.available && (
//                 <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white" />
//               )}
//             </div>
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-1.5 mb-0.5">
//                 <p className="font-bold text-slate-900 text-sm truncate">{d.name}</p>
//                 {!d.available && (
//                   <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full flex-shrink-0">Booked</span>
//                 )}
//               </div>
//               <p className="text-xs text-slate-400 truncate mb-1">{d.title}</p>
//               <div className="flex items-center gap-2">
//                 <span className="text-xs font-bold" style={{ color: d.color }}>{d.fee}</span>
//                 <span className="flex items-center gap-0.5 text-xs text-amber-500 font-bold">
//                   <FaStar size={9} />{d.rating}
//                 </span>
//               </div>
//             </div>
//             {selected?.id === d.id && (
//               <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0">
//                 <FiCheckCircle size={13} className="text-white" />
//               </div>
//             )}
//           </motion.button>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── STEP 2: DATE & BRANCH ────────────────────────────────────
// function StepDate({ doctor, date, branch, onDateChange, onBranchChange }) {
//   const days = getNext14Days();
//   const doctorDays = doctor ? Object.keys(doctor.schedule) : [];

//   return (
//     <div className="p-5">
//       {/* Branch */}
//       <div className="mb-5">
//         <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
//           Select Branch
//         </label>
//         <div className="flex gap-3">
//           {(doctor?.branch || ["Gulberg", "DHA"]).map(b => (
//             <button key={b} onClick={() => onBranchChange(b)}
//               className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all ${
//                 branch === b
//                   ? "border-sky-400 bg-gradient-to-r from-sky-50 to-cyan-50 text-sky-600 shadow-md shadow-sky-100"
//                   : "border-slate-200 bg-white text-slate-500 hover:border-sky-200"
//               }`}
//             >
//               <FiMapPin size={14} /> {b}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Date calendar */}
//       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
//         Select Date
//       </label>
//       <div className="grid grid-cols-7 gap-1.5">
//         {days.map(d => {
//           const isAvail = !doctorDays.length || doctorDays.includes(d.dayName);
//           const isSelected = date === d.date;
//           return (
//             <motion.button
//               key={d.date}
//               disabled={!isAvail}
//               onClick={() => isAvail && onDateChange(d.date)}
//               whileHover={isAvail ? { scale: 1.08 } : {}}
//               whileTap={isAvail ? { scale: 0.95 } : {}}
//               className={`flex flex-col items-center py-2 px-0.5 rounded-xl text-center transition-all duration-200 ${
//                 isSelected
//                   ? "shadow-lg scale-105"
//                   : isAvail
//                   ? "bg-white border border-slate-200 text-slate-700 hover:border-sky-300"
//                   : "bg-slate-50 border border-slate-100 text-slate-300 cursor-not-allowed"
//               }`}
//               style={isSelected ? {
//                 background: "linear-gradient(135deg,#0ea5e9,#ec4899)",
//                 color: "white", border: "none",
//               } : {}}
//             >
//               <span className="text-[9px] font-bold uppercase">{d.shortDay}</span>
//               <span className="text-sm font-extrabold leading-tight">{d.display}</span>
//               {d.isToday && (
//                 <span className={`text-[8px] font-bold ${isSelected ? "text-white/80" : "text-sky-500"}`}>Today</span>
//               )}
//             </motion.button>
//           );
//         })}
//       </div>

//       {date && (
//         <div className="mt-3 flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2.5">
//           <FiCalendar size={13} className="text-sky-500" />
//           <span className="text-xs text-slate-600">
//             <span className="font-bold text-slate-800">
//               {new Date(date).toLocaleDateString("en-PK", { weekday: "long", day: "numeric", month: "long" })}
//             </span>
//             {doctor && doctor.schedule[new Date(date).toLocaleDateString("en-US", { weekday: "long" })] && (
//               <span className="text-slate-400 ml-1">
//                 · {doctor.schedule[new Date(date).toLocaleDateString("en-US", { weekday: "long" })]}
//               </span>
//             )}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── STEP 3: TIME & TYPE ─────────────────────────────────────
// function StepTime({ doctor, date, selectedTime, onTimeSelect, apptType, onTypeChange }) {
//   const dayName = date ? new Date(date).toLocaleDateString("en-US", { weekday: "long" }) : "";
//   const slots = doctor && dayName ? generateSlots(doctor.schedule[dayName]) : [];

//   return (
//     <div className="p-5">
//       {/* Appointment type */}
//       <div className="mb-5">
//         <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
//           Appointment Type
//         </label>
//         <div className="grid grid-cols-3 gap-2">
//           {[
//             { value: "in-person", label: "In Person",     icon: FiUser,     color: "#0ea5e9" },
//             { value: "video",     label: "Video Call",    icon: FiVideo,    color: "#8b5cf6" },
//             { value: "audio",     label: "Audio Call",    icon: FiMic,      color: "#ec4899" },
//           ].map(({ value, label, icon: Icon, color }) => (
//             <button key={value} onClick={() => onTypeChange(value)}
//               className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 font-bold text-xs transition-all ${
//                 apptType === value
//                   ? "shadow-md scale-105"
//                   : "border-slate-200 bg-white text-slate-500 hover:border-sky-200"
//               }`}
//               style={apptType === value ? {
//                 borderColor: color, background: `${color}10`, color,
//               } : {}}
//             >
//               <Icon size={18} style={apptType === value ? { color } : {}} />
//               {label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Time slots */}
//       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
//         Available Time Slots
//         {slots.length > 0 && <span className="text-sky-500 ml-1 normal-case">({slots.length} slots)</span>}
//       </label>

//       {!date ? (
//         <div className="text-center py-6 text-slate-400 text-sm bg-slate-50 rounded-xl">
//           <FiCalendar size={20} className="mx-auto mb-2 opacity-40" />
//           Please select a date first
//         </div>
//       ) : slots.length === 0 ? (
//         <div className="text-center py-6 bg-amber-50 rounded-xl border border-amber-100">
//           <FiAlertCircle size={20} className="mx-auto mb-2 text-amber-400" />
//           <p className="text-sm font-semibold text-amber-700">Doctor not available on this day</p>
//           <p className="text-xs text-amber-500 mt-1">Please go back and choose a different date</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-4 gap-2 max-h-[200px] overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
//           {slots.map(slot => (
//             <motion.button
//               key={slot}
//               whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
//               onClick={() => onTimeSelect(slot)}
//               className={`py-2.5 px-1 rounded-xl text-xs font-bold text-center transition-all duration-200 ${
//                 selectedTime === slot
//                   ? "text-white shadow-lg"
//                   : "bg-white border border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-sky-50"
//               }`}
//               style={selectedTime === slot ? {
//                 background: "linear-gradient(135deg,#0ea5e9,#ec4899)",
//               } : {}}
//             >
//               {slot}
//             </motion.button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── STEP 4: PATIENT INFO ─────────────────────────────────────
// function StepInfo({ form, onChange, errors }) {
//   const fields = [
//     { key: "name",    label: "Full Name",     icon: FiUser,     type: "text",  placeholder: "e.g. Ahmed Khan",          required: true },
//     { key: "phone",   label: "Phone Number",  icon: FiPhone,    type: "tel",   placeholder: "03xx-xxxxxxx",             required: true },
//     { key: "email",   label: "Email",         icon: FiMail,     type: "email", placeholder: "your@email.com",           required: false },
//   ];

//   return (
//     <div className="p-5">
//       <p className="text-xs text-slate-400 mb-4">We need your details to confirm the appointment</p>
//       <div className="space-y-3">
//         {fields.map(({ key, label, icon: Icon, type, placeholder, required }) => (
//           <div key={key}>
//             <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
//               {label} {required && <span className="text-pink-400">*</span>}
//             </label>
//             <div className="relative">
//               <Icon size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
//               <input
//                 value={form[key]} onChange={e => onChange(key, e.target.value)}
//                 type={type} placeholder={placeholder}
//                 className={`w-full pl-9 pr-4 py-3 rounded-xl text-sm border ${
//                   errors[key] ? "border-pink-300 bg-pink-50" : "border-slate-200 bg-slate-50"
//                 } focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all`}
//               />
//             </div>
//             {errors[key] && <p className="text-xs text-pink-500 mt-1">{errors[key]}</p>}
//           </div>
//         ))}

//         {/* Age + Gender row */}
//         <div className="grid grid-cols-2 gap-3">
//           <div>
//             <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Age</label>
//             <input
//               value={form.age} onChange={e => onChange("age", e.target.value)}
//               type="number" min="1" max="120" placeholder="Age"
//               className="w-full px-4 py-3 rounded-xl text-sm border border-slate-200 bg-slate-50 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all"
//             />
//           </div>
//           <div>
//             <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Gender</label>
//             <select
//               value={form.gender} onChange={e => onChange("gender", e.target.value)}
//               className="w-full px-4 py-3 rounded-xl text-sm border border-slate-200 bg-slate-50 focus:outline-none focus:border-sky-400 appearance-none transition-all"
//             >
//               <option value="">Select</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//         </div>

//         {/* Problem */}
//         <div>
//           <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
//             Symptoms / Reason for Visit
//           </label>
//           <textarea
//             value={form.problem} onChange={e => onChange("problem", e.target.value)}
//             placeholder="Briefly describe your symptoms or reason for visit…"
//             rows={3}
//             className="w-full px-4 py-3 rounded-xl text-sm border border-slate-200 bg-slate-50 resize-none focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── STEP 5: CONFIRM SUMMARY ──────────────────────────────────
// function StepConfirm({ doctor, date, time, branch, apptType, form }) {
//   const typeLabel = { "in-person": "In-Person Visit", video: "Video Consultation", audio: "Audio Call" };
//   const rows = [
//     { label: "Doctor",    value: doctor?.name },
//     { label: "Specialty", value: doctor?.specialty },
//     { label: "Date",      value: date ? new Date(date).toLocaleDateString("en-PK", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "—" },
//     { label: "Time",      value: time || "—" },
//     { label: "Branch",    value: branch || "—" },
//     { label: "Type",      value: typeLabel[apptType] },
//     { label: "Fee",       value: doctor?.fee },
//     { label: "Patient",   value: form.name },
//     { label: "Phone",     value: form.phone },
//     ...(form.email ? [{ label: "Email", value: form.email }] : []),
//     ...(form.problem ? [{ label: "Problem", value: form.problem }] : []),
//   ];

//   return (
//     <div className="p-5">
//       <p className="text-xs text-slate-400 mb-4">Please review before confirming</p>
//       <div className="rounded-2xl overflow-hidden border border-slate-100 mb-4">
//         {rows.map((row, i) => (
//           <div key={i} className={`flex gap-3 px-4 py-2.5 ${i % 2 === 0 ? "bg-slate-50" : "bg-white"} ${i < rows.length - 1 ? "border-b border-slate-100" : ""}`}>
//             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide w-16 flex-shrink-0 mt-0.5">{row.label}</span>
//             <span className="text-sm font-semibold text-slate-700 flex-1 leading-snug">{row.value}</span>
//           </div>
//         ))}
//       </div>
//       <div className="flex items-start gap-2 bg-sky-50 border border-sky-100 rounded-xl p-3">
//         <FiAlertCircle size={14} className="text-sky-400 flex-shrink-0 mt-0.5" />
//         <p className="text-xs text-sky-700">Please arrive 10 minutes early. Bring previous medical reports if any.</p>
//       </div>
//     </div>
//   );
// }

// // ─── SUCCESS SCREEN ───────────────────────────────────────────
// function SuccessScreen({ doctor, date, time, branch, form, onClose }) {
//   const ref = "PC" + Date.now().toString().slice(-8);
//   const msg = encodeURIComponent(
//     `Hello Premium Clinic! I just booked an appointment.\nDoctor: ${doctor?.name}\nDate: ${date} at ${time}\nRef: ${ref}`
//   );

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.92 }}
//       animate={{ opacity: 1, scale: 1 }}
//       className="p-8 text-center"
//     >
//       {/* Animated checkmark */}
//       <motion.div
//         initial={{ scale: 0, rotate: -180 }}
//         animate={{ scale: 1, rotate: 0 }}
//         transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
//         className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center"
//         style={{ background: "linear-gradient(135deg,#0ea5e9,#ec4899)" }}
//       >
//         <FiCheckCircle size={38} className="text-white" />
//       </motion.div>

//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
//         <h3 className="text-2xl font-extrabold text-slate-900 mb-1">Booked Successfully!</h3>
//         <p className="text-slate-500 text-sm mb-5">Your appointment has been confirmed.</p>

//         {/* Booking ref card */}
//         <div className="rounded-2xl border border-slate-100 overflow-hidden mb-5 text-left">
//           <div className="px-4 py-3 flex items-center justify-between"
//             style={{ background: "linear-gradient(135deg,#0ea5e9,#ec4899)" }}>
//             <span className="text-white/80 text-xs font-bold uppercase tracking-wider">Booking Reference</span>
//             <span className="text-white font-extrabold text-xl tracking-widest">{ref}</span>
//           </div>
//           {[
//             { label: "Doctor",  value: doctor?.name },
//             { label: "Date",    value: new Date(date).toLocaleDateString("en-PK", { weekday: "short", day: "numeric", month: "short" }) },
//             { label: "Time",    value: time },
//             { label: "Branch",  value: branch },
//             { label: "Patient", value: form.name },
//           ].map((row, i) => (
//             <div key={i} className={`flex gap-3 px-4 py-2.5 ${i % 2 === 0 ? "bg-slate-50" : "bg-white"}`}>
//               <span className="text-[10px] font-bold text-slate-400 uppercase w-14 flex-shrink-0">{row.label}</span>
//               <span className="text-sm font-semibold text-slate-700">{row.value}</span>
//             </div>
//           ))}
//         </div>

//         <div className="flex gap-3">
//           <a href={`https://wa.me/923001234567?text=${msg}`} target="_blank" rel="noopener noreferrer"
//             className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-lg hover:bg-[#20ba5a] transition-colors">
//             <FaWhatsapp size={16} /> Share on WhatsApp
//           </a>
//           <button onClick={onClose}
//             className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-colors">
//             Done
//           </button>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// // ─── MAIN MODAL ───────────────────────────────────────────────
// export default function BookingModal({ isOpen, onClose, preselectedDoctor = null }) {
//   const [step,    setStep]    = useState(1);
//   const [doctor,  setDoctor]  = useState(preselectedDoctor);
//   const [date,    setDate]    = useState("");
//   const [branch,  setBranch]  = useState("");
//   const [time,    setTime]    = useState("");
//   const [apptType, setApptType] = useState("in-person");
//   const [form,    setForm]    = useState({ name: "", phone: "", email: "", age: "", gender: "", problem: "" });
//   const [errors,  setErrors]  = useState({});
//   const [done,    setDone]    = useState(false);

//   // Preselected doctor → skip to step 2
//   useEffect(() => {
//     if (preselectedDoctor && isOpen) {
//       setDoctor(preselectedDoctor);
//       setStep(2);
//     }
//   }, [preselectedDoctor, isOpen]);

//   const updateForm = (key, val) => setForm(f => ({ ...f, [key]: val }));

//   const validateInfo = () => {
//     const e = {};
//     if (!form.name.trim() || form.name.trim().length < 2) e.name = "Full name is required";
//     const ph = form.phone.replace(/[\s-]/g, "");
//     if (!ph) e.phone = "Phone number is required";
//     else if (!/^(\+92|0)[0-9]{9,10}$/.test(ph)) e.phone = "Enter valid number (03xx-xxxxxxx)";
//     setErrors(e);
//     return !Object.keys(e).length;
//   };

//   const canNext = () => {
//     if (step === 1) return !!doctor;
//     if (step === 2) return !!date && !!branch;
//     if (step === 3) return !!time;
//     if (step === 4) return true; // validated on submit
//     return true;
//   };

//   const handleNext = () => {
//     if (step === 4 && !validateInfo()) return;
//     if (!canNext()) return;
//     setStep(s => s + 1);
//   };

//   const handleConfirm = () => {
//     if (!validateInfo()) { setStep(4); return; }
//     setDone(true);
//   };

//   const handleClose = () => {
//     onClose();
//     setTimeout(() => {
//       setStep(preselectedDoctor ? 2 : 1);
//       setDoctor(preselectedDoctor || null);
//       setDate(""); setBranch(""); setTime(""); setApptType("in-person");
//       setForm({ name: "", phone: "", email: "", age: "", gender: "", problem: "" });
//       setErrors({}); setDone(false);
//     }, 350);
//   };

//   if (!isOpen) return null;

//   const stepTitles = ["Select Doctor", "Date & Branch", "Time & Type", "Your Details", "Confirm"];

//   return (
//     <AnimatePresence>
//       <motion.div
//         className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
//         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//       >
//         {/* Backdrop */}
//         <motion.div
//           className="absolute inset-0 bg-slate-900/65 backdrop-blur-sm"
//           onClick={handleClose}
//           initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//         />

//         {/* Modal */}
//         <motion.div
//           initial={{ opacity: 0, y: 60, scale: 0.96 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           exit={{ opacity: 0, y: 40, scale: 0.97 }}
//           transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
//           className="relative bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl shadow-2xl flex flex-col overflow-hidden"
//           style={{ maxHeight: "92vh" }}
//         >
//           {/* Top gradient bar */}
//           <div className="h-1.5 w-full flex-shrink-0"
//             style={{ background: "linear-gradient(90deg,#0ea5e9 0%,#8b5cf6 50%,#ec4899 100%)" }} />

//           {/* Header */}
//           {!done && (
//             <div className="flex-shrink-0">
//               <div className="flex items-center justify-between px-5 pt-4 pb-2">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-xl flex items-center justify-center"
//                     style={{ background: "linear-gradient(135deg,#0ea5e9,#ec4899)" }}>
//                     <FaHeartbeat size={15} className="text-white" />
//                   </div>
//                   <div>
//                     <p className="font-extrabold text-slate-900 text-sm leading-tight">Book Appointment</p>
//                     <p className="text-xs text-slate-400">Step {step} of 5 — {stepTitles[step - 1]}</p>
//                   </div>
//                 </div>
//                 <button onClick={handleClose}
//                   className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors flex-shrink-0">
//                   <FiX size={15} />
//                 </button>
//               </div>
//               <StepBar current={step} />
//               {/* Divider */}
//               <div className="h-px bg-slate-100 mx-5" />
//             </div>
//           )}

//           {/* Step title */}
//           {!done && (
//             <div className="px-5 pt-4 pb-0 flex-shrink-0">
//               <h3 className="text-lg font-extrabold text-slate-900">{stepTitles[step - 1]}</h3>
//             </div>
//           )}

//           {/* Content */}
//           <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
//             {done ? (
//               <SuccessScreen doctor={doctor} date={date} time={time} branch={branch} form={form} onClose={handleClose} />
//             ) : (
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={step}
//                   initial={{ opacity: 0, x: 24 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -24 }}
//                   transition={{ duration: 0.22 }}
//                 >
//                   {step === 1 && <StepDoctor selected={doctor} onSelect={setDoctor} />}
//                   {step === 2 && <StepDate doctor={doctor} date={date} branch={branch} onDateChange={setDate} onBranchChange={setBranch} />}
//                   {step === 3 && <StepTime doctor={doctor} date={date} selectedTime={time} onTimeSelect={setTime} apptType={apptType} onTypeChange={setApptType} />}
//                   {step === 4 && <StepInfo form={form} onChange={updateForm} errors={errors} />}
//                   {step === 5 && <StepConfirm doctor={doctor} date={date} time={time} branch={branch} apptType={apptType} form={form} />}
//                 </motion.div>
//               </AnimatePresence>
//             )}
//           </div>

//           {/* Footer buttons */}
//           {!done && (
//             <div className="flex-shrink-0 px-5 py-4 border-t border-slate-100 flex gap-3">
//               {step > 1 && (
//                 <motion.button
//                   whileTap={{ scale: 0.97 }}
//                   onClick={() => setStep(s => s - 1)}
//                   className="flex items-center gap-1.5 px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
//                 >
//                   <FiChevronLeft size={15} /> Back
//                 </motion.button>
//               )}
//               <motion.button
//                 whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
//                 onClick={step === 5 ? handleConfirm : handleNext}
//                 disabled={!canNext() && step !== 4 && step !== 5}
//                 className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-extrabold text-white text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                 style={{ background: "linear-gradient(135deg,#0ea5e9,#8b5cf6,#ec4899)" }}
//               >
//                 {step === 5 ? (
//                   <><FiCheckCircle size={15} /> Confirm Booking</>
//                 ) : (
//                   <>Continue <FiChevronRight size={15} /></>
//                 )}
//               </motion.button>
//             </div>
//           )}
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// src/components/booking/BookingModal.jsx
// ── Premium Booking Modal — Enhanced UI + Working Time Slots ─

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX, FiCalendar, FiClock, FiUser, FiPhone, FiMail,
  FiMapPin, FiCheckCircle, FiChevronRight, FiChevronLeft,
  FiVideo, FiMic, FiAlertCircle, FiSearch, FiStar,
} from "react-icons/fi";
import {
  FaWhatsapp, FaHeartbeat, FaStar, FaRegStar, FaStarHalfAlt,
} from "react-icons/fa";
import { TbStethoscope, TbBone, TbEar } from "react-icons/tb";
import { GiTooth, GiBrain, GiBabyFace } from "react-icons/gi";
import { MdFace, MdOutlineContentCut } from "react-icons/md";

// ─── DOCTORS DATA ─────────────────────────────────────────────
const DOCTORS = [
  {
    id: 1, name: "Dr. Sarah Ahmed", title: "MBBS, FCPS (Dermatology)",
    specialty: "Skin & Dermatology", tag: "skin", fee: "PKR 3,000", rating: 4.9, reviews: 312,
    experience: "14 Yrs", available: true, color: "#ec4899", Icon: MdFace,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
    branch: ["Gulberg", "DHA"],
    schedule: { Monday: "10:00–14:00", Wednesday: "15:00–19:00", Friday: "10:00–13:00", Saturday: "16:00–20:00" },
  },
  {
    id: 2, name: "Dr. Omar Farooq", title: "BDS, FCPS (Oral Surgery)",
    specialty: "Dental Care", tag: "dental", fee: "PKR 2,500", rating: 4.8, reviews: 489,
    experience: "11 Yrs", available: true, color: "#0ea5e9", Icon: GiTooth,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80",
    branch: ["Gulberg"],
    schedule: { Monday: "09:00–13:00", Tuesday: "14:00–18:00", Thursday: "09:00–13:00", Saturday: "10:00–15:00" },
  },
  {
    id: 3, name: "Dr. Fatima Malik", title: "MBBS, MRCOG (Gynecology)",
    specialty: "Gynecology & Obstetrics", tag: "gynecology", fee: "PKR 4,000", rating: 5.0, reviews: 267,
    experience: "16 Yrs", available: true, color: "#a855f7", Icon: GiBabyFace,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=200&q=80",
    branch: ["Gulberg", "DHA"],
    schedule: { Tuesday: "10:00–14:00", Thursday: "15:00–19:00", Saturday: "09:00–13:00" },
  },
  {
    id: 4, name: "Dr. Hassan Raza", title: "MBBS, FCPS (Orthopedics)",
    specialty: "Orthopedic Surgery", tag: "orthopedic", fee: "PKR 3,500", rating: 4.9, reviews: 543,
    experience: "18 Yrs", available: true, color: "#f59e0b", Icon: TbBone,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
    branch: ["Gulberg"],
    schedule: { Monday: "09:00–12:00", Wednesday: "16:00–20:00", Friday: "09:00–12:00", Sunday: "11:00–15:00" },
  },
  {
    id: 5, name: "Dr. Zara Khan", title: "MBBS, FCPS (ENT)",
    specialty: "ENT Specialist", tag: "ent", fee: "PKR 2,800", rating: 4.7, reviews: 198,
    experience: "9 Yrs", available: true, color: "#14b8a6", Icon: TbEar,
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=200&q=80",
    branch: ["DHA"],
    schedule: { Tuesday: "10:00–14:00", Thursday: "15:30–19:00", Saturday: "10:00–14:00" },
  },
  {
    id: 6, name: "Dr. Bilal Siddiqui", title: "MBBS, FCPS (Neurology)",
    specialty: "Neurology", tag: "neurology", fee: "PKR 5,000", rating: 4.9, reviews: 421,
    experience: "20 Yrs", available: true, color: "#6366f1", Icon: GiBrain,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=200&q=80",
    branch: ["Gulberg", "DHA"],
    schedule: { Monday: "14:00–18:00", Wednesday: "14:00–18:00", Friday: "14:00–17:00" },
  },
  {
    id: 7, name: "Dr. Nadia Hussain", title: "MBBS, Fellowship Hair Restoration",
    specialty: "Hair Transplant", tag: "hair", fee: "Free Consult", rating: 4.8, reviews: 175,
    experience: "10 Yrs", available: true, color: "#8b5cf6", Icon: MdOutlineContentCut,
    image: "https://images.unsplash.com/photo-1643297654416-05795d62e39c?auto=format&fit=crop&w=200&q=80",
    branch: ["Gulberg"],
    schedule: { Monday: "11:00–15:00", Thursday: "16:00–20:00", Saturday: "10:00–14:00" },
  },
  {
    id: 8, name: "Dr. Kamran Ali", title: "MBBS, FCPS (General Medicine)",
    specialty: "General Medicine", tag: "general", fee: "PKR 2,000", rating: 4.9, reviews: 712,
    experience: "22 Yrs", available: true, color: "#10b981", Icon: TbStethoscope,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80",
    branch: ["Gulberg", "DHA"],
    schedule: { Monday: "09:00–13:00", Tuesday: "14:00–18:00", Thursday: "09:00–13:00", Friday: "14:00–18:00", Saturday: "10:00–14:00" },
  },
];

const SPECIALTIES = ["All", "Skin & Dermatology", "Dental Care", "Gynecology & Obstetrics", "Orthopedic Surgery", "ENT Specialist", "Neurology", "Hair Transplant", "General Medicine"];

// ─── HELPERS ──────────────────────────────────────────────────
function generateSlots(rangeStr) {
  if (!rangeStr) return [];
  const [start, end] = rangeStr.split("–");
  const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const slots = [];
  let cur = toMin(start), endMin = toMin(end);
  while (cur < endMin) {
    const h = Math.floor(cur / 60), m = cur % 60;
    const ampm = h >= 12 ? "PM" : "AM";
    slots.push(`${(h % 12 || 12)}:${m.toString().padStart(2, "0")} ${ampm}`);
    cur += 30;
  }
  return slots;
}

function getNext14Days() {
  const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const SHORT = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i);
    return {
      date: d.toISOString().split("T")[0],
      dayName: DAYS[d.getDay()],
      shortDay: SHORT[d.getDay()],
      display: d.getDate(),
      month: MONTHS[d.getMonth()],
      isToday: i === 0,
      isTomorrow: i === 1,
    };
  });
}

function StarRow({ rating, color }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => {
        if (i <= Math.floor(rating)) return <FaStar key={i} style={{ color, fontSize: 10 }} />;
        if (i - 0.5 <= rating) return <FaStarHalfAlt key={i} style={{ color, fontSize: 10 }} />;
        return <FaRegStar key={i} style={{ color: "#d1d5db", fontSize: 10 }} />;
      })}
    </span>
  );
}

// ─── STEP PROGRESS BAR ────────────────────────────────────────
const STEP_LABELS = ["Doctor", "Schedule", "Time", "Details", "Review"];

function ProgressBar({ step }) {
  const pct = ((step - 1) / 4) * 100;
  return (
    <div className="px-6 pb-3 pt-1">
      <div className="flex justify-between mb-2">
        {STEP_LABELS.map((label, i) => {
          const s = i + 1;
          const done = step > s, active = step === s;
          return (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-400 ${
                done ? "bg-emerald-500 text-white shadow-md shadow-emerald-200"
                : active ? "text-white shadow-lg" : "bg-slate-100 text-slate-400"
              }`}
              style={active ? { background: "linear-gradient(135deg,#0ea5e9,#ec4899)", boxShadow: "0 4px 12px rgba(14,165,233,0.4)" } : {}}>
                {done ? <FiCheckCircle size={11} /> : s}
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-wide ${
                active ? "text-sky-600" : done ? "text-emerald-500" : "text-slate-300"
              }`}>{label}</span>
            </div>
          );
        })}
      </div>
      <div className="relative h-1 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: "linear-gradient(90deg,#0ea5e9,#8b5cf6,#ec4899)" }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

// ─── STEP 1: DOCTOR SELECT ────────────────────────────────────
function StepDoctor({ selected, onSelect }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = DOCTORS.filter(d => {
    const matchSpec = filter === "All" || d.specialty === filter;
    const matchSearch = !search ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase());
    return matchSpec && matchSearch;
  });

  return (
    <div className="px-5 pb-4">
      {/* Search */}
      <div className="relative mb-3">
        <FiSearch size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or specialty…"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border border-slate-200 bg-slate-50 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100/60 transition-all"
        />
      </div>

      {/* Specialty pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none" style={{ scrollbarWidth: "none" }}>
        {["All","Skin & Dermatology","Dental Care","Gynecology & Obstetrics","ENT Specialist","Neurology","Orthopedic Surgery"].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
              filter === s
                ? "text-white border-transparent shadow-md"
                : "bg-white border-slate-200 text-slate-500 hover:border-sky-300"
            }`}
            style={filter === s ? { background: "linear-gradient(135deg,#0ea5e9,#ec4899)" } : {}}>
            {s === "All" ? "All Doctors" : s.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Doctor list */}
      <div className="space-y-2 max-h-[320px] overflow-y-auto pr-0.5" style={{ scrollbarWidth: "thin" }}>
        {filtered.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            <FiSearch size={24} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">No doctors found</p>
          </div>
        )}
        {filtered.map((d, i) => (
          <motion.button
            key={d.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ scale: 1.015, y: -1 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelect(d)}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 text-left transition-all duration-200 group ${
              selected?.id === d.id
                ? "shadow-lg"
                : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-md"
            }`}
            style={selected?.id === d.id ? {
              borderColor: d.color + "60",
              background: `linear-gradient(135deg, ${d.color}08, ${d.color}04)`,
              boxShadow: `0 4px 20px ${d.color}20`,
            } : {}}
          >
            {/* Doctor image */}
            <div className="relative flex-shrink-0">
              <img src={d.image} alt={d.name}
                className="w-14 h-14 rounded-2xl object-cover"
                style={{ border: `2px solid ${selected?.id === d.id ? d.color + "50" : "#f1f5f9"}` }}
              />
              <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white ${
                d.available ? "bg-emerald-400" : "bg-slate-300"
              }`} />
              {/* Specialty icon badge */}
              <div className="absolute -top-1 -left-1 w-5 h-5 rounded-lg flex items-center justify-center"
                style={{ background: d.color + "20" }}>
                <d.Icon size={10} style={{ color: d.color }} />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-1">
                <p className="font-extrabold text-slate-900 text-sm leading-tight truncate">{d.name}</p>
                {selected?.id === d.id && (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: d.color }}>
                    <FiCheckCircle size={11} className="text-white" />
                  </div>
                )}
              </div>
              <p className="text-[11px] text-slate-400 truncate mb-1.5">{d.title}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <StarRow rating={d.rating} color={d.color} />
                  <span className="text-[11px] font-bold text-slate-600">{d.rating}</span>
                  <span className="text-[10px] text-slate-400">({d.reviews})</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: d.color + "15", color: d.color }}>
                  {d.fee}
                </span>
                <span className="text-[10px] text-slate-400">{d.experience}</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ─── STEP 2: DATE & BRANCH ────────────────────────────────────
function StepDate({ doctor, date, branch, onDateChange, onBranchChange }) {
  const days = getNext14Days();
  const doctorDays = doctor ? Object.keys(doctor.schedule) : [];

  // Count available days in next 14
  const availCount = days.filter(d => doctorDays.includes(d.dayName)).length;

  return (
    <div className="px-5 pb-4">
      {/* Doctor summary pill */}
      {doctor && (
        <div className="flex items-center gap-3 p-3 rounded-2xl mb-4"
          style={{ background: `linear-gradient(135deg, ${doctor.color}10, ${doctor.color}05)`, border: `1px solid ${doctor.color}25` }}>
          <img src={doctor.image} alt={doctor.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-900 text-sm truncate">{doctor.name}</p>
            <p className="text-xs text-slate-400">{doctor.specialty}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs font-bold" style={{ color: doctor.color }}>{doctor.fee}</p>
            <p className="text-[10px] text-slate-400">{availCount} days/2wks</p>
          </div>
        </div>
      )}

      {/* Branch */}
      <div className="mb-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Select Branch</p>
        <div className="flex gap-2">
          {(doctor?.branch || ["Gulberg", "DHA"]).map(b => (
            <motion.button key={b} whileTap={{ scale: 0.97 }}
              onClick={() => onBranchChange(b)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all border-2 ${
                branch === b ? "text-white border-transparent shadow-lg" : "bg-white border-slate-200 text-slate-500 hover:border-sky-200"
              }`}
              style={branch === b ? {
                background: "linear-gradient(135deg,#0ea5e9,#0284c7)",
                boxShadow: "0 6px 20px rgba(14,165,233,0.35)",
              } : {}}>
              <FiMapPin size={14} />
              {b}
              {branch === b && <FiCheckCircle size={13} />}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Doctor's available days legend */}
      {doctor && (
        <div className="mb-3 flex items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "linear-gradient(135deg,#0ea5e9,#ec4899)" }} />
            <span className="text-slate-500 font-medium">Doctor available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-slate-200" />
            <span className="text-slate-400">Not available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-sky-500" />
            <span className="text-slate-500 font-medium">Selected</span>
          </div>
        </div>
      )}

      {/* Calendar grid */}
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Select Date</p>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map(d => {
          const isAvail = !doctorDays.length || doctorDays.includes(d.dayName);
          const isSelected = date === d.date;

          return (
            <motion.button
              key={d.date}
              disabled={!isAvail}
              onClick={() => isAvail && onDateChange(d.date)}
              whileHover={isAvail ? { scale: 1.1, y: -2 } : {}}
              whileTap={isAvail ? { scale: 0.95 } : {}}
              className={`relative flex flex-col items-center py-2 px-0.5 rounded-xl text-center transition-all duration-200 ${
                !isAvail ? "cursor-not-allowed opacity-40" : "cursor-pointer"
              }`}
              style={isSelected ? {
                background: "linear-gradient(135deg,#0ea5e9,#ec4899)",
                color: "white",
                boxShadow: "0 6px 20px rgba(14,165,233,0.4)",
                borderRadius: "14px",
              } : isAvail ? {
                background: "white",
                border: "1.5px solid #e2e8f0",
                color: "#334155",
              } : {
                background: "#f8fafc",
                border: "1px solid #f1f5f9",
              }}
            >
              <span className={`text-[9px] font-black uppercase tracking-wide ${isSelected ? "text-white/80" : isAvail ? "text-slate-400" : "text-slate-300"}`}>
                {d.shortDay}
              </span>
              <span className={`text-sm font-extrabold leading-tight my-0.5 ${isSelected ? "text-white" : isAvail ? "text-slate-800" : "text-slate-300"}`}>
                {d.display}
              </span>
              {d.isToday && (
                <span className={`text-[8px] font-black ${isSelected ? "text-white/70" : "text-sky-500"}`}>TODAY</span>
              )}
              {d.isTomorrow && !d.isToday && (
                <span className={`text-[8px] font-bold ${isSelected ? "text-white/70" : "text-slate-400"}`}>TMR</span>
              )}
              {/* Available dot */}
              {isAvail && !isSelected && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full" style={{ background: "#0ea5e9" }} />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Selected date info */}
      {date && doctor && (
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center justify-between p-3 rounded-2xl"
          style={{ background: "linear-gradient(135deg,#f0f9ff,#fdf2f8)", border: "1px solid #bae6fd" }}>
          <div className="flex items-center gap-2">
            <FiCalendar size={13} className="text-sky-500" />
            <span className="text-xs font-bold text-slate-700">
              {new Date(date).toLocaleDateString("en-PK", { weekday: "long", day: "numeric", month: "long" })}
            </span>
          </div>
          {doctor.schedule[new Date(date).toLocaleDateString("en-US", { weekday: "long" })] && (
            <span className="text-[11px] font-bold text-sky-600 bg-sky-100 px-2 py-0.5 rounded-full">
              {doctor.schedule[new Date(date).toLocaleDateString("en-US", { weekday: "long" })]}
            </span>
          )}
        </motion.div>
      )}
    </div>
  );
}

// ─── STEP 3: TIME & TYPE ─────────────────────────────────────
function StepTime({ doctor, date, selectedTime, onTimeSelect, apptType, onTypeChange }) {
  const dayName = date ? new Date(date).toLocaleDateString("en-US", { weekday: "long" }) : "";
  const scheduleRange = doctor?.schedule?.[dayName];
  const slots = scheduleRange ? generateSlots(scheduleRange) : [];
  const isAvailableDay = !!scheduleRange;

  return (
    <div className="px-5 pb-4">
      {/* Appointment type */}
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Appointment Type</p>
      <div className="grid grid-cols-3 gap-2 mb-5">
        {[
          { value: "in-person", label: "In Person",   icon: FiUser,  color: "#0ea5e9", desc: "Visit clinic" },
          { value: "video",     label: "Video Call",  icon: FiVideo, color: "#8b5cf6", desc: "Google Meet" },
          { value: "audio",     label: "Audio Call",  icon: FiMic,   color: "#ec4899", desc: "Phone call" },
        ].map(({ value, label, icon: Icon, color, desc }) => {
          const active = apptType === value;
          return (
            <motion.button key={value} whileTap={{ scale: 0.96 }} onClick={() => onTypeChange(value)}
              className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl border-2 font-bold text-xs transition-all ${
                active ? "shadow-lg" : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
              }`}
              style={active ? {
                borderColor: color, background: `${color}10`, color,
                boxShadow: `0 4px 16px ${color}30`,
              } : {}}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${active ? "" : "bg-slate-50"}`}
                style={active ? { background: `${color}20` } : {}}>
                <Icon size={16} style={active ? { color } : { color: "#94a3b8" }} />
              </div>
              <span>{label}</span>
              <span className="text-[9px] font-medium opacity-60">{desc}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Time slots */}
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
        Available Slots
        {slots.length > 0 && <span className="text-sky-500 ml-1 normal-case font-semibold">({slots.length} available)</span>}
      </p>

      {!date ? (
        <div className="flex flex-col items-center justify-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <FiCalendar size={24} className="text-slate-300 mb-2" />
          <p className="text-sm font-semibold text-slate-400">Select a date first</p>
          <p className="text-xs text-slate-300 mt-0.5">Go back to Step 2</p>
        </div>
      ) : !isAvailableDay ? (
        /* ── Doctor NOT available on selected day ─── */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl overflow-hidden"
        >
          {/* Red warning header */}
          <div className="px-4 py-3 flex items-center gap-3"
            style={{ background: "linear-gradient(135deg,#fef2f2,#fff1f2)", border: "1.5px solid #fecaca", borderBottom: "none", borderRadius: "16px 16px 0 0" }}>
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
              <FiAlertCircle size={20} className="text-red-500" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-red-700">Doctor Not Available</p>
              <p className="text-xs text-red-500">
                {new Date(date).toLocaleDateString("en-PK", { weekday: "long", day: "numeric", month: "short" })}
              </p>
            </div>
          </div>

          {/* Available days list */}
          <div className="px-4 py-3 bg-white border border-t-0 border-slate-100 rounded-b-2xl">
            <p className="text-xs font-bold text-slate-500 mb-2">
              {doctor?.name.split(" ")[1]} is available on:
            </p>
            <div className="flex flex-wrap gap-2">
              {doctor && Object.entries(doctor.schedule).map(([day, time]) => (
                <div key={day} className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <div>
                    <p className="text-xs font-bold text-emerald-800">{day}</p>
                    <p className="text-[10px] text-emerald-600">{time}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
              <FiChevronLeft size={12} />
              Go back and pick one of the highlighted dates
            </p>
          </div>
        </motion.div>
      ) : (
        /* ── Slots grid ─────────────────────────────── */
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Schedule info banner */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl mb-3"
            style={{ background: "linear-gradient(135deg,#f0f9ff,#fdf2f8)", border: "1px solid #bae6fd" }}>
            <FiClock size={13} className="text-sky-500 flex-shrink-0" />
            <span className="text-xs text-slate-600">
              <span className="font-bold">{dayName}</span> session:{" "}
              <span className="font-bold text-sky-600">{scheduleRange}</span>
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 max-h-[200px] overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
            {slots.map((slot, i) => {
              const isSelected = selectedTime === slot;
              return (
                <motion.button
                  key={slot}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onTimeSelect(slot)}
                  className={`py-2.5 px-1 rounded-xl text-xs font-bold text-center transition-all duration-200 ${
                    !isSelected ? "bg-white border border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-sky-50" : ""
                  }`}
                  style={isSelected ? {
                    background: "linear-gradient(135deg,#0ea5e9,#ec4899)",
                    color: "white",
                    boxShadow: "0 4px 14px rgba(14,165,233,0.4)",
                    border: "none",
                  } : {}}
                >
                  {slot}
                  {isSelected && (
                    <div className="flex justify-center mt-0.5">
                      <FiCheckCircle size={9} className="text-white/80" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── STEP 4: PATIENT DETAILS ──────────────────────────────────
function StepDetails({ form, onChange, errors }) {
  return (
    <div className="px-5 pb-4">
      <p className="text-xs text-slate-400 mb-4">Your details are needed to confirm the appointment</p>

      <div className="space-y-3">
        {[
          { key: "name",  label: "Full Name",    icon: FiUser,  type: "text",  ph: "e.g. Ahmed Khan",    req: true },
          { key: "phone", label: "Phone Number", icon: FiPhone, type: "tel",   ph: "03xx-xxxxxxx",       req: true },
          { key: "email", label: "Email",        icon: FiMail,  type: "email", ph: "your@email.com",     req: false },
        ].map(({ key, label, icon: Icon, type, ph, req }) => (
          <div key={key}>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">
              {label} {req && <span className="text-pink-400 normal-case">*</span>}
            </label>
            <div className="relative">
              <Icon size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={form[key]} onChange={e => onChange(key, e.target.value)}
                type={type} placeholder={ph}
                className={`w-full pl-9 pr-4 py-3 rounded-xl text-sm font-medium border-2 bg-slate-50 focus:bg-white focus:outline-none transition-all ${
                  errors[key] ? "border-pink-300 bg-pink-50/50" : "border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100/60"
                }`}
              />
            </div>
            {errors[key] && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                className="text-xs text-pink-500 mt-1 flex items-center gap-1">
                <FiAlertCircle size={11} /> {errors[key]}
              </motion.p>
            )}
          </div>
        ))}

        {/* Age + Gender */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Age</label>
            <input
              value={form.age} onChange={e => onChange("age", e.target.value)}
              type="number" min="1" max="120" placeholder="Age"
              className="w-full px-4 py-3 rounded-xl text-sm font-medium border-2 border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100/60 transition-all"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Gender</label>
            <select
              value={form.gender} onChange={e => onChange("gender", e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm font-medium border-2 border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-400 appearance-none transition-all"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Problem */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">
            Symptoms / Reason <span className="normal-case font-medium text-slate-300">(optional)</span>
          </label>
          <textarea
            value={form.problem} onChange={e => onChange("problem", e.target.value)}
            placeholder="Briefly describe your symptoms or reason for visit…"
            rows={3}
            className="w-full px-4 py-3 rounded-xl text-sm font-medium border-2 border-slate-200 bg-slate-50 focus:bg-white resize-none focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100/60 transition-all"
          />
        </div>
      </div>
    </div>
  );
}

// ─── STEP 5: REVIEW ───────────────────────────────────────────
function StepReview({ doctor, date, time, branch, apptType, form }) {
  const typeLabel = { "in-person": "🏥 In-Person Visit", video: "📹 Video Consultation", audio: "📞 Audio Call" };
  const sections = [
    {
      title: "Appointment",
      rows: [
        { label: "Doctor",    value: doctor?.name, sub: doctor?.specialty },
        { label: "Date",      value: date ? new Date(date).toLocaleDateString("en-PK", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "—" },
        { label: "Time",      value: time || "—" },
        { label: "Branch",    value: branch || "—" },
        { label: "Type",      value: typeLabel[apptType] },
        { label: "Fee",       value: doctor?.fee, highlight: true },
      ]
    },
    {
      title: "Patient",
      rows: [
        { label: "Name",    value: form.name },
        { label: "Phone",   value: form.phone },
        ...(form.email ? [{ label: "Email", value: form.email }] : []),
        ...(form.age ? [{ label: "Age", value: form.age + " years" }] : []),
        ...(form.gender ? [{ label: "Gender", value: form.gender }] : []),
        ...(form.problem ? [{ label: "Problem", value: form.problem }] : []),
      ]
    }
  ];

  return (
    <div className="px-5 pb-4">
      {/* Doctor mini card */}
      {doctor && (
        <div className="flex items-center gap-3 p-3 rounded-2xl mb-4"
          style={{ background: `linear-gradient(135deg, ${doctor.color}10, ${doctor.color}05)`, border: `1px solid ${doctor.color}30` }}>
          <img src={doctor.image} alt={doctor.name} className="w-12 h-12 rounded-xl object-cover" />
          <div>
            <p className="font-extrabold text-slate-900 text-sm">{doctor.name}</p>
            <p className="text-xs text-slate-400">{doctor.specialty}</p>
            <StarRow rating={doctor.rating} color={doctor.color} />
          </div>
          <div className="ml-auto text-right">
            <p className="text-sm font-extrabold" style={{ color: doctor.color }}>{doctor.fee}</p>
          </div>
        </div>
      )}

      {sections.map(section => (
        <div key={section.title} className="mb-3">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{section.title}</p>
          <div className="rounded-2xl overflow-hidden border border-slate-100">
            {section.rows.map((row, i) => (
              <div key={i} className={`flex items-start gap-3 px-4 py-2.5 ${
                i % 2 === 0 ? "bg-slate-50/70" : "bg-white"
              } ${i < section.rows.length - 1 ? "border-b border-slate-100" : ""}`}>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide w-14 flex-shrink-0 mt-0.5">{row.label}</span>
                <div>
                  <span className={`text-sm font-semibold ${row.highlight ? "" : "text-slate-700"}`}
                    style={row.highlight ? { color: doctor?.color } : {}}>
                    {row.value}
                  </span>
                  {row.sub && <p className="text-xs text-slate-400">{row.sub}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex items-start gap-2.5 p-3 rounded-xl mt-2"
        style={{ background: "linear-gradient(135deg,#f0f9ff,#fdf2f8)", border: "1px solid #bae6fd" }}>
        <FiAlertCircle size={14} className="text-sky-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-sky-700 leading-relaxed">
          Please arrive <strong>10 minutes early</strong>. Bring any previous medical reports or prescriptions.
        </p>
      </div>
    </div>
  );
}

// ─── SUCCESS ──────────────────────────────────────────────────
function SuccessScreen({ doctor, date, time, branch, form, onClose }) {
  const bookingRef = "PC" + Date.now().toString().slice(-8);
  const msg = encodeURIComponent(
    `Assalam o Alaikum! I just booked an appointment at Premium Clinic.\n\nDoctor: ${doctor?.name}\nDate: ${date}\nTime: ${time}\nBranch: ${branch}\nRef: ${bookingRef}\n\nPlease confirm.`
  );

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="p-6 text-center"
    >
      {/* Animated success circle */}
      <div className="relative w-24 h-24 mx-auto mb-5">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#0ea5e9,#8b5cf6,#ec4899)" }}
        >
          <FiCheckCircle size={44} className="text-white" />
        </motion.div>
        {/* Pulse rings */}
        {[1, 2].map(i => (
          <motion.div key={i}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1.5, delay: i * 0.4, repeat: Infinity }}
            className="absolute inset-0 rounded-full"
            style={{ border: "2px solid #0ea5e9" }}
          />
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h3 className="text-2xl font-extrabold text-slate-900 mb-1">Booked Successfully!</h3>
        <p className="text-slate-500 text-sm mb-5">Your appointment has been confirmed ✓</p>

        {/* Booking ref card */}
        <div className="rounded-2xl overflow-hidden mb-4 shadow-lg">
          <div className="px-5 py-3 flex items-center justify-between"
            style={{ background: "linear-gradient(135deg,#0ea5e9,#8b5cf6,#ec4899)" }}>
            <div className="text-left">
              <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Booking Reference</p>
              <p className="text-white font-extrabold text-xl tracking-widest">{bookingRef}</p>
            </div>
            <FaHeartbeat size={28} className="text-white/40 animate-pulse" />
          </div>
          <div className="bg-white">
            {[
              { label: "Doctor",  val: doctor?.name },
              { label: "Date",    val: date ? new Date(date).toLocaleDateString("en-PK", { weekday: "short", day: "numeric", month: "short" }) : "" },
              { label: "Time",    val: time },
              { label: "Branch",  val: branch },
              { label: "Patient", val: form.name },
            ].map((r, i) => (
              <div key={i} className={`flex gap-3 px-4 py-2.5 ${i % 2 === 0 ? "bg-slate-50/60" : "bg-white"} ${i < 4 ? "border-b border-slate-100" : ""}`}>
                <span className="text-[10px] font-bold text-slate-400 uppercase w-14 flex-shrink-0">{r.label}</span>
                <span className="text-sm font-semibold text-slate-700">{r.val}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-4">
          Save your booking reference <strong className="text-slate-600">{bookingRef}</strong> for future reference
        </p>

        <div className="flex gap-3">
          <motion.a
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            href={`https://wa.me/923001234567?text=${msg}`}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-extrabold text-sm shadow-xl"
            style={{ background: "linear-gradient(135deg,#25D366,#20ba5a)", boxShadow: "0 6px 20px rgba(37,211,102,0.35)" }}>
            <FaWhatsapp size={18} /> Share on WhatsApp
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={onClose}
            className="flex-1 py-3.5 rounded-2xl bg-slate-100 text-slate-700 font-extrabold text-sm hover:bg-slate-200 transition-colors">
            Done
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── MAIN MODAL ───────────────────────────────────────────────
export default function BookingModal({ isOpen, onClose, preselectedDoctor = null }) {
  const [step,     setStep]     = useState(1);
  const [doctor,   setDoctor]   = useState(null);
  const [date,     setDate]     = useState("");
  const [branch,   setBranch]   = useState("");
  const [time,     setTime]     = useState("");
  const [apptType, setApptType] = useState("in-person");
  const [form,     setForm]     = useState({ name: "", phone: "", email: "", age: "", gender: "", problem: "" });
  const [errors,   setErrors]   = useState({});
  const [done,     setDone]     = useState(false);

  useEffect(() => {
    if (preselectedDoctor && isOpen) {
      setDoctor(preselectedDoctor);
      setStep(2);
    }
  }, [preselectedDoctor, isOpen]);

  // Reset time when date/doctor changes
  useEffect(() => { setTime(""); }, [date, doctor]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(preselectedDoctor ? 2 : 1);
      setDoctor(preselectedDoctor || null);
      setDate(""); setBranch(""); setTime("");
      setApptType("in-person");
      setForm({ name: "", phone: "", email: "", age: "", gender: "", problem: "" });
      setErrors({}); setDone(false);
    }, 350);
  };

  const updateForm = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Full name is required";
    const ph = form.phone.replace(/[\s\-]/g, "");
    if (!ph) e.phone = "Phone number is required";
    else if (!/^(\+92|0)[0-9]{9,10}$/.test(ph)) e.phone = "Enter valid number (03xx-xxxxxxx)";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const canProceed = () => {
    if (step === 1) return !!doctor;
    if (step === 2) return !!date && !!branch;
    if (step === 3) return !!time;
    return true;
  };

  const handleNext = () => {
    if (step === 4 && !validate()) return;
    if (!canProceed() && step !== 4) return;
    setStep(s => s + 1);
  };

  const handleConfirm = () => {
    if (!validate()) { setStep(4); return; }
    setDone(true);
  };

  if (!isOpen) return null;

  const TITLES = ["Select Doctor", "Date & Branch", "Time & Type", "Your Details", "Review & Confirm"];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 backdrop-blur-md"
          style={{ background: "rgba(15,23,42,0.7)" }}
          onClick={handleClose}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl flex flex-col overflow-hidden"
          style={{ maxHeight: "92vh", boxShadow: "0 32px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.1)" }}
        >
          {/* Gradient top stripe */}
          <div className="h-1.5 w-full flex-shrink-0"
            style={{ background: "linear-gradient(90deg,#0ea5e9 0%,#8b5cf6 40%,#ec4899 80%,#f43f5e 100%)" }} />

          {/* Header */}
          {!done && (
            <div className="flex-shrink-0 px-5 pt-4 pb-1">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg,#0ea5e9,#ec4899)", boxShadow: "0 4px 12px rgba(14,165,233,0.4)" }}>
                    <FaHeartbeat size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-900 text-base leading-tight">Book Appointment</p>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Step {step}/5 · <span className="text-sky-500 font-semibold">{TITLES[step - 1]}</span>
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="w-9 h-9 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                  <FiX size={16} />
                </motion.button>
              </div>
              <ProgressBar step={step} />
              <div className="h-px bg-slate-100 mt-2" />
            </div>
          )}

          {/* Step title */}
          {!done && (
            <div className="px-5 pt-3 pb-1 flex-shrink-0">
              <motion.h3
                key={step}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg font-extrabold text-slate-900"
              >
                {TITLES[step - 1]}
              </motion.h3>
            </div>
          )}

          {/* Content area */}
          <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
            {done ? (
              <SuccessScreen doctor={doctor} date={date} time={time} branch={branch} form={form} onClose={handleClose} />
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -28 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  {step === 1 && <StepDoctor selected={doctor} onSelect={d => { setDoctor(d); setDate(""); setBranch(""); setTime(""); }} />}
                  {step === 2 && <StepDate doctor={doctor} date={date} branch={branch} onDateChange={setDate} onBranchChange={setBranch} />}
                  {step === 3 && <StepTime doctor={doctor} date={date} selectedTime={time} onTimeSelect={setTime} apptType={apptType} onTypeChange={setApptType} />}
                  {step === 4 && <StepDetails form={form} onChange={updateForm} errors={errors} />}
                  {step === 5 && <StepReview doctor={doctor} date={date} time={time} branch={branch} apptType={apptType} form={form} />}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Footer */}
          {!done && (
            <div className="flex-shrink-0 px-5 py-4 bg-white/95 border-t border-slate-100 flex gap-3">
              {step > 1 && (
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setStep(s => s - 1)}
                  className="flex items-center gap-1.5 px-5 py-3.5 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
                >
                  <FiChevronLeft size={15} /> Back
                </motion.button>
              )}
              <motion.button
                whileHover={canProceed() || step === 4 ? { scale: 1.02 } : {}}
                whileTap={canProceed() || step === 4 ? { scale: 0.97 } : {}}
                onClick={step === 5 ? handleConfirm : handleNext}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-extrabold text-white text-sm shadow-xl transition-all ${
                  !canProceed() && step !== 4 && step !== 5 ? "opacity-40 cursor-not-allowed" : ""
                }`}
                style={canProceed() || step >= 4 ? {
                  background: "linear-gradient(135deg,#0ea5e9,#8b5cf6,#ec4899)",
                  boxShadow: "0 6px 24px rgba(14,165,233,0.4)",
                } : { background: "#e2e8f0" }}
              >
                {step === 5 ? (
                  <><FiCheckCircle size={16} /> Confirm Booking</>
                ) : (
                  <>Continue <FiChevronRight size={15} /></>
                )}
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}