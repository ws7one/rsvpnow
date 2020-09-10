import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import moment from 'moment-timezone';
import theme from '../theme';
import { commonStyle } from './common/styles';
import NavigationService from '../NavigationService';

class Details extends Component {
    render() {
        const {
            selectedAttendee
        } = this.props.list;
        return (
            <View style={styles.container}>
                {selectedAttendee ? (
                    <ScrollView contentContainerStyle={{ padding: 10 }}>
                        <TouchableOpacity
                            style={{ alignItems: 'flex-start' }}
                            onPress={() => NavigationService.back()}
                        >
                            <Icon name="arrow-back" color={theme.black} size={30} />
                        </TouchableOpacity>
                        <Text
                            style={{
                                fontSize: 75,
                                fontWeight: 'bold',
                                color: theme.grey0,
                                textAlign: 'right'
                            }}
                        >
                            {selectedAttendee.name}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: 5,
                            }}
                        >
                            <View>
                                <Text style={{ fontSize: 20, color: theme.grey3 }}>
                                    aged{' '}
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            color: theme.grey0
                                        }}
                                    >
                                        {selectedAttendee.age}
                                    </Text>
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center'
                                }}
                            >
                                <Icon
                                    name={selectedAttendee.number_of_guests > 0
                                        ? 'people' : 'person'
                                    }
                                    type="ionicon"
                                    color={theme.grey1}
                                    size={30}
                                />
                                <Text
                                    style={{
                                        fontSize: 30,
                                        fontWeight: 'bold',
                                        color: theme.grey0,
                                        textAlign: 'right',
                                        marginLeft: 5
                                    }}
                                >
                                    {
                                        selectedAttendee.number_of_guests > 0
                                            ? `+${selectedAttendee.number_of_guests}`
                                            : 1
                                    }
                                </Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'flex-start', marginTop: 20 }}>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ fontSize: 20, color: theme.grey3 }}>
                                    from,
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: theme.grey0
                                    }}
                                >
                                    {selectedAttendee.address}, {selectedAttendee.locality}
                                </Text>
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ fontSize: 20, color: theme.grey3 }}>
                                    currently,
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: theme.grey0
                                    }}
                                >
                                    {selectedAttendee.employed ? 'a Professional' : 'a Student'}
                                </Text>
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ fontSize: 20, color: theme.grey3 }}>
                                    Date of Birth:
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: theme.grey0
                                    }}
                                >
                                    {moment(selectedAttendee.date_of_birth).format('LL')}
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                ) : (
                        <View
                            style={[
                                styles.container, {
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }
                            ]}
                        >
                            <Text style={commonStyle.infoMessageTextStyle}>
                                Select an attendee to view details
                            </Text>
                        </View>
                    )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.white,
        paddingTop: 50
    }
});

const mapStateToProps = state => ({
    list: state.listReducer
});

export default connect(mapStateToProps, null)(Details);
