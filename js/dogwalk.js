function selectDays(btn) {
  document.querySelectorAll(".days button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function bookWalk() {

  let location = document.querySelector("input[type='text']").value.trim();
  let date = document.querySelector("input[type='date']").value;

  let selectedDayBtn = document.querySelector(".days button.active");
  let days = selectedDayBtn ? selectedDayBtn.innerText : "";

  // 🚨 VALIDATION (ALL CHECKED TOGETHER)
  let isValid = true;

  if (!location) isValid = false;
  if (!date) isValid = false;
  if (!days) isValid = false;

  // ❌ SINGLE ALERT
  if (!isValid) {
    alert("Please enter all fields");
    return;
  }

  // ✅ SUCCESS OUTPUT
  let result = document.getElementById("result");

  result.style.display = "block";

  result.innerHTML = `
    <h3>Dog Walk Booked Successfully 🐶</h3>
    <p><b>Location:</b> ${location}</p>
    <p><b>Start Date:</b> ${date}</p>
    <p><b>Duration:</b> ${days}</p>
  `;

  result.scrollIntoView({ behavior: "smooth" });
}