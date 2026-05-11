// OptiYT: este archivo arma los estilos que aplican la mejora en YouTube.

const ytStyles = {
  // Quita el modo ambiente y el blur extra en el reproductor.
  ytAmbient:
    "#cinematics, #cinematics-container, .ytd-watch-flexy-cinematic-node, ytd-watch-flexy[ambient-mode-fullscreen] #cinematics { display: none !important; background: transparent !important; }",

  // Quita las miniaturas en movimiento y el overlay de preview.
  ytPreviews:
    "ytd-moving-thumbnail-renderer, #mouseover-overlay { display: none !important; }",

  // Quita el chat en vivo.
  ytChat: "#chat, ytd-live-chat-frame { display: none !important; }",

  // Quita los comentarios debajo del video.
  ytComments: "#comments { display: none !important; }",

  // Modo retro: nada de bordes redondeados, ni animaciones.
  ytRetro:
    "* { border-radius: 0 !important; font-family: Arial, sans-serif !important; transition: none !important; animation: none !important; }",

  // Quita los Shorts del feed y las sugerencias.
  ytNoShorts:
    "ytd-rich-shelf-renderer[is-shorts], ytd-reel-shelf-renderer, a[title='Shorts'], ytd-guide-entry-renderer:has(a[title='Shorts']) { display: none !important; }",

  // Quita los esqueletos de carga pesada.
  ytNoSkeletons:
    "#ghost-cards, .skeleton-bg-color, ytd-skeleton-header-renderer { display: none !important; }",

  // Quita las fotos de perfil en toda la plataforma (menos carga de imágenes).
  ytNoAvatars: 
    "#avatar, yt-img-shadow, .yt-spec-avatar-shape { display: none !important; }",

  // Hace que la barra superior no se quede pegada al bajar (ahorra repintado en la GPU).
  ytStaticNav: 
    "ytd-masthead { position: absolute !important; } #page-manager { margin-top: 0 !important; padding-top: 60px !important; }",

  // Diseño compacto: achica el tamaño de las miniaturas en el inicio para que parezca el YT viejo.
  ytCompactGrid: 
    "ytd-rich-grid-row { margin-bottom: 0 !important; } ytd-rich-item-renderer { margin-bottom: 10px !important; max-width: 250px !important; } ytd-rich-grid-renderer { --ytd-rich-grid-items-per-row: 6 !important; }",

  // Oculta completamente la barra lateral de videos recomendados al ver un video.
  ytNoSidebar: 
    "#secondary { display: none !important; } #primary { max-width: 100% !important; padding-right: 0 !important; }",
};

const styleNode = document.createElement("style");
styleNode.id = "opti-youtube-core";

// Si el <head> todavía no está listo, inyectamos en el documento entero.
if (document.head) {
  document.head.appendChild(styleNode);
} else {
  document.documentElement.appendChild(styleNode);
}

function aplicarYT() {
  chrome.storage.sync.get(
    [
      "ytAmbient",
      "ytPreviews",
      "ytChat",
      "ytComments",
      "ytRetro",
      "ytNoShorts",
      "ytNoSkeletons",
      "ytNoAvatars",
      "ytStaticNav",
      "ytCompactGrid",
      "ytNoSidebar",
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
      // ... dentro de chrome.storage.sync.get ...
      if (data.ytNoAvatars) css += ytStyles.ytNoAvatars + "\n";
      if (data.ytStaticNav) css += ytStyles.ytStaticNav + "\n";
      if (data.ytCompactGrid) css += ytStyles.ytCompactGrid + "\n";
      if (data.ytNoSidebar) css += ytStyles.ytNoSidebar + "\n";

      styleNode.textContent = css;
    },
  );
}

// Ejecuta al cargar la página y cada vez que cambia algo en storage.
aplicarYT();
chrome.storage.onChanged.addListener((changes) => {
  if (Object.keys(changes).some((key) => key.startsWith("yt"))) {
    aplicarYT();
  }
});
