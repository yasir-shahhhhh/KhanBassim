const CACHE_NAME = 'baasim-portfolio-v6.1.8';
const ASSETS = [
    '/',
    '/index.html',
    '/about.html',
    '/experience.html',
    '/skills.html',
    '/projects.html',
    '/team-moments.html',
    '/contact.html',
    '/proteios.html',
    '/inamigos.html',
    '/style-v45.css?v=6.1.8',
    '/main-v5.js?v=6.1.8',
    '/khan-inject-v45.js?v=6.1.8',
    '/assets/profile-v5.jpeg',
    '/assets/logo3.jpeg',
    '/assets/thumbnail1.jpeg'
];

self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            );
        })
    );
});

self.addEventListener('fetch', (e) => {
    // Network-first strategy for HTML and JS to ensure updates
    if (e.request.mode === 'navigate' || e.request.url.endsWith('.js') || e.request.url.endsWith('.html')) {
        e.respondWith(
            fetch(e.request).catch(() => caches.match(e.request))
        );
    } else {
        e.respondWith(
            caches.match(e.request).then(res => res || fetch(e.request))
        );
    }
});
