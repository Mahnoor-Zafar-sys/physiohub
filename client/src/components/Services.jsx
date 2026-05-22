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

import { motion } from "framer-motion";
import {
  MdOutlineMonitorHeart,
  MdOutlineFace,
  MdOutlineAccessibility,
} from "react-icons/md";
import { TbDental, TbNeedle, TbAmbulance } from "react-icons/tb";
import { GiBrain, GiBabyFace } from "react-icons/gi";

const services = [
  {
    icon: TbDental,
    title: "Dental Care",
    desc: "Precision cosmetic and restorative dentistry using the latest digital imaging and painless techniques.",
    color: "#0284c7", // Sky blue standard high-contrast
    gradient: "from-sky-500/10 to-sky-500/5",
    tags: ["Cosmetic", "Orthodontics", "Implants"],
  },
  {
    icon: MdOutlineFace,
    title: "Skin Treatment",
    desc: "Advanced dermatology with AI-powered skin analysis and personalized treatment protocols.",
    color: "#7c3aed", // Violet premium
    gradient: "from-purple-500/10 to-purple-500/5",
    tags: ["Laser", "Anti-Aging", "Acne"],
  },
  {
    icon: MdOutlineMonitorHeart,
    title: "Cardiology",
    desc: "Cutting-edge cardiac diagnostics, interventional procedures, and preventive cardiovascular care.",
    color: "#dc2626", // Cardiology Deep Red
    gradient: "from-red-500/10 to-red-500/5",
    tags: ["ECG", "Angioplasty", "Holter"],
  },
  {
    icon: MdOutlineAccessibility,
    title: "Orthopedics",
    desc: "Expert bone, joint, and sports injury treatment with minimally invasive surgical options.",
    color: "#d97706", // Amber
    gradient: "from-amber-500/10 to-amber-500/5",
    tags: ["Joints", "Spine", "Sports"],
  },
  {
    icon: TbNeedle,
    title: "Surgery",
    desc: "State-of-the-art laparoscopic and robotic-assisted surgeries ensuring faster recovery.",
    color: "#16a34a", // Green
    gradient: "from-green-500/10 to-green-500/5",
    tags: ["Robotic", "Laparoscopic", "Micro"],
  },
  {
    icon: TbAmbulance,
    title: "Emergency Care",
    desc: "Round-the-clock trauma unit with rapid response teams and advanced resuscitation facilities.",
    color: "#ef4444",
    gradient: "from-red-600/15 to-red-600/5",
    tags: ["24/7", "Trauma", "ICU"],
    badge: "24/7",
  },
  {
    icon: GiBrain,
    title: "Neurology",
    desc: "Comprehensive brain and nervous system care with advanced neuro-imaging diagnostics.",
    color: "#0891b2", // Cyan
    gradient: "from-cyan-500/10 to-cyan-500/5",
    tags: ["MRI", "EEG", "Stroke Care"],
  },
  {
    icon: GiBabyFace,
    title: "Pediatrics",
    desc: "Compassionate, specialized healthcare for children from newborn through adolescence.",
    color: "#e11d48", // Rose Red for better separation
    gradient: "from-pink-400/10 to-pink-400/5",
    tags: ["Newborn", "Vaccination", "Growth"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden w-full select-none">
      
      {/* ── Injection of Pure Autopilot CSS Slow Zoom Loop ── */}
      <style>{`
        @keyframes slowBGZoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        .animate-bg-slow {
          animation: slowBGZoom 22s infinite ease-in-out;
        }
      `}</style>

      {/* ── Background Image Layer (Autopilot Moving Layer) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/services.jpg"
          alt="Clinic Services Background"
          className="w-full h-full object-cover object-center scale-100 animate-bg-slow"
        />
        {/* Soft premium light mask overlay over image for crisp card text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-slate-50/95" />
      </div>

      {/* ── Content Container ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header - Fixed Text Gradient Block */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            Our Services
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-3 tracking-tight font-serif">
            World-Class Medical{" "}
            <span style={{ 
              background: "linear-gradient(90deg, #2563eb, #0ea5e9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              display: "inline-block"
            }}>Specialties</span>
          </h2>
          <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            From preventive care to complex surgeries, our specialists deliver
            precision medicine in every department.
          </p>
        </motion.div>

        {/* Structural Grid Container with original stable layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ icon: Icon, title, desc, color, gradient, tags, badge }, i) => {
            
            // Original Logic to calculate spatial entrance columns
            const columnPosition = i % 4;
            const isLeftOrigin = columnPosition === 0 || columnPosition === 1;

            return (
              <motion.div
                key={title}
                initial={{ 
                  opacity: 0, 
                  y: 10,
                  x: isLeftOrigin ? -45 : 45 
                }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  x: 0 
                }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ 
                  delay: (i % 4) * 0.08, // Column based orchestration
                  duration: 0.65, 
                  ease: [0.25, 1, 0.5, 1] 
                }}
                whileHover={{ y: -6, scale: 1.015 }}
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                className="group relative bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-slate-200/90 cursor-pointer overflow-hidden shadow-[0_4px_12px_-3px_rgba(148,163,184,0.12)] hover:shadow-[0_16px_32px_-6px_rgba(148,163,184,0.22)] transition-all duration-350"
              >
                {/* Clean inner glowing border canvas overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                />
                
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ border: `1.5px solid ${color}35` }}
                />

                {/* Status alert dynamic badge */}
                {badge && (
                  <span className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full animate-pulse z-10 shadow-sm">
                    {badge}
                  </span>
                )}

                {/* Structural Icon Vault */}
                <div
                  className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-105 shadow-sm"
                  style={{ background: `${color}0f`, border: `1px solid ${color}25` }}
                >
                  <Icon className="text-2xl" style={{ color }} />
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={{ boxShadow: [`0 0 0px ${color}00`, `0 0 16px ${color}30`, `0 0 0px ${color}00`] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                  />
                </div>

                {/* Central Core Content Blocks */}
                <div className="relative z-10">
                  <h3 className="font-bold text-slate-800 text-lg mb-2.5 tracking-tight group-hover:text-slate-900 transition-colors">
                    {title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal mb-5 min-h-[64px] group-hover:text-slate-600 transition-colors">
                    {desc}
                  </p>
                  
                  {/* Clean Explicit Separator Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-md transition-all duration-300"
                        style={{
                          background: "#f1f5f9",
                          color: "#475569",
                          border: "1px solid #e2e8f0",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Active Dynamic Vector Arrow link */}
                <motion.div
                  className="relative z-10 mt-6 flex items-center gap-1.5 text-xs font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                  style={{ color }}
                >
                  <span>Learn more</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}