// import { useState } from "react";
// import { motion } from "framer-motion";

// const servicesData = [
//   {
//     id: 1,
//     title: "Dental Care",
//     emoji: "🦷",
//     bgImage: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80",
//     accentColor: "#0369a1",
//     lightBg: "#f0f9ff",
//     borderColor: "#bae6fd",
//     tagColor: "#0284c7",
//     tagBg: "#e0f2fe",
//     overview: "Advanced dental treatments combining aesthetics and function, from routine checkups to complex restorative procedures.",
//     symptoms: ["Tooth pain & sensitivity", "Bleeding gums", "Crooked or missing teeth", "Jaw discomfort"],
//     benefits: ["Pain-free procedures", "Same-day consultations", "Digital X-ray diagnostics", "Smile design planning"],
//     procedure: "Initial diagnosis with digital imaging → Treatment planning → Painless single-visit procedures → Aftercare guidance.",
//     tags: ["Cosmetic Dentistry", "Orthodontics", "Implants", "Root Canal"],
//   },
//   {
//     id: 2,
//     title: "Skin Care",
//     emoji: "✨",
//     bgImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
//     accentColor: "#7c3aed",
//     lightBg: "#faf5ff",
//     borderColor: "#ddd6fe",
//     tagColor: "#7c3aed",
//     tagBg: "#ede9fe",
//     overview: "Medical-grade dermatology services using AI-driven skin analysis, laser technologies, and targeted anti-aging treatment protocols.",
//     symptoms: ["Acne & breakouts", "Pigmentation & dark spots", "Premature ageing", "Dry or oily skin conditions"],
//     benefits: ["AI-powered skin diagnostics", "Certified dermatologists", "Clinically proven protocols", "Visible results in weeks"],
//     procedure: "Skin analysis & consultation → Personalised treatment plan → Laser / medical-grade therapy sessions → Follow-up care.",
//     tags: ["Laser Therapy", "Anti-Aging", "Acne Treatment", "Pigmentation"],
//   },
//   {
//     id: 3,
//     title: "Hair Transplant",
//     emoji: "💆",
//     bgImage: "/hairtransplant.webp", 
//     accentColor: "#0d9488",
//     lightBg: "#f0fdfa",
//     borderColor: "#99f6e4",
//     tagColor: "#0d9488",
//     tagBg: "#ccfbf1",
//     overview: "Premium Follicular Unit Extraction (FUE) and advanced PRP therapy to restore natural hairlines with maximum density and lasting results.",
//     symptoms: ["Receding hairline", "Crown thinning", "Patchy hair loss", "Post-illness hair fall"],
//     benefits: ["Micro-graft precision", "Natural-looking results", "Minimal downtime", "High-density PRP therapy"],
//     procedure: "Donor area assessment → FUE follicle extraction → Micro-graft implantation → PRP therapy → Recovery monitoring.",
//     tags: ["FUE Technique", "PRP Therapy", "Hairline Restoration", "Density Design"],
//   },
//   {
//     id: 4,
//     title: "Orthopedic",
//     emoji: "🦴",
//     bgImage: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80",
//     accentColor: "#b45309",
//     lightBg: "#fffbeb",
//     borderColor: "#fde68a",
//     tagColor: "#b45309",
//     tagBg: "#fef3c7",
//     overview: "Comprehensive bone, joint, and muscle care from sports injuries to complex fractures, delivered by board-certified orthopedic specialists.",
//     symptoms: ["Joint pain & swelling", "Fractures", "Back & spine pain", "Sports injuries"],
//     benefits: ["Advanced imaging diagnostics", "Minimally invasive surgeries", "Physiotherapy integration", "Rapid recovery programs"],
//     procedure: "Diagnosis via MRI / X-ray → Non-surgical or surgical treatment plan → Procedure → Rehabilitation & physiotherapy.",
//     tags: ["Joint Replacement", "Spine Care", "Sports Medicine", "Fracture Management"],
//   },
//   {
//     id: 5,
//     title: "ENT",
//     emoji: "👂",
//     bgImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80",
//     accentColor: "#be123c",
//     lightBg: "#fff1f2",
//     borderColor: "#fecdd3",
//     tagColor: "#be123c",
//     tagBg: "#ffe4e6",
//     overview: "Specialised care for ear, nose, and throat conditions using cutting-edge endoscopic diagnostics and minimally invasive surgical interventions.",
//     symptoms: ["Hearing loss", "Chronic sinusitis", "Tonsil infections", "Nasal blockage"],
//     benefits: ["Endoscopic precision diagnostics", "Same-day procedures available", "Allergy management", "Voice & swallowing therapy"],
//     procedure: "Endoscopic examination → Diagnosis → Medical or surgical treatment → Post-procedure monitoring.",
//     tags: ["Sinusitis", "Hearing Care", "Tonsil Surgery", "Allergy Treatment"],
//   },
//   {
//     id: 6,
//     title: "Gynecology",
//     emoji: "🌸",
//     bgImage: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=800&q=80",
//     accentColor: "#9d174d",
//     lightBg: "#fdf2f8",
//     borderColor: "#f9a8d4",
//     tagColor: "#9d174d",
//     tagBg: "#fce7f3",
//     overview: "Compassionate women's healthcare covering routine gynaecological check-ups, maternal care, and advanced laparoscopic procedures.",
//     symptoms: ["Irregular periods", "Pelvic pain", "Pregnancy care", "Hormonal imbalance"],
//     benefits: ["Private & confidential consultations", "Female specialist doctors", "Advanced laparoscopic surgery", "Complete maternal health support"],
//     procedure: "Consultation & examination → Ultrasound / lab diagnostics → Treatment or surgical plan → Ongoing care support.",
//     tags: ["Maternal Care", "Laparoscopic Surgery", "PCOD Management", "Routine Screening"],
//   },
// ];

// const featured = servicesData.slice(0, 3);

// export default function Services() {
//   return (
//     <section id="services" className="py-24 relative overflow-hidden w-full select-none bg-white">
//       <style>{`
//         @keyframes floatBadge {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-4px); }
//         }
//         .card-3d { perspective: 1600px; }
//         .card-inner {
//           position: relative;
//           width: 100%;
//           height: 100%;
//           transform-style: preserve-3d;
//           transition: transform 0.8s cubic-bezier(0.25, 1, 0.35, 1);
//         }
//         .card-3d:hover .card-inner {
//           transform: rotateY(180deg);
//         }
//         .card-face {
//           position: absolute;
//           inset: 0;
//           border-radius: 20px;
//           backface-visibility: hidden;
//           -webkit-backface-visibility: hidden;
//           overflow: hidden;
//         }
//         .card-back { transform: rotateY(180deg); }
//         .img-zoom { transition: transform 6s ease; }
//         .card-3d:hover .img-zoom { transform: scale(1.05); }
//       `}</style>

//       {/* Subtle background pattern */}
//       <div className="absolute inset-0 pointer-events-none" style={{
//         backgroundImage: "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)",
//         backgroundSize: "32px 32px",
//         opacity: 0.4
//       }} />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

//         {/* Section Header */}
//        {/* Section Header */}
// <motion.div
//   initial={{ opacity: 0, y: 24 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   viewport={{ once: true }}
//   transition={{ duration: 0.55 }}
//   className="text-center mb-16"
// >
//   <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
//     Our Medical Services
//   </h2>
//   <p className="mt-4 text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
//     Specialised clinical departments staffed by certified consultants, equipped with modern diagnostic technology and guided by evidence-based treatment protocols.
//   </p>
// </motion.div>

//         {/* 3 Featured Flip Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-14">
//           {featured.map(({ id, title, emoji, bgImage, accentColor, lightBg, borderColor, tagColor, tagBg, overview, symptoms, benefits, procedure, tags }, i) => (
//             <motion.div
//               key={id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: i * 0.1 }}
//               className="card-3d cursor-pointer"
//               style={{ height: 420 }}
//             >
//               <div className="card-inner">

//                 {/* ── FRONT ── */}
//                 <div className="card-face" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.09)", border: "1px solid #e2e8f0" }}>
//                   <img
//                     src={bgImage}
//                     alt={`${title} treatment in progress`}
//                     className="img-zoom"
//                     style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
//                   />
//                   <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)" }} />

//                   <div style={{
//                     position: "absolute", top: 16, right: 16,
//                     background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)",
//                     border: "1px solid rgba(255,255,255,0.3)",
//                     borderRadius: 24, padding: "5px 12px",
//                     fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.06em",
//                     display: "flex", alignItems: "center", gap: 5
//                   }}>
//                     <span>✨</span> Hover to explore
//                   </div>

//                   <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 24px 20px" }}>
//                     <div style={{
//                       width: 44, height: 44, borderRadius: 12, marginBottom: 12,
//                       background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
//                       border: "1px solid rgba(255,255,255,0.25)",
//                       display: "flex", alignItems: "center", justifyContent: "center",
//                       fontSize: 22
//                     }}>
//                       {emoji}
//                     </div>
//                     <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.3px" }}>
//                       {title}
//                     </h3>
//                     <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, margin: 0, lineHeight: 1.5 }}>
//                       {overview.substring(0, 80)}...
//                     </p>
//                   </div>
//                 </div>

//                 {/* ── BACK ── */}
//                 <div
//                   className="card-face card-back"
//                   style={{
//                     background: lightBg,
//                     border: `1px solid ${borderColor}`,
//                     padding: "22px 22px 18px",
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 14,
//                     boxShadow: "0 4px 24px rgba(0,0,0,0.07)"
//                   }}
//                 >
//                   <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 12, borderBottom: `1px solid ${borderColor}` }}>
//                     <div style={{
//                       width: 40, height: 40, borderRadius: 10, background: `${accentColor}18`,
//                       display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20
//                     }}>
//                       {emoji}
//                     </div>
//                     <div>
//                       <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#0f172a" }}>{title}</h3>
//                       <p style={{ margin: 0, fontSize: 11, color: accentColor, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>Department Overview</p>
//                     </div>
//                   </div>

//                   <div>
//                     <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em" }}>We treat</p>
//                     <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
//                       {symptoms.map(s => (
//                         <span key={s} style={{
//                           fontSize: 11, padding: "3px 9px", borderRadius: 20,
//                           background: `${accentColor}12`, color: accentColor,
//                           border: `1px solid ${accentColor}30`, fontWeight: 600
//                         }}>{s}</span>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em" }}>Key benefits</p>
//                     <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
//                       {benefits.slice(0, 3).map(b => (
//                         <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 12.5, color: "#334155", lineHeight: 1.4 }}>
//                           <span style={{ color: accentColor, fontWeight: 900, marginTop: 1 }}>✓</span> {b}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   <div style={{ marginTop: "auto", paddingTop: 10, borderTop: `1px solid ${borderColor}`, display: "flex", flexWrap: "wrap", gap: 5 }}>
//                     {tags.map(tag => (
//                       <span key={tag} style={{
//                         fontSize: 10, fontWeight: 700, textTransform: "uppercase",
//                         letterSpacing: "0.06em", padding: "3px 9px", borderRadius: 5,
//                         background: tagBg, color: tagColor, border: `1px solid ${borderColor}`
//                       }} TYPE="text">{tag}</span>
//                     ))}
//                   </div>
//                 </div>

//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* ── Centered Button Panel ── */}
//         {/* ── Centered Button Panel ── */}
// <motion.div
//   initial={{ opacity: 0, y: 20 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   viewport={{ once: true }}
//   transition={{ duration: 0.5 }}
//   className="flex justify-center items-center py-4"
// >
//   <a
//     href="#services-page"
//     style={{
//       display: "inline-flex",
//       alignItems: "center",
//       gap: 8,
//       padding: "14px 36px",
//       borderRadius: 16, // Image ki tarah smooth rounded corners
//       whiteSpace: "nowrap",
//       background: "#0f172a", // Default mein wahi premium dark slate color
//       color: "#fff",
//       fontSize: 15,
//       fontWeight: 700,
//       letterSpacing: "-0.2px",
//       textDecoration: "none",
//       transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//       boxShadow: "0 4px 14px rgba(15,23,42,0.2)" // Default subtle dark shadow
//     }}
//     onMouseEnter={e => {
//       e.currentTarget.style.background = "#2165f4"; // Hover par aapki image wala exact blue!
//       e.currentTarget.style.transform = "translateY(-2px)"; // Smooth lift up
//       e.currentTarget.style.boxShadow = "0 8px 24px rgba(33, 101, 244, 0.35)"; // Blue dynamic shadow glow
//     }}
//     onMouseLeave={e => {
//       e.currentTarget.style.background = "#0f172a"; // Mouse hat-te hi wapas dark color
//       e.currentTarget.style.transform = "translateY(0px)";
//       e.currentTarget.style.boxShadow = "0 4px 14px rgba(15,23,42,0.2)";
//     }}
//   >
//     View All Services →
//   </a>
// </motion.div>

//       </div>
//     </section>
//   );
// }


import { useState } from "react";
import { motion } from "framer-motion";

const servicesData = [
  {
    id: 1,
    title: "Dental Care",
    emoji: "🦷",
    bgImage: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80",
    accentColor: "#0369a1",
    lightBg: "#f0f9ff",
    borderColor: "#bae6fd",
    tagColor: "#0284c7",
    tagBg: "#e0f2fe",
    overview: "Advanced dental treatments combining aesthetics and function, from routine checkups to complex restorative procedures.",
    symptoms: ["Tooth pain & sensitivity", "Bleeding gums", "Crooked or missing teeth", "Jaw discomfort"],
    benefits: ["Pain-free procedures", "Same-day consultations", "Digital X-ray diagnostics", "Smile design planning"],
    procedure: "Initial diagnosis with digital imaging → Treatment planning → Painless single-visit procedures → Aftercare guidance.",
    tags: ["Cosmetic Dentistry", "Orthodontics", "Implants", "Root Canal"],
  },
  {
    id: 2,
    title: "Skin Care",
    emoji: "✨",
    bgImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    accentColor: "#7c3aed",
    lightBg: "#faf5ff",
    borderColor: "#ddd6fe",
    tagColor: "#7c3aed",
    tagBg: "#ede9fe",
    overview: "Medical-grade dermatology services using AI-driven skin analysis, laser technologies, and targeted anti-aging treatment protocols.",
    symptoms: ["Acne & breakouts", "Pigmentation & dark spots", "Premature ageing", "Dry or oily skin conditions"],
    benefits: ["AI-powered skin diagnostics", "Certified dermatologists", "Clinically proven protocols", "Visible results in weeks"],
    procedure: "Skin analysis & consultation → Personalised treatment plan → Laser / medical-grade therapy sessions → Follow-up care.",
    tags: ["Laser Therapy", "Anti-Aging", "Acne Treatment", "Pigmentation"],
  },
  {
    id: 3,
    title: "Hair Transplant",
    emoji: "💆",
    bgImage: "/hairtransplant.webp", 
    accentColor: "#0d9488",
    lightBg: "#f0fdfa",
    borderColor: "#99f6e4",
    tagColor: "#0d9488",
    tagBg: "#ccfbf1",
    overview: "Premium Follicular Unit Extraction (FUE) and advanced PRP therapy to restore natural hairlines with maximum density and lasting results.",
    symptoms: ["Receding hairline", "Crown thinning", "Patchy hair loss", "Post-illness hair fall"],
    benefits: ["Micro-graft precision", "Natural-looking results", "Minimal downtime", "High-density PRP therapy"],
    procedure: "Donor area assessment → FUE follicle extraction → Micro-graft implantation → PRP therapy → Recovery monitoring.",
    tags: ["FUE Technique", "PRP Therapy", "Hairline Restoration", "Density Design"],
  },
  {
    id: 4,
    title: "Orthopedic",
    emoji: "🦴",
    bgImage: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80",
    accentColor: "#b45309",
    lightBg: "#fffbeb",
    borderColor: "#fde68a",
    tagColor: "#b45309",
    tagBg: "#fef3c7",
    overview: "Comprehensive bone, joint, and muscle care from sports injuries to complex fractures, delivered by board-certified orthopedic specialists.",
    symptoms: ["Joint pain & swelling", "Fractures", "Back & spine pain", "Sports injuries"],
    benefits: ["Advanced imaging diagnostics", "Minimally invasive surgeries", "Physiotherapy integration", "Rapid recovery programs"],
    procedure: "Diagnosis via MRI / X-ray → Non-surgical or surgical treatment plan → Procedure → Rehabilitation & physiotherapy.",
    tags: ["Joint Replacement", "Spine Care", "Sports Medicine", "Fracture Management"],
  },
  {
    id: 5,
    title: "ENT",
    emoji: "👂",
    bgImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80",
    accentColor: "#be123c",
    lightBg: "#fff1f2",
    borderColor: "#fecdd3",
    tagColor: "#be123c",
    tagBg: "#ffe4e6",
    overview: "Specialised care for ear, nose, and throat conditions using cutting-edge endoscopic diagnostics and minimally invasive surgical interventions.",
    symptoms: ["Hearing loss", "Chronic sinusitis", "Tonsil infections", "Nasal blockage"],
    benefits: ["Endoscopic precision diagnostics", "Same-day procedures available", "Allergy management", "Voice & swallowing therapy"],
    procedure: "Endoscopic examination → Diagnosis → Medical or surgical treatment → Post-procedure monitoring.",
    tags: ["Sinusitis", "Hearing Care", "Tonsil Surgery", "Allergy Treatment"],
  },
  {
    id: 6,
    title: "Gynecology",
    emoji: "🌸",
    bgImage: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=800&q=80",
    accentColor: "#9d174d",
    lightBg: "#fdf2f8",
    borderColor: "#f9a8d4",
    tagColor: "#9d174d",
    tagBg: "#fce7f3",
    overview: "Compassionate women's healthcare covering routine gynaecological check-ups, maternal care, and advanced laparoscopic procedures.",
    symptoms: ["Irregular periods", "Pelvic pain", "Pregnancy care", "Hormonal imbalance"],
    benefits: ["Private & confidential consultations", "Female specialist doctors", "Advanced laparoscopic surgery", "Complete maternal health support"],
    procedure: "Consultation & examination → Ultrasound / lab diagnostics → Treatment or surgical plan → Ongoing care support.",
    tags: ["Maternal Care", "Laparoscopic Surgery", "PCOD Management", "Routine Screening"],
  },
];

const featured = servicesData.slice(0, 3);

// Yahan humne onNavigate prop add kar diya hai controller integration ke liye
export default function Services({ onNavigate }) {
  return (
    <section id="services" className="py-24 relative overflow-hidden w-full select-none bg-white">
      <style>{`
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        .card-3d { perspective: 1600px; }
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.35, 1);
        }
        .card-3d:hover .card-inner {
          transform: rotateY(180deg);
        }
        .card-face {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          overflow: hidden;
        }
        .card-back { transform: rotateY(180deg); }
        .img-zoom { transition: transform 6s ease; }
        .card-3d:hover .img-zoom { transform: scale(1.05); }
      `}</style>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)",
        backgroundSize: "32px 32px",
        opacity: 0.4
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
            Our Medical Services
          </h2>
          <p className="mt-4 text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Specialised clinical departments staffed by certified consultants, equipped with modern diagnostic technology and guided by evidence-based treatment protocols.
          </p>
        </motion.div>

        {/* 3 Featured Flip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-14">
          {featured.map(({ id, title, emoji, bgImage, accentColor, lightBg, borderColor, tagColor, tagBg, overview, symptoms, benefits, procedure, tags }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-3d cursor-pointer"
              style={{ height: 420 }}
            >
              <div className="card-inner">

                {/* ── FRONT ── */}
                <div className="card-face" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.09)", border: "1px solid #e2e8f0" }}>
                  <img
                    src={bgImage}
                    alt={`${title} treatment in progress`}
                    className="img-zoom"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)" }} />

                  <div style={{
                    position: "absolute", top: 16, right: 16,
                    background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderRadius: 24, padding: "5px 12px",
                    fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.06em",
                    display: "flex", alignItems: "center", gap: 5
                  }}>
                    <span>✨</span> Hover to explore
                  </div>

                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 24px 20px" }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, marginBottom: 12,
                      background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 22
                    }}>
                      {emoji}
                    </div>
                    <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.3px" }}>
                      {title}
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, margin: 0, lineHeight: 1.5 }}>
                      {overview.substring(0, 80)}...
                    </p>
                  </div>
                </div>

                {/* ── BACK ── */}
                <div
                  className="card-face card-back"
                  style={{
                    background: lightBg,
                    border: `1px solid ${borderColor}`,
                    padding: "22px 22px 18px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.07)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 12, borderBottom: `1px solid ${borderColor}` }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, background: `${accentColor}18`,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20
                    }}>
                      {emoji}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#0f172a" }}>{title}</h3>
                      <p style={{ margin: 0, fontSize: 11, color: accentColor, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>Department Overview</p>
                    </div>
                  </div>

                  <div>
                    <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em" }}>We treat</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {symptoms.map(s => (
                        <span key={s} style={{
                          fontSize: 11, padding: "3px 9px", borderRadius: 20,
                          background: `${accentColor}12`, color: accentColor,
                          border: `1px solid ${accentColor}30`, fontWeight: 600
                        }}>{s}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em" }}>Key benefits</p>
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                      {benefits.slice(0, 3).map(b => (
                        <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 12.5, color: "#334155", lineHeight: 1.4 }}>
                          <span style={{ color: accentColor, fontWeight: 900, marginTop: 1 }}>✓</span> {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginTop: "auto", paddingTop: 10, borderTop: `1px solid ${borderColor}`, display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                        letterSpacing: "0.06em", padding: "3px 9px", borderRadius: 5,
                        background: tagBg, color: tagColor, border: `1px solid ${borderColor}`
                      }} type="text">{tag}</span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Centered Button Panel (Fully Linked to State Controller) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center py-4"
        >
          <button
            onClick={() => {
              if (typeof onNavigate === "function") {
                onNavigate("services-page"); // Aapke pages/app switcher ka key handle
              } else {
                window.location.hash = "services-page"; // Safe local fallback guard
              }
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 36px",
              borderRadius: 16, 
              whiteSpace: "nowrap",
              background: "#0f172a", 
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "-0.2px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 4px 14px rgba(15,23,42,0.2)" 
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#2165f4"; 
              e.currentTarget.style.transform = "translateY(-2px)"; 
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(33, 101, 244, 0.35)"; 
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#0f172a"; 
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(15,23,42,0.2)";
            }}
          >
            View All Services →
          </button>
        </motion.div>

      </div>
    </section>
  );
}