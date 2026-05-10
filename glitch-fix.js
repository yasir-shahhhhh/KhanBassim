(function() {
    // FORCE CACHE PURGE FOR "SUPER CRUNCHY" UPDATE
    const SITE_VERSION = '4.3';
    const forcePurge = new URLSearchParams(window.location.search).has('purge');

    if (localStorage.getItem('khan_site_version') !== SITE_VERSION || forcePurge) {
        console.log('NUCLEAR PURGE INITIATED...');
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(regs => {
                for (let reg of regs) reg.unregister();
            });
        }
        caches.keys().then(names => {
            for (let name of names) caches.delete(name);
        });
        localStorage.clear();
        sessionStorage.clear();
        localStorage.setItem('khan_site_version', SITE_VERSION);
        
        if (forcePurge) {
            // Remove the purge flag and reload
            const url = new URL(window.location.href);
            url.searchParams.delete('purge');
            window.location.replace(url.toString());
        } else {
            window.location.reload(true);
        }
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
