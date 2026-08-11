import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { FiShield, FiLock, FiInfo, FiChevronRight, FiGrid } from "react-icons/fi";
import { motion } from "framer-motion";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-slate-50 font-body select-none">
      <SEOHead 
        title="Cookie Policy | Physiohub Physical Therapy Pakistan"
        description="Understand how Physiohub uses cookies and tracking technology on our physical therapy platform. Control your data preferences in Lahore & Islamabad."
        keywords="physiohub cookie policy, physical therapy website cookies Pakistan, clinic data privacy"
        canonicalUrl="https://physiohub.com/cookie-policy"
      />
      <Navbar />

      {/* --- HERO BANNER --- */}
      <section 
        className="relative overflow-hidden pt-36 pb-20"
        style={{ background: "linear-gradient(135deg,#f0f9ff 0%,#ffffff 45%,#fdf2f8 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-sky-600 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <FiShield className="text-sky-500" />
              Patient Protection Act
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-serif mb-6 leading-tight text-slate-900">
              Cookie & <span style={{ background: "linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tracking Policy</span>
            </h1>
            <p className="text-slate-500 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              We value your clinical digital experience. Learn how we use cookies, browser storage, and analytics to retain your secure portal sessions and preferences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 text-left">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sm:p-12 space-y-10">
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FiLock className="text-sky-500" /> 1. What Are Cookies?
            </h2>
            <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
              Cookies are small text records stored in your browser when you visit websites. They help systems recognize secure sessions, save layouts, and maintain your diagnostic session parameters without requiring repeated logins.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FiGrid className="text-sky-500" /> 2. Categorization of Cookies We Use
            </h2>
            <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
              We classify cookies under the following groups:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="font-extrabold text-slate-900 text-sm block mb-1">Essential Wards & Session Tokens</span>
                <p className="text-slate-500 text-xs leading-relaxed">Required for patient portal authentication, online video consultations, and secure medical file uploads. Disabling these breaks core medical portal services.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="font-extrabold text-slate-900 text-sm block mb-1">Analytical Clinic Performance</span>
                <p className="text-slate-500 text-xs leading-relaxed">Helps us monitor patient checkout funnel performance (e.g. how fast booking flows load). We collect anonymized diagnostic telemetry strictly under HIPAA guidance.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="font-extrabold text-slate-900 text-sm block mb-1">Preference & Settings Retention</span>
                <p className="text-slate-500 text-xs leading-relaxed">Retains details like your selected clinic branch (DHA or Gulberg), symptom checker history, and user accessibility options.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="font-extrabold text-slate-900 text-sm block mb-1">Telehealth Security Logs</span>
                <p className="text-slate-500 text-xs leading-relaxed">Used to block fraudulent login attempts, secure telemedicine video channels, and protect patient telemetry records from malicious hijackings.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FiInfo className="text-sky-500" /> 3. Managing Cookie Settings
            </h2>
            <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
              You retain full rights to block, restrict, or erase cookies from your browser settings at any time. Refer to your browser's Help menu for detailed step-by-step documentation. Please note that blocking essential cookies will restrict access to parts of the patient dashboard, online consultations, and prescription reports.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FiChevronRight className="text-sky-500" /> 4. Third-Party Integrations
            </h2>
            <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
              We leverage highly verified, secure healthcare widgets such as Google Maps (for branch locations), Zoom API (for telehealth rooms), and secure local bank gateways. These services set cookies in your browser when accessed. We hold no control over their policies; we encourage reviewing their standalone privacy statements.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
