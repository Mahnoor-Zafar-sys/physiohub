import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FiStar, FiCalendar, FiMessageCircle, FiVideo,
  FiAward, FiClock, FiSearch, FiX, FiChevronDown,
  FiGlobe, FiPhone, FiMail, FiLinkedin, FiFilter,
  FiMapPin, FiCheckCircle, FiHeart, FiTwitter, FiArrowLeft,
  FiActivity, FiUsers, FiZap,
} from "react-icons/fi";
import {
  FaWhatsapp, FaLinkedinIn, FaFacebook, FaTwitter, FaInstagram,
  FaStar, FaRegStar, FaStarHalfAlt, FaHeartbeat,
} from "react-icons/fa";
import { GiTooth, GiHeartBeats, GiBrain, GiBabyFace } from "react-icons/gi";
import { TbStethoscope, TbBone, TbEar, TbEye, TbBrandWhatsapp } from "react-icons/tb";
import { MdFace, MdOutlineContentCut } from "react-icons/md";
import { HiOutlineArrowRight, HiOutlineBadgeCheck } from "react-icons/hi";

// Shared data
import { doctors } from "../data/mockData";
import { api } from "../services/api";

const TAGS = [
  { value: "all",             label: "All Specialists",     color: "#0ea5e9", icon: TbStethoscope },
  { value: "physiotherapy",  label: "Physiotherapy",       color: "#0ea5e9", icon: FiActivity },
  { value: "chiropractic",   label: "Chiropractic Adjustments",color: "#8b5cf6", icon: TbBone },
  { value: "cupping",        label: "Cupping Therapy",     color: "#0d9488", icon: GiHeartBeats },
  { value: "hijama",         label: "Hijama Therapy",      color: "#4f46e5", icon: GiHeartBeats },
  { value: "electrotherapy", label: "Electrotherapy",      color: "#dc2626", icon: FiZap },
  { value: "kinesio",        label: "Kinesio Taping",      color: "#ec4899", icon: FiActivity },
  { value: "fitness",        label: "Fitness Training",    color: "#d97706", icon: FiActivity },
  { value: "needling",       label: "Dry Needling",        color: "#10b981", icon: TbStethoscope },
];

const GENDERS  = ["all", "Male", "Female"];
const BRANCHES = ["all", "Gulberg", "DHA"];

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating, color = "#f59e0b" }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => {
        if (i <= Math.floor(rating)) return <FaStar key={i} style={{ color, fontSize: 11 }} />;
        if (i - 0.5 <= rating)      return <FaStarHalfAlt key={i} style={{ color, fontSize: 11 }} />;
        return <FaRegStar key={i} style={{ color, fontSize: 11 }} />;
      })}
    </span>
  );
}

// ─── Typewriter Hook ──────────────────────────────────────────────────────────
function useTypewriter(text, speed = 55, startDelay = 400) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);
  return { displayed, done };
}

// ─── Floating Icons ───────────────────────────────────────────────────────────
const floatIcons = [
  { Icon: TbStethoscope, style:{ top:"18%",   left:"4%" },     size:26, delay:0    },
  { Icon: GiHeartBeats,  style:{ top:"22%",   right:"7%" },    size:30, delay:0.5  },
  { Icon: GiBrain,       style:{ bottom:"22%",left:"7%" },     size:24, delay:0.9  },
  { Icon: TbBone,        style:{ bottom:"28%",right:"5%" },    size:22, delay:1.3  },
  { Icon: MdFace,        style:{ top:"58%",   left:"2.5%" },   size:20, delay:0.7  },
  { Icon: FiActivity,    style:{ top:"12%",   right:"19%" },   size:19, delay:1.1  },
  { Icon: FiUsers,       style:{ bottom:"12%",right:"22%" },   size:18, delay:1.6  },
  { Icon: GiBabyFace,    style:{ top:"42%",   right:"3%" },    size:21, delay:0.3  },
];

// ─── BANNER ───────────────────────────────────────────────────────────────────
function Banner() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const line1 = "World-Class Physical Therapists";
  const line2 = "At Your Service";
  const { displayed: tw1, done: done1 } = useTypewriter(line1, 50, 600);
  const { displayed: tw2 } = useTypewriter(done1 ? line2 : "", 65, 200);

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 pb-16"
      style={{ background:"linear-gradient(135deg,#f0f9ff 0%,#ffffff 45%,#fdf2f8 100%)" }}>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-sky-200/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration:"9s" }} />
        <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-pink-200/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration:"13s" }} />
        <div className="absolute inset-0 opacity-[0.18]"
          style={{ backgroundImage:`linear-gradient(rgba(14,165,233,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(219,39,119,.05) 1px,transparent 1px)`, backgroundSize:"48px 48px" }} />
      </div>

      {floatIcons.map(({ Icon, style, size, delay }, i) => (
        <motion.div key={i}
          className="absolute hidden lg:flex items-center justify-center w-14 h-14 rounded-2xl bg-white/70 border border-slate-100 shadow-md"
          style={style}
          initial={{ opacity:0, y:20 }}
          animate={inView ? { opacity:[0,0.65,0.65], y:[20,0,-6,0] } : {}}
          transition={{ delay, duration:3.5, repeat:Infinity, repeatType:"reverse", ease:"easeInOut" }}>
          <Icon size={size} style={{ color:"#0ea5e9", opacity:0.7 }} />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <motion.div initial={{ opacity:0, scale:0.85 }} animate={inView ? { opacity:1, scale:1 } : {}}
          transition={{ duration:0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-sky-200/70 text-sky-600 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm backdrop-blur-sm">
          <FaHeartbeat className="animate-pulse text-pink-500" />
          Meet Our Specialists
        </motion.div>

        {/* Typewriter Heading */}
        <div className="text-4xl sm:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight font-serif mb-5 min-h-[5rem] sm:min-h-[7.5rem]">
          <span>{tw1.split(" ").map((word, wi) => {
            const gradientWords = ["Physical", "Therapists"];
            const isGrad = gradientWords.includes(word);
            return (
              <span key={wi}>
                {isGrad
                  ? <span style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{word}</span>
                  : word}
                {" "}
              </span>
            );
          })}</span>
          {done1 && (
            <><br /><span>{tw2}</span></>
          )}
          <span className="inline-block w-0.5 h-8 sm:h-12 bg-sky-500 align-middle ml-1 animate-pulse" style={{ opacity: tw2.length >= line2.length ? 0 : 1 }} />
        </div>

        <motion.p initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.9, delay:0.25 }}
          className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
          Board-certified physical therapists with international training — delivering compassionate, cutting-edge care across 8 clinic facilities.
        </motion.p>

        <motion.div initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.8, delay:0.4 }}
          className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10">
          {[
            {num:"3", label:"Therapists"},
            {num:"8",   label:"Facilities"},
            {num:"20K+",label:"Patients Served"},
            {num:"12+", label:"Years Avg. Exp."},
          ].map((s,i) => (
            <motion.div key={s.label} initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ delay:0.4+i*0.08 }} className="text-center">
              <p className="text-3xl font-extrabold"
                style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                {s.num}
              </p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.8, delay:0.55 }}
          className="flex flex-wrap justify-center gap-4">
          <button onClick={() => navigate("/book-appointment")}
            className="px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-xl hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
            style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)" }}>
            <FiCalendar size={15} /> Book Appointment
          </button>
          <a href="tel:+923008786187"
            className="px-8 py-3.5 rounded-xl font-bold text-sm text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex items-center gap-2">
            <FiPhone size={15} /> Call Us Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── AUTO-SCROLL CATEGORY SLIDER ─────────────────────────────────────────────
function CategorySlider({ activeTag, setActiveTag }) {
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const posRef = useRef(0);
  const rafRef = useRef(null);
  const SPEED = 0.6;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const doubled = [...TAGS, ...TAGS];

  useEffect(() => {
    if (isMobile) return;
    const track = trackRef.current;
    if (!track) return;
    const halfW = track.scrollWidth / 2;

    const step = () => {
      if (!isPaused) {
        posRef.current += SPEED;
        if (posRef.current >= halfW) posRef.current = 0;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused, isMobile]);

  if (isMobile) {
    return (
      <div className="w-full overflow-x-auto py-3 px-4 bg-white/60 backdrop-blur-sm border-b border-slate-100 scrollbar-none">
        <div className="flex gap-3" style={{ whiteSpace: "nowrap" }}>
          {TAGS.map(({ value, label, color, icon: TagIcon }) => {
            const active = activeTag === value;
            return (
              <motion.button
                key={value}
                onClick={() => setActiveTag(value)}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold flex-shrink-0 transition-all duration-200 border ${
                  active
                    ? "text-white border-transparent shadow-md"
                    : "text-slate-600 bg-white border-slate-200 hover:border-slate-300"
                }`}
                style={active ? {
                  background: value === "all"
                    ? "linear-gradient(135deg,#0ea5e9,#db2777)"
                    : `linear-gradient(135deg,${color}ee,${color}99)`,
                  boxShadow: `0 4px 10px -2px ${color ?? "#0ea5e9"}44`
                } : {}}>
                <TagIcon size={12} style={{ color: active ? "white" : color }} />
                {label}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden py-3 bg-white/60 backdrop-blur-sm border-b border-slate-100">
      <div className="relative flex"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}>
        <div ref={trackRef} className="flex gap-3 will-change-transform" style={{ whiteSpace:"nowrap" }}>
          {doubled.map(({ value, label, color, icon: TagIcon }, idx) => {
            const active = activeTag === value;
            return (
              <motion.button
                key={idx}
                onClick={() => setActiveTag(value)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold flex-shrink-0 transition-all duration-200 border ${
                  active
                    ? "text-white border-transparent shadow-lg"
                    : "text-slate-600 bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
                style={active ? {
                  background: value === "all"
                    ? "linear-gradient(135deg,#0ea5e9,#db2777)"
                    : `linear-gradient(135deg,${color}ee,${color}99)`,
                  boxShadow: `0 4px 14px -2px ${color ?? "#0ea5e9"}55`
                } : {}}>
                <TagIcon size={12} style={{ color: active ? "white" : color }} />
                {label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── FILTER BAR ───────────────────────────────────────────────────────────────
function FilterBar({ activeTag, setActiveTag, gender, setGender, branch, setBranch, avail, setAvail, search, setSearch, count }) {
  return (
    <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      <CategorySlider activeTag={activeTag} setActiveTag={setActiveTag} />

      <div className="px-4 py-4">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <FiSearch size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search doctors, specialties..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-slate-700 bg-slate-50 border border-slate-200 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all" />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <FiX size={13} />
                </button>
              )}
            </div>

            <select value={gender} onChange={e => setGender(e.target.value)}
              className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200 focus:outline-none focus:border-sky-400 transition-all appearance-none pr-7">
              {GENDERS.map(g => <option key={g} value={g}>{g === "all" ? "All Genders" : g}</option>)}
            </select>

            <select value={branch} onChange={e => setBranch(e.target.value)}
              className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200 focus:outline-none focus:border-sky-400 transition-all appearance-none pr-7">
              {BRANCHES.map(b => <option key={b} value={b}>{b === "all" ? "All Branches" : b}</option>)}
            </select>

            <select value={avail} onChange={e => setAvail(e.target.value)}
              className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200 focus:outline-none focus:border-sky-400 transition-all appearance-none pr-7">
              <option value="all">All Availability</option>
              <option value="available">Available Now</option>
            </select>

            <motion.span key={count} initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
              className="text-sm font-bold ml-auto hidden sm:block"
              style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              {count} doctor{count !== 1 ? "s" : ""}
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DOCTOR MODAL ─────────────────────────────────────────────────────────────
function DoctorModal({ doctor: d, onClose }) {
  const navigate = useNavigate();
  const whatsappMsg = encodeURIComponent(`Hello, I'd like to book an appointment with ${d.name}.`);
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>

        <motion.div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={onClose} initial={{ opacity:0 }} animate={{ opacity:1 }} />

        <motion.div
          initial={{ opacity:0, scale:0.93, y:30 }}
          animate={{ opacity:1, scale:1, y:0 }}
          exit={{ opacity:0, scale:0.95, y:20 }}
          transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          style={{ scrollbarWidth:"none" }}>

          <div className="h-1.5 rounded-t-3xl w-full"
            style={{ background:`linear-gradient(90deg,${d.solidColor},#db2777)` }} />

          {/* Header */}
          <div className={`relative p-6 sm:p-8 bg-gradient-to-br ${d.lightBg}`}>
            <button onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 hover:border-slate-300 transition-all shadow-sm">
              <FiX size={16} />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative flex-shrink-0">
                <img src={d.image} alt={d.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-xl"
                  style={{ border:`3px solid ${d.solidColor}40` }} />
                {d.available && (
                  <span className="absolute -bottom-1.5 -right-1.5 flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    Available
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${d.badgeBg} ${d.badgeText}`}>
                    {d.specialty}
                  </span>
                  {d.certifications.slice(0,1).map(c => (
                    <span key={c} className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">{c}</span>
                  ))}
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 font-serif mb-0.5">{d.name}</h2>
                <p className={`text-sm font-semibold ${d.accentText} mb-3`}>{d.title}</p>

                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 mb-3">
                  {d.realStats && <span className="flex items-center gap-1.5"><FiAward size={13} style={{color:d.solidColor}} /> {d.experience} Experience</span>}
                  {d.realStats && <span className="flex items-center gap-1.5"><FiHeart size={13} style={{color:d.solidColor}} /> {d.patients} Patients</span>}
                  <span className="flex items-center gap-1.5"><FiMapPin size={13} style={{color:d.solidColor}} /> {d.branch.join(", ")}</span>
                  <span className="flex items-center gap-1.5"><FiGlobe size={13} style={{color:d.solidColor}} /> {d.languages.join(", ")}</span>
                </div>

                {d.realStats && (
                  <div className="flex items-center gap-2 mb-4">
                    <StarRating rating={d.rating} color={d.solidColor} />
                    <span className="font-bold text-slate-800 text-sm">{d.rating}</span>
                    <span className="text-slate-400 text-xs">({d.reviews} reviews)</span>
                  </div>
                )}

                {/* Social Links */}
                {(d.social || d.email) && (
                  <div className="flex items-center gap-2">
                    {d.email && (
                      <a href={`mailto:${d.email}`} title={`Email: ${d.email}`}
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-rose-55/10 hover:bg-rose-55/20 transition-colors">
                        <FiMail size={14} className="text-rose-500" />
                      </a>
                    )}
                    {d.social && d.social.linkedin && (
                      <a href={d.social.linkedin} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#0077b5]/10 hover:bg-[#0077b5]/20 transition-colors">
                        <FaLinkedinIn size={13} style={{color:"#0077b5"}} />
                      </a>
                    )}
                    {d.social && d.social.facebook && (
                      <a href={d.social.facebook} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#1877f2]/10 hover:bg-[#1877f2]/20 transition-colors">
                        <FaFacebook size={13} style={{color:"#1877f2"}} />
                      </a>
                    )}
                    {d.social && d.social.instagram && (
                      <a href={d.social.instagram} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#e1306c]/10 hover:bg-[#e1306c]/20 transition-colors">
                        <FaInstagram size={13} style={{color:"#e1306c"}} />
                      </a>
                    )}
                    {d.social && d.social.twitter && (
                      <a href={d.social.twitter} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors">
                        <FaTwitter size={13} className="text-slate-600" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* CTA Row */}
            <div className="flex flex-wrap gap-3 mt-6">
              <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                onClick={() => { onClose(); navigate("/book-appointment", { state: { doctor: d } }); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-sm shadow-lg cursor-pointer"
                style={{ background:`linear-gradient(135deg,${d.solidColor},#db2777)` }}>
                <FiCalendar size={14} /> Book Appointment
              </motion.button>
              <motion.a whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                href={`https://wa.me/923008786187?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-sm bg-[#25D366] shadow-lg">
                <FaWhatsapp size={14} /> WhatsApp
              </motion.a>
              <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                onClick={() => { onClose(); navigate("/online-consultation"); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border-2 text-slate-700 bg-white hover:bg-slate-50 transition-all cursor-pointer"
                style={{ borderColor:`${d.solidColor}40` }}>
                <FiVideo size={14} style={{ color:d.solidColor }} /> Video Consult
              </motion.button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-7">

            {/* Next Slot + Fee + Languages */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon:<FiClock size={15}/>, label:"Next Available", val:d.nextSlot, color:d.solidColor },
                { icon:<span className="text-sm font-bold" style={{color:d.solidColor}}>₨</span>, label:"Consultation Fee", val:d.fee, color:d.solidColor },
                { icon:<FiGlobe size={15}/>, label:"Languages", val:d.languages.join(", "), color:d.solidColor },
              ].map(item => (
                <div key={item.label} className="rounded-2xl p-4 text-center" style={{ background:`${d.solidColor}08`, border:`1px solid ${d.solidColor}20` }}>
                  <div className="flex justify-center mb-1" style={{color:d.solidColor}}>{item.icon}</div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">{item.label}</p>
                  <p className="text-slate-800 font-bold text-xs">{item.val}</p>
                </div>
              ))}
            </div>

            {/* Availability Schedule */}
            {d.availabilitySchedule && (
              <div>
                <h4 className="text-slate-900 font-extrabold text-base mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full inline-block" style={{ background:d.solidColor }} />
                  Availability Schedule
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {d.availabilitySchedule.map((slot, i) => (
                    <div key={i} className="rounded-xl p-3" style={{ background:`${d.solidColor}08`, border:`1px solid ${d.solidColor}18` }}>
                      <p className="text-xs font-extrabold" style={{color:d.solidColor}}>{slot.day}</p>
                      <p className="text-slate-600 text-[11px] font-medium mt-0.5">{slot.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bio */}
            <div>
              <h4 className="text-slate-900 font-extrabold text-base mb-3 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full inline-block" style={{ background:d.solidColor }} />
                About Dr. {d.name.split(" ").slice(-1)[0]}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">{d.bio}</p>
            </div>

            {/* Specializations */}
            <div>
              <h4 className="text-slate-900 font-extrabold text-base mb-3 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full inline-block" style={{ background:d.solidColor }} />
                Specializations
              </h4>
              <div className="flex flex-wrap gap-2">
                {d.specializations.map(s => (
                  <span key={s} className={`px-3 py-1 rounded-full text-xs font-bold ${d.badgeBg} ${d.badgeText}`}>{s}</span>
                ))}
              </div>
            </div>

            {/* Doctor-Specific Services */}
            {d.services && (
              <div>
                <h4 className="text-slate-900 font-extrabold text-base mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full inline-block" style={{ background:d.solidColor }} />
                  Services Offered
                </h4>
                <div className="flex flex-wrap gap-2">
                  {d.services.map(s => (
                    <span key={s} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700">
                      <FiCheckCircle size={11} style={{color:d.solidColor}} /> {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            <div>
              <h4 className="text-slate-900 font-extrabold text-base mb-3 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full inline-block" style={{ background:d.solidColor }} />
                Education & Training
              </h4>
              <div className="space-y-3">
                {d.education.map((e, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background:`${d.solidColor}06`, border:`1px solid ${d.solidColor}15` }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-black" style={{ background:`${d.solidColor}15`, color:d.solidColor }}>
                      {e.year.slice(-2)}
                    </div>
                    <div>
                      <p className="text-slate-800 font-bold text-sm">{e.degree}</p>
                      <p className="text-slate-400 text-xs">{e.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h4 className="text-slate-900 font-extrabold text-base mb-3 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full inline-block" style={{ background:d.solidColor }} />
                Certifications & Memberships
              </h4>
              <div className="flex flex-wrap gap-2">
                {d.certifications.map(c => (
                  <span key={c} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700">
                    <HiOutlineBadgeCheck size={13} style={{color:d.solidColor}} /> {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Ratings & Reviews summary */}
            {d.realStats && (
              <div className="rounded-2xl p-5" style={{ background:`${d.solidColor}06`, border:`1px solid ${d.solidColor}20` }}>
                <h4 className="text-slate-900 font-extrabold text-base mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full inline-block" style={{ background:d.solidColor }} />
                  Ratings & Reviews
                </h4>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-4xl font-extrabold" style={{color:d.solidColor}}>{d.rating}</p>
                    <StarRating rating={d.rating} color={d.solidColor} />
                    <p className="text-slate-400 text-xs mt-1">{d.reviews} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5,4,3,2,1].map(star => {
                      const pct = star === 5 ? 72 : star === 4 ? 18 : star === 3 ? 6 : star === 2 ? 2 : 2;
                      return (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 w-3">{star}</span>
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div className="h-full rounded-full" style={{ background:d.solidColor, width:`${pct}%` }}
                              initial={{ width:0 }} animate={{ width:`${pct}%` }} transition={{ delay:0.3, duration:0.8 }} />
                          </div>
                          <span className="text-[10px] text-slate-400 w-6">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Doctor Reviews Feed list */}
                <div className="mt-6 border-t border-slate-100 pt-5 space-y-4 text-left">
                  <h5 className="font-extrabold text-[10px] uppercase tracking-widest text-slate-400 mb-3">Patient Feedbacks</h5>
                  <div className="space-y-3">
                    {[
                      { name: "Ayesha Tariq", rating: 5, date: "3 days ago", comment: `Excellent consultation! Dr. ${d.name.split(" ").slice(-1)[0]} was extremely detailed, patient, and recommended a very effective treatment plan. Highly recommended.` },
                      { name: "Bilal Hussain", rating: 5, date: "1 week ago", comment: "Outstanding professionalism and bedside manner. The doctor explained everything clearly and made me feel completely comfortable. Very satisfied with the outcome." },
                      { name: "Sana Mirza", rating: 4, date: "2 weeks ago", comment: "Very clinical and thorough in investigation. The clinic hygiene standard was also outstanding." }
                    ].map((rev, idx) => (
                      <div key={idx} className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5 space-y-1.5">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs font-bold text-slate-800">{rev.name}</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <StarRating rating={rev.rating} color={d.solidColor} />
                              <span className="text-[9px] text-slate-400 font-semibold">{rev.date}</span>
                            </div>
                          </div>
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block" /> Verified Patient
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── DOCTOR CARD ──────────────────────────────────────────────────────────────
function DoctorCard({ doctor: d, onOpen, index }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin:"-40px" });
  const whatsappMsg = encodeURIComponent(`Hello, I'd like to book an appointment with ${d.name}.`);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:60, scale:0.95 }}
      animate={inView ? { opacity:1, y:0, scale:1 } : {}}
      transition={{ duration:0.55, delay:index * 0.09, ease:[0.25,1,0.5,1] }}
      whileHover={{ y:-8, transition:{ duration:0.25 } }}
      className="group relative bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-400 overflow-hidden cursor-pointer flex flex-col"
      onClick={() => onOpen(d)}>

      <div className="h-1 w-full rounded-t-3xl"
        style={{ background:`linear-gradient(90deg,${d.solidColor},#db2777)` }} />

      {/* Availability badge */}
      <div className="absolute top-4 right-4 z-10">
        {d.available ? (
          <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Available
          </span>
        ) : (
          <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-bold px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
            Booked
          </span>
        )}
      </div>

      {/* Image section */}
      <div className={`relative p-5 pb-0 bg-gradient-to-br ${d.lightBg}`}>
        <div className="relative w-full h-[320px] overflow-hidden rounded-2xl flex items-start justify-center">
          <img src={d.image} alt={d.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
          <div className="absolute bottom-3 left-3">
            <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-md ${d.accentText}`}>
              <d.IconComp size={12} /> {d.specialty}
            </span>
          </div>
          {/* Social media mini-icons on hover */}
          <motion.div
            initial={{ opacity:0 }}
            whileHover={{ opacity:1 }}
            className="absolute top-3 left-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {d.social?.linkedin && (
              <a href={d.social.linkedin} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
                className="w-7 h-7 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center shadow">
                <FaLinkedinIn size={10} style={{color:"#0077b5"}} />
              </a>
            )}
            {d.social?.instagram && (
              <a href={d.social.instagram} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
                className="w-7 h-7 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center shadow">
                <FaInstagram size={10} style={{color:"#e1306c"}} />
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="text-slate-900 font-extrabold text-lg font-serif leading-tight">{d.name}</h3>
          <p className={`text-xs font-semibold ${d.accentText} mt-0.5`}>{d.title}</p>
        </div>

        {d.realStats && (
          <div className="flex items-center gap-2 mb-3">
            <StarRating rating={d.rating} color={d.solidColor} />
            <span className="font-bold text-slate-800 text-sm">{d.rating}</span>
            <span className="text-slate-400 text-xs">({d.reviews})</span>
          </div>
        )}

        <div className={`grid ${d.realStats ? "grid-cols-3" : "grid-cols-1"} gap-2 mb-4`}>
          {d.realStats && (
            <>
              <div className="text-center rounded-xl py-2"
                style={{ background:`${d.solidColor}08`, border:`1px solid ${d.solidColor}15` }}>
                <div className="flex justify-center mb-0.5" style={{color:d.solidColor}}><FiAward size={12}/></div>
                <p className="text-slate-800 font-bold text-xs leading-tight">{d.experience}</p>
                <p className="text-slate-400 text-[9px] uppercase tracking-wider">Exp.</p>
              </div>
              <div className="text-center rounded-xl py-2"
                style={{ background:`${d.solidColor}08`, border:`1px solid ${d.solidColor}15` }}>
                <div className="flex justify-center mb-0.5" style={{color:d.solidColor}}><FiHeart size={12}/></div>
                <p className="text-slate-800 font-bold text-xs leading-tight">{d.patients}</p>
                <p className="text-slate-400 text-[9px] uppercase tracking-wider">Patients</p>
              </div>
            </>
          )}
          <div className="text-center rounded-xl py-2"
            style={{ background:`${d.solidColor}08`, border:`1px solid ${d.solidColor}15` }}>
            <div className="flex justify-center mb-0.5" style={{color:d.solidColor}}><span className="text-xs font-bold">₨</span></div>
            <p className="text-slate-800 font-bold text-xs leading-tight">{d.fee.replace("PKR ","")}</p>
            <p className="text-slate-400 text-[9px] uppercase tracking-wider">Fee</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 p-2.5 rounded-xl"
          style={{ background:`${d.solidColor}08`, border:`1px solid ${d.solidColor}15` }}>
          <FiClock size={12} style={{color:d.solidColor, flexShrink:0}} />
          <span className="text-xs text-slate-600 font-medium">{d.nextSlot}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {d.languages.map(l => (
            <span key={l} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">{l}</span>
          ))}
          {d.branch.map(b => (
            <span key={b} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${d.badgeBg} ${d.badgeText}`}>{b}</span>
          ))}
        </div>

        <div className="mt-auto flex gap-2">
          <motion.button
            whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
            onClick={e => { e.stopPropagation(); navigate("/book-appointment", { state: { doctor: d } }); }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-white text-xs shadow-md cursor-pointer"
            style={{ background:`linear-gradient(135deg,${d.solidColor},#db2777)` }}>
            <FiCalendar size={12} /> Book Now
          </motion.button>
          <motion.a
            whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }}
            href={`https://wa.me/923001234567?text=${whatsappMsg}`}
            target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center shadow-md flex-shrink-0">
            <FaWhatsapp size={16} className="text-white" />
          </motion.a>
          <motion.button
            whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }}
            onClick={e => { e.stopPropagation(); onOpen(d); }}
            className="w-10 h-10 rounded-xl flex items-center justify-center border-2 flex-shrink-0 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
            style={{ borderColor:`${d.solidColor}40` }}>
            <HiOutlineArrowRight size={15} style={{color:d.solidColor}} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// Specialty tag mapping helper
const getTagFromSpecialty = (specialty) => {
  if (!specialty) return "all";
  const s = specialty.toLowerCase();
  if (s.includes("physio")) return "physiotherapy";
  if (s.includes("chiro")) return "chiropractic";
  if (s.includes("cup")) return "cupping";
  if (s.includes("hij")) return "hijama";
  if (s.includes("electro")) return "electrotherapy";
  if (s.includes("kinesio")) return "kinesio";
  if (s.includes("fit")) return "fitness";
  if (s.includes("needl")) return "needling";
  return "all";
};

// Specialty styling colors mapping helper
const getStylesForTag = (tag) => {
  const stylesMap = {
    physiotherapy: {
      solidColor: "#0ea5e9",
      lightBg: "from-sky-50 to-cyan-50",
      badgeBg: "bg-sky-100",
      badgeText: "text-sky-700",
      accentText: "text-sky-600",
      IconComp: FiActivity
    },
    chiropractic: {
      solidColor: "#8b5cf6",
      lightBg: "from-violet-50 to-purple-50",
      badgeBg: "bg-violet-100",
      badgeText: "text-violet-700",
      accentText: "text-violet-600",
      IconComp: TbBone
    },
    cupping: {
      solidColor: "#0d9488",
      lightBg: "from-teal-50 to-emerald-50",
      badgeBg: "bg-teal-100",
      badgeText: "text-teal-700",
      accentText: "text-teal-600",
      IconComp: GiHeartBeats
    },
    hijama: {
      solidColor: "#4f46e5",
      lightBg: "from-indigo-50 to-blue-50",
      badgeBg: "bg-indigo-100",
      badgeText: "text-indigo-700",
      accentText: "text-indigo-600",
      IconComp: GiHeartBeats
    },
    electrotherapy: {
      solidColor: "#dc2626",
      lightBg: "from-red-50 to-orange-50",
      badgeBg: "bg-red-100",
      badgeText: "text-red-700",
      accentText: "text-red-600",
      IconComp: FiZap
    },
    kinesio: {
      solidColor: "#ec4899",
      lightBg: "from-pink-50 to-rose-50",
      badgeBg: "bg-pink-100",
      badgeText: "text-pink-700",
      accentText: "text-pink-600",
      IconComp: FiActivity
    },
    fitness: {
      solidColor: "#d97706",
      lightBg: "from-amber-50 to-orange-50",
      badgeBg: "bg-amber-100",
      badgeText: "text-amber-700",
      accentText: "text-amber-600",
      IconComp: FiActivity
    },
    needling: {
      solidColor: "#10b981",
      lightBg: "from-emerald-50 to-teal-50",
      badgeBg: "bg-emerald-100",
      badgeText: "text-emerald-700",
      accentText: "text-emerald-600",
      IconComp: TbStethoscope
    }
  };
  return stylesMap[tag] || {
    solidColor: "#0ea5e9",
    lightBg: "from-sky-50 to-cyan-50",
    badgeBg: "bg-sky-100",
    badgeText: "text-sky-700",
    accentText: "text-sky-600",
    IconComp: TbStethoscope
  };
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function DoctorsPage() {
  const navigate = useNavigate();
  const [activeTag,  setActiveTag]  = useState("all");
  const [gender,     setGender]     = useState("all");
  const [branch,     setBranch]     = useState("all");
  const [avail,      setAvail]      = useState("all");
  const [search,     setSearch]     = useState("");
  const [selected,   setSelected]   = useState(null);
  const [doctorsList, setDoctorsList] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const dbDocs = await api.getDoctors();
      const mergedDocs = dbDocs.map(dbDoc => {
        const mockDoc = doctors.find(m => m.name.toLowerCase() === dbDoc.name.toLowerCase());
        
        let branches = ["Gulberg", "DHA"];
        if (typeof dbDoc.branch === "string") {
          branches = dbDoc.branch.split(",").map(b => b.trim());
        } else if (Array.isArray(dbDoc.branch)) {
          branches = dbDoc.branch;
        }

        const tag = mockDoc?.tag || getTagFromSpecialty(dbDoc.specialty);
        const styles = getStylesForTag(tag);

        return {
          id: dbDoc.id,
          name: dbDoc.name,
          specialty: dbDoc.specialty,
          fee: dbDoc.fee,
          branch: branches,
          status: dbDoc.status || "Active",
          slug: dbDoc.slug || mockDoc?.slug || dbDoc.name.toLowerCase().replace(/\s+/g, "-"),
          title: dbDoc.title || mockDoc?.title || "Consultant Specialist",
          tag: tag,
          tags: mockDoc?.tags || [tag],
          image: dbDoc.image || mockDoc?.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
          experience: dbDoc.experience || mockDoc?.experience || "10 Years",
          patients: mockDoc?.patients || "5,000+",
          rating: dbDoc.rating || mockDoc?.rating || 4.8,
          reviews: mockDoc?.reviews || 120,
          languages: mockDoc?.languages || ["Urdu", "English"],
          available: dbDoc.status === "Active" ? (mockDoc?.available !== undefined ? mockDoc.available : true) : false,
          nextSlot: mockDoc?.nextSlot || "Today, 4:00 PM",
          gender: mockDoc?.gender || "Male",
          solidColor: mockDoc?.solidColor || styles.solidColor,
          lightBg: mockDoc?.lightBg || styles.lightBg,
          badgeBg: mockDoc?.badgeBg || styles.badgeBg,
          badgeText: mockDoc?.badgeText || styles.badgeText,
          accentText: mockDoc?.accentText || styles.accentText,
          IconComp: mockDoc?.IconComp || styles.IconComp,
          bio: mockDoc?.bio || `Dr. ${dbDoc.name} is a dedicated specialist in ${dbDoc.specialty} committed to delivering top-tier patient rehabilitation at Vital Physio Hub.`,
          certifications: mockDoc?.certifications || ["Certified Clinical Specialist"],
          education: mockDoc?.education || [
            { degree: dbDoc.title || "Specialist", institution: "Authorized Rehabilitation Institute", year: "2016" }
          ],
          email: dbDoc.email || mockDoc?.email || `${dbDoc.name.toLowerCase().replace(/[^a-z0-9]/g, "")}@physiohub.com`,
          social: {
            linkedin: dbDoc.social_linkedin || mockDoc?.social?.linkedin || "https://linkedin.com",
            facebook: dbDoc.social_facebook || mockDoc?.social?.facebook || "https://facebook.com",
            instagram: dbDoc.social_instagram || mockDoc?.social?.instagram || "https://instagram.com",
            twitter: dbDoc.social_twitter || mockDoc?.social?.twitter || "https://twitter.com"
          },
          cv_file: dbDoc.cv_file || null,
          cv_name: dbDoc.cv_name || null,
          certificates_file: dbDoc.certificates_file || null,
          certificates_name: dbDoc.certificates_name || null,
          degrees_file: dbDoc.degrees_file || null,
          degrees_name: dbDoc.degrees_name || null,
          rewards_file: dbDoc.rewards_file || null,
          rewards_name: dbDoc.rewards_name || null,
          admin_note: dbDoc.admin_note || null,
          specializations: mockDoc?.specializations || [dbDoc.specialty],
          services: mockDoc?.services || [dbDoc.specialty],
          availabilitySchedule: mockDoc?.availabilitySchedule || [
            { day: "Monday", time: "9:00 AM – 2:00 PM" },
            { day: "Wednesday", time: "3:00 PM – 7:00 PM" }
          ],
          realStats: true
        };
      });
      setDoctorsList(mergedDocs.filter(d => d.status === "Active"));
    };
    fetchDoctors();
  }, []);

  const filtered = doctorsList.filter(d => {
    const matchTag    = activeTag === "all" || d.tag === activeTag || (d.tags && d.tags.includes(activeTag));
    const matchGender = gender === "all"    || d.gender === gender;
    const matchBranch = branch === "all"    || d.branch.includes(branch);
    const matchAvail  = avail === "all"     || d.available;
    const q = search.toLowerCase();
    const matchSearch = !q
      || d.name.toLowerCase().includes(q)
      || d.specialty.toLowerCase().includes(q)
      || d.specializations.some(s => s.toLowerCase().includes(q))
      || d.title.toLowerCase().includes(q);
    return matchTag && matchGender && matchBranch && matchAvail && matchSearch;
  });

  const whatsappNumber = "923008786187";
  const welcomeMessage = encodeURIComponent("Hello Vital Physio Hub, I want to inquire about your healthcare services.");

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      <Navbar />
      {selected && <DoctorModal doctor={selected} onClose={() => setSelected(null)} />}

      <Banner />

      <FilterBar
        activeTag={activeTag}   setActiveTag={setActiveTag}
        gender={gender}         setGender={setGender}
        branch={branch}         setBranch={setBranch}
        avail={avail}           setAvail={setAvail}
        search={search}         setSearch={setSearch}
        count={filtered.length}
      />

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              {activeTag === "all" ? "All Specialists" : TAGS.find(t => t.value === activeTag)?.label}
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} · click any card for full profile
            </p>
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((doc, i) => (
                <DoctorCard key={doc.id} doctor={doc} onOpen={setSelected} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <FiSearch size={26} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-600 mb-2">No doctors found</h3>
              <p className="text-slate-400 text-sm mb-5">Try adjusting your search or filters.</p>
              <button onClick={() => { setActiveTag("all"); setGender("all"); setBranch("all"); setAvail("all"); setSearch(""); }}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow cursor-pointer"
                style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)" }}>
                Reset All Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden py-20 mt-4"
        style={{ background:"linear-gradient(135deg,#0ea5e9 0%,#7c3aed 50%,#db2777 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 font-serif">
            Not Sure Which Specialist You Need?
          </h2>
          <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto">
            Our team will guide you to the right doctor. Book a free consultation or chat on WhatsApp.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate("/book-appointment")}
              className="px-8 py-3.5 rounded-xl font-bold text-sky-600 bg-white shadow-xl hover:bg-white/90 transition-all flex items-center gap-2 text-sm cursor-pointer">
              <FiCalendar size={14} /> Book Free Consultation
            </button>
            <a href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`}
              target="_blank" rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl font-bold text-white border-2 border-white/40 hover:bg-white/10 transition-all flex items-center gap-2 text-sm">
              <FiMessageCircle size={14} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        <div className="absolute w-16 h-16 bg-green-500 rounded-full animate-ping opacity-40 pointer-events-none" />
        <motion.a
          href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`}
          target="_blank" rel="noopener noreferrer"
          whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }}
          initial={{ opacity:0, scale:0.6 }} animate={{ opacity:1, scale:1 }}
          transition={{ type:"spring", stiffness:260, damping:20 }}
          className="relative w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#20ba5a] transition-colors duration-200 cursor-pointer group">
          <FaWhatsapp size={36} />
          <span className="absolute right-20 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 pointer-events-none transition-all duration-200">
            Chat With Us
          </span>
        </motion.a>
      </div>
      <Footer />
    </div>
  );
}