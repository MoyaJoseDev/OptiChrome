document.addEventListener('DOMContentLoaded', () => {
  const switchView = (hide, show) => { hide.classList.add('hidden'); show.classList.remove('hidden'); };
  
  const viewMain = document.getElementById('view-main'), viewWL = document.getElementById('view-whitelist'), viewAdv = document.getElementById('view-advanced');
  document.getElementById('navToWhitelist').onclick = () => switchView(viewMain, viewWL);
  document.getElementById('navToAdvanced').onclick = () => switchView(viewMain, viewAdv);
  document.getElementById('backFromWhitelist').onclick = () => switchView(viewWL, viewMain);
  document.getElementById('backFromAdvanced').onclick = () => switchView(viewAdv, viewMain);

  const defaultSafeZones = ["gemini", "chatgpt", "openai", "claude", "anthropic", "youtube"]; // Acortado aquí por legibilidad, usa tu lista completa

  // Elementos
  const btnManual = document.getElementById('btnManual'), toggleAuto = document.getElementById('toggleAuto'), inputSeconds = document.getElementById('inputSeconds');
  const inputSite = document.getElementById('inputSite'), btnAddSite = document.getElementById('btnAddSite'), siteList = document.getElementById('siteList');
  // Añadimos las nuevas opciones al array
  const ytIds = ['ytAmbient', 'ytPreviews', 'ytChat', 'ytComments', 'ytRetro', 'ytNoShorts', 'ytNoSkeletons'];
  const ytElements = ytIds.map(id => document.getElementById(id));

  // Cargar
  chrome.storage.sync.get({ 
    whitelist: defaultSafeZones, autoMode: false, intervalSeconds: 300, 
    ytAmbient: false, ytPreviews: false, ytChat: false, ytComments: false,
    ytRetro: false, ytNoShorts: false, ytNoSkeletons: false 
  }, (data) => {
    toggleAuto.checked = data.autoMode; inputSeconds.value = data.intervalSeconds;
    ytElements.forEach((el, i) => el.checked = data[ytIds[i]]);
    renderList(data.whitelist);
  });

  // Guardar YT
  ytElements.forEach((el, i) => el.addEventListener('change', () => chrome.storage.sync.set({ [ytIds[i]]: el.checked })));

  // Acciones Core
  btnManual.onclick = () => { chrome.runtime.sendMessage({ action: "forceClean" }); };
  toggleAuto.onchange = () => chrome.storage.sync.set({ autoMode: toggleAuto.checked });
  inputSeconds.onchange = () => chrome.storage.sync.set({ intervalSeconds: Math.max(10, parseInt(inputSeconds.value) || 300) });

  // Whitelist Logic
  btnAddSite.onclick = () => {
    const site = inputSite.value.trim().toLowerCase();
    if (site) chrome.storage.sync.get({ whitelist: [] }, (data) => {
      if (!data.whitelist.includes(site)) chrome.storage.sync.set({ whitelist: [site, ...data.whitelist] }, () => { renderList([site, ...data.whitelist]); inputSite.value = ''; });
    });
  };

  document.getElementById('btnReset').onclick = () => chrome.storage.sync.set({ whitelist: defaultSafeZones }, () => renderList(defaultSafeZones));

  function renderList(items) {
    siteList.innerHTML = '';
    items.forEach(site => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="item-text">${site}</span><div class="actions"><button class="btn-icon btn-edit">✏️</button><button class="btn-icon btn-del">🗑️</button></div>`;
      li.querySelector('.btn-edit').onclick = () => { inputSite.value = site; removeSite(site); };
      li.querySelector('.btn-del').onclick = () => removeSite(site);
      siteList.appendChild(li);
    });
  }

  function removeSite(site) {
    chrome.storage.sync.get({ whitelist: [] }, (data) => {
      const nw = data.whitelist.filter(i => i !== site);
      chrome.storage.sync.set({ whitelist: nw }, () => renderList(nw));
    });
  }
});