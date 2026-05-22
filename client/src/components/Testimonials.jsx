import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { testimonials } from "../data/mockData";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  };
  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 6000); // 6 seconds auto-rotation
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (d) => ({ x: d > 0 ? 160 : -160, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] } },
    exit: (d) => ({ x: d > 0 ? -160 : 120, opacity: 0, scale: 0.95, transition: { duration: 0.45 } }),
  };

  const t = testimonials[current];

  return (
    <section className="py-24 bg-gradient-to-b from-[#f8fafc] via-white to-[#f1f5f9] relative overflow-hidden">
      
      {/* Structural Ambient Background Canvas Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header - Fixed Text Gradient Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <FiStar className="fill-current text-amber-500 animate-spin-slow" />
            Patient Stories
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-2 tracking-tight font-serif">
            Trusted by{" "}
            <span style={{ 
              background: "linear-gradient(90deg, #2563eb, #0284c7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              display: "inline-block"
            }}>15,000+</span>{" "}
            Patients
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto font-normal leading-relaxed">
            Real stories from real people who've experienced the Premium Clinic difference.
          </p>
        </motion.div>

        {/* Outer Canvas Slider Vault */}
        <div className="relative max-w-4xl mx-auto px-2 sm:px-0">
          
          {/* Enhanced Spatial Side Card Previews (High Visual Contrast) */}
          <div className="hidden lg:block">
            {[
              { idx: (current - 1 + testimonials.length) % testimonials.length, side: "left" },
              { idx: (current + 1) % testimonials.length, side: "right" },
            ].map(({ idx, side }) => (
              <div
                key={side}
                className={`absolute top-1/2 -translate-y-1/2 ${
                  side === "left" ? "-left-44" : "-right-44"
                } w-64 opacity-25 blur-[1.5px] pointer-events-none transition-all duration-500`}
              >
                <div className="bg-slate-50/60 rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(148,163,184,0.06)]">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="text-amber-400 text-xs fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-400 text-xs line-clamp-3 font-normal leading-relaxed">
                    {testimonials[idx].review}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-200 animate-pulse" />
                    <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Core Structured Review Arena */}
          <div className="overflow-visible relative">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 relative"
                style={{ 
                  boxShadow: "0 24px 64px -12px rgba(15, 23, 42, 0.08), 0 8px 24px -4px rgba(14, 165, 233, 0.03)" 
                }}
              >
                {/* Decorative Geometric Vector Quote Sign */}
                <div
                  className="absolute -top-3 left-8 text-9xl font-serif select-none pointer-events-none opacity-[0.09]"
                  style={{
                    background: "linear-gradient(180deg, #0284c7, transparent)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  “
                </div>

                {/* Micro Animated Rating Canopy */}
                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.06, type: "spring", stiffness: 260 }}
                    >
                      <FiStar className="text-amber-400 text-xl fill-current drop-shadow-sm" />
                    </motion.div>
                  ))}
                </div>

                {/* Central Review Typography */}
                <p className="text-slate-700 text-lg sm:text-2xl font-serif font-medium leading-relaxed mb-10 relative z-10 tracking-wide">
                  "{t.review}"
                </p>

                {/* Explicit Author Separation Profile Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-6 border-t border-slate-100 relative z-10">
                  <div className="flex items-center gap-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 shadow-inner"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=0ea5e9&color=fff&bold=true`;
                      }}
                    />
                    <div>
                      <div className="font-extrabold text-slate-900 text-lg tracking-tight">{t.name}</div>
                      <div className="text-sky-600 text-sm font-semibold mt-0.5">{t.role}</div>
                    </div>
                  </div>
                  
                  {/* Calendar Timestamp Badge */}
                  <div className="sm:ml-auto text-slate-400 text-xs font-medium uppercase tracking-wider bg-slate-50 border border-slate-200/60 px-3 py-1 rounded-md self-start sm:self-center">
                    {t.date || "Recent Patient"}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive Pagination Controls Navigation Layer */}
          <div className="flex items-center justify-center gap-5 mt-10">
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "#cbd5e1" }}
              whileTap={{ scale: 0.95 }}
              onClick={prev}
              className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-sky-600 hover:shadow-sm transition-all duration-200 shadow-sm"
              aria-label="Previous story"
            >
              <FiChevronLeft className="text-xl" />
            </motion.button>

            {/* Pagination Dash Track */}
            <div className="flex gap-2.5 items-center">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { 
                    setDirection(i > current ? 1 : -1); 
                    setCurrent(i); 
                  }}
                  className="focus:outline-none py-2"
                >
                  <div
                    className={`rounded-full transition-all duration-350 ${
                      i === current
                        ? "w-7 h-2 bg-sky-600 shadow-sm"
                        : "w-2 h-2 bg-slate-200 hover:bg-slate-400"
                    }`}
                  />
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05, borderColor: "#cbd5e1" }}
              whileTap={{ scale: 0.95 }}
              onClick={next}
              className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-sky-600 hover:shadow-sm transition-all duration-200 shadow-sm"
              aria-label="Next story"
            >
              <FiChevronRight className="text-xl" />
            </motion.button>
          </div>
          
        </div>
      </div>
    </section>
  );
}