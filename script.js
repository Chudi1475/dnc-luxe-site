// Main application script
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Animate on scroll
  const animateOnScroll = () => {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) el.classList.add('animate-fade-in');
    });
  };
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();

  // ---- Contact form submit (single source of truth) ----
  const form = document.querySelector('#contact form, #contact-form'); // support either structure
  const button = form?.querySelector('button[type="submit"]');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const payload = {
        name: form.querySelector('#name')?.value?.trim() || '',
        email: form.querySelector('#email')?.value?.trim() || '',
        message: form.querySelector('#message')?.value?.trim() || '',
        honeypot: form.querySelector('#company')?.value?.trim() || '' // should stay empty
      };

      // quick client validation
      if (!payload.name || !payload.email) {
        alert('Please enter your name and email.');
        return;
      }

      if (button) { button.disabled = true; button.textContent = 'Sending...'; }

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(body?.detail || body?.error || 'Request failed');

        form.reset();
        if (button) {
          button.textContent = 'Sent!';
          setTimeout(() => { button.textContent = 'Send Message'; button.disabled = false; }, 1200);
        }
        alert('Thanks! We’ll be in touch shortly.');
      } catch (err) {
        if (button) { button.disabled = false; button.textContent = 'Send Message'; }
        alert('Could not send. ' + (err?.message || 'Please try again.'));
      }
    });
  }
});

