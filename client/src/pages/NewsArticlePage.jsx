import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { newsArticles } from "../data/newsData";
import { FiCalendar, FiArrowLeft, FiMail, FiShare2, FiShield } from "react-icons/fi";
import { motion } from "framer-motion";

export default function NewsArticlePage() {
  const { id } = useParams();
  const article = newsArticles.find((art) => art.id === parseInt(id));

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
        <Footer />
      </div>
    );
  }

  const Icon = article.icon;

  return (
    <div className="min-h-screen bg-slate-50 font-body select-none">
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

      <Footer />
    </div>
  );
}
