# 📰 El Faro Global | Gran Portal de Noticias Digital
### Dirección General y Edición: **Joendri Albarran**

Un portal periodístico independiente y contemporáneo desarrollado exclusivamente con **HTML5 semántico**, **CSS3 moderno** (Vanilla CSS, variables y temas) y **JavaScript interactivo** (Vanilla JS, Web Speech API y LocalStorage).

---

## 🌟 Temática del Proyecto
El proyecto se aleja intencionadamente de la temática de programación o tiendas de venta electrónica, configurándose como un **diario digital internacional de alta gama** enfocado en:
- **🔭 Ciencia y Cosmos**: Astrofísica, descubrimientos espaciales y misiones interplanetarias.
- **🌿 Planeta y Naturaleza**: Restauración de ecosistemas, océanos y conservación de biodiversidad.
- **🏛️ Cultura y Sociedad**: Manuscritos históricos, literatura, arte contemporáneo y debate cultural.
- **⚡ Innovación y Futuro**: Ciudades esponja, urbanismo bioclimático y tecnologías limpias.
- **🧭 Grandes Expediciones**: Arqueología subterránea, travesías polares y exploración marina abisal.
- **✍️ Tribuna de Opinión**: Columna de fondo y manifiesto editorial a la firma de **Joendri Albarran**.

---

## 🚀 Características y Funcionalidades Principales

### 1. Cabecera y Experiencia de Prensa Internacional
- **Barra Superior en Vivo**: Fecha y hora del sistema en tiempo real en español (`setInterval`), con reloj que actualiza cada segundo.
- **Widget de Meteorología**: Selector de capitales (Caracas, Madrid, Buenos Aires, Bogotá, Ciudad de México, Tokio) con temperatura e icono del clima.
- **Cintillo de Última Hora (Breaking News Ticker)**: Rotación automática de noticias urgentes con controles de pausa, avance y retroceso, permitiendo hacer clic para abrir directamente la noticia.
- **Cabecera Masthead de Gran Prestigio**: Con el sello de dirección editorial a nombre de **Joendri Albarran**.

### 2. Navegación, Filtros y Búsqueda en Tiempo Real
- **Pestañas de Categoría**: Filtra al instante las noticias sin recargar la página.
- **Buscador en Vivo**: Permite escribir palabras clave y filtra en tiempo real por título, resumen, autor o sección.
- **Indicador de Filtro y Botón de Restauración**: Feedback visual claro para volver a la portada en un solo clic.

### 3. Modo Oscuro / Modo Claro (Dark & Light Mode)
- Diseño inspirado en papel prensa clásico (`#f8f6f0` y tipografía serif) para el modo diurno, y elegancia en negro tinta (`#0c0e14`) para el modo nocturno.
- Persistencia automática de la elección del usuario en `localStorage`.

### 4. Lector Inmersivo de Artículos (Modal Reader)
- **Barra de Progreso de Lectura**: Línea de color dinámico en la parte superior que se llena a medida que el lector avanza en el texto.
- **Lector en Voz Alta (Web Speech API)**: Botón *"Escuchar Artículo"* que utiliza la síntesis de voz nativa del navegador para leer el reportaje en español.
- **Ajuste de Tipografía (A- / A+)**: Control de tamaño de letra pensado para la accesibilidad visual.
- **Reacciones de Lectores**: Botones interactivos (❤️ Fascinante, 💡 Revelador, 👏 Gran Crónica) con contadores persistentes en `localStorage`.
- **Comentarios de la Comunidad**: Formulario para dejar aportes u opiniones que se publican y almacenan localmente.

### 5. Lista de Lecturas Guardadas (Reading List Drawer)
- Guarda cualquier artículo con el icono de marcador `🔖`.
- Panel lateral deslizable donde consultar los artículos guardados en cualquier momento.

### 6. Minuto Global (Audio Resumen Informativo)
- Widget lateral con animación de ecualizador de ondas y síntesis vocal de audio del resumen matutino curado por Joendri Albarran.

---

## 📁 Estructura de Archivos

```text
pagina-web/
├── index.html    # Estructura semántica, accesibilidad y modales
├── styles.css    # Diseño editorial, variables CSS, Dark/Light mode y animaciones
├── script.js     # Lógica interactiva, filtros, DOM, audio, localStorage
└── README.md     # Documentación del portal
```

---

## 🖥️ ¿Cómo abrir la página en el navegador?

1. Ve a la carpeta del proyecto en el Explorador de Windows:
   `C:\Users\Joendri Albarran\Desktop\Carpeta programacion\Curso-de-programacion\tareas de webs\dia3\pagina-web\`
2. Haz doble clic sobre el archivo **`index.html`**.
3. Se abrirá inmediatamente en Google Chrome, Microsoft Edge, Brave o cualquier navegador moderno.
