export const Footer = () => (
  <div className="mt-6 pt-5 border-t border-white/5 text-center pb-1">
    <p className="text-[11px] text-text-dim m-0 mb-1">Proyecto <span className="text-[10px] text-border-neon font-bold uppercase tracking-wider">OpenSource</span></p>
    <a href="https://github.com/MoyaJoseDev" target="_blank" className="text-slate-300 font-black text-sm no-underline hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">José T. Moya</a>
    
    <div className="mt-4">
      <a href="https://donacionesjosemoya.netlify.app/" target="_blank" className="inline-flex items-center gap-2 text-[#f59e0b] border border-[#f59e0b]/50 bg-[#f59e0b]/5 px-5 py-2.5 rounded-xl text-[11px] font-black tracking-widest no-underline transition-all hover:bg-[#f59e0b] hover:text-[#050a15] hover:border-[#f59e0b] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:-translate-y-1">
        ☕ APOYAR PROYECTO
      </a>
    </div>
  </div>
);