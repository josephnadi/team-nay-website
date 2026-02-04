// Contact Form Validation Script
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Email validation regex
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation functions
const validators = {
    name: (value) => {
        const trimmed = value.trim();
        if (trimmed === '') return false;
        if (trimmed.length < 2) return false;
        return true;
    },
    email: (value) => emailPattern.test(value),
    message: (value) => value.trim().length >= 10
};

// Validate individual field
function validateField(field, value) {
    const fieldName = field.id;
    let isValid = false;

    if (validators[fieldName]) {
        isValid = validators[fieldName](value);
    }

    if (isValid) {
        field.classList.remove('invalid');
    } else {
        field.classList.add('invalid');
    }

    return isValid;
}

// Validate entire form
function validateForm() {
    const nameValid = validateField(nameInput, nameInput.value);
    const emailValid = validateField(emailInput, emailInput.value);
    const messageValid = validateField(messageInput, messageInput.value);

    return nameValid && emailValid && messageValid;
}

// Real-time validation on blur
nameInput.addEventListener('blur', function() {
    validateField(this, this.value);
});

nameInput.addEventListener('input', function() {
    if (this.classList.contains('invalid')) {
        validateField(this, this.value);
    }
});

emailInput.addEventListener('blur', function() {
    validateField(this, this.value);
});

emailInput.addEventListener('input', function() {
    if (this.classList.contains('invalid')) {
        validateField(this, this.value);
    }
});

messageInput.addEventListener('blur', function() {
    validateField(this, this.value);
});

messageInput.addEventListener('input', function() {
    if (this.classList.contains('invalid')) {
        validateField(this, this.value);
    }
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (validateForm()) {
        // Show success message
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Simulate form submission (replace with actual backend call if needed)
        console.log('Form Data:', {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        });

        // Reset form
        form.reset();

        // Remove invalid classes
        document.querySelectorAll('.invalid').forEach(el => {
            el.classList.remove('invalid');
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    } else {
        // Focus on first invalid field
        if (!nameInput.classList.contains('invalid') && !emailInput.classList.contains('invalid')) {
            messageInput.focus();
        } else if (!nameInput.classList.contains('invalid')) {
            emailInput.focus();
        } else {
            nameInput.focus();
        }
    }
});

// Prevent form submission with Enter key on individual fields
[nameInput, emailInput, messageInput].forEach(field => {
    field.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this !== messageInput) {
            e.preventDefault();
        }
    });
});
