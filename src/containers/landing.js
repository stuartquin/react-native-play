'use strict';

import React from 'react-native';
import MK from 'react-native-material-kit';
import { connect } from 'react-redux';

var {
  Text,
  View
} = React;

const MaterialButton = MK.MKButton.button().build();

class LandingScreen extends React.Component {
  render() {
    console.log(this.props);
    return (
      <View style={{marginTop: 70}}>
        <Text>{this.props.state}</Text>
        <MaterialButton onPress={() => {
          this.props.dispatch({type: 'SAY_HELLO'});
        }}>
          <Text>Load App</Text>
        </MaterialButton>
      </View>
    );
  }
};

export default connect(state => ({
  state: state.welcome
}))(LandingScreen);
