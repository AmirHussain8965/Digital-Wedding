document.addEventListener("DOMContentLoaded", () => {

    // --- Sidebar Toggle Logic ---
    const menuToggle = document.getElementById("menu_toggle");
    const sideBar = document.getElementById("side_bar");

    if (menuToggle && sideBar) {
        menuToggle.addEventListener("click", () => {
            sideBar.classList.toggle("show");
        });
    }

    // --- Elegant Wedding Canvas Animation ---
    const canvas = document.getElementById("animation_canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let backgroundHearts = [];
    let interactiveHearts = [];

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const headerColor = '#5d1a24';

    // --- Interaction Listeners ---
    if (!isTouchDevice) {
        window.addEventListener("mousemove", (event) => {
            const rect = canvas.getBoundingClientRect();
            // Accurately map mouse position over the scrolled absolute canvas
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            if (Math.random() > 0.4) {
                interactiveHearts.push(new InteractiveHeart(mouseX, mouseY));
            }
        });
    } else {
        window.addEventListener("touchstart", (event) => {
            const rect = canvas.getBoundingClientRect();
            const touch = event.touches[0];
            const touchX = touch.clientX - rect.left;
            const touchY = touch.clientY - rect.top;

            const burstCount = Math.floor(Math.random() * 3) + 4;
            for (let i = 0; i < burstCount; i++) {
                interactiveHearts.push(new InteractiveHeart(touchX, touchY));
            }
        });
    }

    // --- Canvas Sizing (Fills parent content area) ---
    function resizeCanvas() {
        const parent = canvas.parentElement;
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        initParticles();
    }
    window.addEventListener("resize", resizeCanvas);

    // Initial size setup
    setTimeout(resizeCanvas, 100); // Small delay ensures CSS layout renders first

    // --- Heart Drawing Helper ---
    function drawHeart(ctx, x, y, width, height, color, opacity) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, opacity);
        ctx.fillStyle = color;
        ctx.beginPath();
        let topCurveHeight = height * 0.3;
        ctx.moveTo(x, y + topCurveHeight);
        ctx.bezierCurveTo(x, y, x - width / 2, y, x - width / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x - width / 2, y + (height + topCurveHeight) / 2, x, y + (height + topCurveHeight) / 2, x, y + height);
        ctx.bezierCurveTo(x, y + (height + topCurveHeight) / 2, x + width / 2, y + (height + topCurveHeight) / 2, x + width / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x + width / 2, y, x, y, x, y + topCurveHeight);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    // --- Background Hearts ---
    class BackgroundHeart {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 12 + 8;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * -0.4 - 0.2;
            this.color = headerColor;
            this.opacity = Math.random() * 0.2 + 0.05;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.y < -this.size) this.y = canvas.height + this.size;
            if (this.x > canvas.width + this.size) this.x = -this.size;
            if (this.x < -this.size) this.x = canvas.width + this.size;
        }
        draw() {
            drawHeart(ctx, this.x, this.y, this.size, this.size, this.color, this.opacity);
        }
    }

    // --- Interactive Hearts (Cursor or Tap) ---
    class InteractiveHeart {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 8 + 6;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1.5;
            this.color = headerColor;
            this.opacity = 0.6;
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.015;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= this.decay;
            this.opacity = Math.max(0, this.life * 0.6);
        }
        draw() {
            drawHeart(ctx, this.x, this.y, this.size, this.size, this.color, this.opacity);
        }
    }

    // --- Animation Loop ---
    function initParticles() {
        backgroundHearts = [];
        const numberOfHearts = Math.floor(canvas.width * 0.08);
        for (let i = 0; i < numberOfHearts; i++) {
            backgroundHearts.push(new BackgroundHeart());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < backgroundHearts.length; i++) {
            backgroundHearts[i].update();
            backgroundHearts[i].draw();
        }
        for (let i = 0; i < interactiveHearts.length; i++) {
            interactiveHearts[i].update();
            interactiveHearts[i].draw();
            if (interactiveHearts[i].life <= 0) {
                interactiveHearts.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
});