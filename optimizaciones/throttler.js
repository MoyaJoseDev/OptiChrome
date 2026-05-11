// optimizaciones/throttler.js - Estrangulamiento de CPU Simulado
console.log("🟢 OptiChrome: Throttler inyectado correctamente en " + window.location.hostname);

let styleNode = null;
let pausedVideos = [];

function checkVisibility() {
  console.log("👁️ OptiChrome: Cambio de pestaña detectado. Estado:", document.visibilityState);
  
  chrome.storage.sync.get({ cpuThrottle: false, whitelist: [] }, (data) => {
    if (chrome.runtime.lastError) return;

    if (!data.cpuThrottle) return;

    const urlLower = window.location.href.toLowerCase();
    const isSafeZone = data.whitelist.some((site) => urlLower.includes(site));
    
    if (isSafeZone) {
      console.log("🛡️ OptiChrome: SafeZone. Evitando pausa.");
      return; 
    }

    // Usamos visibilityState en lugar de hidden
    if (document.visibilityState === "hidden") {
      console.log("⏸️ OptiChrome: Pestaña oculta. Congelando procesos...");
      
      if (!styleNode) {
        styleNode = document.createElement("style");
        styleNode.textContent = "* { animation-play-state: paused !important; }";
        document.documentElement.appendChild(styleNode);
      }

      pausedVideos = [];
      // Mejoramos la selección de reproductores
      const videos = document.querySelectorAll("video");
      console.log(`🎬 OptiChrome: ${videos.length} video(s) encontrado(s).`);
      
      videos.forEach((video) => {
        if (!video.paused) {
          video.pause();
          pausedVideos.push(video);
          console.log("⏸️ OptiChrome: Video pausado.");
        }
      });
      
    } else if (document.visibilityState === "visible") {
      console.log("▶️ OptiChrome: Pestaña visible. Restaurando...");
      
      if (styleNode && styleNode.parentNode) {
        styleNode.parentNode.removeChild(styleNode);
        styleNode = null;
      }

      pausedVideos.forEach((video) => {
        video.play().catch(() => console.error("🔴 No se pudo reanudar el video")); 
        console.log("▶️ OptiChrome: Video reanudado.");
      });
      pausedVideos = [];
    }
  });
}

// Usamos el evento visibilitychange, pero también blur/focus por seguridad
document.addEventListener("visibilitychange", checkVisibility);
window.addEventListener("blur", () => {
    // Simulamos un cambio de visibilidad si la ventana pierde el foco
    if (document.visibilityState === "visible") checkVisibility(); 
});