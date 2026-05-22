/* ═══════════════════════════════════════════════════════════
DIAN STUDY PRO — script.js
Reproductor de podcasts educativos — Concurso DIAN Gestor 1
═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── DATA DIAN GESTOR 1 ─────────────────────────────── */
const EPISODES = [
  // A. Conocimientos generales esenciales
  {
    id: 1,
    title: 'Fundamentos del concurso DIAN',
    file: 'audios/episodio 1. fundamentos.m4a',
    eje: 'generales',
    duration: '00:25:31',
    subtitulo: 'Marco básico para Gestor 1',
    foco: 'Fundamentos del empleo público y del proceso de Talento Humano',
    icon: '💡',
  },
  {
    id: 2,
    title: 'Principios del Estado y la función pública',
    file: 'audios/episodio 2 principios.m4a',
    eje: 'generales',
    duration: '00:13:10',
    subtitulo: 'Principios constitucionales y de la función pública',
    foco: 'Cómo se conectan con el rol del Gestor 1 en la DIAN',
    icon: '📜',
  },
  {
    id: 3,
    title: 'CPACA para el Gestor 1',
    file: 'audios/episodio3 cpaca.m4a',
    eje: 'generales',
    duration: '00:26:07',
    subtitulo: 'Procedimiento Administrativo y control',
    foco: 'Aspectos del CPACA clave para Talento Humano',
    icon: '⚖️',
  },
  {
    id: 4,
    title: 'MIPG y Gestión Documental en la DIAN',
    file: 'audios/Episodio 04 MIPG y Gestión Documental.m4a',
    eje: 'generales',
    duration: '00:25:51',
    subtitulo: 'Modelo Integrado y archivos',
    foco: 'Cómo el MIPG y la gestión documental soportan la labor del Gestor 1',
    icon: '📁',
  },
  {
    id: 5,
    title: 'El funcionario como diseñador de experiencias ciudadanas',
    file: 'audios/ep 5 El_funcionario_como_diseñador_de_experiencias_ciudadanas.m4a',
    eje: 'generales',
    duration: '00:19:58',
    subtitulo: 'Orientación al usuario y servicio',
    foco: 'Enfoque de servicio al ciudadano para el rol de Gestor 1',
    icon: '🧭',
  },
  {
    id: 6,
    title: 'Cultura tributaria y herramientas informáticas',
    file: 'audios/Ep_6 Episodio 06 Cultura Tributaria y Herramientas Informática.m4a',
    eje: 'generales',
    duration: '00:26:20',
    subtitulo: 'Contexto DIAN y competencias digitales',
    foco: 'Cultura tributaria básica y uso de herramientas informáticas',
    icon: '💻',
  },

  // B. Conocimientos específicos de Talento Humano
  {
    id: 7,
    title: 'Gestión del Empleo y Planificación',
    file: 'audios/episodio 7 Gestión del Empleo y Planificación.m4a',
    eje: 'especificos',
    duration: '00:31:01',
    subtitulo: 'Núcleo de gestión del empleo',
    foco: 'Procedimientos de empleo, historias laborales y planeación de Talento Humano',
    icon: '🗂️',
  },
  {
    id: 8,
    title: 'Desarrollo del Talento y Gestión del Rendimiento en la DIAN',
    file: 'audios/Episodio 8.Desarrollo del Talento y Gestión del Rendimiento en la DIAN.m4a',
    eje: 'especificos',
    duration: '00:21:42',
    subtitulo: 'EDL, competencias y desarrollo',
    foco: 'Evaluación del desempeño y programas de desarrollo para el Gestor 1',
    icon: '📈',
  },
  {
    id: 9,
    title: 'Gestión de nómina para Gestor 1',
    file: 'audios/Episodio 9 gestión nómina.m4a',
    eje: 'especificos',
    duration: '00:14:39',
    subtitulo: 'Compensación y SGSS',
    foco: 'Claves operativas y de control en la gestión de la nómina',
    icon: '💰',
  },
  {
    id: 10,
    title: 'Relaciones humanas, bienestar y seguridad social',
    file: 'audios/episodio 10. Relaciones Humanas, Bienestar y Seguridad Social .m4a',
    eje: 'especificos',
    duration: '00:15:31',
    subtitulo: 'Bienestar y clima laboral',
    foco: 'Programas de bienestar, SGSS y manejo de relaciones humanas',
    icon: '🤝',
  },

  // C. Competencias comportamentales
  {
    id: 11,
    title: 'Orientación al logro e innovación para Gestor 1',
    file: 'audios/episodio11. Orientación al logro innovacion.m4a',
    eje: 'comportamentales',
    duration: '00:19:26',
    subtitulo: 'Logro e Innovación en Talento Humano',
    foco: 'Cómo actuar con alto nivel de logro e innovación en la DIAN',
    icon: '🎯',
  },
  {
    id: 12,
    title: 'Trabajo en equipo, adaptabilidad y comunicación',
    file: 'audios/episodio 12. trabajo en Equipo, Adaptabilidad y Comunicación.m4a',
    eje: 'comportamentales',
    duration: '00:23:51',
    subtitulo: 'Competencias relacionales clave',
    foco: 'Coordinación central–seccional, flexibilidad y comunicación efectiva',
    icon: '🗣️',
  },
  {
    id: 13,
    title: 'Simulacro final de Juicio Situacional (SJT)',
    file: 'audios/Episodio 13 Simulacro Final.m4a',
    eje: 'comportamentales',
    duration: '00:16:30',
    subtitulo: 'Integración de todo el curso',
    foco: 'Casos de alta complejidad y técnica para elegir la respuesta de mayor nivel profesional',
    icon: '✅',
  },
];

/* STORAGE KEYS */
const STORAGE_KEY = 'dian_progress';
const STORAGE_THEME = 'dian_theme';
const STORAGE_LAST = 'dian_last';

/* STATE */
let state = {
  currentId: null,
  playing: false,
  speed: 1,
  filter: 'todos',
  sleepTimerId: null,
  sleepEndsAt: null,
  progress: {},
  lastPlayed: null,
};

const SPEED_CYCLE = [1, 1.5, 2];

/* DOM REFS */
const audio = document.getElementById('audioPlayer');
const episodesList = document.getElementById('episodesList');
const globalProgressFill = document.getElementById('globalProgressFill');
const completedCount = document.getElementById('completedCount');
const totalEpisodesEl = document.getElementById('totalEpisodes');

const continueBanner = document.getElementById('continueBanner');
const continueBannerTitle = document.getElementById('continueBannerTitle');
const continueBannerBtn = document.getElementById('continueBannerBtn');
const tabs = document.querySelectorAll('.tab');

// Full player
const fullPlayer = document.getElementById('fullPlayer');
const playerClose = document.getElementById('playerClose');
const playPauseBtn = document.getElementById('playPauseBtn');
const seekbar = document.getElementById('seekbar');
const seekbarFill = document.getElementById('seekbarFill');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');
const skipBack = document.getElementById('skipBack');
const skipFwd = document.getElementById('skipFwd');
const speedBtn = document.getElementById('speedBtn');
const artDisc = document.getElementById('artDisc');
const fpTitle = document.getElementById('fpTitle');
const fpSub = document.getElementById('fpSub');
const fpFoco = document.getElementById('fpFoco');
const fpEje = document.getElementById('fpEje');

// Mini player
const miniPlayer = document.getElementById('miniPlayer');
const miniTitle = document.getElementById('miniTitle');
const miniSub = document.getElementById('miniSub');
const miniPlay = document.getElementById('miniPlay');
const miniProgressFill = document.getElementById('miniProgressFill');
const miniLeft = document.getElementById('miniLeft');

// Sleep
const sleepBtn = document.getElementById('sleepBtn');
const sleepMenu = document.getElementById('sleepMenu');
const sleepBadge = document.getElementById('sleepBadge');
const sleepCancel = document.getElementById('sleepCancel');
const sleepOptions = document.querySelectorAll('.sleep-option[data-min]');

// Theme
const themeToggle = document.getElementById('themeToggle');

// Install (simple botón; GitHub Pages no permite beforeinstallprompt aquí, pero queda lista la UX)
const installBtn = document.getElementById('installBtn');

/* INIT */
init();

function init() {
  totalEpisodesEl.textContent = String(EPISODES.length);
  loadFromStorage();
  applyTheme();
  renderEpisodes();
  updateGlobalProgress();
  showContinueBanner();
  registerServiceWorker();
  bindEvents();
}

/* STORAGE */
function loadFromStorage() {
  try {
    state.progress = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    state.lastPlayed = JSON.parse(localStorage.getItem(STORAGE_LAST)) || null;
  } catch {
    state.progress = {};
    state.lastPlayed = null;
  }

  const savedTheme = localStorage.getItem(STORAGE_THEME);
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
}

function saveProgress(id, position, completed = false) {
  const prev = state.progress[id] || {};
  const duration = audio.duration || prev.duration || 0;
  const percent = duration ? Math.min(100, (position / duration) * 100) : (prev.percent || 0);

  state.progress[id] = {
    position,
    completed: completed || prev.completed || percent >= 95,
    duration,
    percent,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}

function saveLastPlayed(id, position) {
  state.lastPlayed = { id, position };
  localStorage.setItem(STORAGE_LAST, JSON.stringify(state.lastPlayed));
}

/* THEME */
function applyTheme() {
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  localStorage.setItem(STORAGE_THEME, theme);
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(STORAGE_THEME, next);
}

/* CONTINUAR */
function showContinueBanner() {
  if (!state.lastPlayed) return;
  const { id, position } = state.lastPlayed;
  const ep = EPISODES.find(e => e.id === id);
  if (!ep || !position || position < 5) return;
  if (state.progress[id]?.completed) return;
  continueBannerTitle.textContent = ep.title;
  continueBanner.hidden = false;
}

/* RENDER EPISODES */
function renderEpisodes() {
  const filtered = state.filter === 'todos'
    ? EPISODES
    : EPISODES.filter(e => e.eje === state.filter);

  episodesList.innerHTML = '';
  if (filtered.length === 0) {
    episodesList.innerHTML = '<div class="empty-state">No hay episodios en este eje.</div>';
    return;
  }

  filtered.forEach(ep => {
    const card = document.createElement('article');
    card.className = 'episode-card';
    card.dataset.id = ep.id;

    const progress = state.progress[ep.id] || {};
    const percent = progress.percent || 0;
    const isCompleted = !!progress.completed;
    const isCurrent = state.currentId === ep.id;

    if (isCompleted) card.classList.add('completed');
    if (isCurrent) card.classList.add('playing');

    card.innerHTML = `
      <div class="ep-number">${ep.icon || ep.id}</div>
      <div class="ep-info">
        <div class="ep-tag-row">
          <span class="ep-tag ${ep.eje}">${labelForEje(ep.eje)}</span>
        </div>
        <div class="ep-title">${ep.title}</div>
        <div class="ep-sub">${ep.subtitulo}</div>
        <div class="ep-foco">${ep.foco}</div>
      </div>
      <div class="ep-right">
        <div class="ep-duration">${ep.duration}</div>
        <div class="ep-progress">
          <div class="ep-progress-fill" style="width:${percent}%"></div>
        </div>
        ${isCurrent && state.playing ? `
          <div class="playing-anim" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
        ` : ''}
      </div>
    `;

    card.addEventListener('click', () => openEpisode(ep.id));
    episodesList.appendChild(card);
  });
}

function labelForEje(eje) {
  if (eje === 'generales') return 'Generales esenciales';
  if (eje === 'especificos') return 'Talento Humano';
  if (eje === 'comportamentales') return 'Comportamentales';
  return eje;
}

/* GLOBAL PROGRESS */
function updateGlobalProgress() {
  const values = EPISODES.map(ep => state.progress[ep.id] || {});
  const completed = values.filter(v => v.completed).length;
  const avgPercent = values.length
    ? Math.round(values.reduce((acc, v) => acc + (v.percent || 0), 0) / values.length)
    : 0;

  completedCount.textContent = String(completed);
  globalProgressFill.style.width = `${avgPercent}%`;
}

/* OPEN EPISODE */
function openEpisode(id) {
  const ep = EPISODES.find(e => e.id === id);
  if (!ep) return;

  const srcChanged = state.currentId !== id || audio.src !== getAbsoluteAudioSrc(ep.file);

  state.currentId = id;
  const progress = state.progress[id] || {};
  const position = progress.position || 0;

  if (srcChanged) {
    audio.src = ep.file;
  }

  updateFullPlayerMeta(ep);
  updateMiniPlayerMeta(ep, progress.percent || 0);

  if (srcChanged) {
    audio.currentTime = position || 0;
  } else {
    try { audio.currentTime = position || audio.currentTime || 0; } catch (_) {}
  }

  fullPlayer.hidden = false;
  artDisc.classList.add('spinning');
  playAudio();
}

function getAbsoluteAudioSrc(relativePath) {
  const a = document.createElement('a');
  a.href = relativePath;
  return a.href;
}

/* FULL PLAYER META */
function updateFullPlayerMeta(ep) {
  fpTitle.textContent = ep.title;
  fpSub.textContent = ep.subtitulo;
  fpFoco.textContent = ep.foco;
  fpEje.textContent = labelForEje(ep.eje);
}

/* MINI PLAYER META */
function updateMiniPlayerMeta(ep, percent) {
  miniTitle.textContent = ep.title;
  miniSub.textContent = ep.subtitulo;
  miniProgressFill.style.width = `${percent}%`;
  miniPlayer.hidden = false;
}

/* PLAYBACK CONTROL */
function playAudio() {
  audio.play().then(() => {
    state.playing = true;
    updatePlayButtons();
  }).catch(() => {
    state.playing = false;
    updatePlayButtons();
  });
}
function pauseAudio() {
  audio.pause();
  state.playing = false;
  updatePlayButtons();
}
function togglePlay() {
  if (!state.currentId) {
    const first = EPISODES[0];
    openEpisode(first.id);
    return;
  }
  if (audio.paused) playAudio();
  else pauseAudio();
}
function updatePlayButtons() {
  playPauseBtn.textContent = state.playing ? '❚❚' : '▶';
  miniPlay.textContent = state.playing ? '❚❚' : '▶';
  if (state.playing) artDisc.classList.add('spinning');
  else artDisc.classList.remove('spinning');
}

/* SEEKBAR / TIME */
audio.addEventListener('loadedmetadata', () => {
  totalTimeEl.textContent = formatTime(audio.duration || 0);
  const progress = state.progress[state.currentId] || {};
  if (progress.position && progress.position < audio.duration) {
    audio.currentTime = progress.position;
  }
});

audio.addEventListener('timeupdate', () => {
  if (!audio.duration || !state.currentId) return;
  const percent = (audio.currentTime / audio.duration) * 100;
  seekbar.value = percent;
  seekbarFill.style.width = `${percent}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  totalTimeEl.textContent = formatTime(audio.duration);
  miniProgressFill.style.width = `${percent}%`;

  saveProgress(state.currentId, audio.currentTime);
  saveLastPlayed(state.currentId, audio.currentTime);
  updateGlobalProgress();
});

audio.addEventListener('ended', () => {
  if (!state.currentId) return;
  saveProgress(state.currentId, audio.duration || 0, true);
  updateGlobalProgress();
  renderEpisodes();
  pauseAudio();
});

seekbar.addEventListener('input', () => {
  if (!audio.duration) return;
  const percent = Number(seekbar.value) || 0;
  const target = (percent / 100) * audio.duration;
  audio.currentTime = target;
});

/* SKIP */
skipBack.addEventListener('click', () => {
  if (!state.currentId) return;
  audio.currentTime = Math.max(0, audio.currentTime - 10);
});
skipFwd.addEventListener('click', () => {
  if (!state.currentId) return;
  audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
});

/* SPEED */
speedBtn.addEventListener('click', () => {
  const idx = SPEED_CYCLE.indexOf(state.speed);
  const next = SPEED_CYCLE[(idx + 1) % SPEED_CYCLE.length];
  state.speed = next;
  audio.playbackRate = next;
  speedBtn.textContent = `${next}× velocidad`;
});

/* MINI PLAYER EVENTS */
miniPlay.addEventListener('click', () => togglePlay());
miniLeft.addEventListener('click', () => {
  if (!state.currentId) return;
  fullPlayer.hidden = false;
});

/* SLEEP TIMER */
sleepBtn.addEventListener('click', () => {
  sleepMenu.hidden = !sleepMenu.hidden;
});
sleepCancel.addEventListener('click', () => setSleepMinutes(0));
sleepOptions.forEach(btn => {
  btn.addEventListener('click', () => {
    const min = Number(btn.dataset.min || '0');
    setSleepMinutes(min);
  });
});

function setSleepMinutes(min) {
  sleepMenu.hidden = true;
  if (state.sleepTimerId) {
    clearTimeout(state.sleepTimerId);
    state.sleepTimerId = null;
  }
  if (!min) {
    sleepBadge.hidden = true;
    return;
  }
  const ms = min * 60 * 1000;
  state.sleepEndsAt = Date.now() + ms;
  sleepBadge.hidden = false;
  state.sleepTimerId = setTimeout(() => {
    pauseAudio();
    sleepBadge.hidden = true;
    state.sleepTimerId = null;
  }, ms);
}

/* TABS */
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    state.filter = tab.dataset.filter || 'todos';
    renderEpisodes();
  });
});

/* THEME BUTTON */
themeToggle.addEventListener('click', toggleTheme);

/* CONTINUE BUTTON */
continueBannerBtn.addEventListener('click', () => {
  if (!state.lastPlayed) return;
  openEpisode(state.lastPlayed.id);
});

/* CLOSE PLAYER */
playerClose.addEventListener('click', () => {
  fullPlayer.hidden = true;
});

/* INSTALL BUTTON (hint) */
if (installBtn) {
  installBtn.addEventListener('click', () => {
    alert('Para instalar, usa el menú de tu navegador: "Añadir a pantalla de inicio" o "Instalar app".');
  });
}

/* SERVICE WORKER */
function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

/* UTILS */
function formatTime(seconds) {
  const s = Math.floor(seconds || 0);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2,'0')}`;
}

/* KEYBOARD SPACE PLAY/PAUSE */
document.addEventListener('keydown', evt => {
  if (evt.code === 'Space' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
    evt.preventDefault();
    togglePlay();
  }
});