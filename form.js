// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    initForms();
});

function initForms() {
    const forms = document.querySelectorAll('form[data-form-type="contact"]');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            const formData = new FormData(form);
            
            // Validate form
            if (!validateForm(form)) {
                showFormMessage(form, 'Please fill all required fields correctly.', 'error');
                return;
            }
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Send to Formspree (FREE service)
                const response = await fetch('https://formspree.io/f/mqayldea', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success
                    form.reset();
                    showFormMessage(form, 'Thank you! Your message has been sent successfully.', 'success');
                    
                    // Show review modal after successful submission
                    setTimeout(() => {
                        if (typeof createReviewModal === 'function') {
                            createReviewModal();
                        }
                    }, 2000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showFormMessage(form, 'There was an error submitting your form. Please try again or call us directly.', 'error');
            } finally {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    });
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error-border');
        } else {
            field.classList.remove('error-border');
        }
        
        // Special validation for phone
        if (field.type === 'tel' && field.value.trim()) {
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(field.value.trim())) {
                isValid = false;
                field.classList.add('error-border');
            }
        }
    });
    
    return isValid;
}

function showFormMessage(form, message, type) {
    // Remove any existing messages
    const existingMessages = form.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}-message mt-4 p-4 rounded-lg text-lg font-semibold text-center`;
    messageDiv.textContent = message;
    
    if (type === 'success') {
        messageDiv.classList.add('bg-green-100', 'text-green-800', 'border', 'border-green-300');
    } else {
        messageDiv.classList.add('bg-red-100', 'text-red-800', 'border', 'border-red-300');
    }
    
    // Insert after the form or before submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        form.insertBefore(messageDiv, submitBtn);
    } else {
        form.appendChild(messageDiv);
    }
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}
