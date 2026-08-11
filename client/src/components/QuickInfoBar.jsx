import { motion } from "framer-motion";
import { FiClock, FiPhone, FiMapPin, FiStar } from "react-icons/fi";

const infos = [
  {
    icon: FiClock,
    label: "Opening Hours",
    value: "Mon–Sat: 7AM – 10PM",
    iconBg: "rgba(37, 99, 235, 0.08)",
    iconColor: "#2563eb",
  },
  {
    icon: FiPhone,
    label: "Emergency 24/7",
    value: "+92 (51) 111-911-273",
    iconBg: "rgba(239, 68, 68, 0.08)",
    iconColor: "#ef4444",
    valueColor: "#dc2626",
  },
  {
    icon: FiMapPin,
    label: "Our Location",
    value: "2nd Floor Allegiance Tower, New Blue Area, Islamabad",
    iconBg: "rgba(16, 185, 129, 0.08)",
    iconColor: "#10b981",
  },
  {
    icon: FiStar,
    label: "Live Rating",
    value: "4.9 / 5 · 3,400+ Reviews",
    iconBg: "rgba(245, 158, 11, 0.1)",
    iconColor: "#f59e0b",
    live: true,
  },
];

// Smooth infinite scrolling animation variant (Right to Left)
const marqueeVariants = {
  animate: {
    x: [0, "-50%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 25, // Is value ko barhane se marquee mazeed slow ho jayegi
        ease: "linear",
      },
    },
  },
};

export default function QuickInfoBar() {
  // Infinite loop ko bina break ke chalane ke liye array ko duplicate kiya hai
  const duplicatedInfos = [...infos, ...infos];

  return (
    <>
      {/* Live status dot animation */}
      <style>{`
        @keyframes livePulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.4; }
        }
        .info-track:hover .marquee-content {
          animation-play-state: paused !important;
        }
      `}</style>

      <section
        className="my-5 md:my-10 px-4 md:px-6 mx-auto"
        style={{
          position: "relative",
          zIndex: 30,
          width: "100%",
          maxWidth: "1400px",
          boxSizing: "border-box"
        }}
      >
        {/* Floating Modern Floating Bar Container */}
        <div style={{
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(226, 232, 240, 0.9)",
          borderRadius: "20px", // Card style soft edges
          overflow: "hidden",
          padding: "16px 0",
          boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.01)",
        }}>
          
          {/* Main Moving Track Wrapper */}
          <div 
            className="info-track"
            style={{
              display: "flex",
              width: "max-content",
              alignItems: "center",
            }}
          >
            <motion.div
              className="marquee-content flex items-center gap-10 md:gap-24 pr-10 md:pr-24"
              variants={marqueeVariants}
              animate="animate"
              whileHover={{ animationPlayState: "paused" }}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {duplicatedInfos.map(({ icon: Icon, label, value, iconBg, iconColor, valueColor, live }, i) => (
                <div
                  key={`${label}-${i}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    cursor: "pointer",
                    flexShrink: 0,
                    padding: "6px 12px",
                    borderRadius: "12px",
                  }}
                >
                  {/* Icon bubble */}
                  <div style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    background: iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 2px 8px -1px rgba(0,0,0,0.02)",
                  }}>
                    <Icon style={{ color: iconColor, fontSize: "1.25rem" }} />
                  </div>

                  {/* Content Text Fields */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <p style={{
                      fontSize: "0.68rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#64748b",
                      fontWeight: 700,
                      margin: 0,
                    }}>
                      {label}
                    </p>
                    
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}>
                      <p style={{
                        fontSize: "0.92rem",
                        fontWeight: 600,
                        color: valueColor || "#0f172a",
                        margin: 0,
                        whiteSpace: "nowrap",
                      }}>
                        {value}
                      </p>

                      {live && (
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: "0.6rem",
                          fontWeight: 800,
                          color: "#10b981",
                          background: "rgba(16, 185, 129, 0.12)",
                          borderRadius: "100px",
                          padding: "2px 8px",
                          letterSpacing: "0.05em",
                          flexShrink: 0,
                        }}>
                          <span style={{
                            width: 6,
                            height: 6,
                            background: "#10b981",
                            borderRadius: "50%",
                            display: "inline-block",
                            animation: "livePulse 2s ease-in-out infinite",
                          }} />
                          LIVE
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>
    </>
  );
}







// import { motion } from "framer-motion";
// import { FiClock, FiPhone, FiMapPin, FiStar } from "react-icons/fi";

// const infos = [
//   {
//     icon: FiClock,
//     label: "Opening Hours",
//     value: "Mon–Sat: 7AM – 10PM",
//     iconBg: "rgba(26,135,232,0.10)",
//     iconColor: "#1a87e8",
//   },
//   {
//     icon: FiPhone,
//     label: "Emergency 24/7",
//     value: "+1 (800) 911-CARE",
//     iconBg: "rgba(242,93,93,0.10)",
//     iconColor: "#d43030",
//     valueColor: "#c0392b",
//   },
//   {
//     icon: FiMapPin,
//     label: "Our Location",
//     value: "420 Wellness Ave, New York",
//     iconBg: "rgba(52,199,130,0.10)",
//     iconColor: "#1a9e60",
//   },
//   {
//     icon: FiStar,
//     label: "Live Rating",
//     value: "4.9 / 5 · 3,400+ Reviews",
//     iconBg: "rgba(255,185,50,0.12)",
//     iconColor: "#c07c00",
//     live: true,
//   },
// ];

// export default function QuickInfoBar() {
//   return (
//     <>
//       {/* Inline keyframe for the live dot */}
//       <style>{`
//         @keyframes liveP {
//           0%,100% { transform:scale(1); opacity:1; }
//           50%      { transform:scale(1.55); opacity:0.5; }
//         }
//       `}</style>

//       <section
//         style={{
//           position: "relative",
//           zIndex: 30,
//           background: "rgba(255,255,255,0.92)",
//           backdropFilter: "blur(16px)",
//           WebkitBackdropFilter: "blur(16px)",
//           borderBottom: "1px solid rgba(160,200,255,0.28)",
//           borderTop: "1px solid rgba(160,200,255,0.18)",
//         }}
//       >
//         <div
//           style={{
//             maxWidth: 1280,
//             margin: "0 auto",
//             padding: "0 24px",
//             display: "grid",
//             gridTemplateColumns: "repeat(4, 1fr)",
//           }}
//         >
//           {infos.map(({ icon: Icon, label, value, iconBg, iconColor, valueColor, live }, i) => (
//             <motion.div
//               key={label}
//               initial={{ opacity: 0, y: 18 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.1, duration: 0.55 }}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 14,
//                 padding: "16px 22px",
//                 borderRight: i < 3 ? "1px solid rgba(160,200,255,0.22)" : "none",
//                 cursor: "default",
//                 transition: "background 0.2s",
//               }}
//               onMouseEnter={e => e.currentTarget.style.background = "rgba(236,246,255,0.85)"}
//               onMouseLeave={e => e.currentTarget.style.background = "transparent"}
//             >
//               {/* Icon bubble */}
//               <div style={{
//                 width: 42, height: 42, borderRadius: 12,
//                 background: iconBg,
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 flexShrink: 0,
//                 transition: "transform 0.2s",
//               }}>
//                 <Icon style={{ color: iconColor, fontSize: "1.1rem" }} />
//               </div>

//               {/* Text */}
//               <div style={{ minWidth: 0 }}>
//                 <p style={{
//                   fontSize: "0.62rem", letterSpacing: "0.1em",
//                   textTransform: "uppercase", color: "#7aa0c0",
//                   fontWeight: 600, margin: 0,
//                 }}>
//                   {label}
//                 </p>
//                 <div style={{
//                   display: "flex", alignItems: "center", gap: 6, marginTop: 2,
//                 }}>
//                   <p style={{
//                     fontSize: "0.8rem", fontWeight: 600,
//                     color: valueColor || "#0d2d52",
//                     margin: 0,
//                     overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
//                   }}>
//                     {value}
//                   </p>

//                   {live && (
//                     <span style={{
//                       display: "inline-flex", alignItems: "center", gap: 3,
//                       fontSize: "0.58rem", fontWeight: 700,
//                       color: "#16914e",
//                       background: "rgba(52,199,130,0.12)",
//                       borderRadius: 100, padding: "2px 7px",
//                       letterSpacing: "0.08em", flexShrink: 0,
//                     }}>
//                       <span style={{
//                         width: 5, height: 5,
//                         background: "#34c782",
//                         borderRadius: "50%",
//                         animation: "liveP 1.8s ease-in-out infinite",
//                         display: "inline-block",
//                       }} />
//                       LIVE
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }