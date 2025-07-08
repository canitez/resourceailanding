// Resource AI Landing Page JavaScript

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library with enhanced settings
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true,
        offset: 100,
        delay: 100
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for floating elements
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Apply parallax effect to floating elements
        document.querySelectorAll('.floating-element').forEach((elem, index) => {
            const speed = 0.05 + (index * 0.02);
            elem.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
        
        // Add header background when scrolling
        const header = document.querySelector('header');
        if (scrollPosition > 50) {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(10, 10, 26, 0.95)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(10, 10, 26, 0.8)';
        }
    });

    // Automatic testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        const testimonials = document.querySelectorAll('.testimonial');
        let currentIndex = 0;
        
        // Only activate automatic sliding if there are multiple testimonials
        if (testimonials.length > 1) {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonials.length;
                const scrollPosition = testimonials[currentIndex].offsetLeft - testimonialSlider.offsetLeft;
                
                testimonialSlider.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
            }, 5000);
        }
    }

    // Animated counting for statistics (if added later)
    const animateCounter = (element, target) => {
        const counter = element;
        const speed = 200;
        const inc = target / speed;
        let currentCount = 0;
        
        const updateCount = () => {
            if (currentCount < target) {
                currentCount += inc;
                counter.textContent = Math.ceil(currentCount);
                setTimeout(updateCount, 1);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCount();
    };

    // Trigger counter animation when elements are in view
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    };

    // Set up intersection observer for counter elements
    const counterObserver = new IntersectionObserver(handleIntersection, {
        threshold: 0.5
    });

    // Observe counter elements if they exist
    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });

    // Animated text typing effect for hero section
    const animateText = () => {
        const textElement = document.querySelector('.hero-content h1');
        if (!textElement) return;
        
        const text = textElement.textContent;
        textElement.textContent = '';
        
        let charIndex = 0;
        const typeInterval = setInterval(() => {
            if (charIndex < text.length) {
                textElement.textContent += text.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);
    };

    // Enable typing animation
    setTimeout(animateText, 1000);

    // Add glowing effect to buttons on hover
    document.querySelectorAll('.btn.primary').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.boxShadow = '0 0 25px rgba(110, 66, 255, 0.6)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.boxShadow = '0 5px 15px rgba(110, 66, 255, 0.4)';
        });
    });

    // Add particle background effect
    const createParticles = () => {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.position = 'fixed';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.pointerEvents = 'none';
        particleContainer.style.zIndex = '-1';
        document.body.appendChild(particleContainer);

        // Create particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.position = 'absolute';
            particle.style.width = `${Math.random() * 5 + 1}px`;
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(255, 255, 255, 0.5)';
            particle.style.borderRadius = '50%';
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.opacity = Math.random() * 0.5;
            
            // Animation properties
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.animation = `floatParticle ${duration}s linear ${delay}s infinite`;
            particleContainer.appendChild(particle);
        }

        // Add keyframes for particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: var(--opacity);
                }
                90% {
                    opacity: var(--opacity);
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    };

    // Enable particle effect
    createParticles();
});

// Preload images for smoother experience
const preloadImages = () => {
    const images = [
        'images/app-icon.png',
        'images/mockup.png',
        'images/app-screens.png'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

preloadImages();
