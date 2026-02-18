/**
 * script.js - Logique Complète Plomberie St-Mars
 * Inclut: Lenis Scroll, Animations GSAP, Effet Magnétique, Carrousel Infini
 */

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialisation du Smooth Scroll (Lenis)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Mise à jour automatique de l'année
    document.getElementById('year').textContent = new Date().getFullYear();

    // 3. Données des Avis Clients (Injectées)
    const reviewsData = [
        { name: "Sanie Varela", date: "il y a 2 mois", text: "Compétences et ponctualité, avec des prix justes! Recommandé à 100%", badges: ["5 avis"] },
        { name: "Fabio Mikio", date: "il y a 11 mois", text: "Very friendly and very professional 👏 Will be doing my future plumbing needs with them 100%", badges: ["Local Guide"] },
        { name: "Yvan Blais", date: "il y a 2 ans", text: "They deserve 10 stars! Marc-André took time out of his lunch hour to fix my leaky faucets.", badges: ["2 avis"] },
        { name: "A. P.", date: "il y a 7 ans", text: "Monsieur Martin est un plombier très professionnel. Il prend le temps de bien écouter.", badges: ["12 avis"] },
        { name: "A. Klein", date: "il y a 2 ans", text: "Extremely kind people. Je suis tellement reconnaissante 💛 !", badges: ["Local Guide"] },
        { name: "Ali Reza", date: "il y a 8 ans", text: "Martin connaît très bien son métier et propose la solution la plus économique.", badges: ["38 avis"] }
    ];

    // 4. Logique du Carrousel Infini
    const track = document.getElementById('reviews-track');
    
    if (track) {
        // Fonction pour créer une carte HTML
        const createCard = (review) => {
            const card = document.createElement('div');
            card.className = 'review-card';
            const badges = review.badges.map(b => `<span>${b}</span>`).join('');
            card.innerHTML = `
                <div class="reviewer-meta">
                    <div class="reviewer-info">
                        <h4>${review.name}</h4>
                        <div class="badges">${badges}</div>
                    </div>
                    <div class="stars">★★★★★</div>
                </div>
                <p class="review-text">"${review.text}"</p>
                <span class="review-date">${review.date}</span>
            `;
            return card;
        };

        // On clone les données 3 fois pour garantir assez de contenu pour le scroll infini
        const infiniteReviews = [...reviewsData, ...reviewsData, ...reviewsData];
        
        infiniteReviews.forEach(review => {
            track.appendChild(createCard(review));
        });

        // Calcul de la largeur d'un set de données (pour savoir quand boucler)
        // Note: On attend un peu que le DOM soit rendu pour calculer la largeur
        setTimeout(() => {
            const singleSetWidth = track.scrollWidth / 3;
            
            gsap.to(track, {
                x: -singleSetWidth,
                duration: 40, // Vitesse du défilement
                ease: "none",
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize(x => parseFloat(x) % singleSetWidth)
                }
            });
        }, 100);
    }

    // 5. Animations Hero (Reveal)
    const heroTl = gsap.timeline();
    heroTl.from(".reveal-text", { y: 100, opacity: 0, duration: 1.2, ease: "power4.out" })
          .from(".reveal-sub", { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
          .from(".reveal-btn", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

    // 6. Navigation au scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) nav.classList.add('nav-scrolled');
        else nav.classList.remove('nav-scrolled');
    });

    // 7. Animations au Scroll (Cards & Fade)
    gsap.utils.toArray('.animate-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1, // Léger délai en cascade
            ease: "power3.out"
        });
    });

    gsap.utils.toArray('.animate-fade').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });

    // 8. Effet Magnétique (Boutons)
    const magneticBtns = document.querySelectorAll('.magnetic');
    if (window.innerWidth > 992) {
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
            });
        });
    }
});