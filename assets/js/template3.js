document.addEventListener("DOMContentLoaded", () => {

    /* ════════════════════════════════════════════════════
       SCROLL PROGRESS BAR
    ════════════════════════════════════════════════════ */
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll_progress';
    document.body.prepend(progressBar);
    window.addEventListener('scroll', () => {
        const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = pct + '%';
    });


    /* ════════════════════════════════════════════════════
       GOLD DUST PARTICLES  (Stage 1 bg)
    ════════════════════════════════════════════════════ */
    const dustContainer = document.getElementById('env_dust');
    if (dustContainer) {
        for (let i = 0; i < 55; i++) {
            const p = document.createElement('div');
            p.className = 'dust_p';
            const size = 1.5 + Math.random() * 3;
            const dx   = (Math.random() - 0.5) * 120;
            p.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${Math.random() * 100}%;
                bottom: ${Math.random() * 30}%;
                opacity: 0;
                --dx: ${dx}px;
                animation-duration: ${5 + Math.random() * 8}s;
                animation-delay: ${Math.random() * 6}s;
            `;
            dustContainer.appendChild(p);
        }
    }


    /* ════════════════════════════════════════════════════
       STAGE 1 — ENVELOPE ORCHESTRATION
       Timeline (seconds from page load):
         0.0  – envelope scene fades in
         0.5  – bouquet floats down (via CSS)
         0.8  – wax seal pops
         2.2  – flap opens
         3.4  – card rises out of envelope
         5.5  – envelope scene fades out
         5.8  – stage_car activates
    ════════════════════════════════════════════════════ */
    const stageEnvelope = document.getElementById('stage_envelope');
    const stageCar      = document.getElementById('stage_car');
    const envFlapTop    = document.getElementById('env_flap_top');
    const envCard       = document.getElementById('env_card');
    const envSeal       = document.getElementById('env_seal');

    // Wax seal pop
    setTimeout(() => {
        if (envSeal) envSeal.classList.add('pop');
    }, 800);

    // Flap opens
    setTimeout(() => {
        if (envFlapTop) envFlapTop.classList.add('open');
    }, 2200);

    // Card rises
    setTimeout(() => {
        if (envCard) envCard.classList.add('rise');
    }, 3400);

    // Fade envelope stage out
    setTimeout(() => {
        if (stageEnvelope) {
            stageEnvelope.classList.add('hide');
            stageEnvelope.addEventListener('animationend', () => {
                stageEnvelope.style.display = 'none';
            }, { once: true });
        }
    }, 5500);


    /* ════════════════════════════════════════════════════
       STAGE 2 — CAR DRIVE-BY ORCHESTRATION
       5.8s  – car stage appears
       5.9s  – petal shower starts
       6.0s  – car starts driving
       9.5s  – car stage fades out → hero reveals
    ════════════════════════════════════════════════════ */
    setTimeout(() => {
        if (!stageCar) return;
        stageCar.classList.add('active');

        // Start car petals
        startCarPetals();

        // Drive the car after a tiny pause (image load buffer)
        setTimeout(() => {
            const carUnit = document.getElementById('car_unit');
            if (carUnit) carUnit.classList.add('drive');
        }, 200);

        // Fade car stage out
        setTimeout(() => {
            stageCar.classList.add('hide');
            stageCar.addEventListener('animationend', () => {
                stageCar.style.display = 'none';
                // Trigger hero icon pulsing class
                const heroIcon = document.querySelector('.hero_icon_anim');
                if (heroIcon) {
                    heroIcon.addEventListener('animationend', () => {
                        heroIcon.style.animation = 'iconPulse 2s ease-in-out infinite';
                    }, { once: true });
                }
            }, { once: true });
        }, 3700);

    }, 5800);


    /* ════════════════════════════════════════════════════
       CAR STAGE — PETAL SHOWER CANVAS
    ════════════════════════════════════════════════════ */
    function startCarPetals() {
        const canvas = document.getElementById('car_petals_canvas');
        if (!canvas) return;

        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');

        // Pre-render a soft petal shape
        const petalShape = document.createElement('canvas');
        petalShape.width  = 20;
        petalShape.height = 20;
        const pc = petalShape.getContext('2d');
        pc.translate(10, 10);
        pc.fillStyle = 'rgba(255,200,210,0.85)';
        pc.beginPath();
        pc.ellipse(0, -5, 4, 7, 0, 0, Math.PI * 2);
        pc.fill();
        pc.fillStyle = 'rgba(255,220,230,0.6)';
        pc.beginPath();
        pc.ellipse(3, 2, 4, 7, Math.PI / 3, 0, Math.PI * 2);
        pc.fill();

        const petals = [];
        for (let i = 0; i < 60; i++) {
            petals.push({
                x: Math.random() * canvas.width,
                y: Math.random() * -canvas.height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: 1.2 + Math.random() * 2,
                angle: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.06,
                scale: 0.5 + Math.random() * 0.8,
                sway: Math.random() * Math.PI * 2,
                swaySpeed: 0.02 + Math.random() * 0.03,
                alpha: 0.5 + Math.random() * 0.5,
            });
        }

        let running = true;
        function animatePetals() {
            if (!running) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            petals.forEach(p => {
                p.y     += p.vy;
                p.x     += p.vx + Math.sin(p.sway) * 1.5;
                p.sway  += p.swaySpeed;
                p.angle += p.rotSpeed;
                if (p.y > canvas.height + 30) {
                    p.y = -30;
                    p.x = Math.random() * canvas.width;
                }
                ctx.save();
                ctx.globalAlpha = p.alpha;
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle);
                ctx.scale(p.scale, p.scale);
                ctx.drawImage(petalShape, -10, -10);
                ctx.restore();
            });
            requestAnimationFrame(animatePetals);
        }
        animatePetals();

        // Stop petals when stage hides
        setTimeout(() => { running = false; }, 4200);
    }


    /* ════════════════════════════════════════════════════
       COUNTDOWN TIMER
    ════════════════════════════════════════════════════ */
    const weddingDate = new Date('2026-04-19T15:00:00');

    function updateCountdown() {
        const diff = weddingDate - new Date();
        if (diff <= 0) return;

        const days    = Math.floor(diff / 86400000);
        const hours   = Math.floor((diff % 86400000) / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        const pad = n => String(n).padStart(2, '0');
        [
            ['cd_days', days],
            ['cd_hours', hours],
            ['cd_minutes', minutes],
            ['cd_seconds', seconds],
        ].forEach(([id, val]) => {
            const el = document.getElementById(id);
            if (!el) return;
            const newVal = pad(val);
            if (el.textContent !== newVal) {
                el.classList.remove('flip');
                void el.offsetWidth;
                el.classList.add('flip');
                el.textContent = newVal;
            }
        });
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);


    /* ════════════════════════════════════════════════════
       HERO — FLOATING HEARTS
    ════════════════════════════════════════════════════ */
    const heartsLayer = document.getElementById('floating_hearts');
    if (heartsLayer) {
        ['♥','❤','♡','💕'].forEach((char, ci) => {
            for (let i = 0; i < 5; i++) {
                const h = document.createElement('span');
                h.className = 'fheart';
                h.textContent = char;
                h.style.cssText = `
                    left: ${Math.random() * 100}%;
                    font-size: ${0.6 + Math.random() * 1.2}rem;
                    animation-duration: ${7 + Math.random() * 10}s;
                    animation-delay: ${Math.random() * 10}s;
                `;
                heartsLayer.appendChild(h);
            }
        });
    }

    /* ════════════════════════════════════════════════════
       HERO — TWINKLING STARS
    ════════════════════════════════════════════════════ */
    const starsLayer = document.getElementById('stars_layer');
    if (starsLayer) {
        for (let i = 0; i < 55; i++) {
            const star = document.createElement('div');
            star.className = 'tstar';
            const size = 1.5 + Math.random() * 3;
            star.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 85}%;
                animation-duration: ${1.5 + Math.random() * 3}s;
                animation-delay: ${Math.random() * 4}s;
            `;
            starsLayer.appendChild(star);
        }
    }


    /* ════════════════════════════════════════════════════
       WHITE FLOWER SHOWER (hero canvas — original, unchanged)
    ════════════════════════════════════════════════════ */
    const canvas = document.getElementById("white_flower_canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let petals = [];
        const INITIAL_BURST_COUNT = 800;
        const SUSTAINED_COUNT     = 100;
        let phase       = 1;
        let pileOpacity = 1;

        const pileCanvas = document.createElement('canvas');
        const pileCtx    = pileCanvas.getContext('2d');
        let pileHeightOffset = 0;
        let settledCount = 0;

        function resizeCanvas() {
            canvas.width = pileCanvas.width = window.innerWidth;
            canvas.height = pileCanvas.height = window.innerHeight;
            pileHeightOffset = 0;
            settledCount = 0;
        }
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const shapeCanvas = document.createElement('canvas');
        shapeCanvas.width = shapeCanvas.height = 40;
        const sCtx = shapeCanvas.getContext('2d');
        sCtx.translate(20, 20);
        sCtx.shadowBlur = 4;
        sCtx.shadowColor = 'rgba(0,0,0,0.1)';
        sCtx.fillStyle = '#ffffff';
        for (let i = 0; i < 5; i++) {
            sCtx.rotate((Math.PI * 2) / 5);
            sCtx.beginPath();
            sCtx.ellipse(0, -8, 5, 10, 0, 0, Math.PI * 2);
            sCtx.fill();
        }
        sCtx.shadowBlur = 0;
        sCtx.fillStyle = '#e8c872';
        sCtx.beginPath();
        sCtx.arc(0, 0, 4, 0, Math.PI * 2);
        sCtx.fill();

        class WhiteFlower {
            constructor() { this.reset(true); }
            reset(initial = false) {
                this.x           = Math.random() * canvas.width;
                this.y           = initial ? -(Math.random() * canvas.height * 1.5) : -50;
                this.scale       = Math.random() * 0.4 + 0.3;
                this.speedY      = Math.random() * 2 + 1.2;
                this.speedX      = Math.random() * 1 - 0.5;
                this.angle       = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.04;
                this.sway        = Math.random() * Math.PI * 2;
                this.swaySpeed   = Math.random() * 0.03 + 0.01;
                this.settleTarget = canvas.height - Math.random() * 50 - pileHeightOffset;
            }
            update(index) {
                this.y     += this.speedY;
                this.x     += this.speedX + Math.sin(this.sway) * 1.2;
                this.sway  += this.swaySpeed;
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
                        if (settledCount % 15 === 0 && pileHeightOffset < canvas.height * 0.20)
                            pileHeightOffset += 1.5;
                    }
                    if (phase === 2 && petals.length > SUSTAINED_COUNT)
                        petals.splice(index, 1);
                    else this.reset();
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

        function initFlowers() {
            petals = [];
            for (let i = 0; i < INITIAL_BURST_COUNT; i++) petals.push(new WhiteFlower());
        }
        function triggerPhaseTwo() { if (phase === 1) phase = 2; }
        setTimeout(triggerPhaseTwo, 8000);
        window.addEventListener("scroll", () => { if (window.scrollY > 150) triggerPhaseTwo(); });

        function animateFlowers() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (phase === 2 && pileOpacity > 0) { pileOpacity -= 0.005; }
            if (pileOpacity > 0) { ctx.globalAlpha = pileOpacity; ctx.drawImage(pileCanvas, 0, 0); }
            ctx.globalAlpha = 1;
            for (let i = petals.length - 1; i >= 0; i--) {
                petals[i].update(i);
                if (petals[i]) petals[i].draw();
            }
            requestAnimationFrame(animateFlowers);
        }
        initFlowers();
        animateFlowers();
    }


    /* ════════════════════════════════════════════════════
       RSVP — CONFETTI BURST
    ════════════════════════════════════════════════════ */
    const btnAccept     = document.getElementById('btn_accept');
    const confettiCanvas = document.getElementById('confetti_canvas');

    if (btnAccept && confettiCanvas) {
        const cCtx = confettiCanvas.getContext('2d');
        const colors = ['#b56a7f','#e8c872','#faeaed','#d4849a','#ffffff','#f0e6e8','#ff9eb5'];
        let particles = [], running = false;

        function burst() {
            confettiCanvas.width  = confettiCanvas.offsetWidth;
            confettiCanvas.height = confettiCanvas.offsetHeight;
            particles = [];
            for (let i = 0; i < 130; i++) {
                particles.push({
                    x: confettiCanvas.width / 2,
                    y: confettiCanvas.height / 2,
                    vx: (Math.random() - 0.5) * 14,
                    vy: (Math.random() - 0.95) * 15,
                    gravity: 0.38,
                    size: 4 + Math.random() * 8,
                    color: colors[~~(Math.random() * colors.length)],
                    shape: ['circle','rect','heart'][~~(Math.random() * 3)],
                    rot: Math.random() * Math.PI * 2,
                    rotSpeed: (Math.random() - 0.5) * 0.22,
                    alpha: 1,
                    decay: 0.012 + Math.random() * 0.008,
                });
            }
            if (!running) { running = true; drawConfetti(); }
        }

        function drawHeart(c, x, y, s) {
            c.beginPath();
            c.moveTo(x, y + s/4);
            c.bezierCurveTo(x, y, x-s/2, y, x-s/2, y+s/4);
            c.bezierCurveTo(x-s/2, y+s/2, x, y+s*.75, x, y+s);
            c.bezierCurveTo(x, y+s*.75, x+s/2, y+s/2, x+s/2, y+s/4);
            c.bezierCurveTo(x+s/2, y, x, y, x, y+s/4);
            c.closePath(); c.fill();
        }

        function drawConfetti() {
            if (!running) return;
            cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            let alive = false;
            particles.forEach(p => {
                p.vy += p.gravity; p.x += p.vx; p.y += p.vy;
                p.rot += p.rotSpeed; p.alpha -= p.decay;
                if (p.alpha > 0) {
                    alive = true;
                    cCtx.save();
                    cCtx.globalAlpha = Math.max(0, p.alpha);
                    cCtx.fillStyle = p.color;
                    cCtx.translate(p.x, p.y);
                    cCtx.rotate(p.rot);
                    if (p.shape === 'circle') {
                        cCtx.beginPath(); cCtx.arc(0, 0, p.size/2, 0, Math.PI*2); cCtx.fill();
                    } else if (p.shape === 'rect') {
                        cCtx.fillRect(-p.size/2, -p.size/4, p.size, p.size/2);
                    } else {
                        drawHeart(cCtx, -p.size/2, -p.size/2, p.size);
                    }
                    cCtx.restore();
                }
            });
            if (alive) requestAnimationFrame(drawConfetti);
            else { running = false; cCtx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height); }
        }

        btnAccept.addEventListener('click', () => {
            burst();
            btnAccept.style.transform = 'scale(0.95)';
            setTimeout(() => { btnAccept.style.transform = ''; }, 150);
        });
    }


    /* ════════════════════════════════════════════════════
       RSVP FORM SUBMIT
    ════════════════════════════════════════════════════ */
    const rsvpForm = document.getElementById('rsvp_form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', e => {
            e.preventDefault();
            const btn = rsvpForm.querySelector('.rsvp_submit_btn');
            const orig = btn.textContent;
            btn.textContent = '✓ RSVP Received!';
            btn.style.background = '#6aaa7e';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = orig;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        });
    }


    /* ════════════════════════════════════════════════════
       FOOTER — FLOATING HEARTS
    ════════════════════════════════════════════════════ */
    const footerWrap = document.getElementById('footer_hearts');
    if (footerWrap) {
        ['♥','❤','♡'].forEach(char => {
            for (let i = 0; i < 4; i++) {
                const h = document.createElement('span');
                h.className = 'footer_heart';
                h.textContent = char;
                h.style.cssText = `
                    left: ${Math.random() * 100}%;
                    font-size: ${0.7 + Math.random()}rem;
                    animation-duration: ${3 + Math.random() * 4}s;
                    animation-delay: ${Math.random() * 5}s;
                `;
                footerWrap.appendChild(h);
            }
        });
    }

});