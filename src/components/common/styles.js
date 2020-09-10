import { StyleSheet } from 'react-native';
import theme from './../../theme';

export const commonStyle = StyleSheet.create({
    noDataContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    infoMessageTextStyle: {
        fontSize: 11,
        fontStyle: 'italic',
        color: theme.grey3
    },
    reportTitleTextStyle: {
        fontSize: 16,
        color: theme.grey0,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    reportTitleContainerStyle: {
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
