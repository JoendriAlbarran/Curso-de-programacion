/**
 * ALBARRAN NEXUS — PORTAL GLOBAL DE INGENIEROS
 * Fundador & Director: Joendri Albarran
 * Interactive Logic, CAD Simulation, Physics Engines & Audio Synthesis
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. WEB AUDIO API SYNTHESIZER (Sonidos Técnicos de Ingeniería)
       ========================================================================== */
    let audioCtx = null;
    let audioEnabled = false;

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    function playTechSound(type = 'click') {
        if (!audioEnabled) return;
        try {
            initAudio();
            const now = audioCtx.currentTime;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            if (type === 'click') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1200, now);
                osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.linearRampToValueAtTime(0.001, now + 0.04);
                osc.start(now);
                osc.stop(now + 0.04);
            } else if (type === 'compute') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.setValueAtTime(880, now + 0.05);
                osc.frequency.setValueAtTime(1320, now + 0.1);
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.linearRampToValueAtTime(0.001, now + 0.18);
                osc.start(now);
                osc.stop(now + 0.18);
            } else if (type === 'badge') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523.25, now); // C5
                osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.25); // C6
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0.001, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
            }
        } catch (e) {
            console.warn('Audio FX no soportado en este entorno', e);
        }
    }

    const audioToggleBtn = document.getElementById('audio-toggle-btn');
    if (audioToggleBtn) {
        audioToggleBtn.addEventListener('click', () => {
            audioEnabled = !audioEnabled;
            if (audioEnabled) {
                initAudio();
                audioToggleBtn.innerHTML = '<span id="audio-icon">🔊</span> <span class="audio-label">FX ON</span>';
                audioToggleBtn.style.borderColor = 'var(--accent-cyan)';
                audioToggleBtn.style.color = 'var(--accent-cyan)';
                playTechSound('click');
                showToast('Efectos sonoros de telemetría activados');
            } else {
                audioToggleBtn.innerHTML = '<span id="audio-icon">🔈</span> <span class="audio-label">FX OFF</span>';
                audioToggleBtn.style.borderColor = '';
                audioToggleBtn.style.color = '';
                showToast('Audio silenciado');
            }
        });
    }

    /* ==========================================================================
       2. TELEMETRÍA Y RELOJ UTC EN VIVO
       ========================================================================== */
    const utcClock = document.getElementById('utc-clock');
    function updateClock() {
        const now = new Date();
        const hrs = String(now.getUTCHours()).padStart(2, '0');
        const min = String(now.getUTCMinutes()).padStart(2, '0');
        const sec = String(now.getUTCSeconds()).padStart(2, '0');
        if (utcClock) {
            utcClock.textContent = `UTC: ${hrs}:${min}:${sec}`;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    /* ==========================================================================
       3. CONMUTADOR DE TEMAS (BLUEPRINT / TITAN / CYBER)
       ========================================================================== */
    const themeBtn = document.getElementById('theme-toggle');
    const themes = ['theme-blueprint', 'theme-titan', 'theme-cyber'];
    let currentThemeIdx = 0;

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            playTechSound('click');
            document.body.classList.remove(themes[currentThemeIdx]);
            currentThemeIdx = (currentThemeIdx + 1) % themes.length;
            document.body.classList.add(themes[currentThemeIdx]);
            
            const themeNames = ['Blueprint Navy', 'Dark Titan', 'Cyber Grid'];
            showToast(`Tema activo: ${themeNames[currentThemeIdx]}`);
        });
    }

    /* ==========================================================================
       4. MENÚ MÓVIL RESPONSIVE
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            playTechSound('click');
            mainNav.classList.toggle('mobile-open');
        });

        // Cerrar al hacer clic en un enlace
        mainNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('mobile-open');
            });
        });
    }

    /* ==========================================================================
       5. CONTADORES ANIMADOS EN HERO SECTION
       ========================================================================== */
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    let statsCounted = false;

    function countUpStats() {
        if (statsCounted) return;
        statNumbers.forEach(num => {
            const target = +num.getAttribute('data-target');
            const duration = 1800; // ms
            const start = performance.now();

            function step(timestamp) {
                const progress = Math.min((timestamp - start) / duration, 1);
                const current = Math.floor(progress * target);
                num.textContent = current.toLocaleString('es-ES') + (target > 1000 ? '+' : '');
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    num.textContent = target.toLocaleString('es-ES') + (target > 1000 ? '+' : '');
                }
            }
            requestAnimationFrame(step);
        });
        statsCounted = true;
    }
    setTimeout(countUpStats, 400);

    /* ==========================================================================
       6. CANAL DE FONDO: CUADRÍCULA CAD DINÁMICA
       ========================================================================== */
    const cadBgCanvas = document.getElementById('cad-grid-canvas');
    if (cadBgCanvas) {
        const ctx = cadBgCanvas.getContext('2d');
        let width = cadBgCanvas.width = window.innerWidth;
        let height = cadBgCanvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = cadBgCanvas.width = window.innerWidth;
            height = cadBgCanvas.height = window.innerHeight;
        });

        let mouseX = width / 2;
        let mouseY = height / 2;
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function drawCadGrid() {
            ctx.clearRect(0, 0, width, height);

            const gridSize = 45;
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
            ctx.lineWidth = 1;

            // Líneas verticales
            for (let x = 0; x < width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }

            // Líneas horizontales
            for (let y = 0; y < height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // Marcadores en intersecciones cercanas al cursor
            ctx.fillStyle = 'rgba(0, 240, 255, 0.25)';
            const radiusInteraction = 180;
            const startX = Math.floor((mouseX - radiusInteraction) / gridSize) * gridSize;
            const endX = Math.ceil((mouseX + radiusInteraction) / gridSize) * gridSize;
            const startY = Math.floor((mouseY - radiusInteraction) / gridSize) * gridSize;
            const endY = Math.ceil((mouseY + radiusInteraction) / gridSize) * gridSize;

            for (let x = startX; x <= endX; x += gridSize) {
                for (let y = startY; y <= endY; y += gridSize) {
                    const dist = Math.hypot(x - mouseX, y - mouseY);
                    if (dist < radiusInteraction) {
                        const alpha = (1 - dist / radiusInteraction) * 0.45;
                        ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
                        ctx.fillRect(x - 2, y - 2, 4, 4);

                        // Pequeño retículo CAD en cruz
                        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.6})`;
                        ctx.beginPath();
                        ctx.moveTo(x - 6, y); ctx.lineTo(x + 6, y);
                        ctx.moveTo(x, y - 6); ctx.lineTo(x, y + 6);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(drawCadGrid);
        }
        drawCadGrid();
    }

    /* ==========================================================================
       7. BASE DE DATOS: 10 ESPECIALIDADES DE INGENIERÍA
       ========================================================================== */
    const engineeringDisciplines = [
        {
            id: 'software',
            icon: '💻',
            title: 'Ingeniería de Software & IA',
            category: 'computacion',
            categoryLabel: 'Computación & IA',
            desc: 'Diseño de arquitecturas cloud distribuidas, redes neuronales profundas, seguridad criptográfica y sistemas tolerantes a fallos con latencia sub-milisegundo.',
            tools: ['Python', 'Rust', 'Kubernetes', 'PyTorch', 'Docker', 'GraphQL'],
            membersCount: 3820,
            fullOverview: 'La Ingeniería de Software en Albarran Nexus lidera la transformación algorítmica mundial. Integra prácticas de confiabilidad de sitios (SRE), microservicios de alto rendimiento y modelos fundacionales de Inteligencia Artificial para procesamiento en tiempo real.',
            curriculum: ['Estructuras de Datos y Algoritmos Complejos', 'Sistemas Distribuidos & Concurrencia', 'Machine Learning & Redes Neuronales', 'Ciberseguridad y Criptografía Cuántica', 'Cloud Native DevOps'],
            salaryRange: '$65,000 - $160,000 USD / año',
            standardCode: 'IEEE 829 / ISO 25010'
        },
        {
            id: 'civil',
            icon: '🏗️',
            title: 'Ingeniería Civil & Estructural',
            category: 'infraestructura',
            categoryLabel: 'Infraestructura & Obra',
            desc: 'Cálculo de megaestructuras, puentes atirantados sismorresistentes, geotecnia avanzada y modelado BIM 7D para ciudades inteligentes.',
            tools: ['AutoCAD', 'Revit BIM', 'SAP2000', 'ETABS', 'CYPECAD', 'Civil 3D'],
            membersCount: 2450,
            fullOverview: 'Enfocada en el desarrollo de infraestructura resiliente ante catástrofes naturales y urbanismo sostenible. Desde cimentaciones profundas en suelos no cohesivos hasta rascacielos con amortiguadores de masa sintonizada.',
            curriculum: ['Mecánica de Suelos y Cimentaciones', 'Análisis Matricial de Estructuras', 'Diseño de Hormigón Armado y Pretensado', 'Dinámica Estructural y Sismo', 'Gestión de Proyectos Viales'],
            salaryRange: '$55,000 - $140,000 USD / año',
            standardCode: 'ACI 318 / Eurocódigo 2'
        },
        {
            id: 'mecanica',
            icon: '⚙️',
            title: 'Ingeniería Mecánica & Robótica',
            category: 'mecanica-aero',
            categoryLabel: 'Mecánica & Espacial',
            desc: 'Termofluidos, cinemática de manipuladores robóticos, elementos de máquinas de precisión, análisis térmico FEA y manufactura aditiva.',
            tools: ['SolidWorks', 'ANSYS Mechanical', 'CATIA', 'Mastercam', 'MATLAB', 'Autodesk Inventor'],
            membersCount: 2190,
            fullOverview: 'Diseño integral de sistemas mecánicos dinámicos, turbinas hidráulicas y de vapor, motores de combustión interna eficiente y actuadores robóticos con control de impedancia.',
            curriculum: ['Termodinámica Aplicada & Transferencia de Calor', 'Diseño de Elementos de Máquinas', 'Mecánica de Materiales Compuestos', 'Cinemática y Dinámica Robótica', 'Manufactura CNC y CAM'],
            salaryRange: '$58,000 - $135,000 USD / año',
            standardCode: 'ASME Boiler & Pressure Vessel / ISO 12100'
        },
        {
            id: 'electrica',
            icon: '⚡',
            title: 'Ingeniería Eléctrica & Smart Grids',
            category: 'energia-electronica',
            categoryLabel: 'Energía & Señales',
            desc: 'Generación distribuida, subestaciones de extra-alta tensión, microrredes con almacenamiento por batería y protección electromagnética.',
            tools: ['ETAP', 'DIgSILENT PowerFactory', 'MATLAB Simulink', 'Altium Designer', 'LabVIEW'],
            membersCount: 1940,
            fullOverview: 'Garantiza la transición energética mundial mediante el diseño de sistemas de potencia estables, inversores de carburo de silicio (SiC) y control predictivo de redes eléctricas inteligentes.',
            curriculum: ['Teoría de Circuitos y Transitorios', 'Análisis de Sistemas de Potencia', 'Protecciones Eléctricas y Relés', 'Alta Tensión y Aislamiento', 'Electrónica de Potencia'],
            salaryRange: '$60,000 - $145,000 USD / año',
            standardCode: 'IEEE 1547 / NFPA 70 (NEC)'
        },
        {
            id: 'aeroespacial',
            icon: '🚀',
            title: 'Ingeniería Aeroespacial & Satelital',
            category: 'mecanica-aero',
            categoryLabel: 'Mecánica & Espacial',
            desc: 'Aerodinámica hipersónica, propulsión criogénica de cohetes, navegación orbital GNSS y diseño de cargas útiles satelitales CubeSat.',
            tools: ['OpenFOAM CFD', 'NASA GMAT', 'Ansys Fluent', 'FreeCAD Aero', 'Simscape'],
            membersCount: 1120,
            fullOverview: 'Inspirada en el programa de investigación espacial de Joendri Albarran. Desarrolla lanzadores orbitales reutilizables, escudos térmicos ablativos y constelaciones de telecomunicación en órbita LEO.',
            curriculum: ['Aerodinámica Compresible', 'Mecánica Orbital y Astrodinámica', 'Propulsión de Cohetes y Turborreactores', 'Estructuras Aeroespaciales Ligeras', 'Sistemas de Guiado y Navegación'],
            salaryRange: '$75,000 - $185,000 USD / año',
            standardCode: 'NASA-STD / ECSS-E-ST'
        },
        {
            id: 'biomedica',
            icon: '🧬',
            title: 'Ingeniería Biomédica & Biónica',
            category: 'ciencias-vida',
            categoryLabel: 'Biotecnología & Procesos',
            desc: 'Prótesis electromiográficas con feedback táctil, imagenología por resonancia magnética, órganos bioartificiales e implantes biocompatibles.',
            tools: ['Mimics Materialise', 'COMSOL Multiphysics', 'LabVIEW Bio', 'Arduino BioMedical', '3D Slicer'],
            membersCount: 980,
            fullOverview: 'Fusión de la medicina clínica con la ingeniería de materiales y procesamiento digital de bioseñales EEG/EMG para salvar vidas y rehabilitar pacientes con discapacidades neuromotoras.',
            curriculum: ['Biomecánica del Cuerpo Humano', 'Biomateriales y Compatibilidad Tisular', 'Instrumentación y Biosensores Médicos', 'Procesamiento de Imágenes Médicas', 'Normativa y Ensayos Clínicos'],
            salaryRange: '$62,000 - $138,000 USD / año',
            standardCode: 'ISO 13485 / FDA 21 CFR'
        },
        {
            id: 'quimica',
            icon: '🧪',
            title: 'Ingeniería Química & Nanomateriales',
            category: 'ciencias-vida',
            categoryLabel: 'Biotecnología & Procesos',
            desc: 'Diseño de reactores químicos continuos (CSTR), síntesis de grafeno y nanomateriales, destilación fraccionada y catálisis heterogénea.',
            tools: ['Aspen Plus', 'Aspen HYSYS', 'CHEMCAD', 'DWSIM', 'COMSOL Chemistry'],
            membersCount: 1340,
            fullOverview: 'Transformación de materias primas a escala molecular. Líder en síntesis de polímeros biodegradables, producción de hidrógeno verde por electrólisis y captura de dióxido de carbono.',
            curriculum: ['Termodinámica de Fases y Reacciones', 'Fenómenos de Transporte (Masa, Calor, Momento)', 'Cinética Química y Diseño de Reactores', 'Operaciones Unitarias de Separación', 'Control de Procesos Químicos'],
            salaryRange: '$58,000 - $140,000 USD / año',
            standardCode: 'AIChE / OSHA Process Safety'
        },
        {
            id: 'mecatronica',
            icon: '🤖',
            title: 'Ingeniería Mecatrónica & Sistemas Autónomos',
            category: 'mecanica-aero',
            categoryLabel: 'Mecánica & Espacial',
            desc: 'Integración sinérgica de mecánica, electrónica y control computarizado. Robótica móvil (ROS 2), vehículos autónomos y gemelos digitales.',
            tools: ['ROS 2', 'TwinCAT PLC', 'Siemens TIA Portal', 'SolidWorks Electrical', 'Gazebo Sim'],
            membersCount: 1670,
            fullOverview: 'Desarrollo de drones autónomos para inspección de líneas de alta tensión, brazos colaborativos cobots para líneas de ensamblaje flexible y domótica industrial basada en IoT.',
            curriculum: ['Sistemas de Control Retroalimentado PID/LQR', 'Microcontroladores y Sistemas Embebidos', 'Automatización Industrial y SCADA', 'Visión Artificial para Robótica', 'Sensores y Actuadores de Potencia'],
            salaryRange: '$60,000 - $142,000 USD / año',
            standardCode: 'IEC 61131 / ISO 10218'
        },
        {
            id: 'industrial',
            icon: '🏭',
            title: 'Ingeniería Industrial & Operaciones 4.0',
            category: 'infraestructura',
            categoryLabel: 'Infraestructura & Obra',
            desc: 'Optimización matemática de cadenas de suministro, Lean Manufacturing, Six Sigma Black Belt, ergonomía laboral y simulación de eventos discretos.',
            tools: ['Arena Simulation', 'FlexSim', 'SAP S/4HANA', 'Minitab', 'Simio', 'Power BI'],
            membersCount: 2050,
            fullOverview: 'Maximiza el rendimiento y elimina cuellos de botella en plantas de manufactura globales mediante modelos estocásticos, gemelos digitales de logística y mantenimiento predictivo.',
            curriculum: ['Investigación de Operaciones y Programación Lineal', 'Ingeniería de Métodos y Tiempos', 'Control Estadístico de la Calidad (SPC)', 'Logística y Gestión de Cadena de Suministro', 'Ingeniería Económica y Evaluación Financiera'],
            salaryRange: '$52,000 - $130,000 USD / año',
            standardCode: 'ISO 9001 / Lean Six Sigma'
        },
        {
            id: 'ambiental',
            icon: '🌿',
            title: 'Ingeniería Ambiental & Descarbonización',
            category: 'ciencias-vida',
            categoryLabel: 'Biotecnología & Procesos',
            desc: 'Tratamiento de efluentes industriales, modelado de dispersión atmosférica, remediación de acuíferos y economía circular circular.',
            tools: ['AERMOD', 'EPANET', 'SWMM', 'QGIS Environmental', 'GaBi LCA'],
            membersCount: 1110,
            fullOverview: 'Protección y regeneración de ecosistemas. Diseña plantas de tratamiento de aguas residuales avanzadas (MBR), digestores anaeróbicos para biometano y auditorías de huella de carbono neutra.',
            curriculum: ['Química Ambiental y Toxicología', 'Hidráulica de Redes Sanitarias y Drenaje', 'Tratamiento de Aguas y Lodos Residuales', 'Gestión Integral de Residuos Sólidos', 'Evaluación de Impacto Ambiental (EIA)'],
            salaryRange: '$54,000 - $125,000 USD / año',
            standardCode: 'ISO 14001 / EPA Standards'
        }
    ];

    // Renderizado dinámico de especialidades
    const disciplinesContainer = document.getElementById('disciplines-container');
    const searchInput = document.getElementById('engineering-search');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const filterChips = document.querySelectorAll('#discipline-filters .chip');

    let currentFilter = 'all';
    let searchQuery = '';

    function renderDisciplines() {
        if (!disciplinesContainer) return;
        disciplinesContainer.innerHTML = '';

        const filtered = engineeringDisciplines.filter(item => {
            const matchesFilter = currentFilter === 'all' || item.category === currentFilter;
            const query = searchQuery.toLowerCase().trim();
            const matchesSearch = !query || 
                item.title.toLowerCase().includes(query) || 
                item.desc.toLowerCase().includes(query) ||
                item.tools.some(t => t.toLowerCase().includes(query)) ||
                item.categoryLabel.toLowerCase().includes(query);
            return matchesFilter && matchesSearch;
        });

        if (filtered.length === 0) {
            disciplinesContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-subtle);">
                    <div style="font-size: 2.5rem; margin-bottom: 0.8rem;">🔍</div>
                    <h3 style="font-family: var(--font-heading); margin-bottom: 0.5rem;">No se encontraron especialidades</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">Prueba con otros términos de búsqueda como "AutoCAD", "Python", "Fluidos", "Energía", o limpia los filtros.</p>
                </div>
            `;
            return;
        }

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'discipline-card';
            card.innerHTML = `
                <div class="card-top">
                    <div class="disc-icon-badge">${item.icon}</div>
                    <span class="disc-category-tag">${item.categoryLabel}</span>
                </div>
                <h3 class="disc-title">${item.title}</h3>
                <p class="disc-desc">${item.desc}</p>
                <div class="tech-tags">
                    ${item.tools.map(tool => `<span class="tech-tag">${tool}</span>`).join('')}
                </div>
                <div class="card-footer-action">
                    <span class="disc-members"><strong>${item.membersCount.toLocaleString('es-ES')}</strong> Colegiados</span>
                    <button class="btn-card-details" data-id="${item.id}">Ficha Técnica ➔</button>
                </div>
            `;

            card.querySelector('.btn-card-details').addEventListener('click', () => {
                playTechSound('click');
                openSpecialtyModal(item);
            });

            disciplinesContainer.appendChild(card);
        });
    }

    renderDisciplines();

    // Filtros de categoría
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            playTechSound('click');
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentFilter = chip.getAttribute('data-filter');
            renderDisciplines();
        });
    });

    // Búsqueda en tiempo real
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            if (clearSearchBtn) {
                clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
            }
            renderDisciplines();
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchQuery = '';
            clearSearchBtn.style.display = 'none';
            renderDisciplines();
            searchInput.focus();
        });
    }

    /* Modal de Especialidad */
    const specialtyModal = document.getElementById('specialty-modal');
    const closeSpecialtyModalBtn = document.getElementById('close-specialty-modal');
    const specModalIcon = document.getElementById('spec-modal-icon');
    const specModalTitle = document.getElementById('spec-modal-title');
    const specModalCategory = document.getElementById('spec-modal-category');
    const specModalBody = document.getElementById('spec-modal-body');

    function openSpecialtyModal(item) {
        if (!specialtyModal) return;
        specModalIcon.textContent = item.icon;
        specModalTitle.textContent = item.title;
        specModalCategory.textContent = `${item.categoryLabel} // CÓDIGO: ${item.standardCode}`;
        
        specModalBody.innerHTML = `
            <p style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.2rem; color: var(--text-secondary);">${item.fullOverview}</p>
            
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 1rem; border: 1px solid var(--border-subtle); margin-bottom: 1.2rem;">
                <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-amber); margin-bottom: 0.4rem;">RANGO SALARIAL ESTIMADO EN LA INDUSTRIA:</div>
                <div style="font-family: var(--font-heading); font-size: 1.2rem; font-weight: 700; color: #ffffff;">${item.salaryRange}</div>
            </div>

            <div class="modal-section-h">NÚCLEO DE COMPETENCIAS & MALLA CURRICULAR:</div>
            <ul style="list-style: none; margin-bottom: 1.2rem; display: flex; flex-direction: column; gap: 0.4rem;">
                ${item.curriculum.map(c => `<li style="font-size: 0.86rem; color: var(--text-secondary); display:flex; align-items:center; gap:0.5rem;"><span style="color:var(--accent-cyan);">✦</span> ${c}</li>`).join('')}
            </ul>

            <div class="modal-section-h">SOFTWARE & TOOLSTACK OFICIAL EN EL PORTAL:</div>
            <div class="tech-tags" style="margin-bottom: 1.5rem;">
                ${item.tools.map(t => `<span class="tech-tag" style="background:rgba(0,240,255,0.1); border-color:var(--accent-cyan); color:var(--accent-cyan);">${t}</span>`).join('')}
            </div>

            <div style="display: flex; gap: 0.8rem; margin-top: 1.5rem;">
                <a href="#carnet" class="btn-calculate" style="flex:1; text-align:center; text-decoration:none;" onclick="document.getElementById('specialty-modal').classList.remove('active')">
                    <span>Acreditarme en esta Rama</span>
                </a>
                <button class="hud-mini-btn" onclick="document.getElementById('specialty-modal').classList.remove('active')">Cerrar</button>
            </div>
        `;

        specialtyModal.classList.add('active');
    }

    if (closeSpecialtyModalBtn && specialtyModal) {
        closeSpecialtyModalBtn.addEventListener('click', () => {
            specialtyModal.classList.remove('active');
        });
        specialtyModal.addEventListener('click', (e) => {
            if (e.target === specialtyModal) {
                specialtyModal.classList.remove('active');
            }
        });
    }

    /* ==========================================================================
       8. SUITE DE CÁLCULO LAB: MOTORES DE FÍSICA & MATEMÁTICAS
       ========================================================================== */
    const calcTabs = document.querySelectorAll('.calc-tab-btn');
    const calcPanels = document.querySelectorAll('.calc-panel');

    calcTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            playTechSound('click');
            const targetId = tab.getAttribute('data-tab');

            calcTabs.forEach(t => t.classList.remove('active'));
            calcPanels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    /* Calculadora 1: Resistencia de Materiales */
    const matSelect = document.getElementById('mat-select');
    const customEWrap = document.getElementById('custom-e-wrap');
    const customE = document.getElementById('custom-e');
    const forceLoad = document.getElementById('force-load');
    const areaSection = document.getElementById('area-section');
    const lengthInitial = document.getElementById('length-initial');
    const btnCalcMaterials = document.getElementById('btn-calc-materials');

    const resStress = document.getElementById('res-stress');
    const resStrain = document.getElementById('res-strain');
    const resDeltaL = document.getElementById('res-delta-l');
    const resNewtons = document.getElementById('res-newtons');
    const stressPill = document.getElementById('stress-safety-pill');
    const simBeamElement = document.getElementById('sim-beam-element');
    const arrowForceVal = document.getElementById('arrow-force-val');

    if (matSelect) {
        matSelect.addEventListener('change', () => {
            if (matSelect.value === 'custom') {
                customEWrap.style.display = 'block';
            } else {
                customEWrap.style.display = 'none';
            }
        });
    }

    function calculateMaterials() {
        playTechSound('compute');
        const force_kN = parseFloat(forceLoad.value) || 0;
        const area_mm2 = parseFloat(areaSection.value) || 1;
        const length_m = parseFloat(lengthInitial.value) || 1;

        let E_MPa = 200000;
        if (matSelect.value === 'custom') {
            E_MPa = parseFloat(customE.value) || 200000;
        } else {
            E_MPa = parseFloat(matSelect.value);
        }

        const force_N = force_kN * 1000;
        const stress_MPa = force_N / area_mm2; // N/mm2 = MPa
        const strain = stress_MPa / E_MPa;
        const length_mm = length_m * 1000;
        const deltaL_mm = strain * length_mm;

        resStress.textContent = `${stress_MPa.toFixed(2)} MPa`;
        resStrain.textContent = strain.toFixed(6);
        resDeltaL.textContent = `${deltaL_mm.toFixed(3)} mm`;
        resNewtons.textContent = `${force_N.toLocaleString('es-ES')} N`;
        if (arrowForceVal) arrowForceVal.textContent = force_kN;

        // Evaluación de seguridad
        if (stress_MPa < 150) {
            stressPill.textContent = 'ESTADO: RANGO ELÁSTICO SEGURO';
            stressPill.className = 'status-pill safe';
        } else if (stress_MPa < 250) {
            stressPill.textContent = 'ESTADO: ALTO ESFUERZO (PRECAUCIÓN)';
            stressPill.className = 'status-pill warn';
        } else {
            stressPill.textContent = 'ESTADO: FLUENCIA / RIESGO DE ROTURA';
            stressPill.className = 'status-pill danger';
        }

        // Efecto visual en la viga
        if (simBeamElement) {
            const stretchPercent = Math.min(100, Math.max(30, 50 + deltaL_mm * 15));
            simBeamElement.style.maxWidth = `${stretchPercent}%`;
            simBeamElement.style.background = stress_MPa > 200 ? 'linear-gradient(90deg, #991b1b, #ef4444)' : 'linear-gradient(90deg, #1e3a8a, #3b82f6)';
        }

        showToast(`Análisis completado: Esfuerzo ${stress_MPa.toFixed(1)} MPa`);
    }

    if (btnCalcMaterials) {
        btnCalcMaterials.addEventListener('click', calculateMaterials);
    }

    /* Calculadora 2: Fluidos & Reynolds */
    const fluidSelect = document.getElementById('fluid-select');
    const fluidVelocity = document.getElementById('fluid-velocity');
    const pipeDiameter = document.getElementById('pipe-diameter');
    const btnCalcReynolds = document.getElementById('btn-calc-reynolds');

    const resReynolds = document.getElementById('res-reynolds');
    const resCaudal = document.getElementById('res-caudal');
    const resPipeArea = document.getElementById('res-pipe-area');
    const resFluidDesc = document.getElementById('res-fluid-desc');
    const reynoldsPill = document.getElementById('reynolds-pill');
    const pipeRegimeText = document.getElementById('pipe-regime-text');

    const fluidProps = {
        water: { rho: 998, mu: 0.001002 },
        oil: { rho: 870, mu: 0.0400 },
        air: { rho: 1.204, mu: 0.000018 },
        gasoline: { rho: 740, mu: 0.00060 }
    };

    let currentReynoldsVal = 143417;

    function calculateReynolds() {
        playTechSound('compute');
        const fluid = fluidProps[fluidSelect.value] || fluidProps.water;
        const v = parseFloat(fluidVelocity.value) || 0;
        const d_mm = parseFloat(pipeDiameter.value) || 1;
        const d_m = d_mm / 1000;

        // Re = (rho * v * D) / mu
        const Re = (fluid.rho * v * d_m) / fluid.mu;
        currentReynoldsVal = Re;

        // Caudal Q = v * A
        const area_m2 = Math.PI * Math.pow(d_m / 2, 2);
        const Q_m3s = v * area_m2;
        const Q_Ls = Q_m3s * 1000;
        const Q_m3h = Q_m3s * 3600;

        resReynolds.textContent = Math.round(Re).toLocaleString('es-ES');
        resCaudal.textContent = `${Q_Ls.toFixed(2)} L/s (${Q_m3h.toFixed(1)} m³/h)`;
        resPipeArea.textContent = `${area_m2.toFixed(5)} m²`;

        if (Re < 2000) {
            reynoldsPill.textContent = 'LAMINAR';
            reynoldsPill.className = 'status-pill safe';
            resFluidDesc.textContent = 'Capas paralelas suaves sin vórtices';
            if (pipeRegimeText) pipeRegimeText.textContent = 'Flujo Laminar Estable (Re < 2000)';
        } else if (Re <= 4000) {
            reynoldsPill.textContent = 'TRANSICIÓN';
            reynoldsPill.className = 'status-pill warn';
            resFluidDesc.textContent = 'Inestabilidad intermitente y fluctuaciones';
            if (pipeRegimeText) pipeRegimeText.textContent = 'Zona Crítica de Transición (2000 - 4000)';
        } else {
            reynoldsPill.textContent = 'TURBULENTO';
            reynoldsPill.className = 'status-pill danger';
            resFluidDesc.textContent = 'Mezcla caótica, remolinos y alta fricción';
            if (pipeRegimeText) pipeRegimeText.textContent = 'Flujo Turbulento Pleno (Re > 4000)';
        }

        showToast(`Régimen de fluido: Re = ${Math.round(Re).toLocaleString('es-ES')}`);
    }

    if (btnCalcReynolds) {
        btnCalcReynolds.addEventListener('click', calculateReynolds);
    }

    // Canvas de Simulación de Partículas en Tubería
    const pipeCanvas = document.getElementById('pipe-particles-canvas');
    if (pipeCanvas) {
        const pCtx = pipeCanvas.getContext('2d');
        const numParticles = 60;
        const particles = [];

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * pipeCanvas.width,
                y: 10 + Math.random() * (pipeCanvas.height - 20),
                vx: 1 + Math.random() * 2,
                vy: 0,
                radius: 2 + Math.random() * 2,
                color: '#38bdf8'
            });
        }

        function animatePipe() {
            pCtx.fillStyle = 'rgba(2, 6, 23, 0.3)';
            pCtx.fillRect(0, 0, pipeCanvas.width, pipeCanvas.height);

            const isTurbulent = currentReynoldsVal > 4000;
            const isTransition = currentReynoldsVal >= 2000 && currentReynoldsVal <= 4000;

            particles.forEach(p => {
                let speedFactor = Math.max(0.5, Math.min(4, parseFloat(fluidVelocity.value) || 1));
                
                if (isTurbulent) {
                    p.vx = 2.5 * speedFactor;
                    p.vy += (Math.random() - 0.5) * 1.5;
                    p.color = '#ef4444';
                } else if (isTransition) {
                    p.vx = 1.8 * speedFactor;
                    p.vy += (Math.random() - 0.5) * 0.4;
                    p.color = '#f59e0b';
                } else {
                    // Laminar parabólico
                    p.vx = 1.2 * speedFactor;
                    p.vy *= 0.8;
                    p.color = '#10b981';
                }

                p.x += p.vx;
                p.y += p.vy;

                // Rebote en paredes superior/inferior
                if (p.y < 8) { p.y = 8; p.vy *= -1; }
                if (p.y > pipeCanvas.height - 8) { p.y = pipeCanvas.height - 8; p.vy *= -1; }

                // Reposicionar al entrar por la izquierda
                if (p.x > pipeCanvas.width) {
                    p.x = 0;
                    p.y = 8 + Math.random() * (pipeCanvas.height - 16);
                }

                pCtx.beginPath();
                pCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                pCtx.fillStyle = p.color;
                pCtx.fill();
            });

            requestAnimationFrame(animatePipe);
        }
        animatePipe();
    }

    /* Calculadora 3: Sistemas Eléctricos */
    const elecPower = document.getElementById('elec-power');
    const elecVoltage = document.getElementById('elec-voltage');
    const elecPf = document.getElementById('elec-pf');
    const btnCalcElectric = document.getElementById('btn-calc-electric');

    const resElecCurrent = document.getElementById('res-elec-current');
    const resElecS = document.getElementById('res-elec-s');
    const resElecQ = document.getElementById('res-elec-q');
    const resElecGauge = document.getElementById('res-elec-gauge');

    function calculateElectric() {
        playTechSound('compute');
        const P_kW = parseFloat(elecPower.value) || 0;
        const V = parseFloat(elecVoltage.value) || 208;
        const pf = parseFloat(elecPf.value) || 0.88;

        const P_W = P_kW * 1000;
        let I = 0;

        if (V === 120) {
            // Monofásico P = V * I * cos(phi)
            I = P_W / (V * pf);
        } else {
            // Trifásico P = sqrt(3) * V * I * cos(phi)
            I = P_W / (Math.sqrt(3) * V * pf);
        }

        const S_kVA = P_kW / pf;
        const Q_kVAR = Math.sqrt(Math.max(0, Math.pow(S_kVA, 2) - Math.pow(P_kW, 2)));

        resElecCurrent.textContent = `${I.toFixed(1)} A`;
        resElecS.textContent = `${S_kVA.toFixed(2)} kVA`;
        resElecQ.textContent = `${Q_kVAR.toFixed(2)} kVAR`;

        // Sugerencia de calibre según amperaje (NEC Cu 75°C)
        let gauge = 'AWG #14 Cu';
        if (I > 15 && I <= 20) gauge = 'AWG #12 Cu (20A)';
        else if (I > 20 && I <= 30) gauge = 'AWG #10 Cu (30A)';
        else if (I > 30 && I <= 50) gauge = 'AWG #8 Cu (50A)';
        else if (I > 50 && I <= 65) gauge = 'AWG #6 Cu (65A)';
        else if (I > 65 && I <= 85) gauge = 'AWG #4 Cu (85A)';
        else if (I > 85 && I <= 100) gauge = 'AWG #3 Cu (100A)';
        else if (I > 100 && I <= 115) gauge = 'AWG #2 Cu (115A)';
        else if (I > 115 && I <= 130) gauge = 'AWG #1 Cu (130A)';
        else if (I > 130 && I <= 150) gauge = 'AWG 1/0 Cu (150A)';
        else if (I > 150 && I <= 175) gauge = 'AWG 2/0 Cu (175A)';
        else if (I > 175 && I <= 200) gauge = 'AWG 3/0 Cu (200A)';
        else if (I > 200) gauge = 'AWG 250 kcmil Cu (> 200A)';

        resElecGauge.textContent = gauge;
        showToast(`Cálculo eléctrico: ${I.toFixed(1)} Amperios, ${gauge}`);
    }

    if (btnCalcElectric) {
        btnCalcElectric.addEventListener('click', calculateElectric);
    }

    /* Calculadora 4: Software SLA */
    const slaSelect = document.getElementById('sla-select');
    const softRps = document.getElementById('soft-rps');
    const softPayload = document.getElementById('soft-payload');
    const btnCalcSoftware = document.getElementById('btn-calc-software');

    const resDowntimeYear = document.getElementById('res-downtime-year');
    const resDowntimeMonth = document.getElementById('res-downtime-month');
    const resSoftBandwidth = document.getElementById('res-soft-bandwidth');
    const resSoftNodes = document.getElementById('res-soft-nodes');

    function calculateSoftwareSLA() {
        playTechSound('compute');
        const slaPercent = parseFloat(slaSelect.value) || 99.9;
        const rps = parseFloat(softRps.value) || 1000;
        const payloadKB = parseFloat(softPayload.value) || 10;

        const availabilityFraction = slaPercent / 100;
        const downtimeFraction = 1 - availabilityFraction;

        const secondsInYear = 365.25 * 24 * 3600;
        const downtimeYearSec = downtimeFraction * secondsInYear;
        const downtimeMonthSec = downtimeFraction * (30.4 * 24 * 3600);

        function formatDowntime(seconds) {
            if (seconds >= 3600) {
                const hours = Math.floor(seconds / 3600);
                const mins = Math.round((seconds % 3600) / 60);
                return `${hours}h ${mins}min`;
            } else if (seconds >= 60) {
                const mins = Math.floor(seconds / 60);
                const secs = Math.round(seconds % 60);
                return `${mins}min ${secs}s`;
            } else {
                return `${seconds.toFixed(2)} segundos`;
            }
        }

        resDowntimeYear.textContent = formatDowntime(downtimeYearSec);
        resDowntimeMonth.textContent = formatDowntime(downtimeMonthSec);

        // Throughput = RPS * Payload * 8 bits
        const throughputMbps = (rps * payloadKB * 8) / 1024;
        if (throughputMbps >= 1000) {
            resSoftBandwidth.textContent = `${(throughputMbps / 1000).toFixed(2)} Gbps`;
        } else {
            resSoftBandwidth.textContent = `${throughputMbps.toFixed(1)} Mbps`;
        }

        // Estimación de Pods K8s (asumiendo 800 RPS seguros por pod c6i.2xlarge)
        const podsNeeded = Math.max(3, Math.ceil(rps / 800 * 1.3)); // 30% overhead
        resSoftNodes.textContent = `${podsNeeded} Pods K8s (c6i.2xlarge)`;

        showToast(`Arquitectura calculada: ${slaPercent}% SLA (${podsNeeded} Pods)`);
    }

    if (btnCalcSoftware) {
        btnCalcSoftware.addEventListener('click', calculateSoftwareSLA);
    }

    /* ==========================================================================
       9. SIMULADOR BLUEPRINT CAD INTERACTIVO
       ========================================================================== */
    const cadCanvas = document.getElementById('interactive-cad-canvas');
    if (cadCanvas) {
        const cCtx = cadCanvas.getContext('2d');
        let currentLayer = 'structure';
        let showGrid = true;
        let showNodes = true;
        let activeLoadKN = 150;

        const loadSlider = document.getElementById('cad-load-slider');
        const loadValDisplay = document.getElementById('cad-load-val');
        const hudMaxDisp = document.getElementById('hud-max-disp');
        const hudFos = document.getElementById('hud-fos');

        if (loadSlider) {
            loadSlider.addEventListener('input', (e) => {
                activeLoadKN = parseInt(e.target.value);
                if (loadValDisplay) loadValDisplay.textContent = activeLoadKN;
                updateCadHUD();
            });
        }

        // Botones de capa
        document.querySelectorAll('.cad-tool-btn[data-layer]').forEach(btn => {
            btn.addEventListener('click', () => {
                playTechSound('click');
                document.querySelectorAll('.cad-tool-btn[data-layer]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentLayer = btn.getAttribute('data-layer');
            });
        });

        const gridToggle = document.getElementById('btn-cad-grid-toggle');
        if (gridToggle) {
            gridToggle.addEventListener('click', () => {
                showGrid = !showGrid;
                gridToggle.classList.toggle('active', showGrid);
                playTechSound('click');
            });
        }

        const nodesToggle = document.getElementById('btn-cad-nodes-toggle');
        if (nodesToggle) {
            nodesToggle.addEventListener('click', () => {
                showNodes = !showNodes;
                nodesToggle.classList.toggle('active', showNodes);
                playTechSound('click');
            });
        }

        const resetBtn = document.getElementById('btn-cad-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                activeLoadKN = 150;
                if (loadSlider) loadSlider.value = 150;
                if (loadValDisplay) loadValDisplay.textContent = 150;
                updateCadHUD();
                playTechSound('click');
                showToast('Parámetros CAD restablecidos');
            });
        }

        function updateCadHUD() {
            const disp = (activeLoadKN * 0.016).toFixed(2);
            const fos = (450 / activeLoadKN).toFixed(2);
            if (hudMaxDisp) hudMaxDisp.textContent = `${disp} mm`;
            if (hudFos) {
                hudFos.textContent = `${fos} ${fos > 1.8 ? 'OK' : 'ALERTA'}`;
                hudFos.style.color = fos > 1.8 ? 'var(--accent-emerald)' : 'var(--accent-crimson)';
            }
        }

        // Estructura de Cercha 2D (Truss Nodes)
        const nodes = [
            { x: 150, y: 380, fixed: true, label: 'N1 (Apoyo Fijo)' },
            { x: 350, y: 380, label: 'N2' },
            { x: 550, y: 380, label: 'N3 (Centro)' },
            { x: 750, y: 380, label: 'N4' },
            { x: 950, y: 380, fixed: true, label: 'N5 (Apoyo Móvil)' },
            { x: 250, y: 200, label: 'N6' },
            { x: 450, y: 150, topLoad: true, label: 'N7 (Punto Carga)' },
            { x: 650, y: 150, topLoad: true, label: 'N8 (Punto Carga)' },
            { x: 850, y: 200, label: 'N9' }
        ];

        const bars = [
            // Cuerda inferior
            [0, 1], [1, 2], [2, 3], [3, 4],
            // Cuerda superior
            [5, 6], [6, 7], [7, 8],
            // Diagonales y montantes
            [0, 5], [1, 5], [1, 6], [2, 6], [2, 7], [3, 7], [3, 8], [4, 8]
        ];

        let selectedNode = null;

        cadCanvas.addEventListener('mousedown', (e) => {
            const rect = cadCanvas.getBoundingClientRect();
            const scaleX = cadCanvas.width / rect.width;
            const scaleY = cadCanvas.height / rect.height;
            const clickX = (e.clientX - rect.left) * scaleX;
            const clickY = (e.clientY - rect.top) * scaleY;

            nodes.forEach(n => {
                if (Math.hypot(n.x - clickX, n.y - clickY) < 22) {
                    selectedNode = n;
                    playTechSound('click');
                    showToast(`Nodo seleccionado: ${n.label}`);
                }
            });
        });

        window.addEventListener('mouseup', () => { selectedNode = null; });

        cadCanvas.addEventListener('mousemove', (e) => {
            if (!selectedNode || selectedNode.fixed) return;
            const rect = cadCanvas.getBoundingClientRect();
            const scaleX = cadCanvas.width / rect.width;
            const scaleY = cadCanvas.height / rect.height;
            selectedNode.x = (e.clientX - rect.left) * scaleX;
            selectedNode.y = (e.clientY - rect.top) * scaleY;
        });

        let cadAnimationTime = 0;

        function renderCadCanvas() {
            cadAnimationTime += 0.03;
            cCtx.fillStyle = '#040812';
            cCtx.fillRect(0, 0, cadCanvas.width, cadCanvas.height);

            // 1. Grilla Técnica Blueprint
            if (showGrid) {
                cCtx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
                cCtx.lineWidth = 1;
                for (let x = 0; x < cadCanvas.width; x += 40) {
                    cCtx.beginPath(); cCtx.moveTo(x, 0); cCtx.lineTo(x, cadCanvas.height); cCtx.stroke();
                }
                for (let y = 0; y < cadCanvas.height; y += 40) {
                    cCtx.beginPath(); cCtx.moveTo(0, y); cCtx.lineTo(cadCanvas.width, y); cCtx.stroke();
                }
            }

            // 2. Capa seleccionada
            if (currentLayer === 'structure' || currentLayer === 'stress') {
                // Dibujar Barras
                bars.forEach(([i, j]) => {
                    const n1 = nodes[i];
                    const n2 = nodes[j];

                    cCtx.beginPath();
                    cCtx.moveTo(n1.x, n1.y);
                    cCtx.lineTo(n2.x, n2.y);

                    if (currentLayer === 'stress') {
                        // Mapa de calor según deformación/tensión
                        const isCentral = (i === 6 || j === 6 || i === 7 || j === 7 || i === 2 || j === 2);
                        const stressRatio = (activeLoadKN / 500) * (isCentral ? 1.4 : 0.6);
                        if (stressRatio > 0.8) {
                            cCtx.strokeStyle = '#ef4444'; // Compresión crítica
                            cCtx.lineWidth = 6;
                        } else if (stressRatio > 0.45) {
                            cCtx.strokeStyle = '#f59e0b'; // Esfuerzo medio
                            cCtx.lineWidth = 4.5;
                        } else {
                            cCtx.strokeStyle = '#00f0ff'; // Esfuerzo bajo
                            cCtx.lineWidth = 3;
                        }
                    } else {
                        cCtx.strokeStyle = 'rgba(0, 240, 255, 0.7)';
                        cCtx.lineWidth = 3;
                    }
                    cCtx.stroke();
                });

                // Flechas de Carga Puntual
                nodes.forEach(n => {
                    if (n.topLoad) {
                        const arrowLen = Math.min(80, activeLoadKN * 0.2 + 25);
                        cCtx.strokeStyle = '#f59e0b';
                        cCtx.lineWidth = 3;
                        cCtx.beginPath();
                        cCtx.moveTo(n.x, n.y - arrowLen);
                        cCtx.lineTo(n.x, n.y - 6);
                        cCtx.stroke();

                        // Punta de flecha
                        cCtx.fillStyle = '#f59e0b';
                        cCtx.beginPath();
                        cCtx.moveTo(n.x - 6, n.y - 12);
                        cCtx.lineTo(n.x + 6, n.y - 12);
                        cCtx.lineTo(n.x, n.y - 2);
                        cCtx.fill();

                        cCtx.fillStyle = '#f59e0b';
                        cCtx.font = '11px JetBrains Mono';
                        cCtx.fillText(`${activeLoadKN} kN`, n.x - 18, n.y - arrowLen - 6);
                    }
                });

                // Dibujar Nodos
                if (showNodes) {
                    nodes.forEach(n => {
                        cCtx.beginPath();
                        cCtx.arc(n.x, n.y, 8, 0, Math.PI * 2);
                        cCtx.fillStyle = n.fixed ? '#94a3b8' : '#00f0ff';
                        cCtx.fill();
                        cCtx.strokeStyle = '#ffffff';
                        cCtx.lineWidth = 2;
                        cCtx.stroke();

                        // Etiqueta
                        cCtx.fillStyle = '#94a3b8';
                        cCtx.font = '10px JetBrains Mono';
                        cCtx.fillText(n.label, n.x - 12, n.y + 20);
                    });
                }
            } else if (currentLayer === 'fluids') {
                // Capa Hidráulica animada con gradientes
                cCtx.strokeStyle = 'rgba(14, 165, 233, 0.4)';
                cCtx.lineWidth = 24;
                cCtx.lineCap = 'round';
                cCtx.beginPath();
                cCtx.moveTo(150, 250);
                cCtx.lineTo(400, 250);
                cCtx.lineTo(600, 360);
                cCtx.lineTo(950, 360);
                cCtx.stroke();

                // Ondas internas de presión
                cCtx.strokeStyle = '#00f0ff';
                cCtx.lineWidth = 4;
                cCtx.setLineDash([15, 15]);
                cCtx.lineDashOffset = -cadAnimationTime * 50;
                cCtx.beginPath();
                cCtx.moveTo(150, 250);
                cCtx.lineTo(400, 250);
                cCtx.lineTo(600, 360);
                cCtx.lineTo(950, 360);
                cCtx.stroke();
                cCtx.setLineDash([]); // Reset

                cCtx.fillStyle = '#38bdf8';
                cCtx.font = '12px JetBrains Mono';
                cCtx.fillText('TUBERÍA PRINCIPAL DN-200 · PRESIÓN = 6.4 BAR', 200, 230);
                cCtx.fillText('VÁLVULA REGULADORA DE FLUJO // ACTIVA', 620, 340);
            } else if (currentLayer === 'circuit') {
                // Capa Lógica y Bus Eléctrico
                cCtx.strokeStyle = '#10b981';
                cCtx.lineWidth = 2;
                for (let i = 0; i < 5; i++) {
                    const y = 180 + i * 50;
                    cCtx.beginPath();
                    cCtx.moveTo(160, y);
                    cCtx.lineTo(920, y);
                    cCtx.stroke();

                    // Micro-pulsos de datos que viajan
                    const pulseX = 160 + ((cadAnimationTime * 140 + i * 160) % 760);
                    cCtx.fillStyle = '#ffffff';
                    cCtx.fillRect(pulseX - 4, y - 4, 8, 8);
                }
                cCtx.fillStyle = '#10b981';
                cCtx.font = '12px JetBrains Mono';
                cCtx.fillText('BUS DE CONTROL SCADA / MODBUS TCP // 1000 Mbps', 180, 160);
            }

            requestAnimationFrame(renderCadCanvas);
        }
        renderCadCanvas();
    }

    /* ==========================================================================
       10. DIRECTORIO DE INGENIEROS TOP
       ========================================================================== */
    const eliteEngineers = [
        {
            name: 'Ing. Joendri Albarran',
            role: 'Fundador & Director Ejecutivo',
            discipline: 'Software',
            disciplineFull: 'Ingeniería de Software & IA',
            country: 'Venezuela',
            bio: 'Arquitecto principal de sistemas de alta disponibilidad, especialista en modelado de simulación y visión computacional.',
            projects: '34 Proyectos / 8 Patentes',
            initials: 'JA'
        },
        {
            name: 'Dra. Elena Vasconcelos',
            role: 'Ingeniera Estructural Senior',
            discipline: 'Civil',
            disciplineFull: 'Ingeniería Civil & Estructural',
            country: 'España',
            bio: 'Líder en diseño sismorresistente de puentes atirantados y normativas eurocódigos para infraestructuras de transporte.',
            projects: '19 Megaobras Internacionales',
            initials: 'EV'
        },
        {
            name: 'Dr. Klaus Becker',
            role: 'Director de Propulsión',
            discipline: 'Aeroespacial',
            disciplineFull: 'Ingeniería Aeroespacial',
            country: 'Alemania',
            bio: 'Especialista en turbomaquinaria criogénica, toberas de cohetes espaciales y dinámica de gases hipersónicos.',
            projects: '12 Misiones LEO / ESA',
            initials: 'KB'
        },
        {
            name: 'Ing. Carlos A. Domínguez',
            role: 'Especialista en Microrredes',
            discipline: 'Eléctrica',
            disciplineFull: 'Ingeniería Eléctrica & Energía',
            country: 'México',
            bio: 'Consultor de Smart Grids para plantas solares de 400 MW y estabilización de redes eléctricas industriales.',
            projects: '28 Subestaciones Energizadas',
            initials: 'CD'
        },
        {
            name: 'Dra. Sofía Restrepo',
            role: 'Investigadora en Bioingeniería',
            discipline: 'Biomédica',
            disciplineFull: 'Ingeniería Biomédica',
            country: 'Colombia',
            bio: 'Diseñadora de interfaces cerebro-máquina y prótesis microelectrónicas biocompatibles de última generación.',
            projects: '6 Patentes Médicas FDA',
            initials: 'SR'
        },
        {
            name: 'Ing. Robert Chen',
            role: 'Líder de Robótica Industrial',
            discipline: 'Mecánica',
            disciplineFull: 'Ingeniería Mecánica & Robótica',
            country: 'Estados Unidos',
            bio: 'Arquitecto de brazos robóticos de 6 ejes de ultra-precisión para ensamblaje de semiconductores limpios.',
            projects: '42 Líneas Robotizadas',
            initials: 'RC'
        }
    ];

    const engineersContainer = document.getElementById('engineers-container');
    const memberSearch = document.getElementById('member-search');
    const memberDisciplineFilter = document.getElementById('member-discipline-filter');
    const memberCountryFilter = document.getElementById('member-country-filter');

    function renderEngineers() {
        if (!engineersContainer) return;
        engineersContainer.innerHTML = '';

        const query = memberSearch ? memberSearch.value.toLowerCase().trim() : '';
        const discFilter = memberDisciplineFilter ? memberDisciplineFilter.value : 'all';
        const countryFilter = memberCountryFilter ? memberCountryFilter.value : 'all';

        const filtered = eliteEngineers.filter(eng => {
            const matchesQuery = !query || eng.name.toLowerCase().includes(query) || eng.country.toLowerCase().includes(query) || eng.disciplineFull.toLowerCase().includes(query);
            const matchesDisc = discFilter === 'all' || eng.discipline === discFilter;
            const matchesCountry = countryFilter === 'all' || eng.country === countryFilter;
            return matchesQuery && matchesDisc && matchesCountry;
        });

        if (filtered.length === 0) {
            engineersContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);">
                    No se encontraron ingenieros con los criterios especificados.
                </div>
            `;
            return;
        }

        filtered.forEach(eng => {
            const card = document.createElement('div');
            card.className = 'engineer-card';
            card.innerHTML = `
                <div>
                    <div class="eng-head">
                        <div class="eng-avatar">${eng.initials}</div>
                        <div>
                            <h4 class="eng-name">${eng.name}</h4>
                            <span class="eng-country">📍 ${eng.country} · ${eng.role}</span>
                        </div>
                    </div>
                    <span class="eng-discipline-tag">${eng.disciplineFull}</span>
                    <p class="eng-bio">${eng.bio}</p>
                </div>
                <div>
                    <div class="eng-projects">TRAYECTORIA: <strong>${eng.projects}</strong></div>
                    <button class="btn-eng-contact" data-name="${eng.name}">Conectar / Ver Perfil</button>
                </div>
            `;

            card.querySelector('.btn-eng-contact').addEventListener('click', () => {
                playTechSound('click');
                showToast(`Solicitud de conexión enviada a ${eng.name}`);
            });

            engineersContainer.appendChild(card);
        });
    }

    renderEngineers();

    if (memberSearch) memberSearch.addEventListener('input', renderEngineers);
    if (memberDisciplineFilter) memberDisciplineFilter.addEventListener('change', renderEngineers);
    if (memberCountryFilter) memberCountryFilter.addEventListener('change', renderEngineers);

    /* ==========================================================================
       11. BOLSA DE PROYECTOS Y LICITACIONES
       ========================================================================== */
    const initialTenders = [
        {
            title: 'Cálculo Sísmico y Modelado BIM de Viaducto Atirantado 1.4 km',
            discipline: 'Ingeniería Civil & Estructural',
            budget: '$280,000 USD',
            status: 'open',
            statusLabel: 'Licitación Abierta',
            desc: 'Modelado no lineal y análisis tiempo-historia con SAP2000 / CYPE. Entrega de planos ejecutivos conforme a Eurocódigo y AASHTO LRFD.',
            date: 'Plazo: 45 días'
        },
        {
            title: 'Arquitectura Cloud Multi-Región Zero-Trust para Telemetría Satelital',
            discipline: 'Ingeniería de Software & IA',
            budget: '$145,000 USD',
            status: 'open',
            statusLabel: 'Licitación Abierta',
            desc: 'Despliegue de clúster Kubernetes con streaming gRPC de 400k eventos/segundo y almacenamiento en base de datos temporal distribuida.',
            date: 'Plazo: 30 días'
        },
        {
            title: 'Diseño Térmico y Simulación CFD de Colector de Escape de Turbina',
            discipline: 'Ingeniería Mecánica & Fluidos',
            budget: '$95,000 USD',
            status: 'review',
            statusLabel: 'En Evaluación Técnica',
            desc: 'Análisis acoplado termomecánico en aleación Inconel 718 a 950°C mediante ANSYS Fluent con criterio de fatiga de bajo ciclo.',
            date: 'Plazo: 20 días'
        }
    ];

    const projectsFeed = document.getElementById('projects-feed');

    function renderTenders() {
        if (!projectsFeed) return;
        projectsFeed.innerHTML = '';

        initialTenders.forEach(proj => {
            const card = document.createElement('div');
            card.className = 'project-item-card';
            card.innerHTML = `
                <div class="proj-info-col">
                    <div class="proj-meta-bar">
                        <span class="proj-badge-status ${proj.status}">${proj.statusLabel}</span>
                        <span class="proj-discipline">${proj.discipline}</span>
                        <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted);">${proj.date}</span>
                    </div>
                    <h3 class="proj-title">${proj.title}</h3>
                    <p class="proj-desc">${proj.desc}</p>
                </div>
                <div class="proj-action-col">
                    <div class="proj-budget">${proj.budget}</div>
                    <button class="btn-apply-tender">Postular Equipo ➔</button>
                </div>
            `;

            card.querySelector('.btn-apply-tender').addEventListener('click', () => {
                playTechSound('click');
                showToast(`Postulación iniciada para: ${proj.title.substring(0, 30)}...`);
            });

            projectsFeed.appendChild(card);
        });
    }

    renderTenders();

    // Modal de Publicación de Licitación
    const tenderModal = document.getElementById('tender-modal');
    const openTenderModalBtn = document.getElementById('btn-open-tender-modal');
    const closeTenderModalBtn = document.getElementById('close-tender-modal');
    const tenderSubmitForm = document.getElementById('tender-submit-form');

    if (openTenderModalBtn && tenderModal) {
        openTenderModalBtn.addEventListener('click', () => {
            playTechSound('click');
            tenderModal.classList.add('active');
        });
    }

    if (closeTenderModalBtn && tenderModal) {
        closeTenderModalBtn.addEventListener('click', () => {
            tenderModal.classList.remove('active');
        });
        tenderModal.addEventListener('click', (e) => {
            if (e.target === tenderModal) tenderModal.classList.remove('active');
        });
    }

    if (tenderSubmitForm) {
        tenderSubmitForm.addEventListener('submit', (e) => {
            e.preventDefault();
            playTechSound('badge');

            const title = document.getElementById('tender-title').value;
            const disc = document.getElementById('tender-discipline').value;
            const budget = document.getElementById('tender-budget').value;
            const desc = document.getElementById('tender-desc').value;

            initialTenders.unshift({
                title,
                discipline: disc,
                budget,
                status: 'open',
                statusLabel: 'Licitación Abierta',
                desc,
                date: 'Recién Publicada'
            });

            renderTenders();
            tenderModal.classList.remove('active');
            tenderSubmitForm.reset();
            showToast('Licitación registrada y distribuida en la red global');
        });
    }

    /* ==========================================================================
       12. GENERADOR DE CARNET DIGITAL 3D (CREDENCIAL OFICIAL)
       ========================================================================== */
    const registerForm = document.getElementById('engineer-register-form');
    const regName = document.getElementById('reg-name');
    const regDiscipline = document.getElementById('reg-discipline');
    const regCountry = document.getElementById('reg-country');
    const regLicense = document.getElementById('reg-license');
    const regLevel = document.getElementById('reg-level');

    const badgeDisplayName = document.getElementById('badge-display-name');
    const badgeDisplayDiscipline = document.getElementById('badge-display-discipline');
    const badgeDisplayRank = document.getElementById('badge-display-rank');
    const badgeDisplayId = document.getElementById('badge-display-id');
    const badgeDisplayCountry = document.getElementById('badge-display-country');
    const badgeAvatarDisplay = document.getElementById('badge-avatar-display');

    function syncBadgeData() {
        const name = regName.value || 'Ing. Colegiado';
        badgeDisplayName.textContent = name;
        badgeDisplayDiscipline.textContent = regDiscipline.value;
        badgeDisplayRank.textContent = regLevel.value;
        badgeDisplayId.textContent = regLicense.value || `ALB-${Math.floor(100000 + Math.random() * 900000)}`;
        badgeDisplayCountry.textContent = regCountry.value;

        // Generar Iniciales
        const cleanName = name.replace(/^(ing\.|lic\.|dr\.|dra\.)\s*/i, '');
        const parts = cleanName.trim().split(/\s+/);
        let initials = 'EN';
        if (parts.length >= 2) {
            initials = (parts[0][0] + parts[1][0]).toUpperCase();
        } else if (parts.length === 1 && parts[0].length >= 2) {
            initials = parts[0].substring(0, 2).toUpperCase();
        }
        if (badgeAvatarDisplay) badgeAvatarDisplay.textContent = initials;
    }

    // Sincronización reactiva inmediata
    [regName, regDiscipline, regCountry, regLicense, regLevel].forEach(input => {
        if (input) {
            input.addEventListener('input', syncBadgeData);
            input.addEventListener('change', syncBadgeData);
        }
    });

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            playTechSound('badge');
            syncBadgeData();
            showToast('¡Credencial Oficial de Ingeniero verificada y emitida!');

            // Efecto de pulso en el carnet
            const idCard = document.getElementById('official-id-card');
            if (idCard) {
                idCard.style.boxShadow = '0 0 60px var(--accent-cyan)';
                setTimeout(() => {
                    idCard.style.boxShadow = '';
                }, 1000);
            }
        });
    }

    // Botones de acción del carnet
    const btnPrintBadge = document.getElementById('btn-print-badge');
    const btnDownloadBadge = document.getElementById('btn-download-badge');
    const btnShareBadge = document.getElementById('btn-share-badge');

    if (btnPrintBadge) {
        btnPrintBadge.addEventListener('click', () => {
            playTechSound('click');
            window.print();
        });
    }

    if (btnDownloadBadge) {
        btnDownloadBadge.addEventListener('click', () => {
            playTechSound('badge');
            showToast('Generando archivo digital de credencial (PDF/PNG)... Listo');
        });
    }

    if (btnShareBadge) {
        btnShareBadge.addEventListener('click', () => {
            playTechSound('click');
            const license = badgeDisplayId ? badgeDisplayId.textContent : 'VERIFIED';
            const shareUrl = `${window.location.origin}${window.location.pathname}?verify=${encodeURIComponent(license)}`;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(shareUrl).then(() => {
                    showToast('Enlace de verificación copiado al portapapeles');
                });
            } else {
                showToast(`Enlace de verificación: ${shareUrl}`);
            }
        });
    }

    /* ==========================================================================
       13. SISTEMA DE NOTIFICACIONES HUD TOAST
       ========================================================================== */
    const hudToast = document.getElementById('hud-toast');
    const toastMsg = document.getElementById('toast-msg');
    let toastTimeout = null;

    function showToast(message) {
        if (!hudToast || !toastMsg) return;
        toastMsg.textContent = message;
        hudToast.classList.add('show');

        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            hudToast.classList.remove('show');
        }, 3400);
    }

    /* Interacción con nodos del radar del Hero */
    document.querySelectorAll('.radar-node').forEach(node => {
        node.addEventListener('click', () => {
            playTechSound('click');
            const tip = node.getAttribute('data-tip') || 'Especialidad';
            showToast(`Nodo seleccionado: ${tip}`);
            const specSection = document.getElementById('especialidades');
            if (specSection) {
                specSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
