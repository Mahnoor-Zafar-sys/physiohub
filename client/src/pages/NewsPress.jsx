import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCalendar, FiArrowRight, FiVolume2, FiAward, FiCpu, FiTrendingUp } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { api } from "../services/api";

const getNewsStyles = (category) => {
  const cat = String(category).toLowerCase();
  if (cat.includes("accreditation") || cat.includes("award")) {
    return {
      icon: FiAward,
      color: "from-amber-500 to-yellow-400",
      textCol: "text-amber-600",
      bgCol: "bg-amber-50",
      borderCol: "border-amber-200",
      badge: "Gold Award"
    };
  }
  if (cat.includes("tech") || cat.includes("consult") || cat.includes("telemed")) {
    return {
      icon: FiCpu,
      color: "from-sky-500 to-blue-400",
      textCol: "text-sky-600",
      bgCol: "bg-sky-50",
      borderCol: "border-sky-200",
      badge: "New Feature"
    };
  }
  if (cat.includes("infra") || cat.includes("expansion") || cat.includes("branch")) {
    return {
      icon: FiTrendingUp,
      color: "from-pink-500 to-rose-400",
      textCol: "text-pink-600",
      bgCol: "bg-pink-50",
      borderCol: "border-pink-200",
      badge: "Expansion"
    };
  }
  return {
    icon: FiVolume2,
    color: "from-teal-500 to-emerald-400",
    textCol: "text-teal-600",
    bgCol: "bg-teal-50",
    borderCol: "border-teal-200",
    badge: "CSR Impact"
  };
};

const getFormattedDate = (dateStr) => {
  if (!dateStr) return "June 05, 2026";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  } catch (e) {
    return dateStr;
  }
};

const DEFAULT_NEWS = [
  {
    id: 1,
    title: "Vital Physio Hub Awarded JCI Gold Seal of Approval",
    date: "June 05, 2026",
    category: "Accreditation",
    badge: "Gold Award",
    summary: "Joint Commission International (JCI) has awarded Vital Physio Hub the gold seal of approval for patient safety and rehabilitation excellence, recognizing our clinic-wide dedication to global healthcare quality.",
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
    summary: "Vital Physio Hub has completed the second phase of its DHA facility expansion, featuring six state-of-the-art rehabilitation units and an advanced pediatric physiotherapy wing.",
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
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
    icon: FiVolume2,
    color: "from-teal-500 to-emerald-400",
    textCol: "text-teal-600",
    bgCol: "bg-teal-50",
    borderCol: "border-teal-200"
  }
];

export default function NewsPress() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState(DEFAULT_NEWS);

  useEffect(() => {
    async function loadNews() {
      const data = await api.getArticles();
      if (data && data.length > 0) {
        const news = data.filter(p => p.type === "news");
        if (news.length > 0) {
          const mapped = news.map(art => {
            const styles = getNewsStyles(art.category);
            return {
              ...art,
              summary: art.excerpt || art.summary || "",
              date: getFormattedDate(art.created_at),
              ...styles
            };
          });
          setArticles(mapped);
        } else {
          setArticles([]);
        }
      } else {
        setArticles(DEFAULT_NEWS);
      }
    }
    loadNews();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-body select-none">
      <SEOHead 
        title="Physiohub News & Press Releases | Physical Therapy Updates Lahore & Islamabad"
        description="Latest news, press releases, accreditation updates & awards for Physiohub rehabilitation clinic in Lahore and Islamabad, Pakistan."
        keywords="physiohub news Pakistan, physical therapy clinic press release Lahore, rehabilitation news Islamabad"
        canonicalUrl="https://physiohub.com/news"
      />
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
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((art, idx) => {
              const Icon = art.icon || FiVolume2;
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
        ) : (
          <div className="text-center py-16"><p className="text-slate-400 text-sm">No press releases found.</p></div>
        )}
      </section>

      <Footer />
    </div>
  );
}
