import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiCalendar, FiPhoneCall, FiChevronDown, FiUser } from "react-icons/fi";
import { MdLocalHospital } from "react-icons/md";

export default function Navbar({ onBookAppointment }) {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileActiveDrop, setMobileActiveDrop] = useState(null);
  const [userRole,       setUserRole]       = useState(() => localStorage.getItem("vph_user_role"));
  const [userMenuOpen,   setUserMenuOpen]   = useState(false);
  const navigate = useNavigate();
  const isPortal = window.location.pathname.startsWith("/admin-secure-portal-gate-x99") || 
                   window.location.pathname.startsWith("/doctor-portal") || 
                   window.location.pathname.startsWith("/staff-reception-terminal-y77") || 
                   window.location.pathname.startsWith("/patient-portal");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Poll local storage to dynamically update role changes
  useEffect(() => {
    const interval = setInterval(() => {
      const currentRole = localStorage.getItem("vph_user_role");
      if (currentRole !== userRole) {
        setUserRole(currentRole);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [userRole]);

  const handlePageNav = (path, isLogout) => {
    setMobileOpen(false);
    if (isLogout) {
      localStorage.clear();
      setUserRole(null);
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  const handleBookClick = () => {
    setMobileOpen(false);
    if (onBookAppointment) {
      onBookAppointment();
    }
    navigate("/book-appointment");
  };

  let dynamicLinks = [];
  if (isPortal) {
    dynamicLinks = [
      { name: "Public Website", path: "/" },
      ...(userRole === "admin" ? [{ name: "Admin Dashboard", path: "/admin-secure-portal-gate-x99" }] : []),
      ...(userRole === "doctor" ? [{ name: "Doctor Portal", path: "/doctor-portal" }] : []),
      ...(userRole === "receptionist" ? [{ name: "Staff Desk", path: "/staff-reception-terminal-y77" }] : []),
      ...(userRole === "patient" ? [{ name: "Patient Portal", path: "/patient-portal" }] : []),
      { name: "Logout", path: "/login", isLogout: true }
    ];
  } else {
    dynamicLinks = [
      { name: "Home",                path: "/" },
      { name: "About",               path: "/about" },
      { name: "Doctors",             path: "/doctors" },
      { name: "Services",            path: "/services" },
      {
        name: "Resources",
        isDropdown: true,
        dropdownItems: [
          ...(userRole !== "doctor" ? [{ name: "Equipment Store", path: "/shop" }] : []),
          { name: "Gallery",                path: "/gallery" },
          { name: "Insurance Info",         path: "/insurance" },
          { name: "FAQ",                    path: "/faq" },
          { name: "Careers / Jobs",         path: "/careers" },
          { name: "Blog & Health Articles", path: "/blog" },
          { name: "Patient Reviews",        path: "/reviews" },
        ],
      },
      { name: "Online Consult",      path: "/online-consultation" },
      { name: "Contact Us",          path: "/contact" },
    ];

    if (userRole) {
      if (userRole === "patient") {
        dynamicLinks.push({ name: "Patient Portal", path: "/patient-portal" });
      } else if (userRole === "doctor") {
        dynamicLinks.push({ name: "Doctor Portal", path: "/doctor-portal" });
      } else if (userRole === "admin") {
        dynamicLinks.push({ name: "Admin Panel", path: "/admin-secure-portal-gate-x99" });
      } else if (userRole === "receptionist") {
        dynamicLinks.push({ name: "Staff Desk", path: "/staff-reception-terminal-y77" });
      }
      dynamicLinks.push({ name: "Logout", path: "/login", isLogout: true });
    } else {
      dynamicLinks.push({
        name: "Login / Signup",
        isDropdown: true,
        dropdownItems: [
          { name: "Patient Login", path: "/login" },
          { name: "Join as Doctor", path: "/signup" }
        ]
      });
    }
  }

  return (
    <>
      <style>{`
        .nav-glass-top {
          background: #ffffff !important;
          border: 1.2px solid #e2e8f0 !important;
          box-shadow: 0 4px 20px -6px rgba(0, 0, 0, 0.05) !important;
        }
        .nav-glass {
          background: #ffffff !important;
          border: 1.5px solid #e2e8f0 !important;
          box-shadow: 0 8px 32px -8px rgba(37,99,235,0.08) !important;
          position: relative;
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
        .dropdown-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
      `}</style>
 
      <div className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`relative rounded-2xl transition-all duration-500 ${scrolled ? "nav-glass" : "nav-glass-top"}`}
        >
          {scrolled && (
            <div className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none"
              style={{ background:"radial-gradient(circle at 15% 50%,rgba(59,130,246,0.15),transparent 40%),radial-gradient(circle at 85% 50%,rgba(236,72,153,0.12),transparent 40%)" }} />
          )}
 
          <div className="relative z-10 flex items-center h-[60px] sm:h-[68px] px-3 sm:px-4 lg:px-5 gap-2 lg:gap-2.5 xl:gap-4">
 
            {/* ── Logo ── */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => handlePageNav("/", false)}
              className="flex items-center gap-2 cursor-pointer shrink-0"
            >
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center shadow-md border border-white/30">
                  <MdLocalHospital className="text-white text-base" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-pulse border-2 border-white" />
              </div>
              <div className="hidden sm:block leading-none text-left">
                <p className="text-slate-900 font-extrabold text-[1.08rem] tracking-tight leading-tight">
                  Vital Physio<span className="text-blue-600"> Hub</span>
                </p>
                <p className="text-slate-400 text-[8.5px] font-bold tracking-widest uppercase mt-0.5">
                  Physical Therapy & Rehab
                </p>
              </div>
            </motion.div>
 
            {/* ── Desktop Nav Links — centered, shrinkable ── */}
            <div className="hidden lg:flex flex-1 items-center justify-center min-w-0 px-1">
              <div className="flex items-center gap-0.5 lg:gap-1 xl:gap-1.5">
                {dynamicLinks.map((link, idx) => (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => link.isDropdown && setActiveDropdown(idx)}
                    onMouseLeave={() => link.isDropdown && setActiveDropdown(null)}
                  >
                    {link.isDropdown ? (
                      <>
                        <button
                          className="nav-link-underline relative px-1.2 lg:px-1.5 py-2 text-slate-800 hover:text-blue-600 font-bold transition-colors duration-200 whitespace-nowrap flex items-center gap-0.5 bg-transparent border-none cursor-pointer"
                          style={{ fontSize: "clamp(0.66rem, 0.8vw, 0.8rem)" }}
                        >
                          {link.name}
                          <FiChevronDown size={11} className={`transition-transform duration-200 ${activeDropdown === idx ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === idx && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 min-w-[200px]"
                            >
                              <div className="dropdown-card rounded-xl p-2 flex flex-col gap-0.5">
                                {link.dropdownItems.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    to={subItem.path}
                                    className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors block text-left"
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      link.isLogout ? (
                        <button
                          onClick={() => handlePageNav(link.path, true)}
                          className="nav-link-underline relative px-1.2 lg:px-1.5 py-2 text-slate-800 hover:text-blue-600 font-bold transition-colors duration-200 whitespace-nowrap block bg-transparent border-none cursor-pointer"
                          style={{ fontSize: "clamp(0.66rem, 0.8vw, 0.8rem)" }}
                        >
                          {link.name}
                        </button>
                      ) : (
                        <Link
                          to={link.path}
                          className="nav-link-underline relative px-1.2 lg:px-1.5 py-2 text-slate-800 hover:text-blue-600 font-bold transition-colors duration-200 whitespace-nowrap block no-underline"
                          style={{ fontSize: "clamp(0.66rem, 0.8vw, 0.8rem)" }}
                        >
                          {link.name}
                        </Link>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
 
            {/* ── Desktop CTAs ── */}
            {!isPortal && (
              <div className="hidden lg:flex items-center gap-2 shrink-0 ml-auto">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/emergency")}
                  className="btn-sos flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-[11px] xl:text-xs font-bold uppercase tracking-wide whitespace-nowrap border-none cursor-pointer"
                >
                  <FiPhoneCall className="animate-bounce shrink-0" size={13} />
                  SOS EMERGENCY
                </motion.button>
 
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleBookClick}
                  className="btn-book flex items-center gap-1.5 px-3 xl:px-4 py-2.5 rounded-xl text-white text-xs xl:text-sm font-bold whitespace-nowrap cursor-pointer"
                >
                  <FiCalendar size={14} className="shrink-0" />
                  Book Appointment
                </motion.button>
              </div>
            )}
 
            {/* ── Mobile Hamburger ── */}
            <button
              className="lg:hidden ml-auto p-2 rounded-xl text-slate-800 hover:bg-white/60 border border-transparent hover:border-white/40 transition-all cursor-pointer"
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
                <div className="px-5 py-4 flex flex-col gap-0.5 max-h-[75vh] overflow-y-auto text-left">
                  {dynamicLinks.map((link) => (
                    <div key={link.name} className="flex flex-col">
                      {link.isDropdown ? (
                        <>
                          <button
                            onClick={() => setMobileActiveDrop(mobileActiveDrop === link.name ? null : link.name)}
                            className="py-3 text-slate-800 hover:text-blue-600 font-bold text-sm border-b border-slate-100 flex items-center justify-between bg-transparent border-none cursor-pointer"
                          >
                            <span>{link.name}</span>
                            <FiChevronDown className={`transition-transform duration-200 ${mobileActiveDrop === link.name ? "rotate-180" : ""}`} />
                          </button>
                          <AnimatePresence>
                            {mobileActiveDrop === link.name && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pl-4 flex flex-col gap-1 border-l-2 border-blue-200 mt-1 mb-2 bg-slate-50/55 rounded"
                              >
                                {link.dropdownItems.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    to={subItem.path}
                                    onClick={() => setMobileOpen(false)}
                                    className="py-2 text-slate-600 hover:text-blue-600 font-semibold text-sm block no-underline"
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        link.isLogout ? (
                          <button
                            onClick={() => handlePageNav(link.path, true)}
                            className="py-3 text-slate-800 hover:text-blue-600 font-bold text-sm border-b border-slate-100 last:border-0 block w-full text-left bg-transparent border-none cursor-pointer"
                          >
                            {link.name}
                          </button>
                        ) : (
                          <Link
                            to={link.path}
                            onClick={() => setMobileOpen(false)}
                            className="py-3 text-slate-800 hover:text-blue-600 font-bold text-sm border-b border-slate-100 last:border-0 block no-underline"
                          >
                            {link.name}
                          </Link>
                        )
                      )}
                    </div>
                  ))}
                  <div className="flex flex-col gap-2 mt-4 pb-1">
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        navigate("/emergency");
                      }}
                      className="btn-sos w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm border-none cursor-pointer"
                    >
                      <FiPhoneCall /> Emergency Contact
                    </button>
                    <button
                      onClick={handleBookClick}
                      className="btn-book w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm cursor-pointer"
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
