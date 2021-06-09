import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native'
import { connect } from 'react-redux'
import { addCard } from "../actions/index"
import { addCardToDeck } from "../utils/helpers"


class AddCard extends Component {
    state = {
        question: '',
        answer: '',
        explanation: '',
        error: ''
    }

    changeQuestion = (input) => {
        this.setState({
            question: input
        })
    }

    selectAnswer = ({label}) => {
        this.setState({
            answer: label === 'Correct' ? true : false
        })
    }

    changeExplanation = (input) => {
        this.setState({
            explanation: input
        })
    }

    submitCard = () => {
        const {question, answer, explanation} = this.state

        if (answer === '') {
            this.setState({
                error: <Text>Please select your answer</Text>
            })
        } else {
            addCardToDeck({
                id: this.props.route.params,
                question: {
                    question: question,
                    answer: answer,
                    explanation: explanation
                }
            })
                .then(() => {
                    this.props.dispatch(addCard({
                        id: this.props.route.params,
                        question: {
                            question: question,
                            answer: answer,
                            explanation: explanation
                        }
                }))})
                .then(() => {
                    this.setState({
                        question: '',
                        answer: '',
                        explanation: '',
                        error: ''
                    })
                })
        }
    }
    render() {
        const answerLabels = [
            {
                label: 'Correct'
            },
            {
                label: 'Incorrect'
            }
        ]
        const {question, explanation, error} = this.state
        return(
            <View>
                <Text>Question</Text>
                <TextInput 
                    placeholder='Enter your question here'
                    value={question}
                    onChangeText={this.changeQuestion}
                />
                <Text>Answer</Text>
                <RadioButtonRN 
                    data={answerLabels}
                    selectedBtn={(e) => this.selectAnswer(e)}
                />
                <Text>Explanation</Text>
                <TextInput 
                    placeholder='Enter your explanation here'
                    value={explanation}
                    onChangeText={this.changeExplanation}
                />
                {error ? error : null}
                <TouchableOpacity
                    onPress={this.submitCard}
                >
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect()(AddCard)