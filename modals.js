document.addEventListener('DOMContentLoaded', () => {
    // Check if modal-related elements exist on the page
    const programCards = document.querySelectorAll('.program-card');
    const startTourBtn = document.getElementById('start-tour-btn');
    const modalContainer = document.getElementById('modal-container');
    const tourModalContainer = document.getElementById('tour-modal-container');

    // Only proceed if the main containers are on the page
    if (!modalContainer || !tourModalContainer) return;

    const programData = {
        playgroup: { title: "Playgroup", hook: "Where Curiosity Takes Flight!", value: "Our Playgroup is a wonderland of sensory experiences designed to nurture your toddler's budding curiosity.", curriculum: ["Sensory Play", "Gross Motor Skills", "Music & Movement", "Early Language", "Group Play"], color: "red" },
        nursery: { title: "Nursery", hook: "Building Blocks for a Bright Future!", value: "In Nursery, we build upon natural curiosity by introducing foundational concepts in literacy and numeracy.", curriculum: ["Phonological Awareness", "Pre-writing Skills", "Number Recognition", "Colors & Shapes", "Storytelling"], color: "blue" },
        lkg_ukg: { title: "LKG & UKG", hook: "Getting Ready for Big School!", value: "Our Kindergarten program is structured to ensure a smooth transition to formal schooling.", curriculum: ["Reading & Writing", "Advanced Numeracy", "EVS Concepts", "Logical Reasoning", "Public Speaking"], color: "yellow" },
        daycare: { title: "Full Day Care", hook: "Your Child's Safe Second Home!", value: "We provide a secure, nurturing, and structured environment for children of working parents.", curriculum: ["Homework Assistance", "Hobby Classes", "Structured Play", "Nutritious Meals", "Nap Time"], color: "green" }
    };

    function createModal(data, container) {
        let modalHTML = '';
        if (container === modalContainer) {
            // The link inside the modal now correctly navigates without extra classes
            modalHTML = `<div class="modal-overlay fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 opacity-0" style="display: none;"><div class="modal-content bg-paper crayon-border w-full max-w-2xl max-h-[90vh] overflow-y-auto transform scale-95"><div class="p-8"><div class="flex justify-between items-start mb-4"><div><h2 class="text-5xl font-bold text-gray-800">${data.title}</h2><p class="text-2xl text-${data.color}-600 font-semibold mt-1">${data.hook}</p></div><button class="close-modal-btn p-1"><i data-lucide="x" class="w-8 h-8 text-gray-500"></i></button></div><p class="font-body text-gray-600 mb-6 text-lg">${data.value}</p><h3 class="font-bold text-3xl mb-3 text-gray-700">Curriculum Fun</h3><ul class="space-y-2 mb-8">${data.curriculum.map(item => `<li class="flex items-center text-xl"><i data-lucide="check-circle-2" class="w-6 h-6 text-green-500 mr-2"></i>${item}</li>`).join('')}</ul><div class="bg-${data.color}-100 crayon-border p-6 flex justify-center items-center"><a href="#book-tour" class="crayon-button bg-${data.color}-500 text-white font-bold px-6 py-3 text-xl">Inquire About This Program</a></div></div></div></div>`;
        } else if (container === tourModalContainer) {
            modalHTML = `<div class="modal-overlay fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-2 z-50 opacity-0" style="display: none;"><div class="modal-content bg-gray-900 crayon-border w-full max-w-5xl h-[90vh] flex flex-col transform scale-95"><div class="flex justify-between items-center p-4 bg-gray-800"><h2 class="text-3xl font-bold text-white">360° Virtual Tour</h2><button class="close-modal-btn p-1"><i data-lucide="x" class="w-8 h-8 text-gray-300 hover:text-white"></i></button></div><div class="flex-grow bg-black"><iframe class="w-full h-full" src="${data.embedUrl}" frameborder="0" style="border:0;" allowfullscreen></iframe></div></div></div>`;
        }

        container.innerHTML = modalHTML;
        const overlay = container.querySelector('.modal-overlay');
        overlay.style.display = 'flex';
        setTimeout(() => { overlay.classList.remove('opacity-0'); overlay.querySelector('.modal-content').classList.remove('scale-95'); }, 10);
        lucide.createIcons();
        
        overlay.addEventListener('click', (e) => {
            // Closes modal if the overlay or a specific close button is clicked
            if (e.target === overlay || e.target.closest('.close-modal-btn')) {
                overlay.classList.add('opacity-0');
                overlay.querySelector('.modal-content').classList.add('scale-95');
                setTimeout(() => { overlay.remove(); }, 300);
            }
        });
    }

    // Add listeners only if the elements exist
    if (programCards.length > 0) {
        programCards.forEach(c => {
            c.addEventListener('click', () => createModal(programData[c.dataset.program], modalContainer));
        });
    }

    if (startTourBtn) {
        startTourBtn.addEventListener('click', () => {
            const tourData = { embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15222.355609315053!2d78.31889445437893!3d17.4788531122557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb938095555555%3A0xe5427a1955b23d90!2sThe%20Learning%20Curve%2C%20Preschool%20%26%20Daycare!5e0!3m2!1sen!2sin!4v1724300095817!5m2!1sen!2sin&layer=c" };
            createModal(tourData, tourModalContainer);
        });
    }
});

