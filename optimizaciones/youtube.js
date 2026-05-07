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
