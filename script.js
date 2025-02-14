async function markAttendance() {
    const studentName = document.getElementById('studentName').value;
    const status = document.getElementById('attendanceStatus').value;

    if (!studentName) {
        alert('Please enter a student name.');
        return;
    }

    const response = await fetch('http://localhost:5000/mark-attendance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentName, status }),
    });

    if (response.ok) {
        alert('Attendance marked successfully!');
        document.getElementById('studentName').value = '';
        fetchAttendance();
    } else {
        alert('Failed to mark attendance.');
    }
}

async function fetchAttendance() {
    const response = await fetch('http://localhost:5000/attendance');
    const data = await response.json();
    const tableBody = document.querySelector('#attendanceTable tbody');
    tableBody.innerHTML = '';

    data.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.studentName}</td>
            <td>${record.status}</td>
            <td>${record.timestamp}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Fetch attendance records on page load
document.addEventListener('DOMContentLoaded', fetchAttendance);