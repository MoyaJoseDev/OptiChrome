// src/optimizaciones/youtube.js

const ytStyles = {
  ytAmbient: "#cinematics, #cinematics-container, .ytd-watch-flexy-cinematic-node, ytd-watch-flexy[ambient-mode-fullscreen] #cinematics { display: none !important; background: transparent !important; }",
  ytPreviews: "ytd-moving-thumbnail-renderer, #mouseover-overlay { display: none !important; }",
  ytChat: "#chat, ytd-live-chat-frame { display: none !important; }",
  ytComments: "#comments { display: none !important; }",
  ytRetro: "* { border-radius: 0 !important; font-family: Arial, sans-serif !important; transition: none !important; animation: none !important; }",
  ytNoShorts: "ytd-rich-shelf-renderer[is-shorts], ytd-reel-shelf-renderer, a[title='Shorts'], ytd-guide-entry-renderer:has(a[title='Shorts']) { display: none !important; }",
  ytNoSkeletons: "#ghost-cards, .skeleton-bg-color, ytd-skeleton-header-renderer { display: none !important; }",
  ytNoAvatars: "#avatar, yt-img-shadow, .yt-spec-avatar-shape { display: none !important; }",
  ytStaticNav: "ytd-masthead { position: absolute !important; } #page-manager { margin-top: 0 !important; padding-top: 60px !important; }",
  ytCompactGrid: "ytd-rich-grid-row { margin-bottom: 0 !important; } ytd-rich-item-renderer { margin-bottom: 10px !important; max-width: 250px !important; } ytd-rich-grid-renderer { --ytd-rich-grid-items-per-row: 6 !important; }",
  ytNoSidebar: "#secondary { display: none !important; } #primary { max-width: 100% !important; padding-right: 0 !important; }",
  
  // 🛡️ CSS DEL ADBLOCK: Oculta banners, anuncios del feed y superposiciones.
  ytAdBlockCSS: `
    ytd-promoted-sparkles-web-renderer, 
    ytd-display-ad-renderer, 
    ytd-compact-promoted-video-renderer, 
    ytd-promoted-video-renderer, 
    #masthead-ad, 
    ytd-banner-promo-renderer, 
    .video-ads:not(.ytp-ad-showing), 
    .ytp-ad-overlay-container,
    .ytd-player-legacy-desktop-watch-ads-renderer,
    div#root.style-scope.ytd-display-ad-renderer.yt-simple-endpoint { 
      display: none !important; 
    }
  `
};

const styleNode = document.createElement("style");
styleNode.id = "opti-youtube-core";

if (document.head) {
  document.head.appendChild(styleNode);
} else {
  document.documentElement.appendChild(styleNode);
}

// 🛡️ Lógica para saltar los videos (Auto-Skipper)
let adSkipInterval = null;

function gestionarAutoSkip(activar) {
  if (activar) {
    if (!adSkipInterval) {
      adSkipInterval = setInterval(() => {
        // 1. Busca botones de "Omitir" y los presiona
        const skipBtn = document.querySelector('.ytp-ad-skip-button, .ytp-ad-skip-button-modern, .ytp-skip-ad-button');
        if (skipBtn) {
          skipBtn.click();
        }
        
        // 2. Si es un anuncio forzado (no se puede omitir), adelanta el video hasta el final
        const isAdShowing = document.querySelector('.ad-showing');
        if (isAdShowing) {
          const video = document.querySelector('video');
          if (video && !isNaN(video.duration)) {
            video.currentTime = video.duration;
          }
        }
      }, 300); // Se ejecuta cada 300 milisegundos de forma invisible
    }
  } else {
    // Si el usuario apaga el adblocker, detenemos el escáner
    if (adSkipInterval) {
      clearInterval(adSkipInterval);
      adSkipInterval = null;
    }
  }
}

function aplicarYT() {
  chrome.storage.sync.get(
    [
      "ytAmbient", "ytPreviews", "ytChat", "ytComments", "ytRetro", 
      "ytNoShorts", "ytNoSkeletons", "ytNoAvatars", "ytStaticNav", 
      "ytCompactGrid", "ytNoSidebar", "ytAdBlock" // Asegúrate de pedir ytAdBlock
    ],
    (data) => {
      let css = "";
      if (data.ytAmbient) css += ytStyles.ytAmbient + "\n";
      if (data.ytPreviews) css += ytStyles.ytPreviews + "\n";
      if (data.ytChat) css += ytStyles.ytChat + "\n";
      if (data.ytComments) css += ytStyles.ytComments + "\n";
      if (data.ytRetro) css += ytStyles.ytRetro + "\n";
      if (data.ytNoShorts) css += ytStyles.ytNoShorts + "\n";
      if (data.ytNoSkeletons) css += ytStyles.ytNoSkeletons + "\n";
      if (data.ytNoAvatars) css += ytStyles.ytNoAvatars + "\n";
      if (data.ytStaticNav) css += ytStyles.ytStaticNav + "\n";
      if (data.ytCompactGrid) css += ytStyles.ytCompactGrid + "\n";
      if (data.ytNoSidebar) css += ytStyles.ytNoSidebar + "\n";
      
      // Aplicamos el CSS de publicidad si está activo
      if (data.ytAdBlock) css += ytStyles.ytAdBlockCSS + "\n";
      
      styleNode.textContent = css;

      // Arrancamos o detenemos el salto automático de videos
      gestionarAutoSkip(data.ytAdBlock);
    }
  );
}

aplicarYT();
chrome.storage.onChanged.addListener((changes) => {
  if (Object.keys(changes).some((key) => key.startsWith("yt"))) {
    aplicarYT();
  }
});