// KNOWN Corp Website JavaScript

// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
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
                
                // Close mobile menu if open
                if (mainMenu && mainMenu.classList.contains('active')) {
                    mainMenu.classList.remove('active');
                    if (menuToggle) menuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Sticky Header
    const header = document.querySelector('header');
    const scrollThreshold = 100;
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }
    
    // Project Filtering (for Projects page)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide projects based on filter
                projectItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else {
                        if (item.classList.contains(filterValue)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Contact Form Validation
    const contactForm = document.querySelector('#contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.querySelector('#name');
            const emailInput = document.querySelector('#email');
            const messageInput = document.querySelector('#message');
            
            // Simple validation
            if (nameInput && nameInput.value.trim() === '') {
                isValid = false;
                showError(nameInput, 'Please enter your name');
            } else if (nameInput) {
                removeError(nameInput);
            }
            
            if (emailInput) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailInput.value.trim() === '') {
                    isValid = false;
                    showError(emailInput, 'Please enter your email');
                } else if (!emailRegex.test(emailInput.value.trim())) {
                    isValid = false;
                    showError(emailInput, 'Please enter a valid email');
                } else {
                    removeError(emailInput);
                }
            }
            
            if (messageInput && messageInput.value.trim() === '') {
                isValid = false;
                showError(messageInput, 'Please enter your message');
            } else if (messageInput) {
                removeError(messageInput);
            }
            
            if (isValid) {
                // Here you would typically send the form data to a server
                // For now, we'll just show a success message
                const formElements = contactForm.elements;
                for (let i = 0; i < formElements.length; i++) {
                    if (formElements[i].type !== 'submit') {
                        formElements[i].value = '';
                    }
                }
                
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success';
                successMessage.textContent = 'Your message has been sent successfully!';
                
                contactForm.prepend(successMessage);
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
        
        function showError(input, message) {
            const formGroup = input.closest('.form-group');
            const errorElement = formGroup.querySelector('.error-message');
            
            if (errorElement) {
                errorElement.textContent = message;
            } else {
                const newErrorElement = document.createElement('div');
                newErrorElement.className = 'error-message text-danger';
                newErrorElement.textContent = message;
                formGroup.appendChild(newErrorElement);
            }
            
            input.classList.add('is-invalid');
        }
        
        function removeError(input) {
            const formGroup = input.closest('.form-group');
            const errorElement = formGroup.querySelector('.error-message');
            
            if (errorElement) {
                errorElement.remove();
            }
            
            input.classList.remove('is-invalid');
        }
    }
    
    // Testimonial Slider (if implemented)
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        // Initialize a slider library here if needed
        // For example, using a simple manual implementation:
        const slides = testimonialSlider.querySelectorAll('.testimonial-item');
        const nextBtn = testimonialSlider.querySelector('.next-btn');
        const prevBtn = testimonialSlider.querySelector('.prev-btn');
        let currentSlide = 0;
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.style.display = 'block';
                } else {
                    slide.style.display = 'none';
                }
            });
        }
        
        if (slides.length > 0) {
            showSlide(currentSlide);
            
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    currentSlide = (currentSlide + 1) % slides.length;
                    showSlide(currentSlide);
                });
            }
            
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                    showSlide(currentSlide);
                });
            }
        }
    }
    
    // Counter Animation (for statistics)
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const step = Math.ceil(target / (duration / 16)); // 60fps
                    
                    let current = 0;
                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = current;
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});