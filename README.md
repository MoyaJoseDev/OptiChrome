# OptiChrome

OptiChrome es una extensión de navegador pensada para ahorrar memoria y mejorar la experiencia de YouTube.

## Qué hace

- limpia o descarta pestañas inactivas para liberar RAM
- permite proteger sitios que no querés cerrar
- pausa animaciones y videos en pestañas ocultas para ahorrar CPU
- ofrece opciones para ocultar elementos de YouTube como anuncios, chat, comentarios y shorts

## Cómo funciona

La aplicación tiene dos partes:

1. **Popup**: aquí eliges las opciones y guardas tus preferencias.
2. **Background**: corre en segundo plano y ejecuta la limpieza automática cuando corresponde.

Cuando activás el modo automático, el fondo revisa las pestañas inactivas y descarta las que no están en la lista de sitios protegidos.

## Opciones principales

- `Auto-RAM`: activa la limpieza periódica de pestañas inactivas.
- `Intervalo`: define cada cuántos segundos se revisan las pestañas.
- `Ahorro CPU`: pausa animaciones y videos cuando la pestaña está oculta.
- `Sitios Protegidos`: agrega dominios que nunca querés cerrar.

## YouTube Labs

Aquí podés activar ajustes específicos para YouTube:

- bloquear anuncios
- ocultar chat en vivo
- quitar comentarios
- eliminar shorts
- hacer la interfaz más simple y rápida

## Privacidad

- no se guarda tu historial de navegación
- no se envía información a servidores externos
- la extensión solo mira las pestañas para poder pausarlas o descartarlas

## Estructura del proyecto

- `src/App.jsx`: controlador principal del popup.
- `src/background.js`: lógica de limpieza en segundo plano.
- `src/optimizaciones/throttler.js`: ahorra CPU en pestañas ocultas.
- `src/optimizaciones/youtube.js`: aplica cambios en YouTube.
- `src/safezones.js`: lista de sitios protegidos iniciales.
- `src/components/`: componentes de la interfaz.

## Uso rápido

1. abre la extensión en el navegador
2. activa `Auto-RAM` si querés limpieza automática
3. ajusta el intervalo si querés que revise con más o menos frecuencia
4. agrega a la lista de sitios protegidos los dominios que no querés cerrar
5. usa `Optimizar RAM` para limpiar ahora mismo
