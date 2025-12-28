const CACHE = 'stvincent-v1';
// Use relative paths to ensure it works on GitHub Pages subfolders
const OFFLINE_URL = 'index.html';

const ASSETS_TO_CACHE = [
  OFFLINE_URL,
  'css/styles.css',
  'js/main.js',
  'manifest.json', // Added from PWA requirements [1]
  // Add your main logo or a few gallery images here if desired [1]
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      console.log('Caching essential assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  // Navigation strategy: Network first, fallback to offline page
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // Asset strategy: Cache first, fallback to network
  // This helps external tools like Google Maps and WhatsApp load fresh [1]
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
