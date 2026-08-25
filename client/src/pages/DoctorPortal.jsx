import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiCalendar, FiClock, FiFileText, FiActivity, FiList, FiExternalLink, FiCheckCircle, FiVideo, FiX } from "react-icons/fi";
import { FaUserMd, FaWhatsapp } from "react-icons/fa";
import Navbar from "../components/Navbar";
import SEOHead from "../components/SEOHead";
import { api } from "../services/api";

export default function DoctorPortal() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("queue");
  const [appointments, setAppointments] = useState([]);
  const [patientsList, setPatientsList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Status & Application states
  const [doctorStatus, setDoctorStatus] = useState("Active");
  const [adminNote, setAdminNote] = useState("");
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [revisedFiles, setRevisedFiles] = useState({
    cv_file: "", cv_name: "",
    degrees_file: "", degrees_name: "",
    certificates_file: "", certificates_name: "",
    rewards_file: "", rewards_name: ""
  });

  // Form states
  const [meetingInputs, setMeetingInputs] = useState({});
  const [selectedPatientName, setSelectedPatientName] = useState("");
  const [emrForm, setEmrForm] = useState({ diagnosis: "", vitals: "", assessment: "" });
  const [rxForm, setRxForm] = useState({ medicine: "", dosage: "", duration: "", instructions: "" });

  const doctorName = localStorage.getItem("vph_user_name") || "Dr. Sarah Ahmed";
  const loggedInEmail = localStorage.getItem("vph_user_email") || "doctor@physiohub.com";

  const loadData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Doctor application status
      const allDocs = await api.getDoctors();
      const currentDoc = allDocs.find(d => d.email?.toLowerCase() === loggedInEmail.toLowerCase() || d.name?.toLowerCase() === doctorName.toLowerCase());
      if (currentDoc) {
        setDoctorProfile(currentDoc);
        setDoctorStatus(currentDoc.status || "Pending");
        setAdminNote(currentDoc.admin_note || "");
      } else {
        // Fallback for default mock doctor
        setDoctorStatus("Active");
      }

      // 2. Fetch queue appointments
      const appts = await api.getAppointments();
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

  const handleAssignMeeting = async (apptId) => {
    const creds = meetingInputs[apptId];
    if (!creds) {
      alert("Please enter a meeting link or room ID.");
      return;
    }
    setLoading(true);
    try {
      const ok = await api.assignMeetingCredentials(apptId, creds);
      if (ok) {
        alert("Meeting credentials assigned successfully.");
        loadData();
      } else {
        alert("Failed to assign meeting credentials.");
      }
    } catch (e) {
      console.error(e);
      alert("Error assigning meeting credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleRevisionFileChange = (e, fileKey, nameKey) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setRevisedFiles(prev => ({
          ...prev,
          [fileKey]: reader.result,
          [nameKey]: file.name
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResubmitRevisions = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        email: loggedInEmail,
        id: doctorProfile?.id
      };
      if (revisedFiles.cv_file) {
        payload.cv_file = revisedFiles.cv_file;
        payload.cv_name = revisedFiles.cv_name;
      }
      if (revisedFiles.degrees_file) {
        payload.degrees_file = revisedFiles.degrees_file;
        payload.degrees_name = revisedFiles.degrees_name;
      }
      if (revisedFiles.certificates_file) {
        payload.certificates_file = revisedFiles.certificates_file;
        payload.certificates_name = revisedFiles.certificates_name;
      }
      if (revisedFiles.rewards_file) {
        payload.rewards_file = revisedFiles.rewards_file;
        payload.rewards_name = revisedFiles.rewards_name;
      }

      const res = await api.resubmitDoctorApplication(payload);
      if (res && res.success) {
        alert("Your revisions have been successfully submitted for administrative review.");
        setRevisedFiles({ cv_file: "", cv_name: "", degrees_file: "", degrees_name: "", certificates_file: "", certificates_name: "", rewards_file: "", rewards_name: "" });
        loadData();
      } else {
        alert("Resubmission failed: " + (res?.error || "Unknown error"));
      }
    } catch (err) {
      alert("Error submitting revisions: " + err.message);
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
      <SEOHead 
        title="Doctor Clinical Terminal & Patient Queue | Physiohub"
        description="Specialist clinical portal, consultation queue management and prescription generation."
        noindex={true}
      />
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
                {doctorStatus === "Active" ? (
                  [
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
                  ))
                ) : (
                  <button 
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white shadow border-none cursor-default"
                  >
                    <FiUser size={13} /> Application Status
                  </button>
                )}
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

            {doctorStatus === "Active" ? (
              <>
                {/* QUEUE TAB */}
                {activeTab === "queue" && (
                  <div className="space-y-8 text-left flex-grow">
                    <div>
                      <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                        <FiList className="text-pink-500" /> Today's Scheduled Queue
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">Manage in-person and digital consultation rooms directly from your portal.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* In-Person Appointments */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-extrabold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-1.5">
                          <FiUser className="text-blue-500" /> In-Person Visits ({appointments.filter(a => (a.status === "Confirmed" || a.status === "In Room") && a.type !== "Online Consultation").length})
                        </h4>
                        <div className="space-y-3">
                          {appointments.filter(a => (a.status === "Confirmed" || a.status === "In Room") && a.type !== "Online Consultation").length === 0 ? (
                            <div className="p-6 text-center bg-slate-50 border border-dashed rounded-2xl text-slate-400 text-xs">
                              No active in-person appointments in your queue.
                            </div>
                          ) : (
                            appointments.filter(a => (a.status === "Confirmed" || a.status === "In Room") && a.type !== "Online Consultation").map(appt => (
                              <div key={appt.id} className="border border-slate-100 bg-white/40 rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-sm">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-extrabold text-sm text-slate-800">{appt.patient || appt.patient_name}</h4>
                                    <p className="text-[10px] text-slate-500 mt-0.5">{appt.date} at {appt.time} • {appt.branch}</p>
                                  </div>
                                  <span className="text-[9px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full uppercase">{appt.status}</span>
                                </div>
                                <div className="flex gap-2">
                                  {appt.status !== "In Room" && (
                                    <button
                                      onClick={() => api.updateAppointmentStatus(appt.id, "In Room").then(loadData)}
                                      className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-bold cursor-pointer border-none"
                                    >
                                      Call in Room
                                    </button>
                                  )}
                                  <button
                                    onClick={() => api.updateAppointmentStatus(appt.id, "Completed").then(loadData)}
                                    className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-bold cursor-pointer border-none"
                                  >
                                    Mark Completed
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Online Consultations */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-extrabold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-1.5">
                          <FiVideo className="text-pink-500" /> Online Consultations ({appointments.filter(a => (a.status === "Confirmed" || a.status === "In Room") && a.type === "Online Consultation").length})
                        </h4>
                        <div className="space-y-3">
                          {appointments.filter(a => (a.status === "Confirmed" || a.status === "In Room") && a.type === "Online Consultation").length === 0 ? (
                            <div className="p-6 text-center bg-slate-50 border border-dashed rounded-2xl text-slate-400 text-xs">
                              No active online consultations in your queue.
                            </div>
                          ) : (
                            appointments.filter(a => (a.status === "Confirmed" || a.status === "In Room") && a.type === "Online Consultation").map(appt => {
                              const isWhatsApp = appt.consult_channel === "whatsapp";
                              return (
                                <div key={appt.id} className="border border-slate-100 bg-white/40 rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-extrabold text-sm text-slate-800">{appt.patient || appt.patient_name}</h4>
                                      <p className="text-[10px] text-slate-500 mt-0.5">{appt.date} at {appt.time} • Ref: {appt.id}</p>
                                      <span className="inline-flex items-center gap-1 mt-1 text-[9px] font-bold text-slate-500 uppercase tracking-wide bg-slate-100 px-2 py-0.5 rounded border border-slate-200/40">
                                        {isWhatsApp ? <FaWhatsapp className="text-emerald-500" /> : <FiVideo className="text-blue-500" />}
                                        Channel: {appt.consult_channel || "video"}
                                      </span>
                                    </div>
                                    <span className="text-[9px] font-bold bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full uppercase">{appt.status}</span>
                                  </div>

                                  {/* Interaction Action Panel */}
                                  <div className="pt-2 border-t border-slate-100/60 space-y-2.5">
                                    {isWhatsApp ? (
                                      <div className="bg-emerald-50/50 rounded-xl p-2.5 border border-emerald-100/50 text-[10px] text-slate-600">
                                        <p className="font-bold text-emerald-800 flex items-center gap-1"><FaWhatsapp /> WhatsApp Consultation</p>
                                        <p className="mt-0.5">Patient has been routed to your WA Number: <span className="font-mono font-black text-emerald-600">{doctorProfile?.whatsapp_number || "03008786187"}</span></p>
                                      </div>
                                    ) : (
                                      <div className="space-y-1.5 text-[10px] text-left">
                                        <p className="font-bold text-blue-800 flex items-center gap-1"><FiVideo /> Zoom / Google Meet Link</p>
                                        {appt.meeting_credentials ? (
                                          <div className="space-y-1">
                                            <p className="text-slate-450 font-semibold">Assigned Room ID:</p>
                                            <p className="font-mono bg-white p-1.5 border border-slate-200 rounded font-black break-all select-all">{appt.meeting_credentials}</p>
                                          </div>
                                        ) : (
                                          <p className="text-amber-600 italic">No room credentials assigned yet.</p>
                                        )}
                                        <div className="flex gap-2 pt-1">
                                          <input
                                            type="text"
                                            value={meetingInputs[appt.id] || ""}
                                            onChange={e => setMeetingInputs({ ...meetingInputs, [appt.id]: e.target.value })}
                                            placeholder="Paste Zoom / Google Meet Link"
                                            className="flex-1 border border-slate-200 rounded-lg px-2.5 py-1 text-[10px] outline-none focus:border-blue-400 bg-white"
                                          />
                                          <button
                                            onClick={() => handleAssignMeeting(appt.id)}
                                            className="px-2.5 py-1 bg-slate-900 hover:bg-blue-600 text-white rounded-lg font-bold border-none cursor-pointer text-[10px]"
                                          >
                                            {appt.meeting_credentials ? "Update" : "Assign"}
                                          </button>
                                        </div>
                                      </div>
                                    )}

                                    <div className="flex gap-2 pt-1.5 justify-end">
                                      <button
                                        onClick={() => api.updateAppointmentStatus(appt.id, "Completed").then(loadData)}
                                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold cursor-pointer border-none"
                                      >
                                        Mark Session Completed
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
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
                        { day: "Monday", time: "10:00 AM – 2:00 PM", branch: "Blue Area Branch" },
                        { day: "Wednesday", time: "3:00 PM – 7:00 PM", branch: "F-8 Markaz Branch" },
                        { day: "Friday", time: "10:00 AM – 1:00 PM", branch: "Blue Area Branch" },
                        { day: "Saturday", time: "4:00 PM – 8:00 PM", branch: "DHA Phase 2 Branch" },
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
              </>
            ) : (
              <div className="space-y-6 text-left flex-grow font-sans">
                <div>
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <FiUser className="text-pink-500" /> Application Progress Portal
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Track your clinical registration status and submit requested amendments.</p>
                </div>

                <div className="p-5 bg-gradient-to-r from-sky-50 to-pink-50 rounded-3xl border border-sky-100/60 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-extrabold text-slate-800">Clinical Verification In Progress</h4>
                    <p className="text-xs text-slate-500 font-medium">Your credentials are under compliance review. Please allow up to 3 business days for administrative verification and response.</p>
                  </div>
                  <div className="px-4 py-2 rounded-2xl bg-white border border-slate-100 flex items-center gap-2 shadow-inner shrink-0">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Current Status:</span>
                    <span className={`text-xs font-extrabold uppercase px-2 py-0.5 rounded-full ${
                      doctorStatus === "Pending" ? "bg-amber-55 text-amber-600" :
                      doctorStatus === "Need More Details" ? "bg-purple-50 text-purple-600" :
                      "bg-rose-50 text-rose-600"
                    }`}>
                      {doctorStatus}
                    </span>
                  </div>
                </div>

                {doctorStatus === "Pending" && (
                  <div className="p-8 rounded-3xl bg-sky-50/50 border border-sky-100 flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-600 animate-pulse">
                      <FiClock size={32} />
                    </div>
                    <h4 className="text-sm font-extrabold text-sky-850">Credential Assessment Underway</h4>
                    <p className="text-xs text-sky-600 leading-relaxed font-medium">
                      Our credentials committee is verifying your submitted certifications, medical degrees, and practice experience. You will receive a formal response regarding your status and onboarding guidelines within 3 business days.
                    </p>
                  </div>
                )}

                {doctorStatus === "Rejected" && (
                  <div className="p-8 rounded-3xl bg-rose-50/50 border border-rose-100 flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-600">
                      <FiX size={32} />
                    </div>
                    <h4 className="text-sm font-extrabold text-rose-850">Application Disapproved</h4>
                    <p className="text-xs text-rose-600 leading-relaxed font-medium">
                      We regret to inform you that your clinical application has been rejected at this time.
                    </p>
                    {adminNote && (
                      <div className="w-full bg-white/70 rounded-2xl p-4 border border-rose-200/50 text-left">
                        <p className="text-[10px] font-black text-rose-700 uppercase tracking-wider mb-1">Administrative Feedback:</p>
                        <p className="text-xs text-slate-700 font-semibold">{adminNote}</p>
                      </div>
                    )}
                  </div>
                )}

                {doctorStatus === "Need More Details" && (
                  <div className="space-y-6 max-w-2xl mx-auto">
                    <div className="p-6 rounded-3xl bg-amber-50/50 border border-amber-100 flex flex-col items-center text-center space-y-4 shadow-sm">
                      <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
                        <FiFileText size={28} className="animate-bounce" />
                      </div>
                      <h4 className="text-sm font-extrabold text-amber-850">Action Required: Revision Requested</h4>
                      <p className="text-xs text-amber-700 leading-relaxed font-medium">
                        Additional information or documents are required to progress your medical registry. Please review the feedback below and upload the requested files.
                      </p>
                      {adminNote && (
                        <div className="w-full bg-white/85 rounded-2xl p-4 border border-amber-200/50 text-left">
                          <p className="text-[10px] font-black text-amber-750 uppercase tracking-wider mb-1">Required Action & Details:</p>
                          <p className="text-xs text-slate-700 font-bold">{adminNote}</p>
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleResubmitRevisions} className="bg-white/45 border border-slate-200/60 rounded-3xl p-6 space-y-5">
                      <div>
                        <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Re-upload Documents</h4>
                        <p className="text-[10px] text-slate-400 mt-1">Select only the files that need updating. Leave others blank if they are already correct.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                        <div className="bg-slate-50/60 p-3.5 rounded-2xl border border-slate-200/60">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Update CV / Resume</label>
                          <input
                            type="file"
                            onChange={(e) => handleRevisionFileChange(e, "cv_file", "cv_name")}
                            className="text-xs w-full text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border file:border-slate-200 file:text-xs file:font-semibold file:bg-white file:text-slate-700 hover:file:bg-slate-50 cursor-pointer"
                          />
                          {revisedFiles.cv_name && <p className="text-[10px] text-emerald-600 font-bold mt-1 truncate">✓ {revisedFiles.cv_name}</p>}
                        </div>

                        <div className="bg-slate-50/60 p-3.5 rounded-2xl border border-slate-200/60">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Update Degrees</label>
                          <input
                            type="file"
                            onChange={(e) => handleRevisionFileChange(e, "degrees_file", "degrees_name")}
                            className="text-xs w-full text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border file:border-slate-200 file:text-xs file:font-semibold file:bg-white file:text-slate-700 hover:file:bg-slate-50 cursor-pointer"
                          />
                          {revisedFiles.degrees_name && <p className="text-[10px] text-emerald-600 font-bold mt-1 truncate">✓ {revisedFiles.degrees_name}</p>}
                        </div>

                        <div className="bg-slate-50/60 p-3.5 rounded-2xl border border-slate-200/60">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Update Certificates</label>
                          <input
                            type="file"
                            onChange={(e) => handleRevisionFileChange(e, "certificates_file", "certificates_name")}
                            className="text-xs w-full text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border file:border-slate-200 file:text-xs file:font-semibold file:bg-white file:text-slate-700 hover:file:bg-slate-50 cursor-pointer"
                          />
                          {revisedFiles.certificates_name && <p className="text-[10px] text-emerald-600 font-bold mt-1 truncate">✓ {revisedFiles.certificates_name}</p>}
                        </div>

                        <div className="bg-slate-50/60 p-3.5 rounded-2xl border border-slate-200/60">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Update Rewards / Awards</label>
                          <input
                            type="file"
                            onChange={(e) => handleRevisionFileChange(e, "rewards_file", "rewards_name")}
                            className="text-xs w-full text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border file:border-slate-200 file:text-xs file:font-semibold file:bg-white file:text-slate-700 hover:file:bg-slate-50 cursor-pointer"
                          />
                          {revisedFiles.rewards_name && <p className="text-[10px] text-emerald-600 font-bold mt-1 truncate">✓ {revisedFiles.rewards_name}</p>}
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={!revisedFiles.cv_file && !revisedFiles.degrees_file && !revisedFiles.certificates_file && !revisedFiles.rewards_file}
                        className="px-6 py-3 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer shadow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        Submit Revisions
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      
    </div>
  );
}
