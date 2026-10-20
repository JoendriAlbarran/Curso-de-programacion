# 🚀 ALBARRAN-X AEROSPACE & INTERPLANETARY EXPLORATION
### Fundador, Ingeniero Jefe & Director General: **Joendri Albarran**

Una plataforma web interactiva inspirada en la cohetería avanzada y la exploración del espacio profundo (estilo **SpaceX**, **NASA** y **Starship**). Desarrollada con **HTML5 semántico**, **CSS3 moderno** (paleta obsidian, HUD telemetría militar y microanimaciones) y **JavaScript puro** con **Web Audio API** y **Canvas 2D**.

---

## 🌌 Características Destacadas de la Web

### 1. Simulador de Lanzamiento Orbital en Tiempo Real
- **Secuencia de Cuenta Atrás (T-10s)**: Con beeps de audio sintetizados y avisos de presurización de tanques criogénicos.
- **Física y Telemetría en Pantalla**: Muestra altitud (km), velocidad (km/h) y empuje (%) subiendo en tiempo real.
- **Fases del Vuelo Espacial**:
  1. *Ignición & Despegue*: Penacho de fuego animado de motores Raptor-X y aceleración supersónica superando Max-Q.
  2. *MECO (Main Engine Cutoff)*: Apagado de motores de primera etapa y transición de la atmósfera a la oscuridad del espacio profundo.
  3. *Separación de Etapas*: Encendido del motor de vacío de la Segunda Etapa alcanzando 27.500 km/h de inserción orbital.
  4. *Aterrizaje Autónomo*: El propulsor despliega aletas de titanio y patas hidráulicas para posarse suavemente sobre la barcaza marina autónoma (*Droneship* «Sin Gravedad»).
- **Botón de Aborto y Reinicio**: Permite abortar la secuencia en cualquier instante con sirena de emergencia o reiniciar a estado nominal.
- **Terminal de Telemetría**: Consola estilo centro de control con registro de comandos en vivo.

### 2. Generador de Audio Aeroespacial (Web Audio API)
- No requiere archivos `.mp3` externos: sintetiza beeps de cuenta atrás, el rugido grave de baja frecuencia de los motores criogénicos y campanas armónicas de inserción orbital directamente en el navegador.
- Botón en la barra superior HUD para activar o silenciar el sonido.

### 3. Selector de la Flota de Naves Espaciales
Permite alternar entre cuatro vehículos de vanguardia con tablas completas de especificaciones:
- **ALBARRAN HEAVY**: Cohete pesado reutilizable de 70m y 27 motores Raptor.
- **ARES-I MARS SHIP**: Nave interplanetaria de acero inoxidable de 122m para transportar hasta 100 exploradores a Marte.
- **VALKYRIE CREW CAPSULE**: Cápsula tripulada con cúpula panorámica de cristal de 360 grados.
- **LUNAR HOPPER ARTEMIS**: Módulo de descenso en cráteres perpetuamente sombreados del polo sur lunar.

### 4. Calculadora y Cotizador de Misiones Espaciales
- Selecciona el destino: *Órbita Terrestre Baja (LEO)*, *Órbita Geoestacionaria (GTO)*, *Inyección Translunar (Luna)* o *Inyección Trans-Marte*.
- Deslizador de masa de carga útil (500 kg a 100.000 kg).
- Selector de tipo de carga y opción de propulsor reutilizado (con 40% de descuento).
- Calcula en vivo: vehículo asignado, empuje necesario (kN), tiempo de inserción, costo por kilogramo y porcentaje de capacidad ocupada.

### 5. Destinos del Sistema Solar y Visión de Joendri Albarran
- Paneles con planes de vuelo hacia LEO, la Luna y Marte.
- Declaración y filosofía de liderazgo de **Joendri Albarran**: *"Hacer de la humanidad una especie multiplanetaria"*.
- Galería fotográfica espacial de alta resolución.
- Modal para reservar ventanas de lanzamiento con validación y confirmación en tiempo real.

---

## 📁 Estructura del Proyecto

```text
albarran-space/
├── index.html    # Estructura semántica, HUD, simulador visual y modales
├── styles.css    # Diseño futurista SpaceX, variables neón, canvas y animaciones
├── script.js     # Simulador de etapas, Web Audio API, Canvas de estrellas y calculadora
└── README.md     # Documentación del proyecto
```

---

## 🖥️ ¿Cómo abrir la web en tu navegador?

1. Ve a la carpeta en tu explorador de archivos:
   `c:\Users\Joendri Albarran\Desktop\Carpeta programacion\Curso-de-programacion\tareas de webs\dia3\albarran-space\`
2. Haz doble clic sobre **`index.html`**.
3. O ejecútalo desde PowerShell:
   ```powershell
   Start-Process "c:\Users\Joendri Albarran\Desktop\Carpeta programacion\Curso-de-programacion\tareas de webs\dia3\albarran-space\index.html"
   ```
