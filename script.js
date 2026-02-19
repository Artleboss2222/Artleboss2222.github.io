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
            { scale: 0.9, opacity: 0, y: 40 },
            {
                scale: 1, opacity: 1, y: 0,
                duration: 0.9, ease: "power3.out",
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

    // ────────────────────────────────────────────────
    // ── Carrousel INFINI avec flèches + drag + touch
    // ────────────────────────────────────────────────
    const track   = document.getElementById('bento-track');
    const btnPrev = document.querySelector('.nav-btn.prev');
    const btnNext = document.querySelector('.nav-btn.next');

    if (!track || !btnPrev || !btnNext) return;

    const CARD_GAP = 24;

    // 1. Cloner les cartes pour créer l'illusion d'infini
    //    On clone tout le contenu original avant ET après
    const originalItems = Array.from(track.children);
    const totalOriginal = originalItems.length;

    // Clone avant (à gauche) — pour pouvoir aller à gauche depuis le début
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.insertBefore(clone, track.firstChild);
    });

    // Clone après (à droite) — pour continuer à droite depuis la fin
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });

    // 2. Calculer la largeur d'une carte (toutes identiques maintenant)
    const getCardWidth = () => track.children[0].offsetWidth + CARD_GAP;

    // 3. Positionner le track au début du bloc "original" (après les clones gauche)
    //    = sauter totalOriginal cartes
    let currentX = 0;

    const jumpToOriginalStart = () => {
        currentX = totalOriginal * getCardWidth();
        gsap.set(track, { x: -currentX });
    };

    jumpToOriginalStart();

    // 4. Helpers : largeur totale d'un bloc (original seulement)
    const getBlockWidth = () => totalOriginal * getCardWidth();

    // 5. Fonction de déplacement avec recentrage silencieux (téléportation)
    const moveBy = (delta) => {
        currentX += delta;
        gsap.to(track, {
            x: -currentX,
            duration: 0.7,
            ease: "power3.inOut",
            onComplete: recenter
        });
    };

    // Recentrage : si on est trop à gauche ou trop à droite, on téléporte
    const recenter = () => {
        const blockW = getBlockWidth();
        // On est dans les clones de gauche → sauter vers les originaux
        if (currentX < blockW * 0.5) {
            currentX += blockW;
            gsap.set(track, { x: -currentX });
        }
        // On est dans les clones de droite → revenir vers les originaux
        if (currentX > blockW * 2.5) {
            currentX -= blockW;
            gsap.set(track, { x: -currentX });
        }
    };

    // 6. Boutons flèches
    btnNext.addEventListener('click', () => moveBy(getCardWidth()));
    btnPrev.addEventListener('click', () => moveBy(-getCardWidth()));

    // 7. Drag souris
    let isDragging   = false;
    let dragStartX   = 0;
    let dragStartScrollX = 0;

    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragStartX = e.clientX;
        dragStartScrollX = currentX;
        track.style.cursor = 'grabbing';
        gsap.killTweensOf(track);
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const delta = dragStartX - e.clientX;
        currentX = dragStartScrollX + delta;
        gsap.set(track, { x: -currentX });
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = 'grab';
        recenter();
    });

    // 8. Touch / swipe
    let touchStartX = 0;
    let touchStartScrollX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartScrollX = currentX;
        gsap.killTweensOf(track);
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        const delta = touchStartX - e.touches[0].clientX;
        currentX = touchStartScrollX + delta;
        gsap.set(track, { x: -currentX });
    }, { passive: true });

    track.addEventListener('touchend', () => {
        recenter();
    });

    // 9. Curseur grab par défaut
    track.style.cursor = 'grab';

    // 10. Recalculer si la fenêtre est redimensionnée
    window.addEventListener('resize', () => {
        jumpToOriginalStart();
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const toiletButton = document.getElementById('toilet-button');
    const optionsWindow = document.getElementById('chatbot-options');

    // Ouvrir/Fermer le menu au clic sur la toilette
    toiletButton.addEventListener('click', () => {
        optionsWindow.classList.toggle('hidden');
    });

    // Fermer si on clique ailleurs sur la page
    document.addEventListener('click', (event) => {
        if (!document.getElementById('toilet-chatbot-container').contains(event.target)) {
            optionsWindow.classList.add('hidden');
        }
    });
});

// Fonction pour gérer les choix
function handleOption(type) {
    switch(type) {
        case 'urgence':
            alert("Appelez immédiatement le  (514) 933-8411!");
            break;
        case 'devis':
            window.location.href = "/booking.html"; // Redirection vers ton formulaire
            break;
        case 'rdv':
            alert("Redirection vers le calendrier de réservation...");
            break;
        case 'contact':
            alert("Laissez votre numéro, on vous rappelle !");
            break;
    }
}
