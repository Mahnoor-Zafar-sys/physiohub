import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrendingUp, FiLayers, FiFileText, FiAward, FiSearch, FiBookOpen, FiChevronDown, FiUserCheck } from "react-icons/fi";

const researchAreas = [
  {
    id: "trials",
    label: "Active Clinical Trials",
    icon: FiTrendingUp,
    color: "from-sky-500 to-blue-500",
    shadow: "shadow-blue-500/10",
    textCol: "text-blue-600",
    border: "border-blue-100",
    bg: "bg-blue-50/40",
    items: [
      {
        title: "Reversing Coronary Artery Blockage via Diet & Targeted Statins",
        investigator: "Dr. Kamran Malik, Department of Cardiology",
        status: "Phase II Clinical Trial",
        patients: "250 Registered Patients",
        duration: "18 Months (Ends Dec 2026)",
        description: "Evaluating the combined efficacy of low-density lipoprotein (LDL) lowering drugs alongside structured ketogenic and cardiovascular rehabilitation regimes. Patient tracking uses ultra-precise cardiac CT angiography scans every 6 months to measure calcium scores and arterial plaque thickness changes.",
        criteria: "Patients aged 40-75 with documented coronary artery plaque (>40% stenosis) and no history of myocardial infarction."
      },
      {
        title: "Precision Efficacy of AI Tele-Dermatology Triage Networks",
        investigator: "Dr. Sarah Ahmed, Department of Dermatology",
        status: "Phase I Diagnostic Study",
        patients: "1,200 Image Submissions Evaluated",
        duration: "12 Months (Ends Aug 2026)",
        description: "Assessing diagnostic alignment between board-certified dermatologists and our customized AI vision model. Patients submit high-resolution dermatological pictures via our online consultation portal. The study measures classification speed, triaging accuracy, and potential edge-case false positives.",
        criteria: "Adult patients presenting with skin anomalies, acne scarring, or pigmentary concerns seeking online consultation."
      }
    ]
  },
  {
    id: "papers",
    label: "Published Research Papers",
    icon: FiFileText,
    color: "from-purple-500 to-indigo-500",
    shadow: "shadow-indigo-500/10",
    textCol: "text-indigo-600",
    border: "border-indigo-100",
    bg: "bg-indigo-50/40",
    items: [
      {
        title: "Laparoscopic Surgical Interventions: A 5-Year Retrospective Analysis of Patient Recovery Wards",
        investigator: "Dr. Asma Bilal, General Surgery Desk",
        journal: "Lancet Medical & Healthcare Review, Feb 2025",
        status: "Peer Reviewed Publication",
        citations: "84 Citations",
        description: "This landmark publication details surgical outcomes across 3,500 minor invasive laparoscopic procedures. It outlines a novel post-operative telemetry system that tracks early ambulation in patients, proving that early physical motion protocols reduce hospital stays by an average of 1.4 days.",
        doi: "10.1016/j.lancet.2025.04.103"
      },
      {
        title: "Minimally Invasive Joint Replacement Surgeries: Biocompatible Implant Retentions",
        investigator: "Dr. Zain Raza, Department of Orthopedics",
        journal: "Global Journal of Orthopedic Surgery, Oct 2025",
        status: "Peer Reviewed Publication",
        citations: "47 Citations",
        description: "Analyzing the 3-year performance metrics of titanium-mesh biocompatible hip and knee joints. The paper showcases our clinic's low rejection rate (<0.3%) achieved via highly-specialized localized pre-op anti-inflammatory bone preparations.",
        doi: "10.2204/gjos.2025.11.089"
      }
    ]
  },
  {
    id: "ethics",
    label: "Ethics Committee & Board",
    icon: FiAward,
    color: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/10",
    textCol: "text-emerald-600",
    border: "border-emerald-100",
    bg: "bg-emerald-50/40",
    items: [
      {
        title: "Vital Physio Hub Institutional Review Board (IRB)",
        investigator: "Chaired by Prof. Dr. Haris Khan",
        status: "Regulatory Accreditation Authority",
        description: "Our Institutional Review Board ensures that all medical experiments, drug trials, clinical audits, and genetic database archiving programs adhere strict compliance protocols with the Declaration of Helsinki. No trials can commence without unanimous ethical clearances.",
        registrations: "Reg No. IRB-PK-98172, accredited by National Bioethics Committee of Pakistan."
      }
    ]
  }
];

export default function Research() {
  const [activeTab, setActiveTab] = useState("trials");
  const [openItemIndex, setOpenItemIndex] = useState(null);

  const activeCategory = researchAreas.find((tab) => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 font-body select-none">
      <Navbar />

      {/* --- HERO BANNER --- */}
      <section 
        className="relative overflow-hidden pt-36 pb-20"
        style={{ background: "linear-gradient(135deg,#f0f9ff 0%,#ffffff 45%,#fdf2f8 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(14,165,233,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(219,39,119,.05) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-serif mb-6 leading-tight text-slate-900">
              Clinical Research & <span style={{ background: "linear-gradient(135deg,#6366f1,#d946ef)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Breakthroughs</span>
            </h1>
            <p className="text-slate-500 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              We participate actively in medical advancements. Our investigators conduct trials, publish medical research, and work to shape the future of medical diagnostics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- TAB SELECTOR --- */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-6">
        <div className="flex bg-white rounded-2xl border border-slate-100 shadow-md p-1.5 gap-2 flex-wrap sm:flex-nowrap">
          {researchAreas.map((area) => {
            const TabIcon = area.icon;
            const active = activeTab === area.id;
            return (
              <button
                key={area.id}
                onClick={() => {
                  setActiveTab(area.id);
                  setOpenItemIndex(null);
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 border border-transparent ${
                  active 
                    ? `text-white bg-slate-900 shadow-md` 
                    : "text-slate-500 hover:text-slate-950 hover:bg-slate-50"
                }`}
              >
                <TabIcon size={16} />
                {area.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* --- CONTENT AREA --- */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="space-y-6 text-left">
          {activeCategory.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Header Toggler */}
              <button
                onClick={() => setOpenItemIndex(openItemIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 sm:p-8 text-left group"
              >
                <div className="space-y-2 flex-1 pr-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${activeCategory.bg} ${activeCategory.textCol} border ${activeCategory.border}`}>
                    {item.status}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-950 group-hover:text-sky-600 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs font-semibold">
                    Principal: {item.investigator}
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: openItemIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-slate-700 flex-shrink-0"
                >
                  <FiChevronDown size={18} />
                </motion.div>
              </button>

              {/* Collapsible Panel */}
              <AnimatePresence>
                {openItemIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="border-t border-slate-50 bg-slate-50/30"
                  >
                    <div className="p-6 sm:p-8 space-y-6 text-sm text-slate-600">
                      <div className="space-y-2">
                        <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Project Scope & Methodology</h4>
                        <p className="leading-relaxed">{item.description}</p>
                      </div>

                      {/* Dynamic Specific Details */}
                      {item.criteria && (
                        <div className="p-4 rounded-2xl bg-blue-50/20 border border-blue-100/40 space-y-1">
                          <h4 className="font-extrabold text-blue-700 text-xs uppercase tracking-wider flex items-center gap-1.5">
                            <FiUserCheck /> Trial Candidate Eligibility Criteria
                          </h4>
                          <p className="text-slate-600 text-xs leading-relaxed">{item.criteria}</p>
                        </div>
                      )}

                      {item.doi && (
                        <div className="flex justify-between items-center bg-purple-50/20 border border-purple-100/40 p-4 rounded-2xl text-xs">
                          <span className="font-semibold text-purple-700">Digital Object Identifier (DOI)</span>
                          <code className="bg-white px-2.5 py-1 rounded border text-slate-700 font-mono font-bold shadow-sm">{item.doi}</code>
                        </div>
                      )}

                      {/* Bottom Quick Facts */}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
                        {item.patients && (
                          <div>
                            <span className="text-slate-400 font-medium block">Enrollment Statistics</span>
                            <span className="font-bold text-slate-800">{item.patients}</span>
                          </div>
                        )}
                        {item.duration && (
                          <div>
                            <span className="text-slate-400 font-medium block">Timeframe</span>
                            <span className="font-bold text-slate-800">{item.duration}</span>
                          </div>
                        )}
                        {item.journal && (
                          <div>
                            <span className="text-slate-400 font-medium block">Journal Source</span>
                            <span className="font-bold text-slate-800">{item.journal}</span>
                          </div>
                        )}
                        {item.citations && (
                          <div>
                            <span className="text-slate-400 font-medium block">Impact Factor</span>
                            <span className="font-bold text-slate-800">{item.citations}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
