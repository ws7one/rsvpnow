import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements';
import * as actions from '../redux/actions/list/ListActions';
import theme from '../theme';
import AgeRangePie from './reports/AgeRangePie';
import LocalitiesPie from './reports/LocalitiesPie';
import AvgGroupSize from './reports/AvgGroupSize';
import EmployedCount from './reports/EmployedCount';

const screenHeight = Dimensions.get('screen').height;

class Reports extends Component {
    componentDidMount() {
        if (this.props.list.attendees.length === 0) {
            this.props.getAttendees();
        } else {
            this.props.calculateReports();
        }

        console.log(screenHeight);
    }
    render() {
        const {
            isLoading,
            age_range: ageRange,
            localities_count: localitiesCount,
            avg_group_size: avgGrpSize,
            employed_count: employedCount
        } = this.props.reports;
        return (
            <View style={{ flex: 1 }}>
                <Header
                    placement="left"
                    leftComponent={{
                        icon: 'menu',
                        color: theme.white,
                        onPress: () => this.props.navigation.openDrawer()
                    }}
                    centerComponent={{
                        text: 'Summary', style: { color: theme.white, fontSize: 20 }
                    }}
                />
                {this.props.list.isLoading ? (
                    <View style={styles.container}>
                        <ActivityIndicator size="large" />
                    </View>
                ) : (
                        <View
                            style={{
                                width: '100%',
                                height: screenHeight,
                                flexWrap: 'wrap',
                                flexDirection: 'row'
                            }}
                        >
                            <View style={styles.reportContainer}>
                                <AgeRangePie data={ageRange} loading={isLoading} />
                            </View>
                            <View style={styles.reportContainer}>
                                <EmployedCount data={employedCount} loading={isLoading} />
                            </View>
                            <View style={styles.reportContainer}>
                                <AvgGroupSize data={avgGrpSize} loading={isLoading} />
                            </View>
                            <View style={styles.reportContainer}>
                                <LocalitiesPie data={localitiesCount} loading={isLoading} />
                            </View>
                        </View>
                    )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    reportContainer: {
        width: '50%',
        height: (screenHeight - 60) / 2,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = state => ({
    list: state.listReducer,
    reports: state.reportsReducer
});

export default connect(mapStateToProps, actions)(Reports);
