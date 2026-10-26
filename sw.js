// Generated at build time. Same-origin GETs under the site's base only: GitHub API traffic never touches this cache.
const VERSION = "linemark-Hnn4ijslinemarkappassetsworkerD1lNUQAAjs";
const BASE = "/linemark-app/";
const SHELL = ["/linemark-app/","/linemark-app/manifest.webmanifest","/linemark-app/icon.svg","/linemark-app/assets/index--8H8TOcS.js","/linemark-app/assets/atkinson-hyperlegible-mono-latin-400-normal-CmMGer93.woff2","/linemark-app/assets/dom-DJvJtocY.css","/linemark-app/assets/host-grotesk-latin-400-normal-qDxuE_yq.woff2","/linemark-app/assets/host-grotesk-latin-500-normal-B7155YqD.woff2","/linemark-app/assets/index-Dkrwp7io.css","/linemark-app/assets/iosevka-charon-mono-latin-400-normal-BZzJ5aZb.woff2","/linemark-app/assets/worker-CDIHnn4i.js","/linemark-app/assets/worker-D1lNUQAA.js"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith("linemark-") && k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms));
self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return;
  if (req.mode === "navigate") {
    // Network first so a new release shows up at once; the saved shell when offline or slow. A deep link comes
    // back from Pages as its 404 page (the same app), which is fine to show.
    e.respondWith(Promise.race([fetch(req), timeout(4000)]).catch(() => caches.match(BASE).then((hit) => hit || Response.error())));
    return;
  }
  if (url.pathname.startsWith(BASE + "assets/") || SHELL.includes(url.pathname)) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); e.waitUntil(caches.open(VERSION).then((c) => c.put(req, copy))); }
      return res;
    })));
  }
});
