// ACTIVE LINK
const links = document.querySelectorAll("nav a");
links.forEach(link => {
    link.addEventListener("click", () => {
        links.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
});

// COUNTERS
const counters = document.querySelectorAll('.stats h3');
let started = false;

window.addEventListener('scroll', () => {
    const stats = document.querySelector(".stats");
    if (!stats) return;

    const top = stats.getBoundingClientRect().top;
    if (top < window.innerHeight && !started) {
        counters.forEach(counter => animateCounter(counter));
        started = true;
    }
});

function animateCounter(el) {
    const target = parseInt(el.innerText);
    let count = 0;
    const speed = target > 100 ? 10 : 20;

    const update = () => {
        if (count < target) {
            count++;
            el.innerText = count + "+";
            setTimeout(update, speed);
        }
    };
    update();
}

// REVEAL ON SCROLL
const reveals = document.querySelectorAll("section, .card, .project, .member, .sector");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate");
        }
    });
}, { threshold: 0.2 });

reveals.forEach(el => observer.observe(el));


// =======================
// EMAILJS SETUP (CLEAN)
// =======================

// =======================
// ✅ EMAILJS SETUP
// =======================

// INIT EmailJS
(function () {
    emailjs.init("SxpVdkJcV3KRKVOF9");  // ← put your Public Key here
})();

// CONTACT FORM
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        formStatus.textContent = "Sending...";
        formStatus.style.color = "#9ca3af";

        emailjs.send("service_5netjnm", "template_14cjg8m", {
            from_name: contactForm.from_name.value,
            reply_to: contactForm.reply_to.value,
            company: contactForm.company.value,
            message: contactForm.message.value
        })
        .then(function () {
