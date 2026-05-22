import { motion } from "framer-motion";
import { FiAward, FiMonitor, FiClock, FiZap } from "react-icons/fi";
import { MdOutlineScience } from "react-icons/md";
import { TbRobot } from "react-icons/tb";

const features = [
  {
    icon: FiAward,
    title: "World-Class Doctors",
    desc: "Our 120+ specialists hold international fellowships and have been recognized by leading global medical institutions.",
    color: "#0284c7",
    stat: "120+",
    statLabel: "Specialists",
  },
  {
    icon: TbRobot,
    title: "AI Diagnosis Support",
    desc: "Proprietary machine learning algorithms cross-reference symptoms against 50M+ case histories for unparalleled accuracy.",
    color: "#7c3aed",
    stat: "99.2%",
    statLabel: "Accuracy",
  },
  {
    icon: FiClock,
    title: "24/7 Emergency Care",
    desc: "Our rapid response teams and trauma bays are always active, with average response time under 3 minutes.",
    color: "#dc2626",
    stat: "<3 min",
    statLabel: "Response",
  },
  {
    icon: MdOutlineScience,
    title: "Modern Equipment",
    desc: "3T MRI, da Vinci surgical robots, PET-CT scanners — we invest heavily in the world's most advanced diagnostics.",
    color: "#16a34a",
    stat: "$50M+",
    statLabel: "Equipment",
  },
  {
    icon: FiMonitor,
    title: "Online Consultation",
    desc: "HD video consultations with any specialist in minutes — from your home, office, or anywhere in the world.",
    color: "#0891b2",
    stat: "5 min",
    statLabel: "Avg. Wait",
  },
  {
    icon: FiZap,
    title: "Instant Booking",
    desc: "One-click appointment scheduling, smart reminders, and real-time availability — digital-first healthcare.",
    color: "#d97706",
    stat: "30 sec",
    statLabel: "To Book",
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-200/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-200/25 rounded-full blur-[100px]" />
        
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `linear-gradient(rgba(14,165,233,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.08) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Section - Runs every time you scroll to it */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200/60 text-sky-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse" />
            Why Choose Us
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-3 leading-tight tracking-tight font-serif">
            The Future of{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #0ea5e9, #0284c7, #16a34a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                display: "inline-block"
              }}
            >
              Medicine
            </span>{" "}
            is Here
          </h2>
          <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            We combine human expertise with technological innovation to deliver
            healthcare outcomes that simply weren't possible before.
          </p>
        </motion.div>

        {/* Clean Scroll-Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, desc, color, stat, statLabel }, i) => (
            <motion.div
              key={title}
              // Pure premium look: static position style with subtle automatic scale blend
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              // CRITICAL FIX: once: false triggers this animation EVERY SINGLE TIME you scroll
              viewport={{ once: false, amount: 0.12 }}
              transition={{ 
                delay: (i % 3) * 0.08, // Column stagger effect
                duration: 0.5, 
                ease: "easeOut" 
              }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative rounded-2xl p-8 cursor-default overflow-hidden bg-white/70 backdrop-blur-md transition-all duration-300"
              style={{
                border: "1px solid rgba(226, 232, 240, 0.8)",
                boxShadow: "0 4px 20px -2px rgba(148, 163, 184, 0.08), 0 2px 8px -1px rgba(148, 163, 184, 0.04)"
              }}
            >
              {/* Dynamic subtle radial overlay on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 10% 10%, ${color}08 0%, transparent 65%)` }}
              />
              
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ border: `1px solid ${color}20` }}
              />

              {/* Statistics Line Container */}
              <div className="flex items-start justify-between mb-6 relative z-10">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm"
                  style={{ background: `${color}0d`, border: `1px solid ${color}20` }}
                >
                  <Icon className="text-2xl" style={{ color }} />
                </div>
                <div className="text-right">
                  <div className="font-bold text-2xl tracking-tight" style={{ color }}>
                    {stat}
                  </div>
                  <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                    {statLabel}
                  </div>
                </div>
              </div>

              {/* Text Blocks */}
              <div className="relative z-10">
                <h3 className="font-bold text-slate-800 text-xl mb-3 tracking-tight group-hover:text-slate-900 transition-colors">
                  {title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-normal group-hover:text-slate-600 transition-colors duration-300">
                  {desc}
                </p>
              </div>

              {/* Bottom decorative color slide line */}
              <div
                className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out rounded-full"
                style={{ background: `linear-gradient(90deg, ${color}, ${color}20)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}