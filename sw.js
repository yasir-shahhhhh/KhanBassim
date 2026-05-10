const CACHE_NAME = 'khan-ai-v3.5-crunchy';
const ASSETS = [
    '/',
    '/index.html',
    '/about.html',
    '/skills.html',
    '/experience.html',
    '/projects.html',
    '/contact.html',
    '/style-v45.css',
    '/script.js',
    '/khan-inject-v45.js',
    '/khan-logic-v45.js',
    '/assets/Khan AI logo.png',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://unpkg.com/lucide@0.473.0/dist/umd/lucide.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then(res => res || fetch(e.request))
    );
});
