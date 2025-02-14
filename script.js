const apiUrl = "https://your-backend-url.onrender.com/students";

// Display Date and Time
function updateTime() {
    const datetime = document.getElementById('datetime');
    const now = new Date();
    datetime.innerHTML = now.toLocaleString();
}
setInterval(updateTime, 1000);

// Fetch and Display Students
async function fetchStudents() {
    const response = await fetch(apiUrl);
    const students = await response.json();
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = '';

    students.forEach(student => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${student.name}</span>
            <button class="delete" onclick="deleteStudent(${student.id})">Delete</button>
        `;
        studentList.appendChild(li);
    });
}

// Add Student
document.getElementById('addStudent').addEventListener('click', async () => {
    const studentName = document.getElementById('studentName').value;
    if (studentName.trim() !== '') {
        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: studentName })
        });
        document.getElementById('studentName').value = '';
        fetchStudents();
    }
});

// Delete Student
async function deleteStudent(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    fetchStudents();
}

// Initial Fetch
fetchStudents();
