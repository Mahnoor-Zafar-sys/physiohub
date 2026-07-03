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
import { api } from "../services/api";

const THEME = {
  pink:    "#e91e8c",
  sky:     "#0ea5e9",
  grad:    "linear-gradient(135deg, #fce4ec 0%, #e0f2fe 60%, #fdf4ff 100%)",
  gradBtn: "linear-gradient(135deg, #0ea5e9, #e91e8c)",
};

const DEFAULT_GALLERY = [
  { id: 1, src: "/gallery/Reciption-desk.jpeg", category: "facility", title: "Main Reception Desk", desc: "Our main reception area designed to welcome you with a professional and friendly environment.", span: "wide" },
  { id: 2, src: "/gallery/Reciption-desk-view-2.jpeg", category: "facility", title: "Reception Desk Lobby View", desc: "A spacious waiting lobby next to the reception counter featuring modern comforts.", span: "normal" },
  { id: 3, src: "/gallery/ceo-room-inside.jpeg", category: "facility", title: "Executive Consultation Room", desc: "The primary office where board-certified specialists conduct detailed clinical assessments.", span: "normal" },
  { id: 4, src: "/gallery/gallery-outside-ceo-office.jpeg", category: "facility", title: "Main Walkway and Lounge Corridor", desc: "Clean, spacious corridors leading to consulting rooms and therapy bays.", span: "normal" },
  { id: 5, src: "/gallery/patient-bed.jpeg", category: "equipment", title: "Physiotherapy Treatment Bed", desc: "Ergonomically designed treatment beds optimized for therapeutic manual manipulation and rehabilitation exercises.", span: "normal" },
  { id: 6, src: "/gallery/patient-bed-view-2.jpeg", category: "equipment", title: "Dedicated Therapy Bay", desc: "Private treatment spaces equipped with electrotherapy and support systems for targeted recovery.", span: "normal" },
  { id: 7, src: "/gallery/patient-waiting-launch.jpeg", category: "facility", title: "Patient Waiting Lounge", desc: "Comfortable and calming waiting lounge featuring premium amenities and soothing aesthetics.", span: "wide" }
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

function BeforeAfterSlider({ beforeImg, afterImg, title, desc, tag }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.getBoundingClientRect().width);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.getBoundingClientRect().width);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e) => {
    // Only update position if mouse is hovering/moving inside the container
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div className="text-left">
        <span className="text-[10px] font-black tracking-wider uppercase text-pink-500 bg-pink-50 px-2.5 py-1 rounded-full">{tag}</span>
        <h3 className="font-extrabold text-slate-800 text-base mt-2.5 mb-1.5">{title}</h3>
      </div>
      
      {/* Slider Container */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[240px] sm:h-[280px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-slate-100"
      >
        {/* After Image (Full Background) */}
        <img 
          src={afterImg} 
          alt="After Treatment" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute right-3 bottom-3 bg-slate-900/80 px-2 py-0.5 rounded text-[9px] font-bold text-white uppercase tracking-widest pointer-events-none z-10">After</div>

        {/* Before Image (Clipped Overlay) */}
        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPos}%` }}
        >
          <img 
            src={beforeImg} 
            alt="Before Treatment" 
            className="absolute inset-0 object-cover max-w-none"
            style={{ width: width || '100%', height: '100%' }}
          />
          <div className="absolute left-3 bottom-3 bg-red-600/80 px-2 py-0.5 rounded text-[9px] font-bold text-white uppercase tracking-widest pointer-events-none z-10">Before</div>
        </div>

        {/* Vertical Divider handle line */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-6 h-6 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-[10px] pointer-events-auto">
            ↔
          </div>
        </div>
      </div>
      <p className="text-slate-500 text-xs mt-3.5 text-left leading-relaxed">{desc}</p>
    </div>
  );
}

const TOUR_SCENES = [
  { id: 1, name: "Clinic Main Reception & Waiting Area", url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=100", desc: "A spacious, premium glassmorphic reception lobby with healing botanical aesthetics and ambient light lines." },
  { id: 2, name: "Consultation & Examination Cabin", url: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1200&q=100", desc: "Private clinical examination area equipped with secure diagnostics terminals and patient comfort modules." },
  { id: 3, name: "Sterile Modular Operating Theater", url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=100", desc: "Advanced sterile surgery ward outfitted with modern surgical tools and robotic system integration hooks." },
  { id: 4, name: "Modern High-End Pathology & Diagnostic Lab", url: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1200&q=100", desc: "High-throughput laboratory facilitating automated molecular, hematology, and genetic sequencing panels." }
];

export default function GalleryPage({ onBookAppointment }) {
  const [gallery, setGallery] = useState(DEFAULT_GALLERY);
  const [galleryCat, setGalleryCat] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [tourOpen, setTourOpen] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);

  useEffect(() => {
    api.getGallery().then((data) => {
      if (data && data.length > 0) {
        setGallery(data.map(g => ({
          ...g,
          desc: g.description || g.desc
        })));
      }
    });
  }, []);

  const filteredGallery = gallery.filter((g) => {
    if (galleryCat === "all") {
      return g.category !== "before-after";
    }
    if (galleryCat === "results") {
      return g.category === "before-after";
    }
    return g.category === galleryCat;
  });

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

        {galleryCat === "results" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredGallery.map((item) => {
              const imgs = item.src ? item.src.split(",") : ["", ""];
              return (
                <BeforeAfterSlider 
                  key={item.id}
                  tag={item.span || "Treatment"}
                  title={item.title}
                  desc={item.desc || item.description}
                  beforeImg={imgs[0]}
                  afterImg={imgs[1] || imgs[0]}
                />
              );
            })}
          </div>
        ) : (
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gridAutoRows: "minmax(200px, auto)" }}>
            {filteredGallery.map((item, i) => <GalleryItem key={item.id} item={item} index={i} onOpen={setLightboxIndex} />)}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
