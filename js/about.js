// SCROLL REVEAL ANIMATION
const sections = document.querySelectorAll(".about-section");

function revealSections() {
    sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {
            sec.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections); 


// COUNTER (RUN ONLY WHEN VISIBLE)
const counters = document.querySelectorAll(".counter");
let started = false;

window.addEventListener("scroll", () => {
    const statsSection = document.querySelector(".stats");

    if (!started && statsSection.getBoundingClientRect().top < window.innerHeight) {
        counters.forEach(counter => {
            const update = () => {
                const target = +counter.getAttribute("data-target");
                const count = +counter.innerText;

                const speed = 60;
                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(update, 30);
                } else {
                    counter.innerText = target;
                }
            };
            update();
        });

        started = true;
    }
});


// FACTS
const facts = [
    "Over 70% of shelter pets get adopted!",
    "Dogs can understand up to 250 words!",
    "Adopted pets are often healthier and happier!",
    "Cats sleep 70% of their lives!",
    "Every adoption saves two lives!"
];

function newFact() {
    const random = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById("factText").innerText = random;
}
function goToGetStarted() {
    window.location.href = "home.html?login=true";
}
