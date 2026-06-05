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

import { motion, useInView as useMotionInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  FiArrowRight, FiCheckCircle, FiChevronRight,
  FiMapPin, FiPhone, FiAward, FiShield, FiStar
} from "react-icons/fi";
import { FaAmbulance } from "react-icons/fa";
import Navbar from "../components/Navbar";

// ─── IMAGE BANK ───────────────────────────────────────────────────────────────
const IMAGES = {
  panel1:    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
  panel2:    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
  panel3:    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
  icu:       "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=80",
  surgery:   "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1400&q=80",
  lab:       "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=1400&q=80",
  pharmacy:  "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=1400&q=80",
  lounge:    "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1400&q=80",
  parking:   "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1400&q=80",
  mission:   "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80",
  vision:    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
  compassion:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80",
  innovation:"https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=900&q=80",
  trust:     "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80",
  excellence:"https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&q=80",
  ctaBg:     "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1600&q=80",
  historyBg: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1600&q=80",
  jci:       "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=900&q=90",
  award:     "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=900&q=90",
  iso:       "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=900&q=90",
};

// ─── COUNTER HOOK ─────────────────────────────────────────────────────────────
function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const end = parseInt(target);
    if (isNaN(end)) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const slideLeft  = { hidden: { opacity: 0, x: -70 }, visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } } };
const slideRight = { hidden: { opacity: 0, x:  70 }, visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } } };
const fadeUp     = { hidden: { opacity: 0, y: 40  }, visible: (i=0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.13, ease: [0.25, 0.1, 0.25, 1] } }) };

// ─── SECTION HEADING — Awwwards style ────────────────────────────────────────
const SectionLabel = ({ label, heading }) => (
  <motion.div
    variants={fadeUp} initial="hidden" whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    className="mb-16"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-px bg-blue-400" />
      <span className="text-[10px] font-bold text-blue-500 tracking-[0.3em] uppercase">{label}</span>
    </div>
    {heading && (
      <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none">
        {heading}
      </h2>
    )}
  </motion.div>
);

// ─── ALTERNATING ROW ─────────────────────────────────────────────────────────
const AlternatingRow = ({ img, imgAlt, children, reverse = false }) => {
  const ref = useRef(null);
  const inView = useMotionInView(ref, { once: true, amount: 0.2 });
  return (
    <div ref={ref} className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? "lg:[direction:rtl]" : ""}`}>
      <motion.div
        initial="hidden" animate={inView ? "visible" : "hidden"}
        variants={reverse ? slideRight : slideLeft}
        className={`overflow-hidden rounded-2xl shadow-lg ${reverse ? "[direction:ltr]" : ""}`}
      >
        <img src={img} alt={imgAlt} className="w-full h-72 lg:h-[360px] object-cover hover:scale-105 transition-transform duration-700" />
      </motion.div>
      <motion.div
        initial="hidden" animate={inView ? "visible" : "hidden"}
        variants={reverse ? slideLeft : slideRight}
        className={`space-y-5 ${reverse ? "[direction:ltr]" : ""}`}
      >
        {children}
      </motion.div>
    </div>
  );
};

// ─── STAT ITEM ───────────────────────────────────────────────────────────────
const StatItem = ({ value, suffix, label, start }) => {
  const count = useCountUp(value, 2200, start);
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center space-y-2">
      <div className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
        {start ? count.toLocaleString() : "0"}{suffix}
      </div>
      <div className="w-6 h-0.5 bg-blue-400 mx-auto" />
      <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">{label}</div>
    </motion.div>
  );
};

// ─── MARQUEE COMPONENT ────────────────────────────────────────────────────────
const Marquee = ({ items, speed = 35 }) => {
  const track = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex gap-8 w-max"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {track.map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-slate-200 bg-white text-slate-500 text-xs font-semibold tracking-wide whitespace-nowrap shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── FLIP CARD ───────────────────────────────────────────────────────────────
const FlipCard = ({ front, back, delay = 0 }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      variants={fadeUp} custom={delay}
      initial="hidden" whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative h-64 cursor-pointer"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className="relative w-full h-full transition-all duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img src={front.img} alt={front.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5">
            <p className="text-white text-lg font-bold tracking-tight">{front.title}</p>
            <p className="text-slate-300 text-xs mt-1 font-medium">{front.subtitle}</p>
          </div>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl bg-blue-600 p-7 flex flex-col justify-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-white text-[11px] font-bold tracking-[0.2em] uppercase mb-3">{back.label}</p>
          <h4 className="text-white text-xl font-bold mb-3 leading-snug">{back.title}</h4>
          <p className="text-blue-100 text-sm leading-relaxed">{back.desc}</p>
        </div>
      </div>
    </motion.div>
  );
};

// ─── PARALLAX IMAGE ───────────────────────────────────────────────────────────
const ParallaxImage = ({ src, alt, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} style={{ y }} className="w-full h-full object-cover scale-110" />
    </div>
  );
};

// ─── CIRCULAR ORBIT ───────────────────────────────────────────────────────────
const OrbitRing = ({ items }) => (
  <div className="relative w-64 h-64 mx-auto">
    {/* Center circle */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
        <span className="text-white text-xs font-bold text-center leading-tight px-2">Since<br/>2011</span>
      </div>
    </div>
    {/* Orbit ring */}
    <div className="absolute inset-0 rounded-full border border-dashed border-blue-200"
      style={{ animation: "spin-slow 18s linear infinite" }}
    />
    {items.map((item, i) => {
      const angle = (i / items.length) * 360;
      const rad = (angle * Math.PI) / 180;
      const r = 110;
      const x = 50 + (r / 1.28) * Math.cos(rad);
      const y = 50 + (r / 1.28) * Math.sin(rad);
      return (
        <div
          key={i}
          className="absolute w-10 h-10 rounded-full bg-white border border-blue-100 shadow-md flex items-center justify-center"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <span className="text-[9px] font-bold text-blue-600 text-center leading-none px-0.5">{item}</span>
        </div>
      );
    })}
  </div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function About({ onNavigate }) {
  const statsRef = useRef(null);
  const statsInView = useMotionInView(statsRef, { once: true, amount: 0.3 });

  const facilities = [
    { name: "Intensive Care Suite", short: "ICU", desc: "24/7 continuous monitoring with dedicated specialist teams. Every critical patient receives immediate, personalized attention in our fully equipped critical care environment.", features: ["24/7 Specialist Coverage", "Real-Time Monitoring", "Ventilator Support"], img: IMAGES.icu },
    { name: "Operation Theater",    short: "OT",  desc: "State-of-the-art sterile surgical suites designed to international safety standards. Laminar airflow systems and advanced intra-operative imaging ensure precision.", features: ["Laminar Airflow", "Advanced Intra-Op Imaging", "Sterile Architecture"], img: IMAGES.surgery },
    { name: "Diagnostic Laboratory",short: "LAB", desc: "Fully automated diagnostic lab delivering precise results with rapid turnaround. ISO-certified processes covering the complete diagnostic spectrum with same-day reporting.", features: ["Automated Analysis", "Same-Day Results", "ISO QA Certified"], img: IMAGES.lab },
    { name: "In-House Pharmacy",    short: "RX",  desc: "Round-the-clock pharmacy stocked with an extensive range of branded and generic medications. Accurate dispensing, cold-chain storage, and thorough patient counseling at every visit.", features: ["Open 24/7", "Prescription Verification", "Cold Chain Storage"], img: IMAGES.pharmacy },
    { name: "Patient Lounge",       short: "VIP", desc: "Thoughtfully designed comfort spaces with premium seating, ambient lighting, free Wi-Fi, and a dedicated concierge — creating a calm, reassuring atmosphere for patients and families.", features: ["Wi-Fi Enabled", "Dedicated Concierge", "Family Seating"], img: IMAGES.lounge },
    { name: "Secure Parking",       short: "PKG", desc: "Covered multi-level parking with dedicated zones for patients, visitors, and emergency vehicles. CCTV-monitored and fully accessible — free of charge for all patients.", features: ["CCTV Monitored 24/7", "Accessible Bays", "Emergency Priority Lane"], img: IMAGES.parking },
  ];

  const coreValues = [
    { name: "Compassion", desc: "Every patient interaction is guided by genuine empathy. We listen, we care, and we treat each person as family — trained not just in medicine, but in humanity.", img: IMAGES.compassion },
    { name: "Innovation", desc: "Continuously investing in the latest medical technologies, digital platforms, and clinical protocols — from AI diagnostics to robotic-assisted procedures.", img: IMAGES.innovation },
    { name: "Trust",      desc: "Transparent communication, ethical practices, and consistent outcomes have made us the most referred clinic in the region. We simply deliver, reliably, every time.", img: IMAGES.trust },
    { name: "Excellence", desc: "From clinical outcomes to patient experience, every aspect of our practice is held to the highest possible standard. Protocols reviewed quarterly by internationally trained specialists.", img: IMAGES.excellence },
  ];

  const stats = [
    { value: "50000", suffix: "+", label: "Patients Served" },
    { value: "98",    suffix: "%", label: "Satisfaction Rate" },
    { value: "25",    suffix: "+", label: "Specialists" },
    { value: "13",    suffix: "+", label: "Years of Excellence" },
  ];

  const certifications = [
    {
      img: IMAGES.jci,
      category: "Accreditation",
      title: "JCI International Standard",
      desc: "Clinical procedures and patient safety protocols fully aligned with Joint Commission International benchmarks — the gold standard of global healthcare accreditation.",
      badge: "Certified 2023",
      icon: <FiShield size={18} className="text-blue-500" />,
    },
    {
      img: IMAGES.award,
      category: "National Recognition",
      title: "Best Patient Care Award",
      desc: "Honoured by the National Healthcare Excellence Council for outstanding patient satisfaction scores and clinical quality indicators over three consecutive years.",
      badge: "2021 · 2022 · 2023",
      icon: <FiAward size={18} className="text-blue-500" />,
    },
    {
      img: IMAGES.iso,
      category: "Data Security",
      title: "ISO 27001 Compliant",
      desc: "Patient data protected under internationally certified information security management systems. Every record is encrypted, backed up, and accessible only by authorised personnel.",
      badge: "ISO 27001:2022",
      icon: <FiStar size={18} className="text-blue-500" />,
    },
  ];

  const marqueeItems = [
    "50,000+ Patients Served",
    "25+ Specialist Doctors",
    "24/7 Emergency Care",
    "ISO Certified Laboratory",
    "JCI Aligned Protocols",
    "13 Years of Excellence",
    "6 Core Departments",
    "Digital Patient Records",
  ];

  const flipCards = [
    {
      front: { img: IMAGES.panel1, title: "Born in Karachi", subtitle: "2011 — A small clinic. A big promise." },
      back:  { label: "Our origin", title: "Three doctors. One operating theater.", desc: "We started with a conviction: that every patient deserves world-class care. That conviction has never changed." },
    },
    {
      front: { img: IMAGES.panel2, title: "Built for Growth", subtitle: "2015–2020 — Expansion era" },
      back:  { label: "Our growth", title: "Six departments. 25 specialists.", desc: "From a single OT, we grew into a full-service clinic — without ever losing sight of our founding promise." },
    },
    {
      front: { img: IMAGES.panel3, title: "Leading Today", subtitle: "2023 — Karachi's most trusted clinic" },
      back:  { label: "Today", title: "50,000 lives. One standard.", desc: "Today we serve the city with the same heart we started with — now backed by world-class infrastructure and a team of 25+ specialists." },
    },
  ];

  const orbitItems = ["ICU", "OT", "LAB", "RX", "VIP", "PKG"];

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-slate-800 antialiased font-sans selection:bg-blue-600 selection:text-white">
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes float-y {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes shine {
          0%   { left: -100%; opacity: 0; }
          15%  { opacity: 0.55; }
          30%  { left: 100%; opacity: 0; }
          100% { left: 100%; opacity: 0; }
        }
        .glitter-container { position: relative; overflow: hidden; }
        .glitter-shine {
          position: absolute; top: 0; width: 50%; height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-25deg);
          animation: shine 3.5s infinite ease-in-out;
          pointer-events: none;
        }
        .glitter-p1 { animation-delay: 0s; }
        .glitter-p2 { animation-delay: 1.2s; }
        .glitter-p3 { animation-delay: 2.4s; }
        .float-card { animation: float-y 4s ease-in-out infinite; }
        .float-card-2 { animation: float-y 5s ease-in-out 1s infinite; }
        .cert-card:hover .cert-img { transform: scale(1.06); }
        .cert-img { transition: transform 0.6s ease; }
        .story-number {
          font-size: clamp(4rem, 10vw, 8rem);
          font-weight: 900;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1px #e2e8f0;
          letter-spacing: -0.04em;
          user-select: none;
        }
      `}</style>

      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <Navbar onNavigate={onNavigate} />
      </div>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="pt-40 pb-24 px-6 lg:px-16 max-w-7xl mx-auto relative overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -80 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.85, ease: "easeOut" }}
            className="lg:col-span-6 text-left space-y-6 z-10"
          >
            <div className="space-y-1">
              <h1 className="text-6xl lg:text-8xl font-black tracking-tight text-slate-950 leading-none">ABOUT</h1>
              <h2 className="text-5xl lg:text-7xl font-bold tracking-tight text-blue-600 leading-none">OUR CLINIC</h2>
            </div>
            <p className="text-slate-500 text-base max-w-lg font-normal leading-relaxed pt-4 border-t border-slate-100">
              For over 13 years, we have built a legacy of professional medical care in Karachi — through world-class specialists, modern infrastructure, and a genuinely patient-first culture.
            </p>
            <div className="flex gap-3 flex-wrap pt-2">
              <button className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md shadow-blue-200">
                Book Appointment <FiArrowRight size={14} />
              </button>
              <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600 transition-all">
                Meet Our Doctors
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-6 grid grid-cols-3 gap-4 h-[420px] lg:h-[500px] w-full items-stretch"
          >
            {[
              { src: IMAGES.panel1, cls: "", alt: "Clinic" },
              { src: IMAGES.panel2, cls: "lg:-translate-y-6 z-10 shadow-xl", alt: "Specialists" },
              { src: IMAGES.panel3, cls: "", alt: "Lounge" },
            ].map(({ src, cls, alt }, i) => (
              <div key={i} className={`glitter-container rounded-2xl shadow-md border border-slate-100 overflow-hidden ${cls}`}>
                <img src={src} alt={alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 brightness-95 saturate-90" />
                <div className={`glitter-shine glitter-p${i + 1}`} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ MARQUEE STRIP ═════════════════════════════════════════════════════ */}
      <div className="py-5 border-y border-slate-100 bg-white overflow-hidden">
        <Marquee items={marqueeItems} speed={40} />
      </div>

      {/* ══ OUR STORY — NEW DESIGN ════════════════════════════════════════════ */}
      <section className="py-28 px-6 lg:px-16 bg-[#f8f9fb] overflow-hidden">
        <div className="max-w-6xl mx-auto">

          {/* Section label */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-blue-400" />
              <span className="text-[10px] font-bold text-blue-500 tracking-[0.3em] uppercase">Our Story</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none">
              A promise made in 2011.<br />
              <span className="text-blue-600">Kept every single day.</span>
            </h2>
          </motion.div>

          {/* Timeline flip cards row */}
          <div className="grid lg:grid-cols-3 gap-6 mb-24">
            {flipCards.map((card, i) => (
              <FlipCard key={i} front={card.front} back={card.back} delay={i} />
            ))}
          </div>

          {/* Story body — big number + text + orbit */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: stacked story paragraphs with ghost numbers */}
            <div className="space-y-0">
              {[
                {
                  n: "01",
                  head: "Founded on conviction",
                  body: "Established in 2011 by a small team of three specialists, our clinic was born from a single belief — that every patient in this city deserves world-class medical care delivered with genuine compassion.",
                },
                {
                  n: "02",
                  head: "Grown without compromise",
                  body: "From one operating theater, we expanded to six departments — never once compromising on quality. Every investment was measured against one question: does this make patient outcomes better?",
                },
                {
                  n: "03",
                  head: "Serving 50,000 lives annually",
                  body: "Today we serve over 50,000 patients a year. Our commitment to that founding promise has never wavered — only deepened, as our team, technology, and reach have grown.",
                },
              ].map(({ n, head, body }, i) => (
                <motion.div
                  key={n}
                  variants={fadeUp} custom={i}
                  initial="hidden" whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  className="relative flex gap-6 group pb-10 last:pb-0"
                >
                  {/* Ghost number */}
                  <div className="flex-shrink-0 w-20 text-right leading-none select-none">
                    <span className="story-number">{n}</span>
                  </div>
                  {/* Connector line */}
                  <div className="absolute left-[4.5rem] top-14 bottom-0 w-px bg-slate-100 last:hidden group-last:hidden" />
                  {/* Content */}
                  <div className="pt-2 flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">{head}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: orbit + floating stat cards */}
            <motion.div
              variants={fadeUp} custom={1}
              initial="hidden" whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col items-center gap-10"
            >
              <OrbitRing items={orbitItems} />

              {/* Two floating stat cards */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                <div className="float-card rounded-2xl bg-white border border-slate-100 shadow-sm p-5 text-center">
                  <div className="text-3xl font-black text-slate-900 tracking-tight">13+</div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">Years</div>
                </div>
                <div className="float-card-2 rounded-2xl bg-blue-600 border border-blue-500 shadow-sm p-5 text-center">
                  <div className="text-3xl font-black text-white tracking-tight">98%</div>
                  <div className="text-xs text-blue-200 font-semibold uppercase tracking-wider mt-1">Satisfaction</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ MISSION & VISION ══════════════════════════════════════════════════ */}
      <section className="py-28 bg-white border-y border-slate-100 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <SectionLabel label="Who We Are" heading="Mission & Vision" />
          <div className="space-y-24">
            <AlternatingRow img={IMAGES.mission} imgAlt="Our Mission" reverse={false}>
              <span className="text-[10px] font-bold text-blue-500 tracking-[0.3em] uppercase">Our Mission</span>
              <h3 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Healthcare that heals<br />the whole person
              </h3>
              <div className="w-8 h-0.5 bg-blue-200" />
              <p className="text-slate-500 leading-relaxed text-[15px]">
                To provide every patient with healthcare that is not only medically excellent but genuinely compassionate — transparent care, advanced clinical protocols, and a patient experience that restores confidence in modern medicine.
              </p>
              <ul className="space-y-2 pt-1">
                {["Transparent, informed consent at every step", "Collaborative multi-specialist care teams", "Patient feedback integrated into clinical improvement"].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <FiCheckCircle className="text-blue-500 flex-shrink-0" size={14} /> {f}
                  </li>
                ))}
              </ul>
            </AlternatingRow>

            <AlternatingRow img={IMAGES.vision} imgAlt="Our Vision" reverse={true}>
              <span className="text-[10px] font-bold text-blue-500 tracking-[0.3em] uppercase">Our Vision</span>
              <h3 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                The standard others<br />aspire to reach
              </h3>
              <div className="w-8 h-0.5 bg-blue-200" />
              <p className="text-slate-500 leading-relaxed text-[15px]">
                To be recognised as the region's most trusted healthcare institution — where world-class medical expertise meets genuine human care. Every patient leaves healthier, better informed, and fully reassured.
              </p>
              <ul className="space-y-2 pt-1">
                {["AI-assisted diagnostics & symptom checking", "Digital patient portal & e-prescriptions", "Regional centre of excellence by 2027"].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <FiCheckCircle className="text-blue-500 flex-shrink-0" size={14} /> {f}
                  </li>
                ))}
              </ul>
            </AlternatingRow>
          </div>
        </div>
      </section>

      {/* ══ CORE VALUES ════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 lg:px-16 bg-[#f8f9fb]">
        <div className="max-w-6xl mx-auto">
          <SectionLabel label="What We Stand For" heading="Core Values" />
          <div className="space-y-24">
            {coreValues.map((val, i) => (
              <AlternatingRow key={val.name} img={val.img} imgAlt={val.name} reverse={i % 2 === 1}>
                <h3 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">{val.name}</h3>
                <div className="w-8 h-0.5 bg-blue-200" />
                <p className="text-slate-500 leading-relaxed text-[15px] max-w-md">{val.desc}</p>
              </AlternatingRow>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PHILOSOPHY PARALLAX BANNER ════════════════════════════════════════ */}
      <section className="relative overflow-hidden h-[460px] lg:h-[520px]">
        <ParallaxImage src={IMAGES.historyBg} alt="Healthcare Philosophy" className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-white/82" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl text-center space-y-6"
          >
            <span className="text-[10px] font-bold text-blue-600 tracking-[0.3em] uppercase block">Our Philosophy</span>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Technology supports care.<br />
              <span className="text-blue-600">People deliver healing.</span>
            </h2>
            <p className="text-slate-500 leading-relaxed text-base max-w-lg mx-auto">
              Our digital tools exist to free our clinicians to focus on what matters most — your health, your comfort, your complete recovery. Medicine is a relationship, not a transaction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══ CERTIFICATIONS ════════════════════════════════════════════════════ */}
      <section className="py-28 bg-white border-y border-slate-100 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <SectionLabel label="Credentials" heading="Verified Trust" />

          <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="visible" custom={i}
                viewport={{ once: true, amount: 0.2 }}
                className="cert-card group rounded-2xl overflow-hidden border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-400 bg-white"
              >
                <div className="overflow-hidden h-48">
                  <img src={item.img} alt={item.title} className="cert-img w-full h-full object-cover" />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-[10px] font-bold text-blue-600 tracking-widest uppercase">{item.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-semibold">{item.badge}</span>
                    <FiCheckCircle className="text-blue-400" size={15} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" custom={1}
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 p-7 bg-blue-50/60 rounded-2xl border border-blue-100"
          >
            <p className="text-[10px] font-bold text-blue-500 tracking-[0.25em] uppercase mb-5">Professional Memberships</p>
            <div className="grid sm:grid-cols-3 gap-4 text-sm text-slate-600 font-medium">
              {[
                "Pakistan Medical & Dental Council (PMDC)",
                "Pakistan Society of Internal Medicine (PSIM)",
                "World Health Organization Partner Network",
              ].map(m => (
                <div key={m} className="flex items-start gap-2.5">
                  <FiCheckCircle className="text-blue-500 mt-0.5 flex-shrink-0" size={13} />
                  {m}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ FACILITIES ════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 lg:px-16 bg-[#f8f9fb]">
        <div className="max-w-6xl mx-auto">
          <SectionLabel label="Our Infrastructure" heading="World-Class Facilities" />
          <div className="space-y-28">
            {facilities.map((f, i) => (
              <AlternatingRow key={f.name} img={f.img} imgAlt={f.name} reverse={i % 2 === 1}>
                <span className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase">{f.short}</span>
                <h3 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">{f.name}</h3>
                <div className="w-8 h-0.5 bg-blue-200" />
                <p className="text-slate-500 leading-relaxed text-[15px]">{f.desc}</p>
                <ul className="space-y-2 pt-2">
                  {f.features.map(feat => (
                    <li key={feat} className="flex items-center gap-3 text-sm text-slate-600">
                      <FiCheckCircle className="text-blue-500 flex-shrink-0" size={13} /> {feat}
                    </li>
                  ))}
                </ul>
              </AlternatingRow>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATISTICS ════════════════════════════════════════════════════════ */}
      <section ref={statsRef} className="py-20 bg-white border-y border-slate-100 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {stats.map(s => (
              <StatItem key={s.label} {...s} start={statsInView} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ CLOSING CTA ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-36 px-6">
        <ParallaxImage src={IMAGES.ctaBg} alt="Book Appointment" className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative max-w-3xl mx-auto text-center space-y-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <span className="text-[10px] font-bold text-blue-600 tracking-[0.3em] uppercase block mb-4">Get Started</span>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              Ready to experience<br />modern healthcare?
            </h2>
            <p className="text-slate-500 text-base leading-relaxed max-w-xl mx-auto">
              Our specialists are available to guide you from first consultation to complete recovery. Book online, WhatsApp us, or walk in — we are always here.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" custom={1}
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-2"
          >
            <button className="px-7 py-3.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center shadow-lg shadow-blue-200">
              Book Appointment <FiArrowRight size={15} />
            </button>
            <button className="px-7 py-3.5 bg-white text-slate-800 text-sm font-semibold rounded-xl border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all flex items-center gap-2 justify-center">
              Online Consultation <FiChevronRight size={15} />
            </button>
            <button className="px-7 py-3.5 bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl border border-slate-100 hover:border-slate-300 transition-all flex items-center gap-2 justify-center">
              Meet Our Doctors <FiChevronRight size={15} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ══ FOOTER CONTACT BAR ════════════════════════════════════════════════ */}
      <section className="py-10 border-t border-blue-50 bg-slate-50/50 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-center gap-8 text-xs font-semibold text-slate-500">
          <div className="flex items-center justify-center gap-2">
            <FiMapPin className="text-blue-500" />
            <span>Phase 6, DHA, Karachi, PK</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <FiPhone className="text-blue-500" />
            <span>+92 21 111 254 642</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <FaAmbulance className="text-blue-500" />
            <span>Emergency Hotline Active</span>
          </div>
        </div>
      </section>
    </div>
  );
}