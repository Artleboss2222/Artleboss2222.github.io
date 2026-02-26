function handleOption(type) {
    const msgContainer = document.getElementById('chatbot-messages');
    if (!msgContainer) return;
    
    // Message de l'utilisateur
    const userMsg = document.createElement('p');
    userMsg.style.textAlign = "right";
    userMsg.style.margin = "10px 0";
    userMsg.style.fontSize = "0.85rem";
    userMsg.textContent = type.toUpperCase();
    msgContainer.appendChild(userMsg);

    // Réponse de l'assistant
    const p = document.createElement('p');
    p.style.marginTop = "10px";
    p.style.padding = "12px";
    p.style.borderRadius = "12px";
    p.style.background = "rgba(0, 85, 255, 0.1)";
    
    if (type === 'urgence') {
        p.innerHTML = "🚨 <strong>Urgence :</strong> Appelez le <strong>(514) 933-8411</strong>.";
    } else if (type === 'devis') {
        p.innerHTML = "📋 <strong>Devis :</strong> Un instant, nous vous redirigeons vers notre calendrier...";
        
        // CORRECTION ICI : Vérifie bien le nom de ton fichier .html
        setTimeout(() => {
            window.location.href = "devis.html"; // Ou "calendrier.html" si c'est le nom du fichier
        }, 1200);
    }
    
    msgContainer.appendChild(p);
    msgContainer.scrollTop = msgContainer.scrollHeight;
}
