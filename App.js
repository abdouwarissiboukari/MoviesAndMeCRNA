// App.js

import React from 'react'
//import Search from './Components/Search'
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

export default class App extends React.Component {
  render() {
    return (
      //<Search/>
      <Provider store={Store}>
        <Navigation/>
      </Provider>
    )
  }
}
