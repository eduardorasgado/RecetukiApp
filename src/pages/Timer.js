import React from 'react'

export default class Timer extends React.Component {

  constructor(props) {
    super(props)
    this.state = { timer: 3, timeLeft: 0 }
  }

  start = async () => {
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
    if ( Notification.permissions !== 'granted' ) {
      return
    }

    // en caso de que se haya aceptado el envio de notifications

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
