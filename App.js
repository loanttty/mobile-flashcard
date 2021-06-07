import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import {createStore} from "redux"
import reducer from "./reducers"
import Home from './components/Home'
import NewDeck from './components/NewDeck'

export default class App extends Component {

  render() {
    const store = createStore(reducer)
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Home />
          <NewDeck />
          <StatusBar style="auto" />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
