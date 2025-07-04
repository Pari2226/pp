// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  themeToggle.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    themeToggle.textContent = '☀️';
  }
});

// Animation on Scroll
const sections = document.querySelectorAll('section[data-animate]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  observer.observe(section);
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navCenter = document.querySelector('.nav-center');

hamburger.addEventListener('click', () => {
  navCenter.classList.toggle('active');
});

// Form Submission with EmailJS
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  // Initialize EmailJS with your User ID
  (function() {
    emailjs.init('Ayush Sharawat'); // Replace with your EmailJS User ID
  })();

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    try {
      const response = await emailjs.send('service_y0tr9c6', 'template_8amzd8k', {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        to_email: 'whatsupayush@gmail.com', // Recipient email
      }, 'RD85aIMspEE5s7Gzb'); // Replace with your Public Key

      formMessage.textContent = 'Message sent successfully!';
      formMessage.classList.add('success', 'show');
      contactForm.reset();
    } catch (error) {
      formMessage.textContent = 'Failed to send message. Please try again.';
      formMessage.classList.add('error', 'show');
      console.error('Error:', error); // Log error for debugging
    }

    setTimeout(() => formMessage.classList.remove('show'), 5000);
  });
}

// Role Text Animation
const roleText = document.getElementById('role-text');
const roles = ['Web Developer', 'UI/UX Designer', 'Graphic Designer'];
let roleIndex = 0;

function updateRole() {
  roleText.style.width = '0';
  setTimeout(() => {
    roleText.textContent = roles[roleIndex];
    roleText.style.width = `${roleText.scrollWidth}px`;
    roleIndex = (roleIndex + 1) % roles.length;
  }, 1000);
}

setInterval(updateRole, 5000);
updateRole();