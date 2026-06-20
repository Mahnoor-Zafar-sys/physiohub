# Physiohub — Advanced Rehabilitation & Physical Therapy Ecosystem

[![Vite](https://img.shields.io/badge/Vite-v8.0-blue.svg)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-v18.0-blue.svg)](https://react.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer--Motion-v11.0-pink.svg)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](#)

The **Physiohub** is a state-of-the-art digital rehabilitation platform and patient care ecosystem. It is engineered with a premium glassmorphic visual aesthetic, smooth hardware-accelerated animations, and responsive components to provide a world-class physical therapy, booking, and medical management experience.

---

## 🌟 Key Features & Systems

### 1. HD Telemedicine & Video Consultation Room
* **HIPAA-Compliant Call Simulator**: Uses HTML5 `navigator.mediaDevices.getUserMedia` to acquire active webcam permissions for the patient, alongside a looping physician video feed.
* **Interactive Triage Chatbot**: Features an active doctor chatbot that replies to user messages based on conversation progression during consultations.
* **Rx Electronic Prescriptions**: Generates a high-fidelity authorized clinical letterhead prescription containing diagnosis, medication courses (Rx), and a print button.

### 2. Micro-Interactive Gallery & Before/After Slider
* **360° Facility Virtual Tour**: Dynamic slideshow modal displaying 360-degree panoramic snapshots of modular operating theaters, lounge lobbies, and pathology labs.
* **Before/After Transformations Tool**: An interactive, draggable split-screen slider showcasing case outcomes for Dermatology, Veneers smile design, and Hair Transplant treatments.

### 3. Smart Stepper Appointment Booking
* **Dynamic Slot Booking**: Interactive multi-step form (specialist choice, branch filters, schedule slots, patient details, summary).
* **Save-To-Calendar Integration**: Automatically computes appointment slots to generate prefilled Google Calendar template URLs and download client-side `.ics` invite files.
* **WhatsApp SMS Notifications**: An animated floating alert simulator mimicking a WhatsApp booking confirmation text arriving 1.5 seconds post-submission.

### 4. Health Blog & Search Portal
* **Dynamic Article Reading**: Full article view page featuring category badges, author profiles (doctor bios with booking CTAs), and related reads.
* **Unified Social Sharing**: Integrated buttons to share health articles on Facebook, Twitter/X, LinkedIn, and WhatsApp.
* **Comment System**: Interactive comments feed with star ratings and local storage support.

### 5. Advanced Verified Patient Review Portal
* **google & facebook review grid**: Displays verified reviews and video testimonials.
* **Write a Review Widget**: A star-rating modal form that appends submissions directly into the live page feed.

### 6. Emergency Trauma & Ambulance Dispatcher
* **Live Tracker Progress**: Interactive ambulance dispatch tracking stepper displaying coordinates and coordinators.
* **First-Aid Triage Guide**: Clear instructions for cardiac distress, breathing issues, burns, and trauma bleeding.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend (Client)** | React.js 18, Vite, Framer Motion, React Router 6, Lucide React, React Icons |
| **Styling** | Vanilla CSS, Flexbox/Grid systems, glassmorphism filters, responsive layouts |
| **Backend (Server)** | Node.js, Express.js (skeletal preparation) |
| **Database** | MySQL (configured via `mysql2` and prepared models) |

---

## 📂 Project Directory Structure

```
premium-clinic-system/
├── client/
│   ├── src/
│   │   ├── components/      # Reusable UI widgets (Navbar, Footer, AIChatbot, etc.)
│   │   ├── data/            # Shared dataset database (mockData.js)
│   │   ├── pages/           # Page modules (Home, Doctors, Gallery, Emergency, etc.)
│   │   ├── App.jsx          # Central router and page route registry
│   │   └── main.jsx         # Vite entry script
│   ├── index.html           # Document root (SEO primary headers optimized)
│   └── package.json
└── server/
    ├── server.js            # Express endpoint listener
    └── package.json
```

---

## 🚀 Installation & Local Development Setup

### Prerequisites
* [Node.js](https://nodejs.org/) (v16.0 or higher recommended)
* [npm](https://www.npmjs.com/)

### 1. Clone & Navigate
```bash
git clone https://github.com/cyberlady12/premium-clinic-system.git
cd premium-clinic-system
```

### 2. Set Up the Client
```bash
cd client
npm install
```

### 3. Run Locally (Dev Mode)
If your operating system execution policies restrict scripts, or if PATH variables are not loaded by default, use the following bypass command:

**Windows PowerShell**:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User"); npm run dev
```

**Standard Terminal**:
```bash
npm run dev
```

The client will start at `http://localhost:5173`.

### 4. Build for Production
To bundle the frontend assets for deployment:
```bash
npm run build
```
The output will compile into the `dist/` directory.

---

## 🔒 HIPAA & Security Considerations
* **Webcam Feed Isolation**: Local patient video stream is rendered strictly client-side using `navigator.mediaDevices.getUserMedia` and is never sent over any network socket.
* **Signed Prescription Verification**: Prescriptions generate client-side verification signatures using session indices.
