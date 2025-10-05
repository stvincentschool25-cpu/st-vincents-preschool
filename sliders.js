document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('testimonial-slider');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (slider && nextBtn && prevBtn) {
        const testimonials = [
            { name: "Shravani K.", text: "The best preschool in our area. The teachers are very caring and the curriculum is excellent. My son enjoys going to school every day." },
            { name: "Praveen G.", text: "A perfect school for early learning. They have a good play area and the management is very responsive. Highly recommend it." },
            { name: "Divya S.", text: "Amazing school. The staff is professional and the environment is very clean and hygienic which was very important for me." }
        ];

        let currentIndex = 0;

        function renderTestimonials() {
            slider.innerHTML = testimonials.map(t => 
                `<div class="testimonial-slide p-4 flex-shrink-0">
                    <div class="bg-yellow-100 p-8 rounded-xl crayon-border text-center">
                        <p class="font-body text-gray-600 text-lg italic">"${t.text}"</p>
                        <p class="font-bold text-gray-800 mt-4 text-2xl">- ${t.name}</p>
                    </div>
                </div>`
            ).join('');
        }

        function updateSlider() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateSlider();
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            updateSlider();
        }

        nextBtn.addEventListener('click', showNext);
        prevBtn.addEventListener('click', showPrev);

        setInterval(showNext, 5000);
        renderTestimonials();
    }
});
