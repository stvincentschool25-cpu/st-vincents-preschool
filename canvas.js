// Canvas Drawing Functionality
function initCanvas() {
    const canvas = document.getElementById('drawing-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let currentTool = 'brush';
    let currentColor = 'black';
    let brushSize = 5;
    
    // Set up canvas
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = ${rect.width}px;
        canvas.style.height = ${rect.height}px;
        ctx.scale(dpr, dpr);
        ctx.lineCap = 'round'; 
        ctx.lineJoin = 'round'; 
        ctx.lineWidth = brushSize;
        ctx.strokeStyle = currentColor;
        ctx.fillStyle = currentColor;
        
        // Draw a subtle grid background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid lines
        ctx.strokeStyle = 'rgba(0,0,0,0.05)';
        ctx.lineWidth = 1;
        const gridSize = 20;
        
        for (let x = 0; x <= canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        for (let y = 0; y <= canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        // Reset drawing settings
        ctx.lineWidth = brushSize;
        ctx.strokeStyle = currentColor;
        ctx.fillStyle = currentColor;
    }
    
    function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const evt = e.touches ? e.touches[0] : e;
        return { 
            x: evt.clientX - rect.left, 
            y: evt.clientY - rect.top 
        };
    }
    
    function startDrawing(e) { 
        isDrawing = true; 
        const {x,y} = getPos(e); 
        
        if (currentTool === 'brush') {
            ctx.beginPath(); 
            ctx.moveTo(x,y); 
        } else if (currentTool === 'fill') {
            // Simple flood fill implementation
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const targetColor = getPixelColor(imageData, x, y);
            floodFill(imageData, x, y, targetColor, hexToRgb(currentColor));
            ctx.putImageData(imageData, 0, 0);
        }
    }
    
    function draw(e) { 
        if (!isDrawing || currentTool !== 'brush') return; 
        e.preventDefault(); 
        const {x,y} = getPos(e); 
        ctx.lineTo(x,y); 
        ctx.stroke(); 
    }
    
    function stopDrawing() { 
        isDrawing = false; 
        if (currentTool === 'brush') {
            ctx.closePath(); 
        }
    }
    
    // Flood fill algorithm
    function getPixelColor(imageData, x, y) {
        const index = (y * imageData.width + x) * 4;
        return {
            r: imageData.data[index],
            g: imageData.data[index + 1],
            b: imageData.data[index + 2],
            a: imageData.data[index + 3]
        };
    }
    
    function setPixelColor(imageData, x, y, color) {
        const index = (y * imageData.width + x) * 4;
        imageData.data[index] = color.r;
        imageData.data[index + 1] = color.g;
        imageData.data[index + 2] = color.b;
        imageData.data[index + 3] = color.a || 255;
    }
    
    function colorsMatch(a, b, tolerance = 1) {
        return Math.abs(a.r - b.r) <= tolerance &&
               Math.abs(a.g - b.g) <= tolerance &&
               Math.abs(a.b - b.b) <= tolerance &&
               Math.abs(a.a - (b.a || 255)) <= tolerance;
    }
    
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : {r: 0, g: 0, b: 0};
    }
    
    function floodFill(imageData, x, y, targetColor, replacementColor) {
        const stack = [[x, y]];
        const width = imageData.width;
        const height = imageData.height;
        
        while (stack.length > 0) {
            const [currentX, currentY] = stack.pop();
            
            if (currentX < 0 || currentX >= width || currentY < 0 || currentY >= height) {
                continue;
            }
            
            const currentColor = getPixelColor(imageData, currentX, currentY);
            
            if (!colorsMatch(currentColor, targetColor)) {
                continue;
            }
            
            setPixelColor(imageData, currentX, currentY, replacementColor);
            
            stack.push([currentX + 1, currentY]);
            stack.push([currentX - 1, currentY]);
            stack.push([currentX, currentY + 1]);
            stack.push([currentX, currentY - 1]);
        }
    }
    
    // Event listeners for drawing
    ['mousedown', 'touchstart'].forEach(e => canvas.addEventListener(e, startDrawing));
    ['mousemove', 'touchmove'].forEach(e => canvas.addEventListener(e, draw));
    ['mouseup', 'mouseleave', 'touchend'].forEach(e => canvas.addEventListener(e, stopDrawing));
    
    // Color selection
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentColor = e.target.dataset.color;
            document.querySelector('.color-btn.active').classList.remove('active');
            e.target.classList.add('active');
            ctx.strokeStyle = currentColor;
            ctx.fillStyle = currentColor;
            
            // Update brush preview
            document.getElementById('brush-preview').style.backgroundColor = currentColor;
        });
    });
    
    // Tool selection
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentTool = e.currentTarget.dataset.tool;
            document.querySelector('.tool-btn.active').classList.remove('active');
            e.currentTarget.classList.add('active');
            
            if (currentTool === 'eraser') {
                ctx.strokeStyle = 'white';
                ctx.fillStyle = 'white';
            } else {
                ctx.strokeStyle = currentColor;
                ctx.fillStyle = currentColor;
            }
        });
    });
    
    // Brush size control
    const brushSizeControl = document.getElementById('brush-size');
    const brushPreview = document.getElementById('brush-preview');
    
    if (brushSizeControl) {
        brushSizeControl.addEventListener('input', (e) => {
            brushSize = parseInt(e.target.value);
            ctx.lineWidth = brushSize;
            
            // Update brush preview size
            const size = Math.max(5, brushSize / 2);
            brushPreview.style.width = ${size}px;
            brushPreview.style.height = ${size}px;
        });
    }
    
    // Clear canvas
    const clearCanvasBtn = document.getElementById('clear-canvas-btn');
    if (clearCanvasBtn) {
        clearCanvasBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear the canvas?')) {
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                resizeCanvas(); // Redraw grid
            }
        });
    }
    
    // Save canvas
    const saveCanvasBtn = document.getElementById('save-canvas-btn');
    if (saveCanvasBtn) {
        saveCanvasBtn.addEventListener('click', () => {
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'st-vincents-drawing.png';
            link.href = dataURL;
            link.click();
        });
    }
    
    // Random color
    const randomColorBtn = document.getElementById('random-color-btn');
    if (randomColorBtn) {
        randomColorBtn.addEventListener('click', () => {
            const colors = ['#ef4444', '#3b82f6', '#22c55e', '#facc15', '#a855f7', '#ec4899', '#f97316', '#14b8a6'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            currentColor = randomColor;
            
            // Update active color button
            document.querySelector('.color-btn.active').classList.remove('active');
            const colorBtn = document.querySelector(.color-btn[data-color="${randomColor}"]);
            if (colorBtn) {
                colorBtn.classList.add('active');
            }
            
            ctx.strokeStyle = currentColor;
            ctx.fillStyle = currentColor;
            
            // Update brush preview
            document.getElementById('brush-preview').style.backgroundColor = currentColor;
        });
    }
    
    // Initialize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Set initial brush preview
    if (brushPreview) {
        brushPreview.style.width = ${brushSize/2}px;
        brushPreview.style.height = ${brushSize/2}px;
    }
}

// Initialize canvas when DOM is loaded
document.addEventListener('DOMContentLoaded', initCanvas);