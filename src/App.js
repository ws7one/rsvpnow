import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>App</Text>
                <Icon
                    name='sc-telegram'
                    type='evilicon'
                    color='#517fa4'
                />
            </View>
        );
    }
}
export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
