/**
 * Baasim Portfolio v5.8 - Cinematic Experience Engine
 * Handles: Preloader, Hero Video/Audio Sync, Smooth Routing, and Global UX Polish
 */

// FORCE CACHE & SERVICE WORKER EVICTION SYSTEM (v6.3.0)
(function() {
    const PURGE_KEY = 'baasim-cache-purge-v7.5.0';
    if (!localStorage.getItem(PURGE_KEY)) {
        console.warn('Purging all service workers and caches to resolve active user caching issues...');
        
        // 1. Unregister all service workers
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                for (let registration of registrations) {
                    registration.unregister()
                        .then(success => console.log('Service Worker unregistered:', success))
                        .catch(err => console.error('Failed to unregister Service Worker:', err));
                }
            }).catch(err => console.error('Error fetching registrations:', err));
        }

        // 2. Clear all cache storage caches
        if ('caches' in window) {
            caches.keys().then(keys => {
                return Promise.all(keys.map(key => {
                    return caches.delete(key)
                        .then(success => console.log('Cache storage cleared:', key, success))
                        .catch(err => console.error('Failed to clear cache storage:', key, err));
                }));
            }).catch(err => console.error('Error fetching cache keys:', err));
        }

        // 3. Mark as purged so we do not loop
        try {
            localStorage.setItem(PURGE_KEY, 'true');
        } catch (e) {
            console.error('Failed to set purge key in localStorage:', e);
        }

        // 4. Force hard reload (bypass browser cache) after a tiny delay
        setTimeout(() => {
            window.location.reload(true);
        }, 150);
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    
    /* ═══════════════════════════════════════════════════════
       1. GLOBAL STATE & SELECTORS
       ═══════════════════════════════════════════════════════ */
    const heroVideo = document.getElementById('hero-video');
    const preloader = document.getElementById('preloader');
    const navbar = document.querySelector('.navbar');
    let experienceActivated = false;

    /* ═══════════════════════════════════════════════════════
       GLOBAL WAVE BACKGROUND ENGINE (wave-background.tsx)
       ═══════════════════════════════════════════════════════ */
    function initWaveBackground() {
        const bgMesh = document.querySelector('.bg-mesh');
        if (!bgMesh) return;

        bgMesh.innerHTML = '';
        bgMesh.style.background = '#02030b';
        bgMesh.style.overflow = 'hidden';
        bgMesh.style.filter = 'none';

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.display = 'block';
        bgMesh.appendChild(svg);

        function createNoise2D() {
            const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
            const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
            const p = new Uint8Array(256);
            for (let i = 0; i < 256; i++) p[i] = Math.floor(Math.random() * 256);
            const perm = new Uint8Array(512);
            const permMod12 = new Uint8Array(512);
            for (let i = 0; i < 512; i++) {
                perm[i] = p[i & 255];
                permMod12[i] = (perm[i] % 12);
            }
            const grad3 = new Float32Array([
                1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0,
                1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1,
                0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1
            ]);
            return function(xin, yin) {
                let n0, n1, n2;
                const s = (xin + yin) * F2;
                const i = Math.floor(xin + s);
                const j = Math.floor(yin + s);
                const t = (i + j) * G2;
                const X0 = i - t;
                const Y0 = j - t;
                const x0 = xin - X0;
                const y0 = yin - Y0;
                let i1, j1;
                if (x0 > y0) { i1 = 1; j1 = 0; } else { i1 = 0; j1 = 1; }
                const x1 = x0 - i1 + G2;
                const y1 = y0 - j1 + G2;
                const x2 = x0 - 1.0 + 2.0 * G2;
                const y2 = y0 - 1.0 + 2.0 * G2;
                const ii = i & 255;
                const jj = j & 255;
                let t0 = 0.5 - x0 * x0 - y0 * y0;
                if (t0 < 0) n0 = 0.0;
                else {
                    t0 *= t0;
                    const gi0 = permMod12[ii + perm[jj]] * 3;
                    n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0);
                }
                let t1 = 0.5 - x1 * x1 - y1 * y1;
                if (t1 < 0) n1 = 0.0;
                else {
                    t1 *= t1;
                    const gi1 = permMod12[ii + i1 + perm[jj + j1]] * 3;
                    n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1);
                }
                let t2 = 0.5 - x2 * x2 - y2 * y2;
                if (t2 < 0) n2 = 0.0;
                else {
                    t2 *= t2;
                    const gi2 = permMod12[ii + 1 + perm[jj + 1]] * 3;
                    n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2);
                }
                return 70.0 * (n0 + n1 + n2);
            };
        }

        const noise = createNoise2D();
        let mouse = { x: -10, y: 0, lx: 0, ly: 0, sx: 0, sy: 0, v: 0, vs: 0, a: 0, set: false };
        let paths = [];
        let lines = [];

        function setLines() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            lines = [];
            paths.forEach(p => p.remove());
            paths = [];

            const xGap = 14;
            const yGap = 14;
            const oWidth = width + 200;
            const oHeight = height + 30;
            const totalLines = Math.ceil(oWidth / xGap);
            const totalPoints = Math.ceil(oHeight / yGap);
            const xStart = (width - xGap * totalLines) / 2;
            const yStart = (height - yGap * totalPoints) / 2;

            for (let i = 0; i < totalLines; i++) {
                const points = [];
                for (let j = 0; j < totalPoints; j++) {
                    points.push({
                        x: xStart + xGap * i,
                        y: yStart + yGap * j,
                        wave: { x: 0, y: 0 },
                        cursor: { x: 0, y: 0, vx: 0, vy: 0 }
                    });
                }
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('fill', 'none');
                path.setAttribute('stroke', 'rgba(182, 107, 255, 0.25)');
                path.setAttribute('stroke-width', '1');
                svg.appendChild(path);
                paths.push(path);
                lines.push(points);
            }
        }

        setLines();
        window.addEventListener('resize', setLines);

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            if (!mouse.set) {
                mouse.sx = mouse.x; mouse.sy = mouse.y;
                mouse.lx = mouse.x; mouse.ly = mouse.y;
                mouse.set = true;
            }
        });

        function tick(time) {
            mouse.sx += (mouse.x - mouse.sx) * 0.1;
            mouse.sy += (mouse.y - mouse.sy) * 0.1;
            const dx = mouse.x - mouse.lx;
            const dy = mouse.y - mouse.ly;
            const d = Math.hypot(dx, dy);
            mouse.v = d;
            mouse.vs += (d - mouse.vs) * 0.1;
            mouse.vs = Math.min(100, mouse.vs);
            mouse.lx = mouse.x; mouse.ly = mouse.y;
            mouse.a = Math.atan2(dy, dx);

            lines.forEach(points => {
                points.forEach(p => {
                    const move = noise((p.x + time * 0.008) * 0.003, (p.y + time * 0.003) * 0.002) * 8;
                    p.wave.x = Math.cos(move) * 12;
                    p.wave.y = Math.sin(move) * 6;

                    const pdx = p.x - mouse.sx;
                    const pdy = p.y - mouse.sy;
                    const pd = Math.hypot(pdx, pdy);
                    const l = Math.max(175, mouse.vs);
                    if (pd < l) {
                        const s = 1 - pd / l;
                        const f = Math.cos(pd * 0.001) * s;
                        p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00035;
                        p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00035;
                    }
                    p.cursor.vx += (0 - p.cursor.x) * 0.01;
                    p.cursor.vy += (0 - p.cursor.y) * 0.01;
                    p.cursor.vx *= 0.95;
                    p.cursor.vy *= 0.95;
                    p.cursor.x += p.cursor.vx;
                    p.cursor.y += p.cursor.vy;
                    p.cursor.x = Math.min(50, Math.max(-50, p.cursor.x));
                    p.cursor.y = Math.min(50, Math.max(-50, p.cursor.y));
                });
            });

            lines.forEach((points, lIndex) => {
                if (points.length < 2 || !paths[lIndex]) return;
                const first = points[0];
                let pathStr = `M ${first.x + first.wave.x} ${first.y + first.wave.y}`;
                for (let i = 1; i < points.length; i++) {
                    const pt = points[i];
                    pathStr += ` L ${pt.x + pt.wave.x + pt.cursor.x} ${pt.y + pt.wave.y + pt.cursor.y}`;
                }
                paths[lIndex].setAttribute('d', pathStr);
            });

            requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }
    initWaveBackground();

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
    let typewriterTimeoutId = null;

    const initTypewriter = () => {
        const textElement = document.getElementById('typewriter');
        if (!textElement) {
            if (typewriterTimeoutId) {
                clearTimeout(typewriterTimeoutId);
                typewriterTimeoutId = null;
            }
            return;
        }

        if (typewriterTimeoutId) {
            clearTimeout(typewriterTimeoutId);
        }

        const words = ["Chief Operating Officer (COO)", "Creative Strategist", "AI Architect", "Visionary Leader"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        const type = () => {
            const currentElement = document.getElementById('typewriter');
            if (!currentElement) {
                typewriterTimeoutId = null;
                return;
            }

            const current = words[wordIndex];
            if (isDeleting) {
                currentElement.textContent = current.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                currentElement.textContent = current.substring(0, charIndex + 1);
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

            typewriterTimeoutId = setTimeout(type, typeSpeed);
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
    const SOCIAL_LINKS = {
        linkedin: 'https://www.linkedin.com/in/khan-baasim-41b055408',
        instagram: 'https://www.instagram.com/khan__baasim/'
    };

    const normalizeNavHref = (href = '') => {
        const cleanHref = String(href || '').split('?')[0].split('#')[0].trim();
        if (!cleanHref || cleanHref === '/') return 'index.html';
        const trimmed = cleanHref.endsWith('/') ? cleanHref.slice(0, -1) : cleanHref;
        const finalPart = trimmed.split('/').pop();
        return finalPart || 'index.html';
    };

    const syncMobileSocialLinks = () => {
        document.querySelectorAll('.mobile-nav-social a').forEach(link => {
            const icon = link.querySelector('[data-lucide]');
            const iconName = icon?.getAttribute('data-lucide');
            const href = SOCIAL_LINKS[iconName];
            if (!href) return;
            link.href = href;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.setAttribute('aria-label', iconName.charAt(0).toUpperCase() + iconName.slice(1));
        });
    };

    const syncMobileNavChip = (targetUrl) => {
        // Quick navigation chip completely removed as requested
        return;
    };

    const updateNavHighlight = (targetUrl) => {
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-item');
        if (!navLinks.length) return;

        let currentFile = normalizeNavHref(targetUrl);

        // If we are on a project detail page (thumbnail-*, cover-*, or logo pages), keep the Project tab highlighted
        if (
            currentFile.startsWith('thumbnail-') ||
            currentFile.startsWith('cover-') ||
            currentFile.includes('-logo')
        ) {
            currentFile = 'projects.html';
        }

        navLinks.forEach(link => {
            const linkHref = normalizeNavHref(link.getAttribute('href'));
            link.classList.remove('active');
            if (linkHref === currentFile) {
                link.classList.add('active');
            }
        });

        syncMobileNavChip(targetUrl);
        syncMobileSocialLinks();
    };

    let isRouting = false;

    const performRouting = async (url, pushToHistory = true) => {
        if (isRouting) return;
        isRouting = true;

        const currentMain = document.querySelector('main');
        if (currentMain) {
            currentMain.classList.add('page-leaving');
        }

        const fetchPromise = fetch(url).then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.text();
        });

        // Parallelize leaving animation (250ms) and network fetch for lightning speed
        const delayPromise = new Promise(resolve => setTimeout(resolve, 250));

        try {
            const [html] = await Promise.all([fetchPromise, delayPromise]);
            const parser = new DOMParser();
            const newDoc = parser.parseFromString(html, 'text/html');
            const newMain = newDoc.querySelector('main');

            if (newMain && currentMain) {
                const isHeroTarget = url.endsWith('index.html') || url === '/' || url === '';
                const wasHero = document.body.classList.contains('hero-mode');

                if (isHeroTarget) {
                    document.body.classList.add('hero-mode');
                } else {
                    document.body.classList.remove('hero-mode');
                }

                // If transitioning from a hero landing page to a sub-page, trigger Eid celebration!
                if (wasHero && !isHeroTarget) {
                    setTimeout(() => {
                        initEidCelebrationSystem();
                    }, 400);
                }

                // Always ensure the navbar is revealed on page navigation
                const topBar = document.querySelector('.navbar');
                if (topBar) {
                    topBar.classList.remove('nav-hidden');
                }

                const newStyles = newDoc.querySelectorAll('head style');
                document.querySelectorAll('head style[data-page-style]').forEach(s => s.remove());
                newStyles.forEach(s => {
                    const clone = s.cloneNode(true);
                    clone.setAttribute('data-page-style', '');
                    document.head.appendChild(clone);
                });

                // Swap content while fully transparent
                currentMain.innerHTML = newMain.innerHTML;
                
                const newNav = newDoc.querySelector('.nav-links');
                const currentNav = document.querySelector('.nav-links');
                if (newNav && currentNav) {
                    currentNav.innerHTML = newNav.innerHTML;
                }

                document.title = newDoc.title;
                
                if (pushToHistory) {
                    window.history.pushState({}, '', url);
                }
                updateNavHighlight(url);

                if (window.lucide) window.lucide.createIcons();
                observeFaders();
                
                if (isHeroTarget) {
                    initTypewriter();
                    const newVideo = document.getElementById('hero-video');
                    if (newVideo) newVideo.play().catch(() => {});
                }

                // Prepare smooth entry transition
                currentMain.classList.remove('page-leaving');
                currentMain.classList.add('page-entering');
                
                // Force layout reflow so the transition fires
                currentMain.offsetHeight;

                window.scrollTo({ top: 0, behavior: 'instant' });
                
                // Transition to active state
                currentMain.classList.remove('page-entering');

                updateCursor();
                initMobileMenu();
                initCard3DTilt();
            } else {
                window.location.href = url;
            }
            isRouting = false;
        } catch (err) {
            console.error('Navigation failed:', err);
            window.location.href = url;
            isRouting = false;
        }
    };

    const handleNavClick = async (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        // Skip clicks inside the mobile nav drawer — handled separately with close animation
        if (link.closest('.mobile-nav-overlay')) return;

        // Skip clicks inside the Khan AI chat elements to prevent duplicate routing interference
        if (
            link.closest('#chat-interface') || 
            link.closest('#khan-info-modal') || 
            link.closest('#khan-image-modal') || 
            link.closest('#golive-overlay')
        ) {
            return;
        }

        const url = link.getAttribute('href');
        if (!url || url.startsWith('http') || url.startsWith('#') || url.includes('mailto:')) return;

        e.preventDefault();
        await performRouting(url);
    };

    window.navigateTo = performRouting;
    document.addEventListener('click', handleNavClick);

    // Global listener for browser Back/Forward (popstate)
    window.addEventListener('popstate', () => {
        performRouting(window.location.pathname, false);
    });


    /* ═══════════════════════════════════════════════════════
       7. MOBILE MENU TOGGLE (GALAXY DRAWER)
       ═══════════════════════════════════════════════════════ */
    let _mobileMenuInit = false;
    
    const initGalaxyMenuCanvas = (canvas, overlay) => {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let active = false;
        let animationFrameId = null;

        const resize = () => {
            canvas.width = overlay.clientWidth;
            canvas.height = overlay.clientHeight;
        };

        const initParticles = () => {
            particles = [];
            const count = 60;
            const centerX = canvas.width * 0.8;
            const centerY = canvas.height * 0.35;
            
            for (let i = 0; i < count; i++) {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 180 + 10;
                particles.push({
                    angle: angle,
                    distance: distance,
                    speed: (Math.random() * 0.003 + 0.001) * (180 / (distance + 1)), 
                    size: Math.random() * 1.8 + 0.4,
                    color: Math.random() > 0.65 ? 'rgba(182, 107, 255, 0.35)' : 'rgba(54, 214, 255, 0.25)',
                    pulse: Math.random() * 0.01 + 0.005
                });
            }
        };

        const draw = () => {
            if (!overlay.classList.contains('active')) {
                active = false;
                cancelAnimationFrame(animationFrameId);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const centerX = canvas.width * 0.85;
            const centerY = canvas.height * 0.25;

            // Draw swirling galaxy spiral arms in drawer background
            particles.forEach(p => {
                p.angle += p.speed;
                const x = centerX + Math.cos(p.angle) * p.distance;
                const y = centerY + Math.sin(p.angle) * p.distance;
                
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(x, y, p.size + Math.sin(Date.now() * p.pulse) * 0.4, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const observer = new MutationObserver(() => {
            const nowActive = overlay.classList.contains('active');
            if (nowActive && !active) {
                active = true;
                resize();
                initParticles();
                draw();
            } else if (!nowActive && active) {
                active = false;
                cancelAnimationFrame(animationFrameId);
            }
        });

        observer.observe(overlay, { attributes: true, attributeFilter: ['class'] });
        window.addEventListener('resize', resize);
        resize();
    };

    const initMobileMenu = () => {
        if (_mobileMenuInit) return;
        
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const overlay = document.getElementById('mobileNav');
        const closeBtn = document.getElementById('closeNav');
        const mobileLinks = document.querySelectorAll('.mobile-nav-item');
        
        if (!menuBtn || !overlay) return;
        _mobileMenuInit = true;

        // Dynamically inject mobile-nav-backdrop if not exists
        let backdrop = document.querySelector('.mobile-nav-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.className = 'mobile-nav-backdrop';
            overlay.parentNode.insertBefore(backdrop, overlay);
        }

        // Dynamically inject local canvas for starry galaxy arm background (Removed/Deleted as requested)
        /*
        let canvas = overlay.querySelector('.mobile-nav-canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.className = 'mobile-nav-canvas';
            overlay.appendChild(canvas);
            initGalaxyMenuCanvas(canvas, overlay);
        }
        */

        let scrollPosition = 0;

        const toggleMenu = () => {
            const isOpen = overlay.classList.contains('active');
            if (isOpen) {
                closeMenu();
            } else {
                scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                overlay.classList.add('active');
                backdrop.classList.add('active');
                document.body.classList.add('nav-open');
                document.documentElement.classList.add('nav-open');
                document.body.style.top = `-${scrollPosition}px`;
                menuBtn.classList.add('is-active');
            }
        };

        const closeMenu = () => {
            overlay.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.classList.remove('nav-open');
            document.documentElement.classList.remove('nav-open');
            document.body.style.top = '';
            window.scrollTo(0, scrollPosition);
            menuBtn.classList.remove('is-active');
        };

        const quickNavChip = document.querySelector('.mobile-nav-header-chip');
        menuBtn.addEventListener('click', toggleMenu);
        backdrop.addEventListener('click', closeMenu);
        closeBtn?.addEventListener('click', closeMenu);
        quickNavChip?.addEventListener('click', toggleMenu);

        // Close menu when clicking links and handle navigation
        mobileLinks.forEach(link => {
            link.addEventListener('click', async (e) => {
                e.stopPropagation(); // Prevent bubbling to global handleNavClick
                const url = link.getAttribute('href');
                if (!url || url.startsWith('http') || url.startsWith('#') || url.includes('mailto:')) {
                    closeMenu();
                    return;
                }

                e.preventDefault();
                closeMenu();
                // Brief delay for the drawer to slide out before SPA transition
                setTimeout(async () => {
                    await performRouting(url);
                }, 350);
            });
        });

        syncMobileSocialLinks();
    };



    /* ═══════════════════════════════════════════════════════
       7.5. INTERACTIVE 3D TILT EFFECT (REFINED WHITE-COLLAR STYLE)
       ═══════════════════════════════════════════════════════ */
    const initCard3DTilt = () => {
        // Skip on mobile or devices with touch capabilities only to optimize speed
        if (window.matchMedia("(max-width: 1024px)").matches) return;

        const cards = document.querySelectorAll('.project-card, .skill-category, .stat-card, .cert-card');
        
        cards.forEach(card => {
            // Apply preserve-3d contexts
            card.style.transformStyle = 'preserve-3d';
            card.style.perspective = '1000px';
            
            // Build dynamic high-fidelity glare overlay
            let glare = card.querySelector('.card-glare');
            if (!glare) {
                glare = document.createElement('div');
                glare.className = 'card-glare';
                glare.style.position = 'absolute';
                glare.style.inset = '0';
                glare.style.pointerEvents = 'none';
                glare.style.zIndex = '5';
                glare.style.borderRadius = 'inherit';
                glare.style.opacity = '0';
                glare.style.transition = 'opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
                card.appendChild(glare);
            }

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const w = rect.width;
                const h = rect.height;
                
                // Pure executive bounds: strict maximum 5 degrees tilt for pure white-collar professionalism
                const rotateY = ((x / w) - 0.5) * 10; // -5deg to +5deg
                const rotateX = (0.5 - (y / h)) * 10; // -5deg to +5deg
                
                card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(6px)`;
                card.style.boxShadow = `0 15px 35px rgba(0, 0, 0, 0.4), 0 0 20px rgba(182, 107, 255, 0.12)`;
                
                // Shift moving glare radial highlight
                glare.style.opacity = '1';
                glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.1), transparent 60%)`;
                
                // Lift title or image layers slightly to amplify 3D depth elegantly
                const title = card.querySelector('h3, h4');
                if (title) {
                    title.style.transform = 'translateZ(12px)';
                    title.style.transition = 'transform 0.1s ease';
                }
                const img = card.querySelector('img');
                if (img) {
                    img.style.transform = 'translateZ(8px) scale(1.02)';
                    img.style.transition = 'transform 0.1s ease';
                }
            });

            card.addEventListener('mouseleave', () => {
                // Smoothly slide back to flat layout
                card.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0)';
                card.style.boxShadow = '';
                glare.style.opacity = '0';
                
                const title = card.querySelector('h3, h4');
                if (title) title.style.transform = 'translateZ(0)';
                
                const img = card.querySelector('img');
                if (img) img.style.transform = 'translateZ(0) scale(1)';
            });
            
            // Ultra fluid transition response
            card.style.transition = 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease';
        });
    };

    /* ═══════════════════════════════════════════════════════
       8. GLOBAL CURSOR HANDLER
       ═══════════════════════════════════════════════════════ */
    let _cursorInit = false;
    const updateCursor = () => {
        const interactive = document.querySelectorAll('a, button, .btn, .project-card, .skill-category, .stat-card, .contact-item, .company-card');
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');

        if (!_cursorInit) {
            window.addEventListener('mousemove', (e) => {
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
            });
            _cursorInit = true;
        }

        // Clean up previous listeners if possible, or simpler: just attach to newly found elements.
        // For simplicity and safety against leaks, we only attach to elements that don't have our flag.
        interactive.forEach(el => {
            if (el.dataset.cursorAttached) return;
            el.dataset.cursorAttached = 'true';
            
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
       8.5. COSMIC INTERACTIVE BACKGROUND & MOUSE TRAIL
       ═══════════════════════════════════════════════════════ */
    const initCosmicCanvas = () => {
        let canvas = document.getElementById('cosmic-canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'cosmic-canvas';
            document.body.appendChild(canvas);
        }

        const ctx = canvas.getContext('2d');
        let stars = [];
        let particles = [];
        let mouse = { x: null, y: null };
        let active = true;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        const initStars = () => {
            stars = [];
            const count = Math.floor((canvas.width * canvas.height) / 12000);
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 1.5,
                    opacity: Math.random() * 0.8 + 0.2,
                    speed: Math.random() * 0.05 + 0.01,
                    twinkleSpeed: Math.random() * 0.02 + 0.005,
                    direction: Math.random() > 0.5 ? 1 : -1
                });
            }
        };

        window.addEventListener('resize', resize);
        
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            
            // Spawn stardust particles
            if (Math.random() < 0.35) {
                particles.push({
                    x: mouse.x,
                    y: mouse.y,
                    vx: (Math.random() - 0.5) * 1.0,
                    vy: (Math.random() - 0.5) * 1.0 - Math.random() * 0.4,
                    size: Math.random() * 2.2 + 0.4,
                    color: `hsla(${Math.random() * 60 + 260}, 100%, 80%, ${Math.random() * 0.35 + 0.55})`,
                    alpha: 1,
                    life: Math.random() * 0.02 + 0.015
                });
            }
        });

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
                if (Math.random() < 0.35) {
                    particles.push({
                        x: mouse.x,
                        y: mouse.y,
                        vx: (Math.random() - 0.5) * 1.0,
                        vy: (Math.random() - 0.5) * 1.0 - Math.random() * 0.4,
                        size: Math.random() * 2.2 + 0.4,
                        color: `hsla(${Math.random() * 60 + 260}, 100%, 80%, ${Math.random() * 0.35 + 0.55})`,
                        alpha: 1,
                        life: Math.random() * 0.02 + 0.015
                    });
                }
            }
        }, { passive: true });

        const draw = () => {
            if (!active) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw drifting stars
            ctx.fillStyle = '#ffffff';
            stars.forEach(star => {
                star.opacity += star.twinkleSpeed * star.direction;
                if (star.opacity >= 1) {
                    star.opacity = 1;
                    star.direction = -1;
                } else if (star.opacity <= 0.1) {
                    star.opacity = 0.1;
                    star.direction = 1;
                }
                
                star.y -= star.speed;
                if (star.y < 0) {
                    star.y = canvas.height;
                    star.x = Math.random() * canvas.width;
                }

                ctx.globalAlpha = star.opacity;
                ctx.fillRect(star.x, star.y, star.size, star.size);
            });

            // Draw cursor stardust particles
            particles.forEach((p, idx) => {
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= p.life;

                if (p.alpha <= 0) {
                    particles.splice(idx, 1);
                    return;
                }

                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.globalAlpha = 1;
            requestAnimationFrame(draw);
        };

        resize();
        draw();

        document.addEventListener('visibilitychange', () => {
            active = !document.hidden;
            if (active) draw();
        });
    };

    /* ═══════════════════════════════════════════════════════
       8.7. SMART SCROLL NAVBAR
       ═══════════════════════════════════════════════════════ */
    const initSmartScrollNavbar = () => {
        const topBar = document.querySelector('.navbar');
        if (!topBar) return;

        // Only enable hide-on-scroll on mobile viewports; desktop stays fixed
        const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

        let lastScrollY = window.scrollY;
        const scrollThreshold = 10;

        window.addEventListener('scroll', () => {
            if (!isMobile()) {
                topBar.classList.remove('nav-hidden');
                return;
            }

            if (document.body.classList.contains('nav-open') || document.body.classList.contains('chat-open')) {
                return;
            }

            const currentScrollY = window.scrollY;
            if (currentScrollY < 0) return;

            const diff = Math.abs(currentScrollY - lastScrollY);
            if (diff > scrollThreshold) {
                // Keep the navigation bar fixed at all times
                if (currentScrollY < lastScrollY) {
                    topBar.classList.remove('nav-hidden');
                }
                lastScrollY = currentScrollY;
            }
        }, { passive: true });
    };

    /* ═══════════════════════════════════════════════════════
       8.6. EID CELEBRATION SYSTEM
       ═══════════════════════════════════════════════════════ */
    const initEidCelebrationSystem = () => {
        // Prevent duplicate overlays
        if (document.getElementById('eid-celebration-overlay')) return;

        // Play Celestial Acoustic Chime (using Web Audio API)
        const playCelebrationSound = () => {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (!AudioContext) return;
                const ctx = new AudioContext();
                
                const playNote = (freq, delay, duration, volume) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
                    
                    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
                    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.05);
                    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);
                    
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    
                    osc.start(ctx.currentTime + delay);
                    osc.stop(ctx.currentTime + delay + duration);
                };

                // Premium celestial arpeggio chime (C major 9 chord with bright high frequencies)
                playNote(523.25, 0.0, 1.2, 0.12);   // C5
                playNote(659.25, 0.12, 1.2, 0.10);  // E5
                playNote(783.99, 0.24, 1.2, 0.08);  // G5
                playNote(987.77, 0.36, 1.5, 0.06);  // B5
                playNote(1046.50, 0.48, 1.8, 0.04); // C6
                playNote(1318.51, 0.60, 2.0, 0.02); // E6
            } catch (e) {
                console.warn("Acoustic chime failed:", e);
            }
        };

        const EID_CONFIG = {
            'fitr': {
                eve: new Date('2026-03-20'),
                day: new Date('2026-03-21'),
                post1: new Date('2026-03-22'),
                post2: new Date('2026-03-23')
            },
            'adha': {
                eve: new Date('2026-05-26'),
                day: new Date('2026-05-27'),
                post1: new Date('2026-05-28'),
                post2: new Date('2026-05-29')
            }
        };

        const getEidStatus = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const testEid = urlParams.get('test-eid');
            if (testEid) {
                const [type, phase] = testEid.split('-');
                if ((type === 'fitr' || type === 'adha') && (phase === 'eve' || phase === 'day' || phase === 'post')) {
                    return { type, phase };
                }
            }

            const today = new Date();
            const target = new Date(today.getFullYear(), today.getMonth(), today.getDate());

            const isSameDay = (d1, d2) => {
                return d1.getFullYear() === d2.getFullYear() &&
                       d1.getMonth() === d2.getMonth() &&
                       d1.getDate() === d2.getDate();
            };

            for (const [eidType, dates] of Object.entries(EID_CONFIG)) {
                if (isSameDay(target, dates.eve)) return { type: eidType, phase: 'eve' };
                if (isSameDay(target, dates.day)) return { type: eidType, phase: 'day' };
                if (isSameDay(target, dates.post1) || isSameDay(target, dates.post2)) return { type: eidType, phase: 'post' };
            }
            return null;
        };

        const status = getEidStatus();
        if (!status) return;

        const { type, phase } = status;

        // Play the acoustic bells immediately on visual popper start
        playCelebrationSound();

        // 1. Create overlay container with heavy blur
        const overlay = document.createElement('div');
        overlay.id = 'eid-celebration-overlay';
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            z-index: 100000;
            background: rgba(2, 3, 11, 0.72);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            cursor: pointer;
            transition: opacity 0.6s ease, backdrop-filter 0.6s ease, -webkit-backdrop-filter 0.6s ease;
        `;

        // 2. Create Canvas for confetti burst
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        `;
        overlay.appendChild(canvas);

        // Resolve greetings text based on Eid calendar matching (purely typographic)
        let greetingMsg = '';
        if (type === 'fitr') {
            if (phase === 'eve') greetingMsg = 'Eid Mubarak in advance from Mr. Khan Bassim';
            else if (phase === 'day') greetingMsg = 'Eid Mubarak from Mr. Khan Bassim';
            else greetingMsg = 'Belated Eid Mubarak from Mr. Khan Bassim';
        } else {
            if (phase === 'eve') greetingMsg = 'Eid Mubarak in advance from Mr. Khan Bassim';
            else if (phase === 'day') greetingMsg = 'Eid Mubarak from Mr. Khan Bassim';
            else greetingMsg = 'Belated Eid Mubarak from Mr. Khan Bassim';
        }

        // 3. Create highly aesthetic, 2026-level cinematic floating text container
        const textContainer = document.createElement('div');
        textContainer.style.cssText = `
            position: relative;
            z-index: 10;
            text-align: center;
            opacity: 0;
            transform: scale(0.94);
            transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
            max-width: 800px;
            padding: 30px;
            pointer-events: none;
        `;

        // Inject scoped keyframe animations for high-end cinematic movements
        const styleEl = document.createElement('style');
        styleEl.innerHTML = `
            @keyframes textShimmer {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        overlay.appendChild(styleEl);

        textContainer.innerHTML = `
            <p style="font-size: 3.2rem; font-weight: 900; background: linear-gradient(135deg, #ffffff 10%, #d8b4fe 50%, #818cf8 90%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 0 60px rgba(139, 92, 246, 0.4); letter-spacing: -0.03em; font-family: var(--font-main); text-align: center; line-height: 1.35; margin: 0; padding: 0 15px; animation: textShimmer 4s ease infinite; background-size: 200% auto;">
                ${greetingMsg}
            </p>
        `;

        overlay.appendChild(textContainer);
        document.body.appendChild(overlay);

        // Lock background scroll when celebration overlay is active
        document.body.classList.add('chat-open');

        // Fade in overlay immediately
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
        });

        // Confetti Canvas Particle Logic
        const ctx = canvas.getContext('2d');
        let particles = [];
        const colors = ['#7a8dff', '#b66bff', '#36d6ff', '#ffeb3b', '#ff5722', '#4caf50'];
        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        // Burst Poppers from bottom corners shooting inwards
        const spawnPopper = (x, y, angle) => {
            const count = isMobile ? 55 : 110;
            for (let i = 0; i < count; i++) {
                const speed = Math.random() * 14 + 7;
                const finalAngle = angle + (Math.random() - 0.5) * 0.45;
                particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(finalAngle) * speed,
                    vy: Math.sin(finalAngle) * speed,
                    size: Math.random() * 8 + 4,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    shape: Math.random() > 0.45 ? 'square' : 'circle',
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.15,
                    alpha: 1,
                    decay: Math.random() * 0.012 + 0.006
                });
            }
        };

        // Simultaneous burst trigger
        spawnPopper(0, window.innerHeight, -Math.PI / 4);
        spawnPopper(window.innerWidth, window.innerHeight, -3 * Math.PI / 4);

        let animFrameId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, idx) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.22; // Gravity
                p.vx *= 0.98; // Drag
                p.vy *= 0.98;
                p.rotation += p.rotationSpeed;
                p.alpha -= p.decay;

                if (p.alpha <= 0 || p.y > canvas.height) {
                    particles.splice(idx, 1);
                    return;
                }

                ctx.save();
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);

                if (p.shape === 'circle') {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                }
                ctx.restore();
            });

            if (particles.length > 0) {
                animFrameId = requestAnimationFrame(animate);
            }
        };
        animate();

        // Show floating text after a short delay
        setTimeout(() => {
            textContainer.style.opacity = '1';
            textContainer.style.transform = 'scale(1)';
        }, 150);

        // AUTO-DISMISS & CLICK-ANYWHERE DISMISS BRIDGE
        let dismissed = false;
        const dismissAndReveal = () => {
            if (dismissed) return;
            dismissed = true;

            overlay.style.opacity = '0';
            overlay.style.backdropFilter = 'blur(0px)';
            overlay.style.webkitBackdropFilter = 'blur(0px)';
            textContainer.style.transform = 'scale(0.95)';
            
            document.body.classList.remove('chat-open'); // Restore scroll
            cancelAnimationFrame(animFrameId);
            window.removeEventListener('resize', resize);
            
            setTimeout(() => {
                overlay.remove();
            }, 600); // Wait for transition fade out to fully evict from DOM
        };

        // Dismiss if the user clicks anywhere on the screen (here or there!)
        overlay.addEventListener('click', dismissAndReveal);

        // Or dismiss automatically after 5 seconds
        setTimeout(dismissAndReveal, 5000);
    };

    /* ═══════════════════════════════════════════════════════
       9. INITIALIZATION
       ═══════════════════════════════════════════════════════ */
    initExperience();
    initTypewriter();
    observeFaders();
    initMobileMenu();
    // initCosmicCanvas(); // Completely deleted as requested
    updateCursor();
    initCard3DTilt();
    initSmartScrollNavbar();
    if (!document.body.classList.contains('hero-mode')) {
        initEidCelebrationSystem();
    }
    initImageLightbox();
    updateNavHighlight(window.location.pathname);
    if (window.lucide) window.lucide.createIcons();
});

/* ═══════════════════════════════════════════════════════
   10. FULLSCREEN IMAGE LIGHTBOX
   ═══════════════════════════════════════════════════════ */
const initImageLightbox = () => {
    let lightbox = document.querySelector('.portfolio-lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'portfolio-lightbox';
        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close image">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <img class="lightbox-image" src="" alt="Fullscreen view">
            <div class="lightbox-caption"></div>
        `;
        document.body.appendChild(lightbox);

        const closeBtn = lightbox.querySelector('.lightbox-close');
        const img = lightbox.querySelector('.lightbox-image');

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.classList.remove('lightbox-open');
        };

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === closeBtn || e.target.closest('.lightbox-close')) {
                closeLightbox();
            }
        });

        img.addEventListener('click', (e) => e.stopPropagation());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    const openLightbox = (src, altText) => {
        const img = lightbox.querySelector('.lightbox-image');
        const caption = lightbox.querySelector('.lightbox-caption');
        
        img.src = src;
        img.alt = altText || 'Fullscreen view';
        if (altText) {
            caption.textContent = altText;
            caption.style.display = 'block';
        } else {
            caption.style.display = 'none';
        }
        
        lightbox.classList.add('active');
        document.body.classList.add('lightbox-open');
    };

    document.addEventListener('click', (e) => {
        const img = e.target.closest('img');
        if (!img) return;

        const link = img.closest('a');
        if (link && link.getAttribute('href') && !link.getAttribute('href').startsWith('#')) {
            return;
        }

        if (
            img.classList.contains('cert-img') ||
            img.closest('.cert-card') ||
            img.closest('.thumb-display') ||
            img.closest('.cover-display') ||
            img.closest('.logo-display') ||
            img.closest('.project-card')
        ) {
            e.preventDefault();
            openLightbox(img.src, img.alt);
        }
    });
};
