/* Carnet Reflux — fonctionnement hors ligne.
   L'app est mise en cache à l'installation ; les données de la personne
   restent dans le navigateur (localStorage) et ne passent jamais par ici. */
const CACHE = "reflux-1.2"; // même numéro que APP_VERSION dans index.html
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-192.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;

  /* la page elle-même : réseau d'abord (pour recevoir les mises à jour), cache en secours */
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put("./index.html", copy)); return res; })
        .catch(() => caches.match("./index.html").then(r => r || caches.match("./")))
    );
    return;
  }

  /* polices Google : cache d'abord, rafraîchi en arrière-plan */
  if (/fonts\.(googleapis|gstatic)\.com/.test(req.url)) {
    e.respondWith(
      caches.match(req).then(hit => {
        const net = fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; }).catch(() => hit);
        return hit || net;
      })
    );
    return;
  }

  /* fichiers de l'app : cache d'abord */
  if (new URL(req.url).origin === self.location.origin) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return res;
      }).catch(() => hit))
    );
  }
});
