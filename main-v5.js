/**
 * Baasim Portfolio v5 Core Logic
 * Handles Custom Cursor, Background Mesh, Animations, and Routing
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Background Mesh if not present
    if (!document.querySelector('.bg-mesh')) {
        const mesh = document.createElement('div');
        mesh.className = 'bg-mesh';
        document.body.prepend(mesh);
    }

    // 2. Custom Cursor
    const dot = document.querySelector('.cursor-dot') || document.createElement('div');
    const outline = document.querySelector('.cursor-outline') || document.createElement('div');
    
    if (!document.querySelector('.cursor-dot')) {
        dot.className = 'cursor-dot';
        outline.className = 'cursor-outline';
        document.body.appendChild(dot);
        document.body.appendChild(outline);
    }

    window.addEventListener('mousemove', (e) => {
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        
        outline.animate({
            left: e.clientX + 'px',
            top: e.clientY + 'px'
        }, { duration: 500, fill: 'forwards' });
    });

    // 3. Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 4. Hover Effects
    const updateHoverEffects = () => {
        const clickables = document.querySelectorAll('a, button, .logo-item, .project-card, .stat-card');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                outline.style.width = '80px';
                outline.style.height = '80px';
                outline.style.background = 'rgba(255, 255, 255, 0.05)';
                outline.style.borderColor = 'var(--accent-1)';
                outline.style.boxShadow = '0 0 20px var(--accent-glow)';
            });
            el.addEventListener('mouseleave', () => {
                outline.style.width = '40px';
                outline.style.height = '40px';
                outline.style.background = 'transparent';
                outline.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                outline.style.boxShadow = 'none';
            });
        });
    };
    updateHoverEffects();

    // 5. Navbar Scroll Effect
    const nav = document.querySelector('.navbar');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        });
    }

    // 6. Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, { threshold: 0.1 });
    
    const observeFaders = () => {
        document.querySelectorAll('.fade-in, .section-header, .stat-card, .project-card').forEach(el => {
            el.classList.add('fade-in'); // Ensure class is present
            observer.observe(el);
        });
    };
    observeFaders();

    // 7. Typewriter Effect (index.html only)
    const typewriterEl = document.getElementById('typewriter');
    if (typewriterEl) {
        const phrases = ["Building Systems.", "Leading Operations.", "Executing Vision.", "Designing Content."];
        let ti = 0, tj = 0, tCurrent = "", tDeleting = false;
        function typeWrite() {
            const full = phrases[ti % phrases.length];
            if (tDeleting) { tCurrent = full.substring(0, tj - 1); tj--; }
            else { tCurrent = full.substring(0, tj + 1); tj++; }
            typewriterEl.textContent = tCurrent;
            let speed = tDeleting ? 50 : 100;
            if (!tDeleting && tj === full.length) { speed = 2000; tDeleting = true; }
            else if (tDeleting && tj === 0) { tDeleting = false; ti++; speed = 500; }
            setTimeout(typeWrite, speed);
        }
        typeWrite();
    }

    // 8. Smooth SPA-like Routing
    const handleLinkClick = (e) => {
        const href = e.currentTarget.getAttribute('href');
        if (href && href.endsWith('.html') && !href.startsWith('http') && !href.includes('#')) {
            e.preventDefault();
            loadPage(href);
        }
    };

    const loadPage = async (url) => {
        try {
            // Start transition
            document.body.style.opacity = '0.5';
            document.body.style.transform = 'scale(0.98)';
            document.body.style.transition = 'all 0.5s ease';

            const response = await fetch(url);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const newMain = doc.querySelector('main');
            const currentMain = document.querySelector('main');
            
            if (newMain && currentMain) {
                currentMain.innerHTML = newMain.innerHTML;
                document.title = doc.title;
                window.history.pushState({}, '', url);
                
                // Re-initialize logic
                if (window.lucide) lucide.createIcons();
                updateHoverEffects();
                observeFaders();
                
                // End transition
                document.body.style.opacity = '1';
                document.body.style.transform = 'scale(1)';
                window.scrollTo(0, 0);
            } else {
                window.location.href = url; // Fallback
            }
        } catch (err) {
            console.error('Routing error:', err);
            window.location.href = url; // Fallback
        }
    };

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });

    // Handle back/forward buttons
    window.addEventListener('popstate', () => {
        window.location.reload();
    });
});
