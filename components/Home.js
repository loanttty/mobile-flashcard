import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { getDecks, removeDeck } from '../utils/helpers';
import { connect } from 'react-redux'
import {receiveEntries, deleteDeck} from '../actions'


class Home extends Component {
	state = {
		ready: false
	}
  componentDidMount() {
    getDecks()
      .then((results) => {
        this.props.dispatch(receiveEntries(results))})
			.then(() => this.setState({
				ready: true
			}))
  }

  removeDeck = (id) => {
    removeDeck(id)
      .then(() => {
        this.props.dispatch(deleteDeck(id))
      })
  }
	
	goToDeck = (deckTitle) => {
		// go to individual deck
		this.props.navigation.navigate('Deck View', deckTitle)
	}

  render() {
			const decks = Object.values(this.props.entries)
			return (
				<View style={styles.container}>
        {decks.map((deck) =>
        <View key={deck.title}>
          <TouchableHighlight
			onPress={() => this.goToDeck({
				title: deck.title})}
			>
			<View>
				<Text>{deck.title}</Text>
				<Text>{deck.questions.length} {deck.questions.length > 1 ? 'cards' : 'card'}</Text>
				<TouchableOpacity
					onPress={() => this.removeDeck(deck.title)}
					>
					<Text>Delete Deck</Text>
				</TouchableOpacity>
			</View>
		</TouchableHighlight>
        </View>)}
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

function mapStateToProps (entries) {

	return {entries: entries }
}

export default connect(mapStateToProps)(Home)