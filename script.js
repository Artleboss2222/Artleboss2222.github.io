document.addEventListener('DOMContentLoaded', () => {
    // Mise à jour de l'année dans le footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Effet de la Navbar au scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.toggle('nav-scrolled', window.scrollY > 50);
        }
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
    if (typeof ScrollTrigger !== 'undefined') {
        document.querySelectorAll('.stat-num').forEach(num => {
            const target = +num.getAttribute('data-target');
            if (target) {
                ScrollTrigger.create({
                    trigger: num, 
                    start: "top 95%",
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
    }

    // --- SYSTÈME DE PREFETCH ADAPTATIF ---
    initPrefetching();
});

/**
 * Initialise le préchargement des pages pour une navigation instantanée
 * Fonctionne par survol sur PC et par toucher initial sur Mobile
 */
function initPrefetching() {
    // On cible tous les liens internes (ceux qui finissent par .html ou les boutons de navigation)
    const links = document.querySelectorAll('a[href$=".html"], .prefetch-link');
    
    links.forEach(link => {
        // Pour PC : On précharge quand la souris survole le lien
        link.addEventListener('mouseenter', prefetchAction, { once: true });
        
        // Pour Mobile : On précharge dès que le doigt touche l'écran (touchstart)
        // Cela gagne environ 100ms à 300ms de latence par rapport au "click"
        link.addEventListener('touchstart', prefetchAction, { once: true, passive: true });
    });
}

/**
 * Action de préchargement
 */
function prefetchAction() {
    const url = this.getAttribute('href');
    
    // Vérifie si l'URL est valide et n'a pas déjà été préchargée
    if (url && url !== '#' && !document.querySelector(`link[href="${url}"]`)) {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = url;
        document.head.appendChild(prefetchLink);
        
        // Log discret pour le débogage en développement
        console.log(`[Prefetch] Chargement anticipé de : ${url}`);
    }
}

/**
 * Gestion des options du chatbot
 * @param {string} type - Le type d'option sélectionnée
 */
function handleOption(type) {
    const msgContainer = document.getElementById('chatbot-messages');
    if (!msgContainer) return;
    
    // Message de l'utilisateur
    const userMsg = document.createElement('p');
    userMsg.className = "user-msg-bubble"; // Utilise une classe CSS si possible
    userMsg.style.textAlign = "right";
    userMsg.style.margin = "10px 0";
    userMsg.style.fontSize = "0.85rem";
    userMsg.style.color = "#888";
    userMsg.textContent = type.toUpperCase();
    msgContainer.appendChild(userMsg);

    // Réponse de l'assistant
    const p = document.createElement('p');
    p.style.marginTop = "10px";
    p.style.color = "#0055ff";
    p.style.background = "rgba(0, 85, 255, 0.1)";
    p.style.padding = "12px";
    p.style.borderRadius = "12px";
    p.style.fontSize = "0.9rem";
    p.style.borderLeft = "3px solid #0055ff";
    
    if (type === 'urgence') {
        p.innerHTML = "🚨 <strong>Urgence :</strong> Appelez immédiatement le <strong>(514) 933-8411</strong>. Nous intervenons 24/7.";
    } else if (type === 'devis') {
        p.innerHTML = "📋 <strong>Devis :</strong> Un instant, nous vous redirigeons vers notre formulaire de soumission...";
        setTimeout(() => window.location.href = "booking.html", 1200);
    } else if (type === 'rdv') {
        p.innerHTML = "📅 <strong>RDV :</strong> Ouverture du calendrier de réservation en ligne...";
        setTimeout(() => window.location.href = "rendez-vous.html", 1200);
    } else {
        p.innerHTML = "Je traite votre demande, un instant...";
    }
    
    msgContainer.appendChild(p);
    msgContainer.scrollTop = msgContainer.scrollHeight;
}
