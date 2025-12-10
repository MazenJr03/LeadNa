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


// EMAILJS INIT
(function () {
    emailjs.init("SxpVdkJcV3KRKVOF9");
})();

// EMAILJS CONTACT FORM
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!window.emailjs) {
            formStatus.textContent = "Email service not loaded.";
            formStatus.style.color = "#f97316";
            return;
        }

        formStatus.textContent = "Sending...";
        formStatus.style.color = "#9ca3af";

        const formData = {
            from_name: contactForm.name.value,
            from_email: contactForm.email.value,
            company: contactForm.company.value,
            message: contactForm.message.value,
        };

        emailjs
            .send("service_5netjnm", "template_14cjg8m", formData)
            .then(
                () => {
                    formStatus.textContent = "Message sent successfully!";
                    formStatus.style.color = "#22c55e";
                    contactForm.reset();
                },
                (error) => {
                    console.error("EmailJS Error:", error);
                    formStatus.textContent = "Error sending message.";
                    formStatus.style.color = "#f97316";
                }
            );
    });
}
