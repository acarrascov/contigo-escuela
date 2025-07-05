self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("contigo-v1").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./padres.html",
        "./public/style.css",
        "./script.js",
        "./icono.png"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});