// CHECK LOGIN
window.onload = function () {
    if (localStorage.getItem("loggedIn") !== "true") {
        alert("Please login first!");
        window.location.href = "home.html";
    }
};

// BOOK SERVICE
function bookService() {
    const data = {
    petType: document.querySelector('input[name="petType"]:checked')?.value,
    gender: document.querySelector('input[name="gender"]:checked')?.value,
    petName: document.getElementById("petName").value,
    breed: document.getElementById("breed").value,
    weight: document.getElementById("weight").value,
    age: document.getElementById("age").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value
};

    if (!data.petName || !data.date || !data.time) {
        alert("Please fill all required fields!");
        return;
    }

    localStorage.setItem("bookingData", JSON.stringify(data));

    window.location.href = "booking_success.html";
}