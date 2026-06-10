import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiClock, FiBookOpen, FiArrowLeft, FiUser, FiCalendar, 
  FiMessageSquare, FiSend, FiShare2, FiCheck, FiHeart 
} from "react-icons/fi";
import { FaWhatsapp, FaTwitter, FaFacebook, FaLinkedin, FaStar } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const THEME = {
  pink:    "#e91e8c",
  sky:     "#0ea5e9",
  grad:    "linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #fdf2f8 100%)",
  gradBtn: "linear-gradient(135deg, #0ea5e9, #e91e8c)",
};

const BLOG_POSTS = [
  {
    id: 1,
    title: "10 Warning Signs You Should Never Ignore — Visit a Doctor Immediately",
    excerpt: "Your body sends signals before serious conditions develop. Learn the critical symptoms that demand immediate medical attention and could save your life.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    category: "General Health",
    categoryColor: "#0ea5e9",
    categoryBg: "#e0f2fe",
    author: "Dr. Sadia Noor",
    authorImg: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80",
    authorTitle: "MBBS, FCPS (Internal Medicine)",
    authorBio: "Dr. Sadia Noor is a consultant physician with 12+ years of experience in diagnostic medicine and chronic illness management.",
    date: "June 3, 2026",
    readTime: "5 min read",
    tag: "health",
    content: [
      {
        type: "p",
        text: "Many people tend to brush off minor body aches, fatigue, or mild changes in their physical capabilities. However, clinical science teaches us that the human body rarely experiences abnormalities without a reason. Often, serious cardiovascular, neurological, or endocrinological disorders manifest as seemingly minor warning signs weeks before a critical emergency occurs."
      },
      {
        type: "h2",
        text: "1. Sudden Chest Pain or Discomfort"
      },
      {
        type: "p",
        text: "Chest pain is the classic hallmark of cardiovascular distress. Any pain that feels like crushing weight, pressure, squeezing, or fullness in the center of your chest that lasts more than a few minutes—or goes away and comes back—requires immediate triage. It can radiate to your jaw, neck, left arm, or back."
      },
      {
        type: "callout",
        text: "CLINICAL TIP: Do not drive yourself to the emergency department if you are experiencing active chest distress. Call our ambulance lifeline +92 (51) 111-911-273 or local responders immediately so that paramedic monitoring can start on-site."
      },
      {
        type: "h2",
        text: "2. Sudden Weakness or Numbness on One Side"
      },
      {
        type: "p",
        text: "If you experience sudden weakness, numbness, or loss of motor control in your face, arm, or leg—especially on just one side of your body—this is a primary indicator of an ischemic or hemorrhagic stroke. Time is brain tissue; every minute of delay reduces recovery chances."
      },
      {
        type: "p",
        text: "Use the FAST test: Face drooping, Arm weakness, Speech difficulty, Time to call emergency support."
      },
      {
        type: "h2",
        text: "3. Unexplained Shortness of Breath"
      },
      {
        type: "p",
        text: "Difficulty catching your breath without strenuous exertion can indicate pulmonary embolism (a blood clot in the lungs), severe asthma exacerbation, heart failure, or arrhythmia. If it is accompanied by swollen legs, coughing up blood, or fainting, seek urgent care."
      },
      {
        type: "quote",
        text: "Prevention is always better than cure. Recognizing these clinical alarms early is the single most effective tool we have to save lives and prevent permanent organ damage."
      },
      {
        type: "h2",
        text: "Conclusion and Next Steps"
      },
      {
        type: "p",
        text: "Never let fear or embarrassment stop you from consulting a doctor. Early diagnostic panels, blood work, or electrocardiograms (ECG) are safe, quick, and highly effective at catching conditions before they escalate. Make sure to consult your general physician annually for standard screenings."
      }
    ]
  },
  {
    id: 2,
    title: "The Complete Guide to Laser Skin Treatments in 2026",
    excerpt: "From fractional CO₂ to PicoSure — understand how each laser works, what skin concerns it addresses, and what results you can realistically expect.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    category: "Skin Care",
    categoryColor: "#e91e8c",
    categoryBg: "#fce4ec",
    author: "Dr. Sarah Ahmed",
    authorImg: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80",
    authorTitle: "MBBS, FCPS (Dermatology)",
    authorBio: "Dr. Sarah Ahmed is an expert dermatologist specializing in aesthetic skin lasers, acne scar reconstruction, and anti-aging treatments.",
    date: "May 28, 2026",
    readTime: "8 min read",
    tag: "skin",
    content: [
      {
        type: "p",
        text: "Laser technology has revolutionized modern dermatology. Today, we can resolve severe acne scarring, unwanted pigmentation, sun damage, and signs of aging with highly targeted wavelengths of light. However, patients are often confused by the terminology—Fractional CO2, Erbium, Q-Switched, and Picosecond lasers all operate differently."
      },
      {
        type: "h2",
        text: "Understanding Ablative vs. Non-Ablative Lasers"
      },
      {
        type: "p",
        text: "Ablative lasers (like Fractional CO2) remove the outer layers of damaged skin, forcing the body to regenerate a completely new dermal layer rich in collagen. These treatments are outstanding for deep wrinkles and severe acne scars, but require 5-7 days of downtime."
      },
      {
        type: "p",
        text: "Non-ablative lasers bypass the surface layer, heating the underlying tissue to stimulate collagen without damaging the skin surface. These are excellent for mild texture issues and have virtually zero downtime."
      },
      {
        type: "callout",
        text: "CLINICAL TIP: Sun protection is mandatory post-treatment. Always apply a broad-spectrum SPF 50+ sunscreen and avoid direct sunlight for at least two weeks after any laser procedure to prevent hyperpigmentation."
      },
      {
        type: "h2",
        text: "The Rise of Picosecond Technology (PicoSure)"
      },
      {
        type: "p",
        text: "Picosecond lasers deliver ultra-short energy pulses in trillionths of a second. Instead of heating and burning pigment, they shatter it mechanically into tiny particles that the body's immune system clears naturally. This makes Pico lasers extremely safe for darker skin types with minimal risk of burn complications."
      },
      {
        type: "quote",
        text: "Modern lasers are not magic wands; they are precise clinical instruments. The success of a laser treatment depends entirely on customizing the wavelength and pulse duration to the patient's specific skin type and target conditions."
      },
      {
        type: "h2",
        text: "What to Expect During Recovery"
      },
      {
        type: "p",
        text: "For ablative procedures, expect a sensation similar to mild sunburn, followed by redness, swelling, and light peeling. Keeping the skin moist with sterile recovery ointments is key to speeding up cellular repair. Consultation with a certified dermatologist ensures the safest settings for your skin tone."
      }
    ]
  },
  {
    id: 3,
    title: "FUE vs DHI Hair Transplant: Which Is Right for You?",
    excerpt: "Two of the most advanced hair restoration techniques compared side-by-side. Cost, recovery time, density outcomes, and the ideal candidate profile for each.",
    image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&w=800&q=80",
    category: "Hair Restoration",
    categoryColor: "#a78bfa",
    categoryBg: "#ede9fe",
    author: "Dr. Imran Sheikh",
    authorImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    authorTitle: "MBBS, FCPS (Plastic Surgery)",
    authorBio: "Dr. Imran Sheikh is a fellowship-certified plastic surgeon with 10+ years of specialization in micro-surgical hair restoration and transplants.",
    date: "May 20, 2026",
    readTime: "6 min read",
    tag: "hair",
    content: [
      {
        type: "p",
        text: "Hair loss affects millions of men and women worldwide, impacting self-confidence and quality of life. Modern hair transplantation is no longer about plugs or artificial hairlines. Techniques like Follicular Unit Extraction (FUE) and Direct Hair Implantation (DHI) yield completely natural, high-density results."
      },
      {
        type: "h2",
        text: "What is FUE (Follicular Unit Extraction)?"
      },
      {
        type: "p",
        text: "In an FUE transplant, individual hair follicles are extracted from the donor zone (usually the back of the head) using a micro-punch tool. Next, the surgeon manually creates tiny channels or incisions in the balding recipient area before inserting the extracted grafts. This method is outstanding for covering large bald areas in a single session."
      },
      {
        type: "h2",
        text: "What is DHI (Direct Hair Implantation)?"
      },
      {
        type: "p",
        text: "DHI is a modification of FUE. Grafts are extracted from the donor area in the same way, but they are loaded into a specialized pen-like device called a Choi Implanter. The implanter creates the channel and deposits the graft simultaneously. This gives the surgeon absolute control over the depth, angle, and direction of each implanted hair."
      },
      {
        type: "callout",
        text: "CLINICAL TIP: DHI allows for higher implantation density and often does not require fully shaving the recipient area, making it popular for women and patients with localized balding. However, it is more time-consuming and expensive than FUE."
      },
      {
        type: "quote",
        text: "Both FUE and DHI are highly effective. The key factor is not which technique is superior, but rather the surgeon's artistry in mapping a natural hairline and placing grafts at correct angles."
      },
      {
        type: "h2",
        text: "Post-Op Recovery & Hair Growth Timeline"
      },
      {
        type: "p",
        text: "The first 10 days are critical for graft survival. Sleep with your head elevated and wash the area gently with saline spray. The transplanted hairs will shed after 3-4 weeks—this is completely normal (shock loss). New hair growth begins at month 3, and final density is visible at 9-12 months."
      }
    ]
  },
  {
    id: 4,
    title: "Managing Diabetes: Nutrition, Exercise & Monitoring Tips",
    excerpt: "Evidence-based lifestyle changes that help patients with Type 2 diabetes maintain healthy blood sugar levels, reduce medication dependency, and live fully.",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=800&q=80",
    category: "Diabetes",
    categoryColor: "#34d399",
    categoryBg: "#d1fae5",
    author: "Dr. Zara Ahmed",
    authorImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
    authorTitle: "MBBS, MD (Endocrinology)",
    authorBio: "Dr. Zara Ahmed is a leading endocrinologist focused on diabetes control, hormonal therapies, and metabolic health.",
    date: "May 14, 2026",
    readTime: "7 min read",
    tag: "health",
    content: [
      {
        type: "p",
        text: "Type 2 diabetes is a chronic metabolic condition characterized by insulin resistance. While medication is necessary for many, clinical evidence shows that structured lifestyle adjustments are the most powerful tool for stabilizing blood glucose, lowering HbA1c levels, and in some cases, achieving diabetes remission."
      },
      {
        type: "h2",
        text: "1. The Power of Complex Carbohydrates"
      },
      {
        type: "p",
        text: "Nutrition is the foundation of diabetes control. Simple carbohydrates (white bread, white rice, sugary drinks) cause rapid spikes in blood sugar. Shift to complex carbohydrates (oats, brown rice, lentils, quinoa, fresh vegetables) which release energy slowly due to their high fiber content, keeping insulin demands stable."
      },
      {
        type: "callout",
        text: "CLINICAL TIP: Follow the 'Plate Method'. Fill half of your plate with non-starchy vegetables (spinach, broccoli, cucumbers), one-quarter with lean protein (chicken, fish, tofu), and one-quarter with healthy complex carbs."
      },
      {
        type: "h2",
        text: "2. Resistance Training vs. Cardio"
      },
      {
        type: "p",
        text: "Physical exercise acts like a natural insulin sensitizer. Muscles use glucose for energy even without insulin during muscle contractions. A combination of moderate cardio (brisk walking 30 mins a day) and light resistance training (bodyweight exercises 3 times a week) dramatically improves glucose clearance."
      },
      {
        type: "quote",
        text: "Our goal is not just to lower blood sugar with medications, but to restore the body's natural insulin sensitivity through consistent, daily lifestyle practices."
      },
      {
        type: "h2",
        text: "3. Continuous Monitoring & Tracking HbA1c"
      },
      {
        type: "p",
        text: "Self-monitoring using a glucose meter or a Continuous Glucose Monitor (CGM) helps you understand how specific foods and activities affect your blood sugar. Track your HbA1c (three-month blood sugar average) every 90 days. Keeping HbA1c below 6.5% drastically reduces cardiovascular and kidney complications."
      }
    ]
  },
  {
    id: 5,
    title: "Pregnancy Nutrition: What to Eat & Avoid Each Trimester",
    excerpt: "A trimester-by-trimester nutritional guide from our expert gynecologists covering essential nutrients, safe foods, and common myths that expecting mothers should know.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    category: "Gynecology",
    categoryColor: "#f59e0b",
    categoryBg: "#fef3c7",
    author: "Dr. Fatima Malik",
    authorImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    authorTitle: "MBBS, MRCOG (Gynecology)",
    authorBio: "Dr. Fatima Malik is a consultant gynecologist and high-risk obstetrician trained in London with 16+ years of clinical practice.",
    date: "May 7, 2026",
    readTime: "9 min read",
    tag: "gynecology",
    content: [
      {
        type: "p",
        text: "Nutrition during pregnancy plays a vital role in maternal health and fetal development. While the old saying 'eating for two' is a myth, you do require higher densities of specific vitamins and minerals to support key phases of embryonic and fetal growth."
      },
      {
        type: "h2",
        text: "First Trimester: Folate & Nausea Support"
      },
      {
        type: "p",
        text: "The first 12 weeks are critical for organogenesis and neural tube development. Folate (Vitamin B9) is highly mandatory. Eat dark leafy greens, citrus fruits, and legumes, and take a daily 400mcg folic acid supplement. To combat morning sickness, eat small, frequent meals high in protein and sip ginger tea."
      },
      {
        type: "h2",
        text: "Second Trimester: Calcium & Iron Demands"
      },
      {
        type: "p",
        text: "Between weeks 13 and 26, the baby's skeletal structure hardens, and maternal blood volume expands by up to 50%. Focus on Calcium (dairy, almonds, leafy greens) for bone density, and Iron (lean meat, beans, fortified cereals) paired with Vitamin C to enhance absorption and prevent gestational anemia."
      },
      {
        type: "callout",
        text: "CLINICAL TIP: Avoid foods with high bacterial risks: raw/unpasteurized dairy, soft cheeses, raw eggs, raw seafood/sushi, and cold deli meats, which can harbor Listeria."
      },
      {
        type: "quote",
        text: "Every pregnancy is unique. The key is focused, nutrient-dense eating rather than increasing sheer calorie intake. Focus on natural, unprocessed whole foods for optimal maternal health."
      },
      {
        type: "h2",
        text: "Third Trimester: Energy & Healthy Fats"
      },
      {
        type: "p",
        text: "During the final stretch, the baby gains weight rapidly and brain development peaks. Introduce healthy omega-3 fatty acids (walnuts, chia seeds, wild salmon) for fetal brain growth. Maintain light physical activity and consult your obstetrician to track growth scans and blood pressure regularly."
      }
    ]
  },
  {
    id: 6,
    title: "Knee Pain Solutions: When to Try Physio vs Surgery",
    excerpt: "Not every knee problem needs an operation. Our orthopedic specialists explain the decision tree between conservative management, physiotherapy, and surgical intervention.",
    image: "https://images.unsplash.com/photo-1597764690523-15bea4c581c9?auto=format&fit=crop&w=800&q=80",
    category: "Orthopedic",
    categoryColor: "#ff7f50",
    categoryBg: "#fff0eb",
    author: "Dr. Hassan Raza",
    authorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80",
    authorTitle: "MBBS, FCPS (Orthopedics)",
    authorBio: "Dr. Hassan Raza is a consultant orthopedic surgeon specializing in arthroscopy, joint replacement, and sports medicine.",
    date: "April 29, 2026",
    readTime: "6 min read",
    tag: "orthopedic",
    content: [
      {
        type: "p",
        text: "Knee pain is one of the most common musculoskeletal complaints among adults. Whether it is caused by osteoarthritis, ligament sprains, or meniscus tears, many patients assume that surgery is the only path to permanent recovery. In reality, a large majority of knee conditions can be treated successfully without ever entering an operating theater."
      },
      {
        type: "h2",
        text: "Conservative Management & Physiotherapy"
      },
      {
        type: "p",
        text: "For conditions like mild osteoarthritis, patellofemoral pain syndrome, or partial tendon sprains, structured physiotherapy is the gold standard of care. Focus on strengthening the quadriceps, hamstrings, and hip stabilizers to take the mechanical load off the joint. Joint lubrication injections (hyaluronic acid) can also provide relief."
      },
      {
        type: "callout",
        text: "CLINICAL TIP: Weight management is incredibly effective. Losing just 1 kg of body weight removes approximately 4 kg of pressure from your knees during daily activities like walking."
      },
      {
        type: "h2",
        text: "When Surgical Intervention Is Necessary"
      },
      {
        type: "p",
        text: "Surgery becomes the recommended option under specific clinical criteria:"
      },
      {
        type: "p",
        text: "• Mechanical locking: Meniscus tears that cause the joint to catch or lock physically.\n• Joint instability: Complete ACL/PCL tears in active individuals, which cause the knee to give out.\n• End-stage arthritis: Severe, bone-on-bone osteoarthritis that fails to respond to physical therapy and impairs basic mobility."
      },
      {
        type: "quote",
        text: "Surgery is a tool, not a first resort. We always exhaust conservative physical protocols first, as muscle strengthening and structural re-alignment are vital for long-term joint health."
      },
      {
        type: "h2",
        text: "Conclusion"
      },
      {
        type: "p",
        text: "An accurate diagnosis via physical examination and MRI scanning is key. Speak to an orthopedic specialist to map out a phased recovery plan tailored to your activity level."
      }
    ]
  }
];

const INITIAL_COMMENTS = [
  { name: "Fatima Ali", rating: 5, text: "Extremely informative article! Very helpful guidelines.", date: "1 day ago" },
  { name: "Usman Khalid", rating: 5, text: "Excellent clinical insights. Appreciate the doctor taking time to write this.", date: "3 days ago" }
];

export default function BlogPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the current post
  const post = BLOG_POSTS.find(p => p.id === parseInt(id)) || BLOG_POSTS[0];

  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [commentForm, setCommentForm] = useState({ name: "", text: "", rating: 5 });
  const [likes, setLikes] = useState(42);
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (commentForm.name && commentForm.text) {
      const newComment = {
        name: commentForm.name,
        rating: commentForm.rating,
        text: commentForm.text,
        date: "Just now"
      };
      setComments([newComment, ...comments]);
      setCommentForm({ name: "", text: "", rating: 5 });
      alert("Comment posted successfully!");
    }
  };

  // Find the authoring doctor from the mock data to pass to the booking page
  // If doctor details aren't matching exactly, fallback to general details
  const matchingDoctor = {
    name: post.author,
    specialty: post.category,
    title: post.authorTitle,
    image: post.authorImg,
    solidColor: post.categoryColor,
    lightBg: "from-sky-50 to-pink-50",
    badgeBg: "bg-sky-100",
    badgeText: "text-sky-700",
    fee: "PKR 3,000",
    branch: ["Gulberg", "DHA"],
    languages: ["English", "Urdu"]
  };

  // Related articles filter (excluding the current one)
  const relatedPosts = BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 3);

  const shareText = `Check out this excellent medical article: "${post.title}"`;
  const shareUrl = window.location.href;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="min-h-screen font-sans bg-slate-50">
      <Navbar />

      {/* --- HERO ARTICLE HEADER --- */}
      <section 
        className="relative pt-36 pb-12 border-b border-slate-200/50"
        style={{ background: THEME.grad }}
      >
        <div className="max-w-4xl mx-auto px-4 text-left">
          
          {/* Back to Blog trigger */}
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-pink-600 transition-colors mb-6"
            style={{ textDecoration: "none" }}
          >
            <FiArrowLeft size={13} /> Back to Health Articles
          </Link>

          <span 
            className="inline-block text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{ background: post.categoryBg, color: post.categoryColor }}
          >
            {post.category}
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-800 leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author Meta Info */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-slate-200/60">
            <img 
              src={post.authorImg} 
              alt={post.author} 
              className="w-12 h-12 rounded-full object-cover ring-2 ring-pink-100"
            />
            <div>
              <p className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                {post.author} 
                <span className="text-[10px] text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Author</span>
              </p>
              <p className="text-slate-400 text-xs mt-0.5">{post.authorTitle}</p>
            </div>
            <div className="sm:ml-auto flex items-center gap-4 text-xs text-slate-400 font-semibold">
              <span className="flex items-center gap-1"><FiCalendar /> {post.date}</span>
              <span className="flex items-center gap-1"><FiClock /> {post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN ARTICLE CONTENT & SIDEBAR GRID --- */}
      <section className="py-12 max-w-6xl mx-auto px-4">
        
        {/* Cover Image */}
        <div className="w-full max-w-4xl mx-auto h-[350px] sm:h-[480px] rounded-3xl overflow-hidden shadow-xl mb-12 border border-white">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* LEFT: Read Content */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm space-y-6 text-left">
            
            {/* Dynamic Content Mapping */}
            {post.content.map((item, index) => {
              if (item.type === "p") {
                return (
                  <p key={index} className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {item.text}
                  </p>
                );
              }
              if (item.type === "h2") {
                return (
                  <h2 key={index} className="text-lg sm:text-xl font-extrabold text-slate-800 pt-4 flex items-center gap-2">
                    <span className="w-1.5 h-5 rounded-full inline-block" style={{ background: post.categoryColor }} />
                    {item.text}
                  </h2>
                );
              }
              if (item.type === "callout") {
                return (
                  <div 
                    key={index} 
                    className="p-5 rounded-2xl bg-sky-50 border border-sky-100 flex items-start gap-3 my-4"
                  >
                    <HiSparkles size={18} className="text-sky-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-sky-800 uppercase tracking-widest mb-1">Clinical Insight</p>
                      <p className="text-xs sm:text-sm text-sky-700 leading-relaxed font-semibold">{item.text}</p>
                    </div>
                  </div>
                );
              }
              if (item.type === "quote") {
                return (
                  <blockquote 
                    key={index} 
                    className="pl-5 border-l-4 border-pink-500 py-2.5 my-6 italic text-slate-700 font-serif text-sm sm:text-base leading-relaxed bg-slate-50/50 pr-4 rounded-r-xl"
                  >
                    "{item.text}"
                    <cite className="block text-xs font-bold text-slate-500 mt-2 font-sans not-italic">— {post.author}</cite>
                  </blockquote>
                );
              }
              return null;
            })}

            {/* Like and Share Interaction Row */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-8">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  hasLiked 
                    ? "bg-rose-50 border-rose-200 text-rose-500 shadow-sm" 
                    : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                }`}
              >
                <FiHeart className={hasLiked ? "fill-rose-500 text-rose-500 animate-ping" : ""} />
                {likes} Likes
              </button>

              <span className="text-xs text-slate-400 font-bold">
                Medical review verified by clinic board.
              </span>
            </div>

            {/* --- COMMENTS SECTION --- */}
            <div className="pt-8 border-t border-slate-100 mt-10 space-y-6">
              <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
                <FiMessageSquare className="text-pink-500" /> Comments & Discussion ({comments.length})
              </h3>

              {/* Add Comment Form */}
              <form onSubmit={handlePostComment} className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 space-y-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Share Your Thoughts</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input 
                      type="text" 
                      required
                      value={commentForm.name}
                      onChange={e => setCommentForm({...commentForm, name: e.target.value})}
                      placeholder="Your name" 
                      className="w-full border border-slate-200 bg-white rounded-xl p-3 text-xs outline-none focus:border-pink-400 transition-colors"
                    />
                  </div>
                  <div>
                    <select 
                      value={commentForm.rating}
                      onChange={e => setCommentForm({...commentForm, rating: parseInt(e.target.value)})}
                      className="w-full border border-slate-200 bg-white rounded-xl p-3 text-xs outline-none focus:border-pink-400 transition-colors"
                    >
                      <option value={5}>5 Stars (Excellent)</option>
                      <option value={4}>4 Stars (Good)</option>
                      <option value={3}>3 Stars (Average)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <textarea 
                    rows={3}
                    required
                    value={commentForm.text}
                    onChange={e => setCommentForm({...commentForm, text: e.target.value})}
                    placeholder="Write your comment or medical inquiry..."
                    className="w-full border border-slate-200 bg-white rounded-xl p-3 text-xs outline-none focus:border-pink-400 transition-colors resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-xs font-bold shadow transition-colors flex items-center gap-1.5 cursor-pointer border-none"
                >
                  <FiSend size={12} /> Post Comment
                </button>
              </form>

              {/* Comments list */}
              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <div key={index} className="bg-white border border-slate-100 rounded-2xl p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs font-extrabold text-slate-800">{comment.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map(s => (
                              <FaStar key={s} size={9} color={comment.rating >= s ? "#FBBF24" : "#e2e8f0"} />
                            ))}
                          </div>
                          <span className="text-[9px] text-slate-400 font-bold">{comment.date}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                        Patient Verified
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {comment.text}
                    </p>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* RIGHT: SIDEBAR */}
          <div className="lg:col-span-4 space-y-6 text-left">
            
            {/* Author Profile Bio Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center">
              <img 
                src={post.authorImg} 
                alt={post.author} 
                className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-pink-100 mb-4 shadow-md"
              />
              <h4 className="font-extrabold text-slate-800 text-base leading-none mb-1">{post.author}</h4>
              <p className="text-xs font-bold text-pink-600 mb-3">{post.authorTitle}</p>
              <p className="text-slate-500 text-xs leading-relaxed mb-5">{post.authorBio}</p>
              
              <Link 
                to="/book-appointment" 
                state={{ doctor: matchingDoctor }}
                className="w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-xl text-white font-bold text-xs shadow-md"
                style={{ background: THEME.gradBtn, textDecoration: "none" }}
              >
                <FiCalendar /> Book Consultation
              </Link>
            </div>

            {/* Related Articles list */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
              <h4 className="font-extrabold text-xs uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2 mb-3">
                Related Articles
              </h4>
              <div className="space-y-4">
                {relatedPosts.map(relPost => (
                  <Link 
                    key={relPost.id}
                    to={`/blog/${relPost.id}`}
                    className="flex gap-3 hover:opacity-85 transition-opacity"
                    style={{ textDecoration: "none" }}
                  >
                    <img 
                      src={relPost.image} 
                      alt={relPost.title} 
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h5 className="font-bold text-xs text-slate-800 leading-snug line-clamp-2 hover:text-pink-600 transition-colors">
                        {relPost.title}
                      </h5>
                      <span className="text-[10px] text-slate-400 font-bold block mt-1">{relPost.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Share Drawer */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
              <h4 className="font-extrabold text-xs uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2 mb-3">
                Share This Article
              </h4>
              <div className="grid grid-cols-4 gap-2 mb-2">
                <a 
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center text-[#25D366] transition-colors border border-emerald-100 shadow-sm"
                  title="Share on WhatsApp"
                >
                  <FaWhatsapp size={18} />
                </a>
                <a 
                  href={facebookShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-[#1877F2] transition-colors border border-blue-100 shadow-sm"
                  title="Share on Facebook"
                >
                  <FaFacebook size={18} />
                </a>
                <a 
                  href={twitterShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-900 transition-colors border border-slate-200 shadow-sm"
                  title="Share on Twitter"
                >
                  <FaTwitter size={18} />
                </a>
                <a 
                  href={linkedinShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-sky-50 hover:bg-sky-100 flex items-center justify-center text-[#0077B5] transition-colors border border-sky-100 shadow-sm"
                  title="Share on LinkedIn"
                >
                  <FaLinkedin size={18} />
                </a>
              </div>
              <button 
                onClick={handleCopyLink}
                className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600 border border-slate-200 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <FiCheck className="text-green-500" /> Copied Link
                  </>
                ) : (
                  <>
                    <FiShare2 size={13} /> Copy Link to Clipboard
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
