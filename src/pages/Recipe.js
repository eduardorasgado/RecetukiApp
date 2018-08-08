import React from 'react';
import { Helmet } from 'react-helmet'
import mealdb from '../mealdb-api'
import RecipeIngredients from '../components/RecipeIngredients'
import RecipeInstructions from '../components/RecipeInstructions'

export default class Recipe extends React.Component {

  constructor(props) {
    super(props)
    this.state = { recipe: null, isLoading: true }
  }

  async componentDidMount() {
    var recipe = null
    try {
      recipe = await mealdb.getRecipe(this.props.match.params.recipeId)
    } catch(e) {
      recipe = null
    }
    this.setState({ recipe, isLoading: false })
  }

  // ojo: la web share api solo funciona en https
  compartir = (event) => {
    event.preventDefault()
    // en caso de que el browser no soporta share
    if(! navigator.share) {
      alert("No podrás compartir la receta por problemas con tu browser :S")
      return
    }
    // traemos la recipe desde el estado
    const { recipe } = this.state
    // ahora para compartir
    navigator.share({
      title: `${recipe.name}`,
      text: `Receta de cocina para preparar ${recipe.name}`,
      // el location de la pagina gracias a location.href
      url: document.location.href
    })
    .then(() => alert("contenido compartido"))
    // en caso de error no hacemos nada
    .catch((e) => {
      alert(`Ha ocurrido un problema:${e.message}. Inténtalo más tarde :(`)
      return null
    })
  }

  render() {
    const { recipe, isLoading } = this.state

    if( isLoading ) {
      return <div className="message">Cargando...</div>
    }
    else if( recipe === null ) {
      return <div className="message">Hubo un problema :(</div>
    }

    return <div className="Recipe">
      <Helmet>
        <title>{ recipe.name }</title>
      </Helmet>

      <div className="hero" style={{ backgroundImage: `url(${recipe.thumbnail})` }} />
      
      <div className="title">
        <div className="info">
          <h1>{ recipe.name }</h1>
          <p>{ recipe.origin }</p>
        </div>
        <div>
          <a onClick={this.compartir} style={{fontWeight: 800, marginRight: 14}}>Share</a>
        </div>
      </div>


      <RecipeIngredients ingredients={ recipe.ingredients } />

      <RecipeInstructions instructions={ recipe.instructions } />

    </div>
  }

}