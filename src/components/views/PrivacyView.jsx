import React from 'react';

export const PrivacyView = ({ setView }) => (
  <>
    <div className="flex items-center mb-6">
      <button onClick={() => setView('main')} className="bg-white/5 border border-white/10 text-white px-3 py-1.5 rounded-lg mr-3 hover:bg-border-neon hover:text-bg-main hover:border-border-neon transition-all shadow-sm">⬅ Volver</button>
      <h3 className="m-0 text-lg text-white font-bold tracking-wide">Transparencia</h3>
    </div>
    <div className="glass-card text-xs leading-relaxed text-text-dim">
      <div className="bg-border-neon/10 border border-border-neon/20 p-3 rounded-lg mb-4 text-border-neon font-medium text-center">
        Tu privacidad está garantizada por diseño.
      </div>
      <ul className="pl-4 space-y-3 marker:text-border-neon">
        <li><strong className="text-white">Cero Recopilación:</strong> No guardamos, rastreamos ni enviamos tu historial o actividad.</li>
        <li><strong className="text-white">Procesamiento Local:</strong> Toda la magia ocurre exclusivamente en el procesador de tu computadora.</li>
        <li><strong className="text-white">Permisos Estrictos:</strong> Solo accedemos a tus pestañas para poder pausarlas, nunca leemos su contenido.</li>
      </ul>
    </div>
  </>
);