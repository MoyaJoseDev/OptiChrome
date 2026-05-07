// Zonas seguras por defecto (Categorizadas para mejor mantenimiento)
const defaultSafeZones = [
  // 🤖 Inteligencias Artificiales
  "gemini", "chatgpt", "openai", "claude", "anthropic", "perplexity", 
  "poe", "copilot", "huggingface", "midjourney", "phind", "blackbox",

  // 🎓 Plataformas Educativas y LMS
  "moodle", "canvas", "blackboard", "classroom", "coursera", "udemy", 
  "platzi", "edx", "quizlet", "kahoot", "duolingo", "khanacademy",

  // 📝 Productividad y Ofimática
  "docs.google", "sheets.google", "slides.google", "drive.google", "forms", 
  "notion", "office", "sharepoint", "excel", "word", "evernote", "trello",

  // 💻 Desarrollo, Código y Foros
  "github", "gitlab", "stackoverflow", "vscode.dev", "github.dev", 
  "replit", "codepen", "jsfiddle", "devforum", "roblox", "create.roblox", "figma",

  // 📹 Video, Streaming y Comunicación
  "youtube", "meet.google", "zoom", "teams", "discord", "slack", "twitch", "vimeo"
];

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
        if (!data.whitelist.some(kw => urlLower.includes(kw))) {
          chrome.tabs.discard(tab.id);
        }
      } catch (e) {}
    });
  });
}