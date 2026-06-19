import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FiSearch, FiArrowRight, FiPhone, FiCalendar, FiX,
  FiMessageCircle, FiClock, FiCheckCircle, FiAlertCircle,
  FiDollarSign, FiChevronRight, FiStar,
  FiActivity, FiShield, FiZap, FiChevronDown, FiFilter, FiHeart
} from "react-icons/fi";
import { GiTooth, GiHeartBeats, GiBabyFace, GiBrain } from "react-icons/gi";
import { MdFace, MdContentCut } from "react-icons/md";
import { TbEar, TbBone, TbStethoscope } from "react-icons/tb";


// // ─────────────────────────────────────────────────────────────────────────────
// // DATA — custom image URLs preserved exactly as user provided
// // ─────────────────────────────────────────────────────────────────────────────
// const services = [
//   {
//     id: "dental-care",
//     category: "Dental Care",
//     icon: GiTooth,
//     image: "https://media.istockphoto.com/id/2229579246/photo/dentist-examining-young-patient-woman-teeth-at-dentists-office.jpg?s=1024x1024&w=is&k=20&c=9MhwlLtmj89pPtfjSTxYm4NPYlTJpBKH7V4oYyX3vR0=",
//     gradient: "from-sky-600 to-cyan-400",
//     solidColor: "#0ea5e9",
//     lightBg: "from-sky-50 to-cyan-50",
//     border: "border-sky-200",
//     accent: "text-sky-600",
//     badgeBg: "bg-sky-100",
//     badgeText: "text-sky-700",
//     tag: "dental",
//     type: "surgical",
//     popular: true,
//     tagline: "Bright Smiles, Healthy Lives",
//     shortDesc: "Comprehensive dental treatments from routine check-ups to advanced cosmetic & restorative procedures.",
//     overview: "Our dental department offers a full spectrum of oral healthcare services. From preventive dentistry and routine cleanings to advanced implant surgery, orthodontics, and cosmetic smile makeovers — our board-certified dentists use the latest technology to deliver painless, long-lasting results.",
//     symptoms: ["Tooth pain or sensitivity","Bleeding or swollen gums","Discolored or stained teeth","Broken or chipped teeth","Persistent bad breath","Jaw pain or clicking"],
//     benefits: ["Pain-free procedures with advanced anesthesia","Lifetime warranty on implants","Same-day emergency appointments","Digital X-rays with 90% less radiation","Cosmetic results in as few as 1 visit"],
//     treatments: ["Teeth Whitening","Dental Implants","Root Canal Therapy","Orthodontics / Braces","Veneers & Crowns","Gum Treatment","Dentures","Wisdom Tooth Extraction"],
//     procedure: "Consultation → Digital X-ray → Treatment Plan → Procedure → Recovery → Follow-up",
//     duration: "30 – 90 min per session",
//     recovery: "1 – 7 days",
//     fee: "From PKR 1,500",
//     faqs: [
//       { q: "Is root canal painful?", a: "No. We use modern anesthesia and sedation techniques that make root canals completely painless." },
//       { q: "How long do implants last?", a: "With proper care, dental implants can last a lifetime. We provide a lifetime structural warranty." },
//     ],
//   },
//   {
//     id: "skin-care",
//     category: "Skin Care",
//     icon: MdFace,
//     image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
//     gradient: "from-pink-500 to-rose-400",
//     solidColor: "#ec4899",
//     lightBg: "from-pink-50 to-rose-50",
//     border: "border-pink-200",
//     accent: "text-pink-600",
//     badgeBg: "bg-pink-100",
//     badgeText: "text-pink-700",
//     tag: "skin",
//     type: "aesthetic",
//     popular: true,
//     tagline: "Radiate Confidence Every Day",
//     shortDesc: "Advanced dermatology & aesthetic skin treatments for all skin types and conditions.",
//     overview: "Our dermatology clinic combines clinical expertise with cutting-edge aesthetic technology. Whether you're dealing with acne, pigmentation, signs of aging, or chronic skin conditions, our certified dermatologists create fully personalized treatment plans.",
//     symptoms: ["Acne & recurring breakouts","Dark spots & uneven pigmentation","Wrinkles & fine lines","Excessive dryness or oiliness","Eczema or Psoriasis flare-ups","Unwanted hair or scars"],
//     benefits: ["FDA-approved laser & light therapies","Customized skincare regimens","Visible results after first session","Non-invasive anti-aging options","Certified female dermatologists available"],
//     treatments: ["Laser Therapy","Chemical Peels","Microneedling","Botox & Dermal Fillers","PRP Skin Rejuvenation","Anti-Aging Facials","Acne Scar Treatment","Mole & Wart Removal"],
//     procedure: "Skin Analysis → Diagnosis → Customized Plan → Treatment Sessions → Maintenance Protocol",
//     duration: "45 – 120 min per session",
//     recovery: "1 – 14 days",
//     fee: "From PKR 2,500",
//     faqs: [
//       { q: "How many laser sessions do I need?", a: "Typically 4–8 sessions spaced 4 weeks apart depending on your skin type and target condition." },
//       { q: "Is Botox safe?", a: "Yes. We use only FDA-approved products administered by certified physicians in a clinical setting." },
//     ],
//   },
//   {
//     id: "hair-transplant",
//     category: "Hair Transplant",
//     icon: MdContentCut,
//     image: "https://plus.unsplash.com/premium_photo-1702598531958-f20cbd116a99?auto=format&fit=crop&w=900&q=80",
//     gradient: "from-violet-500 to-purple-400",
//     solidColor: "#8b5cf6",
//     lightBg: "from-violet-50 to-purple-50",
//     border: "border-violet-200",
//     accent: "text-violet-600",
//     badgeBg: "bg-violet-100",
//     badgeText: "text-violet-700",
//     tag: "hair",
//     type: "surgical",
//     popular: false,
//     tagline: "Restore Your Crown Naturally",
//     shortDesc: "State-of-the-art hair restoration using FUE, DHI, and PRP techniques with natural-looking results.",
//     overview: "We specialize in advanced hair restoration surgeries performed by internationally trained surgeons. Our clinic uses the latest FUE and DHI techniques to deliver natural density and hairline design tailored to your facial structure.",
//     symptoms: ["Male or female pattern baldness","Receding hairline","Patchy or thinning hair","Hair loss after illness or stress","Beard or eyebrow thinning"],
//     benefits: ["Permanent natural-looking results","No linear scar (FUE technique)","Custom hairline design","Local anesthesia — no general anesthesia","High graft survival rate (95%+)"],
//     treatments: ["FUE Hair Transplant","DHI Technique","PRP Hair Treatment","Scalp Micropigmentation","Beard Transplant","Eyebrow Transplant","Female Hair Restoration"],
//     procedure: "Hair Analysis → Donor Assessment → Pre-op Tests → Surgery Day → Post-op Care → 12-month Follow-up",
//     duration: "4 – 8 hours (surgery day)",
//     recovery: "7 – 14 days",
//     fee: "From PKR 50,000",
//     faqs: [
//       { q: "When will I see results?", a: "Initial growth begins at 3–4 months. Full, final results are visible by 12 months post-surgery." },
//       { q: "Is hair transplant permanent?", a: "Yes. Transplanted follicles are taken from DHT-resistant areas and are permanent." },
//     ],
//   },
//   {
//     id: "orthopedic",
//     category: "Orthopedic",
//     icon: TbBone,
//     image: "https://images.unsplash.com/photo-1597764690523-15bea4c581c9?auto=format&fit=crop&w=900&q=80",
//     gradient: "from-amber-500 to-orange-400",
//     solidColor: "#f59e0b",
//     lightBg: "from-amber-50 to-orange-50",
//     border: "border-amber-200",
//     accent: "text-amber-600",
//     badgeBg: "bg-amber-100",
//     badgeText: "text-amber-700",
//     tag: "orthopedic",
//     type: "surgical",
//     popular: false,
//     tagline: "Move Freely, Live Fully",
//     shortDesc: "Expert bone, joint & muscle care with cutting-edge surgical and non-surgical solutions.",
//     overview: "Our orthopedic department provides comprehensive care for all musculoskeletal conditions. From sports injuries and fractures to complex joint replacements and spinal surgeries, our team uses minimally invasive techniques for faster recovery.",
//     symptoms: ["Chronic joint pain or stiffness","Sports or trauma injuries","Back, neck, or spinal pain","Fractures or dislocations","Arthritis progression","Muscle weakness or numbness"],
//     benefits: ["Minimally invasive arthroscopic surgery","Robotic-assisted joint replacement","Sports rehab with certified physiotherapists","Pain management without surgery when possible","Same-day discharge for many procedures"],
//     treatments: ["Joint Replacement (Hip/Knee)","Arthroscopy","Spine Surgery","Fracture Treatment","Physical Therapy","Sports Rehabilitation","PRP Joint Injections","Scoliosis Treatment"],
//     procedure: "Consultation → Imaging (X-ray/MRI) → Diagnosis → Treatment Plan → Surgery → Physiotherapy → Recovery",
//     duration: "30 min – 4 hours",
//     recovery: "2 – 12 weeks",
//     fee: "From PKR 3,000",
//     faqs: [
//       { q: "Can arthritis be treated without surgery?", a: "Yes. Many patients respond well to PRP injections, physiotherapy, and medication before surgery is considered." },
//       { q: "How long does joint replacement last?", a: "Modern implants last 20–25 years with proper care and regular follow-ups." },
//     ],
//   },
//   {
//     id: "ent",
//     category: "ENT",
//     icon: TbEar,
//     image: "https://plus.unsplash.com/premium_photo-1661779725491-e997e70928fc?auto=format&fit=crop&w=900&q=80",
//     gradient: "from-teal-500 to-emerald-400",
//     solidColor: "#14b8a6",
//     lightBg: "from-teal-50 to-emerald-50",
//     border: "border-teal-200",
//     accent: "text-teal-600",
//     badgeBg: "bg-teal-100",
//     badgeText: "text-teal-700",
//     tag: "ent",
//     type: "medical",
//     popular: false,
//     tagline: "Hear, Breathe & Balance Better",
//     shortDesc: "Specialized ear, nose & throat care for all ages with advanced diagnostic tools.",
//     overview: "Our ENT department offers expert diagnosis and treatment of conditions affecting the ear, nose, throat, head, and neck. We serve patients of all ages from children to adults with complex sinus disorders or voice conditions.",
//     symptoms: ["Hearing loss or ringing ears","Chronic sinusitis or blocked nose","Recurrent tonsil or throat infections","Ear pain or discharge","Voice changes or hoarseness","Vertigo or balance problems"],
//     benefits: ["Advanced endoscopic diagnostics","Allergy testing & immunotherapy","Pediatric ENT specialists available","Minimally invasive sinus surgery","Hearing aid fitting & audiology"],
//     treatments: ["Septoplasty","Tonsillectomy & Adenoidectomy","Ear Tube Surgery","Hearing Aids & Audiology","FESS Surgery","Voice Therapy","Allergy Treatment","Cochlear Implant Evaluation"],
//     procedure: "Consultation → Endoscopy/Audiometry → Diagnosis → Medical or Surgical Treatment → Follow-up",
//     duration: "20 – 60 min consultation",
//     recovery: "1 – 3 weeks",
//     fee: "From PKR 2,000",
//     faqs: [
//       { q: "At what age can children have tonsil surgery?", a: "Tonsillectomy is safe from age 2 onwards when medically indicated. Our pediatric ENT surgeons are highly experienced." },
//       { q: "Can sinusitis be cured permanently?", a: "FESS surgery has a very high success rate for chronic sinusitis that doesn't respond to medications." },
//     ],
//   },
//   {
//     id: "gynecology",
//     category: "Gynecology",
//     icon: GiBabyFace,
//     image: "https://plus.unsplash.com/premium_photo-1664299272877-ce558ec81559?auto=format&fit=crop&w=900&q=80",
//     gradient: "from-fuchsia-500 to-pink-400",
//     solidColor: "#d946ef",
//     lightBg: "from-fuchsia-50 to-pink-50",
//     border: "border-fuchsia-200",
//     accent: "text-fuchsia-600",
//     badgeBg: "bg-fuchsia-100",
//     badgeText: "text-fuchsia-700",
//     tag: "gynecology",
//     type: "medical",
//     popular: true,
//     tagline: "Expert Women's Healthcare",
//     shortDesc: "Complete women's health services from routine exams to high-risk pregnancy management.",
//     overview: "Our gynecology department is a safe, compassionate space dedicated entirely to women's health. Our female and male gynecologists offer expert care across all life stages — from adolescence and reproductive health to menopause management.",
//     symptoms: ["Irregular or painful periods","Pelvic pain or pressure","Pregnancy-related concerns","Hormonal imbalance symptoms","Fertility challenges","Abnormal discharge or bleeding"],
//     benefits: ["All-female consultation option available","High-risk pregnancy unit","Advanced laparoscopic surgery","Fertility counseling & IUI/IVF referrals","Confidential & compassionate care"],
//     treatments: ["Prenatal & Antenatal Care","Normal & Cesarean Delivery","PCOS Management","Laparoscopy & Hysteroscopy","Hysterectomy","Fertility Treatment","Menopause Management","Cervical Screening"],
//     procedure: "Consultation → Ultrasound & Tests → Diagnosis → Medical or Surgical Plan → Delivery / Procedure → Postpartum Care",
//     duration: "30 – 45 min consultation",
//     recovery: "Variable (24hr to 6 weeks)",
//     fee: "From PKR 2,000",
//     faqs: [
//       { q: "Can I see a female doctor only?", a: "Yes. We have experienced female gynecologists available all days of the week for consultations and procedures." },
//       { q: "What is the difference between IUI and IVF?", a: "IUI is a simpler, less invasive fertility procedure. IVF involves fertilization outside the body and is recommended when IUI fails." },
//     ],
//   },
//   {
//     id: "cardiology",
//     category: "Cardiology",
//     icon: GiHeartBeats,
//     image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=1200&q=80",
//     gradient: "from-red-500 to-rose-400",
//     solidColor: "#ef4444",
//     lightBg: "from-red-50 to-rose-50",
//     border: "border-red-200",
//     accent: "text-red-600",
//     badgeBg: "bg-red-100",
//     badgeText: "text-red-700",
//     tag: "cardiology",
//     type: "medical",
//     popular: false,
//     tagline: "Protecting Your Heart's Future",
//     shortDesc: "Comprehensive cardiac care with advanced diagnostics, intervention & rehabilitation programs.",
//     overview: "Our cardiology centre provides state-of-the-art diagnosis and treatment for all heart and vascular conditions. From routine ECGs and echocardiograms to emergency angioplasty and cardiac rehabilitation programs.",
//     symptoms: ["Chest pain or tightness","Shortness of breath on exertion","High blood pressure","Irregular or racing heartbeat","Unexplained fatigue or dizziness","Swollen ankles or legs"],
//     benefits: ["24/7 cardiac emergency unit","Cath lab for emergency angioplasty","Non-invasive cardiac imaging","Structured cardiac rehab programs","Preventive cardiology consultations"],
//     treatments: ["ECG & Holter Monitor","Echocardiography","Coronary Angiography","Angioplasty & Stenting","Pacemaker Implantation","Cardiac Rehabilitation","Hypertension Management","Lipid Management"],
//     procedure: "Consultation → ECG/Echo → Stress Test → Advanced Imaging → Intervention → Rehab",
//     duration: "30 – 90 min",
//     recovery: "1 – 8 weeks",
//     fee: "From PKR 3,000",
//     faqs: [
//       { q: "What is an angioplasty?", a: "It's a minimally invasive procedure that opens blocked coronary arteries using a small balloon and often a stent to restore blood flow." },
//       { q: "How often should I get my heart checked?", a: "Adults over 40 should have an annual cardiac screening. Those with risk factors should be checked more frequently." },
//     ],
//   },
//   {
//     id: "neurology",
//     category: "Neurology",
//     icon: GiBrain,
//     image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=900&q=80",
//     gradient: "from-indigo-500 to-blue-400",
//     solidColor: "#6366f1",
//     lightBg: "from-indigo-50 to-blue-50",
//     border: "border-indigo-200",
//     accent: "text-indigo-600",
//     badgeBg: "bg-indigo-100",
//     badgeText: "text-indigo-700",
//     tag: "neurology",
//     type: "medical",
//     popular: false,
//     tagline: "Advanced Brain & Nerve Care",
//     shortDesc: "Expert diagnosis & treatment of neurological conditions including stroke, epilepsy & migraines.",
//     overview: "Our neurology department offers expert care for all conditions of the brain, spine, and nervous system. Using advanced neuroimaging, EEG, and the latest treatment protocols, our neurologists provide accurate diagnoses and effective management plans.",
//     symptoms: ["Severe or frequent headaches","Memory loss or confusion","Tremors or involuntary movements","Seizures or fainting episodes","Numbness, tingling, or weakness","Balance or coordination problems"],
//     benefits: ["Advanced MRI & CT neuroimaging","24/7 stroke response team","Epilepsy monitoring unit","Neuropathy & pain management","Multidisciplinary neurological care"],
//     treatments: ["MRI / CT Brain & Spine","EEG Testing","Stroke Thrombolysis","Epilepsy Management","Migraine Therapy","Parkinson's Treatment","Nerve Conduction Study","Multiple Sclerosis Care"],
//     procedure: "Consultation → Neurological Exam → MRI/EEG → Diagnosis → Medication or Intervention → Monitoring",
//     duration: "45 – 60 min consultation",
//     recovery: "Ongoing management",
//     fee: "From PKR 3,500",
//     faqs: [
//       { q: "What should I do during a seizure?", a: "Keep the person safe, on their side, away from sharp objects. Time the seizure and call emergency if it lasts over 5 minutes." },
//       { q: "Can migraines be permanently cured?", a: "While there's no permanent cure, modern treatments including preventive medications and Botox injections significantly reduce frequency and severity." },
//     ],
//   },
// ];

// const TAGS = [
//   { value: "all",         label: "All Services",   color: null },
//   { value: "dental",      label: "Dental Care",    color: "#0ea5e9" },
//   { value: "skin",        label: "Skin Care",      color: "#ec4899" },
//   { value: "hair",        label: "Hair Transplant",color: "#8b5cf6" },
//   { value: "orthopedic",  label: "Orthopedic",     color: "#f59e0b" },
//   { value: "ent",         label: "ENT",            color: "#14b8a6" },
//   { value: "gynecology",  label: "Gynecology",     color: "#d946ef" },
//   { value: "cardiology",  label: "Cardiology",     color: "#ef4444" },
//   { value: "neurology",   label: "Neurology",      color: "#6366f1" },
// ];

// const TYPES = [
//   { value: "all",       label: "All Types" },
//   { value: "surgical",  label: "Surgical" },
//   { value: "medical",   label: "Medical" },
//   { value: "aesthetic", label: "Aesthetic" },
// ];

// // ─────────────────────────────────────────────────────────────────────────────
// // MODAL
// // ─────────────────────────────────────────────────────────────────────────────
// function ServiceModal({ service, onClose }) {
//   const [openFaq, setOpenFaq] = useState(null);
//   const Icon = service.icon;
//   return (
//     <AnimatePresence>
//       <motion.div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
//         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//         onClick={onClose}
//         style={{ background: "rgba(2,8,23,0.82)", backdropFilter: "blur(8px)" }}>
//         <motion.div
//           initial={{ opacity: 0, y: 60, scale: 0.93 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           exit={{ opacity: 0, y: 30, scale: 0.96 }}
//           transition={{ type: "spring", stiffness: 300, damping: 28 }}
//           onClick={e => e.stopPropagation()}
//           className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">

//           {/* Hero image */}
//           <div className="relative h-52 sm:h-64 rounded-t-3xl overflow-hidden">
//             <img src={service.image} alt={service.category} className="w-full h-full object-cover" />
//             <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(2,8,23,0.75) 0%,rgba(2,8,23,0.25) 55%,transparent 100%)" }} />
//             <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-30 mix-blend-multiply`} />
//             <button onClick={onClose}
//               className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all z-10">
//               <FiX size={14} />
//             </button>
//             <div className="absolute top-4 left-4">
//               <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md border border-white/30 text-white">
//                 <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />{service.type}
//               </span>
//             </div>
//             <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 flex items-end gap-4">
//               <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 shadow-xl border-2 border-white/25`}>
//                 <Icon size={28} className="text-white" />
//               </div>
//               <div>
//                 <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow-lg">{service.category}</h2>
//                 <p className="text-white/70 text-sm font-semibold">{service.tagline}</p>
//               </div>
//             </div>
//           </div>

//           {/* Overview */}
//           <div className="px-6 sm:px-8 pt-5 pb-2">
//             <p className="text-slate-500 text-sm leading-relaxed">{service.overview}</p>
//           </div>

//           {/* Info strip */}
//           <div className="px-6 sm:px-8 py-3">
//             <div className={`grid grid-cols-3 gap-3 p-4 rounded-2xl bg-gradient-to-br ${service.lightBg} border ${service.border}`}>
//               {[{ icon: FiClock, label: "Duration", value: service.duration },
//                 { icon: FiActivity, label: "Recovery", value: service.recovery },
//                 { icon: FiDollarSign, label: "Fee", value: service.fee }].map(item => (
//                 <div key={item.label} className="text-center">
//                   <item.icon className={`mx-auto mb-1 ${service.accent}`} size={14} />
//                   <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
//                   <p className={`text-xs font-bold mt-0.5 ${service.accent}`}>{item.value}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="px-6 sm:px-8 space-y-5 pb-4">
//             {/* Symptoms + Benefits */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//               <div>
//                 <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1.5 ${service.accent}`}>
//                   <FiAlertCircle size={11} /> Common Symptoms
//                 </h3>
//                 <ul className="space-y-1.5">
//                   {service.symptoms.map((s, i) => (
//                     <motion.li key={i} initial={{ opacity:0,x:-8 }} animate={{ opacity:1,x:0 }} transition={{ delay:i*0.05 }}
//                       className="flex items-start gap-2 text-sm text-slate-600">
//                       <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-gradient-to-br ${service.gradient}`} />{s}
//                     </motion.li>
//                   ))}
//                 </ul>
//               </div>
//               <div>
//                 <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1.5 ${service.accent}`}>
//                   <FiCheckCircle size={11} /> Why Choose Us
//                 </h3>
//                 <ul className="space-y-1.5">
//                   {service.benefits.map((b, i) => (
//                     <motion.li key={i} initial={{ opacity:0,x:8 }} animate={{ opacity:1,x:0 }} transition={{ delay:i*0.05 }}
//                       className="flex items-start gap-2 text-sm text-slate-600">
//                       <FiCheckCircle className={`mt-0.5 flex-shrink-0 ${service.accent}`} size={12} />{b}
//                     </motion.li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Treatments */}
//             <div>
//               <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1.5 ${service.accent}`}>
//                 <FiShield size={11} /> Treatments & Procedures
//               </h3>
//               <div className="flex flex-wrap gap-1.5">
//                 {service.treatments.map((t, i) => (
//                   <motion.span key={i} initial={{ opacity:0,scale:0.85 }} animate={{ opacity:1,scale:1 }} transition={{ delay:i*0.04 }}
//                     className={`px-2.5 py-1.5 rounded-xl text-xs font-bold ${service.badgeBg} ${service.badgeText} border ${service.border}`}>
//                     {t}
//                   </motion.span>
//                 ))}
//               </div>
//             </div>

//             {/* Procedure */}
//             <div>
//               <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1.5 ${service.accent}`}>
//                 <FiZap size={11} /> Treatment Procedure
//               </h3>
//               <div className="flex flex-wrap items-center gap-1.5">
//                 {service.procedure.split(" → ").map((step, i, arr) => (
//                   <div key={i} className="flex items-center gap-1.5">
//                     <span className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-white border ${service.border} ${service.accent} shadow-sm`}>{step}</span>
//                     {i < arr.length - 1 && <FiChevronRight className="text-slate-300" size={11} />}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* FAQ */}
//             <div>
//               <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-2.5 ${service.accent}`}>FAQ</h3>
//               <div className="space-y-2">
//                 {service.faqs.map((faq, i) => (
//                   <div key={i} className={`rounded-2xl border ${service.border} overflow-hidden`}>
//                     <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
//                       className={`w-full flex items-center justify-between px-4 py-3.5 text-left bg-gradient-to-r ${service.lightBg}`}>
//                       <span className="text-sm font-bold text-slate-700">{faq.q}</span>
//                       <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
//                         <FiChevronDown size={13} className={service.accent} />
//                       </motion.div>
//                     </button>
//                     <AnimatePresence>
//                       {openFaq === i && (
//                         <motion.div initial={{ height:0,opacity:0 }} animate={{ height:"auto",opacity:1 }} exit={{ height:0,opacity:0 }} transition={{ duration:0.25 }}
//                           className="px-4 pb-4 pt-1 text-sm text-slate-500 bg-white leading-relaxed">{faq.a}</motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Sticky footer */}
//           <div className={`sticky bottom-0 px-6 sm:px-8 py-4 bg-white/95 backdrop-blur-sm border-t ${service.border} flex flex-col sm:flex-row gap-3 rounded-b-3xl`}>
//             <a href="#booking" onClick={onClose}
//               className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r ${service.gradient} text-white font-bold text-sm shadow-lg hover:opacity-90 transition-opacity`}>
//               <FiCalendar size={14} /> Book Appointment
//             </a>
//             <a href="tel:+923001234567"
//               className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all">
//               <FiPhone size={14} /> Call Us
//             </a>
//             <a href="https://wa.me/+923001234567" target="_blank" rel="noopener noreferrer"
//               className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-emerald-200 text-emerald-700 font-bold text-sm hover:bg-emerald-50 transition-all">
//               <FiMessageCircle size={14} /> WhatsApp
//             </a>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // CARD
// // ─────────────────────────────────────────────────────────────────────────────
// function ServiceCard({ service, onOpen, index }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-40px" });
//   const Icon = service.icon;
//   const [hovered, setHovered] = useState(false);

//   // alternating left/right slide + blur fade for a premium stagger feel
//   const xDir = index % 2 === 0 ? -28 : 28;

//   return (
//     <motion.div
//       ref={ref}
//       layout
//       initial={{ opacity: 0, y: 48, x: xDir, scale: 0.93 }}
//       animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : {}}
//       exit={{ opacity: 0, scale: 0.9 }}
//       transition={{
//         duration: 0.65,
//         ease: [0.16, 1, 0.3, 1],
//         delay: (index % 4) * 0.1,
//       }}
//       onHoverStart={() => setHovered(true)}
//       onHoverEnd={() => setHovered(false)}
//       onClick={() => onOpen(service)}
//       className="group relative bg-white rounded-[26px] overflow-hidden cursor-pointer border border-slate-100"
//       style={{
//         boxShadow: hovered
//           ? `0 22px 55px -10px ${service.solidColor}28, 0 8px 20px -4px rgba(0,0,0,0.09)`
//           : "0 2px 12px -2px rgba(0,0,0,0.06)",
//         transition: "box-shadow 0.4s ease, transform 0.4s ease",
//         transform: hovered ? "translateY(-6px)" : "translateY(0)",
//       }}>
//       {/* Image */}
//       <div className="relative h-52 overflow-hidden">
//         <motion.img
//           src={service.image}
//           alt={service.category}
//           className="w-full h-full object-cover"
//           initial={{ scale: 1.12 }}
//           animate={inView ? { scale: hovered ? 1.08 : 1 } : { scale: 1.12 }}
//           transition={{ duration: hovered ? 0.65 : 0.85, ease: [0.25, 1, 0.5, 1] }}
//         />
//         {/* Shimmer sweep on entrance */}
//         {inView && (
//           <motion.div
//             className="absolute inset-0 pointer-events-none"
//             initial={{ x: "-100%" }}
//             animate={{ x: "200%" }}
//             transition={{ duration: 0.75, ease: "easeOut", delay: (index % 4) * 0.1 + 0.3 }}
//             style={{
//               background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
//             }}
//           />
//         )}
//         <motion.div className="absolute inset-0"
//           animate={{ opacity: hovered ? 1 : 0.6 }} transition={{ duration: 0.35 }}
//           style={{ background: "linear-gradient(to top,rgba(2,8,23,0.85) 0%,rgba(2,8,23,0.28) 55%,transparent 100%)" }} />
//         <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-25 mix-blend-multiply`} />

//         {/* Top badges */}
//         <div className="absolute top-3.5 left-3.5 right-3.5 flex items-start justify-between">
//           <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/20 text-white bg-black/30">
//             {service.type}
//           </span>
//           {service.popular && (
//             <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/90 backdrop-blur-md text-[10px] font-bold text-amber-900">
//               <FiStar size={9} fill="currentColor" /> Popular
//             </span>
//           )}
//         </div>

//         {/* Title inside image */}
//         <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 flex items-center gap-3">
//           <motion.div
//             className={`w-11 h-11 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 shadow-lg border border-white/25`}
//             animate={{ scale: hovered ? 1.12 : 1, rotate: hovered ? 5 : 0 }}
//             transition={{ type: "spring", stiffness: 300, damping: 18 }}>
//             <Icon size={22} className="text-white" />
//           </motion.div>
//           <div>
//             <h3 className="text-white font-extrabold text-base leading-tight drop-shadow-md">{service.category}</h3>
//             <p className="text-white/65 text-[11px] font-semibold">{service.tagline}</p>
//           </div>
//         </div>
//       </div>

//       {/* Card body */}
//       <div className="p-5">
//         <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4">{service.shortDesc}</p>
//         <div className="flex flex-wrap gap-1.5 mb-4">
//           {service.treatments.slice(0, 3).map((t, i) => (
//             <span key={i} className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${service.badgeBg} ${service.badgeText}`}>{t}</span>
//           ))}
//           {service.treatments.length > 3 && (
//             <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-100 text-slate-400">
//               +{service.treatments.length - 3} more
//             </span>
//           )}
//         </div>
//         <div className="h-px bg-slate-100 mb-3" />
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
//             <FiClock size={11} />
//             <span>{service.duration.split("–")[0].trim()}</span>
//             <span className="text-slate-200 mx-0.5">·</span>
//             <span className={`font-bold ${service.accent}`}>{service.fee}</span>
//           </div>
//           <motion.div className={`flex items-center gap-1 text-xs font-bold ${service.accent}`}
//             animate={{ x: hovered ? 4 : 0 }} transition={{ type: "spring", stiffness: 400 }}>
//             View Details <FiArrowRight size={12} />
//           </motion.div>
//         </div>
//       </div>

//       {/* Bottom color line */}
//       <motion.div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.gradient}`}
//         initial={{ scaleX: 0 }} animate={{ scaleX: hovered ? 1 : 0 }}
//         transition={{ duration: 0.35 }} style={{ transformOrigin: "left" }} />
//     </motion.div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // TOP FILTER BAR — sticky below navbar
// // ─────────────────────────────────────────────────────────────────────────────
// function TopFilterBar({ activeTag, setActiveTag, activeType, setActiveType, search, setSearch, filteredCount }) {
//   const [typeOpen, setTypeOpen] = useState(false);

//   const activeTypeLabel = TYPES.find(t => t.value === activeType)?.label ?? "All Types";
//   const hasActiveFilters = activeTag !== "all" || activeType !== "all" || search.trim() !== "";

//   return (
//     <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">

//         {/* Row 1: Search + Type dropdown + Result count */}
//         <div className="flex items-center gap-3 py-3 border-b border-slate-100">
//           {/* Search */}
//           <div className="relative flex-1 max-w-xs">
//             <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
//             <input type="text" value={search} onChange={e => setSearch(e.target.value)}
//               placeholder="Search services, treatments…"
//               className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-slate-50 border border-slate-150 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 transition-all" />
//             {search && (
//               <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500">
//                 <FiX size={13} />
//               </button>
//             )}
//           </div>

//           {/* Type dropdown */}
//           <div className="relative flex-shrink-0">
//             <button onClick={() => setTypeOpen(!typeOpen)}
//               className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${
//                 activeType !== "all"
//                   ? "bg-slate-900 text-white border-slate-900"
//                   : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
//               }`}>
//               <FiFilter size={13} />
//               <span className="hidden sm:inline">{activeTypeLabel}</span>
//               <motion.div animate={{ rotate: typeOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
//                 <FiChevronDown size={13} />
//               </motion.div>
//             </button>
//             <AnimatePresence>
//               {typeOpen && (
//                 <motion.div initial={{ opacity:0,y:6,scale:0.97 }} animate={{ opacity:1,y:0,scale:1 }} exit={{ opacity:0,y:4,scale:0.97 }}
//                   transition={{ duration:0.15 }}
//                   className="absolute top-full mt-2 right-0 bg-white rounded-2xl border border-slate-100 shadow-xl p-1.5 min-w-[150px] z-50">
//                   {TYPES.map(({ value, label }) => (
//                     <button key={value} onClick={() => { setActiveType(value); setTypeOpen(false); }}
//                       className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
//                         activeType === value ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
//                       }`}>
//                       <span>{label}</span>
//                       <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
//                         activeType === value ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
//                       }`}>{value === "all" ? services.length : services.filter(s => s.type === value).length}</span>
//                     </button>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Result count + clear */}
//           <div className="flex items-center gap-2 ml-auto flex-shrink-0">
//             <motion.span key={filteredCount} initial={{ opacity:0,scale:0.8 }} animate={{ opacity:1,scale:1 }}
//               className="text-sm font-bold hidden sm:block"
//               style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//               {filteredCount} result{filteredCount !== 1 ? "s" : ""}
//             </motion.span>
//             {hasActiveFilters && (
//               <motion.button initial={{ opacity:0,scale:0.9 }} animate={{ opacity:1,scale:1 }}
//                 onClick={() => { setActiveTag("all"); setActiveType("all"); setSearch(""); }}
//                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all">
//                 <FiX size={11} /> Clear
//               </motion.button>
//             )}
//           </div>
//         </div>

//         {/* Row 2: Category pill tabs — horizontal scroll */}
//         <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-none">
//           {TAGS.map(({ value, label, color }) => {
//             const active = activeTag === value;
//             return (
//               <motion.button key={value} onClick={() => setActiveTag(value)}
//                 whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
//                 className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0 transition-all duration-200 border ${
//                   active ? "text-white border-transparent shadow-lg" : "text-slate-600 bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
//                 }`}
//                 style={active ? {
//                   background: value === "all"
//                     ? "linear-gradient(135deg,#0ea5e9,#db2777)"
//                     : `linear-gradient(135deg,${color}ee,${color}99)`,
//                   boxShadow: `0 4px 14px -2px ${color ?? "#0ea5e9"}55`
//                 } : {}}>
//                 {label}
//               </motion.button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // BANNER
// // ─────────────────────────────────────────────────────────────────────────────
// function Banner() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true });
//   const floatIcons = [
//     { Icon: GiTooth,      style:{ top:"18%",left:"4%" },    size:26, delay:0 },
//     { Icon: GiHeartBeats, style:{ top:"22%",right:"7%" },   size:30, delay:0.5 },
//     { Icon: GiBrain,      style:{ bottom:"22%",left:"7%" }, size:24, delay:0.9 },
//     { Icon: TbBone,       style:{ bottom:"28%",right:"5%"}, size:22, delay:1.3 },
//     { Icon: MdFace,       style:{ top:"58%",left:"2.5%" },  size:20, delay:0.7 },
//     { Icon: TbEar,        style:{ top:"12%",right:"19%" },  size:19, delay:1.1 },
//   ];
//   return (
//     <section ref={ref} className="relative overflow-hidden py-20 sm:py-28"
//       style={{ background:"linear-gradient(135deg,#f0f9ff 0%,#ffffff 45%,#fdf2f8 100%)" }}>
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-sky-200/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration:"9s" }} />
//         <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-pink-200/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration:"13s" }} />
//         <div className="absolute inset-0 opacity-[0.18]"
//           style={{ backgroundImage:`linear-gradient(rgba(14,165,233,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(219,39,119,.05) 1px,transparent 1px)`, backgroundSize:"48px 48px" }} />
//       </div>
//       {floatIcons.map(({ Icon, style, size, delay }, i) => (
//         <motion.div key={i}
//           className="absolute hidden lg:flex items-center justify-center w-14 h-14 rounded-2xl bg-white/70 border border-slate-100 shadow-md"
//           style={style}
//           initial={{ opacity:0,y:20 }}
//           animate={inView ? { opacity:[0,0.65,0.65],y:[20,0,-6,0] } : {}}
//           transition={{ delay, duration:3.5, repeat:Infinity, repeatType:"reverse", ease:"easeInOut" }}>
//           <Icon size={size} style={{ color:"#0ea5e9",opacity:0.7 }} />
//         </motion.div>
//       ))}
//       <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
//         <motion.div initial={{ opacity:0,scale:0.85 }} animate={inView ? { opacity:1,scale:1 } : {}} transition={{ duration:0.6 }}
//           className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-sky-200/70 text-sky-600 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm backdrop-blur-sm">
//           <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse" /> Premium Healthcare Services
//         </motion.div>
//         <motion.h1 initial={{ opacity:0,y:30 }} animate={inView ? { opacity:1,y:0 } : {}}
//           transition={{ duration:1, ease:[0.16,1,0.3,1], delay:0.1 }}
//           className="text-4xl sm:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight font-serif mb-5">
//           World-Class{" "}
//           <span style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>
//             Medical Services
//           </span>
//           <br />Under One Roof
//         </motion.h1>
//         <motion.p initial={{ opacity:0,y:20 }} animate={inView ? { opacity:1,y:0 } : {}} transition={{ duration:0.9,delay:0.25 }}
//           className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
//           10 specialties · 50+ procedures · Board-certified specialists delivering exceptional care with compassion and technology.
//         </motion.p>
//         <motion.div initial={{ opacity:0,y:20 }} animate={inView ? { opacity:1,y:0 } : {}} transition={{ duration:0.8,delay:0.4 }}
//           className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10">
//           {[{num:"10",label:"Specialties"},{num:"50+",label:"Procedures"},{num:"30+",label:"Doctors"},{num:"10K+",label:"Patients Treated"}].map((s,i) => (
//             <motion.div key={s.label} initial={{ opacity:0,y:20 }} animate={inView ? { opacity:1,y:0 } : {}} transition={{ delay:0.4+i*0.08 }} className="text-center">
//               <p className="text-3xl font-extrabold" style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{s.num}</p>
//               <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">{s.label}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//         <motion.div initial={{ opacity:0,y:20 }} animate={inView ? { opacity:1,y:0 } : {}} transition={{ duration:0.8,delay:0.55 }}
//           className="flex flex-wrap justify-center gap-4">
//           <a href="#booking" className="px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-xl hover:opacity-90 transition-opacity flex items-center gap-2"
//             style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)" }}>
//             <FiCalendar size={15} /> Book Appointment
//           </a>
//           <a href="tel:+923001234567" className="px-8 py-3.5 rounded-xl font-bold text-sm text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex items-center gap-2">
//             <FiPhone size={15} /> Call Us Now
//           </a>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // MAIN PAGE
// // ─────────────────────────────────────────────────────────────────────────────
// export default function ServicesPage({ onNavigate }) {
//   const [activeTag,  setActiveTag]  = useState("all");
//   const [activeType, setActiveType] = useState("all");
//   const [search,     setSearch]     = useState("");
//   const [selected,   setSelected]   = useState(null);

//   const filtered = services.filter(s => {
//     const matchTag   = activeTag  === "all" || s.tag  === activeTag;
//     const matchType  = activeType === "all" || s.type === activeType;
//     const q = search.toLowerCase();
//     const matchSearch = !q
//       || s.category.toLowerCase().includes(q)
//       || s.shortDesc.toLowerCase().includes(q)
//       || s.treatments.some(t => t.toLowerCase().includes(q))
//       || s.symptoms.some(sym => sym.toLowerCase().includes(q));
//     return matchTag && matchType && matchSearch;
//   });

//   return (
//     <div className="min-h-screen bg-slate-50 font-body">
//       {selected && <ServiceModal service={selected} onClose={() => setSelected(null)} />}

//       <Banner />

//       <TopFilterBar
//         activeTag={activeTag}   setActiveTag={setActiveTag}
//         activeType={activeType} setActiveType={setActiveType}
//         search={search}         setSearch={setSearch}
//         filteredCount={filtered.length}
//       />

//       {/* Cards Grid */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
//         <div className="flex items-center justify-between mb-7">
//           <div>
//             <h2 className="text-xl font-extrabold text-slate-900">
//               {activeTag === "all" ? "All Services" : TAGS.find(t => t.value === activeTag)?.label}
//             </h2>
//             <p className="text-sm text-slate-400 mt-0.5">
//               {filtered.length} result{filtered.length !== 1 ? "s" : ""} · click any card for full details
//             </p>
//           </div>
//         </div>

//         <AnimatePresence mode="popLayout">
//           {filtered.length > 0 ? (
//             <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//               {filtered.map((svc, i) => (
//                 <ServiceCard key={svc.id} service={svc} onOpen={setSelected} index={i} />
//               ))}
//             </motion.div>
//           ) : (
//             <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}
//               className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
//               <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
//                 <FiSearch size={26} className="text-slate-300" />
//               </div>
//               <h3 className="text-xl font-bold text-slate-600 mb-2">No services found</h3>
//               <p className="text-slate-400 text-sm mb-5">Try adjusting your search or filters.</p>
//               <button onClick={() => { setActiveTag("all"); setActiveType("all"); setSearch(""); }}
//                 className="px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow"
//                 style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)" }}>
//                 Reset All Filters
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Bottom CTA */}
//       <section className="relative overflow-hidden py-20 mt-4"
//         style={{ background:"linear-gradient(135deg,#0ea5e9 0%,#7c3aed 50%,#db2777 100%)" }}>
const services = [
  {
    id: "physiotherapy",
    category: "Physiotherapy",
    icon: FiActivity,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    gradient: "from-sky-600 to-cyan-400",
    solidColor: "#0ea5e9",
    lightBg: "from-sky-50 to-cyan-50",
    border: "border-sky-200",
    accent: "text-sky-600",
    badgeBg: "bg-sky-100",
    badgeText: "text-sky-700",
    tag: "physiotherapy",
    type: "therapy",
    popular: true,
    tagline: "Restoring Movement, Improving Quality of Life",
    shortDesc: "Comprehensive physical rehabilitation to recover mobility, strength, and function after injury.",
    overview: "Physiotherapy is the core clinical facility at Vital Physio Hub, specializing in dynamic movement restoration. Our certified manual therapists design custom physical rehabilitation programs to target skeletal stiffness, neurological path retraining, and post-surgical functional delays.",
    symptoms: ["Post-surgical stiffness", "Chronic joint dysfunction", "Arthritis limitations", "Muscle weakness", "Gait & balance instability"],
    benefits: ["Custom recovery timeline", "Manual therapy adjustments", "Skilled guidance & home planning", "Safe non-pharmacological pain relief"],
    treatments: ["Joint Mobilization", "Therapeutic Exercise", "Postural Correction", "Gait Retraining", "Manual Stretch Therapy"],
    procedure: "Clinical evaluation → Biomechanical mapping → Custom rehab plan → Supervised session → Independent home regime",
    duration: "45 – 60 min",
    recovery: "2 – 12 weeks",
    fee: "From PKR 2,500",
    faqs: [
      { q: "What should I expect in my first physical therapy session?", a: "An in-depth biomechanical assessment of your joint range, posture, and motor control, followed by a personalized rehabilitation plan." },
      { q: "How many sessions will I need?", a: "This depends on your condition, but most patients see noticeable functional improvement within 4-6 sessions." }
    ],
  },
  {
    id: "chiropractic",
    category: "Chiropractic Adjustments",
    icon: TbBone,
    image: "https://images.unsplash.com/photo-1597764690523-15bea4c581c9?auto=format&fit=crop&w=800&q=80",
    gradient: "from-violet-500 to-purple-400",
    solidColor: "#8b5cf6",
    lightBg: "from-violet-50 to-purple-50",
    border: "border-violet-200",
    accent: "text-violet-600",
    badgeBg: "bg-violet-100",
    badgeText: "text-violet-700",
    tag: "chiropractic",
    type: "therapy",
    popular: true,
    tagline: "Precision Spinal Alignment & Nerve Relief",
    shortDesc: "Spinal adjustments and manual manipulation to relieve pressure on the nervous system and restore alignment.",
    overview: "Chiropractic Adjustments focus on the diagnosis, treatment, and prevention of neuromuscular disorders, with a primary emphasis on manual manipulation of the spine. Dr. Haseeb Ur Rehman utilizes advanced Italian osteopathy and chiropractic techniques to treat joint dysfunction and alleviate radiating nerve pain.",
    symptoms: ["Sciatica & radiating leg pain", "Lumbar instability & back pain", "Cervical stiffness & neck pain", "Postural headaches", "Joint subluxation"],
    benefits: ["Instant spinal pressure release", "Enhanced joint range of motion", "Painless mechanical adjustments", "Long-term spine health and posture"],
    treatments: ["Spinal Manipulation", "Joint Decompression", "Manual Adjustments", "Posture Correction Therapy", "Flexion-Distraction Technique"],
    procedure: "Spine alignment check → Joint palpation → Decompression therapy → Manual adjustments",
    duration: "30 – 45 min",
    recovery: "1 – 6 weeks",
    fee: "From PKR 3,000",
    faqs: [
      { q: "Are chiropractic adjustments safe?", a: "Yes, when performed by a classified chiropractor (like Dr. Haseeb who is trained in advanced Italian manual techniques), adjustments are highly safe and effective." },
      { q: "Do chiropractic adjustments hurt?", a: "No, adjustments are generally painless. Many patients experience immediate relief from tension and pressure." }
    ],
  },
  {
    id: "cupping",
    category: "Cupping Therapy",
    icon: GiHeartBeats,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    gradient: "from-teal-500 to-emerald-400",
    solidColor: "#0d9488",
    lightBg: "from-teal-50 to-emerald-50",
    border: "border-teal-200",
    accent: "text-teal-600",
    badgeBg: "bg-teal-100",
    badgeText: "text-teal-700",
    tag: "cupping",
    type: "therapy",
    popular: false,
    tagline: "Deep Tissue Detoxification & Muscle Relaxation",
    shortDesc: "Dry and massage cupping to improve localized blood flow and relieve chronic myofascial trigger points.",
    overview: "Cupping therapy is an ancient form of alternative medicine in which a therapist puts special cups on your skin for a few minutes to create suction. We use dry and massage cupping to stimulate blood circulation, enhance lymphatic drainage, and release deep myofascial trigger points.",
    symptoms: ["Deep muscle spasms", "Persistent shoulder & back knots", "Poor localized circulation", "Chronic muscular fatigue"],
    benefits: ["Deep tissue myofascial release", "Rapid muscle recovery", "Reduced muscle inflammation", "Relaxation of the nervous system"],
    treatments: ["Dry Cupping", "Massage Cupping", "Myofascial Trigger Point Release", "Detox Circulation Therapy"],
    procedure: "Trigger point identification → Skin preparation → Cup suction application → Myofascial massage",
    duration: "30 – 40 min",
    recovery: "1 – 3 days (marks fade quickly)",
    fee: "From PKR 2,000",
    faqs: [
      { q: "What are the round marks left after cupping?", a: "These are superficial discolorations caused by blood drawn to the skin surface. They are painless and fade in 3-7 days." },
      { q: "Who can benefit from cupping?", a: "Athletes, office workers with stiff shoulders, and anyone suffering from chronic muscular tension." }
    ],
  },
  {
    id: "hijama",
    category: "Hijama Therapy",
    icon: GiHeartBeats,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    gradient: "from-indigo-500 to-purple-400",
    solidColor: "#4f46e5",
    lightBg: "from-indigo-50 to-purple-50",
    border: "border-indigo-200",
    accent: "text-indigo-600",
    badgeBg: "bg-indigo-100",
    badgeText: "text-indigo-700",
    tag: "hijama",
    type: "therapy",
    popular: true,
    tagline: "Traditional Wet Cupping for Blood Purification",
    shortDesc: "Clinical wet cupping (Hijama) for systemic detoxification and immune system revitalization.",
    overview: "Hijama Therapy, or wet cupping, is a clinical procedure that draws out toxic blood and metabolic waste from the body through superficial micro-scratches on the skin. Dr. Ghulam Jellani is a certified Hijama expert, combining traditional healing with clinical sterile standards.",
    symptoms: ["Chronic fatigue syndrome", "Inflammatory disorders", "Persistent body aches", "High blood pressure", "Migraines"],
    benefits: ["Blood detoxification", "Immune system boost", "Chronic pain mitigation", "Stress & tension relief"],
    treatments: ["Clinical Wet Cupping", "Hijama Detox Therapy", "Sterile Skin Care", "Immunological Revitalization"],
    procedure: "Initial dry suction → Superficial micro-scratching → Targeted wet extraction → Sterilization & dressing",
    duration: "45 – 60 min",
    recovery: "3 – 5 days (micro-scratches heal fully)",
    fee: "From PKR 2,500",
    faqs: [
      { q: "Is Hijama performed under sterile conditions?", a: "Yes, we use 100% disposable, single-use sterile cups, surgical blades, and strict clinical protocols to ensure zero infection risk." },
      { q: "How often should I get Hijama?", a: "For general wellness and detox, every 3-6 months. For chronic pain management, a tailored monthly protocol may be recommended." }
    ],
  },
  {
    id: "electrotherapy",
    category: "Electrotherapy",
    icon: FiZap,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    gradient: "from-red-500 to-rose-400",
    solidColor: "#dc2626",
    lightBg: "from-red-50 to-rose-50",
    border: "border-red-200",
    accent: "text-red-600",
    badgeBg: "bg-red-100",
    badgeText: "text-red-700",
    tag: "electrotherapy",
    type: "therapy",
    popular: false,
    tagline: "Advanced Electronic Modalities for Pain & Healing",
    shortDesc: "Non-invasive electrical stimulation to block pain pathways and stimulate muscle recovery.",
    overview: "Electrotherapy is a gentle, non-invasive clinical facility utilizing modern electrical modalities like TENS (Transcutaneous Electrical Nerve Stimulation), EMS (Electrical Muscle Stimulation), and therapeutic ultrasound. These modalities block pain signals to the brain and stimulate deep cellular tissue repair.",
    symptoms: ["Acute inflammatory pain", "Muscle atrophy and wasting", "Severe muscle spasms", "Post-surgical swelling"],
    benefits: ["Non-invasive pain block", "Accelerated tissue repair", "Improved local blood flow", "Restoration of muscle tone"],
    treatments: ["TENS Therapy", "Electrical Muscle Stimulation (EMS)", "Therapeutic Ultrasound", "Interferential Current (IFC)"],
    procedure: "Symptom check → Modality selection → Electrode pad placement → Controlled electrical dosage → Healing review",
    duration: "20 – 30 min",
    recovery: "Immediate pain relief",
    fee: "From PKR 1,500",
    faqs: [
      { q: "Does electrotherapy shock you?", a: "No. You will feel a pleasant, tingling, or pulsing sensation, but it is not painful and is completely controlled by the therapist." }
    ],
  },
  {
    id: "kinesio",
    category: "Kinesio Taping",
    icon: FiActivity,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    gradient: "from-pink-500 to-rose-400",
    solidColor: "#ec4899",
    lightBg: "from-pink-50 to-rose-50",
    border: "border-pink-200",
    accent: "text-pink-600",
    badgeBg: "bg-pink-100",
    badgeText: "text-pink-700",
    tag: "kinesio",
    type: "therapy",
    popular: false,
    tagline: "Elastic Therapeutic Taping for Joint Support",
    shortDesc: "Elastic taping to support joints, muscles, and facilitate lymphatic flow during activity.",
    overview: "Kinesio Taping involves applying a specialized elastic therapeutic tape to joints and muscles to reduce pain, facilitate lymphatic drainage, and provide structural support without restricting range of motion. It is an excellent sports therapy modality used by Dr. Ghulam Jellani and Dr. Haseeb.",
    symptoms: ["Ligament sprains & muscle strains", "Joint instability", "Sports-induced swelling", "Muscle tracking issues"],
    benefits: ["Structural joint support", "Unrestricted natural movement", "Reduced muscle fatigue & bruising", "Improved lymphatic drainage"],
    treatments: ["Sports Taping", "Lymphatic Taping", "Joint Stability Taping", "Muscle Tracking Taping"],
    procedure: "Muscle assessment → Skin preparation → Customized tape stretching → Functional activation check",
    duration: "15 – 25 min",
    recovery: "Tape remains active for 3-5 days",
    fee: "From PKR 1,200",
    faqs: [
      { q: "Can I shower with the Kinesio tape on?", a: "Yes, the tape is highly water-resistant and breathable, allowing you to shower normally." }
    ],
  },
  {
    id: "fitness",
    category: "Fitness Training",
    icon: FiActivity,
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    gradient: "from-amber-500 to-orange-400",
    solidColor: "#d97706",
    lightBg: "from-amber-50 to-orange-50",
    border: "border-amber-200",
    accent: "text-amber-600",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-700",
    tag: "fitness",
    type: "therapy",
    popular: false,
    tagline: "Medical Fitness & Physical Conditioning",
    shortDesc: "Supervised exercise planning to build core strength, endurance, and target biomechanical alignment.",
    overview: "Fitness Training at Vital Physio Hub bridges the gap between rehabilitation and active lifestyle. Designed by Dr. Haseeb Ur Rehman (certified fitness trainer and sports coach), we offer medically supervised physical conditioning programs tailored to your specific biomechanical needs and goals.",
    symptoms: ["General physical deconditioning", "Core muscle weakness", "Poor physical endurance", "Post-rehab strength maintenance need"],
    benefits: ["Medically supervised by clinical experts", "Fully custom progressive programming", "Core and posture-focused targets", "Safe transition from injury to active sport"],
    treatments: ["Medical Strength Training", "Cardiovascular Conditioning", "Core Stabilization Programs", "Post-Rehab Maintenance Training"],
    procedure: "Physical baseline assessment → Goal mapping → Customized exercise prescription → Supervised training cycles",
    duration: "45 – 60 min",
    recovery: "Ongoing wellness",
    fee: "From PKR 3,000",
    faqs: [
      { q: "How is medical fitness training different from a regular gym?", a: "Our training is designed and supervised directly by physiotherapists and certified coaches, ensuring that every movement is biomechanically safe for your joints." }
    ],
  },
  {
    id: "needling",
    category: "Dry Needling",
    icon: TbStethoscope,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80",
    gradient: "from-emerald-500 to-teal-400",
    solidColor: "#10b981",
    lightBg: "from-emerald-50 to-teal-50",
    border: "border-emerald-200",
    accent: "text-emerald-600",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700",
    tag: "needling",
    type: "therapy",
    popular: true,
    tagline: "Intramuscular Stimulation & Pain Deactivation",
    shortDesc: "Thin acupuncture-style needles targeted at myofascial trigger points to deactivate deep muscle pain.",
    overview: "Dry Needling involves inserting thin, sterile monofilament needles directly into myofascial trigger points (muscle knots). This creates a local twitch response that disrupts the pain cycle, releases muscular tension, and increases localized micro-circulation. Dr. Ghulam Jellani is a certified practitioner who safely performs this treatment.",
    symptoms: ["Chronic tension headaches", "Deep muscle knots & myofascial pain", "Radiating muscle tightness", "Temporomandibular joint (TMJ) stiffness"],
    benefits: ["Immediate deep muscle release", "Highly precise trigger point targeting", "Rapid restoration of range of motion", "Painless insertion process"],
    treatments: ["Trigger Point Dry Needling", "Intramuscular Stimulation", "Myofascial Release Needling", "Neuromuscular Pain Deactivation"],
    procedure: "Muscle palpation to identify trigger point → Sterile skin preparation → Needle insertion & stimulation → Muscle relaxation check",
    duration: "25 – 40 min",
    recovery: "1 – 2 days (mild local soreness is normal)",
    fee: "From PKR 2,500",
    faqs: [
      { q: "Is dry needling the same as acupuncture?", a: "No. While they use similar needles, acupuncture is based on traditional Chinese medicine energy channels, whereas dry needling is based on modern Western neuroanatomy and muscular trigger points." },
      { q: "Does dry needling hurt?", a: "You may feel a brief 'cramp' or twitch sensation when the trigger point is deactivated, which can be slightly intense but lasts only a second. Most patients find it highly tolerable." }
    ],
  },
];

const TAGS = [
  { value: "all",            label: "All Services",            color: null },
  { value: "physiotherapy",  label: "Physiotherapy",           color: "#0ea5e9" },
  { value: "chiropractic",   label: "Chiropractic Adjustments",color: "#8b5cf6" },
  { value: "cupping",        label: "Cupping Therapy",         color: "#0d9488" },
  { value: "hijama",         label: "Hijama Therapy",          color: "#4f46e5" },
  { value: "electrotherapy", label: "Electrotherapy",          color: "#dc2626" },
  { value: "kinesio",        label: "Kinesio Taping",          color: "#ec4899" },
  { value: "fitness",        label: "Fitness Training",        color: "#d97706" },
  { value: "needling",       label: "Dry Needling",            color: "#10b981" },
];

const TYPES = [
  { value: "all",       label: "All Types" },
  { value: "therapy",   label: "Clinical Facility" },
];

// ─────────────────────────────────────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────────────────────────────────────
function ServiceModal({ service, onClose }) {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const Icon = service.icon;
  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ background: "rgba(2,8,23,0.82)", backdropFilter: "blur(8px)" }}>
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.93 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          onClick={e => e.stopPropagation()}
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">

          {/* Hero image */}
          <div className="relative h-52 sm:h-64 rounded-t-3xl overflow-hidden">
            <img src={service.image} alt={service.category} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(2,8,23,0.75) 0%,rgba(2,8,23,0.25) 55%,transparent 100%)" }} />
            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-30 mix-blend-multiply`} />
            <button onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all z-10">
              <FiX size={14} />
            </button>
            <div className="absolute top-4 left-4">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md border border-white/30 text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />{service.type}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 flex items-end gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 shadow-xl border-2 border-white/25`}>
                <Icon size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow-lg">{service.category}</h2>
                <p className="text-white/70 text-sm font-semibold">{service.tagline}</p>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="px-6 sm:px-8 pt-5 pb-2">
            <p className="text-slate-500 text-sm leading-relaxed">{service.overview}</p>
          </div>

          {/* Info strip */}
          <div className="px-6 sm:px-8 py-3">
            <div className={`grid grid-cols-3 gap-3 p-4 rounded-2xl bg-gradient-to-br ${service.lightBg} border ${service.border}`}>
              {[{ icon: FiClock, label: "Duration", value: service.duration },
                { icon: FiActivity, label: "Recovery", value: service.recovery },
                { icon: FiDollarSign, label: "Fee", value: service.fee }].map(item => (
                <div key={item.label} className="text-center">
                  <item.icon className={`mx-auto mb-1 ${service.accent}`} size={14} />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                  <p className={`text-xs font-bold mt-0.5 ${service.accent}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 sm:px-8 space-y-5 pb-4">
            {/* Symptoms + Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1.5 ${service.accent}`}>
                  <FiAlertCircle size={11} /> Common Symptoms
                </h3>
                <ul className="space-y-1.5">
                  {service.symptoms.map((s, i) => (
                    <motion.li key={i} initial={{ opacity:0,x:-8 }} animate={{ opacity:1,x:0 }} transition={{ delay:i*0.05 }}
                      className="flex items-start gap-2 text-sm text-slate-600">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-gradient-to-br ${service.gradient}`} />{s}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1.5 ${service.accent}`}>
                  <FiCheckCircle size={11} /> Why Choose Us
                </h3>
                <ul className="space-y-1.5">
                  {service.benefits.map((b, i) => (
                    <motion.li key={i} initial={{ opacity:0,x:8 }} animate={{ opacity:1,x:0 }} transition={{ delay:i*0.05 }}
                      className="flex items-start gap-2 text-sm text-slate-600">
                      <FiCheckCircle className={`mt-0.5 flex-shrink-0 ${service.accent}`} size={12} />{b}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Treatments */}
            <div>
              <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1.5 ${service.accent}`}>
                <FiShield size={11} /> Treatments & Procedures
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {service.treatments.map((t, i) => (
                  <motion.span key={i} initial={{ opacity:0,scale:0.85 }} animate={{ opacity:1,scale:1 }} transition={{ delay:i*0.04 }}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold ${service.badgeBg} ${service.badgeText} border ${service.border}`}>
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Procedure */}
            <div>
              <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1.5 ${service.accent}`}>
                <FiZap size={11} /> Treatment Procedure
              </h3>
              <div className="flex flex-wrap items-center gap-1.5">
                {service.procedure.split(" → ").map((step, i, arr) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-white border ${service.border} ${service.accent} shadow-sm`}>{step}</span>
                    {i < arr.length - 1 && <FiChevronRight className="text-slate-300" size={11} />}
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-2.5 ${service.accent}`}>FAQ</h3>
              <div className="space-y-2">
                {service.faqs.map((faq, i) => (
                  <div key={i} className={`rounded-2xl border ${service.border} overflow-hidden`}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 text-left bg-gradient-to-r ${service.lightBg}`}>
                      <span className="text-sm font-bold text-slate-700">{faq.q}</span>
                      <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <FiChevronDown size={13} className={service.accent} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div initial={{ height:0,opacity:0 }} animate={{ height:"auto",opacity:1 }} exit={{ height:0,opacity:0 }} transition={{ duration:0.25 }}
                          className="px-4 pb-4 pt-1 text-sm text-slate-500 bg-white leading-relaxed">{faq.a}</motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky footer */}
          <div className={`sticky bottom-0 px-6 sm:px-8 py-4 bg-white/95 backdrop-blur-sm border-t ${service.border} flex flex-col sm:flex-row gap-3 rounded-b-3xl`}>
            <button onClick={() => { onClose(); navigate("/book-appointment"); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r ${service.gradient} text-white font-bold text-sm shadow-lg hover:opacity-90 transition-opacity`}>
              <FiCalendar size={14} /> Book Appointment
            </button>
            <a href="tel:+923008786187"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all">
              <FiPhone size={14} /> Call Us
            </a>
            <a href="https://wa.me/923008786187" target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-emerald-200 text-emerald-700 font-bold text-sm hover:bg-emerald-50 transition-all">
              <FiMessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CARD
// ─────────────────────────────────────────────────────────────────────────────
function ServiceCard({ service, onOpen, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = service.icon;
  const [hovered, setHovered] = useState(false);

  // alternating left/right slide + blur fade for a premium stagger feel
  const xDir = index % 2 === 0 ? -28 : 28;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 48, x: xDir, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 4) * 0.1,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onOpen(service)}
      className="group relative bg-white rounded-[26px] overflow-hidden cursor-pointer border border-slate-100"
      style={{
        boxShadow: hovered
          ? `0 22px 55px -10px ${service.solidColor}28, 0 8px 20px -4px rgba(0,0,0,0.09)`
          : "0 2px 12px -2px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.4s ease, transform 0.4s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}>
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.category}
          className="w-full h-full object-cover"
          initial={{ scale: 1.12 }}
          animate={inView ? { scale: hovered ? 1.08 : 1 } : { scale: 1.12 }}
          transition={{ duration: hovered ? 0.65 : 0.85, ease: [0.25, 1, 0.5, 1] }}
        />
        {/* Shimmer sweep on entrance */}
        {inView && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 0.75, ease: "easeOut", delay: (index % 4) * 0.1 + 0.3 }}
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
            }}
          />
        )}
        <motion.div className="absolute inset-0"
          animate={{ opacity: hovered ? 1 : 0.6 }} transition={{ duration: 0.35 }}
          style={{ background: "linear-gradient(to top,rgba(2,8,23,0.85) 0%,rgba(2,8,23,0.28) 55%,transparent 100%)" }} />
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-25 mix-blend-multiply`} />

        {/* Top badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-start justify-between">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/20 text-white bg-black/30">
            {service.type}
          </span>
          {service.popular && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/90 backdrop-blur-md text-[10px] font-bold text-amber-900">
              <FiStar size={9} fill="currentColor" /> Popular
            </span>
          )}
        </div>

        {/* Title inside image */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 flex items-center gap-3">
          <motion.div
            className={`w-11 h-11 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 shadow-lg border border-white/25`}
            animate={{ scale: hovered ? 1.12 : 1, rotate: hovered ? 5 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}>
            <Icon size={22} className="text-white" />
          </motion.div>
          <div>
            <h3 className="text-white font-extrabold text-base leading-tight drop-shadow-md">{service.category}</h3>
            <p className="text-white/65 text-[11px] font-semibold">{service.tagline}</p>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4">{service.shortDesc}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {service.treatments.slice(0, 3).map((t, i) => (
            <span key={i} className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${service.badgeBg} ${service.badgeText}`}>{t}</span>
          ))}
          {service.treatments.length > 3 && (
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-100 text-slate-400">
              +{service.treatments.length - 3} more
            </span>
          )}
        </div>
        <div className="h-px bg-slate-100 mb-3" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <FiClock size={11} />
            <span>{service.duration.split("–")[0].trim()}</span>
            <span className="text-slate-200 mx-0.5">·</span>
            <span className={`font-bold ${service.accent}`}>{service.fee}</span>
          </div>
          <motion.div className={`flex items-center gap-1 text-xs font-bold ${service.accent}`}
            animate={{ x: hovered ? 4 : 0 }} transition={{ type: "spring", stiffness: 400 }}>
            View Details <FiArrowRight size={12} />
          </motion.div>
        </div>
      </div>

      {/* Bottom color line */}
      <motion.div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.gradient}`}
        initial={{ scaleX: 0 }} animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }} style={{ transformOrigin: "left" }} />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOP FILTER BAR — sticky below navbar
// ─────────────────────────────────────────────────────────────────────────────
function TopFilterBar({ activeTag, setActiveTag, activeType, setActiveType, search, setSearch, filteredCount }) {
  const [typeOpen, setTypeOpen] = useState(false);

  const activeTypeLabel = TYPES.find(t => t.value === activeType)?.label ?? "All Types";
  const hasActiveFilters = activeTag !== "all" || activeType !== "all" || search.trim() !== "";

  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Row 1: Search + Type dropdown + Result count */}
        <div className="flex items-center gap-3 py-3 border-b border-slate-100">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search services, treatments…"
              className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-slate-50 border border-slate-150 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 transition-all" />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500">
                <FiX size={13} />
              </button>
            )}
          </div>

          {/* Type dropdown */}
          <div className="relative flex-shrink-0">
            <button onClick={() => setTypeOpen(!typeOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                activeType !== "all"
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }`}>
              <FiFilter size={13} />
              <span className="hidden sm:inline">{activeTypeLabel}</span>
              <motion.div animate={{ rotate: typeOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <FiChevronDown size={13} />
              </motion.div>
            </button>
            <AnimatePresence>
              {typeOpen && (
                <motion.div initial={{ opacity:0,y:6,scale:0.97 }} animate={{ opacity:1,y:0,scale:1 }} exit={{ opacity:0,y:4,scale:0.97 }}
                  transition={{ duration:0.15 }}
                  className="absolute top-full mt-2 right-0 bg-white rounded-2xl border border-slate-100 shadow-xl p-1.5 min-w-[150px] z-50">
                  {TYPES.map(({ value, label }) => (
                    <button key={value} onClick={() => { setActiveType(value); setTypeOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        activeType === value ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                      }`}>
                      <span>{label}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        activeType === value ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
                      }`}>{value === "all" ? services.length : services.filter(s => s.type === value).length}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Result count + clear */}
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            <motion.span key={filteredCount} initial={{ opacity:0,scale:0.8 }} animate={{ opacity:1,scale:1 }}
              className="text-sm font-bold hidden sm:block"
              style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              {filteredCount} result{filteredCount !== 1 ? "s" : ""}
            </motion.span>
            {hasActiveFilters && (
              <motion.button initial={{ opacity:0,scale:0.9 }} animate={{ opacity:1,scale:1 }}
                onClick={() => { setActiveTag("all"); setActiveType("all"); setSearch(""); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all">
                <FiX size={11} /> Clear
              </motion.button>
            )}
          </div>
        </div>

        {/* Row 2: Category pill tabs — horizontal scroll */}
        <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-none">
          {TAGS.map(({ value, label, color }) => {
            const active = activeTag === value;
            return (
              <motion.button key={value} onClick={() => setActiveTag(value)}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0 transition-all duration-200 border ${
                  active ? "text-white border-transparent shadow-lg" : "text-slate-600 bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
                style={active ? {
                  background: value === "all"
                    ? "linear-gradient(135deg,#0ea5e9,#db2777)"
                    : `linear-gradient(135deg,${color}ee,${color}99)`,
                  boxShadow: `0 4px 14px -2px ${color ?? "#0ea5e9"}55`
                } : {}}>
                {label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BANNER
// ─────────────────────────────────────────────────────────────────────────────
function Banner() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const floatIcons = [
    { Icon: FiActivity,   style:{ top:"18%",left:"4%" },    size:26, delay:0 },
    { Icon: GiHeartBeats, style:{ top:"22%",right:"7%" },   size:30, delay:0.5 },
    { Icon: GiBrain,      style:{ bottom:"22%",left:"7%" }, size:24, delay:0.9 },
    { Icon: TbBone,       style:{ bottom:"28%",right:"5%"}, size:22, delay:1.3 },
    { Icon: MdFace,       style:{ top:"58%",left:"2.5%" },  size:20, delay:0.7 },
    { Icon: FiHeart,      style:{ top:"12%",right:"19%" },  size:19, delay:1.1 },
  ];
  return (
    <section ref={ref} className="relative overflow-hidden pt-32 pb-16"
      style={{ background:"linear-gradient(135deg,#f0f9ff 0%,#ffffff 45%,#fdf2f8 100%)" }}>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-sky-200/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration:"9s" }} />
        <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-pink-200/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration:"13s" }} />
        <div className="absolute inset-0 opacity-[0.18]"
          style={{ backgroundImage:`linear-gradient(rgba(14,165,233,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(219,39,119,.05) 1px,transparent 1px)`, backgroundSize:"48px 48px" }} />
      </div>
      {floatIcons.map(({ Icon, style, size, delay }, i) => (
        <motion.div key={i}
          className="absolute hidden lg:flex items-center justify-center w-14 h-14 rounded-2xl bg-white/70 border border-slate-100 shadow-md"
          style={style}
          initial={{ opacity:0,y:20 }}
          animate={inView ? { opacity:[0,0.65,0.65],y:[20,0,-6,0] } : {}}
          transition={{ delay, duration:3.5, repeat:Infinity, repeatType:"reverse", ease:"easeInOut" }}>
          <Icon size={size} style={{ color:"#0ea5e9",opacity:0.7 }} />
        </motion.div>
      ))}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <motion.div initial={{ opacity:0,scale:0.85 }} animate={inView ? { opacity:1,scale:1 } : {}} transition={{ duration:0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-sky-200/70 text-sky-600 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm backdrop-blur-sm">
          <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse" /> Premium Healthcare Services
        </motion.div>
        <motion.h1 initial={{ opacity:0,y:30 }} animate={inView ? { opacity:1,y:0 } : {}}
          transition={{ duration:1, ease:[0.16,1,0.3,1], delay:0.1 }}
          className="text-4xl sm:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight font-serif mb-5">
          World-Class{" "}
          <span style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>
            Medical Services
          </span>
          <br />Under One Roof
        </motion.h1>
        <motion.p initial={{ opacity:0,y:20 }} animate={inView ? { opacity:1,y:0 } : {}} transition={{ duration:0.9,delay:0.25 }}
          className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
          8 clinic facilities · 20+ procedures · Board-certified therapists delivering exceptional care with compassion and technology.
        </motion.p>
        <motion.div initial={{ opacity:0,y:20 }} animate={inView ? { opacity:1,y:0 } : {}} transition={{ duration:0.8,delay:0.4 }}
          className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10">
          {[{num:"8",label:"Facilities"},{num:"20+",label:"Procedures"},{num:"3",label:"Therapists"},{num:"20K+",label:"Patients Treated"}].map((s,i) => (
            <motion.div key={s.label} initial={{ opacity:0,y:20 }} animate={inView ? { opacity:1,y:0 } : {}} transition={{ delay:0.4+i*0.08 }} className="text-center">
              <p className="text-3xl font-extrabold" style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{s.num}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity:0,y:20 }} animate={inView ? { opacity:1,y:0 } : {}} transition={{ duration:0.8,delay:0.55 }}
          className="flex flex-wrap justify-center gap-4">
          <button onClick={() => navigate("/book-appointment")} className="px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-xl hover:opacity-90 transition-opacity flex items-center gap-2"
            style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)" }}>
            <FiCalendar size={15} /> Book Appointment
          </button>
          <a href="tel:+923008786187" className="px-8 py-3.5 rounded-xl font-bold text-sm text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex items-center gap-2">
            <FiPhone size={15} /> Call Us Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const navigate = useNavigate();
  const [activeTag,  setActiveTag]  = useState("all");
  const [activeType, setActiveType] = useState("all");
  const [search,     setSearch]     = useState("");
  const [selected,   setSelected]   = useState(null);

  const filtered = services.filter(s => {
    const matchTag   = activeTag  === "all" || s.tag  === activeTag;
    const matchType  = activeType === "all" || s.type === activeType;
    const q = search.toLowerCase();
    const matchSearch = !q
      || s.category.toLowerCase().includes(q)
      || s.shortDesc.toLowerCase().includes(q)
      || s.treatments.some(t => t.toLowerCase().includes(q))
      || s.symptoms.some(sym => sym.toLowerCase().includes(q));
    return matchTag && matchType && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      <Navbar />
      {selected && <ServiceModal service={selected} onClose={() => setSelected(null)} />}

      <Banner />

      <TopFilterBar
        activeTag={activeTag}   setActiveTag={setActiveTag}
        activeType={activeType} setActiveType={setActiveType}
        search={search}         setSearch={setSearch}
        filteredCount={filtered.length}
      />

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              {activeTag === "all" ? "All Services" : TAGS.find(t => t.value === activeTag)?.label}
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} · click any card for full details
            </p>
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((svc, i) => (
                <ServiceCard key={svc.id} service={svc} onOpen={setSelected} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}
              className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <FiSearch size={26} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-600 mb-2">No services found</h3>
              <p className="text-slate-400 text-sm mb-5">Try adjusting your search or filters.</p>
              <button onClick={() => { setActiveTag("all"); setActiveType("all"); setSearch(""); }}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow"
                style={{ background:"linear-gradient(135deg,#0ea5e9,#db2777)" }}>
                Reset All Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden py-20 mt-4"
        style={{ background:"linear-gradient(135deg,#0ea5e9 0%,#7c3aed 50%,#db2777 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 font-serif">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto">
            Our team will guide you to the right specialist. Book a free consultation or chat with us on WhatsApp.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate("/book-appointment")} className="px-8 py-3.5 rounded-xl font-bold text-sky-600 bg-white shadow-xl hover:bg-white/90 transition-all flex items-center gap-2 text-sm">
              <FiCalendar size={14} /> Book Free Consultation
            </button>
            <a href="https://wa.me/923008786187" target="_blank" rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl font-bold text-white border-2 border-white/40 hover:bg-white/10 transition-all flex items-center gap-2 text-sm">
              <FiMessageCircle size={14} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}