// Carousel Functionality (Board of Directors)
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('carouselIndicators');
const currentSlideSpan = document.getElementById('currentSlide');
const totalSlidesSpan = document.getElementById('totalSlides');

if (carouselTrack) {
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    let currentIndex = 0;

    // Update total slides display
    if (totalSlidesSpan) {
        totalSlidesSpan.textContent = totalSlides;
    }

    // Create indicators
    if (indicatorsContainer) {
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    }

    function updateCarousel() {
        const offset = -currentIndex * 100;
        carouselTrack.style.transform = `translateX(${offset}%)`;

        // Update indicators
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });

        // Update current slide number
        if (currentSlideSpan) {
            currentSlideSpan.textContent = currentIndex + 1;
        }
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Event listeners for carousel buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Auto-play carousel (optional - every 5 seconds)
    let autoplayInterval = setInterval(nextSlide, 5000);

    // Pause autoplay on hover
    if (carouselTrack) {
        carouselTrack.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });

        carouselTrack.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(nextSlide, 5000);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (carouselTrack) {
        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }
}

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.toggle('active');
        }
    });
});

// Smooth scroll for anchor links
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

// Featured cards animation on home page
const featuredCards = document.querySelectorAll('.featured-card');
featuredCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #b8c6db 100%)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.background = 'white';
    });
});

// Product Filter Functionality (Products Page)
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const category = button.getAttribute('data-category');
        
        productCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Add fadeIn animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Trustee Cards Hover Effect
const trusteeCards = document.querySelectorAll('.trustee-card');
trusteeCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const overlay = this.querySelector('.trustee-overlay');
        if (overlay) {
            overlay.style.opacity = '1';
        }
    });
    card.addEventListener('mouseleave', function() {
        const overlay = this.querySelector('.trustee-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
        }
    });
});

// Contact Form Validation and Submission (Inquiries Page)
const contactForm = document.getElementById('contactForm');
const inquiryTypeSelect = document.getElementById('inquiryType');
const appointmentDateGroup = document.getElementById('appointmentDateGroup');
const appointmentTimeGroup = document.getElementById('appointmentTimeGroup');

// Show/hide appointment fields based on inquiry type
if (inquiryTypeSelect) {
    inquiryTypeSelect.addEventListener('change', function() {
        if (this.value === 'appointment') {
            appointmentDateGroup.style.display = 'block';
            appointmentTimeGroup.style.display = 'block';
        } else {
            appointmentDateGroup.style.display = 'none';
            appointmentTimeGroup.style.display = 'none';
        }
    });
}

// Form validation
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(error => {
            error.style.display = 'none';
        });
        
        // Validate name
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            showError('nameError', 'Name is required');
            isValid = false;
        } else if (name.value.trim().length < 3) {
            showError('nameError', 'Name must be at least 3 characters');
            isValid = false;
        }
        
        // Validate email
        const email = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!emailPattern.test(email.value)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate inquiry type
        const inquiryType = document.getElementById('inquiryType');
        if (inquiryType.value === '') {
            showError('inquiryTypeError', 'Please select an inquiry type');
            isValid = false;
        }
        
        // Validate message
        const message = document.getElementById('message');
        if (message.value.trim() === '') {
            showError('messageError', 'Message is required');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError('messageError', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        if (isValid) {
            // Hide form and show success message
            contactForm.style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
            
            // Scroll to success message
            document.getElementById('successMessage').scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'flex';
                document.getElementById('successMessage').style.display = 'none';
            }, 5000);
        }
    });
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// FAQ Accordion (Inquiries Page)
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Events Page - Event Filter
const eventFilterButtons = document.querySelectorAll('.event-filter .filter-btn');
const eventCards = document.querySelectorAll('.event-card');

eventFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        eventFilterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        eventCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Newsletter Form Submission (Events Page)
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('newsletterEmail');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailPattern.test(email.value)) {
            document.getElementById('newsletterSuccess').style.display = 'block';
            email.value = '';
            
            setTimeout(() => {
                document.getElementById('newsletterSuccess').style.display = 'none';
            }, 3000);
        } else {
            alert('Please enter a valid email address');
        }
    });
}

// RSVP Button Click Handler
const rsvpButtons = document.querySelectorAll('.rsvp-btn, .event-btn');
rsvpButtons.forEach(button => {
    button.addEventListener('click', function() {
        const eventName = this.closest('.featured-event, .event-card')
            .querySelector('h2, h3').textContent;
        
        if (confirm(`Would you like to RSVP for "${eventName}"?`)) {
            alert('Thank you for your interest! We will contact you shortly with more details.');
        }
    });
});

// Product Quick View Button
const quickViewButtons = document.querySelectorAll('.quick-view');
quickViewButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        
        alert(`${productName}\nPrice: ${productPrice}\n\nThis is a quick view. In a full implementation, this would open a detailed product modal.`);
    });
});

// Scroll Animation - Fade in elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply scroll animation to various elements
const animateOnScroll = document.querySelectorAll(
    '.featured-card, .product-card, .trustee-card, .event-card, .faq-item'
);

animateOnScroll.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Back to Top Button functionality
let backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.setAttribute('id', 'backToTop');
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = '1';
    } else {
        backToTopButton.style.opacity = '0';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopButton.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
});

backToTopButton.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Dynamic current year in footer
const footerYear = document.querySelectorAll('footer p');
footerYear.forEach(p => {
    if (p.textContent.includes('2025')) {
        p.textContent = p.textContent.replace('2025', new Date().getFullYear());
    }
});

console.log('Élégance Couture website loaded successfully! ✨');