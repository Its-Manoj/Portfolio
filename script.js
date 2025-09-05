// Theme toggle
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const stored = localStorage.getItem('theme') || 'light';
body.classList.remove('light','dark');
body.classList.add(stored);
toggleBtn.innerHTML = stored === 'dark' ? '<i class="fa-regular fa-sun"></i>' : '<i class="fa-regular fa-moon"></i>';

toggleBtn.addEventListener('click', () => {
  const isDark = body.classList.contains('dark');
  body.classList.toggle('dark', !isDark);
  body.classList.toggle('light', isDark);
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
  toggleBtn.innerHTML = isDark ? '<i class="fa-regular fa-moon"></i>' : '<i class="fa-regular fa-sun"></i>';
});

// Section router
const links = document.querySelectorAll('[data-link]');
const sections = document.querySelectorAll('.section');

function showSection(id) {
  sections.forEach(s => s.classList.toggle('active', s.id === id));
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
}

document.addEventListener('click', (e) => {
  const a = e.target.closest('[data-link]');
  if (!a) return;
  e.preventDefault();
  const id = a.getAttribute('href').slice(1);
  history.pushState(null, '', `#${id}`);
  showSection(id);
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('popstate', () => {
  const id = location.hash.replace('#', '') || 'home';
  showSection(id);
});

document.addEventListener('DOMContentLoaded', () => {
  const id = location.hash.replace('#', '') || 'home';
  showSection(id);
  // year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
  // reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.card,.project,.repo,.about-card,.stack,.contact-card,.contact-form').forEach(el => {
    el.classList.add('reveal');
    io.observe(el);
  });
});
