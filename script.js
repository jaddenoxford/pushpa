// script.js - Pushpa Interiors Empire Revamped

document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scrolling & Luxury Unboxing Transition for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const overlay = document.getElementById('unboxing-overlay');
            if (overlay) {
                // 1. Show the overlay and trigger the Gold Ribbon snap (0ms)
                overlay.classList.add('active', 'animating');

                // 2. Wait 400ms for Ribbon to snap
                setTimeout(() => {
                    // Instantly snap the page scroll behind the overlay mask
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerOffset = 80;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: 'instant' });
                    }

                    // 3. Trigger the Box Opening, Reveal Bubble, and Logo shrink (400ms -> 1200ms)
                    overlay.classList.add('opening');

                    // 4. Clean up after the 800ms reveal animation finishes
                    setTimeout(() => {
                        overlay.classList.remove('active', 'animating', 'opening');
                    }, 800);

                }, 400);
            } else {
                // Fallback smooth scroll if overlay breaks
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            }
        });
    });

    // Interactive Quote Form Logic
    const glassRadios = document.querySelectorAll('.glass-radio');
    glassRadios.forEach(radio => {
        radio.addEventListener('click', function () {
            // Remove active from peers in the same group
            const group = this.getAttribute('data-group');
            document.querySelectorAll(`.glass-radio[data-group="${group}"]`).forEach(el => {
                el.classList.remove('active');
            });
            // Add active to trigger the liquid gold fluid effect
            this.classList.add('active');
        });
    });

    const step1 = document.querySelector('.step-1');
    const step2 = document.querySelector('.step-2');
    const nextBtn = document.querySelector('.next-step-cta');
    const backBtn = document.querySelector('.back-step-cta');
    const quoteForm = document.getElementById('hero-quote-form');

    if (nextBtn && backBtn && step1 && step2) {
        nextBtn.addEventListener('click', () => {
            step1.classList.remove('active');
            step1.classList.add('slide-out');

            step2.classList.remove('slide-out');
            step2.classList.add('active');
        });

        backBtn.addEventListener('click', () => {
            step2.classList.remove('active');
            step2.classList.add('slide-out');

            step1.classList.remove('slide-out');
            step1.classList.add('active');
        });
    }

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Get data
            const name = document.getElementById('quote-name').value;
            const phone = document.getElementById('quote-phone').value;

            const selectedFloorplan = document.querySelector('.glass-radio[data-group="floorplan"].active span').innerText;
            const selectedPurpose = document.querySelector('.glass-radio[data-group="purpose"].active span').innerText;

            console.log(`Lead Captured: ${name}, ${phone}, ${selectedFloorplan}, ${selectedPurpose}`);

            alert(`Thank you, ${name}! Your request for a ${selectedFloorplan} (${selectedPurpose}) has been received. Our team will contact you shortly.`);

            quoteForm.reset();
            // Reset to step 1
            if (step2.classList.contains('active')) {
                backBtn.click();
            }
        });
    }

    // Sticky Header Effect
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(5, 5, 5, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
        } else {
            header.style.background = 'rgba(5, 5, 5, 0.8)';
            header.style.boxShadow = 'none';
        }
    });

    // Staggered Animation Logic for Solutions Grid
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const staggerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find all cards inside the intersecting grid
                const cards = entry.target.querySelectorAll('.solution-card');
                cards.forEach((card, index) => {
                    // Stagger delay: 0.05s per card
                    setTimeout(() => {
                        card.classList.add('active');
                    }, index * 50);
                });
                observer.unobserve(entry.target); // Only trigger once
            }
        });
    }, observerOptions);

    const staggerGrids = document.querySelectorAll('.reveal-stagger');
    staggerGrids.forEach(grid => staggerObserver.observe(grid));

    // Liquid Count-up Animation
    const counters = document.querySelectorAll('.counter');
    const countSpeed = 200; // Lower is faster

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    // Calculate increment based on target
                    const inc = target / countSpeed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 10);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter); // Only play once
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the card is visible

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        const darkIcon = themeBtn.querySelector('.dark-icon');
        const lightIcon = themeBtn.querySelector('.light-icon');
        
        // Initial Check
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-mode');
            darkIcon.style.display = 'none';
            lightIcon.style.display = 'block';
        }

        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            
            if (isLight) {
                localStorage.setItem('theme', 'light');
                darkIcon.style.display = 'none';
                lightIcon.style.display = 'block';
            } else {
                localStorage.setItem('theme', 'dark');
                darkIcon.style.display = 'block';
                lightIcon.style.display = 'none';
            }
        });
    }

});
