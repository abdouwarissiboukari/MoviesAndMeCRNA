// Navigation/Navigation.js

import React from 'react'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator } from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {StyleSheet, Image} from 'react-native'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'
import Test from '../Components/Test'

const SearchStackNavigation = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  FilmDetail: {
    screen: FilmDetail,
    navigationOptions: {
    title: 'Détail du film'
    }
  }
})

const FavoriteStackNavigation = createStackNavigator({
  favorites: {
    screen: Favorites,
    navigationOptions: {
      title: 'Films favoris'
    }
  },
  FilmDetail: {
    screen: FilmDetail,
    navigationOptions: {
      title: 'Détail du film'
    }
  }
})

const MoviesTabNavigator = createBottomTabNavigator({
  /*Test: {
    screen: Test
  },*/

  Search: {
    screen: SearchStackNavigation,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../Images/ic_search.png')}
          style={styles.icon} />
      }
    }
  },
  Favorites: {
    screen: FavoriteStackNavigation,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../Images/ic_favorite.png')}
          style={styles.icon} />
      }
    }
  }
},
{
  tabBarOptions: {
      activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
      inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
      showLabel: false, // On masque les titres
      showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
  }
}
)

const styles= StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default createAppContainer(MoviesTabNavigator)
