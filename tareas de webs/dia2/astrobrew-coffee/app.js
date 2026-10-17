/**
 * ==========================================================================
 * ASTROBREW COFFEE LAB & ROASTERY — JAVASCRIPT
 * Lógica: Simulador de Vaso, Ambiente Lo-Fi Web Audio, Carrito & Reservas
 * Creado por Joendri Albarran
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==================== 1. CONFIGURACIÓN & ESTADO GLOBAL ====================
  const EXCHANGE_RATE = 50.00; // 50.00 Bs por 1 USD
  let currentCurrency = 'USD'; // 'USD' o 'VES'

  let cart = JSON.parse(localStorage.getItem('astrobrew_cart') || '[]');
  let appliedCoupon = null; // 'BARISTA10' para 10%

  // ==================== 2. SISTEMA DE AUDIO AMBIENTAL LO-FI (WEB AUDIO API) ====================
  // Genera sonido ambiental suave y relajante de cafetería sin necesidad de archivos externos
  let audioContext = null;
  let ambientNoiseNode = null;
  let ambientGainNode = null;
  let isAmbientPlaying = false;

  const ambientSoundBtn = document.getElementById('ambient-sound-btn');
  const ambientIcon = document.getElementById('ambient-icon');

  const startAmbientSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContext) {
        audioContext = new AudioCtx();
      }
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      // 1. Generador de Ruido Rosa Filtrado (Lluvia suave / vapor de fondo de cafetería)
      const bufferSize = audioContext.sampleRate * 2;
      const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
        b6 = white * 0.115926;
      }

      ambientNoiseNode = audioContext.createBufferSource();
      ambientNoiseNode.buffer = noiseBuffer;
      ambientNoiseNode.loop = true;

      // Filtro paso bajo para que suene cálido y suave
      const lowpass = audioContext.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(600, audioContext.currentTime);

      ambientGainNode = audioContext.createGain();
      ambientGainNode.gain.setValueAtTime(0.001, audioContext.currentTime);
      ambientGainNode.gain.exponentialRampToValueAtTime(0.06, audioContext.currentTime + 2);

      ambientNoiseNode.connect(lowpass);
      lowpass.connect(ambientGainNode);
      ambientGainNode.connect(audioContext.destination);

      ambientNoiseNode.start();
      isAmbientPlaying = true;
      ambientSoundBtn.classList.add('playing');
      ambientIcon.className = 'fa-solid fa-volume-high';
      showToast('Ambiente Lo-Fi Café activado 🎧✨', 'fa-solid fa-headphones');
    } catch (e) {
      console.warn('Audio contextual no disponible:', e);
    }
  };

  const stopAmbientSound = () => {
    if (ambientGainNode && audioContext) {
      ambientGainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1);
      setTimeout(() => {
        if (ambientNoiseNode) ambientNoiseNode.stop();
        isAmbientPlaying = false;
        ambientSoundBtn.classList.remove('playing');
        ambientIcon.className = 'fa-solid fa-headphones';
        showToast('Ambiente de cafetería en pausa', 'fa-solid fa-pause');
      }, 1000);
    }
  };

  if (ambientSoundBtn) {
    ambientSoundBtn.addEventListener('click', () => {
      if (!isAmbientPlaying) {
        startAmbientSound();
      } else {
        stopAmbientSound();
      }
    });
  }

  // Beep sutil de interacción
  const playClickFeedback = () => {
    try {
      if (!audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) audioContext = new AudioCtx();
      }
      if (!audioContext || audioContext.state === 'suspended') return;

      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, audioContext.currentTime);
      gain.gain.setValueAtTime(0.02, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start();
      osc.stop(audioContext.currentTime + 0.05);
    } catch (_) {}
  };

  // ==================== 3. TOAST NOTIFICATIONS ====================
  const toastStack = document.getElementById('toast-stack');

  const showToast = (message, iconClass = 'fa-solid fa-circle-check', duration = 3000) => {
    if (!toastStack) return;

    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.innerHTML = `<i class="${iconClass}"></i><span>${message}</span>`;
    toastStack.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 350);
    }, duration);
  };

  // ==================== 4. TOGGLE DE DIVISAS ($ USD / Bs. VES) ====================
  const currBtnUsd = document.getElementById('curr-btn-usd');
  const currBtnVes = document.getElementById('curr-btn-ves');

  const formatPrice = (usdAmount) => {
    if (currentCurrency === 'USD') {
      return `$${usdAmount.toFixed(2)} USD`;
    } else {
      const ves = (usdAmount * EXCHANGE_RATE).toLocaleString('es-VE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      return `${ves} Bs`;
    }
  };

  const updateAllPricesOnPage = () => {
    // 1. Precios del Menú
    document.querySelectorAll('.item-price').forEach(el => {
      const usd = parseFloat(el.getAttribute('data-usd'));
      if (!isNaN(usd)) {
        el.textContent = formatPrice(usd);
      }
    });

    // 2. Precios en el Showcase Hero
    const heroPriceEl = document.querySelector('.showcase-price');
    if (heroPriceEl) {
      const usd = parseFloat(heroPriceEl.getAttribute('data-usd'));
      if (!isNaN(usd)) {
        heroPriceEl.innerHTML = `${formatPrice(usd)}`;
      }
    }

    // 3. Precios de Suscripciones
    document.querySelectorAll('.plan-card').forEach(card => {
      const priceVal = card.querySelector('.price-val');
      const btn = card.querySelector('.quick-add-btn');
      if (priceVal && btn) {
        const usd = parseFloat(btn.getAttribute('data-price'));
        if (!isNaN(usd)) {
          priceVal.textContent = formatPrice(usd);
        }
      }
    });

    // 4. Actualizar vista previa del Laboratorio
    updateCustomDrinkUI();

    // 5. Actualizar Carrito
    renderCart();
  };

  if (currBtnUsd && currBtnVes) {
    currBtnUsd.addEventListener('click', () => {
      currentCurrency = 'USD';
      currBtnUsd.classList.add('active');
      currBtnVes.classList.remove('active');
      playClickFeedback();
      updateAllPricesOnPage();
      showToast('Precios mostrados en Dólares ($ USD)', 'fa-solid fa-dollar-sign');
    });

    currBtnVes.addEventListener('click', () => {
      currentCurrency = 'VES';
      currBtnVes.classList.add('active');
      currBtnUsd.classList.remove('active');
      playClickFeedback();
      updateAllPricesOnPage();
      showToast(`Precios convertidos a Bolívares (Tasa: ${EXCHANGE_RATE} Bs)`, 'fa-solid fa-coins');
    });
  }

  // ==================== 5. SIMULADOR DEL LABORATORIO DE CAFÉ (DRINK CRAFTER) ====================
  const drinkState = {
    base: { id: 'espresso', name: 'Espresso Doble', color: '#3b1d11', price: 2.50 },
    milk: { id: 'entera', name: 'Leche Entera', color: '#fdfbf7', price: 0.00 },
    syrup: { id: 'sin-jarabe', name: 'Sin Jarabe', color: 'transparent', price: 0.00 },
    temp: 'hot', // 'hot' o 'iced'
    size: 16,    // 12, 16 o 20
    sizeExtra: 0.50
  };

  const layerBase = document.getElementById('layer-base');
  const layerMilk = document.getElementById('layer-milk');
  const layerFoam = document.getElementById('layer-foam');
  const layerSyrup = document.getElementById('layer-syrup');
  const iceCubes = document.getElementById('ice-cubes');
  const baseText = document.getElementById('base-text');
  const milkText = document.getElementById('milk-text');
  const foamText = document.getElementById('foam-text');
  const previewSizeDisplay = document.getElementById('preview-size-display');

  const customDrinkName = document.getElementById('custom-drink-name');
  const customDrinkDetails = document.getElementById('custom-drink-details');
  const customDrinkPrice = document.getElementById('custom-drink-price');
  const customDrinkVes = document.getElementById('custom-drink-ves');
  const addCustomDrinkBtn = document.getElementById('add-custom-drink-btn');

  const updateCustomDrinkUI = () => {
    // 1. Alturas y colores de las capas del vaso
    if (layerBase && layerMilk && layerFoam && layerSyrup) {
      layerBase.style.backgroundColor = drinkState.base.color;
      baseText.textContent = drinkState.base.name;

      if (drinkState.milk.id === 'ninguna') {
        layerMilk.style.height = '0px';
        layerMilk.style.opacity = '0';
        layerFoam.style.height = '0px';
        layerFoam.style.opacity = '0';
        layerBase.style.height = '180px';
      } else {
        layerMilk.style.height = '95px';
        layerMilk.style.opacity = '1';
        layerMilk.style.backgroundColor = drinkState.milk.color;
        milkText.textContent = drinkState.milk.name;

        if (drinkState.temp === 'iced') {
          layerFoam.style.height = '20px';
          foamText.textContent = 'Topping Frío';
        } else {
          layerFoam.style.height = '45px';
          foamText.textContent = 'Microespuma Vaporizada';
        }
        layerFoam.style.opacity = '1';
        layerBase.style.height = '75px';
      }

      // Jarabe
      if (drinkState.syrup.id !== 'sin-jarabe') {
        layerSyrup.style.height = '20px';
        layerSyrup.style.backgroundColor = drinkState.syrup.color;
      } else {
        layerSyrup.style.height = '0px';
      }

      // Hielos
      if (iceCubes) {
        if (drinkState.temp === 'iced') {
          iceCubes.classList.add('visible');
        } else {
          iceCubes.classList.remove('visible');
        }
      }
    }

    // 2. Cálculos de Precio
    const totalUSD = drinkState.base.price + drinkState.milk.price + drinkState.syrup.price + drinkState.sizeExtra;
    const totalVES = (totalUSD * EXCHANGE_RATE).toLocaleString('es-VE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    if (customDrinkPrice) customDrinkPrice.textContent = `$${totalUSD.toFixed(2)} USD`;
    if (customDrinkVes) customDrinkVes.textContent = `~ ${totalVES} Bs`;
    if (previewSizeDisplay) previewSizeDisplay.textContent = `Vaso ${drinkState.size} oz`;

    // 3. Título del Recetario Dinámico
    let titleParts = [];
    if (drinkState.temp === 'iced') titleParts.push('Iced');
    if (drinkState.syrup.id !== 'sin-jarabe') titleParts.push(drinkState.syrup.name);
    titleParts.push(drinkState.base.name);
    if (drinkState.milk.id !== 'ninguna') titleParts.push('Latte');

    const generatedTitle = titleParts.join(' ');
    if (customDrinkName) customDrinkName.textContent = generatedTitle;

    const detailsStr = `${drinkState.base.name} + ${drinkState.milk.name} + ${drinkState.syrup.name} • ${drinkState.temp === 'hot' ? '🔥 Caliente' : '❄️ Frío con Hielo'} (${drinkState.size} oz)`;
    if (customDrinkDetails) customDrinkDetails.textContent = detailsStr;
  };

  // Event Listeners de Botones de Opciones del Laboratorio
  document.querySelectorAll('.option-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const type = pill.getAttribute('data-type');
      const val = pill.getAttribute('data-val');
      const price = parseFloat(pill.getAttribute('data-price')) || 0;
      const name = pill.getAttribute('data-name');
      const color = pill.getAttribute('data-color') || '#fff';

      // Marcar activa en su grupo
      pill.parentElement.querySelectorAll('.option-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      if (type === 'base') {
        drinkState.base = { id: val, name, color, price };
      } else if (type === 'milk') {
        drinkState.milk = { id: val, name, color, price };
      } else if (type === 'syrup') {
        drinkState.syrup = { id: val, name, color, price };
      }

      playClickFeedback();
      updateCustomDrinkUI();
    });
  });

  // Toggle Temperatura
  const tempHotBtn = document.getElementById('temp-hot-btn');
  const tempIcedBtn = document.getElementById('temp-iced-btn');
  if (tempHotBtn && tempIcedBtn) {
    tempHotBtn.addEventListener('click', () => {
      drinkState.temp = 'hot';
      tempHotBtn.classList.add('active');
      tempIcedBtn.classList.remove('active');
      playClickFeedback();
      updateCustomDrinkUI();
    });

    tempIcedBtn.addEventListener('click', () => {
      drinkState.temp = 'iced';
      tempIcedBtn.classList.add('active');
      tempHotBtn.classList.remove('active');
      playClickFeedback();
      updateCustomDrinkUI();
    });
  }

  // Toggle Tamaño
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      drinkState.size = parseInt(btn.getAttribute('data-size'), 10);
      drinkState.sizeExtra = parseFloat(btn.getAttribute('data-extra')) || 0;
      playClickFeedback();
      updateCustomDrinkUI();
    });
  });

  // Botón: Agregar Bebida Personalizada al Carrito
  if (addCustomDrinkBtn) {
    addCustomDrinkBtn.addEventListener('click', () => {
      const totalUSD = drinkState.base.price + drinkState.milk.price + drinkState.syrup.price + drinkState.sizeExtra;
      const title = customDrinkName.textContent;
      const details = customDrinkDetails.textContent;

      addToCart({
        id: `custom-${Date.now()}`,
        name: title,
        price: totalUSD,
        img: '🧪',
        details: details
      });

      showToast(`¡Bebida personalizada añadida al carrito! ☕`, 'fa-solid fa-mug-saucer');
    });
  }

  updateCustomDrinkUI();

  // ==================== 6. FILTRO DE CATEGORÍAS DEL MENÚ ====================
  const catTabBtns = document.querySelectorAll('.cat-tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  catTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      playClickFeedback();

      const cat = btn.getAttribute('data-category');

      menuCards.forEach(card => {
        const itemCat = card.getAttribute('data-category');
        if (cat === 'all' || itemCat === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==================== 7. SISTEMA DE CARRITO DE COMPRAS ====================
  const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const emptyCartState = document.getElementById('empty-cart-state');
  const cartCounter = document.getElementById('cart-counter');
  const drawerCounter = document.getElementById('drawer-counter');

  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const discountRow = document.getElementById('discount-row');
  const cartDiscountEl = document.getElementById('cart-discount');
  const cartTotalUsd = document.getElementById('cart-total-usd');
  const cartTotalVes = document.getElementById('cart-total-ves');
  const whatsappOrderBtn = document.getElementById('whatsapp-order-btn');
  const clearCartBtn = document.getElementById('clear-cart-btn');

  const couponCodeInput = document.getElementById('coupon-code-input');
  const applyCouponBtn = document.getElementById('apply-coupon-btn');

  const openCart = () => {
    cartDrawerOverlay.classList.add('open');
    cartDrawerOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    playClickFeedback();
  };

  const closeCart = () => {
    cartDrawerOverlay.classList.remove('open');
    cartDrawerOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
    playClickFeedback();
  };

  if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartDrawerOverlay) {
    cartDrawerOverlay.addEventListener('click', (e) => {
      if (e.target === cartDrawerOverlay) closeCart();
    });
  }

  const addToCart = (product) => {
    const existingIndex = cart.findIndex(item => item.id === product.id);
    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img || '☕',
        details: product.details || '',
        qty: 1
      });
    }

    saveAndRenderCart();
    openCart();
  };

  const removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    saveAndRenderCart();
  };

  const changeQty = (id, delta) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(id);
    } else {
      saveAndRenderCart();
    }
  };

  const saveAndRenderCart = () => {
    localStorage.setItem('astrobrew_cart', JSON.stringify(cart));
    renderCart();
  };

  const renderCart = () => {
    const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
    if (cartCounter) cartCounter.textContent = totalCount;
    if (drawerCounter) drawerCounter.textContent = `${totalCount} items`;

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      emptyCartState.style.display = 'block';
      cartItemsContainer.innerHTML = '';
      cartItemsContainer.appendChild(emptyCartState);

      if (cartSubtotalEl) cartSubtotalEl.textContent = '$0.00 USD';
      if (discountRow) discountRow.style.display = 'none';
      if (cartTotalUsd) cartTotalUsd.textContent = '$0.00 USD';
      if (cartTotalVes) cartTotalVes.textContent = '(~ 0.00 Bs)';
      if (whatsappOrderBtn) {
        whatsappOrderBtn.href = '#';
        whatsappOrderBtn.classList.add('disabled');
      }
      return;
    }

    emptyCartState.style.display = 'none';
    cartItemsContainer.innerHTML = '';

    let subtotal = 0;

    cart.forEach(item => {
      const itemSubtotal = item.price * item.qty;
      subtotal += itemSubtotal;

      const itemCard = document.createElement('div');
      itemCard.className = 'cart-item';
      itemCard.innerHTML = `
        <div class="cart-item-emoji">${item.img}</div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          ${item.details ? `<small style="font-size:0.75rem; color:var(--cream-dim); display:block;">${item.details}</small>` : ''}
          <div class="cart-item-price">${formatPrice(item.price)} c/u</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn minus" data-id="${item.id}">-</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn plus" data-id="${item.id}">+</button>
        </div>
      `;

      itemCard.querySelector('.minus').addEventListener('click', () => changeQty(item.id, -1));
      itemCard.querySelector('.plus').addEventListener('click', () => changeQty(item.id, 1));

      cartItemsContainer.appendChild(itemCard);
    });

    // Descuento Cupón
    let discount = 0;
    if (appliedCoupon === 'BARISTA10') {
      discount = subtotal * 0.10;
      discountRow.style.display = 'flex';
      cartDiscountEl.textContent = `-${formatPrice(discount)}`;
    } else {
      discountRow.style.display = 'none';
    }

    const grandTotal = Math.max(0, subtotal - discount);
    const grandTotalVES = (grandTotal * EXCHANGE_RATE).toLocaleString('es-VE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    cartSubtotalEl.textContent = formatPrice(subtotal);
    cartTotalUsd.textContent = `$${grandTotal.toFixed(2)} USD`;
    cartTotalVes.textContent = `(~ ${grandTotalVES} Bs)`;

    // WhatsApp Link
    if (whatsappOrderBtn) {
      whatsappOrderBtn.classList.remove('disabled');

      let orderList = cart.map(i => `• ${i.qty}x ${i.name} (${i.details ? i.details + ' - ' : ''}${(i.price * i.qty).toFixed(2)}$)`).join('%0A');

      const waMsg = 
        `Hola AstroBrew Coffee Lab! ☕ Quisiera hacer el siguiente pedido:%0A%0A` +
        `📦 *DETALLE DE MI ORDEN:*%0A${orderList}%0A%0A` +
        (discount > 0 ? `🎟️ *Cupón Aplicado:* BARISTA10 (-10%25)%0A` : '') +
        `💰 *TOTAL A PAGAR:* $${grandTotal.toFixed(2)} USD (~${grandTotalVES} Bs)%0A%0A` +
        `¿Podrían confirmarme la disponibilidad y tiempo de entrega?`;

      whatsappOrderBtn.href = `https://wa.me/?text=${waMsg}`;
    }
  };

  // Botones Quick-Add en Todo el Sitio (Menú & Planes)
  document.querySelectorAll('.quick-add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const price = parseFloat(btn.getAttribute('data-price')) || 0;
      const img = btn.getAttribute('data-img') || '☕';

      addToCart({ id, name, price, img });
      showToast(`¡${name} agregado a tu orden!`, 'fa-solid fa-cart-plus');
    });
  });

  // Aplicar Cupón
  if (applyCouponBtn && couponCodeInput) {
    applyCouponBtn.addEventListener('click', () => {
      const code = couponCodeInput.value.trim().toUpperCase();
      if (code === 'BARISTA10') {
        appliedCoupon = 'BARISTA10';
        playClickFeedback();
        showToast('¡Cupón BARISTA10 aplicado! 10% de descuento en tu café 🎉', 'fa-solid fa-tag');
        renderCart();
      } else {
        showToast('Código inválido. Prueba con BARISTA10', 'fa-solid fa-triangle-exclamation');
      }
    });
  }

  // Vaciar Carrito
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      cart = [];
      appliedCoupon = null;
      saveAndRenderCart();
      showToast('Carrito vaciado', 'fa-solid fa-trash-can');
    });
  }

  renderCart();

  // ==================== 8. FORMULARIO DE RESERVA DE MESAS ====================
  const reservationForm = document.getElementById('reservation-form');
  const resFeedback = document.getElementById('reserve-feedback');

  // Asignar fecha mínima de hoy en el calendario
  const resDateInput = document.getElementById('res-date');
  if (resDateInput) {
    const today = new Date().toISOString().split('T')[0];
    resDateInput.min = today;
    resDateInput.value = today;
  }

  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('res-name').value.trim();
      const phone = document.getElementById('res-phone').value.trim();
      const date = document.getElementById('res-date').value;
      const time = document.getElementById('res-time').value;
      const guests = document.getElementById('res-guests').value;
      const zone = document.getElementById('res-zone').value;

      if (!name || !phone || !date || !time) {
        showToast('Por favor completa todos los campos de la reserva.', 'fa-solid fa-circle-exclamation');
        return;
      }

      const submitBtn = document.getElementById('submit-reserve-btn');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Confirmando reserva...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> <span>Confirmar Mi Reserva Instantánea</span>`;

        const bookingCode = `ASTRO-${Math.floor(1000 + Math.random() * 9000)}`;

        resFeedback.className = 'form-feedback-box success';
        resFeedback.innerHTML = `
          <strong>🎉 ¡Mesa Reservada con Éxito, ${name}!</strong><br>
          Código de Reserva: <strong>${bookingCode}</strong><br>
          📅 Fecha: ${date} a las ${time}<br>
          👥 Personas: ${guests} en la <em>${zone}</em>.<br>
          <small>Hemos preparado tu rincón con WiFi de alta velocidad. ¡Te esperamos con café caliente!</small>
        `;

        showToast(`Reserva ${bookingCode} confirmada exitosamente`, 'fa-solid fa-calendar-check');
        reservationForm.reset();
        if (resDateInput) resDateInput.value = new Date().toISOString().split('T')[0];
      }, 1100);
    });
  }

  // ==================== 9. MENÚ MÓVIL TOGGLE ====================
  const mobileToggle = document.getElementById('mobile-toggle-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '76px';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = '#18110b';
      navLinks.style.padding = '1.5rem';
      navLinks.style.borderBottom = '1px solid var(--border-gold)';
    });

    navLinks.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.style.display = 'none';
        }
      });
    });
  }

  // Año de Copyright
  const yearCopy = document.getElementById('year-copy');
  if (yearCopy) yearCopy.textContent = new Date().getFullYear();
});
