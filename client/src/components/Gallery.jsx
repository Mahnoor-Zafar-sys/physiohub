import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMaximize2, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Working HD Image URLs with exact text matching attached to the first component structure
const galleryImages = [
  {
    id: 1,
    label: "Physiohub Interior & Reception Setup",
    category: "Clinic Images",
    url: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1600&q=100",
  },
  {
    id: 2,
    label: "Senior Consultant Physicians & Medical Staff",
    category: "Team Photos",
    url: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1600&q=100",
  },
  {
    id: 3,
    label: "Advanced 3T MRI & High-End Diagnostics Setup",
    category: "Equipment Showcase",
    url: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=1600&q=100",
  },
  {
    id: 4,
    label: "Follicular Unit Extraction Hair Graft Progress",
    category: "Before/After Results",
    url: "/hairtransplant.webp",
  },
  {
    id: 5,
    label: "Modular Sterile Operation Theater Infrastructure",
    category: "Clinic Images",
    url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=100",
  },
  {
    id: 6,
    label: "Certified Specialist Doctors Consultation Session",
    category: "Team Photos",
    url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=100",
  },
];

export default function Gallery() {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  // Auto Slide loop matching the working approach
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [startIndex, visibleCards]);

  const handleNext = () => {
    setStartIndex(
      (prev) => (prev + 1) % (galleryImages.length - visibleCards + 1)
    );
  };

  const handlePrev = () => {
    setStartIndex(
      (prev) =>
        (prev - 1 + (galleryImages.length - visibleCards + 1)) %
        (galleryImages.length - visibleCards + 1)
    );
  };

  return (
    <section
      id="gallery"
      className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden select-none"
    >
      {/* Dynamic Style Injection for "Clinical Excellence" Royal Blue Shimmer */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes royalShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .royal-glitter {
          background: linear-gradient(
            to right, 
            #1e3a8a 0%, 
            #2563eb 25%, 
            #3b82f6 50%, 
            #2563eb 75%, 
            #1e3a8a 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: royalShimmer 4s linear infinite;
          display: inline-block;
        }
      `}} />

      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* CENTERED HEADER BLOCK WITH REPEATING SCROLL ANIMATIONS */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center justify-center overflow-hidden">
          
          {/* --- HEADING: Smooth Scale & Y-Axis Reveal (Repeats every time on scroll) --- */}
          <div className="w-full overflow-hidden py-1">
            <motion.h2 
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight w-full"
            >
              A Glimpse into Our <span className="royal-glitter">Clinical Excellence</span> & Facilities
            </motion.h2>
          </div>

          {/* --- SUBTEXT PARAGRAPH: Smooth Reveal (Repeats perfectly aligned with heading) --- */}
          <div className="w-full overflow-hidden">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="mt-5 text-slate-500 text-base sm:text-lg leading-relaxed font-body font-normal max-w-2xl"
            >
              Explore our professional medical setups, dedicated patient environments, 
              and advanced infrastructure designed to provide high-quality healthcare 
              and treatment workflows.
            </motion.p>
          </div>
        </div>

        {/* CAROUSEL SLIDER WINDOW (Using the stable sizing logic) */}
        <div className="overflow-hidden py-3">
          <motion.div
            animate={{
              x: `-${startIndex * (100 / visibleCards)}%`,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 22,
            }}
            className="flex gap-6"
          >
            {galleryImages.map((img) => (
              <motion.div
                whileHover={{ y: -8 }}
                key={img.id}
                onClick={() => setSelectedImage(img)}
                className="relative w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 rounded-[28px] overflow-hidden cursor-pointer bg-white border border-slate-200 shadow-lg group text-left"
                style={{ aspectRatio: "4/3" }}
              >
                {/* Image Component */}
                <img
                  src={img.url}
                  alt={img.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Dark Shaded Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-5 left-5 z-20">
                  <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-xl border border-white/10 text-white text-[9px] font-extrabold uppercase tracking-[0.15em]">
                    {img.category}
                  </span>
                </div>

                {/* Action Zoom Icon */}
                <div className="absolute top-5 right-5 z-20 w-10 h-10 rounded-xl bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <FiMaximize2 size={14} />
                </div>

                {/* Card Title Label */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-white text-base sm:text-lg font-bold leading-snug tracking-tight">
                    {img.label}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* BOTTOM LAYOUT DESIGN FOR NAVIGATION CONTROLS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16">
          <div className="flex items-center gap-3 order-2 sm:order-1">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-950 hover:text-white transition-all duration-300 active:scale-95"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-950 hover:text-white transition-all duration-300 active:scale-95"
            >
              <FiChevronRight size={20} />
            </button>
          </div>

          {/* Explore Complete Gallery Button with Blue Hover Style & Smooth Shadow Shifts */}
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-950 text-white font-bold uppercase tracking-wider text-xs hover:bg-blue-600 transition-all duration-300 shadow-xl hover:shadow-lg hover:shadow-blue-500/20 order-1 sm:order-2"
            style={{ textDecoration: "none" }}
          >
            Explore Complete Gallery
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </Link>
        </div>

      </div>

      {/* LIGHTBOX POPUP COMPONENT */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.93, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 15 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full overflow-hidden rounded-[32px] bg-slate-950 border border-white/10 shadow-2xl text-left"
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.label}
                className="w-full h-auto max-h-[70vh] object-cover mx-auto"
              />
              <div className="p-6 sm:p-8 bg-slate-950">
                <span className="inline-flex px-3 py-1 rounded-full bg-blue-500 text-white text-[10px] font-extrabold uppercase tracking-[0.2em]">
                  {selectedImage.category}
                </span>
                <h3 className="text-white text-xl sm:text-2xl font-bold mt-4 leading-snug">
                  {selectedImage.label}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}








// import { motion } from "framer-motion";
// import { FiMaximize2 } from "react-icons/fi";
// import { galleryImages } from "../data/mockData";

// export default function Gallery() {
//   return (
//     <section className="py-24 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-14"
//         >
//           <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-med-teal/10 border border-med-teal/20 text-med-teal text-xs font-semibold font-body uppercase tracking-widest mb-4">
//             <span className="w-1.5 h-1.5 bg-med-teal rounded-full" />
//             Our Facilities
//           </span>
//           <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 mt-2">
//             State-of-the-Art{" "}
//             <span className="text-gradient">Infrastructure</span>
//           </h2>
//           <p className="mt-4 text-slate-500 text-lg font-body font-light max-w-xl mx-auto">
//             Purpose-built spaces where design, technology, and healing converge.
//           </p>
//         </motion.div>

//         {/* Gallery Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {galleryImages.map((img, i) => (
//             <motion.div
//               key={img.id}
//               initial={{ opacity: 0, scale: 0.95 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.08, duration: 0.6 }}
//               className="group relative overflow-hidden rounded-2xl cursor-pointer"
//               style={{ aspectRatio: "4/3" }}
//             >
//               <img
//                 src={img.url}
//                 alt={img.label}
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
//                 onError={(e) => {
//                   e.target.style.background = "linear-gradient(135deg, #0ea5e9, #22c55e)";
//                   e.target.style.display = "none";
//                   e.target.parentElement.style.background = "linear-gradient(135deg, #0369a1, #0ea5e9)";
//                 }}
//               />

//               {/* Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

//               {/* Label */}
//               <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
//                 <p className="text-white font-display font-semibold text-lg">{img.label}</p>
//               </div>

//               {/* Expand icon */}
//               <div className="absolute top-4 right-4 w-9 h-9 bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300">
//                 <FiMaximize2 size={14} />
//               </div>

//               {/* Number badge */}
//               <div className="absolute top-4 left-4 w-8 h-8 bg-black/30 backdrop-blur-sm rounded-lg flex items-center justify-center text-white/60 text-xs font-mono font-medium">
//                 0{img.id}
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Bottom CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mt-10"
//         >
//           <motion.button
//             whileHover={{ scale: 1.04, y: -2 }}
//             whileTap={{ scale: 0.97 }}
//             className="px-8 py-3.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold font-body text-sm hover:border-med-blue hover:text-med-blue transition-all duration-300"
//           >
//             View Full Gallery →
//           </motion.button>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

