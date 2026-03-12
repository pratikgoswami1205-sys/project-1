document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    initMobileMenu();
    initTilt();
    initModalSystem();
    // initScrollAnimations(); // Disabled to stop 'sliding' entry error
});

// Theme Management
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    const setTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark');
            icon.className = 'fas fa-sun';
        } else {
            body.classList.remove('dark');
            icon.className = 'fas fa-moon';
        }
        localStorage.setItem('theme', theme);
    };

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (systemPrefersDark) {
        setTheme('dark');
    }

    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.contains('dark');
        setTheme(isDark ? 'light' : 'dark');
    });
}

// Navbar Effects
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const nav = document.querySelector('.nav-links');
    if (!nav) return;

    if (!document.querySelector('.mobile-toggle')) {
        const toggle = document.createElement('div');
        toggle.className = 'mobile-toggle';
        toggle.innerHTML = '<i class="fas fa-bars"></i>';
        toggle.style.cssText = `
            display: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-main);
        `;
        document.querySelector('.navbar').appendChild(toggle);

        toggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-active');
            toggle.querySelector('i').classList.toggle('fa-bars');
            toggle.querySelector('i').classList.toggle('fa-times');
        });
    }
}

// 3D Tilt Effect
function initTilt() {
    const cards = document.querySelectorAll('.modern-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20; // Reduced sensitivity
            const rotateY = (centerX - x) / 20; // Reduced sensitivity
            
            card.style.transform = `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            const glossX = (x / rect.width) * 100;
            const glossY = (y / rect.height) * 100;
            card.style.background = `radial-gradient(circle at ${glossX}% ${glossY}%, var(--glass-bg), var(--bg-card))`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(2000px) rotateX(0deg) rotateY(0deg)`;
            card.style.background = `var(--bg-card)`;
        });
    });
}

// Modal System
function initModalSystem() {
    const overlays = document.querySelectorAll('.modal-overlay');
    const closeBtns = document.querySelectorAll('.close-modal');

    const closeModal = (overlay) => {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(btn.closest('.modal-overlay'));
        });
    });

    window.addEventListener('click', e => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal(e.target);
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            overlays.forEach(overlay => {
                if (overlay.classList.contains('active')) closeModal(overlay);
            });
        }
    });
}

window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

// Intersection Observer for animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.modern-card, .section-header, .hero-content').forEach(el => {
        // el.style.opacity = '0'; // Commented to prevent hidden elements
        observer.observe(el);
    });
}