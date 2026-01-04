const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");


let students = JSON.parse(localStorage.getItem("students")) || [];


function displayStudents() {
    table.innerHTML = "";
    students.forEach((student, index) => {
        table.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.major}</td>
                <td>${student.gpa}</td>
                <td class="delete" onclick="deleteStudent(${index})">❌</td>
            </tr>
        `;
    });
}


form.addEventListener("submit", function(e) {
    e.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        id: document.getElementById("id").value,
        major: document.getElementById("major").value,
        gpa: document.getElementById("gpa").value
    };

    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
    form.reset();
});


function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}


displayStudents();
