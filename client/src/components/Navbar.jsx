import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiCalendar } from "react-icons/fi";
import { MdLocalHospital } from "react-icons/md";

const navLinks = ["Home", "Doctors", "Services", "About", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Floating Holographic Glitter Glass Overrides ── */}
      <style>{`
        .floating-glitter-glass {
          background: linear-gradient(
            135deg, 
            rgba(255, 255, 255, 0.4) 0%, 
            rgba(239, 246, 255, 0.25) 30%, 
            rgba(253, 242, 248, 0.3) 70%, 
            rgba(255, 255, 255, 0.5) 100%
          ) !important;
          backdrop-filter: blur(16px) saturate(180%) !important;
          WebkitBackdropFilter: blur(16px) saturate(180%) !important;
          
          /* Iridescent Shiny Border (Glitter Outline Effect) */
          border: 1.5px solid rgba(255, 255, 255, 0.6) !important;
          border-top: 1.5px solid rgba(255, 255, 255, 0.8) !important;
          
          /* Luxury Shimmer Drop Shadow */
          box-shadow: 
            0 10px 40px -10px rgba(37, 99, 235, 0.12),
            inset 0 1px 4px rgba(255, 255, 255, 0.7),
            inset 0 -2px 10px rgba(236, 72, 153, 0.05) !important;
        }

        /* Continuous Glitter Shiny Animation Streak across the capsule */
        .floating-glitter-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            115deg,
            transparent 30%,
            rgba(255, 255, 255, 0.5) 48%,
            rgba(255, 255, 255, 0.7) 50%,
            rgba(255, 255, 255, 0.5) 52%,
            transparent 70%
          );
          background-size: 200% 100%;
          transform: translateX(-100%);
          animation: dynamicGlitter 6s infinite linear;
          pointer-events: none;
          z-index: 1;
        }

        @keyframes dynamicGlitter {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* Nav Glass Button Sparkle */
        .btn-crystal-nav {
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.9) 0%, rgba(29, 78, 216, 0.95) 100%) !important;
          box-shadow: 
            0 4px 14px rgba(37, 99, 235, 0.25), 
            inset 0 1px 2px rgba(255, 255, 255, 0.3) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .btn-crystal-nav:hover {
          transform: translateY(-1px) !important;
          box-shadow: 
            0 6px 20px rgba(37, 99, 235, 0.35),
            0 0 10px rgba(16, 185, 129, 0.2) !important;
        }
      `}</style>

      <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full flex justify-center p-4 sm:p-5">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full max-w-7xl rounded-2xl transition-all duration-500 relative overflow-hidden ${
            scrolled
              ? "floating-glitter-glass"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* Subtle Pink/Blue iridescent light aura inside navigation bar container */}
          {scrolled && (
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_80%_50%,rgba(236,72,153,0.12),transparent_35%)] pointer-events-none" />
          )}

          <div className="px-6 lg:px-8 relative z-10">
            <div className="flex items-center justify-between h-18 sm:h-20">
              
              {/* ── Logo Branding (Polished Glossy Finish) ── */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center shadow-[0_3px_10px_rgba(37,99,235,0.2)] border border-white/30">
                    <MdLocalHospital className="text-white text-lg" />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse border border-white" />
                </div>
                <div>
                  <span className="text-slate-900 font-display font-extrabold text-lg tracking-tight">
                    Premium<span className="text-blue-600"> Clinic</span>
                  </span>
                  <p className="text-slate-500/90 text-[10px] font-bold tracking-widest uppercase -mt-1">
                    Advanced Healthcare
                  </p>
                </div>
              </motion.div>

              {/* ── Desktop Links Row with Glass Pill Hover Effect ── */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.2 }}
                    whileHover={{ y: -0.5 }}
                    className="relative px-4 py-2 text-slate-800 hover:text-blue-600 text-[0.93rem] font-bold font-body transition-colors duration-200 group"
                  >
                    <span className="relative z-10">{link}</span>
                    
                    {/* Glass Capsule Highlighter on Hover */}
                    <span className="absolute inset-1 rounded-xl bg-white/0 group-hover:bg-white/70 group-hover:shadow-[0_2px_10px_rgba(0,0,0,0.01)] border border-transparent group-hover:border-white/50 transition-all duration-300 z-0" />
                    
                    {/* Tiny Shimmer Dot under active text */}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-2/5 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-300" />
                  </motion.a>
                ))}
              </div>

              {/* ── Action CTA Button (Crystal Royal Glow) ── */}
              <div className="hidden md:flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-crystal-nav flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all duration-300"
                >
                  <FiCalendar className="text-base" />
                  Book Appointment
                </motion.button>
              </div>

              {/* ── Mobile Hamburger Menu Toggle ── */}
              <button
                className="md:hidden text-slate-800 p-2 hover:bg-white/60 backdrop-blur-md rounded-xl border border-transparent hover:border-white/50 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            </div>
          </div>

          {/* ── Mobile Dropdown Menu Container (Matching Glassmorphism Inside) ── */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden border-t border-white/40 overflow-hidden bg-white/40 backdrop-blur-2xl"
              >
                <div className="px-6 py-5 flex flex-col gap-1 relative z-10">
                  {navLinks.map((link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      onClick={() => setMobileOpen(false)}
                      className="py-3 text-slate-800 hover:text-blue-600 font-bold border-b border-white/20 last:border-none font-body text-sm transition-colors block"
                    >
                      {link}
                    </a>
                  ))}
                  <button 
                    onClick={() => setMobileOpen(false)}
                    className="btn-crystal-nav mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm"
                  >
                    <FiCalendar />
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
}