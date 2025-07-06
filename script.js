// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    body.classList.add('dark');
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

// Typing Animation for Role Text
const roleText = document.getElementById('role-text');
const roles = ['UI/UX Designer', 'Web Developer', 'Creative Coder', 'Graphic Designer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];
  if (!isDeleting) {
    // Typing
    roleText.textContent = currentRole.substring(0, charIndex);
    charIndex++;
    if (charIndex > currentRole.length) {
      isDeleting = true;
      setTimeout(typeRole, 1500); // Pause before deleting
    } else {
      setTimeout(typeRole, 100); // Typing speed
    }
  } else {
    // Deleting
    roleText.textContent = currentRole.substring(0, charIndex);
    charIndex--;
    if (charIndex < 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 500); // Pause before typing next role
    } else {
      setTimeout(typeRole, 50); // Deleting speed
    }
  }
}

typeRole();