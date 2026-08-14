let lastScrollY = window.scrollY;
const header = document.querySelector('header');
const headerHeight = header ? header.offsetHeight : 100;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Don't hide header if mobile menu is open
    const nav = document.querySelector('.main-nav');
    if (nav && nav.classList.contains('open')) {
        lastScrollY = currentScrollY;
        return;
    }

    if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        header.style.setProperty('--header-y', '0');
    } else if (currentScrollY > headerHeight) {
        // Scrolling down and past header - hide header
        header.style.setProperty('--header-y', '-140%');
    }

    lastScrollY = currentScrollY;
});

const slides = document.querySelectorAll('.section-one-img');
let currentSlide = 0;

if (slides.length > 0) {
    // Ensure first slide is active
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === 0);
    });

    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 2000);
}

function initMap() {
    const mapElement = document.getElementById("map");
    if (mapElement && typeof google !== 'undefined') {
        const map = new google.maps.Map(mapElement, {
            center: { lat: 34.397, lng: 150.644 },
            zoom: 8,
            gestureHandling: 'cooperative' // Better mobile touch behavior
        });
    }
}

// Make initMap globally available for Google Maps callback
window.initMap = initMap;

const menuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav ul a');

function toggleMobileMenu() {
    const isOpen = mainNav.classList.contains('open');

    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    mainNav.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeMobileMenu() {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // Restore scrolling
}

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mainNav.classList.contains('open') && 
            !mainNav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav.classList.contains('open')) {
            closeMobileMenu();
        }
    });
}

const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('pop-visible');
        } else {
            // Only remove if not on mobile (mobile cards are always visible)
            if (window.innerWidth > 768) {
                entry.target.classList.remove('pop-visible');
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.sect-tone, .sect-ttwo, .sect-tthree').forEach(card => {
    observer.observe(card);
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Reset mobile menu state when resizing to desktop
        if (window.innerWidth > 768 && mainNav) {
            mainNav.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        // Re-check intersection observer on resize
        document.querySelectorAll('.sect-tone, .sect-ttwo, .sect-tthree').forEach(card => {
            if (window.innerWidth <= 768) {
                card.classList.add('pop-visible');
            }
        });
    }, 150);
});

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('touchstart', function() {
        this.style.opacity = '0.7';
    }, { passive: true });

    el.addEventListener('touchend', function() {
        this.style.opacity = '';
    }, { passive: true });
});
