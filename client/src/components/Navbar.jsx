// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiMenu, FiX, FiCalendar, FiChevronDown, FiPhoneCall } from "react-icons/fi";
// import { MdLocalHospital } from "react-icons/md";

// // ── NAV LINKS ─────────────────────────────────────────────────────────────────
// // "page" property → navigates to a new page via onNavigate prop
// // "href" property → scrolls to section on same page
// // "isDropdown" → shows dropdown with sub-links
// const navLinks = [
//   { name: "Home",               page: "home" },
//   { name: "About",              page: "about" },
//   { name: "Doctors",            page: "doctors" },
//   { name: "Services",           page: "services" },
//   {
//     name: "Resources",
//     isDropdown: true,
//     align: "right",
//     dropdownItems: [
//       { name: "Patient Reviews",        href: "#reviews" },
//       { name: "Gallery",                href: "#gallery" },
//       { name: "Blog & Health Articles", href: "#blog" },
//       { name: "FAQ",                    href: "#faq" },
//       { name: "Insurance Information",  href: "#insurance" },
//       { name: "Careers / Jobs",         href: "#careers" },
//     ],
//   },
//   { name: "Online Consultation", page: "online-consultation" },
//   { name: "Contact Us",          page: "contact" },
// ];

// // ── NAVBAR COMPONENT ──────────────────────────────────────────────────────────
// export default function Navbar({ onNavigate, onBookAppointment }) {
//   const [scrolled,           setScrolled]           = useState(false);
//   const [mobileOpen,         setMobileOpen]         = useState(false);
//   const [activeDropdown,     setActiveDropdown]     = useState(null);
//   const [mobileDropdownOpen, setMobileDropdownOpen] = useState({});

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // Handles hash-based same-page scrolling
//   const handleNavigation = (href) => {
//     setMobileOpen(false);
//     setActiveDropdown(null);
//     if (onNavigate) {
//       onNavigate("home");
//     }
//     window.location.href = href;
//   };

//   // Handles page-level navigation (Home → Services, etc.)
//   const handlePageNav = (page) => {
//     setMobileOpen(false);
//     setActiveDropdown(null);
//     if (onNavigate) onNavigate(page);
//   };

//   const toggleMobileDropdown = (index) => {
//     setMobileDropdownOpen((prev) => ({ ...prev, [index]: !prev[index] }));
//   };

//   return (
//     <>
//       {/* ── Styles ── */}
//       <style>{`
//         .floating-glitter-glass {
//           background: linear-gradient(
//             135deg,
//             rgba(255,255,255,0.4) 0%,
//             rgba(239,246,255,0.25) 30%,
//             rgba(253,242,248,0.3) 70%,
//             rgba(255,255,255,0.5) 100%
//           ) !important;
//           backdrop-filter: blur(16px) saturate(180%) !important;
//           -webkit-backdrop-filter: blur(16px) saturate(180%) !important;
//           border: 1.5px solid rgba(255,255,255,0.6) !important;
//           border-top: 1.5px solid rgba(255,255,255,0.8) !important;
//           box-shadow:
//             0 10px 40px -10px rgba(37,99,235,0.12),
//             inset 0 1px 4px rgba(255,255,255,0.7),
//             inset 0 -2px 10px rgba(236,72,153,0.05) !important;
//         }
//         .floating-glitter-glass::before {
//           content: '';
//           position: absolute;
//           inset: 0;
//           border-radius: inherit;
//           background: linear-gradient(
//             115deg,
//             transparent 30%,
//             rgba(255,255,255,0.5) 48%,
//             rgba(255,255,255,0.7) 50%,
//             rgba(255,255,255,0.5) 52%,
//             transparent 70%
//           );
//           background-size: 200% 100%;
//           transform: translateX(-100%);
//           animation: dynamicGlitter 6s infinite linear;
//           pointer-events: none;
//           z-index: 1;
//         }
//         @keyframes dynamicGlitter {
//           0%   { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }
//         .colorful-dropdown-card {
//           position: relative;
//           background: linear-gradient(
//             135deg,
//             rgba(224,242,254,0.95) 0%,
//             rgba(243,232,255,0.95) 50%,
//             rgba(252,231,243,0.95) 100%
//           ) !important;
//           backdrop-filter: blur(20px) !important;
//           -webkit-backdrop-filter: blur(20px) !important;
//           border: 1.5px solid rgba(255,255,255,0.8) !important;
//           box-shadow:
//             0 20px 40px -10px rgba(37,99,235,0.2),
//             0 10px 20px -5px rgba(168,85,247,0.15) !important;
//         }
//         .colorful-dropdown-card::before {
//           content: '';
//           position: absolute;
//           top: 0; left: 0;
//           width: 200%; height: 100%;
//           background: linear-gradient(
//             120deg,
//             transparent 35%,
//             rgba(255,255,255,0.7) 45%,
//             rgba(255,255,255,0.9) 50%,
//             rgba(255,255,255,0.7) 55%,
//             transparent 65%
//           );
//           transform: translateX(-100%);
//           animation: dropdownShinyEffect 4s infinite ease-in-out;
//           pointer-events: none;
//           z-index: 2;
//         }
//         @keyframes dropdownShinyEffect {
//           0%      { transform: translateX(-100%); }
//           80%,100%{ transform: translateX(100%); }
//         }
//         .btn-crystal-nav {
//           background: linear-gradient(135deg, rgba(37,99,235,0.9) 0%, rgba(29,78,216,0.95) 100%) !important;
//           box-shadow: 0 4px 14px rgba(37,99,235,0.25), inset 0 1px 2px rgba(255,255,255,0.3) !important;
//           border: 1px solid rgba(255,255,255,0.2) !important;
//           transition: all 0.3s cubic-bezier(0.16,1,0.3,1) !important;
//         }
//         .btn-crystal-nav:hover {
//           transform: translateY(-1px) !important;
//           box-shadow: 0 6px 20px rgba(37,99,235,0.35), 0 0 10px rgba(16,185,129,0.2) !important;
//         }
//         .btn-emergency {
//           background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;
//           box-shadow: 0 4px 14px rgba(239,68,68,0.3) !important;
//         }
//       `}</style>

//       <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full flex flex-col items-center p-4 sm:p-5">
//         <motion.nav
//           initial={{ y: -100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//           className={`w-full max-w-7xl rounded-2xl transition-all duration-500 relative ${
//             scrolled ? "floating-glitter-glass" : "bg-transparent border border-transparent"
//           }`}
//         >
//           {scrolled && (
//             <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_80%_50%,rgba(236,72,153,0.12),transparent_35%)] pointer-events-none" />
//           )}

//           <div className="px-4 sm:px-6 lg:px-8 relative z-10">
//             <div className="flex items-center justify-between h-18 sm:h-20 gap-4">

//               {/* ── Logo ── */}
//               <motion.div
//                 whileHover={{ scale: 1.01 }}
//                 onClick={() => handlePageNav("home")}
//                 className="flex items-center gap-3 cursor-pointer shrink-0 z-20"
//               >
//                 <div className="relative">
//                   <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center shadow-[0_3px_10px_rgba(37,99,235,0.2)] border border-white/30">
//                     <MdLocalHospital className="text-white text-lg" />
//                   </div>
//                   <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse border border-white" />
//                 </div>
//                 <div>
//                   <span className="text-slate-900 font-display font-extrabold text-base md:text-lg tracking-tight">
//                     Premium<span className="text-blue-600"> Clinic</span>
//                   </span>
//                   <p className="text-slate-500/90 text-[10px] font-bold tracking-widest uppercase -mt-1">
//                     Advanced Healthcare
//                   </p>
//                 </div>
//               </motion.div>

//               {/* ── Desktop Nav Links ── */}
//               <div className="hidden lg:flex items-center justify-center flex-1 gap-1 px-2 z-10">
//                 {navLinks.map((link, i) => (
//                   <div
//                     key={link.name}
//                     className="relative inline-block"
//                     onMouseEnter={() => link.isDropdown && setActiveDropdown(i)}
//                     onMouseLeave={() => link.isDropdown && setActiveDropdown(null)}
//                   >
//                     {/* ── Page-level link (e.g. Services) ── */}
//                     {link.page ? (
//                       <button
//                         onClick={() => handlePageNav(link.page)}
//                         className="relative px-2.5 py-2 text-slate-800 hover:text-blue-600 text-[0.82rem] xl:text-[0.9rem] font-bold transition-colors duration-200 group flex items-center whitespace-nowrap"
//                       >
//                         <span className="relative z-10">{link.name}</span>
//                         <span className="absolute inset-0.5 rounded-xl bg-white/0 group-hover:bg-white/70 border border-transparent group-hover:border-white/50 transition-all duration-300 z-0" />
//                         <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-2/5 h-0.5 bg-gradient-to-r from-sky-500 to-pink-500 rounded-full transition-all duration-300" />
//                       </button>

//                     ) : !link.isDropdown ? (
//                       /* ── Hash anchor link ── */
//                       <a
//                         href={link.href}
//                         onClick={(e) => {
//                           e.preventDefault();
//                           handleNavigation(link.href);
//                         }}
//                         className="relative px-2.5 py-2 text-slate-800 hover:text-blue-600 text-[0.82rem] xl:text-[0.9rem] font-bold transition-colors duration-200 group flex items-center whitespace-nowrap"
//                       >
//                         <span className="relative z-10">{link.name}</span>
//                         <span className="absolute inset-0.5 rounded-xl bg-white/0 group-hover:bg-white/70 border border-transparent group-hover:border-white/50 transition-all duration-300 z-0" />
//                         <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-2/5 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-300" />
//                       </a>

//                     ) : (
//                       /* ── Dropdown link ── */
//                       <>
//                         <button className="relative px-2.5 py-2 text-slate-800 hover:text-blue-600 text-[0.82rem] xl:text-[0.9rem] font-bold transition-colors duration-200 group flex items-center gap-0.5 whitespace-nowrap">
//                           <span className="relative z-10">{link.name}</span>
//                           <FiChevronDown className={`transition-transform duration-300 ${activeDropdown === i ? "rotate-180" : ""}`} />
//                           <span className="absolute inset-0.5 rounded-xl bg-white/0 group-hover:bg-white/70 border border-transparent group-hover:border-white/50 transition-all duration-300 z-0" />
//                         </button>

//                         <AnimatePresence>
//                           {activeDropdown === i && (
//                             <motion.div
//                               initial={{ opacity: 0, y: 10 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               exit={{ opacity: 0, y: 10 }}
//                               transition={{ duration: 0.2 }}
//                               className={`absolute top-full pt-2 min-w-[260px] z-50 ${
//                                 link.align === "right" ? "right-0" : "left-0"
//                               }`}
//                             >
//                               <div className="colorful-dropdown-card rounded-xl p-2 overflow-hidden w-full">
//                                 <div className="relative z-10 flex flex-col gap-0.5">
//                                   {link.dropdownItems.map((subLink) => (
//                                     <a
//                                       key={subLink.name}
//                                       href={subLink.href}
//                                       onClick={(e) => {
//                                         e.preventDefault();
//                                         handleNavigation(subLink.href);
//                                       }}
//                                       className="block px-4 py-2.5 text-sm font-bold text-slate-700 hover:text-blue-700 hover:bg-white/60 rounded-lg transition-all duration-200 text-left"
//                                     >
//                                       {subLink.name}
//                                     </a>
//                                   ))}
//                                 </div>
//                               </div>
//                             </motion.div>
//                           )}
//                         </AnimatePresence>
//                       </>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* ── Desktop CTA Buttons ── */}
//               <div className="hidden lg:flex items-center gap-2 shrink-0 z-20">
//                 <motion.a
//                   whileHover={{ scale: 1.02 }}
//                   href="#emergency"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleNavigation("#emergency");
//                   }}
//                   className="btn-crystal-nav btn-emergency flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-[11px] xl:text-xs font-bold uppercase tracking-wider whitespace-nowrap"
//                 >
//                   <FiPhoneCall className="animate-bounce" />
//                   SOS Emergency
//                 </motion.a>

//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => onBookAppointment ? onBookAppointment() : handleNavigation("#booking")}
//                   className="btn-crystal-nav flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white text-xs xl:text-sm font-bold whitespace-nowrap"
//                 >
//                   <FiCalendar className="text-base" />
//                   Book Appointment
//                 </motion.button>
//               </div>

//               {/* ── Mobile Hamburger ── */}
//               <button
//                 className="lg:hidden text-slate-800 p-2 hover:bg-white/60 backdrop-blur-md rounded-xl border border-transparent hover:border-white/50 transition-colors z-20"
//                 onClick={() => setMobileOpen(!mobileOpen)}
//               >
//                 {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
//               </button>
//             </div>
//           </div>

//           {/* ── Mobile Menu ── */}
//           <AnimatePresence>
//             {mobileOpen && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{ duration: 0.3, ease: "easeInOut" }}
//                 className="lg:hidden border-t border-white/40 overflow-hidden bg-white/80 backdrop-blur-2xl"
//               >
//                 <div className="px-6 py-5 flex flex-col gap-1 relative z-10 max-h-[75vh] overflow-y-auto">
//                   {navLinks.map((link, index) => (
//                     <div key={link.name} className="flex flex-col">

//                       {/* Page-level link (Services) */}
//                       {link.page ? (
//                         <button
//                           onClick={() => handlePageNav(link.page)}
//                           className="py-3 text-slate-800 hover:text-blue-600 font-bold border-b border-white/10 text-sm transition-colors text-left flex items-center justify-between"
//                         >
//                           {link.name}
//                           {link.page === "services" && (
//                             <span className="text-[10px] font-bold uppercase tracking-wider text-sky-500 bg-sky-50 px-2 py-0.5 rounded-full">
//                               View All
//                             </span>
//                           )}
//                         </button>

//                       ) : !link.isDropdown ? (
//                         <a
//                           href={link.href}
//                           onClick={(e) => {
//                             e.preventDefault();
//                             handleNavigation(link.href);
//                           }}
//                           className="py-3 text-slate-800 hover:text-blue-600 font-bold border-b border-white/10 text-sm transition-colors block"
//                         >
//                           {link.name}
//                         </a>

//                       ) : (
//                         <div className="flex flex-col border-b border-white/10 py-2">
//                           <button
//                             onClick={() => toggleMobileDropdown(index)}
//                             className="w-full flex items-center justify-between text-slate-800 hover:text-blue-600 font-bold text-sm py-2 text-left"
//                           >
//                             <span>{link.name}</span>
//                             <FiChevronDown
//                               className={`transition-transform duration-200 ${
//                                 mobileDropdownOpen[index] ? "rotate-180" : ""
//                               }`}
//                             />
//                           </button>

//                           <AnimatePresence>
//                             {mobileDropdownOpen[index] && (
//                               <motion.div
//                                 initial={{ opacity: 0, height: 0 }}
//                                 animate={{ opacity: 1, height: "auto" }}
//                                 exit={{ opacity: 0, height: 0 }}
//                                 className="pl-4 flex flex-col gap-1 border-l-2 border-blue-200 mt-1 mb-2 bg-slate-50/40 rounded"
//                               >
//                                 {navLinks[index].dropdownItems.map((subLink) => (
//                                   <a
//                                     key={subLink.name}
//                                     href={subLink.href}
//                                     onClick={(e) => {
//                                       e.preventDefault();
//                                       handleNavigation(subLink.href);
//                                     }}
//                                     className="py-2 text-slate-600 hover:text-blue-600 font-semibold text-sm transition-colors block"
//                                   >
//                                     {subLink.name}
//                                   </a>
//                                 ))}
//                               </motion.div>
//                             )}
//                           </AnimatePresence>
//                         </div>
//                       )}
//                     </div>
//                   ))}

//                   {/* Mobile Actions */}
//                   <div className="flex flex-col gap-2 mt-4">
//                     <a
//                       href="#emergency"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         handleNavigation("#emergency");
//                       }}
//                       className="btn-crystal-nav btn-emergency w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm"
//                     >
//                       <FiPhoneCall /> Emergency Contact
//                     </a>
//                     <button
//                       onClick={() => {
//                         setMobileOpen(false);
//                         if (onBookAppointment) onBookAppointment();
//                         else handleNavigation("#booking");
//                       }}
//                       className="btn-crystal-nav w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm"
//                     >
//                       <FiCalendar /> Book Appointment
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.nav>
//       </div>
//     </>
//   );
// }


import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiCalendar, FiPhoneCall } from "react-icons/fi";
import { MdLocalHospital } from "react-icons/md";

const navLinks = [
  { name: "Home",                page: "home" },
  { name: "About",               page: "about" },
  { name: "Doctors",             page: "doctors" },
  { name: "Services",            page: "services" },
  { name: "Resources",           page: "resources" },
  { name: "Online Consultation", page: "online-consultation" },
  { name: "Contact Us",          page: "contact" },
];

export default function Navbar({ onNavigate, onBookAppointment }) {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handlePageNav = (page) => {
    setMobileOpen(false);
    if (onNavigate) onNavigate(page);
  };

  const handleNavigation = (href) => {
    setMobileOpen(false);
    if (onNavigate) onNavigate("home");
    window.location.href = href;
  };

  return (
    <>
      <style>{`
        .nav-glass {
          background: linear-gradient(135deg,
            rgba(255,255,255,0.45) 0%,
            rgba(239,246,255,0.3) 40%,
            rgba(253,242,248,0.35) 100%
          ) !important;
          backdrop-filter: blur(18px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(18px) saturate(180%) !important;
          border: 1.5px solid rgba(255,255,255,0.65) !important;
          box-shadow: 0 8px 32px -8px rgba(37,99,235,0.10), inset 0 1px 3px rgba(255,255,255,0.7) !important;
        }
        .nav-glass::before {
          content:'';
          position:absolute;inset:0;border-radius:inherit;
          background: linear-gradient(115deg,transparent 30%,rgba(255,255,255,0.55) 49%,rgba(255,255,255,0.75) 50%,rgba(255,255,255,0.55) 51%,transparent 70%);
          background-size:200% 100%;
          transform:translateX(-100%);
          animation:navGlitter 6s infinite linear;
          pointer-events:none;z-index:1;
        }
        @keyframes navGlitter {
          0%   { transform:translateX(-100%); }
          100% { transform:translateX(100%); }
        }
        .btn-book {
          background: linear-gradient(135deg,#2563eb,#1d4ed8) !important;
          box-shadow: 0 4px 14px rgba(37,99,235,0.28), inset 0 1px 2px rgba(255,255,255,0.25) !important;
          border: 1px solid rgba(255,255,255,0.18) !important;
          transition: all 0.25s ease !important;
        }
        .btn-book:hover { transform:translateY(-1px) !important; box-shadow:0 6px 20px rgba(37,99,235,0.38) !important; }
        .btn-sos {
          background: linear-gradient(135deg,#ef4444,#dc2626) !important;
          box-shadow: 0 4px 14px rgba(239,68,68,0.3) !important;
          border: 1px solid rgba(255,255,255,0.18) !important;
        }
        .nav-link-underline::after {
          content:'';
          position:absolute;bottom:2px;left:50%;transform:translateX(-50%);
          width:0;height:2px;border-radius:2px;
          background:linear-gradient(90deg,#0ea5e9,#e91e8c);
          transition:width 0.3s ease;
        }
        .nav-link-underline:hover::after { width:55%; }
      `}</style>

      {/* Fixed wrapper — full width, no overflow */}
      <div className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`relative rounded-2xl transition-all duration-500 ${scrolled ? "nav-glass" : "bg-transparent"}`}
        >
          {scrolled && (
            <div className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none"
              style={{ background:"radial-gradient(circle at 15% 50%,rgba(59,130,246,0.15),transparent 40%),radial-gradient(circle at 85% 50%,rgba(236,72,153,0.12),transparent 40%)" }} />
          )}

          <div className="relative z-10 flex items-center h-[60px] sm:h-[68px] px-4 sm:px-5 lg:px-6 gap-4">

            {/* ── Logo ── */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => handlePageNav("home")}
              className="flex items-center gap-2.5 cursor-pointer shrink-0"
            >
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center shadow-md border border-white/30">
                  <MdLocalHospital className="text-white text-lg" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse border-2 border-white" />
              </div>
              <div className="hidden sm:block leading-none">
                <p className="text-slate-900 font-extrabold text-[1rem] tracking-tight leading-tight">
                  Premium<span className="text-blue-600"> Clinic</span>
                </p>
                <p className="text-slate-400 text-[9px] font-bold tracking-widest uppercase mt-0.5">
                  Advanced Healthcare
                </p>
              </div>
            </motion.div>

            {/* ── Desktop Nav Links — centered, shrinkable ── */}
            <div className="hidden lg:flex flex-1 items-center justify-center min-w-0 px-2">
              <div className="flex items-center gap-0.5 xl:gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handlePageNav(link.page)}
                    className="nav-link-underline relative px-2 xl:px-2.5 py-2 text-slate-800 hover:text-blue-600 font-bold transition-colors duration-200 whitespace-nowrap"
                    style={{ fontSize: "clamp(0.72rem, 1vw, 0.88rem)" }}
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Desktop CTAs ── */}
            <div className="hidden lg:flex items-center gap-2 shrink-0 ml-auto">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#emergency"
                onClick={(e) => { e.preventDefault(); handleNavigation("#emergency"); }}
                className="btn-sos flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-[11px] xl:text-xs font-bold uppercase tracking-wide whitespace-nowrap"
              >
                <FiPhoneCall className="animate-bounce shrink-0" size={13} />
                SOS Emergency
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onBookAppointment ? onBookAppointment() : handleNavigation("#booking")}
                className="btn-book flex items-center gap-1.5 px-3 xl:px-4 py-2.5 rounded-xl text-white text-xs xl:text-sm font-bold whitespace-nowrap"
              >
                <FiCalendar size={14} className="shrink-0" />
                Book Appointment
              </motion.button>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              className="lg:hidden ml-auto p-2 rounded-xl text-slate-800 hover:bg-white/60 border border-transparent hover:border-white/40 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>

          {/* ── Mobile Menu ── */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="lg:hidden border-t border-white/30 overflow-hidden bg-white/85 backdrop-blur-2xl rounded-b-2xl"
              >
                <div className="px-5 py-4 flex flex-col gap-0.5 max-h-[75vh] overflow-y-auto">
                  {navLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => handlePageNav(link.page)}
                      className="py-3 text-left text-slate-800 hover:text-blue-600 font-bold text-sm border-b border-slate-100 last:border-0 transition-colors"
                    >
                      {link.name}
                    </button>
                  ))}
                  <div className="flex flex-col gap-2 mt-4 pb-1">
                    <a
                      href="#emergency"
                      onClick={(e) => { e.preventDefault(); handleNavigation("#emergency"); }}
                      className="btn-sos w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm"
                    >
                      <FiPhoneCall /> Emergency Contact
                    </a>
                    <button
                      onClick={() => { setMobileOpen(false); onBookAppointment ? onBookAppointment() : handleNavigation("#booking"); }}
                      className="btn-book w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm"
                    >
                      <FiCalendar /> Book Appointment
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
}
