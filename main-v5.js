/**
 * Baasim Portfolio v5.8 - Cinematic Experience Engine
 * Handles: Preloader, Hero Video/Audio Sync, Smooth Routing, and Global UX Polish
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ═══════════════════════════════════════════════════════
       1. GLOBAL STATE & SELECTORS
       ═══════════════════════════════════════════════════════ */
    const heroVideo = document.getElementById('hero-video');
    const preloader = document.getElementById('preloader');
    const navbar = document.querySelector('.navbar');
    let experienceActivated = false;

    /* ═══════════════════════════════════════════════════════
       2. CINEMATIC PRELOADER & VIDEO INIT
       ═══════════════════════════════════════════════════════ */
    const initExperience = () => {
        if (!heroVideo) return;

        heroVideo.muted = true;
        heroVideo.loop = true;
        heroVideo.playsInline = true;
        heroVideo.preload = 'auto';

        heroVideo.play().catch(e => console.warn("Autoplay blocked:", e));

        const onReady = () => {
            setTimeout(() => {
                if (preloader) {
                    preloader.classList.add('fade-out');
                    navbar?.classList.add('show');
                }
            }, 1000);
        };

        if (heroVideo.readyState >= 3) {
            onReady();
        } else {
            heroVideo.addEventListener('canplaythrough', onReady, { once: true });
        }

        setTimeout(() => {
            if (!experienceActivated) {
                const hint = document.getElementById('unmute-hint');
                if (hint) hint.style.opacity = '1';
            }
        }, 3000);

        setTimeout(() => {
            if (preloader && !preloader.classList.contains('fade-out')) {
                preloader.classList.add('fade-out');
                navbar?.classList.add('show');
            }
        }, 5000);
    };

    /* ═══════════════════════════════════════════════════════
       3. THE ACTIVATION BRIDGE
       ═══════════════════════════════════════════════════════ */
    const activateAudio = () => {
        if (experienceActivated || !heroVideo) return;
        
        const hint = document.getElementById('unmute-hint');
        if (hint) hint.style.opacity = '0';

        heroVideo.muted = false;
        heroVideo.volume = 0; 
        
        let vol = 0;
        const fadeInterval = setInterval(() => {
            vol += 0.1;
            if (vol >= 1) {
                heroVideo.volume = 1;
                clearInterval(fadeInterval);
            } else {
                heroVideo.volume = vol;
            }
        }, 50);

        experienceActivated = true;
        
        document.removeEventListener('click', activateAudio);
        document.removeEventListener('touchstart', activateAudio, { passive: true });
        document.removeEventListener('keydown', activateAudio);
    };

    document.addEventListener('click', activateAudio, { once: true });
    document.addEventListener('touchstart', activateAudio, { once: true, passive: true });
    document.addEventListener('keydown', activateAudio, { once: true });

    if (heroVideo) {
        // Native loop is usually better, but we ensure play() is called if it stops
        heroVideo.addEventListener('ended', () => {
            heroVideo.currentTime = 0;
            heroVideo.play().catch(e => console.error("Loop failed:", e));
        });
    }

    /* ═══════════════════════════════════════════════════════
       5. NAVIGATION HIGHLIGHTING (The Dash Notation)
       ═══════════════════════════════════════════════════════ */
    const updateNavHighlight = (targetUrl) => {
        const navLinks = document.querySelectorAll('.nav-links a');
        if (!navLinks.length) return;

        // Extract filename from URL (e.g., 'about.html')
        let currentFile = targetUrl.split('/').pop().split('?')[0].split('#')[0] || 'index.html';
        if (currentFile === '' || currentFile === '/') currentFile = 'index.html';

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            link.classList.remove('active');
            
            // Exact match or handle index fallback
            if (linkHref === currentFile) {
                link.classList.add('active');
            } else if (currentFile === 'index.html' && (linkHref === '/' || linkHref === '')) {
                link.classList.add('active');
            }
        });
    };

    /* ═══════════════════════════════════════════════════════
       6. INTERSECTION OBSERVER (Fade-in Animations)
       ═══════════════════════════════════════════════════════ */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('appear');
        });
    }, { threshold: 0.1 });

    const observeFaders = () => {
        document.querySelectorAll('.fade-in, .section-header, .stat-card, .project-card, .company-card, .skill-category').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    };

    /* ═══════════════════════════════════════════════════════
       6. SMOOTH NAVIGATION (View Transitions API)
       ═══════════════════════════════════════════════════════ */
    const handleNavClick = async (e) => {
        const link = e.target.closest('a');
        if (!link) return;
        
        const url = link.getAttribute('href');
        if (!url || url.startsWith('http') || url.startsWith('#') || url.includes('mailto:')) return;

        e.preventDefault();

        if (document.startViewTransition) {
            document.startViewTransition(async () => {
                await performRouting(url);
            });
        } else {
            await performRouting(url);
        }
    };

    const performRouting = async (url) => {
        try {
            const response = await fetch(url);
            const html = await response.text();
            const parser = new DOMParser();
            const newDoc = parser.parseFromString(html, 'text/html');
            const newMain = newDoc.querySelector('main');
            const currentMain = document.querySelector('main');

            if (newMain && currentMain) {
                const isHeroTarget = url === 'index.html' || url === '/' || url === '';
                
                // 1. Toggle Hero Mode
                if (isHeroTarget) {
                    document.body.classList.add('hero-mode');
                } else {
                    document.body.classList.remove('hero-mode');
                }

                // 2. Extract and Inject styles
                const newStyles = newDoc.querySelectorAll('head style');
                document.querySelectorAll('head style[data-page-style]').forEach(s => s.remove());
                newStyles.forEach(s => {
                    const clone = s.cloneNode(true);
                    clone.setAttribute('data-page-style', '');
                    document.head.appendChild(clone);
                });

                // 3. Swap content
                currentMain.innerHTML = newMain.innerHTML;
                document.title = newDoc.title;
                window.history.pushState({}, '', url);
                
                // 4. Update Nav Highlighting
                updateNavHighlight(url);

                // 5. Re-init Engines
                if (window.lucide) window.lucide.createIcons();
                observeFaders();
                
                if (isHeroTarget) {
                    initTypewriter();
                    if (heroVideo) heroVideo.play();
                } else {
                    if (heroVideo) heroVideo.pause();
                }

                window.scrollTo({ top: 0, behavior: 'instant' });
                updateCursor();
            }
        } catch (err) {
            console.error('Navigation failed:', err);
            window.location.href = url;
        }
    };

    window.navigateTo = performRouting;
    document.addEventListener('click', handleNavClick);

    /* ═══════════════════════════════════════════════════════
       7. GLOBAL CURSOR HANDLER
       ═══════════════════════════════════════════════════════ */
    const updateCursor = () => {
        const interactive = document.querySelectorAll('a, button, .btn, .project-card, .skill-category, .stat-card, .contact-item, .company-card');
        interactive.forEach(el => {
            el.style.cursor = 'pointer';
        });
    };

    updateCursor();
    const cursorObserver = new MutationObserver(updateCursor);
    cursorObserver.observe(document.body, { childList: true, subtree: true });

    /* ═══════════════════════════════════════════════════════
       8. TYPEWRITER EFFECT
       ═══════════════════════════════════════════════════════ */
    const initTypewriter = () => {
        const typewriter = document.getElementById('typewriter');
        if (!typewriter) return;
        
        typewriter.textContent = ""; 
        const phrases = [
            "Operations & Coordination Lead",
            "Strategic Execution Expert",
            "AI Systems Architect",
            "Youth Leadership Advocate"
        ];
        let i = 0, j = 0, isDeleting = false;

        const type = () => {
            const current = phrases[i];
            const el = document.getElementById('typewriter');
            if (!el) return;
            el.textContent = isDeleting 
                ? current.substring(0, j--) 
                : current.substring(0, j++);

            if (!isDeleting && j === current.length + 1) {
                isDeleting = true;
                setTimeout(type, 2000);
            } else if (isDeleting && j === 0) {
                isDeleting = false;
                i = (i + 1) % phrases.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 30 : 60);
            }
        };
        type();
    };

    /* ═══════════════════════════════════════════════════════
       10. INITIALIZE
       ═══════════════════════════════════════════════════════ */
    initExperience();
    initTypewriter();
    observeFaders();
    updateNavHighlight(window.location.pathname);
    if (window.lucide) window.lucide.createIcons();
});
