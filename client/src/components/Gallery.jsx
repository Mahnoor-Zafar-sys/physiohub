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

import { motion } from "framer-motion";
import { FiMaximize2 } from "react-icons/fi";
import { galleryImages } from "../data/mockData";

export default function Gallery() {
  // Agar external array me consultation room nahi hai, to ek premium medical image URL ke sath use shuruat me priority pe jod diya hai
  const finalGallery = galleryImages.some(img => img.label === "Patient Consultation Room")
    ? galleryImages
    : [
        {
          id: 1,
          label: "Patient Consultation Room",
          // Live professional medical consultation room high-res image link
          url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
        },
        ...galleryImages
      ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-med-teal/10 border border-med-teal/20 text-med-teal text-xs font-semibold font-body uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 bg-med-teal rounded-full" />
            Our Facilities
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 mt-2">
            State-of-the-Art{" "}
            <span className="text-gradient">Infrastructure</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg font-body font-light max-w-xl mx-auto">
            Purpose-built spaces where design, technology, and healing converge.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {finalGallery.map((img, i) => (
            <motion.div
              key={img.id || i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              style={{ aspectRatio: "4/3" }}
            >
              <img
                src={img.url}
                alt={img.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                onError={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #0ea5e9, #22c55e)";
                  e.target.style.display = "none";
                  e.target.parentElement.style.background = "linear-gradient(135deg, #0369a1, #0ea5e9)";
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                <p className="text-white font-display font-semibold text-lg">{img.label}</p>
              </div>

              {/* Expand icon */}
              <div className="absolute top-4 right-4 w-9 h-9 bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300">
                <FiMaximize2 size={14} />
              </div>

              {/* Number badge */}
              <div className="absolute top-4 left-4 w-8 h-8 bg-black/30 backdrop-blur-sm rounded-lg flex items-center justify-center text-white/60 text-xs font-mono font-medium">
                0{img.id || i + 1}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold font-body text-sm hover:border-med-blue hover:text-med-blue transition-all duration-300"
          >
            View Full Gallery →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}