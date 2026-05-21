const carousel = document.querySelector(".carousel");

function rotateCards() {
    if (!carousel) return;

    const cards = carousel.children;

    // remove active from all
    Array.from(cards).forEach(card => card.classList.remove("active"));

    // move first card to end
    carousel.appendChild(cards[0]);

    // set new center card (3rd one)
    if (cards[2]) {
        cards[2].classList.add("active");
    }
}

// run every 3 seconds
setInterval(() => {
    if (document.hasFocus()) rotateCards();
}, 3000);

let isLogin = true;
function openPopup() {
    document.getElementById("popup").style.display = "flex";
    sessionStorage.setItem("loginShown", "true");
}   

function closePopup() {
    document.getElementById("popup").style.display = "none";
}
function showSignup() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
    document.getElementById("formTitle").innerText = "Sign Up";
}

function showLogin() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("formTitle").innerText = "Login";
}

function signup() {
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!email || !password) {
        alert("Fill all fields!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // check if user already exists
    const exists = users.find(u => u.email === email);
    if (exists) {
        alert("User already exists!");
        return;
    }

    users.push({ email, password });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created ✅");
    showLogin();
}

// LOGIN FUNCTION
function login() {
    const email = document.getElementById("loginemail").value.trim();
    const password = document.getElementById("password").value.trim();

    // validation
    if (!email || !password) {
        document.getElementById("error").innerText = "Please enter all fields!";
        return;
    }
    const redirectPage =
    sessionStorage.getItem("redirectAfterLogin") || "dashboard.html";

    sessionStorage.removeItem("redirectAfterLogin");

// redirect
window.location.href = redirectPage;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        document.getElementById("error").innerText = "Invalid credentials!";
        return;
    }
    // store login state
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("currentUser", email);

    // CLOSE POPUP (IMPORTANT)
    closePopup();

    // ✅ FORCE REDIRECT (FIX)
    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 200);
}

function goToExplore() {
    const isLoggedIn = sessionStorage.getItem("loggedIn");

    if (isLoggedIn === "true") {
        window.location.href = "adoption.html";
    } else {
        sessionStorage.setItem("redirectAfterLogin", "adoption.html");
        document.getElementById("error").innerText = ""; // clear old errors
        showLogin(); // ensure login tab is visible
        openPopup(); // open login popup
    }
}
function getStarted() {
    const isLoggedIn = sessionStorage.getItem("loggedIn");

    if (isLoggedIn === "true") {    
        window.location.href = "dashboard.html";
    } else {
        sessionStorage.setItem("redirectAfterLogin", "dashboard.html");
        showLogin();   
        openPopup();  
    }
}
// FAQ TOGGLE
document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {

        const item = btn.closest(".faq-item");
        const icon = btn.querySelector(".icon");

        const isActive = item.classList.contains("active");

        // CLOSE ALL (optional behavior)
        document.querySelectorAll(".faq-item").forEach(i => {
            i.classList.remove("active");

            const ic = i.querySelector(".icon");
            if (ic) ic.innerText = "+";
        });

        // TOGGLE CURRENT
        if (!isActive) {
            item.classList.add("active");
            if (icon) icon.innerText = "−";
        }
    });
});
function openPrivacy() {
    window.location.href = "privacy.html";
}
function openRefund() {
    window.location.href = "refund.html";
}
function openCancellation() {
    window.location.href = "cancellation.html";
}
function openTerms() {
    window.location.href = "terms.html";
}
function goToPage(page, element) {

    // remove active from all
    document.querySelectorAll(".policy-link").forEach(link => {
        link.classList.remove("active");
    });

    // add active to clicked
    element.classList.add("active");

    // save active state
    localStorage.setItem("activePolicy", page);

    // navigate
    window.location.href = page;
}
const form = document.getElementById("contactForm");
if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();


    let name = document.getElementById("name").value;
    let email = document.getElementById("contactemail").value;
    let message = document.getElementById("message").value;

    // simple validation
    if (!name || !email || !message) {
        alert("Please fill all fields!");
        return;
    }

    // store locally (demo purpose)
    localStorage.setItem("contactName", name);
    localStorage.setItem("contactEmail", email);
    localStorage.setItem("contactMessage", message);

    alert("Message sent successfully ✅");

    document.getElementById("contactForm").reset();
})
};
window.onload = function () {
    const params = new URLSearchParams(window.location.search);

    if (params.get("login") === "true") {
        openPopup(); // your existing login popup function
    }
    const isLoggedIn = sessionStorage.getItem("loggedIn");
    const loginShown = sessionStorage.getItem("loginShown");

    if (isLoggedIn === "true" || loginShown === "true") {
        closePopup(); // ensure popup stays hidden
    }
};



