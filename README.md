# Curso de PWA con Recat en Platzi

Este repositorio contiene todo el contenido del curso a medida que construimos una app para ver recetas con la API de MealDB.

[ESte proyecto fue hecho com create-react-app](https://www.npmjs.com/package/create-react-app)

![Captura de Recetuki](./.readme-static/catura1.png)

## Como correr el proyecto
`npm install` para instalar las dependencias\
Es importante para no romper las configuraciones con workbox:\
`npm run build && npm start` Modo producción para ver las funcionalidades completas del service worker\
`npm run dev` Modo desarrollo\

## Lo visto en el curso en el orden dado:
Shortcut de la app en google mobile con manifest.json en public\
Optimización de precarga en red(network first) y de cache(staleWhileRevalidate). Puede verse en config-overrides.js\
Google analytics Offline con react-ga modificando App.js y service-workers\
Web Share API implementado en recipes.js en pages bajo la funcion compartir\
Trabajando bajo modo offline: Comunicarle al usuario el estado offline(ver en App.js y en componente IfOffline)\
Notificaciones: Ver la page Timer.js en pages, esta fue importada en App.js\
Nota:\
No se trata de push notifications, estas notificaciones requieren tener el browser abierto.

## Librerías instaladas para el WPA:
`npm add workbox-webpack-plugin `# OR npm install --save workbox-webpack-plugin\
`npm add react-app-rewire-workbox `# OR npm install --save react-app-rewire-workbox

If you don't have it already already, you also need:\
`npm add react-app-rewired `# OR npm install --save react-app-rewired

## LICENCIA
MIT