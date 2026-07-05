// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
// import {
//   FiArrowLeft, FiX, FiChevronDown, FiChevronRight, FiCheck,
//   FiZap, FiShield, FiAward, FiClock, FiCalendar, FiPhone,
//   FiSearch, FiFilter, FiInfo, FiStar, FiActivity,
// } from "react-icons/fi";
// import {
//   FaWhatsapp, FaHeartbeat, FaRobot, FaFlask, FaMicroscope,
//   FaTooth, FaSpa, FaXRay, FaHospital, FaCertificate,
// } from "react-icons/fa";
// import {
//   TbStethoscope, TbBone, TbEar, TbEye, TbBrain,
//   TbDeviceAnalytics, TbMicroscope, TbHeartRateMonitor,
//   TbTestPipe, TbRadioactive, TbAtom,
// } from "react-icons/tb";
// import {
//   GiHeartBeats, GiBrain, GiDna2, GiMicroscope,
// } from "react-icons/gi";
// import { MdOutlineBiotech, MdOutlineScience } from "react-icons/md";
// import { HiOutlineBadgeCheck, HiOutlineArrowRight } from "react-icons/hi";

// // ─── EQUIPMENT DATA ───────────────────────────────────────────────────────────
// const CATEGORIES = [
//   { id: "all",        label: "All Equipment",   color: "#0ea5e9", icon: TbStethoscope },
//   { id: "diagnostic", label: "Diagnostic",       color: "#0ea5e9", icon: TbDeviceAnalytics },
//   { id: "dental",     label: "Dental",           color: "#06b6d4", icon: FaTooth },
//   { id: "skincare",   label: "Skin Care",         color: "#ec4899", icon: FaSpa },
//   { id: "lab",        label: "Laboratory",        color: "#8b5cf6", icon: TbMicroscope },
//   { id: "surgical",   label: "Surgical",          color: "#f43f5e", icon: FaHospital },
//   { id: "ai",         label: "AI Systems",        color: "#6366f1", icon: FaRobot },
// ];

// const EQUIPMENT = [
//   // DIAGNOSTIC
//   {
//     id: 1, category: "diagnostic",
//     name: "Digital X-Ray System",
//     brand: "Siemens Healthineers", model: "MULTIX Impact",
//     badge: "AI Assisted", badgeColor: "#6366f1",
//     image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
//     shortDesc: "High-resolution digital radiography with instant AI-analyzed reports and 70% lower radiation.",
//     description: "Our Siemens MULTIX Impact delivers crystal-clear digital X-rays with AI-powered anomaly detection. Doctors receive instant reports within 90 seconds, improving diagnostic accuracy and reducing patient wait times dramatically.",
//     specs: [
//       { key: "Brand", val: "Siemens Healthineers" },
//       { key: "Resolution", val: "43×43 cm Flat Panel" },
//       { key: "Radiation", val: "70% Less vs Analog" },
//       { key: "Report Time", val: "< 90 seconds" },
//       { key: "Technology", val: "AI-Assisted DR" },
//       { key: "Certification", val: "CE, FDA Approved" },
//     ],
//     benefits: ["Instant high-definition imaging", "AI anomaly detection", "70% reduced radiation", "Cloud report sharing"],
//     status: "available",
//     color: "#0ea5e9",
//     gradient: "from-sky-500 to-cyan-400",
//     lightBg: "from-sky-50 to-cyan-50",
//   },
//   {
//     id: 2, category: "diagnostic",
//     name: "4D Ultrasound Machine",
//     brand: "GE HealthCare", model: "LOGIQ E10",
//     badge: "4D Imaging", badgeColor: "#0ea5e9",
//     image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=600&q=80",
//     shortDesc: "Real-time 4D imaging for obstetrics, cardiology, and abdominal diagnostics with AI auto-measurement.",
//     description: "The GE LOGIQ E10 brings 4D ultrasound technology to our clinic. With AI-powered cine loop analysis and automated measurements, our specialists deliver precise diagnoses for obstetric, cardiac, and abdominal conditions.",
//     specs: [
//       { key: "Brand", val: "GE HealthCare" },
//       { key: "Mode", val: "2D / 3D / 4D" },
//       { key: "Probes", val: "6 Specialized Probes" },
//       { key: "AI Features", val: "Auto-Measurement" },
//       { key: "Display", val: "23.8\" HD Touch" },
//       { key: "Certification", val: "ISO 13485, CE" },
//     ],
//     benefits: ["Real-time 4D fetal imaging", "Cardiac strain analysis", "AI auto-measurements", "Portable trolley design"],
//     status: "available",
//     color: "#06b6d4",
//     gradient: "from-cyan-500 to-sky-400",
//     lightBg: "from-cyan-50 to-sky-50",
//   },
//   {
//     id: 3, category: "diagnostic",
//     name: "12-Lead ECG System",
//     brand: "Philips", model: "PageWriter TC70",
//     badge: "Cardiac AI", badgeColor: "#f43f5e",
//     image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=600&q=80",
//     shortDesc: "Advanced 12-lead ECG with real-time cardiac AI interpretation and instant physician alerts.",
//     description: "The Philips PageWriter TC70 provides hospital-grade ECG diagnostics with built-in AI that detects 22 cardiac conditions including STEMI, arrhythmias, and conduction defects — alerting physicians in real time.",
//     specs: [
//       { key: "Brand", val: "Philips" },
//       { key: "Leads", val: "12 Standard Leads" },
//       { key: "AI Detection", val: "22 Cardiac Conditions" },
//       { key: "Storage", val: "2,000 ECG Records" },
//       { key: "Connectivity", val: "Wi-Fi / LAN / USB" },
//       { key: "Certification", val: "FDA, CE, ISO" },
//     ],
//     benefits: ["Instant STEMI detection", "22-condition AI analysis", "Wireless connectivity", "EMR integration ready"],
//     status: "available",
//     color: "#f43f5e",
//     gradient: "from-rose-500 to-pink-400",
//     lightBg: "from-rose-50 to-pink-50",
//   },
//   // DENTAL
//   {
//     id: 4, category: "dental",
//     name: "Digital Dental Chair",
//     brand: "Planmeca", model: "Sovereign Classic",
//     badge: "Smart Control", badgeColor: "#06b6d4",
//     image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=600&q=80",
//     shortDesc: "Premium electric dental chair with programmable positions, integrated light, and patient comfort systems.",
//     description: "The Planmeca Sovereign Classic offers unparalleled patient comfort and operational efficiency. Programmable chair positions, integrated cuspidor, LED dental light, and touchscreen control panel streamline every procedure.",
//     specs: [
//       { key: "Brand", val: "Planmeca" },
//       { key: "Positions", val: "5 Programmable" },
//       { key: "Light", val: "LED Shadowless" },
//       { key: "Control", val: "Touch Panel" },
//       { key: "Water System", val: "Integrated Cuspidor" },
//       { key: "Certification", val: "CE, ISO 13485" },
//     ],
//     benefits: ["5 memory positions", "LED shadowless light", "Ergonomic patient design", "Touchscreen control"],
//     status: "available",
//     color: "#06b6d4",
//     gradient: "from-cyan-500 to-teal-400",
//     lightBg: "from-cyan-50 to-teal-50",
//   },
//   {
//     id: 5, category: "dental",
//     name: "Intraoral 3D Scanner",
//     brand: "3Shape", model: "TRIOS 5",
//     badge: "3D Scanning", badgeColor: "#8b5cf6",
//     image: "https://images.unsplash.com/photo-1588776814546-1ffbb172d4a4?auto=format&fit=crop&w=600&q=80",
//     shortDesc: "Ultra-fast intraoral scanner for digital impressions — no messy materials, instant 3D tooth models.",
//     description: "The 3Shape TRIOS 5 replaces traditional dental impressions with a comfortable, 30-second digital scan. Produces color 3D models instantly, integrating with CAD/CAM systems for same-day restorations.",
//     specs: [
//       { key: "Brand", val: "3Shape" },
//       { key: "Scan Speed", val: "Full Arch 30 sec" },
//       { key: "Output", val: "Color 3D Model" },
//       { key: "Integration", val: "CAD/CAM Ready" },
//       { key: "Accuracy", val: "< 10 microns" },
//       { key: "Certification", val: "FDA, CE" },
//     ],
//     benefits: ["No physical impressions", "30-second full arch scan", "Color 3D output", "CAD/CAM integration"],
//     status: "available",
//     color: "#8b5cf6",
//     gradient: "from-violet-500 to-purple-400",
//     lightBg: "from-violet-50 to-purple-50",
//   },
//   // SKIN CARE
//   {
//     id: 6, category: "skincare",
//     name: "Fractional CO₂ Laser",
//     brand: "Lumenis", model: "UltraPulse",
//     badge: "Gold Standard", badgeColor: "#ec4899",
//     image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
//     shortDesc: "World's most trusted fractional laser for skin resurfacing, scar removal, and anti-aging.",
//     description: "The Lumenis UltraPulse is the gold standard in fractional CO₂ laser therapy. Used for skin resurfacing, acne scar removal, wrinkle reduction, and pigmentation — delivering dramatic results with minimal downtime.",
//     specs: [
//       { key: "Brand", val: "Lumenis" },
//       { key: "Wavelength", val: "10,600 nm CO₂" },
//       { key: "Pulse Mode", val: "Fractional / Full" },
//       { key: "Cooling", val: "Integrated Cryo" },
//       { key: "Recovery", val: "3–5 Days" },
//       { key: "Certification", val: "FDA Cleared, CE" },
//     ],
//     benefits: ["Acne scar elimination", "Deep wrinkle removal", "Skin resurfacing", "Minimal downtime"],
//     status: "available",
//     color: "#ec4899",
//     gradient: "from-pink-500 to-rose-400",
//     lightBg: "from-pink-50 to-rose-50",
//   },
//   {
//     id: 7, category: "skincare",
//     name: "HydraFacial MD Elite",
//     brand: "BeautyHealth", model: "Syndeo",
//     badge: "Trending", badgeColor: "#f59e0b",
//     image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
//     shortDesc: "Non-invasive hydradermabrasion with patented vortex technology — cleanse, extract, hydrate in one session.",
//     description: "The HydraFacial Syndeo combines cleansing, exfoliation, extraction, hydration, and antioxidant protection simultaneously. Visible results in one 30-minute session with zero downtime — suitable for all skin types.",
//     specs: [
//       { key: "Brand", val: "BeautyHealth" },
//       { key: "Technology", val: "Vortex-Fusion" },
//       { key: "Session Time", val: "30 minutes" },
//       { key: "Downtime", val: "None" },
//       { key: "Skin Types", val: "All Types" },
//       { key: "Certification", val: "FDA Cleared" },
//     ],
//     benefits: ["Instant glow", "Deep pore cleansing", "Hyaluronic infusion", "Zero downtime"],
//     status: "available",
//     color: "#f59e0b",
//     gradient: "from-amber-500 to-orange-400",
//     lightBg: "from-amber-50 to-orange-50",
//   },
//   // LAB
//   {
//     id: 8, category: "lab",
//     name: "Hematology Analyzer",
//     brand: "Sysmex", model: "XN-1000",
//     badge: "AI Analysis", badgeColor: "#6366f1",
//     image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=600&q=80",
//     shortDesc: "Complete blood count analysis with 26-parameter CBC and AI cell morphology in under 60 seconds.",
//     description: "The Sysmex XN-1000 delivers comprehensive hematology panels with AI-powered cell classification. It processes 100 samples/hour, provides 26-parameter CBC reports, and flags abnormal morphologies automatically.",
//     specs: [
//       { key: "Brand", val: "Sysmex" },
//       { key: "Parameters", val: "26 CBC Parameters" },
//       { key: "Throughput", val: "100 samples/hour" },
//       { key: "Report Time", val: "< 60 seconds" },
//       { key: "AI Flagging", val: "Abnormal Morphology" },
//       { key: "Certification", val: "ISO 15189, CE" },
//     ],
//     benefits: ["26-parameter CBC", "AI cell classification", "100 samples/hour", "Auto abnormality flagging"],
//     status: "available",
//     color: "#6366f1",
//     gradient: "from-indigo-500 to-blue-400",
//     lightBg: "from-indigo-50 to-blue-50",
//   },
//   // SURGICAL
//   {
//     id: 9, category: "surgical",
//     name: "LED Surgical Lights",
//     brand: "Trumpf Medical", model: "iLED 5",
//     badge: "OR Ready", badgeColor: "#f43f5e",
//     image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=600&q=80",
//     shortDesc: "Shadowless LED surgical lighting system with 160,000 lux intensity and adjustable color temperature.",
//     description: "Trumpf iLED 5 provides optimal surgical illumination with 160,000 lux, adjustable 3,500–5,000K color temperature, and a unique shadowless multi-LED array that eliminates visual interference during complex procedures.",
//     specs: [
//       { key: "Brand", val: "Trumpf Medical" },
//       { key: "Intensity", val: "160,000 Lux" },
//       { key: "Color Temp", val: "3,500–5,000K" },
//       { key: "LED Lifespan", val: "50,000 hours" },
//       { key: "Sterilizability", val: "Autoclavable Handle" },
//       { key: "Certification", val: "CE, ISO 7 OR Rated" },
//     ],
//     benefits: ["160,000 lux brightness", "Shadowless technology", "50,000hr LED lifespan", "Autoclavable handles"],
//     status: "available",
//     color: "#f43f5e",
//     gradient: "from-rose-500 to-red-400",
//     lightBg: "from-rose-50 to-red-50",
//   },
//   // AI
//   {
//     id: 10, category: "ai",
//     name: "AI Diagnostic Platform",
//     brand: "Premium Clinic AI", model: "SmartDx v3",
//     badge: "Exclusive", badgeColor: "#6366f1",
//     image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=600&q=80",
//     shortDesc: "Proprietary AI system integrating all diagnostic data for risk prediction and smart treatment recommendations.",
//     description: "Our SmartDx AI platform connects with all diagnostic equipment — X-ray, ECG, blood analyzers, and ultrasound — to generate unified patient risk profiles, smart treatment pathways, and predictive health alerts.",
//     specs: [
//       { key: "Technology", val: "Deep Learning (CNN)" },
//       { key: "Data Sources", val: "All Diagnostic Units" },
//       { key: "Accuracy", val: "97.3% Validated" },
//       { key: "Processing", val: "Real-time GPU" },
//       { key: "Integration", val: "EMR / HIS Ready" },
//       { key: "Compliance", val: "HIPAA, HL7 FHIR" },
//     ],
//     benefits: ["97.3% diagnostic accuracy", "Unified patient profiles", "Predictive health alerts", "EMR integration"],
//     status: "available",
//     color: "#6366f1",
//     gradient: "from-indigo-500 to-violet-400",
//     lightBg: "from-indigo-50 to-violet-50",
//   },
// ];

// const COMPARISON_ROWS = [
//   { feature: "Diagnostic Accuracy",  traditional: "78%",      ours: "97%+",       icon: TbDeviceAnalytics },
//   { feature: "Report Generation",    traditional: "24–48 hrs", ours: "< 2 hrs",   icon: FiClock },
//   { feature: "Radiation Exposure",   traditional: "High",      ours: "70% Lower",  icon: TbRadioactive },
//   { feature: "AI Analysis",          traditional: "None",      ours: "Built-in",   icon: FaRobot },
//   { feature: "Patient Comfort",      traditional: "Basic",     ours: "Premium",    icon: FiShield },
//   { feature: "International Cert.",  traditional: "Local Only", ours: "FDA / CE",  icon: FaCertificate },
// ];

// const CERTIFICATIONS = [
//   { name: "FDA Approved", body: "U.S. Food & Drug Administration", color: "#0ea5e9" },
//   { name: "CE Marked", body: "European Conformity Standard", color: "#6366f1" },
//   { name: "ISO 13485", body: "Medical Device Quality Mgmt", color: "#ec4899" },
//   { name: "ISO 15189", body: "Medical Laboratory Standard", color: "#f59e0b" },
// ];

// const JOURNEY_STEPS = [
//   { step: 1, title: "Appointment Booked", icon: FiCalendar, color: "#0ea5e9" },
//   { step: 2, title: "Initial Consultation", icon: TbStethoscope, color: "#06b6d4" },
//   { step: 3, title: "Advanced Diagnostics", icon: TbDeviceAnalytics, color: "#8b5cf6" },
//   { step: 4, title: "AI Report Analysis", icon: FaRobot, color: "#6366f1" },
//   { step: 5, title: "Treatment Plan", icon: FiActivity, color: "#ec4899" },
//   { step: 6, title: "Follow-Up Care", icon: FiShield, color: "#db2777" },
// ];

// const FAQS = [
//   { q: "Are all your machines internationally certified?", a: "Yes, all our equipment carries FDA clearance, CE marking, and relevant ISO certifications. We only invest in devices that meet international medical-grade standards." },
//   { q: "How accurate are your diagnostic reports?", a: "Our AI-assisted diagnostic systems achieve 97%+ accuracy validated against clinical studies. Reports are reviewed and signed by our board-certified specialists before delivery." },
//   { q: "Is the equipment safe for children and pregnant women?", a: "Absolutely. Our digital X-ray systems use 70% less radiation than analog systems, and our ultrasound equipment is entirely non-invasive. Safety protocols are strictly followed for all patient groups." },
//   { q: "How often is equipment maintained and serviced?", a: "All equipment is serviced quarterly by manufacturer-certified technicians. Our maintenance logs are updated in real-time and available for audit. We follow strict biomedical engineering protocols." },
//   { q: "Do you use AI in your diagnostic process?", a: "Yes. Our SmartDx AI platform integrates with X-ray, ECG, blood analyzers, and ultrasound to generate unified risk assessments and flag anomalies that may be missed by the human eye alone." },
// ];

// // Floating background medical icons
// const FLOAT_ICONS = [
//   { Icon: TbStethoscope, top:"12%", left:"3%",  size:28, delay:0   },
//   { Icon: GiHeartBeats,  top:"20%", right:"5%", size:32, delay:0.4 },
//   { Icon: GiBrain,       bottom:"25%", left:"5%", size:26, delay:0.8 },
//   { Icon: TbAtom,        bottom:"30%", right:"4%", size:24, delay:1.2 },
//   { Icon: TbMicroscope,  top:"55%", left:"2%",  size:22, delay:0.6 },
//   { Icon: FaHeartbeat,   top:"8%",  right:"18%", size:20, delay:1.0 },
//   { Icon: GiDna2,        bottom:"15%", right:"20%", size:22, delay:1.4 },
//   { Icon: TbEye,         top:"38%", right:"2%", size:20, delay:0.2 },
// ];

// // ─── EQUIPMENT MODAL ─────────────────────────────────────────────────────────
// function EquipmentModal({ item: d, onClose }) {
//   return (
//     <AnimatePresence>
//       <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
//         initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
//         <motion.div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}
//           initial={{ opacity:0 }} animate={{ opacity:1 }} />
//         <motion.div
//           initial={{ opacity:0, scale:0.92, y:30 }}
//           animate={{ opacity:1, scale:1, y:0 }}
//           exit={{ opacity:0, scale:0.95, y:20 }}
//           transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
//           className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//           style={{ scrollbarWidth:"none" }}>

//           <div className="h-1.5 rounded-t-3xl w-full"
//             style={{ background:`linear-gradient(90deg,${d.color},#db2777)` }} />

//           {/* Hero image */}
//           <div className="relative h-52 overflow-hidden">
//             <img src={d.image} alt={d.name}
//               className="w-full h-full object-cover" />
//             <div className="absolute inset-0"
//               style={{ background:`linear-gradient(to top, white 5%, ${d.color}44 60%, transparent 100%)` }} />
//             <button onClick={onClose}
//               className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-xl flex items-center justify-center shadow-md hover:bg-white transition-colors backdrop-blur-sm">
//               <FiX size={16} className="text-slate-600" />
//             </button>
//             <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-extrabold text-white"
//               style={{ background:d.badgeColor }}>
//               {d.badge}
//             </span>
//           </div>

//           <div className="px-6 pb-6">
//             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{d.brand} · {d.model}</p>
//             <h2 className="text-2xl font-extrabold text-slate-900 font-serif mb-2">{d.name}</h2>
//             <p className="text-sm text-slate-500 leading-relaxed mb-6">{d.description}</p>

//             {/* Specs */}
//             <div className="mb-6">
//               <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3">Specifications</h3>
//               <div className="grid grid-cols-2 gap-2">
//                 {d.specs.map(s => (
//                   <div key={s.key} className="flex flex-col gap-0.5 p-3 rounded-xl border border-slate-100 bg-slate-50">
//                     <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">{s.key}</span>
//                     <span className="text-sm font-bold text-slate-700">{s.val}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Benefits */}
//             <div className="mb-6">
//               <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3">Key Benefits</h3>
//               <div className="space-y-2">
//                 {d.benefits.map(b => (
//                   <div key={b} className="flex items-center gap-3 text-sm">
//                     <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
//                       style={{ background:d.color }}>
//                       <FiCheck size={11} className="text-white" />
//                     </div>
//                     <span className="text-slate-700 font-semibold">{b}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* CTA */}
//             <div className="flex gap-3">
//               <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
//                 className="flex-1 py-3 rounded-xl font-bold text-white text-sm shadow-lg flex items-center justify-center gap-2"
//                 style={{ background:`linear-gradient(135deg,${d.color},#db2777)` }}>
//                 <FiCalendar size={14} /> Book Appointment
//               </motion.button>
//               <motion.a whileHover={{ scale:1.07 }} whileTap={{ scale:0.95 }}
//                 href="https://wa.me/923001234567"
//                 target="_blank" rel="noopener noreferrer"
//                 className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
//                 <FaWhatsapp size={20} className="text-white" />
//               </motion.a>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// // ─── EQUIPMENT CARD ───────────────────────────────────────────────────────────
// function EquipmentCard({ item: d, index, onOpen }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true });
//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity:0, y:30 }}
//       animate={inView ? { opacity:1, y:0 } : {}}
//       transition={{ duration:0.5, delay:index * 0.07 }}
//       whileHover={{ y:-4 }}
//       onClick={() => onOpen(d)}
//       className={`bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group ${d.borderColor || "border-slate-100"}`}>

//       {/* Image */}
//       <div className="relative h-44 overflow-hidden">
//         <img src={d.image} alt={d.name}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//         <div className="absolute inset-0"
//           style={{ background:`linear-gradient(to top, white 0%, transparent 60%)` }} />
//         <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold text-white"
//           style={{ background:d.badgeColor }}>
//           {d.badge}
//         </span>
//         <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-green-400 border-2 border-white shadow-sm"
//           title="Available" />
//       </div>

//       <div className="p-4">
//         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{d.brand}</p>
//         <h3 className="text-base font-extrabold text-slate-900 leading-tight mb-2 font-serif">{d.name}</h3>
//         <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">{d.shortDesc}</p>

//         <div className="flex items-center justify-between">
//           <div className="flex gap-1">
//             {d.benefits.slice(0,2).map(b => (
//               <span key={b} className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 truncate max-w-[90px]">{b}</span>
//             ))}
//           </div>
//           <motion.div whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
//             className="w-8 h-8 rounded-xl flex items-center justify-center"
//             style={{ background:`${d.color}18`, color:d.color }}>
//             <HiOutlineArrowRight size={15} />
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// // ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
// function Counter({ target, suffix = "", duration = 2000 }) {
//   const [count, setCount] = useState(0);
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true });
//   useEffect(() => {
//     if (!inView) return;
//     let start = 0;
//     const end = parseInt(target);
//     const step = Math.ceil(end / (duration / 30));
//     const timer = setInterval(() => {
//       start += step;
//       if (start >= end) { setCount(end); clearInterval(timer); }
//       else setCount(start);
//     }, 30);
//     return () => clearInterval(timer);
//   }, [inView, target, duration]);
//   return <span ref={ref}>{count}{suffix}</span>;
// }

// // ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
// function FaqItem({ q, a, index }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <motion.div
//       initial={{ opacity:0, y:15 }}
//       whileInView={{ opacity:1, y:0 }}
//       viewport={{ once:true }}
//       transition={{ delay:index * 0.07 }}
//       className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
//       <button onClick={() => setOpen(o => !o)}
//         className="w-full text-left px-6 py-4 flex items-center justify-between gap-4">
//         <span className="text-sm font-extrabold text-slate-800">{q}</span>
//         <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration:0.25 }}
//           className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
//           style={{ background: open ? "linear-gradient(135deg,#0ea5e9,#db2777)" : "#f1f5f9" }}>
//           <FiChevronDown size={14} style={{ color: open ? "white" : "#94a3b8" }} />
//         </motion.div>
//       </button>
//       <AnimatePresence>
//         {open && (
//           <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }}
//             exit={{ height:0, opacity:0 }} transition={{ duration:0.3 }}>
//             <p className="px-6 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-3">
//               {a}
//             </p>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

// // ─── MAIN PAGE ────────────────────────────────────────────────────────────────
// export default function EquipmentPage({ onNavigate, onBookAppointment }) {
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [search, setSearch] = useState("");
//   const [selected, setSelected] = useState(null);

//   const filtered = EQUIPMENT.filter(e => {
//     const matchCat = activeCategory === "all" || e.category === activeCategory;
//     const q = search.toLowerCase();
//     const matchSearch = !q || e.name.toLowerCase().includes(q) || e.brand.toLowerCase().includes(q) || e.shortDesc.toLowerCase().includes(q);
//     return matchCat && matchSearch;
//   });

//   const heroRef = useRef(null);
//   const heroInView = useInView(heroRef, { once: true });
//   const whatsappNum = "+923001234567";

//   return (
//     <div className="min-h-screen bg-slate-50 font-body">
//       {selected && <EquipmentModal item={selected} onClose={() => setSelected(null)} />}

//       {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
//       <section ref={heroRef} className="relative overflow-hidden min-h-[88vh] flex items-center">

//         {/* Background image with overlay */}
//         <div className="absolute inset-0">
//           <img
//             src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=80"
//             alt="Medical Equipment"
//             className="w-full h-full object-cover"
//           />
//           {/* Gradient overlay — sky blue to pinkish */}
//           <div className="absolute inset-0"
//             style={{ background:"linear-gradient(135deg, rgba(14,165,233,0.88) 0%, rgba(99,102,241,0.70) 45%, rgba(219,39,119,0.80) 100%)" }} />
//           {/* Grid pattern */}
//           <div className="absolute inset-0 opacity-10"
//             style={{ backgroundImage:`linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px)`, backgroundSize:"52px 52px" }} />
//         </div>

//         {/* Back button */}
//         <motion.button
//           initial={{ opacity:0, x:-15 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.2 }}
//           whileHover={{ x:-3 }} whileTap={{ scale:0.95 }}
//           onClick={() => onNavigate?.("home")}
//           className="absolute top-5 left-5 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 border border-white/30 text-white text-sm font-bold hover:bg-white/25 transition-all backdrop-blur-sm">
//           <FiArrowLeft size={14} /> Back to Home
//         </motion.button>

//         {/* Floating icons — fade in with animation */}
//         {FLOAT_ICONS.map(({ Icon, top, left, right, bottom, size, delay }, i) => (
//           <motion.div key={i}
//             className="absolute hidden lg:flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm"
//             style={{ top, left, right, bottom }}
//             initial={{ opacity:0, y:20 }}
//             animate={heroInView ? { opacity:[0, 0.7, 0.7], y:[20,0,-5,0] } : {}}
//             transition={{ delay, duration:4, repeat:Infinity, repeatType:"reverse", ease:"easeInOut" }}>
//             <Icon size={size} className="text-white/80" />
//           </motion.div>
//         ))}

//         {/* Hero content */}
//         <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-28 text-center w-full">
//           <motion.div initial={{ opacity:0, scale:0.85 }} animate={heroInView ? { opacity:1, scale:1 } : {}}
//             transition={{ duration:0.6 }}
//             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/30 text-white/90 text-xs font-bold uppercase tracking-widest mb-7 backdrop-blur-sm">
//             <FaHeartbeat className="animate-pulse text-pink-300" />
//             State-of-the-Art Medical Technology
//           </motion.div>

//           <motion.h1
//             initial={{ opacity:0, y:30 }} animate={heroInView ? { opacity:1, y:0 } : {}}
//             transition={{ duration:0.8, delay:0.15 }}
//             className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight font-serif mb-6">
//             Advanced Medical<br />
//             <span className="relative inline-block">
//               Equipment
//               <motion.span
//                 initial={{ scaleX:0 }} animate={heroInView ? { scaleX:1 } : {}}
//                 transition={{ delay:1, duration:0.7 }}
//                 className="absolute -bottom-2 left-0 w-full h-1 rounded-full bg-pink-300 origin-left" />
//             </span>{" "}
//             <span className="text-pink-200">For Modern</span><br />Healthcare
//           </motion.h1>

//           <motion.p initial={{ opacity:0, y:20 }} animate={heroInView ? { opacity:1, y:0 } : {}}
//             transition={{ duration:0.8, delay:0.3 }}
//             className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
//             State-of-the-art technology ensuring accurate diagnosis, safe treatment, and exceptional patient care — backed by international certifications.
//           </motion.p>

//           <motion.div initial={{ opacity:0, y:20 }} animate={heroInView ? { opacity:1, y:0 } : {}}
//             transition={{ duration:0.8, delay:0.45 }}
//             className="flex flex-wrap justify-center gap-4">
//             <motion.a whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
//               href="#equipment-grid"
//               className="px-8 py-3.5 rounded-xl font-bold text-sm bg-white text-sky-600 shadow-xl hover:bg-white/95 transition-all flex items-center gap-2">
//               <FiSearch size={14} /> Explore Equipment
//             </motion.a>
//             <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
//               onClick={() => onBookAppointment?.()}
//               className="px-8 py-3.5 rounded-xl font-bold text-sm text-white border-2 border-white/40 hover:bg-white/15 transition-all flex items-center gap-2">
//               <FiCalendar size={14} /> Book Consultation
//             </motion.button>
//             <motion.a whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
//               href={`https://wa.me/${whatsappNum}`} target="_blank" rel="noopener noreferrer"
//               className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-[#25D366]/80 hover:bg-[#25D366] transition-all flex items-center gap-2 border border-[#25D366]">
//               <FaWhatsapp size={14} /> WhatsApp Us
//             </motion.a>
//           </motion.div>

//           {/* Stats strip */}
//           <motion.div initial={{ opacity:0, y:20 }} animate={heroInView ? { opacity:1, y:0 } : {}}
//             transition={{ delay:0.65 }}
//             className="flex flex-wrap justify-center gap-8 sm:gap-14 mt-14">
//             {[
//               { num: "50+", label: "Premium Machines" },
//               { num: "97%", label: "Diagnostic Accuracy" },
//               { num: "6",   label: "Equipment Categories" },
//               { num: "24/7", label: "Operational" },
//             ].map((s, i) => (
//               <motion.div key={s.label} initial={{ opacity:0 }} animate={heroInView ? { opacity:1 } : {}}
//                 transition={{ delay:0.7 + i * 0.1 }} className="text-center">
//                 <p className="text-3xl font-extrabold text-white">{s.num}</p>
//                 <p className="text-white/60 text-xs font-bold uppercase tracking-wider mt-0.5">{s.label}</p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>

//         {/* Wave bottom */}
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" fill="#f8fafc" />
//           </svg>
//         </div>
//       </section>

//       {/* ── CATEGORIES ────────────────────────────────────────────────────── */}
//       <section className="py-14 px-4 sm:px-6 max-w-7xl mx-auto">
//         <div className="text-center mb-10">
//           <motion.div initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
//             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-600 text-xs font-bold uppercase tracking-widest mb-4">
//             <TbDeviceAnalytics size={12} /> Browse By Category
//           </motion.div>
//           <motion.h2 initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}
//             className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
//             Equipment{" "}
//             <span style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//               Categories
//             </span>
//           </motion.h2>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
//           {CATEGORIES.map((cat, i) => {
//             const active = activeCategory === cat.id;
//             const CatIcon = cat.icon;
//             return (
//               <motion.button key={cat.id}
//                 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
//                 viewport={{ once:true }} transition={{ delay:i * 0.06 }}
//                 whileHover={{ scale:1.05, y:-3 }} whileTap={{ scale:0.96 }}
//                 onClick={() => setActiveCategory(cat.id)}
//                 className={`flex flex-col items-center gap-2.5 p-4 rounded-2xl border-2 transition-all ${
//                   active ? "text-white shadow-lg border-transparent" : "bg-white text-slate-600 border-slate-100 hover:border-slate-200 hover:shadow-md"
//                 }`}
//                 style={active ? { background:`linear-gradient(135deg,${cat.color},#db2777)`, boxShadow:`0 8px 24px -4px ${cat.color}55` } : {}}>
//                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${active ? "bg-white/20" : "bg-slate-50"}`}>
//                   <CatIcon size={20} style={{ color: active ? "white" : cat.color }} />
//                 </div>
//                 <span className="text-xs font-extrabold text-center leading-tight">{cat.label}</span>
//               </motion.button>
//             );
//           })}
//         </div>
//       </section>

//       {/* ── EQUIPMENT GRID ────────────────────────────────────────────────── */}
//       <section id="equipment-grid" className="pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
//         {/* Search + count bar */}
//         <div className="flex flex-wrap items-center gap-3 mb-8">
//           <div className="relative flex-1 min-w-[200px] max-w-sm">
//             <FiSearch size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
//             <input value={search} onChange={e => setSearch(e.target.value)}
//               placeholder="Search equipment, brands..."
//               className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-white border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all shadow-sm" />
//             {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><FiX size={13} /></button>}
//           </div>
//           <motion.span key={filtered.length} initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
//             className="text-sm font-bold"
//             style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//             {filtered.length} item{filtered.length !== 1 ? "s" : ""}
//           </motion.span>
//         </div>

//         <AnimatePresence mode="popLayout">
//           {filtered.length > 0 ? (
//             <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//               {filtered.map((item, i) => (
//                 <EquipmentCard key={item.id} item={item} index={i} onOpen={setSelected} />
//               ))}
//             </motion.div>
//           ) : (
//             <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
//               className="text-center py-24 bg-white rounded-3xl border border-slate-100">
//               <FiSearch size={32} className="text-slate-200 mx-auto mb-4" />
//               <p className="font-bold text-slate-500">No equipment found</p>
//               <button onClick={() => { setSearch(""); setActiveCategory("all"); }}
//                 className="mt-4 px-6 py-2 rounded-xl text-sm font-bold text-white"
//                 style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)" }}>
//                 Reset Filters
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </section>

//       {/* ── WHY OUR EQUIPMENT ─────────────────────────────────────────────── */}
//       <section className="py-20 px-4 sm:px-6"
//         style={{ background:"linear-gradient(135deg,#f0f9ff 0%,#ffffff 50%,#fdf2f8 100%)" }}>
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-12">
//             <motion.div initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
//               className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-pink-600 text-xs font-bold uppercase tracking-widest mb-4">
//               <FiAward size={12} /> Our Standards
//             </motion.div>
//             <motion.h2 initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}
//               className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
//               Why Our Equipment{" "}
//               <span style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//                 Stands Apart
//               </span>
//             </motion.h2>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//             {[
//               { icon: TbAtom,           title: "Latest Technology",         desc: "We invest in the newest generation of medical equipment every 3 years, ensuring our tools are never outdated.", color: "#0ea5e9" },
//               { icon: HiOutlineBadgeCheck, title: "International Standards", desc: "Every machine carries FDA, CE, or ISO certification. We accept nothing less than globally approved equipment.", color: "#6366f1" },
//               { icon: FiZap,            title: "Faster Diagnosis",          desc: "AI-integrated systems generate reports up to 10x faster than traditional equipment, minimizing patient wait times.", color: "#f59e0b" },
//               { icon: FiShield,         title: "Patient Safety First",      desc: "Low-radiation X-rays, non-invasive scanners, and sterile surgical tools — every decision prioritizes patient wellbeing.", color: "#ec4899" },
//               { icon: FaCertificate,    title: "Globally Certified",        desc: "Our equipment meets regulatory requirements across Pakistan, UAE, UK, and US standards simultaneously.", color: "#14b8a6" },
//               { icon: FaRobot,          title: "AI-Assisted Systems",       desc: "Machine learning algorithms augment every diagnostic step — detecting what the human eye might miss.", color: "#8b5cf6" },
//             ].map((item, i) => (
//               <motion.div key={item.title}
//                 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
//                 viewport={{ once:true }} transition={{ delay:i * 0.08 }}
//                 whileHover={{ y:-4 }}
//                 className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all">
//                 <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
//                   style={{ background:`${item.color}18` }}>
//                   <item.icon size={22} style={{ color:item.color }} />
//                 </div>
//                 <h3 className="text-base font-extrabold text-slate-900 mb-2 font-serif">{item.title}</h3>
//                 <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── STATS COUNTERS ────────────────────────────────────────────────── */}
//       <section className="py-16 px-4 sm:px-6"
//         style={{ background:"linear-gradient(135deg,#0ea5e9 0%,#6366f1 50%,#db2777 100%)" }}>
//         <div className="max-w-5xl mx-auto">
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
//             {[
//               { target:"50", suffix:"+", label:"Premium Machines" },
//               { target:"97", suffix:"%", label:"Diagnostic Accuracy" },
//               { target:"10", suffix:"x", label:"Faster Reports" },
//               { target:"8",  suffix:"",  label:"Certifications Held" },
//             ].map((s, i) => (
//               <motion.div key={s.label}
//                 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
//                 viewport={{ once:true }} transition={{ delay:i * 0.1 }}>
//                 <p className="text-4xl sm:text-5xl font-extrabold text-white">
//                   <Counter target={s.target} suffix={s.suffix} />
//                 </p>
//                 <p className="text-white/70 text-xs font-bold uppercase tracking-wider mt-2">{s.label}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── COMPARISON TABLE ──────────────────────────────────────────────── */}
//       <section className="py-20 px-4 sm:px-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center mb-12">
//             <motion.div initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
//               className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">
//               <FiFilter size={12} /> Side-by-Side Comparison
//             </motion.div>
//             <motion.h2 initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}
//               className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
//               Traditional vs{" "}
//               <span style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//                 Premium Clinic
//               </span>
//             </motion.h2>
//           </div>

//           <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
//             className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden">
//             {/* Header */}
//             <div className="grid grid-cols-3 text-center">
//               <div className="py-4 px-4 bg-slate-50 border-r border-slate-100">
//                 <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Feature</p>
//               </div>
//               <div className="py-4 px-4 bg-slate-50 border-r border-slate-100">
//                 <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Traditional Clinics</p>
//               </div>
//               <div className="py-4 px-4"
//                 style={{ background:"linear-gradient(135deg,#f0f9ff,#fdf2f8)" }}>
//                 <p className="text-xs font-extrabold uppercase tracking-widest"
//                   style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//                   Premium Clinic
//                 </p>
//               </div>
//             </div>
//             {/* Rows */}
//             {COMPARISON_ROWS.map((row, i) => (
//               <motion.div key={row.feature}
//                 initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
//                 viewport={{ once:true }} transition={{ delay:i * 0.07 }}
//                 className={`grid grid-cols-3 border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
//                 <div className="py-4 px-5 flex items-center gap-2.5 border-r border-slate-100">
//                   <row.icon size={15} className="text-slate-400 flex-shrink-0" />
//                   <span className="text-sm font-bold text-slate-700">{row.feature}</span>
//                 </div>
//                 <div className="py-4 px-5 flex items-center justify-center border-r border-slate-100">
//                   <span className="text-sm font-semibold text-slate-400">{row.traditional}</span>
//                 </div>
//                 <div className="py-4 px-5 flex items-center justify-center">
//                   <span className="flex items-center gap-1.5 text-sm font-extrabold"
//                     style={{ color:"#0ea5e9" }}>
//                     <FiCheck size={14} className="text-emerald-500" /> {row.ours}
//                   </span>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* ── PATIENT JOURNEY TIMELINE ──────────────────────────────────────── */}
//       <section className="py-20 px-4 sm:px-6"
//         style={{ background:"linear-gradient(135deg,#f0f9ff 0%,#fdf2f8 100%)" }}>
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-14">
//             <motion.div initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
//               className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-600 text-xs font-bold uppercase tracking-widest mb-4">
//               <FiActivity size={12} /> Patient Journey
//             </motion.div>
//             <motion.h2 initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}
//               className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
//               How Equipment Powers{" "}
//               <span style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//                 Your Care
//               </span>
//             </motion.h2>
//           </div>

//           {/* Desktop horizontal timeline */}
//           <div className="relative hidden sm:flex items-start justify-between">
//             <div className="absolute top-7 left-0 right-0 h-0.5"
//               style={{ background:"linear-gradient(90deg,#0ea5e9,#6366f1,#db2777)" }} />
//             {JOURNEY_STEPS.map((step, i) => (
//               <motion.div key={step.step}
//                 initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
//                 viewport={{ once:true }} transition={{ delay:i * 0.12 }}
//                 className="relative flex flex-col items-center gap-3 flex-1">
//                 <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg z-10 bg-white border-2"
//                   style={{ borderColor:step.color }}>
//                   <step.icon size={22} style={{ color:step.color }} />
//                 </div>
//                 <div className="text-center">
//                   <span className="text-[10px] font-extrabold uppercase tracking-wider"
//                     style={{ color:step.color }}>Step {step.step}</span>
//                   <p className="text-xs font-bold text-slate-700 mt-0.5 leading-tight max-w-[80px] mx-auto">{step.title}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Mobile vertical */}
//           <div className="sm:hidden space-y-4">
//             {JOURNEY_STEPS.map((step, i) => (
//               <motion.div key={step.step}
//                 initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
//                 viewport={{ once:true }} transition={{ delay:i * 0.1 }}
//                 className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
//                 <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
//                   style={{ background:`${step.color}15`, color:step.color }}>
//                   <step.icon size={20} />
//                 </div>
//                 <div>
//                   <span className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color:step.color }}>Step {step.step}</span>
//                   <p className="text-sm font-bold text-slate-800">{step.title}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── AI SECTION ────────────────────────────────────────────────────── */}
//       <section className="py-20 px-4 sm:px-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="rounded-3xl overflow-hidden relative"
//             style={{ background:"linear-gradient(135deg,#1e1b4b 0%,#0f172a 50%,#1e1b4b 100%)" }}>
//             {/* Glow effects */}
//             <div className="absolute inset-0 pointer-events-none overflow-hidden">
//               <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-[80px] opacity-30"
//                 style={{ background:"#6366f1" }} />
//               <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-[80px] opacity-30"
//                 style={{ background:"#db2777" }} />
//               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[120px] opacity-15"
//                 style={{ background:"#0ea5e9" }} />
//             </div>
//             <div className="relative z-10 p-8 sm:p-12">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
//                 <div>
//                   <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-5">
//                     <FaRobot className="animate-pulse" /> AI-Powered Technology
//                   </div>
//                   <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif leading-tight mb-5">
//                     Smart Diagnostic<br />
//                     <span style={{ background:"linear-gradient(135deg,#818cf8,#f472b6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//                       AI Systems
//                     </span>
//                   </h2>
//                   <p className="text-white/70 leading-relaxed mb-7 text-sm">
//                     Our proprietary SmartDx AI platform integrates with every diagnostic device in the clinic, creating a unified intelligent layer that detects anomalies, flags risks, and recommends optimal treatment pathways — all in real time.
//                   </p>
//                   <div className="grid grid-cols-2 gap-3">
//                     {[
//                       { label:"AI Report Accuracy", val:"97.3%" },
//                       { label:"Risk Detection Speed", val:"< 2 min" },
//                       { label:"Conditions Monitored", val:"200+" },
//                       { label:"EMR Integration", val:"Seamless" },
//                     ].map(s => (
//                       <div key={s.label} className="bg-white/8 rounded-xl p-3 border border-white/10">
//                         <p className="text-lg font-extrabold"
//                           style={{ background:"linear-gradient(135deg,#818cf8,#f472b6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//                           {s.val}
//                         </p>
//                         <p className="text-white/50 text-xs font-semibold mt-0.5">{s.label}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-3">
//                   {[
//                     { icon:TbDeviceAnalytics, label:"AI-Assisted Reports",    color:"#818cf8" },
//                     { icon:GiBrain,            label:"Smart Analysis",         color:"#f472b6" },
//                     { icon:FiActivity,         label:"Risk Detection",         color:"#34d399" },
//                     { icon:TbHeartRateMonitor, label:"Auto Recommendations",   color:"#fb923c" },
//                     { icon:GiDna2,             label:"Genomic Integration",    color:"#a78bfa" },
//                     { icon:MdOutlineBiotech,   label:"Biomarker Tracking",     color:"#22d3ee" },
//                   ].map((f, i) => (
//                     <motion.div key={f.label}
//                       initial={{ opacity:0, scale:0.8 }} whileInView={{ opacity:1, scale:1 }}
//                       viewport={{ once:true }} transition={{ delay:i * 0.08 }}
//                       className="bg-white/8 rounded-2xl p-4 border border-white/10 flex flex-col items-center text-center gap-2 hover:bg-white/12 transition-colors">
//                       <div className="w-10 h-10 rounded-xl flex items-center justify-center"
//                         style={{ background:`${f.color}25` }}>
//                         <f.icon size={20} style={{ color:f.color }} />
//                       </div>
//                       <span className="text-white/80 text-xs font-bold leading-tight">{f.label}</span>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── CERTIFICATIONS ────────────────────────────────────────────────── */}
//       <section className="py-16 px-4 sm:px-6 bg-white">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-10">
//             <motion.h2 initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
//               className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif mb-2">
//               Internationally{" "}
//               <span style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//                 Certified
//               </span>
//             </motion.h2>
//             <p className="text-sm text-slate-400">Every machine is backed by recognized global certifications.</p>
//           </div>
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//             {CERTIFICATIONS.map((cert, i) => (
//               <motion.div key={cert.name}
//                 initial={{ opacity:0, scale:0.85 }} whileInView={{ opacity:1, scale:1 }}
//                 viewport={{ once:true }} transition={{ delay:i * 0.1 }}
//                 whileHover={{ scale:1.04 }}
//                 className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl border-2 bg-white shadow-sm hover:shadow-md transition-all"
//                 style={{ borderColor:`${cert.color}30` }}>
//                 <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
//                   style={{ background:`${cert.color}15` }}>
//                   <FaCertificate size={28} style={{ color:cert.color }} />
//                 </div>
//                 <div>
//                   <p className="font-extrabold text-slate-900 text-sm">{cert.name}</p>
//                   <p className="text-xs text-slate-400 mt-0.5 leading-tight">{cert.body}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── FAQ SECTION ───────────────────────────────────────────────────── */}
//       <section className="py-20 px-4 sm:px-6"
//         style={{ background:"linear-gradient(135deg,#f0f9ff,#fdf2f8)" }}>
//         <div className="max-w-3xl mx-auto">
//           <div className="text-center mb-10">
//             <motion.div initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
//               className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-sky-600 text-xs font-bold uppercase tracking-widest mb-4">
//               <FiInfo size={12} /> Common Questions
//             </motion.div>
//             <motion.h2 initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}
//               className="text-3xl font-extrabold text-slate-900 font-serif">
//               Equipment{" "}
//               <span style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//                 FAQs
//               </span>
//             </motion.h2>
//           </div>
//           <div className="space-y-3">
//             {FAQS.map((faq, i) => <FaqItem key={i} {...faq} index={i} />)}
//           </div>
//         </div>
//       </section>

//       {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
//       <section className="relative overflow-hidden py-24 px-4 sm:px-6"
//         style={{ background:"linear-gradient(135deg,#0ea5e9 0%,#6366f1 50%,#db2777 100%)" }}>
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />
//           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />
//           <div className="absolute inset-0 opacity-10"
//             style={{ backgroundImage:`radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`, backgroundSize:"30px 30px" }} />
//         </div>
//         <div className="relative z-10 max-w-4xl mx-auto text-center">
//           <motion.div initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}
//             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/30 text-white/90 text-xs font-bold uppercase tracking-widest mb-7">
//             <FaHeartbeat className="animate-pulse" /> Ready to Experience Better Healthcare?
//           </motion.div>
//           <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}
//             className="text-3xl sm:text-5xl font-extrabold text-white font-serif mb-5 leading-tight">
//             Experience Healthcare Powered<br />By Advanced Technology
//           </motion.h2>
//           <motion.p initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.2 }}
//             className="text-white/75 text-lg mb-10 max-w-xl mx-auto">
//             Book your appointment today and experience the difference premium medical technology makes.
//           </motion.p>
//           <motion.div initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.3 }}
//             className="flex flex-wrap justify-center gap-4">
//             <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
//               onClick={() => onBookAppointment?.()}
//               className="px-8 py-3.5 rounded-xl font-bold text-sky-600 bg-white shadow-xl hover:bg-white/95 transition-all flex items-center gap-2 text-sm">
//               <FiCalendar size={14} /> Book Appointment
//             </motion.button>
//             <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
//               onClick={() => onNavigate?.("contact")}
//               className="px-8 py-3.5 rounded-xl font-bold text-white border-2 border-white/40 hover:bg-white/15 transition-all flex items-center gap-2 text-sm">
//               <FiPhone size={14} /> Schedule Consultation
//             </motion.button>
//             <motion.a whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
//               href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent("Hello Premium Clinic, I want to know more about your medical equipment.")}`}
//               target="_blank" rel="noopener noreferrer"
//               className="px-8 py-3.5 rounded-xl font-bold text-white bg-[#25D366]/80 hover:bg-[#25D366] transition-all flex items-center gap-2 text-sm border border-[#25D366]">
//               <FaWhatsapp size={14} /> WhatsApp Us
//             </motion.a>
//           </motion.div>
//         </div>
//       </section>

//       {/* Floating WhatsApp */}
//       <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
//         <div className="absolute w-16 h-16 bg-green-500 rounded-full animate-ping opacity-30 pointer-events-none" />
//         <motion.a href={`https://wa.me/${whatsappNum}`} target="_blank" rel="noopener noreferrer"
//           whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }}
//           initial={{ opacity:0, scale:0.6 }} animate={{ opacity:1, scale:1 }}
//           transition={{ type:"spring", stiffness:260, damping:20 }}
//           className="relative w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#20ba5a] transition-colors cursor-pointer group">
//           <FaWhatsapp size={34} />
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
  FiSearch, FiShoppingCart, FiHeart, FiX, FiChevronLeft,
  FiChevronRight, FiArrowLeft, FiStar, FiCheck, FiUpload,
  FiTag, FiTruck, FiShield, FiPhone, FiMail, FiCalendar,
  FiFilter, FiGrid, FiList, FiZoomIn, FiPackage, FiAward,
  FiClock, FiRefreshCw,
} from "react-icons/fi";
import {
  MdOutlineMedicalServices, MdOutlineLocalHospital,
  MdOutlineMonitor, MdOutlineBiotech, MdOutlineAir,
  MdOutlineChair, MdOutlineHealthAndSafety, MdOutlineSpa,
  MdOutlineScience, MdVerified,
} from "react-icons/md";
import { FaWhatsapp, FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { HiSparkles, HiOutlineBadgeCheck } from "react-icons/hi";
import { TbStethoscope, TbHeartRateMonitor, TbBone, TbVaccine } from "react-icons/tb";

// ─── THEME ────────────────────────────────────────────────────────────────────
const T = {
  sky:       "#0ea5e9",
  pink:      "#e91e8c",
  peach:     "#f97316",
  mint:      "#10b981",
  lavender:  "#8b5cf6",
  btn:       "linear-gradient(135deg, #0ea5e9, #e91e8c)",
  btnPeach:  "linear-gradient(135deg, #f97316, #e91e8c)",
  heroGrad:  "linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #fdf2f8 100%)",
};

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id:"all",        label:"All Equipment",     Icon:FiGrid,                    color:"#64748b" },
  { id:"diagnostic", label:"Diagnostic",        Icon:MdOutlineMonitor,          color:T.sky     },
  { id:"surgical",   label:"Surgical",          Icon:MdOutlineMedicalServices,  color:T.pink    },
  { id:"monitoring", label:"Patient Monitoring",Icon:TbHeartRateMonitor,        color:T.mint    },
  { id:"imaging",    label:"Imaging & Radiology",Icon:MdOutlineBiotech,         color:T.lavender},
  { id:"dental",     label:"Dental Equipment",  Icon:TbStethoscope,             color:T.peach   },
  { id:"ortho",      label:"Orthopedic",        Icon:TbBone,                    color:"#ef4444" },
  { id:"lab",        label:"Laboratory",        Icon:MdOutlineScience,          color:"#8b5cf6" },
  { id:"rehab",      label:"Rehabilitation",    Icon:MdOutlineSpa,              color:"#06b6d4" },
  { id:"icu",        label:"ICU & Emergency",   Icon:MdOutlineAir,              color:"#dc2626" },
];

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────
const PRODUCTS = [
  // DIAGNOSTIC
  {
    id:1, category:"diagnostic", name:"Digital Ultrasound Machine — Pro Series",
    brand:"GE Healthcare", model:"LOGIQ P9", sku:"DX-US-001",
    price:4200000, oldPrice:4800000,
    rating:4.9, reviews:38,
    image:"https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=700&q=80",
    badge:"Best Seller",
    badgeColor:T.sky,
    inStock:true,
    features:["4D Real-time Imaging","Wireless Transducer Support","AI-Assisted Diagnosis","15\" HD Touchscreen","DICOM Compatible"],
    shortDesc:"Hospital-grade 4D ultrasound with AI-assisted diagnosis for OB/GYN, cardiology, and general imaging.",
    specs:{ "Display":"15\" LED HD","Frequency":"2–15 MHz","Modes":"B, M, Color Doppler, PW, CW","Weight":"5.8 kg","Warranty":"2 Years" },
  },
  {
    id:2, category:"diagnostic", name:"12-Lead ECG Machine with Interpretation",
    brand:"Philips", model:"PageWriter TC70",sku:"DX-ECG-002",
    price:850000, oldPrice:1050000,
    rating:4.8, reviews:51,
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=80",
    badge:"20% OFF",
    badgeColor:T.pink,
    inStock:true,
    features:["Auto-Interpretation Algorithm","12-Lead Simultaneous Capture","Built-in Printer","Wi-Fi & LAN Connectivity","Touch Screen Display"],
    shortDesc:"Advanced 12-lead ECG machine with real-time automated interpretation and wireless data transmission.",
    specs:{ "Leads":"12 simultaneous","Memory":"1000 ECG records","Display":"10.4\" color LCD","Battery":"4 hrs backup","Warranty":"2 Years" },
  },
  {
    id:3, category:"diagnostic", name:"Portable SpO2 & NIBP Monitor",
    brand:"Masimo", model:"Radical-7 Plus", sku:"DX-SPO-003",
    price:280000, oldPrice:null,
    rating:4.7, reviews:29,
    image:"https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&w=700&q=80",
    badge:"New",
    badgeColor:T.mint,
    inStock:true,
    features:["Signal IQ Technology","Motion-Tolerant Readings","7 Parameters in 1","USB Data Export","Rechargeable Battery 8 hrs"],
    shortDesc:"Portable multi-parameter monitor measuring SpO2, pulse rate, NIBP, temperature, and respiration.",
    specs:{ "Parameters":"SpO2, PR, NIBP, Temp, RR","Display":"3.5\" color TFT","Alarm":"Visual + Audible","Battery":"8 hrs","Weight":"0.65 kg" },
  },
  // SURGICAL
  {
    id:4, category:"surgical", name:"LED Operating Theatre Light — Dual Head",
    brand:"Berchtold", model:"Chromophare F670", sku:"SG-OTL-004",
    price:1800000, oldPrice:2100000,
    rating:4.9, reviews:17,
    image:"https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=700&q=80",
    badge:"Premium",
    badgeColor:T.lavender,
    inStock:true,
    features:["160,000 Lux Intensity","Shadow-Free Illumination","Cool Beam Technology","Motorized Focus","Emergency Backup LED"],
    shortDesc:"Medical-grade dual-head LED OT light providing 160,000 lux shadow-free illumination for precision surgery.",
    specs:{ "Illuminance":"160,000 lux","Color Temp":"4,000–4,800 K","Shadow Index":"< 10%","Lifespan":"50,000 hrs","Warranty":"3 Years" },
  },
  {
    id:5, category:"surgical", name:"Electric Surgical Table — Multi-Position",
    brand:"Maquet", model:"Alphamaxx 1133", sku:"SG-TBL-005",
    price:3500000, oldPrice:null,
    rating:4.8, reviews:12,
    image:"https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=700&q=80",
    badge:"Top Rated",
    badgeColor:T.sky,
    inStock:true,
    features:["8 Motorized Functions","Carbon Fiber Top","500 kg Load Capacity","Auto Trendelenburg","Wireless Remote Control"],
    shortDesc:"Fully motorized multi-position surgical table with carbon fiber top and wireless control for all surgical specialties.",
    specs:{ "Load Capacity":"500 kg","Height Range":"700–1050 mm","Tabletop":"Carbon fiber","Movements":"8 motorized","Warranty":"3 Years" },
  },
  // MONITORING
  {
    id:6, category:"monitoring", name:"Bedside Patient Monitor — 15\" Touch",
    brand:"Mindray", model:"BeneVision N15", sku:"MN-BPM-006",
    price:650000, oldPrice:780000,
    rating:4.9, reviews:64,
    image:"https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=700&q=80",
    badge:"Best Seller",
    badgeColor:T.sky,
    inStock:true,
    features:["15\" HD Touchscreen","10 Standard Parameters","Central Monitoring Ready","96hr Trend Analysis","Neonatal / Adult Modes"],
    shortDesc:"Advanced 15\" touchscreen bedside monitor with 10 parameters, remote monitoring, and long-term trend data.",
    specs:{ "Screen":"15\" HD capacitive","Parameters":"ECG, SpO2, NIBP, EtCO2, Temp, IBP","Memory":"96 hr","Network":"HL7/DICOM","Warranty":"2 Years" },
  },
  {
    id:7, category:"monitoring", name:"Infusion Pump — Smart Dual Channel",
    brand:"BD Alaris", model:"8015 Dual", sku:"MN-INF-007",
    price:480000, oldPrice:550000,
    rating:4.7, reviews:33,
    image:"https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=700&q=80",
    badge:"15% OFF",
    badgeColor:T.pink,
    inStock:true,
    features:["Dual Independent Channels","Drug Library (1000+ drugs)","KVO Mode","Air Bubble Detection","Occlusion Alarm"],
    shortDesc:"Dual-channel smart infusion pump with built-in drug library and safety alert systems for ICU and ward use.",
    specs:{ "Channels":"2 independent","Flow Rate":"0.1–1200 ml/hr","Drug Library":"1000+ entries","Display":"4.3\" color","Battery":"6 hrs backup" },
  },
  // IMAGING
  {
    id:8, category:"imaging", name:"Digital X-Ray System — DR Panel",
    brand:"Siemens Healthineers", model:"Ysio Max", sku:"IM-DXR-008",
    price:8500000, oldPrice:9200000,
    rating:5.0, reviews:9,
    image:"https://images.unsplash.com/photo-1578991624414-276ef23a534f?auto=format&fit=crop&w=700&q=80",
    badge:"Hospital Grade",
    badgeColor:T.lavender,
    inStock:true,
    features:["43×43 cm DR Panel","AI Bone Suppression","Dose Cockpit Software","Automatic Exposure Control","PACS/RIS Ready"],
    shortDesc:"Ceiling-mounted digital radiography system with AI-powered image enhancement and automated dose optimization.",
    specs:{ "Detector Size":"43×43 cm","Resolution":"3.1 lp/mm","kVp Range":"40–150 kV","Software":"PACS/RIS/DICOM","Warranty":"3 Years" },
  },
  {
    id:9, category:"imaging", name:"Portable Color Doppler Ultrasound",
    brand:"Samsung Medison", model:"HM70A", sku:"IM-PUS-009",
    price:1950000, oldPrice:2300000,
    rating:4.8, reviews:22,
    image:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80",
    badge:"Portable",
    badgeColor:T.mint,
    inStock:false,
    features:["Full Doppler Suite","Compact 4.7 kg","WiFi DICOM Send","4hr Battery Life","10.1\" LED Display"],
    shortDesc:"Compact color Doppler portable ultrasound for emergency, bedside, and point-of-care imaging workflows.",
    specs:{ "Weight":"4.7 kg","Display":"10.1\" LED","Battery":"4 hrs","Modes":"B/M/Color/PW/CW","Warranty":"2 Years" },
  },
  // DENTAL
  {
    id:10, category:"dental", name:"Dental Chair Unit — Full Electric",
    brand:"KaVo", model:"ESTETICA E70", sku:"DN-CHR-010",
    price:2800000, oldPrice:3200000,
    rating:4.9, reviews:19,
    image:"https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=700&q=80",
    badge:"Best Seller",
    badgeColor:T.sky,
    inStock:true,
    features:["5-Program Memory","LED Operating Light","Integrated Intraoral Camera","Contoured Ergonomic Seat","Spittoon with Auto-Flush"],
    shortDesc:"Premium fully electric dental chair with 5-program memory, LED light, and integrated patient monitoring.",
    specs:{ "Motor":"5-function electric","Light":"LED 30,000 lux","Camera":"Intraoral 1080p","Load":"200 kg","Warranty":"3 Years" },
  },
  {
    id:11, category:"dental", name:"Dental OPG Panoramic X-Ray",
    brand:"Planmeca", model:"Romexis", sku:"DN-OPG-011",
    price:3600000, oldPrice:null,
    rating:4.8, reviews:14,
    image:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=80",
    badge:"Digital",
    badgeColor:T.lavender,
    inStock:true,
    features:["Full Panoramic + Cephalometric","Ultra-Low Dose Sensor","AI Diagnosis Assist","14×30 cm FOV","DICOM Compliant"],
    shortDesc:"Digital OPG panoramic system with ultra-low dose and AI-assisted diagnosis for dental and maxillofacial imaging.",
    specs:{ "FOV":"14×30 cm (OPG)","Sensor":"CMOS DR","AI":"Caries + Bone Loss detection","Dose":"Ultra-low","Warranty":"2 Years" },
  },
  // LAB
  {
    id:12, category:"lab", name:"Automated Hematology Analyzer — 5-Part",
    brand:"Sysmex", model:"XN-350", sku:"LB-HEM-012",
    price:2200000, oldPrice:2500000,
    rating:4.9, reviews:41,
    image:"https://images.unsplash.com/photo-1597764690523-15bea4c581c9?auto=format&fit=crop&w=700&q=80",
    badge:"ISO Certified",
    badgeColor:T.mint,
    inStock:true,
    features:["5-Part WBC Differential","100 Samples/Hour","Auto-Reflex Testing","Compact Benchtop Design","Bidirectional LIS"],
    shortDesc:"High-throughput 5-part differential hematology analyzer with 100 samples/hr and bidirectional LIS connectivity.",
    specs:{ "Throughput":"100 samples/hr","Parameters":"CBC + 5-diff","Volume":"18 µL whole blood","LIS":"Bidirectional","Warranty":"2 Years" },
  },
  // ICU
  {
    id:13, category:"icu", name:"Ventilator — ICU Grade with NIV Mode",
    brand:"Dräger", model:"Evita V800", sku:"IC-VNT-013",
    price:7800000, oldPrice:8500000,
    rating:5.0, reviews:7,
    image:"https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=700&q=80",
    badge:"ICU Grade",
    badgeColor:"#dc2626",
    inStock:true,
    features:["Invasive + NIV Modes","Automatic Tube Compensation","Lung Recruitment Protocol","12.1\" Touchscreen","O2 Blender Built-in"],
    shortDesc:"Advanced ICU ventilator with full invasive and non-invasive ventilation, lung recruitment, and automated protocols.",
    specs:{ "Screen":"12.1\" touchscreen","Modes":"VC/PC/PS/NIV/APRV + more","Tidal Vol":"2–2000 ml","FiO2":"21–100%","Warranty":"3 Years" },
  },
  // ORTHO
  {
    id:14, category:"ortho", name:"Orthopedic Power Drill & Saw System",
    brand:"Stryker", model:"System 7", sku:"OR-DRL-014",
    price:1200000, oldPrice:1400000,
    rating:4.8, reviews:11,
    image:"https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=700&q=80",
    badge:"Surgical Grade",
    badgeColor:T.pink,
    inStock:true,
    features:["300–800 RPM Drill","Sagittal + Oscillating Saw","Autoclavable Attachments","Brushless Motor","Integrated Battery Indicator"],
    shortDesc:"Professional orthopedic power system with drill, sagittal and oscillating saw for joint replacement and trauma surgery.",
    specs:{ "Drill Speed":"300–800 RPM","Saw Type":"Sagittal/Oscillating","Battery":"Li-ion rechargeable","Sterilization":"Autoclavable","Warranty":"2 Years" },
  },
  // REHAB
  {
    id:15, category:"rehab", name:"Physiotherapy Ultrasound Therapy Unit",
    brand:"Enraf-Nonius", model:"Sonopuls 492", sku:"RH-UST-015",
    price:320000, oldPrice:380000,
    rating:4.7, reviews:26,
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=80",
    badge:"Rehab Specialist",
    badgeColor:"#06b6d4",
    inStock:true,
    features:["1 & 3 MHz Dual Frequency","Continuous + Pulsed Mode","Auto-Tissue Recognition","Digital Dose Display","3 Applicator Heads Included"],
    shortDesc:"Professional ultrasound therapy unit for physiotherapy with dual frequency and automatic tissue dosage recognition.",
    specs:{ "Frequency":"1 & 3 MHz","Mode":"Continuous + Pulsed","Applicators":"3 heads (1, 2, 5 cm²)","Timer":"0–30 min","Warranty":"2 Years" },
  },
];

// ─── FLOATING ICONS (hero) ────────────────────────────────────────────────────
const HERO_ICONS = [
  { Icon:TbStethoscope,           top:"18%", left:"4%",    size:28, delay:0,   color:T.sky   },
  { Icon:TbHeartRateMonitor,      top:"22%", right:"6%",   size:30, delay:0.4, color:T.pink  },
  { Icon:MdOutlineMedicalServices,bottom:"30%", left:"6%", size:26, delay:0.8, color:T.peach },
  { Icon:MdOutlineBiotech,        bottom:"28%", right:"5%",size:24, delay:1.2, color:T.lavender },
  { Icon:TbBone,                  top:"58%", left:"2%",    size:22, delay:0.6, color:T.mint  },
  { Icon:MdOutlineAir,            top:"12%", right:"18%",  size:20, delay:1.0, color:T.sky   },
  { Icon:TbVaccine,               top:"45%", right:"3%",   size:22, delay:0.3, color:T.pink  },
  { Icon:MdOutlineScience,        bottom:"15%", left:"20%",size:20, delay:1.4, color:T.peach },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = (n) => "PKR " + n.toLocaleString("en-PK");

function Stars({ n, size = 12 }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map(s =>
        n >= s ? <FaStar key={s} size={size} color="#FBBF24" /> :
        n >= s-0.5 ? <FaStarHalfAlt key={s} size={size} color="#FBBF24" /> :
        <FaRegStar key={s} size={size} color="#FBBF24" />
      )}
    </span>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ p, i, onSelect, onWishlist, wishlisted }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:36 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.5, delay:(i % 4) * 0.08 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-sky-100 flex flex-col cursor-pointer"
      onClick={() => onSelect(p)}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img src={p.image} alt={p.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black text-white"
          style={{ background: p.badgeColor }}>
          {p.badge}
        </div>

        {/* Out of stock */}
        {!p.inStock && (
          <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
            <span className="bg-white text-slate-700 text-xs font-black px-4 py-2 rounded-full shadow">Out of Stock</span>
          </div>
        )}

        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow hover:bg-white transition-all"
          onClick={e => { e.stopPropagation(); onWishlist(p.id); }}
        >
          <FiHeart size={14} className={wishlisted ? "text-red-500 fill-red-500" : "text-slate-400"} />
        </button>

        {/* Zoom hint */}
        <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white/70 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <FiZoomIn size={12} className="text-slate-600" />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color:T.sky }}>{p.brand}</p>
        <h3 className="text-slate-800 font-black text-sm leading-snug mb-2 line-clamp-2">{p.name}</h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2">{p.shortDesc}</p>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-3">
          {p.features.slice(0,3).map((f,fi) => (
            <span key={fi} className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background:"#f0f9ff", color:T.sky }}>
              <FiCheck size={9} /> {f}
            </span>
          ))}
          {p.features.length > 3 && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-50 text-slate-400">
              +{p.features.length - 3} more
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <Stars n={p.rating} />
          <span className="text-xs font-bold text-slate-700">{p.rating}</span>
          <span className="text-xs text-slate-400">({p.reviews} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-end gap-2 mt-auto">
          <span className="text-lg font-black" style={{ background:T.btn, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            {fmt(p.price)}
          </span>
          {p.oldPrice && (
            <span className="text-sm text-slate-400 line-through mb-0.5">{fmt(p.oldPrice)}</span>
          )}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
          onClick={e => { e.stopPropagation(); onSelect(p); }}
          className="mt-3 w-full py-2.5 rounded-xl text-white text-sm font-bold shadow-md hover:shadow-lg transition-shadow"
          style={{ background: p.inStock ? T.btn : "#94a3b8" }}
          disabled={!p.inStock}
        >
          {p.inStock ? "View Details & Inquire" : "Notify When Available"}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── PRODUCT MODAL ────────────────────────────────────────────────────────────
function ProductModal({ p, onClose }) {
  const wa       = "+923001234567";
  const waMsg    = encodeURIComponent(`Hi, I'm interested in: ${p.name} (${p.model}). Please share more details and pricing.`);
  const [imgSrc, setImgSrc] = useState(p.image);
  const [uploaded, setUploaded] = useState(null);

  // image upload preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploaded(url);
      setImgSrc(url);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-xl flex items-start justify-center p-4 pt-16 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale:0.9, y:40 }} animate={{ scale:1, y:0 }} exit={{ scale:0.9, y:40 }}
        transition={{ type:"spring", stiffness:280, damping:28 }}
        className="relative bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Top gradient bar */}
        <div className="h-1 w-full" style={{ background:T.btn }} />

        <button onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors">
          <FiX size={17} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left — image */}
          <div className="relative bg-slate-50 p-6 flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden h-72">
              <img src={imgSrc} alt={p.name} className="w-full h-full object-cover" />
              {p.badge && (
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black text-white"
                  style={{ background:p.badgeColor }}>{p.badge}</div>
              )}
            </div>

            {/* Upload your own image */}
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-sky-200 bg-sky-50/50 hover:bg-sky-50 cursor-pointer transition-colors group">
              <FiUpload size={15} className="text-sky-500 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-sky-600">
                {uploaded ? "Change Image (Your Upload)" : "Upload Your Own Image"}
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
            {uploaded && (
              <p className="text-xs text-green-600 font-semibold flex items-center gap-1">
                <FiCheck size={11} /> Image uploaded successfully
              </p>
            )}

            {/* Stock status */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${p.inStock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
              <div className={`w-2 h-2 rounded-full ${p.inStock ? "bg-green-500 animate-pulse" : "bg-red-400"}`} />
              {p.inStock ? "In Stock — Ready to Ship" : "Currently Out of Stock"}
            </div>
          </div>

          {/* Right — details */}
          <div className="p-6 overflow-y-auto max-h-[80vh]">
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color:T.sky }}>{p.brand} · {p.model}</p>
            <h2 className="text-xl font-black text-slate-900 leading-snug mb-2">{p.name}</h2>
            <div className="flex items-center gap-2 mb-4">
              <Stars n={p.rating} size={14} />
              <span className="font-bold text-slate-700 text-sm">{p.rating}</span>
              <span className="text-slate-400 text-sm">({p.reviews} reviews)</span>
              <MdVerified size={15} className="text-sky-500 ml-1" />
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-5">{p.shortDesc}</p>

            {/* Price */}
            <div className="flex items-end gap-3 mb-5 p-4 rounded-2xl" style={{ background:"linear-gradient(135deg,#f0f9ff,#fdf2f8)" }}>
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-0.5">Price (incl. installation)</p>
                <p className="text-2xl font-black" style={{ background:T.btn, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                  {fmt(p.price)}
                </p>
              </div>
              {p.oldPrice && (
                <div className="mb-1">
                  <p className="text-xs text-slate-400">Was</p>
                  <p className="text-base text-slate-400 line-through">{fmt(p.oldPrice)}</p>
                </div>
              )}
              {p.oldPrice && (
                <div className="ml-auto px-3 py-1.5 rounded-xl text-xs font-black text-white"
                  style={{ background:T.btnPeach }}>
                  Save {fmt(p.oldPrice - p.price)}
                </div>
              )}
            </div>

            {/* Features */}
            <div className="mb-5">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Key Features</p>
              <div className="grid grid-cols-1 gap-1.5">
                {p.features.map((f,i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background:"linear-gradient(135deg,#e0f2fe,#fce7f3)" }}>
                      <FiCheck size={10} style={{ color:T.sky }} />
                    </div>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div className="mb-6">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Technical Specifications</p>
              <div className="rounded-2xl border border-slate-100 overflow-hidden">
                {Object.entries(p.specs).map(([k,v], si) => (
                  <div key={k} className={`flex justify-between px-4 py-2.5 text-sm ${si % 2 === 0 ? "bg-slate-50" : "bg-white"}`}>
                    <span className="font-bold text-slate-600">{k}</span>
                    <span className="text-slate-800 font-semibold text-right ml-4">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { Icon:FiShield,     label:"2–3 Yr Warranty",    color:T.mint    },
                { Icon:FiTruck,      label:"Free Delivery & Setup",color:T.sky   },
                { Icon:FiAward,      label:"ISO Certified",       color:T.lavender},
                { Icon:FiRefreshCw,  label:"30-Day Return",       color:T.peach  },
              ].map(({ Icon, label, color }) => (
                <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-50 border border-slate-100"
                  style={{ color }}>
                  <Icon size={11} /> {label}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <motion.a
                href={`https://wa.me/${wa}?text=${waMsg}`} target="_blank"
                whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-sm shadow-lg"
                style={{ background:"#25D366" }}
              >
                <FaWhatsapp size={18} /> Inquire on WhatsApp
              </motion.a>
              <motion.button
                whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm"
                style={{ background:T.btn }}
              >
                <FiCalendar size={14} /> Request Demo / Site Visit
              </motion.button>
              <div className="flex gap-2">
                <a href={`tel:+923001234567`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-sm bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors">
                  <FiPhone size={13} /> Call Us
                </a>
                <a href="mailto:info@premiumclinic.com"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-sm bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors">
                  <FiMail size={13} /> Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function EquipmentsStore({ onNavigate, onBookAppointment }) {
  const [activeCat,   setActiveCat]   = useState("all");
  const [search,      setSearch]      = useState("");
  const [selected,    setSelected]    = useState(null);
  const [wishlist,    setWishlist]    = useState([]);
  const [viewMode,    setViewMode]    = useState("grid"); // grid | list
  const [cartCount,   setCartCount]   = useState(0);
  const heroRef  = useRef(null);
  const heroView = useInView(heroRef, { once:true });

  const toggleWishlist = (id) =>
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  const filtered = PRODUCTS.filter(p => {
    const matchCat  = activeCat === "all" || p.category === activeCat;
    const q         = search.toLowerCase();
    const matchSrch = !q || [p.name, p.brand, p.model, p.shortDesc].some(s => s.toLowerCase().includes(q));
    return matchCat && matchSrch;
  });

  const wa    = "+923001234567";
  const waMsg = encodeURIComponent("Hello, I'm interested in medical equipment. Please guide me.");

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* PRODUCT MODAL */}
      <AnimatePresence>
        {selected && <ProductModal p={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden pt-24 pb-0"
        style={{ background:T.heroGrad }}>

        {/* Grid texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{ backgroundImage:"linear-gradient(rgba(14,165,233,1) 1px,transparent 1px),linear-gradient(90deg,rgba(233,30,140,1) 1px,transparent 1px)", backgroundSize:"48px 48px" }} />

        {/* Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div animate={{ x:[0,25,0],y:[0,-15,0] }} transition={{ duration:9,repeat:Infinity,ease:"easeInOut" }}
            className="absolute -top-28 left-[6%] w-[500px] h-[500px] rounded-full opacity-20"
            style={{ background:"radial-gradient(circle,#bae6fd,transparent 70%)" }} />
          <motion.div animate={{ x:[0,-20,0],y:[0,18,0] }} transition={{ duration:12,repeat:Infinity,ease:"easeInOut" }}
            className="absolute -top-20 right-[10%] w-96 h-96 rounded-full opacity-15"
            style={{ background:"radial-gradient(circle,#fbcfe8,transparent 70%)" }} />
          <motion.div animate={{ x:[0,15,0],y:[0,20,0] }} transition={{ duration:14,repeat:Infinity,ease:"easeInOut" }}
            className="absolute bottom-0 left-[40%] w-72 h-40 rounded-full opacity-10"
            style={{ background:"radial-gradient(circle,#e9d5ff,transparent 70%)" }} />
        </div>

        {/* Floating icons */}
        {HERO_ICONS.map(({ Icon, size, delay, color, ...pos }, i) => (
          <motion.div key={i}
            className="absolute hidden lg:flex items-center justify-center w-14 h-14 rounded-2xl bg-white/80 border border-slate-100 shadow-md"
            style={{ ...pos }}
            initial={{ opacity:0, y:20 }}
            animate={heroView ? { opacity:[0,0.7,0.7], y:[20,0,-6,0] } : {}}
            transition={{ delay, duration:3.5, repeat:Infinity, repeatType:"reverse", ease:"easeInOut" }}
          >
            <Icon size={size} style={{ color, opacity:0.8 }} />
          </motion.div>
        ))}

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">

          {/* Back button */}
          <motion.button
            initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
            transition={{ duration:0.5 }}
            onClick={() => onNavigate?.("home")}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-sky-600 bg-white hover:bg-sky-50 border border-slate-100 hover:border-sky-100 shadow-sm transition-all"
          >
            <FiArrowLeft size={14} /> Back to Home
          </motion.button>

          {/* Badge */}
          <motion.div
            initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6 border shadow-sm"
            style={{ background:"rgba(14,165,233,0.06)", borderColor:"rgba(14,165,233,0.2)", color:T.sky }}
          >
            <HiSparkles size={12} /> Premium Medical Equipment Supply — Lahore, Pakistan
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.85, ease:[0.16,1,0.3,1], delay:0.1 }}
            className="text-4xl sm:text-6xl font-black text-slate-900 leading-tight tracking-tight mb-5"
          >
            Hospital-Grade{" "}
            <span style={{ background:T.btn, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Medical Equipment
            </span>
            <br className="hidden sm:block" />
            <span className="text-slate-900">For Every </span>
            <span style={{ background:T.btnPeach, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Specialty
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.22 }}
            className="text-slate-500 text-lg max-w-2xl mb-10 leading-relaxed"
          >
            Source world-class diagnostic, surgical, monitoring, and imaging equipment from top global brands — with full installation, training, and after-sales support.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.35 }}
            className="flex flex-wrap gap-8 sm:gap-14 mb-12"
          >
            {[
              { val:"200+", lbl:"Equipment Items",   col:"#FBBF24"   },
              { val:"15+",  lbl:"Global Brands",     col:T.sky       },
              { val:"Free", lbl:"Installation",      col:T.mint      },
              { val:"2–3Y", lbl:"Warranty Coverage", col:T.peach     },
            ].map((s, i) => (
              <motion.div key={s.lbl}
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.38 + i*0.07 }}
                className="flex flex-col"
              >
                <span className="text-2xl sm:text-3xl font-black"
                  style={{ background:`linear-gradient(135deg,${s.col},${T.pink})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                  {s.val}
                </span>
                <span className="text-xs font-semibold text-slate-400 mt-0.5">{s.lbl}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.5 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {[
              { Icon:FiTruck,    label:"Free Delivery & Installation",  color:T.sky     },
              { Icon:FiShield,   label:"2–3 Year Warranty on All Items", color:T.mint   },
              { Icon:FiAward,    label:"ISO & CE Certified Products",    color:T.lavender},
              { Icon:FiRefreshCw,label:"30-Day Return Policy",           color:T.peach  },
            ].map(({ Icon, label, color }) => (
              <div key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white border border-slate-100 shadow-sm"
                style={{ color }}>
                <Icon size={12} /> {label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero image strip */}
        <div className="relative overflow-hidden mt-4" style={{ height:280 }}>
          <div className="flex gap-3 px-4 sm:px-6 max-w-6xl mx-auto h-full">
            {[
              "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1578991624414-276ef23a534f?auto=format&fit=crop&w=600&q=80",
            ].map((src, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:50, scale:0.95 }}
                animate={{ opacity:1, y:0,  scale:1 }}
                transition={{ duration:0.65, delay:0.55 + i*0.1, ease:[0.16,1,0.3,1] }}
                className="relative flex-1 min-w-[140px] rounded-t-2xl overflow-hidden shadow-lg"
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/55 to-transparent" />
              </motion.div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>
      </section>

      {/* ── SHOP SECTION ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        {/* Search + View toggle */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 items-start sm:items-center">
          <div className="flex items-center gap-2 px-4 py-3 rounded-2xl flex-1 max-w-lg bg-slate-50 border border-slate-100">
            <FiSearch size={15} className="text-sky-400 shrink-0" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search equipment by name, brand, model..."
              className="bg-transparent text-sm text-slate-700 outline-none flex-1 placeholder-slate-300" />
            {search && (
              <button onClick={() => setSearch("")}><FiX size={14} className="text-slate-400 hover:text-slate-600" /></button>
            )}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs font-bold text-slate-400 hidden sm:block">
              {filtered.length} item{filtered.length !== 1 ? "s" : ""}
            </span>
            <div className="flex gap-1 p-1 bg-slate-50 rounded-xl border border-slate-100">
              <button onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${viewMode==="grid" ? "bg-white shadow text-sky-600" : "text-slate-400 hover:text-slate-600"}`}>
                <FiGrid size={15} />
              </button>
              <button onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${viewMode==="list" ? "bg-white shadow text-sky-600" : "text-slate-400 hover:text-slate-600"}`}>
                <FiList size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {CATEGORIES.map(cat => (
            <motion.button key={cat.id} onClick={() => setActiveCat(cat.id)}
              whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all duration-200 border"
              style={ activeCat === cat.id
                ? { background:T.btn, color:"white", border:"1px solid transparent", boxShadow:"0 3px 14px rgba(14,165,233,0.28)" }
                : { background:"white", color:"#64748b", borderColor:"#e2e8f0" }
              }>
              <cat.Icon size={12} style={ activeCat !== cat.id ? { color:cat.color } : {} } />
              {cat.label}
              <span className="ml-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-black"
                style={ activeCat === cat.id ? { background:"rgba(255,255,255,0.25)", color:"white" } : { background:"#f1f5f9", color:"#94a3b8" } }>
                {cat.id === "all" ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat.id).length}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Section heading */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 rounded-full" style={{ background:T.btn }} />
          <h2 className="text-2xl font-black text-slate-800">
            {CATEGORIES.find(c => c.id === activeCat)?.label}
          </h2>
          {filtered.length > 0 && (
            <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background:"#f0f9ff", color:T.sky }}>
              {filtered.length} items
            </span>
          )}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
            {filtered.map((p, i) => (
              <ProductCard key={p.id} p={p} i={i}
                onSelect={setSelected}
                onWishlist={toggleWishlist}
                wishlisted={wishlist.includes(p.id)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <FiPackage size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-semibold">No equipment found. Try a different search or category.</p>
          </div>
        )}
      </section>

      {/* ── WHY BUY FROM US ──────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-16 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-8 rounded-full" style={{ background:T.btn }} />
          <h2 className="text-2xl font-black text-slate-800">Why Buy From Premium Clinic?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { Icon:FiAward,     title:"Genuine Products",       desc:"100% original equipment from authorised global distributors with full chain-of-custody documentation.", color:T.sky     },
            { Icon:FiTruck,     title:"Free Delivery & Setup",  desc:"We deliver, install, calibrate, and commission all equipment at your facility — completely free.", color:T.pink    },
            { Icon:FiShield,    title:"2–3 Year Warranty",      desc:"Every item comes with manufacturer warranty plus our Premium Clinic service guarantee and AMC options.", color:T.mint    },
            { Icon:FiClock,     title:"After-Sales Support",    desc:"Dedicated technical support team available 7 days a week for maintenance, repairs, and spare parts.", color:T.peach   },
          ].map(({ Icon, title, desc, color }, i) => {
            const ref = useRef(null);
            const inV = useInView(ref, { once:true });
            return (
              <motion.div key={title} ref={ref}
                initial={{ opacity:0, y:28 }} animate={inV ? { opacity:1, y:0 } : {}}
                transition={{ duration:0.5, delay:i*0.1 }}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-shadow duration-400"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background:`linear-gradient(135deg,${color}18,${color}30)` }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <h3 className="font-black text-slate-800 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 px-4 mx-4 sm:mx-6 rounded-3xl mb-12"
        style={{ background:"linear-gradient(135deg,#0ea5e9 0%,#8b5cf6 50%,#e91e8c 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[80px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-4">🏥</div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Equip Your Clinic<br />With the Best
          </h2>
          <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto">
            Talk to our medical equipment specialist today. Get a custom quote, demo, and financing plan tailored to your clinic.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a href={`https://wa.me/${wa}?text=${waMsg}`} target="_blank"
              whileHover={{ scale:1.05 }} whileTap={{ scale:0.96 }}
              className="px-8 py-3.5 rounded-xl font-bold text-green-700 bg-white shadow-xl hover:bg-white/90 transition-all flex items-center gap-2 text-sm">
              <FaWhatsapp size={17} className="text-green-600" /> WhatsApp Inquiry
            </motion.a>
            <motion.button
              whileHover={{ scale:1.05 }} whileTap={{ scale:0.96 }}
              onClick={() => onBookAppointment?.()}
              className="px-8 py-3.5 rounded-xl font-bold text-white border-2 border-white/40 hover:bg-white/10 transition-all flex items-center gap-2 text-sm">
              <FiCalendar size={14} /> Book a Demo Visit
            </motion.button>
          </div>
        </div>
      </section>

      {/* ── FLOATING WHATSAPP ── */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        <div className="absolute w-16 h-16 bg-green-500 rounded-full animate-ping opacity-35 pointer-events-none" />
        <motion.a href={`https://wa.me/${wa}?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
          whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }}
          initial={{ opacity:0, scale:0.6 }} animate={{ opacity:1, scale:1 }}
          transition={{ type:"spring", stiffness:260, damping:20 }}
          className="relative w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer group">
          <FaWhatsapp size={36} />
          <span className="absolute right-20 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 pointer-events-none transition-all duration-200">
            Equipment Inquiry
          </span>
        </motion.a>
      </div>
    </div>
  );
}