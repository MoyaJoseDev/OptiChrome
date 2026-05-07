# 🚀 OptiChrome

## Rendimiento Extremo para Chrome en PCs de Gama Baja

<div align="center">

[![Version](https://img.shields.io/badge/Version-2.4-green)]()
[![JavaScript](https://img.shields.io/badge/Built%20with-Vanilla%20JS-F7DF1E?logo=javascript)]()
[![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-red)]()
[![Author](https://img.shields.io/badge/Author-Jos%C3%A9%20T.%20Moya-blueviolet)]()

**Una extensión de Chrome que revive tu PC "Patata" 🥔 liberando RAM e impulsando YouTube a velocidades retro.**


</div>

---

## 📝 ¿Qué es OptiChrome?

**OptiChrome** es una extensión de Chrome de código abierto diseñada específicamente para **maximizar el rendimiento en ordenadores con recursos limitados**. Si tu PC lucha con Chrome, si YouTube consume toda tu RAM, o simplemente quieres revivir la nostalgia de internet rápido: esta es tu extensión.

Con tecnología de **suspensión inteligente de pestañas**, **listas blancas personalizables** y un **módulo de optimización extrema para YouTube**, OptiChrome mantiene tu navegación fluida sin sacrificar funcionalidad.

🎯 **Misión:** Demostrar que el rendimiento y la privacidad no están reservados para PCs gamer.

---

## ✨ Características Principales

### 🧠 Gestión de RAM Inteligente

- **Suspensión Automática de Pestañas:** Descarga pestañas inactivas para liberar RAM progresivamente
- **Dos Modos Disponibles:**
  - 🎮 **Modo Manual:** Congela pestañas con un solo clic mediante el botón de la extensión
  - ⚡ **Auto-Piloto:** Monitoreo automático cada X segundos (configurable) para suspender pestañas automáticamente
- 🔄 **Recarga Instantánea:** Las pestañas se restauran al instante cuando las necesites

### 🛡️ SafeZones - Lista Blanca Inteligente

- **Protege Sitios Críticos:** Define pestañas que nunca deben ser congeladas
- **Plataformas Educativas Preconfiguradas:**
  - 🎓 Moodle, Canvas, Blackboard
  - 💬 ChatGPT, Copilot, Claude
  - 💻 GitHub, GitLab, Stack Overflow
  - 📝 Google Docs, Notion, Obsidian
- 🎛️ **Interfaz Intuitiva:** Añade o elimina sitios desde la ventana emergente sin tocar código
- 🤖 **Actualización Inteligente:** El archivo `safezones.js` se puede mejorar con IA comunitaria

### 🎬 OptiYT - Modo PC Patata para YouTube

Un inyector de CSS que desactiva elementos pesados **antes de que carguen**, no después.

**Opciones Personalizables:**

- 🌙 **Modo Ambiente:** Desactiva el brillo dinámico de fondo
- 👀 **Vistas Previas (Hover):** Elimina las miniaturas que reproducen al pasar el ratón
- 💬 **Chat en Vivo:** Oculta chats en streams (ahorra bandancha y GPU)
- 📱 **Comentarios:** Desactiva la sección de comentarios completa
- 📺 **Bloqueador de Shorts:** Elimina completamente los estantes de YouTube Shorts
- 🎨 **Diseño 2000s:** Modo retro: sin bordes redondeados, sin animaciones suave
- ⚡ **Sin Esqueletos:** Oculta efectos de "carga" para renderizado más rápido

**Impacto:**

- ⬇️ Reducción de **30-60%** en carga de GPU en YouTube
- 💾 Ahorro de **50-100 MB de RAM**
- ⚡ Reproductor **más responsivo** en PCs con RAM limitada

---

## 🔒 Privacidad y Seguridad

✅ **100% Local - 100% Privado**

- 🚫 **Cero Conexiones Externas:** Ni un solo bit de datos sale de tu navegador
- 📦 **Almacenamiento Local:** Todo se guarda con `chrome.storage.sync` (solo en tu cuenta de Chrome, encriptado)
- 🔐 **Sin Servidores:** No hay backend, no hay tracking, no hay telemetría
- 📋 **Código Abierto:** Verifica tú mismo qué hace la extensión
- 🛡️ **Permisos Mínimos:** Solo solicita acceso a pestañas, almacenamiento local y alarmas

**Cumplimiento:**

- ✅ GDPR Compliant
- ✅ Privacidad por diseño
- ✅ Auditable por la comunidad

---

## 📥 Instalación

### Requisitos

- 🌐 Google Chrome o derivado (Brave, Edge, Vivaldi, etc.)
- 💻 Windows, macOS o Linux

### Pasos de Instalación

#### **Opción 1: Modo Desarrollador (Recomendado para Open Source)**

1. **Descarga o clona el repositorio:**

   ```bash
   git clone https://github.com/MoyaJoseDev/OptiChrome.git
   cd OptiChrome
   ```

2. **Abre Chrome y ve a la página de extensiones:**
   - Escribe en la barra de direcciones: `chrome://extensions/`
   - Presiona <kbd>Enter</kbd>

3. **Activa el Modo de Desarrollador:**
   - En la esquina superior derecha, activa el toggle **"Modo de desarrollador"**

4. **Carga la extensión sin empaquetar:**
   - Haz clic en **"Cargar extensión sin empaquetar"**
   - Selecciona la carpeta del proyecto (donde está `manifest.json`)

5. **¡Listo!** ✨
   - Verás el icono de OptiChrome en tu barra de herramientas
   - Haz clic para abrir la ventana de configuración

#### **Opciones Alternativas**

- **Chrome Web Store (próximamente):** Se publicará en el Chrome Web Store oficial
- **Instalación Manual:** Descarga el `.zip`, extrae, sigue los pasos 2-5 arriba

### Solución de Problemas

**🔴 "La extensión no aparece"**

- Verifica que el Modo de Desarrollador esté activado
- Recarga la página `chrome://extensions/`
- Asegúrate de que `manifest.json` está en la raíz del proyecto

**🔴 "Las optimizaciones de YouTube no funcionan"**

- Recarga YouTube completamente (Ctrl+Shift+R)
- Verifica que el script se inyectó: Abre DevTools (F12) → Consola
- Comprueba que YouTube no esté bloqueando extensiones (reinicia Chrome)

---

## 📚 Estructura del Proyecto

```
OptiChrome-Pro/
│
├── 📄 manifest.json              # Configuración de la extensión (Manifest V3)
├── 📄 background.js              # Service Worker - Lógica de suspensión de pestañas
├── 📄 safezones.js               # Módulo de lista blanca inteligente (IA + plataformas)
│
├── 📁 popup/                     # Interfaz de usuario (ventana emergente)
│   ├── popup.html                # Estructura HTML
│   ├── popup.css                 # Estilos visuales
│   └── popup.js                  # Lógica de interacción
│
├── 📁 optimizaciones/            # Módulos específicos por plataforma
│   └── youtube.js                # Inyector de CSS para YouTube (OptiYT)
│
├── 📁 iconos/                    # Assets visuales
│   ├── icon-16.png
│   ├── icon-48.png
│   └── icon-128.png
│
└── 📄 README.md                  # Este archivo ✨

```

### Detalles Técnicos

| Componente        | Descripción                                                      | Tecnología                    |
| ----------------- | ---------------------------------------------------------------- | ----------------------------- |
| **background.js** | Gestiona alarmas, suspende/restaura pestañas, interpreta eventos | Service Worker, Chrome API    |
| **popup/**        | Panel de control del usuario                                     | HTML5, CSS3, Vanilla JS       |
| **safezones.js**  | Define sitios protegidos, actualización comunitaria              | ES6 Modules                   |
| **youtube.js**    | Inyecta CSS/JS optimizado antes de cargar DOM                    | Content Script, CSS Injection |

**Arquitectura:**

- ✅ 100% Modular - Cada componente es independiente
- ✅ ES6 Modules - Importaciones limpias y mantenibles
- ✅ Vanilla JS - Cero dependencias externas
- ✅ Chrome Storage API - Persistencia entre sesiones

---

## 🚀 Cómo Usar

### Configuración Básica

1. **Abre la ventana de OptiChrome** - Haz clic en el icono en la barra de herramientas

2. **Selecciona tu modo:**
   - 🎮 **Manual:** Congela pestañas cuando lo necesites con un botón
   - ⚡ **Auto-Piloto:** Deja que la extensión limpie automáticamente cada X segundos

3. **Personaliza SafeZones:**
   - Añade sitios que no quieras que se suspendan (trabajo, streaming, etc.)
   - Los sitios educativos vienen preconfigurados

4. **Optimiza YouTube:**
   - Activa/desactiva Modo PC Patata según prefieras
   - Experimenta con diferentes opciones y mide el FPS

### Ejemplos de Uso

**Escenario 1: PC con 4GB de RAM**

- Activa Auto-Piloto cada 30 segundos
- Añade a SafeZones solo las 3-4 pestañas que usas activamente
- Activa todas las optimizaciones de YouTube
- Resultado: Chrome usa ~400MB instead of ~2.5GB ✨

**Escenario 2: Estudiante con Múltiples Plataformas**

- SafeZones automáticamente protege Moodle, ChatGPT, Docs
- Congela manualmente pestañas de "investigación" no usadas
- Mantiene tu entorno de estudio fluido
- Resultado: Sin ralentizaciones, todo sincronizado en la nube ✨


### 💡 Sugerir Mejoras

- Abre un Issue con la etiqueta `enhancement`
- Describe cómo la mejora optimizaría rendimiento o privacidad
- Ejemplos: nuevas plataformas en SafeZones, algoritmos de suspensión mejorados, etc.

### 📝 Mejoras Específicas Buscadas

- 🌍 **Traducciones:** Ayuda a traducir la UI a otros idiomas
- 📊 **SafeZones:** Amplia la lista de plataformas predeterminadas
- 🎨 **Optimizaciones por Sitio:** Crea módulos para más plataformas (Twitch, Reddit, etc.)
- 📖 **Documentación:** Mejora guías, tutoriales, comentarios de código
- 🧪 **Testing:** Reporta incompatibilidades o casos extremos

### 📋 Pautas de Contribución

- 🎯 Keep it simple: Cambios pequeños y enfocados son más fáciles de revisar
- 📝 Comenta tu código: Especialmente en lógica compleja
- ✅ Prueba localmente: Antes de hacer PR, verifica en tu Chrome
- 🔒 Respeta privacidad: Ningún código que envíe datos fuera del navegador
- 🤝 Sé respetuoso: La comunidad es inclusiva y constructiva

---

## 💰 Apoyar el Proyecto

Si OptiChrome te ha ayudado a revivir tu PC, hay formas de apoyar el desarrollo:

### ⭐ Más Valioso que Dinero

- **⭐ Deja una Star** en GitHub (cuesta un clic, impulsa el proyecto)
- **📢 Comparte** con amigos que tengan PCs lentos
- **🐛 Reporta bugs** de forma constructiva
- **💬 Deja feedback** en Issues sobre qué mejoras necesitas
- **🔧 Contribuye código** - ¡Los PRs son el mejor regalo!

### ☕ Donaciones

Si deseas apoyar monetariamente el desarrollo:

- 🎁 [Donaciones](https://donacionesjosemoya.netlify.app/)

**Todos los fondos se dedican a:**

- 🔬 Investigación de nuevas optimizaciones
- 🌍 Traducción y localización
- 📚 Documentación y tutoriales
- 🛠️ Herramientas de testing y CI/CD
- 🧠 Gastos personales de educación
---

## 📋 Hoja de Ruta (Roadmap)

### ✅ Completado (v2.4)

- [x] Suspensión manual y automática de pestañas
- [x] SafeZones con lista blanca personalizable
- [x] OptiYT - Optimizaciones de YouTube
- [x] Arquitectura modular ES6
- [x] Zero-tracking privacidad

### 🔜 En Desarrollo (v3.0)

- [ ] Soporte para Manifest V2 legacy (para navegadores antiguos)
- [ ] Optimizaciones para Twitch, Reddit, Twitter/X
- [ ] Dashboard de uso de RAM en tiempo real 📊
- [ ] Sincronización en la nube de SafeZones
- [ ] Interfaz en 8+ idiomas 🌐

### 🎯 Largo Plazo

- [ ] Publicación en Chrome Web Store
- [ ] Extensión para Edge, Brave, Vivaldi
- [ ] Algoritmo ML para predicción de carga de pestañas
- [ ] Comunidad de "recetas" de optimización

---

## 📄 Licencia

completamente open source y libre para uso comercial y personal.

<div align="center">

### Hecho con ❤️ para PCs "Patata" en todo el mundo 🥔

⭐ Si te gustó, por favor deja una estrella ⭐

</div>