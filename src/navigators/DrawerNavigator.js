import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HOME, LIST, REPORTS } from './ScreenNames';
import Home from '../components/Home';
import List from '../components/List';
import Reports from '../components/Reports';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name={HOME} component={Home} />
            <Drawer.Screen name={LIST} component={List} />
            <Drawer.Screen name={REPORTS} component={Reports} />
        </Drawer.Navigator>
    );
}
