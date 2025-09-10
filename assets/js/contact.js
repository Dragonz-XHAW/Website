// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');

    // Real-time validation
    const inputs = ['contactName', 'contactPhone', 'contactEmail', 'contactMessage'];
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
        
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Simulate form submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            setTimeout(() => {
                // Show success message
                successMessage.style.display = 'block';
                contactForm.reset();
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth' });
            }, 2000);
        }
    });

    function validateField(field) {
        const fieldId = field.id;
        const value = field.value.trim();
        const errorElement = document.getElementById(fieldId.replace('contact', '').toLowerCase() + 'Error');
        let isValid = true;

        // Remove previous error state
        field.classList.remove('error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }

        switch (fieldId) {
            case 'contactName':
                if (value.length < 2) {
                    showError(field, errorElement, 'Name must be at least 2 characters long');
                    isValid = false;
                }
                break;
            
            case 'contactPhone':
                const phoneRegex = /^[0-9]{10}$/;
                if (!phoneRegex.test(value)) {
                    showError(field, errorElement, 'Phone number must be exactly 10 digits');
                    isValid = false;
                }
                break;
            
            case 'contactEmail':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showError(field, errorElement, 'Please enter a valid email address');
                    isValid = false;
                }
                break;
            
            case 'contactMessage':
                if (value.length < 10) {
                    showError(field, errorElement, 'Message must be at least 10 characters long');
                    isValid = false;
                }
                break;
        }

        return isValid;
    }

    function showError(field, errorElement, message) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function validateForm() {
        let isValid = true;
        const requiredFields = ['contactName', 'contactPhone', 'contactEmail', 'contactMessage'];
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }
});

// Smooth scrolling for anchor links
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
