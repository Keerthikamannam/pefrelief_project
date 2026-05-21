// SHOW FORM
function showForm() {
  const form = document.getElementById("formSection");
  form.style.display = "block";

  form.scrollIntoView({ behavior: "smooth" });
}


// APPLY FILTER
function applyFilter() {

  let selects = document.querySelectorAll("select");

  let pet = selects[0].value;
  let gender = selects[1].value;
  let breed = selects[2].value;
  let state = selects[3].value;
  let city = selects[4].value;

  let result = document.getElementById("result");

  // 🚨 VALIDATION (ALL FIELDS REQUIRED)
  let isValid = true;

  if (!pet) isValid = false;
  if (!gender) isValid = false;
  if (!breed) isValid = false;
  if (!state) isValid = false;
  if (!city) isValid = false;

  // ❌ SINGLE ALERT
  if (!isValid) {
    alert("Please enter all fields");
    return;
  }

  // ✅ SUCCESS
  result.style.display = "block";

  result.innerHTML = `
    <h3>Match Search Applied 🐾</h3>
    <p><b>Pet:</b> ${pet}</p>
    <p><b>Gender:</b> ${gender}</p>
    <p><b>Breed:</b> ${breed}</p>
    <p><b>State:</b> ${state}</p>
    <p><b>City:</b> ${city}</p>
  `;

  result.scrollIntoView({ behavior: "smooth" });
}