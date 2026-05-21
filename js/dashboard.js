 function logout() {
    if (confirm("Are you sure you want to logout?")) {
        sessionStorage.removeItem("loggedIn");
        sessionStorage.removeItem("currentUser");
        window.location.href = "home.html";
    }
}
if (sessionStorage.getItem("loggedIn") !== "true") {
    window.location.href = "home.html";
}
function goTo(page) {
    document.body.style.opacity = "0.6";

    setTimeout(() => {
        window.location.href = page;
    }, 300);
}
const user = localStorage.getItem("userEmail");

if (user) {
    document.querySelector("h1").innerText =
        "Welcome " + user.split("@")[0] + " 🐾";
}
