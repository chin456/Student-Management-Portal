// Get references to the form and table body
const studentForm = document.getElementById('studentForm');
const tableBody = document.getElementById('studentTableBody');

// Load existing student data from local storage when the page loads
document.addEventListener('DOMContentLoaded', function() {
    if (tableBody) { // Check if tableBody exists
        const savedStudents = JSON.parse(localStorage.getItem('students')) || [];
        savedStudents.forEach(student => addStudentToTable(student));
    }
});

// Handle form submission
if (studentForm) {
    studentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const studentData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            studentId: document.getElementById('studentId').value,
            course: document.getElementById('course').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };

        // Adding the new student to the table if tableBody exists
        if (tableBody) {
            addStudentToTable(studentData);

            // Save the updated student data to local storage
            saveStudentData(studentData);
        }

        // Clear the form fields after submission
        studentForm.reset();
    });
}

// Function to add a student to the table
function addStudentToTable(student) {
    if (tableBody) { 
        const newRow = tableBody.insertRow();
        newRow.insertCell(0).innerText = student.firstName;
        newRow.insertCell(1).innerText = student.lastName;
        newRow.insertCell(2).innerText = student.studentId;
        newRow.insertCell(3).innerText = student.course;
        newRow.insertCell(4).innerText = student.email;
        newRow.insertCell(5).innerText = student.phone;
    }
}

// Function to save student data to local storage
function saveStudentData(student) {
    const savedStudents = JSON.parse(localStorage.getItem('students')) || [];
    savedStudents.push(student);
    localStorage.setItem('students', JSON.stringify(savedStudents));
}

// search functionality 
if (document.getElementById('searchInput')) {
    document.getElementById('searchInput').addEventListener('input', function() {
        if (tableBody) {
            const searchValue = this.value.toLowerCase();
            const rows = tableBody.getElementsByTagName('tr');

            for (let i = 0; i < rows.length; i++) {
                const studentIdCell = rows[i].getElementsByTagName('td')[2];
                if (studentIdCell) {
                    const studentId = studentIdCell.textContent || studentIdCell.innerText;
                    if (studentId.toLowerCase().indexOf(searchValue) > -1) {
                        rows[i].style.display = "";
                    } else {
                        rows[i].style.display = "none";
                    }
                }
            }
        }
    });
}
