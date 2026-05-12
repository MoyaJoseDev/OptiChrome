// Background script: aquí vive la lógica que corre en segundo plano.
import { defaultSafeZones } from "./safezones.js";

// Al instalar la extensión, guardamos una lista inicial de sitios protegidos
// y configuramos la alarma que hará la limpieza periódica.
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

// Configura la alarma que activa la limpieza automática.
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

// Cuando se inicia el navegador, aseguramos que la alarma esté activa.
chrome.runtime.onStartup.addListener(configureAlarms);

// Si el usuario cambia el modo automático o el intervalo, volvemos a configurar.
chrome.storage.onChanged.addListener((changes) => {
  if (changes.autoMode || changes.intervalSeconds) {
    configureAlarms();
  }
});

// La alarma dispara la tarea principal de limpieza.
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "optiAlarm") {
    optimizeRAM();
  }
});

// El popup puede pedir una limpieza forzada en cualquier momento.
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "forceClean") {
    optimizeRAM();
  }
});

// Revisa todas las pestañas inactivas y descarta las que no estén en la whitelist.
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

        // No tocamos pestañas internas de Chrome.
        if (
          urlLower.startsWith("chrome://") ||
          urlLower.startsWith("chrome-extension://")
        ) {
          return;
        }

        // Ya está descartada, no hace falta tocarla.
        if (tab.discarded) {
          return;
        }

        // Si la pestaña no pertenece a ningún sitio seguro, la cerramos.
        if (!data.whitelist.some((kw) => urlLower.includes(kw))) {
          chrome.tabs.discard(tab.id).catch(() => {
            // Si no se puede descartar, seguimos con las demás.
          });
        }
      } catch (e) {
        // En caso de error con la URL, no interrumpimos la limpieza.
      }
    });
  });
}
