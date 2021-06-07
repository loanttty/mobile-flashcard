import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import {createStore} from "redux"
import reducer from "./reducers"
import Home from './components/Home'
import NewDeck from './components/NewDeck'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import  {FontAwesome, Ionicons} from "@expo/vector-icons"

const Tab = createMaterialTopTabNavigator()

const TabNav = () => (
  <Tab.Navigator 
    
  >
    <Tab.Screen name='Home' component={Home}/>
    <Tab.Screen name='New Deck' component={NewDeck}/>
  </Tab.Navigator>
)

export default class App extends Component {

  render() {
    const store = createStore(reducer)
    return (
      <Provider store={store}>
        <NavigationContainer>
          <TabNav />
        </NavigationContainer>
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
