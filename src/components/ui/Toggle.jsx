export const Toggle = ({ label, checked, onChange, tooltip, isLast }) => (
  <div className={`group flex justify-between items-center px-3 py-3 transition-colors hover:bg-white/5 ${!isLast ? 'border-b border-white/5' : ''}`}>
    <span className="flex items-center text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
      {label}
      {tooltip && (
        <span className="ml-2 w-4 h-4 flex items-center justify-center rounded-full border border-slate-600 text-slate-500 text-[10px] cursor-help relative hover:border-border-neon hover:text-border-neon hover:bg-border-neon/10 transition-all">
          ?
          <div className="absolute bottom-[140%] left-[-20px] translate-y-2 scale-90 opacity-0 pointer-events-none group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 bg-bg-main border border-border-neon text-slate-200 p-3 rounded-lg w-52 text-left shadow-[0_5px_15px_rgba(0,0,0,0.8),0_0_10px_rgba(0,242,254,0.3)] z-50 font-normal leading-relaxed tracking-wide">
            {tooltip}
          </div>
        </span>
      )}
    </span>
    <label className="relative inline-block w-10 h-5 cursor-pointer">
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
      <div className="w-10 h-5 bg-slate-800 rounded-full peer peer-checked:bg-border-neon peer-checked:shadow-[0_0_12px_rgba(0,242,254,0.5)] transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-[20px]"></div>
    </label>
  </div>
);