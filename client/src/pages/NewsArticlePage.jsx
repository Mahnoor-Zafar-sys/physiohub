import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import SEOHead from "../components/SEOHead";
import { FiCalendar, FiArrowLeft, FiMail, FiShare2, FiShield, FiAward, FiCpu, FiTrendingUp, FiVolume2 } from "react-icons/fi";
import { motion } from "framer-motion";
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
    content: "Vital Physio Hub has officially been accredited by the Joint Commission International (JCI), the world's premier body for healthcare quality evaluation. This prestigious gold seal recognizes our commitment to meeting the highest global safety standards, infection control protocols, and rehabilitation outcome metrics. The accreditation audit analyzed over 300 standards across patient rights, medication management, and clinical training. Our CEO stated: 'This is a testament to our relentless pursuit of safety, compassion, and innovation.'",
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
    summary: "Vital Physio Hub has completed the second phase of its DHA facility expansion, featuring six state-of-the-art rehabilitation units and an advanced pediatric physiotherapy wing.",
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
    content: "Under our CSR umbrella, Vital Physio Hub mobilized four emergency physical therapy fleets to establish temporary diagnostic and rehabilitation hubs in underserved rural districts. Over 10,000 patients received comprehensive physiological checks, physical therapy sessions, pediatric reviews, and complimentary care packages. Over 150 complex orthopedic and neurological referrals were sponsored directly by our clinic, helping families access critical treatments free of charge.",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
    icon: FiVolume2,
    color: "from-teal-500 to-emerald-400",
    textCol: "text-teal-600",
    bgCol: "bg-teal-50",
    borderCol: "border-teal-200"
  }
];

export default function NewsArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      setLoading(true);
      const data = await api.getArticles();
      let found = null;
      if (data && data.length > 0) {
        const news = data.filter(p => p.type === "news");
        const match = news.find(art => String(art.id) === String(id));
        if (match) {
          const styles = getNewsStyles(match.category);
          found = {
            ...match,
            summary: match.excerpt || match.summary || "",
            date: getFormattedDate(match.created_at),
            ...styles
          };
        }
      }
      if (!found) {
        // Find in defaults
        const matchDefault = DEFAULT_NEWS.find(art => String(art.id) === String(id));
        if (matchDefault) {
          found = matchDefault;
        }
      }
      setArticle(found);
      setLoading(false);
    }
    loadArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 font-body flex items-center justify-center">
        <div className="text-slate-400 font-bold">Loading article...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 font-body flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto py-32 text-center px-6">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Article Not Found</h2>
          <p className="text-slate-500 mb-8">The news article you are trying to access does not exist or has been removed.</p>
          <Link 
            to="/news" 
            className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-sky-600 transition-colors inline-flex items-center gap-2"
          >
            <FiArrowLeft /> Back to News & Press
          </Link>
        </div>
        
      </div>
    );
  }

  const Icon = article.icon;

  return (
    <div className="min-h-screen bg-slate-50 font-body select-none">
      <SEOHead 
        title={`${article.title} | Vital Physio Hub News Islamabad`}
        description={article.summary || `${article.title} - Latest news from Vital Physio Hub physical therapy clinic in Islamabad.`}
        keywords={`${article.category}, physical therapy news Islamabad, rehabilitation news Islamabad`}
        canonicalUrl={`https://physiohub.com/news/${article.id}`}
      />
      <Navbar />

      {/* --- BREADCRUMB / BACK --- */}
      <section className="pt-32 pb-4 max-w-5xl mx-auto px-4 sm:px-6">
        <Link 
          to="/news" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm font-bold transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-150 group-hover:bg-slate-50 transition-colors">
            <FiArrowLeft size={14} />
          </div>
          Back to News & Press
        </Link>
      </section>

      {/* --- ARTICLE CONTAINER --- */}
      <section className="pb-20 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
          
          {/* Article Banner Image */}
          <div className="h-96 relative">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${article.bgCol} ${article.textCol} border ${article.borderCol} mb-3 shadow`}>
                <Icon size={12} className="flex-shrink-0" />
                {article.category}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                {article.title}
              </h1>
            </div>
          </div>

          {/* Details Row */}
          <div className="px-8 sm:px-12 py-5 border-b border-slate-50 bg-slate-50/50 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
              <FiCalendar />
              <span>{article.date}</span>
              <span className="text-slate-200">•</span>
              <span className={`font-bold ${article.textCol}`}>{article.badge}</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }}
                className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shadow-sm cursor-pointer"
                title="Copy Link"
              >
                <FiShare2 size={13} />
              </button>
            </div>
          </div>

          {/* Grid Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 sm:p-12 text-left">
            
            {/* Left: Article Body */}
            <div className="lg:col-span-2 space-y-6">
              <p className="text-slate-850 text-base sm:text-lg leading-relaxed font-bold">
                {article.summary}
              </p>
              <div className="h-px bg-slate-150 w-full" />
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {article.content}
              </p>
            </div>

            {/* Right: Info Panel */}
            <div className="space-y-6">
              
              {/* Media Contact Card */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2">
                  <FiMail className="text-blue-500" /> Media & PR Desk
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  For press inquiries, publication interviews, and medical kit requests:
                </p>
                <div className="text-xs text-slate-700 font-bold">
                  <span className="block text-blue-600 hover:underline cursor-pointer">media@premiumclinic.com</span>
                  <span className="block mt-1">+92 (51) 111-911-273</span>
                </div>
              </div>

              {/* Quality Standards Card */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2">
                  <FiShield className="text-teal-600" /> Patient Quality
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                  Approved by our clinical guidelines committee. Evaluated for maximum safety, clinical governance, and compliance.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      
    </div>
  );
}
