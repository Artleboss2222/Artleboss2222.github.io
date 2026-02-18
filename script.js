/**
 * script.js - Logique UI & Carrousel pour Plomberie St-Mars
 * Auteur: Site Web Coder
 */

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Initialisation Smooth Scroll (Lenis) ---
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- Mise à jour de l'année au footer ---
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- Données des Avis Clients ---
    const reviewsData = [
        { name: "Sanie Varela", date: "il y a 2 mois", text: "Ils font preuve de compétences et de ponctualité, avec des prix justes! Recommandé à 100%", badges: ["5 avis"] },
        { name: "Fabio Mikio", date: "il y a 11 mois", text: "Very friendly and very professional 👏 Will be doing my future plumbing needs with them 100%", badges: ["Local Guide", "6 avis"] },
        { name: "Yvan Blais", date: "il y a 2 ans", text: "They deserve 10 stars! Marc-André took time out of his lunch hour to come and fix my leaky kitchen faucets. Can't ask for better service!", badges: ["2 avis"] },
        { name: "A. P.", date: "il y a 7 ans", text: "Monsieur Martin est un plombier très professionnel. Il prend le temps de bien écouter les besoins de la clientèle.", badges: ["12 avis"] },
        { name: "A. Klein", date: "il y a 2 ans", text: "I expected a 500$ bill and paid just over 150$ for 90min of work. Extremely kind people. Je suis tellement reconnaissante 💛 !", badges: ["Local Guide", "30 avis"] },
        { name: "Ali Reza", date: "il y a 8 ans", text: "Service courtois, prix très raisonnable. Martin connaît très bien son métier et propose la solution la plus économique.", badges: ["Local Guide", "38 avis"] }
    ];

    const track = document.getElementById('reviews-track');

    // Génération dynamique des cartes d'avis
    if (track) {
        reviewsData.forEach(review => {
            const card = document.createElement('div');
            card.className = 'review-card';
            const badgesHtml = review.badges.map(b => `<span>${b}</span>`).join('');
            
            card.innerHTML = `
                <div class="reviewer-meta">
                    <div class="reviewer-info">
                        <h4>${review.name}</h4>
                        <div class="badges">${badgesHtml}</div>
                    </div>
                    <div class="stars">★★★★★</div>
                </div>
                <p class="review-text">"${review.text}"</p>
                <span class="review-date">${review.date}</span>
            `;
            track.appendChild(card);
        });
    }

    // --- Logique du Carrousel (GSAP) ---
    let scrollAmount = 0;
    const cardWidth = 432; // Largeur estimée carte + gap
    
    const btnNext = document.querySelector('.nav-next');
    const btnPrev = document.querySelector('.nav-prev');

    if (btnNext && btnPrev) {
        btnNext.addEventListener('click', () => {
            const max = track.scrollWidth - track.offsetWidth;
            scrollAmount = Math.min(scrollAmount + cardWidth, max);
            gsap.to(track, { x: -scrollAmount, duration: 0.8, ease: "power3.out" });
        });

        btnPrev.addEventListener('click', () => {
            scrollAmount = Math.max(scrollAmount - cardWidth, 0);
            gsap.to(track, { x: -scrollAmount, duration: 0.8, ease: "power3.out" });
        });
    }

    // --- Animations Hero (Reveal) ---
    const heroTl = gsap.timeline();
    heroTl.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    })
    .from(".reveal-sub", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8")
    .from(".reveal-btn", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6");

    // --- Gestion de la Navigation au Scroll ---
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });

    // --- Animation des Bento Cards & Elements Fade ---
    gsap.utils.toArray('.animate-card').forEach(card => {
        gsap.fromTo(card, 
            { scale: 0.8, opacity: 0, y: 50 },
            {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play reverse play reverse"
                }
            }
        );
    });

    gsap.utils.toArray('.animate-fade').forEach(el => {
        gsap.fromTo(el, 
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play reverse play reverse"
                }
            }
        );
    });

    // --- Effet Magnétique (Desktop uniquement) ---
    const magneticBtns = document.querySelectorAll('.magnetic');
    if (window.innerWidth > 992) {
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
    }

    // --- Compteurs de Statistiques ---
    const statNums = document.querySelectorAll('.stat-num');
    statNums.forEach(num => {
        const target = +num.getAttribute('data-target');
        if (target) {
            ScrollTrigger.create({
                trigger: num,
                start: "top 90%",
                onEnter: () => {
                    let obj = { val: 0 };
                    gsap.to(obj, {
                        val: target,
                        duration: 2,
                        ease: "power3.out",
                        onUpdate: () => num.textContent = Math.ceil(obj.val)
                    });
                }
            });
        }
    });
});