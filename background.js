// Importamos la lista desde nuestro archivo externo
import { defaultSafeZones } from './safezones.js';

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.storage.sync.get({ whitelist: null }, (data) => {
      if (!data.whitelist) chrome.storage.sync.set({ whitelist: defaultSafeZones });
    });
  }
  configureAlarms();
});

function configureAlarms() {
  chrome.storage.sync.get({ autoMode: false, intervalSeconds: 300 }, (data) => {
    chrome.alarms.clear("optiAlarm");
    if (data.autoMode) {
      chrome.alarms.create("optiAlarm", { periodInMinutes: data.intervalSeconds / 60 });
    }
  });
}

chrome.runtime.onStartup.addListener(configureAlarms);
chrome.storage.onChanged.addListener((changes) => {
  if (changes.autoMode || changes.intervalSeconds) configureAlarms();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "optiAlarm") optimizeRAM();
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "forceClean") optimizeRAM();
});

async function optimizeRAM() {
  const tabs = await chrome.tabs.query({ active: false, pinned: false, audible: false });
  chrome.storage.sync.get({ whitelist: [] }, (data) => {
    tabs.forEach(tab => {
      try {
        const urlLower = tab.url.toLowerCase();
        
        // 1. Ignorar páginas internas de Chrome (la causa principal del error)
        if (urlLower.startsWith('chrome://') || urlLower.startsWith('chrome-extension://')) return;
        
        // 2. Ignorar pestañas que YA están congeladas
        if (tab.discarded) return;

        // Comprobar la lista blanca
        if (!data.whitelist.some(kw => urlLower.includes(kw))) {
          
          // 3. Descartar y "atrapar" (catch) cualquier error silenciosamente
          chrome.tabs.discard(tab.id).catch(() => {
             // Chrome protegió esta pestaña por alguna razón interna. Lo ignoramos.
          });
          
        }
      } catch (e) {
        // Errores de lectura de URL ignorados
      }
    });
  });
}