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
  { id: 1, src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80", category: "facility", title: "Main Reception & Waiting Lobby", desc: "Premium glassmorphic waiting area with botanical healing aesthetics.", span: "wide" },
  { id: 2, src: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=800&q=80", category: "equipment", title: "Advanced Diagnostic Wing", desc: "German-engineered biomechanical diagnostic terminals.", span: "normal" },
  { id: 3, src: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&w=800&q=80", category: "team", title: "Team of Expert Consultants", desc: "Board-certified medical and manual therapy practitioners.", span: "normal" },
  { id: 4, src: "https://images.unsplash.com/photo-1578991624414-276ef23a534f?auto=format&fit=crop&w=800&q=80", category: "treatment", title: "Laser Treatment Suite", desc: "Advanced clinical skin laser devices.", span: "normal" },
  { id: 5, src: "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80,https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80", category: "before-after", title: "Acne & Skin Resurfacing", desc: "Clinical results after 3 sessions of fractional CO2 laser treatment. Acne scarring and hyperpigmentation reduced by 85%.", span: "Dermatology" },
  { id: 6, src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80,https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80", category: "before-after", title: "Smile Makeover (Veneers)", desc: "Full mouth porcelain veneers smile design completed in 2 visits. Corrected bite alignment and tooth discoloration.", span: "Dentistry" }
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
            <motion.button 
              whileHover={{ scale: 1.04 }} 
              whileTap={{ scale: 0.96 }} 
              onClick={() => setTourOpen(true)}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm shadow-xl bg-white hover:bg-white/90 transition-colors mx-auto cursor-pointer border-none" 
              style={{ color: THEME.pink }}
            >
              <LuGlobe size={16} /> Start 360° Tour
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* 360 VIRTUAL TOUR MODAL */}
      <AnimatePresence>
        {tourOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={() => setTourOpen(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-950 rounded-3xl p-6 max-w-4xl w-full text-slate-100 shadow-2xl relative border border-slate-800 text-left overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setTourOpen(false)} 
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors border-none cursor-pointer z-50"
              >
                <FiX size={15} />
              </button>

              <div className="relative h-[400px] w-full bg-slate-900 rounded-2xl overflow-hidden mb-4">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={tourIndex}
                    src={TOUR_SCENES[tourIndex].url}
                    alt={TOUR_SCENES[tourIndex].name}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover select-none"
                  />
                </AnimatePresence>

                {/* Simulated Panoramic Scan Animation Layer */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
                <div className="absolute top-4 left-4 bg-slate-950/70 border border-slate-800 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                  Simulated 360° Panoramic Feed
                </div>

                {/* Navigation Controls */}
                <button 
                  onClick={() => setTourIndex(i => (i - 1 + TOUR_SCENES.length) % TOUR_SCENES.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/60 border border-slate-800 hover:bg-slate-800 flex items-center justify-center text-white transition-colors cursor-pointer border-none"
                >
                  <FiChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => setTourIndex(i => (i + 1) % TOUR_SCENES.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/60 border border-slate-800 hover:bg-slate-800 flex items-center justify-center text-white transition-colors cursor-pointer border-none"
                >
                  <FiChevronRight size={20} />
                </button>
              </div>

              <div>
                <h4 className="font-extrabold text-lg text-white mb-1">{TOUR_SCENES[tourIndex].name}</h4>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{TOUR_SCENES[tourIndex].desc}</p>
              </div>

              {/* Thumbnails Navigation Row */}
              <div className="flex gap-2.5 mt-5 border-t border-slate-900 pt-4 overflow-x-auto pb-1.5">
                {TOUR_SCENES.map((scene, sIdx) => (
                  <button 
                    key={scene.id}
                    onClick={() => setTourIndex(sIdx)}
                    className="flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 relative cursor-pointer"
                    style={{ borderColor: tourIndex === sIdx ? THEME.pink : "transparent" }}
                  >
                    <img src={scene.url} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 hover:bg-transparent transition-colors" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
