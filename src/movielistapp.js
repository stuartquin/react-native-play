'use strict';

import React from 'react-native';
import MovieList from './movielist';

var {
  AppRegistry,
  BackAndroid,
  ListView,
  Navigator,
  Text,
  TouchableOpacity
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
          Movie List
        </Text>
      </TouchableOpacity>
    );
  }
};

export default class MovieListApp extends React.Component {
  render() {
    return <Navigator
      initialRoute={{
        name: 'Movie List',
        component: MovieList,
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
  }
};
