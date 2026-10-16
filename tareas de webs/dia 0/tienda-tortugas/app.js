/**
 * TortuVzla - Tienda Online de Tortugas en Venezuela
 * Vanilla JavaScript E-Commerce Engine
 */

// Exchange Rate (Bs. / USD)
const EXCHANGE_RATE = 50.00;
let currentCurrency = 'USD'; // 'USD' or 'VES'

// Products Catalog
const products = [
  {
    id: 'tortuga-rusa',
    name: 'Tortuga Rusa (Bebé Criadero)',
    scientific: 'Testudo horsfieldii',
    category: 'terrestres',
    priceUSD: 45.00,
    badge: 'Más Vendida',
    isHot: true,
    img: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Terrestre muy dócil y resistente. Perfecta para principiantes y niños.',
    specs: {
      tipo: 'Terrestre',
      tamanoAdulto: '15 - 20 cm',
      temperatura: '26°C - 32°C',
      dieta: '100% Herbívora (Hojas, vegetales, calcio)',
      dificultad: 'Fácil'
    }
  },
  {
    id: 'orejas-rojas',
    name: 'Tortuga Orejas Rojas Criadero',
    scientific: 'Trachemys scripta elegans',
    category: 'acuaticas',
    priceUSD: 25.00,
    badge: 'Popular',
    isHot: false,
    img: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Muy nadadora, simpática y activa. Proviene de zoocriadero legal.',
    specs: {
      tipo: 'Semi-Acuática',
      tamanoAdulto: '20 - 28 cm',
      temperatura: '24°C - 28°C',
      dieta: 'Omnívora (Pellets acuáticos, charales, vegetales)',
      dificultad: 'Fácil'
    }
  },
  {
    id: 'tortuga-sulcata',
    name: 'Tortuga Sulcata Africana',
    scientific: 'Centrochelys sulcata',
    category: 'terrestres',
    priceUSD: 85.00,
    badge: 'Exclusiva',
    isHot: true,
    img: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'La reina de las tortugas terrestres. Caparazón dorado y gran personalidad.',
    specs: {
      tipo: 'Terrestre',
      tamanoAdulto: '40 - 70 cm (Crecimiento paulatino)',
      temperatura: '28°C - 34°C',
      dieta: 'Pastos, heno, hojas verdes secas',
      dificultad: 'Media (Requiere espacio futuro)'
    }
  },
  {
    id: 'orejas-amarillas',
    name: 'Tortuga Orejas Amarillas',
    scientific: 'Trachemys scripta scripta',
    category: 'acuaticas',
    priceUSD: 28.00,
    badge: 'Disponible',
    isHot: false,
    img: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Elegante y resistente, adora tomar baños de sol en su rampa flotante.',
    specs: {
      tipo: 'Semi-Acuática',
      tamanoAdulto: '20 - 25 cm',
      temperatura: '24°C - 29°C',
      dieta: 'Pellets, proteína de insecto, hojas verdes',
      dificultad: 'Fácil'
    }
  },
  {
    id: 'terrario-completo',
    name: 'Terrario Bioactivo Deluxe 60cm',
    scientific: 'Kit Completo para Terrestres',
    category: 'habitats',
    priceUSD: 65.00,
    badge: 'Kit Completo',
    isHot: true,
    img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Incluye lámpara con foco UVB/UVA, plato comedero bajo y sustrato de fibra de coco.',
    specs: {
      tipo: 'Hábitat Terrestre',
      dimensiones: '60 x 40 x 30 cm',
      incluye: 'Lámpara UVB, comedero rampa, sustrato 5L',
      material: 'Vidrio templado con ventilación superior',
      dificultad: 'Listo para armar'
    }
  },
  {
    id: 'acuario-isla',
    name: 'Acuaterrario con Rampa y Filtro',
    scientific: 'Para Tortugas Acuáticas',
    category: 'habitats',
    priceUSD: 55.00,
    badge: 'Recomendado',
    isHot: false,
    img: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Acuario con rampa antideslizante de asoleamiento y potente filtro cascada silencioso.',
    specs: {
      tipo: 'Hábitat Acuático',
      capacidad: '45 Litros útiles',
      incluye: 'Filtro cascada 300L/h + Rampa con césped sintético',
      material: 'Vidrio de 5mm con silicón no tóxico',
      dificultad: 'Fácil instalación'
    }
  },
  {
    id: 'alimento-pellets',
    name: 'Pellets Premium Fortificados (500g)',
    scientific: 'Alimento Balanceado + Espirulina',
    category: 'nutricion',
    priceUSD: 12.00,
    badge: 'Esencial',
    isHot: false,
    img: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Aporte óptimo de calcio, vitaminas A, D3 y fibra cruda para crecimiento sano.',
    specs: {
      tipo: 'Alimento en Pellets flotantes / secos',
      peso: '500 gramos (Dura aprox 3 meses)',
      enfoque: 'Refuerzo de caparazón y ojos brillantes',
      origen: 'Fórmula enriquecida veterinaria',
      dificultad: 'Uso diario'
    }
  },
  {
    id: 'bloque-calcio',
    name: 'Hueso de Jibia & Calcio D3 (Pack x2)',
    scientific: 'Suplemento Mineral Puro',
    category: 'nutricion',
    priceUSD: 8.00,
    badge: 'Preventivo',
    isHot: false,
    img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Previene la enfermedad ósea metabólica y mantiene el pico en tamaño perfecto.',
    specs: {
      tipo: 'Suplemento mineral',
      contenido: '2 Bloques naturales listos para terrario o agua',
      enfoque: 'Caparazón duro como roca',
      duracion: '4 a 6 meses por ejemplar',
      dificultad: 'Solo colocar en el hábitat'
    }
  }
];

// Shopping Cart State (Persisted in localStorage)
let cart = JSON.parse(localStorage.getItem('tortuvzla_cart')) || [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartBadge = document.getElementById('cart-counter');
const cartDrawer = document.getElementById('cart-drawer');
const cartBackdrop = document.getElementById('cart-backdrop');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalUSD = document.getElementById('cart-total-usd');
const cartTotalVES = document.getElementById('cart-total-ves');
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const checkoutForm = document.getElementById('checkout-form');

// Currency Buttons
const currUsdBtn = document.getElementById('curr-usd');
const currVesBtn = document.getElementById('curr-ves');
const rateDisplay = document.getElementById('rate-display');

// Modals
const productModal = document.getElementById('product-modal');
const productModalBackdrop = document.getElementById('product-modal-backdrop');
const productModalContent = document.getElementById('product-modal-content');
const closeProductModalBtn = document.getElementById('close-product-modal');

const bankModal = document.getElementById('bank-modal');
const bankModalBackdrop = document.getElementById('bank-modal-backdrop');
const closeBankModalBtn = document.getElementById('close-bank-modal');
const btnShowBankInfo = document.getElementById('btn-show-bank-info');
const btnDoneBankModal = document.getElementById('btn-done-bank-modal');

// Toast Container
const toastContainer = document.getElementById('toast-container');

// Quick contact hero button
const btnQuickContact = document.getElementById('btn-quick-contact');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('todos');
  updateCartUI();
  setupFilterButtons();
  setupCurrencySwitch();
  setupFAQAccordion();
  setupEventListeners();

  // Set current year
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Set rate indicator text
  if (rateDisplay) {
    rateDisplay.textContent = `${EXCHANGE_RATE.toFixed(2)} Bs/$`;
  }
});

// Format Price function based on currency
function formatPrice(usdAmount) {
  const vesAmount = usdAmount * EXCHANGE_RATE;
  if (currentCurrency === 'USD') {
    return {
      primary: `$${usdAmount.toFixed(2)}`,
      secondary: `≈ ${vesAmount.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs.`
    };
  } else {
    return {
      primary: `${vesAmount.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs.`,
      secondary: `≈ $${usdAmount.toFixed(2)} USD`
    };
  }
}

// Render Products Grid
function renderProducts(categoryFilter = 'todos') {
  if (!productGrid) return;
  
  productGrid.innerHTML = '';

  const filtered = categoryFilter === 'todos' 
    ? products 
    : products.filter(p => p.category === categoryFilter);

  filtered.forEach(p => {
    const prices = formatPrice(p.priceUSD);
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="card-img-wrapper">
        <img src="${p.img}" alt="${p.name}" class="product-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=800&q=80'">
        <span class="card-badge-status ${p.isHot ? 'badge-hot' : ''}">${p.badge}</span>
      </div>
      <div class="card-content">
        <span class="product-category">${p.category}</span>
        <h3 class="product-title">${p.name}</h3>
        <span class="product-scientific">${p.scientific}</span>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.85rem;">${p.shortDesc}</p>
        
        <div class="product-specs">
          <span class="spec-pill"><i class="fa-solid fa-tag"></i> ${p.specs.tipo || 'Accesorio'}</span>
          <span class="spec-pill"><i class="fa-solid fa-gauge"></i> ${p.specs.dificultad}</span>
        </div>

        <div class="card-footer-box">
          <div class="price-container">
            <div class="price-usd">${prices.primary}</div>
            <div class="price-ves">${prices.secondary}</div>
          </div>
          <div class="card-actions">
            <button class="btn-add-cart" onclick="addToCart('${p.id}')">
              <i class="fa-solid fa-cart-plus"></i> Agregar
            </button>
            <button class="btn-info" onclick="openProductModal('${p.id}')" title="Ver ficha técnica">
              <i class="fa-solid fa-eye"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// Setup Category Filter Buttons
function setupFilterButtons() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');
      renderProducts(category);
    });
  });
}

// Setup Currency Switcher
function setupCurrencySwitch() {
  currUsdBtn?.addEventListener('click', () => {
    currentCurrency = 'USD';
    currUsdBtn.classList.add('active');
    currVesBtn.classList.remove('active');
    const activeCategory = document.querySelector('.filter-btn.active')?.getAttribute('data-category') || 'todos';
    renderProducts(activeCategory);
    updateCartTotals();
    showToast('💵 Moneda cambiada a Dólares ($ USD)');
  });

  currVesBtn?.addEventListener('click', () => {
    currentCurrency = 'VES';
    currVesBtn.classList.add('active');
    currUsdBtn.classList.remove('active');
    const activeCategory = document.querySelector('.filter-btn.active')?.getAttribute('data-category') || 'todos';
    renderProducts(activeCategory);
    updateCartTotals();
    showToast('🇻🇪 Moneda cambiada a Bolívares (VES)');
  });
}

// Cart Logic
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      priceUSD: product.priceUSD,
      img: product.img,
      qty: 1
    });
  }

  saveCart();
  updateCartUI();
  showToast(`🐢 "${product.name}" agregado al carrito`);
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }

  saveCart();
  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  updateCartUI();
  showToast('Producto eliminado del carrito');
}

function saveCart() {
  localStorage.setItem('tortuvzla_cart', JSON.stringify(cart));
}

function updateCartUI() {
  // Update badge counter
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  if (cartBadge) {
    cartBadge.textContent = totalCount;
  }

  // Render cart items inside drawer
  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty-message">
        <i class="fa-solid fa-basket-shopping"></i>
        <h4>Tu carrito está vacío</h4>
        <p>Selecciona una tortuga o accesorio para comenzar tu pedido.</p>
      </div>
    `;
  } else {
    cartItemsContainer.innerHTML = cart.map(item => {
      const itemSubtotal = item.priceUSD * item.qty;
      const vesSubtotal = itemSubtotal * EXCHANGE_RATE;
      return `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-info">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">$${itemSubtotal.toFixed(2)} <small style="color:var(--accent-gold); font-size:0.75rem;">(${vesSubtotal.toLocaleString('es-VE')} Bs.)</small></div>
            <div class="cart-item-actions">
              <button class="btn-qty" onclick="changeQty('${item.id}', -1)">-</button>
              <span class="item-qty">${item.qty}</span>
              <button class="btn-qty" onclick="changeQty('${item.id}', 1)">+</button>
            </div>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" title="Eliminar">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `;
    }).join('');
  }

  updateCartTotals();
}

function updateCartTotals() {
  const totalUSD = cart.reduce((sum, item) => sum + (item.priceUSD * item.qty), 0);
  const totalVES = totalUSD * EXCHANGE_RATE;

  if (cartTotalUSD) {
    cartTotalUSD.textContent = `$${totalUSD.toFixed(2)}`;
  }
  if (cartTotalVES) {
    cartTotalVES.textContent = `${totalVES.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs.`;
  }
}

// Drawer Open/Close
function openCart() {
  cartDrawer?.classList.add('active');
  cartBackdrop?.classList.add('active');
}

function closeCart() {
  cartDrawer?.classList.remove('active');
  cartBackdrop?.classList.remove('active');
}

// Modals Handling
function openProductModal(productId) {
  const p = products.find(item => item.id === productId);
  if (!p || !productModalContent) return;

  const prices = formatPrice(p.priceUSD);

  let specsHtml = '';
  for (const [key, val] of Object.entries(p.specs)) {
    const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    specsHtml += `<div><strong>${formattedKey}:</strong> ${val}</div>`;
  }

  productModalContent.innerHTML = `
    <div class="modal-product-layout">
      <img src="${p.img}" alt="${p.name}" class="modal-product-img">
      <div class="modal-product-info">
        <span class="product-category">${p.category}</span>
        <h3>${p.name}</h3>
        <div style="font-style:italic; color:var(--text-muted); font-size:0.85rem; margin-bottom:0.75rem;">${p.scientific}</div>
        <p>${p.shortDesc}</p>
        <div class="modal-specs-list">
          ${specsHtml}
        </div>
        <div style="margin-bottom:1.2rem;">
          <div style="font-size:1.6rem; font-weight:800; color:var(--primary-light);">${prices.primary}</div>
          <div style="font-size:0.85rem; color:var(--accent-gold);">${prices.secondary}</div>
        </div>
        <button class="btn btn-primary" onclick="addToCart('${p.id}'); closeProductModal();" style="width:100%;">
          <i class="fa-solid fa-cart-plus"></i> Agregar al Carrito
        </button>
      </div>
    </div>
  `;

  productModal?.classList.add('active');
  productModalBackdrop?.classList.add('active');
}

function closeProductModal() {
  productModal?.classList.remove('active');
  productModalBackdrop?.classList.remove('active');
}

function openBankModal() {
  bankModal?.classList.add('active');
  bankModalBackdrop?.classList.add('active');
}

function closeBankModal() {
  bankModal?.classList.remove('active');
  bankModalBackdrop?.classList.remove('active');
}

// Copy Data helper
function copyData(text, buttonEl) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = buttonEl.textContent;
    buttonEl.textContent = '¡Copiado!';
    buttonEl.style.backgroundColor = '#10b981';
    buttonEl.style.color = '#041f17';
    setTimeout(() => {
      buttonEl.textContent = originalText;
      buttonEl.style.backgroundColor = '';
      buttonEl.style.color = '';
    }, 2000);
    showToast('📋 Datos copiados al portapapeles');
  }).catch(() => {
    showToast('Por favor copia los datos manualmente');
  });
}

// Toast notification helper
function showToast(msg) {
  if (!toastContainer) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-success"></i> <span>${msg}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Checkout Form Submission (Sends to WhatsApp with formatted summary)
function handleCheckout(e) {
  e.preventDefault();

  if (cart.length === 0) {
    showToast('⚠️ Tu carrito está vacío. Elige al menos una tortuga.');
    return;
  }

  const name = document.getElementById('client-name').value.trim();
  const city = document.getElementById('client-city').value.trim();
  const payment = document.getElementById('client-payment').value;

  const totalUSD = cart.reduce((sum, item) => sum + (item.priceUSD * item.qty), 0);
  const totalVES = totalUSD * EXCHANGE_RATE;

  // Build structured WhatsApp message
  let itemsList = '';
  cart.forEach(item => {
    itemsList += `• ${item.qty}x ${item.name} ($${(item.priceUSD * item.qty).toFixed(2)})\n`;
  });

  const waText = 
`👋 ¡Hola TortuVzla! Deseo formalizar el siguiente pedido:

📦 *PRODUCTOS:*
${itemsList}
💵 *TOTAL:* $${totalUSD.toFixed(2)} USD / ${totalVES.toLocaleString('es-VE')} Bs. (Tasa ${EXCHANGE_RATE} Bs)
💳 *MÉTODO DE PAGO:* ${payment}

👤 *DATOS DEL COMPRADOR:*
• Nombre: ${name}
• Ciudad / Destino: ${city}

¿Me podrían confirmar disponibilidad inmediata y los datos bancarios para realizar el pago? ¡Gracias!`;

  const phone = '584120000000'; // Replace with business WhatsApp number
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(waText)}`;

  // Open WhatsApp in new tab
  window.open(waUrl, '_blank');
}

// FAQ Accordion
function setupFAQAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const isOpen = parent.classList.contains('open');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('open'));

      if (!isOpen) {
        parent.classList.add('open');
      }
    });
  });
}

// Setup Event Listeners
function setupEventListeners() {
  openCartBtn?.addEventListener('click', openCart);
  closeCartBtn?.addEventListener('click', closeCart);
  cartBackdrop?.addEventListener('click', closeCart);

  closeProductModalBtn?.addEventListener('click', closeProductModal);
  productModalBackdrop?.addEventListener('click', closeProductModal);

  btnShowBankInfo?.addEventListener('click', openBankModal);
  closeBankModalBtn?.addEventListener('click', closeBankModal);
  btnDoneBankModal?.addEventListener('click', closeBankModal);
  bankModalBackdrop?.addEventListener('click', closeBankModal);

  checkoutForm?.addEventListener('submit', handleCheckout);

  btnQuickContact?.addEventListener('click', () => {
    window.open('https://wa.me/584120000000?text=Hola%20TortuVzla!%20Deseo%20asesoría%20sobre%20qué%20tortuga%20comprar', '_blank');
  });

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeProductModal();
      closeBankModal();
    }
  });
}
