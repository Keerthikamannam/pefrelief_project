document.addEventListener("DOMContentLoaded", function () {

  // TAB SWITCHING
  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", function () {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // BUTTON CLICK
  const btn = document.querySelector(".book-btn");

  if (btn) {
    btn.addEventListener("click", bookTraining);
  }

});


// GET SELECTED TRAINING TYPES
function getSelectedTypes() {
  let selected = [];

  document.querySelectorAll(".training-types input:checked").forEach(cb => {
    selected.push(cb.parentElement.innerText.trim());
  });

  return selected;
}


// MAIN FUNCTION
function bookTraining() {

  let inputs = document.querySelectorAll(".row input");

  let location = inputs[0]?.value.trim();
  let breed = inputs[1]?.value.trim();

  let tab = document.querySelector(".tab.active")?.innerText || "";

  let types = getSelectedTypes();

  let result = document.getElementById("result");

  if (!result) {
    alert("Result container missing!");
    return;
  }

  // 🚨 VALIDATION (ALL TOGETHER)
  let isValid = true;

  if (!tab) isValid = false;
  if (!location) isValid = false;
  if (!breed || breed.length < 3) isValid = false;
  if (types.length === 0) isValid = false;

  // ❌ SINGLE ALERT
  if (!isValid) {
    alert("Please enter all fields");
    return;
  }

  // ✅ SUCCESS
  result.style.display = "block";

  result.innerHTML = `
    <h3>Dog Training Booked Successfully 🐶</h3>
    <p><b>Training Type:</b> ${tab}</p>
    <p><b>Selected Programs:</b> ${types.join(", ")}</p>
    <p><b>Location:</b> ${location}</p>
    <p><b>Breed:</b> ${breed}</p>
  `;

  result.scrollIntoView({ behavior: "smooth" });
}