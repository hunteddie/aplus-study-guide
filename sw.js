// SERVICE WORKER
// A small script the browser runs in the background for this app. Its one job here is offline support:
// it keeps a copy of the app's own files, and serves that copy when there is no connection.
// Strategy: try the network first so updates arrive straight away, and fall back to the saved copy.

const CACHE = "aplus-study-v2";
const FILES = ["./", "index.html", "config.js", "lib/supabase.js", "manifest.webmanifest",
               "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];

// When first installed, save a copy of every file the app needs.
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

// When a new version takes over, delete copies saved by older versions.
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys()
    .then(names => Promise.all(names.filter(n => n !== CACHE).map(n => caches.delete(n))))
    .then(() => self.clients.claim()));
});

// Handle the app's own files only. Requests to Supabase go straight to the network untouched.
self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.ok) { const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(request, copy)); }
        return response;
      })
      .catch(() => caches.match(request, { ignoreSearch: true }).then(hit => hit || caches.match("index.html")))
  );
});
