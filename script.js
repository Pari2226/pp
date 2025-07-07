/* Prompt #4 — Add active navigation link highlighting when scrolling or navigating to sections */

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
      // Highlight corresponding nav link
      const sectionId = entry.target.id;
      const navLinks = document.querySelectorAll('.nav-center li a');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
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
  // Initialize EmailJS with your actual User ID
  emailjs.init('RD85aIMspEE5s7Gzb'); // Replace with your actual EmailJS User ID

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    const formData = new FormData(contactForm);
    const templateParams = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      message: formData.get('message'),
      to_email: 'whatsupayush@gmail.com', // Your email address
    };

    try {
      const response = await emailjs.send(
        'service_y0tr9c6', // Replace with your actual Service ID
        'template_8amzd8k', // Replace with your actual Template ID
        templateParams
      );

      console.log('SUCCESS!', response.status, response.text);
      
      formMessage.textContent = 'Message sent successfully!';
      formMessage.className = 'form-message success show';
      contactForm.reset();
      
    } catch (error) {
      console.error('FAILED...', error);
      
      formMessage.textContent = 'Failed to send message. Please try again.';
      formMessage.className = 'form-message error show';
    } finally {
      // Reset button state
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }

    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.classList.remove('show');
    }, 5000);
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