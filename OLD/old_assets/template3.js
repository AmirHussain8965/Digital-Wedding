document.addEventListener("DOMContentLoaded", () => {

    /* ══════════════════════════════════════════════
       SCROLL PROGRESS BAR
    ══════════════════════════════════════════════ */
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll_progress';
    document.body.prepend(progressBar);
    window.addEventListener('scroll', () => {
        const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = pct + '%';
    });


    /* ══════════════════════════════════════════════
       FLOATING DUST PARTICLES (envelope bg)
    ══════════════════════════════════════════════ */
    const dustEl = document.getElementById('env_dust');
    if (dustEl) {
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.className = 'dust_p';
            const size = 2 + Math.random() * 3.5;
            const dx   = (Math.random() - 0.5) * 100;
            // use soft rose/gold colours matching the cream theme
            const colours = ['rgba(181,106,127,0.55)', 'rgba(201,168,76,0.45)', 'rgba(240,200,200,0.6)'];
            p.style.cssText = `
                width:${size}px;
                height:${size}px;
                left:${Math.random() * 100}%;
                bottom:${Math.random() * 25}%;
                opacity:0;
                background:${colours[Math.floor(Math.random() * colours.length)]};
                --dx:${dx}px;
                animation-duration:${6 + Math.random() * 9}s;
                animation-delay:${Math.random() * 7}s;
            `;
            dustEl.appendChild(p);
        }
    }


    /* ══════════════════════════════════════════════
       ENVELOPE — CLICK TO OPEN
    ══════════════════════════════════════════════ */
    const stageEnvelope = document.getElementById('stage_envelope');
    const envelopeScene = document.getElementById('envelope_scene');
    const envFlapTop    = document.getElementById('env_flap_top');
    const envCard       = document.getElementById('env_card');
    const envSeal       = document.getElementById('env_seal');
    const tapHint       = document.getElementById('env_tap_hint');

    let envelopeOpened = false;

    function openEnvelope() {
        if (envelopeOpened) return;
        envelopeOpened = true;

        // Lock further clicks & hover effects
        stageEnvelope.classList.add('opening');
        envelopeScene.classList.add('opened');

        // Hide the tap hint
        if (tapHint) tapHint.classList.add('hide');

        // Step 1 (0ms): Flap opens
        if (envFlapTop) envFlapTop.classList.add('open');

        // Step 2 (600ms): Hide seal as flap completes
        setTimeout(() => {
            if (envSeal) envSeal.classList.add('hide');
        }, 600);

        // Step 3 (900ms): Card rises up out of envelope
        setTimeout(() => {
            if (envCard) envCard.classList.add('rise');
        }, 900);

        // Step 4 (2600ms): Entire envelope stage fades out
        setTimeout(() => {
            if (stageEnvelope) {
                stageEnvelope.classList.add('hide');
                stageEnvelope.addEventListener('animationend', () => {
                    stageEnvelope.style.display = 'none';
                    // Trigger hero section animations
                    revealHero();
                }, { once: true });
            }
        }, 2600);
    }

    // Click on envelope
    if (envelopeScene) {
        envelopeScene.addEventListener('click', openEnvelope);
        // Keyboard accessible
        envelopeScene.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') openEnvelope();
        });
    }


    /* ══════════════════════════════════════════════
       REVEAL HERO — fires after envelope closes
    ══════════════════════════════════════════════ */
    function revealHero() {
        // Add class to body — CSS animations keyed on this class fire
        document.body.classList.add('hero_ready');

        // Start white flower shower
        initFlowerShower();

        // Add floating hearts to hero
        spawnHeroHearts();

        // Add twinkling stars
        spawnStars();

        // Start countdown
        startCountdown();
    }


    /* ══════════════════════════════════════════════
       COUNTDOWN TIMER
    ══════════════════════════════════════════════ */
    function startCountdown() {
        const weddingDate = new Date('2026-04-19T15:00:00');
        const pad = n => String(n).padStart(2, '0');

        function tick() {
            const diff = weddingDate - new Date();
            if (diff <= 0) return;

            const days    = Math.floor(diff / 86400000);
            const hours   = Math.floor((diff % 86400000) / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);

            [
                ['cd_days',    days],
                ['cd_hours',   hours],
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

        tick();
        setInterval(tick, 1000);
    }


    /* ══════════════════════════════════════════════
       FLOATING HEARTS — HERO
    ══════════════════════════════════════════════ */
    function spawnHeroHearts() {
        const layer = document.getElementById('floating_hearts');
        if (!layer) return;
        ['♥','❤','♡','💕'].forEach(char => {
            for (let i = 0; i < 5; i++) {
                const h = document.createElement('span');
                h.className = 'fheart';
                h.textContent = char;
                h.style.cssText = `
                    left:${Math.random() * 100}%;
                    font-size:${0.6 + Math.random() * 1.2}rem;
                    animation-duration:${7 + Math.random() * 10}s;
                    animation-delay:${Math.random() * 10}s;
                `;
                layer.appendChild(h);
            }
        });
    }


    /* ══════════════════════════════════════════════
       TWINKLING STARS — HERO
    ══════════════════════════════════════════════ */
    function spawnStars() {
        const layer = document.getElementById('stars_layer');
        if (!layer) return;
        for (let i = 0; i < 55; i++) {
            const s = document.createElement('div');
            s.className = 'tstar';
            const size = 1.5 + Math.random() * 3;
            s.style.cssText = `
                width:${size}px;
                height:${size}px;
                left:${Math.random() * 100}%;
                top:${Math.random() * 85}%;
                animation-duration:${1.5 + Math.random() * 3}s;
                animation-delay:${Math.random() * 4}s;
            `;
            layer.appendChild(s);
        }
    }


    /* ══════════════════════════════════════════════
       WHITE FLOWER SHOWER (hero canvas)
    ══════════════════════════════════════════════ */
    function initFlowerShower() {
        const canvas = document.getElementById('white_flower_canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let petals = [];
        const INITIAL_BURST = 800;
        const SUSTAINED     = 100;
        let phase = 1, pileOpacity = 1;

        const pileCanvas = document.createElement('canvas');
        const pileCtx    = pileCanvas.getContext('2d');
        let pileHeightOffset = 0, settledCount = 0;

        function resize() {
            canvas.width = pileCanvas.width = window.innerWidth;
            canvas.height = pileCanvas.height = window.innerHeight;
            pileHeightOffset = 0; settledCount = 0;
        }
        window.addEventListener('resize', resize);
        resize();

        // Pre-render blossom shape
        const shape = document.createElement('canvas');
        shape.width = shape.height = 40;
        const sc = shape.getContext('2d');
        sc.translate(20, 20);
        sc.shadowBlur = 4; sc.shadowColor = 'rgba(0,0,0,0.1)';
        sc.fillStyle = '#ffffff';
        for (let i = 0; i < 5; i++) {
            sc.rotate((Math.PI * 2) / 5);
            sc.beginPath(); sc.ellipse(0, -8, 5, 10, 0, 0, Math.PI * 2); sc.fill();
        }
        sc.shadowBlur = 0; sc.fillStyle = '#e8c872';
        sc.beginPath(); sc.arc(0, 0, 4, 0, Math.PI * 2); sc.fill();

        class Flower {
            constructor() { this.reset(true); }
            reset(init = false) {
                this.x    = Math.random() * canvas.width;
                this.y    = init ? -(Math.random() * canvas.height * 1.5) : -50;
                this.scale = Math.random() * 0.4 + 0.3;
                this.speedY = Math.random() * 2 + 1.2;
                this.speedX = Math.random() - 0.5;
                this.angle  = Math.random() * Math.PI * 2;
                this.rotS   = (Math.random() - 0.5) * 0.04;
                this.sway   = Math.random() * Math.PI * 2;
                this.swayS  = Math.random() * 0.03 + 0.01;
                this.settle = canvas.height - Math.random() * 50 - pileHeightOffset;
            }
            update(i) {
                this.y += this.speedY;
                this.x += this.speedX + Math.sin(this.sway) * 1.2;
                this.sway  += this.swayS;
                this.angle += this.rotS;
                if (this.y >= this.settle) {
                    if (phase === 1) {
                        pileCtx.save();
                        pileCtx.translate(this.x, this.y);
                        pileCtx.rotate(this.angle);
                        pileCtx.scale(this.scale, this.scale);
                        pileCtx.drawImage(shape, -20, -20);
                        pileCtx.restore();
                        if (++settledCount % 15 === 0 && pileHeightOffset < canvas.height * 0.2)
                            pileHeightOffset += 1.5;
                    }
                    if (phase === 2 && petals.length > SUSTAINED) petals.splice(i, 1);
                    else this.reset();
                }
            }
            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.scale(this.scale, this.scale);
                ctx.drawImage(shape, -20, -20);
                ctx.restore();
            }
        }

        for (let i = 0; i < INITIAL_BURST; i++) petals.push(new Flower());

        const phase2 = () => { if (phase === 1) phase = 2; };
        setTimeout(phase2, 8000);
        window.addEventListener('scroll', () => { if (window.scrollY > 150) phase2(); });

        function loop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (phase === 2 && pileOpacity > 0) pileOpacity -= 0.005;
            if (pileOpacity > 0) { ctx.globalAlpha = pileOpacity; ctx.drawImage(pileCanvas, 0, 0); }
            ctx.globalAlpha = 1;
            for (let i = petals.length - 1; i >= 0; i--) {
                petals[i].update(i);
                if (petals[i]) petals[i].draw();
            }
            requestAnimationFrame(loop);
        }
        loop();
    }


    /* ══════════════════════════════════════════════
       RSVP — CONFETTI BURST
    ══════════════════════════════════════════════ */
    const btnAccept      = document.getElementById('btn_accept');
    const confettiCanvas = document.getElementById('confetti_canvas');

    if (btnAccept && confettiCanvas) {
        const cCtx   = confettiCanvas.getContext('2d');
        const colors = ['#b56a7f','#e8c872','#faeaed','#d4849a','#ffffff','#f0e6e8','#ff9eb5'];
        let particles = [], running = false;

        function burst() {
            confettiCanvas.width  = confettiCanvas.offsetWidth;
            confettiCanvas.height = confettiCanvas.offsetHeight;
            particles = [];
            for (let i = 0; i < 130; i++) {
                particles.push({
                    x: confettiCanvas.width / 2, y: confettiCanvas.height / 2,
                    vx: (Math.random() - 0.5) * 14, vy: (Math.random() - 0.95) * 15,
                    gravity: 0.38, size: 4 + Math.random() * 8,
                    color: colors[~~(Math.random() * colors.length)],
                    shape: ['circle','rect','heart'][~~(Math.random() * 3)],
                    rot: Math.random() * Math.PI * 2, rotSpeed: (Math.random() - 0.5) * 0.22,
                    alpha: 1, decay: 0.012 + Math.random() * 0.008,
                });
            }
            if (!running) { running = true; drawConfetti(); }
        }

        function drawHeart(c, x, y, s) {
            c.beginPath();
            c.moveTo(x, y+s/4);
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
                        cCtx.beginPath(); cCtx.arc(0,0,p.size/2,0,Math.PI*2); cCtx.fill();
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


    /* ══════════════════════════════════════════════
       RSVP FORM SUBMIT
    ══════════════════════════════════════════════ */
    const rsvpForm = document.getElementById('rsvp_form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', e => {
            e.preventDefault();
            const btn  = rsvpForm.querySelector('.rsvp_submit_btn');
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


    /* ══════════════════════════════════════════════
       FOOTER — FLOATING HEARTS
    ══════════════════════════════════════════════ */
    const footerWrap = document.getElementById('footer_hearts');
    if (footerWrap) {
        ['♥','❤','♡'].forEach(char => {
            for (let i = 0; i < 4; i++) {
                const h = document.createElement('span');
                h.className = 'footer_heart';
                h.textContent = char;
                h.style.cssText = `
                    left:${Math.random() * 100}%;
                    font-size:${0.7 + Math.random()}rem;
                    animation-duration:${3 + Math.random() * 4}s;
                    animation-delay:${Math.random() * 5}s;
                `;
                footerWrap.appendChild(h);
            }
        });
    }

});