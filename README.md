# Curso de PWA con Recat en Platzi

Este repositorio contiene todo el contenido del curso a medida que construimos una app para ver recetas con la API de MealDB.

Hay un branch por clase para que puedas navegar con facilidad el curso.

Es importante para no romper las configuraciones con workbox:\
Solamente testear con:
`npm run build && npm start`

## Lo visto en el curso en el orden dado:
Shortcut de la app en google mobile con manifest.json en public\
Optimización de precarga en red(network first) y de cache(staleWhileRevalidate). Puede verse en config-overrides.js\
Google analytics Offline con react-ga modificando App.js y service-workers

## Librerías instaladas para el WPA:
`npm add workbox-webpack-plugin `# OR npm install --save workbox-webpack-plugin\
`npm add react-app-rewire-workbox `# OR npm install --save react-app-rewire-workbox

If you don't have it already already, you also need:\
`npm add react-app-rewired `# OR npm install --save react-app-rewired