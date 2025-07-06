const CACHE_NAME = "contigo-escuela-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/padres.html",
  "/style.css",
  "/manifest.json",
  "/icono.png"
];

// Instalación del service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activación y limpieza de caches antiguos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

// Interceptar solicitudes
self.addEventListener("fetch", (event) => {
  // Solo manejar peticiones GET de mismo origen
  if (event.request.method !== "GET" || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Si está en caché, úsalo
      if (cachedResponse) {
        return cachedResponse;
      }

      // Si no está, intenta obtenerlo de la red y almacenarlo
      return fetch(event.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      }).catch(() => {
        // Si falla la red y no está en caché, puedes devolver una respuesta predeterminada
        return caches.match("/index.html");
      });
    })
  );
});
