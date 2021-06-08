import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {connect} from 'react-redux'

class DeckView extends Component {
    state ={
        noCard: false
    }
 
    startQuiz = (title, noOfQuestions) => {
        
        if (noOfQuestions === 0) {
            this.setState({noCard: true})
        } else {
            this.props.navigation.navigate('Quiz', (title))
            this.setState({noCard: false})
        }
    }
    render() {
        const title = this.props.route.params
        const noOfQuestions = this.props.entries[title].questions.length
        const {noCard} = this.state

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
                >
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
                {noCard
                    ? <Text>This deck has no card. Please create one to start the quiz.</Text>
                    : null
                }
            </View>
        )
    }
}

function mapStateToProps (entries) {

	return {entries: entries }
}

export default connect(mapStateToProps)(DeckView)

