/**
 * MARACAINET - FIBRA ÓPTICA ULTRARRÁPIDA EN MARACAIBO
 * CEO: JOENDRI ALBARRAN
 * Script Principal (JavaScript Puro)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuración de Empresa y Contacto
  const WHATSAPP_PHONE = '584124628698'; // Número directo de Joendri Albarran (0412-4628698)
  const TASA_BCV = 50.00; // Tasa oficial referencial en Bolívares

  // --- 1. Inicializar año y tasa en footer y navbar ---
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  const bcvRateDisplay = document.getElementById('bcv-rate');
  if (bcvRateDisplay) {
    bcvRateDisplay.textContent = `${TASA_BCV.toFixed(2)} Bs/$`;
  }

  // Sincronizar precios en Bolívares en las tarjetas de planes
  document.querySelectorAll('.plan-bcv-price').forEach(el => {
    const usdVal = parseFloat(el.dataset.usd) || 0;
    const vesVal = usdVal * TASA_BCV;
    el.textContent = `${vesVal.toLocaleString('es-VE', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} Bs`;
  });

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

  // --- 3. Contador de Velocidad en Vivo (Hero) ---
  const heroSpeedCounter = document.getElementById('hero-speed-counter');
  if (heroSpeedCounter) {
    setInterval(() => {
      // Oscilación realista entre 1020 y 1032 Mbps
      const jitter = Math.floor(Math.random() * 12) + 1020;
      heroSpeedCounter.textContent = jitter;
    }, 2500);
  }

  // --- 4. Verificador Interactivo de Cobertura en Maracaibo ---
  const coverageInput = document.getElementById('coverage-input');
  const btnCheckCoverage = document.getElementById('btn-check-coverage');
  const sectorTagBtns = document.querySelectorAll('.s-tag-btn');
  const coverageResult = document.getElementById('coverage-result');
  const resZoneTitle = document.getElementById('res-zone-title');
  const resZoneDesc = document.getElementById('res-zone-desc');
  const resWaBtn = document.getElementById('res-wa-btn');

  // Sectores populares de Maracaibo con cobertura activa
  const activeSectors = [
    '5 de julio', 'bella vista', 'cecilio acosta', 'la lago', 'delicias',
    'tierra negra', 'el milagro', 'san francisco', 'la limpia', 'canta claro',
    'los olivos', 'amparo', 'sabaneta', 'sierra maestra', 'santa rita',
    'maracaibo', 'indio mara', 'dr portillo', 'veritas', 'la coromoto'
  ];

  function evaluateCoverage(query) {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) {
      alert('Por favor ingresa o selecciona un sector de Maracaibo.');
      return;
    }

    const hasCoverage = activeSectors.some(sector => cleanQuery.includes(sector) || sector.includes(cleanQuery));

    if (coverageResult) {
      coverageResult.style.display = 'flex';
      coverageResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      if (hasCoverage) {
        resZoneTitle.innerHTML = `<span class="text-green">¡Cobertura 100% Confirmada en ${query}!</span>`;
        resZoneDesc.textContent = `Nuestros postes y cajas de empalme están activos en este sector. Instalación express programable en 24-48 horas con router WiFi 6 incluido.`;
        if (resWaBtn) {
          const msg = `Hola Joendri, verifiqué cobertura en la web para el sector ${query} en Maracaibo y quiero agendar mi instalación de 1 Gbps.`;
          resWaBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
        }
      } else {
        resZoneTitle.innerHTML = `<span class="text-cyan">¡Factibilidad en Verificación para ${query}!</span>`;
        resZoneDesc.textContent = `Estamos desplegando nuevas mufas en esta zona. Escríbenos tu dirección exacta para enviar un técnico a revisar postes cercanos.`;
        if (resWaBtn) {
          const msg = `Hola Joendri, quiero consultar factibilidad técnica para mi dirección en el sector ${query} de Maracaibo.`;
          resWaBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
        }
      }
    }
  }

  if (btnCheckCoverage && coverageInput) {
    btnCheckCoverage.addEventListener('click', () => {
      evaluateCoverage(coverageInput.value);
    });

    coverageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        evaluateCoverage(coverageInput.value);
      }
    });
  }

  sectorTagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const sector = btn.dataset.sector;
      if (coverageInput) coverageInput.value = sector;
      evaluateCoverage(sector);
    });
  });

  // --- 5. Speedtest Interactivo Simulado ---
  const btnStartSpeedtest = document.getElementById('btn-start-speedtest');
  const testStatus = document.getElementById('test-status');
  const testNumber = document.getElementById('test-number');
  const resDown = document.getElementById('res-down');
  const resUp = document.getElementById('res-up');
  const resPing = document.getElementById('res-ping');
  let isTesting = false;

  if (btnStartSpeedtest) {
    btnStartSpeedtest.addEventListener('click', () => {
      if (isTesting) return;
      isTesting = true;
      btnStartSpeedtest.disabled = true;
      btnStartSpeedtest.classList.remove('btn-pulse');

      // Fase 1: Ping
      testStatus.textContent = '⚡ Conectando con servidor MaracaiNet FTTH Core (Maracaibo)...';
      testNumber.textContent = '0';
      resDown.textContent = 'Calculando...';
      resUp.textContent = '--';
      resPing.textContent = 'Conectando...';

      setTimeout(() => {
        const pingVal = Math.floor(Math.random() * 6) + 12; // 12-18 ms
        resPing.textContent = `${pingVal} ms`;
        testStatus.textContent = '🚀 Probando velocidad de DESCARGA (1 Gbps)...';

        // Fase 2: Download
        let currentSpeed = 0;
        const targetDown = 1024;
        const intervalDown = setInterval(() => {
          currentSpeed += Math.floor(Math.random() * 85) + 35;
          if (currentSpeed >= targetDown) {
            currentSpeed = targetDown;
            clearInterval(intervalDown);
            resDown.textContent = `${currentSpeed}.00 Mbps`;
            testStatus.textContent = '📤 Probando velocidad de SUBIDA Simétrica...';

            // Fase 3: Upload
            let upSpeed = 0;
            const targetUp = 1024;
            const intervalUp = setInterval(() => {
              upSpeed += Math.floor(Math.random() * 80) + 40;
              if (upSpeed >= targetUp) {
                upSpeed = targetUp;
                clearInterval(intervalUp);
                resUp.textContent = `${upSpeed}.00 Mbps`;
                testStatus.innerHTML = '🟢 <strong>¡PRUEBA COMPLETADA!</strong> Fibra Óptica 1 Gbps Simétrica al 100%.';
                isTesting = false;
                btnStartSpeedtest.disabled = false;
                btnStartSpeedtest.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Repetir Speedtest';
              } else {
                testNumber.textContent = upSpeed;
              }
            }, 60);
          } else {
            testNumber.textContent = currentSpeed;
          }
        }, 60);

      }, 1000);
    });
  }

  // --- 6. Cotizador Interactivo de Tarifa e Instalación ---
  const planPills = document.querySelectorAll('#plan-selection-group .plan-pill');
  const sectorSelect = document.getElementById('calc-sector-select');
  const addonCheckboxes = document.querySelectorAll('.addons-list input[type="checkbox"]');

  // Elementos de resumen
  const calcTotalUsd = document.getElementById('calc-total-usd');
  const calcTotalVes = document.getElementById('calc-total-ves');
  const sumPlanTitle = document.getElementById('sum-plan-title');
  const sumSectorTitle = document.getElementById('sum-sector-title');
  const sumAddonsTitle = document.getElementById('sum-addons-title');
  const btnCalcWa = document.getElementById('btn-calc-wa');

  let quoteState = {
    planTitle: 'MaracaiNet 1 Gbps (1,000 Mbps)',
    planPrice: 25.0,
    sectorTitle: '5 de Julio / Indio Mara',
    addons: ['Mini UPS de Respaldo para el Router (6 horas sin luz)'],
    addonsTotal: 20.0
  };

  planPills.forEach(pill => {
    pill.addEventListener('click', () => {
      planPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      quoteState.planPrice = parseFloat(pill.dataset.price) || 25.0;
      quoteState.planTitle = pill.dataset.plan;
      updateQuote();
    });
  });

  if (sectorSelect) {
    sectorSelect.addEventListener('change', (e) => {
      quoteState.sectorTitle = e.target.value;
      updateQuote();
    });
  }

  addonCheckboxes.forEach(chk => {
    chk.addEventListener('change', () => {
      recalculateAddons();
      updateQuote();
    });
  });

  function recalculateAddons() {
    quoteState.addons = [];
    let sum = 0;
    addonCheckboxes.forEach(chk => {
      if (chk.checked) {
        quoteState.addons.push(chk.value);
        sum += parseFloat(chk.dataset.extra) || 0;
      }
    });
    quoteState.addonsTotal = sum;
  }

  function updateQuote() {
    const totalUSD = quoteState.planPrice + quoteState.addonsTotal;
    const totalVES = totalUSD * TASA_BCV;

    if (calcTotalUsd) calcTotalUsd.textContent = totalUSD.toFixed(2);
    if (calcTotalVes) calcTotalVes.textContent = totalVES.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Bs';

    if (sumPlanTitle) sumPlanTitle.textContent = quoteState.planTitle;
    if (sumSectorTitle) sumSectorTitle.textContent = quoteState.sectorTitle;
    if (sumAddonsTitle) {
      sumAddonsTitle.textContent = quoteState.addons.length > 0
        ? quoteState.addons.join(' + ')
        : 'Ninguno';
    }

    const addonsText = quoteState.addons.length > 0
      ? quoteState.addons.join(' + ')
      : 'Ninguno adicional';

    const waText = 
`⚡ *¡Hola Joendri Albarran! Quiero contratar MaracaiNet:*
━━━━━━━━━━━━━━━━━━━━
🚀 *Plan Seleccionado:* ${quoteState.planTitle}
📍 *Sector en Maracaibo:* ${quoteState.sectorTitle}
🔌 *Equipamiento Extra:* ${addonsText}
━━━━━━━━━━━━━━━━━━━━
💵 *Presupuesto Estimado:* $${totalUSD.toFixed(2)} USD (~${totalVES.toFixed(2)} Bs a tasa BCV)

¿Cuándo puede venir la cuadrilla de instalación a mi casa? ¡Muchas gracias!`;

    if (btnCalcWa) {
      btnCalcWa.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waText)}`;
    }
  }

  // Inicializar cálculo inicial
  recalculateAddons();
  updateQuote();

  // --- 7. Acordeón de FAQ ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const toggleBtn = item.querySelector('.faq-toggle');
    toggleBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- 8. Formulario de Contratación Directo a WhatsApp ---
  const maracaiForm = document.getElementById('maracainet-form');
  if (maracaiForm) {
    maracaiForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('client-name').value.trim();
      const phone = document.getElementById('client-phone').value.trim();
      const sector = document.getElementById('client-sector').value.trim();
      const plan = document.getElementById('client-plan').value;
      const address = document.getElementById('client-address').value.trim() || 'Por coordinar por chat';
      const notes = document.getElementById('client-notes').value.trim() || 'Sin observaciones adicionales';

      if (!name || !phone || !sector) {
        alert('Por favor completa los campos obligatorios (*).');
        return;
      }

      const formattedOrder = 
`⚡ *SOLICITUD DE INSTALACIÓN MARACAINET (FIBRA ÓPTICA)* ⚡
━━━━━━━━━━━━━━━━━━━━━━
👤 *Cliente:* ${name}
📱 *Teléfono:* ${phone}
📍 *Sector:* ${sector}
🚀 *Plan:* ${plan}
🏠 *Dirección:* ${address}
📝 *Observaciones:* ${notes}
━━━━━━━━━━━━━━━━━━━━━━
¡Hola Joendri Albarran! Vengo de la página web de MaracaiNet y deseo contratar la fibra óptica. ¿Me confirmas factibilidad técnica por favor?`;

      const targetUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(formattedOrder)}`;
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // --- 9. Scroll Suave ---
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
