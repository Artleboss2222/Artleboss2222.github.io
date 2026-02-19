document.addEventListener('DOMContentLoaded', () => {
    // Mise à jour de l'année
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Effet de la Navbar au scroll
    window.addEventListener('scroll', () => {
        document.querySelector('.navbar').classList.toggle('nav-scrolled', window.scrollY > 50);
    });

    // Toggle du Chatbot
    const btn = document.getElementById('toilet-button');
    const win = document.getElementById('chatbot-window');
    if (btn && win) {
        btn.addEventListener('click', () => win.classList.toggle('hidden'));
    }

    // Compteurs de statistiques avec GSAP et ScrollTrigger
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

    // Logique du Carrousel
    const track = document.getElementById('bento-track');
    const btnNext = document.querySelector('.next');
    const btnPrev = document.querySelector('.prev');
    let offset = 0;

    if (track && btnNext && btnPrev) {
        btnNext.addEventListener('click', () => {
            offset -= 474; // Largeur de la carte + gap
            // Réinitialisation si on arrive au bout (exemple simple)
            if (offset < -474) offset = 0;
            track.style.transform = `translateX(${offset}px)`;
        });

        btnPrev.addEventListener('click', () => {
            offset += 474;
            if (offset > 0) offset = -474;
            track.style.transform = `translateX(${offset}px)`;
        });
    }
});

/**
 * Gère les options rapides du chatbot
 * @param {string} type - Le type d'option sélectionnée
 */
function handleOption(type) {
    const msgContainer = document.getElementById('chatbot-messages');
    const p = document.createElement('p');
    p.style.marginTop = "15px";
    p.style.color = "#0055ff";
    p.style.background = "rgba(0, 85, 255, 0.1)";
    p.style.padding = "10px";
    p.style.borderRadius = "8px";
    
    if (type === 'urgence') {
        p.innerHTML = "Appelez immédiatement le <strong>(514) 933-8411</strong>.";
    } else if (type === 'devis') {
        p.innerHTML = "Nous vous redirigeons vers le formulaire de devis...";
        setTimeout(() => window.location.href = "booking.html", 1500);
    } else {
        p.innerHTML = "Traitement de votre demande de rendez-vous...";
    }
    
    msgContainer.appendChild(p);
    msgContainer.scrollTop = msgContainer.scrollHeight;
}
