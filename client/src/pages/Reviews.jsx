import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FiStar, FiPlay, FiX, FiChevronLeft, FiChevronRight,
  FiMessageSquare, FiThumbsUp, FiSearch, FiEye, FiVideo,
} from "react-icons/fi";
import { FaWhatsapp, FaStar, FaRegStar, FaStarHalfAlt, FaQuoteLeft, FaGoogle } from "react-icons/fa";
import { HiOutlineBadgeCheck, HiSparkles } from "react-icons/hi";
import { MdVerified } from "react-icons/md";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../services/api";

const THEME = {
  pink:    "#e91e8c",
  sky:     "#0ea5e9",
  peach:   "#ff7f50",
  grad:    "linear-gradient(135deg, #fce4ec 0%, #e0f2fe 60%, #fdf4ff 100%)",
  gradBtn: "linear-gradient(135deg, #0ea5e9, #e91e8c)",
};

const REVIEWS = [
  {
    id: 1,
    name: "Ayesha Tariq",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    service: "Women’s Health & Pelvic Floor PT",
    doctor: "Dr. Humna Zohra",
    date: "2 days ago",
    text: "Absolutely phenomenal experience at Physiohub! Dr. Humna Zohra completely transformed my recovery. Her postpartum pelvic floor rehabilitation was conducted with extreme professionalism and care.",
    helpful: 47,
    verified: true,
    tag: "womens-health",
    source: "google",
    featured: true,
  },
  {
    id: 2,
    name: "Bilal Hussain",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    service: "Chiropractic Adjustments",
    doctor: "Dr. Haseeb Ur Rehman",
    date: "1 week ago",
    text: "I was struggling with chronic lumbar instability and radiating back pain. Dr. Haseeb Ur Rehman's chiropractic adjustments and spinal manipulation techniques provided instant decompression and long-term relief.",
    helpful: 63,
    verified: true,
    tag: "chiropractic",
    source: "google",
    featured: true,
  },
  {
    id: 3,
    name: "Sana Mirza",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    service: "Hijama Therapy",
    doctor: "Dr. Ghulam Jellani",
    date: "3 days ago",
    text: "Dr. Ghulam Jellani is an absolute expert in clinical wet cupping (Hijama). The environment is incredibly sterile and professional. Felt completely detoxified and energised after the treatment.",
    helpful: 89,
    verified: true,
    tag: "hijama",
    source: "facebook",
    featured: true,
  },
  {
    id: 4,
    name: "Usman Khalid",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    service: "Physiotherapy",
    doctor: "Dr. Humna Zohra",
    date: "5 days ago",
    text: "Dr. Humna's manual physical therapy was exactly what I needed for my frozen shoulder. Within a few sessions of joint mobilization and targeted exercises, I regained my full range of motion. Highly recommended!",
    helpful: 71,
    verified: true,
    tag: "physiotherapy",
    source: "google",
    featured: false,
  },
  {
    id: 5,
    name: "Nadia Anwar",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    service: "Dry Needling",
    doctor: "Dr. Ghulam Jellani",
    date: "1 week ago",
    text: "The dry needling session by Dr. Ghulam Jellani for my chronic shoulder knots was amazing. Precision trigger point deactivation that worked like magic. No pain, pure relief!",
    helpful: 54,
    verified: true,
    tag: "needling",
    source: "google",
    featured: false,
  },
  {
    id: 6,
    name: "Tariq Mehmood",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    service: "Fitness Training",
    doctor: "Dr. Haseeb Ur Rehman",
    date: "2 weeks ago",
    text: "Excellent physical conditioning program led by Dr. Haseeb. As a sports coach, he perfectly customized a medical strength training plan to help me recover my core stability safely. Outstanding facility!",
    helpful: 92,
    verified: true,
    tag: "fitness",
    source: "google",
    featured: false,
  },
  {
    id: 7,
    name: "Rabia Shaheen",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=120&q=80",
    rating: 4,
    service: "Electrotherapy",
    doctor: "Dr. Ghulam Jellani",
    date: "3 weeks ago",
    text: "Electrotherapy and TENS stimulation sessions helped block my acute inflammatory pain immediately. Extremely modern equipment and helpful staff at Physiohub.",
    helpful: 38,
    verified: true,
    tag: "electrotherapy",
    source: "facebook",
    featured: false,
  },
  {
    id: 8,
    name: "Hamza Iqbal",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    service: "Kinesio Taping",
    doctor: "Dr. Ghulam Jellani",
    date: "1 month ago",
    text: "Dr. Ghulam Jellani used functional Kinesio taping to support my ligament strain. It provided great support and joint stability, allowing me to move easily. Physiohub is definitely the best physical therapy clinic.",
    helpful: 66,
    verified: true,
    tag: "kinesio",
    source: "google",
    featured: false,
  },
];

const VIDEO_TESTIMONIALS = [
  {
    id: 1,
    name: "Maryam Aslam",
    thumbnail: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    service: "Pelvic Floor PT",
    duration: "2:34",
    title: "My postpartum pelvic recovery journey with Dr. Humna",
  },
  {
    id: 2,
    name: "Ahmed Raza",
    thumbnail: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
    service: "Chiropractic Care",
    duration: "3:12",
    title: "Overcoming severe sciatica with Dr. Haseeb",
  },
  {
    id: 3,
    name: "Fatima Khan",
    thumbnail: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80",
    service: "Hijama Therapy",
    duration: "1:58",
    title: "Hijama detoxification & muscle pain relief with Dr. Jellani",
  },
];

const REVIEW_TAGS = [
  { value: "all", label: "All Reviews" },
  { value: "physiotherapy", label: "Physiotherapy" },
  { value: "chiropractic", label: "Chiropractic Adjustments" },
  { value: "cupping", label: "Cupping Therapy" },
  { value: "hijama", label: "Hijama Therapy" },
  { value: "electrotherapy", label: "Electrotherapy" },
  { value: "kinesio", label: "Kinesio Taping" },
  { value: "fitness", label: "Fitness Training" },
  { value: "needling", label: "Dry Needling" },
];

function StarRow({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => {
        if (rating >= s) return <FaStar key={s} size={size} color="#FBBF24" />;
        if (rating >= s - 0.5) return <FaStarHalfAlt key={s} size={size} color="#FBBF24" />;
        return <FaRegStar key={s} size={size} color="#FBBF24" />;
      })}
    </div>
  );
}

function ReviewCard({ review, index }) {
  const [liked, setLiked] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group relative bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-pink-50 hover:border-pink-100 overflow-hidden"
    >
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(circle, #fce4ec 0%, transparent 70%)" }} />
      <FaQuoteLeft size={20} className="text-pink-100 mb-3" />
      <div className="flex items-center justify-between mb-3">
        <StarRow rating={review.rating} />
        <div className="flex items-center gap-1.5">
          {review.source === "google" ? (
            <span className="flex items-center gap-1 text-xs font-semibold text-slate-400"><FaGoogle size={10} className="text-blue-500" /> Google</span>
          ) : (
            <span className="text-xs font-semibold text-slate-400">Facebook</span>
          )}
        </div>
      </div>
      <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-4">{review.text}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "#fce4ec", color: THEME.pink }}>{review.service}</span>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-50 text-slate-500">{review.doctor}</span>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img src={review.avatar} alt={review.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-pink-100" />
            {review.verified && <MdVerified size={14} className="absolute -bottom-0.5 -right-0.5 text-sky-500" />}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">{review.name}</p>
            <p className="text-xs text-slate-400">{review.date}</p>
          </div>
        </div>
        <button onClick={() => setLiked(!liked)} className="flex items-center gap-1.5 text-xs font-medium transition-colors" style={{ color: liked ? THEME.pink : "#94a3b8" }}>
          <FiThumbsUp size={13} />
          {review.helpful + (liked ? 1 : 0)}
        </button>
      </div>
    </motion.div>
  );
}

function VideoCard({ video, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500"
    >
      <img src={video.thumbnail} alt={video.name} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div whileHover={{ scale: 1.15 }} className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/50">
          <FiPlay size={20} className="text-white ml-1" />
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white font-bold text-sm">{video.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-white/70 text-xs">{video.name}</span>
          <span className="text-white/50 text-xs">·</span>
          <span className="text-white/70 text-xs">{video.service}</span>
          <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded-full text-white">{video.duration}</span>
        </div>
      </div>
    </motion.div>
  );
}

function StatBubble({ value, label, color, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay, type: "spring", stiffness: 200 }} className="flex flex-col items-center gap-1">
      <div className="text-3xl font-black" style={{ background: `linear-gradient(135deg, ${color}, ${THEME.pink})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{value}</div>
      <div className="text-xs font-semibold text-slate-500 text-center">{label}</div>
    </motion.div>
  );
}

export default function Reviews({ onBookAppointment }) {
  const [allReviews, setAllReviews] = useState(REVIEWS);
  const [reviewTag, setReviewTag] = useState("all");
  const [search, setSearch] = useState("");
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const [newReviewForm, setNewReviewForm] = useState({ name: "", text: "", rating: 5, service: "Physiotherapy", doctor: "Dr. Sarah Ahmed" });

  useEffect(() => {
    async function loadReviews() {
      const data = await api.getReviews();
      if (data && data.length > 0) {
        setAllReviews(data);
      } else {
        setAllReviews(REVIEWS);
      }
    }
    loadReviews();
  }, []);

  const filteredReviews = allReviews.filter((r) => {
    const matchTag = reviewTag === "all" || r.tag === reviewTag;
    const q = search.toLowerCase();
    const matchSearch = !q || r.text.toLowerCase().includes(q) || r.name.toLowerCase().includes(q) || r.doctor.toLowerCase().includes(q);
    return matchTag && matchSearch;
  });

  const whatsappNumber = "923008786187";

  return (
    <div className="min-h-screen font-sans" style={{ background: THEME.grad }}>
      <Navbar onBookAppointment={onBookAppointment} />

      {/* HERO BANNER */}
      <section className="relative overflow-hidden pt-32 pb-10 px-4">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-4 shadow-sm" style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(10px)", color: THEME.pink, border: "1px solid #fce4ec" }}>
            <HiSparkles size={13} />
            Trusted by 20,000+ Patients Across Pakistan
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }} className="text-4xl sm:text-6xl font-black text-slate-800 mb-3 leading-tight">
            Patient{" "}
            <span style={{ background: "linear-gradient(135deg, #e91e8c, #0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Reviews</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }} className="text-slate-500 text-lg max-w-2xl mx-auto mb-8">
            Read what our verified patients have to say about their treatment journeys at Physiohub.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 mb-8">
            <StatBubble value="4.9★" label="Google Rating" color="#FBBF24" delay={0.4} />
            <StatBubble value="2,400+" label="Verified Reviews" color={THEME.sky} delay={0.45} />
            <StatBubble value="98%" label="Patient Satisfaction" color={THEME.sky} delay={0.5} />
          </motion.div>
        </div>
      </section>

      {/* REVIEWS GRID AND FILTERS */}
      <section className="px-4 pb-20 max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 rounded-full" style={{ background: THEME.gradBtn }} />
            <h2 className="text-2xl font-black text-slate-800">Featured Reviews</h2>
            <div className="px-3 py-1 rounded-full text-xs font-bold ml-1" style={{ background: "#fce4ec", color: THEME.pink }}>Editor's Pick</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {allReviews.filter((r) => r.featured).map((review, i) => (
              <motion.div key={review.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} className="relative rounded-3xl overflow-hidden p-7 shadow-lg hover:shadow-2xl transition-shadow duration-500" style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(252,228,236,0.3))", border: "1.5px solid rgba(233,30,140,0.1)" }}>
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: THEME.gradBtn }} />
                <FaQuoteLeft size={28} className="mb-3" style={{ color: "#fce4ec" }} />
                <StarRow rating={review.rating} size={15} />
                <p className="mt-3 mb-5 text-slate-700 text-sm leading-relaxed">{review.text}</p>
                <div className="flex items-center gap-3 pt-3 border-t border-pink-50">
                  <img src={review.avatar} alt={review.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-pink-200" />
                  <div>
                    <p className="font-bold text-slate-800 text-sm flex items-center gap-1.5">{review.name}{review.verified && <MdVerified size={14} className="text-sky-500" />}</p>
                    <p className="text-xs text-slate-400">{review.service} · {review.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="rounded-3xl p-6 mb-10 flex flex-col sm:flex-row items-center gap-6 shadow-md" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(251, 191, 36, 0.2)" }}>
          <div className="flex items-center gap-5">
            <div className="text-center">
              <div className="text-6xl font-black" style={{ color: "#1a1a2e" }}>4.9</div>
              <StarRow rating={4.9} size={18} />
              <p className="text-xs text-slate-400 mt-1">2,400+ reviews</p>
            </div>
            <div className="hidden sm:flex flex-col gap-1.5 min-w-[160px]">
              {[{ stars: 5, pct: 87 }, { stars: 4, pct: 10 }, { stars: 3, pct: 2 }, { stars: 2, pct: 0.5 }, { stars: 1, pct: 0.5 }].map((row) => (
                <div key={row.stars} className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-4 text-right">{row.stars}</span>
                  <FaStar size={9} color="#FBBF24" />
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${row.pct}%` }} transition={{ duration: 1, delay: 0.5 }} className="h-full rounded-full" style={{ background: THEME.gradBtn }} />
                  </div>
                  <span className="w-7">{row.pct}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="sm:ml-auto flex flex-col items-center sm:items-end gap-3">
            <div className="flex items-center gap-2">
              <FaGoogle size={18} className="text-blue-500" />
              <span className="font-bold text-slate-700">Verified on Google</span>
              <HiOutlineBadgeCheck size={18} className="text-green-500" />
            </div>
            <button 
              onClick={() => setWriteModalOpen(true)}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg hover:shadow-xl transition-shadow border-none cursor-pointer" 
              style={{ background: THEME.gradBtn }}
            >
              Write a Review
            </button>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 mb-7">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl flex-1 max-w-sm" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid #fce4ec" }}>
            <FiSearch size={15} className="text-pink-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search reviews by doctor, service..." className="bg-transparent text-sm text-slate-700 outline-none flex-1 placeholder-slate-300 animate-none" />
          </div>
          <div className="flex flex-wrap gap-2">
            {REVIEW_TAGS.map((tag) => (
              <button key={tag.value} onClick={() => setReviewTag(tag.value)} className="px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap" style={reviewTag === tag.value ? { background: THEME.gradBtn, color: "white", boxShadow: "0 2px 12px rgba(233,30,140,0.25)" } : { background: "rgba(255,255,255,0.8)", color: "#64748b", border: "1px solid #e2e8f0" }}>{tag.label}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredReviews.map((review, i) => <ReviewCard key={review.id} review={review} index={i} />)}
        </div>
        {filteredReviews.length === 0 && <div className="text-center py-16"><p className="text-slate-400 text-sm">No reviews found. Try a different filter.</p></div>}
      </section>

      {/* WRITE A REVIEW MODAL */}
      <AnimatePresence>
        {writeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setWriteModalOpen(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full text-slate-800 shadow-2xl relative border border-pink-100 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setWriteModalOpen(false)} 
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-200 transition-colors border-none cursor-pointer"
              >
                <FiX size={15} />
              </button>

              <h3 className="text-xl font-black mb-1 flex items-center gap-2">
                <FiMessageSquare className="text-pink-500" /> Share Your Experience
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mb-6">
                Your feedback helps us continuously improve our healthcare services.
              </p>

              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const newRev = {
                    name: newReviewForm.name || "Anonymous Patient",
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newReviewForm.name || "Anonymous Patient")}&background=e91e8c&color=fff`,
                    rating: newReviewForm.rating,
                    service: newReviewForm.service,
                    doctor: newReviewForm.doctor,
                    date: "Just now",
                    text: newReviewForm.text,
                    helpful: 0,
                    verified: 1,
                    tag: newReviewForm.service.toLowerCase().includes("physio") ? "physiotherapy" :
                         newReviewForm.service.toLowerCase().includes("chiro") ? "chiropractic" :
                         newReviewForm.service.toLowerCase().includes("cup") ? "cupping" :
                         newReviewForm.service.toLowerCase().includes("hij") ? "hijama" :
                         newReviewForm.service.toLowerCase().includes("elect") ? "electrotherapy" :
                         newReviewForm.service.toLowerCase().includes("kine") ? "kinesio" :
                         newReviewForm.service.toLowerCase().includes("fit") ? "fitness" :
                         newReviewForm.service.toLowerCase().includes("need") ? "needling" : "physiotherapy",
                     source: "google",
                     featured: 0
                  };
                  const res = await api.createReview(newRev);
                  if (res) {
                    const data = await api.getReviews();
                    if (data && data.length > 0) {
                      setAllReviews(data);
                    } else {
                      setAllReviews([res, ...allReviews]);
                    }
                  } else {
                    setAllReviews([newRev, ...allReviews]);
                  }
                  setWriteModalOpen(false);
                  setNewReviewForm({ name: "", text: "", rating: 5, service: "Physiotherapy", doctor: "Dr. Sarah Ahmed" });
                  alert("Thank you! Your verified review has been submitted successfully.");
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={newReviewForm.name}
                      onChange={e => setNewReviewForm({...newReviewForm, name: e.target.value})}
                      placeholder="e.g. Ayesha Khan" 
                      className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-pink-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Consultant Doctor</label>
                    <input 
                      type="text" 
                      required 
                      value={newReviewForm.doctor}
                      onChange={e => setNewReviewForm({...newReviewForm, doctor: e.target.value})}
                      placeholder="e.g. Dr. Sarah Ahmed" 
                      className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-pink-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Service Received</label>
                    <select 
                      value={newReviewForm.service}
                      onChange={e => setNewReviewForm({...newReviewForm, service: e.target.value})}
                      className="w-full border border-slate-200 bg-white rounded-xl p-3 text-xs outline-none focus:border-pink-400 transition-colors"
                    >
                      <option value="Physiotherapy">Physiotherapy</option>
                      <option value="Chiropractic Adjustments">Chiropractic Adjustments</option>
                      <option value="Cupping Therapy">Cupping Therapy</option>
                      <option value="Hijama Therapy">Hijama Therapy</option>
                      <option value="Electrotherapy">Electrotherapy</option>
                      <option value="Kinesio Taping">Kinesio Taping</option>
                      <option value="Fitness Training">Fitness Training</option>
                      <option value="Dry Needling">Dry Needling</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Select Rating</label>
                    <div className="flex items-center gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setNewReviewForm({...newReviewForm, rating: s})}
                          className="text-amber-400 hover:scale-110 transition-transform bg-transparent border-none cursor-pointer p-0.5"
                        >
                          {newReviewForm.rating >= s ? <FaStar size={20} /> : <FaRegStar size={20} />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Review Description</label>
                  <textarea 
                    required 
                    rows={4}
                    value={newReviewForm.text}
                    onChange={e => setNewReviewForm({...newReviewForm, text: e.target.value})}
                    placeholder="Describe your treatment experience, staff, and results..." 
                    className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-pink-400 transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3.5 bg-slate-900 hover:bg-pink-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors border-none cursor-pointer"
                >
                  Submit Verified Review
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
