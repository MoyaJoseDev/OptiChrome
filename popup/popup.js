import { defaultSafeZones } from "../safezones.js";

document.addEventListener("DOMContentLoaded", () => {
  const switchView = (hide, show) => {
    hide.classList.add("hidden");
    show.classList.remove("hidden");
  };

  // Referencias de navegación
  const viewMain = document.getElementById("view-main"),
    viewWL = document.getElementById("view-whitelist"),
    viewAdv = document.getElementById("view-advanced"),
    viewPrivacy = document.getElementById("view-privacy");

  document.getElementById("navToWhitelist").onclick = () => switchView(viewMain, viewWL);
  document.getElementById("navToAdvanced").onclick = () => switchView(viewMain, viewAdv);
  document.getElementById("navToPrivacy").onclick = () => switchView(viewMain, viewPrivacy);
  document.getElementById("backFromWhitelist").onclick = () => switchView(viewWL, viewMain);
  document.getElementById("backFromAdvanced").onclick = () => switchView(viewAdv, viewMain);
  document.getElementById("backFromPrivacy").onclick = () => switchView(viewPrivacy, viewMain);

  // Botón Limpiar Memoria (REPARADO)
  document.getElementById("btnManual").onclick = () => {
    chrome.runtime.sendMessage({ action: "forceClean" });
  };

  // IDs de YouTube sincronizados con ytStyles de tu youtube.js
  const ytIds = [
    "ytAmbient", "ytPreviews", "ytChat", "ytComments", 
    "ytRetro", "ytNoShorts", "ytNoSkeletons", "ytNoAvatars", 
    "ytStaticNav", "ytCompactGrid", "ytNoSidebar"
  ];
  const ytElements = ytIds.map(id => document.getElementById(id));

  // Cargar datos y estados iniciales
  chrome.storage.sync.get({
    whitelist: defaultSafeZones,
    autoMode: false,
    intervalSeconds: 300,
    cpuThrottle: false,
    ytAmbient: false,
    ytPreviews: false,
    ytChat: false,
    ytComments: false,
    ytRetro: false,
    ytNoShorts: false,
    ytNoSkeletons: false,
    ytNoAvatars: false,
    ytStaticNav: false,
    ytCompactGrid: false,
    ytNoSidebar: false
  }, (data) => {
    document.getElementById("toggleAuto").checked = data.autoMode;
    document.getElementById("inputSeconds").value = data.intervalSeconds; // Cargar intervalo
    document.getElementById("cpuThrottle").checked = data.cpuThrottle;
    
    ytElements.forEach((el, i) => { 
      if(el) el.checked = data[ytIds[i]]; 
    });
    
    renderList(data.whitelist);
  });

  // Guardar cambios YT
  ytElements.forEach((el, i) => {
    if(el) {
      el.onchange = () => chrome.storage.sync.set({ [ytIds[i]]: el.checked });
    }
  });

  // Guardar Auto-RAM e Intervalo
  document.getElementById("toggleAuto").onchange = (e) => 
    chrome.storage.sync.set({ autoMode: e.target.checked });

  document.getElementById("inputSeconds").onchange = (e) => {
    const val = Math.max(10, parseInt(e.target.value) || 300);
    chrome.storage.sync.set({ intervalSeconds: val });
  };

  // Guardar Throttling
  document.getElementById("cpuThrottle").onchange = (e) => 
    chrome.storage.sync.set({ cpuThrottle: e.target.checked });

  // Gestión de Whitelist
  function renderList(items) {
    const list = document.getElementById("siteList");
    list.innerHTML = "";
    items.forEach(site => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${site}</span><button class="del-btn" style="background:none; border:none; color:#ff4757; cursor:pointer; font-weight:bold;">✕</button>`;
      li.querySelector(".del-btn").onclick = () => {
        const nw = items.filter(i => i !== site);
        chrome.storage.sync.set({ whitelist: nw }, () => renderList(nw));
      };
      list.appendChild(li);
    });
  }

  document.getElementById("btnAddSite").onclick = () => {
    const val = document.getElementById("inputSite").value.trim().toLowerCase();
    if(val) {
      chrome.storage.sync.get({ whitelist: [] }, (data) => {
        if (!data.whitelist.includes(val)) {
          const newList = [val, ...data.whitelist];
          chrome.storage.sync.set({ whitelist: newList }, () => {
            renderList(newList);
            document.getElementById("inputSite").value = "";
          });
        }
      });
    }
  };

  document.getElementById("btnReset").onclick = () => {
    chrome.storage.sync.set({ whitelist: defaultSafeZones }, () => renderList(defaultSafeZones));
  };
});