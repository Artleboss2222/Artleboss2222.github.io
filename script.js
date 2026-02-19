document.addEventListener('DOMContentLoaded', () => {
    // Mise à jour de l'année dans le footer
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
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            win.classList.toggle('hidden');
        });
    }

    // Fermer le chatbot si on clique ailleurs
    document.addEventListener('click', (e) => {
        if (win && !win.classList.contains('hidden') && !win.contains(e.target) && e.target !== btn) {
            win.classList.add('hidden');
        }
    });

    // Compteurs de statistiques avec GSAP et ScrollTrigger
    document.querySelectorAll('.stat-num').forEach(num => {
        const target = +num.getAttribute('data-target');
        if (target) {
            ScrollTrigger.create({
                trigger: num, 
                start: "top 95%",
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

    // Logique du Carrousel (Navigation des avis)
    const track = document.getElementById('bento-track');
    const btnNext = document.querySelector('.next');
    const btnPrev = document.querySelector('.prev');
    let offset = 0;
    const cardWidth = 474; // Largeur de la carte + gap

    if (track && btnNext && btnPrev) {
        btnNext.addEventListener('click', () => {
            const maxOffset = -(track.children.length - 1) * cardWidth;
            if (offset > maxOffset) {
                offset -= cardWidth;
            } else {
                offset = 0; // Retour au début
            }
            track.style.transform = `translateX(${offset}px)`;
        });

        btnPrev.addEventListener('click', () => {
            if (offset < 0) {
                offset += cardWidth;
            } else {
                const maxOffset = -(track.children.length - 1) * cardWidth;
                offset = maxOffset; // Aller à la fin
            }
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
    
    // Message de l'utilisateur (optionnel pour le visuel)
    const userMsg = document.createElement('p');
    userMsg.style.textAlign = "right";
    userMsg.style.margin = "10px 0";
    userMsg.style.fontSize = "0.85rem";
    userMsg.style.color = "#666";
    userMsg.textContent = type.toUpperCase();
    msgContainer.appendChild(userMsg);

    // Réponse de l'assistant
    const p = document.createElement('p');
    p.style.marginTop = "10px";
    p.style.color = "#0055ff";
    p.style.background = "#f0f7ff";
    p.style.padding = "12px";
    p.style.borderRadius = "8px";
    p.style.fontSize = "0.9rem";
    
    if (type === 'urgence') {
        p.innerHTML = "🚨 <strong>Urgence :</strong> Appelez immédiatement le <strong>(514) 933-8411</strong>. Nous intervenons 24/7.";
    } else if (type === 'devis') {
        p.innerHTML = "📋 <strong>Devis :</strong> Un instant, nous vous redirigeons vers notre formulaire en ligne...";
        setTimeout(() => window.location.href = "booking.html", 1500);
    } else {
        p.innerHTML = "📅 <strong>RDV :</strong> Quel moment vous conviendrait le mieux ? Appelez-nous ou remplissez le formulaire de demande.";
        setTimeout(() => window.location.href = "calendar.html", 1500);
    }
    
    msgContainer.appendChild(p);
    msgContainer.scrollTop = msgContainer.scrollHeight;
}
