import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

class DeckView extends Component {
    render() {
        const {title, noOfQuestions} = this.props.route.params
        return(
            <View>
                <Text>{title}</Text>
                <Text>{noOfQuestions} {noOfQuestions > 1 ? 'cards' : 'card'}</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Add Card')}
                >
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Quiz')}
                >
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default DeckView

