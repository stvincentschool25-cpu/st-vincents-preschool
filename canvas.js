document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('drawing-canvas');

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
            ctx.strokeStyle = 'black'; // Default color
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
            e.preventDefault();
            const { x, y } = getPos(e);
            ctx.lineTo(x, y);
            ctx.stroke();
        }

        function stop() {
            isDrawing = false;
            ctx.closePath();
        }

        ['mousedown', 'touchstart'].forEach(e => canvas.addEventListener(e, start));
        ['mousemove', 'touchmove'].forEach(e => canvas.addEventListener(e, draw));
        ['mouseup', 'mouseleave', 'touchend'].forEach(e => canvas.addEventListener(e, stop));

        const canvasControls = document.getElementById('canvas-controls');
        if (canvasControls) {
            canvasControls.addEventListener('click', (e) => {
                if (e.target.dataset.color) {
                    ctx.strokeStyle = e.target.dataset.color;
                    const currentActive = document.querySelector('.color-btn.active');
                    if(currentActive) currentActive.classList.remove('active');
                    e.target.classList.add('active');
                }
                if (e.target.closest('#clear-canvas-btn')) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
            });
        }
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
    }
});
