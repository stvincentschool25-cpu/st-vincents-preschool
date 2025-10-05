// Main JavaScript file - Initializes the application
const GOOGLE_SHEETS_API_URL = 'https://script.google.com/macros/s/AKfycbyXof_IuR9uCZBVmgjNTYYisbvEOu21BTEHAZIJfoKPm375joLtycdoDkoi_u41MLZo/exec';

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

// Blog Content
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
            
            <div class="bg-blue-50 p-6 crayon-border my-6">
                <p class="text-blue-800 font-semibold text-lg">"The architecture of the brain is built over time, and early experiences shape the foundation." - Center on the Developing Child, Harvard University</p>
            </div>
            
            <h4 class="text-2xl font-bold text-gray-800 mt-6 mb-4">The Role of Quality Early Education</h4>
            <p class="mb-4">High-quality preschool programs provide the stimulating environment necessary for optimal brain development. Studies have shown that children who attend quality preschool programs:</p>
            
            <ul class="list-disc pl-6 mb-4 space-y-2">
                <li>Develop stronger neural connections in language and cognitive areas</li>
                <li>Show better executive function skills (planning, focus, self-control)</li>
                <li>Have higher graduation rates and better lifelong outcomes</li>
            </ul>
            
            <div class="flex flex-col md:flex-row gap-6 my-8">
                <div class="md:w-1/2">
                    <img src="https://images.unsplash.com/photo-1541692641319-981cc79ee10a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Children engaged in learning activities" class="w-full h-48 object-cover crayon-border">
                </div>
                <div class="md:w-1/2">
                    <img src="https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Teacher guiding children" class="w-full h-48 object-cover crayon-border">
                </div>
            </div>
            
            <h4 class="text-2xl font-bold text-gray-800 mt-6 mb-4">References & Further Reading</h4>
            <ul class="text-sm space-y-1 mb-4">
                <li>Center on the Developing Child, Harvard University. (2016). From Best Practices to Breakthrough Impacts.</li>
                <li>National Scientific Council on the Developing Child. (2007). The Timing and Quality of Early Experiences Combine to Shape Brain Architecture.</li>
                <li>Yoshikawa, H., et al. (2013). Investing in Our Future: The Evidence Base on Preschool Education.</li>
            </ul>
            
            <p class="mt-6">By understanding the science behind early learning, we can better appreciate the vital role that quality preschool education plays in setting children up for lifelong success.</p>
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
            
            <div class="bg-green-50 p-6 crayon-border my-6">
                <p class="text-green-800 font-semibold text-lg">"The single best childhood predictor of adult adaptation is not school grades, but adequacy with which the child gets along with other children." - Willard Hartup, Child Development Researcher</p>
            </div>
            
            <h4 class="text-2xl font-bold text-gray-800 mt-6 mb-4">How We Foster Social Development</h4>
            <p class="mb-4">Our approach to social development includes:</p>
            
            <ol class="list-decimal pl-6 mb-4 space-y-2">
                <li><strong>Structured group activities:</strong> Collaborative projects that require teamwork</li>
                <li><strong>Role-playing scenarios:</strong> Practicing social situations in a safe environment</li>
                <li><strong>Teacher modeling:</strong> Demonstrating positive social interactions</li>
                <li><strong>Emotional literacy:</strong> Teaching children to identify and express emotions</li>
                <li><strong>Problem-solving guidance:</strong> Helping children navigate social challenges</li>
            </ol>
            
            <div class="flex flex-col md:flex-row gap-6 my-8">
                <div class="md:w-1/2">
                    <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Children playing together" class="w-full h-48 object-cover crayon-border">
                </div>
                <div class="md:w-1/2">
                    <img src="https://images.unsplash.com/photo-1541692641319-981cc79ee10a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Children engaged in group activity" class="w-full h-48 object-cover crayon-border">
                </div>
            </div>
            
            <h4 class="text-2xl font-bold text-gray-800 mt-6 mb-4">Long-Term Benefits</h4>
            <p class="mb-4">Research shows that strong social skills in early childhood predict:</p>
            
            <ul class="list-disc pl-6 mb-4 space-y-2">
                <li>Better academic performance in later school years</li>
                <li>Higher rates of college attendance and completion</li>
                <li>More stable employment in adulthood</li>
                <li>Better mental health outcomes</li>
                <li>Stronger, more satisfying relationships throughout life</li>
            </ul>
            
            <p class="mt-6">By prioritizing social development alongside academic readiness, we help children build the foundation for success in all areas of life.</p>
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
            
            <div class="bg-purple-50 p-6 crayon-border my-6">
                <p class="text-purple-800 font-semibold text-lg">"Children who experience a smooth transition to primary school are more likely to develop positive attitudes toward learning and achieve academic success." - Ramey & Ramey, Early Childhood Researchers</p>
            </div>
            
            <h4 class="text-2xl font-bold text-gray-800 mt-6 mb-4">Social-Emotional Preparation</h4>
            <p class="mb-4">Beyond academic skills, we focus on developing the social and emotional competencies needed for primary school:</p>
            
            <ol class="list-decimal pl-6 mb-4 space-y-2">
                <li><strong>Independence:</strong> Following routines, managing belongings, and self-care skills</li>
                <li><strong>Resilience:</strong> Coping with challenges and bouncing back from setbacks</li>
                <li><strong>Collaboration:</strong> Working effectively with peers and teachers</li>
                <li><strong>Self-advocacy:</strong> Expressing needs and asking for help appropriately</li>
            </ol>
            
            <div class="flex flex-col md:flex-row gap-6 my-8">
                <div class="md:w-1/2">
                    <img src="https://images.unsplash.com/photo-1519452575416-64e83f8b89cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Child engaged in learning activity" class="w-full h-48 object-cover crayon-border">
                </div>
                <div class="md:w-1/2">
                    <img src="https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Teacher working with small group" class="w-full h-48 object-cover crayon-border">
                </div>
            </div>
            
            <h4 class="text-2xl font-bold text-gray-800 mt-6 mb-4">Our Transition Program</h4>
            <p class="mb-4">We implement a comprehensive transition program that includes:</p>
            
            <ul class="list-disc pl-6 mb-4 space-y-2">
                <li>Gradual introduction to more structured learning environments</li>
                <li>Collaboration with local primary schools to align expectations</li>
                <li>Parent workshops on supporting the transition to primary school</li>
                <li>Portfolio development to showcase children's readiness</li>
                <li>Visits from primary school teachers and students when possible</li>
            </ul>
            
            <h4 class="text-2xl font-bold text-gray-800 mt-6 mb-4">Measurable Outcomes</h4>
            <p class="mb-4">Our graduates consistently demonstrate:</p>
            
            <ul class="list-disc pl-6 mb-4 space-y-2">
                <li>Strong foundational literacy and numeracy skills</li>
                <li>Positive attitudes toward learning and school</li>
                <li>Well-developed social skills and emotional regulation</li>
                <li>Confidence in navigating new environments and routines</li>
                <li>Smooth adjustment to the demands of primary school</li>
            </ul>
            
            <p class="mt-6">By focusing on holistic development and school readiness, we ensure that children leave St. Vincent's not just prepared for primary school, but excited about the learning journey ahead.</p>
        `
    }
};