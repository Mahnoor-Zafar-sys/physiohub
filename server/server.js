const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "premium_secret_key";

// High concurrence MySQL database pool configuration (150 limit)
const poolConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "premium_clinic",
  connectionLimit: 150,
  queueLimit: 0,
  waitForConnections: true
};

let pool;
let dbEnabled = false;

try {
  pool = mysql.createPool(poolConfig);
  pool.query("SELECT 1", (err) => {
    if (err) {
      console.warn("MySQL pool initialization: running in local mock mode as MySQL is unconfigured.");
    } else {
      dbEnabled = true;
      console.log("MySQL Database Connected successfully with 150 pool connections.");
    }
  });
} catch (e) {
  console.warn("MySQL pool init failed. Falling back to local mock layer.", e.message);
}

// In-memory fallbacks for appointment and EMR storage
let mockAppointments = [
  { id: "PC-88201", doctor: "Dr. Sarah Ahmed", date: "15 Jun, 2026", time: "04:30 PM", type: "Video Consultation", branch: "Online", status: "Confirmed", patient: "Jane Doe" },
  { id: "PC-88202", doctor: "Dr. Omar Farooq", date: "18 Jun, 2026", time: "11:30 AM", type: "In-Person Visit", branch: "Gulberg Branch", status: "Pending", patient: "Jane Doe" }
];

let mockEMR = [
  { id: "EMR-101", patientId: "Jane Doe", date: "2026-05-15", doctor: "Dr. Sarah Ahmed", diagnosis: "Mild Atopic Dermatitis", vitals: "BP: 120/80, Temp: 98.6°F", assessment: "Patient presented with dry, itchy skin patches. Prescribed topical Hydrozole cream." },
  { id: "EMR-102", patientId: "Jane Doe", date: "2026-06-01", doctor: "Dr. Omar Farooq", diagnosis: "Localized Gingivitis", vitals: "BP: 118/75, Temp: 98.4°F", assessment: "Slight inflammation in upper gums. Completed scaling and advised antiseptic mouthwash twice daily." }
];

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Premium Clinic Scale-Optimized Backend Running");
});

// 1. Auth Login Simulation (JWT generation)
app.post("/api/auth/login", (req, res) => {
  const { email, password, role } = req.body;
  const token = jwt.sign({ email, role }, JWT_SECRET, { expiresIn: "24h" });
  res.json({
    success: true,
    token,
    user: {
      email,
      role,
      name: role === "patient" ? "Jane Doe" : role === "doctor" ? "Dr. Sarah Ahmed" : role === "admin" ? "Director Admin" : "Reception Desk"
    }
  });
});

// 2. Fetch Appointments
app.get("/api/appointments", (req, res) => {
  if (dbEnabled) {
    pool.query("SELECT * FROM appointments", (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  } else {
    res.json(mockAppointments);
  }
});

// 3. Create Appointment
app.post("/api/appointments", (req, res) => {
  const { doctor, date, time, type, branch, status, patient } = req.body;
  const newAppt = {
    id: `PC-${Date.now().toString().slice(-5)}`,
    doctor,
    date,
    time,
    type,
    branch,
    status: status || "Confirmed",
    patient: patient || "Jane Doe"
  };

  if (dbEnabled) {
    pool.query(
      "INSERT INTO appointments (id, doctor, date, time, type, branch, status, patient) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [newAppt.id, doctor, date, time, type, branch, newAppt.status, newAppt.patient],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, appointment: newAppt });
      }
    );
  } else {
    mockAppointments.push(newAppt);
    res.json({ success: true, appointment: newAppt });
  }
});

// 4. Fetch EMR clinical records
app.get("/api/emr/:patientId", (req, res) => {
  const { patientId } = req.params;
  if (dbEnabled) {
    pool.query("SELECT * FROM emr_records WHERE patientId = ?", [patientId], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  } else {
    const filtered = mockEMR.filter(
      (rec) => rec.patientId.toLowerCase() === patientId.toLowerCase() || patientId === "me" || patientId === "all"
    );
    res.json(filtered);
  }
});

// 5. Append Doctor EMR Record
app.post("/api/emr", (req, res) => {
  const { patientId, doctor, diagnosis, vitals, assessment } = req.body;
  const newRec = {
    id: `EMR-${Date.now().toString().slice(-3)}`,
    patientId: patientId || "Jane Doe",
    date: new Date().toISOString().split("T")[0],
    doctor,
    diagnosis,
    vitals: vitals || "BP: 120/80, Temp: 98.6°F",
    assessment
  };

  if (dbEnabled) {
    pool.query(
      "INSERT INTO emr_records (id, patientId, date, doctor, diagnosis, vitals, assessment) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [newRec.id, newRec.patientId, newRec.date, doctor, diagnosis, newRec.vitals, assessment],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, record: newRec });
      }
    );
  } else {
    mockEMR.push(newRec);
    res.json({ success: true, record: newRec });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
