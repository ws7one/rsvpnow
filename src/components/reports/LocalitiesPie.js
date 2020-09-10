import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Text
} from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { commonStyle } from '../common/styles';
import { pieColors } from '../../constants/enumerations';
import theme from '../../theme';

class LocalitiesPie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            containerWidth: null,
            selectedPie: 'Mumbai'
        };
    }

    render() {
        const { loading, data } = this.props;
        const piedata = [];
        if (data) {
            Object.keys(data).forEach((key, index) => {
                const newPie = {
                    key,
                    value: data[key],
                    svg: { fill: pieColors[index] },
                    onPress: () => this.setState({ selectedPie: key })
                };
                if (this.state.selectedPie === key) {
                    newPie.arc = { outerRadius: '130%', cornerRadius: 10 };
                }
                piedata.push(newPie);
            });
        }
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
                        Guest hailed from
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
                {this.state.selectedPie && data && !loading && (
                    <View style={commonStyle.reportTitleContainerStyle}>
                        <Text style={{ fontSize: 16, color: theme.grey3 }}>
                            {this.state.selectedPie}:{' '}
                            <Text style={{ color: theme.grey0, fontWeight: 'bold' }}>
                                {data[this.state.selectedPie]}
                            </Text>
                        </Text>
                    </View>
                )}
            </View>
        );
    }
}
export default LocalitiesPie;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    }
});
