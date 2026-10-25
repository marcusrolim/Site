/**
 * MARCUS ROLIM — JAVASCRIPT PRINCIPAL
 * Portal Profissional: marcusrolim.com.br
 * Gestão + Educação + Tecnologia
 */

(function () {
  'use strict';

  // 1. Atualização dinâmica do ano de copyright
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Menu Mobile Acessível (Drawer)
  var btnHamburger = document.getElementById('btn-hamburger');
  var mobileSheet = document.getElementById('mobile-nav');

  if (btnHamburger && mobileSheet) {
    function toggleMobileMenu(forceClose) {
      var isExpanded = btnHamburger.getAttribute('aria-expanded') === 'true';
      var nextState = forceClose ? false : !isExpanded;

      btnHamburger.setAttribute('aria-expanded', String(nextState));
      btnHamburger.setAttribute('aria-label', nextState ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
      mobileSheet.classList.toggle('is-open', nextState);
      mobileSheet.setAttribute('aria-hidden', String(!nextState));
    }

    btnHamburger.addEventListener('click', function () {
      toggleMobileMenu(false);
    });

    // Fechar ao clicar em qualquer link interno
    mobileSheet.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggleMobileMenu(true);
      });
    });

    // Fechar com a tecla Escape
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btnHamburger.getAttribute('aria-expanded') === 'true') {
        toggleMobileMenu(true);
        btnHamburger.focus();
      }
    });
  }

  // 3. Estilização Suave do Header no Scroll
  var header = document.querySelector('.site-header');
  if (header) {
    function onScrollHeader() {
      if (window.scrollY > 30) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }
    window.addEventListener('scroll', onScrollHeader, { passive: true });
    onScrollHeader();
  }

  // 4. Animação Discreta de Entrada ao Rolar (Intersection Observer)
  var reveals = document.querySelectorAll('.reveal-on-scroll');
  if (reveals.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px 120px 0px',
      threshold: 0.05
    });

    reveals.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100) {
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    });
  } else {
    // Fallback caso não suporte observer
    reveals.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // 5. Canvas Tecnológico Interativo Global (Nós e Conexões Digitais Contínuas)
  var canvas = document.getElementById('global-tech-canvas') || document.getElementById('hero-tech-canvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    (function initTechCanvas() {
      var ctx = canvas.getContext('2d');
      var w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
      var particles = [];
      var PARTICLE_COUNT = 48; // Equilíbrio refinado entre efeito e leveza
      var mouse = { x: -1000, y: -1000, radius: 140 };

      function resizeCanvas() {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas, { passive: true });

      window.addEventListener('mousemove', function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }, { passive: true });

      window.addEventListener('mouseleave', function () {
        mouse.x = -1000;
        mouse.y = -1000;
      });

      for (var i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * (w || 1200),
          y: Math.random() * (h || 800),
          vx: (Math.random() - 0.5) * 0.38,
          vy: (Math.random() - 0.5) * 0.38,
          radius: Math.random() * 1.8 + 1.1,
          isCoral: Math.random() > 0.45
        });
      }

      function drawNetwork() {
        ctx.clearRect(0, 0, w, h);

        for (var i = 0; i < particles.length; i++) {
          var p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = w;
          else if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          else if (p.y > h) p.y = 0;

          // Reação suave ao mouse
          var dx = mouse.x - p.x;
          var dy = mouse.y - p.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            var angle = Math.atan2(dy, dx);
            p.x -= Math.cos(angle) * 0.8;
            p.y -= Math.sin(angle) * 0.8;
          }

          // Desenho do ponto
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.isCoral ? 'rgba(255, 105, 91, 0.72)' : 'rgba(58, 124, 165, 0.72)';
          ctx.fill();

          // Conexões com nós próximos
          for (var j = i + 1; j < particles.length; j++) {
            var p2 = particles[j];
            var ndx = p.x - p2.x;
            var ndy = p.y - p2.y;
            var ndist = Math.sqrt(ndx * ndx + ndy * ndy);

            if (ndist < 130) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              var alpha = (1 - ndist / 130) * 0.22;
              ctx.strokeStyle = p.isCoral
                ? 'rgba(255, 105, 91, ' + alpha + ')'
                : 'rgba(58, 124, 165, ' + alpha + ')';
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }

        requestAnimationFrame(drawNetwork);
      }
      drawNetwork();
    })();
  }

  // 6. Manipulação do Formulário de Contato (Web3Forms)
  var contactForm = document.getElementById('mr-contact-form');
  var formFeedback = document.getElementById('form-feedback');
  var submitBtn = document.getElementById('contact-submit-btn');
  var submitLabel = document.getElementById('contact-submit-label');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameInput = document.getElementById('contact-name');
      var emailInput = document.getElementById('contact-email');
      var messageInput = document.getElementById('contact-message');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        formFeedback.className = 'form-feedback is-error';
        formFeedback.textContent = 'Por favor, preencha todos os campos obrigatórios (*).';
        formFeedback.style.display = 'block';
        return;
      }

      // Estado de carregamento
      if (submitBtn) submitBtn.disabled = true;
      if (submitLabel) submitLabel.textContent = 'Enviando...';
      formFeedback.style.display = 'none';

      var formData = new FormData(contactForm);
      var object = Object.fromEntries(formData);
      var json = JSON.stringify(object);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.success) {
          formFeedback.className = 'form-feedback is-success';
          formFeedback.textContent = 'Obrigado pelo contato, ' + nameInput.value.trim() + '! Sua mensagem foi enviada com sucesso e retornarei em breve.';
          formFeedback.style.display = 'block';
          contactForm.reset();
        } else {
          formFeedback.className = 'form-feedback is-error';
          formFeedback.textContent = data.message || 'Ocorreu um erro ao enviar. Por favor, tente novamente ou use o WhatsApp direto.';
          formFeedback.style.display = 'block';
        }
      })
      .catch(function () {
        formFeedback.className = 'form-feedback is-error';
        formFeedback.textContent = 'Não foi possível enviar no momento. Por favor, tente novamente ou use nossos canais diretos.';
        formFeedback.style.display = 'block';
      })
      .finally(function () {
        if (submitBtn) submitBtn.disabled = false;
        if (submitLabel) submitLabel.textContent = 'Enviar mensagem';
      });
    });
  }

})();
