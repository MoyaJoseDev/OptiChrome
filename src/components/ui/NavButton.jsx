export const NavButton = ({ title, icon, onClick, extraClass = "" }) => (
  <button onClick={onClick} className={`w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white flex justify-between mb-3 transition-all hover:border-border-neon hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:-translate-y-0.5 text-sm font-medium ${extraClass}`}>
    <span className="flex items-center gap-2.5"><span className="text-lg">{icon}</span> {title}</span>
    <span className="text-border-neon opacity-70">➔</span>
  </button>
);