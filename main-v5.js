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

        const currentFile = normalizeNavHref(targetUrl);

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
       9. INITIALIZATION
       ═══════════════════════════════════════════════════════ */
    initExperience();
    initTypewriter();
    observeFaders();
    initMobileMenu();
    // initCosmicCanvas(); // Completely deleted as requested
    updateCursor();
    initCard3DTilt();
    updateNavHighlight(window.location.pathname);
    if (window.lucide) window.lucide.createIcons();
});
