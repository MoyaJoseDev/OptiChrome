// --- Módulo: OptiYT (Aceleración Extrema) ---

const ytStyles = {
    // Modo Ambiente Mejorado (Más agresivo para matar ese difuminado)
    ytAmbient: "#cinematics, #cinematics-container, .ytd-watch-flexy-cinematic-node, ytd-watch-flexy[ambient-mode-fullscreen] #cinematics { display: none !important; background: transparent !important; }",
    ytPreviews: "ytd-moving-thumbnail-renderer, #mouseover-overlay { display: none !important; }",
    ytChat: "#chat, ytd-live-chat-frame { display: none !important; }",
    ytComments: "#comments { display: none !important; }",
    
    // NUEVO: Modo 2000s (Cero bordes redondeados, fuente básica, cero animaciones)
    ytRetro: "* { border-radius: 0 !important; font-family: Arial, sans-serif !important; transition: none !important; animation: none !important; }",
    
    // NUEVO: Matar los Shorts (Elimina la estantería de Shorts del inicio y sugerencias)
    ytNoShorts: "ytd-rich-shelf-renderer[is-shorts], ytd-reel-shelf-renderer, a[title='Shorts'], ytd-guide-entry-renderer:has(a[title='Shorts']) { display: none !important; }",
    
    // NUEVO: Matar Esqueletos (Efecto de carga pesada)
    ytNoSkeletons: "#ghost-cards, .skeleton-bg-color, ytd-skeleton-header-renderer { display: none !important; }"
};

const styleNode = document.createElement('style');
styleNode.id = 'opti-youtube-core';

// SOLUCIÓN AL ERROR: Inyección segura en el documento raíz si el head no existe aún
if (document.head) {
    document.head.appendChild(styleNode);
} else {
    document.documentElement.appendChild(styleNode);
}

function aplicarYT() {
    chrome.storage.sync.get(['ytAmbient', 'ytPreviews', 'ytChat', 'ytComments', 'ytRetro', 'ytNoShorts', 'ytNoSkeletons'], (data) => {
        let css = '';
        if (data.ytAmbient) css += ytStyles.ytAmbient + '\n';
        if (data.ytPreviews) css += ytStyles.ytPreviews + '\n';
        if (data.ytChat) css += ytStyles.ytChat + '\n';
        if (data.ytComments) css += ytStyles.ytComments + '\n';
        
        // Nuevas opciones
        if (data.ytRetro) css += ytStyles.ytRetro + '\n';
        if (data.ytNoShorts) css += ytStyles.ytNoShorts + '\n';
        if (data.ytNoSkeletons) css += ytStyles.ytNoSkeletons + '\n';
        
        styleNode.textContent = css;
    });
}

aplicarYT();
chrome.storage.onChanged.addListener((changes) => {
    // Si cambia CUALQUIER configuración de YouTube, recompilamos el CSS
    if (Object.keys(changes).some(key => key.startsWith('yt'))) {
        aplicarYT();
    }
});