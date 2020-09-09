import React, { Component } from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, applyMiddleware } from 'redux';
import reducers from './redux/reducers';
import NavigationService from './NavigationService';
import RootNavigator from './navigators/RootNavigator';

export const store = createStore(reducers, {}, applyMiddleware(thunk));

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <NavigationContainer
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                >
                    <RootNavigator />
                </NavigationContainer>
            </Provider>
        );
    }
}
export default App;
