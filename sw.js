const C = 'biblegram-v4';
const F = ['./', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png', 'bible.json', 'plan.json'];
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(F))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(res => {
      if (res.ok) { const cl = res.clone(); caches.open(C).then(c => c.put(e.request, cl)); }
      return res;
    }).catch(() => caches.match(e.request))
  );
});
