import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiX, FiSend, FiCpu, FiInfo, FiActivity } from "react-icons/fi";
import { FaUserMd, FaHospital, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I am your Physiohub AI Assistant. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Scroll messages to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const responses = {
    symptoms: [
      { keywords: ["fever", "cough", "flu", "cold", "headache", "throat"], text: "If you are experiencing mild cold, flu-like symptoms, or a fever, we recommend checking your temperature regularly, staying hydrated, and resting. However, to get a proper diagnosis, you should consult a specialist. Would you like to schedule a virtual consult with our physicians?" },
      { keywords: ["chest pain", "breathing", "severe", "choking", "unconscious", "accident", "bleeding", "stroke", "heart attack"], text: "⚠️ CRITICAL WARNING: If you or someone nearby is experiencing chest pain, difficulty breathing, or any other severe symptoms, please immediately click our red SOS Emergency button, go to the nearest emergency room, or call 1122 / 911. Do not rely on AI for emergencies." }
    ],
    bookings: {
      keywords: ["book", "appointment", "schedule", "doctor", "consultation", "physician", "meet"],
      text: "You can book an appointment with our highly experienced specialists. We offer in-person visits at our branches and virtual consultations. Click below to go to our booking portal.",
      action: { label: "Go to Booking Portal", path: "/book-appointment" }
    },
    branches: {
      keywords: ["branch", "location", "address", "where", "islamabad", "blue area", "dha"],
      text: "Vital Physio Hub is conveniently located in Islamabad:\n• Main Branch: 2nd Floor Allegiance Tower, New Blue Area, Islamabad\n• DHA Branch: DHA Phase 2, Islamabad\nWould you like to contact us?",
      action: { label: "Contact Us", path: "/contact" }
    },
    fallback: "I understand. As an AI health assistant, I can provide general health information, but cannot replace a doctor's diagnosis. If you have active health concerns, we strongly recommend consulting our specialists."
  };

  const handleSendMessage = (textToSend) => {
    if (!textToSend.trim()) return;

    const newMsg = {
      sender: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      let botResponse = responses.fallback;
      let botAction = null;
      const lowerText = textToSend.toLowerCase();

      // Check symptoms
      const symptomMatch = responses.symptoms.find((s) =>
        s.keywords.some((keyword) => lowerText.includes(keyword))
      );
      if (symptomMatch) {
        botResponse = symptomMatch.text;
      } else if (responses.bookings.keywords.some((k) => lowerText.includes(k))) {
        botResponse = responses.bookings.text;
        botAction = responses.bookings.action;
      } else if (responses.branches.keywords.some((k) => lowerText.includes(k))) {
        botResponse = responses.branches.text;
        botAction = responses.branches.action;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botResponse,
          action: botAction,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleShortcutClick = (shortcut) => {
    if (shortcut === "symptoms") {
      handleSendMessage("I want to check my symptoms.");
    } else if (shortcut === "book") {
      handleSendMessage("How do I book an appointment?");
    } else if (shortcut === "branches") {
      handleSendMessage("Where are your branch locations?");
    }
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[200] font-sans text-left flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="w-[340px] sm:w-[400px] h-[520px] sm:h-[550px] bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden mb-1"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-sky-500 to-pink-500 text-white flex justify-between items-center relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center relative">
                  <FiCpu className="text-white text-lg animate-pulse" />
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm tracking-tight leading-tight">Physiohub AI Assist</h3>
                  <span className="text-[9px] font-bold tracking-wider uppercase text-sky-100 flex items-center gap-1">
                    <FiActivity size={10} className="animate-pulse" /> Clinical Guard Enabled
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white border-none cursor-pointer transition-colors"
              >
                <FiX size={16} />
              </button>
            </div>

            {/* Medical Disclaimer Banner */}
            <div className="px-4 py-2 bg-amber-50 border-b border-slate-100 flex items-start gap-2 text-[10px] text-amber-700 font-semibold leading-relaxed">
              <FiInfo className="shrink-0 mt-0.5" size={12} />
              <p>Disclaimer: AI answers are guidance only. For emergencies, please call our SOS panel immediately.</p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm font-medium ${
                      msg.sender === "user"
                        ? "bg-slate-900 text-white rounded-tr-none"
                        : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    
                    {msg.action && (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          navigate(msg.action.path);
                        }}
                        className="mt-3 w-full py-2 bg-gradient-to-r from-sky-400 to-pink-500 hover:opacity-90 text-white rounded-lg font-bold text-[10px] border-none cursor-pointer transition-opacity"
                      >
                        {msg.action.label}
                      </button>
                    )}

                    <span
                      className={`text-[8px] font-bold block mt-1.5 text-right ${
                        msg.sender === "user" ? "text-slate-400" : "text-slate-400"
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-slate-400 border border-slate-100 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Shortcuts row */}
            <div className="px-4 py-2 border-t border-slate-100 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none bg-white">
              <button
                onClick={() => handleShortcutClick("symptoms")}
                className="px-2.5 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-full text-[10px] font-bold border-none cursor-pointer flex items-center gap-1 transition-colors"
              >
                <FaUserMd size={10} /> Check Symptoms
              </button>
              <button
                onClick={() => handleShortcutClick("book")}
                className="px-2.5 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-full text-[10px] font-bold border-none cursor-pointer flex items-center gap-1 transition-colors"
              >
                <FiMessageSquare size={10} /> Book Doctor
              </button>
              <button
                onClick={() => handleShortcutClick("branches")}
                className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold border-none cursor-pointer flex items-center gap-1 transition-colors"
              >
                <FaHospital size={10} /> Clinics List
              </button>
            </div>

            {/* Input form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputVal);
              }}
              className="p-3 bg-white border-t border-slate-100 flex gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask clinical queries..."
                className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-pink-400 transition-colors"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-pink-500 text-white flex items-center justify-center border-none cursor-pointer transition-colors shrink-0 shadow-md"
              >
                <FiSend size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vertical Stack of Floating Action Buttons */}
      <div className="flex flex-col items-center gap-3">
        {/* 1st Icon (Top): WhatsApp Button */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-14 h-14 bg-green-500 rounded-full animate-ping opacity-35 pointer-events-none" />
          <motion.a
            href="https://wa.me/923008786187?text=Hello%20Vital%20Physio%20Hub%2C%20I%20want%20to%20inquire%20about%20your%20physical%20therapy%20services."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#20ba5a] transition-colors cursor-pointer group"
            style={{
              boxShadow: "0 8px 24px -4px rgba(37, 211, 102, 0.45)"
            }}
            aria-label="WhatsApp Chat"
          >
            <FaWhatsapp size={28} />
            <span className="absolute right-16 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 pointer-events-none transition-all duration-200">
              WhatsApp Chat
            </span>
          </motion.a>
        </div>

        {/* 2nd Icon (Bottom): AI Chatbot Message Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-to-br from-sky-500 to-pink-500 rounded-full flex items-center justify-center text-white border border-white/20 shadow-2xl relative cursor-pointer"
          style={{
            boxShadow: "0 10px 30px -5px rgba(233, 30, 140, 0.4), inset 0 2px 4px rgba(255,255,255,0.4)"
          }}
          aria-label="AI Chat Assistant"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <FiX size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="message"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                <FiMessageSquare size={24} />
                {/* Sparkle badge */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-[10px] text-slate-900 border-2 border-white font-extrabold animate-bounce">
                  ✨
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
