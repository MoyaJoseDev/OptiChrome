import React, { useState, useEffect } from 'react';
import { MainView } from './components/views/MainView';
import { WhitelistView } from './components/views/WhitelistView';
import { AdvancedView } from './components/views/AdvancedView';
import { PrivacyView } from './components/views/PrivacyView'; 
import { Footer } from './components/layout/Footer';

export default function App() {
  const [view, setView] = useState('main');
  const [settings, setSettings] = useState({
    autoMode: false, intervalSeconds: 300, cpuThrottle: false, whitelist: [],
    ytAmbient: false, ytPreviews: false, ytChat: false, ytComments: false,
    ytRetro: false, ytNoShorts: false, ytNoSkeletons: false, ytNoAvatars: false,
    ytStaticNav: false, ytCompactGrid: false, ytNoSidebar: false, ytAdBlock: false
  });

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.get(settings, (data) => setSettings(data));
    }
  }, []);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.set({ [key]: value });
    }
  };

  const forceClean = () => {
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      chrome.runtime.sendMessage({ action: "forceClean" });
    }
  };

  return (
    <div className="p-5 animate-[fadeIn_0.3s_ease-out]">
      {view === 'main' && (
        <MainView settings={settings} updateSetting={updateSetting} setView={setView} forceClean={forceClean} />
      )}
      
      {view === 'whitelist' && (
        <WhitelistView whitelist={settings.whitelist} updateSetting={updateSetting} setView={setView} />
      )}
      
      {view === 'advanced' && (
        <AdvancedView settings={settings} updateSetting={updateSetting} setView={setView} />
      )}
      
      {view === 'privacy' && (
        <PrivacyView setView={setView} />
      )}

      {/* El Footer siempre visible */}
      <Footer />
    </div>
  );
}