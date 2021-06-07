import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

class AddCard extends Component {
    render() {
        return(
            <View>
                <Text>Question</Text>
                <Text>Answer</Text>
                <TouchableOpacity>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default AddCard