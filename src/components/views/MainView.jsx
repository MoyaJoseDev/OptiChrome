import { Toggle } from "../ui/Toggle";
import { NavButton } from "../ui/NavButton";

// MainView muestra las opciones principales y el botón de limpieza.
export const MainView = ({ settings, updateSetting, setView, forceClean }) => (
  <>
    <h2 className="m-0 mb-6 text-2xl text-border-neon drop-shadow-[0_0_12px_rgba(0,242,254,0.5)] flex items-center gap-3 font-extrabold tracking-tight">
      ⚡ OPTICHROME
    </h2>
    <div className="glass-card mb-5">
      <button
        onClick={forceClean}
        className="w-full p-3.5 bg-transparent border-2 border-border-neon text-border-neon rounded-xl font-black uppercase tracking-widest transition-all hover:bg-border-neon hover:text-bg-main hover:shadow-[0_0_20px_#00f2fe] active:scale-95"
      >
        Optimizar RAM
      </button>
    </div>
    <div className="glass-card mb-5 !p-0 overflow-visible">
      <Toggle
        label="Auto-RAM"
        tooltip="Congela pestañas inactivas automáticamente."
        checked={settings.autoMode}
        onChange={(e) => updateSetting("autoMode", e.target.checked)}
      />
      <div className="flex justify-between items-center px-3 py-3 border-b border-white/5 bg-black/20 text-sm text-text-dim">
        <span className="font-medium">Intervalo (Segs):</span>
        <input
          type="number"
          min="10"
          className="w-[75px] bg-slate-900 border border-white/10 text-border-neon font-bold text-center rounded-lg px-2 py-1 outline-none"
          value={settings.intervalSeconds}
          onChange={(e) =>
            updateSetting("intervalSeconds", parseInt(e.target.value) || 300)
          }
        />
      </div>
      <Toggle
        label="Ahorro CPU"
        tooltip="Pausa procesos ocultos."
        checked={settings.cpuThrottle}
        onChange={(e) => updateSetting("cpuThrottle", e.target.checked)}
        isLast
      />
    </div>
    <NavButton
      title="Sitios Protegidos"
      icon="🛡️"
      onClick={() => setView("whitelist")}
    />
    <NavButton
      title="Ajustes Avanzados"
      icon="⚙️"
      onClick={() => setView("advanced")}
    />
    <NavButton
      title="Privacidad"
      icon="🔒"
      onClick={() => setView("privacy")}
      extraClass="mt-6 border-border-neon/20 opacity-80"
    />
  </>
);
