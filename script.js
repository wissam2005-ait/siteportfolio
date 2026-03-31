document.addEventListener('DOMContentLoaded', () => {
    console.log('🎉 Portfolio Wissam chargé avec succès !');

    // ===========================
    // 1. SYNCHRO IMAGES MINIATURES
    // ===========================
    document.querySelectorAll('.project-card').forEach(card => {
        const firstThumb = card.querySelector('.thumb');
        const mainImg = card.querySelector('.project-main-img');
        if (firstThumb && mainImg) {
            mainImg.src = firstThumb.src;
            mainImg.alt = firstThumb.alt;
        }
    });

    // ===========================
    // 2. LIGHTBOX AVANCÉE
    // ===========================
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lb-overlay"></div>
        <div class="lb-content">
            <img class="lb-img" src="" alt="" />
            <button class="lb-close">✕</button>
            <button class="lb-prev">‹</button>
            <button class="lb-next">›</button>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lbImg = lightbox.querySelector('.lb-img');
    const lbPrev = lightbox.querySelector('.lb-prev');
    const lbNext = lightbox.querySelector('.lb-next');
    let currentProjectIndex = 0;
    let currentThumbs = [];

    function openLightbox(src, thumbs = []) {
        currentThumbs = thumbs;
        currentProjectIndex = 0;
        lbImg.src = src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function changeLightboxImage(direction) {
        if (currentThumbs.length === 0) return;

        currentProjectIndex += direction;
        if (currentProjectIndex < 0) currentProjectIndex = currentThumbs.length - 1;
        if (currentProjectIndex >= currentThumbs.length) currentProjectIndex = 0;

        lbImg.src = currentThumbs[currentProjectIndex].src;
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Événements lightbox
    lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lb-overlay').addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', () => changeLightboxImage(-1));
    lbNext.addEventListener('click', () => changeLightboxImage(1));

    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') changeLightboxImage(-1);
        if (e.key === 'ArrowRight') changeLightboxImage(1);
    });

    // Clic sur grande image → ouvre lightbox
    document.querySelectorAll('.project-main-img').forEach((img, index) => {
        img.style.cursor = 'zoom-in';
        const thumbs = img.closest('.project-card').querySelectorAll('.thumb');
        img.addEventListener('click', () => {
            openLightbox(img.src, Array.from(thumbs));
        });
    });

    // ===========================
    // 3. FONCTION CHANGE MINIATURE
    // ===========================
    window.changeMain = function(thumb, mainId) {
        const mainImg = document.getElementById(mainId);
        if (!mainImg) return;

        // Animation fluide
        mainImg.style.opacity = '0';
        mainImg.style.transform = 'scale(0.95)';

        setTimeout(() => {
            mainImg.src = thumb.src;
            mainImg.alt = thumb.alt;
            mainImg.style.opacity = '1';
            mainImg.style.transform = 'scale(1)';
        }, 200);

        // Active miniature
        thumb.closest('.project-thumbs')
            .querySelectorAll('.thumb')
            .forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
    };

    // ===========================
    // 4. NAVIGATION ACTIVE + EFFETS SCROLL
    // ===========================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const nav = document.querySelector('.nav');

    function updateNav() {
        let current = '';
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            if (scrollY >= section.offsetTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.style.color = 'var(--accent)';
                link.style.background = 'var(--accent-light)';
            } else {
                link.style.color = '';
                link.style.background = '';
            }
        });

        // Ombre nav au scroll
        nav.style.boxShadow = window.scrollY > 50 ?
            '0 20px 40px rgba(0,0,0,0.3)' : 'none';
    }

    window.addEventListener('scroll', updateNav);
    updateNav(); // Initialisation

    // ===========================
    // 5. ANIMATIONS D'APPARENCE (Intersection Observer)
    // ===========================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Éléments à animer
    document.querySelectorAll('.skill-card, .interest-card, .language-card, .project-card, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px) scale(0.95)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });

    // ===========================
    // 6. ANIMATIONS PARTICULES (Hero)
    // ===========================
    function createParticles() {
        const hero = document.querySelector('.hero');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            hero.appendChild(particle);
        }
    }

    // ===========================
    // 7. EFFETS HOVER CARDS
    // ===========================
    document.querySelectorAll('.skill-card, .interest-card, .language-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) rotateX(8deg)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });

    // ===========================
    // 8. SMOOTH SCROLL POUR ANCRAGES
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    // ===========================
    // 10. INITIALISATIONS
    // ===========================
    createParticles();

    // Preload images pour éviter les clignotements
    document.querySelectorAll('.thumb').forEach(thumb => {
        const img = new Image();
        img.src = thumb.src;
    });

    // ===========================
    // 11. MOBILE MENU (bonus)
    // ===========================
    function initMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.createElement('div');
        hamburger.className = 'mobile-menu';
        hamburger.innerHTML = '☰';
        document.querySelector('.nav').appendChild(hamburger);

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
        });

        // Fermer menu mobile au clic sur lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
            });
        });
    }

    // Activer menu mobile seulement sur petits écrans
    if (window.innerWidth <= 768) {
        initMobileMenu();
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu) mobileMenu.remove();
        } else {
            if (!document.querySelector('.mobile-menu')) {
                initMobileMenu();
            }
        }
    });

    // ===========================
    // 12. PERF: CURSOR TRAIL (optionnel)
    // ===========================
    /*
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    document.body.appendChild(cursorTrail);
    
    document.addEventListener('mousemove', (e) => {
        cursorTrail.style.left = e.clientX + 'px';
        cursorTrail.style.top = e.clientY + 'px';
    });
    */

    console.log('✅ Toutes les fonctionnalités sont actives !');
});

// ===========================
// FONCTIONS GLOBALES
// ===========================
window.changeMain = function(thumb, mainId) {
    const mainImg = document.getElementById(mainId);
    if (!mainImg) return;

    mainImg.style.opacity = '0';
    mainImg.style.transform = 'scale(0.95)';

    setTimeout(() => {
        mainImg.src = thumb.src;
        mainImg.alt = thumb.alt;
        mainImg.style.opacity = '1';
        mainImg.style.transform = 'scale(1)';
    }, 200);

    thumb.closest('.project-thumbs')
        .querySelectorAll('.thumb')
        .forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
};