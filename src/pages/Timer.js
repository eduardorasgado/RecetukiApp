import React from 'react'

export default class Timer extends React.Component {

  constructor(props) {
    super(props)
    this.state = { timer: 3, timeLeft: 0 }
  }

  start = async () => {
    /*
    Nota:
    No se trata de push notifications, estas notificaciones requieren tener el browser abierto.
    */
    // TODO: Chequear permisos
    if( ! ('Notification' in window) || ! ('serviceWorker' in navigator) ) {
      return alert('Tu browser no soporta notificaciones')
    }

    // chequear si tenemos el permiso para la notificacion
    // usualmente la primera vez que se corre esta en default
    if ( Notification.permission === 'default' ) {
      // entonces pedimos el permiso
      // nos avisara ne cuanto el user clickee y acepte si no no hara nada
      await Notification.requestPermission()
    }
    // no hacer nada en caso de rechazar el permiso
    if ( Notification.permission === 'blocked' ) {
      return alert("Has bloqueado las notificationes :(")
    }

    // solo para parar en caso de denegacion del perimso
    if ( Notification.permission !== 'granted' ) {
      return;
    }

    // en caso de que se haya aceptado el envio de notifications
    // Ir a show NOtifications -> ahi esta como mostrar las notificaciones

    var timer = this.state.timer
    this.setState({ timeLeft: timer })

    var countdownInterval = setInterval(() => {
      timer = timer - 1;
      this.setState({ timeLeft: timer }) 
      if( timer <= 0 ) { 
        clearInterval(countdownInterval) 
        this.showNotification()
      }
    }, 1000)
  }

  showNotification = async () => {
    // TODO: Enviar Notificación
    // esto solo funciona en android y en modo produccion
    const registration = await navigator.serviceWorker.getRegistration()

    // ojo el soporte no es parejo entre browsers
    // asi que hacemos chequeos
    if ( ! registration ) return alert("No hay un Service Worker :(")

    registration.showNotification(`Listo el Timer!`, {
      body: 'Ding ding ding',
      img: '/icon.png'
    })
  }

  handleChange = (e) => {
    this.setState({timer: e.target.value})
  }

  render () {
    const { timer, timeLeft } = this.state

    return <div className="Timer">
      <div className="name">Timer</div>
      { timeLeft === 0 ? 
        <div className="center">
          <input type="number" min="0" max="999" step="1" value={timer} onChange={this.handleChange} />
          <button onClick={ this.start }>Start</button>
        </div>
      :
        <div className="timeLeft">{ timeLeft }s</div>
      }
    </div>
  }
}
