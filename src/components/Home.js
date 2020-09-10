import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Header, Icon, Button } from 'react-native-elements';
import { DateTimePickerModal } from 'react-native-modal-datetime-picker';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import moment from 'moment-timezone';
import * as actions from '../redux/actions/home/HomeActions';
import theme from '../theme';
import { LIST_OF_LOCALITIES } from '../constants/enumerations';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDatePicker: false,
            showCityPicker: false,
            name: '',
            dob: new Date(),
            employed: false,
            city: '',
            address: '',
            guestsCount: 0
        };
    }
    render() {
        const {
            showDatePicker,
            showCityPicker,
            name,
            dob,
            employed,
            city,
            address,
            guestsCount
        } = this.state;

        const {
            isLoading,
            message,
            error
        } = this.props.home;
        const onDateChange = (date) => {
            this.setState({ dob: date, showDatePicker: false });
        };
        const buttonDisabled =
            name.length === 0 ||
            address.length === 0 ||
            city.length === 0 ||
            isLoading;
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
                        text: 'RSVP', style: { color: theme.white, fontSize: 20 }
                    }}
                />
                {!!message && (
                    <View
                        style={{
                            height: 30,
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                            backgroundColor: error ? 'red' : 'green'
                        }}
                    >
                        <View />
                        <Text style={{ color: theme.white, fontSize: 16 }}>
                            {message}
                        </Text>
                        <TouchableOpacity onPress={() => this.props.changeMessage('')}>
                            <Icon name="close" color={theme.white} />
                        </TouchableOpacity>
                    </View>
                )}
                <ScrollView contentContainerStyle={{ padding: 10 }}>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.labelStyle}>
                            Name:
                        </Text>
                        <TextInput
                            value={name}
                            onChange={(val) => this.setState({ name: val || '' })}
                            style={styles.textInputStyle}
                            placeholder="Full name please..."
                            disabled={isLoading}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.labelStyle}>
                            Date of Birth:
                        </Text>
                        <TouchableOpacity
                            style={[
                                {
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                },
                                styles.textInputStyle
                            ]}
                            onPress={() => this.setState({ showDatePicker: true })}
                            disabled={isLoading}
                        >
                            <Text style={{ fontSize: 16 }}>
                                {moment(dob).format('LL')}
                            </Text>
                            <Icon name='calendar' type='ionicon' />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={showDatePicker && !isLoading}
                            date={dob}
                            mode="date"
                            onConfirm={onDateChange}
                            onCancel={() => this.setState({ showDatePicker: false })}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.labelStyle}>
                            Employment Status:
                        </Text>
                        <View
                            style={[
                                styles.textInputStyle,
                                {
                                    flexDirection: 'row',
                                    padding: 0,
                                    borderWidth: 0
                                }
                            ]}
                        >
                            <TouchableOpacity
                                style={[
                                    employed
                                        ? styles.selectedProfessionContainer
                                        : styles.professionContainer,
                                    {
                                        borderTopLeftRadius: 5,
                                        borderBottomLeftRadius: 5
                                    }
                                ]}
                                onPress={() => this.setState({ employed: true })}
                                disabled={isLoading}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: employed ? theme.white : theme.grey2,
                                        fontWeight: employed ? 'bold' : 'normal'
                                    }}
                                >
                                    Professional
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    !employed
                                        ? styles.selectedProfessionContainer
                                        : styles.professionContainer,
                                    {
                                        borderTopRightRadius: 5,
                                        borderBottomRightRadius: 5
                                    }
                                ]}
                                onPress={() => this.setState({ employed: false })}
                                disabled={isLoading}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: !employed ? theme.white : theme.grey2,
                                        fontWeight: !employed ? 'bold' : 'normal'
                                    }}
                                >
                                    Student
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.labelStyle}>
                            Street Address:
                        </Text>
                        <TextInput
                            value={address}
                            multiline
                            numberOfLines={3}
                            onChange={(val) => this.setState({ address: val || '' })}
                            style={[styles.textInputStyle, { height: 100 }]}
                            placeholder="Enter your address here please..."
                            disabled={isLoading}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.labelStyle}>
                            City:
                        </Text>
                        <TouchableOpacity
                            style={[
                                {
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                },
                                styles.textInputStyle
                            ]}
                            onPress={() => this.setState({ showCityPicker: true })}
                            disabled={isLoading}
                        >
                            <Text style={{ fontSize: 16 }}>
                                {city || 'Select a city...'}
                            </Text>
                            <Icon name='caret-down-outline' type='ionicon' />
                        </TouchableOpacity>
                        <ModalFilterPicker
                            visible={showCityPicker && !isLoading}
                            onSelect={(value) =>
                                this.setState({ showCityPicker: false, city: value.key })
                            }
                            onCancel={() => this.setState({ showCityPicker: false })}
                            options={LIST_OF_LOCALITIES}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.labelStyle}>
                            Number of guests:
                        </Text>
                        <View
                            style={[
                                styles.textInputStyle,
                                {
                                    flexDirection: 'row',
                                    padding: 0,
                                    borderWidth: 0
                                }
                            ]}
                        >
                            <TouchableOpacity
                                style={[
                                    guestsCount === 0
                                        ? styles.selectedProfessionContainer
                                        : styles.professionContainer,
                                    {
                                        borderTopLeftRadius: 5,
                                        borderBottomLeftRadius: 5
                                    }
                                ]}
                                onPress={() => this.setState({ guestsCount: 0 })}
                                disabled={isLoading}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: guestsCount === 0 ? theme.white : theme.grey2,
                                        fontWeight: guestsCount === 0 ? 'bold' : 'normal'
                                    }}
                                >
                                    0
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    guestsCount === 1
                                        ? styles.selectedProfessionContainer
                                        : styles.professionContainer
                                }
                                onPress={() => this.setState({ guestsCount: 1 })}
                                disabled={isLoading}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: guestsCount === 1 ? theme.white : theme.grey2,
                                        fontWeight: guestsCount === 1 ? 'bold' : 'normal'
                                    }}
                                >
                                    1
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    guestsCount === 2
                                        ? styles.selectedProfessionContainer
                                        : styles.professionContainer,
                                    {
                                        borderTopRightRadius: 5,
                                        borderBottomRightRadius: 5
                                    }
                                ]}
                                onPress={() => this.setState({ guestsCount: 2 })}
                                disabled={isLoading}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: guestsCount === 2 ? theme.white : theme.grey2,
                                        fontWeight: guestsCount === 2 ? 'bold' : 'normal'
                                    }}
                                >
                                    2
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <Button
                    type="clear"
                    title="RSVP"
                    titleStyle={{ color: theme.white, fontSize: 24, fontWeight: 'bold' }}
                    buttonStyle={{ backgroundColor: theme.darkblue }}
                    disabled={buttonDisabled}
                    disabledStyle={{ backgroundColor: theme.grey5 }}
                    onPress={() => {
                        this.props.submitRsvp({
                            name, dob, city, employed, address, guestsCount
                        });
                        this.setState({
                            name: '',
                            dob: new Date(),
                            city: '',
                            employed,
                            address: '',
                            guestsCount: 0
                        });
                    }}
                    loading={isLoading}
                />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    labelStyle: { fontSize: 16, color: theme.grey0, marginBottom: 5 },
    textInputStyle: {
        borderWidth: 1,
        borderColor: theme.grey3,
        borderRadius: 5,
        padding: 10,
        fontSize: 16
    },
    fieldContainer: {
        marginBottom: 20
    },
    professionContainer: {
        flex: 1,
        borderWidth: 1,
        padding: 10,
        borderColor: theme.grey4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedProfessionContainer: {
        flex: 1,
        borderWidth: 1,
        padding: 10,
        backgroundColor: theme.darkblue,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

const mapStateToProps = state => ({
    home: state.homeReducer
});

export default connect(mapStateToProps, actions)(Home);
