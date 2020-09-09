import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import Details from '../components/Details';
import { DETAILS, ROOT } from './ScreenNames';

const Stack = createStackNavigator();

export default function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                component={DrawerNavigator}
                name={ROOT}
                options={{ headerShown: false }}
            />
            <Stack.Screen component={Details} name={DETAILS} />
        </Stack.Navigator>
    );
}
