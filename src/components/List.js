import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Header, Icon } from 'react-native-elements';
import * as actions from '../redux/actions/list/ListActions';
import theme from '../theme';
import { commonStyle } from './common/styles';

class List extends Component {
    componentDidMount() {
        if (this.props.list.attendees.length === 0) {
            this.props.getAttendees();
        } else {
            this.props.calculateReports();
        }
    }

    renderAttendeeCard = (item) => (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => this.props.setAttendee(item)}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                    name={item.number_of_guests > 0 ? 'people' : 'person'}
                    type="ionicon"
                    color={theme.grey1}
                />
                <Text style={styles.cardTitle}>
                    {item.name}{' '}
                    {item.number_of_guests > 0 &&
                        <Text style={{ fontSize: 16, fontWeight: 'normal' }}>
                            +{item.number_of_guests}
                        </Text>
                    }
                </Text>
            </View>
            <View>
                <Text style={styles.cardSubtitle}>
                    {item.address}, {item.locality}
                </Text>
            </View>
        </TouchableOpacity>
    )

    render() {
        const {
            isLoading,
            attendees
        } = this.props.list;
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
                        text: 'Attendees', style: { color: theme.white, fontSize: 20 }
                    }}
                />
                {isLoading ? (
                    <View style={styles.container}>
                        <ActivityIndicator size="large" color={theme.grey1} />
                    </View>
                ) : (
                        <FlatList
                            data={attendees}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => this.renderAttendeeCard(item)}
                            ListEmptyComponent={
                                <View style={commonStyle.noDataContainer}>
                                    <Text style={commonStyle.infoMessageTextStyle}>
                                        No one has RSVP'ed yet
                                </Text>
                                </View>
                            }
                            contentContainerStyle={{ margin: 10 }}
                        />
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
    cardContainer: {
        width: '100%',
        borderRadius: 5,
        elevation: 1,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: theme.grey5,
        shadowOpacity: 0.5,
        backgroundColor: theme.white,
        marginBottom: 10,
        padding: 10
    },
    cardTitle: { fontSize: 24, fontWeight: 'bold', marginLeft: 10, color: theme.grey1 },
    cardSubtitle: { fontSize: 12, color: theme.grey3, marginLeft: 35, marginTop: 5 }
});

const mapStateToProps = state => ({
    list: state.listReducer
});

export default connect(mapStateToProps, actions)(List);
