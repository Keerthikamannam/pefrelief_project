document.getElementById("volunteerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let inputs = document.querySelectorAll("#volunteerForm input, select");
  let textarea = document.querySelectorAll("#volunteerForm textarea");
  let result = document.getElementById("result");

  let valid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      valid = false;
      input.style.border = "2px solid red";
    } else {
      input.style.border = "1px solid #cbdaf5";
    }
  });

  if (!valid) {
    result.style.display = "block";
    result.innerHTML = "<p style='color:red'>Please fill all required fields!</p>";
    return;
  }

  result.style.display = "block";
  result.innerHTML = `
    <h3>Application Submitted ✅</h3>
    <p>Thank you for volunteering! We'll contact you soon.</p>
  `;
});
function goToDashboard() {
  sessionStorage.setItem("loggedIn", "true"); // ✅ ADD THIS
  window.location.href = "dashboard.html";
}