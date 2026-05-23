/* ═══════════════════════════════════════════════════════════
   DIAN STUDY PRO — sw.js (Configurado para descargas manuales)
   ═══════════════════════════════════════════════════════════ */

'use strict';

const CACHE_NAME = 'dian-study-v3'; // Incrementa la versión para forzar actualización

const urlsToCache = [
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
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
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // MODIFICACIÓN PARA AUDIOS:
  // Si es un audio, buscamos primero en la caché (Cache-First).
  // Si no está, lo traemos de la red.
  if (url.pathname.includes('/audios/') || url.pathname.endsWith('.m4a')) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        return cachedResponse || fetch(event.request).then(networkResponse => {
          // Nota: No guardamos automáticamente aquí para no saturar 
          // la caché, solo se guardarán los que el usuario descargue manualmente.
          return networkResponse;
        });
      })
    );
    return;
  }

  // Google Fonts: red primero
  if (url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com') {
    event.respondWith(fetch(event.request).catch(() => new Response('', { status: 408 })));
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
      });
    })
  );
});