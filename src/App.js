import React from 'react'
// cambiamos el BrowserRouter por Router
import { Router, Route, Link } from "react-router-dom"
import Home from './pages/Home'
import Recipe from './pages/Recipe'
import Timer from './pages/Timer'
// componente para notificar cuando se esta offline
import  IfOffline from './components/IfOffline'
import './App.css'

// google analytics offline
// para que funcione se agrega a workbox en service-workers
import ReactGA from 'react-ga'
import { createBrowserHistory } from 'history'

// crear la historia del browser
const history = createBrowserHistory()


// Inicializando ReactGA
// numero de ID fake: ID DE GOOGLE ANALYTICS -> Sustituir por uno real
ReactGA.initialize('UA-000000-01')

// trackeando la primera viewpage
ReactGA.pageview(window.location.pathname+window.location.search)

// trackear pages cada vez que cambia subsecuentemente
// -> pathname + busqueda
history.listen(function(location) {
  ReactGA.pageview(window.location.pathname+window.location.search)
})


export default class App extends React.Component {
  render() {
    return (
      <Router history={ history }>
        <div>
          <header>
            <Link to="/">Recetuki <IfOffline>Offline</IfOffline></Link>
          </header>

          <main>
            <Route exact path="/" component={Home} />
            <Route path="/recipe/:recipeId" component={Recipe} />
            <Route path="/timer" component={Timer} />
          </main>
        </div>
      </Router>
    );
  }
}
