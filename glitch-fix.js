(function() {
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
