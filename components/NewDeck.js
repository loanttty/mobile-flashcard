import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { saveDeckTitle } from '../utils/helpers';
import { connect } from 'react-redux'
import { addDeck } from '../actions';

class NewDeck extends Component {
    state ={
        textInput: '',
        existingTitle: false
    }

    changeTextInput = (text) => {
        this.setState({
            textInput: text,
        })
    }
    validateNewTitle = () => {
        const {textInput} = this.state
        const deckTitles = Object.keys(this.props.entries)
        
        const existedBefore = deckTitles.filter((title) => title === textInput)
        existedBefore.length !== 0
            ? this.setState({
                existingTitle: true})
            : saveDeckTitle(textInput)
                .then(() => this.props.dispatch(addDeck(textInput)))
                .then(() => this.props.navigation.navigate('Deck View', textInput))
                .then(() => this.setState({
                    textInput: '',
                    existingTitle: false
                }))
    }
    
    render() {
        const {textInput,existingTitle} = this.state
        return (
            <View style={styles.container}>
                    <Text style={styles.title}>What is the title of your new deck?</Text>
                    <TextInput 
                        placeholder='Deck Title'
                        value={textInput}
                        onChangeText={this.changeTextInput}
                        style={styles.textInput}
                    />
                    <View style={styles.submitBtn}>
                        <Button 
                            disabled={textInput === '' ? true : false}
                            onPress={this.validateNewTitle}
                            title="create deck"
                            color='rebeccapurple'
                        />
                    </View>
                    {existingTitle
                        ? <View style={styles.message}>
                                <Text style={styles.messageText}>This title has already existed.</Text>
                                <Text style={styles.messageText}>Please choose another name.</Text>
                            </View>
                        : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textInput: {
	color: 'darkslateblue',
    fontSize: 20,
	padding: 20,
    justifyContent: 'center',
    backgroundColor: 'aliceblue',
    borderRadius: 10,
    width: 280,
    textAlign: 'center'
    },
  title: {
	  color: 'cornflowerblue',
	  textAlign: 'center',
	  fontWeight: 'bold',
	  fontSize: 20,
      marginBottom: 20,
      marginTop: 100
  },
  message: {
	  textAlign: 'center',
	  fontSize: 15,
      marginTop: 20
  },
  messageText: {
      color: 'mediumvioletred',
  },
  submitBtn: {
	  marginTop: 20,
  }	
});

function mapStateToProps (entries) {
	return {entries: entries }
}

export default connect(mapStateToProps)(NewDeck)
