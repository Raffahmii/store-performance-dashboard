// EmailJS Configuration
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Ganti dengan public key EmailJS kamu
})();

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const submitBtn = contactForm.querySelector('.submit-btn');
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
        contactForm.appendChild(successMessage);

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                project: document.getElementById('project').value
            };
            
            // Send email using EmailJS
            emailjs.send('service_p248k7u', 'template_x9gg2nk', formData)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Show success message
                    successMessage.classList.add('show');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.classList.remove('show');
                    }, 5000);
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('Sorry, there was an error sending your message. Please try again.');
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                });
        });
        
        // Add animation to form elements
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach((group, index) => {
            group.style.opacity = '0';
            group.style.transform = 'translateY(20px)';
            group.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                group.style.opacity = '1';
                group.style.transform = 'translateY(0)';
            }, index * 200 + 500);
        });
    }
});

// Sidebar Functions
function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 4px 12px rgba(15, 163, 163, 0.2)';
    } else {
        nav.style.boxShadow = '0 4px 12px rgba(15, 163, 163, 0.15)';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Hide sidebar on mobile after clicking
                if (window.innerWidth <= 800) {
                    hideSidebar();
                }
            }
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

const dataCardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, index * 150);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// KPI counter animation
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Format number with Indonesian Rupiah format
        if (element.textContent.startsWith('Rp')) {
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = 'Rp' + value.toLocaleString('id-ID');
        } else {
            // For decimal values
            if (end % 1 !== 0) {
                const value = (progress * (end - start) + start).toFixed(1);
                element.textContent = value;
            } else {
                // For integer values
                const value = Math.floor(progress * (end - start) + start);
                element.textContent = value.toLocaleString('id-ID');
            }
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// KPI observer
const kpiObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Animate KPI values
            const kpiValue = entry.target.querySelector('.kpi-value');
            if (kpiValue) {
                const targetValue = parseFloat(kpiValue.getAttribute('data-target'));
                animateValue(kpiValue, 0, targetValue, 2000);
            }
        }
    });
}, observerOptions);

// Observe feature items
document.querySelectorAll('.feature-item').forEach(item => {
    featureObserver.observe(item);
});

// Observe data cards with staggered animation
document.querySelectorAll('.data-card').forEach(card => {
    dataCardObserver.observe(card);
});

// Observe KPI cards
document.querySelectorAll('.kpi-card').forEach(card => {
    kpiObserver.observe(card);
});

// Add loading animation for dashboard image
document.addEventListener('DOMContentLoaded', function() {
    const dashboardImage = document.querySelector('.dashboard-image');
    if (dashboardImage) {
        dashboardImage.style.opacity = '0';
        dashboardImage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            dashboardImage.style.opacity = '1';
        }, 300);
    }
});

// Add hover effect for KPI cards
document.querySelectorAll('.kpi-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Profile image hover effects
document.addEventListener('DOMContentLoaded', function() {
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});

// Form input animations
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Add scroll to top functionality
const scrollToTop = document.createElement('button');
scrollToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollToTop.className = 'scroll-to-top';
scrollToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 4px 15px rgba(15, 163, 163, 0.3);
    transition: all 0.3s ease;
    z-index: 1000;
`;

scrollToTop.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px)';
    this.style.boxShadow = '0 6px 20px rgba(15, 163, 163, 0.4)';
});

scrollToTop.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 4px 15px rgba(15, 163, 163, 0.3)';
});

scrollToTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.body.appendChild(scrollToTop);

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        scrollToTop.style.display = 'flex';
    } else {
        scrollToTop.style.display = 'none';
    }
});

// Add CSS for scroll to top button
const scrollToTopStyle = document.createElement('style');
scrollToTopStyle.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #0FA3A3, #0D8C8C);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 15px rgba(15, 163, 163, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .scroll-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(15, 163, 163, 0.4);
    }
`;
document.head.appendChild(scrollToTopStyle);

// Initialize all animations when page loads
window.addEventListener('load', function() {
    // Trigger initial animations for elements in viewport
    setTimeout(() => {
        document.querySelectorAll('.feature-item, .data-card, .kpi-card').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                el.classList.add('animated');
                
                // Animate KPI values if visible
                if (el.classList.contains('kpi-card')) {
                    const kpiValue = el.querySelector('.kpi-value');
                    if (kpiValue) {
                        const targetValue = parseFloat(kpiValue.getAttribute('data-target'));
                        animateValue(kpiValue, 0, targetValue, 2000);
                    }
                }
            }
        });
    }, 1000);
});