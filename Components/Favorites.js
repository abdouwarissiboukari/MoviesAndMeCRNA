// Components/Favorites.js

import React from 'react'
import {StyleSheet, View, TextInput, Text, Button, FlatList, ActivityIndicator } from 'react-native'
import FilmList from './FilmList'
import { getFilmsFromApiWithSearchedText} from '../API/TMDBApi' // import { } from ... car c'est un export nommé dans TMDBApi.js
import { connect } from 'react-redux'


class Favorites extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
      isLoading: true // Par défaut à true car il y a de chargement
    }
  }

  componentDidMount () {
    this.setState({
      isLoading: false
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
    return (
      <View style={styles.main_container}>

        <FilmList
          navigation={this.props.navigation}
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
  }
})

export default Favorites
