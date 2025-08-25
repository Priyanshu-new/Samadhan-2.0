let student = {
  name: "Rahul Sharma",
  age: 20,
  grade: "A",
  course: "Computer Science"
};
function showStudent() {
  let infoBox = document.getElementById("student-info");
  
  infoBox.innerHTML = `
    <p><strong>Name:</strong> ${student.name}</p>
    <p><strong>Age:</strong> ${student.age}</p>
    <p><strong>Grade:</strong> ${student.grade}</p>
    <p><strong>Course:</strong> ${student.course}</p>
  `;
}
