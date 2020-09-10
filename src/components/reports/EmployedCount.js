import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { commonStyle } from '../common/styles';
import theme from '../../theme';

class EmployedCount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            containerWidth: null
        };
    }

    render() {
        const { loading, data } = this.props;
        return (
            <View style={styles.container}>
                <View
                    onLayout={event => {
                        this.setState({
                            containerWidth: event.nativeEvent.layout.width
                        });
                    }}
                    style={commonStyle.reportTitleContainerStyle}
                >
                    <Text style={commonStyle.reportTitleTextStyle}>
                        Working population
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
                                        ? this.state.containerWidth / 10 : 30
                                }
                            ]}
                        >
                            <View
                                style={{
                                    width: this.state.containerWidth
                                        ? this.state.containerWidth - 40 : 200,
                                    alignItems: 'center',
                                    paddingVertical: 10,
                                    borderBottomWidth: 1,
                                    borderColor: theme.grey3
                                }}
                            >
                                <Text
                                    style={{ fontSize: 14, color: theme.grey1, marginBottom: 5 }}
                                >
                                    Professionals
                                </Text>
                                <Text
                                    style={{ fontSize: 20, color: theme.grey0, fontWeight: 'bold' }}
                                >
                                    {data.professional}
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: this.state.containerWidth
                                        ? this.state.containerWidth - 40 : 200,
                                    alignItems: 'center',
                                    paddingVertical: 10,
                                    borderColor: theme.grey3
                                }}
                            >
                                <Text
                                    style={{ fontSize: 14, color: theme.grey1, marginBottom: 5 }}
                                >
                                    Students
                                </Text>
                                <Text
                                    style={{ fontSize: 20, color: theme.grey0, fontWeight: 'bold' }}
                                >
                                    {data.student}
                                </Text>
                            </View>
                        </View>
                    )}
            </View>
        );
    }
}
export default EmployedCount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
});
