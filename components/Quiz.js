import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux'
import RadioButtonRN from 'radio-buttons-react-native'
import {clearLocalNotification,
        setLocalNotification} from "../utils/helpers"

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
        const {questionActiveIndex, questionAnsweredList, correct} = this.state
        
        const correctAdjusted = questionAnsweredList[questionActiveIndex] === answer ? (correct - 1) : correct
        
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
            clearLocalNotification().then(setLocalNotification)
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

        return(
             <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>Correct Answers: {correct}/{questions.length}</Text>
                {finishQuiz === true
                    ? <View style={{marginTop: 20, alignItems: 'center'}}>
                        <Text style={styles.answerText}>Congrat! You've finished the quiz!</Text>
                        <TouchableOpacity
                            onPress={this.redoQuiz}
                            style={[styles.btn, {width: 190, backgroundColor: 'firebrick'}]}
                        >
                            <Text style={styles.btnText}>Wanna try again?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.goBack}
                            style={[styles.btn, {width: 190, backgroundColor: 'firebrick'}]}
                        >
                            <Text style={styles.btnText}>Back To Deck</Text>
                        </TouchableOpacity>
                      </View>
                    : <View style={{alignItems: 'center'}}>
                        <Text style={[styles.title, {fontSize: 17}]}>Question {questionActiveIndex + 1}</Text>
                        <Text style={styles.questionText}>{question}</Text>
                            {questionAnswered === true
                                ? <View style={styles.answer}>
                                    {answer === usersAnswer 
                                        ? <View>
                                            <Text style={styles.answerText}>🎉 This statement is {answer === true ? `correct` : `incorrect`} 🎉</Text>
                                            <Text style={styles.answerText}> You've got it!</Text>
                                            {explanation !== '' && <Text style={styles.answerText}>{explanation}</Text>}
                                        </View>
                                        : <View>
                                            <Text style={styles.answerText}>☹ Ouch! Your answer is incorrect.</Text>
                                            {explanation !== '' && <Text style={styles.answerText}>{explanation}</Text>}
                                        </View>
                                    }
                                    {questions.length >= (questionActiveIndex + 1) && (questionActiveIndex > 0 ) 
                                        ? <TouchableOpacity
                                            onPress={this.back}
                                            style={styles.btn}
                                         >
                                            <Text style={styles.btnText}>BACK</Text>
                                         </TouchableOpacity>
                                        : null}
                                    <TouchableOpacity
                                        onPress={() => this.retry(answer)}
                                        style={styles.btn}
                                    >
                                        {questions.length >= (questionActiveIndex + 1) ? <Text style={styles.btnText}>RETRY</Text> : null}
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={this.next}
                                        style={styles.btn}
                                    >
                                        {(questionActiveIndex + 1) < questions.length 
                                            ? <Text style={styles.btnText}>NEXT</Text> 
                                            : <Text style={styles.btnText}>FINISH</Text>}
                                    </TouchableOpacity>
                                </View>
                                : <RadioButtonRN 
                                    data={optionLabels}
                                    selectedBtn={({label}) => this.select(label, questionActiveIndex, answer)}
                                    boxStyle={{width: 150}}
                                    textStyle={{paddingHorizontal: 10, color: 'cornflowerblue', fontSize: 18}}
                                />
                            }   
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
	  color: 'cornflowerblue',
	  textAlign: 'center',
	  fontWeight: 'bold',
	  fontSize: 25,
      marginBottom: 10,
      marginTop: 30
  },
  subTitle: {
	  color: 'cornflowerblue',
	  textAlign: 'center',
	  fontSize: 18
  },
  questionText: {
      color: 'mediumvioletred',
      margin: 12,
      textAlign: 'center'
  },
  answer: {
    margin: 20,
    alignItems: 'center'
  },
  answerText: {
	  color: 'crimson',
	  textAlign: 'center',
	  fontSize: 18
  },
  btnText: {
	  color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
  },
  btn: {
	backgroundColor: 'deepskyblue',
	width: 80,
	borderRadius: 10,
	padding: 10,
    justifyContent: 'center',
    marginTop: 20,
    },
});

function mapStateToProps (entries) {
	return {entries: entries }
}

export default connect(mapStateToProps)(Quiz)