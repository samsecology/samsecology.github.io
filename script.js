document.addEventListener('DOMContentLoaded', function() {
  // --- 1. Anchor default scroll (NO smooth scroll) ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // No preventDefault! Allow native anchor jump
      // No JS smooth scrolling
      history.replaceState(null, '', window.location.pathname);
    });
  });

  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname);
    window.scrollTo(0, 0);
  }

  // --- 2. Nav Toggle handler ---
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

  // --- 3. Form validation handler ---
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

  // --- 4. Carousel ---
  initializeCarousel();
});

window.addEventListener('load', function() {
  window.scrollTo(0, 0);
  history.replaceState(null, '', window.location.pathname);
});

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
