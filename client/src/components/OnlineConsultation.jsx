import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  FiVideo, FiCalendar, FiClock, FiShield, FiUser, 
  FiMessageSquare, FiArrowRight, FiCheckCircle, FiStar,
  FiPlay, FiVolume2, FiPhoneCall, FiZap
} from "react-icons/fi";
import { 
  MdOutlineMonitorHeart, MdOutlineFace, MdOutlineAccessibility 
} from "react-icons/md";
import { TbDental, TbNeedle } from "react-icons/tb";
import { GiBrain, GiBabyFace } from "react-icons/gi";

// ─── CLINICAL CONSULTANTS DATA ──────────────────────────────────────────────
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Ahmed",
    specialty: "Skin & Aesthetic Specialist",
    icon: MdOutlineFace,
    fee: "PKR 2,500",
    rating: "4.9",
    reviews: "1,240",
    available: "Today",
    slots: ["04:30 PM", "06:00 PM", "07:30 PM"],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    theme: "from-pink-500/10 to-rose-500/5",
    accent: "#ec4899"
  },
  {
    id: 2,
    name: "Prof. Dr. Kamran Malik",
    specialty: "Consultant Cardiologist",
    icon: MdOutlineMonitorHeart,
    fee: "PKR 4,000",
    rating: "5.0",
    reviews: "3,110",
    available: "Tomorrow",
    slots: ["10:00 AM", "11:30 AM", "02:00 PM"],
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    theme: "from-blue-500/10 to-sky-500/5",
    accent: "#0284c7"
  },
  {
    id: 3,
    name: "Dr. Zainab Raza",
    specialty: "Laser & Hair Transplant Surgeon",
    icon: TbNeedle,
    fee: "PKR 3,000",
    rating: "4.8",
    reviews: "980",
    available: "Today",
    slots: ["05:15 PM", "08:00 PM"],
    image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=600&q=80",
    theme: "from-purple-500/10 to-indigo-500/5",
    accent: "#8b5cf6"
  }
];

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }
  })
};

export default function OnlineConsultation() {
  const [selectedDept, setSelectedDept] = useState("all");
  const [activeVideo, setActiveVideo] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");

  const handleBooking = (doctor, slot) => {
    setSelectedDoctor(doctor);
    setSelectedSlot(slot);
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 4000);
  };

  return (
    <section className="min-h-screen bg-[#fafafd] text-slate-800 relative overflow-hidden antialiased selection:bg-blue-500 selection:text-white pb-24">
      
      {/* ── CUSTOM AUTOMATIC STYLE INJECTIONS ── */}
      <style>{`
        @keyframes floatMesh {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.12); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        .animate-mesh-1 { animation: floatMesh 25s infinite ease-in-out; }
        .animate-mesh-2 { animation: floatMesh 30s infinite ease-in-out 2s; }
        .glass-panel {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(226, 232, 240, 0.8);
        }
        .premium-text-gradient {
          background: linear-gradient(135deg, #0f172a 30%, #2563eb 70%, #db2777 100%);
          -webkit-background-clip: text;
          -webkit-text-fillColor: transparent;
        }
      `}</style>

      {/* ── BACKGROUND LUSH MESH LAYERS (Soft Pinkish Bluish) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60">
        <div className="absolute top-[-10%] left-[-5%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tr from-blue-200/40 to-sky-300/30 blur-[120px] animate-mesh-1" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-pink-200/40 to-rose-300/30 blur-[140px] animate-mesh-2" />
        <div className="absolute top-[30%] left-[25%] w-[35vw] h-[35vw] rounded-full bg-purple-100/30 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-28">
        
        {/* ── HERO HEADER SECTION ── */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-pink-200/60 shadow-sm backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-pink-600 uppercase">Awwwards Clinic SaaS</span>
            </span>
            
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.05]">
              Virtual Care. <br />
              <span className="premium-text-gradient">Instant Healing.</span>
            </h1>
            
            <p className="text-slate-500 text-lg max-w-xl font-normal leading-relaxed">
              Experience video consultations with top certified medical consultants from your home. High-definition streams, smart scheduling, and digital encrypted prescriptions.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#consult-now" className="px-7 py-3.5 bg-slate-900 text-white font-semibold text-sm rounded-xl shadow-lg hover:bg-blue-600 transition-all duration-300 flex items-center gap-2 group">
                Find Available Doctors
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white border border-slate-100 shadow-sm">
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" />
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" />
                </div>
                <div className="text-xs">
                  <div className="flex items-center text-amber-500 font-bold"><FiStar className="fill-amber-500 mr-1" /> 4.9/5</div>
                  <div className="text-slate-400 font-medium">From 4,000+ virtual patients</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── HIGH-DEFINITION MULTIMEDIA PANEL (VIDEO PLAYER) ── */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(148,163,184,0.15)] group aspect-[4/3] bg-slate-900 border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80" 
                alt="Virtual Consultation Interface" 
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${activeVideo ? "opacity-30" : "opacity-90"}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Glowing Interactive Anchor Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                {!activeVideo ? (
                  <button 
                    onClick={() => setActiveVideo(true)}
                    className="w-16 h-16 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/30 transform hover:scale-110 transition-transform duration-300 relative"
                  >
                    <span className="absolute inset-0 rounded-full bg-white/40 animate-ping" />
                    <FiPlay size={22} className="ml-1" />
                  </button>
                ) : (
                  <div className="w-full h-full p-4 flex flex-col justify-between text-white relative">
                    <div className="flex justify-between items-center bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        Live Feed Simulation
                      </div>
                      <FiVolume2 size={16} className="cursor-pointer" />
                    </div>
                    {/* Simulated stream view */}
                    <div className="text-center space-y-2 py-8">
                      <p className="text-sm font-bold text-slate-200">Connecting Secure Patient Portal...</p>
                      <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full overflow-hidden">
                        <div className="w-full h-full bg-pink-400 origin-left animate-pulse" />
                      </div>
                    </div>
                    <button 
                      onClick={() => setActiveVideo(false)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-xs font-bold rounded-lg transition-colors mx-auto"
                    >
                      Disconnect Stream
                    </button>
                  </div>
                )}
              </div>

              {/* Float badge overlay details */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white text-xs">
                <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                  <FiShield className="text-emerald-400" /> End-to-End Encrypted
                </div>
                <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
                  <FiZap className="text-pink-400 fill-pink-400" /> Ultra HD 4K
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── SAAS METRICS TICKER STRIP ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {[
            { label: "Consultation Response", val: "< 15 Mins" },
            { label: "Active Specialists", val: "25+ Boarded" },
            { label: "Digital Prescriptions", val: "100% Certified" },
            { label: "Success Rating", val: "99.2% Positive" }
          ].map((item, i) => (
            <motion.div 
              key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="glass-panel p-5 rounded-2xl text-center shadow-sm border border-slate-100 hover:border-blue-200 transition-colors"
            >
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">{item.label}</div>
              <div className="text-2xl font-black text-slate-800">{item.val}</div>
            </motion.div>
          ))}
        </div>

        {/* ── INTERACTIVE CONSULTATION ZONE ── */}
        <div id="consult-now" className="space-y-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/60 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-blue-600 uppercase mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Verified Medical Panel
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Book Your Video Consultation Slot
              </h2>
            </div>
            
            {/* Filter Pill Badges */}
            <div className="flex flex-wrap gap-2">
              {["all", "Skin Treatment", "Cardiology", "Surgery"].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${
                    selectedDept === dept 
                      ? "bg-slate-950 border-slate-950 text-white shadow-md shadow-slate-900/10" 
                      : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  {dept === "all" ? "All Departments" : dept}
                </button>
              ))}
            </div>
          </div>

          {/* SUCCESS NOTIFICATION MODAL BANNER */}
          <AnimatePresence>
            {bookingSuccess && (
              <motion.div 
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 shadow-sm"
              >
                <FiCheckCircle className="text-emerald-500 flex-shrink-0" size={20} />
                <div className="text-sm">
                  <span className="font-bold">Consultation Booked Successfully!</span> Secure link sent to your registered contact for your session with <span className="font-bold">{selectedDoctor?.name}</span> at <span className="font-bold">{selectedSlot}</span>.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── DOCTORS MATRIX GRID ── */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors
              .filter(doc => selectedDept === "all" || doc.specialty.includes(selectedDept))
              .map((doc, idx) => {
                const IconComponent = doc.icon;
                return (
                  <motion.div
                    key={doc.id}
                    custom={idx} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    whileHover={{ y: -6 }}
                    className="glass-panel rounded-3xl overflow-hidden border border-slate-200/60 shadow-[0_4px_20px_-4px_rgba(148,163,184,0.08)] hover:shadow-[0_20px_40px_-8px_rgba(148,163,184,0.18)] transition-all duration-300 flex flex-col group relative"
                  >
                    {/* Glowing Accent Inner Canvas Strip */}
                    <div className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${doc.theme}`} />

                    {/* Top Profile block */}
                    <div className="p-6 flex gap-4 items-start border-b border-slate-100 bg-white/40">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border-2 border-white shadow-sm">
                        <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                          <IconComponent style={{ color: doc.accent }} />
                          {doc.specialty}
                        </div>
                        <h3 className="text-base font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                          {doc.name}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                          <span className="flex items-center text-amber-500 font-bold"><FiStar className="fill-amber-500 mr-1" /> {doc.rating}</span>
                          <span>({doc.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    {/* Middle pricing/info block */}
                    <div className="p-6 space-y-4 flex-1">
                      <div className="flex justify-between items-center text-xs">
                        <div className="space-y-0.5">
                          <p className="text-slate-400 font-bold uppercase tracking-wider">Video Consultation Fee</p>
                          <p className="text-lg font-black text-slate-800">{doc.fee}</p>
                        </div>
                        <div className="text-right bg-blue-50 text-blue-600 px-3 py-1.5 rounded-xl font-bold border border-blue-100/60">
                          {doc.available}
                        </div>
                      </div>

                      {/* Time slot picker section */}
                      <div className="space-y-2">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <FiClock /> Available Live Slots
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {doc.slots.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => handleBooking(doc, slot)}
                              className="py-2 px-1 rounded-xl text-[11px] font-bold bg-white hover:bg-slate-950 hover:text-white border border-slate-200 text-slate-600 shadow-sm transition-all duration-200 text-center"
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer strip */}
                    <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                      <span className="flex items-center gap-1.5"><FiVideo className="text-slate-400" /> Instant HD Video</span>
                      <button className="text-blue-600 flex items-center gap-1 group-hover:text-blue-700 transition-colors">
                        View Profile <FiChevronRight />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>

        {/* ── SECURITY / TRUST BADGE SECTION ── */}
        <div className="mt-24 glass-panel rounded-3xl p-8 grid md:grid-cols-3 gap-8 items-center border border-slate-100">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0">
              <FiShield size={22} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">PMDC Certified Specialists</h4>
              <p className="text-slate-400 text-xs leading-relaxed">Every practitioner is thoroughly vetted with active medical licensing verifications.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
              <FiUser size={22} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">100% Patient Privacy</h4>
              <p className="text-slate-400 text-xs leading-relaxed">All metrics, histories, and logs conform strictly to HIPAA data privacy architectures.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
              <FiMessageSquare size={22} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">24/7 Priority Support</h4>
              <p className="text-slate-400 text-xs leading-relaxed">Dedicated concierge desk is available round-the-clock for scheduling or link connectivity updates.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}