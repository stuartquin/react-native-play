'use strict';

import React, { Component } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import LandingScreen from './containers/landing';
import ThoughtsContainer from './containers/thoughts';

import reducer from './reducer';


var {
  AppRegistry,
  BackAndroid,
  Button,
  ListView,
  Navigator,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} = React;


let _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return null;
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
          SoItGoes
        </Text>
      </TouchableOpacity>
    );
  }
};

const store = createStore(reducer);

export default class SoItGoesApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{
            name: 'Landing',
            component: ThoughtsContainer,
            index: 0,
          }}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
            routeMapper={NavigationBarRouteMapper} />
          }
          renderScene={(route, navigator) => {
            _navigator = navigator;

            if (route.component) {
              let props = {...route.props};
              props.navigator = navigator;
              return React.createElement(route.component, props);
            }
          }}
        />
      </Provider>
    );
  }
};
