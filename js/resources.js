function toggleContent(btn) {
  const p = btn.previousElementSibling;

  p.classList.toggle("expanded");
  if (p.classList.contains("expanded")) {
    btn.innerText = "Read Less";
  } else {
    btn.innerText = "Read More";
  }
}
function goToBlogs() {
    document.getElementById("blogs").scrollIntoView({
        behavior: "smooth"
    });
}
document.querySelector(".featured-btn").addEventListener("click", () => {
  document.getElementById("blogs").scrollIntoView({
    behavior: "smooth"
  });
});
function goToGetStarted() {
    window.location.href = "home.html?login=true";
}