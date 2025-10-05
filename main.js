document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(item => {
            item.addEventListener('click', () => {
                const parent = item.parentElement;
                const wasOpen = parent.classList.contains('open');
                
                // Close all other open items
                document.querySelectorAll('.faq-item.open').forEach(openItem => {
                    if (openItem !== parent) {
                        openItem.classList.remove('open');
                    }
                });

                // Toggle the clicked item
                if (!wasOpen) {
                    parent.classList.add('open');
                } else {
                    parent.classList.remove('open');
                }
            });
        });
    }
});
