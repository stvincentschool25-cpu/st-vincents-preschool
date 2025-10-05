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
            item.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default anchor behavior
                const parent = item.parentElement;
                const wasOpen = parent.classList.contains('open');
                
                // Close all other open items before opening the new one
                document.querySelectorAll('.faq-item.open').forEach(openItem => {
                    openItem.classList.remove('open');
                });

                // If it wasn't open, open it.
                if (!wasOpen) {
                    parent.classList.add('open');
                }
            });
        });
    }
});

