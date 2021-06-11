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
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{noOfQuestions} {noOfQuestions > 1 ? 'cards' : 'card'}</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Add Card',title)}
                    style={[styles.btn,{marginTop: 60, marginBottom: 30}]}
                >
                    <Text style={[styles.btnText,{color: 'white'}]}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.startQuiz(title,noOfQuestions)}
                    disabled={noOfQuestions === 0}
                    style={[styles.btn, {backgroundColor: 'mediumpurple'}]}
                >
                    <Text style={[styles.btnText,{color: 'white'}]}>Start Quiz</Text>
                </TouchableOpacity>
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
  btn: {
	backgroundColor: 'mediumorchid',
	width: 200,
	borderRadius: 10 ,
	padding: 20,
    justifyContent: 'center',
    },
  title: {
	  color: 'cornflowerblue',
	  textAlign: 'center',
	  fontWeight: 'bold',
	  fontSize: 40,
      marginTop: 60
  },
  subTitle: {
	  color: 'cornflowerblue',
	  textAlign: 'center',
	  fontSize: 20
  },
  btnText: {
	  textAlign: 'center',
	  fontSize: 23,
      fontWeight: 'bold'
  }
});

function mapStateToProps (entries) {
	return {entries: entries }
}

export default connect(mapStateToProps)(DeckView)

