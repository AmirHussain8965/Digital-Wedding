/* ==================== NAVBAR SCROLL ==================== */
const header = document.querySelector(".header_section");

window.addEventListener("scroll", function () {
    if (window.scrollY > 60) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


/* ==================== BACK TO TOP ==================== */
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});

backToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


/* ==================== TOAST ==================== */
function showToast(msg) {
    const toast = document.getElementById("toast_box");
    const toastMsg = document.getElementById("toast_msg");
    toastMsg.textContent = msg;
    toast.classList.add("show");
    setTimeout(function () {
        toast.classList.remove("show");
    }, 3500);
}

window.showToast = showToast;


/* ==================== SCROLL PROGRESS BAR ==================== */
const progressBar = document.createElement("div");
progressBar.id = "scroll_progress_bar";
progressBar.style.cssText =
    "position:fixed;top:0;left:0;height:3px;width:0%;" +
    "background:linear-gradient(90deg,#4B0F14,#C9A84C);" +
    "z-index:10000;transition:width 0.1s linear;pointer-events:none;";
document.body.prepend(progressBar);

window.addEventListener("scroll", function () {
    const scrollTop  = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight  = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPct  = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPct + "%";
});


/* ==================== LANGUAGE SWITCHER ==================== */
const langToggleBtn = document.getElementById("lang_toggle_btn");
const langDropdown  = document.getElementById("lang_dropdown");
const langArrow     = langToggleBtn ? langToggleBtn.querySelector(".lang_arrow") : null;
if (langToggleBtn) {
    langToggleBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        const isOpen = langDropdown.classList.toggle("open");
        if (langArrow) langArrow.classList.toggle("open", isOpen);
    });
}

/* Close on outside click */
document.addEventListener("click", function () {
    if (langDropdown && langDropdown.classList.contains("open")) {
        langDropdown.classList.remove("open");
        if (langArrow) langArrow.classList.remove("open");
    }
});

/* Language option select: handled in assets/js/languages.js (localStorage + i18n) */


/* ==================== ACTIVE NAV LINK ON SCROLL ==================== */
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", function () {
    const scrollY = window.pageYOffset;

    sections.forEach(function (section) {
        const sectionHeight = section.offsetHeight;
        const sectionTop    = section.offsetTop - 100;
        const sectionId     = section.getAttribute("id");
        const navLink       = document.querySelector(".nav-link[href='#" + sectionId + "']");

        if (navLink) {
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLink.classList.add("active");
            } else {
                navLink.classList.remove("active");
            }
        }
    });
});


/* ==================== TEMPLATE DEMO BUTTON ==================== */
const templateDemoBtns = document.querySelectorAll(".template_demo_btn");

templateDemoBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
        var msg =
            window.EternallyI18n && typeof window.EternallyI18n.toastDemoOpening === "function"
                ? window.EternallyI18n.toastDemoOpening()
                : "Demo opening soon!";
        showToast(msg);
    });
});


/* ==================== HERO INVITATION CARD ENTRANCE ==================== */
window.addEventListener("load", function () {
    const inviteCard = document.querySelector(".invite_card");
    if (inviteCard) {
        inviteCard.style.opacity = "0";
        inviteCard.style.transform = "translateY(20px)";
        inviteCard.style.transition = "opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s";
        setTimeout(function () {
            inviteCard.style.opacity = "1";
            inviteCard.style.transform = "translateY(0)";
        }, 200);
    }
});


/* ==================== COUNTER ANIMATION (Stats) ==================== */
function animateCounter(el) {
    const target = parseFloat(el.getAttribute("data-target"));
    const isDecimal = el.getAttribute("data-target").includes(".");
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1800;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = target * ease;
        el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

/* Trigger counters when stats row enters viewport */
const statsRow = document.querySelector(".testi_stats_row");
if (statsRow) {
    const statNums = statsRow.querySelectorAll(".stat_num");
    /* Assign data-targets based on text */
    const targetMap = {
        "10,000+": { target: "10000", suffix: "+" },
        "50,000+": { target: "50000", suffix: "+" },
        "4.9/5":   { target: "4.9",   suffix: "/5" },
        "12+":     { target: "12",    suffix: "+" }
    };

    statNums.forEach(function (el) {
        const original = el.textContent.trim();
        const map = targetMap[original];
        if (map) {
            el.setAttribute("data-target", map.target);
            el.setAttribute("data-suffix", map.suffix);
            el.textContent = "0" + map.suffix;
        }
    });

    let triggered = false;
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !triggered) {
                triggered = true;
                statNums.forEach(function (el) {
                    if (el.getAttribute("data-target")) animateCounter(el);
                });
            }
        });
    }, { threshold: 0.4 });
    observer.observe(statsRow);
}


/* ==================== PRICING CARD HIGHLIGHT ==================== */
const pricingCards = document.querySelectorAll(".pricing_card");
pricingCards.forEach(function (card) {
    card.addEventListener("mouseenter", function () {
        pricingCards.forEach(function (c) { c.style.opacity = "0.75"; });
        card.style.opacity = "1";
    });
    card.addEventListener("mouseleave", function () {
        pricingCards.forEach(function (c) { c.style.opacity = "1"; });
    });
});


/* ==================== ELEGANT WEDDING CANVAS ANIMATION ==================== */
(function () {
    const canvas = document.getElementById("animation_canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let backgroundHearts = [];
    let interactiveHearts = [];

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const headerColor = '#5d1a24';

    /* --- Interaction Listeners --- */
    if (!isTouchDevice) {
        window.addEventListener("mousemove", function (event) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            if (Math.random() > 0.4) {
                interactiveHearts.push(new InteractiveHeart(mouseX, mouseY));
            }
        });
    } else {
        window.addEventListener("touchstart", function (event) {
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

    /* --- Canvas Sizing --- */
    function resizeCanvas() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }
    window.addEventListener("resize", resizeCanvas);
    setTimeout(resizeCanvas, 100);

    /* --- Heart Drawing Helper --- */
    function drawHeart(ctx, x, y, width, height, color, opacity) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, opacity);
        ctx.fillStyle = color;
        ctx.beginPath();
        const topCurveHeight = height * 0.3;
        ctx.moveTo(x, y + topCurveHeight);
        ctx.bezierCurveTo(x, y, x - width / 2, y, x - width / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x - width / 2, y + (height + topCurveHeight) / 2, x, y + (height + topCurveHeight) / 2, x, y + height);
        ctx.bezierCurveTo(x, y + (height + topCurveHeight) / 2, x + width / 2, y + (height + topCurveHeight) / 2, x + width / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x + width / 2, y, x, y, x, y + topCurveHeight);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    /* --- Background Hearts --- */
    function BackgroundHeart() {
        this.x       = Math.random() * canvas.width;
        this.y       = Math.random() * canvas.height;
        this.size    = Math.random() * 12 + 8;
        this.speedX  = Math.random() * 0.4 - 0.2;
        this.speedY  = Math.random() * -0.4 - 0.2;
        this.color   = headerColor;
        this.opacity = Math.random() * 0.2 + 0.05;
    }
    BackgroundHeart.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y < -this.size)                this.y = canvas.height + this.size;
        if (this.x > canvas.width + this.size)  this.x = -this.size;
        if (this.x < -this.size)                this.x = canvas.width + this.size;
    };
    BackgroundHeart.prototype.draw = function () {
        drawHeart(ctx, this.x, this.y, this.size, this.size, this.color, this.opacity);
    };

    /* --- Interactive Hearts --- */
    function InteractiveHeart(x, y) {
        this.x      = x;
        this.y      = y;
        this.size   = Math.random() * 8 + 6;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1.5;
        this.color  = headerColor;
        this.opacity = 0.6;
        this.life   = 1;
        this.decay  = Math.random() * 0.02 + 0.015;
    }
    InteractiveHeart.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life    -= this.decay;
        this.opacity  = Math.max(0, this.life * 0.6);
    };
    InteractiveHeart.prototype.draw = function () {
        drawHeart(ctx, this.x, this.y, this.size, this.size, this.color, this.opacity);
    };

    /* --- Init & Animate --- */
    function initParticles() {
        backgroundHearts = [];
        const count = Math.floor(canvas.width * 0.08);
        for (let i = 0; i < count; i++) {
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
}());