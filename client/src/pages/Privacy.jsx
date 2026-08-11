import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { FiShield, FiLock, FiInfo, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-slate-50 font-body select-none">
      <SEOHead 
        title="Privacy Policy & HIPAA Data Protection | Physiohub Pakistan"
        description="Read Physiohub's privacy policy, medical data protection measures, patient confidentiality guarantees and HIPAA compliance protocols."
        keywords="physiohub privacy policy, medical data privacy Pakistan, HIPAA patient privacy Lahore Islamabad"
        canonicalUrl="https://physiohub.com/privacy"
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

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-serif mb-6 leading-tight text-slate-900">
              Privacy & <span style={{ background: "linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Data Policy</span>
            </h1>
            <p className="text-slate-500 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              We hold our patient data privacy to the highest global healthcare standards (including HIPAA compliance frameworks). Learn how we handle your medical records and digital consultation assets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 text-left">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sm:p-12 space-y-10">
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FiLock className="text-sky-500" /> 1. HIPAA & Healthcare Consent
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Your Electronic Medical Records (EMR) and personal consultation reports are encrypted on our medical databases. We collect health information strictly for booking appointments, matching with certified medical specialists, and dispatching ambulance paramedics.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FiInfo className="text-sky-500" /> 2. Information We Collect
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We gather basic patient identification information (such as name, email, telephone number, and age) and relevant health parameters (such as patient diagnostic logs, symptoms, prescription archives, and uploaded scan reports).
            </p>
            <ul className="list-disc pl-5 text-slate-600 text-sm space-y-2">
              <li>Profile data used to personalize clinical consultation channels.</li>
              <li>Encrypted file attachments (PDFs/Images) for specialist diagnostics review.</li>
              <li>Triage records used during emergency response.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FiShield className="text-sky-500" /> 3. Data Protection Practices
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our servers implement end-to-end Transport Layer Security (TLS/SSL), firewalls, and strict role-based access control (RBAC). Only the assigned consultant doctor or authorized medical records staff can decrypt and view your clinical data logs.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FiChevronRight className="text-sky-500" /> 4. Patient Legal Rights
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              You retain full legal authority to request access to, edit, or purge your clinical data archives from our databases at any time. Simply mail our support center or contact our clinic coordination desk.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
