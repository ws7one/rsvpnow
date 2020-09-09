import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import theme from '../theme';

class Home extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    placement="left"
                    leftComponent={{
                        icon: 'menu',
                        color: theme.white,
                        onPress: () => this.props.navigation.openDrawer()
                    }}
                    centerComponent={{ text: 'RSVP', style: { color: theme.white } }}
                />
                <View style={styles.container}>
                    <Text>Home</Text>
                </View>
            </View>
        );
    }
}
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
