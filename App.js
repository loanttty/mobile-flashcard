import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import {createStore} from "redux"
import reducer from "./reducers"
import Home from './components/Home'
import NewDeck from './components/NewDeck'
import DeckView from './components/DeckView'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import  {FontAwesome, Ionicons} from "@expo/vector-icons"
import { createStackNavigator} from "@react-navigation/stack"
import { setLocalNotification } from './utils/helpers';

const Tab = createMaterialTopTabNavigator()

const TabNav = () => (
  <Tab.Navigator>
    <Tab.Screen name='Home' component={Home}/>
    <Tab.Screen name='New Deck' component={NewDeck}/>
  </Tab.Navigator>
)

const Stack = createStackNavigator()

const MainNav = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='Home'
      component={TabNav}
      options={{headerShown: false}} />
    <Stack.Screen
      name='Deck View'
      component={DeckView}
      options={{headerTintColor: 'white', headerStyle:{
          backgroundColor: 'purple'
      } }} />
    <Stack.Screen
      name='Quiz'
      component={Quiz}
      options={{headerTintColor: 'white', headerStyle:{
          backgroundColor: 'blue'
      } }} />
    <Stack.Screen
      name='Add Card'
      component={AddCard}
      options={{headerTintColor: 'white', headerStyle:{
          backgroundColor: 'pink'
      } }} />
  </Stack.Navigator>
)

export default class App extends Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    const store = createStore(reducer)
    return (
      <Provider store={store}>
        <NavigationContainer>
          <MainNav />
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
