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


// --- Create Invitation Modal Logic ---
    const uploadZone = document.getElementById('upload_zone');
    const imageInput = document.getElementById('cover_image_input');
    const previewWrapper = document.getElementById('image_preview_wrapper');
    const previewImg = document.getElementById('preview_img');
    const btnRemoveImg = document.getElementById('btn_remove_img');
    const createForm = document.getElementById('create_invitation_form');
    const btnCopyUrl = document.getElementById('btn_copy_url');
    const inviteUrlInput = document.getElementById('invite_url');

    // Trigger file input when clicking the upload zone
    if (uploadZone && imageInput) {
        uploadZone.addEventListener('click', () => {
            imageInput.click();
        });

        // Handle file selection
        imageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImg.src = e.target.result;
                    uploadZone.style.display = 'none';
                    previewWrapper.style.display = 'block';
                }
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    // Handle Remove Image button
    if (btnRemoveImg) {
        btnRemoveImg.addEventListener('click', () => {
            imageInput.value = ''; // Clear the input
            previewImg.src = '';
            previewWrapper.style.display = 'none';
            uploadZone.style.display = 'block';
        });
    }

    // Handle Form Submission -> Show Success Modal
    if (createForm) {
        createForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            
            // Hide Create Modal
            const createModalEl = document.getElementById('create_invitation_modal');
            const createModal = bootstrap.Modal.getInstance(createModalEl);
            createModal.hide();

            // Show Success Modal
            const successModal = new bootstrap.Modal(document.getElementById('success_modal'));
            successModal.show();
        });
    }

    // Copy URL functionality
    if (btnCopyUrl && inviteUrlInput) {
        btnCopyUrl.addEventListener('click', () => {
            inviteUrlInput.select();
            document.execCommand('copy');
            
            // Quick visual feedback
            const originalIcon = btnCopyUrl.innerHTML;
            btnCopyUrl.innerHTML = '<i class="bi bi-check-lg text-success"></i>';
            setTimeout(() => {
                btnCopyUrl.innerHTML = originalIcon;
            }, 2000);
        });
    }