// Background Image Rotation
const backgroundImages = [
    'url("images/bg1.jpg")',
    'url("images/bg2.jpg")',
    'url("images/bg3.jpg")',
    'url("images/bg4.jpg")'
];

let currentImageIndex = 0;
const bgElement = document.querySelector('.animated-bg');

function changeBackground() {
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    if (bgElement) {
        bgElement.style.backgroundImage = backgroundImages[currentImageIndex];
        bgElement.style.opacity = '0';
        setTimeout(() => {
            bgElement.style.opacity = '1';
        }, 100);
    }
}

// Initial background set
if (bgElement) {
    bgElement.style.backgroundImage = backgroundImages[0];
    bgElement.style.transition = 'opacity 1.5s ease-in-out';
    // Change background every 30 seconds
    setInterval(changeBackground, 30000);
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add background when scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
    
    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
            const targetId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${targetId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Beat player functionality
const beatItems = document.querySelectorAll('.beat-item');
let currentlyPlaying = null;

if (beatItems.length > 0) {
    beatItems.forEach(item => {
        item.addEventListener('click', () => {
            const playIcon = item.querySelector('.play-icon');
            
            // Toggle play/pause
            if (currentlyPlaying === item) {
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
                currentlyPlaying = null;
            } else {
                // Stop previous
                if (currentlyPlaying) {
                    const prevIcon = currentlyPlaying.querySelector('.play-icon');
                    prevIcon.classList.remove('fa-pause');
                    prevIcon.classList.add('fa-play');
                }
                
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
                currentlyPlaying = item;
                
                // Simulate audio playing (you would connect actual audio here)
                simulateWaveform();
            }
        });
    });
}

// Simulate waveform animation
function simulateWaveform() {
    const canvas = document.getElementById('waveform');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = 100;
    
    let time = 0;
    
    function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, '#ff3366');
        gradient.addColorStop(1, '#6c5ce7');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        
        for (let i = 0; i < width; i += 5) {
            const amplitude = Math.sin(i * 0.02 + time) * 20 + 
                             Math.sin(i * 0.05 + time * 2) * 10;
            const y = height / 2 + amplitude;
            
            if (i === 0) {
                ctx.moveTo(i, y);
            } else {
                ctx.lineTo(i, y);
            }
        }
        
        ctx.stroke();
        time += 0.1;
        
        if (currentlyPlaying) {
            requestAnimationFrame(draw);
        }
    }
    
    draw();
}

// Social cards hover effect
const socialCards = document.querySelectorAll('.social-card');

socialCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Studio cards hover effect
const studioCards = document.querySelectorAll('.studio-card');

studioCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const overlay = card.querySelector('.overlay i');
        if (overlay) {
            overlay.style.animation = 'pulse 1s ease-in-out infinite';
        }
    });
});

// Email link copy functionality
const emailLink = document.querySelector('.email-link');

if (emailLink) {
    emailLink.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Copy email to clipboard
        const email = emailLink.textContent;
        navigator.clipboard.writeText(email).then(() => {
            // Show tooltip
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Email copied!';
            tooltip.style.position = 'fixed';
            tooltip.style.top = '50%';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translate(-50%, -50%)';
            tooltip.style.background = 'var(--gradient)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '1rem 2rem';
            tooltip.style.borderRadius = '50px';
            tooltip.style.zIndex = '9999';
            tooltip.style.animation = 'fadeInUp 0.3s ease';
            
            document.body.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.remove();
            }, 2000);
        });
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add special animations to stats
            if (entry.target.classList.contains('stat-item')) {
                const number = entry.target.querySelector('.stat-number');
                if (number) {
                    animateNumber(number);
                }
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.studio-card, .beat-item, .social-card, .email-info, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Animate numbers
function animateNumber(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/[^0-9]/g, ''));
    const suffix = text.replace(/[0-9]/g, '');
    
    if (isNaN(number)) return;
    
    let current = 0;
    const increment = number / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            element.textContent = number + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepTime);
}

// Preload images
function preloadImages() {
    const images = [
        'images/profile.jpg',
        'images/piano.jpg',
        'images/fl-studio.jpg',
        'images/beats.jpg',
        'images/studio.jpg',
        ...backgroundImages.map(bg => bg.replace(/url\(['"]?(.*?)['"]?\)/g, '$1'))
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize on load
window.addEventListener('load', () => {
    preloadImages();
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Initialize any audio elements
    console.log('MAXYKEYS LIVEMUSIC - Ready to make beats!');
});

// Add mouse move parallax effect to profile
const profileWrapper = document.querySelector('.profile-image-wrapper');

if (profileWrapper) {
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;
        
        profileWrapper.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// Keyboard shortcuts for beats (just for fun)
document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '4') {
        const index = parseInt(e.key) - 1;
        if (beatItems[index]) {
            beatItems[index].click();
        }
    }
});

// Add ripple effect to buttons
document.querySelectorAll('.social-card, .studio-card, .beat-item').forEach(el => {
    el.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = e.offsetX + 'px';
        ripple.style.top = e.offsetY + 'px';
        
        el.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);