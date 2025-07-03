const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  themeToggle.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    themeToggle.textContent = '☀️';
  }

  // Animation observer
  const sections = document.querySelectorAll('section[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));
});

document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = e.target.querySelector('input[name="name"]').value;
  const email = e.target.querySelector('input[name="email"]').value;
  const message = e.target.querySelector('textarea[name="message"]').value;
  if (name && email && message) {
    alert('Message sent successfully! (Demo)');
    e.target.reset();
  } else {
    alert('Please fill out all fields.');
  }
});