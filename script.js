/* ═══════════════════════════════════════════════════════════
   DIAN STUDY PRO — script.js  (corregido v2)
   Reproductor de podcasts — Concurso DIAN Gestor 1
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── DATA ──────────────────────────────────────────────── */
const EPISODES = [
  {
    id: 1, title: 'Fundamentos del concurso DIAN',
    file: 'audios/episodio 1. fundamentos.m4a',
    eje: 'generales', duration: '25:31',
    subtitulo: 'Marco básico para Gestor 1',
    foco: 'Fundamentos del empleo público y del proceso de Talento Humano', icon: '💡',
  },
  {
    id: 2, title: 'Principios del Estado y la función pública',
    file: 'audios/episodio 2 principios.m4a',
    eje: 'generales', duration: '13:10',
    subtitulo: 'Principios constitucionales y de la función pública',
    foco: 'Cómo se conectan con el rol del Gestor 1 en la DIAN', icon: '📜',
  },
  {
    id: 3, title: 'CPACA para el Gestor 1',
    file: 'audios/episodio3 cpaca.m4a',
    eje: 'generales', duration: '26:07',
    subtitulo: 'Procedimiento Administrativo y control',
    foco: 'Aspectos del CPACA clave para Talento Humano', icon: '⚖️',
  },
  {
    id: 4, title: 'MIPG y Gestión Documental en la DIAN',
    file: 'audios/Episodio 04 MIPG y Gestión Documental.m4a',
    eje: 'generales', duration: '25:51',
    subtitulo: 'Modelo Integrado y archivos',
    foco: 'Cómo el MIPG y la gestión documental soportan la labor del Gestor 1', icon: '📁',
  },
  {
    id: 5, title: 'El funcionario como diseñador de experiencias ciudadanas',
    file: 'audios/ep 5 El_funcionario_como_diseñador_de_experiencias_ciudadanas.m4a',
    eje: 'generales', duration: '19:58',
    subtitulo: 'Orientación al usuario y servicio',
    foco: 'Enfoque de servicio al ciudadano para el rol de Gestor 1', icon: '🧭',
  },
  {
    id: 6, title: 'Cultura tributaria y herramientas informáticas',
    file: 'audios/Ep_6 Episodio 06 Cultura Tributaria y Herramientas Informática.m4a',
    eje: 'generales', duration: '26:20',
    subtitulo: 'Contexto DIAN y competencias digitales',
    foco: 'Cultura tributaria básica y uso de herramientas informáticas', icon: '💻',
  },
  {
    id: 7, title: 'Gestión del Empleo y Planificación',
    file: 'audios/episodio 7 Gestión del Empleo y Planificación.m4a',
    eje: 'especificos', duration: '31:01',
    subtitulo: 'Núcleo de gestión del empleo',
    foco: 'Procedimientos de empleo, historias laborales y planeación de Talento Humano', icon: '🗂️',
  },
  {
    id: 8, title: 'Desarrollo del Talento y Gestión del Rendimiento en la DIAN',
    file: 'audios/Episodio 8.Desarrollo del Talento y Gestión del Rendimiento en la DIAN.m4a',
    eje: 'especificos', duration: '21:42',
    subtitulo: 'EDL, competencias y desarrollo',
    foco: 'Evaluación del desempeño y programas de desarrollo para el Gestor 1', icon: '📈',
  },
  {
    id: 9, title: 'Gestión de nómina para Gestor 1',
    file: 'audios/Episodio 9 gestión nómina.m4a',
    eje: 'especificos', duration: '14:39',
    subtitulo: 'Compensación y SGSS',
    foco: 'Claves operativas y de control en la gestión de la nómina', icon: '💰',
  },
  {
    id: 10, title: 'Relaciones humanas, bienestar y seguridad social',
    file: 'audios/episodio 10. Relaciones Humanas, Bienestar y Seguridad Social .m4a',
    eje: 'especificos', duration: '15:31',
    subtitulo: 'Bienestar y clima laboral',
    foco: 'Programas de bienestar, SGSS y manejo de relaciones humanas', icon: '🤝',
  },
  {
    id: 11, title: 'Orientación al logro e innovación para Gestor 1',
    file: 'audios/episodio11. Orientación al logro innovacion.m4a',
    eje: 'comportamentales', duration: '19:26',
    subtitulo: 'Logro e Innovación en Talento Humano',
    foco: 'Cómo actuar con alto nivel de logro e innovación en la DIAN', icon: '🎯',
  },
  {
    id: 12, title: 'Trabajo en equipo, adaptabilidad y comunicación',
    file: 'audios/episodio 12. trabajo en Equipo, Adaptabilidad y Comunicación.m4a',
    eje: 'comportamentales', duration: '23:51',
    subtitulo: 'Competencias relacionales clave',
    foco: 'Coordinación central–seccional, flexibilidad y comunicación efectiva', icon: '🗣️',
  },
  {
    id: 13, title: 'Simulacro final de Juicio Situacional (SJT)',
    file: 'audios/Episodio 13 Simulacro Final.m4a',
    eje: 'comportamentales', duration: '16:30',
    subtitulo: 'Integración de todo el curso',
    foco: 'Casos de alta complejidad y técnica para elegir la respuesta de mayor nivel profesional', icon: '✅',
  },
];

/* ─── STORAGE KEYS ────────────────────────────────────────── */
const STORAGE_KEY   = 'dian_progress';
const STORAGE_THEME = 'dian_theme';
const STORAGE_LAST  = 'dian_last';

/* ─── STATE ──────────────────────────────────────────────── */
let state = {
  currentId:    null,
  playing:      false,
  speed:        1,
  filter:       'todos',
  sleepTimerId: null,
  sleepEndsAt:  null,
  progress:     {},
  lastPlayed:   null,
};

/* Variable global para guardar el evento beforeinstallprompt */
let deferredInstallPrompt = null;

const SPEED_CYCLE = [1, 1.5, 2];

/* ─── DOM REFS ────────────────────────────────────────────── */
const audio              = document.getElementById('audioPlayer');
const episodesList       = document.getElementById('episodesList');
const globalProgressFill = document.getElementById('globalProgressFill');
const completedCount     = document.getElementById('completedCount');
const totalEpisodesEl    = document.getElementById('totalEpisodes');
const continueBanner     = document.getElementById('continueBanner');
const continueBannerTitle= document.getElementById('continueBannerTitle');
const continueBannerBtn  = document.getElementById('continueBannerBtn');
const tabs               = document.querySelectorAll('.tab');

// Full player
const fullPlayer    = document.getElementById('fullPlayer');
const playerClose   = document.getElementById('playerClose');
const playPauseBtn  = document.getElementById('playPauseBtn');
const seekbar       = document.getElementById('seekbar');
const seekbarFill   = document.getElementById('seekbarFill');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl   = document.getElementById('totalTime');
const skipBack      = document.getElementById('skipBack');
const skipFwd       = document.getElementById('skipFwd');
const speedBtn      = document.getElementById('speedBtn');
const artDisc       = document.getElementById('artDisc');
const fpTitle       = document.getElementById('fpTitle');
const fpSub         = document.getElementById('fpSub');
const fpFoco        = document.getElementById('fpFoco');
const fpEje         = document.getElementById('fpEje');

// Mini player
const miniPlayer        = document.getElementById('miniPlayer');
const miniTitle         = document.getElementById('miniTitle');
const miniSub           = document.getElementById('miniSub');
const miniPlay          = document.getElementById('miniPlay');
const miniProgressFill  = document.getElementById('miniProgressFill');
const miniLeft          = document.getElementById('miniLeft');

// Sleep
const sleepBtn    = document.getElementById('sleepBtn');
const sleepMenu   = document.getElementById('sleepMenu');
const sleepBadge  = document.getElementById('sleepBadge');
const sleepOptions= document.querySelectorAll('.sleep-option');

// Theme
const themeToggle = document.getElementById('themeToggle');

// Install
const installBtn       = document.getElementById('installBtn');
const installHeaderBtn = document.getElementById('installHeaderBtn');
const installModal     = document.getElementById('installModal');
const installModalClose= document.getElementById('installModalClose');
const installModalBody = document.getElementById('installModalBody');
const installModalBack = document.getElementById('installModalBackdrop');

/* ═══════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════ */
function init() {
  totalEpisodesEl.textContent = String(EPISODES.length);
  loadFromStorage();
  applyTheme();
  renderEpisodes();
  updateGlobalProgress();
  showContinueBanner();
  registerServiceWorker();
  bindEvents();
  setupInstallPWA();
}

/* ─── STORAGE ─────────────────────────────────────────────── */
function loadFromStorage() {
  try {
    state.progress   = JSON.parse(localStorage.getItem(STORAGE_KEY))  || {};
    state.lastPlayed = JSON.parse(localStorage.getItem(STORAGE_LAST)) || null;
  } catch {
    state.progress   = {};
    state.lastPlayed = null;
  }
  const savedTheme = localStorage.getItem(STORAGE_THEME);
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
}

function saveProgress(id, position, completed = false) {
  const prev     = state.progress[id] || {};
  const duration = audio.duration || prev.duration || 0;
  const percent  = duration ? Math.min(100, (position / duration) * 100) : (prev.percent || 0);
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

/* ─── THEME ───────────────────────────────────────────────── */
function applyTheme() {
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  localStorage.setItem(STORAGE_THEME, theme);
}
function toggleTheme() {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(STORAGE_THEME, next);
}

/* ─── CONTINUE BANNER ─────────────────────────────────────── */
function showContinueBanner() {
  if (!state.lastPlayed) return;
  const { id, position } = state.lastPlayed;
  const ep = EPISODES.find(e => e.id === id);
  if (!ep || !position || position < 5) return;
  if (state.progress[id]?.completed) return;
  continueBannerTitle.textContent = ep.title;
  continueBanner.hidden = false;
}

/* ─── RENDER EPISODES ─────────────────────────────────────── */
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
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');

    const progress    = state.progress[ep.id] || {};
    const percent     = progress.percent || 0;
    const isCompleted = !!progress.completed;
    const isCurrent   = state.currentId === ep.id;

    if (isCompleted) card.classList.add('completed');
    if (isCurrent)   card.classList.add('playing');

    card.innerHTML = `
      <div class="ep-number">${ep.icon || ep.id}</div>
      <div class="ep-info">
        <div class="ep-tag-row">
          <span class="ep-tag ${ep.eje}">${labelForEje(ep.eje)}</span>
        </div>
        <div class="ep-title">${ep.title}</div>
        <div class="ep-sub">${ep.subtitulo}</div>
        <div class="ep-foco">${ep.foco}</div>
        <button class="btn-download" onclick="downloadAudio(event, '${ep.file}', this)">
           📥 Descargar
        </button>
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
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEpisode(ep.id); }
    });
    episodesList.appendChild(card);
  });
}

function labelForEje(eje) {
  if (eje === 'generales')       return 'Generales esenciales';
  if (eje === 'especificos')     return 'Talento Humano';
  if (eje === 'comportamentales')return 'Comportamentales';
  return eje;
}

/* ─── GLOBAL PROGRESS ─────────────────────────────────────── */
function updateGlobalProgress() {
  const values    = EPISODES.map(ep => state.progress[ep.id] || {});
  const completed = values.filter(v => v.completed).length;
  const avg       = values.length
    ? Math.round(values.reduce((a, v) => a + (v.percent || 0), 0) / values.length)
    : 0;
  completedCount.textContent       = String(completed);
  globalProgressFill.style.width   = `${avg}%`;
}

/* ═══════════════════════════════════════════════════════════
   PLAYER
   ═══════════════════════════════════════════════════════════ */
function openEpisode(id) {
  const ep = EPISODES.find(e => e.id === id);
  if (!ep) return;

  const srcChanged = state.currentId !== id;
  state.currentId  = id;

  const progress = state.progress[id] || {};
  const position = progress.position || 0;

  if (srcChanged) {
    audio.src = ep.file;
    audio.load();
  }

  updateFullPlayerMeta(ep);
  updateMiniPlayerMeta(ep, progress.percent || 0);
  miniPlayer.hidden = false;

  // Si cambia de episodio, restablecer posición
  if (srcChanged && position > 5) {
    audio.addEventListener('loadedmetadata', function onMeta() {
      audio.currentTime = Math.min(position, audio.duration - 1 || position);
      audio.removeEventListener('loadedmetadata', onMeta);
    });
  }

  openFullPlayer();
  playAudio();
  renderEpisodes();
}

function openFullPlayer() {
  fullPlayer.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeFullPlayer() {
  fullPlayer.hidden = true;
  document.body.style.overflow = '';
}

/* ─── META ────────────────────────────────────────────────── */
function updateFullPlayerMeta(ep) {
  fpTitle.textContent = ep.title;
  fpSub.textContent   = ep.subtitulo;
  fpFoco.textContent  = ep.foco;
  fpEje.textContent   = labelForEje(ep.eje);
}

function updateMiniPlayerMeta(ep, percent) {
  miniTitle.textContent          = ep.title;
  miniSub.textContent            = ep.subtitulo;
  miniProgressFill.style.width   = `${percent}%`;
}

/* ─── PLAYBACK ────────────────────────────────────────────── */
function playAudio() {
  if (!state.currentId) return;
  audio.playbackRate = state.speed;
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
    openEpisode(EPISODES[0].id);
    return;
  }
  if (audio.paused) playAudio();
  else              pauseAudio();
}

function updatePlayButtons() {
  // Full player
  playPauseBtn.querySelector('.icon-play').hidden  =  state.playing;
  playPauseBtn.querySelector('.icon-pause').hidden = !state.playing;
  // Mini player
  miniPlay.querySelector('.icon-play').hidden  =  state.playing;
  miniPlay.querySelector('.icon-pause').hidden = !state.playing;
  // Disco
  if (state.playing) artDisc.classList.add('spinning');
  else               artDisc.classList.remove('spinning');
}

/* ─── AUDIO EVENTS ────────────────────────────────────────── */
audio.addEventListener('loadedmetadata', () => {
  totalTimeEl.textContent = formatTime(audio.duration || 0);
});

audio.addEventListener('timeupdate', () => {
  if (!audio.duration || !state.currentId) return;
  const pct = (audio.currentTime / audio.duration) * 100;

  seekbar.value                  = pct;
  seekbarFill.style.width        = `${pct}%`;
  miniProgressFill.style.width   = `${pct}%`;
  currentTimeEl.textContent      = formatTime(audio.currentTime);
  totalTimeEl.textContent        = formatTime(audio.duration);

  if (Math.floor(audio.currentTime) % 5 === 0) {
    saveProgress(state.currentId, audio.currentTime);
    saveLastPlayed(state.currentId, audio.currentTime);
    updateGlobalProgress();
    const fill = episodesList.querySelector(`[data-id="${state.currentId}"] .ep-progress-fill`);
    if (fill) fill.style.width = `${pct}%`;
  }

  if (state.sleepEndsAt && Date.now() >= state.sleepEndsAt) {
    pauseAudio();
    clearSleepTimer();
  }
});

audio.addEventListener('ended', () => {
  if (!state.currentId) return;
  saveProgress(state.currentId, audio.duration || 0, true);
  updateGlobalProgress();
  renderEpisodes();
  pauseAudio();
});

audio.addEventListener('error', () => {
  state.playing = false;
  updatePlayButtons();
  artDisc.classList.remove('spinning');
});

/* ─── SEEKBAR ─────────────────────────────────────────────── */
seekbar.addEventListener('input', () => {
  if (!audio.duration) return;
  const pct = Number(seekbar.value) || 0;
  seekbarFill.style.width   = `${pct}%`;
  currentTimeEl.textContent = formatTime((pct / 100) * audio.duration);
});
seekbar.addEventListener('change', () => {
  if (!audio.duration) return;
  audio.currentTime = (Number(seekbar.value) / 100) * audio.duration;
});

/* ─── SKIP ────────────────────────────────────────────────── */
skipBack.addEventListener('click', () => {
  if (!state.currentId) return;
  audio.currentTime = Math.max(0, audio.currentTime - 15);
});
skipFwd.addEventListener('click', () => {
  if (!state.currentId) return;
  audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 30);
});

/* ─── SPEED ───────────────────────────────────────────────── */
speedBtn.addEventListener('click', () => {
  const idx   = SPEED_CYCLE.indexOf(state.speed);
  state.speed = SPEED_CYCLE[(idx + 1) % SPEED_CYCLE.length];
  audio.playbackRate = state.speed;
  speedBtn.textContent = `${state.speed}× velocidad`;
  speedBtn.classList.toggle('chip-active', state.speed !== 1);
});

/* ─── MINI PLAYER ─────────────────────────────────────────── */
miniPlay.addEventListener('click', e => { e.stopPropagation(); togglePlay(); });
miniLeft.addEventListener('click', () => {
  if (state.currentId) openFullPlayer();
});

/* ─── CLOSE FULL PLAYER ───────────────────────────────────── */
playerClose.addEventListener('click', closeFullPlayer);

// Swipe-down
let touchStartY = 0;
fullPlayer.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
fullPlayer.addEventListener('touchend', e => {
  const delta = e.changedTouches[0].clientY - touchStartY;
  if (delta > 80) closeFullPlayer();
}, { passive: true });

/* ─── ▶️ AGREGADO: listener para el botón play/pause del reproductor grande */
playPauseBtn.addEventListener('click', togglePlay);

/* ─── SLEEP TIMER ─────────────────────────────────────────── */
sleepBtn.addEventListener('click', e => {
  e.stopPropagation();
  sleepMenu.hidden = !sleepMenu.hidden;
});

sleepOptions.forEach(btn => {
  btn.addEventListener('click', () => {
    const min = Number(btn.dataset.min || '0');
    setSleepMinutes(min);
  });
});

function setSleepMinutes(min) {
  sleepMenu.hidden = true;
  clearSleepTimer();
  if (!min) return;
  const ms = min * 60 * 1000;
  state.sleepEndsAt  = Date.now() + ms;
  sleepBadge.hidden  = false;
  state.sleepTimerId = setTimeout(() => {
    pauseAudio();
    clearSleepTimer();
  }, ms);
}

function clearSleepTimer() {
  if (state.sleepTimerId) clearTimeout(state.sleepTimerId);
  state.sleepTimerId = null;
  state.sleepEndsAt  = null;
  sleepBadge.hidden  = true;
}

document.addEventListener('click', e => {
  if (!sleepMenu.hidden && !sleepBtn.contains(e.target) && !sleepMenu.contains(e.target)) {
    sleepMenu.hidden = true;
  }
});

/* ═══════════════════════════════════════════════════════════
   INSTALACIÓN PWA
   ═══════════════════════════════════════════════════════════ */
function setupInstallPWA() {
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredInstallPrompt = e;
    installHeaderBtn.hidden = false;
    installBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Instalar app
    `;
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    installBtn.hidden        = true;
    installHeaderBtn.hidden  = true;
  });

  [installBtn, installHeaderBtn].forEach(btn => {
    btn.addEventListener('click', handleInstallClick);
  });

  installModalClose.addEventListener('click', closeInstallModal);
  installModalBack.addEventListener('click', closeInstallModal);
}

async function handleInstallClick() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    const { outcome } = await deferredInstallPrompt.userChoice;
    if (outcome === 'accepted') {
      deferredInstallPrompt = null;
      installBtn.hidden       = true;
      installHeaderBtn.hidden = true;
    }
    return;
  }

  if (window.matchMedia('(display-mode: standalone)').matches || navigator.standalone) {
    showInstallModal('✅ Ya instalada', '<p>La aplicación ya está instalada en tu dispositivo.</p>');
    return;
  }

  const isIOS    = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS) {
    showInstallModal('Instalar en iPhone / iPad', `
      <ol>
        <li>Toca <strong>Compartir</strong> <span style="font-size:1.2em">⎙</span> en Safari.</li>
        <li>Selecciona <strong>"Añadir a pantalla de inicio"</strong>.</li>
        <li>Toca <strong>"Añadir"</strong>.</li>
      </ol>
      <p style="margin-top:12px;font-size:.8rem;">Solo funciona en Safari. Si estás en otro navegador, abre esta página en Safari primero.</p>`);
    return;
  }

  const isAndroid = /Android/.test(navigator.userAgent);
  if (isAndroid) {
    showInstallModal('Instalar en Android', `
      <ol>
        <li>Toca el menú <strong>⋮</strong> en Chrome.</li>
        <li>Selecciona <strong>"Instalar aplicación"</strong> o <strong>"Añadir a pantalla de inicio"</strong>.</li>
        <li>Confirma tocando <strong>"Instalar"</strong>.</li>
      </ol>`);
    return;
  }

  showInstallModal('Instalar en tu computador', `
    <ol>
      <li>En Chrome: haz clic en el ícono <strong>⊕</strong> en la barra de direcciones.</li>
      <li>En Edge: <strong>⋯ → Aplicaciones → Instalar este sitio</strong>.</li>
    </ol>`);
}

function showInstallModal(title, bodyHtml) {
  document.getElementById('installModalTitle').textContent = title;
  installModalBody.innerHTML = bodyHtml;
  installModal.hidden     = false;
  installModalBack.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeInstallModal() {
  installModal.hidden     = true;
  installModalBack.hidden = true;
  if (fullPlayer.hidden) document.body.style.overflow = '';
}

/* ═══════════════════════════════════════════════════════════
   BIND EVENTS
   ═══════════════════════════════════════════════════════════ */
function bindEvents() {
  themeToggle.addEventListener('click', toggleTheme);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.filter = tab.dataset.filter || 'todos';
      renderEpisodes();
    });
  });

  continueBannerBtn.addEventListener('click', () => {
    if (!state.lastPlayed) return;
    openEpisode(state.lastPlayed.id);
    continueBanner.hidden = true;
  });

  document.addEventListener('keydown', e => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
    if (e.code === 'Space')       { e.preventDefault(); togglePlay(); }
    if (e.code === 'ArrowLeft')   { audio.currentTime = Math.max(0, audio.currentTime - 15); }
    if (e.code === 'ArrowRight')  { audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 30); }
    if (e.code === 'Escape') {
      if (!installModal.hidden) { closeInstallModal(); return; }
      if (!fullPlayer.hidden)   { closeFullPlayer(); }
    }
  });
}

/* ─── SERVICE WORKER ──────────────────────────────────────── */
function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

/* ─── UTILS ───────────────────────────────────────────────── */
function formatTime(s) {
  const sec = Math.floor(s || 0);
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
}

/* ─── START ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', init);

// Función para descargar un audio manualmente (Mejorada)
async function downloadAudio(event, audioFile, btnElement) {
  // 1. Evitamos que el clic abra también el reproductor
  event.stopPropagation();

  if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) {
    alert("Tu navegador aún no está listo para descargas offline o estás en modo incógnito. Recarga la página e intenta de nuevo.");
    return;
  }

  // 2. Guardamos el texto original y mostramos estado de carga
  const originalText = btnElement.innerHTML;
  btnElement.innerHTML = '⏳ Descargando...';
  btnElement.disabled = true; // Desactivar botón para evitar dobles clics
  btnElement.style.opacity = '0.7';

  try {
    const cache = await caches.open('dian-study-v3'); 
    
    // 3. Verificamos si ya está descargado para no gastar datos a lo loco
    const existingResponse = await cache.match(audioFile);
    if (existingResponse) {
      btnElement.innerHTML = '✅ Descargado';
      return; 
    }

    // 4. Descargamos el archivo
    const response = await fetch(audioFile);
    
    if (!response.ok) throw new Error("Error en la red al descargar");

    // 5. Lo guardamos en la caché
    await cache.put(audioFile, response);
    
    // 6. Éxito visual
    btnElement.innerHTML = '✅ Descargado';
    btnElement.style.opacity = '1';
    
  } catch (err) {
    console.error("Error en la descarga:", err);
    alert("Error al descargar el audio. Revisa tu conexión a internet.");
    
    // Restauramos el botón si falla
    btnElement.innerHTML = originalText;
    btnElement.disabled = false;
    btnElement.style.opacity = '1';
  }
}