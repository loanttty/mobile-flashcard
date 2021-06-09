import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {connect} from 'react-redux'

class DeckView extends Component {
 
    startQuiz = (title, noOfQuestions) => {
        noOfQuestions !== 0 && this.props.navigation.navigate('Quiz', (title))
    }

    render() {
        const title = this.props.route.params
        const noOfQuestions = this.props.entries[title].questions.length

        return(
            <View>
                <Text>{title}</Text>
                <Text>{noOfQuestions} {noOfQuestions > 1 ? 'cards' : 'card'}</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Add Card',title)}
                >
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.startQuiz(title,noOfQuestions)}
                    disabled={noOfQuestions === 0}
                >
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps (entries) {
	return {entries: entries }
}

export default connect(mapStateToProps)(DeckView)

