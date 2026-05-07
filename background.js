// Background script: aquí vive la lógica que corre en segundo plano.
import { defaultSafeZones } from "./safezones.js";

// Cuando se instala la extensión, dejamos una whitelist por defecto y armamos la alarma.
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.storage.sync.get({ whitelist: null }, (data) => {
      if (!data.whitelist) {
        chrome.storage.sync.set({ whitelist: defaultSafeZones });
      }
    });
  }
  configureAlarms();
});

// Configura la alarma que dispara la limpieza periódica.
function configureAlarms() {
  chrome.storage.sync.get({ autoMode: false, intervalSeconds: 300 }, (data) => {
    chrome.alarms.clear("optiAlarm");
    if (data.autoMode) {
      chrome.alarms.create("optiAlarm", {
        periodInMinutes: data.intervalSeconds / 60,
      });
    }
  });
}

// Cuando arranca el navegador, reconfiguramos la alarma.
chrome.runtime.onStartup.addListener(configureAlarms);

// Si cambia el modo automático o el intervalo, rearmamos la alarma.
chrome.storage.onChanged.addListener((changes) => {
  if (changes.autoMode || changes.intervalSeconds) {
    configureAlarms();
  }
});

// Cuando suena la alarma, hacemos la limpieza.
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "optiAlarm") {
    optimizeRAM();
  }
});

// Si el popup pide limpiar ahora mismo, también lo hacemos.
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "forceClean") {
    optimizeRAM();
  }
});

// Esta función revisa pestañas y descarta las que no estén en la whitelist.
async function optimizeRAM() {
  const tabs = await chrome.tabs.query({
    active: false,
    pinned: false,
    audible: false,
  });
  chrome.storage.sync.get({ whitelist: [] }, (data) => {
    tabs.forEach((tab) => {
      try {
        const urlLower = tab.url.toLowerCase();

        // Omitimos pestañas internas de Chrome porque no se pueden tocar.
        if (
          urlLower.startsWith("chrome://") ||
          urlLower.startsWith("chrome-extension://")
        ) {
          return;
        }

        // Omitimos pestañas que ya están descartadas.
        if (tab.discarded) {
          return;
        }

        // Si la pestaña NO coincide con ningún sitio de la whitelist, la descartamos.
        if (!data.whitelist.some((kw) => urlLower.includes(kw))) {
          chrome.tabs.discard(tab.id).catch(() => {
            // Si Chrome no deja descartar la pestaña, no pasa nada.
          });
        }
      } catch (e) {
        // Si algo falla leyendo la URL, mejor seguir sin romper todo.
      }
    });
  });
}
