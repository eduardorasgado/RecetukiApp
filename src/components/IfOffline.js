import React from 'react'

export default class IfOffline extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			// en caso de server side rendering como con next js
			onLine: navigator ? navigator.onLine : true
		}
	}

	// seteando event listeners para verificar estado off/on
	componentDidMount() {
		// chequear features por tema de server side rendering en caso de net js
		if (!window) return
			//cuando el browser nos indica que esta online se modifica el estado del componente
		window.addEventListener('online', this.goOnline)
		// si el browser se ponen offline entonces renderiza de nuevo
		window.addEventListener('offline', this.goOffline)
	}

	//quitando eventListeners
	// para no dejarlos correr y que podria tirar errores
	componentWillUnmount() {
		window.removeEventListener('online', this.goOnline)
		window.removeEventListener('offline', this.goOffline)
	}

	goOnline = () => { this.setState({	onLine: true }) }

	goOffline = () => { this.setState({ onLine: false }) }

	render() {
		// <IfOffline>Esto se ve cuando estamos offline</IfOffline>
		const { children } = this.props
		const { onLine } = this.state

		if ( onLine ){
			return null
		}
		return <span>{ children }</span>
	}
}