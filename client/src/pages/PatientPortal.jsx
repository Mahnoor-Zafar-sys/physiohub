import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiCalendar, FiClock, FiFileText, FiDollarSign, FiActivity, FiUpload, FiAlertTriangle, FiCheckCircle, FiPackage, FiVideo } from "react-icons/fi";
import { FaPrint, FaWhatsapp } from "react-icons/fa";
import Navbar from "../components/Navbar";
import SEOHead from "../components/SEOHead";
import { api } from "../services/api";

export default function PatientPortal() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("appointments");
  const [emrRecords, setEmrRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [orders, setOrders] = useState([]);
  const [doctorsList, setDoctorsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Modals & form state
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rescheduleAppt, setRescheduleAppt] = useState(null);
  const [rescheduleForm, setRescheduleForm] = useState({ date: "", time: "09:00 AM" });
  const [checkoutInvoice, setCheckoutInvoice] = useState(null);
  const [uploadProofAppt, setUploadProofAppt] = useState(null);
  const [uploadProofOrder, setUploadProofOrder] = useState(null);
  const [proofImage, setProofImage] = useState("");
  const [selectedReportModal, setSelectedReportModal] = useState(null);

  const patientName = localStorage.getItem("vph_user_name") || "Jane Doe";
  const patientEmail = localStorage.getItem("vph_user_email") || "";

  const loadData = async () => {
    setLoading(true);
    try {
      const appts = await api.getAppointments();
      // Filter for this patient
      const myAppts = appts.filter(a => a.patient.toLowerCase() === patientName.toLowerCase() || a.patient_name?.toLowerCase() === patientName.toLowerCase());
      setAppointments(myAppts);

      const emrs = await api.getEMR(patientName);
      setEmrRecords(emrs);

      const rxs = await api.getPrescriptions(patientName);
      setPrescriptions(rxs);

      const invs = await api.getInvoices(patientName);
      setInvoices(invs);

      const ords = await api.getOrders();
      const myOrds = ords.filter(o => 
        o.patient_name.toLowerCase() === patientName.toLowerCase() || 
        (patientEmail && o.patient_email.toLowerCase() === patientEmail.toLowerCase())
      );
      setOrders(myOrds);

      const docs = await api.getDoctors();
      setDoctorsList(docs || []);
    } catch (err) {
      setError("Failed to sync real-time medical data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCancelAppt = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      const success = await api.updateAppointmentStatus(id, "Cancelled");
      if (success) {
        alert("Appointment cancelled successfully.");
        loadData();
      }
    } catch (err) {
      alert("Error cancelling appointment.");
    }
  };

  const handleRescheduleSubmit = async (e) => {
    e.preventDefault();
    if (!rescheduleAppt) return;
    try {
      const success = await api.updateAppointmentStatus(rescheduleAppt.id, "Pending", rescheduleForm.date, rescheduleForm.time);
      if (success) {
        alert("Appointment rescheduled successfully!");
        setRescheduleAppt(null);
        loadData();
      }
    } catch (err) {
      alert("Error rescheduling appointment.");
    }
  };

  const handlePayInvoice = async (invoice) => {
    setCheckoutInvoice(invoice);
  };

  const handlePaySubmit = async (e) => {
    e.preventDefault();
    if (!checkoutInvoice) return;
    try {
      const success = await api.payInvoice(checkoutInvoice.id);
      if (success) {
        alert("Invoice paid successfully!");
        setCheckoutInvoice(null);
        loadData();
      }
    } catch (err) {
      alert("Error paying invoice.");
    }
  };

  const handleProofUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1.5 * 1024 * 1024) {
        alert("Proof image must be less than 1.5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitProofOfPayment = async (e) => {
    e.preventDefault();
    if ((!uploadProofAppt && !uploadProofOrder) || !proofImage) return;
    try {
      if (uploadProofAppt) {
        const success = await api.updateAppointmentPaymentProof(uploadProofAppt.id, "Bank Transfer", proofImage);
        if (success) {
          alert("Payment proof uploaded successfully. Awaiting Admin verification.");
          setUploadProofAppt(null);
          setProofImage("");
          loadData();
        } else {
          alert("Failed to submit proof. Try again.");
        }
      } else if (uploadProofOrder) {
        const success = await api.submitOrderProof(uploadProofOrder.id, "Bank Transfer", proofImage);
        if (success) {
          alert("Order payment proof uploaded successfully. Awaiting Admin verification.");
          setUploadProofOrder(null);
          setProofImage("");
          loadData();
        } else {
          alert("Failed to submit proof. Try again.");
        }
      }
    } catch (err) {
      alert("Error submitting payment proof.");
    }
  };

  return (
    <div className="min-h-screen font-sans flex flex-col justify-between" style={{ background: "linear-gradient(135deg, #fce4ec 0%, #e0f2fe 60%, #fdf4ff 100%)" }}>
      <SEOHead 
        title="Patient Health & EHR Dashboard | Physiohub"
        description="Patient medical history, prescription portal, appointment schedule and rehabilitation progress."
        noindex={true}
      />
      <Navbar />

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white !important; color: black !important; margin: 0 !important; padding: 0 !important; }
          nav, footer, .navbar, .footer, .print\\:hidden, .print-hidden { display: none !important; }
          .fixed.inset-0 { position: static !important; background: none !important; backdrop-filter: none !important; padding: 0 !important; display: block !important; }
          .print-prescription-area { position: static !important; width: 100% !important; max-w-none !important; box-shadow: none !important; border: none !important; padding: 0 !important; margin: 0 !important; background: white !important; color: black !important; }
        }
      `}} />

      {/* Prescription Print Modal */}
      <AnimatePresence>
        {selectedPrescription && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedPrescription(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-10 max-w-2xl w-full text-slate-800 shadow-2xl relative border border-slate-100 print-prescription-area"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedPrescription(null)} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 border-none cursor-pointer print:hidden">✕</button>
              
              <div className="flex justify-between items-start border-b-2 border-slate-100 pb-5 mb-6 text-left">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">VITAL PHYSIO HUB</h3>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Advanced rehabilitation & physio</p>
                  <p className="text-xs text-slate-500 mt-2">2nd Floor Allegiance Tower, New Blue Area, Islamabad</p>
                </div>
                <div className="text-right">
                  <h4 className="font-extrabold text-sm text-slate-800">{selectedPrescription.doctor}</h4>
                  <p className="text-[10px] text-pink-500 font-bold uppercase tracking-wider">Consultant Specialist</p>
                  <p className="text-xs text-slate-500 mt-2">Date: {selectedPrescription.date}</p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs grid grid-cols-2 gap-y-1.5 text-left mb-6 font-semibold">
                <div><span className="text-slate-400">Patient Name:</span> {patientName}</div>
                <div><span className="text-slate-400">Age / Gender:</span> 28 / Female</div>
                <div><span className="text-slate-400">Prescription ID:</span> {selectedPrescription.id}</div>
                <div><span className="text-slate-400">Status:</span> Active Course</div>
              </div>

              <div className="text-left space-y-4">
                <span className="text-2xl font-serif italic text-slate-800 font-black">Rx</span>
                <table className="w-full text-xs sm:text-sm text-left text-slate-600">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 uppercase text-[9px] tracking-wider">
                      <th className="py-2">Medicine Name</th>
                      <th>Dosage</th>
                      <th>Duration</th>
                      <th>Instruction</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 font-semibold">
                      <td className="py-3 font-bold text-slate-800">{selectedPrescription.medicine}</td>
                      <td>{selectedPrescription.dosage}</td>
                      <td>{selectedPrescription.duration}</td>
                      <td>{selectedPrescription.instructions}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-end border-t border-slate-100 pt-6 mt-12 text-left">
                <span className="text-[10px] text-slate-400 flex items-center gap-1">🛡 Verified HIPAA Digital Rx</span>
                <div className="text-right space-y-1">
                  <div className="font-serif italic text-slate-700 text-base">{selectedPrescription.doctor}</div>
                  <div className="w-24 h-px bg-slate-300 ml-auto" />
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Authorized signature</p>
                </div>
              </div>

              <div className="flex justify-center gap-3 mt-8 print:hidden">
                <button onClick={() => window.print()} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer border-none shadow-md"><FaPrint /> Print / Save PDF</button>
                <button onClick={() => setSelectedPrescription(null)} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer border-none">Close</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Order Invoice Print Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-10 max-w-2xl w-full text-slate-800 shadow-2xl relative border border-slate-100 print-prescription-area"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedOrder(null)} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 border-none cursor-pointer print:hidden">✕</button>
              
              <div className="flex justify-between items-start border-b-2 border-slate-100 pb-5 mb-6 text-left">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">VITAL PHYSIO HUB</h3>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Advanced rehabilitation & physio shop</p>
                  <p className="text-xs text-slate-500 mt-2">2nd Floor Allegiance Tower, New Blue Area, Islamabad</p>
                </div>
                <div className="text-right">
                  <h4 className="font-extrabold text-sm text-slate-800">Order Invoice</h4>
                  <p className="text-[10px] text-pink-500 font-bold uppercase tracking-wider">Order ID: {selectedOrder.id}</p>
                  <p className="text-xs text-slate-500 mt-2">Date: {new Date(selectedOrder.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs grid grid-cols-2 gap-y-1.5 text-left mb-6 font-semibold">
                <div><span className="text-slate-400">Customer Name:</span> {selectedOrder.patient_name}</div>
                <div><span className="text-slate-400">Email Address:</span> {selectedOrder.patient_email}</div>
                <div><span className="text-slate-400">Phone Number:</span> {selectedOrder.phone}</div>
                <div><span className="text-slate-400">Status:</span> {selectedOrder.order_status}</div>
                <div className="col-span-2 pt-1.5 border-t border-slate-200/50">
                  <span className="text-slate-400">Shipping Address:</span> {selectedOrder.shipping_address}
                </div>
              </div>

              <div className="text-left space-y-4">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Purchased Items</p>
                <table className="w-full text-xs sm:text-sm text-left text-slate-650">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-455 uppercase text-[9px] tracking-wider font-bold">
                      <th className="py-2">Item Name</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-right">Price</th>
                      <th className="text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items && selectedOrder.items.map((item, idx) => (
                      <tr key={idx} className="border-b border-slate-100 font-semibold">
                        <td className="py-3 font-bold text-slate-800">{item.product_name}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-right">₨ {item.price.toLocaleString()}</td>
                        <td className="text-right text-slate-900">₨ {(item.price * item.quantity).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-end border-t border-slate-100 pt-6 mt-12 text-left">
                <span className="text-[10px] text-slate-400 flex items-center gap-1">🛡 Verified E-Commerce Invoice</span>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Grand Total:</span>
                  <div className="font-black text-slate-950 text-lg">₨ {selectedOrder.total_amount.toLocaleString()}</div>
                </div>
              </div>

              <div className="flex justify-center gap-3 mt-8 print:hidden">
                <button onClick={() => window.print()} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer border-none shadow-md"><FaPrint /> Print / Save PDF</button>
                <button onClick={() => setSelectedOrder(null)} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer border-none">Close</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex-grow pt-28 pb-16 px-4 print:hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Sidebar */}
          <div className="lg:col-span-3 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl rounded-3xl p-6 flex flex-col justify-between border border-indigo-900/50 relative overflow-hidden">
            {/* Soft background orb */}
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="pb-5 border-b border-white/10 flex items-center gap-3 text-left bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-400 to-pink-500 flex items-center justify-center text-white font-extrabold shadow-md shrink-0">
                  <FiUser size={18} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-extrabold text-sm text-white leading-none truncate">{patientName}</h4>
                  <span className="text-[9px] font-black text-sky-400 uppercase tracking-widest block mt-1">Patient Portal</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-left">
                {[
                  { id: "appointments", label: "Appointments", icon: FiCalendar },
                  { id: "records", label: "Medical History (EMR)", icon: FiActivity },
                  { id: "patient-rx", label: "My Prescriptions", icon: FiFileText },
                  { id: "online-consultations", label: "Online Consultations", icon: FiVideo },
                  { id: "billing", label: "Invoices & Payments", icon: FiDollarSign },
                  { id: "orders", label: "My Orders", icon: FiPackage }
                ].map(tab => (
                  <button 
                    key={tab.id} 
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${
                      activeTab === tab.id 
                        ? "bg-gradient-to-r from-sky-500 via-indigo-500 to-pink-500 text-white font-black shadow-lg shadow-sky-500/20 scale-[1.02]" 
                        : "bg-white/5 text-slate-300 hover:bg-white/15 hover:text-white"
                    }`}
                  >
                    <tab.icon size={15} /> <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="w-full py-3 bg-rose-500/20 hover:bg-rose-600 text-rose-300 hover:text-white rounded-xl text-xs font-bold border border-rose-500/30 transition-all mt-6 cursor-pointer relative z-10 flex items-center justify-center gap-2"
            >
              Sign Out
            </button>
          </div>

          {/* Main Portal View */}
          <div className="lg:col-span-9 bg-white/80 backdrop-blur-md rounded-3xl border border-white/50 shadow-md p-6 sm:p-8 flex flex-col relative min-h-[500px]">
            {loading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center rounded-3xl">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-pink-500 rounded-full animate-spin" />
              </div>
            )}

            {/* EMR MEDICAL RECORDS */}
            {activeTab === "records" && (
              <div className="space-y-6 text-left flex-grow">
                <div>
                  <h3 className="text-lg lg:text-xl font-black text-slate-800 flex items-center gap-2">
                    <FiActivity className="text-pink-500" /> Electronic Medical Record (EMR)
                  </h3>
                  <p className="text-xs lg:text-sm text-slate-400 mt-0.5 font-medium">Your official clinical diagnostics and laboratory summaries.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-white/50 rounded-2xl p-4 lg:p-5 bg-white/40 text-xs lg:text-sm space-y-1.5 lg:space-y-2 font-semibold">
                    <p className="text-[9px] lg:text-[11px] text-slate-400 uppercase tracking-wider">Patient Information</p>
                    <p><span className="text-slate-400">Name:</span> {patientName}</p>
                    <p><span className="text-slate-400">Age / Gender:</span> 28 / Female</p>
                    <p><span className="text-slate-400">Blood Group:</span> O positive</p>
                    <p><span className="text-slate-400">Allergies:</span> Penicillin, Peanuts</p>
                  </div>
                  <div className="border border-white/50 rounded-2xl p-4 lg:p-5 bg-white/40 text-xs lg:text-sm space-y-1.5 lg:space-y-2 font-semibold">
                    <p className="text-[9px] lg:text-[11px] text-slate-400 uppercase tracking-wider">Clinical Vitals (Latest)</p>
                    <p><span className="text-slate-400">Blood Pressure:</span> 120/80 mmHg</p>
                    <p><span className="text-slate-400">Heart Rate:</span> 72 bpm</p>
                    <p><span className="text-slate-400">Blood Sugar:</span> 95 mg/dL</p>
                    <p><span className="text-slate-400">Primary Branch:</span> Blue Area Center, Islamabad</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-slate-400 border-b pb-1">Past Consultations & Diagnoses</p>
                  {emrRecords.length === 0 ? (
                    <p className="text-xs lg:text-sm text-slate-400 font-medium">No medical records on file.</p>
                  ) : (
                    emrRecords.map(rec => (
                      <div key={rec.id} className="border border-white/40 bg-white/30 rounded-2xl p-5 lg:p-6 space-y-3 lg:space-y-4 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-center flex-wrap gap-2">
                          <div>
                            <span className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase">{rec.date}</span>
                            <h4 className="font-extrabold text-sm lg:text-base text-slate-800">{rec.diagnosis}</h4>
                          </div>
                          <span className="text-[10px] lg:text-xs font-bold px-2.5 py-1 rounded-full bg-sky-50 text-sky-700">{rec.doctor}</span>
                        </div>
                        <p className="text-xs lg:text-sm text-slate-500 leading-relaxed font-semibold">{rec.assessment}</p>
                        <div className="text-[10px] lg:text-xs text-slate-400 font-bold bg-white/50 p-2 rounded-lg">
                          Vitals Taken: {rec.vitals}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* MY PRESCRIPTIONS */}
            {activeTab === "patient-rx" && (
              <div className="space-y-6 text-left flex-grow">
                <div>
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <FiFileText className="text-pink-500" /> Prescriptions & Medications (Rx)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Click Print to generate authorized PDFs of your active courses.</p>
                </div>

                {prescriptions.length === 0 ? (
                  <p className="text-xs text-slate-400">No prescriptions assigned.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {prescriptions.map(rx => (
                      <div key={rx.id} className="border border-white/40 bg-white/40 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[9px] font-black uppercase text-pink-500 bg-pink-50 px-2 py-0.5 rounded">{rx.id}</span>
                            <span className="text-[10px] font-bold text-slate-400">{rx.date}</span>
                          </div>
                          <h4 className="font-black text-slate-800 text-sm leading-snug">{rx.medicine}</h4>
                          <p className="text-xs text-slate-500 mt-1 font-semibold">Dosage: {rx.dosage} · Duration: {rx.duration}</p>
                          <p className="text-[10px] text-slate-400 mt-2">Doctor: {rx.doctor}</p>
                        </div>
                        <div className="border-t border-slate-50 pt-3 mt-4 flex justify-between items-center">
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span className="w-1 h-1 bg-emerald-500 rounded-full inline-block" /> {rx.status}
                          </span>
                          <button 
                            onClick={() => setSelectedPrescription(rx)}
                            className="px-3.5 py-1.5 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-[10px] font-bold flex items-center gap-1 transition-colors border-none cursor-pointer"
                          >
                            <FaPrint size={10} /> View / Print Rx
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* APPOINTMENTS */}
            {activeTab === "appointments" && (
              <div className="space-y-6 text-left flex-grow">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <FiCalendar className="text-pink-500" /> Appointment Bookings
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Manage your active and past clinical schedules.</p>
                  </div>
                  <button 
                    onClick={() => navigate("/book-appointment")}
                    className="px-4 py-2 bg-gradient-to-r from-sky-400 to-pink-500 hover:opacity-90 text-white rounded-xl text-xs font-bold border-none cursor-pointer shadow-md"
                  >
                    Book New Appointment
                  </button>
                </div>

                {appointments.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 border border-dashed rounded-3xl text-slate-400 text-xs">
                    No scheduled appointments. Click the button above to book.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {appointments.map(appt => (
                      <div key={appt.id} className="border border-slate-100 rounded-2xl p-4 bg-white/40 flex flex-col justify-between items-stretch gap-3">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-black text-slate-800">{appt.doctor}</span>
                              <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{appt.type}</span>
                              <span className="text-[9px] font-black uppercase text-pink-500 bg-pink-50 px-2 py-0.5 rounded">{appt.id}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Date: {appt.date} at {appt.time} ({appt.branch})</p>
                            {appt.payment_method && (
                              <p className="text-[10px] text-slate-400 mt-0.5">Method: {appt.payment_method}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
                            {/* Payment status */}
                            <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border uppercase ${
                              appt.payment_status === "Paid" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                              appt.payment_status === "Rejected" ? "bg-rose-50 text-rose-700 border-rose-100" :
                              appt.payment_status === "Pending Verification" ? "bg-amber-50 text-amber-700 border-amber-100" :
                              "bg-slate-50 text-slate-600 border-slate-100"
                            }`}>
                              Payment: {appt.payment_status || "Unpaid"}
                            </span>

                            {/* Appointment status */}
                            <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                              appt.status === "Confirmed" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                              appt.status === "Cancelled" ? "bg-red-50 text-red-700 border-red-100" : "bg-sky-50 text-sky-700 border-sky-100"
                            }`}>
                              {appt.status}
                            </span>
                            
                            {appt.patient_report && (
                              <button
                                onClick={() => setSelectedReportModal({ report: appt.patient_report, name: appt.patient_report_name || "medical_report" })}
                                className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-600 rounded-lg text-[10px] font-bold border border-sky-100 cursor-pointer flex items-center gap-1 transition-all"
                              >
                                <FiFileText size={12} /> Preview Report
                              </button>
                            )}
                            
                            {appt.status !== "Cancelled" && appt.status !== "Completed" && (
                              <>
                                <button 
                                  onClick={() => {
                                    setRescheduleAppt(appt);
                                    setRescheduleForm({ date: appt.date, time: appt.time });
                                  }}
                                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-[10px] font-bold border-none cursor-pointer"
                                >
                                  Reschedule
                                </button>
                                <button 
                                  onClick={() => handleCancelAppt(appt.id)}
                                  className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-[10px] font-bold border-none cursor-pointer"
                                >
                                  Cancel
                                </button>
                                {appt.payment_status === "Unpaid" && (
                                  <button 
                                    onClick={() => setUploadProofAppt(appt)}
                                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-[10px] font-bold border-none cursor-pointer"
                                  >
                                    Upload Receipt Proof
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        </div>

                        {appt.admin_note && (
                          <div className="mt-1 p-3 bg-pink-50/40 border border-pink-100/50 rounded-xl text-[11px] text-slate-700 flex items-start gap-2">
                            <FiAlertTriangle className="shrink-0 text-pink-500 mt-0.5" size={14} />
                            <div>
                              <span className="font-bold text-slate-800">Clinic Verification Feedback:</span>
                              <p className="text-slate-600 leading-relaxed font-medium mt-0.5">{appt.admin_note}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Reschedule Overlay */}
                {rescheduleAppt && (
                  <div className="absolute inset-0 bg-white/95 rounded-3xl p-6 flex flex-col justify-center items-center z-10">
                    <form onSubmit={handleRescheduleSubmit} className="max-w-sm w-full space-y-4">
                      <h4 className="font-extrabold text-base text-slate-800">Reschedule Appointment {rescheduleAppt.id}</h4>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">New Date</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. 25 Jun, 2026"
                          value={rescheduleForm.date}
                          onChange={e => setRescheduleForm({...rescheduleForm, date: e.target.value})}
                          className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-pink-400"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">New Time Slot</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. 04:30 PM"
                          value={rescheduleForm.time}
                          onChange={e => setRescheduleForm({...rescheduleForm, time: e.target.value})}
                          className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-pink-400"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="submit" className="flex-1 py-2.5 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer">Confirm</button>
                        <button type="button" onClick={() => setRescheduleAppt(null)} className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold border-none cursor-pointer">Cancel</button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Upload Payment Proof Overlay */}
                {uploadProofAppt && (
                  <div className="absolute inset-0 bg-white/95 rounded-3xl p-6 flex flex-col justify-center items-center z-10">
                    <form onSubmit={submitProofOfPayment} className="max-w-sm w-full space-y-4">
                      <h4 className="font-extrabold text-base text-slate-800">Upload Payment Proof for {uploadProofAppt.id}</h4>
                      <p className="text-xs text-slate-400">Please bank transfer to HBL 1234-5678-9012 and upload receipt screenshot.</p>
                      
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Select Receipt Image</label>
                        <input 
                          type="file" 
                          accept="image/*"
                          required
                          onChange={handleProofUpload}
                          className="w-full text-xs text-slate-500 file:mr-2 file:py-2 file:px-3 file:rounded-xl file:border file:border-slate-200 file:text-[10px] file:font-semibold file:bg-white file:text-slate-700 hover:file:bg-slate-50 cursor-pointer"
                        />
                      </div>

                      {proofImage && (
                        <div className="w-full h-32 border border-slate-200 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center">
                          <img src={proofImage} alt="Payment receipt screenshot proof" className="h-full object-contain" />
                        </div>
                      )}

                      <div className="flex gap-2">
                        <button type="submit" disabled={!proofImage} className="flex-1 py-2.5 bg-slate-900 hover:bg-pink-600 disabled:opacity-50 text-white rounded-xl text-xs font-bold border-none cursor-pointer">Submit Proof</button>
                        <button type="button" onClick={() => { setUploadProofAppt(null); setProofImage(""); }} className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold border-none cursor-pointer">Cancel</button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* BILLING & PAYMENT CHECKOUT */}
            {activeTab === "billing" && (
              <div className="space-y-6 text-left flex-grow">
                <div>
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <FiDollarSign className="text-pink-500" /> Billing Desk & Invoice Checkout
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Pay outstanding invoices securely via Stripe / JazzCash mockup streams.</p>
                </div>

                <div className="space-y-3">
                  {invoices.length === 0 ? (
                    <p className="text-xs text-slate-400">No invoices on file.</p>
                  ) : (
                    invoices.map(inv => (
                      <div key={inv.id} className="border border-slate-100 bg-white/40 rounded-2xl p-4 flex justify-between items-center">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400">{inv.date}</span>
                          <h4 className="font-extrabold text-sm text-slate-800 mt-0.5">{inv.description}</h4>
                          <span className="text-xs font-black text-pink-500 mt-1 block">{inv.amount}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            inv.status === "Paid" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                          }`}>
                            {inv.status}
                          </span>
                          
                          {inv.status === "Unpaid" && (
                            <button 
                              onClick={() => handlePayInvoice(inv)}
                              className="px-4 py-2 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer shadow"
                            >
                              Pay Now
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {checkoutInvoice && (
                  <div className="absolute inset-0 bg-white/95 rounded-3xl p-6 flex flex-col justify-center items-center z-10">
                    <form onSubmit={handlePaySubmit} className="max-w-sm w-full space-y-4 bg-white border border-slate-100 p-6 rounded-3xl shadow-xl">
                      <div className="text-center pb-2 border-b">
                        <h4 className="font-black text-slate-800 text-base">Secure checkout</h4>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Amount: {checkoutInvoice.amount}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Card Number</label>
                          <input 
                            type="text" 
                            required
                            placeholder="4242 4242 4242 4242"
                            className="w-full border border-slate-200 px-4 py-2.5 rounded-xl text-xs outline-none focus:border-pink-400"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Expiry (MM/YY)</label>
                            <input 
                              type="text" 
                              required
                              placeholder="12/28"
                              className="w-full border border-slate-200 p-2.5 rounded-xl text-xs outline-none focus:border-pink-400 text-center"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">CVC / CVV</label>
                            <input 
                              type="password" 
                              required
                              placeholder="•••"
                              maxLength={3}
                              className="w-full border border-slate-200 p-2.5 rounded-xl text-xs outline-none focus:border-pink-400 text-center"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2.5 pt-2">
                        <button type="submit" className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold border-none cursor-pointer shadow-md">Complete payment</button>
                        <button type="button" onClick={() => setCheckoutInvoice(null)} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold border-none cursor-pointer">Cancel</button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* MY ORDERS */}
            {activeTab === "orders" && (
              <div className="space-y-6 text-left flex-grow">
                <div>
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <FiPackage className="text-pink-500" /> My Purchases & Orders
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Track your physio equipment orders and download invoice transcripts.</p>
                </div>

                <div className="space-y-3">
                  {orders.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 border border-dashed rounded-3xl text-slate-400 text-xs font-semibold">
                      No shop orders found.
                    </div>
                  ) : (
                    orders.map(order => (
                      <div key={order.id} className="border border-slate-105 bg-white/40 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs">
                        <div>
                          <span className="text-[10px] font-black text-pink-500 bg-pink-50 px-2 py-0.5 rounded uppercase">{order.id}</span>
                          <span className="text-[10px] font-bold text-slate-400 ml-2">Placed: {new Date(order.created_at).toLocaleDateString()}</span>
                          <h4 className="font-extrabold text-xs text-slate-800 mt-1.5">
                            Items: {order.items ? order.items.map(i => `${i.product_name} (x${i.quantity})`).join(", ") : "Product details"}
                          </h4>
                          <span className="text-xs font-black text-slate-900 mt-1 block">Total Amount: ₨ {order.total_amount.toLocaleString()} ({order.payment_method})</span>
                        </div>
                        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
                          <div className="flex flex-col gap-1 items-end">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              order.payment_status === "Paid" ? "bg-emerald-50 text-emerald-700" :
                              order.payment_status === "Pending Verification" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-750"
                            }`}>
                              Payment: {order.payment_status}
                            </span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              order.order_status === "Delivered" ? "bg-emerald-550/10 text-emerald-700" :
                              order.order_status === "Cancelled" ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700 animate-pulse"
                            }`}>
                              Shipping: {order.order_status}
                            </span>
                          </div>

                          <div className="flex gap-1">
                            <button 
                              onClick={() => setSelectedOrder(order)}
                              className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-[10px] font-bold border-none cursor-pointer flex items-center gap-1 shadow-sm"
                            >
                              <FiFileText size={10} /> Invoice
                            </button>

                            {order.payment_status === "Unpaid" && order.payment_method !== "COD" && (
                              <button 
                                onClick={() => setUploadProofOrder(order)}
                                className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-505 text-white rounded-xl text-[10px] font-bold border-none cursor-pointer shadow-sm"
                              >
                                Upload Proof
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Upload Payment Proof Overlay for Order */}
                {uploadProofOrder && (
                  <div className="absolute inset-0 bg-white/95 rounded-3xl p-6 flex flex-col justify-center items-center z-10">
                    <form onSubmit={submitProofOfPayment} className="max-w-sm w-full space-y-4">
                      <h4 className="font-extrabold text-base text-slate-800">Upload Payment Proof for Order {uploadProofOrder.id}</h4>
                      <p className="text-xs text-slate-450">Please deposit ₨ {uploadProofOrder.total_amount.toLocaleString()} to HBL 1234-5678-9012 and upload screenshot.</p>
                      
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Select Receipt Image</label>
                        <input 
                          type="file" 
                          accept="image/*"
                          required
                          onChange={handleProofUpload}
                          className="w-full text-xs text-slate-500 file:mr-2 file:py-2 file:px-3 file:rounded-xl file:border file:border-slate-200 file:text-[10px] file:font-semibold file:bg-white file:text-slate-700 hover:file:bg-slate-50 cursor-pointer"
                        />
                      </div>

                      {proofImage && (
                        <div className="w-full h-32 border border-slate-200 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center">
                          <img src={proofImage} alt="Payment receipt screenshot proof" className="h-full object-contain" />
                        </div>
                      )}

                      <div className="flex gap-2">
                        <button type="submit" disabled={!proofImage} className="flex-1 py-2.5 bg-slate-900 hover:bg-pink-600 disabled:opacity-50 text-white rounded-xl text-xs font-bold border-none cursor-pointer">Submit Proof</button>
                        <button type="button" onClick={() => { setUploadProofOrder(null); setProofImage(""); }} className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-650 rounded-xl text-xs font-bold border-none cursor-pointer">Cancel</button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* ONLINE CONSULTATIONS */}
            {activeTab === "online-consultations" && (
              <div className="space-y-6 text-left flex-grow">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <FiVideo className="text-pink-500" /> Online Consultations
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Track your digital consultation room bookings, payment status, and join sessions.</p>
                  </div>
                  <div className="bg-pink-100 text-pink-700 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg">
                    Total: {appointments.filter(a => a.type === "Online Consultation").length}
                  </div>
                </div>

                <div className="space-y-4">
                  {appointments.filter(a => a.type === "Online Consultation").length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 border border-dashed rounded-3xl text-slate-450 text-xs font-semibold">
                      No online consultations booked yet.
                    </div>
                  ) : (
                    appointments.filter(a => a.type === "Online Consultation").map(appt => {
                      const isWhatsApp = appt.consult_channel === "whatsapp";
                      // Find doctor info to get WhatsApp username and number
                      const docInfo = doctorsList.find(d => d.name === appt.doctor || d.name === appt.doctor_name);
                      const waNumber = docInfo?.whatsapp_number || "03008786187";
                      const waUsername = docInfo?.whatsapp_username || "VitalPhysioHub";
                      
                      let statusBadgeColor = "bg-amber-100 text-amber-800 border-amber-200";
                      if (appt.status === "Confirmed") statusBadgeColor = "bg-emerald-100 text-emerald-800 border-emerald-200";
                      if (appt.status === "Cancelled" || appt.payment_status === "Rejected") statusBadgeColor = "bg-rose-100 text-rose-800 border-rose-200";
                      if (appt.status === "Completed") statusBadgeColor = "bg-blue-100 text-blue-800 border-blue-200";

                      return (
                        <div key={appt.id} className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-extrabold text-sm text-slate-800">{appt.doctor}</h4>
                                <span className={`text-[9px] px-2 py-0.5 border rounded-lg font-black tracking-wider uppercase ${statusBadgeColor}`}>
                                  {appt.status}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                                channel: <span className="text-slate-650 capitalize">{appt.consult_channel || "video"}</span> • Ref: {appt.id}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-extrabold text-slate-700 block">{appt.date}</span>
                              <span className="text-[10px] text-slate-400 font-bold block">{appt.time}</span>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-100/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="text-xs">
                              {appt.status === "Pending" && (
                                <p className="text-amber-600 font-bold flex items-center gap-1.5">
                                  <FiClock size={13} /> Awaiting Admin Payment Verification
                                </p>
                              )}
                              {appt.payment_status === "Rejected" && (
                                <div className="space-y-1">
                                  <p className="text-rose-600 font-bold flex items-center gap-1.5">
                                    <FiXCircle size={13} /> Payment verification failed.
                                  </p>
                                  {appt.admin_note && (
                                    <p className="text-slate-500 text-[10px] pl-4 font-medium italic">Reason: "{appt.admin_note}"</p>
                                  )}
                                </div>
                              )}
                              {appt.status === "Confirmed" && (
                                <div>
                                  {isWhatsApp ? (
                                    <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 space-y-1.5 max-w-md">
                                      <p className="text-emerald-700 font-extrabold flex items-center gap-1 text-[11px] uppercase tracking-wide">
                                        <FaWhatsapp size={14} /> WhatsApp Consultation Link Enabled
                                      </p>
                                      <p className="text-[10px] text-slate-500 font-medium">Please message your consultant specialist on WhatsApp:</p>
                                      <div className="flex gap-4 items-center pt-1 font-mono text-[10px] font-bold text-slate-700">
                                        <div>Number: <span className="text-emerald-600 font-black">{waNumber}</span></div>
                                        <div>Username: <span className="text-emerald-600 font-black">@{waUsername}</span></div>
                                      </div>
                                      <a
                                        href={`https://wa.me/${waNumber.replace(/[^0-9]/g, "")}?text=Hello%20Dr.%20I%20have%20an%20online%20consultation%20booked%20with%20you.%20Ref:%20${appt.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-[10px] font-black text-white bg-emerald-500 px-3 py-1.5 rounded-lg border-none hover:bg-emerald-600 transition-colors mt-2 cursor-pointer"
                                        style={{ textDecoration: "none" }}
                                      >
                                        <FaWhatsapp size={12} /> Contact Doctor Now
                                      </a>
                                    </div>
                                  ) : (
                                    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 space-y-1.5 max-w-md">
                                      <p className="text-blue-700 font-extrabold flex items-center gap-1 text-[11px] uppercase tracking-wide">
                                        <FiVideo size={14} /> Secure Telehealth Credentials Ready
                                      </p>
                                      <p className="text-[10px] text-slate-500 font-medium">Use the following credentials to join the clinical video room:</p>
                                      {appt.meeting_credentials ? (
                                        <div className="space-y-1 pt-1 text-[11px]">
                                          <div className="font-semibold text-slate-650">Room ID / Link:</div>
                                          <div className="font-mono bg-white p-1.5 border border-slate-200 rounded text-blue-600 font-black break-all select-all">{appt.meeting_credentials}</div>
                                          {appt.meeting_credentials.startsWith("http") && (
                                            <a
                                              href={appt.meeting_credentials}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="inline-flex items-center gap-1.5 text-[10px] font-black text-white bg-blue-600 px-3 py-1.5 rounded-lg border-none hover:bg-blue-700 transition-colors mt-1 cursor-pointer"
                                              style={{ textDecoration: "none" }}
                                            >
                                              Join Consultation Room
                                            </a>
                                          )}
                                        </div>
                                      ) : (
                                        <p className="text-[10px] text-slate-400 italic">Doctor is preparing the secure session link. Check back shortly before your scheduled slot.</p>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                            
                            <div className="flex gap-2">
                              {appt.patient_report && (
                                <button
                                  onClick={() => setSelectedReportModal({ name: appt.patient_report_name || "Diagnostic Report", report: appt.patient_report })}
                                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold border-none cursor-pointer"
                                >
                                  View Shared Report
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      
      
      {/* Medical Report Viewer Modal */}
      <AnimatePresence>
        {selectedReportModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-4xl w-full text-slate-800 shadow-2xl relative border border-white/50 flex flex-col"
            >
              <button 
                onClick={() => setSelectedReportModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center text-slate-500 transition-colors border-none cursor-pointer font-bold z-10"
              >
                ✕
              </button>
              <h3 className="font-extrabold text-slate-900 text-sm mb-4 text-center flex items-center gap-1.5 justify-center">
                <FiFileText className="text-sky-500" /> Medical Report: {selectedReportModal.name}
              </h3>
              <div className="w-full overflow-auto max-h-[75vh] border border-slate-100 rounded-xl bg-slate-50 flex items-center justify-center p-2 min-h-[300px]">
                {selectedReportModal.report.startsWith("data:image/") ? (
                  <img 
                    src={selectedReportModal.report} 
                    alt="Patient Medical Report" 
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                ) : selectedReportModal.report.startsWith("data:application/pdf") ? (
                  <iframe 
                    src={selectedReportModal.report} 
                    className="w-full h-[65vh] rounded-xl border-none"
                    title="Patient Medical Report PDF"
                  />
                ) : (
                  <div className="text-center py-10 flex flex-col items-center gap-4">
                    <FiFileText size={48} className="text-slate-400" />
                    <p className="text-sm font-semibold text-slate-600">This file type ({selectedReportModal.name}) cannot be previewed directly.</p>
                    <a 
                      href={selectedReportModal.report} 
                      download={selectedReportModal.name}
                      className="px-6 py-3 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-xs font-bold transition-all"
                      style={{ textDecoration: "none" }}
                    >
                      📥 Download Attached File
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
