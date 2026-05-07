document.addEventListener('DOMContentLoaded', () => {
    // ===== LOADER =====
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => loader.classList.add('hidden'), 800);
    });
    setTimeout(() => loader.classList.add('hidden'), 3000); // fallback

    // ===== CURSOR GLOW =====
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }

    // ===== PARTICLES =====
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');
            const size = Math.random() * 4 + 1;
            const colors = ['rgba(255,193,7,0.4)', 'rgba(255,59,48,0.4)', 'rgba(255,255,255,0.2)'];
            p.style.cssText = `
                width: ${size}px; height: ${size}px;
                left: ${Math.random() * 100}%;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                animation-duration: ${Math.random() * 10 + 8}s;
                animation-delay: ${Math.random() * 10}s;
            `;
            particlesContainer.appendChild(p);
        }
    }

    // ===== HERO SLIDESHOW =====
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    // ===== NAVBAR =====
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
            navbar.classList.toggle('menu-open');
        });
        navLinks.querySelectorAll('a, button').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
                navbar.classList.remove('menu-open');
            });
        });
    }

    // ===== SCROLL ANIMATIONS =====
    const animElements = document.querySelectorAll('[data-anim]');
    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
                animObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    animElements.forEach(el => animObserver.observe(el));

    // ===== COUNTER ANIMATION =====
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                let current = 0;
                const step = Math.ceil(target / 60);
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) { current = target; clearInterval(timer); }
                    el.textContent = current;
                }, 25);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    // ===== CATALOG FILTER (for catalogo.html) =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const searchInput = document.getElementById('searchInput');

    if (filterBtns.length && productCards.length) {
        let currentFilter = 'all';
        let currentSearch = '';

        const updateCatalog = () => {
            let visibleIndex = 0;
            productCards.forEach((card) => {
                const cat = card.getAttribute('data-category');
                const title = card.querySelector('h3').textContent.toLowerCase();
                
                const matchesFilter = currentFilter === 'all' || cat === currentFilter;
                const matchesSearch = currentSearch === '' || title.includes(currentSearch);
                const show = matchesFilter && matchesSearch;
                
                card.style.transitionDelay = show ? `${visibleIndex * 30}ms` : '0ms';
                card.classList.toggle('hidden-card', !show);
                
                if (show) visibleIndex++;
            });
        };

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.getAttribute('data-filter');
                updateCatalog();
            });
        });

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentSearch = e.target.value.toLowerCase().trim();
                updateCatalog();
            });
        }
    }
});
