function calculateMarks() {
 
  let math = parseInt(document.getElementById("math").value);
  let science = parseInt(document.getElementById("science").value);
  let english = parseInt(document.getElementById("english").value);

  let total = math + science + english;
  let average = total / 3;

  let grade;
  if (average >= 90) {
    grade = "A+";
  } else if (average >= 75) {
    grade = "A";
  } else if (average >= 50) {
    grade = "B";
  } else {
    grade = "Fail";
  }
  document.getElementById("result").innerText =
    "Total: " + total + " | Average: " + average.toFixed(2) + " | Grade: " + grade;
}
