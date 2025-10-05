document.addEventListener('DOMContentLoaded', () => {
    // Check if the canvas element exists on the current page
    const canvas = document.getElementById('drawing-canvas');

    // Only run the canvas logic if the element is found
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let isDrawing = false;

        function resizeCanvas() {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = canvas.parentElement.clientWidth * dpr;
            canvas.height = (canvas.parentElement.clientWidth * 0.6) * dpr;
            canvas.style.width = `${canvas.parentElement.clientWidth}px`;
            canvas.style.height = `${canvas.parentElement.clientWidth * 0.6}px`;
            ctx.scale(dpr, dpr);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'black'; // Set a default color
        }

        function getPos(e) {
            const rect = canvas.getBoundingClientRect();
            const evt = e.touches ? e.touches[0] : e;
            return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
        }

        function start(e) {
            isDrawing = true;
            const { x, y } = getPos(e);
            ctx.beginPath();
            ctx.moveTo(x, y);
        }

        function draw(e) {
            if (!isDrawing) return;
            e.preventDefault(); // Prevent scrolling while drawing
            const { x, y } = getPos(e);
            ctx.lineTo(x, y);
            ctx.stroke();
        }

        function stop() {
            isDrawing = false;
            ctx.closePath();
        }

        // Add event listeners for both mouse and touch
        canvas.addEventListener('mousedown', start);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stop);
        canvas.addEventListener('mouseleave', stop);
        
        canvas.addEventListener('touchstart', start);
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('touchend', stop);

        const canvasControls = document.getElementById('canvas-controls');
        if (canvasControls) {
            canvasControls.addEventListener('click', (e) => {
                const colorButton = e.target.closest('.color-btn');
                const clearButton = e.target.closest('#clear-canvas-btn');

                if (colorButton && colorButton.dataset.color) {
                    ctx.strokeStyle = colorButton.dataset.color;
                    const currentActive = document.querySelector('.color-btn.active');
                    if(currentActive) currentActive.classList.remove('active');
                    colorButton.classList.add('active');
                }

                if (clearButton) {
                    ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio||1), canvas.height / (window.devicePixelRatio||1) );
                }
            });
        }
        
        // Resize canvas when the window is resized
        window.addEventListener('resize', resizeCanvas);
        // Initial resize
        resizeCanvas();
    }
});

