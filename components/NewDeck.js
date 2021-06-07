import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
                .then(() => this.setState({
                    textInput: '',
                    existingTitle: false
                }))
    }
    
    render() {
        const {textInput,existingTitle} = this.state
        return (
            <View style={styles.container}>
                <Text>What is the title of your new deck?</Text>
                <TextInput 
                    placeholder='Deck Title'
                    value={textInput}
                    onChangeText={this.changeTextInput}
                />
                <TouchableOpacity
                    disabled={textInput === '' ? true : false}
                    onPress={this.validateNewTitle}
                >
                    <Text>Submit</Text>
                </TouchableOpacity>
                {existingTitle
                    ? <Text>This title has already existed.Please choose another name.</Text>
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
    justifyContent: 'center',
  },
});

function mapStateToProps (entries) {
	return {entries: entries }
}

export default connect(mapStateToProps)(NewDeck)
