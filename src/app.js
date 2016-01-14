import React from 'react-native';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer'

const store = createStore(reducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MovieListApp />
      </Provider>
    );
  }
};
