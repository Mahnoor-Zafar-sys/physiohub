import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiCalendar, FiPhoneCall, FiChevronDown } from "react-icons/fi";
import { MdLocalHospital } from "react-icons/md";

const navLinks = [
  { name: "Home",                path: "/" },
  { name: "About",               path: "/about" },
  { name: "Doctors",             path: "/doctors" },
  { name: "Services",            path: "/services" },
  {
    name: "Resources",
    isDropdown: true,
    dropdownItems: [
      { name: "Patient Reviews",        path: "/reviews" },
      { name: "Gallery",                path: "/gallery" },
      { name: "Blog & Health Articles", path: "/blog" },
      { name: "FAQ",                    path: "/faq" },
      { name: "Insurance Information",  path: "/insurance" },
      { name: "Careers / Jobs",         path: "/careers" },
    ],
  },
  { name: "Online Consultation", path: "/online-consultation" },
  { name: "Contact Us",          path: "/contact" },
];

export default function Navbar({ onBookAppointment }) {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropOpen, setMobileDropOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handlePageNav = (path) => {
    setMobileOpen(false);
    navigate(path);
  };

  const handleBookClick = () => {
    setMobileOpen(false);
    if (onBookAppointment) {
      onBookAppointment();
    }
    navigate("/book-appointment");
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
              onClick={() => handlePageNav("/")}
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
                {navLinks.map((link, idx) => (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => link.isDropdown && setActiveDropdown(idx)}
                    onMouseLeave={() => link.isDropdown && setActiveDropdown(null)}
                  >
                    {link.isDropdown ? (
                      <>
                        <button
                          className="nav-link-underline relative px-2 xl:px-2.5 py-2 text-slate-800 hover:text-blue-600 font-bold transition-colors duration-200 whitespace-nowrap flex items-center gap-1"
                          style={{ fontSize: "clamp(0.72rem, 1vw, 0.88rem)" }}
                        >
                          {link.name}
                          <FiChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === idx ? "rotate-180" : ""}`} />
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
                      <Link
                        to={link.path}
                        className="nav-link-underline relative px-2 xl:px-2.5 py-2 text-slate-800 hover:text-blue-600 font-bold transition-colors duration-200 whitespace-nowrap block"
                        style={{ fontSize: "clamp(0.72rem, 1vw, 0.88rem)" }}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
 
            {/* ── Desktop CTAs ── */}
            <div className="hidden lg:flex items-center gap-2 shrink-0 ml-auto">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="tel:+923001234567"
                className="btn-sos flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-[11px] xl:text-xs font-bold uppercase tracking-wide whitespace-nowrap"
              >
                <FiPhoneCall className="animate-bounce shrink-0" size={13} />
                SOS Emergency
              </motion.a>
 
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
                  {navLinks.map((link) => (
                    <div key={link.name} className="flex flex-col">
                      {link.isDropdown ? (
                        <>
                          <button
                            onClick={() => setMobileDropOpen(!mobileDropOpen)}
                            className="py-3 text-slate-800 hover:text-blue-600 font-bold text-sm border-b border-slate-100 flex items-center justify-between"
                          >
                            <span>{link.name}</span>
                            <FiChevronDown className={`transition-transform duration-200 ${mobileDropOpen ? "rotate-180" : ""}`} />
                          </button>
                          <AnimatePresence>
                            {mobileDropOpen && (
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
                                    className="py-2 text-slate-600 hover:text-blue-600 font-semibold text-sm block"
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          to={link.path}
                          onClick={() => setMobileOpen(false)}
                          className="py-3 text-slate-800 hover:text-blue-600 font-bold text-sm border-b border-slate-100 last:border-0 block"
                        >
                          {link.name}
                        </Link>
                      )}
                    </div>
                  ))}
                  <div className="flex flex-col gap-2 mt-4 pb-1">
                    <a
                      href="tel:+923001234567"
                      className="btn-sos w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm"
                    >
                      <FiPhoneCall /> Emergency Contact
                    </a>
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
