const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory storage for attendance records
let attendanceRecords = [];

// API to mark attendance
app.post('/mark-attendance', (req, res) => {
    const { studentName, status } = req.body;
    const timestamp = new Date().toLocaleString();
    attendanceRecords.push({ studentName, status, timestamp });
    res.status(200).json({ message: 'Attendance marked successfully!' });
});

// API to get all attendance records
app.get('/attendance', (req, res) => {
    res.status(200).json(attendanceRecords);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});