// SHOW FORM (on button click)
function showForm() {

  // hide steps section
  document.getElementById("stepsSection").style.display = "none";

  // show medical form
  const form = document.getElementById("medicalForm");
  form.style.display = "block";

  // smooth scroll
  form.scrollIntoView({ behavior: "smooth" });
}


// TOGGLE ISSUES (multi-select)
function toggleIssue(el) {
  el.classList.toggle("active");
}


// SUBMIT FORM
function submitMedical() {

  let selected = [];

  document.querySelectorAll(".issue.active").forEach(item => {
    selected.push(item.innerText.trim());
  });

  let textArea = document.querySelector("textarea");
  let text = textArea.value.trim();

  // 🚨 VALIDATION
  if (selected.length === 0) {
    alert("Please select at least one issue");
    return;
  }

  if (!text) {
    alert("Please describe your pet's condition");
    textArea.focus();
    return;
  }

  if (text.length < 10) {
    alert("Description should be at least 10 characters");
    textArea.focus();
    return;
  }

  // ✅ SUCCESS
  let result = document.getElementById("result");

  result.style.display = "block";

  result.innerHTML = `
    <h3>Consultation Requested 🐾</h3>
    <p><b>Issues:</b> ${selected.join(", ")}</p>
    <p><b>Description:</b> ${text}</p>
  `;

  result.scrollIntoView({ behavior: "smooth" });
}