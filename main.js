// Main JavaScript file - Initializes the application

// Initialize the application
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

// Blog Content (This is used by modals.js, but keeping it here is fine as long as main.js is loaded after modals.js)
const blogData = {
    science: {
        title: "The Science of Early Learning",
        subtitle: "How Preschool Shapes Brain Development",
        image: "https://images.unsplash.com/photo-1519452575416-64e83f8b89cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        content: `
            <p class="mb-4">The early years of a child's life are a period of rapid brain development. During this time, the brain forms neural connections at an astonishing rate - up to one million new connections per second. These connections build the foundation for all future learning, behavior, and health.</p>
            <h4 class="text-2xl font-bold text-gray-800 mt-6 mb-4">Critical Periods of Development</h4>
            <p class="mb-4">Research shows that certain abilities are best developed during specific "sensitive periods" in early childhood. For example:</p>
            <ul class="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Language development:</strong> The prime period for language acquisition is between birth and age 5</li>
                <li><strong>Social-emotional skills:</strong> Foundation for relationships forms in the first 3 years</li>
                <li><strong>Cognitive development:</strong> Critical thinking skills develop rapidly between ages 3-5</li>
            </ul>
        `
    },
    social: {
        title: "Social Skills Development",
        subtitle: "Building Foundations for Healthy Relationships",
        image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        content: `
            <p class="mb-4">The preschool years are a critical period for social development. During this time, children learn fundamental skills that will influence their relationships throughout life. At St. Vincent's, we create environments where children naturally develop these essential social competencies.</p>
            <h4 class="text-2xl font-bold text-gray-800 mt-6 mb-4">Key Social Skills Developed in Preschool</h4>
            <p class="mb-4">Through carefully designed activities and guided interactions, children develop:</p>
            <ul class="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Cooperation:</strong> Learning to work together toward common goals</li>
                <li><strong>Empathy:</strong> Understanding and responding to others' feelings</li>
                <li><strong>Communication:</strong> Expressing needs and listening to others</li>
                <li><strong>Conflict resolution:</strong> Solving disagreements peacefully</li>
                <li><strong>Sharing and turn-taking:</strong> Fundamental skills for social interaction</li>
            </ul>
        `
    },
    primary: {
        title: "Preparing for Primary School",
        subtitle: "Ensuring a Smooth Transition to Formal Education",
        image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        content: `
            <p class="mb-4">The transition from preschool to primary school is a significant milestone in a child's educational journey. At St. Vincent's, we carefully prepare children for this important step, ensuring they enter formal schooling with confidence, curiosity, and the foundational skills needed for success.</p>
            <h4 class="text-2xl font-bold text-gray-800 mt-6 mb-4">Academic Readiness</h4>
            <p class="mb-4">Our curriculum builds essential academic foundations through developmentally appropriate activities:</p>
            <ul class="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Literacy skills:</strong> Phonemic awareness, letter recognition, and early reading readiness</li>
                <li><strong>Numeracy development:</strong> Number sense, basic operations, and mathematical thinking</li>
                <li><strong>Fine motor skills:</strong> Pencil grip, cutting, and writing preparation</li>
                <li><strong>Executive function:</strong> Attention, memory, and self-regulation abilities</li>
            </ul>
        `
    }
};
