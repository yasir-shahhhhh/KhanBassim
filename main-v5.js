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
        if (!heroVideo) {
            // If no hero video (sub-pages), fade out preloader quickly
            setTimeout(() => {
                preloader?.classList.add('fade-out');
                navbar?.classList.add('show');
            }, 1000);
            return;
        }

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
            }, 1500);
        };

        if (heroVideo.readyState >= 3) {
            onReady();
        } else {
            heroVideo.addEventListener('canplaythrough', onReady, { once: true });
        }

        // Safety timeout
        setTimeout(() => {
            if (preloader && !preloader.classList.contains('fade-out')) {
                preloader.classList.add('fade-out');
                navbar?.classList.add('show');
            }
        }, 5000);

        // Audio hint
        setTimeout(() => {
            if (!experienceActivated && heroVideo) {
                const hint = document.getElementById('unmute-hint');
                if (hint) hint.style.opacity = '1';
            }
        }, 3000);
    };

    /* ═══════════════════════════════════════════════════════
       3. THE ACTIVATION BRIDGE (AUDIO UNMUTE)
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

    /* ═══════════════════════════════════════════════════════
       4. TYPEWRITER EFFECT
       ═══════════════════════════════════════════════════════ */
    const initTypewriter = () => {
        const textElement = document.getElementById('typewriter');
        if (!textElement) return;

        const words = ["Operations Lead", "Creative Strategist", "AI Architect", "Visionary Leader"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        const type = () => {
            const current = words[wordIndex];
            if (isDeleting) {
                textElement.textContent = current.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                textElement.textContent = current.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === current.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };

        type();
    };

    /* ═══════════════════════════════════════════════════════
       5. REVEAL ANIMATIONS (OBSERVER)
       ═══════════════════════════════════════════════════════ */
    const observeFaders = () => {
        const faders = document.querySelectorAll('.fade-in');
        const appearOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            });
        }, appearOptions);

        faders.forEach(fader => appearOnScroll.observe(fader));
    };

    /* ═══════════════════════════════════════════════════════
       6. SMOOTH ROUTING ENGINE (SPA)
       ═══════════════════════════════════════════════════════ */
    const updateNavHighlight = (targetUrl) => {
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-item');
        if (!navLinks.length) return;

        let currentFile = targetUrl.split('/').pop().split('?')[0].split('#')[0];
        if (!currentFile || currentFile === '' || currentFile === '/') currentFile = 'index.html';

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            link.classList.remove('active');
            if (linkHref === currentFile) {
                link.classList.add('active');
            }
        });
    };

    const performRouting = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const html = await response.text();
            const parser = new DOMParser();
            const newDoc = parser.parseFromString(html, 'text/html');
            const newMain = newDoc.querySelector('main');
            const currentMain = document.querySelector('main');

            if (newMain && currentMain) {
                const isHeroTarget = url.endsWith('index.html') || url === '/' || url === '';
                if (isHeroTarget) {
                    document.body.classList.add('hero-mode');
                } else {
                    document.body.classList.remove('hero-mode');
                }

                const newStyles = newDoc.querySelectorAll('head style');
                document.querySelectorAll('head style[data-page-style]').forEach(s => s.remove());
                newStyles.forEach(s => {
                    const clone = s.cloneNode(true);
                    clone.setAttribute('data-page-style', '');
                    document.head.appendChild(clone);
                });

                currentMain.innerHTML = newMain.innerHTML;
                
                const newNav = newDoc.querySelector('.nav-links');
                const currentNav = document.querySelector('.nav-links');
                if (newNav && currentNav) {
                    currentNav.innerHTML = newNav.innerHTML;
                }

                document.title = newDoc.title;
                window.history.pushState({}, '', url);
                updateNavHighlight(url);

                if (window.lucide) window.lucide.createIcons();
                observeFaders();
                
                if (isHeroTarget) {
                    initTypewriter();
                    const newVideo = document.getElementById('hero-video');
                    if (newVideo) newVideo.play().catch(() => {});
                }

                window.scrollTo({ top: 0, behavior: 'instant' });
                updateCursor();
                initMobileMenu();
            } else {
                window.location.href = url;
            }
        } catch (err) {
            console.error('Navigation failed:', err);
            window.location.href = url;
        }
    };

    const handleNavClick = async (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const url = link.getAttribute('href');
        if (!url || url.startsWith('http') || url.startsWith('#') || url.includes('mailto:')) return;

        e.preventDefault();
        await performRouting(url);
    };

    window.navigateTo = performRouting;
    document.addEventListener('click', handleNavClick);

    /* ═══════════════════════════════════════════════════════
       7. MOBILE MENU TOGGLE (FULL SCREEN)
       ═══════════════════════════════════════════════════════ */
    const initMobileMenu = () => {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const overlay = document.getElementById('mobileNav');
        const closeBtn = document.getElementById('closeNav');
        const mobileLinks = document.querySelectorAll('.mobile-nav-item');
        
        if (!menuBtn || !overlay) return;

        const openMenu = () => {
            overlay.classList.add('active');
            document.body.classList.add('nav-open');
        };

        const closeMenu = () => {
            overlay.classList.remove('active');
            document.body.classList.remove('nav-open');
        };

        menuBtn.addEventListener('click', openMenu);
        closeBtn?.addEventListener('click', closeMenu);

        // Close menu when clicking links and handle navigation
        mobileLinks.forEach(link => {
            link.addEventListener('click', async (e) => {
                const url = link.getAttribute('href');
                if (!url || url.startsWith('http') || url.startsWith('#') || url.includes('mailto:')) {
                    closeMenu();
                    return;
                }

                e.preventDefault();
                closeMenu();
                // Brief delay for the menu to close smoothly before routing
                setTimeout(async () => {
                    await performRouting(url);
                }, 400);
            });
        });
    };


    /* ═══════════════════════════════════════════════════════
       8. GLOBAL CURSOR HANDLER
       ═══════════════════════════════════════════════════════ */
    const updateCursor = () => {
        const interactive = document.querySelectorAll('a, button, .btn, .project-card, .skill-category, .stat-card, .contact-item, .company-card');
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');

        const moveCursor = (e) => {
            if (cursorDot) {
                cursorDot.style.left = e.clientX + 'px';
                cursorDot.style.top = e.clientY + 'px';
            }
            if (cursorOutline) {
                cursorOutline.animate({
                    left: `${e.clientX}px`,
                    top: `${e.clientY}px`
                }, { duration: 500, fill: "forwards" });
            }
        };

        window.addEventListener('mousemove', moveCursor);

        interactive.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline?.classList.add('cursor-hover');
                cursorDot?.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline?.classList.remove('cursor-hover');
                cursorDot?.classList.remove('cursor-hover');
            });
        });
    };

    /* ═══════════════════════════════════════════════════════
       9. INITIALIZATION
       ═══════════════════════════════════════════════════════ */
    initExperience();
    initTypewriter();
    observeFaders();
    initMobileMenu();
    updateCursor();
    updateNavHighlight(window.location.pathname);
    if (window.lucide) window.lucide.createIcons();
});
