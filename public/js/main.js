/* ============================================================
   EASWARI ASSOCIATES — Main JavaScript v3
   Pure Vanilla JS | No Libraries | Luxury Financial Firm
   ============================================================ */

// ============================================================
// 1. PRELOADER — Smooth dismiss
// ============================================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => preloader.classList.add('hidden'), 600);
    }
});

// ============================================================
// 2. NAVBAR — Scroll glassmorphism + Active link highlight
// ============================================================
(function () {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    if (!navbar) return;

    function updateNav() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link based on scroll position
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
})();

// ============================================================
// 3. MOBILE MENU — Hamburger + Overlay + Slide-in
// ============================================================
(function () {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    if (!hamburger || !mobileNav || !overlay) return;

    function toggleMenu() {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));
})();

// ============================================================
// 4. SMOOTH SCROLL for anchor links
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ============================================================
// 5. SCROLL REVEAL — IntersectionObserver for .reveal elements
// ============================================================
(function () {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // trigger once
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    // Group reveals by parent for staggered effect
    const parentGroups = new Map();
    reveals.forEach(el => {
        const parent = el.parentElement;
        if (!parentGroups.has(parent)) {
            parentGroups.set(parent, []);
        }
        parentGroups.get(parent).push(el);
    });

    parentGroups.forEach(children => {
        children.forEach((el, i) => {
            el.style.transitionDelay = (i * 0.1) + 's';
            observer.observe(el);
        });
    });
})();

// ============================================================
// 6. COUNTER ANIMATION — easeOutQuart, triggered once
// ============================================================
(function () {
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;

    let started = false;

    function animateCounter(el, target, duration) {
        duration = duration || 2000;
        let start = null;
        const suffix = el.getAttribute('data-suffix') || '';

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
            el.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target + suffix;
            }
        }
        requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            started = true;
            document.querySelectorAll('.counter-value').forEach(el => {
                const target = parseInt(el.getAttribute('data-target'), 10);
                animateCounter(el, target);
            });
            observer.unobserve(statsSection);
        }
    }, { threshold: 0.4 });

    observer.observe(statsSection);
})();

// ============================================================
// 7. TESTIMONIALS CAROUSEL — Auto-advance + dots + pause
// ============================================================
(function () {
    const track = document.querySelector('.carousel-track');
    const dots = document.querySelectorAll('.carousel-dot');
    const wrapper = document.querySelector('.carousel-wrapper');
    if (!track || !dots.length) return;

    let current = 0;
    const total = dots.length;
    let interval;
    let paused = false;

    function goTo(index) {
        current = ((index % total) + total) % total;
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function startAuto() {
        interval = setInterval(() => {
            if (!paused) goTo(current + 1);
        }, 5000);
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goTo(i);
            clearInterval(interval);
            startAuto();
        });
    });

    if (wrapper) {
        wrapper.addEventListener('mouseenter', () => { paused = true; });
        wrapper.addEventListener('mouseleave', () => { paused = false; });
    }

    goTo(0);
    startAuto();
})();

// ============================================================
// 8. HERO CANVAS PARTICLES — Gold dots with connecting lines
// ============================================================
(function () {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;

    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };
    const connectionDistance = 120;

    function resize() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }

    function initParticles() {
        particles = [];
        const count = Math.min(60, Math.floor(canvas.width * canvas.height / 15000));
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.25,
                speedY: (Math.random() - 0.5) * 0.25,
                opacity: Math.random() * 0.4 + 0.1,
                pulseOffset: Math.random() * Math.PI * 2,
                pulseSpeed: 0.01 + Math.random() * 0.02
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connecting lines between nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < connectionDistance) {
                    const lineOpacity = (1 - dist / connectionDistance) * 0.08;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = 'rgba(201, 168, 76, ' + lineOpacity + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        // Draw particles
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            // Wrap around
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            // Pulse glow
            p.pulseOffset += p.pulseSpeed;
            const pulse = Math.sin(p.pulseOffset) * 0.15 + 0.85;
            const currentOpacity = p.opacity * pulse;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(201, 168, 76, ' + currentOpacity + ')';
            ctx.fill();

            // Subtle glow
            if (p.size > 1) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(201, 168, 76, ' + (currentOpacity * 0.08) + ')';
                ctx.fill();
            }
        });

        requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    draw();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            resize();
            initParticles();
        }, 200);
    });
})();

// ============================================================
// 9. SCROLL INDICATOR — Auto-hide on first scroll
// ============================================================
(function () {
    const indicator = document.querySelector('.scroll-indicator');
    if (!indicator) return;

    let hidden = false;
    window.addEventListener('scroll', () => {
        if (!hidden && window.scrollY > 100) {
            hidden = true;
            indicator.classList.add('hidden');
        }
    }, { passive: true });
})();

// ============================================================
// 10. CONTACT FORM — Floating labels, validation, EmailJS
// ============================================================
(function () {
    // Floating label for select
    const selects = document.querySelectorAll('.form-group select');
    selects.forEach(sel => {
        sel.addEventListener('change', function () {
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });

    // EmailJS Init
    if (typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: "ux-r6yJDR40lU1NYY" });
    }

    // Form submission
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Validation
        let valid = true;
        const groups = form.querySelectorAll('.form-group');
        groups.forEach(g => {
            const input = g.querySelector('input[required], textarea[required]');
            if (input && !input.value.trim()) {
                g.classList.add('error');
                valid = false;
            } else {
                g.classList.remove('error');
            }
        });
        if (!valid) return;

        const msg = document.getElementById('form-message');
        msg.className = 'visible';
        msg.style.display = 'block';
        msg.style.color = 'var(--text-mid)';
        msg.textContent = 'Sending your message...';

        const formData = {
            name: form.querySelector('#name').value,
            email: form.querySelector('#email').value,
            phone: form.querySelector('#phone').value,
            service: form.querySelector('#service').value,
            message: form.querySelector('#message').value,
            timestamp: new Date().toISOString()
        };

        const serviceId = 'service_yjztyb9';
        const templateId = 'template_e2n18gl';

        try {
            // Firebase Firestore save
            if (window.db && window.auth && window.auth.currentUser && window.collection && window.addDoc) {
                const userId = window.auth.currentUser.uid;
                const path = 'artifacts/' + window.appId + '/users/' + userId + '/contact_submissions';
                await window.addDoc(window.collection(window.db, path), formData);
            }

            // EmailJS send
            if (typeof emailjs !== 'undefined') {
                await emailjs.send(serviceId, templateId, {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    service: formData.service,
                    message: formData.message,
                    timestamp: formData.timestamp,
                    to_name: "EASWARI ASSOCIATES"
                });
            }

            msg.style.color = '#2ecc71';
            msg.textContent = 'Thank you! We will get back to you soon.';
            form.reset();
            // Reset floating labels
            selects.forEach(sel => sel.classList.remove('has-value'));
        } catch (error) {
            console.error("Form error:", error);
            msg.style.color = '#e74c3c';
            msg.textContent = 'Error sending message. Please try again or contact us directly.';

            // WhatsApp fallback
            const waLink = document.getElementById('wa-fallback');
            if (waLink) waLink.style.display = 'inline-block';
        }
    });
})();

// ============================================================
// 11. SCROLL PROGRESS BAR
// ============================================================
(function () {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;

    function update() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = percent + '%';
    }

    window.addEventListener('scroll', update, { passive: true });
})();

// ============================================================
// 12. BACK TO TOP BUTTON
// ============================================================
(function () {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// ============================================================
// 13. DYNAMIC COPYRIGHT YEAR
// ============================================================
(function () {
    const yearEl = document.getElementById('copyright-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
