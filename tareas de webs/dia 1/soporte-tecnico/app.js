/**
 * JOENDRI TECH - SOPORTE TÉCNICO DE COMPUTACIÓN (L1 & L2)
 * 100% SOFTWARE, SISTEMAS, WINDOWS & BACKUPS
 * Script Principal (JavaScript Puro)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Constantes de contacto
  const WHATSAPP_PHONE = '584124628698'; // Número de Joendri Albarran (0412-4628698)
  const TASA_BCV_USD = 50.00; // Tasa referencial en Bolívares

  // --- 1. Año dinámico en Footer ---
  const yearSpan = document.getElementById('year-span');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- 2. Navbar Sticky & Menú Móvil ---
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

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // --- 3. Diagnóstico Rápido Interactivo ("¿Qué le pasa a tu PC?") ---
  const diagCards = document.querySelectorAll('.diag-card');
  const solIcon = document.getElementById('sol-icon');
  const solTitle = document.getElementById('sol-title');
  const solDesc = document.getElementById('sol-desc');
  const solTags = document.getElementById('sol-tags');
  const solWaLink = document.getElementById('sol-wa-link');

  const diagnosticSolutions = {
    optimizacion: {
      icon: '<i class="fa-solid fa-gauge-high"></i>',
      title: 'Optimización Profunda & Aceleración de Sistema',
      desc: 'Eliminación de programas espía de arranque, limpieza de registros y temporales, configuración de memoria virtual y desactivación de telemetría invasiva para que vuelva a encender en segundos.',
      tags: [
        '<span class="s-tag"><i class="fa-solid fa-check"></i> Sin tocar tus fotos ni documentos</span>',
        '<span class="s-tag"><i class="fa-solid fa-check"></i> Disponible vía remota AnyDesk</span>',
        '<span class="s-tag"><i class="fa-solid fa-check"></i> Corrige el disco al 100%</span>'
      ],
      waMessage: 'Hola Joendri, mi computadora está sumamente lenta y quiero el servicio de Optimización y Aceleración de Sistema.'
    },
    formateo: {
      icon: '<i class="fa-brands fa-windows"></i>',
      title: 'Instalación Limpia de Windows 10/11 + Backup Preventivo',
      desc: 'Reinstalación limpia del sistema operativo desde cero con copia de seguridad completa previa. Drivers oficiales, optimización y suite esencial lista para usar.',
      tags: [
        '<span class="s-tag"><i class="fa-solid fa-check"></i> 100% libre de errores y bucles</span>',
        '<span class="s-tag"><i class="fa-solid fa-check"></i> Respaldo de archivos garantizado</span>',
        '<span class="s-tag"><i class="fa-solid fa-check"></i> Windows activado y con drivers</span>'
      ],
      waMessage: 'Hola Joendri, mi computadora tiene fallas de arranque/pantalla azul y necesito instalar Windows 10/11 con respaldo de mis archivos.'
    },
    virus: {
      icon: '<i class="fa-solid fa-shield-virus"></i>',
      title: 'Desinfección Profunda de Malware, Troyanos y Pop-ups',
      desc: 'Escaneo y erradicación de virus, mineros de criptomonedas ocultos, secuestradores de navegador y malware de pendrives USB, restaurando archivos que hayan quedado ocultos.',
      tags: [
        '<span class="s-tag"><i class="fa-solid fa-check"></i> Recuperación de accesos directos USB</span>',
        '<span class="s-tag"><i class="fa-solid fa-check"></i> Instalación de antivirus Pro</span>',
        '<span class="s-tag"><i class="fa-solid fa-check"></i> Navegadores 100% limpios</span>'
      ],
      waMessage: 'Hola Joendri, mi equipo tiene sospecha de virus o publicidad molesta y necesito el servicio de desinfección y seguridad.'
    },
    remoto: {
      icon: '<i class="fa-solid fa-headset"></i>',
      title: 'Soporte Remoto Inmediato L1/L2 vía AnyDesk',
      desc: 'Solución a distancia en minutos: configuración de impresoras en red, corrección de errores de Office (Word/Excel), instalación de programas específicos y soporte de usuario.',
      tags: [
        '<span class="s-tag"><i class="fa-solid fa-check"></i> Sin salir de tu casa u oficina</span>',
        '<span class="s-tag"><i class="fa-solid fa-check"></i> Conexión 100% segura y visible</span>',
        '<span class="s-tag"><i class="fa-solid fa-check"></i> Atención rápida el mismo día</span>'
      ],
      waMessage: 'Hola Joendri, necesito asistencia técnica remota por AnyDesk para solucionar un problema con mi computadora/programas.'
    }
  };

  diagCards.forEach(card => {
    card.addEventListener('click', () => {
      diagCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const solKey = card.dataset.solution;
      const data = diagnosticSolutions[solKey];

      if (data) {
        if (solIcon) solIcon.innerHTML = data.icon;
        if (solTitle) solTitle.textContent = data.title;
        if (solDesc) solDesc.textContent = data.desc;
        if (solTags) solTags.innerHTML = data.tags.join('');
        if (solWaLink) {
          solWaLink.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(data.waMessage)}`;
        }
      }
    });
  });

  // --- 4. Cotizador Inteligente de Servicios IT ---
  const baseServiceButtons = document.querySelectorAll('#base-service-options .s-pill');
  const deviceRadios = document.querySelectorAll('input[name="device_type"]');
  const modalitySelect = document.getElementById('calc-modality');
  const addonCheckboxes = document.querySelectorAll('.addons-grid input[type="checkbox"]');

  // Elementos de salida del cotizador
  const totalPriceUsd = document.getElementById('total-price-usd');
  const totalPriceVes = document.getElementById('total-price-ves');
  const sumService = document.getElementById('sum-service');
  const sumDevice = document.getElementById('sum-device');
  const sumModality = document.getElementById('sum-modality');
  const sumAddons = document.getElementById('sum-addons');
  const btnQuoteWhatsapp = document.getElementById('btn-quote-whatsapp');

  let currentQuote = {
    serviceTitle: 'Instalación de Windows 10/11 + Drivers Oficiales',
    servicePrice: 15.0,
    deviceType: 'Laptop / Portátil',
    modalityTitle: 'Soporte Remoto Online vía AnyDesk',
    modalityExtra: 0.0,
    addons: ['Paquete Completo de Ofimática (Office)'],
    addonsTotal: 5.0
  };

  // Botones de servicio base
  baseServiceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      baseServiceButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentQuote.servicePrice = parseFloat(btn.dataset.price) || 15.0;
      currentQuote.serviceTitle = btn.dataset.title;
      recalculateQuote();
    });
  });

  // Radios de tipo de equipo
  deviceRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.radio-pill').forEach(pill => pill.classList.remove('active'));
      radio.closest('.radio-pill').classList.add('active');
      currentQuote.deviceType = radio.value;
      recalculateQuote();
    });
  });

  // Selector de modalidad
  if (modalitySelect) {
    modalitySelect.addEventListener('change', (e) => {
      const selected = e.target.options[e.target.selectedIndex];
      currentQuote.modalityTitle = selected.value;
      currentQuote.modalityExtra = parseFloat(selected.dataset.extra) || 0.0;
      recalculateQuote();
    });
  }

  // Checkboxes de agregados / extras
  addonCheckboxes.forEach(chk => {
    chk.addEventListener('change', () => {
      recalcAddons();
      recalculateQuote();
    });
  });

  function recalcAddons() {
    currentQuote.addons = [];
    let sum = 0;
    addonCheckboxes.forEach(chk => {
      if (chk.checked) {
        currentQuote.addons.push(chk.value);
        sum += parseFloat(chk.dataset.cost) || 0;
      }
    });
    currentQuote.addonsTotal = sum;
  }

  function recalculateQuote() {
    const totalUSD = currentQuote.servicePrice + currentQuote.modalityExtra + currentQuote.addonsTotal;
    const totalVES = totalUSD * TASA_BCV_USD;

    if (totalPriceUsd) totalPriceUsd.textContent = totalUSD.toFixed(2);
    if (totalPriceVes) totalPriceVes.textContent = totalVES.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Bs';

    if (sumService) sumService.textContent = currentQuote.serviceTitle;
    if (sumDevice) sumDevice.textContent = currentQuote.deviceType;
    if (sumModality) sumModality.textContent = currentQuote.modalityTitle;
    if (sumAddons) {
      sumAddons.textContent = currentQuote.addons.length > 0
        ? currentQuote.addons.join(', ')
        : 'Ninguno';
    }

    const addonsText = currentQuote.addons.length > 0
      ? currentQuote.addons.join(' + ')
      : 'Ninguno adicional';

    // Generar mensaje listo para WhatsApp
    const waText = 
`💻 *¡Hola Joendri Albarran! Quiero cotizar soporte para mi computadora:*
━━━━━━━━━━━━━━━━━━━━
⚙️ *Servicio Base:* ${currentQuote.serviceTitle}
🖥️ *Tipo de Equipo:* ${currentQuote.deviceType}
🌐 *Modalidad:* ${currentQuote.modalityTitle}
🧩 *Servicios Extras:* ${addonsText}
━━━━━━━━━━━━━━━━━━━━
💵 *Presupuesto Estimado:* $${totalUSD.toFixed(2)} USD (~${totalVES.toFixed(2)} Bs)

¿Cuándo tendrías disponibilidad para revisar mi equipo? ¡Muchas gracias!`;

    if (btnQuoteWhatsapp) {
      btnQuoteWhatsapp.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waText)}`;
    }
  }

  // Inicializar cálculo inicial
  recalcAddons();
  recalculateQuote();

  // --- 5. Acordeón de Preguntas Frecuentes (FAQ) ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-btn');
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- 6. Formulario de Contacto y Solicitud Directo a WhatsApp ---
  const techForm = document.getElementById('tech-service-form');

  if (techForm) {
    techForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const clientName = document.getElementById('client-name').value.trim();
      const clientPhone = document.getElementById('client-phone').value.trim();
      const deviceType = document.getElementById('device-type-select').value;
      const serviceReq = document.getElementById('service-required').value;
      const modality = document.getElementById('modalidad-pref').value;
      const problemDesc = document.getElementById('problem-desc').value.trim() || 'No especificada';

      if (!clientName || !clientPhone) {
        alert('Por favor indica tu nombre y teléfono de contacto.');
        return;
      }

      const formattedMessage = 
`💻 *SOLICITUD DE ASISTENCIA TÉCNICA - JOENDRI ALBARRAN* 💻
━━━━━━━━━━━━━━━━━━━━━━
👤 *Cliente:* ${clientName}
📱 *Teléfono:* ${clientPhone}
🖥️ *Equipo:* ${deviceType}
⚙️ *Servicio Deseado:* ${serviceReq}
🌐 *Modalidad Preferida:* ${modalidad}
📝 *Problema o Falla:* ${problemDesc}
━━━━━━━━━━━━━━━━━━━━━━
¡Hola Joendri! Vi tu página web y necesito tu apoyo técnico con este equipo. ¿Me confirmas por favor?`;

      const finalUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(formattedMessage)}`;
      window.open(finalUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // --- 7. Enlaces de Navegación Suave ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
