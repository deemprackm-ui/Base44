const menuBtn = document.getElementById('menuBtn');
const nav = document.querySelector('.nav');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

revealItems.forEach((item) => revealObserver.observe(item));

const counters = document.querySelectorAll('[data-count]');
let counted = false;

function animateCounters() {
  if (counted) return;
  counted = true;

  counters.forEach((counter) => {
    const target = Number(counter.dataset.count);
    const suffix = counter.textContent.replace(/[0-9]/g, '');
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));

    const update = () => {
      current += step;
      if (current >= target) {
        counter.textContent = target + suffix;
        return;
      }
      counter.textContent = current + suffix;
      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  });
}

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
      }
    });
  }, { threshold: 0.4 });

  counterObserver.observe(statsSection);
}

const links = document.querySelectorAll('.nav a');
links.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});
