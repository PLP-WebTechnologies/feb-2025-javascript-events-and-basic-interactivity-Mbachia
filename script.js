// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // ===== TAB FUNCTIONALITY =====
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // ===== COLOR BUTTONS HOVER EFFECT =====
    const colorButtons = document.querySelectorAll('.color-btn');
    
    colorButtons.forEach(button => {
        const originalText = button.textContent;
        const originalColor = button.style.backgroundColor;
        
        button.addEventListener('mouseover', () => {
            button.textContent = 'Wow!';
            // Darken the button color
            button.style.backgroundColor = adjustColor(originalColor, -30);
        });
        
        button.addEventListener('mouseout', () => {
            button.textContent = originalText;
            button.style.backgroundColor = originalColor;
        });
    });

    // Helper function to darken/lighten colors
    function adjustColor(color, amount) {
        // Convert hex to RGB
        let rgb = hexToRgb(color);
        if (!rgb) return color;
        
        // Adjust each component
        rgb.r = Math.max(0, Math.min(255, rgb.r + amount));
        rgb.g = Math.max(0, Math.min(255, rgb.g + amount));
        rgb.b = Math.max(0, Math.min(255, rgb.b + amount));
        
        // Convert back to hex
        return rgbToHex(rgb.r, rgb.g, rgb.b);
    }
    
    function hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    // ===== ACCORDION FUNCTIONALITY =====
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Toggle active class on header
            header.classList.toggle('active');
            
            // Toggle active class on content
            const content = header.nextElementSibling;
            content.classList.toggle('active');
        });
    });

    // ===== IMAGE GALLERY/SLIDESHOW =====
    const galleryImages = document.querySelectorAll('.gallery img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dots = document.querySelectorAll('.dot');
    let currentImageIndex = 0;
    
    // Function to show specific image
    function showImage(index) {
        // Remove active class from all images and dots
        galleryImages.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current image and dot
        galleryImages[index].classList.add('active');
        dots[index].classList.add('active');
        currentImageIndex = index;
    }
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
        let newIndex = currentImageIndex - 1;
        if (newIndex < 0) newIndex = galleryImages.length - 1;
        showImage(newIndex);
    });
    
    // Next button click
    nextBtn.addEventListener('click', () => {
        let newIndex = currentImageIndex + 1;
        if (newIndex >= galleryImages.length) newIndex = 0;
        showImage(newIndex);
    });
    
    // Dot click
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            showImage(index);
        });
    });
    
    // Double-click on image (bonus feature)
    galleryImages.forEach(img => {
        img.addEventListener('dblclick', () => {
            img.classList.add('zoom');
            setTimeout(() => {
                img.classList.remove('zoom');
            }, 500);
        });
    });

    // ===== FORM VALIDATION =====
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const messageInput = document.getElementById('message');
    const formStatus = document.getElementById('form-status');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    messageInput.addEventListener('input', validateMessage);
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isPasswordValid && isMessageValid) {
            // Form is valid, show success message
            formStatus.textContent = 'Form submitted successfully!';
            formStatus.className = 'success';
            contactForm.reset();
            
            // Reset strength bar
            strengthBar.style.width = '0';
            strengthBar.style.backgroundColor = '#ddd';
            strengthText.textContent = 'Password strength';
        } else {
            // Form is invalid, show error message
            formStatus.textContent = 'Please fix the errors in the form.';
            formStatus.className = 'error';
        }
    });
    
    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        const errorElement = nameInput.nextElementSibling;
        
        if (name === '') {
            showError(nameInput, errorElement, 'Name is required');
            return false;
        } else {
            clearError(nameInput, errorElement);
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const errorElement = emailInput.nextElementSibling;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            showError(emailInput, errorElement, 'Email is required');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, errorElement, 'Please enter a valid email address');
            return false;
        } else {
            clearError(emailInput, errorElement);
            return true;
        }
    }
    
    function validatePassword() {
        const password = passwordInput.value;
        const errorElement = passwordInput.nextElementSibling;
        
        if (password === '') {
            showError(passwordInput, errorElement, 'Password is required');
            strengthBar.style.width = '0';
            strengthBar.style.backgroundColor = '#ddd';
            strengthText.textContent = 'Password strength';
            return false;
        } else if (password.length < 8) {
            showError(passwordInput, errorElement, 'Password must be at least 8 characters');
            
            // Show weak strength
            strengthBar.style.width = '33%';
            strengthBar.style.backgroundColor = '#e74c3c';
            strengthText.textContent = 'Weak';
            return false;
        } else {
            clearError(passwordInput, errorElement);
            
            // Calculate password strength
            let strength = 0;
            if (password.length >= 8) strength += 1;
            if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
            if (password.match(/[0-9]/)) strength += 1;
            if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
            
            // Update strength bar
            if (strength <= 2) {
                strengthBar.style.width = '50%';
                strengthBar.style.backgroundColor = '#f39c12';
                strengthText.textContent = 'Medium';
            } else {
                strengthBar.style.width = '100%';
                strengthBar.style.backgroundColor = '#2ecc71';
                strengthText.textContent = 'Strong';
            }
            
            return true;
        }
    }
    
    function validateMessage() {
        const message = messageInput.value.trim();
        const errorElement = messageInput.nextElementSibling;
        
        if (message === '') {
            showError(messageInput, errorElement, 'Message is required');
            return false;
        } else if (message.length < 10) {
            showError(messageInput, errorElement, 'Message must be at least 10 characters');
            return false;
        } else {
            clearError(messageInput, errorElement);
            return true;
        }
    }
    
    // Helper functions for validation
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
    }
    
    function clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
    }

    // ===== KEYBOARD SHORTCUTS =====
    const modal = document.getElementById('keyboard-shortcuts');
    const closeBtn = document.querySelector('.close');
    const keypressDisplay = document.getElementById('keypress-display');
    
    // Show keyboard shortcuts modal
    document.addEventListener('keydown', function(e) {
        // Display the key pressed
        keypressDisplay.textContent = `Key pressed: ${e.key} (Code: ${e.keyCode})`;
        
        // Show keyboard shortcuts modal when Shift + ? is pressed
        if (e.shiftKey && e.key === '?') {
            modal.style.display = 'block';
        }
        
        // Navigation shortcuts
        if (e.key === '1') {
            tabButtons[0].click();
        } else if (e.key === '2') {
            tabButtons[1].click();
        } else if (e.key === '3') {
            tabButtons[2].click();
        }
        
        // Gallery navigation with arrow keys
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
        
        // Close modal with Escape key
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
    
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});