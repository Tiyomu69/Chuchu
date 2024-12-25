const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.urlencoded({ extended: true })); // This will parse the form data

// Middleware to parse JSON bodies (in case you also need to handle JSON)
app.use(express.json());
const bodyParser = require('body-parser');

// Use body-parser to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(request, response) {
    response.send("welcome to express.this is first web server")
})

app.get('/about', function(request, response) {
    response.send("this is first path.something new")
})
app.get('/users/:userId/books/:bookId', function(request, response) {
    response.send(request.params)
})
app.listen(5000, function() {
    console.log("server is running on port 5000")

})
app.get('/GetStudents', function(req, res) {
    const fs = require('fs'); // Ensure fs is imported
    const path = require('path'); // Use for safe path handling

    fs.readFile(path.join(__dirname, "Student.json"), 'utf8', function(err, data) {
        if (err) {
            console.error("Error reading file:", err); // Log the error
            res.status(500).json({
                'status': false,
                'Status_Code': 500,
                'message': "Internal Server Error",
            });
            return;
        }

        const studentData = JSON.parse(data); // Safely parse JSON data

        res.json({
            'status': true,
            'Status_Code': 200,
            'requested_at': new Date().toISOString(), // Replace req.localtime with current time
            'requrl': req.url,
            'request_Method': req.method,
            'studentdata': studentData
        });
    });
});
app.get('/GetStudentid/:id', (req, res) => {
    const fs = require('fs'); // Ensure fs is required
    const path = require('path'); // Safe path handling

    fs.readFile(path.join(__dirname, "student.json"), 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err); // Log the error
            res.status(500).json({
                'status': false,
                'Status_Code': 500,
                'message': "Internal Server Error"
            });
            return;
        }

        let students;
        try {
            students = JSON.parse(data); // Safely parse JSON
        } catch (error) {
            res.status(500).json({
                'status': false,
                'Status_Code': 500,
                'message': "Error parsing JSON data"
            });
            return;
        }

        // Search for the student by ID
        const studentKey = "Student" + req.params.id;
        const student = students[studentKey];

        if (student) {
            res.json({
                'status': true,
                'Status_Code': 200,
                'requested_at': new Date().toISOString(),
                'requrl': req.url,
                'request_Method': req.method,
                'studentdata': student
            });
        } else {
            res.status(404).json({
                'status': false,
                'Status_Code': 404,
                'message': `Student with ID ${req.params.id} not found`,
                'requested_at': new Date().toISOString(),
                'requrl': req.url,
                'request_Method': req.method
            });
        }
    });
});

app.get('/studentinfo', function(req, res) {
    res.sendFile('Studentinfo.html', { root: __dirname });
})
app.post('/submit-data', function(req, res) {
    const firstName = req.body.firstName || 'Unknown';
    const lastName = req.body.lastName || 'Unknown';
    const age = req.body.myAge || 'Unknown';
    const gender = req.body.gender || 'Unknown';
    const qualifications = req.body.Qual || [];

    const name = `${firstName} ${lastName}`;
    const ageDetails = `${age} Gender: ${gender}`;
    const qualificationList = qualifications.join(', ') || 'None';

    res.send({
        status: true,
        message: 'Form Details',
        data: {
            name: name,
            age: ageDetails,
            qualifications: qualificationList
        }
    });
});