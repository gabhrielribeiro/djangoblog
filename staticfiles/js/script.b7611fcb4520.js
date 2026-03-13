/**
 * Django para Iniciantes - Blog Scripts
 * Interatividade e acessibilidade
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initNewsletterForm();
  initSmoothScroll();
  initScrollEffects();
});

/**
 * Menu mobile - toggle e acessibilidade
 */
function initMobileNav() {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.getAttribute('data-open') === 'true';
    menu.setAttribute('data-open', !isOpen);
    toggle.setAttribute('aria-expanded', !isOpen);
  });

  // Fechar ao clicar em link (mobile)
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 769) {
        menu.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target) && menu.getAttribute('data-open') === 'true') {
      menu.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Formulário de newsletter
 */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const email = input?.value?.trim();

    if (!email) return;

    // Simulação - substituir por integração real
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Inscrito!';
    btn.disabled = true;
    input.value = '';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    }, 3000);
  });
}

/**
 * Scroll suave para âncoras
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/**
 * Efeitos de scroll (header, cards)
 */
function initScrollEffects() {
  const header = document.querySelector('.header');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.card, .concept-card, .post-preview').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = `
    .card.is-visible, .concept-card.is-visible, .post-preview.is-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}
