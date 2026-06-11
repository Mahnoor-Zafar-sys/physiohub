import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { FiCalendar, FiArrowRight, FiX, FiAward, FiVolume2, FiCpu, FiTrendingUp } from "react-icons/fi";

const newsArticles = [
  {
    id: 1,
    title: "Premium Clinic Awarded JCI Gold Seal of Approval",
    date: "June 05, 2026",
    category: "Accreditation",
    badge: "Gold Award",
    summary: "Joint Commission International (JCI) has awarded Premium Clinic the gold seal of approval for patient safety and clinical excellence, recognizing our hospital-wide dedication to global healthcare quality.",
    content: "Premium Clinic has officially been accredited by the Joint Commission International (JCI), the world's premier body for healthcare quality evaluation. This prestigious gold seal recognizes our commitment to meeting the highest global safety standards, infection control protocols, and clinical outcome metrics. The accreditation audit analyzed over 300 standards across patient rights, medication management, and clinical training. Our CEO stated: 'This is a testament to our relentless pursuit of safety, compassion, and innovation.'",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80",
    icon: FiAward,
    color: "from-amber-500 to-yellow-400",
    textCol: "text-amber-600",
    bgCol: "bg-amber-50",
    borderCol: "border-amber-200"
  },
  {
    id: 2,
    title: "Launch of AI-Powered Telemedicine & Virtual Care Center",
    date: "May 20, 2026",
    category: "Technology",
    badge: "New Feature",
    summary: "Introducing our new, secure online consulting suite powered by AI-driven symptom triage. Patients can now access top specialists from the comfort of their homes.",
    content: "We are proud to unveil our next-generation Online Consultation Hub. Integrated with advanced diagnostics, live high-definition video consulting, and secure HIPAA-compliant electronic medical records (EMR), the platform allows patients to connect with over 24 board-certified doctors. Additionally, our new AI-powered triage helper assists patients in identifying their symptoms and automatically routes them to the correct medical department, ensuring faster and more accurate diagnostics.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    icon: FiCpu,
    color: "from-sky-500 to-blue-400",
    textCol: "text-sky-600",
    bgCol: "bg-sky-50",
    borderCol: "border-sky-200"
  },
  {
    id: 3,
    title: "Expansion of DHA Branch & Specialty Surgery Center",
    date: "April 15, 2026",
    category: "Infrastructure",
    badge: "Expansion",
    summary: "Premium Clinic has completed the second phase of its DHA facility expansion, featuring six state-of-the-art operating theaters and an advanced pediatric clinic.",
    content: "Our DHA Phase 5 wing has completed expansion construction. The newly launched wing adds three ultra-hygienic surgical wards, a specialized pediatric critical care zone, and advanced dermatology suites. Equipped with German-engineered anesthesia towers and robotic-assisted surgical arm systems, the center is prepared to perform highly complex neurosurgical and orthopedic operations. This expansion increases our capacity to serve an additional 15,000 patients annually.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    icon: FiTrendingUp,
    color: "from-pink-500 to-rose-400",
    textCol: "text-pink-600",
    bgCol: "bg-pink-50",
    borderCol: "border-pink-200"
  },
  {
    id: 4,
    title: "Annual Health Outreach Campaign Reaches 10,000 Families",
    date: "March 10, 2026",
    category: "Community Outreach",
    badge: "CSR Impact",
    summary: "Our medical teams successfully conducted 12 free healthcare camps in remote and underserved areas, providing diagnostics, treatments, and medicines.",
    content: "Under our CSR umbrella, Premium Clinic mobilized four emergency healthcare fleets to establish temporary diagnostic hubs in underserved rural districts. Over 10,000 patients received comprehensive physiological checks, diabetes screenings, pediatric reviews, and complimentary prescription packages. Over 150 complex surgical referrals were sponsored directly by our clinic, helping families access critical surgeries free of charge.",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
    icon: FiVolume2,
    color: "from-teal-500 to-emerald-400",
    textCol: "text-teal-600",
    bgCol: "bg-teal-50",
    borderCol: "border-teal-200"
  }
];

export default function NewsPress() {
  const [selectedArticle, setSelectedArticle] = useState(null);

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
                onClick={() => setSelectedArticle(art)}
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

      {/* --- DETAILS MODAL --- */}
      <AnimatePresence>
        {selectedArticle && (
          <div 
            className="fixed inset-0 z-[150] flex items-center justify-center p-4"
            style={{ background: "rgba(2,8,23,0.7)", backdropFilter: "blur(6px)" }}
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/50 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-slate-950 transition-all z-20"
              >
                <FiX size={18} />
              </button>

              {/* Banner Image */}
              <div className="h-72 sm:h-96 relative">
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${selectedArticle.bgCol} ${selectedArticle.textCol} border ${selectedArticle.borderCol} mb-3 shadow`}>
                    {selectedArticle.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                    {selectedArticle.title}
                  </h2>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-8 overflow-y-auto max-h-[50vh] text-left">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-6">
                  <FiCalendar />
                  <span>{selectedArticle.date}</span>
                  <span className="text-slate-200">•</span>
                  <span className="font-bold text-sky-600">Official Press Release</span>
                </div>

                <p className="text-slate-650 text-base leading-relaxed whitespace-pre-line">
                  {selectedArticle.content}
                </p>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>For media inquiries: media@premiumclinic.com</span>
                  <span>PR Desk, Islamabad HQ</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
