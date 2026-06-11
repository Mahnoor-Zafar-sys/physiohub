import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { FiCalendar, FiArrowRight, FiVolume2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { newsArticles } from "../data/newsData";

export default function NewsPress() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-body select-none">
      <Navbar />

      {/* --- HERO BANNER --- */}
      <section 
        className="relative overflow-hidden pt-36 pb-20"
        style={{ background: "linear-gradient(135deg,#f0f9ff 0%,#ffffff 45%,#fdf2f8 100%)" }}
      >
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(14,165,233,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(219,39,119,.05) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-sky-600 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <FiVolume2 className="text-sky-500" />
              Media & Press Releases
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-serif mb-6 leading-tight text-slate-900">
              News & <span style={{ background: "linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Media Hub</span>
            </h1>
            <p className="text-slate-500 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              Stay informed about our latest clinical innovations, infrastructure advancements, corporate social activities, and global quality accreditations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- NEWS GRID --- */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {newsArticles.map((art, idx) => {
            const Icon = art.icon;
            return (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                onClick={() => navigate(`/news/${art.id}`)}
              >
                {/* Image Section */}
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={art.image} 
                    alt={art.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-white text-slate-800 shadow-md border border-slate-100`}>
                      <Icon className="text-blue-500" />
                      {art.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-3">
                      <FiCalendar />
                      <span>{art.date}</span>
                      <span className="text-slate-200">•</span>
                      <span className={`font-bold ${art.textCol}`}>{art.badge}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-950 mb-3 group-hover:text-sky-600 transition-colors duration-200">
                      {art.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                      {art.summary}
                    </p>
                  </div>

                  <div className={`flex items-center gap-1.5 text-sm font-extrabold ${art.textCol} mt-auto`}>
                    Read Full Article <FiArrowRight className="group-hover:translate-x-1.5 transition-transform duration-200" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
