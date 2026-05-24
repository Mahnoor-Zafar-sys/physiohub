// import { motion } from "framer-motion";
// import { FiAward, FiMonitor, FiClock, FiZap } from "react-icons/fi";
// import { MdOutlineScience } from "react-icons/md";
// import { TbRobot } from "react-icons/tb";

// const features = [
//   {
//     icon: FiAward,
//     title: "World-Class Doctors",
//     desc: "Our 120+ specialists hold international fellowships and have been recognized by leading global medical institutions.",
//     color: "#0284c7",
//     stat: "120+",
//     statLabel: "Specialists",
//   },
//   {
//     icon: TbRobot,
//     title: "AI Diagnosis Support",
//     desc: "Proprietary machine learning algorithms cross-reference symptoms against 50M+ case histories for unparalleled accuracy.",
//     color: "#7c3aed",
//     stat: "99.2%",
//     statLabel: "Accuracy",
//   },
//   {
//     icon: FiClock,
//     title: "24/7 Emergency Care",
//     desc: "Our rapid response teams and trauma bays are always active, with average response time under 3 minutes.",
//     color: "#dc2626",
//     stat: "<3 min",
//     statLabel: "Response",
//   },
//   {
//     icon: MdOutlineScience,
//     title: "Modern Equipment",
//     desc: "3T MRI, da Vinci surgical robots, PET-CT scanners — we invest heavily in the world's most advanced diagnostics.",
//     color: "#16a34a",
//     stat: "$50M+",
//     statLabel: "Equipment",
//   },
//   {
//     icon: FiMonitor,
//     title: "Online Consultation",
//     desc: "HD video consultations with any specialist in minutes — from your home, office, or anywhere in the world.",
//     color: "#0891b2",
//     stat: "5 min",
//     statLabel: "Avg. Wait",
//   },
//   {
//     icon: FiZap,
//     title: "Instant Booking",
//     desc: "One-click appointment scheduling, smart reminders, and real-time availability — digital-first healthcare.",
//     color: "#d97706",
//     stat: "30 sec",
//     statLabel: "To Book",
//   },
// ];

// export default function WhyUs() {
//   return (
//     <section className="py-24 bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] relative overflow-hidden">
//       {/* Background decoration */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-200/30 rounded-full blur-[120px]" />
//         <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-200/25 rounded-full blur-[100px]" />
        
//         <div
//           className="absolute inset-0 opacity-[0.4]"
//           style={{
//             backgroundImage: `linear-gradient(rgba(14,165,233,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.08) 1px, transparent 1px)`,
//             backgroundSize: "50px 50px",
//           }}
//         />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
//         {/* Header Section - Runs every time you scroll to it */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: false, amount: 0.2 }}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//           className="text-center mb-20"
//         >
//           <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200/60 text-sky-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
//             <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse" />
//             Why Choose Us
//           </span>
//           <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-3 leading-tight tracking-tight font-serif">
//             The Future of{" "}
//             <span
//               style={{
//                 background: "linear-gradient(90deg, #0ea5e9, #0284c7, #16a34a)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 backgroundClip: "text",
//                 color: "transparent",
//                 display: "inline-block"
//               }}
//             >
//               Medicine
//             </span>{" "}
//             is Here
//           </h2>
//           <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto font-normal leading-relaxed">
//             We combine human expertise with technological innovation to deliver
//             healthcare outcomes that simply weren't possible before.
//           </p>
//         </motion.div>

//         {/* Clean Scroll-Responsive Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map(({ icon: Icon, title, desc, color, stat, statLabel }, i) => (
//             <motion.div
//               key={title}
//               // Pure premium look: static position style with subtle automatic scale blend
//               initial={{ opacity: 0, scale: 0.96, y: 15 }}
//               whileInView={{ opacity: 1, scale: 1, y: 0 }}
//               // CRITICAL FIX: once: false triggers this animation EVERY SINGLE TIME you scroll
//               viewport={{ once: false, amount: 0.12 }}
//               transition={{ 
//                 delay: (i % 3) * 0.08, // Column stagger effect
//                 duration: 0.5, 
//                 ease: "easeOut" 
//               }}
//               whileHover={{ y: -6, scale: 1.01 }}
//               className="group relative rounded-2xl p-8 cursor-default overflow-hidden bg-white/70 backdrop-blur-md transition-all duration-300"
//               style={{
//                 border: "1px solid rgba(226, 232, 240, 0.8)",
//                 boxShadow: "0 4px 20px -2px rgba(148, 163, 184, 0.08), 0 2px 8px -1px rgba(148, 163, 184, 0.04)"
//               }}
//             >
//               {/* Dynamic subtle radial overlay on hover */}
//               <div
//                 className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
//                 style={{ background: `radial-gradient(circle at 10% 10%, ${color}08 0%, transparent 65%)` }}
//               />
              
//               <div 
//                 className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
//                 style={{ border: `1px solid ${color}20` }}
//               />

//               {/* Statistics Line Container */}
//               <div className="flex items-start justify-between mb-6 relative z-10">
//                 <div
//                   className="w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm"
//                   style={{ background: `${color}0d`, border: `1px solid ${color}20` }}
//                 >
//                   <Icon className="text-2xl" style={{ color }} />
//                 </div>
//                 <div className="text-right">
//                   <div className="font-bold text-2xl tracking-tight" style={{ color }}>
//                     {stat}
//                   </div>
//                   <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">
//                     {statLabel}
//                   </div>
//                 </div>
//               </div>

//               {/* Text Blocks */}
//               <div className="relative z-10">
//                 <h3 className="font-bold text-slate-800 text-xl mb-3 tracking-tight group-hover:text-slate-900 transition-colors">
//                   {title}
//                 </h3>
//                 <p className="text-slate-500 text-sm leading-relaxed font-normal group-hover:text-slate-600 transition-colors duration-300">
//                   {desc}
//                 </p>
//               </div>

//               {/* Bottom decorative color slide line */}
//               <div
//                 className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out rounded-full"
//                 style={{ background: `linear-gradient(90deg, ${color}, ${color}20)` }}
//               />
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }







import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUserCheck, FiActivity, FiShield, FiDollarSign, FiVideo } from "react-icons/fi";

const featuresData = [
  {
    id: "doctors",
    icon: FiUserCheck,
    title: "Experienced Doctors & Certified Specialists",
    metric: "120+",
    label: "Global Fellowships",
    summary: "Our highly qualified consultants and top-tier certified medical specialists deliver unparalleled clinical expertise.",
    media: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80",
    color: "#0284c7"
  },
  {
    id: "equipment",
    icon: FiActivity,
    title: "Modern Equipment & Diagnostics",
    metric: "3T MRI",
    label: "da Vinci Robotics",
    summary: "Heavy investments in state-of-the-art modern equipment, advanced diagnostics, and premium robotic surgical setups.",
    media: "/hairtransplant.webp",
    color: "#7c3aed"
  },
  {
    id: "emergency",
    icon: FiShield,
    title: "24/7 Emergency Support",
    metric: "<3m",
    label: "Response Time",
    summary: "Always active trauma bays, swift emergency response infrastructure, and rapid care facilities available round the clock.",
    media: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1400&q=80",
    color: "#dc2626"
  },
  {
    id: "affordable",
    icon: FiDollarSign,
    title: "Affordable Premium Healthcare",
    metric: "100%",
    label: "Price Transparency",
    summary: "Bringing top-tier, international standard healthcare within seamless reach with honest and affordable pricing frameworks.",
    media: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
    color: "#16a34a"
  },
  {
    id: "consultation",
    icon: FiVideo,
    title: "Online Consultation Facility",
    metric: "HD",
    label: "Virtual Care",
    summary: "Connect securely from anywhere globally with active digital consultation modules and instant specialist connectivity.",
    media: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    color: "#0891b2"
  }
];

export default function WhyUs() {
  const [activeIndex, setActiveIndex] = useState(0);

  // 2.5 seconds switch interval for live feed preview
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % featuresData.length);
    }, 2500); 
    return () => clearInterval(timer);
  }, []);

  // Container list sequential orchestration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      }
    }
  };

  // List item entries animation config
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section id="why-us" className="py-24 relative overflow-hidden bg-slate-50 w-full select-none">
      {/* Dynamic Background Mesh Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-12 left-10 w-96 h-96 bg-sky-200/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-12 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-[100px]" />
      </div>

      {/* Premium Dark Blue Glittering Shine Animation CSS Injection */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes subtleShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .glitter-text {
          background: linear-gradient(
            to right, 
            #1e3a8a 0%, 
            #2563eb 25%, 
            #3b82f6 50%, 
            #2563eb 75%, 
            #1e3a8a 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: subtleShimmer 4s linear infinite;
        }
      `}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Simple & Professional Section Header Line (Triggers on every scroll) */}
        <div className="mb-16 text-center overflow-hidden">
          <motion.h2 
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-serif"
          >
            Why Patients <span className="glitter-text">Choose Us</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="mt-4 text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Combining experienced medical professionals, modern clinical facilities,
            and patient-focused treatment to deliver reliable healthcare services with
            comfort, precision, and care.
          </motion.p>
        </div>

        {/* Cinematic Twin-Panel Interactive Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[520px]">
          
          {/* LEFT COLUMN: Text Panel (Triggers every time on scroll) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="col-span-1 lg:col-span-7 flex flex-col justify-center gap-4 w-full order-2 lg:order-1"
          >
            {featuresData.map((feat, idx) => {
              const Icon = feat.icon;
              const isSelected = activeIndex === idx;

              return (
                <motion.div
                  key={feat.id}
                  variants={itemVariants}
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative flex items-start gap-5 p-5 rounded-2xl cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? "bg-white shadow-xl shadow-slate-200/60 border border-slate-200/80" 
                      : "bg-transparent border border-transparent hover:bg-white/40"
                  }`}
                >
                  {/* Left accent color strip indicator */}
                  <div 
                    className={`absolute left-0 top-0 bottom-0 w-[4px] rounded-l-2xl transition-all duration-300 ${
                      isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                    }`}
                    style={{ backgroundColor: feat.color }}
                  />

                  {/* Icon Block */}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{ 
                      backgroundColor: isSelected ? `${feat.color}12` : "#e2e8f0",
                      color: isSelected ? feat.color : "#64748b"
                    }}
                  >
                    <Icon className="text-xl" />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 
                      className={`font-bold text-base sm:text-lg tracking-tight transition-colors duration-200 ${
                        isSelected ? "text-slate-900 font-extrabold" : "text-slate-700 group-hover:text-slate-900"
                      }`}
                    >
                      {feat.title}
                    </h3>
                    
                    {/* Collapsible/Expandable Concise Summary block */}
                    <div className={`overflow-hidden transition-all duration-300 ${
                      isSelected ? "max-h-24 opacity-100 mt-2" : "max-h-0 opacity-0"
                    }`}>
                      <p className="text-slate-500 text-sm leading-relaxed font-normal">
                        {feat.summary}
                      </p>
                    </div>
                  </div>

                  {/* Tiny Status Circle Ring */}
                  <div className="self-center pr-1 hidden sm:block">
                    <div 
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                        isSelected ? "scale-110" : "border-slate-300 bg-transparent"
                      }`}
                      style={{ borderColor: isSelected ? feat.color : "" }}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: feat.color }} />}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </motion.div>

          {/* RIGHT COLUMN: Ultra-Smooth Visual Live Feed Monitor (Triggers every time on scroll) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="col-span-1 lg:col-span-5 min-h-[350px] sm:min-h-[450px] lg:min-h-full w-full relative order-1 lg:order-2"
          >
            <div className="absolute inset-0 rounded-3xl bg-slate-950 overflow-hidden shadow-2xl border border-slate-200/80">
              
              {/* Ultra-Smooth Media Feed Transition Core */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={featuresData[activeIndex].media}
                    alt={featuresData[activeIndex].title}
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Cinematic Dark Gradient Mask Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85" />
                </motion.div>
              </AnimatePresence>

              {/* Digital Pulse UI / Video Look Elements */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-900/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white text-[11px] font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Live Showcase Feed
              </div>

              {/* Dynamic Big Stat Display inside the Frame */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white z-10">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Current View</h4>
                  <p className="text-lg font-bold text-white mt-0.5 truncate max-w-[180px] sm:max-w-xs">
                    {featuresData[activeIndex].title.split(" & ")[0]}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black tracking-tight" style={{ color: featuresData[activeIndex].color }}>
                    {featuresData[activeIndex].metric}
                  </div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                    {featuresData[activeIndex].label}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Global Styled Explore Button Block */}
        <div className="flex justify-center mt-16">
          <a
            href="#why-us-details"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-bold text-sm tracking-tight transition-all duration-200 bg-slate-900 hover:bg-slate-800 shadow-md shadow-slate-950/10 hover:-translate-y-0.5"
            style={{ textDecoration: "none" }}
          >
            Explore Full Details →
          </a>
        </div>

      </div>
    </section>
  );
}











// import { useState, useEffect, useRef } from "react";

// const features = [
//   {
//     id: "doctors",
//     number: "01",
//     title: "Experienced Doctors & Certified Specialists",
//     metric: "120+",
//     label: "Global Fellowships",
//     tag: "MEDICAL EXPERTISE",
//     summary:
//       "Highly qualified consultants and top-tier certified specialists deliver unparalleled clinical expertise across all major medical disciplines with international fellowship training.",
//     image:
//       "https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&w=1400&q=80",
//     accent: "#0ea5e9",
//     accentDim: "rgba(14,165,233,0.12)",
//   },
//   {
//     id: "equipment",
//     number: "02",
//     title: "Modern Equipment & Advanced Diagnostics",
//     metric: "3T MRI",
//     label: "da Vinci Robotics",
//     tag: "TECHNOLOGY",
//     summary:
//       "State-of-the-art diagnostic suites, advanced robotic surgical systems, and cutting-edge imaging technology ensure precise diagnosis and minimally invasive treatment outcomes.",
//     image:
//       "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80",
//     accent: "#8b5cf6",
//     accentDim: "rgba(139,92,246,0.12)",
//   },
//   {
//     id: "emergency",
//     number: "03",
//     title: "24/7 Emergency Support",
//     metric: "<3 min",
//     label: "Response Time",
//     tag: "EMERGENCY CARE",
//     summary:
//       "Always-active trauma bays with rapid response infrastructure, on-call surgical teams, and fully equipped emergency units ensure immediate life-saving care around the clock.",
//     image:
//       "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1400&q=80",
//     accent: "#ef4444",
//     accentDim: "rgba(239,68,68,0.12)",
//   },
//   {
//     id: "affordable",
//     number: "04",
//     title: "Affordable Premium Healthcare",
//     metric: "100%",
//     label: "Price Transparency",
//     tag: "PRICING",
//     summary:
//       "International-standard healthcare within accessible financial reach. Honest, upfront pricing frameworks with zero hidden costs and flexible payment options including insurance.",
//     image:
//       "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1400&q=80",
//     accent: "#10b981",
//     accentDim: "rgba(16,185,129,0.12)",
//   },
//   {
//     id: "consultation",
//     number: "05",
//     title: "Online Consultation Facility",
//     metric: "HD",
//     label: "Virtual Care",
//     tag: "DIGITAL HEALTH",
//     summary:
//       "Secure HD video consultations with any specialist from anywhere in the world. Digital prescriptions, remote follow-ups, and instant specialist connectivity on demand.",
//     image:
//       "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1400&q=80",
//     accent: "#f59e0b",
//     accentDim: "rgba(245,158,11,0.12)",
//   },
// ];

// const INTERVAL = 5500;

// export default function WhyUs() {
//   const [active, setActive] = useState(0);
//   const [prev, setPrev] = useState(null);
//   const [animating, setAnimating] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const timerRef = useRef(null);
//   const progressRef = useRef(null);
//   const startTimeRef = useRef(null);

//   const goTo = (idx) => {
//     if (idx === active || animating) return;
//     setPrev(active);
//     setAnimating(true);
//     setActive(idx);
//     resetTimer();
//     setTimeout(() => setAnimating(false), 700);
//   };

//   const resetTimer = () => {
//     clearInterval(timerRef.current);
//     cancelAnimationFrame(progressRef.current);
//     setProgress(0);
//     startTimeRef.current = performance.now();
//     startProgress();
//     timerRef.current = setInterval(() => {
//       setActive((a) => {
//         const next = (a + 1) % features.length;
//         setPrev(a);
//         setAnimating(true);
//         setTimeout(() => setAnimating(false), 700);
//         return next;
//       });
//       startTimeRef.current = performance.now();
//     }, INTERVAL);
//   };

//   const startProgress = () => {
//     const animate = (now) => {
//       const elapsed = now - startTimeRef.current;
//       setProgress(Math.min((elapsed / INTERVAL) * 100, 100));
//       progressRef.current = requestAnimationFrame(animate);
//     };
//     progressRef.current = requestAnimationFrame(animate);
//   };

//   useEffect(() => {
//     startTimeRef.current = performance.now();
//     resetTimer();
//     return () => {
//       clearInterval(timerRef.current);
//       cancelAnimationFrame(progressRef.current);
//     };
//   }, []);

//   const feat = features[active];

//   return (
//     <section
//       style={{
//         background: "#050a14",
//         minHeight: "100vh",
//         width: "100%",
//         overflow: "hidden",
//         position: "relative",
//         fontFamily: "'DM Sans', 'Outfit', sans-serif",
//       }}
//     >
//       {/* Google Fonts */}
//       <link
//         href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&family=DM+Serif+Display:ital@0;1&display=swap"
//         rel="stylesheet"
//       />

//       <style>{`
//         @keyframes fadeSlideRight {
//           from { opacity: 0; transform: translateX(40px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes fadeSlideUp {
//           from { opacity: 0; transform: translateY(24px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes imgReveal {
//           from { opacity: 0; transform: scale(1.06) translateX(-20px); }
//           to { opacity: 1; transform: scale(1) translateX(0); }
//         }
//         @keyframes headingReveal {
//           from { opacity: 0; transform: translateY(-18px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.4; }
//         }
//         @keyframes scanLine {
//           0% { top: 0; }
//           100% { top: 100%; }
//         }
//         .feat-item { transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
//         .feat-item:hover { cursor: pointer; }
//         .feat-item.selected { background: rgba(255,255,255,0.04) !important; }
//       `}</style>

//       {/* Ambient background glow tied to active accent */}
//       <div
//         style={{
//           position: "absolute",
//           top: "-10%",
//           right: "-5%",
//           width: "60%",
//           height: "70%",
//           borderRadius: "50%",
//           background: `radial-gradient(ellipse, ${feat.accent}18 0%, transparent 70%)`,
//           transition: "background 1.2s ease",
//           pointerEvents: "none",
//         }}
//       />
//       <div
//         style={{
//           position: "absolute",
//           bottom: "0%",
//           left: "0%",
//           width: "40%",
//           height: "50%",
//           borderRadius: "50%",
//           background: `radial-gradient(ellipse, ${feat.accent}10 0%, transparent 70%)`,
//           transition: "background 1.2s ease",
//           pointerEvents: "none",
//         }}
//       />

//       {/* Grid lines overlay */}
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           backgroundImage: `
//             linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
//           `,
//           backgroundSize: "60px 60px",
//           pointerEvents: "none",
//         }}
//       />

//       <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 40px" }}>

//         {/* ── SECTION HEADER ── */}
//         <div style={{ textAlign: "center", marginBottom: "72px" }}>
//           <div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: "10px",
//               background: "rgba(255,255,255,0.05)",
//               border: "1px solid rgba(255,255,255,0.1)",
//               borderRadius: "100px",
//               padding: "6px 18px",
//               marginBottom: "28px",
//               animation: "fadeSlideUp 0.6s ease both",
//             }}
//           >
//             <span
//               style={{
//                 width: "6px",
//                 height: "6px",
//                 borderRadius: "50%",
//                 background: feat.accent,
//                 transition: "background 0.5s",
//                 animation: "pulse 2s infinite",
//               }}
//             />
//             <span
//               style={{
//                 color: "rgba(255,255,255,0.55)",
//                 fontSize: "11px",
//                 fontWeight: 500,
//                 letterSpacing: "0.12em",
//                 textTransform: "uppercase",
//               }}
//             >
//               Why Choose Us
//             </span>
//           </div>

//           <h2
//             style={{
//               fontFamily: "'DM Serif Display', Georgia, serif",
//               fontSize: "clamp(38px, 5vw, 64px)",
//               fontWeight: 400,
//               color: "#ffffff",
//               lineHeight: 1.1,
//               margin: 0,
//               animation: "headingReveal 0.7s 0.1s ease both",
//             }}
//           >
//             Redefining the Standard{" "}
//             <br />
//             <em
//               style={{
//                 color: feat.accent,
//                 transition: "color 0.6s ease",
//                 fontStyle: "italic",
//               }}
//             >
//               of Premium Care
//             </em>
//           </h2>

//           <p
//             style={{
//               color: "rgba(255,255,255,0.4)",
//               fontSize: "16px",
//               fontWeight: 300,
//               maxWidth: "520px",
//               margin: "20px auto 0",
//               lineHeight: 1.7,
//               animation: "fadeSlideUp 0.7s 0.2s ease both",
//             }}
//           >
//             A high-definition look into our core clinical strengths, certified
//             workflows, and advanced medical technology infrastructure.
//           </p>
//         </div>

//         {/* ── MAIN CONTENT GRID ── */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "1fr 480px",
//             gap: "40px",
//             alignItems: "start",
//           }}
//         >
//           {/* LEFT — Feature List */}
//           <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
//             {features.map((f, idx) => {
//               const isActive = idx === active;
//               return (
//                 <div
//                   key={f.id}
//                   className={`feat-item${isActive ? " selected" : ""}`}
//                   onClick={() => goTo(idx)}
//                   style={{
//                     position: "relative",
//                     display: "flex",
//                     alignItems: "flex-start",
//                     gap: "20px",
//                     padding: "22px 24px",
//                     borderRadius: "16px",
//                     border: isActive
//                       ? `1px solid ${f.accent}40`
//                       : "1px solid rgba(255,255,255,0.04)",
//                     background: isActive
//                       ? `linear-gradient(135deg, ${f.accentDim}, rgba(255,255,255,0.02))`
//                       : "transparent",
//                     overflow: "hidden",
//                   }}
//                 >
//                   {/* Accent left bar */}
//                   <div
//                     style={{
//                       position: "absolute",
//                       left: 0,
//                       top: "20%",
//                       bottom: "20%",
//                       width: "3px",
//                       borderRadius: "0 3px 3px 0",
//                       background: f.accent,
//                       opacity: isActive ? 1 : 0,
//                       transition: "opacity 0.3s",
//                     }}
//                   />

//                   {/* Number badge */}
//                   <div
//                     style={{
//                       minWidth: "44px",
//                       height: "44px",
//                       borderRadius: "12px",
//                       border: isActive
//                         ? `1px solid ${f.accent}50`
//                         : "1px solid rgba(255,255,255,0.08)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       background: isActive ? `${f.accent}18` : "rgba(255,255,255,0.03)",
//                       transition: "all 0.3s",
//                     }}
//                   >
//                     <span
//                       style={{
//                         fontFamily: "'DM Serif Display', serif",
//                         fontSize: "15px",
//                         color: isActive ? f.accent : "rgba(255,255,255,0.3)",
//                         transition: "color 0.3s",
//                       }}
//                     >
//                       {f.number}
//                     </span>
//                   </div>

//                   {/* Text */}
//                   <div style={{ flex: 1 }}>
//                     {/* Tag */}
//                     {isActive && (
//                       <div
//                         style={{
//                           fontSize: "10px",
//                           fontWeight: 600,
//                           letterSpacing: "0.14em",
//                           color: f.accent,
//                           marginBottom: "6px",
//                           animation: "fadeSlideRight 0.4s ease both",
//                         }}
//                       >
//                         {f.tag}
//                       </div>
//                     )}
//                     <h3
//                       style={{
//                         margin: 0,
//                         fontSize: isActive ? "17px" : "15px",
//                         fontWeight: isActive ? 500 : 400,
//                         color: isActive ? "#ffffff" : "rgba(255,255,255,0.45)",
//                         lineHeight: 1.4,
//                         transition: "all 0.3s",
//                       }}
//                     >
//                       {f.title}
//                     </h3>

//                     {/* Expandable summary */}
//                     <div
//                       style={{
//                         maxHeight: isActive ? "100px" : "0",
//                         overflow: "hidden",
//                         opacity: isActive ? 1 : 0,
//                         transition: "max-height 0.5s ease, opacity 0.4s ease",
//                       }}
//                     >
//                       <p
//                         style={{
//                           margin: "10px 0 0",
//                           fontSize: "13.5px",
//                           color: "rgba(255,255,255,0.45)",
//                           lineHeight: 1.65,
//                           fontWeight: 300,
//                           animation: isActive
//                             ? "fadeSlideRight 0.5s 0.1s ease both"
//                             : "none",
//                         }}
//                       >
//                         {f.summary}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Metric (active) */}
//                   {isActive && (
//                     <div
//                       style={{
//                         textAlign: "right",
//                         animation: "fadeSlideRight 0.45s 0.05s ease both",
//                       }}
//                     >
//                       <div
//                         style={{
//                           fontFamily: "'DM Serif Display', serif",
//                           fontSize: "26px",
//                           color: f.accent,
//                           lineHeight: 1,
//                         }}
//                       >
//                         {f.metric}
//                       </div>
//                       <div
//                         style={{
//                           fontSize: "10px",
//                           color: "rgba(255,255,255,0.3)",
//                           fontWeight: 500,
//                           letterSpacing: "0.08em",
//                           marginTop: "4px",
//                           textTransform: "uppercase",
//                         }}
//                       >
//                         {f.label}
//                       </div>
//                     </div>
//                   )}

//                   {/* Progress bar at bottom of active item */}
//                   {isActive && (
//                     <div
//                       style={{
//                         position: "absolute",
//                         bottom: 0,
//                         left: 0,
//                         height: "2px",
//                         width: `${progress}%`,
//                         background: `linear-gradient(90deg, ${f.accent}80, ${f.accent})`,
//                         borderRadius: "0 0 16px 16px",
//                         transition: "width 0.1s linear",
//                       }}
//                     />
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* RIGHT — Cinematic Image Panel */}
//           <div
//             style={{
//               position: "sticky",
//               top: "40px",
//               height: "620px",
//               borderRadius: "24px",
//               overflow: "hidden",
//               border: "1px solid rgba(255,255,255,0.07)",
//               background: "#0a0f1c",
//             }}
//           >
//             {/* Image with transition */}
//             <div
//               key={active}
//               style={{
//                 position: "absolute",
//                 inset: 0,
//                 animation: "imgReveal 0.8s cubic-bezier(0.4,0,0.2,1) both",
//               }}
//             >
//               <img
//                 src={feat.image}
//                 alt={feat.title}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                   objectPosition: "center",
//                 }}
//               />
//               {/* Multi-layer overlay */}
//               <div
//                 style={{
//                   position: "absolute",
//                   inset: 0,
//                   background: `linear-gradient(
//                     to bottom,
//                     rgba(5,10,20,0.25) 0%,
//                     rgba(5,10,20,0.1) 40%,
//                     rgba(5,10,20,0.75) 75%,
//                     rgba(5,10,20,0.95) 100%
//                   )`,
//                 }}
//               />
//               {/* Accent color tint */}
//               <div
//                 style={{
//                   position: "absolute",
//                   inset: 0,
//                   background: `radial-gradient(ellipse at 80% 20%, ${feat.accent}20 0%, transparent 60%)`,
//                   transition: "background 0.8s ease",
//                   mixBlendMode: "screen",
//                 }}
//               />
//             </div>

//             {/* Scan line effect */}
//             <div
//               style={{
//                 position: "absolute",
//                 left: 0,
//                 right: 0,
//                 height: "1px",
//                 background: `linear-gradient(90deg, transparent, ${feat.accent}60, transparent)`,
//                 animation: "scanLine 4s linear infinite",
//                 pointerEvents: "none",
//               }}
//             />

//             {/* Top HUD */}
//             <div
//               style={{
//                 position: "absolute",
//                 top: "20px",
//                 left: "20px",
//                 right: "20px",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 zIndex: 2,
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "8px",
//                   background: "rgba(5,10,20,0.6)",
//                   backdropFilter: "blur(12px)",
//                   border: "1px solid rgba(255,255,255,0.1)",
//                   borderRadius: "100px",
//                   padding: "7px 14px",
//                 }}
//               >
//                 <span
//                   style={{
//                     width: "7px",
//                     height: "7px",
//                     borderRadius: "50%",
//                     background: "#ef4444",
//                     animation: "pulse 1.5s infinite",
//                   }}
//                 />
//                 <span
//                   style={{
//                     fontSize: "11px",
//                     color: "rgba(255,255,255,0.7)",
//                     fontWeight: 500,
//                     letterSpacing: "0.08em",
//                   }}
//                 >
//                   LIVE
//                 </span>
//               </div>

//               {/* Dot navigation */}
//               <div style={{ display: "flex", gap: "6px" }}>
//                 {features.map((f, i) => (
//                   <button
//                     key={i}
//                     onClick={() => goTo(i)}
//                     style={{
//                       width: i === active ? "24px" : "7px",
//                       height: "7px",
//                       borderRadius: "100px",
//                       background: i === active ? f.accent : "rgba(255,255,255,0.2)",
//                       border: "none",
//                       cursor: "pointer",
//                       transition: "all 0.35s ease",
//                       padding: 0,
//                     }}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Bottom content */}
//             <div
//               key={`bottom-${active}`}
//               style={{
//                 position: "absolute",
//                 bottom: 0,
//                 left: 0,
//                 right: 0,
//                 padding: "28px",
//                 zIndex: 2,
//                 animation: "fadeSlideUp 0.6s 0.15s ease both",
//               }}
//             >
//               <div
//                 style={{
//                   fontSize: "10px",
//                   fontWeight: 600,
//                   letterSpacing: "0.16em",
//                   color: feat.accent,
//                   marginBottom: "10px",
//                   textTransform: "uppercase",
//                   transition: "color 0.5s",
//                 }}
//               >
//                 {feat.tag}
//               </div>

//               <h4
//                 style={{
//                   fontFamily: "'DM Serif Display', serif",
//                   fontSize: "22px",
//                   fontWeight: 400,
//                   color: "#ffffff",
//                   margin: "0 0 16px",
//                   lineHeight: 1.3,
//                 }}
//               >
//                 {feat.title}
//               </h4>

//               {/* Metric strip */}
//               <div
//                 style={{
//                   display: "flex",
//                   gap: "20px",
//                   paddingTop: "16px",
//                   borderTop: "1px solid rgba(255,255,255,0.1)",
//                 }}
//               >
//                 <div>
//                   <div
//                     style={{
//                       fontFamily: "'DM Serif Display', serif",
//                       fontSize: "32px",
//                       color: feat.accent,
//                       lineHeight: 1,
//                       transition: "color 0.5s",
//                     }}
//                   >
//                     {feat.metric}
//                   </div>
//                   <div
//                     style={{
//                       fontSize: "10px",
//                       color: "rgba(255,255,255,0.35)",
//                       fontWeight: 500,
//                       letterSpacing: "0.1em",
//                       marginTop: "4px",
//                       textTransform: "uppercase",
//                     }}
//                   >
//                     {feat.label}
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     width: "1px",
//                     background: "rgba(255,255,255,0.1)",
//                     alignSelf: "stretch",
//                   }}
//                 />
//                 <div style={{ flex: 1 }}>
//                   <div
//                     style={{
//                       fontSize: "12.5px",
//                       color: "rgba(255,255,255,0.45)",
//                       lineHeight: 1.55,
//                       fontWeight: 300,
//                     }}
//                   >
//                     {feat.summary.split(" ").slice(0, 18).join(" ")}…
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Corner accents */}
//             <div style={{ position: "absolute", top: 16, left: 16, width: 20, height: 20, borderTop: `2px solid ${feat.accent}80`, borderLeft: `2px solid ${feat.accent}80`, borderRadius: "4px 0 0 0", transition: "border-color 0.5s", pointerEvents: "none" }} />
//             <div style={{ position: "absolute", top: 16, right: 16, width: 20, height: 20, borderTop: `2px solid ${feat.accent}80`, borderRight: `2px solid ${feat.accent}80`, borderRadius: "0 4px 0 0", transition: "border-color 0.5s", pointerEvents: "none" }} />
//             <div style={{ position: "absolute", bottom: 16, left: 16, width: 20, height: 20, borderBottom: `2px solid ${feat.accent}80`, borderLeft: `2px solid ${feat.accent}80`, borderRadius: "0 0 0 4px", transition: "border-color 0.5s", pointerEvents: "none" }} />
//             <div style={{ position: "absolute", bottom: 16, right: 16, width: 20, height: 20, borderBottom: `2px solid ${feat.accent}80`, borderRight: `2px solid ${feat.accent}80`, borderRadius: "0 0 4px 0", transition: "border-color 0.5s", pointerEvents: "none" }} />
//           </div>
//         </div>

//         {/* Bottom CTA */}
//         <div style={{ textAlign: "center", marginTop: "64px" }}>
//           <a
//             href="#details"
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: "10px",
//               padding: "14px 32px",
//               borderRadius: "100px",
//               border: `1px solid ${feat.accent}50`,
//               background: `${feat.accent}12`,
//               color: feat.accent,
//               fontSize: "14px",
//               fontWeight: 500,
//               textDecoration: "none",
//               letterSpacing: "0.03em",
//               transition: "all 0.3s ease",
//             }}
//           >
//             Explore All Clinical Services
//             <span style={{ fontSize: "18px", lineHeight: 1 }}>→</span>
//           </a>
//         </div>

//       </div>
//     </section>
//   );
// }