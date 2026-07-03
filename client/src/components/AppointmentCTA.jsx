import { motion } from "framer-motion";
import { FiCalendar, FiArrowRight, FiUserCheck, FiClock, FiCheckCircle } from "react-icons/fi";

const stepItems = [
  { 
    icon: FiUserCheck, 
    title: "Choose Specialist", 
    desc: "Select from top global doctors", 
    bgClass: "bg-gradient-to-br from-sky-500/10 via-sky-500/5 to-transparent",
    borderClass: "border-sky-200/50 hover:border-sky-400/60",
    iconColor: "text-sky-600",
    numColor: "text-sky-300/40"
  },
  { 
    icon: FiClock, 
    title: "Select Time Slot", 
    desc: "Pick any preferred hours", 
    bgClass: "bg-gradient-to-br from-pink-500/10 via-pink-500/5 to-transparent",
    borderClass: "border-pink-200/50 hover:border-pink-400/60",
    iconColor: "text-pink-600",
    numColor: "text-pink-300/40"
  },
  { 
    icon: FiCheckCircle, 
    title: "Confirm & Done", 
    desc: "Instant booking in seconds", 
    bgClass: "bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent",
    borderClass: "border-emerald-200/50 hover:border-emerald-400/60",
    iconColor: "text-emerald-600",
    numColor: "text-emerald-300/40"
  },
];

// Cards parent grid configuration 
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14, // Delays the next card dynamically
      delayChildren: 0.8 // Triggered safely after headers animate
    }
  }
};

// Cards entry framework
const cardVariants = {
  hidden: { opacity: 0, y: 50 }, 
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.75, 
      ease: [0.25, 1, 0.5, 1], 
    } 
  },
};

export default function AppointmentCTA() {
  return (
    <section id="booking" className="relative py-28 overflow-hidden" style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #fdf2f8 100%)" }}>
      
      {/* Premium Shiny Pinkish-Bluish Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-sky-300/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: "8s" }} />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-pink-300/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: "10s" }} />
        
        {/* Subtle Elegant Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: `linear-gradient(rgba(219, 39, 119, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.02) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center overflow-x-hidden sm:overflow-visible">
        
        {/* Header Content Center Canvas */}
        <div className="mb-16 flex flex-col items-center">


          {/* 1st Stage: Slow Heading Animation coming from Left to Right */}
          <motion.h2
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} // Elegant precise slow transition
            className="text-4xl sm:text-6xl font-extrabold text-slate-900 leading-tight mb-6 font-serif tracking-tight"
          >
            Book Your Appointment{" "}
            <span style={{ 
              background: "linear-gradient(135deg, #0ea5e9, #db2777)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              display: "inline-block"
            }} className="italic font-semibold">in Seconds</span>
          </motion.h2>

          {/* 2nd Stage: Slow Subtext Animation coming from Right to Left with a structured initial delay */}
          <motion.p
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} // Starts midway through heading sequence
            className="text-slate-500 text-lg sm:text-xl max-w-xl mx-auto font-normal leading-relaxed"
          >
            Choose your specialist, pick a time slot, and confirm. Premium healthcare has never been this fluid and accessible.
          </motion.p>
        </div>

        {/* 3rd Stage: Staggered Cards Entry from Bottom to Top */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: false, amount: 0.1 }}
        >
          {stepItems.map(({ icon: Icon, title, desc, bgClass, borderClass, iconColor, numColor }, i) => (
            <motion.div
              key={title}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }} 
              whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 400, damping: 15 } }} // Premium spring-loaded interactive zoom compression onClick
              className={`group cursor-pointer relative ${bgClass} backdrop-blur-xl rounded-3xl p-8 text-left border ${borderClass} transition-all duration-300 select-none`}
              style={{
                boxShadow: "0 10px 30px -10px rgba(148, 163, 184, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.6)"
              }}
            >
              {/* Step Index Counter */}
              <div className={`absolute top-4 right-6 font-extrabold text-4xl font-serif select-none ${numColor} transition-transform group-hover:scale-105 duration-300`}>
                0{i + 1}
              </div>

              {/* Icon Container with elegant soft shadow */}
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 border border-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                <Icon className={`text-xl ${iconColor}`} />
              </div>

              <div className="relative z-10">
                <h3 className="text-slate-800 font-extrabold text-lg mb-2 tracking-tight">
                  {title}
                </h3>
                <p className="text-slate-500/90 text-sm leading-relaxed font-normal">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Premium Blue Core Call-To-Action Dynamic Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 1.2 }} // Fires smoothly after the grid populates
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold text-lg px-10 py-5 rounded-2xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(37,99,235,0.3)] hover:shadow-[0_24px_48px_-8px_rgba(14,165,233,0.5)] transition-all duration-300"
          >
            {/* Soft Metallic Shiny Shimmer Effect overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            />
            
            <FiCalendar className="relative z-10 text-xl text-sky-100" />
            <span className="relative z-10 tracking-tight">Book Your Appointment Now</span>
            
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FiArrowRight className="text-xl text-white" />
            </motion.span>
          </motion.button>

          <p className="mt-6 text-slate-400 text-xs sm:text-sm font-medium tracking-wide">
            No registration required <span className="mx-2 text-slate-300">·</span> 100% free to book <span className="mx-2 text-slate-300">·</span> Cancel anytime
          </p>
        </motion.div>

      </div>
    </section>
  );
}