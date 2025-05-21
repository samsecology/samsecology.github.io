document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const duration = 1200; 
        smoothScrollTo(target, duration);
        history.replaceState(null, '', window.location.pathname);
      }
    });
  });

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
});

window.addEventListener('load', function() {
  window.scrollTo(0, 0);
  history.replaceState(null, '', window.location.pathname);
});

function smoothScrollTo(target, duration) {
  const startY = window.scrollY;
  const targetY = target.getBoundingClientRect().top + startY;
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
