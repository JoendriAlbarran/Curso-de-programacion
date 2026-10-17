/**
 * ==========================================================================
 * ALBARRAN AVIATION PRESTIGE — JAVASCRIPT
 * Lógica: Configurador Bespoke, Calculadora de Rutas, Audio de Turbina & Divisas
 * Presidido por Joendri Albarran
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==================== 1. CONSTANTES & ESTADO GLOBAL ====================
  let activeCurrency = 'USD'; // 'USD', 'EUR', 'BTC'
  const EUR_RATE = 0.92;      // 1 USD = 0.92 EUR
  const BTC_RATE = 90000;     // 1 BTC = $90,000 USD

  // ==================== 2. SISTEMA DE AUDIO DE TURBINA (WEB AUDIO API) ====================
  // Genera el zumbido suave y relajante de una turbina de jet privado a altitud de crucero
  let audioCtx = null;
  let turbineOsc1 = null;
  let turbineOsc2 = null;
  let turbineGain = null;
  let isTurbineActive = false;

  const turbineSoundBtn = document.getElementById('turbine-sound-btn');
  const soundIcon = document.getElementById('sound-icon');

  const startTurbineSound = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioCtx) audioCtx = new AudioContextClass();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      // Oscilador 1: Tono grave del rotor principal
      turbineOsc1 = audioCtx.createOscillator();
      turbineOsc1.type = 'sine';
      turbineOsc1.frequency.setValueAtTime(68, audioCtx.currentTime);

      // Oscilador 2: Armónico de flujo de aire
      turbineOsc2 = audioCtx.createOscillator();
      turbineOsc2.type = 'triangle';
      turbineOsc2.frequency.setValueAtTime(136, audioCtx.currentTime);

      // Filtro paso bajo para imitar el aislamiento acústico de cabina whispering-quiet
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, audioCtx.currentTime);

      turbineGain = audioCtx.createGain();
      turbineGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      turbineGain.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + 2);

      turbineOsc1.connect(filter);
      turbineOsc2.connect(filter);
      filter.connect(turbineGain);
      turbineGain.connect(audioCtx.destination);

      turbineOsc1.start();
      turbineOsc2.start();

      isTurbineActive = true;
      turbineSoundBtn.classList.add('active');
      soundIcon.className = 'fa-solid fa-volume-high';
      showToast('Presurización de cabina activa • Turbinas Rolls-Royce Pearl 700 ✈️', 'fa-solid fa-plane');
    } catch (e) {
      console.warn('Audio no disponible:', e);
    }
  };

  const stopTurbineSound = () => {
    if (turbineGain && audioCtx) {
      turbineGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
      setTimeout(() => {
        if (turbineOsc1) turbineOsc1.stop();
        if (turbineOsc2) turbineOsc2.stop();
        isTurbineActive = false;
        turbineSoundBtn.classList.remove('active');
        soundIcon.className = 'fa-solid fa-volume-xmark';
        showToast('Sonido ambiental de cabina silenciado', 'fa-solid fa-volume-xmark');
      }, 1200);
    }
  };

  if (turbineSoundBtn) {
    turbineSoundBtn.addEventListener('click', () => {
      if (!isTurbineActive) {
        startTurbineSound();
      } else {
        stopTurbineSound();
      }
    });
  }

  // Clic suave de retroalimentación
  const playClickFeedback = () => {
    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) audioCtx = new AudioContextClass();
      }
      if (!audioCtx || audioCtx.state === 'suspended') return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (_) {}
  };

  // ==================== 3. TOAST NOTIFICATIONS ====================
  const toastHub = document.getElementById('toast-hub');

  const showToast = (message, iconClass = 'fa-solid fa-shield-halved', duration = 3200) => {
    if (!toastHub) return;

    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `<i class="${iconClass} gold-accent"></i><span>${message}</span>`;
    toastHub.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 350);
    }, duration);
  };

  // ==================== 4. SELECTOR DE DIVISAS ($ USD / € EUR / ₿ BTC) ====================
  const currPills = document.querySelectorAll('.curr-pill');

  const formatMillionsPrice = (millionsUSD) => {
    if (activeCurrency === 'USD') {
      return `$${millionsUSD.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M USD`;
    } else if (activeCurrency === 'EUR') {
      const eurMillions = millionsUSD * EUR_RATE;
      return `€${eurMillions.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M EUR`;
    } else {
      const btcTotal = Math.round((millionsUSD * 1000000) / BTC_RATE);
      return `₿ ${btcTotal.toLocaleString()} BTC`;
    }
  };

  const updateAllPrices = () => {
    // Precios de la Flota
    document.querySelectorAll('.aircraft-price').forEach(el => {
      const usdMillions = parseFloat(el.getAttribute('data-usd'));
      if (!isNaN(usdMillions)) {
        el.textContent = formatMillionsPrice(usdMillions);
      }
    });

    // Precio Insignia Hero
    const heroPriceEl = document.querySelector('.hero-featured-card .price-val');
    if (heroPriceEl) {
      const usd = parseFloat(heroPriceEl.getAttribute('data-usd'));
      if (!isNaN(usd)) {
        heroPriceEl.textContent = formatMillionsPrice(usd);
      }
    }

    // Actualizar Configurador
    recalculateConfigurator();
  };

  currPills.forEach(pill => {
    pill.addEventListener('click', () => {
      currPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCurrency = pill.getAttribute('data-curr');
      playClickFeedback();
      updateAllPrices();
      showToast(`Divisa de referencia actualizada a: ${activeCurrency}`, 'fa-solid fa-coins');
    });
  });

  // ==================== 5. CONFIGURADOR BESPOKE DE AERONAVE ====================
  const configuratorState = {
    model: {
      id: 'sovereign',
      name: 'Albarran Sovereign 8000',
      basePrice: 78.0,
      img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80'
    },
    livery: {
      id: 'carbon',
      name: 'Stealth Carbon Matte',
      color: '#111520',
      price: 1.5
    },
    cabinAddons: [],
    tacticalAddons: []
  };

  const summaryModelName = document.getElementById('summary-model-name');
  const summaryBasePrice = document.getElementById('summary-base-price');
  const summaryLiveryName = document.getElementById('summary-livery-name');
  const summaryLiveryPrice = document.getElementById('summary-livery-price');
  const addonsCountEl = document.getElementById('addons-count');
  const summaryCabinPrice = document.getElementById('summary-cabin-price');
  const tacticalCountEl = document.getElementById('tactical-count');
  const summaryTacticalPrice = document.getElementById('summary-tactical-price');
  const grandTotalAmount = document.getElementById('grand-total-amount');
  const btcEquivalent = document.getElementById('btc-equivalent');
  const customJetRealImg = document.getElementById('custom-jet-real-img');
  const orderCustomWhatsappBtn = document.getElementById('order-custom-whatsapp-btn');
  const resetConfigBtn = document.getElementById('reset-config-btn');

  const recalculateConfigurator = () => {
    // 1. Radio Model
    const selectedRadio = document.querySelector('input[name="jet-platform"]:checked');
    if (selectedRadio) {
      configuratorState.model.id = selectedRadio.value;
      configuratorState.model.name = selectedRadio.getAttribute('data-name');
      configuratorState.model.basePrice = parseFloat(selectedRadio.getAttribute('data-base')) || 78;
      configuratorState.model.img = selectedRadio.getAttribute('data-img') || configuratorState.model.img;

      document.querySelectorAll('.config-card-option').forEach(card => {
        const inp = card.querySelector('input');
        if (inp.checked) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }
      });
    }

    // 2. Cabin Addons
    let cabinTotal = 0;
    configuratorState.cabinAddons = [];
    document.querySelectorAll('input[name="cabin-addon"]').forEach(chk => {
      const parentCard = chk.closest('.addon-checkbox-card');
      if (chk.checked) {
        parentCard.classList.add('checked');
        const price = parseFloat(chk.getAttribute('data-price')) || 0;
        cabinTotal += price;
        configuratorState.cabinAddons.push({
          name: chk.getAttribute('data-name'),
          price: price
        });
      } else {
        parentCard.classList.remove('checked');
      }
    });

    // 3. Tactical Addons
    let tacticalTotal = 0;
    configuratorState.tacticalAddons = [];
    document.querySelectorAll('input[name="tactical-addon"]').forEach(chk => {
      const parentCard = chk.closest('.addon-checkbox-card');
      if (chk.checked) {
        parentCard.classList.add('checked');
        const price = parseFloat(chk.getAttribute('data-price')) || 0;
        tacticalTotal += price;
        configuratorState.tacticalAddons.push({
          name: chk.getAttribute('data-name'),
          price: price
        });
      } else {
        parentCard.classList.remove('checked');
      }
    });

    // 4. Gran Total en Millones
    const grandTotalUSD = configuratorState.model.basePrice + configuratorState.livery.price + cabinTotal + tacticalTotal;
    const btcApprox = Math.round((grandTotalUSD * 1000000) / BTC_RATE);

    // 5. Actualizar UI
    if (summaryModelName) summaryModelName.textContent = configuratorState.model.name;
    if (summaryBasePrice) summaryBasePrice.textContent = `$${configuratorState.model.basePrice.toFixed(1)}M`;
    if (summaryLiveryName) summaryLiveryName.textContent = configuratorState.livery.name;
    if (summaryLiveryPrice) summaryLiveryPrice.textContent = `+$${configuratorState.livery.price.toFixed(1)}M`;
    if (addonsCountEl) addonsCountEl.textContent = configuratorState.cabinAddons.length;
    if (summaryCabinPrice) summaryCabinPrice.textContent = `+$${cabinTotal.toFixed(1)}M`;
    if (tacticalCountEl) tacticalCountEl.textContent = configuratorState.tacticalAddons.length;
    if (summaryTacticalPrice) summaryTacticalPrice.textContent = `+$${tacticalTotal.toFixed(1)}M`;

    if (grandTotalAmount) grandTotalAmount.textContent = grandTotalUSD.toFixed(1);
    if (btcEquivalent) btcEquivalent.textContent = `~ ${btcApprox.toLocaleString()} BTC`;

    // 6. Actualizar Fotografía Real en la Vista Previa del Atelier
    if (customJetRealImg) {
      customJetRealImg.src = configuratorState.model.img;
      customJetRealImg.alt = configuratorState.model.name;
    }

    // 7. Enlace Directo a WhatsApp VIP
    if (orderCustomWhatsappBtn) {
      const cabinListStr = configuratorState.cabinAddons.map(a => `• ${a.name}`).join('%0A') || 'Estándar';
      const tacticalListStr = configuratorState.tacticalAddons.map(t => `• ${t.name}`).join('%0A') || 'Ninguno';

      const waMessage = 
        `Estimado Joendri Albarran ✈️%0A%0A` +
        `Solicito información confidencial para la adquisición de la siguiente aeronave configurada:%0A%0A` +
        `🛩️ *Modelo Base:* ${configuratorState.model.name} ($${configuratorState.model.basePrice}M USD)%0A` +
        `🎨 *Librea Exterior:* ${configuratorState.livery.name}%0A` +
        `🛋️ *Suites Interiores:*%0A${cabinListStr}%0A` +
        `🛡️ *Sistemas Tácticos:*%0A${tacticalListStr}%0A%0A` +
        `💰 *Valoración Total Estimada:* $${grandTotalUSD.toFixed(1)}M USD (~${btcApprox.toLocaleString()} BTC)%0A%0A` +
        `Agradezco remitir el acuerdo de confidencialidad (NDA) para proceder.`;

      orderCustomWhatsappBtn.href = `https://wa.me/?text=${waMessage}`;
    }
  };

  // Listeners de Cambios en Plataforma
  document.querySelectorAll('.config-card-option').forEach(card => {
    card.addEventListener('click', () => {
      const input = card.querySelector('input');
      input.checked = true;
      playClickFeedback();
      recalculateConfigurator();
    });
  });

  // Listeners de Librea Exterior
  document.querySelectorAll('.livery-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.livery-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      configuratorState.livery.id = btn.getAttribute('data-livery');
      configuratorState.livery.name = btn.getAttribute('data-title');
      configuratorState.livery.color = btn.getAttribute('data-color');
      configuratorState.livery.price = parseFloat(btn.getAttribute('data-extra')) || 0;

      playClickFeedback();
      recalculateConfigurator();
    });
  });

  // Listeners de Checkbox
  document.querySelectorAll('input[type="checkbox"][name="cabin-addon"], input[type="checkbox"][name="tactical-addon"]').forEach(chk => {
    chk.addEventListener('change', () => {
      playClickFeedback();
      recalculateConfigurator();
    });
  });

  if (resetConfigBtn) {
    resetConfigBtn.addEventListener('click', () => {
      document.querySelector('input[name="jet-platform"][value="sovereign"]').checked = true;
      document.querySelector('.livery-btn[data-livery="carbon"]').click();

      document.querySelectorAll('input[name="cabin-addon"]').forEach(c => {
        c.checked = (c.value === 'bedroom' || c.value === 'shower');
      });
      document.querySelectorAll('input[name="tactical-addon"]').forEach(t => {
        t.checked = (t.value === 'starlink');
      });

      playClickFeedback();
      recalculateConfigurator();
      showToast('Configuración restablecida a especificación Sovereign', 'fa-solid fa-rotate-left');
    });
  }

  recalculateConfigurator();

  // ==================== 6. CALCULADORA DE ALCANCE Y RUTAS INTERCONTINENTALES ====================
  const airportDatabase = {
    JFK: { name: 'Nueva York', code: 'JFK', lat: 40.6413, lon: -73.7781 },
    DXB: { name: 'Dubái', code: 'DXB', lat: 25.2532, lon: 55.3657 },
    GVA: { name: 'Ginebra', code: 'GVA', lat: 46.2370, lon: 6.1091 },
    HND: { name: 'Tokio', code: 'HND', lat: 35.5494, lon: 139.7798 },
    LCY: { name: 'Londres', code: 'LCY', lat: 51.5048, lon: 0.0495 },
    MIA: { name: 'Miami', code: 'MIA', lat: 25.7959, lon: -80.2870 },
    SIN: { name: 'Singapur', code: 'SIN', lat: 1.3644, lon: 103.9915 },
    CCS: { name: 'Caracas', code: 'CCS', lat: 10.6012, lon: -66.9906 }
  };

  const routeOriginSelect = document.getElementById('route-origin');
  const routeDestSelect = document.getElementById('route-destination');
  const swapAirportsBtn = document.getElementById('swap-airports-btn');
  const routeDistanceEl = document.getElementById('route-distance');
  const routeFlightTimeEl = document.getElementById('route-flight-time');
  const routeStatusEl = document.getElementById('route-status');
  const displayOriginCode = document.getElementById('display-origin-code');
  const displayDestCode = document.getElementById('display-dest-code');

  // Cálculo de Distancia de Gran Círculo (Fórmula Haversine en Millas Náuticas)
  const calculateDistanceNM = (lat1, lon1, lat2, lon2) => {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const R = 3440.065; // Radio de la Tierra en Millas Náuticas
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const updateFlightRoute = () => {
    const origKey = routeOriginSelect.value;
    const destKey = routeDestSelect.value;

    const orig = airportDatabase[origKey] || airportDatabase.DXB;
    const dest = airportDatabase[destKey] || airportDatabase.JFK;

    if (displayOriginCode) displayOriginCode.textContent = orig.code;
    if (displayDestCode) displayDestCode.textContent = dest.code;

    if (origKey === destKey) {
      if (routeDistanceEl) routeDistanceEl.textContent = '0 NM';
      if (routeFlightTimeEl) routeFlightTimeEl.textContent = 'Mismo Aeropuerto';
      if (routeStatusEl) {
        routeStatusEl.className = 'telemetry-badge';
        routeStatusEl.innerHTML = '<i class="fa-solid fa-circle-info"></i> Selecciona dos destinos diferentes';
      }
      return;
    }

    const distanceNM = calculateDistanceNM(orig.lat, orig.lon, dest.lat, dest.lon);
    const distanceKm = Math.round(distanceNM * 1.852);

    // Velocidad crucero a Mach 0.90 ~ 515 Nudos
    const cruiseSpeedKnots = 515;
    const totalHoursDecimal = distanceNM / cruiseSpeedKnots + 0.5; // +30 min para ascenso y aproximación
    const hours = Math.floor(totalHoursDecimal);
    const minutes = Math.round((totalHoursDecimal - hours) * 60);

    if (routeDistanceEl) {
      routeDistanceEl.textContent = `${distanceNM.toLocaleString()} NM (${distanceKm.toLocaleString()} km)`;
    }
    if (routeFlightTimeEl) {
      routeFlightTimeEl.textContent = `${hours}h ${minutes}min`;
    }

    // Comprobación de autonomía sin escalas (La flota Sovereign alcanza hasta 8,000 NM)
    if (routeStatusEl) {
      if (distanceNM <= 8000) {
        routeStatusEl.className = 'telemetry-badge non-stop';
        routeStatusEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> VUELO DIRECTO CONFIRMADO (0 ESCALAS)';
      } else {
        routeStatusEl.className = 'telemetry-badge';
        routeStatusEl.innerHTML = '<i class="fa-solid fa-gas-pump"></i> REQUIERE REPOSTAJE TÉCNICO DE 25 MIN';
      }
    }
  };

  if (routeOriginSelect) routeOriginSelect.addEventListener('change', () => {
    playClickFeedback();
    updateFlightRoute();
  });
  if (routeDestSelect) routeDestSelect.addEventListener('change', () => {
    playClickFeedback();
    updateFlightRoute();
  });

  if (swapAirportsBtn) {
    swapAirportsBtn.addEventListener('click', () => {
      const temp = routeOriginSelect.value;
      routeOriginSelect.value = routeDestSelect.value;
      routeDestSelect.value = temp;
      playClickFeedback();
      updateFlightRoute();
      showToast('Ruta de vuelo invertida', 'fa-solid fa-arrow-right-arrow-left');
    });
  }

  updateFlightRoute();

  // ==================== 7. FILTRO DEL CATÁLOGO DE FLOTA ====================
  const fleetFilterBtns = document.querySelectorAll('.fleet-filter-btn');
  const fleetCards = document.querySelectorAll('.fleet-card');

  fleetFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      fleetFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      playClickFeedback();

      const filter = btn.getAttribute('data-filter');

      fleetCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==================== 8. MODAL DE DOSSIER TÉCNICO VIP CON FOTOS REALES ====================
  const aircraftDossierData = {
    'global-sovereign': {
      title: 'Albarran Global Sovereign 8000',
      category: 'Ultra Long Range Prestige Jet',
      price: '$78,000,000 USD',
      img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80',
      specs: [
        { prop: 'Alcance Máximo', val: '8,000 Millas Náuticas (14,816 km)' },
        { prop: 'Velocidad de Crucero Máxima', val: 'Mach 0.94 (1,150 km/h)' },
        { prop: 'Techo de Servicio Máximo', val: '51,000 Pies (Vuelo sobre tormentas)' },
        { prop: 'Capacidad VIP', val: 'Hasta 19 Pasajeros en 4 Zonas de Cabina' },
        { prop: 'Motorización', val: '2x Rolls-Royce Pearl 700 de última generación' },
        { prop: 'Aviónica de Mando', val: 'Bombardier Vision Flight Deck con HUD dual' },
        { prop: 'Suite Principal', val: 'Cama King Size fija, tocador y Ducha de Mármol' },
        { prop: 'Conectividad a Bordo', val: 'Antena Ka-Band Dual & Starlink Aviation 250 Mbps' }
      ]
    },
    'gulfstream-g700': {
      title: 'Gulfstream G700 Imperial Suite',
      category: 'Ultra Long Range Business Jet',
      price: '$75,000,000 USD',
      img: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=1000&q=80',
      specs: [
        { prop: 'Alcance Máximo', val: '7,750 Millas Náuticas (14,353 km)' },
        { prop: 'Velocidad de Crucero', val: 'Mach 0.925 (1,110 km/h)' },
        { prop: 'Iluminación Natural', val: '20 Ventanillas Panorámicas Ovaladas Gulfstream' },
        { prop: 'Calidad del Aire', val: '100% Aire Fresco purificado por Ionización Plasma' },
        { prop: 'Altitud de Cabina', val: '2,914 Pies a 41,000 pies (Sensación de nivel del mar)' },
        { prop: 'Motorización', val: '2x Rolls-Royce Pearl 700' },
        { prop: 'Sistemas de Audio', val: 'Transductores de sonido integrados en paneles de cuero' }
      ]
    },
    'global-7500': {
      title: 'Bombardier Global 7500 Apex Carbon',
      category: 'Ultra Long Range Jet',
      price: '$72,000,000 USD',
      img: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1000&q=80',
      specs: [
        { prop: 'Alcance Máximo', val: '7,700 Millas Náuticas' },
        { prop: 'Asientos Ergonómicos', val: 'Nuage Seat con basculación de gravedad cero' },
        { prop: 'Zonas de Confort', val: 'Club Suite, Dining Conference, Cinema & Master Suite' },
        { prop: 'Cocina de Bordo', val: 'La más grande de la aviación ejecutiva con doble horno' },
        { prop: 'Techo de Crucero', val: '51,000 Pies' }
      ]
    },
    'praetor-600': {
      title: 'Embraer Praetor 600 Burlwood',
      category: 'Super-Midsize Business Jet',
      price: '$24,000,000 USD',
      img: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=1000&q=80',
      specs: [
        { prop: 'Alcance Máximo', val: '4,018 Millas Náuticas (Londres - Nueva York)' },
        { prop: 'Velocidad', val: 'Mach 0.83' },
        { prop: 'Tecnología de Vuelo', val: 'Full Fly-by-Wire con reducción de turbulencias' },
        { prop: 'Pista Requerida', val: 'Opera en pistas cortas de menos de 1,300 metros' },
        { prop: 'Capacidad', val: '12 Pasajeros' }
      ]
    },
    'ach160': {
      title: 'Airbus ACH160 Prestige Helicopter',
      category: 'Executive Super-Medium Helicopter',
      price: '$16,500,000 USD',
      img: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80',
      specs: [
        { prop: 'Alcance Máximo', val: '460 NM (850 km)' },
        { prop: 'Rotor Principal', val: 'Tecnología Blue Edge de reducción sonora (-50% ruido)' },
        { prop: 'Certificación Marítima', val: 'Tren retráctil y amarres para helipuertos de megayates' },
        { prop: 'Interiorismo', val: 'Cuero perforado y madera noble estilo náutico' }
      ]
    },
    'bell-525': {
      title: 'Bell 525 Relentless Sovereign',
      category: 'Heavy Executive Helicopter',
      price: '$22,000,000 USD',
      img: 'https://images.unsplash.com/photo-1509225770129-fbcf8a696c0b?auto=format&fit=crop&w=1000&q=80',
      specs: [
        { prop: 'Alcance Máximo', val: '580 NM' },
        { prop: 'Velocidad Máxima', val: '160 Nudos' },
        { prop: 'Espacio de Cabina', val: '8.2 Metros Cuadrados' },
        { prop: 'Sistemas Tácticos', val: 'Criptotelefonía Satelital y blindaje de piso' }
      ]
    },
    'bbj-787': {
      title: 'Boeing BBJ 787 Dreamliner Monarch',
      category: 'Head of State VIP Airliner',
      price: '$245,000,000 USD',
      img: 'https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?auto=format&fit=crop&w=1000&q=80',
      specs: [
        { prop: 'Superficie de Cabina', val: '224 Metros Cuadrados' },
        { prop: 'Autonomía Sin Escalas', val: '9,945 NM (17 Horas de vuelo continuo)' },
        { prop: 'Capacidad', val: '40 Dignatarios con delegación completa' },
        { prop: 'Instalaciones', val: 'Salón de Estado, Comedor de 16 puestos, Clínica Médica' }
      ]
    }
  };

  const dossierModal = document.getElementById('dossier-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalContentInject = document.getElementById('modal-content-inject');

  const openDossier = (modelKey) => {
    const data = aircraftDossierData[modelKey] || aircraftDossierData['global-sovereign'];
    playClickFeedback();

    const specsRows = data.specs
      .map(s => `<tr><td class="col-prop">${s.prop}</td><td class="col-val">${s.val}</td></tr>`)
      .join('');

    modalContentInject.innerHTML = `
      <div class="modal-photo-hero">
        <img src="${data.img}" alt="${data.title}" loading="lazy">
      </div>
      <div class="dossier-header-seal"><i class="fa-solid fa-lock"></i> DOSSIER CONFIDENCIAL • ACCESO NIVEL 1</div>
      <h3 class="dossier-title">${data.title}</h3>
      <p style="color:var(--gold); font-family:var(--font-heading); font-size:1.25rem; font-weight:700; margin-bottom:1rem;">
        Valoración de Adquisición: ${data.price}
      </p>
      
      <table class="dossier-specs-table">
        <tbody>
          ${specsRows}
        </tbody>
      </table>

      <div style="display:flex; gap:1rem; flex-wrap:wrap; margin-top:2rem;">
        <a href="#advisory" class="btn btn-gold" id="modal-advisory-btn">
          <i class="fa-solid fa-user-shield"></i>
          <span>Agendar Inspección Privada</span>
        </a>
        <button class="btn btn-ghost" id="modal-close-inner">
          <span>Cerrar Dossier</span>
        </button>
      </div>
    `;

    dossierModal.classList.add('open');
    dossierModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const innerClose = document.getElementById('modal-close-inner');
    if (innerClose) innerClose.addEventListener('click', closeDossier);

    const advBtn = document.getElementById('modal-advisory-btn');
    if (advBtn) advBtn.addEventListener('click', () => {
      closeDossier();
    });
  };

  const closeDossier = () => {
    if (!dossierModal) return;
    dossierModal.classList.remove('open');
    dossierModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
    playClickFeedback();
  };

  document.querySelectorAll('.view-dossier-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const model = btn.getAttribute('data-model');
      openDossier(model);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeDossier);
  if (dossierModal) {
    dossierModal.addEventListener('click', (e) => {
      if (e.target === dossierModal) closeDossier();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dossierModal && dossierModal.classList.contains('open')) {
      closeDossier();
    }
  });

  // ==================== 9. FORMULARIO PRIVADO DE ADQUISICIÓN VIP ====================
  const inquiryForm = document.getElementById('vip-inquiry-form');
  const inquiryFeedback = document.getElementById('inquiry-feedback');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('client-name').value.trim();
      const org = document.getElementById('client-organization').value.trim();
      const email = document.getElementById('client-email').value.trim();
      const phone = document.getElementById('client-phone').value.trim();
      const aircraft = document.getElementById('aircraft-interest').value;
      const delivery = document.getElementById('preferred-delivery').value;

      if (!name || !org || !email || !phone) {
        showToast('Por favor complete los campos obligatorios del protocolo.', 'fa-solid fa-triangle-exclamation');
        return;
      }

      const submitBtn = document.getElementById('submit-inquiry-btn');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Cifrando y Transmitiendo...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> <span>Transmitir Solicitud Confidencial</span>`;

        const ticketCode = `ALBARRAN-SEC-${Math.floor(1000 + Math.random() * 9000)}`;

        inquiryFeedback.className = 'feedback-banner success';
        inquiryFeedback.innerHTML = `
          <strong>🔒 Solicitud Confidencial Recibida</strong><br>
          Código de Asunto: <strong>${ticketCode}</strong><br>
          Estimado(a) <strong>${name}</strong> (${org}):<br>
          Su requerimiento para el <em>${aircraft}</em> con entrega en <em>${delivery}</em> ha sido asignado al despacho personal de <strong>Joendri Albarran</strong>.<br>
          <small>Recibirá contacto vía canal seguro y la plantilla del NDA en menos de 2 horas hábiles.</small>
        `;

        showToast(`Expediente ${ticketCode} generado con éxito`, 'fa-solid fa-user-shield');
        inquiryForm.reset();
      }, 1200);
    });
  }

  // ==================== 10. MENÚ MÓVIL TOGGLE ====================
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '82px';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = '#080a10';
      navLinks.style.padding = '1.5rem';
      navLinks.style.borderBottom = '1px solid var(--border-gold)';
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.style.display = 'none';
        }
      });
    });
  }

  // Año de Copyright
  const currentYear = document.getElementById('current-year');
  if (currentYear) currentYear.textContent = new Date().getFullYear();
});
