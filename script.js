const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    body.classList.add('dark');
  }
  // Clear URL hash immediately
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
  }
  // Force scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });
  window.scroll(0, 0); // Fallback for broader compatibility
});

window.addEventListener('load', () => {
  // Additional scroll to top after full page load to counter browser restore
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.scroll(0, 0);
    // Ensure hash is cleared again
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname);
    }
  }, 0);
});

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

const hamburger = document.querySelector('.hamburger');
const navCenter = document.querySelector('.nav-center');

hamburger.addEventListener('click', () => {
  navCenter.classList.toggle('active');
});

const contactButton = document.querySelector('.contact-btn');
if (contactButton) {
  contactButton.addEventListener('click', (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  (function() {
    emailjs.init('Ayush Sharawat');
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
        to_email: 'whatsupayush@gmail.com',
      }, 'RD85aIMspEE5s7Gzb');

      formMessage.textContent = 'Message sent successfully!';
      formMessage.classList.add('success', 'show');
      contactForm.reset();
    } catch (error) {
      formMessage.textContent = 'Failed to send message. Please try again.';
      formMessage.classList.add('error', 'show');
      console.error('Error:', error);
    }

    setTimeout(() => formMessage.classList.remove('show'), 5000);
  });
}

const roleText = document.getElementById('role-text');
const roles = ['UI/UX Designer', 'Web Developer', 'Creative Coder', 'Graphic Designer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];
  if (!isDeleting) {
    roleText.textContent = currentRole.substring(0, charIndex);
    charIndex++;
    if (charIndex > currentRole.length) {
      isDeleting = true;
      setTimeout(typeRole, 1500);
    } else {
      setTimeout(typeRole, 100);
    }
  } else {
    roleText.textContent = currentRole.substring(0, charIndex);
    charIndex--;
    if (charIndex < 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 500);
    } else {
      setTimeout(typeRole, 50);
    }
  }
}

typeRole();