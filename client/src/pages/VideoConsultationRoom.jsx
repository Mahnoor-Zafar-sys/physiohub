import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiVideo, FiVideoOff, FiMic, FiMicOff, FiMonitor, FiPhoneOff, 
  FiSend, FiDownload, FiFileText, FiActivity, FiUser, FiInfo, FiShield 
} from "react-icons/fi";
import Navbar from "../components/Navbar";

export default function VideoConsultationRoom() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract doctor details passed via router state or default to Dr. Sarah Ahmed
  const doctor = location.state?.doctor || {
    id: 1,
    name: "Dr. Sarah Ahmed",
    specialty: "Skin & Dermatology",
    title: "MBBS, FCPS (Dermatology)",
    solidColor: "#ec4899",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80"
  };

  const patientName = location.state?.patientName || "Jane Doe";

  const [callActive, setCallActive] = useState(true);
  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);
  const [screenShareActive, setScreenShareActive] = useState(false);
  
  const [messages, setMessages] = useState([
    { sender: "doctor", text: "Hello! Welcome to your digital consultation session. Can you hear and see me clearly?", time: "12:00 PM" }
  ]);
  const [inputText, setInputText] = useState("");
  
  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const [webcamAvailable, setWebcamAvailable] = useState(false);

  // Setup patient real webcam stream
  useEffect(() => {
    if (callActive && videoActive) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          localStreamRef.current = stream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
            setWebcamAvailable(true);
          }
        })
        .catch(err => {
          console.warn("Webcam access blocked or unavailable:", err);
          setWebcamAvailable(false);
        });
    } else {
      stopLocalStream();
    }

    return () => stopLocalStream();
  }, [callActive, videoActive]);

  const stopLocalStream = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }
    setWebcamAvailable(false);
  };

  // Automated doctor interactive chat bot simulation
  useEffect(() => {
    if (messages.length === 2 && messages[1].sender === "patient") {
      const timer = setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: "doctor", text: "Excellent. I have opened your symptoms logs and medical history. Let me review your diagnostics. Could you describe when the symptoms started?", time: "12:02 PM" }
        ]);
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (messages.length === 4 && messages[3].sender === "patient") {
      const timer = setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: "doctor", text: "Understood. I will prepare your digital prescription now. It will contain your dosages and medical instructions. I'm finishing our call now so you can download the document.", time: "12:05 PM" }
        ]);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      setMessages(prev => [
        ...prev,
        { sender: "patient", text: inputText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
      setInputText("");
    }
  };

  const handleDropCall = () => {
    setCallActive(false);
    stopLocalStream();
  };

  const toggleMic = () => {
    setMicActive(!micActive);
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach(t => t.enabled = !micActive);
    }
  };

  const toggleVideo = () => {
    setVideoActive(!videoActive);
  };

  const toggleScreenShare = () => {
    if (!screenShareActive) {
      navigator.mediaDevices.getDisplayMedia({ video: true })
        .then(stream => {
          setScreenShareActive(true);
          // Just simulation: when screen share ends, reset state
          stream.getVideoTracks()[0].onended = () => {
            setScreenShareActive(false);
          };
        })
        .catch(() => setScreenShareActive(false));
    } else {
      setScreenShareActive(false);
    }
  };

  const printPrescription = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-900 font-body select-none text-slate-100 flex flex-col justify-between">
      <Navbar />

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white !important; color: black !important; margin: 0 !important; padding: 0 !important; }
          nav, footer, .navbar, .footer, .print\\:hidden, .print-hidden { display: none !important; }
          .min-h-screen { background: white !important; min-height: 0 !important; display: block !important; }
          .flex-grow { padding: 0 !important; margin: 0 !important; max-w-none !important; width: 100% !important; }
          .print-area { position: static !important; width: 100% !important; max-w-none !important; box-shadow: none !important; border: none !important; padding: 0 !important; margin: 0 !important; background: white !important; color: black !important; }
        }
      `}} />

      {callActive ? (
        /* --- ACTIVE VIDEO CALL LAYOUT --- */
        <div className="flex-1 pt-24 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 items-stretch h-[calc(100vh-100px)]">
          
          {/* Main Video Screen Container */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-slate-950 rounded-3xl p-4 relative overflow-hidden border border-slate-800">
            
            {/* Top Info Bar */}
            <div className="flex items-center justify-between z-10">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-[10px] font-bold tracking-wider uppercase">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse inline-block" />
                Secure HIPAA Consultation Call
              </span>
              <span className="text-xs font-semibold text-slate-400">
                Patient: <span className="text-white">{patientName}</span>
              </span>
            </div>

            {/* Simulated Doctor Video Stream */}
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
              <video 
                src="https://assets.mixkit.co/videos/preview/mixkit-doctor-talking-to-camera-in-consultation-office-41584-large.mp4"
                autoPlay 
                loop 
                muted
                playsInline
                className="w-full h-full object-cover opacity-90"
              />
              
              {/* Doctor Label overlay */}
              <div className="absolute bottom-6 left-6 z-10 bg-slate-950/70 border border-slate-800 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                {doctor.name} ({doctor.specialty})
              </div>
            </div>

            {/* Patient Floating Webcam Screen */}
            <div className="absolute top-16 right-6 w-36 sm:w-48 aspect-[4/3] rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden z-20">
              {videoActive && webcamAvailable ? (
                <video 
                  ref={localVideoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover scale-x-[-1]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-500">
                  <FiVideoOff size={24} className="mb-1" />
                  <span className="text-[10px]">Camera Disabled</span>
                </div>
              )}
              <div className="absolute bottom-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-[9px] text-white">
                You
              </div>
            </div>

            {/* Dashboard Controls overlay */}
            <div className="flex justify-center items-center gap-4 z-10 pt-4 border-t border-slate-900 mt-auto bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-4 rounded-b-3xl">
              <button 
                onClick={toggleMic}
                className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                  micActive 
                    ? "bg-slate-900 border-slate-800 text-white hover:bg-slate-800" 
                    : "bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20"
                }`}
              >
                {micActive ? <FiMic size={18} /> : <FiMicOff size={18} />}
              </button>

              <button 
                onClick={toggleVideo}
                className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                  videoActive 
                    ? "bg-slate-900 border-slate-800 text-white hover:bg-slate-800" 
                    : "bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20"
                }`}
              >
                {videoActive ? <FiVideo size={18} /> : <FiVideoOff size={18} />}
              </button>

              <button 
                onClick={toggleScreenShare}
                className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                  screenShareActive 
                    ? "bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-500" 
                    : "bg-slate-900 border-slate-800 text-white hover:bg-slate-800"
                }`}
              >
                <FiMonitor size={18} />
              </button>

              <button 
                onClick={handleDropCall}
                className="w-14 h-12 rounded-xl flex items-center justify-center bg-red-600 hover:bg-red-700 text-white transition-all cursor-pointer border-none shadow-lg shadow-red-500/20"
              >
                <FiPhoneOff size={18} />
              </button>
            </div>

          </div>

          {/* Right Sidebar: Patient Live Chat */}
          <div className="lg:col-span-4 bg-slate-950 rounded-3xl p-4 border border-slate-800 flex flex-col justify-between max-h-full">
            <div>
              <div className="pb-3 border-b border-slate-900 flex items-center gap-2 mb-4">
                <FiActivity className="text-emerald-500" />
                <h3 className="font-bold text-sm">Consultation Chat</h3>
              </div>

              {/* Message Feed */}
              <div className="space-y-4 overflow-y-auto max-h-[350px] lg:max-h-[480px] pr-2 scrollbar-none text-left">
                {messages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex flex-col ${msg.sender === "patient" ? "items-end" : "items-start"}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-2xl p-3.5 text-xs ${
                        msg.sender === "patient" 
                          ? "bg-blue-600 text-white rounded-tr-none" 
                          : "bg-slate-900 text-slate-100 rounded-tl-none border border-slate-800"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-500 mt-1">{msg.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="flex gap-2 pt-3 border-t border-slate-900 mt-4">
              <input 
                type="text" 
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Type your reply..."
                className="bg-slate-900 border border-slate-800 text-slate-100 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 flex-1"
              />
              <button 
                type="submit"
                className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white border-none cursor-pointer"
              >
                <FiSend size={14} />
              </button>
            </form>
          </div>

        </div>
      ) : (
        /* --- CONSULTATION REPORT & PRESCRIPTION GENERATOR --- */
        <div className="flex-grow pt-28 pb-16 px-4 max-w-4xl mx-auto w-full text-slate-900">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 sm:p-10 space-y-8 print-area">
            
            {/* Header / Letterhead */}
            <div className="flex justify-between items-start border-b-2 border-slate-100 pb-6">
              <div className="text-left">
                <h2 className="text-2xl font-black tracking-tight text-slate-900">VITAL PHYSIO HUB</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Advanced Rehabilitation & Physio</p>
                <p className="text-xs text-slate-500 mt-2">Plaza 56, Block L, Blue Area, Islamabad</p>
                <p className="text-xs text-slate-500">Helpline: +92 (51) 111-911-273</p>
              </div>
              <div className="text-right">
                <h3 className="font-extrabold text-slate-800 text-sm">{doctor.name}</h3>
                <p className="text-xs text-blue-600 font-semibold">{doctor.title}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">{doctor.specialty}</p>
                <p className="text-xs text-slate-500 mt-4">Date: {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            {/* Patient Meta Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 rounded-2xl p-4 text-xs border border-slate-100 text-left">
              <div>
                <p className="text-slate-400 uppercase font-bold text-[9px] tracking-wider">Patient Name</p>
                <p className="font-bold text-slate-800 mt-0.5">{patientName}</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase font-bold text-[9px] tracking-wider">Age / Gender</p>
                <p className="font-bold text-slate-800 mt-0.5">28 Yrs / Female</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase font-bold text-[9px] tracking-wider">Consultation Mode</p>
                <p className="font-bold text-slate-800 mt-0.5">HD Video Consult</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase font-bold text-[9px] tracking-wider">Session ID</p>
                <p className="font-bold text-slate-800 mt-0.5">#VPH-VIR-92043</p>
              </div>
            </div>

            {/* Symptoms / Clinical Findings */}
            <div className="space-y-3 text-left">
              <h4 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">Clinical Assessment & Diagnosis</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Patient presented via video portal describing mild inflammation, persistent rashes, and skin irritation. Diagnostic analysis matches allergic contact dermatitis. Advising protective recovery protocols and topical applications.
              </p>
            </div>

            {/* Prescribed Medicines Grid */}
            <div className="space-y-3 text-left">
              <h4 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">Rx - Prescribed Medication</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left text-slate-600">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] tracking-wider">
                      <th className="py-2.5">Medicine Name</th>
                      <th>Dosage</th>
                      <th>Duration</th>
                      <th>Instruction</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 font-bold text-slate-800">Surbex Z Multivitamins</td>
                      <td>1 tablet daily</td>
                      <td>15 Days</td>
                      <td>After breakfast</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 font-bold text-slate-800">Aerius 5mg Tablets</td>
                      <td>1 tablet daily</td>
                      <td>10 Days</td>
                      <td>Before going to sleep</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 font-bold text-slate-800">Hydrozole Topical Cream</td>
                      <td>Apply twice daily</td>
                      <td>7 Days</td>
                      <td>External skin application only</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Doctor Signature Block */}
            <div className="flex justify-between items-end border-t border-slate-100 pt-8 mt-12 text-left">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <FiShield size={14} className="text-emerald-500" />
                <span>HIPAA Secured & Signed Electronically</span>
              </div>
              <div className="text-right space-y-1">
                <div className="font-serif italic text-lg text-slate-700">Sarah Ahmed</div>
                <div className="w-32 h-px bg-slate-300 ml-auto" />
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Authorized Signature</p>
              </div>
            </div>

          </div>

          {/* Action Row for summary screen */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 print:hidden">
            <button 
              onClick={printPrescription}
              className="px-7 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-200 flex items-center gap-1.5 cursor-pointer border-none"
            >
              <FiFileText /> Print Prescription
            </button>
            <button 
              onClick={() => navigate("/")}
              className="px-7 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl cursor-pointer border-none"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
