let selectedAmount = 0;

// RUN AFTER PAGE LOAD
document.addEventListener("DOMContentLoaded", function () {

    let pet = localStorage.getItem("selectedPet");
    let petText = document.getElementById("selectedPetText");

    // SHOW ONLY IF PET EXISTS
    if (pet) {
        petText.innerText = "💙 Sponsoring: " + pet;
        petText.style.display = "block";
    } else {
        petText.style.display = "none";
    }

    // START COUNTERS
    animateCounter("dogs", 62000000);
    animateCounter("cats", 9100000);
    animateCounter("others", 8800000);
});


// SELECT AMOUNT
function selectAmount(btn, amount) {

  document.querySelectorAll(".amounts button").forEach(b => {
    b.classList.remove("active");
  });

  btn.classList.add("active");
  selectedAmount = amount;

  document.getElementById("donationAmount").value = amount;
}


// OPEN MODAL
function openModal() {
  document.getElementById("modal").style.display = "flex";

  if (selectedAmount) {
    document.getElementById("donationAmount").value = selectedAmount;
  }
}


// CLOSE MODAL
function closeModal() {
  document.getElementById("modal").style.display = "none";
}


// PAYMENT FUNCTION
function payNow() {
  let amount = document.getElementById("donationAmount").value;

  if (!amount || amount <= 0) {
    alert("Please enter valid amount");
    return;
  }

  let pet = localStorage.getItem("selectedPet");

  if (pet) {
    // PET-SPECIFIC DONATION
    alert(`💙 Thank you for donating ₹${amount} for ${pet}!`);
  } else {
    // GENERAL DONATION
    alert(`💙 Thank you for donating ₹${amount}!`);
  }

  // CLEAR PET AFTER USE (IMPORTANT)
  localStorage.removeItem("selectedPet");

  closeModal();
}


// ANIMATED COUNTERS
function animateCounter(id, target) {

  let element = document.getElementById(id);
  let count = 0;
  let speed = target / 100;

  let interval = setInterval(() => {
    count += speed;

    if (count >= target) {
      element.innerText = formatNumber(target);
      clearInterval(interval);
    } else {
      element.innerText = formatNumber(Math.floor(count));
    }

  }, 20);
}


// FORMAT NUMBERS (62M style)
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  return num;
}
window.onload = function () {

    const fromSponsor = sessionStorage.getItem("fromSponsor");
    const pet = sessionStorage.getItem("selectedPet");

    const title = document.querySelector(".sponsor-title") || document.querySelector("h2");

    // ❌ if NOT coming from sponsor → hide
    if (!fromSponsor || !pet) {
        if (title) title.style.display = "none";
        return;
    }

    // ✅ show pet name
    document.getElementById("selectedPetName").innerText = pet;

    const text = document.getElementById("selectedPetText");
    if (text) {
        text.innerText = "You are sponsoring " + pet + " 🐾";
    }

    // 🔥 clear flag after use (important)
    sessionStorage.removeItem("fromSponsor");
};

// PAYMENT LINK
function openPayment() {
  alert("Redirecting to payment...");
  window.location.href = "https://your-payment-link.com";
}
function playVideo() {
  window.open("https://youtu.be/VjnHW07wZn4", "_blank");
}