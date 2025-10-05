// Main JavaScript file - Initializes the application

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
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
    initForms();
    
    // Auto-open contact modal after 5 seconds
    setTimeout(() => {
        createContactModal();
    }, 5000);
});

// Mobile Menu functionality
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
        card.addEventListener('click', () => createModal(programData[card.dataset.program], document.getElementById('modal-container'))); 
    });
}

// Blog Modals functionality
function initBlogModals() {
    document.querySelectorAll('.open-blog-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const blogId = btn.getAttribute('data-blog');
            createBlogModal(blogId);
        });
    });
}
