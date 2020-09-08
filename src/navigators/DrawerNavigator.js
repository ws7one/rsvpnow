import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HOME, LIST } from './ScreenNames';
import Home from '../components/Home';
import List from '../components/List';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name={HOME} component={Home} />
            <Drawer.Screen name={LIST} component={List} />
        </Drawer.Navigator>
    );
}
