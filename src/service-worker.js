/*
**Importante: este archivo se crea en conjunto con config-overrrides y con la modificacion en
los scripts del package.json

Recordar siempre iniciar el server testing con 
npm run build && npm start
y no con dev porque podemos romper muchas cosas que no podremos debuggear facilmente

Dato:
El orden de las reglas importa muchisimo

*/
// custom service worker para precargar la app
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
// toma los css html, css cacheados y los guardara detras de excena
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

// manejar las urls que no sean el home y en vez de mandara una pagina de no internet
// workbox busca la pagina cacheada mas apropiada para ser cargada offline
workbox.routing.registerNavigationRoute('/index.html')

// REGLAS:

// regla de retoque de las request en el cache
// evitando cacheFirst para no cachear de por vida
workbox.routing.registerRoute(/^https?:\/\/www.themealdb.com\/api\/.*/,
	workbox.strategies.staleWhileRevalidate(), 'GET')

// regla para las fuentes: matchea todas las fuentes de google
// Ojo porque con cache first cacheamos de por vida: SOLO hacerlo con elementos
// que sabemos no van a cambiar nunca o al menos no en una semana + o -
workbox.routing.registerRoute(/^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,
	workbox.strategies.cacheFirst({
		cacheName: 'google-fonts-cache',
		plugins: [
			// cache que va a vencer en 2 dias 
			new workbox.expiration.Plugin({
				maxAgeSeconds: 48 * 60 * 60
			})
		]
	}), 'GET')

// ojo: es recomendable que esta regla vaya al final, igual todas las "por defecto"
// regex
// s del https es opcional
//cualquier ruta que empieza con http o https va a cargar networkFirst
// para toda peticion GET
// con ello podemos precargar todas las tabs que entremos y exploremos detro de la aplicacion
workbox.routing.registerRoute(/^https?.*/, workbox.strategies.networkFirst(), 'GET')