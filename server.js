const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let students = [];
let id = 1;

app.get('/students', (req, res) => {
    res.json(students);
});

app.post('/students', (req, res) => {
    const student = { id: id++, name: req.body.name };
    students.push(student);
    res.status(201).json(student);
});

app.delete('/students/:id', (req, res) => {
    students = students.filter(s => s.id !== parseInt(req.params.id));
    res.status(204).send();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
