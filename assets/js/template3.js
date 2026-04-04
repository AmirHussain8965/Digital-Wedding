document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. CINEMATIC WHITE FLOWER SHOWER
    // ==========================================
    const canvas = document.getElementById("white_flower_canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let petals = [];
        
        // --- Configuration ---
        const INITIAL_BURST_COUNT = 800; // Massive opening
        const SUSTAINED_COUNT = 100;     // Gentle endless background shower
        
        let phase = 1; 
        let pileOpacity = 1; 
        
        // --- The "Pile" Canvas ---
        const pileCanvas = document.createElement('canvas');
        const pileCtx = pileCanvas.getContext('2d');
        let pileHeightOffset = 0; 
        let settledCount = 0;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight; 
            pileCanvas.width = window.innerWidth;
            pileCanvas.height = window.innerHeight;
            pileHeightOffset = 0; 
            settledCount = 0;
        }
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        // --- PRE-RENDER THE WHITE BLOSSOM SHAPE ---
        const shapeCanvas = document.createElement('canvas');
        shapeCanvas.width = 40;
        shapeCanvas.height = 40;
        const sCtx = shapeCanvas.getContext('2d');
        
        sCtx.translate(20, 20);
        
        // Soft drop shadow for depth against the light background
        sCtx.shadowBlur = 4;
        sCtx.shadowColor = 'rgba(0, 0, 0, 0.1)'; 
        
        // Draw 5 white petals
        sCtx.fillStyle = '#ffffff';
        for (let i = 0; i < 5; i++) {
            sCtx.rotate((Math.PI * 2) / 5);
            sCtx.beginPath();
            // Elegant, slightly elongated petal shape
            sCtx.ellipse(0, -8, 5, 10, 0, 0, Math.PI * 2);
            sCtx.fill();
        }
        
        // Draw soft golden center
        sCtx.shadowBlur = 0;
        sCtx.fillStyle = '#e8c872'; 
        sCtx.beginPath();
        sCtx.arc(0, 0, 4, 0, Math.PI * 2);
        sCtx.fill();

        // --- Particle Class ---
        class WhiteFlower {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                this.x = Math.random() * canvas.width;
                this.y = initial ? -(Math.random() * canvas.height * 1.5) : -50;
                this.baseSize = Math.random() * 0.4 + 0.3; // Slightly larger for visibility
                this.scale = this.baseSize;
                
                this.speedY = Math.random() * 2 + 1.2; 
                this.speedX = Math.random() * 1 - 0.5; 
                
                this.angle = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.04;
                this.sway = Math.random() * Math.PI * 2;
                this.swaySpeed = Math.random() * 0.03 + 0.01;
                
                this.settleTarget = canvas.height - (Math.random() * 50) - pileHeightOffset;
            }

            update(index) {
                this.y += this.speedY;
                this.x += this.speedX + Math.sin(this.sway) * 1.2; // Wider sway for floating effect
                this.sway += this.swaySpeed;
                this.angle += this.rotationSpeed;

                if (this.y >= this.settleTarget) {
                    
                    if (phase === 1) {
                        pileCtx.save();
                        pileCtx.translate(this.x, this.y);
                        pileCtx.rotate(this.angle);
                        pileCtx.scale(this.scale, this.scale);
                        pileCtx.drawImage(shapeCanvas, -20, -20);
                        pileCtx.restore();

                        settledCount++;
                        if (settledCount % 15 === 0 && pileHeightOffset < canvas.height * 0.20) {
                            pileHeightOffset += 1.5;
                        }
                    }

                    if (phase === 2 && petals.length > SUSTAINED_COUNT) {
                        petals.splice(index, 1);
                    } else {
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

        function init() {
            petals = [];
            for (let i = 0; i < INITIAL_BURST_COUNT; i++) {
                petals.push(new WhiteFlower());
            }
        }

        function triggerPhaseTwo() {
            if (phase === 1) phase = 2;
        }

        setTimeout(triggerPhaseTwo, 8000);
        window.addEventListener("scroll", () => {
            if (window.scrollY > 150) triggerPhaseTwo();
        });

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (phase === 2 && pileOpacity > 0) {
                pileOpacity -= 0.005; 
                if (pileOpacity < 0) pileOpacity = 0;
            }

            if (pileOpacity > 0) {
                ctx.globalAlpha = pileOpacity;
                ctx.drawImage(pileCanvas, 0, 0);
            }

            ctx.globalAlpha = 1;

            for (let i = petals.length - 1; i >= 0; i--) {
                petals[i].update(i);
                if (petals[i]) petals[i].draw(); 
            }

            requestAnimationFrame(animate);
        }

        init();
        animate();
    }

    // ==========================================
    // 2. COUNTDOWN TIMER LOGIC
    // ==========================================
    const targetDate = new Date("April 19, 2026 15:00:00").getTime();
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