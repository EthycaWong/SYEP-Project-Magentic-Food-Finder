let lastScrollY = window.scrollY;
let ticking = false;
const header = document.querySelector("header");
let currentSlide = 0;

/* ========== HEADER HIDE/SHOW ========== */
window.addEventListener("scroll", () => {
  if (!header) return;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const headerHeight = header.offsetHeight;

      // Show when scrolling up OR near the very top
      if (currentScrollY < lastScrollY || currentScrollY <= 10) {
        header.style.setProperty("--header-y", "0");
      }
      // Hide only when scrolled past header and scrolling down
      else if (currentScrollY > headerHeight && currentScrollY > lastScrollY) {
        header.style.setProperty("--header-y", `-${headerHeight}px`);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    });
    ticking = true;
  }
});

/* ========== DOM READY ========== */
document.addEventListener("DOMContentLoaded", () => {
  /* ----- Hamburger Menu ----- */
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
      hamburger.setAttribute("aria-expanded", isOpen);

      // Lock body scroll when menu is open
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close menu on link click
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ----- Section One Animations ----- */
  const section = document.querySelector(".section-one");
  const boxes = document.querySelectorAll(".goal1, .goal2");

  if (section) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            boxes.forEach((box) => box.classList.add("animate"));
          } else {
            // Reset ONLY when scrolling back above the section
            if (entry.boundingClientRect.top > 0) {
              boxes.forEach((box) => box.classList.remove("animate"));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -5% 0px",
      }
    );

    observer.observe(section);
  }

  /* ----- Reveal Cards: Tap to Flip on Touch ----- */
  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  document.querySelectorAll(".reveal-card").forEach((card) => {
    if (isTouch) {
      card.addEventListener("click", (e) => {
        // Don't flip if the user is highlighting text
        if (window.getSelection().toString().length > 0) return;
        card.classList.toggle("flipped");
      });
    }
  });
});