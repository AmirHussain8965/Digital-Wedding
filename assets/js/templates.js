document.addEventListener("DOMContentLoaded", function () {
    // Scroll to top on refresh/load to ensure user starts at the locked hero section
    window.scrollTo(0, 0);

    // Initialize AOS Animation library
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            offset: 100,
            duration: 800,
            easing: 'ease-out-cubic',
        });
    }

    // Smooth scroll / Reveal transition for clicking anywhere on the intro section
    const state1 = document.getElementById('tpl1_hero_state1');
    const heroSection = document.getElementById('hero_section');
    const state2 = document.getElementById('tpl1_hero_state2');
    const coupleVideo = document.getElementById('tpl1_couple_video');

    if (state1 && heroSection) {
        state1.addEventListener('click', function (e) {
            e.preventDefault();
            
            // 1. Make state 2 container display flex so it can transition in
            if (state2) {
                state2.style.display = 'flex';
            }
            
            // 2. Play the background couple video
            if (coupleVideo) {
                coupleVideo.play().catch(err => {
                    console.log("Video auto play prevented, playing on tap:", err);
                });
            }
            
            // 3. Add revealed class to start CSS transitions
            setTimeout(() => {
                heroSection.classList.add('tpl1_revealed');
            }, 50);
            
            // 4. Hide state 1 after transition finishes to optimize performance
            setTimeout(() => {
                state1.style.display = 'none';
            }, 1300);

            // 5. Remove scroll-lock classes once typography animations complete (2.5 seconds)
            setTimeout(() => {
                document.body.classList.remove('tpl1_scroll_locked');
                document.documentElement.classList.remove('tpl1_scroll_locked');
            }, 2500);
        });
    }

    // Scroll down for State 2 indicator button
    const scrollBtn = document.querySelector('.tpl1_scroll_btn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector('#countdown_section');
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Initialize Template 1 Swiper Galleries (Welcome & Lockets)
    const gallerySwipers = document.querySelectorAll('.tpl1_gallery_swiper');
    if (gallerySwipers.length > 0) {
        gallerySwipers.forEach(swiperEl => {
            new Swiper(swiperEl, {
                loop: true,
                speed: 800, // Speed of sliding transition
                autoplay: {
                    delay: 3000, // Slide changes every 3 seconds
                    disableOnInteraction: false,
                },
                slidesPerView: 1.5, // Show 1.5 slides on mobile (cut off second slide on the right)
                spaceBetween: 15, // Margin between slides on mobile
                breakpoints: {
                    768: {
                        slidesPerView: 2.5, // Show 2.5 slides on desktop (cut off third slide on the right)
                        spaceBetween: 25, // Margin between slides on desktop
                    }
                },
                pagination: {
                    el: swiperEl.querySelector('.swiper-pagination'),
                    clickable: true,
                },
            });
        });
    }

    // Optional: Dummy countdown timer logic (to make it look active)
    const timerDays = document.getElementById('timer_days');
    const timerHours = document.getElementById('timer_hours');
    const timerMinutes = document.getElementById('timer_minutes');

    if (timerDays && timerHours && timerMinutes) {
        // Set dummy target date to a few days ahead
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 135);
        targetDate.setHours(targetDate.getHours() + 1);

        function updateTimer() {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance < 0) return;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            timerDays.textContent = String(days).padStart(3, '0');
            timerHours.textContent = String(hours).padStart(2, '0');
            timerMinutes.textContent = String(minutes).padStart(2, '0');
        }

        // Update every minute
        setInterval(updateTimer, 60000);
        updateTimer();
    }

    // Day Programme Timeline Animation
    const timelineWrapper = document.getElementById('tpl1_timeline');
    const timelineItems = document.querySelectorAll('.tpl1_timeline_item');

    if (timelineWrapper && timelineItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger the vertical line drawing
                    timelineWrapper.classList.add('draw-line');

                    // Stagger the fade-in of the timeline items
                    timelineItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, 500 * (index + 1)); // 500ms delay between each step
                    });

                    // Unobserve after animating once
                    observer.unobserve(timelineWrapper);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(timelineWrapper);
    }

    // RSVP Guest Counter Logic
    const btnMinus = document.querySelector('.tpl1_counter_minus');
    const btnPlus = document.querySelector('.tpl1_counter_plus');
    const counterInput = document.querySelector('.tpl1_counter_val');

    if (btnMinus && btnPlus && counterInput) {
        btnMinus.addEventListener('click', function () {
            let val = parseInt(counterInput.value) || 1;
            if (val > 1) {
                counterInput.value = val - 1;
            }
        });

        btnPlus.addEventListener('click', function () {
            let val = parseInt(counterInput.value) || 1;
            if (val < parseInt(counterInput.max)) {
                counterInput.value = val + 1;
            }
        });
    }

    // Prevent RSVP form submission (since it's a static template)
    const rsvpForm = document.querySelector('.tpl1_rsvp_form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert("This is a static template. RSVP functionality will be connected later!");
        });
    }
    // ==========================================
    // TEMPLATE 2 LOGIC
    // ==========================================

    // Envelope Animation Logic
    const envelopeContainer = document.getElementById('tpl2_envelope_container');
    const envelopeOverlay = document.getElementById('tpl2_envelope');

    if (envelopeContainer && envelopeOverlay) {
        // Open the envelope when tapped
        envelopeContainer.addEventListener('click', function () {
            // 1. Open the flap (1.2s CSS transition)
            this.classList.add('open');

            // 2. Wait for flap to finish opening, then slide the whole envelope down
            setTimeout(() => {
                this.classList.add('slide-down');

                // Trigger hero section animations as the envelope starts sliding down
                const tpl2HeroSection = document.getElementById('hero_section');
                if (tpl2HeroSection) {
                    tpl2HeroSection.classList.add('tpl2_hero_animate');
                }

                // 3. Hide the whole overlay after slide down animation completes (1.2s CSS transition)
                setTimeout(() => {
                    envelopeOverlay.classList.add('hide');

                    // 4. Remove from DOM completely after hide animation completes
                    setTimeout(() => {
                        envelopeOverlay.style.display = 'none';
                    }, 1000);
                }, 1300);
            }, 1300);

            // 5. Remove scroll-lock classes once typography animations complete (4.8 seconds)
            setTimeout(() => {
                document.body.classList.remove('tpl2_scroll_locked');
                document.documentElement.classList.remove('tpl2_scroll_locked');
            }, 4800);
        });
    }

    // Scroll down for Template 2 indicator button
    const tpl2ScrollBtn = document.querySelector('.tpl2_scroll_btn');
    if (tpl2ScrollBtn) {
        tpl2ScrollBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector('#countdown_section');
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Template 2 Countdown Timer
    const tpl2TimerDays = document.getElementById('tpl2_timer_days');
    const tpl2TimerHours = document.getElementById('tpl2_timer_hours');
    const tpl2TimerMins = document.getElementById('tpl2_timer_mins');
    const tpl2TimerSecs = document.getElementById('tpl2_timer_secs');

    if (tpl2TimerDays && tpl2TimerHours && tpl2TimerMins && tpl2TimerSecs) {
        // Set dummy target date for Template 2
        const targetDate2 = new Date();
        targetDate2.setDate(targetDate2.getDate() + 501);
        targetDate2.setHours(targetDate2.getHours() + 6);
        targetDate2.setMinutes(targetDate2.getMinutes() + 49);
        targetDate2.setSeconds(targetDate2.getSeconds() + 31);

        function updateTimer2() {
            const now = new Date().getTime();
            const distance = targetDate2.getTime() - now;

            if (distance < 0) return;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            tpl2TimerDays.textContent = String(days).padStart(3, '0');
            tpl2TimerHours.textContent = String(hours).padStart(2, '0');
            tpl2TimerMins.textContent = String(minutes).padStart(2, '0');
            tpl2TimerSecs.textContent = String(seconds).padStart(2, '0');
        }

        // Update every second for template 2
        setInterval(updateTimer2, 1000);
        updateTimer2();
    }

    // Template 2 Accordion Logic
    const tpl2Accordions = document.querySelectorAll('.tpl2_accordion_btn');
    if (tpl2Accordions.length > 0) {
        tpl2Accordions.forEach(btn => {
            btn.addEventListener('click', function () {
                this.classList.toggle('active');
                const content = this.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    content.style.paddingTop = '0';
                    content.style.paddingBottom = '0';
                } else {
                    content.style.maxHeight = content.scrollHeight + 30 + "px"; // Add some buffer for padding
                    content.style.paddingTop = '15px';
                    content.style.paddingBottom = '15px';
                }
            });
        });
    }

    // Template 2 RSVP Logic
    const tpl2AddAdultBtn = document.getElementById('tpl2_add_adult');
    const tpl2AddChildBtn = document.getElementById('tpl2_add_child');
    const tpl2AdultsList = document.getElementById('tpl2_adults_list');
    const tpl2ChildrenList = document.getElementById('tpl2_children_list');

    let tpl2AdultCount = 0;
    let tpl2ChildCount = 0;

    if (tpl2AddAdultBtn && tpl2AdultsList) {
        tpl2AddAdultBtn.addEventListener('click', () => {
            tpl2AdultCount++;
            const adultDiv = document.createElement('div');
            adultDiv.className = 'd-flex align-items-center mb-2 animate_fade_in_up';
            adultDiv.innerHTML = `
                <input type="text" class="form-control tpl2_form_input tpl1_serif me-2" placeholder="Adult ${tpl2AdultCount} Name">
                <button type="button" class="btn btn-sm text-danger remove-adult"><i class="bi bi-x-circle"></i></button>
            `;

            adultDiv.querySelector('.remove-adult').addEventListener('click', () => {
                adultDiv.remove();
                tpl2AdultCount--;
            });

            tpl2AdultsList.appendChild(adultDiv);
        });
    }

    if (tpl2AddChildBtn && tpl2ChildrenList) {
        tpl2AddChildBtn.addEventListener('click', () => {
            tpl2ChildCount++;
            const childDiv = document.createElement('div');
            childDiv.className = 'd-flex align-items-center mb-2 animate_fade_in_up';
            childDiv.innerHTML = `
                <input type="text" class="form-control tpl2_form_input tpl1_serif me-2" placeholder="Child ${tpl2ChildCount} Name/Age">
                <button type="button" class="btn btn-sm text-danger remove-child"><i class="bi bi-x-circle"></i></button>
            `;

            childDiv.querySelector('.remove-child').addEventListener('click', () => {
                childDiv.remove();
                tpl2ChildCount--;
            });

            tpl2ChildrenList.appendChild(childDiv);
        });
    }

    // ==================== TEMPLATE 3 LOGIC ====================
    // Envelope Animation Logic
    const tpl3EnvelopeContainer = document.getElementById('tpl3_envelope_container');
    const tpl3EnvelopeOverlay = document.querySelector('.tpl3_envelope_overlay');
    
    if (tpl3EnvelopeContainer && tpl3EnvelopeOverlay) {
        // Open the envelope when tapped
        tpl3EnvelopeContainer.addEventListener('click', function() {
            // 1. Open the flap (1.2s CSS transition)
            this.classList.add('open');
            
            // 2. Wait for flap to finish opening, then slide the whole envelope down
            setTimeout(() => {
                this.classList.add('slide-down');
                
                // Trigger hero section animations as the envelope starts sliding down
                const tpl3HeroSection = document.getElementById('hero_section');
                if (tpl3HeroSection) {
                    tpl3HeroSection.classList.add('tpl3_hero_animate');
                }
                
                // 3. Hide the whole overlay after slide down animation completes (1.2s CSS transition)
                setTimeout(() => {
                    tpl3EnvelopeOverlay.classList.add('hide');
                    
                    // 4. Remove from DOM completely after hide animation completes
                    setTimeout(() => {
                        tpl3EnvelopeOverlay.style.display = 'none';
                    }, 300);
                }, 1200);
            }, 1300);

            // 5. Remove scroll-lock classes once typography animations complete (4.0 seconds)
            setTimeout(() => {
                document.body.classList.remove('tpl3_scroll_locked');
                document.documentElement.classList.remove('tpl3_scroll_locked');
            }, 4000);
        });
    }

    // Template 3 Countdown Timer
    const tpl3TimerDays = document.getElementById('tpl3_timer_days');
    const tpl3TimerHours = document.getElementById('tpl3_timer_hours');
    const tpl3TimerMins = document.getElementById('tpl3_timer_mins');
    const tpl3TimerSecs = document.getElementById('tpl3_timer_secs');

    if (tpl3TimerDays && tpl3TimerHours && tpl3TimerMins && tpl3TimerSecs) {
        // Set dummy target date for Template 3
        const targetDate3 = new Date();
        targetDate3.setDate(targetDate3.getDate() + 129);
        targetDate3.setHours(targetDate3.getHours() + 5);
        targetDate3.setMinutes(targetDate3.getMinutes() + 32);
        targetDate3.setSeconds(targetDate3.getSeconds() + 56);

        function updateTimer3() {
            const now = new Date().getTime();
            const distance = targetDate3.getTime() - now;

            if (distance < 0) return;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            tpl3TimerDays.textContent = String(days).padStart(3, '0');
            tpl3TimerHours.textContent = String(hours).padStart(2, '0');
            tpl3TimerMins.textContent = String(minutes).padStart(2, '0');
            tpl3TimerSecs.textContent = String(seconds).padStart(2, '0');
        }

        // Update every second for template 3
        setInterval(updateTimer3, 1000);
        updateTimer3();
    }

    // Template 3 Accordion Logic
    const tpl3Accordions = document.querySelectorAll('.tpl3_accordion_btn');
    if (tpl3Accordions.length > 0) {
        tpl3Accordions.forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.toggle('active');
                const content = this.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    content.style.paddingTop = '0';
                    content.style.paddingBottom = '0';
                } else {
                    content.style.maxHeight = content.scrollHeight + 30 + "px"; // Add some buffer for padding
                    content.style.paddingTop = '15px';
                    content.style.paddingBottom = '15px';
                }
            });
        });
    }

    // Template 3 RSVP Form Submission
    const tpl3RsvpForm = document.getElementById('tpl3_rsvp_form');
    if (tpl3RsvpForm) {
        tpl3RsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('.tpl3_submit_btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
            
            // Simulate network request
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check me-2"></i> Confirmed!';
                submitBtn.style.backgroundColor = '#27ae60'; // Success green
                
                // Reset form
                setTimeout(() => {
                    tpl3RsvpForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }

});
