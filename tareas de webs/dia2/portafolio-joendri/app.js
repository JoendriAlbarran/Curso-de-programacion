/**
 * ==========================================================================
 * PORTAFOLIO WEB PROFESIONAL — JOENDRI ALBARRAN
 * Lógica JavaScript: Partículas, Web Audio API, Cotizador, Terminal & Modales
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==================== 1. WEB AUDIO API SYNTHESIZER ====================
  // Permite sonidos sutiles de interfaz sin necesidad de archivos de audio externos
  let audioCtx = null;
  let soundEnabled = localStorage.getItem('ja_sound_enabled') !== 'false';

  const initAudio = () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
  };

  const playTone = (freq, type = 'sine', duration = 0.08, gainVal = 0.05) => {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio contextual bloqueado o no soportado:', e);
    }
  };

  const soundFX = {
    click: () => playTone(600, 'sine', 0.04, 0.03),
    theme: () => playTone(880, 'triangle', 0.12, 0.04),
    success: () => {
      playTone(523.25, 'sine', 0.08, 0.04);
      setTimeout(() => playTone(659.25, 'sine', 0.1, 0.04), 80);
      setTimeout(() => playTone(783.99, 'sine', 0.14, 0.04), 160);
    },
    terminalKey: () => playTone(350 + Math.random() * 80, 'sine', 0.03, 0.015),
    modal: () => playTone(440, 'triangle', 0.1, 0.03)
  };

  // Botón de Toggle Sonido
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');

  const updateSoundUI = () => {
    if (soundEnabled) {
      soundIcon.className = 'fa-solid fa-volume-high';
      soundToggleBtn.setAttribute('title', 'Efectos de sonido (Activados)');
    } else {
      soundIcon.className = 'fa-solid fa-volume-xmark';
      soundToggleBtn.setAttribute('title', 'Efectos de sonido (Silenciados)');
    }
  };

  updateSoundUI();

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      localStorage.setItem('ja_sound_enabled', soundEnabled);
      updateSoundUI();
      if (soundEnabled) {
        soundFX.theme();
        showToast('Efectos de sonido activados 🔊', 'fa-solid fa-volume-high');
      } else {
        showToast('Efectos de sonido silenciados 🔇', 'fa-solid fa-volume-xmark');
      }
    });
  }

  // ==================== 2. SISTEMA DE TOAST NOTIFICATIONS ====================
  const toastContainer = document.getElementById('toast-container');

  const showToast = (message, iconClass = 'fa-solid fa-circle-check', duration = 3200) => {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="${iconClass}"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);

    // Animación de entrada
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto-remover
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 350);
    }, duration);
  };

  // ==================== 3. HORA LOCAL EN VIVO (VENEZUELA UTC-4) ====================
  const currentTimeEl = document.getElementById('current-time');
  const updateLocalTime = () => {
    if (!currentTimeEl) return;
    const now = new Date();
    // Formato hora con segundos
    const timeString = now.toLocaleTimeString('es-VE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    currentTimeEl.textContent = timeString;
  };
  updateLocalTime();
  setInterval(updateLocalTime, 1000);

  // Copyright Year
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }

  // ==================== 4. SISTEMA DE TEMAS DE COLOR ====================
  const themeDots = document.querySelectorAll('.theme-dot');
  const savedTheme = localStorage.getItem('ja_portfolio_theme') || 'cyan';

  const applyTheme = (themeName) => {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('ja_portfolio_theme', themeName);

    themeDots.forEach(dot => {
      if (dot.getAttribute('data-color') === themeName) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };

  applyTheme(savedTheme);

  themeDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const selected = dot.getAttribute('data-color');
      applyTheme(selected);
      soundFX.theme();
      showToast(`Tema ${selected.toUpperCase()} aplicado con éxito`, 'fa-solid fa-palette');
    });
  });

  // ==================== 5. CANVAS INTERACTIVO DE PARTÍCULAS ====================
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 20000), 75);

    let mouse = { x: null, y: null, radius: 120 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;

      // Actualizar posición de la luz del cursor
      const cursorGlow = document.getElementById('cursor-glow');
      if (cursorGlow) {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
      }
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2 + 1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 240, 255, 0.45)';
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Repulsión sutil del mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 3;
            this.y -= (dy / dist) * force * 3;
          }
        }
      }
    }

    // Inicializar
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const opacity = 1 - dist / 110;
            ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.18})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      connectParticles();
      requestAnimationFrame(animateParticles);
    };

    animateParticles();
  }

  // ==================== 6. EFECTO TYPING EN EL HERO ====================
  const typingTextEl = document.getElementById('typing-text');
  if (typingTextEl) {
    const roles = [
      'Desarrollo Web Frontend',
      'Interfaces Modernas & UI/UX',
      'JavaScript ES6+ & CSS3',
      'Lógica Computacional en Python',
      'Aplicaciones Web Responsivas'
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const typeLoop = () => {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        typingTextEl.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typeSpeed = 45;
      } else {
        typingTextEl.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typeSpeed = 95;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        typeSpeed = 2200; // Pausa al completar la palabra
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeSpeed = 400; // Pausa antes de empezar nueva palabra
      }

      setTimeout(typeLoop, typeSpeed);
    };

    typeLoop();
  }

  // ==================== 7. EFECTO 3D TILT EN LA TARJETA HERO ====================
  const heroCard = document.getElementById('hero-3d-card');
  if (heroCard && window.innerWidth > 992) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  }

  // Copiar código del perfil
  const copyCodeBtn = document.getElementById('copy-profile-code-btn');
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      const codeSnippet = `const developer = {
  name: "Joendri Albarran",
  role: "Frontend Developer & Creator",
  location: "Venezuela 🇻🇪",
  stack: ["HTML5", "CSS3 Moderno", "JavaScript ES6+", "Python"]
};`;
      navigator.clipboard.writeText(codeSnippet).then(() => {
        soundFX.success();
        showToast('Código de perfil copiado al portapapeles 📋', 'fa-regular fa-copy');
      });
    });
  }

  // Copiar Correo
  const copyEmailHero = document.getElementById('copy-email-hero-btn');
  const copyEmailContact = document.getElementById('copy-email-contact-btn');
  const emailText = 'joendrialbarran.dev@gmail.com';

  const copyEmailHandler = () => {
    navigator.clipboard.writeText(emailText).then(() => {
      soundFX.success();
      showToast('Correo electrónico copiado: joendrialbarran.dev@gmail.com', 'fa-regular fa-envelope');
    });
  };

  if (copyEmailHero) copyEmailHero.addEventListener('click', copyEmailHandler);
  if (copyEmailContact) copyEmailContact.addEventListener('click', copyEmailHandler);

  // ==================== 8. CONTADORES ANIMADOS (INTERSECTION OBSERVER) ====================
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsCounted = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      let count = 0;
      const increment = Math.max(1, Math.floor(target / 45));
      const interval = setInterval(() => {
        count += increment;
        if (count >= target) {
          stat.textContent = target;
          clearInterval(interval);
        } else {
          stat.textContent = count;
        }
      }, 35);
    });
  };

  const statsSection = document.querySelector('.hero-stats-container');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsCounted) {
          statsCounted = true;
          animateCounters();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  // ==================== 9. NAVEGACIÓN Y MENÚ MÓVIL ====================
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Navbar Blur al hacer Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Spy para marcar menú activo
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  });

  // Toggle Menú Móvil
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileMenuBtn.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      soundFX.click();
    });

    // Cerrar al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileMenuBtn.classList.remove('open');
        soundFX.click();
      });
    });
  }

  // Botón Volver Arriba
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      soundFX.click();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==================== 10. FILTRO DE HABILIDADES ====================
  const skillTabs = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      soundFX.click();

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==================== 11. FILTRO DE PROYECTOS ====================
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      soundFX.click();

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==================== 12. MODAL DE DETALLES DE PROYECTO ====================
  const projectData = {
    tortuvzla: {
      category: 'E-Commerce & Catálogo Interactivo',
      title: 'TortuVzla 🐢 — Tienda Especializada en Tortugas & Accesorios',
      gradient: 'ecom-gradient',
      icon: 'fa-solid fa-cart-shopping',
      summary: 'Plataforma completa de comercio electrónico adaptada a la realidad venezolana, con tasa de cambio dinámica, carrito persistente en LocalStorage y checkout a WhatsApp.',
      features: [
        'Catálogo filtrable por tipo de tortuga, terrarios y alimentos',
        'Conversor instantáneo de divisas ($ USD y Bs. VES con tasa BCV configurable)',
        'Carrito de compras reactivo con persistencia en LocalStorage',
        'Calculadora de envíos por ciudades de Venezuela (MRW, Tealca, Zoom)',
        'Botón de finalización de compra que envía el pedido formateado a WhatsApp',
        'Guía interactiva de cuidados y preguntas frecuentes (FAQ) con acordeones'
      ],
      techStack: ['HTML5 Semántico', 'CSS3 Moderno', 'JavaScript ES6+', 'LocalStorage API', 'Responsive Design'],
      demoLink: '../tareas de webs/dia 0/tienda-tortugas/index.html'
    },
    maracainet: {
      category: 'Portal Web Corporativo & Telecomunicaciones',
      title: 'MaracaiNet ⚡ — Proveedor de Internet por Fibra Óptica',
      gradient: 'isp-gradient',
      icon: 'fa-solid fa-wifi',
      summary: 'Sitio corporativo de alto rendimiento para empresa de telecomunicaciones, enfocado en captación de clientes residenciales y comerciales.',
      features: [
        'Cotizador interactivo de planes simétricos (50Mbps, 100Mbps, 300Mbps)',
        'Verificador de cobertura por estados y sectores en tiempo real',
        'Sección interactiva de testimonios de clientes satisfechos',
        'Acceso rápido a soporte técnico y botón de chat en vivo',
        'Diseño moderno optimizado para celulares de baja y media gama'
      ],
      techStack: ['HTML5', 'CSS Grid & Flexbox', 'JavaScript', 'UI/UX Design', 'Performance Optimization'],
      demoLink: '../tareas de webs/dia 1/maracainet/index.html'
    },
    'python-suite': {
      category: 'Lógica Computacional & Algoritmos',
      title: 'Python Shopping Suite & Interactive Story Quest 🐍',
      gradient: 'python-gradient',
      icon: 'fa-brands fa-python',
      summary: 'Conjunto de scripts en Python 3 diseñados para implementar lógica de negocios, carritos de compras matemáticos y motores narrativos interactivos con toma de decisiones.',
      features: [
        'Algoritmo de cálculo de subtotal, IVA, descuentos por volumen e inventario',
        'Sistema de menús por consola CLI con control de excepciones y validación de tipos',
        'Motor de historia ramificada basada en árboles de decisiones condicionales',
        'Programación Orientada a Objetos (POO) con clases y métodos modulares'
      ],
      techStack: ['Python 3', 'POO', 'Algoritmos & Lógica', 'Estructuras de Datos', 'Control de Flujo'],
      demoLink: '#'
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBodyContent = document.getElementById('modal-body-content');

  const openProjectModal = (projectId) => {
    const data = projectData[projectId];
    if (!data) return;

    soundFX.modal();

    const featuresHtml = data.features
      .map(feat => `<li><i class="fa-solid fa-check-circle"></i><span>${feat}</span></li>`)
      .join('');

    const techTagsHtml = data.techStack
      .map(t => `<span class="tech-tag">${t}</span>`)
      .join('');

    modalBodyContent.innerHTML = `
      <div class="modal-header-tag">${data.category}</div>
      <h3 class="modal-title">${data.title}</h3>
      <div class="modal-banner ${data.gradient}">
        <i class="${data.icon}"></i>
      </div>
      <p class="story-text">${data.summary}</p>
      
      <h4 class="modal-section-h4"><i class="fa-solid fa-list-check accent-color"></i> Características Principales:</h4>
      <ul class="modal-features-list">
        ${featuresHtml}
      </ul>

      <h4 class="modal-section-h4"><i class="fa-solid fa-code accent-color"></i> Stack Tecnológico:</h4>
      <div class="modal-tech-pills">
        ${techTagsHtml}
      </div>

      <div class="modal-actions">
        ${data.demoLink !== '#' ? `
          <a href="${data.demoLink}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
            <span>Ver Proyecto en Vivo</span>
          </a>
        ` : ''}
        <button class="btn btn-ghost" id="modal-inner-close-btn">
          <span>Cerrar Ventana</span>
        </button>
      </div>
    `;

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const innerClose = document.getElementById('modal-inner-close-btn');
    if (innerClose) {
      innerClose.addEventListener('click', closeProjectModal);
    }
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
    soundFX.click();
  };

  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project-id');
      openProjectModal(projId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('open')) {
      closeProjectModal();
    }
  });

  // ==================== 13. CALCULADORA DE PRESUPUESTO WEB ====================
  const basePrices = {
    landing: { title: 'Landing Page de Alta Conversión', price: 60, days: 5 },
    corporate: { title: 'Sitio Web Corporativo (3-5 Secciones)', price: 120, days: 9 },
    ecommerce: { title: 'E-Commerce / Tienda con Catálogo', price: 180, days: 14 },
    custom: { title: 'Web App a Medida con Lógica Especial', price: 240, days: 20 }
  };

  const radioCards = document.querySelectorAll('.radio-card');
  const featureCheckboxes = document.querySelectorAll('.feature-checkbox-card');
  const summaryBaseTitle = document.getElementById('summary-base-title');
  const summaryBasePrice = document.getElementById('summary-base-price');
  const addonsCountEl = document.getElementById('addons-count');
  const summaryAddonsPrice = document.getElementById('summary-addons-price');
  const totalUsdAmount = document.getElementById('total-usd-amount');
  const totalVesAmount = document.getElementById('total-ves-amount');
  const estimatedDaysEl = document.getElementById('estimated-days');
  const sendQuoteWhatsappBtn = document.getElementById('send-quote-whatsapp-btn');
  const resetEstimatorBtn = document.getElementById('reset-estimator-btn');

  // Tasa referencial estimada de Bs por Dólar
  const bcvExchangeRate = 50.00;

  const calculateEstimator = () => {
    // 1. Tipo de Proyecto Base
    let selectedRadio = document.querySelector('input[name="project-type"]:checked');
    let projectKey = selectedRadio ? selectedRadio.value : 'landing';
    let baseData = basePrices[projectKey] || basePrices.landing;

    // Actualizar radio classes
    radioCards.forEach(card => {
      const input = card.querySelector('input');
      if (input.checked) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });

    // 2. Addons seleccionados
    let addonsTotal = 0;
    let addonsDays = 0;
    let selectedAddonNames = [];
    let count = 0;

    featureCheckboxes.forEach(card => {
      const input = card.querySelector('input');
      if (input.checked) {
        card.classList.add('checked');
        const price = parseInt(input.getAttribute('data-price'), 10) || 0;
        const time = parseInt(input.getAttribute('data-time'), 10) || 0;
        addonsTotal += price;
        addonsDays += time;
        count++;

        const titleText = card.querySelector('.feature-title').textContent.trim();
        selectedAddonNames.push(titleText);
      } else {
        card.classList.remove('checked');
      }
    });

    // 3. Totales
    const grandTotalUSD = baseData.price + addonsTotal;
    const grandTotalVES = (grandTotalUSD * bcvExchangeRate).toLocaleString('es-VE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    let totalDays = Math.max(3, baseData.days + addonsDays);

    // 4. Actualizar Interfaz
    if (summaryBaseTitle) summaryBaseTitle.textContent = baseData.title;
    if (summaryBasePrice) summaryBasePrice.textContent = `$${baseData.price} USD`;
    if (addonsCountEl) addonsCountEl.textContent = count;
    if (summaryAddonsPrice) summaryAddonsPrice.textContent = `+$${addonsTotal} USD`;
    if (totalUsdAmount) totalUsdAmount.textContent = grandTotalUSD;
    if (totalVesAmount) totalVesAmount.textContent = `${grandTotalVES} Bs`;
    if (estimatedDaysEl) estimatedDaysEl.textContent = `${totalDays - 1} a ${totalDays + 2} días hábiles`;

    // 5. Generar Enlace de WhatsApp
    if (sendQuoteWhatsappBtn) {
      let addonListStr = selectedAddonNames.length > 0 
        ? selectedAddonNames.map(a => `• ${a}`).join('%0A') 
        : 'Ninguna';

      const whatsappMessage = 
        `Hola Joendri! 👋 Estuve revisando tu portafolio web y me gustaría cotizar el siguiente proyecto:%0A%0A` +
        `📌 *Tipo de Proyecto:* ${baseData.title}%0A` +
        `🛠️ *Módulos extras:*%0A${addonListStr}%0A%0A` +
        `💰 *Inversión estimada:* $${grandTotalUSD} USD (~${grandTotalVES} Bs)%0A` +
        `⏱️ *Tiempo sugerido:* ${totalDays - 1} a ${totalDays + 2} días hábiles.%0A%0A` +
        `¿Cuándo podríamos agendar para discutir los detalles?`;

      sendQuoteWhatsappBtn.href = `https://wa.me/?text=${whatsappMessage}`;
    }
  };

  // Listeners de Cambios
  radioCards.forEach(card => {
    card.addEventListener('click', () => {
      const input = card.querySelector('input');
      input.checked = true;
      soundFX.click();
      calculateEstimator();
    });
  });

  featureCheckboxes.forEach(card => {
    card.addEventListener('click', (e) => {
      // Evitar doble toggle si se hace click directamente en el input
      if (e.target.tagName !== 'INPUT') {
        const input = card.querySelector('input');
        input.checked = !input.checked;
      }
      soundFX.click();
      calculateEstimator();
    });
  });

  if (resetEstimatorBtn) {
    resetEstimatorBtn.addEventListener('click', () => {
      document.querySelector('input[name="project-type"][value="landing"]').checked = true;
      featureCheckboxes.forEach(card => {
        const input = card.querySelector('input');
        input.checked = (input.value === 'darkmode' || input.value === 'whatsapp');
      });
      soundFX.click();
      calculateEstimator();
      showToast('Cotizador restablecido a valores iniciales', 'fa-solid fa-rotate-left');
    });
  }

  calculateEstimator();

  // ==================== 14. TERMINAL INTERACTIVA "JOENDRI-CLI" ====================
  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');
  const terminalBody = document.getElementById('terminal-body');
  const termClearBtn = document.getElementById('term-clear-btn');
  const quickCmdBtns = document.querySelectorAll('.quick-cmd-btn');

  let commandHistoryArr = [];
  let historyIdx = -1;

  const terminalCommands = {
    help: `
Comandos disponibles en Joendri-CLI:
  <span class="term-cmd">about</span>       - Conoce la visión y trayectoria de Joendri
  <span class="term-cmd">skills</span>      - Lista las tecnologías y niveles de dominio
  <span class="term-cmd">projects</span>    - Descubre los proyectos más destacados
  <span class="term-cmd">contact</span>     - Obtén medios de contacto directo
  <span class="term-cmd">quote</span>       - Genera una frase inspiradora para programadores
  <span class="term-cmd">matrix</span>      - Inicia el modo de lluvia digital cyberpunk
  <span class="term-cmd">date</span>        - Muestra la fecha y hora del sistema
  <span class="term-cmd">clear</span>       - Limpia el historial de la pantalla
  <span class="term-cmd">sudo</span>        - ¿Tienes permisos de superusuario?
    `,
    about: `
<strong>Joendri Albarran</strong>:
Desarrollador Web Frontend & creador de experiencias interactivas.
Radicado en Venezuela 🇻🇪, apasionado por transformar líneas de código en
interfaces limpias, estéticas y altamente usables con HTML5, CSS3, JS y Python.
    `,
    skills: `
<strong>MATRIZ DE HABILIDADES TÉCNICAS:</strong>
• [HTML5 Semántico]    ██████████ 95% (SEO, Accesibilidad, W3C)
• [CSS3 & Animaciones] █████████░ 90% (Grid, Flexbox, Glassmorphism)
• [JavaScript ES6+]    ████████░░ 85% (DOM, Async/Await, Events)
• [Python 3]           ████████░░ 80% (POO, Algoritmos, Scripts)
• [Mobile First / UX]  ██████████ 95% (100% Responsivo)
• [Git & GitHub]       ████████░░ 82% (Control de Versiones)
    `,
    projects: `
<strong>PROYECTOS DESTACADOS:</strong>
1. <strong>TortuVzla</strong>     - E-Commerce con carrito, tasa BCV y pedidos a WhatsApp.
2. <strong>MaracaiNet</strong>    - Portal de telecomunicaciones y planes de fibra óptica.
3. <strong>Python Suite</strong>  - Scripts de lógica de compras y narrativa interactiva.
💡 Puedes hacer clic en la sección 'Proyectos' del menú para verlos en detalle.
    `,
    contact: `
<strong>CANALES DE CONTACTO DIRECTO:</strong>
• Correo:    <span class="term-cmd">joendrialbarran.dev@gmail.com</span>
• WhatsApp:  Disponible desde el botón de la sección de contacto
• Estado:    🟢 Activo y disponible para proyectos
    `,
    quote: () => {
      const quotes = [
        `"Primero resuelve el problema, luego escribe el código." — John Johnson`,
        `"La simplicidad es el requisito previo para la fiabilidad." — Edsger W. Dijkstra`,
        `"Cualquiera puede escribir código que una computadora entienda. Los buenos programadores escriben código que los humanos pueden entender." — Martin Fowler`,
        `"El mejor código es aquel que no necesita explicación para ser disfrutado." — Joendri Albarran`
      ];
      return quotes[Math.floor(Math.random() * quotes.length)];
    },
    date: () => new Date().toLocaleString('es-VE'),
    sudo: `Permiso denegado: este incidente será reportado al Administrador (Joendri Albarran) 🛡️`,
    clear: '__CLEAR__'
  };

  const handleCommand = (rawInput) => {
    const cmd = rawInput.trim().toLowerCase();
    if (!cmd) return;

    soundFX.terminalKey();

    // Guardar en el historial
    commandHistoryArr.push(rawInput);
    historyIdx = commandHistoryArr.length;

    if (cmd === 'clear') {
      terminalHistory.innerHTML = '';
      return;
    }

    if (cmd === 'matrix') {
      showToast('Iniciando Matrix Digital Rain...', 'fa-solid fa-terminal');
      runMatrixEffect();
      return;
    }

    let response = '';
    if (terminalCommands[cmd]) {
      const val = terminalCommands[cmd];
      response = typeof val === 'function' ? val() : val;
    } else {
      response = `Comando no reconocido: "<strong>${cmd}</strong>". Escribe <span class="term-cmd">help</span> para ver los comandos válidos.`;
    }

    // Agregar bloque al historial
    const block = document.createElement('div');
    block.className = 'terminal-output-block';
    block.innerHTML = `
      <div class="term-history-cmd">
        <span class="term-prompt">joendri@portfolio:~$</span> ${escapeHTML(rawInput)}
      </div>
      <div class="term-response">${response}</div>
    `;
    terminalHistory.appendChild(block);

    // Auto scroll al final
    terminalBody.scrollTop = terminalBody.scrollHeight;
  };

  const escapeHTML = (str) => {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        handleCommand(val);
        terminalInput.value = '';
      } else if (e.key === 'ArrowUp') {
        if (historyIdx > 0) {
          historyIdx--;
          terminalInput.value = commandHistoryArr[historyIdx] || '';
        }
      } else if (e.key === 'ArrowDown') {
        if (historyIdx < commandHistoryArr.length - 1) {
          historyIdx++;
          terminalInput.value = commandHistoryArr[historyIdx] || '';
        } else {
          historyIdx = commandHistoryArr.length;
          terminalInput.value = '';
        }
      } else {
        soundFX.terminalKey();
      }
    });
  }

  if (termClearBtn) {
    termClearBtn.addEventListener('click', () => {
      terminalHistory.innerHTML = '';
      soundFX.click();
    });
  }

  quickCmdBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd === 'clear') {
        terminalHistory.innerHTML = '';
        soundFX.click();
      } else {
        terminalInput.value = cmd;
        handleCommand(cmd);
        terminalInput.value = '';
      }
    });
  });

  // Efecto Matrix en Terminal
  const runMatrixEffect = () => {
    const matrixBlock = document.createElement('div');
    matrixBlock.className = 'terminal-output-block';
    matrixBlock.innerHTML = `
      <div class="term-history-cmd">
        <span class="term-prompt">joendri@portfolio:~$</span> matrix
      </div>
      <div class="term-response" style="color: #10b981; font-family: var(--font-mono); font-size: 0.8rem; overflow: hidden; height: 140px;" id="matrix-container">
      </div>
    `;
    terminalHistory.appendChild(matrixBlock);

    const matrixBox = document.getElementById('matrix-container');
    const chars = '01010101010101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*';
    let steps = 0;

    const interval = setInterval(() => {
      let line = '';
      for (let i = 0; i < 48; i++) {
        line += chars[Math.floor(Math.random() * chars.length)] + ' ';
      }
      const p = document.createElement('div');
      p.textContent = line;
      matrixBox.appendChild(p);

      terminalBody.scrollTop = terminalBody.scrollHeight;
      steps++;

      if (steps > 10) {
        clearInterval(interval);
        const done = document.createElement('div');
        done.style.color = '#38bdf8';
        done.textContent = '>> Matriz descifrada con éxito. Bienvenido al núcleo del sistema.';
        matrixBox.appendChild(done);
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    }, 150);
  };

  // ==================== 15. FORMULARIO DE CONTACTO & VALIDACIÓN ====================
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const formFeedback = document.getElementById('form-feedback');
  const whatsappDirectBtn = document.getElementById('whatsapp-direct-send-btn');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validación Nombre
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Por favor ingresa tu nombre completo.';
        isValid = false;
      } else {
        nameError.textContent = '';
      }

      // Validación Email
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        emailError.textContent = 'Por favor ingresa un correo electrónico válido.';
        isValid = false;
      } else {
        emailError.textContent = '';
      }

      // Validación Mensaje
      if (!messageInput.value.trim() || messageInput.value.trim().length < 8) {
        messageError.textContent = 'El mensaje debe tener al menos 8 caracteres.';
        isValid = false;
      } else {
        messageError.textContent = '';
      }

      if (!isValid) {
        soundFX.click();
        return;
      }

      // Simulación de envío exitoso
      const submitBtn = document.getElementById('submit-btn');
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i><span>Enviando mensaje...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;

        soundFX.success();
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `
          <strong>¡Gracias por tu mensaje, ${escapeHTML(nameInput.value.trim())}!</strong><br>
          Joendri Albarran revisará tu consulta a la brevedad posible.
        `;

        showToast('Mensaje enviado con éxito ✉️', 'fa-solid fa-paper-plane');
        contactForm.reset();

        setTimeout(() => {
          formFeedback.className = 'form-feedback';
          formFeedback.innerHTML = '';
        }, 7000);
      }, 1200);
    });
  }

  // Enviar mensaje directo por WhatsApp desde el formulario
  if (whatsappDirectBtn) {
    whatsappDirectBtn.addEventListener('click', () => {
      const name = nameInput.value.trim() || 'un cliente';
      const subject = subjectInput.value.trim() || 'consulta de servicios web';
      const msg = messageInput.value.trim() || 'Me gustaría conocer más sobre tus proyectos.';

      const waText = `Hola Joendri! 👋 Soy ${name}. Te escribo referente a: "${subject}".%0A%0A"${msg}"`;
      window.open(`https://wa.me/?text=${encodeURI(waText)}`, '_blank');
      soundFX.click();
    });
  }

  // Mensaje de bienvenida en consola del navegador
  console.log(
    '%c🚀 Portafolio de Joendri Albarran cargado correctamente.',
    'color: #00f0ff; font-family: monospace; font-size: 14px; font-weight: bold; background: #0c101e; padding: 8px 14px; border-radius: 6px;'
  );
});
