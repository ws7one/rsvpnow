import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Text
} from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Text as SVG_TEXT, G } from 'react-native-svg';
import { randomColor } from '../../constants/utils';
import { commonStyle } from '../common/styles';
import theme from '../../theme';

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
                const newPie = {
                    key,
                    value: data[key],
                    svg: { fill: randomColor() }
                };
                piedata.push(newPie);
            });
        }

        const Labels = ({ slices }) => slices.map(slice => {
            const { labelCentroid, pieCentroid, data: datum } = slice;
            return (
                <G key={datum.key}>
                    <SVG_TEXT
                        x={labelCentroid[0]}
                        y={labelCentroid[1]}
                        fill={theme.black}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={15}
                        stroke={theme.black}
                        strokeWidth={0.01}
                    >
                        {datum.key}
                    </SVG_TEXT>
                    <SVG_TEXT
                        x={pieCentroid[0]}
                        y={pieCentroid[1]}
                        fill={theme.white}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={15}
                        stroke={theme.black}
                        strokeWidth={0.01}
                    >
                        {datum.value}
                    </SVG_TEXT>
                </G>
            );
        });

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
                        Demographic by age group
                    </Text>
                </View >
                {(loading || !data) ? (
                    <View style={styles.container}>
                        <ActivityIndicator size="large" color={theme.grey1} />
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
                                innerRadius={5}
                                labelRadius={'85%'}
                                data={piedata}
                            >
                                <Labels />
                            </PieChart>
                        </View>
                    )
                }
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
