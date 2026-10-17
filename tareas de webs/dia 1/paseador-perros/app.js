/**
 * JOENDRI ALBARRAN - PASEADOR DE PERROS PROFESIONAL
 * Script Principal (JavaScript Puro)
 * Funcionalidades interactivas, cotizador en tiempo real y conexión con WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  // Constantes de contacto y tasa
  const WHATSAPP_PHONE = '584124628698'; // Número de Joendri Albarran (0412-4628698 con código país +58)
  const TASA_BCV_USD = 50.00; // Tasa referencial en Bolívares

  // --- 1. Inicializar año dinámico en footer ---
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --- 2. Simulación de Cronómetro de Paseo en Vivo (Hero) ---
  const liveTimer = document.getElementById('live-timer');
  if (liveTimer) {
    let seconds = 34 * 60 + 12; // Inicia en 34:12
    setInterval(() => {
      seconds++;
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      liveTimer.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')} min`;
    }, 1000);
  }

  // --- 3. Navbar Sticky & Menú Móvil ---
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active');
    });

    // Cerrar menú móvil al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // --- 4. Cotizador Interactivo de Paseos Caninos ---
  const dogSizeButtons = document.querySelectorAll('#dog-size-options .opt-pill');
  const durationButtons = document.querySelectorAll('#duration-options .opt-pill');
  const modalityRadios = document.querySelectorAll('input[name="modalidad"]');
  const frequencySelect = document.getElementById('calc-frequency');
  const extraCheckboxes = document.querySelectorAll('.extras-grid input[type="checkbox"]');

  // Elementos de resumen y precios
  const totalUsdSpan = document.getElementById('calc-total-usd');
  const totalVesSpan = document.getElementById('calc-total-ves');
  const summarySize = document.getElementById('summary-size');
  const summaryDuration = document.getElementById('summary-duration');
  const summaryModality = document.getElementById('summary-modality');
  const summaryFrequency = document.getElementById('summary-frequency');
  const summaryExtras = document.getElementById('summary-extras');
  const calcWhatsappBtn = document.getElementById('calc-whatsapp-btn');

  // Estado del Cotizador
  let currentSelection = {
    sizeText: 'Pequeño',
    sizeMultiplier: 1.0,
    durationText: '60 Minutos',
    basePrice: 8.0,
    isVip: false,
    modalityText: 'Grupal (2-3 amigos)',
    frequencyText: 'Paseo Individual (1 sola vez)',
    frequencyMultiplier: 1.0,
    extras: [],
    extrasTotal: 0
  };

  // Eventos para tamaño del perro
  dogSizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      dogSizeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSelection.sizeText = btn.querySelector('strong').textContent;
      currentSelection.sizeMultiplier = parseFloat(btn.dataset.priceMult) || 1.0;
      updateCalculator();
    });
  });

  // Eventos para duración del paseo
  durationButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      durationButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSelection.durationText = btn.querySelector('strong').textContent;
      currentSelection.basePrice = parseFloat(btn.dataset.basePrice) || 8.0;
      updateCalculator();
    });
  });

  // Eventos para modalidad (Grupal vs VIP)
  modalityRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.radio-card').forEach(card => card.classList.remove('active'));
      radio.closest('.radio-card').classList.add('active');
      currentSelection.isVip = radio.value.includes('VIP');
      currentSelection.modalityText = radio.value;
      updateCalculator();
    });
  });

  // Eventos para frecuencia
  if (frequencySelect) {
    frequencySelect.addEventListener('change', (e) => {
      const selectedOption = e.target.options[e.target.selectedIndex];
      currentSelection.frequencyText = selectedOption.text;
      currentSelection.frequencyMultiplier = parseFloat(selectedOption.dataset.freqMult) || 1.0;
      updateCalculator();
    });
  }

  // Eventos para extras
  extraCheckboxes.forEach(chk => {
    chk.addEventListener('change', () => {
      recalcExtras();
      updateCalculator();
    });
  });

  function recalcExtras() {
    currentSelection.extras = [];
    let sum = 0;
    extraCheckboxes.forEach(chk => {
      if (chk.checked) {
        currentSelection.extras.push(chk.value);
        sum += parseFloat(chk.dataset.cost) || 0;
      }
    });
    currentSelection.extrasTotal = sum;
  }

  // Función principal de cálculo y generación de enlace WhatsApp
  function updateCalculator() {
    // Cálculo base por sesión
    let singleSessionCost = (currentSelection.basePrice * currentSelection.sizeMultiplier);
    if (currentSelection.isVip) {
      singleSessionCost += 3.0; // Recargo VIP
    }

    // Total aplicando frecuencia y extras
    let totalUSD = (singleSessionCost * currentSelection.frequencyMultiplier) + currentSelection.extrasTotal;
    let totalVES = totalUSD * TASA_BCV_USD;

    // Actualizar visualmente la tarjeta de resumen
    if (totalUsdSpan) totalUsdSpan.textContent = totalUSD.toFixed(2);
    if (totalVesSpan) totalVesSpan.textContent = totalVES.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Bs';

    if (summarySize) summarySize.textContent = currentSelection.sizeText;
    if (summaryDuration) summaryDuration.textContent = currentSelection.durationText;
    if (summaryModality) summaryModality.textContent = currentSelection.modalityText;
    if (summaryFrequency) summaryFrequency.textContent = currentSelection.frequencyText;
    if (summaryExtras) {
      summaryExtras.textContent = currentSelection.extras.length > 0
        ? currentSelection.extras.join(', ')
        : 'Ninguno';
    }

    // Construcción del mensaje predefinido para WhatsApp
    const extrasListText = currentSelection.extras.length > 0
      ? currentSelection.extras.join(' + ')
      : 'Ninguno';

    const waMessage = 
`🐾 *¡Hola Joendri Albarran! Quiero cotizar un paseo para mi perro:*
━━━━━━━━━━━━━━━━━━━━
🐕 *Tamaño del perro:* ${currentSelection.sizeText}
⏱️ *Duración de caminata:* ${currentSelection.durationText}
👥 *Modalidad:* ${currentSelection.modalityText}
📅 *Frecuencia:* ${currentSelection.frequencyText}
✨ *Servicios extras:* ${extrasListText}
━━━━━━━━━━━━━━━━━━━━
💵 *Presupuesto Estimado:* $${totalUSD.toFixed(2)} USD (~${totalVES.toFixed(2)} Bs)

¿Cuándo tendrías disponibilidad para agendar el primer paseo de prueba? ¡Muchas gracias!`;

    const encodedMessage = encodeURIComponent(waMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

    if (calcWhatsappBtn) {
      calcWhatsappBtn.href = whatsappUrl;
    }
  }

  // Inicializar cálculo por defecto
  updateCalculator();

  // --- 5. Filtro de Galería de Amigos Peludos ---
  const filterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
  const dogCards = document.querySelectorAll('.dogs-grid .dog-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.dataset.filter;

      dogCards.forEach(card => {
        const categories = card.dataset.category || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 6. Preguntas Frecuentes (FAQ Accordion) ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Cerrar otros acordeones
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // Alternar el actual
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- 7. Formulario de Reserva con Envío Directo a WhatsApp ---
  const bookingForm = document.getElementById('dog-booking-form');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const ownerName = document.getElementById('owner-name').value.trim();
      const ownerPhone = document.getElementById('owner-phone').value.trim();
      const dogName = document.getElementById('dog-name').value.trim();
      const dogBreed = document.getElementById('dog-breed').value.trim();
      const walkType = document.getElementById('walk-type').value;
      const walkSchedule = document.getElementById('walk-schedule').value;
      const clientZone = document.getElementById('client-zone').value.trim() || 'No especificada';
      const specialNotes = document.getElementById('special-notes').value.trim() || 'Sin observaciones especiales';

      if (!ownerName || !ownerPhone || !dogName || !dogBreed) {
        alert('Por favor completa los campos requeridos con asterisco (*).');
        return;
      }

      // Redacción del mensaje detallado para WhatsApp de Joendri
      const message = 
`🐾 *¡SOLICITUD DE PASEO CANINO - JOENDRI ALBARRAN!* 🐾
━━━━━━━━━━━━━━━━━━━━━━
👤 *Dueño:* ${ownerName}
📱 *Teléfono:* ${ownerPhone}
🐕 *Perrito:* ${dogName} (${dogBreed})
🚶 *Servicio deseado:* ${walkType}
⏰ *Horario preferido:* ${walkSchedule}
📍 *Zona / Ubicación:* ${clientZone}
📝 *Indicaciones especiales:* ${specialNotes}
━━━━━━━━━━━━━━━━━━━━━━
¡Hola Joendri! Vi tu página web y me gustaría coordinar este servicio. ¿Me confirmas por favor?`;

      const finalUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

      // Abrir WhatsApp en pestaña nueva
      window.open(finalUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // --- 8. Enlaces suaves de navegación interna ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
