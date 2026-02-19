gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mise à jour de l'année
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // 2. Animations Hero
    const heroTl = gsap.timeline();
    heroTl.from(".reveal-text", { y: 100, opacity: 0, duration: 1.2, ease: "power4.out" })
          .from(".reveal-sub", { y: 30, opacity: 0, duration: 1 }, "-=0.8");

    // 3. Navbar change au scroll
    window.addEventListener('scroll', () => {
        document.querySelector('.navbar').classList.toggle('nav-scrolled', window.scrollY > 50);
    });

    // 4. Chatbot Toggle (Correction ID)
    const toiletButton = document.getElementById('toilet-button');
    const chatbotWindow = document.getElementById('chatbot-window');

    if (toiletButton && chatbotWindow) {
        toiletButton.addEventListener('click', (e) => {
            e.stopPropagation();
            chatbotWindow.classList.toggle('hidden');
        });
    }

    // Fermer le chatbot si clic extérieur
    document.addEventListener('click', (e) => {
        if (chatbotWindow && !chatbotWindow.contains(e.target) && !toiletButton.contains(e.target)) {
            chatbotWindow.classList.add('hidden');
        }
    });

    // 5. Compteurs Stats
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

    // 6. Carrousel
    const track = document.getElementById('bento-track');
    const btnNext = document.querySelector('.nav-btn.next');
    const btnPrev = document.querySelector('.nav-btn.prev');

    if (track && btnNext && btnPrev) {
        const getCardWidth = () => track.children[0].offsetWidth + 24;
        
        btnNext.addEventListener('click', () => {
            gsap.to(track, { x: `-=${getCardWidth()}`, duration: 0.5, ease: "power2.out" });
        });

        btnPrev.addEventListener('click', () => {
            gsap.to(track, { x: `+=${getCardWidth()}`, duration: 0.5, ease: "power2.out" });
        });
    }
});

// Fonctions globales pour le chatbot
function handleOption(type) {
    const messages = document.getElementById('chatbot-messages');
    let response = "";

    switch(type) {
        case 'urgence':
            response = "🚨 Appelez immédiatement le <strong>(514) 933-8411</strong>.";
            break;
        case 'devis':
            response = "📋 Redirection vers le formulaire de devis...";
            setTimeout(() => window.location.href = "booking.html", 1500);
            break;
        case 'rdv':
            response = "📅 Nous vérifions nos disponibilités...";
            break;
    }

    const p = document.createElement('p');
    p.className = "bot-msg";
    p.style.marginTop = "10px";
    p.style.padding = "10px";
    p.style.background = "#f0f0f0";
    p.style.borderRadius = "5px";
    p.innerHTML = response;
    messages.appendChild(p);
}
