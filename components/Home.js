import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { getDecks, removeDeck } from '../utils/helpers';
import { connect } from 'react-redux'
import {receiveEntries, deleteDeck} from '../actions'
import  {FontAwesome, Ionicons} from "@expo/vector-icons"

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
			<View key={deck.title} >
				<TouchableHighlight
					onPress={() => this.goToDeck(deck.title)}
					activeOpacity={0.6} 
					underlayColor={'lightskyblue'}
					style={styles.deckBox}
					>
					<View >
						<Text style={styles.title}>{deck.title}</Text>
						<Text style={styles.subTitle}>{deck.questions.length} {deck.questions.length > 1 ? 'cards' : 'card'}</Text>
						<TouchableOpacity
							onPress={() => this.removeDeck(deck.title)}
						>
							<FontAwesome name="trash" style={styles.deleteDeckBtn}/>
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
  deckBox: {
	backgroundColor: 'cornflowerblue',
	width: 250,
	borderRadius: 10 ,
	padding: 20,
	marginHorizontal: 10,
	marginTop: 17,
    justifyContent: 'center',
    },
  title: {
	  color: 'white',
	  textAlign: 'center',
	  fontWeight: 'bold',
	  fontSize: 27
  },
  subTitle: {
	  color: 'white',
	  textAlign: 'center',
	  fontSize: 15
  },
  deleteDeckBtn: {
	  color: 'white',
	  textAlign: 'center',
	  fontSize: 20,
	  marginTop: 10,

  }	
});

function mapStateToProps (entries) {

	return {entries: entries }
}

export default connect(mapStateToProps)(Home)