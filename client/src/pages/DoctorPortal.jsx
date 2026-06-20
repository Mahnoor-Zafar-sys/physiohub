import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiCalendar, FiClock, FiFileText, FiActivity, FiList, FiExternalLink, FiCheckCircle } from "react-icons/fi";
import { FaUserMd } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../services/api";

export default function DoctorPortal() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("queue");
  const [appointments, setAppointments] = useState([]);
  const [patientsList, setPatientsList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form states
  const [selectedPatientName, setSelectedPatientName] = useState("");
  const [emrForm, setEmrForm] = useState({ diagnosis: "", vitals: "", assessment: "" });
  const [rxForm, setRxForm] = useState({ medicine: "", dosage: "", duration: "", instructions: "" });

  const doctorName = localStorage.getItem("vph_user_name") || "Dr. Sarah Ahmed";

  const loadData = async () => {
    setLoading(true);
    try {
      const appts = await api.getAppointments();
      // Filter for this doctor
      const myAppts = appts.filter(a => a.doctor.toLowerCase() === doctorName.toLowerCase() || a.doctor_name?.toLowerCase() === doctorName.toLowerCase());
      setAppointments(myAppts);

      // Extract unique patient names for select boxes
      const uniquePatients = Array.from(new Set(myAppts.map(a => a.patient || a.patient_name)));
      setPatientsList(uniquePatients);
      if (uniquePatients.length > 0 && !selectedPatientName) {
        setSelectedPatientName(uniquePatients[0]);
      }
    } catch (err) {
      console.error("Failed to load doctor dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEMRSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatientName || !emrForm.diagnosis || !emrForm.assessment) {
      alert("Please select a patient and fill in diagnostic details.");
      return;
    }
    try {
      setLoading(true);
      const res = await api.createEMR({
        patientName: selectedPatientName,
        doctor: doctorName,
        diagnosis: emrForm.diagnosis,
        vitals: emrForm.vitals || "BP: 120/80, Temp: 98.6°F",
        assessment: emrForm.assessment
      });
      if (res) {
        alert("EMR diagnostic record successfully added!");
        setEmrForm({ diagnosis: "", vitals: "", assessment: "" });
        loadData();
      }
    } catch (err) {
      alert("Error saving EMR record.");
    } finally {
      setLoading(false);
    }
  };

  const handleRxSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatientName || !rxForm.medicine || !rxForm.dosage) {
      alert("Please select a patient and fill in prescription details.");
      return;
    }
    try {
      setLoading(true);
      const res = await api.createPrescription({
        patientName: selectedPatientName,
        doctor: doctorName,
        medicine: rxForm.medicine,
        dosage: rxForm.dosage,
        duration: rxForm.duration || "7 Days",
        instructions: rxForm.instructions || "After meals"
      });
      if (res) {
        // Auto append consult fee invoice
        await api.createInvoice({
          patientName: selectedPatientName,
          description: `Clinical Consultation Fee - ${doctorName}`,
          amount: "₨ 3,000",
          status: "Unpaid"
        });
        alert("Prescription authorized and consultation invoice generated!");
        setRxForm({ medicine: "", dosage: "", duration: "", instructions: "" });
        loadData();
      }
    } catch (err) {
      alert("Error saving prescription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans flex flex-col justify-between" style={{ background: "linear-gradient(135deg, #fce4ec 0%, #e0f2fe 60%, #fdf4ff 100%)" }}>
      <Navbar />

      <div className="flex-grow pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Sidebar */}
          <div className="lg:col-span-3 bg-white/70 backdrop-blur-md rounded-3xl border border-white/50 shadow-md p-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="pb-5 border-b border-slate-100 flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-extrabold shadow-inner">
                  <FaUserMd />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 leading-none">{doctorName}</h4>
                  <span className="text-[9px] font-black text-pink-500 uppercase tracking-widest block mt-1">Doctor Portal</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                {[
                  { id: "queue", label: "Today's Patient Queue", icon: FiList },
                  { id: "emr-writer", label: "EMR Diagnosis Entry", icon: FiActivity },
                  { id: "rx-writer", label: "Write Prescription", icon: FiFileText },
                  { id: "doctor-schedule", label: "Availability Settings", icon: FiClock }
                ].map(tab => (
                  <button 
                    key={tab.id} 
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${
                      activeTab === tab.id 
                        ? "bg-slate-900 text-white shadow" 
                        : "bg-transparent text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <tab.icon size={13} /> {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="w-full py-2.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500 rounded-xl text-xs font-bold border-none transition-colors mt-6 cursor-pointer"
            >
              Sign Out
            </button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 bg-white/80 backdrop-blur-md rounded-3xl border border-white/50 shadow-md p-6 sm:p-8 flex flex-col relative min-h-[500px]">
            {loading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center rounded-3xl">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-pink-500 rounded-full animate-spin" />
              </div>
            )}

            {/* QUEUE TAB */}
            {activeTab === "queue" && (
              <div className="space-y-6 text-left flex-grow">
                <div>
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <FiList className="text-pink-500" /> Today's Scheduled Queue
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Start video consultations with patients directly from the list.</p>
                </div>

                <div className="space-y-3">
                  {appointments.filter(appt => appt.status !== "Cancelled" && appt.payment_status === "Paid").length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 border border-dashed rounded-3xl text-slate-400 text-xs">
                      <FiCheckCircle size={24} className="mx-auto mb-2 text-emerald-500" />
                      No active/paid appointments in your queue today.
                    </div>
                  ) : (
                    appointments.filter(appt => appt.status !== "Cancelled" && appt.payment_status === "Paid").map(appt => (
                      <div key={appt.id} className="border border-slate-100 bg-white/40 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-sm text-slate-800">{appt.patient || appt.patient_name}</h4>
                            <span className="text-[9px] font-bold bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full">{appt.type}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">Slot: {appt.date} at {appt.time}</p>
                        </div>
                        <div className="flex items-center gap-3 self-end sm:self-auto">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                            appt.status === "Confirmed" ? "bg-emerald-50 text-emerald-700" :
                            appt.status === "In Room" ? "bg-pink-50 text-pink-700 animate-pulse" :
                            appt.status === "Completed" ? "bg-slate-100 text-slate-500" : "bg-sky-50 text-sky-700"
                          }`}>
                            {appt.status}
                          </span>
                          
                          {appt.type?.toLowerCase().includes("video") && appt.status !== "Completed" && (
                            <button 
                              onClick={() => navigate("/consultation-room", { state: { doctor: { name: doctorName, specialty: "Physical Therapy" }, patientName: appt.patient || appt.patient_name } })}
                              className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-bold flex items-center gap-1 border-none cursor-pointer shadow-md"
                            >
                              <FiExternalLink /> Start Call
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* EMR Diagnosis Entry */}
            {activeTab === "emr-writer" && (
              <div className="space-y-6 text-left flex-grow">
                <div>
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <FiActivity className="text-pink-500" /> Electronic Medical Record (EMR) Editor
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Publish diagnostic notes and physiological vitals directly to the patient folder.</p>
                </div>

                <form onSubmit={handleEMRSubmit} className="space-y-4 max-w-xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Select Patient</label>
                      <select 
                        value={selectedPatientName}
                        onChange={e => setSelectedPatientName(e.target.value)}
                        className="w-full border border-slate-200 bg-white rounded-xl p-3 text-xs outline-none focus:border-pink-400"
                      >
                        {patientsList.map(name => (
                          <option key={name} value={name}>{name}</option>
                        ))}
                        {patientsList.length === 0 && <option value="Jane Doe">Jane Doe</option>}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Clinical Vitals</label>
                      <input 
                        type="text" 
                        value={emrForm.vitals}
                        onChange={e => setEmrForm({...emrForm, vitals: e.target.value})}
                        placeholder="BP: 120/80, Temp: 98.6°F"
                        className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-pink-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Primary Diagnosis / Condition</label>
                    <input 
                      type="text" 
                      required
                      value={emrForm.diagnosis}
                      onChange={e => setEmrForm({...emrForm, diagnosis: e.target.value})}
                      placeholder="e.g. Lower Back Muscle Strain"
                      className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-pink-400"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Findings & Advice</label>
                    <textarea 
                      rows={4}
                      required
                      value={emrForm.assessment}
                      onChange={e => setEmrForm({...emrForm, assessment: e.target.value})}
                      placeholder="Describe the clinical examination, exercises suggested..."
                      className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-pink-400 resize-none"
                    />
                  </div>

                  <button type="submit" className="px-6 py-3 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer shadow">
                    Publish to Patient EMR
                  </button>
                </form>
              </div>
            )}

            {/* Write Prescription */}
            {activeTab === "rx-writer" && (
              <div className="space-y-6 text-left flex-grow">
                <div>
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <FiFileText className="text-pink-500" /> Write Digital Prescription (Rx)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Authorizing prescriptions adds them live to the patient portal feed.</p>
                </div>

                <form onSubmit={handleRxSubmit} className="space-y-4 max-w-xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Select Patient</label>
                      <select 
                        value={selectedPatientName}
                        onChange={e => setSelectedPatientName(e.target.value)}
                        className="w-full border border-slate-200 bg-white rounded-xl p-3 text-xs outline-none focus:border-pink-400"
                      >
                        {patientsList.map(name => (
                          <option key={name} value={name}>{name}</option>
                        ))}
                        {patientsList.length === 0 && <option value="Jane Doe">Jane Doe</option>}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Medicine Name & Strength</label>
                      <input 
                        type="text" 
                        required
                        value={rxForm.medicine}
                        onChange={e => setRxForm({...rxForm, medicine: e.target.value})}
                        placeholder="e.g. Painkiller 400mg"
                        className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-pink-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Dosage Frequency</label>
                      <input 
                        type="text" 
                        required
                        value={rxForm.dosage}
                        onChange={e => setRxForm({...rxForm, dosage: e.target.value})}
                        placeholder="e.g. Twice daily"
                        className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-pink-400"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Duration</label>
                      <input 
                        type="text" 
                        value={rxForm.duration}
                        onChange={e => setRxForm({...rxForm, duration: e.target.value})}
                        placeholder="e.g. 7 Days"
                        className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-pink-400"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Instruction</label>
                      <input 
                        type="text" 
                        value={rxForm.instructions}
                        onChange={e => setRxForm({...rxForm, instructions: e.target.value})}
                        placeholder="e.g. After meals"
                        className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-pink-400"
                      />
                    </div>
                  </div>

                  <button type="submit" className="px-6 py-3 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer shadow">
                    Authorize & Dispatch Prescription
                  </button>
                </form>
              </div>
            )}

            {/* Availability Settings */}
            {activeTab === "doctor-schedule" && (
              <div className="space-y-6 text-left flex-grow">
                <div>
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <FiClock className="text-pink-500" /> Availability & Schedule Manager
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Configure your weekly consulting slots across branches.</p>
                </div>

                <div className="space-y-4 max-w-md">
                  {[
                    { day: "Monday", time: "10:00 AM – 2:00 PM", branch: "Gulberg Branch" },
                    { day: "Wednesday", time: "3:00 PM – 7:00 PM", branch: "DHA Branch" },
                    { day: "Friday", time: "10:00 AM – 1:00 PM", branch: "Gulberg Branch" },
                    { day: "Saturday", time: "4:00 PM – 8:00 PM", branch: "DHA Branch" },
                  ].map((slot, idx) => (
                    <div key={idx} className="border border-slate-100 rounded-2xl p-4 flex justify-between items-center bg-slate-50">
                      <div>
                        <p className="text-xs font-black text-slate-800">{slot.day}</p>
                        <p className="text-xs text-slate-505 mt-0.5">{slot.time} ({slot.branch})</p>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block" /> Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
