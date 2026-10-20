/**
 * ==============================================================================
 * SCRIPT - LA CESTICA DIGITAL DE JOENDRI ALBARRAN
 * ==============================================================================
 * Dinámica: Tienda Interactiva / Simulador E-Commerce
 * - Manejo de Catálogo Dinámico con Búsqueda y Filtros en Tiempo Real
 * - Carrito de Compras Deslizante (Slide-over Drawer)
 * - Cálculo reactivo de Subtotales, Descuentos por Cupón, Impuestos y Totales
 * - Creación de Productos Personalizados (homenaje a Carrito_Compras.py)
 * - Modal de Factura / Ticket de Compra Imprimible
 * - Persistencia de datos en localStorage
 * ==============================================================================
 */

// Catálogo base inicial
const CATALOGO_INICIAL = [
    {
        id: 1,
        name: 'Laptop Gamer Albarran Pro',
        price: 899.99,
        category: 'tecnologia',
        icon: '💻',
        desc: 'Potente procesador, 16GB RAM y tarjeta gráfica para desarrollo y videojuegos.'
    },
    {
        id: 2,
        name: 'Auriculares CyberSound RGB',
        price: 49.99,
        category: 'accesorios',
        icon: '🎧',
        desc: 'Cancelación de ruido activa, sonido espacial y micrófono de alta fidelidad.'
    },
    {
        id: 3,
        name: 'Teclado Mecánico RGB Glow',
        price: 79.99,
        category: 'tecnologia',
        icon: '⌨️',
        desc: 'Switches táctiles mecánicos para máxima velocidad al programar.'
    },
    {
        id: 4,
        name: 'Café Espresso Especial Dev',
        price: 4.50,
        category: 'snacks',
        icon: '☕',
        desc: 'Tostado oscuro premium para mantenerte despierto en sesiones de código.'
    },
    {
        id: 5,
        name: 'Hamburguesa Monster Cheddar',
        price: 8.99,
        category: 'snacks',
        icon: '🍔',
        desc: 'Doble carne, queso cheddar fundido, tocineta crujiente y salsa especial.'
    },
    {
        id: 6,
        name: 'Mouse Ergonómico Albarran Ultra',
        price: 35.00,
        category: 'accesorios',
        icon: '🖱️',
        desc: 'Sensor óptico de alta precisión con agarre ergonómico anti-fatiga.'
    },
    {
        id: 7,
        name: 'Monitor Curvo 27" 144Hz',
        price: 249.99,
        category: 'tecnologia',
        icon: '🖥️',
        desc: 'Resolución Full HD con colores vivos y tasa de refresco ultra suave.'
    },
    {
        id: 8,
        name: 'Pizza Familiar 4 Quesos',
        price: 12.50,
        category: 'snacks',
        icon: '🍕',
        desc: 'Masa crujiente artesanal con mozzarella, parmesano, gorgonzola y provolone.'
    },
    {
        id: 9,
        name: 'Smartwatch Deportivo JA',
        price: 65.00,
        category: 'accesorios',
        icon: '⌚',
        desc: 'Monitor de ritmo cardíaco, notificaciones y batería de 7 días.'
    }
];

// Estado global de la aplicación
const AppState = {
    productos: [],
    carrito: [],
    categoriaActual: 'todos',
    busquedaActual: '',
    ordenActual: 'default',
    descuentoPorcentaje: 0,
    cuponActivo: ''
};

// Claves de Almacenamiento Local
const STORAGE_KEYS = {
    CUSTOM_PRODUCTS: 'joendri_tienda_custom_products',
    CART: 'joendri_tienda_cart',
    THEME: 'joendri_tienda_theme'
};

/* ==========================================================================
   INICIALIZACIÓN
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    cargarDatosLocales();
    inicializarTema();
    inicializarCatalogo();
    inicializarFiltrosYBusqueda();
    inicializarCarritoDrawer();
    inicializarFormularioPersonalizado();
    inicializarModalRecibo();
    actualizarVistaCarrito();
    actualizarContadoresGenerales();
});

/* ==========================================================================
   1. CARGA DE DATOS Y PERSISTENCIA
   ========================================================================== */
function cargarDatosLocales() {
    // 1. Cargar productos personalizados del usuario y combinarlos con el catálogo inicial
    const guardadosPersonalizados = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_PRODUCTS)) || [];
    AppState.productos = [...CATALOGO_INICIAL, ...guardadosPersonalizados];

    // 2. Cargar carrito guardado
    AppState.carrito = JSON.parse(localStorage.getItem(STORAGE_KEYS.CART)) || [];
}

function guardarCarrito() {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(AppState.carrito));
}

function guardarProductosPersonalizados(nuevoProducto) {
    const personalizados = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_PRODUCTS)) || [];
    personalizados.push(nuevoProducto);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_PRODUCTS, JSON.stringify(personalizados));
}

/* ==========================================================================
   2. SISTEMA DE TEMA (CLARO / OSCURO)
   ========================================================================== */
function inicializarTema() {
    const btnTheme = document.getElementById('btn-theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    html.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

    btnTheme.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        themeIcon.textContent = next === 'dark' ? '🌙' : '☀️';
        localStorage.setItem(STORAGE_KEYS.THEME, next);
        mostrarToast(`Modo ${next === 'dark' ? 'oscuro' : 'claro'} activado`);
    });
}

/* ==========================================================================
   3. RENDERIZADO DEL CATÁLOGO DE PRODUCTOS
   ========================================================================== */
function inicializarCatalogo() {
    renderizarProductos();
}

function renderizarProductos() {
    const grid = document.getElementById('catalog-grid');
    const noResults = document.getElementById('no-results');

    // 1. Filtrar por categoría
    let filtrados = AppState.productos.filter(prod => {
        if (AppState.categoriaActual === 'todos') return true;
        return prod.category === AppState.categoriaActual;
    });

    // 2. Filtrar por búsqueda de texto
    if (AppState.busquedaActual.trim() !== '') {
        const query = AppState.busquedaActual.toLowerCase();
        filtrados = filtrados.filter(prod => 
            prod.name.toLowerCase().includes(query) ||
            prod.desc.toLowerCase().includes(query)
        );
    }

    // 3. Ordenar
    if (AppState.ordenActual === 'price-asc') {
        filtrados.sort((a, b) => a.price - b.price);
    } else if (AppState.ordenActual === 'price-desc') {
        filtrados.sort((a, b) => b.price - a.price);
    } else if (AppState.ordenActual === 'name-asc') {
        filtrados.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Mostrar u ocultar estado sin resultados
    if (filtrados.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    } else {
        noResults.style.display = 'none';
    }

    // Inyectar HTML
    grid.innerHTML = filtrados.map(prod => `
        <article class="product-card" data-id="${prod.id}">
            <div class="card-top">
                <span class="card-badge ${prod.category}">
                    ${obtenerEtiquetaCategoria(prod.category)}
                </span>
            </div>

            <div class="card-icon-wrap" aria-hidden="true">
                ${prod.icon || '📦'}
            </div>

            <h3 class="product-title">${prod.name}</h3>
            <p class="product-desc">${prod.desc}</p>

            <div class="card-bottom">
                <span class="product-price">$${prod.price.toFixed(2)}</span>
                <button class="btn-add-cart" onclick="agregarAlCarrito(${prod.id})">
                    <span>+ Agregar</span>
                </button>
            </div>
        </article>
    `).join('');
}

function obtenerEtiquetaCategoria(cat) {
    switch (cat) {
        case 'tecnologia': return '💻 Tech';
        case 'snacks': return '🍔 Comida';
        case 'accesorios': return '🎧 Accesorio';
        case 'personalizados': return '✨ Especial';
        default: return 'General';
    }
}

/* ==========================================================================
   4. BÚSQUEDA Y FILTROS
   ========================================================================== */
function inicializarFiltrosYBusqueda() {
    const searchInput = document.getElementById('search-input');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const pills = document.querySelectorAll('.category-pills .pill');
    const sortSelect = document.getElementById('sort-select');
    const btnResetFilters = document.getElementById('btn-reset-filters');

    // Input de búsqueda en vivo
    searchInput.addEventListener('input', (e) => {
        AppState.busquedaActual = e.target.value;
        clearSearchBtn.style.display = AppState.busquedaActual ? 'block' : 'none';
        renderizarProductos();
    });

    // Botón para limpiar búsqueda
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        AppState.busquedaActual = '';
        clearSearchBtn.style.display = 'none';
        renderizarProductos();
        searchInput.focus();
    });

    // Pestañas / Pills de categoría
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            AppState.categoriaActual = pill.dataset.category;
            renderizarProductos();
        });
    });

    // Selector de orden
    sortSelect.addEventListener('change', (e) => {
        AppState.ordenActual = e.target.value;
        renderizarProductos();
    });

    // Botón de restablecer
    btnResetFilters.addEventListener('click', () => {
        searchInput.value = '';
        AppState.busquedaActual = '';
        clearSearchBtn.style.display = 'none';
        AppState.categoriaActual = 'todos';
        pills.forEach(p => p.classList.remove('active'));
        document.querySelector('.pill[data-category="todos"]').classList.add('active');
        sortSelect.value = 'default';
        AppState.ordenActual = 'default';
        renderizarProductos();
    });
}

/* ==========================================================================
   5. LÓGICA DEL CARRITO DE COMPRAS (LA CESTICA)
   ========================================================================== */
function inicializarCarritoDrawer() {
    const btnOpenCart = document.getElementById('btn-open-cart');
    const btnCloseCart = document.getElementById('btn-close-cart');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartDrawer = document.getElementById('cart-drawer');
    const btnStartShopping = document.getElementById('btn-start-shopping');
    const btnClearCart = document.getElementById('btn-clear-cart');
    const btnApplyCoupon = document.getElementById('btn-apply-coupon');
    const couponInput = document.getElementById('coupon-input');
    const btnCheckout = document.getElementById('btn-checkout');

    function abrirDrawer() {
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Evitar scroll
    }

    function cerrarDrawer() {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    btnOpenCart.addEventListener('click', abrirDrawer);
    btnCloseCart.addEventListener('click', cerrarDrawer);
    cartOverlay.addEventListener('click', cerrarDrawer);
    btnStartShopping.addEventListener('click', cerrarDrawer);

    // Tecla Escape para cerrar
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartDrawer.classList.contains('open')) {
            cerrarDrawer();
        }
    });

    // Vaciar carrito
    btnClearCart.addEventListener('click', () => {
        if (AppState.carrito.length === 0) return;
        AppState.carrito = [];
        guardarCarrito();
        actualizarVistaCarrito();
        mostrarToast('La cestica ha sido vaciada 🧹');
    });

    // Aplicar cupón de descuento
    btnApplyCoupon.addEventListener('click', () => {
        const codigo = couponInput.value.trim().toUpperCase();
        const msgEl = document.getElementById('coupon-message');

        if (codigo === 'CHAMO10' || codigo === 'JOENDRI') {
            AppState.descuentoPorcentaje = 0.10; // 10%
            AppState.cuponActivo = codigo;
            msgEl.className = 'coupon-msg success';
            msgEl.textContent = '¡Cupón activado! 10% de descuento aplicado 🎉';
            actualizarVistaCarrito();
            mostrarToast('¡10% de Descuento aplicado! 🏷️');
        } else {
            msgEl.className = 'coupon-msg error';
            msgEl.textContent = 'Código no válido. Prueba con CHAMO10';
        }
    });

    // Finalizar pedido
    btnCheckout.addEventListener('click', () => {
        if (AppState.carrito.length === 0) {
            mostrarToast('Tu cestica está vacía, agrega productos primero ⚠️');
            return;
        }
        cerrarDrawer();
        abrirModalRecibo();
    });
}

// Función global accesible desde el onclick de las tarjetas
window.agregarAlCarrito = function(idProducto) {
    const producto = AppState.productos.find(p => p.id === idProducto);
    if (!producto) return;

    const itemEnCarrito = AppState.carrito.find(item => item.id === idProducto);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad += 1;
    } else {
        AppState.carrito.push({
            id: producto.id,
            name: producto.name,
            price: producto.price,
            icon: producto.icon,
            cantidad: 1
        });
    }

    guardarCarrito();
    actualizarVistaCarrito();
    animarBadgeCarrito();
    mostrarToast(`¡${producto.name} agregado a la cestica! 🛒`);
};

window.cambiarCantidadItem = function(idProducto, delta) {
    const item = AppState.carrito.find(i => i.id === idProducto);
    if (!item) return;

    item.cantidad += delta;

    if (item.cantidad <= 0) {
        AppState.carrito = AppState.carrito.filter(i => i.id !== idProducto);
        mostrarToast('Producto quitado de la cestica');
    }

    guardarCarrito();
    actualizarVistaCarrito();
};

window.eliminarItemCarrito = function(idProducto) {
    AppState.carrito = AppState.carrito.filter(i => i.id !== idProducto);
    guardarCarrito();
    actualizarVistaCarrito();
    mostrarToast('Producto eliminado');
};

function animarBadgeCarrito() {
    const badge = document.getElementById('cart-counter');
    badge.classList.remove('bump');
    void badge.offsetWidth; // Forzar reflow para reiniciar animación
    badge.classList.add('bump');
}

function actualizarVistaCarrito() {
    const container = document.getElementById('cart-items-container');
    const emptyState = document.getElementById('cart-empty-state');
    const footer = document.getElementById('cart-footer');
    const counter = document.getElementById('cart-counter');

    // Totales de unidades
    const totalUnidades = AppState.carrito.reduce((acc, item) => acc + item.cantidad, 0);
    counter.textContent = totalUnidades;

    actualizarContadoresGenerales();

    if (AppState.carrito.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        footer.style.opacity = '0.4';
        footer.style.pointerEvents = 'none';
        limpiarResumenFinanciero();
        return;
    }

    emptyState.style.display = 'none';
    footer.style.opacity = '1';
    footer.style.pointerEvents = 'auto';

    // Renderizar items
    container.innerHTML = AppState.carrito.map(item => `
        <div class="cart-item">
            <div class="item-icon">${item.icon || '📦'}</div>
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-price">$${(item.price * item.cantidad).toFixed(2)} ($${item.price.toFixed(2)} c/u)</div>
            </div>
            <div class="item-quantity-controls">
                <button class="btn-qty" onclick="cambiarCantidadItem(${item.id}, -1)" title="Restar uno">-</button>
                <span class="item-qty-number">${item.cantidad}</span>
                <button class="btn-qty" onclick="cambiarCantidadItem(${item.id}, 1)" title="Sumar uno">+</button>
            </div>
            <button class="btn-remove-item" onclick="eliminarItemCarrito(${item.id})" title="Eliminar de la cestica">🗑️</button>
        </div>
    `).join('');

    // Calcular cálculos financieros
    calcularTotales();
}

function calcularTotales() {
    const subtotal = AppState.carrito.reduce((sum, item) => sum + (item.price * item.cantidad), 0);
    const montoDescuento = subtotal * AppState.descuentoPorcentaje;
    const baseImponible = subtotal - montoDescuento;
    const impuesto = baseImponible * 0.16; // 16% IVA
    const total = baseImponible + impuesto;

    // Actualizar UI del drawer
    document.getElementById('summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;

    const rowDiscount = document.getElementById('row-discount');
    const summaryDiscount = document.getElementById('summary-discount');
    if (AppState.descuentoPorcentaje > 0) {
        rowDiscount.style.display = 'flex';
        summaryDiscount.textContent = `-$${montoDescuento.toFixed(2)}`;
    } else {
        rowDiscount.style.display = 'none';
    }

    document.getElementById('summary-tax').textContent = `$${impuesto.toFixed(2)}`;
    document.getElementById('summary-total').textContent = `$${total.toFixed(2)}`;

    return { subtotal, montoDescuento, impuesto, total };
}

function limpiarResumenFinanciero() {
    document.getElementById('summary-subtotal').textContent = '$0.00';
    document.getElementById('row-discount').style.display = 'none';
    document.getElementById('summary-tax').textContent = '$0.00';
    document.getElementById('summary-total').textContent = '$0.00';
}

function actualizarContadoresGenerales() {
    const totalCatalog = document.getElementById('total-catalog-count');
    const totalCartStat = document.getElementById('total-cart-items-stat');

    if (totalCatalog) totalCatalog.textContent = AppState.productos.length;
    if (totalCartStat) {
        const total = AppState.carrito.reduce((acc, i) => acc + i.cantidad, 0);
        totalCartStat.textContent = total;
    }
}

/* ==========================================================================
   6. CREACIÓN DE PRODUCTOS PERSONALIZADOS (HOMENAJE A PYTHON)
   ========================================================================== */
function inicializarFormularioPersonalizado() {
    const form = document.getElementById('custom-product-form');
    const nameInput = document.getElementById('custom-name');
    const priceInput = document.getElementById('custom-price');
    const categorySelect = document.getElementById('custom-category');
    const iconSelect = document.getElementById('custom-icon');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = nameInput.value.trim();
        const precio = parseFloat(priceInput.value);

        if (!nombre || isNaN(precio) || precio <= 0) {
            mostrarToast('Por favor escribe un nombre y precio válido ⚠️');
            return;
        }

        const nuevo = {
            id: Date.now(),
            name: nombre,
            price: precio,
            category: categorySelect.value,
            icon: iconSelect.value,
            desc: `Producto agregado por el usuario en honor a Joendri Albarran.`
        };

        // Agregar al catálogo y guardar
        AppState.productos.unshift(nuevo);
        guardarProductosPersonalizados(nuevo);

        // Resetear form
        form.reset();

        // Actualizar catálogo visual
        renderizarProductos();
        actualizarContadoresGenerales();

        mostrarToast(`¡"${nombre}" fue añadido al catálogo de la tienda! 🌟`);

        // Desplazarse suavemente al catálogo
        document.getElementById('catalog-grid').scrollIntoView({ behavior: 'smooth' });
    });
}

/* ==========================================================================
   7. MODAL DE RECIBO / FACTURA DE COMPRA
   ========================================================================== */
function inicializarModalRecibo() {
    const backdrop = document.getElementById('receipt-modal-backdrop');
    const btnClose = document.getElementById('btn-close-receipt');
    const btnPrint = document.getElementById('btn-print-receipt');

    btnClose.addEventListener('click', () => {
        backdrop.classList.remove('open');
    });

    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
            backdrop.classList.remove('open');
        }
    });

    btnPrint.addEventListener('click', () => {
        window.print();
    });
}

function abrirModalRecibo() {
    const backdrop = document.getElementById('receipt-modal-backdrop');
    const orderIdEl = document.getElementById('receipt-order-id');
    const dateEl = document.getElementById('receipt-date');
    const itemsList = document.getElementById('receipt-items-list');

    // Totales calculados
    const { subtotal, montoDescuento, impuesto, total } = calcularTotales();

    // Generar Número de Orden y Fecha
    const randomOrder = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    orderIdEl.textContent = `#${randomOrder}`;

    const hoy = new Date();
    dateEl.textContent = hoy.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Inyectar items comprados
    itemsList.innerHTML = AppState.carrito.map(item => `
        <div class="receipt-item-row">
            <span>${item.name}</span>
            <span>${item.cantidad}</span>
            <span>$${item.price.toFixed(2)}</span>
            <span>$${(item.price * item.cantidad).toFixed(2)}</span>
        </div>
    `).join('');

    // Totales en el recibo
    document.getElementById('receipt-subtotal').textContent = `$${subtotal.toFixed(2)}`;

    const discountRow = document.getElementById('receipt-discount-row');
    if (montoDescuento > 0) {
        discountRow.style.display = 'flex';
        document.getElementById('receipt-discount').textContent = `-$${montoDescuento.toFixed(2)}`;
    } else {
        discountRow.style.display = 'none';
    }

    document.getElementById('receipt-tax').textContent = `$${impuesto.toFixed(2)}`;
    document.getElementById('receipt-grand-total').textContent = `$${total.toFixed(2)}`;

    // Vaciar carrito después de pagar exitosamente
    AppState.carrito = [];
    guardarCarrito();
    actualizarVistaCarrito();

    // Abrir modal
    backdrop.classList.add('open');
    mostrarToast('¡Pedido completado con éxito! 🎉');
}

/* ==========================================================================
   8. UTILIDAD TOAST FLOTANTE
   ========================================================================== */
let toastTimeout;
function mostrarToast(mensaje) {
    const toast = document.getElementById('toast');
    const msgEl = document.getElementById('toast-msg');

    if (!toast || !msgEl) return;

    msgEl.textContent = mensaje;
    toast.classList.add('active');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('active');
    }, 3200);
}
