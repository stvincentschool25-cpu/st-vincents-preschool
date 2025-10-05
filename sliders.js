// Slider Functionality
function initTestimonials() {
    const testimonials = [
        { 
            name: "Shravani K.", 
            text: "The best preschool in our area. The teachers are very caring and the curriculum is excellent. My son enjoys going to school every day and has developed so much confidence since joining." 
        }, 
        { 
            name: "Praveen G.", 
            text: "A perfect school for early learning. They have a good play area and the management is very responsive. My daughter's language skills have improved dramatically in just a few months." 
        }, 
        { 
            name: "Divya S.", 
            text: "Amazing school. The staff is professional and the environment is very clean and hygienic which was very important for me. The communication with parents is excellent." 
        },
        { 
            name: "Rajesh M.", 
            text: "My daughter has been attending St. Vincent's for the past year and we've seen remarkable improvement in her social skills and confidence. The teachers are wonderful!" 
        },
        { 
            name: "Priya N.", 
            text: "The facilities are excellent and the staff is very caring. My son looks forward to going to school every day. Highly recommended!" 
        }
    ];
    
    const slider = document.getElementById('testimonial-slider');
    if (!slider) return;
    
    let currentIndex = 0;
    
    function renderTestimonials() {
        slider.innerHTML = testimonials.map(t => `
            <div class="testimonial-slide p-4 flex-shrink-0">
                <div class="bg-yellow-100 p-8 rounded-xl crayon-border">
                    <p class="font-body text-gray-600 testimonial-text">"${t.text}"</p>
                    <p class="font-bold text-gray-800 mt-6 text-2xl text-right">- ${t.name}</p>
                </div>
            </div>
        `).join('');
    }
    
    function updateSlider() { 
        slider.style.transform = translateX(-${currentIndex * 100}%); 
    }
    
    function showNext() { 
        currentIndex = (currentIndex + 1) % testimonials.length; 
        updateSlider(); 
    }
    
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', showNext);
        prevBtn.addEventListener('click', () => { 
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length; 
            updateSlider(); 
        });
        
        setInterval(showNext, 5000);
        renderTestimonials();
    }
}

function initImageSlider() {
    const imageSlider = document.getElementById('image-slider');
    if (!imageSlider) return;
    
    const sliderDots = document.querySelectorAll('.slider-dot');
    let slideIndex = 0;
    
    function updateImageSlider() {
        imageSlider.style.transform = translateX(-${slideIndex * 100}%);
        
        // Update active dot
        sliderDots.forEach((dot, index) => {
            if (index === slideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    function nextSlide() {
        slideIndex = (slideIndex + 1) % sliderDots.length;
        updateImageSlider();
    }
    
    function prevSlide() {
        slideIndex = (slideIndex - 1 + sliderDots.length) % sliderDots.length;
        updateImageSlider();
    }
    
    // Initialize image slider
    const nextArrow = document.getElementById('slider-next');
    const prevArrow = document.getElementById('slider-prev');
    
    if (nextArrow && prevArrow) {
        nextArrow.addEventListener('click', nextSlide);
        prevArrow.addEventListener('click', prevSlide);
        
        // Add click events to dots
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                slideIndex = index;
                updateImageSlider();
            });
        });
        
        // Auto-advance slides
        setInterval(nextSlide, 4000);
    }
}

// Initialize sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTestimonials();
    initImageSlider();
});