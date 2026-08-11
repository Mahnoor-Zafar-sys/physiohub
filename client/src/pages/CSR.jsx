import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { motion } from "framer-motion";
import { FiHeart, FiActivity, FiGlobe, FiUsers, FiAward } from "react-icons/fi";
import { FaAmbulance } from "react-icons/fa";

const csrPrograms = [
  {
    title: "Free Healthcare & Diagnostic Camps",
    metric: "25,000+ Patients Served",
    summary: "Providing free general practitioner visits, blood glucose screenings, ophthalmology assessments, and vital medicines to rural villages where healthcare infrastructure is scarce.",
    description: "Every month, our diagnostic fleets travel to remote regions to establish fully staffed outpatient camps. Certified specialists provide free screenings and diagnostic advice, and hand out free prescription packages. High-risk patients are referred to our main city branches for fully subsidized inpatient treatments.",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
    color: "from-teal-500 to-emerald-400"
  },
  {
    title: "The Subsidized Surgery Fund",
    metric: "1,200+ Operations Sponsored",
    summary: "Dedicated fund supporting complex operations (including orthopedic hip replacements, pediatric dental cleanings, and emergency cardiac angioplasty) for low-income families.",
    description: "Our board of directors pledges 10% of all clinic revenues directly to our Patient Welfare Fund. Families presenting government welfare cards or validated income statements can apply. Our medical boards review clinical urgency to allocate fully funded operating slots, ensuring finances never stand between a patient and critical care.",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80",
    color: "from-blue-500 to-sky-400"
  },
  {
    title: "Rural Tele-Health Support Booths",
    metric: "12 Active Digital Hubs",
    summary: "Bridging the urban-rural divide using automated digital diagnostics and high-definition virtual consultation portals linked directly to our Blue Area, Islamabad consultants.",
    description: "We have established solar-powered consult booths in small towns. Staffed by trained emergency medical technicians (EMTs), the booths are equipped with digital stethoscopes, blood monitors, and telemetry cameras. Rural residents book instant, free video consults with our primary specialists without having to travel.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    color: "from-indigo-500 to-purple-400"
  }
];

const stats = [
  { value: "50+", label: "Rural Camps Conducted", icon: FiGlobe },
  { value: "1,200+", label: "Life-Saving Surgeries Funded", icon: FiHeart },
  { value: "25K+", label: "Patients Treated Globally", icon: FiUsers },
  { value: "100%", label: "Subsidized Pharmacy Dispatch", icon: FiActivity }
];

export default function CSR() {
  return (
    <div className="min-h-screen bg-slate-50 font-body select-none">
      <SEOHead 
        title="Community Health & CSR Programs | Physiohub Lahore & Islamabad"
        description="Learn about Physiohub's community service programs: free health camps, subsidized physical therapy, rural tele-physio booths & patient welfare funds in Lahore & Islamabad."
        keywords="physiohub CSR programs Pakistan, free health camp Lahore, community physical therapy Islamabad, patient welfare fund physio"
        canonicalUrl="https://physiohub.com/csr"
      />
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
              Corporate Social <span style={{ background: "linear-gradient(135deg,#0d9488,#0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Responsibility</span>
            </h1>
            <p className="text-slate-500 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              We believe clinical excellence must walk hand-in-hand with social equity. Learn how we are building community healthcare programs and funding medical aids.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- IMPACT STATS --- */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((st, idx) => {
            const Icon = st.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-md p-6 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <Icon size={18} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{st.value}</h3>
                <p className="text-slate-400 text-xs mt-1.5 font-bold uppercase tracking-wider">{st.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* --- CSR INITIATIVES DETAIL --- */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-16">
          {csrPrograms.map((prog, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-14 text-left ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Card */}
              <div className="w-full lg:w-[480px] h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-slate-100 relative group flex-shrink-0">
                <img 
                  src={prog.image} 
                  alt={prog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black text-white bg-gradient-to-br ${prog.color} shadow-md`}>
                    {prog.metric}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="flex-1 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif leading-tight">
                  {prog.title}
                </h2>
                <div className="h-1 w-20 rounded-full" style={{ background: "linear-gradient(90deg,#0d9488,#0ea5e9)" }} />
                
                <p className="text-slate-800 font-bold text-sm sm:text-base leading-relaxed">
                  {prog.summary}
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {prog.description}
                </p>

                <div className="pt-4 flex items-center gap-3 text-xs font-extrabold text-teal-600">
                  <FiHeart className="text-teal-500" /> Fully Supported Clinic Initiative
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CSR VOLUNTEER CTA --- */}
      <section className="py-20 bg-white border-y border-slate-100 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-600 text-xs font-extrabold uppercase tracking-widest">
            <FaAmbulance className="text-teal-500" />
            Lend A Hand
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Partner With Our Medical Camp Teams
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Are you a healthcare professional, medical student, or volunteer? Partner with our weekend outreach teams to bring diagnostics to remote districts.
          </p>
          <a
            href="mailto:volunteer@premiumclinic.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-teal-600 shadow-md transition-colors text-sm cursor-pointer"
          >
            Register as Volunteer
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
