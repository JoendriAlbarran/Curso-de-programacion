/**
 * ChinaDirecto Vzla - Motor E-Commerce Profesional
 * Importaciones Directas China ➔ Venezuela
 * Vanilla JavaScript Architecture
 */

// Exchange Rate & App State
const EXCHANGE_RATE = 50.00;
let currentCurrency = 'USD'; // 'USD' or 'VES'
let activeCategory = 'todos';
let activeAvailability = 'all'; // 'all', 'stock', 'order'
let searchQuery = '';
let sortBy = 'featured';

// Complete Catalog of Trending Chinese Products in Venezuela
const productsCatalog = [
  {
    id: 'smartwatch-ultra9',
    name: 'Smartwatch Ultra 9 Serie Pro AMOLED (Llamadas + 2 Correas)',
    category: 'tecnologia',
    priceUSD: 18.00,
    originalPriceUSD: 38.00,
    discount: '-52%',
    rating: 4.9,
    reviews: 248,
    stockType: 'stock',
    origin: 'Shenzhen Tech Hub',
    img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Sumergible IP68, recibe llamadas Bluetooth, monitoreo de salud 24/7 y batería de 5 días.',
    specs: {
      pantalla: '2.02 pulgadas HD AMOLED',
      bateria: '380 mAh (5 a 7 días de uso)',
      compatibilidad: 'Android 5.0+ / iOS 9.0+',
      incluye: '2 Correas intercambiables (Silicona + Tela) + Cargador magnético',
      garantia: '30 días por defecto de fábrica en Venezuela'
    }
  },
  {
    id: 'audifonos-tws-pro',
    name: 'Audífonos TWS Bluetooth 5.3 con Pantalla Digital LED',
    category: 'tecnologia',
    priceUSD: 12.00,
    originalPriceUSD: 24.00,
    discount: '-50%',
    rating: 4.8,
    reviews: 310,
    stockType: 'stock',
    origin: 'Shenzhen',
    img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Bajos profundos, cancelación pasiva de ruido y estuche con power bank de emergencia.',
    specs: {
      conectividad: 'Bluetooth 5.3 baja latencia',
      autonomia: '6 horas continuas + 24 horas con estuche',
      pantalla: 'Indicador digital de batería independiente',
      microfono: 'HD con reducción de eco para llamadas',
      garantia: '30 días en Caracas'
    }
  },
  {
    id: 'mini-proyector-smart',
    name: 'Mini Proyector Inteligente Android 4K Portátil Wi-Fi',
    category: 'tecnologia',
    priceUSD: 48.00,
    originalPriceUSD: 85.00,
    discount: '-43%',
    rating: 4.9,
    reviews: 142,
    stockType: 'stock',
    origin: 'Guangzhou',
    img: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Cine en casa de hasta 130 pulgadas. Conecta YouTube, Netflix y consolas por HDMI.',
    specs: {
      sistema: 'Android 11.0 integrado con Play Store',
      resolucion: 'Nativa 720p (Soporte 4K decodificado)',
      brillo: '260 ANSI lúmenes reales',
      rotacion: 'Ángulo flexible de 180° para proyectar al techo',
      garantia: '45 días de soporte técnico'
    }
  },
  {
    id: 'powerbank-solar',
    name: 'Power Bank Solar 30.000 mAh Linterna LED + 4 Cables Integrados',
    category: 'tecnologia',
    priceUSD: 16.00,
    originalPriceUSD: 30.00,
    discount: '-46%',
    rating: 5.0,
    reviews: 420,
    stockType: 'stock',
    origin: 'Dongguan',
    img: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'El salvavidas en Venezuela para apagones. Carga hasta 4 celulares simultáneamente.',
    specs: {
      capacidad: '30.000 mAh de alta densidad',
      cables: 'Lightning (iPhone), Tipo C, Micro USB y USB de entrada',
      panelSolar: 'Recarga solar de emergencia',
      iluminacion: 'Doble foco LED de campamento con modo SOS',
      garantia: '30 días de garantía'
    }
  },
  {
    id: 'licuadora-portatil',
    name: 'Mini Licuadora Portátil Recargable USB (6 Cuchillas de Acero)',
    category: 'hogar',
    priceUSD: 9.50,
    originalPriceUSD: 18.00,
    discount: '-47%',
    rating: 4.7,
    reviews: 180,
    stockType: 'stock',
    origin: 'Yiwu International Market',
    img: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Prepara batidos de proteína y jugos donde sea. Vaso desmontable libre de BPA.',
    specs: {
      motor: '22.000 RPM de alta velocidad',
      bateria: '2000 mAh (12 a 15 batidos por carga)',
      capacidad: '380 ml con filtro colador',
      seguridad: 'Sensor magnético (no arranca destapada)',
      garantia: '30 días de cambio'
    }
  },
  {
    id: 'sellador-bolsas',
    name: 'Sellador Térmico Portátil de Bolsas al Vacío 2 en 1',
    category: 'hogar',
    priceUSD: 6.00,
    originalPriceUSD: 12.00,
    discount: '-50%',
    rating: 4.8,
    reviews: 95,
    stockType: 'order',
    origin: 'Yiwu',
    img: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Sella empaques de comida herméticamente para conservar alimentos frescos.',
    specs: {
      mecanismo: 'Sellado por micro-calor instantáneo + Cuchilla abridora',
      alimentacion: 'Batería recargable USB Tipo-C',
      base: 'Imán trasero para pegar a la nevera',
      garantia: '30 días de reemplazo'
    }
  },
  {
    id: 'luces-solares-exterior',
    name: 'Focos Solares de Pared 100 LEDs con Sensor Movimiento (Pack x2)',
    category: 'hogar',
    priceUSD: 14.00,
    originalPriceUSD: 26.00,
    discount: '-46%',
    rating: 4.9,
    reviews: 215,
    stockType: 'stock',
    origin: 'Zhongshan Lighting Capital',
    img: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Cero gasto de luz eléctrica. Se encienden solas al detectar personas en patios o garajes.',
    specs: {
      leds: '100 LEDs SMD de alta luminosidad',
      sensor: 'Detección de 3 a 5 metros en 120°',
      resistencia: 'IP65 impermeable contra lluvia fuerte',
      bateria: 'Solar de litio 1800 mAh',
      garantia: '30 días'
    }
  },
  {
    id: 'compresor-aire-auto',
    name: 'Compresor de Aire Inalámbrico Digital Portátil para Cauchos',
    category: 'herramientas',
    priceUSD: 26.00,
    originalPriceUSD: 48.00,
    discount: '-45%',
    rating: 4.9,
    reviews: 164,
    stockType: 'stock',
    origin: 'Ningbo',
    img: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Calibra y llena cauchos de carro, moto o bicicletas en 3 minutos. Se detiene solo.',
    specs: {
      presionMaxima: '150 PSI con display digital en vivo',
      bateria: '6000 mAh recargable con función linterna',
      boquillas: '4 Adaptadores (Carro, moto, balones, inflables)',
      garantia: '60 días de garantía'
    }
  },
  {
    id: 'kit-destornilladores-115',
    name: 'Kit de Destornilladores de Precisión 115 en 1 para Electrónica',
    category: 'herramientas',
    priceUSD: 11.00,
    originalPriceUSD: 20.00,
    discount: '-45%',
    rating: 4.8,
    reviews: 130,
    stockType: 'stock',
    origin: 'Shenzhen',
    img: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Herramienta obligatoria para reparar celulares iPhone, laptops, controles y consolas.',
    specs: {
      puntas: '98 Puntas de acero al cromo vanadio (CR-V)',
      accesorios: 'Pinzas de precisión, ventosa, palancas y magnetizador',
      estuche: 'Caja organizadora de doble cara anti-caídas',
      garantia: 'Calidad profesional'
    }
  },
  {
    id: 'aspiradora-auto-recargable',
    name: 'Aspiradora Inalámbrica de Mano Potente para Carro y Hogar',
    category: 'herramientas',
    priceUSD: 15.00,
    originalPriceUSD: 28.00,
    discount: '-46%',
    rating: 4.7,
    reviews: 89,
    stockType: 'order',
    origin: 'Ningbo',
    img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Succión fuerte para polvo, migajas y pelos de mascotas. Filtro lavable HEPA.',
    specs: {
      potenciaSuccion: '9000 Pa ciclónica',
      filtro: 'HEPA lavable y reutilizable',
      boquillas: 'Boquilla plana alargada + Cepillo para tapicería',
      garantia: '30 días'
    }
  },
  {
    id: 'morral-antirrobo-usb',
    name: 'Morral Antirrobo Impermeable con Puerto USB y Candado TSA',
    category: 'moda',
    priceUSD: 19.00,
    originalPriceUSD: 36.00,
    discount: '-47%',
    rating: 4.9,
    reviews: 210,
    stockType: 'stock',
    origin: 'Guangzhou Leather Market',
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Apertura oculta hacia la espalda, material anti-cortes y bolsillo para laptop de 15.6".',
    specs: {
      seguridad: 'Candado de clave numérica TSA + Cierres ocultos',
      material: 'Tela Oxford impermeable de alta resistencia',
      compartimiento: 'Acolchado para laptop de hasta 15.6 pulgadas',
      puerto: 'Salida externa USB para cargar celular caminando',
      garantia: 'Costuras reforzadas'
    }
  },
  {
    id: 'cepillo-secador-5en1',
    name: 'Cepillo Secador y Voluminizador Multifuncional 5 en 1 Cerámica',
    category: 'belleza',
    priceUSD: 17.50,
    originalPriceUSD: 32.00,
    discount: '-45%',
    rating: 4.8,
    reviews: 340,
    stockType: 'stock',
    origin: 'Wenzhou',
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Seca, alisa, ondula y da volumen con iones negativos para eliminar el frizz.',
    specs: {
      cabezales: '5 Cabezales intercambiables con recubrimiento cerámico',
      temperatura: '3 Niveles de calor ajustables con flujo de aire iónico',
      cable: 'Giratorio 360° para mayor comodidad',
      voltaje: '110V estándar para Venezuela',
      garantia: '30 días de reemplazo'
    }
  }
];

// Shopping Cart State (LocalStorage)
let cart = JSON.parse(localStorage.getItem('chinadirecto_cart')) || [];

// DOM References
const productsGrid = document.getElementById('products-grid');
const cartBadge = document.getElementById('cart-counter');
const headerCartTotal = document.getElementById('header-cart-total');
const cartDrawer = document.getElementById('cart-drawer');
const cartBackdrop = document.getElementById('cart-backdrop');
const cartItemsWrapper = document.getElementById('cart-items-wrapper');
const cartUsdTotal = document.getElementById('cart-usd-total');
const cartVesTotal = document.getElementById('cart-ves-total');
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const checkoutForm = document.getElementById('checkout-form');

// Currency Switching
const btnCurrUsd = document.getElementById('btn-curr-usd');
const btnCurrVes = document.getElementById('btn-curr-ves');
const currentRateLabel = document.getElementById('current-rate-label');

// Search & Sort Elements
const globalSearchInput = document.getElementById('global-search-input');
const clearSearchBtn = document.getElementById('clear-search-btn');
const sortSelect = document.getElementById('sort-select');
const displayedCount = document.getElementById('displayed-products-count');

// Modals
const productDetailModal = document.getElementById('product-detail-modal');
const productDetailBackdrop = document.getElementById('product-detail-backdrop');
const productDetailBody = document.getElementById('product-detail-body');
const closeDetailModalBtn = document.getElementById('close-detail-modal');

const bankModal = document.getElementById('bank-modal');
const bankOverlay = document.getElementById('bank-overlay');
const closeBankModalBtn = document.getElementById('close-bank-modal');
const btnOpenPaymentModal = document.getElementById('btn-open-payment-modal');
const btnCloseBankScreen = document.getElementById('btn-close-bank-screen');

// Calculator Elements
const shippingMethodSelect = document.getElementById('shipping-method');
const shippingWeightInput = document.getElementById('shipping-weight');
const shippingVolumeInput = document.getElementById('shipping-volume');
const weightContainer = document.getElementById('weight-input-container');
const volumeContainer = document.getElementById('volume-input-container');
const calcTotalUsd = document.getElementById('calc-total-usd');
const calcTotalBs = document.getElementById('calc-total-bs');
const btnRequestShippingQuote = document.getElementById('btn-request-shipping-quote');

// Tracking Simulator Elements
const trackingForm = document.getElementById('tracking-form');
const trackingCodeInput = document.getElementById('tracking-code-input');

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  updateCategoryCounts();
  updateCartUI();
  setupCurrencySwitcher();
  setupFilterHandlers();
  setupSearchAndSort();
  setupShippingCalculator();
  setupTrackingSimulator();
  setupFlashSaleCountdown();
  setupFAQAccordion();
  setupEventListeners();

  // Update Footer Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Set initial rate label
  if (currentRateLabel) {
    currentRateLabel.textContent = `${EXCHANGE_RATE.toFixed(2)} Bs/$`;
  }

  // Update Hero Card Dynamic Price
  updateHeroFeaturedCard();
});

// Format Price Helper
function formatPrice(usdAmount) {
  const vesAmount = usdAmount * EXCHANGE_RATE;
  if (currentCurrency === 'USD') {
    return {
      main: `$${usdAmount.toFixed(2)} USD`,
      sub: `≈ ${vesAmount.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs.`
    };
  } else {
    return {
      main: `${vesAmount.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs.`,
      sub: `≈ $${usdAmount.toFixed(2)} USD`
    };
  }
}

// Update Hero Featured Card
function updateHeroFeaturedCard() {
  const heroPriceEl = document.getElementById('hero-card-price');
  const heroBsEl = document.getElementById('hero-card-bs');
  if (heroPriceEl && heroBsEl) {
    const prices = formatPrice(18.00);
    heroPriceEl.textContent = prices.main;
    heroBsEl.textContent = prices.sub;
  }
}

// Update Category Counter Badges in Tabs
function updateCategoryCounts() {
  const cats = ['todos', 'tecnologia', 'hogar', 'herramientas', 'moda', 'belleza'];
  cats.forEach(cat => {
    const badge = document.getElementById(`count-${cat}`);
    if (badge) {
      if (cat === 'todos') {
        badge.textContent = productsCatalog.length;
      } else {
        badge.textContent = productsCatalog.filter(p => p.category === cat).length;
      }
    }
  });
}

// Render Products Catalog
function renderCatalog() {
  if (!productsGrid) return;
  productsGrid.innerHTML = '';

  // 1. Filter by category
  let list = activeCategory === 'todos' 
    ? [...productsCatalog] 
    : productsCatalog.filter(p => p.category === activeCategory);

  // 2. Filter by availability (stock vs order)
  if (activeAvailability === 'stock') {
    list = list.filter(p => p.stockType === 'stock');
  } else if (activeAvailability === 'order') {
    list = list.filter(p => p.stockType === 'order');
  }

  // 3. Filter by search query
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.shortDesc.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.origin.toLowerCase().includes(q)
    );
  }

  // 4. Sort
  if (sortBy === 'price-asc') {
    list.sort((a, b) => a.priceUSD - b.priceUSD);
  } else if (sortBy === 'price-desc') {
    list.sort((a, b) => b.priceUSD - a.priceUSD);
  } else if (sortBy === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  }

  // Update displayed count
  if (displayedCount) {
    displayedCount.textContent = list.length;
  }

  if (list.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding:3rem; color:var(--text-dim);">
        <i class="fa-solid fa-box-open" style="font-size:3rem; margin-bottom:1rem; color:var(--border-amber);"></i>
        <h3>No se encontraron productos con estos filtros</h3>
        <p>Prueba buscando con otro término o seleccionando otra categoría.</p>
      </div>
    `;
    return;
  }

  list.forEach(item => {
    const prices = formatPrice(item.priceUSD);
    const card = document.createElement('div');
    card.className = 'product-item-card';

    const stockBadge = item.stockType === 'stock'
      ? `<span class="card-stock-status status-in-stock"><i class="fa-solid fa-circle-check"></i> En Stock Caracas (24h)</span>`
      : `<span class="card-stock-status status-by-order"><i class="fa-solid fa-ship"></i> Por Encargo China (Ahorra 45%)</span>`;

    card.innerHTML = `
      <div class="card-top-media">
        <img src="${item.img}" alt="${item.name}" class="product-thumbnail" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80'">
        <span class="discount-badge-flag">${item.discount}</span>
        <span class="origin-badge-tag"><i class="fa-solid fa-industry"></i> ${item.origin}</span>
      </div>

      <div class="card-inner-body">
        <span class="card-cat-tag">${item.category}</span>
        <h3 class="card-item-title">${item.name}</h3>

        <div class="card-rating-row">
          <span>⭐ ${item.rating}</span>
          <small>(${item.reviews} compras verificadas en Vzla)</small>
        </div>

        ${stockBadge}

        <p style="font-size:0.84rem; color:var(--text-muted); margin-bottom:1rem; line-height:1.4;">
          ${item.shortDesc}
        </p>

        <div class="card-bottom-actions">
          <div class="card-pricing-block">
            <span class="card-old-cost">$${item.originalPriceUSD.toFixed(2)} USD</span>
            <span class="card-curr-price">${prices.main}</span>
            <small class="card-ves-price">${prices.sub}</small>
          </div>

          <div class="card-btn-group">
            <button class="btn-add-grid" onclick="addToCart('${item.id}')" title="Agregar a la bolsa">
              <i class="fa-solid fa-cart-plus"></i> Agregar
            </button>
            <button class="btn-view-spec" onclick="openProductModal('${item.id}')" title="Ver ficha técnica">
              <i class="fa-solid fa-eye"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

// Global Category Filter from Links
function filterByCategory(cat) {
  activeCategory = cat;
  document.querySelectorAll('.cat-tab').forEach(t => {
    t.classList.toggle('active', t.getAttribute('data-category') === cat);
  });
  document.querySelectorAll('.category-quick-link').forEach(q => {
    q.classList.toggle('active', q.getAttribute('data-cat') === cat);
  });
  renderCatalog();
}

// Filter Tabs & Availability
function setupFilterHandlers() {
  // Category tabs
  const catTabs = document.querySelectorAll('.cat-tab');
  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.getAttribute('data-category');
      
      // sync subnav
      document.querySelectorAll('.category-quick-link').forEach(q => {
        q.classList.toggle('active', q.getAttribute('data-cat') === activeCategory);
      });

      renderCatalog();
    });
  });

  // Quick links in header
  const quickLinks = document.querySelectorAll('.category-quick-link[data-cat]');
  quickLinks.forEach(link => {
    link.addEventListener('click', () => {
      quickLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      activeCategory = link.getAttribute('data-cat');

      // sync main tabs
      catTabs.forEach(t => {
        t.classList.toggle('active', t.getAttribute('data-category') === activeCategory);
      });

      renderCatalog();
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Availability filter pills
  const availPills = document.querySelectorAll('.avail-pill');
  availPills.forEach(pill => {
    pill.addEventListener('click', () => {
      availPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeAvailability = pill.getAttribute('data-avail');
      renderCatalog();
    });
  });
}

// Search & Sort Handlers
function setupSearchAndSort() {
  globalSearchInput?.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    if (clearSearchBtn) {
      clearSearchBtn.classList.toggle('show', searchQuery.length > 0);
    }
    renderCatalog();
  });

  clearSearchBtn?.addEventListener('click', () => {
    if (globalSearchInput) {
      globalSearchInput.value = '';
      searchQuery = '';
      clearSearchBtn.classList.remove('show');
      renderCatalog();
    }
  });

  sortSelect?.addEventListener('change', (e) => {
    sortBy = e.target.value;
    renderCatalog();
  });
}

// Currency Switcher
function setupCurrencySwitcher() {
  btnCurrUsd?.addEventListener('click', () => {
    currentCurrency = 'USD';
    btnCurrUsd.classList.add('active');
    btnCurrVes.classList.remove('active');
    renderCatalog();
    updateHeroFeaturedCard();
    updateCartTotals();
    calculateShipping();
    showToast('💵 Moneda fijada en Dólares ($ USD)');
  });

  btnCurrVes?.addEventListener('click', () => {
    currentCurrency = 'VES';
    btnCurrVes.classList.add('active');
    btnCurrUsd.classList.remove('active');
    renderCatalog();
    updateHeroFeaturedCard();
    updateCartTotals();
    calculateShipping();
    showToast('🇻🇪 Moneda fijada en Bolívares (VES)');
  });
}

// Cart Functionality
function addToCart(productId) {
  const product = productsCatalog.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
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
  showToast(`🛒 "${product.name.slice(0, 24)}..." agregado`);
}

function updateQty(productId, delta) {
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
  showToast('Producto retirado de la bolsa');
}

function saveCart() {
  localStorage.setItem('chinadirecto_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  if (cartBadge) cartBadge.textContent = count;

  const totalUSD = cart.reduce((sum, item) => sum + (item.priceUSD * item.qty), 0);
  if (headerCartTotal) headerCartTotal.textContent = `$${totalUSD.toFixed(2)}`;

  if (!cartItemsWrapper) return;

  if (cart.length === 0) {
    cartItemsWrapper.innerHTML = `
      <div class="empty-drawer-msg">
        <i class="fa-solid fa-basket-shopping"></i>
        <h4>Tu bolsa de compras está vacía</h4>
        <p>Explora nuestro catálogo con precios de fábrica y añade tus productos.</p>
      </div>
    `;
  } else {
    cartItemsWrapper.innerHTML = cart.map(item => {
      const subtotal = item.priceUSD * item.qty;
      const vesSubtotal = subtotal * EXCHANGE_RATE;
      return `
        <div class="cart-drawer-item">
          <img src="${item.img}" alt="${item.name}" class="cart-item-thumb">
          <div class="cart-item-details">
            <h4 class="cart-item-name">${item.name}</h4>
            <div class="cart-item-subtotal">
              $${subtotal.toFixed(2)} USD 
              <small style="color:var(--text-dim); font-size:0.75rem;">(${vesSubtotal.toLocaleString('es-VE')} Bs.)</small>
            </div>
            <div class="cart-qty-controls">
              <button class="btn-q" onclick="updateQty('${item.id}', -1)">-</button>
              <span class="q-val">${item.qty}</span>
              <button class="btn-q" onclick="updateQty('${item.id}', 1)">+</button>
            </div>
          </div>
          <button class="btn-trash-item" onclick="removeFromCart('${item.id}')" title="Eliminar">
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

  if (cartUsdTotal) cartUsdTotal.textContent = `$${totalUSD.toFixed(2)} USD`;
  if (cartVesTotal) cartVesTotal.textContent = `${totalVES.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs.`;
}

function openCart() {
  cartDrawer?.classList.add('active');
  cartBackdrop?.classList.add('active');
}

function closeCart() {
  cartDrawer?.classList.remove('active');
  cartBackdrop?.classList.remove('active');
}

// Shipping Calculator (China ➔ Venezuela)
function setupShippingCalculator() {
  shippingMethodSelect?.addEventListener('change', (e) => {
    const isAir = e.target.value === 'aereo';
    if (weightContainer) weightContainer.style.display = isAir ? 'block' : 'none';
    if (volumeContainer) volumeContainer.style.display = isAir ? 'none' : 'block';
    calculateShipping();
  });

  shippingWeightInput?.addEventListener('input', calculateShipping);
  shippingVolumeInput?.addEventListener('input', calculateShipping);

  btnRequestShippingQuote?.addEventListener('click', () => {
    const method = shippingMethodSelect?.value === 'aereo' ? 'Aéreo Express (7-12 días)' : 'Marítimo Consolidado (25-35 días)';
    const amount = shippingMethodSelect?.value === 'aereo' 
      ? `${shippingWeightInput?.value || 3} Kg` 
      : `${shippingVolumeInput?.value || 2} Pies Cúbicos (Cft)`;
    const dest = document.getElementById('shipping-destination')?.options[document.getElementById('shipping-destination')?.selectedIndex]?.text;
    const totalUSD = calcTotalUsd?.textContent;

    const waText = `🇨🇳➔🇻🇪 ¡Hola ChinaDirecto Vzla! Deseo cotizar el flete de mi carga:\n\n• Modalidad: ${method}\n• Carga: ${amount}\n• Destino: ${dest}\n• Cotización estimada: ${totalUSD}\n\n¿Cuáles son las instrucciones y dirección de sus almacenes en China?`;
    window.open(`https://wa.me/584120000000?text=${encodeURIComponent(waText)}`, '_blank');
  });

  calculateShipping();
}

function calculateShipping() {
  if (!calcTotalUsd || !calcTotalBs) return;

  const method = shippingMethodSelect?.value || 'aereo';
  let totalUsdVal = 0;

  if (method === 'aereo') {
    const weight = parseFloat(shippingWeightInput?.value) || 1;
    const ratePerKg = 14.00; // $14 per Kg
    totalUsdVal = Math.max(weight * ratePerKg, 28.00); // minimum 2kg
  } else {
    const volume = parseFloat(shippingVolumeInput?.value) || 1;
    const ratePerCft = 22.00; // $22 per Cft
    totalUsdVal = Math.max(volume * ratePerCft, 44.00); // minimum 2 cft
  }

  const totalVesVal = totalUsdVal * EXCHANGE_RATE;
  calcTotalUsd.textContent = `$${totalUsdVal.toFixed(2)} USD`;
  calcTotalBs.textContent = `≈ ${totalVesVal.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs. (Tasa Ref)`;
}

// Live Tracking Simulator
function setupTrackingSimulator() {
  trackingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = trackingCodeInput?.value.trim() || 'CN-VZLA-8921';
    simulateTrackingResult(code);
  });
}

function fillTracking(code) {
  if (trackingCodeInput) {
    trackingCodeInput.value = code;
    simulateTrackingResult(code);
    document.getElementById('tracking-results-box')?.scrollIntoView({ behavior: 'smooth' });
  }
}

function simulateTrackingResult(code) {
  const trackIdDisplay = document.getElementById('track-id-display');
  const trackStatusTitle = document.getElementById('track-status-title');
  const trackEtaDisplay = document.getElementById('track-eta-display');
  const steps = document.querySelectorAll('.timeline-step');

  if (trackIdDisplay) trackIdDisplay.textContent = `Guía #${code.toUpperCase()}`;

  // Reset steps
  steps.forEach(s => s.className = 'timeline-step');

  if (code.toUpperCase().includes('AERO')) {
    if (trackStatusTitle) trackStatusTitle.textContent = 'Vuelo de Carga en Ruta Shenzhen ➔ Maiquetía';
    if (trackEtaDisplay) trackEtaDisplay.innerHTML = '<i class="fa-solid fa-plane-arrival text-amber"></i> Arribo estimado: Mañana a las 2:00 PM';
    steps[0]?.classList.add('completed');
    steps[1]?.classList.add('active');
  } else {
    if (trackStatusTitle) trackStatusTitle.textContent = 'Contenedor en Inspección y Desaduanaje - Puerto Cabello / La Guaira';
    if (trackEtaDisplay) trackEtaDisplay.innerHTML = '<i class="fa-solid fa-calendar-check text-amber"></i> Liberación prevista: En 48 horas para despacho';
    steps[0]?.classList.add('completed');
    steps[1]?.classList.add('completed');
    steps[2]?.classList.add('active');
  }

  showToast(`🔍 Mostrando estado para la guía ${code.toUpperCase()}`);
}

// Flash Sale Countdown Timer
function setupFlashSaleCountdown() {
  const hoursEl = document.getElementById('timer-hours');
  const minutesEl = document.getElementById('timer-minutes');
  const secondsEl = document.getElementById('timer-seconds');

  let totalSeconds = (14 * 3600) + (32 * 60) + 50;

  setInterval(() => {
    if (totalSeconds <= 0) {
      totalSeconds = 24 * 3600; // Reset to 24h
    }
    totalSeconds--;

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(m).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

// Modals Handling
function openProductModal(productId) {
  const product = productsCatalog.find(p => p.id === productId);
  if (!product || !productDetailBody) return;

  const prices = formatPrice(product.priceUSD);
  let specsRows = '';
  for (const [key, val] of Object.entries(product.specs)) {
    const formatted = key.charAt(0).toUpperCase() + key.slice(1);
    specsRows += `<div><strong>${formatted}:</strong> ${val}</div>`;
  }

  productDetailBody.innerHTML = `
    <div class="modal-product-layout">
      <img src="${product.img}" alt="${product.name}" class="modal-img-big">
      <div class="modal-info-col">
        <span class="card-cat-tag">${product.category}</span>
        <h3>${product.name}</h3>
        <p>${product.shortDesc}</p>
        <div class="specs-table-box">
          ${specsRows}
        </div>
        <div style="margin-bottom:1.25rem;">
          <span style="font-size:1.6rem; font-weight:900; color:var(--primary-gold);">${prices.main}</span>
          <div style="font-size:0.85rem; color:var(--primary-red); font-weight:700;">${prices.sub}</div>
        </div>
        <button class="btn btn-primary" onclick="addToCart('${product.id}'); closeProductModal();" style="width:100%;">
          <i class="fa-solid fa-cart-plus"></i> Añadir a mi Pedido
        </button>
      </div>
    </div>
  `;

  productDetailModal?.classList.add('active');
  productDetailBackdrop?.classList.add('active');
}

function closeProductModal() {
  productDetailModal?.classList.remove('active');
  productDetailBackdrop?.classList.remove('active');
}

function openBankModal() {
  bankModal?.classList.add('active');
  bankOverlay?.classList.add('active');
}

function closeBankModal() {
  bankModal?.classList.remove('active');
  bankOverlay?.classList.remove('active');
}

// Clipboard helper with visual button feedback
function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = '¡Copiado!';
    btn.style.backgroundColor = '#f59e0b';
    btn.style.color = '#1a0f02';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.backgroundColor = '';
      btn.style.color = '';
    }, 2000);
    showToast('📋 Datos bancarios copiados al portapapeles');
  }).catch(() => {
    showToast('Copia los datos de forma manual');
  });
}

// WhatsApp Checkout Form Submission
function handleCheckout(e) {
  e.preventDefault();

  if (cart.length === 0) {
    showToast('⚠️ Tu carrito está vacío. Agrega al menos 1 producto.');
    return;
  }

  const name = document.getElementById('order-name').value.trim();
  const city = document.getElementById('order-city').value.trim();
  const shipping = document.getElementById('order-shipping').value;
  const payment = document.getElementById('order-payment').value;

  const totalUSD = cart.reduce((sum, item) => sum + (item.priceUSD * item.qty), 0);
  const totalVES = totalUSD * EXCHANGE_RATE;
  const orderId = 'IMP-' + Math.floor(1000 + Math.random() * 9000);

  let itemsDetail = '';
  cart.forEach(item => {
    itemsDetail += `• ${item.qty}x ${item.name} ($${(item.priceUSD * item.qty).toFixed(2)})\n`;
  });

  const message = 
`🇨🇳➔🇻🇪 *NUEVO PEDIDO FORMAL - CHINADIRECTO VZLA*
🔖 *ORDEN:* #${orderId}

📦 *PRODUCTOS:*
${itemsDetail}
💵 *TOTAL:* $${totalUSD.toFixed(2)} USD / ${totalVES.toLocaleString('es-VE')} Bs. (Tasa: ${EXCHANGE_RATE} Bs)
💳 *FORMA DE PAGO:* ${payment}
🚚 *ENVÍO/ENTREGA:* ${shipping}

👤 *DATOS DEL CLIENTE:*
• Nombre: ${name}
• Ciudad/Estado: ${city}

¿Me confirman disponibilidad inmediata y el número de cuenta/Binance para transferir? ¡Muchas gracias!`;

  const phone = '584120000000';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// FAQ Accordion Handler
function setupFAQAccordion() {
  const toggles = document.querySelectorAll('.faq-toggle');
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const isOpen = parent.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) parent.classList.add('open');
    });
  });
}

// Toast System
function showToast(msg) {
  const container = document.getElementById('toasts-wrapper');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-amber"></i> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Setup Event Listeners
function setupEventListeners() {
  openCartBtn?.addEventListener('click', openCart);
  closeCartBtn?.addEventListener('click', closeCart);
  cartBackdrop?.addEventListener('click', closeCart);

  closeDetailModalBtn?.addEventListener('click', closeProductModal);
  productDetailBackdrop?.addEventListener('click', closeProductModal);

  btnOpenPaymentModal?.addEventListener('click', openBankModal);
  closeBankModalBtn?.addEventListener('click', closeBankModal);
  btnCloseBankScreen?.addEventListener('click', closeBankModal);
  bankOverlay?.addEventListener('click', closeBankModal);

  checkoutForm?.addEventListener('submit', handleCheckout);

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeProductModal();
      closeBankModal();
    }
  });
}
