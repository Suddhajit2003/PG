// ===== GLOBAL VARIABLES =====
let currentTestimonial = 0;
let currentGalleryImage = 0;
const galleryImages = [];

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== INITIALIZE APPLICATION =====
function initializeApp() {
    // Initialize all components
    initializeNavigation();
    initializeScrollProgress();
    initializeThemeToggle();
    initializeAnimations();
    initializePlanFilters();
    initializeTestimonials();
    initializeGallery();
    initializeContactForm();
    initializeParticles();
    
    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Smooth scroll for navigation links
    initializeSmoothScroll();
    
    // Initialize intersection observer for animations
    initializeIntersectionObserver();
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== SCROLL PROGRESS =====
function initializeScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// ===== THEME TOGGLE =====
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// ===== SMOOTH SCROLL =====
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Add entrance animations to elements
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = getInitialTransform(element.getAttribute('data-aos'));
    });
}

function getInitialTransform(animation) {
    switch (animation) {
        case 'fade-up':
            return 'translateY(30px)';
        case 'fade-down':
            return 'translateY(-30px)';
        case 'fade-left':
            return 'translateX(30px)';
        case 'fade-right':
            return 'translateX(-30px)';
        case 'zoom-in':
            return 'scale(0.8)';
        case 'zoom-out':
            return 'scale(1.2)';
        default:
            return 'translateY(30px)';
    }
}

// ===== INTERSECTION OBSERVER =====
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('aos-animate');
                    element.style.opacity = '1';
                    element.style.transform = 'none';
                }, delay);
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== PLAN FILTERS =====
function initializePlanFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const planCards = document.querySelectorAll('.plan-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            planCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    if (card.classList.contains(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// ===== TESTIMONIALS =====
function initializeTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Auto-play testimonials
    setInterval(() => {
        nextTestimonial();
    }, 5000);
    
    // Navigation buttons
    prevBtn.addEventListener('click', prevTestimonial);
    nextBtn.addEventListener('click', nextTestimonial);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show selected testimonial
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentTestimonial = index;
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }
    
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }
}

// ===== GALLERY =====
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    // Populate gallery images array
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        galleryImages.push({
            src: img.src,
            alt: img.alt
        });
        
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });
    
    // Lightbox controls
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);
    
    // Close lightbox on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        }
    });
    
    function openLightbox(index) {
        currentGalleryImage = index;
        lightboxImg.src = galleryImages[index].src;
        lightboxImg.alt = galleryImages[index].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    function prevImage() {
        currentGalleryImage = (currentGalleryImage - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentGalleryImage].src;
        lightboxImg.alt = galleryImages[currentGalleryImage].alt;
    }
    
    function nextImage() {
        currentGalleryImage = (currentGalleryImage + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentGalleryImage].src;
        lightboxImg.alt = galleryImages[currentGalleryImage].alt;
    }
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    // Add floating label effect
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    function validateForm() {
        let isValid = true;
        const formData = new FormData(form);
        
        // Clear previous errors
        const errorElements = form.querySelectorAll('.form-error');
        errorElements.forEach(error => {
            error.textContent = '';
            error.classList.remove('show');
        });
        
        // Validate name
        const name = formData.get('name');
        if (!name || name.trim().length < 2) {
            showError('name', 'Please enter a valid name (at least 2 characters)');
            isValid = false;
        }
        
        // Validate email
        const email = formData.get('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate mobile
        const mobile = formData.get('mobile');
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobile || !mobileRegex.test(mobile)) {
            showError('mobile', 'Please enter a valid 10-digit mobile number');
            isValid = false;
        }
        
        // Validate plan selection
        const plan = formData.get('plan');
        if (!plan) {
            showError('plan', 'Please select a preferred plan');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(fieldName, message) {
        const field = form.querySelector(`[name="${fieldName}"]`);
        const errorElement = field.parentElement.querySelector('.form-error');
        
        errorElement.textContent = message;
        errorElement.classList.add('show');
        field.style.borderColor = '#e74c3c';
        
        // Remove error styling on input
        field.addEventListener('input', () => {
            errorElement.classList.remove('show');
            field.style.borderColor = '';
        }, { once: true });
    }
    
    function submitForm() {
        const submitBtn = form.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            showSuccessMessage();
            
            // Reset form
            form.reset();
            inputs.forEach(input => {
                input.parentElement.classList.remove('focused');
            });
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    function showSuccessMessage() {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>Thank you! Your message has been sent successfully. We'll get back to you soon.</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4CAF50, #45a049);
            color: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.5s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 5000);
        
        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        });
    }
}

// ===== PARTICLES ANIMATION =====
function initializeParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    
    // Create additional floating particles
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: var(--accent-color);
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.1};
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 4 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        heroParticles.appendChild(particle);
    }
}

// ===== PLAN BOOKING =====
function initializePlanBooking() {
    const planButtons = document.querySelectorAll('.plan-btn');
    
    planButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const planCard = button.closest('.plan-card');
            const planTitle = planCard.querySelector('.plan-title').textContent;
            const planPrice = planCard.querySelector('.amount').textContent;
            
            // Scroll to contact form
            const contactSection = document.getElementById('contact');
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            // Pre-fill the plan selection
            setTimeout(() => {
                const planSelect = document.getElementById('plan');
                const planOptions = planSelect.querySelectorAll('option');
                
                planOptions.forEach(option => {
                    if (option.textContent.includes(planTitle.split(' ')[0]) && 
                        option.textContent.includes(planTitle.split(' ')[1])) {
                        option.selected = true;
                    }
                });
                
                // Add visual feedback
                planSelect.style.borderColor = 'var(--primary-color)';
                planSelect.parentElement.classList.add('focused');
                
                // Show booking notification
                showBookingNotification(planTitle, planPrice);
            }, 1000);
        });
    });
}

function showBookingNotification(planTitle, planPrice) {
    const notification = document.createElement('div');
    notification.className = 'booking-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-info-circle"></i>
            <div>
                <strong>Selected Plan: ${planTitle}</strong><br>
                <span>Price: ₹${planPrice}/month</span><br>
                <small>Please fill the form below to proceed with booking</small>
            </div>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 10px 30px var(--shadow-medium);
        z-index: 10000;
        max-width: 350px;
        animation: slideInRight 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 8 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }
    }, 8000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 500);
    });
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Optimize scroll events
const optimizedScrollHandler = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// Lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    console.error('JavaScript Error:', e.error);
    // You can add error reporting here
});

// ===== ADDITIONAL ANIMATIONS =====
// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: flex-start;
        gap: 12px;
    }
    
    .notification-content i {
        font-size: 1.2rem;
        margin-top: 2px;
        flex-shrink: 0;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
        flex-shrink: 0;
        opacity: 0.8;
        transition: opacity 0.2s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;

document.head.appendChild(style);

// Initialize plan booking after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializePlanBooking();
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Add keyboard navigation for custom elements
document.addEventListener('keydown', (e) => {
    // Handle Enter key on buttons
    if (e.key === 'Enter' && e.target.classList.contains('filter-btn')) {
        e.target.click();
    }
    
    // Handle Tab navigation for better accessibility
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// ===== FINAL INITIALIZATION =====
// Ensure all components are initialized
document.addEventListener('DOMContentLoaded', () => {
    // Add a small delay to ensure all elements are rendered
    setTimeout(() => {
        initializeLazyLoading();
        
        // Add loaded class to body for any final animations
        document.body.classList.add('loaded');
    }, 100);
});

// ===== SERVICE WORKER REGISTRATION (Optional) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // You can register a service worker here for offline functionality
        // navigator.serviceWorker.register('/sw.js');
    });
}

// ===== WHATSAPP FLOATING BUTTON =====
document.addEventListener('DOMContentLoaded', () => {
    const whatsappFloat = document.getElementById('whatsapp-float');
    const whatsappBtn = whatsappFloat.querySelector('.whatsapp-btn');
    
    // Show/hide WhatsApp button based on scroll position
    let lastScrollTop = 0;
    let isVisible = true;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show button after scrolling down a bit
        if (scrollTop > 300) {
            if (!isVisible) {
                whatsappFloat.style.transform = 'translateY(0)';
                whatsappFloat.style.opacity = '1';
                isVisible = true;
            }
        } else {
            if (isVisible) {
                whatsappFloat.style.transform = 'translateY(100px)';
                whatsappFloat.style.opacity = '0';
                isVisible = false;
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add click tracking (optional - for analytics)
    whatsappBtn.addEventListener('click', () => {
        // You can add analytics tracking here
        console.log('WhatsApp button clicked');
        
        // Optional: Add a small animation feedback
        whatsappBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            whatsappBtn.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Add hover sound effect (optional)
    whatsappBtn.addEventListener('mouseenter', () => {
        // You can add a subtle sound effect here if needed
        whatsappBtn.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    whatsappBtn.addEventListener('mouseleave', () => {
        whatsappBtn.style.transform = 'translateY(0) scale(1)';
    });
    
    // Initialize button state
    whatsappFloat.style.transition = 'all 0.3s ease';
    whatsappFloat.style.transform = 'translateY(100px)';
    whatsappFloat.style.opacity = '0';
    
    // Show button after page load
    setTimeout(() => {
        if (window.pageYOffset > 300) {
            whatsappFloat.style.transform = 'translateY(0)';
            whatsappFloat.style.opacity = '1';
            isVisible = true;
        }
    }, 1000);
});