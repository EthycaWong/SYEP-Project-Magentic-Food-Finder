let lastScrollY = window.scrollY;
const header = document.querySelector('header');
const slides = document.querySelectorAll('.section-one-img');
let currentSlide = 0;

window.addEventListener('scroll', () => {
   if (window.scrollY < lastScrollY) {
       header.style.setProperty('--header-y', '0');
   } else {
       header.style.setProperty('--header-y', '-140%');
   }
   lastScrollY = window.scrollY;
});

setInterval(() => {
    slides[currentSlide].classList.remove('active');

    currentSlide = (currentSlide + 1) % slides.length;

    slides[currentSlide].classList.add('active');
}, 2000);

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 34.397, lng: 150.644 },
        zoom: 8
    });
}

// Scroll-triggered pop-up animation (re-triggers every time)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('pop-visible');
        } else {
            entry.target.classList.remove('pop-visible');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
});

document.querySelectorAll('.sect-tone, .sect-ttwo, .sect-tthree').forEach(card => {
    observer.observe(card);
});