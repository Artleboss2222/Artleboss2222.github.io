document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".hero-gradient h1", { 
        opacity: 0, 
        y: 40, 
        duration: 1.2, 
        ease: "power4.out",
        delay: 0.2 
    });
    
    gsap.from(".hero-gradient p", { 
        opacity: 0, 
        y: 30, 
        duration: 1.2, 
        ease: "power4.out",
        delay: 0.4 
    });

    document.querySelectorAll('.stat-num').forEach(num => {
        const target = +num.getAttribute('data-target');
        ScrollTrigger.create({
            trigger: num,
            start: "top 90%",
            onEnter: () => {
                let obj = { val: 0 };
                gsap.to(obj, {
                    val: target, 
                    duration: 2.5, 
                    ease: "power3.out",
                    onUpdate: () => num.textContent = Math.ceil(obj.val)
                });
            }
        });
    });

    gsap.from(".service-card", {
        scrollTrigger: {
            trigger: "#services",
            start: "top 75%"
        },
        opacity: 0,
        y: 60,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
    });
});

function toggleChatbot() {
    const win = document.getElementById('chatbot-window');
    win.classList.toggle('hidden');
    
    // Animation à l'ouverture
    if (!win.classList.contains('hidden')) {
        gsap.fromTo(win, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.4});
    }
}

function handleOption(type) {
    const msgContainer = document.getElementById('chatbot-messages');
    const response = document.createElement('div');
    
    response.className = "bg-blue-600 text-white p-4 rounded-2xl text-sm mt-4 shadow-lg animate-bounce-short";
    
    if (type === 'urgence') {
        response.innerHTML = "🚨 <strong>URGENCE :</strong> Appelez immédiatement le <a href='tel:5149338411' class='underline font-bold'>(514) 933-8411</a>. Nos techniciens sont prêts.";
    } else if (type === 'devis') {
        response.innerHTML = "📋 Excellente idée. Nous vous redirigeons vers notre formulaire d'estimation...";
        setTimeout(() => window.location.href = "booking.html", 1800);
    } else if (type === 'rdv') {
        response.innerHTML = "📅 Parfait ! Nous ouvrons notre calendrier de réservation pour vous...";
        setTimeout(() => window.location.href = "calendar.html", 1800);
    }
    
    msgContainer.appendChild(response);
    
    msgContainer.scrollTo({
        top: msgContainer.scrollHeight,
        behavior: 'smooth'
    });
}
