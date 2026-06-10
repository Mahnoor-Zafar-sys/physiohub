import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FiX, FiChevronLeft, FiChevronRight,
  FiGrid, FiCamera, FiZoomIn, FiEye,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
import { TbStethoscope } from "react-icons/tb";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { LuHospital, LuGlobe } from "react-icons/lu";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const THEME = {
  pink:    "#e91e8c",
  sky:     "#0ea5e9",
  grad:    "linear-gradient(135deg, #fce4ec 0%, #e0f2fe 60%, #fdf4ff 100%)",
  gradBtn: "linear-gradient(135deg, #0ea5e9, #e91e8c)",
};

const GALLERY_ITEMS = [
  { id: 1, src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80", category: "facility", title: "Main Reception & Lounge", desc: "State-of-the-art welcoming area", span: "wide" },
  { id: 2, src: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=800&q=80", category: "equipment", title: "Advanced Diagnostic Lab", desc: "ISO-certified laboratory", span: "normal" },
  { id: 3, src: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&w=800&q=80", category: "team", title: "Our Expert Medical Team", desc: "Dedicated professionals", span: "normal" },
  { id: 4, src: "https://images.unsplash.com/photo-1578991624414-276ef23a534f?auto=format&fit=crop&w=800&q=80", category: "treatment", title: "Laser Treatment Suite", desc: "Advanced dermatology tech", span: "normal" },
  { id: 5, src: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80", category: "facility", title: "Private Consultation Rooms", desc: "Comfortable & confidential", span: "normal" },
  { id: 6, src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80", category: "equipment", title: "Digital X-Ray & Imaging", desc: "High-resolution diagnostics", span: "tall" },
  { id: 7, src: "https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?auto=format&fit=crop&w=800&q=80", category: "facility", title: "Modern Operation Theater", desc: "Sterile & fully equipped OT", span: "wide" },
  { id: 8, src: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=800&q=80", category: "team", title: "Dental Care Unit", desc: "Advanced oral health center", span: "normal" },
  { id: 9, src: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80", category: "results", title: "Patient Recovery Suite", desc: "Comfortable post-care rooms", span: "normal" },
  { id: 10, src: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80", category: "equipment", title: "In-House Pharmacy", desc: "Stocked with 5000+ medicines", span: "normal" },
];

const GALLERY_CATS = [
  { value: "all", label: "All Photos", icon: FiGrid },
  { value: "facility", label: "Facility", icon: FiCamera },
  { value: "equipment", label: "Equipment", icon: TbStethoscope },
  { value: "team", label: "Our Team", icon: MdOutlineHealthAndSafety },
  { value: "results", label: "Results", icon: HiSparkles },
];

function Lightbox({ items, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  const item = items[currentIndex];
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative max-w-4xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={item.src} alt={item.title} className="w-full rounded-2xl object-cover max-h-[75vh]" />
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl text-left">
            <p className="text-white font-bold">{item.title}</p>
            <p className="text-white/77 text-sm">{item.desc}</p>
          </div>
          <button onClick={onClose} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <FiX size={16} />
          </button>
          <button onClick={onPrev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <FiChevronLeft size={18} />
          </button>
          <button onClick={onNext} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <FiChevronRight size={18} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function GalleryItem({ item, index, onOpen }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: (index % 6) * 0.07 }}
      onClick={() => onOpen(index)}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-white ${
        item.span === "wide" ? "col-span-1 md:col-span-2" : "col-span-1"
      } ${
        item.span === "tall" ? "row-span-1 md:row-span-2" : "row-span-1"
      }`}
      style={{ minHeight: 180 }}
    >
      <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 p-4 text-left pointer-events-none"
      >
        <p className="text-white font-bold text-sm">{item.title}</p>
        <p className="text-white/70 text-xs mt-0.5">{item.desc}</p>
        <div className="mt-2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
          <FiZoomIn size={14} className="text-white" />
        </div>
      </motion.div>
      <div className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full opacity-90" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", color: "white" }}>
        {item.category.toUpperCase()}
      </div>
    </motion.div>
  );
}

export default function GalleryPage({ onBookAppointment }) {
  const [galleryCat, setGalleryCat] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredGallery = GALLERY_ITEMS.filter((g) => galleryCat === "all" || g.category === galleryCat);

  return (
    <div className="min-h-screen font-sans" style={{ background: THEME.grad }}>
      <Navbar onBookAppointment={onBookAppointment} />

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <Lightbox
          items={filteredGallery}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i - 1 + filteredGallery.length) % filteredGallery.length)}
          onNext={() => setLightboxIndex((i) => (i + 1) % filteredGallery.length)}
        />
      )}

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-32 pb-10 px-4">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-4 shadow-sm" style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(10px)", color: THEME.pink, border: "1px solid #fce4ec" }}>
            <HiSparkles size={13} />
            View Our World-Class Infrastructure
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }} className="text-4xl sm:text-6xl font-black text-slate-800 mb-3 leading-tight">
            Clinic{" "}
            <span style={{ background: "linear-gradient(135deg, #e91e8c, #0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Gallery</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }} className="text-slate-500 text-lg max-w-2xl mx-auto mb-8">
            Take a virtual tour through our modern treatment spaces, operating theaters, recovery lounges, and diagnostics facilities.
          </motion.p>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="px-4 pb-20 max-w-7xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-1 h-8 rounded-full" style={{ background: THEME.gradBtn }} />
              <h2 className="text-2xl font-black text-slate-800">Clinic Infrastructure</h2>
            </div>
            <p className="text-slate-400 text-sm ml-4">Advanced diagnostic, surgical, and healing environments</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: "rgba(255,255,255,0.8)", color: "#64748b", border: "1px solid #e2e8f0" }}>
            <FiEye size={13} /> {filteredGallery.length} photos
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {GALLERY_CATS.map((cat) => (
            <button key={cat.value} onClick={() => setGalleryCat(cat.value)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200" style={galleryCat === cat.value ? { background: THEME.gradBtn, color: "white", boxShadow: "0 2px 12px rgba(233,30,140,0.25)" } : { background: "rgba(255,255,255,0.8)", color: "#64748b", border: "1px solid #e2e8f0" }}>
              <cat.icon size={12} /> {cat.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gridAutoRows: "minmax(200px, auto)" }}>
          {filteredGallery.map((item, i) => <GalleryItem key={item.id} item={item} index={i} onOpen={setLightboxIndex} />)}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-12 rounded-3xl p-8 text-center overflow-hidden relative" style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #e91e8c 100%)" }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <div className="flex justify-center mb-3">
              <LuHospital size={36} className="text-white animate-pulse" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Take a Virtual Tour</h3>
            <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">Experience our state-of-the-art facility from the comfort of your home with our 360° interactive tour.</p>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm shadow-xl bg-white hover:bg-white/90 transition-colors mx-auto" style={{ color: THEME.pink }}>
              <LuGlobe size={16} /> Start 360° Tour
            </motion.button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
