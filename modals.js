// Modal Functionality
const programData = {
    playgroup: { 
        title: "Playgroup", 
        hook: "Where Curiosity Takes Flight!", 
        value: "Our Playgroup is a wonderland of sensory experiences designed to nurture your toddler's budding curiosity.", 
        curriculum: ["Sensory Play", "Gross Motor Skills", "Fine Motor Development", "Music & Movement", "Early Language", "Group Play"], 
        color: "red" 
    },
    nursery: { 
        title: "Nursery", 
        hook: "Building Blocks for a Bright Future!", 
        value: "In Nursery, we build upon natural curiosity by introducing foundational concepts in literacy and numeracy.", 
        curriculum: ["Phonics", "Pre-writing Skills", "Number Recognition", "Physical Development Activities", "Colors & Shapes", "Storytelling"], 
        color: "blue" 
    },
    lkg: { 
        title: "LKG", 
        hook: "Getting Ready for Big School!", 
        value: "Our LKG program focuses on developing foundational academic skills and preparing children for formal schooling.", 
        curriculum: ["Reading & Writing", "Basic Numeracy", "Physical Coordination", "EVS Concepts", "Logical Reasoning", "Creative Expression"], 
        color: "yellow" 
    },
    ukg: { 
        title: "UKG", 
        hook: "Advanced Preparation for Primary School!", 
        value: "Our UKG program ensures children are fully prepared for primary school with comprehensive skill development.", 
        curriculum: ["Advanced Reading & Writing", "Mathematical Concepts", "Physical Development", "Science Exploration", "Problem Solving", "Public Speaking"], 
        color: "green" 
    },
    daycare: { 
        title: "Day Care", 
        hook: "Your Child's Safe Second Home!", 
        value: "We provide a secure, nurturing, and structured environment for children of working parents.", 
        curriculum: ["Homework Assistance", "Hobby Classes", "Structured Play", "Nap Time", "Indoor Activities"], 
        color: "purple" 
    }
};

function createModal(data, container) {
    let modalHTML = '';
    if (container === document.getElementById('modal-container')) {
         modalHTML = `
         <div class="modal-overlay fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 opacity-0" style="display: none;">
            <div class="modal-content bg-paper crayon-border w-full max-w-2xl max-h-[90vh] overflow-y-auto transform scale-95">
                <div class="p-8">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h2 class="text-5xl font-bold text-gray-800">${data.title}</h2>
                            <p class="text-2xl text-${data.color}-600 font-semibold mt-1">${data.hook}</p>
                        </div>
                        <button class="close-modal-btn p-1">
                            <i data-lucide="x" class="w-8 h-8 text-gray-500"></i>
                        </button>
                    </div>
                    <p class="font-body text-gray-600 mb-6 text-lg">${data.value}</p>
                    <h3 class="font-bold text-3xl mb-3 text-gray-700">Curriculum Highlights</h3>
                    <ul class="space-y-2 mb-8">
                        ${data.curriculum.map(item => `
                            <li class="flex items-center text-xl">
                                <i data-lucide="check-circle-2" class="w-6 h-6 text-green-500 mr-2"></i>${item}
                            </li>
                        `).join('')}
                    </ul>
                    <div class="bg-${data.color}-100 crayon-border p-6 flex justify-between items-center">
                        <div>
                            <p class="text-gray-600 font-medium text-xl">To know more</p>
                            <p class="text-4xl font-bold text-gray-800">Contact Us</p>
                        </div>
                        <button class="open-contact-modal-from-program crayon-button bg-${data.color}-500 text-white font-bold px-6 py-3 text-xl">Book a Tour</button>
                    </div>
                </div>
            </div>
         </div>`;
    } else if (container === document.getElementById('contact-modal-container')) {
         modalHTML = `
         <div class="modal-overlay fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 opacity-0" style="display: none;">
            <div class="modal-content bg-paper crayon-border w-full max-w-2xl max-h-[90vh] overflow-y-auto transform scale-95">
                <div class="p-8">
                    <div class="flex justify-between items-start mb-6">
                        <div>
                            <h2 class="text-5xl font-bold text-gray-800">Schedule a Visit</h2>
                            <p class="text-xl text-gray-600 mt-2">We'd love to show you around our campus!</p>
                        </div>
                        <button class="close-modal-btn p-1">
                            <i data-lucide="x" class="w-8 h-8 text-gray-500"></i>
                        </button>
                    </div>
                    <form id="contact-form" class="space-y-4">
                        <div class="text-2xl">
                            <label for="parentName" class="font-medium text-gray-700">Parent's Name</label>
                            <input type="text" id="parentName" name="parentName" class="w-full mt-1 p-3 crayon-border text-xl" required>
                        </div>
                        <div class="text-2xl">
                            <label for="phone" class="font-medium text-gray-700">Phone Number</label>
                            <input type="tel" id="phone" name="phone" class="w-full mt-1 p-3 crayon-border text-xl" required>
                        </div>
                        <div class="text-2xl">
                            <label for="childAge" class="font-medium text-gray-700">Child's Age</label>
                            <input type="number" id="childAge" name="childAge" min="1" max="8" class="w-full mt-1 p-3 crayon-border text-xl" required>
                        </div>
                        <div class="text-2xl">
                            <label for="program" class="font-medium text-gray-700">Program Interested In</label>
                            <select id="program" name="program" class="w-full mt-1 p-3 crayon-border text-xl" required>
                                <option value="">Select a program</option>
                                <option value="playgroup">Playgroup</option>
                                <option value="nursery">Nursery</option>
                                <option value="lkg">LKG</option>
                                <option value="ukg">UKG</option>
                                <option value="daycare">Day Care</option>
                            </select>
                        </div>
                        <div class="text-2xl">
                            <label for="message" class="font-medium text-gray-700">Additional Message (Optional)</label>
                            <textarea id="message" name="message" class="w-full mt-1 p-3 crayon-border text-xl" rows="3"></textarea>
                        </div>
                        <button type="submit" class="w-full crayon-button bg-red-400 text-white font-bold text-2xl p-4 flex items-center justify-center gap-2">
                            <span id="submit-text">Submit Inquiry</span>
                            <div id="submit-spinner" class="spinner hidden" style="width: 20px; height: 20px;"></div>
                        </button>
                        <p id="contact-form-success-message" class="text-green-600 text-center font-semibold hidden text-xl">Thank you! We'll call you soon!</p>
                        <p id="contact-form-error-message" class="text-red-600 text-center font-semibold hidden text-xl">There was an error submitting your form. Please try again or call us directly.</p>
                    </form>
                </div>
            </div>
         </div>`;
    } else if (container === document.getElementById('review-modal-container')) {
         modalHTML = `
         <div class="modal-overlay fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 opacity-0" style="display: none;">
            <div class="modal-content bg-paper crayon-border w-full max-w-2xl max-h-[90vh] overflow-y-auto transform scale-95">
                <div class="p-8 text-center">
                    <div class="flex justify-between items-start mb-6">
                        <div class="w-full">
                            <h2 class="text-5xl font-bold text-gray-800">Thank You!</h2>
                            <p class="text-xl text-gray-600 mt-2">We appreciate your interest in St. Vincent's Preschool.</p>
                        </div>
                        <button class="close-modal-btn p-1">
                            <i data-lucide="x" class="w-8 h-8 text-gray-500"></i>
                        </button>
                    </div>
                    <div class="bg-yellow-100 p-6 crayon-border mb-6">
                        <i data-lucide="star" class="w-16 h-16 text-yellow-500 mx-auto mb-4"></i>
                        <h3 class="text-3xl font-bold text-gray-800 mb-4">Help Other Parents Discover Us</h3>
                        <p class="font-body text-gray-600 mb-6">Would you like to share your experience with other parents by leaving a Google review?</p>
                        <a href="https://g.page/r/CbNp6tq5qJ7-EB0/review" target="_blank" class="crayon-button bg-green-500 text-white font-bold px-8 py-4 text-xl inline-flex items-center gap-2">
                            <i data-lucide="star" class="w-6 h-6"></i> Leave a Google Review
                        </a>
                    </div>
                    <button class="close-review-modal crayon-button bg-gray-400 text-white font-bold px-8 py-4 text-xl">Maybe Later</button>
                </div>
            </div>
         </div>`;
    } else if (container === document.getElementById('blog-modal-container')) {
         modalHTML = `
         <div class="modal-overlay fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 opacity-0" style="display: none;">
            <div class="modal-content bg-paper crayon-border w-full max-w-4xl max-h-[90vh] overflow-y-auto transform scale-95 blog-modal-content">
                <div class="p-8">
                    <div class="flex justify-between items-start mb-6">
                        <div>
                            <h2 class="text-5xl font-bold text-gray-800">${data.title}</h2>
                            <p class="text-xl text-${data.color}-600 font-semibold mt-1">${data.subtitle}</p>
                        </div>
                        <button class="close-modal-btn p-1">
                            <i data-lucide="x" class="w-8 h-8 text-gray-500"></i>
                        </button>
                    </div>
                    <div class="flex flex-col md:flex-row gap-8 mb-8">
                        <div class="md:w-2/5">
                            <img src="${data.image}" alt="${data.title}" class="w-full h-64 object-cover crayon-border">
                        </div>
                        <div class="md:w-3/5">
                            <div class="prose max-w-none font-body text-gray-700">
                                ${data.content}
                            </div>
                        </div>
                    </div>
                    <div class="text-center mt-8">
                        <button class="close-blog-modal crayon-button bg-red-400 text-white font-bold px-8 py-4 text-xl">Close</button>
                    </div>
                </div>
            </div>
         </div>`;
    }

    container.innerHTML = modalHTML;
    const overlay = container.querySelector('.modal-overlay');
    overlay.style.display = 'flex';
    setTimeout(() => { 
        overlay.classList.remove('opacity-0'); 
        overlay.querySelector('.modal-content').classList.remove('scale-95'); 
    }, 10);
    
    lucide.createIcons();
    
    // Handle form submission for contact modal
    const contactForm = container.querySelector('#contact-form');
    if (contactForm) {
        const successMessage = container.querySelector('#contact-form-success-message');
        const errorMessage = container.querySelector('#contact-form-error-message');
        const submitText = container.querySelector('#submit-text');
        const submitSpinner = container.querySelector('#submit-spinner');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            submitText.classList.add('hidden');
            submitSpinner.classList.remove('hidden');
            successMessage.classList.add('hidden');
            errorMessage.classList.add('hidden');
            
            // Collect form data
            const formData = {
                parentName: document.getElementById('parentName').value,
                phone: document.getElementById('phone').value,
                childAge: document.getElementById('childAge').value,
                program: document.getElementById('program').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString(),
                source: 'Website Form'
            };
            
            // Send data to Google Sheets
            fetch(GOOGLE_SHEETS_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
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
                    createReviewModal();
                }, 2000);
            })
            .catch(error => {
                // On error
                console.error('Error:', error);
                errorMessage.classList.remove('hidden');
                
                // Reset button state
                submitText.classList.remove('hidden');
                submitSpinner.classList.add('hidden');
            });
        });
    }
    
    // Close modal when clicking overlay or close button
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.closest('.close-modal-btn') || e.target.closest('.close-review-modal') || e.target.closest('.close-blog-modal')) {
            closeModal(overlay);
        }
    });
    
    // Open contact modal from program modal
    const openContactModalBtns = container.querySelectorAll('.open-contact-modal-from-program');
    openContactModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(overlay);
            setTimeout(() => {
                createContactModal();
            }, 300);
        });
    });
}

function closeModal(overlay) {
    overlay.classList.add('opacity-0');
    overlay.querySelector('.modal-content').classList.add('scale-95');
    setTimeout(() => { 
        overlay.remove(); 
    }, 300);
}

function createContactModal() {
    createModal({}, document.getElementById('contact-modal-container'));
}

function createReviewModal() {
    createModal({}, document.getElementById('review-modal-container'));
}

function createBlogModal(blogId) {
    const blogDataWithColor = {
        ...blogData[blogId],
        color: blogId === 'science' ? 'blue' : blogId === 'social' ? 'green' : 'purple'
    };
    createModal(blogDataWithColor, document.getElementById('blog-modal-container'));
}

// Initialize modals
function initModals() {
    // Contact modal triggers
    const contactModalTriggers = [
        'open-contact-modal',
        'open-contact-modal-mobile',
        'open-contact-modal-hero',
        'open-contact-modal-bottom'
    ];
    
    contactModalTriggers.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', createContactModal);
        }
    });
    
    const premiumContactBtn = document.querySelector('.open-contact-modal-premium');
    if (premiumContactBtn) {
        premiumContactBtn.addEventListener('click', createContactModal);
    }
}