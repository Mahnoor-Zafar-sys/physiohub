import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FiClock, FiBookOpen, FiSearch,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
import { LuMailOpen } from "react-icons/lu";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { api } from "../services/api";

const THEME = {
  pink:    "#e91e8c",
  sky:     "#0ea5e9",
  grad:    "linear-gradient(135deg, #fce4ec 0%, #e0f2fe 60%, #fdf4ff 100%)",
  gradBtn: "linear-gradient(135deg, #0ea5e9, #e91e8c)",
};

const getCategoryStyles = (category) => {
  const cat = String(category).toLowerCase();
  if (cat.includes("skin")) return { color: "#e91e8c", bg: "#fce4ec" };
  if (cat.includes("hair")) return { color: "#a78bfa", bg: "#ede9fe" };
  if (cat.includes("diabetes")) return { color: "#34d399", bg: "#d1fae5" };
  if (cat.includes("gynecology")) return { color: "#f59e0b", bg: "#fef3c7" };
  if (cat.includes("orthopedic") || cat.includes("physio")) return { color: "#ff7f50", bg: "#fff0eb" };
  return { color: "#0ea5e9", bg: "#e0f2fe" }; // default General Health
};

const getAuthorImg = (author) => {
  const aut = String(author).toLowerCase();
  if (aut.includes("sarah")) return "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=80&q=80"; // Dr. Sarah Ahmed
  if (aut.includes("fatima")) return "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=80&q=80"; // Dr. Fatima Malik
  if (aut.includes("sadia")) return "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=80&q=80"; // Dr. Sadia Noor
  if (aut.includes("zara")) return "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80"; // Dr. Zara Ahmed
  if (aut.includes("jellani")) return "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=80&q=80"; // Dr. Ghulam Jellani
  if (aut.includes("imran")) return "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"; // Dr. Imran Sheikh
  if (aut.includes("hassan")) return "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80"; // Dr. Hassan Raza
  return "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80"; // default admin / director
};

const getFormattedDate = (dateStr) => {
  if (!dateStr) return "June 3, 2026";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  } catch (e) {
    return dateStr;
  }
};

const getReadTime = (content) => {
  if (!content) return "5 min read";
  const words = typeof content === 'string' ? content.split(/\s+/).length : JSON.stringify(content).split(/\s+/).length;
  const time = Math.max(3, Math.ceil(words / 200));
  return `${time} min read`;
};

const BLOG_POSTS = [
  {
    id: 1,
    title: "10 Warning Signs You Should Never Ignore: Visit a Doctor Immediately",
    excerpt: "Your body sends signals before serious conditions develop. Learn the critical symptoms that demand immediate medical attention and could save your life.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=700&q=80",
    category: "General Health",
    categoryColor: "#0ea5e9",
    categoryBg: "#e0f2fe",
    author: "Dr. Sadia Noor",
    authorImg: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=80&q=80",
    date: "June 3, 2026",
    readTime: "5 min read",
    tag: "health",
    featured: true,
  },
  {
    id: 2,
    title: "The Complete Guide to Laser Skin Treatments in 2026",
    excerpt: "From fractional CO₂ to PicoSure, understand how each laser works, what skin concerns it addresses, and what results you can realistically expect.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80",
    category: "Skin Care",
    categoryColor: "#e91e8c",
    categoryBg: "#fce4ec",
    author: "Dr. Sarah Ahmed",
    authorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
    date: "May 28, 2026",
    readTime: "8 min read",
    tag: "skin",
    featured: true,
  },
  {
    id: 3,
    title: "FUE vs DHI Hair Transplant: Which Is Right for You?",
    excerpt: "Two of the most advanced hair restoration techniques compared side-by-side. Cost, recovery time, density outcomes, and the ideal candidate profile for each.",
    image: "/hairtransplant.webp",
    category: "Hair Restoration",
    categoryColor: "#a78bfa",
    categoryBg: "#ede9fe",
    author: "Dr. Imran Sheikh",
    authorImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
    date: "May 20, 2026",
    readTime: "6 min read",
    tag: "hair",
    featured: true,
  },
  {
    id: 4,
    title: "Managing Diabetes: Nutrition, Exercise & Monitoring Tips",
    excerpt: "Evidence-based lifestyle changes that help patients with Type 2 diabetes maintain healthy blood sugar levels, reduce medication dependency, and live fully.",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=700&q=80",
    category: "Diabetes",
    categoryColor: "#34d399",
    categoryBg: "#d1fae5",
    author: "Dr. Zara Ahmed",
    authorImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
    date: "May 14, 2026",
    readTime: "7 min read",
    tag: "health",
    featured: false,
  },
  {
    id: 5,
    title: "Pregnancy Nutrition: What to Eat & Avoid Each Trimester",
    excerpt: "A trimester-by-trimester nutritional guide from our expert gynecologists covering essential nutrients, safe foods, and common myths that expecting mothers should know.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=700&q=80",
    category: "Gynecology",
    categoryColor: "#f59e0b",
    categoryBg: "#fef3c7",
    author: "Dr. Fatima Malik",
    authorImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80",
    date: "May 7, 2026",
    readTime: "9 min read",
    tag: "gynecology",
    featured: false,
  },
  {
    id: 6,
    title: "Knee Pain Solutions: When to Try Physio vs Surgery",
    excerpt: "Not every knee problem needs an operation. Our orthopedic specialists explain the decision tree between conservative management, physiotherapy, and surgical intervention.",
    image: "https://images.unsplash.com/photo-1597764690523-15bea4c581c9?auto=format&fit=crop&w=700&q=80",
    category: "Orthopedic",
    categoryColor: "#ff7f50",
    categoryBg: "#fff0eb",
    author: "Dr. Hassan Raza",
    authorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80",
    date: "April 29, 2026",
    readTime: "6 min read",
    tag: "orthopedic",
    featured: false,
  },
];

const BLOG_TAGS = [
  { value: "all", label: "All Articles" },
  { value: "health", label: "General Health" },
  { value: "skin", label: "Skin Care" },
  { value: "hair", label: "Hair" },
  { value: "gynecology", label: "Gynecology" },
  { value: "orthopedic", label: "Orthopedic" },
];

function BlogCard({ post, index, featured = false }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  if (featured) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: index * 0.1 }}
        className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 cursor-pointer"
        onClick={() => navigate(`/blog/${post.id}`)}
        style={{ transform: "translateY(0)" }}
        whileHover={{ y: -5 }}
      >
        <div className="relative h-48 overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: post.categoryBg, color: post.categoryColor }}>{post.category}</span>
        </div>
        <div className="p-5 text-left">
          <h3 className="font-black text-slate-800 text-base leading-snug mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">{post.title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
          <div className="flex items-center gap-3 pt-3 border-t border-slate-50">
            <img src={post.authorImg} alt={post.author} className="w-8 h-8 rounded-full object-cover ring-2 ring-pink-100" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-700 truncate">{post.author}</p>
              <p className="text-xs text-slate-400">{post.date}</p>
            </div>
            <span className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0">
              <FiClock size={11} /> {post.readTime}
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" style={{ background: THEME.gradBtn }} />
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-400 border border-slate-100 cursor-pointer text-left"
      onClick={() => navigate(`/blog/${post.id}`)}
    >
      <img src={post.image} alt={post.title} className="w-20 h-20 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform duration-400" />
      <div className="flex-1 min-w-0">
        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: post.categoryBg, color: post.categoryColor }}>{post.category}</span>
        <h4 className="font-bold text-slate-800 text-sm leading-snug mt-1.5 mb-1 line-clamp-2 group-hover:text-pink-600 transition-colors">{post.title}</h4>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>{post.author}</span>
          <span>·</span>
          <FiClock size={10} />
          <span>{post.readTime}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Blog({ onBookAppointment }) {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribedMsg, setSubscribedMsg] = useState("");
  const [posts, setPosts] = useState(BLOG_POSTS);
  const [blogTag, setBlogTag] = useState("all");
  const [search, setSearch] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    try {
      const res = await api.subscribeNewsletter(email);
      if (res && res.success) {
        setSubscribedMsg("Subscribed successfully!");
        setEmail("");
      } else {
        setSubscribedMsg(res && res.error ? res.error : "Subscription failed.");
      }
    } catch (err) {
      setSubscribedMsg("Error subscribing.");
    } finally {
      setSubscribing(false);
      setTimeout(() => setSubscribedMsg(""), 5000);
    }
  };

  useEffect(() => {
    async function loadPosts() {
      const data = await api.getArticles();
      if (data && data.length > 0) {
        const blogs = data.filter(p => p.type === "blog" || !p.type);
        if (blogs.length > 0) {
          const mapped = blogs.map((p, idx) => {
            const catStyles = getCategoryStyles(p.category);
            return {
              ...p,
              featured: p.featured !== undefined ? !!p.featured : idx < 3,
              categoryColor: catStyles.color,
              categoryBg: catStyles.bg,
              authorImg: getAuthorImg(p.author),
              date: getFormattedDate(p.created_at),
              readTime: getReadTime(p.content),
              tag: String(p.category).toLowerCase().includes("skin") ? "skin" :
                   String(p.category).toLowerCase().includes("hair") ? "hair" :
                   String(p.category).toLowerCase().includes("gyne") ? "gynecology" :
                   String(p.category).toLowerCase().includes("ortho") ? "orthopedic" : "health"
            };
          });
          setPosts(mapped);
        } else {
          setPosts([]);
        }
      } else {
        // Map default ones with correct details
        const mapped = BLOG_POSTS.map(p => {
          const catStyles = getCategoryStyles(p.category);
          return {
            ...p,
            categoryColor: catStyles.color,
            categoryBg: catStyles.bg
          };
        });
        setPosts(mapped);
      }
    }
    loadPosts();
  }, []);

  const filteredBlogFeatured = posts.filter((p) => {
    const matchTag = blogTag === "all" || p.tag === blogTag;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.author.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    return p.featured && matchTag && matchSearch;
  });

  const filteredBlogRest = posts.filter((p) => {
    const matchTag = blogTag === "all" || p.tag === blogTag;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.author.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    return !p.featured && matchTag && matchSearch;
  });

  return (
    <div className="min-h-screen font-sans" style={{ background: THEME.grad }}>
      <SEOHead 
        title="Physical Therapy & Health Recovery Blog | Physiohub Lahore & Islamabad"
        description="Read expert physical therapy articles, injury prevention guides, back pain treatment tips & stroke rehabilitation advice by top specialists in Lahore & Islamabad."
        keywords="physical therapy blog Pakistan, back pain tips Lahore, sports injury rehabilitation guide Islamabad, stroke recovery advice physio, posture exercise blog"
        canonicalUrl="https://physiohub.com/blog"
      />
      <Navbar onBookAppointment={onBookAppointment} />

      {/* HERO BANNER */}
      <section className="relative overflow-hidden pt-32 pb-10 px-4">
        <div className="relative z-10 max-w-5xl mx-auto text-center">


          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }} className="text-4xl sm:text-6xl font-black text-slate-800 mb-3 leading-tight">
            Health{" "}
            <span style={{ background: "linear-gradient(135deg, #e91e8c, #0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Blog</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }} className="text-slate-500 text-lg max-w-2xl mx-auto mb-8">
            Read health tips, medical guides, and expert advice written directly by certified consultant specialists.
          </motion.p>
        </div>
      </section>

      {/* BLOG ARTICLES */}
      <section className="px-4 pb-20 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2 text-left">
          <div className="w-1 h-8 rounded-full" style={{ background: THEME.gradBtn }} />
          <h2 className="text-2xl font-black text-slate-800">Health Articles</h2>
          <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#fce4ec", color: THEME.pink }}>Doctor-Written</span>
        </div>
        <p className="text-slate-400 text-sm mb-8 ml-4 text-left">Evidence-based clinical health guidance, straight to you.</p>

        {/* Search & Tag filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl flex-1 max-w-sm" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid #fce4ec" }}>
            <FiSearch size={15} className="text-pink-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles by title, author, specialty..." className="bg-transparent text-sm text-slate-700 outline-none flex-1 placeholder-slate-300 animate-none" />
          </div>
          <div className="flex flex-wrap gap-2">
            {BLOG_TAGS.map((tag) => (
              <button key={tag.value} onClick={() => setBlogTag(tag.value)} className="px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap" style={blogTag === tag.value ? { background: THEME.gradBtn, color: "white", boxShadow: "0 2px 12px rgba(233,30,140,0.25)" } : { background: "rgba(255,255,255,0.8)", color: "#64748b", border: "1px solid #e2e8f0" }}>
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured grid */}
        {filteredBlogFeatured.length > 0 && (
          <div className="mb-10 text-left">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-5">Featured Articles</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogFeatured.map((post, i) => <BlogCard key={post.id} post={post} index={i} featured />)}
            </div>
          </div>
        )}

        {/* More articles list */}
        {filteredBlogRest.length > 0 && (
          <div className="text-left">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-5">More Articles</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredBlogRest.map((post, i) => <BlogCard key={post.id} post={post} index={i} />)}
            </div>
          </div>
        )}

        {filteredBlogFeatured.length === 0 && filteredBlogRest.length === 0 && (
          <div className="text-center py-16"><p className="text-slate-400 text-sm">No articles in this category yet.</p></div>
        )}

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 rounded-3xl p-8 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #a855f7 50%, #e91e8c 100%)" }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
            <LuMailOpen size={36} className="text-white animate-pulse" />
            <div className="text-left">
              <h3 className="text-xl font-black text-white mb-1">Get Health Tips in Your Inbox</h3>
              <p className="text-white/75 text-sm">Subscribe for weekly health articles, clinic news, and exclusive offers.</p>
            </div>
            <form onSubmit={handleSubscribe} className="sm:ml-auto flex flex-col sm:flex-row gap-2 w-full sm:w-auto flex-shrink-0">
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                placeholder={subscribedMsg || "Your email address"} 
                className="px-4 py-2.5 rounded-xl text-sm outline-none bg-white/25 text-white placeholder-white/80 border border-white/30 focus:border-white/60 transition-all min-w-0 w-full sm:w-48 font-semibold" 
              />
              <motion.button 
                type="submit"
                disabled={subscribing}
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.97 }} 
                className="px-5 py-2.5 rounded-xl font-bold text-sm bg-white shadow-lg whitespace-nowrap w-full sm:w-auto cursor-pointer border-none" 
                style={{ color: THEME.pink }}
              >
                {subscribing ? "Subscribing..." : "Subscribe"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
