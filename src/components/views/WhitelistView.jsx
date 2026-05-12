import React from "react";

// WhitelistView permite agregar o quitar sitios seguros.
export const WhitelistView = ({ whitelist, updateSetting, setView }) => {
  const [newSite, setNewSite] = React.useState("");

  const addSite = () => {
    const site = newSite.trim().toLowerCase();
    if (site && !whitelist.includes(site)) {
      updateSetting("whitelist", [site, ...whitelist]);
      setNewSite("");
    }
  };

  const removeSite = (site) => {
    updateSetting(
      "whitelist",
      whitelist.filter((s) => s !== site),
    );
  };

  return (
    <>
      <div className="flex items-center mb-6">
        <button
          onClick={() => setView("main")}
          className="bg-white/5 border border-white/10 text-white px-3 py-1.5 rounded-lg mr-3 hover:border-border-neon transition-all"
        >
          ⬅ Volver
        </button>
        <h3 className="m-0 text-lg text-white font-bold tracking-wide">
          Sitios Protegidos
        </h3>
      </div>
      <div className="glass-card">
        <div className="flex gap-2.5">
          <input
            type="text"
            placeholder="ej: github.com"
            className="flex-1 bg-slate-900 border border-white/10 text-border-neon rounded-lg px-3 py-2.5 outline-none"
            value={newSite}
            onChange={(e) => setNewSite(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSite()}
          />
          <button
            onClick={addSite}
            className="bg-border-neon text-bg-main font-black px-4 rounded-lg text-xl"
          >
            +
          </button>
        </div>
        <ul className="mt-5 p-0 max-h-[180px] overflow-y-auto pr-1">
          {whitelist.map((site, i) => (
            <li
              key={i}
              className="bg-white/5 p-3 rounded-lg mb-2 flex justify-between items-center border-l-4 border-border-neon text-[13px]"
            >
              {site}
              <button
                onClick={() => removeSite(site)}
                className="text-yt-red/70 hover:text-yt-red font-bold"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
