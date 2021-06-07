import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

class DeckView extends Component {
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

export default DeckView