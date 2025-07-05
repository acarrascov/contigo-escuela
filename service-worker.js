const CACHE_NAME = "contigo-escuela-v1"; // Puedes cambiar v1 a v2, v3, etc. cuando hagas cambios

const urlsToCache = [
  "/",
  "/index.html",
  "/padres.html",
  "/style.css",
  "/manifest.json",
  "/icono.png"
];

// Instala el SW y guarda en caché los archivos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activa el SW y elimina cachés antiguas
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

// Responde con contenido actualizado o desde caché si está offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => caches.match(event.request))
  );
});
