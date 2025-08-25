let marks = [45, 72, 88, 61, 95];
document.getElementById("marks-display").innerText = "Marks: " + marks.join(", ");
let highest = marks[0];
for (let i = 0; i < marks.length; i++) {
  if (marks[i] > highest) {
    highest = marks[i];
  }
}
document.getElementById("highest-mark").innerText = "Highest mark is: " + highest;
