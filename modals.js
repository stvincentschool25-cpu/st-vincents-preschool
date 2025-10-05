// In the createModal function, replace the form submission section:
if (contactForm) {
    const successMessage = container.querySelector('#contact-form-success-message');
    const errorMessage = container.querySelector('#contact-form-error-message');
    const submitText = container.querySelector('#submit-text');
    const submitSpinner = container.querySelector('#submit-spinner');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('border-red-500');
            } else {
                field.classList.remove('border-red-500');
            }
        });
        
        if (!isValid) {
            errorMessage.textContent = 'Please fill all required fields.';
            errorMessage.classList.remove('hidden');
            return;
        }
        
        // Show loading state
        submitText.classList.add('hidden');
        submitSpinner.classList.remove('hidden');
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');
        
        try {
            // Use Formspree for form submission
            const formData = new FormData();
            formData.append('parentName', document.getElementById('parentName').value);
            formData.append('phone', document.getElementById('phone').value);
            formData.append('childAge', document.getElementById('childAge').value);
            formData.append('program', document.getElementById('program').value);
            formData.append('message', document.getElementById('message').value);
            
            const response = await fetch('https://formspree.io/f/xqkrgvwe', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // On success
                successMessage.classList.remove('hidden');
                contactForm.reset();
                
                // Reset button state
                submitText.classList.remove('hidden');
                submitSpinner.classList.add('hidden');
                
                setTimeout(() => { 
                    successMessage.classList.add('hidden'); 
                    closeModal(overlay);
                    // Show review modal after successful form submission
                    if (typeof createReviewModal === 'function') {
                        createReviewModal();
                    }
                }, 2000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // On error
            console.error('Error:', error);
            errorMessage.textContent = 'There was an error submitting your form. Please try again or call us directly.';
            errorMessage.classList.remove('hidden');
            
            // Reset button state
            submitText.classList.remove('hidden');
            submitSpinner.classList.add('hidden');
        }
    });
}
