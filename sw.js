/* ═══════════════════════════════════════════════════════════
   DIAN STUDY PRO — sw.js  (corregido)
   cache-first para assets. Audios siempre desde la red.
   ═══════════════════════════════════════════════════════════ */

'use strict';

const CACHE_NAME = 'dian-study-v2';   // ← incrementado para forzar actualización

const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

/* INSTALL */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

/* ACTIVATE — limpiar caches viejos */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
      )
    ).then(() => self.clients.claim())
  );
});

/* FETCH */
self.addEventListener('fetch', event => {
  // Solo manejar GET
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Audios: siempre red (no cachear)
  if (url.pathname.includes('/audios/') || url.pathname.endsWith('.m4a')) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response('Audio no disponible offline', { status: 503 })
      )
    );
    return;
  }

  // Google Fonts: red primero, sin cachear
  if (url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com') {
    event.respondWith(
      fetch(event.request).catch(() => new Response('', { status: 408 }))
    );
    return;
  }

  // Todo lo demás: cache-first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => {
        // Fallback offline: devolver shell para navegación
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return new Response('', { status: 408, statusText: 'Offline' });
      });
    })
  );
});
