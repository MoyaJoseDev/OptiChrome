import { defaultSafeZones } from "../safezones.js";

// Esto arranca cuando el popup ya está listo.
document.addEventListener("DOMContentLoaded", () => {
  // Mueve entre pantallas del popup.
  const switchView = (hide, show) => {
    hide.classList.add("hidden");
    show.classList.remove("hidden");
  };

  // Referencias a las vistas principales.
  const viewMain = document.getElementById("view-main"),
    viewWL = document.getElementById("view-whitelist"),
    viewAdv = document.getElementById("view-advanced");

  // Navegación entre secciones.
  document.getElementById("navToWhitelist").onclick = () =>
    switchView(viewMain, viewWL);
  document.getElementById("navToAdvanced").onclick = () =>
    switchView(viewMain, viewAdv);
  document.getElementById("backFromWhitelist").onclick = () =>
    switchView(viewWL, viewMain);
  document.getElementById("backFromAdvanced").onclick = () =>
    switchView(viewAdv, viewMain);

  // Acordeones desplegables de opciones.
  const accordions = document.querySelectorAll(".accordion-btn");
  accordions.forEach((btn) => {
    btn.addEventListener("click", function () {
      const panel = this.nextElementSibling;
      panel.classList.toggle("active");
      const arrow = this.querySelector(".arrow");
      arrow.textContent = panel.classList.contains("active") ? "▲" : "▼";
    });
  });

  // Referencias a controles del popup.
  const btnManual = document.getElementById("btnManual"),
    toggleAuto = document.getElementById("toggleAuto"),
    inputSeconds = document.getElementById("inputSeconds"),
    cpuThrottle = document.getElementById("cpuThrottle"); // <--- Nuevo
  const inputSite = document.getElementById("inputSite"),
    btnAddSite = document.getElementById("btnAddSite"),
    siteList = document.getElementById("siteList");

  // IDs de opciones específicas de YouTube y sus elementos.
  const ytIds = [
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
  ];
  const ytElements = ytIds.map((id) => document.getElementById(id));

  // Cargar los datos guardados y ponerlos en el popup.
  chrome.storage.sync.get(
    {
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
      // Agrega estas líneas:
      ytNoAvatars: false,
      ytStaticNav: false,
      ytCompactGrid: false,
      ytNoSidebar: false,
    },
    (data) => {
      toggleAuto.checked = data.autoMode;
      inputSeconds.value = data.intervalSeconds;
      cpuThrottle.checked = data.cpuThrottle;
      ytElements.forEach((el, i) => (el.checked = data[ytIds[i]]));
      renderList(data.whitelist);
    },
  );

  // Guardar cambio de Throttling
  cpuThrottle.onchange = () =>
    chrome.storage.sync.set({ cpuThrottle: cpuThrottle.checked });

  // Guardar cambios de cada checkbox de YouTube.
  ytElements.forEach((el, i) =>
    el.addEventListener("change", () =>
      chrome.storage.sync.set({ [ytIds[i]]: el.checked }),
    ),
  );

  // Botón para forzar la limpieza manual.
  btnManual.onclick = () => {
    chrome.runtime.sendMessage({ action: "forceClean" });
  };

  // Activar/desactivar modo automático.
  toggleAuto.onchange = () =>
    chrome.storage.sync.set({ autoMode: toggleAuto.checked });

  // Cambiar el intervalo mínimo entre limpiezas.
  inputSeconds.onchange = () =>
    chrome.storage.sync.set({
      intervalSeconds: Math.max(10, parseInt(inputSeconds.value) || 300),
    });

  // Agregar nuevo sitio a la whitelist.
  btnAddSite.onclick = () => {
    const site = inputSite.value.trim().toLowerCase();
    if (site) {
      chrome.storage.sync.get({ whitelist: [] }, (data) => {
        if (!data.whitelist.includes(site)) {
          const newList = [site, ...data.whitelist];
          chrome.storage.sync.set({ whitelist: newList }, () => {
            renderList(newList);
            inputSite.value = ""; // vacía el campo
          });
        }
      });
    }
  };

  // Resetear la whitelist a la configuración por defecto.
  document.getElementById("btnReset").onclick = () =>
    chrome.storage.sync.set({ whitelist: defaultSafeZones }, () =>
      renderList(defaultSafeZones),
    );

  // Dibuja la lista de sitios permitidos.
  function renderList(items) {
    siteList.innerHTML = "";
    items.forEach((site) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="item-text">${site}</span>
        <div class="actions">
          <button class="btn-icon btn-edit">✏️</button>
          <button class="btn-icon btn-del">🗑️</button>
        </div>
      `;
      li.querySelector(".btn-edit").onclick = () => {
        inputSite.value = site;
        removeSite(site);
      };
      li.querySelector(".btn-del").onclick = () => removeSite(site);
      siteList.appendChild(li);
    });
  }

  // Saca un sitio de la whitelist y actualiza la lista.
  function removeSite(site) {
    chrome.storage.sync.get({ whitelist: [] }, (data) => {
      const nw = data.whitelist.filter((i) => i !== site);
      chrome.storage.sync.set({ whitelist: nw }, () => renderList(nw));
    });
  }
});
