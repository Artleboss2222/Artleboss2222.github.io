gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // ── Année footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // ── Hero animations
    const heroTl = gsap.timeline();
    heroTl
        .from(".reveal-text", { y: 100, opacity: 0, duration: 1.2, ease: "power4.out" })
        .from(".reveal-sub",  { y: 30,  opacity: 0, duration: 1,   ease: "power3.out" }, "-=0.8")
        .from(".reveal-btn",  { y: 20,  opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

    // ── Navbar scroll
    window.addEventListener('scroll', () => {
        document.querySelector('.navbar').classList.toggle('nav-scrolled', window.scrollY > 50);
    });

    // ── Cards scroll animation
    gsap.utils.toArray('.animate-card').forEach(card => {
        gsap.fromTo(card,
            { scale: 0.8, opacity: 0, y: 50 },
            {
                scale: 1, opacity: 1, y: 0,
                duration: 1, ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    end: "bottom 20%",
                    toggleActions: "play reverse play reverse"
                }
            }
        );
    });

    // ── Fade animations
    gsap.utils.toArray('.animate-fade').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0,
                duration: 1.5, ease: "expo.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play reverse play reverse"
                }
            }
        );
    });

    // ── Magnetic button
    const magneticBtn = document.querySelector('.magnetic');
    if (magneticBtn && window.innerWidth > 992) {
        magneticBtn.addEventListener('mousemove', (e) => {
            const rect = magneticBtn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(magneticBtn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" });
        });
        magneticBtn.addEventListener('mouseleave', () => {
            gsap.to(magneticBtn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
        });
    }

    // ── Compteurs stats
    document.querySelectorAll('.stat-num').forEach(num => {
        const target = +num.getAttribute('data-target');
        if (target) {
            ScrollTrigger.create({
                trigger: num,
                start: "top 90%",
                onEnter: () => {
                    let obj = { val: 0 };
                    gsap.to(obj, {
                        val: target, duration: 2, ease: "power3.out",
                        onUpdate: () => num.textContent = Math.ceil(obj.val)
                    });
                }
            });
        }
    });

    // ── Carrousel avec flèches
    const track     = document.getElementById('bento-track');
    const btnPrev   = document.querySelector('.nav-btn.prev');
    const btnNext   = document.querySelector('.nav-btn.next');

    if (!track || !btnPrev || !btnNext) return;

    const CARD_GAP   = 24;
    // Largeur de défilement = largeur de la première carte + gap
    const getStep = () => track.firstElementChild.offsetWidth + CARD_GAP;

    let currentX = 0;
    const getMaxX = () => track.scrollWidth - track.parentElement.offsetWidth;

    btnNext.addEventListener('click', () => {
        currentX = Math.min(currentX + getStep(), getMaxX());
        gsap.to(track, { x: -currentX, duration: 0.7, ease: "power3.inOut" });
    });

    btnPrev.addEventListener('click', () => {
        currentX = Math.max(currentX - getStep(), 0);
        gsap.to(track, { x: -currentX, duration: 0.7, ease: "power3.inOut" });
    });

    // Drag / swipe sur le carrousel
    let isDragging = false;
    let startX = 0;
    let startScrollX = 0;

    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startScrollX = currentX;
        track.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const delta = startX - e.clientX;
        currentX = Math.max(0, Math.min(startScrollX + delta, getMaxX()));
        gsap.to(track, { x: -currentX, duration: 0.1, ease: "none" });
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        track.style.cursor = 'grab';
    });

    // Touch support
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startScrollX = currentX;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        const delta = startX - e.touches[0].clientX;
        currentX = Math.max(0, Math.min(startScrollX + delta, getMaxX()));
        gsap.to(track, { x: -currentX, duration: 0.1, ease: "none" });
    }, { passive: true });

    track.style.cursor = 'grab';
});