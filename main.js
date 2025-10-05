// Main JavaScript file - Initializes the application

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize all components
    initFAQ();
    initTestimonials();
    initImageSlider();
    initModals();
    initProgramCards();
    initBlogModals();
    initCanvas();
    initForms(); // ADD THIS LINE
    
    // Auto-open contact modal after 5 seconds
    setTimeout(() => {
        if (typeof createContactModal === 'function') {
            createContactModal();
        }
    }, 5000);
});

// Add this new function
function initForms() {
    // This will be handled by form.js
    console.log('Forms initialized');
}

// Rest of your existing main.js code remains the same...
function initMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// FAQ Accordion functionality
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.parentElement;
            const wasOpen = parent.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach(openItem => openItem.classList.remove('open'));
            if (!wasOpen) {
                parent.classList.add('open');
            }
        });
    });
}

// Program Cards functionality
function initProgramCards() {
    document.querySelectorAll('.program-card').forEach(card => { 
        card.addEventListener('click', () => {
            if (typeof createModal === 'function' && typeof programData !== 'undefined') {
                createModal(programData[card.dataset.program], document.getElementById('modal-container'));
            }
        }); 
    });
}

// Blog Modals functionality
function initBlogModals() {
    document.querySelectorAll('.open-blog-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const blogId = btn.getAttribute('data-blog');
            if (typeof createBlogModal === 'function') {
                createBlogModal(blogId);
            }
        });
    });
}
