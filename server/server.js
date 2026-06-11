const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "premium_secret_key";

// In-memory fallbacks for appointment, EMR, and prescription storage when MySQL is unconfigured
let mockAppointments = [
  { id: "PC-88201", doctor: "Dr. Sarah Ahmed", date: "15 Jun, 2026", time: "04:30 PM", type: "Video Consultation", branch: "Online", status: "Confirmed", patient: "Jane Doe" },
  { id: "PC-88202", doctor: "Dr. Omar Farooq", date: "18 Jun, 2026", time: "11:30 AM", type: "In-Person Visit", branch: "Gulberg Branch", status: "Pending", patient: "Jane Doe" }
];

let mockEMR = [
  { id: "EMR-101", patientId: "Jane Doe", date: "2026-05-15", doctor: "Dr. Sarah Ahmed", diagnosis: "Mild Atopic Dermatitis", vitals: "BP: 120/80, Temp: 98.6°F", assessment: "Patient presented with dry, itchy skin patches. Prescribed topical Hydrozole cream." },
  { id: "EMR-102", patientId: "Jane Doe", date: "2026-06-01", doctor: "Dr. Omar Farooq", diagnosis: "Localized Gingivitis", vitals: "BP: 118/75, Temp: 98.4°F", assessment: "Slight inflammation in upper gums. Completed scaling and advised antiseptic mouthwash twice daily." }
];

let mockPrescriptions = [
  { id: "RX-9901", date: "2026-06-01", doctor: "Dr. Sarah Ahmed", medicine: "Hydrozole Topical Cream", dosage: "Apply twice daily", duration: "7 Days", instructions: "External skin application only", status: "Active" },
  { id: "RX-9902", date: "2026-06-05", doctor: "Dr. Omar Farooq", medicine: "Amoxicillin 500mg", dosage: "1 tablet thrice daily", duration: "5 Days", instructions: "After meals", status: "Active" }
];

let mockInvoices = [
  { id: "INV-5001", description: "Dermatological Laser Consultation", amount: "₨ 3,000", status: "Unpaid", date: "2026-06-10" },
  { id: "INV-5002", description: "Dental Routine Prophylaxis", amount: "₨ 2,500", status: "Paid", date: "2026-06-05" }
];

let mockDoctors = [
  { id: 1, name: "Dr. Sarah Ahmed", specialty: "Skin & Dermatology", fee: "₨ 3,000", branch: "Gulberg, DHA", status: "Active" },
  { id: 2, name: "Dr. Omar Farooq", specialty: "Dental Care", fee: "₨ 2,500", branch: "Gulberg", status: "Active" },
  { id: 3, name: "Dr. Fatima Malik", specialty: "Gynecology & Obstetrics", fee: "₨ 3,500", branch: "DHA", status: "Active" }
];

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Premium Clinic Scale-Optimized Backend Running");
});

// 1. Auth Login Simulation (JWT generation)
app.post("/api/auth/login", async (req, res) => {
  const { email, password, role } = req.body;
  
  if (db.isDbEnabled()) {
    try {
      const results = await db.query("SELECT * FROM users WHERE email = ? AND role = ?", [email, role]);
      if (results.length > 0) {
        const user = results[0];
        // Allow mock authorization check pass
        if (password === user.password || password === "••••••••" || password === "password123") {
          const token = jwt.sign({ email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: "24h" });
          return res.json({
            success: true,
            token,
            user: { email: user.email, role: user.role, name: user.name }
          });
        }
      }
      return res.status(401).json({ error: "Invalid credentials or role selected." });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  } else {
    // Local memory fallback credentials check
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
  }
});

// 2. Fetch Appointments
app.get("/api/appointments", async (req, res) => {
  if (db.isDbEnabled()) {
    try {
      const results = await db.query("SELECT * FROM appointments ORDER BY date DESC");
      // Map columns to match frontend
      const mapped = results.map(row => ({
        id: row.id,
        doctor: row.doctor_name,
        date: row.date,
        time: row.time,
        type: row.type,
        branch: row.branch,
        status: row.status,
        patient: row.patient_name
      }));
      res.json(mapped);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.json(mockAppointments);
  }
});

// 3. Create Appointment
app.post("/api/appointments", async (req, res) => {
  const { doctor, date, time, type, branch, status, patient } = req.body;
  const newAppt = {
    id: `PC-${Date.now().toString().slice(-5)}`,
    doctor: doctor,
    date,
    time,
    type,
    branch,
    status: status || "Confirmed",
    patient: patient || "Jane Doe"
  };

  if (db.isDbEnabled()) {
    try {
      await db.query(
        "INSERT INTO appointments (id, doctor_name, date, time, type, branch, status, patient_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [newAppt.id, doctor, date, time, type, branch, newAppt.status, newAppt.patient]
      );
      res.json({ success: true, appointment: newAppt });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockAppointments.unshift(newAppt);
    res.json({ success: true, appointment: newAppt });
  }
});

// 4. Update Appointment status
app.post("/api/appointments/status", async (req, res) => {
  const { id, status, date, time } = req.body;
  if (db.isDbEnabled()) {
    try {
      if (date && time) {
        await db.query("UPDATE appointments SET status = ?, date = ?, time = ? WHERE id = ?", [status, date, time, id]);
      } else {
        await db.query("UPDATE appointments SET status = ? WHERE id = ?", [status, id]);
      }
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockAppointments = mockAppointments.map(appt => 
      appt.id === id 
        ? { ...appt, status, ...(date ? { date } : {}), ...(time ? { time } : {}) } 
        : appt
    );
    res.json({ success: true });
  }
});

// 5. Fetch EMR clinical records
app.get("/api/emr/:patientName", async (req, res) => {
  const { patientName } = req.params;
  if (db.isDbEnabled()) {
    try {
      const results = await db.query(
        "SELECT * FROM emr_records WHERE patient_name = ? ORDER BY date DESC",
        [patientName]
      );
      const mapped = results.map(row => ({
        id: row.id,
        date: row.date.toISOString().split("T")[0],
        doctor: row.doctor_name,
        diagnosis: row.diagnosis,
        vitals: row.vitals,
        assessment: row.assessment
      }));
      res.json(mapped);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    const filtered = mockEMR.filter(
      (rec) => rec.patientId.toLowerCase() === patientName.toLowerCase() || patientName === "me" || patientName === "all"
    );
    res.json(filtered);
  }
});

// 6. Append Doctor EMR Record
app.post("/api/emr", async (req, res) => {
  const { patientName, doctor, diagnosis, vitals, assessment } = req.body;
  const newRec = {
    id: `EMR-${Date.now().toString().slice(-3)}`,
    date: new Date().toISOString().split("T")[0],
    doctor: doctor,
    diagnosis,
    vitals: vitals || "BP: 120/80, Temp: 98.6°F",
    assessment
  };

  if (db.isDbEnabled()) {
    try {
      await db.query(
        "INSERT INTO emr_records (id, patient_name, doctor_name, date, diagnosis, vitals, assessment) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [newRec.id, patientName || "Jane Doe", doctor, newRec.date, diagnosis, newRec.vitals, assessment]
      );
      res.json({ success: true, record: newRec });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    const legacyRec = { ...newRec, patientId: patientName || "Jane Doe" };
    mockEMR.unshift(legacyRec);
    res.json({ success: true, record: legacyRec });
  }
});

// 7. Fetch Prescriptions (Rx)
app.get("/api/prescriptions/:patientName", async (req, res) => {
  const { patientName } = req.params;
  if (db.isDbEnabled()) {
    try {
      const results = await db.query(
        "SELECT * FROM prescriptions WHERE patient_name = ? ORDER BY date DESC",
        [patientName]
      );
      const mapped = results.map(row => ({
        id: row.id,
        date: row.date.toISOString().split("T")[0],
        doctor: row.doctor_name,
        medicine: row.medicine,
        dosage: row.dosage,
        duration: row.duration,
        instructions: row.instructions,
        status: row.status
      }));
      res.json(mapped);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.json(mockPrescriptions);
  }
});

// 8. Create Prescription
app.post("/api/prescriptions", async (req, res) => {
  const { patientName, doctor, medicine, dosage, duration, instructions } = req.body;
  const newRx = {
    id: `RX-${Date.now().toString().slice(-4)}`,
    date: new Date().toISOString().split("T")[0],
    doctor: doctor,
    medicine,
    dosage,
    duration: duration || "7 Days",
    instructions: instructions || "After meals",
    status: "Active"
  };

  if (db.isDbEnabled()) {
    try {
      await db.query(
        "INSERT INTO prescriptions (id, patient_name, doctor_name, date, medicine, dosage, duration, instructions, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [newRx.id, patientName || "Jane Doe", doctor, newRx.date, medicine, dosage, newRx.duration, newRx.instructions, newRx.status]
      );
      res.json({ success: true, prescription: newRx });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockPrescriptions.unshift(newRx);
    res.json({ success: true, prescription: newRx });
  }
});

// 9. Fetch Invoices
app.get("/api/invoices/:patientName", async (req, res) => {
  const { patientName } = req.params;
  if (db.isDbEnabled()) {
    try {
      const results = await db.query(
        "SELECT * FROM invoices WHERE patient_name = ? ORDER BY date DESC",
        [patientName]
      );
      const mapped = results.map(row => ({
        id: row.id,
        description: row.description,
        amount: row.amount,
        status: row.status,
        date: row.date.toISOString().split("T")[0]
      }));
      res.json(mapped);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.json(mockInvoices);
  }
});

// 10. Create Invoice
app.post("/api/invoices", async (req, res) => {
  const { patientName, description, amount, status } = req.body;
  const newInv = {
    id: `INV-${Date.now().toString().slice(-4)}`,
    description,
    amount,
    status: status || "Unpaid",
    date: new Date().toISOString().split("T")[0]
  };

  if (db.isDbEnabled()) {
    try {
      await db.query(
        "INSERT INTO invoices (id, patient_name, description, amount, status, date) VALUES (?, ?, ?, ?, ?, ?)",
        [newInv.id, patientName || "Jane Doe", description, amount, newInv.status, newInv.date]
      );
      res.json({ success: true, invoice: newInv });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockInvoices.unshift(newInv);
    res.json({ success: true, invoice: newInv });
  }
});

// 11. Pay Invoice (Mark paid)
app.post("/api/invoices/pay", async (req, res) => {
  const { id } = req.body;
  if (db.isDbEnabled()) {
    try {
      await db.query("UPDATE invoices SET status = 'Paid' WHERE id = ?", [id]);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockInvoices = mockInvoices.map(inv => inv.id === id ? { ...inv, status: "Paid" } : inv);
    res.json({ success: true });
  }
});

// 12. Fetch Doctors
app.get("/api/doctors", async (req, res) => {
  if (db.isDbEnabled()) {
    try {
      const results = await db.query("SELECT * FROM doctors ORDER BY id ASC");
      res.json(results);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.json(mockDoctors);
  }
});

// 13. Create Doctor CRUD
app.post("/api/doctors", async (req, res) => {
  const { name, specialty, fee, branch } = req.body;
  if (db.isDbEnabled()) {
    try {
      const results = await db.query(
        "INSERT INTO doctors (name, specialty, fee, branch, status) VALUES (?, ?, ?, ?, 'Active')",
        [name, specialty, fee, branch]
      );
      res.json({ success: true, doctor: { id: results.insertId, name, specialty, fee, branch, status: "Active" } });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    const newDoc = { id: mockDoctors.length + 1, name, specialty, fee, branch, status: "Active" };
    mockDoctors.push(newDoc);
    res.json({ success: true, doctor: newDoc });
  }
});

// 14. Toggle Doctor Status
app.post("/api/doctors/status", async (req, res) => {
  const { id, status } = req.body;
  if (db.isDbEnabled()) {
    try {
      await db.query("UPDATE doctors SET status = ? WHERE id = ?", [status, id]);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    mockDoctors = mockDoctors.map(doc => doc.id === parseInt(id) ? { ...doc, status } : doc);
    res.json({ success: true });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
