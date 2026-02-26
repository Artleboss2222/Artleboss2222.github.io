// Fonction pour ouvrir/fermer le chatbot
function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbot-window');
    if (!chatbotWindow) return;

    if (chatbotWindow.classList.contains('hidden')) {
        chatbotWindow.classList.remove('hidden');
        chatbotWindow.style.display = 'flex';
        // Petit délai pour l'animation CSS si nécessaire
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
    
    // 1. Création du message de l'utilisateur (bulle à droite)
    const userMsg = document.createElement('div');
    userMsg.className = "flex justify-end mb-4";
    userMsg.innerHTML = `
        <div class="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-tr-none text-sm shadow-sm">
            ${type === 'urgence' ? '🚨 Signaler une urgence' : '📋 Demander un devis'}
        </div>
    `;
    msgContainer.appendChild(userMsg);

    // 2. Création de la réponse de l'assistant (bulle à gauche)
    const assistantMsg = document.createElement('div');
    assistantMsg.className = "flex justify-start mb-4";
    
    if (type === 'urgence') {
        assistantMsg.innerHTML = `
            <div class="bg-slate-100 text-slate-700 px-4 py-2 rounded-2xl rounded-tl-none text-sm border border-slate-200">
                🚨 <strong>Urgence :</strong> Appelez immédiatement le <a href="tel:5149338411" class="text-blue-600 font-bold underline">(514) 933-8411</a>. Nous intervenons 24/7.
            </div>
        `;
    } else if (type === 'devis') {
        assistantMsg.innerHTML = `
            <div class="bg-slate-100 text-slate-700 px-4 py-2 rounded-2xl rounded-tl-none text-sm border border-slate-200">
                <i class="fas fa-spinner animate-spin mr-2"></i> 
                Très bien ! Je vous redirige vers notre formulaire de devis gratuit...
            </div>
        `;
        
        // REDIRECTION VERS DEVIS.HTML
        // Utilisation explicite de l'objet global pour éviter tout conflit
        setTimeout(() => {
            window.location.assign("devis.html");
        }, 1500); 
    }
    
    msgContainer.appendChild(assistantMsg);
    
    // Scroll automatique vers le bas
    msgContainer.scrollTo({
        top: msgContainer.scrollHeight,
        behavior: 'smooth'
    });
}

// Initialisation de l'année dans le footer et autres réglages
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
