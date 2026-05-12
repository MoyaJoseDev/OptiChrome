import React from "react";
import { Toggle } from "../ui/Toggle";

// SettingsGroup organiza cada bloque de toggles en la vista avanzada.
const SettingsGroup = ({ title, icon, children, titleColor }) => (
  <div className="mb-5 last:mb-0">
    <h4
      className={`text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2 ${titleColor}`}
    >
      <span>{icon}</span> {title}
    </h4>
    <div className="bg-[#0b1221] border border-white/10 rounded-xl overflow-hidden shadow-inner">
      {children}
    </div>
  </div>
);

// AdvancedView muestra las opciones específicas para mejorar YouTube.
export const AdvancedView = ({ settings, updateSetting, setView }) => (
  <div className="h-full flex flex-col">
    <div className="flex items-center mb-5 shrink-0">
      <button
        onClick={() => setView("main")}
        className="bg-white/5 border border-white/10 text-white px-3 py-1.5 rounded-lg mr-3 hover:bg-border-neon hover:text-bg-main hover:border-border-neon transition-all shadow-sm"
      >
        ⬅ Volver
      </button>
      <h3 className="m-0 text-lg text-white font-bold tracking-wide">
        YouTube Labs
      </h3>
    </div>

    <div className="glass-card max-h-[380px] overflow-y-auto pr-3 -mr-2">
      <SettingsGroup
        title="OptiBlock YT"
        icon="🛡️"
        titleColor="text-[#ffb300] drop-shadow-[0_0_5px_rgba(255,179,0,0.4)]"
      >
        <Toggle
          label="Bloquear Anuncios"
          tooltip="Oculta banners y salta los anuncios de video automáticamente al instante."
          checked={settings.ytAdBlock}
          onChange={(e) => updateSetting("ytAdBlock", e.target.checked)}
          isLast
        />
      </SettingsGroup>

      <SettingsGroup
        title="Interfaz y Estética"
        icon="🎨"
        titleColor="text-yt-red drop-shadow-[0_0_5px_rgba(255,71,87,0.4)]"
      >
        <Toggle
          label="Modo Ambiente"
          tooltip="Apaga el resplandor de luz detrás del reproductor."
          checked={settings.ytAmbient}
          onChange={(e) => updateSetting("ytAmbient", e.target.checked)}
        />
        <Toggle
          label="Vistas Previas"
          tooltip="Evita que el video se reproduzca al pasar el ratón."
          checked={settings.ytPreviews}
          onChange={(e) => updateSetting("ytPreviews", e.target.checked)}
        />
        <Toggle
          label="Chat en Vivo"
          tooltip="Oculta el panel de chat en las transmisiones en directo."
          checked={settings.ytChat}
          onChange={(e) => updateSetting("ytChat", e.target.checked)}
        />
        <Toggle
          label="Comentarios"
          tooltip="Oculta la sección de comentarios para acelerar la carga."
          checked={settings.ytComments}
          onChange={(e) => updateSetting("ytComments", e.target.checked)}
          isLast
        />
      </SettingsGroup>

      <SettingsGroup
        title="Rendimiento Extremo"
        icon="🚀"
        titleColor="text-border-neon drop-shadow-[0_0_5px_rgba(0,242,254,0.4)]"
      >
        <Toggle
          label="Diseño Retro"
          tooltip="Quita animaciones y redondeos de la interfaz."
          checked={settings.ytRetro}
          onChange={(e) => updateSetting("ytRetro", e.target.checked)}
        />
        <Toggle
          label="Bloquear Shorts"
          tooltip="Elimina por completo la sección de videos cortos."
          checked={settings.ytNoShorts}
          onChange={(e) => updateSetting("ytNoShorts", e.target.checked)}
        />
        <Toggle
          label="Sin Esqueletos"
          tooltip="Oculta las cajas grises de carga."
          checked={settings.ytNoSkeletons}
          onChange={(e) => updateSetting("ytNoSkeletons", e.target.checked)}
        />
        <Toggle
          label="Sin Avatares"
          tooltip="Oculta las fotos de perfil."
          checked={settings.ytNoAvatars}
          onChange={(e) => updateSetting("ytNoAvatars", e.target.checked)}
        />
        <Toggle
          label="Barra Estática"
          tooltip="La barra de búsqueda no te persigue al hacer scroll."
          checked={settings.ytStaticNav}
          onChange={(e) => updateSetting("ytStaticNav", e.target.checked)}
        />
        <Toggle
          label="Grilla Compacta"
          tooltip="Achica las miniaturas para mostrar más contenido."
          checked={settings.ytCompactGrid}
          onChange={(e) => updateSetting("ytCompactGrid", e.target.checked)}
        />
        <Toggle
          label="Sin Recomendados"
          tooltip="Oculta la barra lateral mientras miras un video."
          checked={settings.ytNoSidebar}
          onChange={(e) => updateSetting("ytNoSidebar", e.target.checked)}
          isLast
        />
      </SettingsGroup>
    </div>
  </div>
);
