import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Text
} from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { randomColor } from '../../constants/utils';
import { commonStyle } from '../common/styles';

class AgeRangePie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            containerWidth: null
        };
    }

    render() {
        const { loading, data } = this.props;
        const piedata = [];
        if (data) {
            Object.keys(data).forEach(key => {
                piedata.push({
                    key,
                    value: data[key],
                    svg: { fill: randomColor() },

                });
            });
        }
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
                        Demographic by age group
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
                                        ? this.state.containerWidth / 30 : 30
                                }
                            ]}
                        >
                            <PieChart
                                style={{
                                    width: this.state.containerWidth || 200,
                                    height: this.state.containerWidth || 200
                                }}
                                outerRadius={'70%'}
                                innerRadius={10}
                                data={piedata}
                            />
                        </View>
                    )}
            </View>
        );
    }
}
export default AgeRangePie;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    }
});
