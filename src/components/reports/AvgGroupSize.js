import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import theme from '../../theme';
import { commonStyle } from '../common/styles';

class AvgGroupSize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            containerWidth: null
        };
    }

    render() {
        const { loading, data } = this.props;
        return (
            <View
                style={styles.container}
                onLayout={event => {
                    this.setState({
                        containerWidth: event.nativeEvent.layout.width
                    });
                }}
            >
                <View style={commonStyle.reportTitleContainerStyle}>
                    <Text style={commonStyle.reportTitleTextStyle}>
                        Average Group Size
                    </Text>
                </View>
                {(loading || !data) ? (
                    <View style={styles.container}>
                        <ActivityIndicator size="large" />
                    </View>
                ) : (
                        <View
                            style={[
                                styles.container,
                                {
                                    alignItems: 'center',
                                    marginTop: this.state.containerWidth
                                        ? this.state.containerWidth / 5 : 30
                                }
                            ]}
                        >
                            <View
                                style={[{
                                    height: this.state.containerWidth
                                        ? this.state.containerWidth / 1.5 : '50%',
                                    width: this.state.containerWidth
                                        ? this.state.containerWidth / 1.5 : '50%'
                                }, styles.dataContainer]}
                            >
                                <Text style={styles.dataTextStyle}>
                                    {data}
                                </Text>
                            </View>
                        </View>
                    )}
            </View>
        );
    }
}
export default AvgGroupSize;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    dataContainer: {
        borderRadius: 20,
        backgroundColor: theme.grey5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dataTextStyle: { fontSize: 28, color: theme.grey0, fontWeight: 'bold' }
});
