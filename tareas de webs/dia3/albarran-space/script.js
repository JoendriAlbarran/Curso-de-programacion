/**
 * ==========================================================================
 * ALBARRAN-X AEROSPACE - FLIGHT LOGIC & TELEMETRY ENGINE
 * Dirección General: Joendri Albarran
 * Canvas Starfield, Simulador de Despegue, Síntesis de Sonido Web Audio API
 * ==========================================================================
 */

// ==========================================================================
// 1. BASE DE DATOS DE LA FLOTA ESPACIAL
// ==========================================================================
const VEHICLES_DATA = {
    heavy: {
        name: "ALBARRAN HEAVY",
        sub: "PROPULSOR PESADO TOTALMENTE REUTILIZABLE",
        desc: "El vehículo de lanzamiento orbital más potente del mundo en servicio activo. Diseñado bajo la supervisión de Joendri Albarran para desplegar megaconstelaciones satelitales y módulos de estaciones espaciales con retorno vertical sobre barcaza marina.",
        image: "https://images.unsplash.com/photo-1517976487507-5b3b4b45f917?auto=format&fit=crop&w=1000&q=80",
        specs: [
            { name: "Altura Total", val: "70.0 metros" },
            { name: "Diámetro del Núcleo", val: "3.7 metros (12.2m envergadura)" },
            { name: "Masa al Despegue", val: "1.420 Toneladas métricas" },
            { name: "Carga Útil a Órbita Baja (LEO)", val: "150.000 kg" },
            { name: "Carga a Órbita Geoestacionaria (GTO)", val: "26.700 kg" },
            { name: "Motores de Primera Etapa", val: "27 Raptor-X Criogénicos CH4/LOX" },
            { name: "Empuje al Nivel del Mar", val: "22.819 kN (5.1 millones lbf)" },
            { name: "Historial de Reutilización", val: "Hasta 22 vuelos por booster" }
        ]
    },
    ares: {
        name: "ARES-I MARS SHIP",
        sub: "SISTEMA DE TRANSPORTE INTERPLANETARIO PESADO",
        desc: "La nave espacial de segunda etapa de acero inoxidable diseñada para transportar hasta 100 exploradores y 150 toneladas de carga útil a la superficie de Marte, con capacidad de reabastecimiento criogénico en órbita terrestre.",
        image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1000&q=80",
        specs: [
            { name: "Altura del Sistema Completo", val: "122.0 metros" },
            { name: "Diámetro de Fuselaje", val: "9.0 metros continuos" },
            { name: "Capacidad de Pasajeros", val: "100 astronautas y científicos" },
            { name: "Carga Útil a la Superficie de Marte", val: "100.000 kg (Reabastecida)" },
            { name: "Motores Principales", val: "33 Raptor-X en Super Heavy + 6 en Ares" },
            { name: "Empuje de Despegue", val: "74.500 kN (16.7 millones lbf)" },
            { name: "Propelente", val: "Metano y Oxígeno Líquido (ISRU apto)" },
            { name: "Protección Térmica", val: "18.000 losetas hexagonales de silicio" }
        ]
    },
    valkyrie: {
        name: "VALKYRIE CREW CAPSULE",
        sub: "CÁPSULA TRIPULADA AUTÓNOMA CON CÚPULA PANORÁMICA",
        desc: "Diseñada para misiones a la Estación Espacial Internacional y vuelos orbitales privados. Cuenta con propulsión de escape de emergencia SuperDraco integrada y una cúpula panorámica de vidrio borosilicato que brinda una vista de 360 grados de la Tierra.",
        image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1000&q=80",
        specs: [
            { name: "Altura de Cápsula", val: "8.1 metros" },
            { name: "Diámetro de Cabina", val: "4.0 metros" },
            { name: "Capacidad de Tripulación", val: "Hasta 7 astronautas" },
            { name: "Autonomía en Vuelo Libre", val: "10 días (hasta 210 días acoplada)" },
            { name: "Sistema de Escape de Lanzamiento", val: "8 Motores SuperDraco de empuje vectorizado" },
            { name: "Tiempo de Respuesta de Escape", val: "100 milisegundos ante anomalías" },
            { name: "Paracaídas de Aterrizaje", val: "4 paracaídas principales de kevlar" },
            { name: "Pantallas de Control", val: "Interfaz táctil de triple redundancia" }
        ]
    },
    lunar: {
        name: "LUNAR HOPPER ARTEMIS",
        sub: "MÓDULO DE DESCENSO Y EXPLORACIÓN LUNAR",
        desc: "Desarrollado para alunizajes de alta precisión en terrenos irregulares del polo sur lunar. Su diseño de centro de gravedad bajo y patas hidráulicas activas permite posarse sobre pendientes de hasta 15 grados cerca de cráteres de hielo.",
        image: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=1000&q=80",
        specs: [
            { name: "Altura en Configuración Lunar", val: "50.0 metros" },
            { name: "Capacidad de Carga a la Luna", val: "45.000 kg" },
            { name: "Tripulación en Superficie", val: "4 astronautas durante 30 días" },
            { name: "Sensores de Navegación", val: "LiDAR 3D de evasión de rocas y cráteres" },
            { name: "Esclusa de Descompresión", val: "Doble cámara con mitigación de regolito" },
            { name: "Generación Eléctrica", val: "Celdas solares fotovoltaicas de arseniuro de galio" }
        ]
    }
};

// ==========================================================================
// 2. SISTEMA DE AUDIO SINTETIZADO (WEB AUDIO API)
// ==========================================================================
class SpaceSoundFX {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // Beep militar de cuenta regresiva
    playCountdownBeep(highPitch = false) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(highPitch ? 880 : 440, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.2);
    }

    // Rugido y resonancia baja de motores Raptor
    playEngineRumble(duration = 3) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        // Ruido marrón / rosa filtrado
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;

        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            data[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = data[i];
            data[i] *= 3.5; // Gain
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(120, this.ctx.currentTime);
        filter.frequency.linearRampToValueAtTime(260, this.ctx.currentTime + (duration * 0.5));
        filter.frequency.linearRampToValueAtTime(80, this.ctx.currentTime + duration);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start();
    }

    // Tono de éxito de inserción orbital o aterrizaje
    playSuccessChime() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const time = this.ctx.currentTime + (idx * 0.1);

            osc.type = "triangle";
            osc.frequency.setValueAtTime(freq, time);

            gain.gain.setValueAtTime(0.15, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(time);
            osc.stop(time + 0.45);
        });
    }

    // Alarma de abortar
    playAbortAlarm() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        for (let i = 0; i < 3; i++) {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const time = this.ctx.currentTime + (i * 0.25);

            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(600, time);
            osc.frequency.linearRampToValueAtTime(300, time + 0.2);

            gain.gain.setValueAtTime(0.2, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(time);
            osc.stop(time + 0.22);
        }
    }
}

const SoundSystem = new SpaceSoundFX();

// ==========================================================================
// 3. CANVAS DE ESTRELLAS INTERACTIVO
// ==========================================================================
function initSpaceCanvas() {
    const canvas = document.getElementById("space-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const stars = [];
    const NUM_STARS = 180;

    for (let i = 0; i < NUM_STARS; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.4,
            alpha: Math.random() * 0.8 + 0.2,
            speed: Math.random() * 0.3 + 0.05,
            twinkleSpeed: Math.random() * 0.02 + 0.005
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let s of stars) {
            s.alpha += s.twinkleSpeed;
            if (s.alpha > 1 || s.alpha < 0.2) s.twinkleSpeed = -s.twinkleSpeed;

            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, s.alpha))})`;
            ctx.shadowBlur = s.radius > 1.2 ? 6 : 0;
            ctx.shadowColor = "#00e5ff";
            ctx.fill();

            // Desplazamiento sutil
            s.y -= s.speed;
            if (s.y < 0) {
                s.y = height;
                s.x = Math.random() * width;
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// ==========================================================================
// 4. MÁQUINA DE ESTADOS DEL SIMULADOR DE LANZAMIENTO
// ==========================================================================
const SimState = {
    status: "STANDBY", // STANDBY, COUNTDOWN, LIFTOFF, MECO, STAGE2, LANDING, COMPLETE, ABORTED
    countdownVal: 10,
    countdownTimer: null,
    flightTimer: null,
    missionSeconds: 0,
    altitude: 0.0,
    velocity: 0,
    thrust: 0
};

function initLaunchSimulator() {
    const btnStart = document.getElementById("btn-start-countdown");
    const btnAbort = document.getElementById("btn-abort-mission");
    const btnReset = document.getElementById("btn-reset-sim");
    const btnClearLog = document.getElementById("btn-clear-log");

    if (btnStart) btnStart.addEventListener("click", startCountdownSequence);
    if (btnAbort) btnAbort.addEventListener("click", abortMissionSequence);
    if (btnReset) btnReset.addEventListener("click", resetSimulation);
    if (btnClearLog) btnClearLog.addEventListener("click", () => {
        const log = document.getElementById("terminal-log");
        if (log) log.innerHTML = "";
    });

    const heroLaunchBtn = document.getElementById("btn-hero-launch-sim");
    const quickLaunchBtn = document.getElementById("btn-quick-launch");
    if (heroLaunchBtn) {
        heroLaunchBtn.addEventListener("click", () => {
            const simEl = document.getElementById("simulador");
            if (simEl) simEl.scrollIntoView({ behavior: "smooth" });
            setTimeout(startCountdownSequence, 800);
        });
    }
    if (quickLaunchBtn) {
        quickLaunchBtn.addEventListener("click", () => {
            const simEl = document.getElementById("simulador");
            if (simEl) simEl.scrollIntoView({ behavior: "smooth" });
            setTimeout(startCountdownSequence, 800);
        });
    }
}

function appendFlightLog(text, type = "normal") {
    const log = document.getElementById("terminal-log");
    if (!log) return;

    const p = document.createElement("p");
    p.className = `log-line ${type}`;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    p.textContent = `[${timeStr}] ${text}`;
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
}

function updateHUDMetrics(timeStr, alt, vel, thrust, statusText, statusClass = "status-green") {
    const tTime = document.getElementById("tele-mission-time");
    const tAlt = document.getElementById("tele-altitude");
    const tVel = document.getElementById("tele-velocity");
    const tThrust = document.getElementById("tele-thrust");
    const tStat = document.getElementById("tele-status");

    if (tTime) tTime.textContent = timeStr;
    if (tAlt) tAlt.textContent = `${alt.toFixed(1)} KM`;
    if (tVel) tVel.textContent = `${Math.round(vel).toLocaleString()} KM/H`;
    if (tThrust) tThrust.textContent = `${Math.round(thrust)}%`;
    if (tStat) {
        tStat.textContent = statusText;
        tStat.className = `tp-val ${statusClass}`;
    }
}

function setStageHighlight(activeId) {
    const steps = ["step-ignition", "step-liftoff", "step-meco", "step-stage2", "step-landing"];
    let reached = false;

    steps.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.remove("active", "done");

        if (id === activeId) {
            el.classList.add("active");
            reached = true;
        } else if (!reached) {
            el.classList.add("done");
        }
    });
}

// Iniciar Secuencia de Cuenta Regresiva (T-10s)
function startCountdownSequence() {
    if (SimState.status !== "STANDBY" && SimState.status !== "ABORTED" && SimState.status !== "COMPLETE") return;

    SoundSystem.init();
    SimState.status = "COUNTDOWN";
    SimState.countdownVal = 10;

    const btnStart = document.getElementById("btn-start-countdown");
    const btnAbort = document.getElementById("btn-abort-mission");
    if (btnStart) btnStart.disabled = true;
    if (btnAbort) btnAbort.disabled = false;

    appendFlightLog("Comando de despegue autorizado por Joendri Albarran.", "info");
    appendFlightLog("Iniciando cuenta regresiva terminal (T-10s)...", "warn");

    const phaseBadge = document.getElementById("phase-badge");
    const phaseTitle = document.getElementById("phase-title");

    SimState.countdownTimer = setInterval(() => {
        SimState.countdownVal--;

        if (phaseBadge) phaseBadge.textContent = "CUENTA REGRESIVA";
        if (phaseTitle) phaseTitle.textContent = `T-MINUS ${SimState.countdownVal} SEGUNDOS`;

        updateHUDMetrics(`T - 00:${String(SimState.countdownVal).padStart(2, '0')}`, 0, 0, 0, "COUNTDOWN", "status-green");

        if (SimState.countdownVal > 0) {
            SoundSystem.playCountdownBeep(false);
            appendFlightLog(`T-${SimState.countdownVal}s... Verificación de presurización de tanques.`);
        } else {
            // T-0 Ignición
            clearInterval(SimState.countdownTimer);
            SoundSystem.playCountdownBeep(true);
            executeLiftoff();
        }
    }, 1000);
}

// Ejecución del Despegue e Ignición
function executeLiftoff() {
    SimState.status = "LIFTOFF";
    appendFlightLog("¡IGNICIÓN DE 27 MOTORES RAPTOR-X! EMPUJE TOTAL.", "warn");
    appendFlightLog("¡DESPEGUE CONFIRMADO! El cohete abandona la plataforma.", "success");

    SoundSystem.playEngineRumble(6);

    const exhaust = document.getElementById("engine-exhaust");
    const rocket = document.getElementById("rocket-vehicle");
    const sky = document.getElementById("sim-sky");
    const phaseBadge = document.getElementById("phase-badge");
    const phaseTitle = document.getElementById("phase-title");

    if (exhaust) exhaust.classList.add("ignited");
    setStageHighlight("step-ignition");

    if (phaseBadge) phaseBadge.textContent = "FASE DE ASCENSO";
    if (phaseTitle) phaseTitle.textContent = "DESPEGUE Y MÁXIMA PRESIÓN DINÁMICA (MAX-Q)";

    let flightSec = 0;
    SimState.altitude = 0.5;
    SimState.velocity = 200;
    SimState.thrust = 100;

    // Subir cohete en la pantalla
    if (rocket) {
        rocket.style.bottom = "240px";
    }

    SimState.flightTimer = setInterval(() => {
        flightSec++;
        SimState.missionSeconds = flightSec;

        // Física simulada
        if (flightSec <= 4) {
            // Ascenso inicial y Max-Q
            SimState.altitude += 4.5;
            SimState.velocity += 900;
            setStageHighlight("step-liftoff");
            if (flightSec === 2) {
                appendFlightLog("Vehículo supersónico. Atravesando barrera del sonido Mach 1.");
            }
            if (flightSec === 3) {
                appendFlightLog("Máxima Presión Dinámica (Max-Q) superada con telemetría nominal.", "info");
            }
        } else if (flightSec <= 7) {
            // MECO & Separación
            SimState.status = "MECO";
            setStageHighlight("step-meco");
            if (phaseBadge) phaseBadge.textContent = "SEPARACIÓN";
            if (phaseTitle) phaseTitle.textContent = "CORTE DE MOTORES PRINCIPALES (MECO) & SEPARACIÓN";

            SimState.altitude += 12;
            SimState.velocity += 1800;
            SimState.thrust = 0;
            if (exhaust) exhaust.classList.remove("ignited");

            if (sky) sky.classList.add("in-space");

            if (flightSec === 5) {
                appendFlightLog("Corte de Motores de Primera Etapa (MECO). Apagado confirmado.", "warn");
            }
            if (flightSec === 6) {
                appendFlightLog("Separación de Etapas confirmada. El propulsor inicia maniobra de retorno.", "info");
            }
        } else if (flightSec <= 10) {
            // Etapa II Encendido & Inserción
            SimState.status = "STAGE2";
            setStageHighlight("step-stage2");
            if (phaseBadge) phaseBadge.textContent = "ORBITAL INSERTION";
            if (phaseTitle) phaseTitle.textContent = "SEGUNDA ETAPA: VELOCIDAD ORBITAL 27.500 KM/H";

            SimState.altitude += 22;
            SimState.velocity = Math.min(27500, SimState.velocity + 3200);
            SimState.thrust = 100;

            if (flightSec === 8) {
                appendFlightLog("Encendido del motor de vacío de la Segunda Etapa.", "info");
            }
            if (flightSec === 10) {
                appendFlightLog("Inserción orbital completada. Carga útil en órbita terrestre estable.", "success");
            }
        } else if (flightSec <= 13) {
            // Retorno y Aterrizaje del Booster
            SimState.status = "LANDING";
            setStageHighlight("step-landing");
            if (phaseBadge) phaseBadge.textContent = "RECUPERACIÓN";
            if (phaseTitle) phaseTitle.textContent = "ATERRIZAJE VERTICAL EN BARCAZA «SIN GRAVEDAD»";

            const droneship = document.getElementById("droneship");
            const legs = document.querySelector(".landing-legs");
            if (droneship) droneship.style.display = "flex";

            if (rocket) {
                rocket.style.bottom = "36px";
            }
            if (exhaust) exhaust.classList.add("ignited");

            if (flightSec === 11) {
                appendFlightLog("Aletas de titanio guiando al propulsor hacia la barcaza.");
            }
            if (flightSec === 12) {
                if (legs) legs.classList.add("deployed");
                appendFlightLog("Despliegue de patas de aterrizaje completado.", "warn");
            }
            if (flightSec === 13) {
                // Aterrizaje suave completado
                clearInterval(SimState.flightTimer);
                if (exhaust) exhaust.classList.remove("ignited");
                SimState.status = "COMPLETE";

                updateHUDMetrics("T + 00:13", 0.0, 0, 0, "LANDED", "status-green");
                SoundSystem.playSuccessChime();

                if (phaseBadge) phaseBadge.textContent = "MISIÓN CUMPLIDA";
                if (phaseTitle) phaseTitle.textContent = "¡PROPULSOR ALBARRAN-X ATERRIZADO EXITOSAMENTE!";

                appendFlightLog("¡TOUCHDOWN CONFIRMADO EN LA DIANA DE LA BARCAZA!", "success");
                appendFlightLog("Felicitaciones de la dirección general de Joendri Albarran.", "info");

                showSpaceToast("¡Misión Cumplida! Cohete Albarran-X recuperado al 100%", "success");

                const btnStart = document.getElementById("btn-start-countdown");
                const btnAbort = document.getElementById("btn-abort-mission");
                if (btnStart) btnStart.disabled = false;
                if (btnAbort) btnAbort.disabled = true;
                return;
            }
        }

        updateHUDMetrics(
            `T + 00:${String(flightSec).padStart(2, '0')}`,
            SimState.altitude,
            SimState.velocity,
            SimState.thrust,
            SimState.status,
            "status-green"
        );
    }, 1200);
}

// Abortar Misión
function abortMissionSequence() {
    if (SimState.countdownTimer) clearInterval(SimState.countdownTimer);
    if (SimState.flightTimer) clearInterval(SimState.flightTimer);

    SimState.status = "ABORTED";
    SoundSystem.playAbortAlarm();

    const exhaust = document.getElementById("engine-exhaust");
    const phaseBadge = document.getElementById("phase-badge");
    const phaseTitle = document.getElementById("phase-title");
    const btnStart = document.getElementById("btn-start-countdown");
    const btnAbort = document.getElementById("btn-abort-mission");

    if (exhaust) exhaust.classList.remove("ignited");
    if (btnStart) btnStart.disabled = false;
    if (btnAbort) btnAbort.disabled = true;

    if (phaseBadge) phaseBadge.textContent = "SECUENCIA ABORTADA";
    if (phaseTitle) phaseTitle.textContent = "ALERTA: SECUENCIA DE VUELO DETENIDA (HOLD DE SEGURIDAD)";

    updateHUDMetrics("HOLD", 0, 0, 0, "ABORTED", "status-red");
    appendFlightLog("[ABORT] Mando de aborto accionado. Sistemas purgados a estado seguro.", "abort");
    showSpaceToast("Secuencia abortada. Plataforma en modo de enfriamiento", "warn");
}

// Reiniciar Simulación
function resetSimulation() {
    if (SimState.countdownTimer) clearInterval(SimState.countdownTimer);
    if (SimState.flightTimer) clearInterval(SimState.flightTimer);

    SimState.status = "STANDBY";
    SimState.countdownVal = 10;
    SimState.missionSeconds = 0;
    SimState.altitude = 0.0;
    SimState.velocity = 0;
    SimState.thrust = 0;

    const rocket = document.getElementById("rocket-vehicle");
    const exhaust = document.getElementById("engine-exhaust");
    const sky = document.getElementById("sim-sky");
    const droneship = document.getElementById("droneship");
    const legs = document.querySelector(".landing-legs");
    const phaseBadge = document.getElementById("phase-badge");
    const phaseTitle = document.getElementById("phase-title");
    const btnStart = document.getElementById("btn-start-countdown");
    const btnAbort = document.getElementById("btn-abort-mission");

    if (rocket) rocket.style.bottom = "60px";
    if (exhaust) exhaust.classList.remove("ignited");
    if (sky) sky.classList.remove("in-space");
    if (droneship) droneship.style.display = "none";
    if (legs) legs.classList.remove("deployed");

    if (btnStart) btnStart.disabled = false;
    if (btnAbort) btnAbort.disabled = true;

    if (phaseBadge) phaseBadge.textContent = "SISTEMAS EN ESPERA";
    if (phaseTitle) phaseTitle.textContent = "LISTO PARA LA SECUENCIA DE CUENTA REGRESIVA";

    const steps = ["step-ignition", "step-liftoff", "step-meco", "step-stage2", "step-landing"];
    steps.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove("active", "done");
    });

    updateHUDMetrics("T - 00:10", 0, 0, 0, "STANDBY", "status-green");
    appendFlightLog("Simulador reiniciado a condiciones iniciales por el operador.");
    showSpaceToast("Simulador reiniciado", "info");
}

// ==========================================================================
// 5. SELECTOR Y RENDERIZADOR DE VEHÍCULOS ESPACIALES
// ==========================================================================
function renderVehicleCard(key) {
    const cardEl = document.getElementById("vehicle-card");
    const data = VEHICLES_DATA[key] || VEHICLES_DATA.heavy;
    if (!cardEl) return;

    cardEl.innerHTML = `
        <div class="vehicle-media">
            <img src="${data.image}" alt="${data.name}" loading="lazy">
        </div>
        <div class="vehicle-details">
            <span class="v-subheading">${data.sub}</span>
            <h3 class="v-title">${data.name}</h3>
            <p class="v-desc">${data.desc}</p>
            
            <div class="specs-table">
                ${data.specs.map(s => `
                    <div class="spec-item">
                        <span class="spec-name">${s.name}:</span>
                        <span class="spec-val">${s.val}</span>
                    </div>
                `).join("")}
            </div>

            <button class="btn-primary-launch" id="btn-request-vehicle-spec" data-vehicle="${data.name}">
                SOLICITAR MANIFIESTO DE CARGA ${data.name} →
            </button>
        </div>
    `;

    const reqBtn = document.getElementById("btn-request-vehicle-spec");
    if (reqBtn) {
        reqBtn.addEventListener("click", () => {
            openBookingModal(data.name);
        });
    }
}

function initVehicleTabs() {
    const tabsContainer = document.getElementById("vehicle-tabs");
    if (!tabsContainer) return;

    tabsContainer.addEventListener("click", (e) => {
        const tab = e.target.closest(".v-tab");
        if (!tab) return;

        document.querySelectorAll(".v-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const vehicleKey = tab.dataset.vehicle;
        renderVehicleCard(vehicleKey);
        SoundSystem.playCountdownBeep(true);
    });

    renderVehicleCard("heavy");
}

// ==========================================================================
// 6. CALCULADORA DE CARGA ÚTIL & COSTO ESTIMADO DE MISIÓN
// ==========================================================================
function initPayloadCalculator() {
    const destSelect = document.getElementById("calc-destination");
    const massSlider = document.getElementById("calc-mass");
    const massDisplay = document.getElementById("mass-display");
    const reusableCheck = document.getElementById("calc-reusable");
    const typeRadios = document.querySelectorAll('input[name="mission-type"]');

    function calculate() {
        if (!destSelect || !massSlider) return;

        const dest = destSelect.value;
        const mass = parseInt(massSlider.value, 10);
        const isReusable = reusableCheck ? reusableCheck.checked : true;

        if (massDisplay) {
            massDisplay.textContent = `${mass.toLocaleString()} kg`;
        }

        let baseCostPerKg = 3200;
        let vehicleName = "ALBARRAN HEAVY";
        let thrust = 22800;
        let timeMinutes = 8.5;
        let maxCapacity = 150000;

        if (dest === "leo") {
            baseCostPerKg = 2200;
            timeMinutes = 8.8;
            maxCapacity = 150000;
            vehicleName = "ALBARRAN HEAVY (LEO-CONFIG)";
            thrust = 22800;
        } else if (dest === "gto") {
            baseCostPerKg = 4100;
            timeMinutes = 24.5;
            maxCapacity = 26700;
            vehicleName = "ALBARRAN HEAVY + VACUUM KICK";
            thrust = 24500;
        } else if (dest === "lunar") {
            baseCostPerKg = 7500;
            timeMinutes = 72; // Horas
            maxCapacity = 45000;
            vehicleName = "ARES-I LUNAR TRANSPORTER";
            thrust = 34000;
        } else if (dest === "mars") {
            baseCostPerKg = 9800;
            timeMinutes = 150; // Días
            maxCapacity = 100000;
            vehicleName = "ARES-I INTERPLANETARY MARS SHIP";
            thrust = 74500;
        }

        if (isReusable) {
            baseCostPerKg = Math.round(baseCostPerKg * 0.6); // 40% descuento
        }

        const savings = isReusable ? mass * 1200 : 0;
        const pctUsed = Math.min(100, Math.round((mass / maxCapacity) * 100));

        // Actualizar UI
        const resVehicle = document.getElementById("res-vehicle");
        const resThrust = document.getElementById("res-thrust");
        const resTime = document.getElementById("res-time");
        const resCost = document.getElementById("res-cost-kg");
        const resSavings = document.getElementById("res-savings");
        const resBar = document.getElementById("res-bar-fill");
        const resPeText = document.getElementById("res-pe-text");

        if (resVehicle) resVehicle.textContent = vehicleName;
        if (resThrust) resThrust.textContent = `${thrust.toLocaleString()} kN`;
        if (resTime) {
            resTime.textContent = dest === "lunar" ? "3 días de tránsito" :
                                 dest === "mars" ? "5 meses de tránsito" :
                                 `${timeMinutes.toFixed(1)} minutos de inserción`;
        }
        if (resCost) resCost.textContent = `$ ${baseCostPerKg.toLocaleString()} USD / kg`;
        if (resSavings) resSavings.textContent = isReusable ? `-$ ${savings.toLocaleString()} USD` : "$ 0 USD (Desechable)";
        if (resBar) resBar.style.width = `${pctUsed}%`;
        if (resPeText) resPeText.textContent = `${pctUsed}% de la masa máxima estructural del vehículo`;
    }

    if (destSelect) destSelect.addEventListener("change", calculate);
    if (massSlider) massSlider.addEventListener("input", calculate);
    if (reusableCheck) reusableCheck.addEventListener("change", calculate);
    typeRadios.forEach(r => r.addEventListener("change", calculate));

    calculate();

    const btnRequestLaunch = document.getElementById("btn-request-launch-slot");
    if (btnRequestLaunch) {
        btnRequestLaunch.addEventListener("click", () => {
            openBookingModal("Cotización Personalizada de Carga Útil");
        });
    }
}

// Botones de explorar destino en la sección de Destinos
function initDestinationCards() {
    document.querySelectorAll(".btn-dest-explore").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const target = e.currentTarget.dataset.target;
            const destSelect = document.getElementById("calc-destination");
            const calcSec = document.getElementById("calculadora");

            if (destSelect) {
                if (target === "leo") destSelect.value = "leo";
                if (target === "luna") destSelect.value = "lunar";
                if (target === "marte") destSelect.value = "mars";
                destSelect.dispatchEvent(new Event("change"));
            }

            if (calcSec) {
                calcSec.scrollIntoView({ behavior: "smooth" });
                showSpaceToast(`Destino cargado en la calculadora orbital: ${target.toUpperCase()}`, "info");
            }
        });
    });
}

// ==========================================================================
// 7. RELOJ UTC Y CUENTA REGRESIVA DE PRÓXIMO LANZAMIENTO
// ==========================================================================
function initCountdownClocks() {
    const liveTime = document.getElementById("live-hud-time");
    const headerCd = document.getElementById("header-countdown");
    const cdDays = document.getElementById("cd-days");
    const cdHours = document.getElementById("cd-hours");
    const cdMins = document.getElementById("cd-mins");
    const cdSecs = document.getElementById("cd-secs");

    // Fecha fija ficticia en el futuro (2 días y medio)
    let totalSeconds = (2 * 86400) + (14 * 3600) + (36 * 60) + 18;

    function tick() {
        // Reloj UTC
        const now = new Date();
        const utcStr = now.toUTCString().split(' ')[4];
        if (liveTime) liveTime.textContent = `UTC: ${utcStr}`;

        // Cuenta regresiva
        totalSeconds--;
        if (totalSeconds < 0) totalSeconds = 86400 * 3;

        const d = Math.floor(totalSeconds / 86400);
        const h = Math.floor((totalSeconds % 86400) / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        const strD = String(d).padStart(2, '0');
        const strH = String(h).padStart(2, '0');
        const strM = String(m).padStart(2, '0');
        const strS = String(s).padStart(2, '0');

        if (headerCd) headerCd.textContent = `T-${strD}d : ${strH}h : ${strM}m : ${strS}s`;
        if (cdDays) cdDays.textContent = strD;
        if (cdHours) cdHours.textContent = strH;
        if (cdMins) cdMins.textContent = strM;
        if (cdSecs) cdSecs.textContent = strS;
    }

    tick();
    setInterval(tick, 1000);

    const btnPrecheck = document.getElementById("btn-prelaunch-check");
    if (btnPrecheck) {
        btnPrecheck.addEventListener("click", () => {
            showSpaceToast("Verificación de presurización y telemetría: 100% NOMINAL", "success");
            SoundSystem.playCountdownBeep(true);
        });
    }
}

// ==========================================================================
// 8. MODAL DE RESERVA DE VUELO & TOASTS
// ==========================================================================
function openBookingModal(context = "") {
    const modal = document.getElementById("booking-modal");
    if (!modal) return;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (context) {
        const notes = document.getElementById("book-notes");
        if (notes && !notes.value) {
            notes.value = `Interés en: ${context}`;
        }
    }
}

function closeBookingModal() {
    const modal = document.getElementById("booking-modal");
    if (!modal) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function initBookingModal() {
    const closeBtn = document.getElementById("btn-close-modal");
    const modal = document.getElementById("booking-modal");
    const form = document.getElementById("booking-form");

    if (closeBtn) closeBtn.addEventListener("click", closeBookingModal);
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeBookingModal();
        });
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("book-name").value;
            closeBookingModal();
            showSpaceToast(`¡Solicitud orbital recibida! Joendri Albarran y su equipo técnico contactarán a ${name}.`, "success");
            SoundSystem.playSuccessChime();
            form.reset();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeBookingModal();
    });
}

function showSpaceToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    const icon = type === "success" ? "🚀" : type === "warn" ? "⚠️" : "📡";
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(15px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Botón de alternar audio FX
function initAudioToggle() {
    const btn = document.getElementById("btn-toggle-audio");
    const icon = document.getElementById("audio-icon");
    if (!btn || !icon) return;

    btn.addEventListener("click", () => {
        SoundSystem.enabled = !SoundSystem.enabled;
        if (SoundSystem.enabled) {
            icon.textContent = "🔊";
            showSpaceToast("Efectos de audio aeroespaciales ACTIVADOS", "info");
            SoundSystem.playCountdownBeep(true);
        } else {
            icon.textContent = "🔇";
            showSpaceToast("Efectos de audio SILENCIADOS", "info");
        }
    });
}

// ==========================================================================
// INICIALIZACIÓN GLOBAL
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    initSpaceCanvas();
    initLaunchSimulator();
    initVehicleTabs();
    initPayloadCalculator();
    initDestinationCards();
    initCountdownClocks();
    initBookingModal();
    initAudioToggle();
});
