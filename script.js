// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU TOGGLE =====
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== HERO PARTICLES =====
function createParticles() {
    const container = document.getElementById('heroParticles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = 50 + Math.random() * 50 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = 2 + Math.random() * 3 + 's';
        particle.style.width = 2 + Math.random() * 4 + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

createParticles();

// ===== SCROLL REVEAL ANIMATIONS =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-up class to animated elements
document.querySelectorAll('.category-item, .product-card, .feature-item').forEach((el, index) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = (index % 4) * 0.1 + 's';
    observer.observe(el);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ===== ADD TO CART ANIMATION =====
document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        this.innerHTML = '<i class="fas fa-check"></i>';
        this.style.background = 'var(--primary)';
        this.style.color = 'var(--bg-dark)';
        this.style.borderColor = 'var(--primary)';

        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-plus"></i>';
            this.style.background = 'transparent';
            this.style.color = 'var(--primary)';
        }, 1500);
    });
});

// ===== CATEGORY HOVER EFFECTS =====
document.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.querySelector('.category-icon').style.transform = 'scale(1.1) rotate(5deg)';
    });
    item.addEventListener('mouseleave', function () {
        this.querySelector('.category-icon').style.transform = 'scale(1) rotate(0)';
    });
});

// ===== PROMO CODE COPY =====
const promoCode = document.querySelector('.promo-code');
if (promoCode) {
    promoCode.style.cursor = 'pointer';
    promoCode.title = 'Click to copy';

    promoCode.addEventListener('click', function () {
        navigator.clipboard.writeText('WELCOME20').then(() => {
            const originalText = this.textContent;
            this.textContent = 'COPIED!';
            this.style.background = '#4CAF50';
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 1500);
        });
    });
}

// ===== COUNTDOWN TIMER =====
function startCountdown() {
    // Set countdown to 2 days, 14 hours, 36 minutes, 48 seconds from now
    const now = new Date();
    const endDate = new Date(now.getTime() + (2 * 24 * 60 * 60 + 14 * 60 * 60 + 36 * 60 + 48) * 1000);

    function updateCountdown() {
        const now = new Date();
        const diff = endDate - now;

        if (diff <= 0) {
            document.getElementById('countDays').textContent = '00';
            document.getElementById('countHours').textContent = '00';
            document.getElementById('countMins').textContent = '00';
            document.getElementById('countSecs').textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('countDays').textContent = String(days).padStart(2, '0');
        document.getElementById('countHours').textContent = String(hours).padStart(2, '0');
        document.getElementById('countMins').textContent = String(mins).padStart(2, '0');
        document.getElementById('countSecs').textContent = String(secs).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

startCountdown();

// ===== STATS COUNTER ANIMATION =====
function animateStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                let current = 0;
                const duration = 2000;
                const increment = target / (duration / 16);
                
                function updateCounter() {
                    current += increment;
                    if (current >= target) {
                        el.textContent = target;
                        return;
                    }
                    el.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                }
                
                updateCounter();
                statsObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => statsObserver.observe(num));
}

animateStatCounters();

// ===== PROMO CODE APPLY =====
const promoApplyBtn = document.getElementById('promoApplyBtn');
const promoInput = document.getElementById('promoInput');

if (promoApplyBtn && promoInput) {
    promoApplyBtn.addEventListener('click', function () {
        const code = promoInput.value.trim().toUpperCase();
        
        if (code === '') {
            promoInput.style.borderColor = '#E53935';
            promoInput.setAttribute('placeholder', 'Please enter a code...');
            setTimeout(() => {
                promoInput.style.borderColor = '';
                promoInput.setAttribute('placeholder', 'Enter code...');
            }, 2000);
            return;
        }

        if (code === 'WELCOME20' || code === 'BURGER10') {
            this.textContent = 'APPLIED ✓';
            this.style.background = '#43A047';
            this.style.borderColor = '#43A047';
            promoInput.style.borderColor = '#43A047';
            promoInput.disabled = true;

            setTimeout(() => {
                this.textContent = 'APPLY';
                this.style.background = '';
                this.style.borderColor = '';
                promoInput.style.borderColor = '';
                promoInput.disabled = false;
                promoInput.value = '';
            }, 3000);
        } else {
            this.textContent = 'INVALID';
            this.style.background = '#E53935';
            this.style.borderColor = '#E53935';
            promoInput.style.borderColor = '#E53935';

            setTimeout(() => {
                this.textContent = 'APPLY';
                this.style.background = '';
                this.style.borderColor = '';
                promoInput.style.borderColor = '';
            }, 2000);
        }
    });

    promoInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            promoApplyBtn.click();
        }
    });
}

// ===== OFFER CARD GRAB DEAL ANIMATION =====
document.querySelectorAll('.offer-grab-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        const originalHTML = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> ADDED TO CART';
        this.style.background = '#43A047';

        setTimeout(() => {
            this.innerHTML = originalHTML;
            this.style.background = '';
        }, 2000);
    });
});

// ===== EXPANDED SCROLL ANIMATIONS =====
document.querySelectorAll('.offer-card, .highlight-item, .testimonial-card, .stat-item').forEach((el, index) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = (index % 4) * 0.1 + 's';
    observer.observe(el);
});

// ===== PAGE LOAD ANIMATIONS =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});
