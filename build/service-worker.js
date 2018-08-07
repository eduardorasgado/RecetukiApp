importScripts("/precache-manifest.2b174f9ada61c3df9547496a4c95225f.js", "https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

/*
Recordar siempre iniciar el server testing con 
npm run build && npm start
y no con dev porque podemos romper muchas cosas que no podremos debuggear facilmente
*/
// custom service worker para precargar la app
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
// toma los css html, css cacheados y los guardara detras de excena
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

// manejar las urls que no sean el home y en vez de mandara una pagina de no internet
// workbox busca la pagina cacheada mas apropiada para ser cargada offline
workbox.routing.registerNavigationRoute('/index.html')

// regla de retoque de las request en el cache
workbox.routing.registerRoute(/^https?:\/\/www.themealdb.com\/api\/.*/, workbox.strategies.staleWhileRevalidate(), 'GET')
// regex
// s opcional
//cualquier ruta que empieza con http o https va a cargar networkFirst
// para toda peticion GET
// con ello podemos precargar todas las tabs que entremos y exploremos detro de la aplicacion
workbox.routing.registerRoute(/^https?.*/, workbox.strategies.networkFirst(), 'GET')
