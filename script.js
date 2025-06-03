  document.addEventListener('DOMContentLoaded', function() {
  // --- 1. Anchor smooth scroll ---
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

  // --- 2. Clear hash and scroll to top if hash present ---
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname);
    window.scrollTo(0, 0);
  }

  // --- 3. Nav Toggle handler ---
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

  // --- 4. Form validation handler ---
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

  // --- 5. Carousel ---
  initializeCarousel();

  // --- 6. Bird flocking animation for canvas sky ---
  // (Paste your full Bird flocking code here, using the fixed drawBirds() naming)
  // For brevity, this is a placeholder for your Bird code:
  // --- BEGIN BIRD FLOCKING CODE ---
  // ... [Paste your entire Bird object code, Bird.obj, Bird.Build, Bird.Tri, Bird.Vtr, Bird.Matrix etc. here] ...
  // --- END BIRD FLOCKING CODE ---

  // For demonstration, let's show how the animation loop must be set up:

  // (Below assumes you have pasted your Bird code above)
  var c = document.getElementById('canv');
  if (!c) return;

  Bird.$ = c.getContext("2d");
  Bird.canv = {
    w: c.width = window.innerWidth,
    h: c.height = window.innerHeight
  };
  Bird.L = new Bird.Vtr(0, 2000, 5000);
  Bird.V = new Bird.Vtr(0, 0, 5000);

  var birds = [], b = [];
  for (var i = 0; i < 100; i++) {
    var _b = b[i] = new Bird.obj();
    _b.pos.x = Math.random() * 800 - 400;
    _b.pos.y = Math.random() * 800 - 400;
    _b.pos.z = Math.random() * 800 - 400;
    _b.vel.x = Math.random() * 2 - 1;
    _b.vel.y = Math.random() * 2 - 1;
    _b.vel.z = Math.random() * 2 - 1;
    _b._coll(true);
    _b.param(400, 400, 800);
    var bird = birds[i] = new Bird.Build();
    bird.phase = Math.floor(Math.random() * 62.83);
    bird.pos = b[i].pos;
  }

  function animate() {
    window.requestAnimationFrame(animate);
    drawBirds();
  }

  function drawBirds() {
    Bird.$.setTransform(1, 0, 0, 1, 0, 0);
    Bird.$.translate(Bird.canv.w / 2, Bird.canv.h / 2);
    Bird.$.clearRect(-Bird.canv.w / 2, -Bird.canv.h / 2, Bird.canv.w, Bird.canv.h);
    Bird.$.scale(1, -1);
    var arr = [];
    b.forEach(function(e, i, a) {
      var _b = b[i];
      _b.run(b);
      var bird = birds[i];
      bird.rot.y = Math.atan2(-_b.vel.z, _b.vel.x);
      bird.rot.z = Math.asin(_b.vel.y / _b.vel.len());
      bird.phase = (bird.phase + (Math.max(0, bird.rot.z) + 0.1)) % 62.83;
      bird.wing(Math.sin(bird.phase) * 5);
      bird.matrix();
      arr.push({
        z: bird.zpos(),
        o: bird
      });
    });
    arr.sort(function(a, b) {
      return a.z < b.z ? -1 : a.z > b.z ? 1 : 0;
    });
    arr.forEach(function(e) {
      e.o.draw();
    });
  }

  animate();

  window.addEventListener('resize', function(){
    if (c.width !== window.innerWidth || c.height !== window.innerHeight) {
      Bird.canv = {
        w: c.width = window.innerWidth,
        h: c.height = window.innerHeight
      };
    }
  });
  // --- End Bird flocking section ---
});

window.addEventListener('load', function() {
  window.scrollTo(0, 0);
  history.replaceState(null, '', window.location.pathname);
});

// ---- Helper functions ----

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
