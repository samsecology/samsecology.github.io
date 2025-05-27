document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault(); 

      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        history.replaceState(null, '', window.location.pathname);

        const header = document.querySelector('header');
        let offset = header ? header.offsetHeight : 0;

        smoothScrollTo(target, 1200, offset);
      }
    });
  });

  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname);
    window.scrollTo(0, 0);
  }

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
      navToggle.setAttribute('aria-expanded', !expanded);
      navLinks.classList.toggle('show');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        navToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const name = form.querySelector('input[name="name"]');
      const email = form.querySelector('input[name="email"]');
      const message = form.querySelector('textarea[name="request"]');

      const namePattern = /^[A-Za-z\s]{2,50}$/;
      const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
      const messagePattern = /^.{10,1000}$/;

      if (!namePattern.test(name.value.trim())) {
        alert('Please enter a valid name (letters and spaces, 2-50 characters).');
        name.focus();
        return;
      }
      if (!emailPattern.test(email.value.trim())) {
        alert('Please enter a valid email address.');
        email.focus();
        return;
      }
      if (!messagePattern.test(message.value.trim())) {
        alert('Your message should be at least 10 characters.');
        message.focus();
        return;
      }

      alert('Thank you for reaching out!');
      form.reset();
    });
  }

  initializeCarousel();
});

window.addEventListener('load', function() {
  window.scrollTo(0, 0);
  history.replaceState(null, '', window.location.pathname);
});

function smoothScrollTo(target, duration, offset = 0) {
  const startY = window.scrollY;
  const targetRect = target.getBoundingClientRect().top;
  const targetY = targetRect + startY - offset;
  const diff = targetY - startY;
  let start;

  function step(timestamp) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const percent = Math.min(time / duration, 1);
    window.scrollTo(0, startY + diff * easeInOutQuad(percent));
    if (time < duration) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function initializeCarousel() {
  const carouselItems = document.querySelectorAll('.carousel-item');
  let currentIndex = 0;
  const intervalTime = 5000;

  function showSlide(index) {
    carouselItems.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    showSlide(currentIndex);
  }

  showSlide(currentIndex);

  setInterval(nextSlide, intervalTime);
}
