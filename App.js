import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Constants from 'expo-constants';
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
import { setLocalNotification } from './utils/helpers'
import { white, gray, blue, pink, purple } from './utils/helpers'


const Tab = createMaterialTopTabNavigator()

const TabNav = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: () => {
        let icon
        if (route.name === 'Home') {
          icon = (<FontAwesome name="home" size={28} />)
        } else if (route.name === 'New Deck') {
          icon = (<FontAwesome name="file" size={23} />)
        } 
        return icon
      }
    })}
    tabBarOptions={{
      showIcon: true,
      showLabel: false,
      tabStyle: {
        height: 50
      }
    }}
  >
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
      options={{headerTintColor: white, 
                headerStyle:{
                  backgroundColor: purple
                } }} />
    <Stack.Screen
      name='Quiz'
      component={Quiz}
      options={{headerTintColor: white, headerStyle:{
          backgroundColor: blue
      } }} />
    <Stack.Screen
      name='Add Card'
      component={AddCard}
      options={{headerTintColor: white, headerStyle:{
          backgroundColor: pink
      } }} />
  </Stack.Navigator>
)

function UdaciStatusBar ({...props}) {
  return (
    <View style={{height: Constants.statusBarHeight }} >
      <StatusBar {...props} />
    </View>
  )
}

export default class App extends Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    const store = createStore(reducer)
    return (
      <Provider store={store}>
        <NavigationContainer>
          <UdaciStatusBar style='dark' />
          <MainNav />
        </NavigationContainer>
      </Provider>
    )
  }
}
