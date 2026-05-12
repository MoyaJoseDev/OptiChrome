// optimizaciones/throttler.js - Estrangulamiento de CPU Simulado

(function() {
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

      if (document.visibilityState === "hidden") {
        console.log("⏸️ OptiChrome: Pestaña oculta. Congelando procesos...");
        
        if (!styleNode) {
          styleNode = document.createElement("style");
          styleNode.textContent = "* { animation-play-state: paused !important; }";
          document.documentElement.appendChild(styleNode);
        }

        pausedVideos = [];
        const videos = document.querySelectorAll("video");
        
        videos.forEach((video) => {
          if (!video.paused) {
            video.pause();
            pausedVideos.push(video);
          }
        });
        
      } else if (document.visibilityState === "visible") {
        console.log("▶️ OptiChrome: Pestaña visible. Restaurando...");
        
        if (styleNode && styleNode.parentNode) {
          styleNode.parentNode.removeChild(styleNode);
          styleNode = null;
        }

        pausedVideos.forEach((video) => {
          video.play().catch(() => {}); 
        });
        pausedVideos = [];
      }
    });
  }

  document.addEventListener("visibilitychange", checkVisibility);
  window.addEventListener("blur", () => {
      if (document.visibilityState === "visible") checkVisibility(); 
  });
})();