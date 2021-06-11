import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native'
import { connect } from 'react-redux'
import { addCard } from "../actions/index"
import { addCardToDeck } from "../utils/helpers"
import  {FontAwesome} from "@expo/vector-icons"

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

        if (answer === '' || question === '') {
            this.setState({
                error: <Text style={styles.messageText}>Please fill in the required fields.</Text>
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
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Text style={styles.title}>Question*</Text>
                    <TextInput 
                        placeholder='Enter your question here'
                        value={question}
                        onChangeText={this.changeQuestion}
                        style={styles.textInput}
                        />
                    <Text style={styles.title}>Explanation</Text>
                    <TextInput 
                        placeholder='Enter your explanation here'
                        value={explanation}
                        onChangeText={this.changeExplanation}
                        style={styles.textInput}
                        />
                    <Text style={styles.title}>Answer*</Text>
                    <RadioButtonRN 
                        data={answerLabels}
                        selectedBtn={(e) => this.selectAnswer(e)}
                        boxStyle={{width: 150}}
                        textStyle={{paddingHorizontal: 10, color: 'cornflowerblue',fontSize: 18}}
                        animationTypes={['pulse']}
                        icon={<FontAwesome name="check-circle" style={{color: 'cornflowerblue',fontSize: 25}}/>}
                        activeColor='cornflowerblue'
                        />
                    {error ? error : null}
                    <TouchableOpacity
                        onPress={this.submitCard}
                        style={styles.btn}
                        >
                        <Text style={styles.submitBtnText}>SUBMIT</Text>
                    </TouchableOpacity>
                    <Text style={{color: 'cornflowerblue'}}>* Required</Text>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    backgroundColor: '#fff',
    margin: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textInput: {
	color: 'darkslateblue',
    fontSize: 18,
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
      marginBottom: 10,
      marginTop: 20
  },
  messageText: {
      color: 'mediumvioletred',
  },
  submitBtnText: {
	  color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
  },
  btn: {
	backgroundColor: 'mediumorchid',
	width: 120,
	borderRadius: 10,
	padding: 10,
    justifyContent: 'center',
    margin: 20
    },
});

export default connect()(AddCard)