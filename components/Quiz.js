import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux'
import RadioButtonRN from 'radio-buttons-react-native'

class Quiz extends Component {
    state ={
        questionActiveIndex: 0,
        questionAnswered: false,
        questionAnsweredList: {},
        usersAnswer: '',
        correct: 0,
        finishQuiz: false
    }

    select = (label, questionActiveIndex, answer) => {
        const usersAnswer = label === 'Correct' ? true : false

        this.setState((state) => ({
            questionAnswered: true,
            questionAnsweredList: {...state.questionAnsweredList, 
                                    [questionActiveIndex]: usersAnswer},
            usersAnswer,
            correct: answer === usersAnswer ? state.correct + 1 : state.correct
        }))
    }

    back = () => {
        this.setState((state) => ({
            questionActiveIndex: state.questionActiveIndex - 1,
            usersAnswer: state.questionAnsweredList[state.questionActiveIndex - 1]
        }))
    }

    retry = (answer) => {
        console.log(answer)
        const {questionActiveIndex, questionAnsweredList, correct} = this.state
        
        const correctAdjusted = questionAnsweredList[questionActiveIndex] === answer ? (correct - 1) : correct
        console.log(questionAnsweredList[questionActiveIndex])
        
        questionAnsweredList[questionActiveIndex] = undefined
        delete questionAnsweredList[questionActiveIndex]

        this.setState({
            questionAnswered: false,
            questionAnsweredList,
            usersAnswer: '',
            correct: correctAdjusted,
        })
    }

    next = () => {
        const {questionActiveIndex, questionAnsweredList} = this.state
        const questionAnsweredBefore = questionAnsweredList[questionActiveIndex + 1] !== undefined
        const title = this.props.route.params
        const questions = this.props.entries[title].questions
        
        console.log(questionAnsweredBefore)

        if ((questionActiveIndex + 1) < questions.length) {
            this.setState((state) => ({
                questionActiveIndex: state.questionActiveIndex + 1,
                questionAnswered: questionAnsweredBefore === true ? true : false,
                usersAnswer: questionAnsweredList[questionActiveIndex + 1] ? questionAnsweredList[questionActiveIndex + 1] : '',
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
                questionAnsweredList: {},
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
            {label: 'Correct'},
            {label: 'Incorrect'}
        ]

        console.log(this.state)
        
        return(
             <View>
                <Text>{title}</Text>
                <Text>Correct Answers: {correct}/{questions.length}</Text>
                <Text>Question {questionActiveIndex + 1}</Text>
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
                                            <Text>This statement is {answer === true ? `correct` : `incorrect`}. You've got it!</Text>
                                            {explanation !== '' && <Text>{explanation}</Text>}
                                        </View>
                                        : <View>
                                            <Text>Ouch! Your answer is incorrect.</Text>
                                            {explanation !== '' && <Text>{explanation}</Text>}
                                        </View>
                                    }
                                    <TouchableOpacity
                                        onPress={this.back}
                                    >
                                        {questions.length >= (questionActiveIndex + 1) && (questionActiveIndex > 0 ) ? <Text>Back</Text> : null}
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.retry(answer)}
                                    >
                                        {questions.length >= (questionActiveIndex + 1) ? <Text>Retry</Text> : null}
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={this.next}
                                    >
                                        {(questionActiveIndex + 1) < questions.length ? <Text>Next</Text> : <Text>Finish</Text>}
                                    </TouchableOpacity>
                                </View>
                                : <RadioButtonRN 
                                    data={optionLabels}
                                    selectedBtn={({label}) => this.select(label, questionActiveIndex, answer)}
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