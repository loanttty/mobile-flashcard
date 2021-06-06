import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getDecks, removeDeck } from './utils/helpers';


export default class App extends Component {
  state = ''

  componentDidMount() {
    getDecks()
      .then((results) => {
        const data = JSON.parse(results)
        this.setState(data)})
  }

  removeDeck = (id) => {
    removeDeck(id)
      .then((results) => {
        const data = JSON.parse(results)
        this.setState(data)})
  }

  render() {
    const decks = Object.values(this.state)
    //console.log(this.state)
    return (
      <View style={styles.container}>
        {decks.map((deck) =>
        <View key={deck.title}>
          <Text>{deck.title}</Text>
          <Text>{deck.questions.length} {deck.questions.length > 1 ? 'cards' : 'card'}</Text>
          <TouchableOpacity
            onPress={this.removeDeck(deck.title)}
          >Delete Deck</TouchableOpacity>
        </View>)}
        <StatusBar style="auto" />
      </View>
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
