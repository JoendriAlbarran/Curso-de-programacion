/**
 * ==========================================================================
 * EL FARO GLOBAL - PORTAL DE NOTICIAS & CRÓNICA CONTEMPORÁNEA
 * Dirección Editorial: Joendri Albarran
 * Lógica Interactiva, DOM, Filtros, Lector con Síntesis de Voz y Persistencia
 * ==========================================================================
 */

// Base de Datos Editorial de Artículos y Reportajes de El Faro Global
const ARTICLES_DATABASE = [
    {
        id: "art-1",
        isLead: true,
        category: "ciencia",
        categoryLabel: "Ciencia y Cosmos",
        badge: "Reportaje de Portada",
        title: "El telescopio James Webb detecta atmósferas con vapor de agua en el sistema estelar Trappist-1",
        excerpt: "Nuevas observaciones espectroscópicas confirman la presencia de moléculas acuosas y dióxido de carbono en dos de los exoplanetas situados en la zona habitable, marcando el mayor hito astrofísico de la década.",
        author: "Joendri Albarran",
        authorRole: "Director & Crónica Científica",
        date: "19 Oct 2026",
        readTime: "6 min lectura",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        caption: "Recreación espectral de atmósferas exoplanetarias mediante telescopios orbitales de infrarrojo profundo.",
        views: "34.8k",
        reactions: { love: 342, insight: 215, applause: 418 },
        content: `
            <p class="lead-paragraph">El cosmos parece un poco menos solitario tras los datos remitidos esta madrugada por los observatorios astronómicos internacionales en colaboración con el programa editorial de El Faro Global.</p>
            <p>Tras dieciocho meses de monitoreo ininterrumpido sobre el sistema estelar Trappist-1 —ubicado a unos 40 años luz en dirección a la constelación de Acuario—, el telescopio espacial James Webb ha confirmado con un nivel de confianza estadística del 99.8% la presencia constante de vapor de agua y compuestos carbonatados en las atmósferas de los exoplanetas Trappist-1e y Trappist-1f.</p>
            <blockquote>«No estamos afirmando que hayamos encontrado civilizaciones, pero sí que las condiciones químicas fundamentales para la biología tal y como la concebimos están presentes en mundos rocosos fuera de nuestro sistema solar.»</blockquote>
            <p>El estudio, dirigido por consorcios astrobiológicos globales y analizado a fondo en nuestros cuadernos de investigación, revela que estas atmósferas cuentan además con una densidad suficiente para evitar la evaporación de agua líquida en superficie, protegidas por una magnetosfera local más vigorosa de lo que preveían los modelos teóricos.</p>
            <p>Durante las próximas semanas, la comunidad científica dirigirá nuevos barridos espectrográficos para rastrear biofirmas secundarias, como metano y ozono. Este hallazgo redefine las prioridades de la exploración interplanetaria y coloca al siglo XXI en el umbral de responder a la pregunta más antigua de la filosofía: ¿estamos solos en el universo?</p>
        `,
        comments: [
            { author: "Dra. Elena Valenzuela", date: "Hace 3 horas", text: "Un informe impecable. Las lecturas de densidad atmosférica en Trappist-1e coinciden plenamente con los modelos que publicamos en el observatorio austral." },
            { author: "Carlos Mendoza", date: "Hace 1 hora", text: "Excelente redacción de Joendri Albarran. Hacía falta divulgación seria sin caer en el sensacionalismo barato." }
        ]
    },
    {
        id: "art-2",
        isLeadSub: true,
        category: "planeta",
        categoryLabel: "Planeta y Naturaleza",
        badge: "Medio Ambiente",
        title: "El renacer de los bosques de niebla: 20 años de restauración biológica logran revertir el retroceso andino",
        excerpt: "Corredores biológicos que conectan desde Venezuela hasta Bolivia registran el retorno histórico del oso de anteojos y el quetzal crestado.",
        author: "Redacción Planeta",
        authorRole: "Corresponsalía Ambiental",
        date: "19 Oct 2026",
        readTime: "5 min lectura",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
        caption: "Bruma sobre las copas de los robles centenarios en las reservas de montaña.",
        views: "21.4k",
        reactions: { love: 189, insight: 94, applause: 260 },
        content: `
            <p class="lead-paragraph">En las laderas empinadas donde la condensación de las nubes crea verdaderos ríos aéreos, la vida ha vuelto a ganar una batalla que muchos daban por perdida a comienzos de siglo.</p>
            <p>Un exhaustivo censo satelital y de campo coordinado por comunidades locales y biólogos de campo ha constatado que más de 450.000 hectáreas de bosque nublado han recuperado su dosel original. Este triunfo ecológico es fruto de una estrategia de corredores biológicos continuos que impiden la fragmentación de hábitats.</p>
            <blockquote>«Cuando dejas que el bosque respire y le devuelves sus raíces, la naturaleza demuestra una resiliencia milagrosa.»</blockquote>
            <p>El regreso de especies paraguas, como el oso andino (Tremarctos ornatus) y diversas especies de anfibios que se creían extintas, demuestra que los programas de restauración comunitaria son infinitamente más efectivos que las meras declaraciones en cumbres internacionales.</p>
        `,
        comments: [
            { author: "Marina Soublette", date: "Hace 4 horas", text: "Noticias como esta devuelven la esperanza. El compromiso de las comunidades rurales es la verdadera clave." }
        ]
    },
    {
        id: "art-3",
        isLeadSub: true,
        category: "expediciones",
        categoryLabel: "Grandes Expediciones",
        badge: "Arqueología",
        title: "Arqueólogos descubren una metrópoli subterránea de ocho niveles en los cañones de Capadocia",
        excerpt: "Túneles de ventilación milimétricos, graneros comunales y acueductos tallados en roca volcánica revelan una sociedad organizada de más de 3.000 años.",
        author: "Joendri Albarran",
        authorRole: "Director Editorial",
        date: "18 Oct 2026",
        readTime: "7 min lectura",
        image: "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=800&q=80",
        caption: "Estructuras pétreas talladas en las formaciones volcánicas de Anatolia Central.",
        views: "29.1k",
        reactions: { love: 275, insight: 198, applause: 312 },
        content: `
            <p class="lead-paragraph">Bajo el suelo agrietado de Anatolia, el eco de los picos de bronce y basalto todavía parece resonar en las profundidades de un complejo urbano sin precedentes.</p>
            <p>Equipos de georradar han cartografiado un entramado subterráneo capaz de albergar con holgura a más de 25.000 personas de forma autónoma durante meses. El complejo cuenta con prensas de aceite, establos protegidos, pozos de agua dulce conectados a corrientes freáticas y un ingenioso sistema de puertas pétreas circulares de casi dos toneladas diseñadas para bloquear accesos hostiles desde el interior.</p>
            <blockquote>«No se trataba de un mero refugio de emergencia; era una civilización floreciente que eligió la frescura y la invulnerabilidad de la tierra frente a los conflictos de superficie.»</blockquote>
            <p>Los investigadores han iniciado los trabajos de conservación para garantizar que los frescos y marcas epigráficas permanezcan intactos frente al turismo desmedido, mientras se preparan expediciones a los niveles noveno y décimo aún sin desescombrar.</p>
        `,
        comments: [
            { author: "Felipe Arrieta", date: "Ayer", text: "Fascinante descubrimiento arqueológico. La ingeniería antigua sigue superando nuestra imaginación." }
        ]
    },
    {
        id: "art-4",
        category: "cultura",
        categoryLabel: "Cultura y Sociedad",
        badge: "Patrimonio",
        title: "El milagro de las tintas medievales: manuscritos olvidados en un monasterio alpino revelan tratados inéditos de medicina",
        excerpt: "Textos en pergamino del siglo XII detallan el uso de líquenes y hongos alpinos con propiedades antisépticas muy adelantadas a su tiempo.",
        author: "Beatriz Morales",
        authorRole: "Sección de Humanidades",
        date: "18 Oct 2026",
        readTime: "4 min lectura",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
        caption: "Manuscritos con caligrafía gótica y anotaciones marginales en el scriptorium.",
        views: "18.3k",
        reactions: { love: 145, insight: 112, applause: 190 },
        content: `
            <p class="lead-paragraph">En una sala tapiada del convento de San Galo, en lo alto del macizo alpino, un baúl de roble protegido por cera de abejas guardaba el eslabón perdido entre la botánica monástica y la farmacología moderna.</p>
            <p>El hallazgo comprende tres volúmenes encuadernados en piel de ternera con más de cuatrocientas ilustraciones botánicas en pigmentos de lapislázuli y bermellón. Lo más asombroso para los historiadores de la medicina no es solo la belleza de los trazos, sino la precisión con la que se describen fórmulas de extracción hidroalcohólica a base de líquenes para tratar infecciones de heridas.</p>
            <p>El equipo de lingüistas y bioquímicos trabaja conjuntamente para verificar si los principios activos descritos en los textos pueden aportar alternativas frente a la resistencia bacteriana moderna, demostrando una vez más que la historia no es un catálogo de polvo, sino una fuente viva de inspiración.</p>
        `,
        comments: []
    },
    {
        id: "art-5",
        category: "futuro",
        categoryLabel: "Innovación y Futuro",
        badge: "Urbanismo",
        title: "Ciudades Esponja: La arquitectura viva que salva a las capitales globales de inundaciones extremas",
        excerpt: "De Copenhague a Singapur, parques inundables y pavimentos porosos transforman las tormentas torrenciales en reservas hídricas subterráneas.",
        author: "Joendri Albarran",
        authorRole: "Director Editorial",
        date: "17 Oct 2026",
        readTime: "5 min lectura",
        image: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80",
        caption: "Urbanismo bioclimático con azoteas verdes y canales de absorción rápida.",
        views: "25.7k",
        reactions: { love: 210, insight: 180, applause: 295 },
        content: `
            <p class="lead-paragraph">El viejo axioma de la ingeniería urbana consistía en expulsar el agua de lluvia lo más rápido posible a través de tuberías de hormigón. Hoy, las urbes del futuro hacen exactamente lo opuesto: abrazan el agua y la invitan a quedarse.</p>
            <p>El concepto de «ciudad esponja» ha dejado de ser un manifiesto utópico para convertirse en una necesidad civilizatoria. Espacios públicos diseñados con múltiples desniveles actúan como anfiteatros o pistas de patinaje durante los días soleados, y se transforman de forma segura en lagunas de retención durante precipitaciones torrenciales, evitando el colapso de barrios enteros.</p>
            <blockquote>«No podemos luchar contra la física del clima; debemos diseñar la ciudad como un organismo que absorba, filtre y nutra sus propios acuíferos.»</blockquote>
            <p>Las mediciones indican que estas urbes reducen el efecto de isla de calor hasta en 4 grados centígrados, creando microclimas templados y reduciendo drásticamente la factura energética municipal.</p>
        `,
        comments: [
            { author: "Arquitecto Jorge Lira", date: "Hace 2 días", text: "Es la tendencia que debe adoptarse con urgencia en todas las metrópolis de América Latina." }
        ]
    },
    {
        id: "art-6",
        category: "planeta",
        categoryLabel: "Planeta y Naturaleza",
        badge: "Océanos",
        title: "La sinfonía de las ballenas jorobadas: descubren dialectos acústicos que se transmiten entre océanos",
        excerpt: "Grabaciones submarinas en los polos revelan que las canciones de apareamiento viajan miles de kilómetros y son adoptadas por manadas vecinas en un fenómeno de cultura marina.",
        author: "Gabriel Rivas",
        authorRole: "Divulgación Marina",
        date: "17 Oct 2026",
        readTime: "4 min lectura",
        image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=800&q=80",
        caption: "Ballena jorobada emergiendo en las aguas frías del océano Pacífico.",
        views: "22.0k",
        reactions: { love: 310, insight: 130, applause: 270 },
        content: `
            <p class="lead-paragraph">En el silencio azul del océano profundo, los cetáceos no solo se comunican para sobrevivir: comparten canciones que evolucionan como auténticas modas musicales a través de hemisferios enteros.</p>
            <p>Un equipo de bioacústicos instaló hidrófonos en puntos estratégicos a lo largo de las rutas migratorias marinas. El análisis espectral por computadora demostró que una melodía originada en el archipiélago de Hawái tardó apenas dieciséis meses en ser adoptada, con sutiles variaciones corales, por manadas en las costas de Australia y la Patagonia.</p>
            <p>Este hallazgo fortalece el consenso científico de que los grandes mamíferos marinos poseen tradiciones culturales orales complejas, reafirmando la imperiosa necesidad de declarar santuarios libres de ruido industrial naviero en los corredores migratorios del planeta.</p>
        `,
        comments: []
    },
    {
        id: "art-7",
        category: "cultura",
        categoryLabel: "Cultura y Sociedad",
        badge: "Literatura",
        title: "El renacer de las librerías independientes: los jóvenes vuelven al papel en busca de desconexión",
        excerpt: "Frente a la fatiga visual de las pantallas, una generación criada en redes sociales redescubre el placer táctil de los libros impresos y los cafés de lectura comunitaria.",
        author: "Joendri Albarran",
        authorRole: "Director Editorial",
        date: "16 Oct 2026",
        readTime: "5 min lectura",
        image: "https://images.unsplash.com/photo-1507842229452-9642e88a0e89?auto=format&fit=crop&w=800&q=80",
        caption: "Estanterías de madera maciza y lectores en una librería tradicional de barrio.",
        views: "31.4k",
        reactions: { love: 412, insight: 185, applause: 350 },
        content: `
            <p class="lead-paragraph">Hubo un tiempo en que los analistas vaticinaban la extinción de los anaqueles de madera bajo el avance implacable de los formatos digitales y las suscripciones infinitas. La realidad, afortunadamente, ha resultado ser mucho más poética.</p>
            <p>En las principales capitales culturales se multiplican las pequeñas librerías con talleres literarios, clubes de debate y cafés donde los teléfonos inteligentes quedan en un discreto segundo plano. Los datos de venta confirman que el 68% de las compras de novelas y ensayos físicos son realizadas por lectores menores de treinta años.</p>
            <blockquote>«No leemos en papel por nostalgia de una época que no vivimos; leemos en papel porque el libro físico respeta nuestro tiempo y no nos interrumpe con notificaciones.»</blockquote>
            <p>La lectura vuelve a ser lo que siempre fue: un refugio de intimidad, concentración y encuentro humano imprescindible en tiempos vertiginosos.</p>
        `,
        comments: [
            { author: "Sofía Restrepo", date: "Hace 3 días", text: "¡Totalmente de acuerdo con Joendri! No hay nada como el aroma del papel y la concentración sin alertas." }
        ]
    },
    {
        id: "art-8",
        category: "expediciones",
        categoryLabel: "Grandes Expediciones",
        badge: "Polo Sur",
        title: "Expedición Transantártica limpia: completan la travesía polar sin huella de carbono utilizando trineos de cometa eólica",
        excerpt: "Tres exploradores recorren 2.800 kilómetros sobre el hielo blanco impulsados exclusivamente por el viento antártico y paneles solares ultraligeros.",
        author: "Marco Aurelio Soto",
        authorRole: "Corresponsal Polar",
        date: "15 Oct 2026",
        readTime: "6 min lectura",
        image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
        caption: "Inmensidad del desierto blanco polar y trineos aerodinámicos.",
        views: "19.8k",
        reactions: { love: 165, insight: 142, applause: 230 },
        content: `
            <p class="lead-paragraph">El viento polar antártico, temido por las primeras expediciones de Shackleton y Scott por su furia helada, ha sido esta vez el aliado supremo de una nueva era de aventura ecológica.</p>
            <p>El equipo partió de la base de la plataforma de hielo Ronne con el objetivo de cruzar la meseta antártica sin consumir un solo litro de combustible fósil ni generar residuos en el continente blanco. Empleando cometas gigantescas de fibra de carbono que aprovechan los vientos catabáticos a gran altitud, los expedicionarios alcanzaron velocidades de crucero de hasta 50 km/h sobre esquíes.</p>
            <p>Durante la travesía, recogieron muestras de nieve superficial para analizar la presencia de microplásticos aerotransportados, concluyendo que incluso los puntos más remotos del planeta requieren una vigilancia ambiental estricta.</p>
        `,
        comments: []
    }
];

// Noticias de Última Hora para el Cintillo Superior (Ticker)
const BREAKING_NEWS = [
    { text: "Astrofísicos confirman moléculas acuosas en el sistema Trappist-1 con el telescopio Webb", articleId: "art-1" },
    { text: "Expedición arqueológica documenta 8 niveles de galerías subterráneas en Capadocia", articleId: "art-3" },
    { text: "Bosques de niebla andinos recuperan 450.000 hectáreas gracias a corredores biológicos", articleId: "art-2" },
    { text: "Copenhague y Singapur lideran la transformación hacia 'ciudades esponja' antinundaciones", articleId: "art-5" },
    { text: "Joendri Albarran publica su manifiesto editorial: «El regreso a las noticias que perduran»", articleId: "opinion" }
];

// Datos Simulados del Tiempo Meteorológico
const WEATHER_DATA = {
    "Caracas": { temp: "27°C", icon: "🌤️", desc: "Parcialmente nublado" },
    "Madrid": { temp: "21°C", icon: "☀️", desc: "Despejado y templado" },
    "Buenos Aires": { temp: "19°C", icon: "💨", desc: "Viento fresco del sur" },
    "Bogotá": { temp: "16°C", icon: "🌦️", desc: "Llovizna matinal" },
    "Ciudad de México": { temp: "22°C", icon: "🌤️", desc: "Clima templado" },
    "Tokio": { temp: "18°C", icon: "🌙", desc: "Noche serena" }
};

// ==========================================================================
// ESTADO GLOBAL DE LA APLICACIÓN
// ==========================================================================
const AppState = {
    currentCategory: "all",
    searchQuery: "",
    savedArticleIds: new Set(),
    userReactions: {}, // { [artId]: { love: bool, insight: bool, applause: bool } }
    activeModalArticleId: null,
    currentFontSizeDelta: 0,
    breakingIndex: 0,
    breakingInterval: null,
    isBreakingPaused: false,
    isSpeaking: false,
    isPodcastPlaying: false
};

// ==========================================================================
// INICIALIZACIÓN AL CARGAR EL DOM
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initClockAndDate();
    initWeatherWidget();
    initBreakingTicker();
    loadSavedArticlesFromStorage();
    loadUserReactionsFromStorage();
    renderLeadSection();
    renderArticlesGrid();
    renderTrendingSidebar();
    setupEventListeners();
});

// ==========================================================================
// 1. SISTEMA DE TEMAS (DARK / LIGHT MODE)
// ==========================================================================
function initTheme() {
    const savedTheme = localStorage.getItem("faro_theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeToggleUI(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("faro_theme", nextTheme);
    updateThemeToggleUI(nextTheme);
    showToast(`Modo ${nextTheme === "dark" ? "Oscuro" : "Claro"} activado`, "info");
}

function updateThemeToggleUI(theme) {
    const icon = document.getElementById("theme-icon");
    const text = document.getElementById("theme-text");
    if (!icon || !text) return;

    if (theme === "dark") {
        icon.textContent = "🌙";
        text.textContent = "Modo Oscuro";
    } else {
        icon.textContent = "☀️";
        text.textContent = "Modo Claro";
    }
}

// ==========================================================================
// 2. RELOJ Y FECHA EN TIEMPO REAL
// ==========================================================================
function initClockAndDate() {
    const dateEl = document.getElementById("current-date");
    if (!dateEl) return;

    function update() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const dateStr = now.toLocaleDateString('es-ES', options);
        // Capitalizar primera letra
        const formattedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
        
        // Formato con hora
        const timeStr = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        dateEl.textContent = `${formattedDate} | ${timeStr}`;
    }

    update();
    setInterval(update, 1000);
}

// ==========================================================================
// 3. WIDGET DE CLIMA
// ==========================================================================
function initWeatherWidget() {
    const selector = document.getElementById("city-selector");
    const iconEl = document.getElementById("weather-icon");
    const tempEl = document.getElementById("weather-temp");

    function applyWeather(city) {
        const data = WEATHER_DATA[city] || WEATHER_DATA["Caracas"];
        if (iconEl) iconEl.textContent = data.icon;
        if (tempEl) {
            tempEl.textContent = data.temp;
            tempEl.title = `${city}: ${data.desc}`;
        }
    }

    if (selector) {
        selector.addEventListener("change", (e) => {
            applyWeather(e.target.value);
            showToast(`Meteorología actualizada: ${e.target.value}`, "info");
        });
        applyWeather(selector.value);
    }
}

// ==========================================================================
// 4. CINTILLO DE ÚLTIMA HORA (BREAKING NEWS TICKER)
// ==========================================================================
function initBreakingTicker() {
    const textEl = document.getElementById("breaking-text");
    const btnPrev = document.getElementById("btn-prev-breaking");
    const btnNext = document.getElementById("btn-next-breaking");
    const btnPause = document.getElementById("btn-pause-breaking");

    function showBreaking(index) {
        if (!textEl || BREAKING_NEWS.length === 0) return;
        AppState.breakingIndex = (index + BREAKING_NEWS.length) % BREAKING_NEWS.length;
        const item = BREAKING_NEWS[AppState.breakingIndex];
        
        textEl.style.opacity = '0';
        setTimeout(() => {
            textEl.textContent = item.text;
            textEl.dataset.articleId = item.articleId;
            textEl.style.opacity = '1';
        }, 150);
    }

    function startTicker() {
        if (AppState.breakingInterval) clearInterval(AppState.breakingInterval);
        AppState.breakingInterval = setInterval(() => {
            if (!AppState.isBreakingPaused) {
                showBreaking(AppState.breakingIndex + 1);
            }
        }, 5500);
    }

    if (btnNext) {
        btnNext.addEventListener("click", () => {
            showBreaking(AppState.breakingIndex + 1);
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener("click", () => {
            showBreaking(AppState.breakingIndex - 1);
        });
    }

    if (btnPause) {
        btnPause.addEventListener("click", () => {
            AppState.isBreakingPaused = !AppState.isBreakingPaused;
            btnPause.textContent = AppState.isBreakingPaused ? "▶" : "⏸";
            btnPause.title = AppState.isBreakingPaused ? "Reanudar" : "Pausar";
        });
    }

    if (textEl) {
        textEl.addEventListener("click", () => {
            const artId = textEl.dataset.articleId;
            if (artId === "opinion") {
                openOpinionModal();
            } else if (artId) {
                openArticleModal(artId);
            }
        });
    }

    showBreaking(0);
    startTicker();
}

// ==========================================================================
// 5. RENDERIZADO DE LA PORTADA HERO (Lead Article & Substories)
// ==========================================================================
function renderLeadSection() {
    const leadSlot = document.getElementById("hero-article-slot");
    const subSlot = document.getElementById("hero-substories-slot");
    if (!leadSlot || !subSlot) return;

    const leadArticle = ARTICLES_DATABASE.find(a => a.isLead) || ARTICLES_DATABASE[0];
    const subArticles = ARTICLES_DATABASE.filter(a => a.isLeadSub).slice(0, 2);

    const isSaved = AppState.savedArticleIds.has(leadArticle.id);

    // Inyectar Portada Principal
    leadSlot.innerHTML = `
        <div class="lead-media-wrapper">
            <img src="${leadArticle.image}" alt="${leadArticle.title}" loading="lazy">
            <div class="lead-overlay-badges">
                <span class="badge badge-primary">${leadArticle.categoryLabel}</span>
                <span class="badge badge-gold">${leadArticle.badge}</span>
            </div>
            <button class="lead-btn-bookmark ${isSaved ? 'active' : ''}" 
                    data-id="${leadArticle.id}" 
                    title="${isSaved ? 'Quitar de guardados' : 'Guardar para leer después'}">
                ${isSaved ? '★' : '🔖'}
            </button>
        </div>
        <div class="lead-content">
            <div class="lead-meta">
                <span>🗓️ ${leadArticle.date}</span>
                <span>•</span>
                <span>⏱️ ${leadArticle.readTime}</span>
                <span>•</span>
                <span>👁️ ${leadArticle.views} lecturas</span>
            </div>
            <h2 class="lead-title" data-id="${leadArticle.id}">${leadArticle.title}</h2>
            <p class="lead-excerpt">${leadArticle.excerpt}</p>
            <div class="lead-footer">
                <div class="author-chip">
                    <div class="author-avatar-mini">JA</div>
                    <div>
                        <span class="author-name-text">Por ${leadArticle.author}</span>
                    </div>
                </div>
                <button class="btn-read-lead" data-id="${leadArticle.id}">Leer Crónica Completa →</button>
            </div>
        </div>
    `;

    // Inyectar Subhistorias
    subSlot.innerHTML = subArticles.map(sub => {
        const isSubSaved = AppState.savedArticleIds.has(sub.id);
        return `
            <article class="substory-card">
                <div class="substory-media">
                    <img src="${sub.image}" alt="${sub.title}" loading="lazy">
                </div>
                <span class="substory-category">${sub.categoryLabel}</span>
                <h3 class="substory-title" data-id="${sub.id}">${sub.title}</h3>
                <div class="substory-meta">
                    <span>${sub.readTime}</span>
                    <button class="btn-card-read" data-id="${sub.id}">Leer historia →</button>
                </div>
            </article>
        `;
    }).join("");
}

// ==========================================================================
// 6. RENDERIZADO DE LA REJILLA DE NOTICIAS CON FILTROS Y BÚSQUEDA
// ==========================================================================
function renderArticlesGrid() {
    const gridEl = document.getElementById("articles-grid");
    const countEl = document.getElementById("articles-count");
    const noResultsEl = document.getElementById("no-results");
    const categoryTitleEl = document.getElementById("section-category-name");
    if (!gridEl) return;

    // Filtrar por categoría y búsqueda
    let filtered = ARTICLES_DATABASE.filter(art => {
        // Excluir de la lista secundaria si ya está como noticia principal de portada y no hay búsqueda activa
        const matchesCategory = (AppState.currentCategory === "all") || (art.category === AppState.currentCategory);
        
        let matchesSearch = true;
        if (AppState.searchQuery.trim() !== "") {
            const q = AppState.searchQuery.toLowerCase();
            matchesSearch = art.title.toLowerCase().includes(q) ||
                            art.excerpt.toLowerCase().includes(q) ||
                            art.author.toLowerCase().includes(q) ||
                            art.categoryLabel.toLowerCase().includes(q);
        }
        return matchesCategory && matchesSearch;
    });

    // Actualizar Título de la sección
    if (categoryTitleEl) {
        if (AppState.searchQuery.trim() !== "") {
            categoryTitleEl.textContent = `Resultados para «${AppState.searchQuery}»`;
        } else if (AppState.currentCategory === "all") {
            categoryTitleEl.textContent = "Crónicas y Reportajes del Día";
        } else {
            const catMap = {
                "ciencia": "Ciencia y Exploración del Cosmos",
                "planeta": "Planeta, Clima y Biodiversidad",
                "cultura": "Cultura, Historia y Pensamiento",
                "futuro": "Innovación, Ciudades y Futuro",
                "expediciones": "Grandes Rutas y Expediciones"
            };
            categoryTitleEl.textContent = catMap[AppState.currentCategory] || "Artículos de la Sección";
        }
    }

    if (countEl) {
        countEl.textContent = `${filtered.length} artículo${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
        gridEl.innerHTML = "";
        if (noResultsEl) noResultsEl.style.display = "block";
        return;
    }

    if (noResultsEl) noResultsEl.style.display = "none";

    gridEl.innerHTML = filtered.map(art => {
        const isSaved = AppState.savedArticleIds.has(art.id);
        return `
            <article class="news-card">
                <div class="card-media">
                    <img src="${art.image}" alt="${art.title}" loading="lazy">
                    <span class="card-badge">${art.categoryLabel}</span>
                    <button class="btn-card-bookmark ${isSaved ? 'active' : ''}" 
                            data-id="${art.id}" 
                            title="${isSaved ? 'Quitar de guardados' : 'Guardar artículo'}">
                        ${isSaved ? '★' : '🔖'}
                    </button>
                </div>
                <div class="card-body">
                    <div class="card-meta">
                        <span>🗓️ ${art.date}</span>
                        <span>•</span>
                        <span>⏱️ ${art.readTime}</span>
                    </div>
                    <h3 class="card-title" data-id="${art.id}">${art.title}</h3>
                    <p class="card-snippet">${art.excerpt}</p>
                    <div class="card-footer">
                        <span class="card-author">Por ${art.author}</span>
                        <button class="btn-card-read" data-id="${art.id}">Leer más →</button>
                    </div>
                </div>
            </article>
        `;
    }).join("");
}

// ==========================================================================
// 7. RENDERIZADO DE LA BARRA LATERAL (Lo Más Leído / Trending)
// ==========================================================================
function renderTrendingSidebar() {
    const listEl = document.getElementById("trending-list");
    if (!listEl) return;

    // Ordenar artículos con más lecturas
    const sorted = [...ARTICLES_DATABASE].sort((a, b) => {
        const viewsA = parseFloat(a.views) || 0;
        const viewsB = parseFloat(b.views) || 0;
        return viewsB - viewsA;
    }).slice(0, 5);

    listEl.innerHTML = sorted.map((art, idx) => {
        const rank = String(idx + 1).padStart(2, "0");
        return `
            <li class="trending-item" data-id="${art.id}">
                <span class="trending-number">${rank}</span>
                <div class="trending-info">
                    <h4 class="trending-title">${art.title}</h4>
                    <div class="trending-meta">
                        <span>${art.categoryLabel}</span>
                        <span>•</span>
                        <span>${art.views} lecturas</span>
                    </div>
                </div>
            </li>
        `;
    }).join("");
}

// ==========================================================================
// 8. MODAL DE LECTURA COMPLETA DE ARTÍCULO (Full Reader)
// ==========================================================================
function openArticleModal(articleId) {
    const article = ARTICLES_DATABASE.find(a => a.id === articleId);
    if (!article) return;

    AppState.activeModalArticleId = article.id;
    const modalEl = document.getElementById("article-modal");
    const contentEl = document.getElementById("modal-article-content");
    const bookmarkBtn = document.getElementById("modal-bookmark-btn");
    const bookmarkText = document.getElementById("modal-bookmark-text");
    const bookmarkIcon = document.getElementById("modal-bookmark-icon");

    if (!modalEl || !contentEl) return;

    // Configurar estado de guardado en el botón del modal
    const isSaved = AppState.savedArticleIds.has(article.id);
    if (bookmarkBtn && bookmarkText && bookmarkIcon) {
        bookmarkIcon.textContent = isSaved ? "★" : "🔖";
        bookmarkText.textContent = isSaved ? "Guardado" : "Guardar";
    }

    // Inyectar contenido completo
    contentEl.innerHTML = `
        <div class="modal-header-section">
            <span class="modal-category-badge">${article.categoryLabel}</span>
            <h1 class="modal-article-title">${article.title}</h1>
            <div class="modal-article-meta">
                <span>Por <strong>${article.author}</strong> (${article.authorRole || 'Redacción'})</span>
                <span>•</span>
                <span>Publicado el ${article.date}</span>
                <span>•</span>
                <span>${article.readTime}</span>
                <span>•</span>
                <span>${article.views} lecturas</span>
            </div>
        </div>

        <div class="modal-feature-media">
            <img src="${article.image}" alt="${article.title}">
            <p class="modal-media-caption">${article.caption || article.title}</p>
        </div>

        <div class="article-body-text" id="article-body-text">
            ${article.content}
        </div>

        <div class="author-bio-card">
            <div class="bio-avatar">JA</div>
            <div class="bio-details">
                <h5>${article.author}</h5>
                <span>Director Editorial de El Faro Global</span>
                <p>Periodista y divulgador dedicado a acercar la ciencia, la naturaleza y las grandes preguntas del mundo moderno a la ciudadanía global.</p>
            </div>
        </div>
    `;

    // Resetear tamaño de letra
    AppState.currentFontSizeDelta = 0;
    applyFontSize();

    // Actualizar contadores de reacciones
    updateReactionCounters(article);

    // Cargar comentarios
    renderArticleComments(article);

    // Mostrar modal
    modalEl.classList.add("active");
    modalEl.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Scroll al inicio del modal
    const scrollable = document.getElementById("modal-scrollable");
    if (scrollable) {
        scrollable.scrollTop = 0;
        updateProgressBar(scrollable);
    }
}

function closeArticleModal() {
    const modalEl = document.getElementById("article-modal");
    if (!modalEl) return;

    modalEl.classList.remove("active");
    modalEl.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    // Detener síntesis de voz si está activa
    stopSpeechSynthesis();
    AppState.activeModalArticleId = null;
}

// Barra de progreso de lectura dentro del modal
function updateProgressBar(scrollable) {
    const bar = document.getElementById("reading-progress-bar");
    if (!bar || !scrollable) return;

    const scrollTop = scrollable.scrollTop;
    const scrollHeight = scrollable.scrollHeight - scrollable.clientHeight;
    if (scrollHeight > 0) {
        const percent = Math.min(100, Math.round((scrollTop / scrollHeight) * 100));
        bar.style.width = percent + "%";
    } else {
        bar.style.width = "0%";
    }
}

// ==========================================================================
// 9. ACCESIBILIDAD: TAMAÑO DE FUENTE EN EL LECTOR
// ==========================================================================
function changeFontSize(delta) {
    AppState.currentFontSizeDelta = Math.max(-2, Math.min(4, AppState.currentFontSizeDelta + delta));
    applyFontSize();
}

function applyFontSize() {
    const bodyText = document.getElementById("article-body-text");
    if (!bodyText) return;

    const baseSize = 1.18; // rem base
    const newSize = baseSize + (AppState.currentFontSizeDelta * 0.12);
    bodyText.style.fontSize = `${newSize}rem`;
}

// ==========================================================================
// 10. SÍNTESIS DE VOZ (LEER ARTÍCULO EN VOZ ALTA - WEB SPEECH API)
// ==========================================================================
function toggleSpeechSynthesis() {
    if (!('speechSynthesis' in window)) {
        showToast("Tu navegador no soporta síntesis de voz en tiempo real", "info");
        return;
    }

    if (AppState.isSpeaking) {
        stopSpeechSynthesis();
        return;
    }

    const article = ARTICLES_DATABASE.find(a => a.id === AppState.activeModalArticleId);
    if (!article) return;

    // Extraer texto plano
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = article.content;
    const cleanText = `${article.title}. ${article.excerpt}. ${tempDiv.innerText.slice(0, 1000)}`;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "es-ES";
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
        AppState.isSpeaking = true;
        updateSpeechBtnUI(true);
        showToast("Reproduciendo lectura en voz alta", "info");
    };

    utterance.onend = () => {
        AppState.isSpeaking = false;
        updateSpeechBtnUI(false);
    };

    utterance.onerror = () => {
        AppState.isSpeaking = false;
        updateSpeechBtnUI(false);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
}

function stopSpeechSynthesis() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
    AppState.isSpeaking = false;
    updateSpeechBtnUI(false);
}

function updateSpeechBtnUI(speaking) {
    const icon = document.getElementById("speech-icon");
    const text = document.getElementById("speech-text");
    if (!icon || !text) return;

    if (speaking) {
        icon.textContent = "⏹";
        text.textContent = "Detener Audio";
    } else {
        icon.textContent = "🔊";
        text.textContent = "Escuchar Artículo";
    }
}

// ==========================================================================
// 11. REACCIONES INTERACTIVAS CON PERSISTENCIA LOCAL
// ==========================================================================
function loadUserReactionsFromStorage() {
    try {
        const raw = localStorage.getItem("faro_reactions");
        if (raw) AppState.userReactions = JSON.parse(raw);
    } catch (e) {
        AppState.userReactions = {};
    }
}

function saveUserReactionsToStorage() {
    localStorage.setItem("faro_reactions", JSON.stringify(AppState.userReactions));
}

function handleReaction(reactionType) {
    const artId = AppState.activeModalArticleId;
    if (!artId) return;

    const article = ARTICLES_DATABASE.find(a => a.id === artId);
    if (!article) return;

    if (!AppState.userReactions[artId]) {
        AppState.userReactions[artId] = {};
    }

    const hasReacted = !!AppState.userReactions[artId][reactionType];

    if (hasReacted) {
        // Quitar reacción
        AppState.userReactions[artId][reactionType] = false;
        article.reactions[reactionType] = Math.max(0, article.reactions[reactionType] - 1);
        showToast("Reacción removida", "info");
    } else {
        // Agregar reacción
        AppState.userReactions[artId][reactionType] = true;
        article.reactions[reactionType] = (article.reactions[reactionType] || 0) + 1;
        showToast("¡Gracias por tu valoración!", "success");
    }

    saveUserReactionsToStorage();
    updateReactionCounters(article);
}

function updateReactionCounters(article) {
    const reactions = article.reactions || { love: 0, insight: 0, applause: 0 };
    const artId = article.id;
    const userMap = AppState.userReactions[artId] || {};

    const loveBtn = document.querySelector(`.reaction-btn[data-reaction="love"]`);
    const insightBtn = document.querySelector(`.reaction-btn[data-reaction="insight"]`);
    const applauseBtn = document.querySelector(`.reaction-btn[data-reaction="applause"]`);

    const countLove = document.getElementById("count-love");
    const countInsight = document.getElementById("count-insight");
    const countApplause = document.getElementById("count-applause");

    if (countLove) countLove.textContent = reactions.love;
    if (countInsight) countInsight.textContent = reactions.insight;
    if (countApplause) countApplause.textContent = reactions.applause;

    if (loveBtn) loveBtn.classList.toggle("user-reacted", !!userMap.love);
    if (insightBtn) insightBtn.classList.toggle("user-reacted", !!userMap.insight);
    if (applauseBtn) applauseBtn.classList.toggle("user-reacted", !!userMap.applause);
}

// ==========================================================================
// 12. SISTEMA DE COMENTARIOS CON PERSISTENCIA
// ==========================================================================
function getStoredComments(artId) {
    try {
        const raw = localStorage.getItem(`faro_comments_${artId}`);
        if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [];
}

function saveStoredComment(artId, comment) {
    const existing = getStoredComments(artId);
    existing.unshift(comment);
    localStorage.setItem(`faro_comments_${artId}`, JSON.stringify(existing));
}

function renderArticleComments(article) {
    const listEl = document.getElementById("modal-comments-list");
    const totalCountEl = document.getElementById("comments-total-count");
    if (!listEl) return;

    const stored = getStoredComments(article.id);
    const initial = article.comments || [];
    const allComments = [...stored, ...initial];

    if (totalCountEl) totalCountEl.textContent = allComments.length;

    if (allComments.length === 0) {
        listEl.innerHTML = `<p style="font-size: 0.85rem; color: var(--text-muted); font-style: italic;">Sé el primero en compartir tu punto de vista sobre esta crónica.</p>`;
        return;
    }

    listEl.innerHTML = allComments.map(c => `
        <div class="comment-item">
            <div class="comment-top">
                <span class="comment-author-name">👤 ${escapeHtml(c.author)}</span>
                <span class="comment-date">${c.date}</span>
            </div>
            <p class="comment-message">${escapeHtml(c.text)}</p>
        </div>
    `).join("");
}

function handleCommentSubmit(e) {
    e.preventDefault();
    const artId = AppState.activeModalArticleId;
    if (!artId) return;

    const authorInput = document.getElementById("comment-author");
    const textInput = document.getElementById("comment-text");
    if (!authorInput || !textInput) return;

    const author = authorInput.value.trim();
    const text = textInput.value.trim();

    if (!author || !text) {
        showToast("Por favor completa los campos del comentario", "info");
        return;
    }

    const newComment = {
        author,
        text,
        date: "Recién publicado"
    };

    saveStoredComment(artId, newComment);

    const article = ARTICLES_DATABASE.find(a => a.id === artId);
    if (article) renderArticleComments(article);

    authorInput.value = "";
    textInput.value = "";
    showToast("Comentario publicado exitosamente", "success");
}

// ==========================================================================
// 13. SISTEMA DE ARTÍCULOS GUARDADOS (Reading List)
// ==========================================================================
function loadSavedArticlesFromStorage() {
    try {
        const raw = localStorage.getItem("faro_saved");
        if (raw) {
            AppState.savedArticleIds = new Set(JSON.parse(raw));
        }
    } catch (e) {
        AppState.savedArticleIds = new Set();
    }
    updateSavedBadge();
}

function saveSavedArticlesToStorage() {
    localStorage.setItem("faro_saved", JSON.stringify([...AppState.savedArticleIds]));
    updateSavedBadge();
}

function toggleSaveArticle(articleId) {
    if (AppState.savedArticleIds.has(articleId)) {
        AppState.savedArticleIds.delete(articleId);
        showToast("Artículo eliminado de tu lista de guardados", "info");
    } else {
        AppState.savedArticleIds.add(articleId);
        showToast("Artículo guardado para leer después", "success");
    }

    saveSavedArticlesToStorage();
    renderLeadSection();
    renderArticlesGrid();
    renderSavedDrawerList();

    // Actualizar botón si el modal está abierto
    if (AppState.activeModalArticleId === articleId) {
        const isSaved = AppState.savedArticleIds.has(articleId);
        const bookmarkText = document.getElementById("modal-bookmark-text");
        const bookmarkIcon = document.getElementById("modal-bookmark-icon");
        if (bookmarkText) bookmarkText.textContent = isSaved ? "Guardado" : "Guardar";
        if (bookmarkIcon) bookmarkIcon.textContent = isSaved ? "★" : "🔖";
    }
}

function updateSavedBadge() {
    const badge = document.getElementById("saved-badge");
    if (badge) {
        badge.textContent = AppState.savedArticleIds.size;
    }
}

function openSavedDrawer() {
    const drawer = document.getElementById("saved-drawer");
    if (!drawer) return;
    renderSavedDrawerList();
    drawer.classList.add("active");
    drawer.setAttribute("aria-hidden", "false");
}

function closeSavedDrawer() {
    const drawer = document.getElementById("saved-drawer");
    if (!drawer) return;
    drawer.classList.remove("active");
    drawer.setAttribute("aria-hidden", "true");
}

function renderSavedDrawerList() {
    const listEl = document.getElementById("saved-articles-list");
    if (!listEl) return;

    if (AppState.savedArticleIds.size === 0) {
        listEl.innerHTML = `
            <div class="empty-saved">
                <span class="empty-saved-icon">📭</span>
                <p>No tienes artículos guardados aún.</p>
                <span style="font-size: 0.75rem; color: var(--text-muted);">Haz clic en el icono 🔖 en cualquier reportaje para guardarlo aquí.</span>
            </div>
        `;
        return;
    }

    const savedArticles = ARTICLES_DATABASE.filter(a => AppState.savedArticleIds.has(a.id));

    listEl.innerHTML = savedArticles.map(art => `
        <div class="saved-item">
            <h4 class="saved-item-title" data-id="${art.id}">${art.title}</h4>
            <div class="saved-item-meta">
                <span>${art.categoryLabel} • ${art.readTime}</span>
                <button class="btn-remove-saved" data-id="${art.id}">Quitar</button>
            </div>
        </div>
    `).join("");
}

function clearAllSavedArticles() {
    if (AppState.savedArticleIds.size === 0) return;
    AppState.savedArticleIds.clear();
    saveSavedArticlesToStorage();
    renderLeadSection();
    renderArticlesGrid();
    renderSavedDrawerList();
    showToast("Se vació tu lista de lecturas guardadas", "info");
}

// ==========================================================================
// 14. COLUMNA EDITORIAL DE OPINIÓN DE JOENDRI ALBARRAN
// ==========================================================================
function openOpinionModal() {
    const modal = document.getElementById("opinion-modal");
    if (!modal) return;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeOpinionModal() {
    const modal = document.getElementById("opinion-modal");
    if (!modal) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

// ==========================================================================
// 15. PODCAST "MINUTO GLOBAL" / RESUMEN EN AUDIO SIMULADO
// ==========================================================================
function togglePodcastAudio() {
    const waveform = document.getElementById("audio-waveform");
    const playIcon = document.getElementById("podcast-play-icon");
    const playText = document.getElementById("podcast-play-text");
    const statusText = document.getElementById("audio-player-status");

    if (AppState.isPodcastPlaying) {
        AppState.isPodcastPlaying = false;
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        if (waveform) waveform.classList.remove("playing");
        if (playIcon) playIcon.textContent = "▶";
        if (playText) playText.textContent = "Escuchar Resumen";
        if (statusText) statusText.textContent = "Boletín detenido";
        showToast("Resumen de audio pausado", "info");
    } else {
        AppState.isPodcastPlaying = true;
        if (waveform) waveform.classList.add("playing");
        if (playIcon) playIcon.textContent = "⏹";
        if (playText) playText.textContent = "Detener Resumen";
        if (statusText) statusText.textContent = "Transmitiendo Minuto Global de Joendri Albarran...";

        // Si hay soporte de voz, reproducir resumen periodístico
        if ('speechSynthesis' in window) {
            const brief = "Bienvenidos a Minuto Global, la síntesis informativa de El Faro Global dirigida por Joendri Albarran. En la jornada de hoy: el telescopio James Webb halla atmósferas con agua en Trappist-1, mientras que en los Andes se recuperan 450 mil hectáreas de bosque nublado. Gracias por elegir periodismo con rigor.";
            const ut = new SpeechSynthesisUtterance(brief);
            ut.lang = "es-ES";
            ut.onend = () => {
                AppState.isPodcastPlaying = false;
                if (waveform) waveform.classList.remove("playing");
                if (playIcon) playIcon.textContent = "▶";
                if (playText) playText.textContent = "Escuchar Resumen";
                if (statusText) statusText.textContent = "Boletín completado. Disponible de nuevo mañana.";
            };
            window.speechSynthesis.speak(ut);
        }

        showToast("Reproduciendo el Minuto Global", "info");
    }
}

// ==========================================================================
// 16. NOTIFICACIONES FLOTANTES (TOAST)
// ==========================================================================
function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    const icon = type === "success" ? "✓" : "ℹ";
    toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ==========================================================================
// 17. SUSCRIPCIÓN AL BOLETÍN MATUTINO
// ==========================================================================
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const emailInput = document.getElementById("newsletter-email");
    if (!emailInput) return;

    const email = emailInput.value.trim();
    if (email && email.includes("@")) {
        showToast(`¡Bienvenido a El Faro Global! Te hemos enviado la edición matutina a ${email}`, "success");
        emailInput.value = "";
    } else {
        showToast("Por favor ingresa un correo electrónico válido", "info");
    }
}

// ==========================================================================
// 18. MANEJADORES DE EVENTOS GLOBALES (LISTENERS)
// ==========================================================================
function setupEventListeners() {
    // Alternar Tema (Modo Oscuro / Claro)
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

    // Pestañas de Categoría
    const tabsContainer = document.getElementById("category-tabs");
    if (tabsContainer) {
        tabsContainer.addEventListener("click", (e) => {
            const tab = e.target.closest(".nav-tab");
            if (!tab) return;

            document.querySelectorAll(".nav-tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            AppState.currentCategory = tab.dataset.category;
            renderArticlesGrid();
        });
    }

    // Buscador en Tiempo Real
    const searchInput = document.getElementById("search-input");
    const searchClear = document.getElementById("search-clear");
    const filterIndicator = document.getElementById("filter-indicator");
    const filterIndicatorText = document.getElementById("filter-indicator-text");
    const btnResetFilter = document.getElementById("btn-reset-filter");

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const val = e.target.value;
            AppState.searchQuery = val;
            
            if (searchClear) searchClear.style.display = val.length > 0 ? "block" : "none";

            if (val.trim().length > 0) {
                if (filterIndicator && filterIndicatorText) {
                    filterIndicator.style.display = "flex";
                    filterIndicatorText.innerHTML = `Mostrando resultados para: <strong>"${escapeHtml(val)}"</strong>`;
                }
            } else {
                if (filterIndicator) filterIndicator.style.display = "none";
            }

            renderArticlesGrid();
        });
    }

    if (searchClear) {
        searchClear.addEventListener("click", () => {
            if (searchInput) {
                searchInput.value = "";
                AppState.searchQuery = "";
                searchClear.style.display = "none";
                if (filterIndicator) filterIndicator.style.display = "none";
                renderArticlesGrid();
            }
        });
    }

    if (btnResetFilter) {
        btnResetFilter.addEventListener("click", () => {
            if (searchInput) searchInput.value = "";
            AppState.searchQuery = "";
            AppState.currentCategory = "all";
            if (searchClear) searchClear.style.display = "none";
            if (filterIndicator) filterIndicator.style.display = "none";

            document.querySelectorAll(".nav-tab").forEach(t => {
                t.classList.toggle("active", t.dataset.category === "all");
            });

            renderArticlesGrid();
            showToast("Portada principal restaurada", "info");
        });
    }

    const btnClearEmpty = document.getElementById("btn-clear-empty-search");
    if (btnClearEmpty) {
        btnClearEmpty.addEventListener("click", () => {
            if (btnResetFilter) btnResetFilter.click();
        });
    }

    // Delegación de Clics para Artículos (Abrir modal o Guardar)
    document.addEventListener("click", (e) => {
        // Clic en Guardar/Bookmark de tarjeta
        const bookmarkBtn = e.target.closest(".btn-card-bookmark, .lead-btn-bookmark");
        if (bookmarkBtn) {
            e.stopPropagation();
            const id = bookmarkBtn.dataset.id;
            if (id) toggleSaveArticle(id);
            return;
        }

        // Clic en Leer Artículo (desde botón o título)
        const readTrigger = e.target.closest(".btn-card-read, .card-title, .lead-title, .btn-read-lead, .substory-title, .trending-item");
        if (readTrigger) {
            const id = readTrigger.dataset.id;
            if (id) {
                openArticleModal(id);
            }
            return;
        }

        // Quitar de guardados desde el drawer
        const removeSavedBtn = e.target.closest(".btn-remove-saved");
        if (removeSavedBtn) {
            const id = removeSavedBtn.dataset.id;
            if (id) toggleSaveArticle(id);
            return;
        }

        // Abrir artículo desde el drawer de guardados
        const savedItemTitle = e.target.closest(".saved-item-title");
        if (savedItemTitle) {
            const id = savedItemTitle.dataset.id;
            if (id) {
                closeSavedDrawer();
                openArticleModal(id);
            }
            return;
        }

        // Categorías del pie de página
        const footerCategoryLink = e.target.closest(".footer-category-link");
        if (footerCategoryLink) {
            e.preventDefault();
            const cat = footerCategoryLink.dataset.category;
            if (cat) {
                AppState.currentCategory = cat;
                document.querySelectorAll(".nav-tab").forEach(t => {
                    t.classList.toggle("active", t.dataset.category === cat);
                });
                renderArticlesGrid();
                window.scrollTo({ top: 350, behavior: "smooth" });
            }
            return;
        }
    });

    // Modal de Artículo: Cerrar, Escuchar, Tamaño Fuente, Guardar
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const articleModal = document.getElementById("article-modal");
    if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeArticleModal);
    if (articleModal) {
        articleModal.addEventListener("click", (e) => {
            if (e.target === articleModal) closeArticleModal();
        });
    }

    const speechBtn = document.getElementById("modal-speech-btn");
    if (speechBtn) speechBtn.addEventListener("click", toggleSpeechSynthesis);

    const fontDec = document.getElementById("btn-font-decrease");
    const fontInc = document.getElementById("btn-font-increase");
    if (fontDec) fontDec.addEventListener("click", () => changeFontSize(-1));
    if (fontInc) fontInc.addEventListener("click", () => changeFontSize(1));

    const modalBookmarkBtn = document.getElementById("modal-bookmark-btn");
    if (modalBookmarkBtn) {
        modalBookmarkBtn.addEventListener("click", () => {
            if (AppState.activeModalArticleId) {
                toggleSaveArticle(AppState.activeModalArticleId);
            }
        });
    }

    // Scroll en el modal para la barra de progreso
    const modalScrollable = document.getElementById("modal-scrollable");
    if (modalScrollable) {
        modalScrollable.addEventListener("scroll", () => {
            updateProgressBar(modalScrollable);
        });
    }

    // Reacciones en el Modal
    const reactionsWrapper = document.querySelector(".reaction-buttons");
    if (reactionsWrapper) {
        reactionsWrapper.addEventListener("click", (e) => {
            const btn = e.target.closest(".reaction-btn");
            if (!btn) return;
            const rxType = btn.dataset.reaction;
            if (rxType) handleReaction(rxType);
        });
    }

    // Comentarios en el Modal
    const commentForm = document.getElementById("comment-form");
    if (commentForm) commentForm.addEventListener("submit", handleCommentSubmit);

    // Drawer de Artículos Guardados
    const btnOpenSaved = document.getElementById("btn-open-saved");
    const btnCloseSaved = document.getElementById("btn-close-saved");
    const savedDrawer = document.getElementById("saved-drawer");
    const btnClearSaved = document.getElementById("btn-clear-all-saved");

    if (btnOpenSaved) btnOpenSaved.addEventListener("click", openSavedDrawer);
    if (btnCloseSaved) btnCloseSaved.addEventListener("click", closeSavedDrawer);
    if (savedDrawer) {
        savedDrawer.addEventListener("click", (e) => {
            if (e.target === savedDrawer) closeSavedDrawer();
        });
    }
    if (btnClearSaved) btnClearSaved.addEventListener("click", clearAllSavedArticles);

    // Modal de Opinión de Joendri Albarran
    const btnReadOpinion = document.getElementById("btn-read-opinion");
    const opinionCloseBtn = document.getElementById("opinion-close-btn");
    const opinionModal = document.getElementById("opinion-modal");
    const footerManifestoLink = document.getElementById("footer-manifesto-link");

    if (btnReadOpinion) {
        btnReadOpinion.addEventListener("click", (e) => {
            e.preventDefault();
            openOpinionModal();
        });
    }
    if (footerManifestoLink) {
        footerManifestoLink.addEventListener("click", (e) => {
            e.preventDefault();
            openOpinionModal();
        });
    }
    if (opinionCloseBtn) opinionCloseBtn.addEventListener("click", closeOpinionModal);
    if (opinionModal) {
        opinionModal.addEventListener("click", (e) => {
            if (e.target === opinionModal) closeOpinionModal();
        });
    }

    // Reportaje Especial de Fondo
    const btnSpecialReport = document.getElementById("btn-read-special-report");
    if (btnSpecialReport) {
        btnSpecialReport.addEventListener("click", () => {
            openArticleModal("art-6"); // Abre la gran crónica de los océanos
        });
    }

    // Audio Resumen / Podcast
    const btnPodcast = document.getElementById("btn-toggle-podcast");
    if (btnPodcast) btnPodcast.addEventListener("click", togglePodcastAudio);

    // Formulario de Newsletter
    const newsletterForm = document.getElementById("newsletter-form");
    if (newsletterForm) newsletterForm.addEventListener("submit", handleNewsletterSubmit);

    // Botón Subir al Inicio
    const btnScrollTop = document.getElementById("btn-scroll-top");
    if (btnScrollTop) {
        btnScrollTop.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Logo / Inicio
    const brandHome = document.getElementById("brand-home");
    if (brandHome) {
        brandHome.addEventListener("click", (e) => {
            e.preventDefault();
            if (btnResetFilter) btnResetFilter.click();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Tecla Escape para cerrar modales y drawers
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeArticleModal();
            closeSavedDrawer();
            closeOpinionModal();
        }
    });
}

// ==========================================================================
// 19. UTILIDADES
// ==========================================================================
function escapeHtml(text) {
    if (!text) return "";
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
