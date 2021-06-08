import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux'
import RadioButtonRN from 'radio-buttons-react-native'

class Quiz extends Component {
    state ={
        questionActiveIndex: 0,
        questionAnswered: false,
        usersAnswer: '',
        correct: 0,
        finishQuiz: false
    }

    next = () => {
        const {questionActiveIndex} = this.state
        const title = this.props.route.params
        const questions = this.props.entries[title].questions

        if ((questionActiveIndex + 1) < questions.length) {
            this.setState((state) => ({
                questionActiveIndex: state.questionActiveIndex + 1,
                questionAnswered: false,
                usersAnswer: '',
            }))
        } else {
            this.setState({
                finishQuiz: true
            })
        }
    }

    redoQuiz = () => {
        this.setState({
                questionActiveIndex: 0,
                questionAnswered: false,
                usersAnswer: '',
                correct: 0,
                finishQuiz: false
            })
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        const {questionActiveIndex, questionAnswered, usersAnswer, correct, finishQuiz} = this.state
        const title = this.props.route.params
        const questions = this.props.entries[title].questions
        const questionDisplayed = questions[questionActiveIndex]
        const {question, answer, explanation} = questionDisplayed
        
        const optionLabels = [
            {
                label: 'Correct'
            },
            {
                label: 'Incorrect'
            }
        ]

        return(
             <View>
                <Text>{title}</Text>
                <Text>Correct Answers: {correct}/{questions.length}</Text>
                {finishQuiz === true
                    ? <View>
                        <Text>Congrat! You've finished the quiz!</Text>
                        <TouchableOpacity
                            onPress={this.redoQuiz}
                        >
                            <Text>Wanna try again?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.goBack}
                        >
                            <Text>Back To Deck</Text>
                        </TouchableOpacity>
                      </View>
                    : <View>
                        <Text>{question}</Text>
                            {questionAnswered === true
                                ? <View>
                                    {answer === usersAnswer 
                                        ? <View>
                                            <Text>You've got it!</Text>
                                            {explanation !== '' && <Text>{explanation}</Text>}
                                        </View>
                                        : <View>
                                            <Text>Ouch! Your answer is incorrect.</Text>
                                            {explanation !== '' && <Text>{explanation}</Text>}
                                        </View>
                                    }
                                    <TouchableOpacity
                                        onPress={this.next}
                                    >
                                        {(questionActiveIndex + 1) < questions.length ? <Text>Next</Text> : <Text>Finish</Text>}
                                    </TouchableOpacity>
                                </View>
                                : <RadioButtonRN 
                                    data={optionLabels}
                                    selectedBtn={({label}) => {
                                        const usersAnswer = label === 'Correct' ? true : false
                                        this.setState({
                                            questionAnswered: true,
                                            usersAnswer,
                                            correct: answer === usersAnswer ? correct + 1 : correct
                                        })
                                    }}
                                />
                            }   
                    </View>
                }
            </View>
        )
    }
}

function mapStateToProps (entries) {
	return {entries: entries }
}

export default connect(mapStateToProps)(Quiz)