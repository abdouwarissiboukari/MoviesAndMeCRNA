// Components/Search.js
import React from 'react'
import {StyleSheet, View, TextInput, Text, Button, FlatList, ActivityIndicator } from 'react-native'
//import films from '../Helpers/filmsData'
//import FilmItem from './FilmItem'
import FilmList from './FilmList'
import { getFilmsFromApiWithSearchedText} from '../API/TMDBApi' // import { } from ... car c'est un export nommé dans TMDBApi.js
//import { connect } from 'react-redux'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.searchedText= "" // Initialisation de notre donnée searchedText dans le state
    this.page = 0 // Compteur pour connaitre la page courante
    this.totalPages = 0 // Nombre total de pages pour savoir si on a atteint la fin des retours de api tmdb
    this.state = {
      films: [],
      isLoading: false // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
    }
    this._loadFilms = this._loadFilms.bind(this)
  }

  _loadFilms() {
    //console.log(this.state.searchedText) // Un log pour vérifier qu'on a bien le texte du TextInput

    if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
        this.setState({ isLoading: true }) // lancement du chargement
        getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
          this.page=data.page
          this.totalPages=data.total_pages
          this.setState({
            films: this.state.films.concat(data.results), //[ ...this.state.films, ...data.results],
            isLoading: false // Arret du chargement
          })
      })
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText= text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
  }

  _searchFilms() {
    this.page=0
    this.totalPages=0
    this.setState({
      films: [],
    }, () => {
      //console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)

      this._loadFilms()
    })
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' color="#0000ff"/>
          {/* Le component ActivityIndicator possède une propriété
            size pour définir la taille du visuel de chargement :
            small ou large. Par défaut size vaut small, on met
            donc large pour que le chargement soit bien visible */}
        </View>
      )
    }
  }

  _displayDetailForFilm = (film) => {
    //console.log("Display film with id " + idFilm)
    this.props.navigation.navigate("FilmDetail", {film: film})
  }

  render() {
        //console.log(this.props)
        return (
          <View style={styles.main_container}>
            <TextInput
              style={styles.textinput}
              placeholder='Titre du film'
              onChangeText={(text) => this._searchTextInputChanged(text)}
              onSubmitEditing={() => this._searchFilms()}
              />

            <Button style={styles.button} title='Rechercher' onPress={() => this._searchFilms()}/>

            <FilmList
              films={this.state.films}
              navigation={this.props.navigation}
              loadFilms={this._loadFilms}
              page={this.page}
              totalPages={this.totalPages}
              screenType={1}
              />
            {this._displayLoading()}
          </View>
        )
    }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 10
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 120,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

//const mapStateToProps = state => {
  //return {
    //favoritesFilm: state.favoritesFilm
  //}
//}

//export  default connect(mapStateToProps)(Search)
export  default Search
