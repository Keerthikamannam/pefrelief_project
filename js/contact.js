document.getElementById("contactForm").addEventListener("submit", function(e){
    e.preventDefault();

    document.getElementById("successMsg").innerText =
    "✅ Thank you! Our team will get back to you within 24 hours.";

    this.reset();
});
const sections = document.querySelectorAll(
    ".contact-info, .contact-container, .working-hours, .quick-contact, .help-note,.follow-us"
);

function revealSections() {
    sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;

        if (top < window.innerHeight - 50) { // smaller threshold = better
            sec.classList.add("show");
        }
    });
}

// Run on scroll
window.addEventListener("scroll", revealSections);

// Run once on load (IMPORTANT FIX)
window.addEventListener("load", revealSections);
function goToGetStarted() {
    window.location.href = "home.html?login=true";
}