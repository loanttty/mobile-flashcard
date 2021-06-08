import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux'

class Quiz extends Component {
    render() {
        return(
             <View>
                <Text>Quiz</Text>
                <Text>Answer</Text>
                <TouchableOpacity>
                    <Text>Next</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps (entries) {

	return {entries: entries }
}

export default connect(mapStateToProps)(Quiz)