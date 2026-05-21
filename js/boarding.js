let selectedTab = "overnight";

// WAIT FOR DOM LOAD
document.addEventListener("DOMContentLoaded", () => {

  // DAYCARE OPTION BUTTONS
  document.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("active"));
      this.classList.add("active");
    });
  });

});
function submitForm() {

  let form = document.getElementById(selectedTab + "Form");

  // GET LOCATION
  let locationInput = form.querySelector("input[type='text']");
  let location = locationInput ? locationInput.value.trim() : "";

  // GET DATES
  let dates = form.querySelectorAll("input[type='date']");
  let date1 = dates[0]?.value;
  let date2 = dates[1]?.value;

  // GET PET COUNTS
  let dogs = parseInt(document.getElementById("dogs").innerText);
  let cats = parseInt(document.getElementById("cats").innerText);

  // GET SERVICES
  let services = getSelectedServices();

  // GET TIME (ONLY FOR OVERNIGHT)
  let checkinTime = "";
  let checkoutTime = "";

  if (selectedTab === "overnight") {
    checkinTime = document.getElementById("checkintime").value;
    checkoutTime = document.getElementById("checkouttime").value;
  }

  // 🚨 VALIDATION (ALL FIELDS CHECKED TOGETHER)
  let isValid = true;

  if (!location) isValid = false;
  if (!date1 || !date2) isValid = false;

  if (selectedTab === "overnight") {
    if (checkinTime === "Check-In Time" || checkoutTime === "Check-Out Time") {
      isValid = false;
    }
  }

  if (dogs === 0 && cats === 0) isValid = false;
  if (services.length === 0) isValid = false;

  // ❌ SINGLE ALERT
  if (!isValid) {
    alert("Please enter all fields");
    return;
  }

  // ✅ SHOW RESULT
  let result = document.getElementById("result");
  result.style.display = "block";

  result.innerHTML = `
    <h3>Service Allocated ✅</h3>
    <p><b>Type:</b> ${selectedTab}</p>
    <p><b>Services:</b> ${services.join(", ")}</p>
    <p><b>Location:</b> ${location}</p>
    <p><b>Dogs:</b> ${dogs}</p>
    <p><b>Cats:</b> ${cats}</p>
  `;
}
// SWITCH TAB
function switchTab(event, type) {
  selectedTab = type;

  document.querySelectorAll(".tab").forEach(btn => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");

  document.getElementById("overnightForm").style.display =
    type === "overnight" ? "block" : "none";

  document.getElementById("daycareForm").style.display =
    type === "daycare" ? "block" : "none";
}


// COUNTER
function changeCount(type, value) {
  let el = document.getElementById(type);
  let count = parseInt(el.innerText);

  count += value;
  if (count < 0) count = 0;

  el.innerText = count;
}


// GET SERVICES
function getSelectedServices() {
  let services = [];
  document.querySelectorAll(".service input:checked").forEach(cb => {
    services.push(cb.value);
  });
  return services;
}

