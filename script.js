// Fonction pour ouvrir/fermer le chatbot
function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbot-window');
    if (!chatbotWindow) return;

    if (chatbotWindow.classList.contains('hidden')) {
        chatbotWindow.classList.remove('hidden');
        chatbotWindow.style.display = 'flex';
        // Petit délai pour l'animation CSS
        setTimeout(() => {
            chatbotWindow.style.opacity = '1';
            chatbotWindow.style.transform = 'translateY(0)';
        }, 10);
        chatbotWindow.style.pointerEvents = 'auto';
    } else {
        chatbotWindow.style.opacity = '0';
        chatbotWindow.style.transform = 'translateY(20px)';
        chatbotWindow.style.pointerEvents = 'none';
        // On attend la fin de l'animation avant de cacher complètement
        setTimeout(() => {
            chatbotWindow.classList.add('hidden');
            chatbotWindow.style.display = 'none';
        }, 300);
    }
}

// Gestion des options du chatbot
function handleOption(type) {
    const msgContainer = document.getElementById('chatbot-messages');
    if (!msgContainer) return;
    
    // 1. Message de l'utilisateur (Style d'origine)
    const userMsg = document.createElement('p');
    userMsg.style.textAlign = "right";
    userMsg.style.margin = "10px 0";
    userMsg.style.fontSize = "0.85rem";
    userMsg.style.color = "#475569";
    userMsg.textContent = type.toUpperCase();
    msgContainer.appendChild(userMsg);

    // 2. Réponse de l'assistant (Style d'origine)
    const p = document.createElement('p');
    p.style.marginTop = "10px";
    p.style.padding = "12px";
    p.style.borderRadius = "12px";
    p.style.background = "rgba(0, 85, 255, 0.1)";
    p.style.fontSize = "0.9rem";
    p.style.color = "#1e293b";
    
    if (type === 'urgence') {
        p.innerHTML = "🚨 <strong>Urgence :</strong> Appelez le <strong>(514) 933-8411</strong>. Nous sommes disponibles 24/7.";
    } else if (type === 'devis') {
        p.innerHTML = "📋 <strong>Devis :</strong> Un instant, je vous redirige vers notre formulaire de devis...";
        setTimeout(() => {
            window.location.href = "devis.html";
        }, 1200);
    } else if (type === 'reservation') {
        p.innerHTML = "📅 <strong>Rendez-vous :</strong> Je vous dirige vers notre calendrier de réservation...";
        setTimeout(() => {
            window.location.href = "reservation.html";
        }, 1200);
    }
    
    msgContainer.appendChild(p);
    
    // Scroll automatique vers le bas
    msgContainer.scrollTop = msgContainer.scrollHeight;
}

// Initialisation de l'année dans le footer
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
