(function() {
    // FORCE CACHE PURGE FOR "SUPER CRUNCHY" UPDATE
    const SITE_VERSION = '3.5';
    if (localStorage.getItem('khan_site_version') !== SITE_VERSION) {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(regs => {
                for (let reg of regs) reg.unregister();
            });
        }
        caches.keys().then(names => {
            for (let name of names) caches.delete(name);
        });
        localStorage.setItem('khan_site_version', SITE_VERSION);
        console.log('CRITICAL UPDATE: Cache Purged');
    }

    const killGlitch = () => {
        const glitch = document.getElementById('khan-image-modal');
        if (glitch && !glitch.classList.contains('safe-modal')) {
            glitch.style.display = 'none';
            glitch.remove(); 
        }
        document.querySelectorAll('img[alt="Viewed Image"]').forEach(img => {
            if (!img.closest('#chat-interface')) img.remove();
        });
    };
    killGlitch();
    window.addEventListener('DOMContentLoaded', killGlitch);
    setInterval(killGlitch, 1000);
})();
