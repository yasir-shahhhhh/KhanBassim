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

        let lastScrollY = window.scrollY;
        const scrollThreshold = 10;

        window.addEventListener('scroll', () => {
            if (document.body.classList.contains('nav-open') || document.body.classList.contains('chat-open')) {
                return;
            }

            const currentScrollY = window.scrollY;
            if (currentScrollY < 0) return;

            const diff = Math.abs(currentScrollY - lastScrollY);
            if (diff > scrollThreshold) {
                if (currentScrollY > lastScrollY && currentScrollY > 80) {
                    topBar.classList.add('nav-hidden');
                } else if (currentScrollY < lastScrollY) {
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
            // URL testing overrides (e.g. ?test-eid=adha-day)
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

        // Session frequency limiter - once per 6 hours (bypassed if URL test-eid parameter is present)
        const urlParams = new URLSearchParams(window.location.search);
        if (!urlParams.get('test-eid')) {
            const lastShown = localStorage.getItem('bfk_eid_celebration_shown');
            const now = Date.now();
            if (lastShown && (now - parseInt(lastShown)) < 6 * 60 * 60 * 1000) {
                return;
            }
            localStorage.setItem('bfk_eid_celebration_shown', now.toString());
        }

        const { type, phase } = status;

        // 1. Create overlay container
        const overlay = document.createElement('div');
        overlay.id = 'eid-celebration-overlay';
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            z-index: 100000;
            background: rgba(2, 3, 11, 0.88);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.8s ease;
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

        // 3. Create message card container (initially hidden)
        const card = document.createElement('div');
        card.id = 'eid-message-card';
        card.style.cssText = `
            position: relative;
            max-width: 90%;
            width: 460px;
            padding: 40px 30px;
            background: linear-gradient(135deg, rgba(14, 22, 52, 0.92), rgba(6, 9, 26, 0.96));
            border: 1px solid rgba(151, 178, 255, 0.28);
            border-radius: 24px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 35px rgba(182, 107, 255, 0.25);
            text-align: center;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 10;
        `;

        // Resolve greetings text based on Eid calendar matching
        let headingText = '';
        let greetingMsg = '';
        if (type === 'fitr') {
            headingText = 'Eid-ul-Fitr';
            if (phase === 'eve') greetingMsg = 'Eid Mubarak in advance from Mr. Khan Bassim \u{1F389}';
            else if (phase === 'day') greetingMsg = 'Eid Mubarak from Mr. Khan Bassim \u{1F319}\u{2728}';
            else greetingMsg = 'Belated Eid Mubarak from Mr. Khan Bassim \u{1F319}';
        } else {
            headingText = 'Eid-ul-Adha';
            if (phase === 'eve') greetingMsg = 'Eid Mubarak in advance from Mr. Khan Bassim \u{1F389}\u{1F410}';
            else if (phase === 'day') greetingMsg = 'Eid Mubarak from Mr. Khan Bassim \u{1F410}\u{2728}';
            else greetingMsg = 'Belated Eid Mubarak from Mr. Khan Bassim \u{1F319}\u{1F410}';
        }

        card.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 15px; filter: drop-shadow(0 0 10px rgba(182, 107, 255, 0.5));">\u{1F389}</div>
            <h2 style="font-size: 1.8rem; font-weight: 800; color: #fff; margin-bottom: 12px; line-height: 1.3; letter-spacing: -0.01em; font-family: var(--font-main);">
                \u{1F319} ${headingText} \u{1F319}
            </h2>
            <p style="font-size: 1.15rem; color: #d6dfff; font-weight: 500; margin-bottom: 30px; line-height: 1.6; font-family: var(--font-main);">
                ${greetingMsg}
            </p>
            <button id="eid-close-btn" class="btn btn-primary" style="padding: 12px 36px; font-size: 0.9rem; border-radius: 100px; width: auto; margin: 0 auto; box-shadow: 0 8px 24px rgba(182, 107, 255, 0.4);">
                Celebrate <i data-lucide="sparkles" style="width: 15px; height: 15px;"></i>
            </button>
        `;
        overlay.appendChild(card);
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
            const count = isMobile ? 55 : 110; // Lower density on mobile for supreme performance
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
        spawnPopper(0, window.innerHeight, -Math.PI / 4); // Bottom-left shoots up-right
        spawnPopper(window.innerWidth, window.innerHeight, -3 * Math.PI / 4); // Bottom-right shoots up-left

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

        // Show centered festive card after a delay of 1.1s (between 0.8s and 1.5s)
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            if (window.lucide) window.lucide.createIcons();
        }, 1100);

        // Dismiss Eid Celebration System
        const dismiss = () => {
            overlay.style.opacity = '0';
            card.style.transform = 'translateY(-20px)';
            document.body.classList.remove('chat-open'); // Restore scrolling
            cancelAnimationFrame(animFrameId);
            window.removeEventListener('resize', resize);
            setTimeout(() => {
                overlay.remove();
            }, 800);
        };

        card.querySelector('#eid-close-btn').addEventListener('click', dismiss);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) dismiss();
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
    initSmartScrollNavbar();
    if (!document.body.classList.contains('hero-mode')) {
        initEidCelebrationSystem();
    }
    updateNavHighlight(window.location.pathname);
    if (window.lucide) window.lucide.createIcons();
});
