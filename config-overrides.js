// esto seconfigura, se agrega un service-worker custom en src y se modifica el manifest
/*
Para esto se instalaron:
yarn add workbox-webpack-plugin # OR npm install --save workbox-webpack-plugin
yarn add react-app-rewire-workbox # OR npm install --save react-app-rewire-workbox

# If you don't have it already already, you also need:
yarn add react-app-rewired # OR npm install --save react-app-rewired

desde:
https://github.com/davejm/react-app-rewire-workbox

*/
// configuracion minima para que funcione el service worker custom (el nueestro)
const {defaultInjectConfig, rewireWorkboxInject} = require('react-app-rewire-workbox')
const path = require('path');

module.exports = function override(config, env) {
  if (env === "production") {
    console.log("Generating Service Worker")

    const workboxConfig = {
      ...defaultInjectConfig,
      swSrc: path.join(__dirname, 'src', 'service-worker.js')
    }
    config = rewireWorkboxInject(workboxConfig)(config, env)
  }

  return config;
}