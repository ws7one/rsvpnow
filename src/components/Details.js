import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

class Details extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Details</Text>
            </View>
        );
    }
}
export default Details;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
