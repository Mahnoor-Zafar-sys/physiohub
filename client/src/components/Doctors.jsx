import { motion } from "framer-motion";
import { FiStar, FiCalendar, FiMessageCircle } from "react-icons/fi";
import { doctors } from "../data/mockData";

export default function Doctors() {
  return (
    <section id="doctors" className="py-24 bg-gradient-to-b from-slate-50/60 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Typography Heading Area (Centered) */}
        <div className="flex flex-col items-center justify-center text-center mb-16 max-w-2xl mx-auto relative z-10">
          
          {/* --- HEADING & BADGE: Left to Right (Repeats on every scroll) --- */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }} // once: false ensures repeat on scroll
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-med-green/10 border border-med-green/20 text-med-green text-xs font-semibold font-body uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 bg-med-green rounded-full" />
              Our Specialists
            </span>
            
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mt-1">
              Meet Our <span className="text-gradient">Expert Doctors</span>
            </h2>
          </motion.div>

          {/* --- SUBTEXT PARAGRAPH: Right to Left (Repeats on every scroll) --- */}
          <motion.p
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }} // once: false ensures repeat on scroll
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-slate-500 font-body font-light text-lg max-w-xl"
          >
            Board-certified specialists with international training and decades of experience.
          </motion.p>
        </div>

        {/* Doctor Cards Grid Context */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {doctors.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }} // Repeats when cards roll into viewport
              transition={{ delay: i * 0.1, duration: 0.65 }}
              whileHover={{ y: -12 }}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 cursor-pointer"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
            >
              {/* Image Box */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=0ea5e9&color=fff&size=400`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Available Status Badge */}
                <div className={`absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-body ${doc.available ? "bg-med-green text-white" : "bg-slate-400 text-white"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${doc.available ? "bg-white animate-pulse" : "bg-white/60"}`} />
                  {doc.available ? "Available" : "Busy"}
                </div>

                {/* Interactive Dynamic Action Handles on Hover */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400">
                  <button className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white flex items-center justify-center hover:bg-white/30 transition-colors">
                    <FiMessageCircle size={16} />
                  </button>
                  <button className="px-5 py-2 bg-med-blue rounded-xl text-white text-sm font-semibold font-body flex items-center gap-2 hover:bg-med-blue-dark transition-colors" style={{ boxShadow: "0 0 15px rgba(14,165,233,0.5)" }}>
                    <FiCalendar size={14} />
                    Book Now
                  </button>
                </div>
              </div>

              {/* Doctors Meta Info Container */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-display font-bold text-slate-900 text-lg leading-tight">
                      {doc.name}
                    </h3>
                    <p className="text-med-blue font-body font-medium text-sm mt-0.5">
                      {doc.specialty}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl">
                    <FiStar className="text-amber-400 text-xs fill-current" />
                    <span className="text-amber-600 text-xs font-bold font-body">{doc.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-slate-400 text-xs font-body">
                    {doc.experience} Experience
                  </span>
                  <span className="text-slate-400 text-xs font-body">
                    {doc.reviews} reviews
                  </span>
                </div>

                {/* Progress Metric Rating Vector */}
                <div className="mt-4 h-1 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(doc.rating / 5) * 100}%` }}
                    viewport={{ once: false }} // Animates the line fill on every scroll pass
                    transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #0ea5e9, #22c55e)" }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- CHANGED: View All Button placed cleanly at the bottom center --- */}
        <div className="flex justify-center w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="px-8 py-3.5 rounded-xl border-2 border-med-blue/30 text-med-blue font-bold font-body text-sm bg-white hover:bg-med-blue/5 shadow-sm hover:shadow-md transition-all duration-300"
            >
              View All Doctors →
            </motion.button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}