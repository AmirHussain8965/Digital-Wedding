document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. CINEMATIC FLOWER SHOWER (REDUCED QUANTITY)
    // ==========================================
    const canvas = document.getElementById("premium_canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let petals = [];
        
        // --- Configuration ---
        const INITIAL_BURST_COUNT = 800;  // Lighter initial storm
        const SUSTAINED_COUNT = 100;      // Very gentle, elegant background shower
        
        let phase = 1; // Phase 1: Build Pile. Phase 2: Dissolve Pile & Thin out
        let pileOpacity = 1; 
        
        // --- The "Pile" Canvas ---
        const pileCanvas = document.createElement('canvas');
        const pileCtx = pileCanvas.getContext('2d');
        let pileHeightOffset = 0; 
        let settledCount = 0;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight; // Full 100vh of the hero section
            pileCanvas.width = window.innerWidth;
            pileCanvas.height = window.innerHeight;
            pileHeightOffset = 0; 
            settledCount = 0;
        }
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        // --- Pre-render the Flower Shape ---
        const shapeCanvas = document.createElement('canvas');
        shapeCanvas.width = 40;
        shapeCanvas.height = 40;
        const sCtx = shapeCanvas.getContext('2d');
        
        sCtx.fillStyle = '#cca660'; // Luxury Gold
        sCtx.shadowBlur = 8;
        sCtx.shadowColor = 'rgba(204, 166, 96, 0.6)';
        sCtx.beginPath();
        // Beautiful Heart / Blossom Shape
        sCtx.moveTo(20, 12);
        sCtx.bezierCurveTo(20, 7, 15, 2, 10, 2);
        sCtx.bezierCurveTo(0, 2, 0, 14.5, 0, 14.5);
        sCtx.bezierCurveTo(0, 22, 10, 29, 20, 35);
        sCtx.bezierCurveTo(30, 29, 40, 22, 40, 14.5);
        sCtx.bezierCurveTo(40, 14.5, 40, 2, 30, 2);
        sCtx.bezierCurveTo(25, 2, 20, 7, 20, 12);
        sCtx.fill();

        // --- Particle Class ---
        class Petal {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                this.x = Math.random() * canvas.width;
                // Wave effect on initial load
                this.y = initial ? -(Math.random() * canvas.height * 1.5) : -50;
                
                this.baseSize = Math.random() * 0.4 + 0.2; 
                this.scale = this.baseSize;
                
                // Falling speed
                this.speedY = Math.random() * 2.5 + 1.5; 
                this.speedX = Math.random() * 1 - 0.5; 
                
                // Sway & Rotation
                this.angle = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.05;
                this.sway = Math.random() * Math.PI * 2;
                this.swaySpeed = Math.random() * 0.03 + 0.01;
                
                // Determine where it lands
                this.settleTarget = canvas.height - (Math.random() * 50) - pileHeightOffset;
            }

            update(index) {
                this.y += this.speedY;
                this.x += this.speedX + Math.sin(this.sway) * 0.8;
                this.sway += this.swaySpeed;
                this.angle += this.rotationSpeed;

                // Did it reach the bottom?
                if (this.y >= this.settleTarget) {
                    
                    // Phase 1: Build the beautiful pile
                    if (phase === 1) {
                        pileCtx.save();
                        pileCtx.translate(this.x, this.y);
                        pileCtx.rotate(this.angle);
                        pileCtx.scale(this.scale, this.scale);
                        pileCtx.drawImage(shapeCanvas, -20, -20);
                        pileCtx.restore();

                        settledCount++;
                        // Cap the pile height so it builds up slower with fewer flowers
                        if (settledCount % 15 === 0 && pileHeightOffset < canvas.height * 0.20) {
                            pileHeightOffset += 1.5;
                        }
                    }

                    // Phase 2: Stop piling, start thinning out
                    if (phase === 2 && petals.length > SUSTAINED_COUNT) {
                        // Remove excess flowers completely from the animation
                        petals.splice(index, 1);
                    } else {
                        // Loop the remaining flowers back to the top
                        this.reset();
                    }
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.scale(this.scale, this.scale);
                ctx.drawImage(shapeCanvas, -20, -20);
                ctx.restore();
            }
        }

        // --- Initialize Animation ---
        function init() {
            petals = [];
            for (let i = 0; i < INITIAL_BURST_COUNT; i++) {
                petals.push(new Petal());
            }
        }

        // --- Trigger Phase 2 (Dissolve the Pile) ---
        function triggerPhaseTwo() {
            if (phase === 1) phase = 2;
        }

        // Start fading the pile after 8 seconds
        setTimeout(triggerPhaseTwo, 8000);

        // Or start fading immediately if the user scrolls down
        window.addEventListener("scroll", () => {
            if (window.scrollY > 150) triggerPhaseTwo();
        });

        // --- Animation Loop ---
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Smoothly fade out the pile in Phase 2
            if (phase === 2 && pileOpacity > 0) {
                pileOpacity -= 0.005; // Very slow, dreamy fade out
                if (pileOpacity < 0) pileOpacity = 0;
            }

            // Draw the accumulated pile
            if (pileOpacity > 0) {
                ctx.globalAlpha = pileOpacity;
                ctx.drawImage(pileCanvas, 0, 0);
            }

            // Reset alpha for falling flowers
            ctx.globalAlpha = 1;

            // Draw and update the active falling flowers
            for (let i = petals.length - 1; i >= 0; i--) {
                petals[i].update(i);
                if (petals[i]) petals[i].draw(); // Make sure it wasn't spliced out
            }

            requestAnimationFrame(animate);
        }

        init();
        animate();
    }

    // ==========================================
    // 2. CSS INTRO TRIGGER & COUNTDOWN LOGIC
    // ==========================================
    setTimeout(() => {
        document.body.classList.add('start-anim');
    }, 100);

    const targetDate = new Date("June 14, 2026 17:00:00").getTime();
    const daysEl = document.getElementById("cd_days");
    const hoursEl = document.getElementById("cd_hours");
    const minutesEl = document.getElementById("cd_minutes");
    const secondsEl = document.getElementById("cd_seconds");

    if (daysEl && hoursEl && minutesEl && secondsEl) {
        setInterval(() => { 
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) return; 

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.innerText = days < 10 ? "0" + days : days;
            hoursEl.innerText = hours < 10 ? "0" + hours : hours;
            minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
            secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
        }, 1000);
    }
});