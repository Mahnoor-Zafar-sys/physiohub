// import { motion } from "framer-motion";
// import {
//   MdOutlineMonitorHeart,
//   MdOutlineFace,
//   MdOutlineAccessibility,
// } from "react-icons/md";
// import { TbDental, TbNeedle, TbAmbulance } from "react-icons/tb";
// import { GiBrain, GiBabyFace } from "react-icons/gi";

// const services = [
//   {
//     icon: TbDental,
//     title: "Dental Care",
//     desc: "Precision cosmetic and restorative dentistry using the latest digital imaging and painless techniques.",
//     color: "#0284c7", // Sky blue standard high-contrast
//     gradient: "from-sky-500/10 to-sky-500/5",
//     tags: ["Cosmetic", "Orthodontics", "Implants"],
//   },
//   {
//     icon: MdOutlineFace,
//     title: "Skin Treatment",
//     desc: "Advanced dermatology with AI-powered skin analysis and personalized treatment protocols.",
//     color: "#7c3aed", // Violet premium
//     gradient: "from-purple-500/10 to-purple-500/5",
//     tags: ["Laser", "Anti-Aging", "Acne"],
//   },
//   {
//     icon: MdOutlineMonitorHeart,
//     title: "Cardiology",
//     desc: "Cutting-edge cardiac diagnostics, interventional procedures, and preventive cardiovascular care.",
//     color: "#dc2626", // Cardiology Deep Red
//     gradient: "from-red-500/10 to-red-500/5",
//     tags: ["ECG", "Angioplasty", "Holter"],
//   },
//   {
//     icon: MdOutlineAccessibility,
//     title: "Orthopedics",
//     desc: "Expert bone, joint, and sports injury treatment with minimally invasive surgical options.",
//     color: "#d97706", // Amber
//     gradient: "from-amber-500/10 to-amber-500/5",
//     tags: ["Joints", "Spine", "Sports"],
//   },
//   {
//     icon: TbNeedle,
//     title: "Surgery",
//     desc: "State-of-the-art laparoscopic and robotic-assisted surgeries ensuring faster recovery.",
//     color: "#16a34a", // Green
//     gradient: "from-green-500/10 to-green-500/5",
//     tags: ["Robotic", "Laparoscopic", "Micro"],
//   },
//   {
//     icon: TbAmbulance,
//     title: "Emergency Care",
//     desc: "Round-the-clock trauma unit with rapid response teams and advanced resuscitation facilities.",
//     color: "#ef4444",
//     gradient: "from-red-600/15 to-red-600/5",
//     tags: ["24/7", "Trauma", "ICU"],
//     badge: "24/7",
//   },
//   {
//     icon: GiBrain,
//     title: "Neurology",
//     desc: "Comprehensive brain and nervous system care with advanced neuro-imaging diagnostics.",
//     color: "#0891b2", // Cyan
//     gradient: "from-cyan-500/10 to-cyan-500/5",
//     tags: ["MRI", "EEG", "Stroke Care"],
//   },
//   {
//     icon: GiBabyFace,
//     title: "Pediatrics",
//     desc: "Compassionate, specialized healthcare for children from newborn through adolescence.",
//     color: "#e11d48", // Rose Red for better separation
//     gradient: "from-pink-400/10 to-pink-400/5",
//     tags: ["Newborn", "Vaccination", "Growth"],
//   },
// ];

// export default function Services() {
//   return (
//     <section id="services" className="py-24 bg-gradient-to-b from-white via-slate-50/80 to-slate-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
//         {/* Header - Fixed Text Gradient Block */}
//         <motion.div
//           initial={{ opacity: 0, y: 35 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: false, amount: 0.2 }}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//           className="text-center mb-20"
//         >
//           <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
//             <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
//             Our Services
//           </span>
//           <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-3 tracking-tight font-serif">
//             World-Class Medical{" "}
//             <span style={{ 
//               background: "linear-gradient(90deg, #2563eb, #0ea5e9)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               backgroundClip: "text",
//               color: "transparent",
//               display: "inline-block"
//             }}>Specialties</span>
//           </h2>
//           <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto font-normal leading-relaxed">
//             From preventive care to complex surgeries, our specialists deliver
//             precision medicine in every department.
//           </p>
//         </motion.div>

//         {/* Structural Grid Container with High Separation lines */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {services.map(({ icon: Icon, title, desc, color, gradient, tags, badge }, i) => {
            
//             // Logic to calculate spatial entrance columns:
//             // In 4 column grid layout:
//             // Column 1 & 2 (indices 0, 1, 4, 5) come from LEFT
//             // Column 3 & 4 (indices 2, 3, 6, 7) come from RIGHT
//             const columnPosition = i % 4;
//             const isLeftOrigin = columnPosition === 0 || columnPosition === 1;

//             return (
//               <motion.div
//                 key={title}
//                 initial={{ 
//                   opacity: 0, 
//                   y: 10,
//                   x: isLeftOrigin ? -45 : 45 
//                 }}
//                 whileInView={{ 
//                   opacity: 1, 
//                   y: 0,
//                   x: 0 
//                 }}
//                 viewport={{ once: false, amount: 0.1 }}
//                 transition={{ 
//                   delay: (i % 4) * 0.08, // Column based orchestration
//                   duration: 0.65, 
//                   ease: [0.25, 1, 0.5, 1] 
//                 }}
//                 whileHover={{ y: -6, scale: 1.015 }}
//                 style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
//                 className="group relative bg-white rounded-2xl p-6 border border-slate-200/90 cursor-pointer overflow-hidden shadow-[0_4px_12px_-3px_rgba(148,163,184,0.12)] hover:shadow-[0_16px_32px_-6px_rgba(148,163,184,0.22)] transition-all duration-350"
//               >
//                 {/* Clean inner glowing border canvas overlay */}
//                 <div
//                   className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
//                 />
                
//                 <div 
//                   className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
//                   style={{ border: `1.5px solid ${color}35` }}
//                 />

//                 {/* Status alert dynamic badge */}
//                 {badge && (
//                   <span className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full animate-pulse z-10 shadow-sm">
//                     {badge}
//                   </span>
//                 )}

//                 {/* Structural Icon Vault */}
//                 <div
//                   className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-105 shadow-sm"
//                   style={{ background: `${color}0f`, border: `1px solid ${color}25` }}
//                 >
//                   <Icon className="text-2xl" style={{ color }} />
//                   <motion.div
//                     className="absolute inset-0 rounded-2xl pointer-events-none"
//                     animate={{ boxShadow: [`0 0 0px ${color}00`, `0 0 16px ${color}30`, `0 0 0px ${color}00`] }}
//                     transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
//                   />
//                 </div>

//                 {/* Central Core Content Blocks */}
//                 <div className="relative z-10">
//                   <h3 className="font-bold text-slate-800 text-lg mb-2.5 tracking-tight group-hover:text-slate-900 transition-colors">
//                     {title}
//                   </h3>
//                   <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal mb-5 min-h-[64px] group-hover:text-slate-600 transition-colors">
//                     {desc}
//                   </p>
                  
//                   {/* Clean Explicit Separator Tags */}
//                   <div className="flex flex-wrap gap-1.5">
//                     {tags.map((tag) => (
//                       <span
//                         key={tag}
//                         className="text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-md transition-all duration-300"
//                         style={{
//                           background: "#f1f5f9",
//                           color: "#475569",
//                           border: "1px solid #e2e8f0",
//                         }}
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Active Dynamic Vector Arrow link */}
//                 <motion.div
//                   className="relative z-10 mt-6 flex items-center gap-1.5 text-xs font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
//                   style={{ color }}
//                 >
//                   <span>Learn more</span>
//                   <motion.span
//                     animate={{ x: [0, 4, 0] }}
//                     transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
//                   >
//                     →
//                   </motion.span>
//                 </motion.div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// import { motion } from "framer-motion";
// import {
//   MdOutlineMonitorHeart,
//   MdOutlineFace,
//   MdOutlineAccessibility,
// } from "react-icons/md";
// import { TbDental, TbNeedle, TbAmbulance } from "react-icons/tb";
// import { GiBrain, GiBabyFace } from "react-icons/gi";

// const services = [
//   {
//     icon: TbDental,
//     title: "Dental Care",
//     desc: "Precision cosmetic and restorative dentistry using the latest digital imaging and painless techniques.",
//     color: "#0284c7", // Sky blue standard high-contrast
//     gradient: "from-sky-500/10 to-sky-500/5",
//     tags: ["Cosmetic", "Orthodontics", "Implants"],
//   },
//   {
//     icon: MdOutlineFace,
//     title: "Skin Treatment",
//     desc: "Advanced dermatology with AI-powered skin analysis and personalized treatment protocols.",
//     color: "#7c3aed", // Violet premium
//     gradient: "from-purple-500/10 to-purple-500/5",
//     tags: ["Laser", "Anti-Aging", "Acne"],
//   },
//   {
//     icon: MdOutlineMonitorHeart,
//     title: "Cardiology",
//     desc: "Cutting-edge cardiac diagnostics, interventional procedures, and preventive cardiovascular care.",
//     color: "#dc2626", // Cardiology Deep Red
//     gradient: "from-red-500/10 to-red-500/5",
//     tags: ["ECG", "Angioplasty", "Holter"],
//   },
//   {
//     icon: MdOutlineAccessibility,
//     title: "Orthopedics",
//     desc: "Expert bone, joint, and sports injury treatment with minimally invasive surgical options.",
//     color: "#d97706", // Amber
//     gradient: "from-amber-500/10 to-amber-500/5",
//     tags: ["Joints", "Spine", "Sports"],
//   },
//   {
//     icon: TbNeedle,
//     title: "Surgery",
//     desc: "State-of-the-art laparoscopic and robotic-assisted surgeries ensuring faster recovery.",
//     color: "#16a34a", // Green
//     gradient: "from-green-500/10 to-green-500/5",
//     tags: ["Robotic", "Laparoscopic", "Micro"],
//   },
//   {
//     icon: TbAmbulance,
//     title: "Emergency Care",
//     desc: "Round-the-clock trauma unit with rapid response teams and advanced resuscitation facilities.",
//     color: "#ef4444",
//     gradient: "from-red-600/15 to-red-600/5",
//     tags: ["24/7", "Trauma", "ICU"],
//     badge: "24/7",
//   },
//   {
//     icon: GiBrain,
//     title: "Neurology",
//     desc: "Comprehensive brain and nervous system care with advanced neuro-imaging diagnostics.",
//     color: "#0891b2", // Cyan
//     gradient: "from-cyan-500/10 to-cyan-500/5",
//     tags: ["MRI", "EEG", "Stroke Care"],
//   },
//   {
//     icon: GiBabyFace,
//     title: "Pediatrics",
//     desc: "Compassionate, specialized healthcare for children from newborn through adolescence.",
//     color: "#e11d48", // Rose Red for better separation
//     gradient: "from-pink-400/10 to-pink-400/5",
//     tags: ["Newborn", "Vaccination", "Growth"],
//   },
// ];

// export default function Services() {
//   return (
//     <section id="services" className="py-24 relative overflow-hidden w-full select-none">
      
//       {/* ── Injection of Pure Autopilot CSS Slow Zoom Loop ── */}
//       <style>{`
//         @keyframes slowBGZoom {
//           0% { transform: scale(1); }
//           50% { transform: scale(1.06); }
//           100% { transform: scale(1); }
//         }
//         .animate-bg-slow {
//           animation: slowBGZoom 22s infinite ease-in-out;
//         }
//       `}</style>

//       {/* ── Background Image Layer (Autopilot Moving Layer) ── */}
//       <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
//         <img
//           src="/services.jpg"
//           alt="Clinic Services Background"
//           className="w-full h-full object-cover object-center scale-100 animate-bg-slow"
//         />
//         {/* Soft premium light mask overlay over image for crisp card text readability */}
//         <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-slate-50/95" />
//       </div>

//       {/* ── Content Container ── */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
//         {/* Header - Fixed Text Gradient Block */}
//         <motion.div
//           initial={{ opacity: 0, y: 35 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: false, amount: 0.2 }}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//           className="text-center mb-20"
//         >
//           <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm backdrop-blur-sm">
//             <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
//             Our Services
//           </span>
//           <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-3 tracking-tight font-serif">
//             World-Class Medical{" "}
//             <span style={{ 
//               background: "linear-gradient(90deg, #2563eb, #0ea5e9)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               backgroundClip: "text",
//               color: "transparent",
//               display: "inline-block"
//             }}>Specialties</span>
//           </h2>
//           <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto font-normal leading-relaxed">
//             From preventive care to complex surgeries, our specialists deliver
//             precision medicine in every department.
//           </p>
//         </motion.div>

//         {/* Structural Grid Container with original stable layout */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {services.map(({ icon: Icon, title, desc, color, gradient, tags, badge }, i) => {
            
//             // Original Logic to calculate spatial entrance columns
//             const columnPosition = i % 4;
//             const isLeftOrigin = columnPosition === 0 || columnPosition === 1;

//             return (
//               <motion.div
//                 key={title}
//                 initial={{ 
//                   opacity: 0, 
//                   y: 10,
//                   x: isLeftOrigin ? -45 : 45 
//                 }}
//                 whileInView={{ 
//                   opacity: 1, 
//                   y: 0,
//                   x: 0 
//                 }}
//                 viewport={{ once: false, amount: 0.1 }}
//                 transition={{ 
//                   delay: (i % 4) * 0.08, // Column based orchestration
//                   duration: 0.65, 
//                   ease: [0.25, 1, 0.5, 1] 
//                 }}
//                 whileHover={{ y: -6, scale: 1.015 }}
//                 style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
//                 className="group relative bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-slate-200/90 cursor-pointer overflow-hidden shadow-[0_4px_12px_-3px_rgba(148,163,184,0.12)] hover:shadow-[0_16px_32px_-6px_rgba(148,163,184,0.22)] transition-all duration-350"
//               >
//                 {/* Clean inner glowing border canvas overlay */}
//                 <div
//                   className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
//                 />
                
//                 <div 
//                   className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
//                   style={{ border: `1.5px solid ${color}35` }}
//                 />

//                 {/* Status alert dynamic badge */}
//                 {badge && (
//                   <span className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full animate-pulse z-10 shadow-sm">
//                     {badge}
//                   </span>
//                 )}

//                 {/* Structural Icon Vault */}
//                 <div
//                   className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-105 shadow-sm"
//                   style={{ background: `${color}0f`, border: `1px solid ${color}25` }}
//                 >
//                   <Icon className="text-2xl" style={{ color }} />
//                   <motion.div
//                     className="absolute inset-0 rounded-2xl pointer-events-none"
//                     animate={{ boxShadow: [`0 0 0px ${color}00`, `0 0 16px ${color}30`, `0 0 0px ${color}00`] }}
//                     transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
//                   />
//                 </div>

//                 {/* Central Core Content Blocks */}
//                 <div className="relative z-10">
//                   <h3 className="font-bold text-slate-800 text-lg mb-2.5 tracking-tight group-hover:text-slate-900 transition-colors">
//                     {title}
//                   </h3>
//                   <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal mb-5 min-h-[64px] group-hover:text-slate-600 transition-colors">
//                     {desc}
//                   </p>
                  
//                   {/* Clean Explicit Separator Tags */}
//                   <div className="flex flex-wrap gap-1.5">
//                     {tags.map((tag) => (
//                       <span
//                         key={tag}
//                         className="text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-md transition-all duration-300"
//                         style={{
//                           background: "#f1f5f9",
//                           color: "#475569",
//                           border: "1px solid #e2e8f0",
//                         }}
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Active Dynamic Vector Arrow link */}
//                 <motion.div
//                   className="relative z-10 mt-6 flex items-center gap-1.5 text-xs font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
//                   style={{ color }}
//                 >
//                   <span>Learn more</span>
//                   <motion.span
//                     animate={{ x: [0, 4, 0] }}
//                     transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
//                   >
//                     →
//                   </motion.span>
//                 </motion.div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// import { useState } from "react";
// import { motion } from "framer-motion";

// const servicesData = [
//   {
//     id: 1,
//     title: "Dental Care",
//     emoji: "🦷",
//     // Authentic dentist performing active procedure on dental chair
//     bgImage: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80",
//     accentColor: "#0369a1",
//     lightBg: "#f0f9ff",
//     borderColor: "#bae6fd",
//     tagColor: "#0284c7",
//     tagBg: "#e0f2fe",
//     overview: "Advanced dental treatments combining aesthetics and function, from routine checkups to complex restorative procedures.",
//     symptoms: ["Tooth pain & sensitivity", "Bleeding gums", "Crooked or missing teeth", "Jaw discomfort"],
//     benefits: ["Pain-free procedures", "Same-day consultations", "Digital X-ray diagnostics", "Smile design planning"],
//     procedure: "Initial diagnosis with digital imaging → Treatment planning → Painless single-visit procedures → Aftercare guidance.",
//     tags: ["Cosmetic Dentistry", "Orthodontics", "Implants", "Root Canal"],
//   },
//   {
//     id: 2,
//     title: "Skin Care",
//     emoji: "✨",
//     // Dermatologist / clinical aesthetician performing active facial skin laser treatment
//     bgImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
//     accentColor: "#7c3aed",
//     lightBg: "#faf5ff",
//     borderColor: "#ddd6fe",
//     tagColor: "#7c3aed",
//     tagBg: "#ede9fe",
//     overview: "Medical-grade dermatology services using AI-driven skin analysis, laser technologies, and targeted anti-aging treatment protocols.",
//     symptoms: ["Acne & breakouts", "Pigmentation & dark spots", "Premature ageing", "Dry or oily skin conditions"],
//     benefits: ["AI-powered skin diagnostics", "Certified dermatologists", "Clinically proven protocols", "Visible results in weeks"],
//     procedure: "Skin analysis & consultation → Personalised treatment plan → Laser / medical-grade therapy sessions → Follow-up care.",
//     tags: ["Laser Therapy", "Anti-Aging", "Acne Treatment", "Pigmentation"],
//   },
//   {
//   id: 3,
//   title: "Hair Transplant",
//   emoji: "💆",
//   // Ab aapki apni local public folder ki saved image directly yahan render hogi
//   bgImage: "/hairtransplant.webp", 
//   accentColor: "#0d9488",
//   lightBg: "#f0fdfa",
//   borderColor: "#99f6e4",
//   tagColor: "#0d9488",
//   tagBg: "#ccfbf1",
//   overview: "Premium Follicular Unit Extraction (FUE) and advanced PRP therapy to restore natural hairlines with maximum density and lasting results.",
//   symptoms: ["Receding hairline", "Crown thinning", "Patchy hair loss", "Post-illness hair fall"],
//   benefits: ["Micro-graft precision", "Natural-looking results", "Minimal downtime", "High-density PRP therapy"],
//   procedure: "Donor area assessment → FUE follicle extraction → Micro-graft implantation → PRP therapy → Recovery monitoring.",
//   tags: ["FUE Technique", "PRP Therapy", "Hairline Restoration", "Density Design"],
// },
//   {
//     id: 4,
//     title: "Orthopedic",
//     emoji: "🦴",
//     bgImage: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80",
//     accentColor: "#b45309",
//     lightBg: "#fffbeb",
//     borderColor: "#fde68a",
//     tagColor: "#b45309",
//     tagBg: "#fef3c7",
//     overview: "Comprehensive bone, joint, and muscle care from sports injuries to complex fractures, delivered by board-certified orthopedic specialists.",
//     symptoms: ["Joint pain & swelling", "Fractures", "Back & spine pain", "Sports injuries"],
//     benefits: ["Advanced imaging diagnostics", "Minimally invasive surgeries", "Physiotherapy integration", "Rapid recovery programs"],
//     procedure: "Diagnosis via MRI / X-ray → Non-surgical or surgical treatment plan → Procedure → Rehabilitation & physiotherapy.",
//     tags: ["Joint Replacement", "Spine Care", "Sports Medicine", "Fracture Management"],
//   },
//   {
//     id: 5,
//     title: "ENT",
//     emoji: "👂",
//     bgImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80",
//     accentColor: "#be123c",
//     lightBg: "#fff1f2",
//     borderColor: "#fecdd3",
//     tagColor: "#be123c",
//     tagBg: "#ffe4e6",
//     overview: "Specialised care for ear, nose, and throat conditions using cutting-edge endoscopic diagnostics and minimally invasive surgical interventions.",
//     symptoms: ["Hearing loss", "Chronic sinusitis", "Tonsil infections", "Nasal blockage"],
//     benefits: ["Endoscopic precision diagnostics", "Same-day procedures available", "Allergy management", "Voice & swallowing therapy"],
//     procedure: "Endoscopic examination → Diagnosis → Medical or surgical treatment → Post-procedure monitoring.",
//     tags: ["Sinusitis", "Hearing Care", "Tonsil Surgery", "Allergy Treatment"],
//   },
//   {
//     id: 6,
//     title: "Gynecology",
//     emoji: "🌸",
//     bgImage: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=800&q=80",
//     accentColor: "#9d174d",
//     lightBg: "#fdf2f8",
//     borderColor: "#f9a8d4",
//     tagColor: "#9d174d",
//     tagBg: "#fce7f3",
//     overview: "Compassionate women's healthcare covering routine gynaecological check-ups, maternal care, and advanced laparoscopic procedures.",
//     symptoms: ["Irregular periods", "Pelvic pain", "Pregnancy care", "Hormonal imbalance"],
//     benefits: ["Private & confidential consultations", "Female specialist doctors", "Advanced laparoscopic surgery", "Complete maternal health support"],
//     procedure: "Consultation & examination → Ultrasound / lab diagnostics → Treatment or surgical plan → Ongoing care support.",
//     tags: ["Maternal Care", "Laparoscopic Surgery", "PCOD Management", "Routine Screening"],
//   },
// ];

// const featured = servicesData.slice(0, 3);

// export default function Services() {
//   return (
//     <section id="services" className="py-24 relative overflow-hidden w-full select-none bg-white">
//       <style>{`
//         @keyframes floatBadge {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-4px); }
//         }
//         .card-3d { perspective: 1600px; }
//         .card-inner {
//           position: relative;
//           width: 100%;
//           height: 100%;
//           transform-style: preserve-3d;
//           transition: transform 0.8s cubic-bezier(0.25, 1, 0.35, 1);
//         }
//         /* Trigger flip smoothly on desktop hover */
//         .card-3d:hover .card-inner {
//           transform: rotateY(180deg);
//         }
//         .card-face {
//           position: absolute;
//           inset: 0;
//           border-radius: 20px;
//           backface-visibility: hidden;
//           -webkit-backface-visibility: hidden;
//           overflow: hidden;
//         }
//         .card-back { transform: rotateY(180deg); }
//         .img-zoom { transition: transform 6s ease; }
//         .card-3d:hover .img-zoom { transform: scale(1.05); }
//       `}</style>

//       {/* Subtle background pattern */}
//       <div className="absolute inset-0 pointer-events-none" style={{
//         backgroundImage: "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)",
//         backgroundSize: "32px 32px",
//         opacity: 0.4
//       }} />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 24 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.55 }}
//           className="text-center mb-16"
//         >
//           <div
//             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
//             style={{ background: "#f0f9ff", color: "#0369a1", border: "1px solid #bae6fd", animation: "floatBadge 3s ease-in-out infinite" }}
//           >
//             <span style={{ width: 6, height: 6, background: "#0369a1", borderRadius: "50%", display: "inline-block" }} />
//             Our Departments
//           </div>

//           <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
//             Our Medical Services
//           </h2>
//           <p className="mt-4 text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
//             Specialised clinical departments staffed by certified consultants, equipped with modern diagnostic technology and guided by evidence-based treatment protocols.
//           </p>
//         </motion.div>

//         {/* 3 Featured Flip Cards (Controlled by Hover) */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-14">
//           {featured.map(({ id, title, emoji, bgImage, accentColor, lightBg, borderColor, tagColor, tagBg, overview, symptoms, benefits, procedure, tags }, i) => (
//             <motion.div
//               key={id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: i * 0.1 }}
//               className="card-3d cursor-pointer"
//               style={{ height: 420 }}
//             >
//               <div className="card-inner">

//                 {/* ── FRONT: Real Clinical Photo (Flips automatically on hover) ── */}
//                 <div className="card-face" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.09)", border: "1px solid #e2e8f0" }}>
//                   <img
//                     src={bgImage}
//                     alt={`${title} treatment in progress`}
//                     className="img-zoom"
//                     style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
//                   />
//                   {/* High contrast protection overlay */}
//                   <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)" }} />

//                   {/* Dynamic clean hint indicator */}
//                   <div style={{
//                     position: "absolute", top: 16, right: 16,
//                     background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)",
//                     border: "1px solid rgba(255,255,255,0.3)",
//                     borderRadius: 24, padding: "5px 12px",
//                     fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.06em",
//                     display: "flex", alignItems: "center", gap: 5
//                   }}>
//                     <span>✨</span> Hover to explore
//                   </div>

//                   {/* Front Text Context Overlays */}
//                   <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 24px 20px" }}>
//                     <div style={{
//                       width: 44, height: 44, borderRadius: 12, marginBottom: 12,
//                       background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
//                       border: "1px solid rgba(255,255,255,0.25)",
//                       display: "flex", alignItems: "center", justifyContent: "center",
//                       fontSize: 22
//                     }}>
//                       {emoji}
//                     </div>
//                     <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.3px" }}>
//                       {title}
//                     </h3>
//                     <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, margin: 0, lineHeight: 1.5 }}>
//                       {overview.substring(0, 80)}...
//                     </p>
//                   </div>
//                 </div>

//                 {/* ── BACK: Premium Medical Identity Grid View ── */}
//                 <div
//                   className="card-face card-back"
//                   style={{
//                     background: lightBg,
//                     border: `1px solid ${borderColor}`,
//                     padding: "22px 22px 18px",
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 14,
//                     boxShadow: "0 4px 24px rgba(0,0,0,0.07)"
//                   }}
//                 >
//                   {/* Back header */}
//                   <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 12, borderBottom: `1px solid ${borderColor}` }}>
//                     <div style={{
//                       width: 40, height: 40, borderRadius: 10, background: `${accentColor}18`,
//                       display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20
//                     }}>
//                       {emoji}
//                     </div>
//                     <div>
//                       <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#0f172a" }}>{title}</h3>
//                       <p style={{ margin: 0, fontSize: 11, color: accentColor, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>Department Overview</p>
//                     </div>
//                   </div>

//                   {/* Symptoms Data Row */}
//                   <div>
//                     <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em" }}>We treat</p>
//                     <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
//                       {symptoms.map(s => (
//                         <span key={s} style={{
//                           fontSize: 11, padding: "3px 9px", borderRadius: 20,
//                           background: `${accentColor}12`, color: accentColor,
//                           border: `1px solid ${accentColor}30`, fontWeight: 600
//                         }}>{s}</span>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Key Benefits Tracking Block */}
//                   <div>
//                     <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em" }}>Key benefits</p>
//                     <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
//                       {benefits.slice(0, 3).map(b => (
//                         <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 12.5, color: "#334155", lineHeight: 1.4 }}>
//                           <span style={{ color: accentColor, fontWeight: 900, marginTop: 1 }}>✓</span> {b}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   {/* Action Scope Tag Footer */}
//                   <div style={{ marginTop: "auto", paddingTop: 10, borderTop: `1px solid ${borderColor}`, display: "flex", flexWrap: "wrap", gap: 5 }}>
//                     {tags.map(tag => (
//                       <span key={tag} style={{
//                         fontSize: 10, fontWeight: 700, textTransform: "uppercase",
//                         letterSpacing: "0.06em", padding: "3px 9px", borderRadius: 5,
//                         background: tagBg, color: tagColor, border: `1px solid ${borderColor}`
//                       }}>{tag}</span>
//                     ))}
//                   </div>
//                 </div>

//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* More services teaser strip layout panel */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           className="rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
//           style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
//         >
//           <div>
//             <p style={{ margin: 0, fontSize: 13, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>And more departments</p>
//             <div className="flex flex-wrap gap-2">
//               {servicesData.slice(3).map(s => (
//                 <span key={s.id} style={{
//                   fontSize: 13, fontWeight: 700, color: "#334155",
//                   background: "#fff", border: "1px solid #e2e8f0",
//                   padding: "5px 14px", borderRadius: 8,
//                   display: "flex", alignItems: "center", gap: 5
//                 }}>
//                   <span>{s.emoji}</span> {s.title}
//                 </span>
//               ))}
//             </div>
//           </div>

//           <a
//             href="#services-page"
//             style={{
//               display: "inline-flex", alignItems: "center", gap: 8,
//               padding: "13px 28px", borderRadius: 12, whiteSpace: "nowrap",
//               background: "#0f172a", color: "#fff",
//               fontSize: 14, fontWeight: 700, letterSpacing: "-0.2px",
//               textDecoration: "none", flexShrink: 0,
//               transition: "background 0.2s",
//               boxShadow: "0 4px 14px rgba(15,23,42,0.2)"
//             }}
//             onMouseEnter={e => e.currentTarget.style.background = "#1e3a5f"}
//             onMouseLeave={e => e.currentTarget.style.background = "#0f172a"}
//           >
//             View All Services →
//           </a>
//         </motion.div>

//       </div>
//     </section>
//   );
// }

import { useState } from "react";
import { motion } from "framer-motion";

const servicesData = [
  {
    id: 1,
    title: "Dental Care",
    emoji: "🦷",
    bgImage: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80",
    accentColor: "#0369a1",
    lightBg: "#f0f9ff",
    borderColor: "#bae6fd",
    tagColor: "#0284c7",
    tagBg: "#e0f2fe",
    overview: "Advanced dental treatments combining aesthetics and function, from routine checkups to complex restorative procedures.",
    symptoms: ["Tooth pain & sensitivity", "Bleeding gums", "Crooked or missing teeth", "Jaw discomfort"],
    benefits: ["Pain-free procedures", "Same-day consultations", "Digital X-ray diagnostics", "Smile design planning"],
    procedure: "Initial diagnosis with digital imaging → Treatment planning → Painless single-visit procedures → Aftercare guidance.",
    tags: ["Cosmetic Dentistry", "Orthodontics", "Implants", "Root Canal"],
  },
  {
    id: 2,
    title: "Skin Care",
    emoji: "✨",
    bgImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    accentColor: "#7c3aed",
    lightBg: "#faf5ff",
    borderColor: "#ddd6fe",
    tagColor: "#7c3aed",
    tagBg: "#ede9fe",
    overview: "Medical-grade dermatology services using AI-driven skin analysis, laser technologies, and targeted anti-aging treatment protocols.",
    symptoms: ["Acne & breakouts", "Pigmentation & dark spots", "Premature ageing", "Dry or oily skin conditions"],
    benefits: ["AI-powered skin diagnostics", "Certified dermatologists", "Clinically proven protocols", "Visible results in weeks"],
    procedure: "Skin analysis & consultation → Personalised treatment plan → Laser / medical-grade therapy sessions → Follow-up care.",
    tags: ["Laser Therapy", "Anti-Aging", "Acne Treatment", "Pigmentation"],
  },
  {
    id: 3,
    title: "Hair Transplant",
    emoji: "💆",
    bgImage: "/hairtransplant.webp", 
    accentColor: "#0d9488",
    lightBg: "#f0fdfa",
    borderColor: "#99f6e4",
    tagColor: "#0d9488",
    tagBg: "#ccfbf1",
    overview: "Premium Follicular Unit Extraction (FUE) and advanced PRP therapy to restore natural hairlines with maximum density and lasting results.",
    symptoms: ["Receding hairline", "Crown thinning", "Patchy hair loss", "Post-illness hair fall"],
    benefits: ["Micro-graft precision", "Natural-looking results", "Minimal downtime", "High-density PRP therapy"],
    procedure: "Donor area assessment → FUE follicle extraction → Micro-graft implantation → PRP therapy → Recovery monitoring.",
    tags: ["FUE Technique", "PRP Therapy", "Hairline Restoration", "Density Design"],
  },
];

const featured = servicesData.slice(0, 3);

export default function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden w-full select-none bg-white">
      <style>{`
        .card-3d { perspective: 1600px; }
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.35, 1);
        }
        .card-3d:hover .card-inner {
          transform: rotateY(180deg);
        }
        .card-face {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          overflow: hidden;
        }
        .card-back { transform: rotateY(180deg); }
        .img-zoom { transition: transform 6s ease; }
        .card-3d:hover .img-zoom { transform: scale(1.05); }

        /* Continuous Premium Glitter Moving Effect - Matches Image Blue Shimmer Exactly */
        @keyframes glitteryLinear {
          0% { background-position: 0% 50%; }
          100% { background-position: -200% 50%; }
        }
        .services-glitter-blue {
          background: linear-gradient(
            to right, 
            #1e40af 0%, 
            #2563eb 25%, 
            #60a5fa 50%,
            #2563eb 75%,
            #1e40af 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: glitteryLinear 4s linear infinite;
          display: inline-block;
        }
      `}</style>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)",
        backgroundSize: "32px 32px",
        opacity: 0.4
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header Wrapper with dynamic continuous scroll trigger */}
        <div className="text-center mb-16 overflow-hidden">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight" 
            style={{ fontFamily: "Georgia, serif" }}
          >
            Our <span className="services-glitter-blue">Medical Services</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="mt-4 text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Specialised clinical departments staffed by certified consultants, equipped with modern diagnostic technology and guided by evidence-based treatment protocols.
          </motion.p>
        </div>

        {/* 3 Featured Flip Cards appearing smoothly and slightly on every scroll entry */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-14">
          {featured.map(({ id, title, emoji, bgImage, accentColor, lightBg, borderColor, tagColor, tagBg, overview, symptoms, benefits, tags }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 50, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.215, 0.610, 0.355, 1] }}
              className="card-3d cursor-pointer"
              style={{ height: 420 }}
            >
              <div className="card-inner">

                {/* ── FRONT ── */}
                <div className="card-face" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.09)", border: "1px solid #e2e8f0" }}>
                  <img
                    src={bgImage}
                    alt={`${title} treatment in progress`}
                    className="img-zoom"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)" }} />

                  <div style={{
                    position: "absolute", top: 16, right: 16,
                    background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderRadius: 24, padding: "5px 12px",
                    fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.06em",
                    display: "flex", alignItems: "center", gap: 5
                  }}>
                    <span>✨</span> Hover to explore
                  </div>

                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 24px 20px" }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, marginBottom: 12,
                      background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 22
                    }}>
                      {emoji}
                    </div>
                    <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.3px" }}>
                      {title}
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, margin: 0, lineHeight: 1.5 }}>
                      {overview.substring(0, 80)}...
                    </p>
                  </div>
                </div>

                {/* ── BACK ── */}
                <div
                  className="card-face card-back"
                  style={{
                    background: lightBg,
                    border: `1px solid ${borderColor}`,
                    padding: "22px 22px 18px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.07)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 12, borderBottom: `1px solid ${borderColor}` }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, background: `${accentColor}18`,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20
                    }}>
                      {emoji}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#0f172a" }}>{title}</h3>
                      <p style={{ margin: 0, fontSize: 11, color: accentColor, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>Department Overview</p>
                    </div>
                  </div>

                  <div>
                    <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em" }}>We treat</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {symptoms.map(s => (
                        <span key={s} style={{
                          fontSize: 11, padding: "3px 9px", borderRadius: 20,
                          background: `${accentColor}12`, color: accentColor,
                          border: `1px solid ${accentColor}30`, fontWeight: 600
                        }}>{s}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em" }}>Key benefits</p>
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                      {benefits.slice(0, 3).map(b => (
                        <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 12.5, color: "#334155", lineHeight: 1.4 }}>
                          <span style={{ color: accentColor, fontWeight: 900, marginTop: 1 }}>✓</span> {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginTop: "auto", paddingTop: 10, borderTop: `1px solid ${borderColor}`, display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                        letterSpacing: "0.06em", padding: "3px 9px", borderRadius: 5,
                        background: tagBg, color: tagColor, border: `1px solid ${borderColor}`
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Call to Action Button with Scroll Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mt-12"
        >
          <a
            href="#services-page"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 36px", borderRadius: 12, whiteSpace: "nowrap",
              background: "#0f172a", color: "#fff",
              fontSize: 15, fontWeight: 700, letterSpacing: "-0.2px",
              textDecoration: "none",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 14px rgba(15,23,42,0.15)"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#2563eb";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#0f172a";
              e.currentTarget.style.transform = "translateY(0px)";
            }}
          >
            View All Services →
          </a>
        </motion.div>

      </div>
    </section>
  );
}