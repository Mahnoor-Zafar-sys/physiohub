// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence, useInView } from "framer-motion";
// import {
//   FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt,
//   FaClock, FaAmbulance, FaCheckCircle, FaPaperPlane,
//   FaInstagram, FaFacebook, FaYoutube, FaChevronDown, FaHeartbeat,
// } from "react-icons/fa";
// import { MdEmergency, MdOutlineLocalHospital } from "react-icons/md";
// import { FiCalendar, FiMessageCircle } from "react-icons/fi";

// // ── Animation Variants ────────────────────────────────────────────────────────
// const fadeUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: (i = 0) => ({
//     opacity: 1, y: 0,
//     transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
//   }),
// };
// const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

// function AnimSection({ children, className = "", delay = 0 }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });
//   return (
//     <motion.div ref={ref} variants={fadeUp} custom={delay}
//       initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
//       {children}
//     </motion.div>
//   );
// }

// // ── FAQ Data ──────────────────────────────────────────────────────────────────
// const faqs = [
//   { q: "What are your clinic's opening hours?", a: "We are open Monday–Saturday from 9:00 AM to 9:00 PM, and Sunday from 10:00 AM to 4:00 PM. Emergency services are available 24/7." },
//   { q: "How can I book an appointment online?", a: "You can book through our website's Appointment page, WhatsApp, or by calling our reception. We confirm within 30 minutes." },
//   { q: "Do you offer online/video consultations?", a: "Yes! We offer video, audio, and chat consultations via Zoom and Google Meet. Book through the Online Consultation section." },
//   { q: "Is parking available at your clinic?", a: "Yes, we have a dedicated parking facility at both our branches with ample space for patients and visitors." },
//   { q: "How do I access my medical reports online?", a: "Log in to your Patient Portal using the credentials provided at registration. All reports, prescriptions, and history are available there." },
// ];

// // ── Branch Data ───────────────────────────────────────────────────────────────
// const branches = [
//   {
//     name: "Main Branch – Gulberg",
//     address: "123 Medical Avenue, Gulberg III, Lahore",
//     phone: "+92 300 123 4567",
//     hours: "Mon–Sat: 9AM–9PM",
//     emergency: "24/7 Emergency",
//     mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.3!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjEnMzEuMyJF!5e0!3m2!1sen!2s!4v1234567890",
//   },
//   {
//     name: "Branch 2 – DHA",
//     address: "45 Healthcare Blvd, DHA Phase 5, Lahore",
//     phone: "+92 300 765 4321",
//     hours: "Mon–Sat: 10AM–8PM",
//     emergency: "Emergency Referral",
//     mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.3!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjEnMzEuMyJF!5e0!3m2!1sen!2s!4v1234567890",
//   },
// ];

// // ── FAQ Item ──────────────────────────────────────────────────────────────────
// function FAQItem({ q, a, index }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <motion.div variants={fadeUp} custom={index * 0.05}
//       className="border border-sky-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
//       <button onClick={() => setOpen(!open)}
//         className="w-full flex items-center justify-between px-6 py-5 text-left group">
//         <span className="text-slate-700 font-semibold text-sm md:text-base group-hover:text-sky-600 transition-colors duration-200">{q}</span>
//         <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0 ml-4">
//           <FaChevronDown className="text-sky-500 text-sm" />
//         </motion.div>
//       </button>
//       <AnimatePresence>
//         {open && (
//           <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
//             className="overflow-hidden">
//             <div className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-sky-50 pt-4 bg-gradient-to-br from-sky-50/50 to-white">{a}</div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

// // ── Main ContactUs Page ───────────────────────────────────────────────────────
// export default function ContactUs({ onNavigate }) {
//   const whatsappNumber = "+923001234567";
//   const welcomeMessage = encodeURIComponent("Hello Premium Clinic, I want to inquire about your healthcare services.");

//   const [formData, setFormData] = useState({ name: "", phone: "", email: "", subject: "", department: "", message: "" });
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState(0);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setTimeout(() => { setLoading(false); setSubmitted(true); }, 1800);
//   };

//   return (
//     <div className="min-h-screen font-body relative"
//       style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #fdf2f8 100%)" }}>

//       {/* ── Ambient Orbs (same as Services Banner) ── */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-sky-200/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: "9s" }} />
//         <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-pink-200/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: "13s" }} />
//         <div className="absolute inset-0 opacity-[0.18]"
//           style={{ backgroundImage: `linear-gradient(rgba(14,165,233,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(219,39,119,.05) 1px,transparent 1px)`, backgroundSize: "48px 48px" }} />
//       </div>

//       {/* ═══════════════════════════════════════════
//           HERO / PAGE HEADER
//       ═══════════════════════════════════════════ */}
//       <section className="relative pt-32 pb-20 px-4 overflow-hidden">
//         <div className="max-w-6xl mx-auto text-center">

//           <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-200/70 bg-white/80 text-sky-600 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm backdrop-blur-sm">
//             <FaHeartbeat className="animate-pulse text-pink-500" />
//             Premium Clinic · Contact Us
//           </motion.div>

//           <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
//             className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-4 leading-none tracking-tight font-serif">
//             Get In{" "}
//             <span style={{ background: "linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
//               Touch
//             </span>
//           </motion.h1>

//           <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
//             className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
//             We're here for you — whether it's a routine inquiry, emergency support, or booking your next appointment.
//           </motion.p>

//           {/* Quick action pills */}
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}
//             className="flex flex-wrap justify-center gap-3 mt-8">
//             {[
//               { icon: <FaPhone />, label: "Call Now", href: "tel:+923001234567", style: "bg-white border-sky-200 text-sky-600 hover:bg-sky-50 hover:border-sky-400" },
//               { icon: <FaWhatsapp />, label: "WhatsApp", href: `https://wa.me/${whatsappNumber}?text=${welcomeMessage}`, style: "bg-white border-green-200 text-green-600 hover:bg-green-50 hover:border-green-400" },
//               { icon: <FaAmbulance />, label: "Emergency", href: "tel:1122", style: "bg-white border-red-200 text-red-500 hover:bg-red-50 hover:border-red-400" },
//             ].map((btn) => (
//               <a key={btn.label} href={btn.href}
//                 target={btn.href.startsWith("http") ? "_blank" : undefined}
//                 rel="noopener noreferrer"
//                 className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm border shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 ${btn.style}`}>
//                 {btn.icon} {btn.label}
//               </a>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════
//           QUICK INFO CARDS
//       ═══════════════════════════════════════════ */}
//       <section className="px-4 pb-16">
//         <div className="max-w-6xl mx-auto">
//           <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {[
//               { icon: <FaPhone size={20} />, title: "Phone", lines: ["+92 300 123 4567", "+92 42 111 2222"], color: "sky" },
//               { icon: <FaEnvelope size={20} />, title: "Email", lines: ["info@premiumclinic.pk", "appointments@premiumclinic.pk"], color: "pink" },
//               { icon: <FaClock size={20} />, title: "Opening Hours", lines: ["Mon–Sat: 9AM – 9PM", "Sun: 10AM – 4PM"], color: "amber" },
//               { icon: <MdEmergency size={20} />, title: "Emergency", lines: ["1122 – Rescue", "24/7 Available"], color: "red", urgent: true },
//             ].map((card, i) => {
//               const colorMap = {
//                 sky:   { bg: "bg-sky-50",   border: "border-sky-200",   icon: "text-sky-500",   gIcon: "bg-sky-100",  hover: "hover:border-sky-300 hover:shadow-sky-100" },
//                 pink:  { bg: "bg-pink-50",  border: "border-pink-200",  icon: "text-pink-500",  gIcon: "bg-pink-100", hover: "hover:border-pink-300 hover:shadow-pink-100" },
//                 amber: { bg: "bg-amber-50", border: "border-amber-200", icon: "text-amber-500", gIcon: "bg-amber-100",hover: "hover:border-amber-300 hover:shadow-amber-100" },
//                 red:   { bg: "bg-red-50",   border: "border-red-200",   icon: "text-red-500",   gIcon: "bg-red-100",  hover: "hover:border-red-300 hover:shadow-red-100" },
//               };
//               const c = colorMap[card.color];
//               return (
//                 <motion.div key={card.title} variants={fadeUp} custom={i}
//                   whileHover={{ y: -4, scale: 1.02 }}
//                   className={`relative rounded-2xl p-5 border ${c.border} ${c.bg} shadow-sm ${c.hover} hover:shadow-md transition-all duration-300 cursor-default`}>
//                   {card.urgent && <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />}
//                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${c.gIcon} ${c.icon}`}>{card.icon}</div>
//                   <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{card.title}</p>
//                   {card.lines.map((l) => <p key={l} className="text-slate-700 font-semibold text-sm">{l}</p>)}
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════
//           CONTACT FORM + SIDEBAR
//       ═══════════════════════════════════════════ */}
//       <section className="px-4 pb-20">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//             {/* ── Left: Contact Form ── */}
//             <div className="lg:col-span-2">
//               <AnimSection>
//                 <div className="rounded-3xl border border-sky-100 bg-white shadow-xl shadow-sky-100/40 p-8 relative overflow-hidden">
//                   {/* Top gradient accent */}
//                   <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
//                     style={{ background: "linear-gradient(90deg,#0ea5e9,#db2777)" }} />

//                   <div className="mb-8">
//                     <h2 className="text-3xl font-extrabold text-slate-900 mb-2 font-serif">Send Us a Message</h2>
//                     <p className="text-slate-400 text-sm">Fill in the form and our team will respond within 30 minutes.</p>
//                   </div>

//                   <AnimatePresence mode="wait">
//                     {submitted ? (
//                       <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
//                         className="flex flex-col items-center justify-center py-16 text-center">
//                         <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
//                           transition={{ type: "spring", stiffness: 200, damping: 12 }}
//                           className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
//                           style={{ background: "linear-gradient(135deg,#e0f2fe,#fce7f3)" }}>
//                           <FaCheckCircle className="text-sky-500 text-4xl" />
//                         </motion.div>
//                         <h3 className="text-2xl font-extrabold text-slate-800 mb-2">Message Sent!</h3>
//                         <p className="text-slate-400 text-sm max-w-xs mb-6">Thank you for reaching out. Our team will contact you shortly.</p>
//                         <button onClick={() => { setSubmitted(false); setFormData({ name: "", phone: "", email: "", subject: "", department: "", message: "" }); }}
//                           className="px-6 py-2.5 rounded-full text-sm font-semibold text-sky-600 border border-sky-200 bg-sky-50 hover:bg-sky-100 transition-colors">
//                           Send Another
//                         </button>
//                       </motion.div>
//                     ) : (
//                       <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-5">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                           {[
//                             { name: "name",    label: "Full Name",     placeholder: "Ahmed Khan",           type: "text",  required: true },
//                             { name: "phone",   label: "Phone Number",  placeholder: "+92 300 000 0000",     type: "tel",   required: true },
//                             { name: "email",   label: "Email Address", placeholder: "you@example.com",      type: "email", required: false },
//                             { name: "subject", label: "Subject",       placeholder: "e.g. Appointment Inquiry", type: "text", required: true },
//                           ].map((field) => (
//                             <div key={field.name} className="flex flex-col gap-1.5">
//                               <label className="text-slate-500 text-xs font-bold uppercase tracking-widest">
//                                 {field.label} {field.required && <span className="text-sky-500">*</span>}
//                               </label>
//                               <input type={field.type} name={field.name} value={formData[field.name]}
//                                 onChange={handleChange} placeholder={field.placeholder} required={field.required}
//                                 className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-300 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all duration-200" />
//                             </div>
//                           ))}
//                         </div>

//                         <div className="flex flex-col gap-1.5">
//                           <label className="text-slate-500 text-xs font-bold uppercase tracking-widest">
//                             Department / Service <span className="text-sky-500">*</span>
//                           </label>
//                           <select name="department" value={formData.department} onChange={handleChange} required
//                             className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all duration-200 appearance-none">
//                             <option value="" disabled className="text-slate-300">Select a department...</option>
//                             {["General Inquiry","Appointment Booking","Dental Care","Skin Care","Hair Transplant","Orthopedic","ENT","Gynecology","Emergency Support","Online Consultation","Billing / Insurance","Patient Records","Feedback / Complaint"].map(d => (
//                               <option key={d} value={d}>{d}</option>
//                             ))}
//                           </select>
//                         </div>

//                         <div className="flex flex-col gap-1.5">
//                           <label className="text-slate-500 text-xs font-bold uppercase tracking-widest">
//                             Message <span className="text-sky-500">*</span>
//                           </label>
//                           <textarea name="message" value={formData.message} onChange={handleChange} required rows={5}
//                             placeholder="Describe your inquiry or message..."
//                             className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-300 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all duration-200 resize-none" />
//                         </div>

//                         <motion.button type="submit" disabled={loading}
//                           whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
//                           className="w-full py-4 rounded-xl font-bold text-white text-sm tracking-wide relative overflow-hidden group transition-all duration-300"
//                           style={{ background: loading ? "#cbd5e1" : "linear-gradient(135deg,#0ea5e9,#db2777)" }}>
//                           {loading ? (
//                             <span className="flex items-center justify-center gap-2">
//                               <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//                               </svg>
//                               Sending...
//                             </span>
//                           ) : (
//                             <span className="flex items-center justify-center gap-2"><FaPaperPlane /> Send Message</span>
//                           )}
//                           <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
//                         </motion.button>
//                       </motion.form>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </AnimSection>
//             </div>

//             {/* ── Right Sidebar ── */}
//             <div className="flex flex-col gap-5">

//               {/* WhatsApp CTA */}
//               <AnimSection delay={1}>
//                 <motion.a href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`} target="_blank" rel="noopener noreferrer"
//                   whileHover={{ scale: 1.02, y: -3 }} whileTap={{ scale: 0.98 }}
//                   className="flex items-center gap-4 p-6 rounded-2xl border border-green-200 bg-white shadow-sm shadow-green-100/60 cursor-pointer group relative overflow-hidden hover:shadow-md transition-all duration-300">
//                   <div className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
//                     <FaWhatsapp size={28} className="text-white" />
//                   </div>
//                   <div>
//                     <p className="text-slate-800 font-bold text-base">Chat on WhatsApp</p>
//                     <p className="text-green-500 text-xs mt-0.5 font-semibold">Instant replies · 24/7</p>
//                     <p className="text-slate-400 text-xs mt-1">+92 300 123 4567</p>
//                   </div>
//                   <div className="absolute inset-0 bg-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
//                 </motion.a>
//               </AnimSection>

//               {/* Emergency Card */}
//               <AnimSection delay={2}>
//                 <div className="relative p-6 rounded-2xl border border-red-200 bg-white shadow-sm overflow-hidden">
//                   <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
//                       <FaAmbulance className="text-red-500 text-xl" />
//                     </div>
//                     <span className="text-slate-800 font-bold text-base">Emergency Line</span>
//                   </div>
//                   <p className="text-slate-400 text-xs mb-3">For life-threatening emergencies, call immediately:</p>
//                   <a href="tel:1122" className="block text-3xl font-black text-red-500 hover:text-red-600 transition-colors tracking-wider">1122</a>
//                   <p className="text-slate-400 text-xs mt-1">Rescue / Ambulance — Free 24/7</p>
//                   <a href="tel:+923001234567" className="mt-3 block text-sm text-red-400 hover:text-red-500 transition-colors font-semibold">
//                     Clinic Emergency: +92 300 123 4567
//                   </a>
//                   {/* bottom accent line */}
//                   <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg,#ef4444,#fb7185)" }} />
//                 </div>
//               </AnimSection>

//               {/* Office Hours */}
//               <AnimSection delay={3}>
//                 <div className="p-6 rounded-2xl border border-sky-100 bg-white shadow-sm">
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center">
//                       <FaClock className="text-sky-500 text-sm" />
//                     </div>
//                     <span className="text-slate-800 font-bold text-sm">Working Hours</span>
//                   </div>
//                   {[
//                     { day: "Mon – Wed",  hours: "9:00 AM – 9:00 PM" },
//                     { day: "Thu – Fri",  hours: "9:00 AM – 9:00 PM" },
//                     { day: "Saturday",   hours: "9:00 AM – 6:00 PM" },
//                     { day: "Sunday",     hours: "10:00 AM – 4:00 PM" },
//                     { day: "Emergency",  hours: "24 / 7", highlight: true },
//                   ].map(item => (
//                     <div key={item.day} className={`flex justify-between items-center py-2 border-b border-slate-50 last:border-0`}>
//                       <span className="text-slate-400 text-xs font-medium">{item.day}</span>
//                       <span className={`text-xs font-bold ${item.highlight ? "text-sky-500" : "text-slate-700"}`}>{item.hours}</span>
//                     </div>
//                   ))}
//                 </div>
//               </AnimSection>

//               {/* Social Links */}
//               <AnimSection delay={4}>
//                 <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm">
//                   <p className="text-slate-700 font-bold text-sm mb-4">Follow Us</p>
//                   <div className="flex gap-3">
//                     {[
//                       { icon: <FaFacebook size={18} />, label: "Facebook",  href: "#", cls: "bg-blue-50 border-blue-200 text-blue-500 hover:bg-blue-100" },
//                       { icon: <FaInstagram size={18} />, label: "Instagram", href: "#", cls: "bg-pink-50 border-pink-200 text-pink-500 hover:bg-pink-100" },
//                       { icon: <FaYoutube size={18} />,   label: "YouTube",   href: "#", cls: "bg-red-50 border-red-200 text-red-500 hover:bg-red-100" },
//                       { icon: <FaWhatsapp size={18} />,  label: "WhatsApp",  href: `https://wa.me/${whatsappNumber}`, cls: "bg-green-50 border-green-200 text-green-500 hover:bg-green-100" },
//                     ].map(s => (
//                       <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
//                         whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.95 }}
//                         className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors duration-200 ${s.cls}`}
//                         title={s.label}>
//                         {s.icon}
//                       </motion.a>
//                     ))}
//                   </div>
//                 </div>
//               </AnimSection>

//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════
//           BRANCH LOCATIONS + MAPS
//       ═══════════════════════════════════════════ */}
//       <section className="px-4 pb-20">
//         <div className="max-w-6xl mx-auto">
//           <AnimSection className="text-center mb-12">
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-sky-200/70 text-sky-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
//               <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse" /> Our Locations
//             </div>
//             <h2 className="text-4xl font-extrabold text-slate-900 font-serif">Find Us Near You</h2>
//             <p className="text-slate-400 text-sm mt-3 max-w-lg mx-auto">Multiple branches for your convenience. Walk in or book at your nearest branch.</p>
//           </AnimSection>

//           {/* Branch Tabs */}
//           <AnimSection className="mb-6">
//             <div className="flex gap-3 justify-center flex-wrap">
//               {branches.map((b, i) => (
//                 <button key={b.name} onClick={() => setActiveTab(i)}
//                   className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border shadow-sm ${
//                     activeTab === i
//                       ? "text-white border-transparent shadow-sky-200/60 shadow-lg"
//                       : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-600"
//                   }`}
//                   style={activeTab === i ? { background: "linear-gradient(135deg,#0ea5e9,#db2777)" } : {}}>
//                   {b.name}
//                 </button>
//               ))}
//             </div>
//           </AnimSection>

//           <AnimatePresence mode="wait">
//             {branches.map((branch, i) => activeTab === i ? (
//               <motion.div key={branch.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
//                 className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Map */}
//                 <div className="rounded-2xl overflow-hidden border border-sky-100 shadow-md h-72 lg:h-auto">
//                   <iframe src={branch.mapSrc} width="100%" height="100%"
//                     style={{ border: 0, minHeight: "280px" }}
//                     allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
//                     title={`Map for ${branch.name}`} />
//                 </div>
//                 {/* Info */}
//                 <div className="flex flex-col justify-center gap-5 bg-white rounded-2xl border border-sky-100 shadow-sm p-8">
//                   <div>
//                     <h3 className="text-2xl font-extrabold text-slate-900 mb-1 font-serif">{branch.name}</h3>
//                     <div className="h-1 w-16 rounded-full" style={{ background: "linear-gradient(90deg,#0ea5e9,#db2777)" }} />
//                   </div>
//                   {[
//                     { icon: <FaMapMarkerAlt className="text-sky-500" />, label: "Address",   value: branch.address },
//                     { icon: <FaPhone className="text-sky-500" />,        label: "Phone",     value: branch.phone },
//                     { icon: <FaClock className="text-sky-500" />,        label: "Hours",     value: branch.hours },
//                     { icon: <MdEmergency className="text-red-500" />,    label: "Emergency", value: branch.emergency },
//                   ].map(item => (
//                     <div key={item.label} className="flex items-start gap-4">
//                       <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center flex-shrink-0 mt-0.5">{item.icon}</div>
//                       <div>
//                         <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{item.label}</p>
//                         <p className="text-slate-700 font-semibold text-sm mt-0.5">{item.value}</p>
//                       </div>
//                     </div>
//                   ))}
//                   <a href={`https://www.google.com/maps/search/${encodeURIComponent(branch.address)}`}
//                     target="_blank" rel="noopener noreferrer"
//                     className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold self-start transition-all duration-200 hover:opacity-90 shadow-md"
//                     style={{ background: "linear-gradient(135deg,#0ea5e9,#7c3aed)" }}>
//                     <FaMapMarkerAlt /> Get Directions
//                   </a>
//                 </div>
//               </motion.div>
//             ) : null)}
//           </AnimatePresence>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════
//           FAQ SECTION
//       ═══════════════════════════════════════════ */}
//       <section className="px-4 pb-20">
//         <div className="max-w-3xl mx-auto">
//           <AnimSection className="text-center mb-12">
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200/70 text-pink-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
//               <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse" /> Patient Support
//             </div>
//             <h2 className="text-4xl font-extrabold text-slate-900 font-serif">Frequently Asked Questions</h2>
//             <p className="text-slate-400 text-sm mt-3">
//               Can't find what you need?{" "}
//               <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
//                 className="text-sky-500 font-semibold hover:underline">Chat with us.</a>
//             </p>
//           </AnimSection>
//           <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="space-y-3">
//             {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} index={i} />)}
//           </motion.div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════
//           BOTTOM CTA BANNER — matches Services CTA
//       ═══════════════════════════════════════════ */}
//       <section className="relative overflow-hidden py-20 mt-4"
//         style={{ background: "linear-gradient(135deg,#0ea5e9 0%,#7c3aed 50%,#db2777 100%)" }}>
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
//           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
//         </div>
//         <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
//           <MdOutlineLocalHospital className="text-white/60 text-5xl mx-auto mb-4" />
//           <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 font-serif">
//             Need Immediate Assistance?
//           </h2>
//           <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto">
//             Our team is ready — book an appointment online, chat on WhatsApp, or call us directly.
//           </p>
//           <div className="flex flex-wrap justify-center gap-4">
//             <motion.a href="#booking" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
//               className="px-8 py-3.5 rounded-xl font-bold text-sky-600 bg-white shadow-xl hover:bg-white/90 transition-all flex items-center gap-2 text-sm">
//               <FiCalendar size={14} /> Book Appointment
//             </motion.a>
//             <motion.a href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`}
//               target="_blank" rel="noopener noreferrer"
//               whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
//               className="px-8 py-3.5 rounded-xl font-bold text-white border-2 border-white/40 hover:bg-white/10 transition-all flex items-center gap-2 text-sm">
//               <FiMessageCircle size={14} /> Chat on WhatsApp
//             </motion.a>
//           </div>
//         </div>
//       </section>

//       {/* ── Floating WhatsApp Button ── */}
//       <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
//         <div className="absolute w-16 h-16 bg-green-500 rounded-full animate-ping opacity-40 pointer-events-none" />
//         <motion.a href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`}
//           target="_blank" rel="noopener noreferrer"
//           whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
//           initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
//           transition={{ type: "spring", stiffness: 260, damping: 20 }}
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

// import { useState, useRef } from "react";
// import { motion, AnimatePresence, useInView } from "framer-motion";
// import {
//   FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt,
//   FaClock, FaAmbulance, FaCheckCircle, FaPaperPlane,
//   FaInstagram, FaFacebook, FaYoutube, FaChevronDown, FaHeartbeat,
// } from "react-icons/fa";
// import { MdEmergency, MdOutlineLocalHospital } from "react-icons/md";
// import { FiCalendar, FiMessageCircle, FiPhone } from "react-icons/fi";
// import { GiHeartBeats } from "react-icons/gi";
// import { TbStethoscope, TbMapPin, TbBrandWhatsapp, TbMail, TbClock, TbAmbulance, TbCalendar, TbPhone } from "react-icons/tb";

// // ── Animation Variants ────────────────────────────────────────────────────────
// const fadeUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: (i = 0) => ({
//     opacity: 1, y: 0,
//     transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
//   }),
// };
// const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

// function AnimSection({ children, className = "", delay = 0 }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });
//   return (
//     <motion.div ref={ref} variants={fadeUp} custom={delay}
//       initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
//       {children}
//     </motion.div>
//   );
// }

// // ── FAQ Data ──────────────────────────────────────────────────────────────────
// const faqs = [
//   { q: "What are your clinic's opening hours?", a: "We are open Monday–Saturday from 9:00 AM to 9:00 PM, and Sunday from 10:00 AM to 4:00 PM. Emergency services are available 24/7." },
//   { q: "How can I book an appointment online?", a: "You can book through our website's Appointment page, WhatsApp, or by calling our reception. We confirm within 30 minutes." },
//   { q: "Do you offer online/video consultations?", a: "Yes! We offer video, audio, and chat consultations via Zoom and Google Meet. Book through the Online Consultation section." },
//   { q: "Is parking available at your clinic?", a: "Yes, we have a dedicated parking facility at both our branches with ample space for patients and visitors." },
//   { q: "How do I access my medical reports online?", a: "Log in to your Patient Portal using the credentials provided at registration. All reports, prescriptions, and history are available there." },
// ];

// // ── Branch Data ───────────────────────────────────────────────────────────────
// const branches = [
//   {
//     name: "Main Branch – Gulberg",
//     address: "123 Medical Avenue, Gulberg III, Lahore",
//     phone: "+92 300 123 4567",
//     hours: "Mon–Sat: 9AM–9PM",
//     emergency: "24/7 Emergency",
//     mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.3!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjEnMzEuMyJF!5e0!3m2!1sen!2s!4v1234567890",
//   },
//   {
//     name: "Branch 2 – DHA",
//     address: "45 Healthcare Blvd, DHA Phase 5, Lahore",
//     phone: "+92 300 765 4321",
//     hours: "Mon–Sat: 10AM–8PM",
//     emergency: "Emergency Referral",
//     mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.3!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjEnMzEuMyJF!5e0!3m2!1sen!2s!4v1234567890",
//   },
// ];

// // ── FAQ Item ──────────────────────────────────────────────────────────────────
// function FAQItem({ q, a, index }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <motion.div variants={fadeUp} custom={index * 0.05}
//       className="border border-sky-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
//       <button onClick={() => setOpen(!open)}
//         className="w-full flex items-center justify-between px-6 py-5 text-left group">
//         <span className="text-slate-700 font-semibold text-sm md:text-base group-hover:text-sky-600 transition-colors duration-200">{q}</span>
//         <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0 ml-4">
//           <FaChevronDown className="text-sky-500 text-sm" />
//         </motion.div>
//       </button>
//       <AnimatePresence>
//         {open && (
//           <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
//             className="overflow-hidden">
//             <div className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-sky-50 pt-4 bg-gradient-to-br from-sky-50/50 to-white">{a}</div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

// // ── Contact Banner (Services page Banner style — with floating contact icons) ──
// function ContactBanner() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true });

//   // Floating icons — contact/medical themed, same pattern as Services Banner
//   const floatIcons = [
//     { Icon: TbStethoscope, style: { top: "18%",    left: "4%" },     size: 26, delay: 0    },
//     { Icon: GiHeartBeats,  style: { top: "22%",    right: "7%" },    size: 30, delay: 0.5  },
//     { Icon: TbPhone,       style: { bottom: "22%", left: "7%" },     size: 24, delay: 0.9  },
//     { Icon: TbMapPin,      style: { bottom: "28%", right: "5%" },    size: 22, delay: 1.3  },
//     { Icon: TbMail,        style: { top: "58%",    left: "2.5%" },   size: 20, delay: 0.7  },
//     { Icon: TbAmbulance,   style: { top: "12%",    right: "19%" },   size: 19, delay: 1.1  },
//     { Icon: TbClock,       style: { bottom: "12%", right: "22%" },   size: 18, delay: 1.6  },
//     { Icon: TbCalendar,    style: { top: "42%",    right: "3%" },    size: 21, delay: 0.3  },
//   ];

//   return (
//     <section ref={ref} className="relative overflow-hidden py-20 sm:py-28"
//       style={{ background: "linear-gradient(135deg,#f0f9ff 0%,#ffffff 45%,#fdf2f8 100%)" }}>

//       {/* Ambient orbs + grid — exact match with Services */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-sky-200/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: "9s" }} />
//         <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-pink-200/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: "13s" }} />
//         <div className="absolute inset-0 opacity-[0.18]"
//           style={{ backgroundImage: `linear-gradient(rgba(14,165,233,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(219,39,119,.05) 1px,transparent 1px)`, backgroundSize: "48px 48px" }} />
//       </div>

//       {/* Floating animated icons — same motion as Services Banner */}
//       {floatIcons.map(({ Icon, style, size, delay }, i) => (
//         <motion.div key={i}
//           className="absolute hidden lg:flex items-center justify-center w-14 h-14 rounded-2xl bg-white/70 border border-slate-100 shadow-md"
//           style={style}
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: [0, 0.65, 0.65], y: [20, 0, -6, 0] } : {}}
//           transition={{ delay, duration: 3.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}>
//           <Icon size={size} style={{ color: "#0ea5e9", opacity: 0.7 }} />
//         </motion.div>
//       ))}

//       {/* Main banner text content */}
//       <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">

//         <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
//           transition={{ duration: 0.6 }}
//           className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-sky-200/70 text-sky-600 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm backdrop-blur-sm">
//           <FaHeartbeat className="animate-pulse text-pink-500" />
//           Premium Clinic · Contact Us
//         </motion.div>

//         <motion.h1 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
//           className="text-4xl sm:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight font-serif mb-5">
//           Get In{" "}
//           <span style={{ background: "linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
//             Touch
//           </span>
//           <br />With Our Team
//         </motion.h1>

//         <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.9, delay: 0.25 }}
//           className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
//           We're here for you — whether it's a routine inquiry, emergency support, or booking your next appointment.
//         </motion.p>

//         {/* Stats row — matches Services banner style */}
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10">
//           {[
//             { num: "3 min",  label: "Avg. Response" },
//             { num: "24/7",   label: "Emergency Line" },
//             { num: "2",      label: "Branch Locations" },
//             { num: "10K+",   label: "Happy Patients" },
//           ].map((s, i) => (
//             <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.4 + i * 0.08 }} className="text-center">
//               <p className="text-3xl font-extrabold"
//                 style={{ background: "linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
//                 {s.num}
//               </p>
//               <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">{s.label}</p>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* CTA pills */}
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.7, delay: 0.55 }}
//           className="flex flex-wrap justify-center gap-3">
//           {[
//             { icon: <FaPhone />, label: "Call Now",   href: "tel:+923001234567",  cls: "bg-white border-sky-200   text-sky-600   hover:bg-sky-50   hover:border-sky-400" },
//             { icon: <FaWhatsapp />, label: "WhatsApp", href: "https://wa.me/923001234567?text=" + encodeURIComponent("Hello Premium Clinic, I want to inquire about your healthcare services."), cls: "bg-white border-green-200  text-green-600  hover:bg-green-50  hover:border-green-400" },
//             { icon: <FaAmbulance />, label: "Emergency", href: "tel:1122",          cls: "bg-white border-red-200    text-red-500    hover:bg-red-50    hover:border-red-400" },
//           ].map((btn) => (
//             <a key={btn.label} href={btn.href}
//               target={btn.href.startsWith("http") ? "_blank" : undefined}
//               rel="noopener noreferrer"
//               className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm border shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 ${btn.cls}`}>
//               {btn.icon} {btn.label}
//             </a>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// // ── Main ContactUs Page ───────────────────────────────────────────────────────
// export default function ContactUs({ onNavigate }) {
//   const whatsappNumber = "+923001234567";
//   const welcomeMessage = encodeURIComponent("Hello Premium Clinic, I want to inquire about your healthcare services.");

//   const [formData, setFormData] = useState({ name: "", phone: "", email: "", subject: "", department: "", message: "" });
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState(0);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setTimeout(() => { setLoading(false); setSubmitted(true); }, 1800);
//   };

//   return (
//     <div className="min-h-screen font-body relative"
//       style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #fdf2f8 100%)" }}>

//       {/* ── Ambient BG Orbs (fixed, same as rest of site) ── */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-sky-200/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: "9s" }} />
//         <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-pink-200/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: "13s" }} />
//         <div className="absolute inset-0 opacity-[0.18]"
//           style={{ backgroundImage: `linear-gradient(rgba(14,165,233,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(219,39,119,.05) 1px,transparent 1px)`, backgroundSize: "48px 48px" }} />
//       </div>

//       {/* ═══════════════════════════════════════════
//           BANNER — Services-style with floating icons
//       ═══════════════════════════════════════════ */}
//       <ContactBanner />

//       {/* ═══════════════════════════════════════════
//           QUICK INFO CARDS
//       ═══════════════════════════════════════════ */}
//       <section className="px-4 pb-16">
//         <div className="max-w-6xl mx-auto">
//           <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {[
//               { icon: <FaPhone size={20} />, title: "Phone", lines: ["+92 300 123 4567", "+92 42 111 2222"], color: "sky" },
//               { icon: <FaEnvelope size={20} />, title: "Email", lines: ["info@premiumclinic.pk", "appointments@premiumclinic.pk"], color: "pink" },
//               { icon: <FaClock size={20} />, title: "Opening Hours", lines: ["Mon–Sat: 9AM – 9PM", "Sun: 10AM – 4PM"], color: "amber" },
//               { icon: <MdEmergency size={20} />, title: "Emergency", lines: ["1122 – Rescue", "24/7 Available"], color: "red", urgent: true },
//             ].map((card, i) => {
//               const colorMap = {
//                 sky:   { bg: "bg-sky-50",   border: "border-sky-200",   icon: "text-sky-500",   gIcon: "bg-sky-100",   hover: "hover:border-sky-300 hover:shadow-sky-100" },
//                 pink:  { bg: "bg-pink-50",  border: "border-pink-200",  icon: "text-pink-500",  gIcon: "bg-pink-100",  hover: "hover:border-pink-300 hover:shadow-pink-100" },
//                 amber: { bg: "bg-amber-50", border: "border-amber-200", icon: "text-amber-500", gIcon: "bg-amber-100", hover: "hover:border-amber-300 hover:shadow-amber-100" },
//                 red:   { bg: "bg-red-50",   border: "border-red-200",   icon: "text-red-500",   gIcon: "bg-red-100",   hover: "hover:border-red-300 hover:shadow-red-100" },
//               };
//               const c = colorMap[card.color];
//               return (
//                 <motion.div key={card.title} variants={fadeUp} custom={i}
//                   whileHover={{ y: -4, scale: 1.02 }}
//                   className={`relative rounded-2xl p-5 border ${c.border} ${c.bg} shadow-sm ${c.hover} hover:shadow-md transition-all duration-300 cursor-default`}>
//                   {card.urgent && <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />}
//                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${c.gIcon} ${c.icon}`}>{card.icon}</div>
//                   <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{card.title}</p>
//                   {card.lines.map((l) => <p key={l} className="text-slate-700 font-semibold text-sm">{l}</p>)}
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════
//           CONTACT FORM + SIDEBAR
//       ═══════════════════════════════════════════ */}
//       <section className="px-4 pb-20">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//             {/* ── Left: Contact Form ── */}
//             <div className="lg:col-span-2">
//               <AnimSection>
//                 <div className="rounded-3xl border border-sky-100 bg-white shadow-xl shadow-sky-100/40 p-8 relative overflow-hidden">
//                   <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
//                     style={{ background: "linear-gradient(90deg,#0ea5e9,#db2777)" }} />

//                   <div className="mb-8">
//                     <h2 className="text-3xl font-extrabold text-slate-900 mb-2 font-serif">Send Us a Message</h2>
//                     <p className="text-slate-400 text-sm">Fill in the form and our team will respond within 30 minutes.</p>
//                   </div>

//                   <AnimatePresence mode="wait">
//                     {submitted ? (
//                       <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
//                         className="flex flex-col items-center justify-center py-16 text-center">
//                         <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
//                           transition={{ type: "spring", stiffness: 200, damping: 12 }}
//                           className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
//                           style={{ background: "linear-gradient(135deg,#e0f2fe,#fce7f3)" }}>
//                           <FaCheckCircle className="text-sky-500 text-4xl" />
//                         </motion.div>
//                         <h3 className="text-2xl font-extrabold text-slate-800 mb-2">Message Sent!</h3>
//                         <p className="text-slate-400 text-sm max-w-xs mb-6">Thank you for reaching out. Our team will contact you shortly.</p>
//                         <button onClick={() => { setSubmitted(false); setFormData({ name: "", phone: "", email: "", subject: "", department: "", message: "" }); }}
//                           className="px-6 py-2.5 rounded-full text-sm font-semibold text-sky-600 border border-sky-200 bg-sky-50 hover:bg-sky-100 transition-colors">
//                           Send Another
//                         </button>
//                       </motion.div>
//                     ) : (
//                       <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-5">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                           {[
//                             { name: "name",    label: "Full Name",     placeholder: "Ahmed Khan",               type: "text",  required: true },
//                             { name: "phone",   label: "Phone Number",  placeholder: "+92 300 000 0000",         type: "tel",   required: true },
//                             { name: "email",   label: "Email Address", placeholder: "you@example.com",          type: "email", required: false },
//                             { name: "subject", label: "Subject",       placeholder: "e.g. Appointment Inquiry", type: "text",  required: true },
//                           ].map((field) => (
//                             <div key={field.name} className="flex flex-col gap-1.5">
//                               <label className="text-slate-500 text-xs font-bold uppercase tracking-widest">
//                                 {field.label} {field.required && <span className="text-sky-500">*</span>}
//                               </label>
//                               <input type={field.type} name={field.name} value={formData[field.name]}
//                                 onChange={handleChange} placeholder={field.placeholder} required={field.required}
//                                 className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-300 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all duration-200" />
//                             </div>
//                           ))}
//                         </div>

//                         <div className="flex flex-col gap-1.5">
//                           <label className="text-slate-500 text-xs font-bold uppercase tracking-widest">
//                             Department / Service <span className="text-sky-500">*</span>
//                           </label>
//                           <select name="department" value={formData.department} onChange={handleChange} required
//                             className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all duration-200 appearance-none">
//                             <option value="" disabled className="text-slate-300">Select a department...</option>
//                             {["General Inquiry","Appointment Booking","Dental Care","Skin Care","Hair Transplant","Orthopedic","ENT","Gynecology","Emergency Support","Online Consultation","Billing / Insurance","Patient Records","Feedback / Complaint"].map(d => (
//                               <option key={d} value={d}>{d}</option>
//                             ))}
//                           </select>
//                         </div>

//                         <div className="flex flex-col gap-1.5">
//                           <label className="text-slate-500 text-xs font-bold uppercase tracking-widest">
//                             Message <span className="text-sky-500">*</span>
//                           </label>
//                           <textarea name="message" value={formData.message} onChange={handleChange} required rows={5}
//                             placeholder="Describe your inquiry or message..."
//                             className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-300 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all duration-200 resize-none" />
//                         </div>

//                         <motion.button type="submit" disabled={loading}
//                           whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
//                           className="w-full py-4 rounded-xl font-bold text-white text-sm tracking-wide relative overflow-hidden group transition-all duration-300"
//                           style={{ background: loading ? "#cbd5e1" : "linear-gradient(135deg,#0ea5e9,#db2777)" }}>
//                           {loading ? (
//                             <span className="flex items-center justify-center gap-2">
//                               <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//                               </svg>
//                               Sending...
//                             </span>
//                           ) : (
//                             <span className="flex items-center justify-center gap-2"><FaPaperPlane /> Send Message</span>
//                           )}
//                           <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
//                         </motion.button>
//                       </motion.form>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </AnimSection>
//             </div>

//             {/* ── Right Sidebar ── */}
//             <div className="flex flex-col gap-5">

//               {/* WhatsApp CTA */}
//               <AnimSection delay={1}>
//                 <motion.a href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`} target="_blank" rel="noopener noreferrer"
//                   whileHover={{ scale: 1.02, y: -3 }} whileTap={{ scale: 0.98 }}
//                   className="flex items-center gap-4 p-6 rounded-2xl border border-green-200 bg-white shadow-sm shadow-green-100/60 cursor-pointer group relative overflow-hidden hover:shadow-md transition-all duration-300">
//                   <div className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
//                     <FaWhatsapp size={28} className="text-white" />
//                   </div>
//                   <div>
//                     <p className="text-slate-800 font-bold text-base">Chat on WhatsApp</p>
//                     <p className="text-green-500 text-xs mt-0.5 font-semibold">Instant replies · 24/7</p>
//                     <p className="text-slate-400 text-xs mt-1">+92 300 123 4567</p>
//                   </div>
//                   <div className="absolute inset-0 bg-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
//                 </motion.a>
//               </AnimSection>

//               {/* Emergency Card */}
//               <AnimSection delay={2}>
//                 <div className="relative p-6 rounded-2xl border border-red-200 bg-white shadow-sm overflow-hidden">
//                   <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
//                       <FaAmbulance className="text-red-500 text-xl" />
//                     </div>
//                     <span className="text-slate-800 font-bold text-base">Emergency Line</span>
//                   </div>
//                   <p className="text-slate-400 text-xs mb-3">For life-threatening emergencies, call immediately:</p>
//                   <a href="tel:1122" className="block text-3xl font-black text-red-500 hover:text-red-600 transition-colors tracking-wider">1122</a>
//                   <p className="text-slate-400 text-xs mt-1">Rescue / Ambulance — Free 24/7</p>
//                   <a href="tel:+923001234567" className="mt-3 block text-sm text-red-400 hover:text-red-500 transition-colors font-semibold">
//                     Clinic Emergency: +92 300 123 4567
//                   </a>
//                   <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg,#ef4444,#fb7185)" }} />
//                 </div>
//               </AnimSection>

//               {/* Office Hours */}
//               <AnimSection delay={3}>
//                 <div className="p-6 rounded-2xl border border-sky-100 bg-white shadow-sm">
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center">
//                       <FaClock className="text-sky-500 text-sm" />
//                     </div>
//                     <span className="text-slate-800 font-bold text-sm">Working Hours</span>
//                   </div>
//                   {[
//                     { day: "Mon – Wed",  hours: "9:00 AM – 9:00 PM" },
//                     { day: "Thu – Fri",  hours: "9:00 AM – 9:00 PM" },
//                     { day: "Saturday",   hours: "9:00 AM – 6:00 PM" },
//                     { day: "Sunday",     hours: "10:00 AM – 4:00 PM" },
//                     { day: "Emergency",  hours: "24 / 7", highlight: true },
//                   ].map(item => (
//                     <div key={item.day} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
//                       <span className="text-slate-400 text-xs font-medium">{item.day}</span>
//                       <span className={`text-xs font-bold ${item.highlight ? "text-sky-500" : "text-slate-700"}`}>{item.hours}</span>
//                     </div>
//                   ))}
//                 </div>
//               </AnimSection>

//               {/* ── Follow Us — with real social links ── */}
//               <AnimSection delay={4}>
//                 <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm">
//                   <p className="text-slate-700 font-bold text-sm mb-1">Follow Us</p>
//                   <p className="text-slate-400 text-xs mb-4">Stay connected for health tips & updates</p>
//                   <div className="flex gap-3 flex-wrap">
//                     {[
//                       {
//                         icon: <FaFacebook size={18} />,
//                         label: "Facebook",
//                         // ← Replace with your real Facebook page URL
//                         href: "https://www.facebook.com/PremiumClinic",
//                         cls: "bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 hover:border-blue-400",
//                       },
//                       {
//                         icon: <FaInstagram size={18} />,
//                         label: "Instagram",
//                         // ← Replace with your real Instagram profile URL
//                         href: "https://www.instagram.com/PremiumClinic",
//                         cls: "bg-pink-50 border-pink-200 text-pink-500 hover:bg-pink-100 hover:border-pink-400",
//                       },
//                       {
//                         icon: <FaYoutube size={18} />,
//                         label: "YouTube",
//                         // ← Replace with your real YouTube channel URL
//                         href: "https://www.youtube.com/@PremiumClinic",
//                         cls: "bg-red-50 border-red-200 text-red-500 hover:bg-red-100 hover:border-red-400",
//                       },
//                       {
//                         icon: <FaWhatsapp size={18} />,
//                         label: "WhatsApp",
//                         href: `https://wa.me/${whatsappNumber}?text=${welcomeMessage}`,
//                         cls: "bg-green-50 border-green-200 text-green-500 hover:bg-green-100 hover:border-green-400",
//                       },
//                     ].map(s => (
//                       <motion.a
//                         key={s.label}
//                         href={s.href}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         whileHover={{ scale: 1.15, y: -3 }}
//                         whileTap={{ scale: 0.95 }}
//                         title={s.label}
//                         className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-200 shadow-sm ${s.cls}`}>
//                         {s.icon}
//                       </motion.a>
//                     ))}
//                   </div>
//                   {/* Social handle labels */}
//                   <div className="mt-4 pt-4 border-t border-slate-50 space-y-2">
//                     <p className="text-slate-400 text-xs font-medium flex items-center gap-2">
//                       <FaFacebook className="text-blue-500" /> facebook.com/<span className="text-slate-600 font-semibold">PremiumClinic</span>
//                     </p>
//                     <p className="text-slate-400 text-xs font-medium flex items-center gap-2">
//                       <FaInstagram className="text-pink-500" /> @<span className="text-slate-600 font-semibold">PremiumClinic</span>
//                     </p>
//                     <p className="text-slate-400 text-xs font-medium flex items-center gap-2">
//                       <FaYoutube className="text-red-500" /> youtube.com/<span className="text-slate-600 font-semibold">@PremiumClinic</span>
//                     </p>
//                   </div>
//                 </div>
//               </AnimSection>

//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════
//           BRANCH LOCATIONS + MAPS
//       ═══════════════════════════════════════════ */}
//       <section className="px-4 pb-20">
//         <div className="max-w-6xl mx-auto">
//           <AnimSection className="text-center mb-12">
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-sky-200/70 text-sky-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
//               <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse" /> Our Locations
//             </div>
//             <h2 className="text-4xl font-extrabold text-slate-900 font-serif">Find Us Near You</h2>
//             <p className="text-slate-400 text-sm mt-3 max-w-lg mx-auto">Multiple branches for your convenience. Walk in or book at your nearest branch.</p>
//           </AnimSection>

//           {/* Branch Tabs */}
//           <AnimSection className="mb-6">
//             <div className="flex gap-3 justify-center flex-wrap">
//               {branches.map((b, i) => (
//                 <button key={b.name} onClick={() => setActiveTab(i)}
//                   className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border shadow-sm ${
//                     activeTab === i
//                       ? "text-white border-transparent shadow-sky-200/60 shadow-lg"
//                       : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-600"
//                   }`}
//                   style={activeTab === i ? { background: "linear-gradient(135deg,#0ea5e9,#db2777)" } : {}}>
//                   {b.name}
//                 </button>
//               ))}
//             </div>
//           </AnimSection>

//           <AnimatePresence mode="wait">
//             {branches.map((branch, i) => activeTab === i ? (
//               <motion.div key={branch.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
//                 className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Map */}
//                 <div className="rounded-2xl overflow-hidden border border-sky-100 shadow-md h-72 lg:h-auto">
//                   <iframe src={branch.mapSrc} width="100%" height="100%"
//                     style={{ border: 0, minHeight: "280px" }}
//                     allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
//                     title={`Map for ${branch.name}`} />
//                 </div>
//                 {/* Info */}
//                 <div className="flex flex-col justify-center gap-5 bg-white rounded-2xl border border-sky-100 shadow-sm p-8">
//                   <div>
//                     <h3 className="text-2xl font-extrabold text-slate-900 mb-1 font-serif">{branch.name}</h3>
//                     <div className="h-1 w-16 rounded-full" style={{ background: "linear-gradient(90deg,#0ea5e9,#db2777)" }} />
//                   </div>
//                   {[
//                     { icon: <FaMapMarkerAlt className="text-sky-500" />, label: "Address",   value: branch.address },
//                     { icon: <FaPhone className="text-sky-500" />,        label: "Phone",     value: branch.phone },
//                     { icon: <FaClock className="text-sky-500" />,        label: "Hours",     value: branch.hours },
//                     { icon: <MdEmergency className="text-red-500" />,    label: "Emergency", value: branch.emergency },
//                   ].map(item => (
//                     <div key={item.label} className="flex items-start gap-4">
//                       <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center flex-shrink-0 mt-0.5">{item.icon}</div>
//                       <div>
//                         <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{item.label}</p>
//                         <p className="text-slate-700 font-semibold text-sm mt-0.5">{item.value}</p>
//                       </div>
//                     </div>
//                   ))}
//                   <a href={`https://www.google.com/maps/search/${encodeURIComponent(branch.address)}`}
//                     target="_blank" rel="noopener noreferrer"
//                     className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold self-start transition-all duration-200 hover:opacity-90 shadow-md"
//                     style={{ background: "linear-gradient(135deg,#0ea5e9,#7c3aed)" }}>
//                     <FaMapMarkerAlt /> Get Directions
//                   </a>
//                 </div>
//               </motion.div>
//             ) : null)}
//           </AnimatePresence>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════
//           FAQ SECTION
//       ═══════════════════════════════════════════ */}
//       <section className="px-4 pb-20">
//         <div className="max-w-3xl mx-auto">
//           <AnimSection className="text-center mb-12">
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200/70 text-pink-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
//               <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse" /> Patient Support
//             </div>
//             <h2 className="text-4xl font-extrabold text-slate-900 font-serif">Frequently Asked Questions</h2>
//             <p className="text-slate-400 text-sm mt-3">
//               Can't find what you need?{" "}
//               <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
//                 className="text-sky-500 font-semibold hover:underline">Chat with us.</a>
//             </p>
//           </AnimSection>
//           <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="space-y-3">
//             {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} index={i} />)}
//           </motion.div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════
//           BOTTOM CTA BANNER — matches Services CTA
//       ═══════════════════════════════════════════ */}
//       <section className="relative overflow-hidden py-20 mt-4"
//         style={{ background: "linear-gradient(135deg,#0ea5e9 0%,#7c3aed 50%,#db2777 100%)" }}>
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
//           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
//         </div>
//         <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
//           <MdOutlineLocalHospital className="text-white/60 text-5xl mx-auto mb-4" />
//           <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 font-serif">
//             Need Immediate Assistance?
//           </h2>
//           <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto">
//             Our team is ready — book an appointment online, chat on WhatsApp, or call us directly.
//           </p>
//           <div className="flex flex-wrap justify-center gap-4">
//             <motion.a href="#booking" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
//               className="px-8 py-3.5 rounded-xl font-bold text-sky-600 bg-white shadow-xl hover:bg-white/90 transition-all flex items-center gap-2 text-sm">
//               <FiCalendar size={14} /> Book Appointment
//             </motion.a>
//             <motion.a href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`}
//               target="_blank" rel="noopener noreferrer"
//               whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
//               className="px-8 py-3.5 rounded-xl font-bold text-white border-2 border-white/40 hover:bg-white/10 transition-all flex items-center gap-2 text-sm">
//               <FiMessageCircle size={14} /> Chat on WhatsApp
//             </motion.a>
//           </div>
//         </div>
//       </section>

//       {/* ── Floating WhatsApp Button ── */}
//       <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
//         <div className="absolute w-16 h-16 bg-green-500 rounded-full animate-ping opacity-40 pointer-events-none" />
//         <motion.a href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`}
//           target="_blank" rel="noopener noreferrer"
//           whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
//           initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
//           transition={{ type: "spring", stiffness: 260, damping: 20 }}
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

// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence, useInView } from "framer-motion";
// import {
//   FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt,
//   FaClock, FaAmbulance, FaCheckCircle, FaPaperPlane,
//   FaInstagram, FaFacebook, FaYoutube, FaChevronDown, FaHeartbeat,
// } from "react-icons/fa";
// import { MdEmergency, MdOutlineLocalHospital } from "react-icons/md";
// import { FiCalendar, FiMessageCircle } from "react-icons/fi";

// // ── Animation Variants ────────────────────────────────────────────────────────
// const fadeUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: (i = 0) => ({
//     opacity: 1, y: 0,
//     transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
//   }),
// };
// const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

// function AnimSection({ children, className = "", delay = 0 }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });
//   return (
//     <motion.div ref={ref} variants={fadeUp} custom={delay}
//       initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
//       {children}
//     </motion.div>
//   );
// }

// // ── FAQ Data ──────────────────────────────────────────────────────────────────
// const faqs = [
//   { q: "What are your clinic's opening hours?", a: "We are open Monday–Saturday from 9:00 AM to 9:00 PM, and Sunday from 10:00 AM to 4:00 PM. Emergency services are available 24/7." },
//   { q: "How can I book an appointment online?", a: "You can book through our website's Appointment page, WhatsApp, or by calling our reception. We confirm within 30 minutes." },
//   { q: "Do you offer online/video consultations?", a: "Yes! We offer video, audio, and chat consultations via Zoom and Google Meet. Book through the Online Consultation section." },
//   { q: "Is parking available at your clinic?", a: "Yes, we have a dedicated parking facility at both our branches with ample space for patients and visitors." },
//   { q: "How do I access my medical reports online?", a: "Log in to your Patient Portal using the credentials provided at registration. All reports, prescriptions, and history are available there." },
// ];

// // ── Branch Data ───────────────────────────────────────────────────────────────
// const branches = [
//   {
//     name: "Main Branch – Gulberg",
//     address: "123 Medical Avenue, Gulberg III, Lahore",
//     phone: "+92 300 123 4567",
//     hours: "Mon–Sat: 9AM–9PM",
//     emergency: "24/7 Emergency",
//     mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.3!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjEnMzEuMyJF!5e0!3m2!1sen!2s!4v1234567890",
//   },
//   {
//     name: "Branch 2 – DHA",
//     address: "45 Healthcare Blvd, DHA Phase 5, Lahore",
//     phone: "+92 300 765 4321",
//     hours: "Mon–Sat: 10AM–8PM",
//     emergency: "Emergency Referral",
//     mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.3!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjEnMzEuMyJF!5e0!3m2!1sen!2s!4v1234567890",
//   },
// ];

// // ── FAQ Item ──────────────────────────────────────────────────────────────────
// function FAQItem({ q, a, index }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <motion.div variants={fadeUp} custom={index * 0.05}
//       className="border border-sky-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
//       <button onClick={() => setOpen(!open)}
//         className="w-full flex items-center justify-between px-6 py-5 text-left group">
//         <span className="text-slate-700 font-semibold text-sm md:text-base group-hover:text-sky-600 transition-colors duration-200">{q}</span>
//         <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0 ml-4">
//           <FaChevronDown className="text-sky-500 text-sm" />
//         </motion.div>
//       </button>
//       <AnimatePresence>
//         {open && (
//           <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
//             className="overflow-hidden">
//             <div className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-sky-50 pt-4 bg-gradient-to-br from-sky-50/50 to-white">{a}</div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

// // ── Main ContactUs Page ───────────────────────────────────────────────────────
// export default function ContactUs({ onNavigate }) {
//   const whatsappNumber = "+923001234567";
//   const welcomeMessage = encodeURIComponent("Hello Premium Clinic, I want to inquire about your healthcare services.");

//   const [formData, setFormData] = useState({ name: "", phone: "", email: "", subject: "", department: "", message: "" });
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState(0);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setTimeout(() => { setLoading(false); setSubmitted(true); }, 1800);
//   };

//   return (
//     <div className="min-h-screen font-body relative"
//       style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #fdf2f8 100%)" }}>

//       {/* ── Ambient Orbs (same as Services Banner) ── */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-sky-200/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: "9s" }} />
//         <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-pink-200/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: "13s" }} />
//         <div className="absolute inset-0 opacity-[0.18]"
//           style={{ backgroundImage: `linear-gradient(rgba(14,165,233,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(219,39,119,.05) 1px,transparent 1px)`, backgroundSize: "48px 48px" }} />
//       </div>

//       {/* ═══════════════════════════════════════════
//           HERO / PAGE HEADER
//       ═══════════════════════════════════════════ */}
//       <section className="relative pt-32 pb-20 px-4 overflow-hidden">
//         <div className="max-w-6xl mx-auto text-center">

//           <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-200/70 bg-white/80 text-sky-600 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm backdrop-blur-sm">
//             <FaHeartbeat className="animate-pulse text-pink-500" />
//             Premium Clinic · Contact Us
//           </motion.div>

//           <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
//             className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-4 leading-none tracking-tight font-serif">
//             Get In{" "}
//             <span style={{ background: "linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
//               Touch
//             </span>
//           </motion.h1>

//           <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
//             className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
//             We're here for you — whether it's a routine inquiry, emergency support, or booking your next appointment.
//           </motion.p>

//           {/* Quick action pills */}
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}
//             className="flex flex-wrap justify-center gap-3 mt-8">
//             {[
//               { icon: <FaPhone />, label: "Call Now", href: "tel:+923001234567", style: "bg-white border-sky-200 text-sky-600 hover:bg-sky-50 hover:border-sky-400" },
//               { icon: <FaWhatsapp />, label: "WhatsApp", href: `https://wa.me/${whatsappNumber}?text=${welcomeMessage}`, style: "bg-white border-green-200 text-green-600 hover:bg-green-50 hover:border-green-400" },
//               { icon: <FaAmbulance />, label: "Emergency", href: "tel:1122", style: "bg-white border-red-200 text-red-500 hover:bg-red-50 hover:border-red-400" },
//             ].map((btn) => (
//               <a key={btn.label} href={btn.href}
//                 target={btn.href.startsWith("http") ? "_blank" : undefined}
//                 rel="noopener noreferrer"
//                 className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm border shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 ${btn.style}`}>
//                 {btn.icon} {btn.label}
//               </a>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════
//           QUICK INFO CARDS
//       ═══════════════════════════════════════════ */}
//       <section className="px-4 pb-16">
//         <div className="max-w-6xl mx-auto">
//           <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {[
//               { icon: <FaPhone size={20} />, title: "Phone", lines: ["+92 300 123 4567", "+92 42 111 2222"], color: "sky" },
//               { icon: <FaEnvelope size={20} />, title: "Email", lines: ["info@premiumclinic.pk", "appointments@premiumclinic.pk"], color: "pink" },
//               { icon: <FaClock size={20} />, title: "Opening Hours", lines: ["Mon–Sat: 9AM – 9PM", "Sun: 10AM – 4PM"], color: "amber" },
//               { icon: <MdEmergency size={20} />, title: "Emergency", lines: ["1122 – Rescue", "24/7 Available"], color: "red", urgent: true },
//             ].map((card, i) => {
//               const colorMap = {
//                 sky:   { bg: "bg-sky-50",   border: "border-sky-200",   icon: "text-sky-500",   gIcon: "bg-sky-100",  hover: "hover:border-sky-300 hover:shadow-sky-100" },
//                 pink:  { bg: "bg-pink-50",  border: "border-pink-200",  icon: "text-pink-500",  gIcon: "bg-pink-100", hover: "hover:border-pink-300 hover:shadow-pink-100" },
//                 amber: { bg: "bg-amber-50", border: "border-amber-200", icon: "text-amber-500", gIcon: "bg-amber-100",hover: "hover:border-amber-300 hover:shadow-amber-100" },
//                 red:   { bg: "bg-red-50",   border: "border-red-200",   icon: "text-red-500",   gIcon: "bg-red-100",  hover: "hover:border-red-300 hover:shadow-red-100" },
//               };
//               const c = colorMap[card.color];
//               return (
//                 <motion.div key={card.title} variants={fadeUp} custom={i}
//                   whileHover={{ y: -4, scale: 1.02 }}
//                   className={`relative rounded-2xl p-5 border ${c.border} ${c.bg} shadow-sm ${c.hover} hover:shadow-md transition-all duration-300 cursor-default`}>
//                   {card.urgent && <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />}
//                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${c.gIcon} ${c.icon}`}>{card.icon}</div>
//                   <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{card.title}</p>
//                   {card.lines.map((l) => <p key={l} className="text-slate-700 font-semibold text-sm">{l}</p>)}
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════
//           CONTACT FORM + SIDEBAR
//       ═══════════════════════════════════════════ */}
//       <section className="px-4 pb-20">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//             {/* ── Left: Contact Form ── */}
//             <div className="lg:col-span-2">
//               <AnimSection>
//                 <div className="rounded-3xl border border-sky-100 bg-white shadow-xl shadow-sky-100/40 p-8 relative overflow-hidden">
//                   {/* Top gradient accent */}
//                   <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
//                     style={{ background: "linear-gradient(90deg,#0ea5e9,#db2777)" }} />

//                   <div className="mb-8">
//                     <h2 className="text-3xl font-extrabold text-slate-900 mb-2 font-serif">Send Us a Message</h2>
//                     <p className="text-slate-400 text-sm">Fill in the form and our team will respond within 30 minutes.</p>
//                   </div>

//                   <AnimatePresence mode="wait">
//                     {submitted ? (
//                       <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
//                         className="flex flex-col items-center justify-center py-16 text-center">
//                         <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
//                           transition={{ type: "spring", stiffness: 200, damping: 12 }}
//                           className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
//                           style={{ background: "linear-gradient(135deg,#e0f2fe,#fce7f3)" }}>
//                           <FaCheckCircle className="text-sky-500 text-4xl" />
//                         </motion.div>
//                         <h3 className="text-2xl font-extrabold text-slate-800 mb-2">Message Sent!</h3>
//                         <p className="text-slate-400 text-sm max-w-xs mb-6">Thank you for reaching out. Our team will contact you shortly.</p>
//                         <button onClick={() => { setSubmitted(false); setFormData({ name: "", phone: "", email: "", subject: "", department: "", message: "" }); }}
//                           className="px-6 py-2.5 rounded-full text-sm font-semibold text-sky-600 border border-sky-200 bg-sky-50 hover:bg-sky-100 transition-colors">
//                           Send Another
//                         </button>
//                       </motion.div>
//                     ) : (
//                       <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-5">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                           {[
//                             { name: "name",    label: "Full Name",     placeholder: "Ahmed Khan",           type: "text",  required: true },
//                             { name: "phone",   label: "Phone Number",  placeholder: "+92 300 000 0000",     type: "tel",   required: true },
//                             { name: "email",   label: "Email Address", placeholder: "you@example.com",      type: "email", required: false },
//                             { name: "subject", label: "Subject",       placeholder: "e.g. Appointment Inquiry", type: "text", required: true },
//                           ].map((field) => (
//                             <div key={field.name} className="flex flex-col gap-1.5">
//                               <label className="text-slate-500 text-xs font-bold uppercase tracking-widest">
//                                 {field.label} {field.required && <span className="text-sky-500">*</span>}
//                               </label>
//                               <input type={field.type} name={field.name} value={formData[field.name]}
//                                 onChange={handleChange} placeholder={field.placeholder} required={field.required}
//                                 className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-300 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all duration-200" />
//                             </div>
//                           ))}
//                         </div>

//                         <div className="flex flex-col gap-1.5">
//                           <label className="text-slate-500 text-xs font-bold uppercase tracking-widest">
//                             Department / Service <span className="text-sky-500">*</span>
//                           </label>
//                           <select name="department" value={formData.department} onChange={handleChange} required
//                             className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all duration-200 appearance-none">
//                             <option value="" disabled className="text-slate-300">Select a department...</option>
//                             {["General Inquiry","Appointment Booking","Dental Care","Skin Care","Hair Transplant","Orthopedic","ENT","Gynecology","Emergency Support","Online Consultation","Billing / Insurance","Patient Records","Feedback / Complaint"].map(d => (
//                               <option key={d} value={d}>{d}</option>
//                             ))}
//                           </select>
//                         </div>

//                         <div className="flex flex-col gap-1.5">
//                           <label className="text-slate-500 text-xs font-bold uppercase tracking-widest">
//                             Message <span className="text-sky-500">*</span>
//                           </label>
//                           <textarea name="message" value={formData.message} onChange={handleChange} required rows={5}
//                             placeholder="Describe your inquiry or message..."
//                             className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-300 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all duration-200 resize-none" />
//                         </div>

//                         <motion.button type="submit" disabled={loading}
//                           whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
//                           className="w-full py-4 rounded-xl font-bold text-white text-sm tracking-wide relative overflow-hidden group transition-all duration-300"
//                           style={{ background: loading ? "#cbd5e1" : "linear-gradient(135deg,#0ea5e9,#db2777)" }}>
//                           {loading ? (
//                             <span className="flex items-center justify-center gap-2">
//                               <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//                               </svg>
//                               Sending...
//                             </span>
//                           ) : (
//                             <span className="flex items-center justify-center gap-2"><FaPaperPlane /> Send Message</span>
//                           )}
//                           <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
//                         </motion.button>
//                       </motion.form>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </AnimSection>
//             </div>

//             {/* ── Right Sidebar ── */}
//             <div className="flex flex-col gap-5">

//               {/* WhatsApp CTA */}
//               <AnimSection delay={1}>
//                 <motion.a href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`} target="_blank" rel="noopener noreferrer"
//                   whileHover={{ scale: 1.02, y: -3 }} whileTap={{ scale: 0.98 }}
//                   className="flex items-center gap-4 p-6 rounded-2xl border border-green-200 bg-white shadow-sm shadow-green-100/60 cursor-pointer group relative overflow-hidden hover:shadow-md transition-all duration-300">
//                   <div className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
//                     <FaWhatsapp size={28} className="text-white" />
//                   </div>
//                   <div>
//                     <p className="text-slate-800 font-bold text-base">Chat on WhatsApp</p>
//                     <p className="text-green-500 text-xs mt-0.5 font-semibold">Instant replies · 24/7</p>
//                     <p className="text-slate-400 text-xs mt-1">+92 300 123 4567</p>
//                   </div>
//                   <div className="absolute inset-0 bg-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
//                 </motion.a>
//               </AnimSection>

//               {/* Emergency Card */}
//               <AnimSection delay={2}>
//                 <div className="relative p-6 rounded-2xl border border-red-200 bg-white shadow-sm overflow-hidden">
//                   <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
//                       <FaAmbulance className="text-red-500 text-xl" />
//                     </div>
//                     <span className="text-slate-800 font-bold text-base">Emergency Line</span>
//                   </div>
//                   <p className="text-slate-400 text-xs mb-3">For life-threatening emergencies, call immediately:</p>
//                   <a href="tel:1122" className="block text-3xl font-black text-red-500 hover:text-red-600 transition-colors tracking-wider">1122</a>
//                   <p className="text-slate-400 text-xs mt-1">Rescue / Ambulance — Free 24/7</p>
//                   <a href="tel:+923001234567" className="mt-3 block text-sm text-red-400 hover:text-red-500 transition-colors font-semibold">
//                     Clinic Emergency: +92 300 123 4567
//                   </a>
//                   {/* bottom accent line */}
//                   <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg,#ef4444,#fb7185)" }} />
//                 </div>
//               </AnimSection>

//               {/* Office Hours */}
//               <AnimSection delay={3}>
//                 <div className="p-6 rounded-2xl border border-sky-100 bg-white shadow-sm">
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center">
//                       <FaClock className="text-sky-500 text-sm" />
//                     </div>
//                     <span className="text-slate-800 font-bold text-sm">Working Hours</span>
//                   </div>
//                   {[
//                     { day: "Mon – Wed",  hours: "9:00 AM – 9:00 PM" },
//                     { day: "Thu – Fri",  hours: "9:00 AM – 9:00 PM" },
//                     { day: "Saturday",   hours: "9:00 AM – 6:00 PM" },
//                     { day: "Sunday",     hours: "10:00 AM – 4:00 PM" },
//                     { day: "Emergency",  hours: "24 / 7", highlight: true },
//                   ].map(item => (
//                     <div key={item.day} className={`flex justify-between items-center py-2 border-b border-slate-50 last:border-0`}>
//                       <span className="text-slate-400 text-xs font-medium">{item.day}</span>
//                       <span className={`text-xs font-bold ${item.highlight ? "text-sky-500" : "text-slate-700"}`}>{item.hours}</span>
//                     </div>
//                   ))}
//                 </div>
//               </AnimSection>

//               {/* Social Links */}
//               <AnimSection delay={4}>
//                 <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm">
//                   <p className="text-slate-700 font-bold text-sm mb-4">Follow Us</p>
//                   <div className="flex gap-3">
//                     {[
//                       { icon: <FaFacebook size={18} />, label: "Facebook",  href: "#", cls: "bg-blue-50 border-blue-200 text-blue-500 hover:bg-blue-100" },
//                       { icon: <FaInstagram size={18} />, label: "Instagram", href: "#", cls: "bg-pink-50 border-pink-200 text-pink-500 hover:bg-pink-100" },
//                       { icon: <FaYoutube size={18} />,   label: "YouTube",   href: "#", cls: "bg-red-50 border-red-200 text-red-500 hover:bg-red-100" },
//                       { icon: <FaWhatsapp size={18} />,  label: "WhatsApp",  href: `https://wa.me/${whatsappNumber}`, cls: "bg-green-50 border-green-200 text-green-500 hover:bg-green-100" },
//                     ].map(s => (
//                       <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
//                         whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.95 }}
//                         className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors duration-200 ${s.cls}`}
//                         title={s.label}>
//                         {s.icon}
//                       </motion.a>
//                     ))}
//                   </div>
//                 </div>
//               </AnimSection>

//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════
//           BRANCH LOCATIONS + MAPS
//       ═══════════════════════════════════════════ */}
//       <section className="px-4 pb-20">
//         <div className="max-w-6xl mx-auto">
//           <AnimSection className="text-center mb-12">
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-sky-200/70 text-sky-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
//               <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse" /> Our Locations
//             </div>
//             <h2 className="text-4xl font-extrabold text-slate-900 font-serif">Find Us Near You</h2>
//             <p className="text-slate-400 text-sm mt-3 max-w-lg mx-auto">Multiple branches for your convenience. Walk in or book at your nearest branch.</p>
//           </AnimSection>

//           {/* Branch Tabs */}
//           <AnimSection className="mb-6">
//             <div className="flex gap-3 justify-center flex-wrap">
//               {branches.map((b, i) => (
//                 <button key={b.name} onClick={() => setActiveTab(i)}
//                   className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border shadow-sm ${
//                     activeTab === i
//                       ? "text-white border-transparent shadow-sky-200/60 shadow-lg"
//                       : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-600"
//                   }`}
//                   style={activeTab === i ? { background: "linear-gradient(135deg,#0ea5e9,#db2777)" } : {}}>
//                   {b.name}
//                 </button>
//               ))}
//             </div>
//           </AnimSection>

//           <AnimatePresence mode="wait">
//             {branches.map((branch, i) => activeTab === i ? (
//               <motion.div key={branch.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
//                 className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Map */}
//                 <div className="rounded-2xl overflow-hidden border border-sky-100 shadow-md h-72 lg:h-auto">
//                   <iframe src={branch.mapSrc} width="100%" height="100%"
//                     style={{ border: 0, minHeight: "280px" }}
//                     allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
//                     title={`Map for ${branch.name}`} />
//                 </div>
//                 {/* Info */}
//                 <div className="flex flex-col justify-center gap-5 bg-white rounded-2xl border border-sky-100 shadow-sm p-8">
//                   <div>
//                     <h3 className="text-2xl font-extrabold text-slate-900 mb-1 font-serif">{branch.name}</h3>
//                     <div className="h-1 w-16 rounded-full" style={{ background: "linear-gradient(90deg,#0ea5e9,#db2777)" }} />
//                   </div>
//                   {[
//                     { icon: <FaMapMarkerAlt className="text-sky-500" />, label: "Address",   value: branch.address },
//                     { icon: <FaPhone className="text-sky-500" />,        label: "Phone",     value: branch.phone },
//                     { icon: <FaClock className="text-sky-500" />,        label: "Hours",     value: branch.hours },
//                     { icon: <MdEmergency className="text-red-500" />,    label: "Emergency", value: branch.emergency },
//                   ].map(item => (
//                     <div key={item.label} className="flex items-start gap-4">
//                       <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center flex-shrink-0 mt-0.5">{item.icon}</div>
//                       <div>
//                         <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{item.label}</p>
//                         <p className="text-slate-700 font-semibold text-sm mt-0.5">{item.value}</p>
//                       </div>
//                     </div>
//                   ))}
//                   <a href={`https://www.google.com/maps/search/${encodeURIComponent(branch.address)}`}
//                     target="_blank" rel="noopener noreferrer"
//                     className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold self-start transition-all duration-200 hover:opacity-90 shadow-md"
//                     style={{ background: "linear-gradient(135deg,#0ea5e9,#7c3aed)" }}>
//                     <FaMapMarkerAlt /> Get Directions
//                   </a>
//                 </div>
//               </motion.div>
//             ) : null)}
//           </AnimatePresence>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════
//           FAQ SECTION
//       ═══════════════════════════════════════════ */}
//       <section className="px-4 pb-20">
//         <div className="max-w-3xl mx-auto">
//           <AnimSection className="text-center mb-12">
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200/70 text-pink-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
//               <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse" /> Patient Support
//             </div>
//             <h2 className="text-4xl font-extrabold text-slate-900 font-serif">Frequently Asked Questions</h2>
//             <p className="text-slate-400 text-sm mt-3">
//               Can't find what you need?{" "}
//               <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
//                 className="text-sky-500 font-semibold hover:underline">Chat with us.</a>
//             </p>
//           </AnimSection>
//           <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="space-y-3">
//             {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} index={i} />)}
//           </motion.div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════
//           BOTTOM CTA BANNER — matches Services CTA
//       ═══════════════════════════════════════════ */}
//       <section className="relative overflow-hidden py-20 mt-4"
//         style={{ background: "linear-gradient(135deg,#0ea5e9 0%,#7c3aed 50%,#db2777 100%)" }}>
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
//           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
//         </div>
//         <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
//           <MdOutlineLocalHospital className="text-white/60 text-5xl mx-auto mb-4" />
//           <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 font-serif">
//             Need Immediate Assistance?
//           </h2>
//           <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto">
//             Our team is ready — book an appointment online, chat on WhatsApp, or call us directly.
//           </p>
//           <div className="flex flex-wrap justify-center gap-4">
//             <motion.a href="#booking" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
//               className="px-8 py-3.5 rounded-xl font-bold text-sky-600 bg-white shadow-xl hover:bg-white/90 transition-all flex items-center gap-2 text-sm">
//               <FiCalendar size={14} /> Book Appointment
//             </motion.a>
//             <motion.a href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`}
//               target="_blank" rel="noopener noreferrer"
//               whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
//               className="px-8 py-3.5 rounded-xl font-bold text-white border-2 border-white/40 hover:bg-white/10 transition-all flex items-center gap-2 text-sm">
//               <FiMessageCircle size={14} /> Chat on WhatsApp
//             </motion.a>
//           </div>
//         </div>
//       </section>

//       {/* ── Floating WhatsApp Button ── */}
//       <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
//         <div className="absolute w-16 h-16 bg-green-500 rounded-full animate-ping opacity-40 pointer-events-none" />
//         <motion.a href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`}
//           target="_blank" rel="noopener noreferrer"
//           whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
//           initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
//           transition={{ type: "spring", stiffness: 260, damping: 20 }}
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

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaClock, FaAmbulance, FaCheckCircle, FaPaperPlane,
  FaInstagram, FaFacebook, FaYoutube, FaChevronDown, FaHeartbeat,
} from "react-icons/fa";
import { MdEmergency, MdOutlineLocalHospital } from "react-icons/md";
import { FiCalendar, FiMessageCircle, FiPhone, FiArrowLeft } from "react-icons/fi";
import { GiHeartBeats } from "react-icons/gi";
import { TbStethoscope, TbMapPin, TbBrandWhatsapp, TbMail, TbClock, TbAmbulance, TbCalendar, TbPhone } from "react-icons/tb";

// ── Animation Variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

function AnimSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={fadeUp} custom={delay}
      initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

// ── FAQ Data ──────────────────────────────────────────────────────────────────
const faqs = [
  { q: "What are your clinic's opening hours?", a: "We are open Monday–Saturday from 9:00 AM to 9:00 PM, and Sunday from 10:00 AM to 4:00 PM. Emergency services are available 24/7." },
  { q: "How can I book an appointment online?", a: "You can book through our website's Appointment page, WhatsApp, or by calling our reception. We confirm within 30 minutes." },
  { q: "Do you offer online/video consultations?", a: "Yes! We offer video, audio, and chat consultations via Zoom and Google Meet. Book through the Online Consultation section." },
  { q: "Is parking available at your clinic?", a: "Yes, we have a dedicated parking facility at both our branches with ample space for patients and visitors." },
  { q: "How do I access my medical reports online?", a: "Log in to your Patient Portal using the credentials provided at registration. All reports, prescriptions, and history are available there." },
];

// ── Branch Data ───────────────────────────────────────────────────────────────
const branches = [
  {
    name: "Main Branch – Gulberg",
    address: "123 Medical Avenue, Gulberg III, Lahore",
    phone: "+92 300 123 4567",
    hours: "Mon–Sat: 9AM–9PM",
    emergency: "24/7 Emergency",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.3!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjEnMzEuMyJF!5e0!3m2!1sen!2s!4v1234567890",
  },
  {
    name: "Branch 2 – DHA",
    address: "45 Healthcare Blvd, DHA Phase 5, Lahore",
    phone: "+92 300 765 4321",
    hours: "Mon–Sat: 10AM–8PM",
    emergency: "Emergency Referral",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.3!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjEnMzEuMyJF!5e0!3m2!1sen!2s!4v1234567890",
  },
];

// ── FAQ Item ──────────────────────────────────────────────────────────────────
function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeUp} custom={index * 0.05}
      className="border border-sky-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group">
        <span className="text-slate-700 font-semibold text-sm md:text-base group-hover:text-sky-600 transition-colors duration-200">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0 ml-4">
          <FaChevronDown className="text-sky-500 text-sm" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden">
            <div className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-sky-50 pt-4 bg-gradient-to-br from-sky-50/50 to-white">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Contact Banner (Services page Banner style — with floating contact icons) ──
function ContactBanner() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  // Floating icons — contact/medical themed, same pattern as Services Banner
  const floatIcons = [
    { Icon: TbStethoscope, style: { top: "18%",    left: "4%" },     size: 26, delay: 0    },
    { Icon: GiHeartBeats,  style: { top: "22%",    right: "7%" },    size: 30, delay: 0.5  },
    { Icon: TbPhone,       style: { bottom: "22%", left: "7%" },     size: 24, delay: 0.9  },
    { Icon: TbMapPin,      style: { bottom: "28%", right: "5%" },    size: 22, delay: 1.3  },
    { Icon: TbMail,        style: { top: "58%",    left: "2.5%" },   size: 20, delay: 0.7  },
    { Icon: TbAmbulance,   style: { top: "12%",    right: "19%" },   size: 19, delay: 1.1  },
    { Icon: TbClock,       style: { bottom: "12%", right: "22%" },   size: 18, delay: 1.6  },
    { Icon: TbCalendar,    style: { top: "42%",    right: "3%" },    size: 21, delay: 0.3  },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 pb-16"
      style={{ background: "linear-gradient(135deg,#f0f9ff 0%,#ffffff 45%,#fdf2f8 100%)" }}>

      {/* Ambient orbs + grid — exact match with Services */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-sky-200/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: "9s" }} />
        <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-pink-200/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: "13s" }} />
        <div className="absolute inset-0 opacity-[0.18]"
          style={{ backgroundImage: `linear-gradient(rgba(14,165,233,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(219,39,119,.05) 1px,transparent 1px)`, backgroundSize: "48px 48px" }} />
      </div>

      {/* Floating animated icons — same motion as Services Banner */}
      {floatIcons.map(({ Icon, style, size, delay }, i) => (
        <motion.div key={i}
          className="absolute hidden lg:flex items-center justify-center w-14 h-14 rounded-2xl bg-white/70 border border-slate-100 shadow-md"
          style={style}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: [0, 0.65, 0.65], y: [20, 0, -6, 0] } : {}}
          transition={{ delay, duration: 3.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}>
          <Icon size={size} style={{ color: "#0ea5e9", opacity: 0.7 }} />
        </motion.div>
      ))}

      {/* Main banner text content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">

        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-sky-200/70 text-sky-600 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm backdrop-blur-sm">
          <FaHeartbeat className="animate-pulse text-pink-500" />
          Vital Physio Hub · Contact Us
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight font-serif mb-5">
          Get In{" "}
          <span style={{ background: "linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Touch
          </span>
          <br />With Our Team
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
          We're here for you — whether it's a routine inquiry, emergency support, or booking your next appointment.
        </motion.p>

        {/* Stats row — matches Services banner style */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10">
          {[
            { num: "3 min",  label: "Avg. Response" },
            { num: "24/7",   label: "Emergency Line" },
            { num: "2",      label: "Branch Locations" },
            { num: "10K+",   label: "Happy Patients" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.08 }} className="text-center">
              <p className="text-3xl font-extrabold"
                style={{ background: "linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {s.num}
              </p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA pills */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-wrap justify-center gap-3">
          {[
            { icon: <FaPhone />, label: "Call Now",   href: "tel:+923417388830",  cls: "bg-white border-sky-200   text-sky-600   hover:bg-sky-50   hover:border-sky-400" },
            { icon: <FaWhatsapp />, label: "WhatsApp", href: "https://wa.me/923008786187?text=" + encodeURIComponent("Hello Vital Physio Hub, I want to inquire about your healthcare services."), cls: "bg-white border-green-200  text-green-600  hover:bg-green-50  hover:border-green-400" },
            { icon: <FaAmbulance />, label: "Emergency", href: "tel:1122",          cls: "bg-white border-red-200    text-red-500    hover:bg-red-50    hover:border-red-400" },
          ].map((btn) => (
            <a key={btn.label} href={btn.href}
              target={btn.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm border shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 ${btn.cls}`}>
              {btn.icon} {btn.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Main ContactUs Page ───────────────────────────────────────────────────────
export default function ContactUs() {
  const navigate = useNavigate();
  const whatsappNumber = "923008786187";
  const welcomeMessage = encodeURIComponent("Hello Vital Physio Hub, I want to inquire about your healthcare services.");

  const [formData, setFormData] = useState({ name: "", phone: "", email: "", subject: "", department: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1800);
  };

  return (
    <div className="min-h-screen font-body relative"
      style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #fdf2f8 100%)" }}>
      <Navbar />

      {/* ── Ambient BG Orbs (fixed, same as rest of site) ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-sky-200/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: "9s" }} />
        <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-pink-200/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: "13s" }} />
        <div className="absolute inset-0 opacity-[0.18]"
          style={{ backgroundImage: `linear-gradient(rgba(14,165,233,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(219,39,119,.05) 1px,transparent 1px)`, backgroundSize: "48px 48px" }} />
      </div>

      {/* ═══════════════════════════════════════════
          BANNER — Services-style with floating icons
      ═══════════════════════════════════════════ */}
      <ContactBanner />

      {/* ═══════════════════════════════════════════
          QUICK INFO CARDS
      ═══════════════════════════════════════════ */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <FaPhone size={20} />, title: "Phone", lines: ["+92 300 8786187", "+92 341 7388830"], color: "sky" },
              { icon: <FaEnvelope size={20} />, title: "Email", lines: ["info@vitalphysiohub.com", "appointments@vitalphysiohub.com"], color: "pink" },
              { icon: <FaClock size={20} />, title: "Opening Hours", lines: ["Mon–Sat: 9AM – 9PM", "Sun: 10AM – 4PM"], color: "amber" },
              { icon: <MdEmergency size={20} />, title: "Emergency", lines: ["1122 – Rescue", "24/7 Available"], color: "red", urgent: true },
            ].map((card, i) => {
              const colorMap = {
                sky:   { bg: "bg-sky-50",   border: "border-sky-200",   icon: "text-sky-500",   gIcon: "bg-sky-100",   hover: "hover:border-sky-300 hover:shadow-sky-100" },
                pink:  { bg: "bg-pink-50",  border: "border-pink-200",  icon: "text-pink-500",  gIcon: "bg-pink-100",  hover: "hover:border-pink-300 hover:shadow-pink-100" },
                amber: { bg: "bg-amber-50", border: "border-amber-200", icon: "text-amber-500", gIcon: "bg-amber-100", hover: "hover:border-amber-300 hover:shadow-amber-100" },
                red:   { bg: "bg-red-50",   border: "border-red-200",   icon: "text-red-500",   gIcon: "bg-red-100",   hover: "hover:border-red-300 hover:shadow-red-100" },
              };
              const c = card.color === "sky" ? colorMap.sky
                      : card.color === "pink" ? colorMap.pink
                      : card.color === "amber" ? colorMap.amber
                      : colorMap.red;
              return (
                <motion.div key={card.title} variants={fadeUp} custom={i}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`relative rounded-2xl p-5 border ${c.border} ${c.bg} shadow-sm ${c.hover} hover:shadow-md transition-all duration-300 cursor-default`}>
                  {card.urgent && <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${c.gIcon} ${c.icon}`}>{card.icon}</div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{card.title}</p>
                  {card.lines.map((l) => <p key={l} className="text-slate-700 font-semibold text-sm">{l}</p>)}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTACT FORM + SIDEBAR
      ═══════════════════════════════════════════ */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── Left: Contact Form ── */}
            <div className="lg:col-span-2">
              <AnimSection>
                <div className="rounded-3xl border border-sky-100 bg-white shadow-xl shadow-sky-100/40 p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                    style={{ background: "linear-gradient(90deg,#0ea5e9,#db2777)" }} />

                  <div className="mb-8">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2 font-serif">Send Us a Message</h2>
                    <p className="text-slate-400 text-sm">Fill in the form and our team will respond within 30 minutes.</p>
                  </div>

                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-16 text-center">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 12 }}
                          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                          style={{ background: "linear-gradient(135deg,#e0f2fe,#fce7f3)" }}>
                          <FaCheckCircle className="text-sky-500 text-4xl" />
                        </motion.div>
                        <h3 className="text-2xl font-extrabold text-slate-800 mb-2">Message Sent!</h3>
                        <p className="text-slate-400 text-sm max-w-xs mb-6">Thank you for reaching out. Our team will contact you shortly.</p>
                        <button onClick={() => { setSubmitted(false); setFormData({ name: "", phone: "", email: "", subject: "", department: "", message: "" }); }}
                          className="px-6 py-2.5 rounded-full text-sm font-semibold text-sky-600 border border-sky-200 bg-sky-50 hover:bg-sky-100 transition-colors">
                          Send Another
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {[
                            { name: "name",    label: "Full Name",     placeholder: "Ahmed Khan",               type: "text",  required: true },
                            { name: "phone",   label: "Phone Number",  placeholder: "+92 300 000 0000",         type: "tel",   required: true },
                            { name: "email",   label: "Email Address", placeholder: "you@example.com",          type: "email", required: false },
                            { name: "subject", label: "Subject",       placeholder: "e.g. Appointment Inquiry", type: "text",  required: true },
                          ].map((field) => (
                            <div key={field.name} className="flex flex-col gap-1.5">
                              <label className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                                {field.label} {field.required && <span className="text-sky-500">*</span>}
                              </label>
                              <input type={field.type} name={field.name}
                                value={
                                  field.name === "name" ? formData.name :
                                  field.name === "phone" ? formData.phone :
                                  field.name === "email" ? formData.email :
                                  field.name === "subject" ? formData.subject :
                                  ""
                                }
                                onChange={handleChange} placeholder={field.placeholder} required={field.required}
                                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-300 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all duration-200" />
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                            Department / Service <span className="text-sky-500">*</span>
                          </label>
                          <select name="department" value={formData.department} onChange={handleChange} required
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all duration-200 appearance-none">
                            <option value="" disabled className="text-slate-300">Select a department...</option>
                            {["General Inquiry","Appointment Booking","Dental Care","Skin Care","Hair Transplant","Orthopedic","ENT","Gynecology","Emergency Support","Online Consultation","Billing / Insurance","Patient Records","Feedback / Complaint"].map(d => (
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                            Message <span className="text-sky-500">*</span>
                          </label>
                          <textarea name="message" value={formData.message} onChange={handleChange} required rows={5}
                            placeholder="Describe your inquiry or message..."
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-300 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all duration-200 resize-none" />
                        </div>

                        <motion.button type="submit" disabled={loading}
                          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          className="w-full py-4 rounded-xl font-bold text-white text-sm tracking-wide relative overflow-hidden group transition-all duration-300"
                          style={{ background: loading ? "#cbd5e1" : "linear-gradient(135deg,#0ea5e9,#db2777)" }}>
                          {loading ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                              </svg>
                              Sending...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-2"><FaPaperPlane /> Send Message</span>
                          )}
                          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                        </motion.button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </AnimSection>
            </div>

            {/* ── Right Sidebar ── */}
            <div className="flex flex-col gap-5">

              {/* WhatsApp CTA */}
              <AnimSection delay={1}>
                <motion.a href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -3 }} whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-6 rounded-2xl border border-green-200 bg-white shadow-sm shadow-green-100/60 cursor-pointer group relative overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FaWhatsapp size={28} className="text-white" />
                  </div>
                  <div>
                    <p className="text-slate-800 font-bold text-base">Chat on WhatsApp</p>
                    <p className="text-green-500 text-xs mt-0.5 font-semibold">Instant replies · 24/7</p>
                    <p className="text-slate-400 text-xs mt-1">+92 300 8786187</p>
                  </div>
                  <div className="absolute inset-0 bg-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </motion.a>
              </AnimSection>

              {/* Emergency Card */}
              <AnimSection delay={2}>
                <div className="relative p-6 rounded-2xl border border-red-200 bg-white shadow-sm overflow-hidden">
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                      <FaAmbulance className="text-red-500 text-xl" />
                    </div>
                    <span className="text-slate-800 font-bold text-base">Emergency Line</span>
                  </div>
                  <p className="text-slate-400 text-xs mb-3">For life-threatening emergencies, call immediately:</p>
                  <a href="tel:1122" className="block text-3xl font-black text-red-500 hover:text-red-600 transition-colors tracking-wider">1122</a>
                  <p className="text-slate-400 text-xs mt-1">Rescue / Ambulance — Free 24/7</p>
                  <a href="tel:+923008786187" className="mt-3 block text-sm text-red-400 hover:text-red-500 transition-colors font-semibold">
                    Clinic Helpline: +92 300 8786187
                  </a>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg,#ef4444,#fb7185)" }} />
                </div>
              </AnimSection>

              {/* Office Hours */}
              <AnimSection delay={3}>
                <div className="p-6 rounded-2xl border border-sky-100 bg-white shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center">
                      <FaClock className="text-sky-500 text-sm" />
                    </div>
                    <span className="text-slate-800 font-bold text-sm">Working Hours</span>
                  </div>
                  {[
                    { day: "Mon – Wed",  hours: "9:00 AM – 9:00 PM" },
                    { day: "Thu – Fri",  hours: "9:00 AM – 9:00 PM" },
                    { day: "Saturday",   hours: "9:00 AM – 6:00 PM" },
                    { day: "Sunday",     hours: "10:00 AM – 4:00 PM" },
                    { day: "Emergency",  hours: "24 / 7", highlight: true },
                  ].map(item => (
                    <div key={item.day} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                      <span className="text-slate-400 text-xs font-medium">{item.day}</span>
                      <span className={`text-xs font-bold ${item.highlight ? "text-sky-500" : "text-slate-700"}`}>{item.hours}</span>
                    </div>
                  ))}
                </div>
              </AnimSection>

              {/* ── Follow Us — with real social links ── */}
              <AnimSection delay={4}>
                <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm">
                  <p className="text-slate-700 font-bold text-sm mb-1">Follow Us</p>
                  <p className="text-slate-400 text-xs mb-4">Stay connected for health tips & updates</p>
                  <div className="flex gap-3 flex-wrap">
                    {[
                      {
                        icon: <FaFacebook size={18} />,
                        label: "Facebook",
                        // ← Replace with your real Facebook page URL
                        href: "https://www.facebook.com/vitalphysiohub",
                        cls: "bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 hover:border-blue-400",
                      },
                      {
                        icon: <FaInstagram size={18} />,
                        label: "Instagram",
                        // ← Replace with your real Instagram profile URL
                        href: "https://www.instagram.com/vitalphysiohub",
                        cls: "bg-pink-50 border-pink-200 text-pink-500 hover:bg-pink-100 hover:border-pink-400",
                      },
                      {
                        icon: <FaYoutube size={18} />,
                        label: "YouTube",
                        // ← Replace with your real YouTube channel URL
                        href: "https://www.youtube.com/@vitalphysiohub",
                        cls: "bg-red-50 border-red-200 text-red-500 hover:bg-red-100 hover:border-red-400",
                      },
                      {
                        icon: <FaWhatsapp size={18} />,
                        label: "WhatsApp",
                        href: `https://wa.me/${whatsappNumber}?text=${welcomeMessage}`,
                        cls: "bg-green-50 border-green-200 text-green-500 hover:bg-green-100 hover:border-green-400",
                      },
                    ].map(s => (
                      <motion.a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        title={s.label}
                        className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-200 shadow-sm ${s.cls}`}>
                        {s.icon}
                      </motion.a>
                    ))}
                  </div>
                  {/* Social handle labels */}
                  <div className="mt-4 pt-4 border-t border-slate-50 space-y-2">
                    <p className="text-slate-400 text-xs font-medium flex items-center gap-2">
                      <FaFacebook className="text-blue-500" /> facebook.com/<span className="text-slate-600 font-semibold">vitalphysiohub</span>
                    </p>
                    <p className="text-slate-400 text-xs font-medium flex items-center gap-2">
                      <FaInstagram className="text-pink-500" /> @<span className="text-slate-600 font-semibold">vitalphysiohub</span>
                    </p>
                    <p className="text-slate-400 text-xs font-medium flex items-center gap-2">
                      <FaYoutube className="text-red-500" /> youtube.com/<span className="text-slate-600 font-semibold">@vitalphysiohub</span>
                    </p>
                  </div>
                </div>
              </AnimSection>

            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BRANCH LOCATIONS + MAPS
      ═══════════════════════════════════════════ */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <AnimSection className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-sky-200/70 text-sky-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse" /> Our Locations
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 font-serif">Find Us Near You</h2>
            <p className="text-slate-400 text-sm mt-3 max-w-lg mx-auto">Multiple branches for your convenience. Walk in or book at your nearest branch.</p>
          </AnimSection>

          {/* Branch Tabs */}
          <AnimSection className="mb-6">
            <div className="flex gap-3 justify-center flex-wrap">
              {branches.map((b, i) => (
                <button key={b.name} onClick={() => setActiveTab(i)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border shadow-sm ${
                    activeTab === i
                      ? "text-white border-transparent shadow-sky-200/60 shadow-lg"
                      : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-600"
                  }`}
                  style={activeTab === i ? { background: "linear-gradient(135deg,#0ea5e9,#db2777)" } : {}}>
                  {b.name}
                </button>
              ))}
            </div>
          </AnimSection>

          <AnimatePresence mode="wait">
            {branches.map((branch, i) => activeTab === i ? (
              <motion.div key={branch.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Map */}
                <div className="rounded-2xl overflow-hidden border border-sky-100 shadow-md h-72 lg:h-auto">
                  <iframe src={branch.mapSrc} width="100%" height="100%"
                    style={{ border: 0, minHeight: "280px" }}
                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    title={`Map for ${branch.name}`} />
                </div>
                {/* Info */}
                <div className="flex flex-col justify-center gap-5 bg-white rounded-2xl border border-sky-100 shadow-sm p-8">
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-1 font-serif">{branch.name}</h3>
                    <div className="h-1 w-16 rounded-full" style={{ background: "linear-gradient(90deg,#0ea5e9,#db2777)" }} />
                  </div>
                  {[
                    { icon: <FaMapMarkerAlt className="text-sky-500" />, label: "Address",   value: branch.address },
                    { icon: <FaPhone className="text-sky-500" />,        label: "Phone",     value: branch.phone },
                    { icon: <FaClock className="text-sky-500" />,        label: "Hours",     value: branch.hours },
                    { icon: <MdEmergency className="text-red-500" />,    label: "Emergency", value: branch.emergency },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center flex-shrink-0 mt-0.5">{item.icon}</div>
                      <div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{item.label}</p>
                        <p className="text-slate-700 font-semibold text-sm mt-0.5">{item.value}</p>
                      </div>
                    </div>
                  ))}
                  <a href={`https://www.google.com/maps/search/${encodeURIComponent(branch.address)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold self-start transition-all duration-200 hover:opacity-90 shadow-md"
                    style={{ background: "linear-gradient(135deg,#0ea5e9,#7c3aed)" }}>
                    <FaMapMarkerAlt /> Get Directions
                  </a>
                </div>
              </motion.div>
            ) : null)}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FAQ SECTION
      ═══════════════════════════════════════════ */}
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <AnimSection className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200/70 text-pink-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse" /> Patient Support
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 font-serif">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm mt-3">
              Can't find what you need?{" "}
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
                className="text-sky-500 font-semibold hover:underline">Chat with us.</a>
            </p>
          </AnimSection>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="space-y-3">
            {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} index={i} />)}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BOTTOM CTA BANNER — matches Services CTA
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 mt-4"
        style={{ background: "linear-gradient(135deg,#0ea5e9 0%,#7c3aed 50%,#db2777 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <MdOutlineLocalHospital className="text-white/60 text-5xl mx-auto mb-4" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 font-serif">
            Need Immediate Assistance?
          </h2>
          <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto">
            Our team is ready — book an appointment online, chat on WhatsApp, or call us directly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a href="#booking" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-xl font-bold text-sky-600 bg-white shadow-xl hover:bg-white/90 transition-all flex items-center gap-2 text-sm">
              <FiCalendar size={14} /> Book Appointment
            </motion.a>
            <motion.a href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`}
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-xl font-bold text-white border-2 border-white/40 hover:bg-white/10 transition-all flex items-center gap-2 text-sm">
              <FiMessageCircle size={14} /> Chat on WhatsApp
            </motion.a>
          </div>
        </div>
      </section>

      {/* ── Floating WhatsApp Button ── */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        <div className="absolute w-16 h-16 bg-green-500 rounded-full animate-ping opacity-40 pointer-events-none" />
        <motion.a href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`}
          target="_blank" rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#20ba5a] transition-colors duration-200 cursor-pointer group">
          <FaWhatsapp size={36} />
          <span className="absolute right-20 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 pointer-events-none transition-all duration-200">
            Chat With Us
          </span>
        </motion.a>
      </div>
      <Footer />
    </div>
  );
}