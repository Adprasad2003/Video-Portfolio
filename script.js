/* =========================================
   1. NAVBAR: scroll background + active link
========================================= */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  // navbar background on scroll
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  // highlight active nav link based on scroll position
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

/* =========================================
   2. MOBILE HAMBURGER MENU
========================================= */
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navList.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// close menu when a link is clicked (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('open');
  });
});

/* =========================================
   3. SCROLL REVEAL ANIMATION
========================================= */
const revealEls = document.querySelectorAll('.reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

/* =========================================
   4. ANIMATED COUNTERS (About section)
========================================= */
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

function animateCounter(el) {
  const target = +el.getAttribute('data-target');
  let count = 0;
  const duration = 1200; // ms
  const stepTime = 16;   // ~60fps
  const steps = duration / stepTime;
  const increment = target / steps;

  const update = () => {
    count += increment;
    if (count < target) {
      el.textContent = Math.ceil(count);
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  };
  update();
}

/* =========================================
   5. SKILL BARS FILL ON SCROLL
========================================= */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      fill.style.width = fill.getAttribute('data-width') + '%';
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.4 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* =========================================
   6. BACKGROUND VIDEO — AUTOPLAY + SILENT SOUND UNLOCK
   The video autoplays muted (required by every browser —
   no code can force audio to play before any user click).
   The FIRST click anywhere on the page silently unmutes
   the video — no visible prompt or button shown.
========================================= */
const heroVideo = document.getElementById('heroVideo');

// make sure the video is actually playing (muted, autoplay-safe)
heroVideo.play().catch(() => {
  // autoplay might be blocked on some browsers; ignore silently
});

function enableSound() {
  heroVideo.muted = false;
  heroVideo.play();
  document.removeEventListener('click', enableSound);
}

document.addEventListener('click', enableSound, { once: true });

