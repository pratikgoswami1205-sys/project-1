document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('js-active');
    document.body.classList.add('page-entering'); // Apply entering 3D transition
    initTheme();
    initNavbar();
    initMobileMenu();
    initTilt();
    initModalSystem();
    initCustomCursor();
    initScrollAnimations();
    initPageTransitions();
    initProfileTyping();
    initLoader();
    
    // Content Safety Reveal Fallback
    setTimeout(() => {
        document.querySelectorAll('.modern-card, .section-header, .hero-content, .grid-layout > div, .skill-card').forEach(el => {
            if (getComputedStyle(el).opacity === '0' || el.style.opacity === '0') {
                el.classList.add('animate-fade');
                el.style.opacity = '';
                el.style.transform = '';
            }
        });
    }, 5000); // Reveal after 5s no matter what
});

function initLoader() {
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        // Fallback: forcefully hide after 3 seconds
        const hideLoader = () => {
            loader.classList.add('fade-out');
            document.body.classList.remove('page-entering');
            // Immediate removal after animation starts
            setTimeout(() => {
                loader.style.setProperty('display', 'none', 'important');
                loader.style.pointerEvents = 'none';
            }, 800);
        };

        window.addEventListener('load', hideLoader);
        setTimeout(hideLoader, 3000); // Max wait 3 seconds
    }
}

function initPageTransitions() {
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
        link.addEventListener('click', e => {
            const target = link.getAttribute('href');
            // Check if link is an internal HTML page navigation
            if (target && target.endsWith('.html') && target !== '#' && !link.hasAttribute('target')) {
                e.preventDefault();
                // Play exit animation
                document.body.classList.add('page-exiting');
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = target;
                }, 500); // Match animation duration (-100ms for smoothness)
            }
        });
    });
}

function initCustomCursor() {
    // Only initialize on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorTrail);

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    // Trail animation loop
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.15;
        trailY += (mouseY - trailY) * 0.15;
        cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // Hover effect
    const addHoverListeners = () => {
        const interactiveElements = document.querySelectorAll('a, button, .modern-card, .btn-primary, .theme-toggle, input, textarea, .skill-card');
        interactiveElements.forEach(el => {
            // Remove old listeners to prevent duplicates if called again
            el.removeEventListener('mouseenter', handleMouseEnter);
            el.removeEventListener('mouseleave', handleMouseLeave);
            
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });
    };

    const handleMouseEnter = () => {
        cursor.classList.add('hovering');
        cursorTrail.classList.add('hovering');
    };
    
    const handleMouseLeave = () => {
        cursor.classList.remove('hovering');
        cursorTrail.classList.remove('hovering');
    };

    addHoverListeners();

    // Re-apply listeners if DOM changes (e.g. modals opening)
    const observer = new MutationObserver((mutations) => {
        addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

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
                // Force clear inline styles to ensure visibility
                entry.target.style.opacity = '';
                entry.target.style.transform = '';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.modern-card, .section-header, .hero-content, .grid-layout > div, .skill-card').forEach(el => {
        // Just observe, let CSS handle initial state for better reliability
        observer.observe(el);
    });
}

// Typing Animation for Hero and Profile
function initTypingEffect(elementId, phrases) {
    const typingText = document.getElementById(elementId);
    if (!typingText) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50; // Faster deleting
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingDelay = 2000; // Pause at the end of the phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingDelay = 500; // Pause before typing new phrase
        }

        setTimeout(type, typingDelay);
    }

    // Start typing style for cursor
    const cursor = typingText.nextElementSibling;
    if (cursor && cursor.classList.contains('typing-cursor')) {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }

    setTimeout(type, 1000); // Initial delay
}

function initProfileTyping() {
    initTypingEffect('typing-text', [
        "Building Smart Tools for Students",
        "Exploring Web Technologies",
        "Passionate About Data and Development"
    ]);

    initTypingEffect('hero-typing-text', [
        "Building Smart Tools for Students",
        "Exploring Web Technologies",
        "Creating Digital Platforms"
    ]);
}

// Counter Animation Logic
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCount = (target) => {
        const updateCount = () => {
            const current = +target.innerText;
            const goal = +target.getAttribute('data-target');
            const inc = goal / speed;

            if (current < goal) {
                target.innerText = Math.ceil(current + inc);
                setTimeout(updateCount, 10);
            } else {
                target.innerText = goal + '+';
            }
        };
        updateCount();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.counter')) {
        initCounters();
    }
});