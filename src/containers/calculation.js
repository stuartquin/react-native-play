'use strict';

import React from 'react-native';
import MK from 'react-native-material-kit';
import { connect } from 'react-redux';

var {
  ListView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;

const SalaryInput = ({
  value,
  onValueChange
}) => {
  return (
    <TextInput
      placeholder='Yearly Salary'
      onChangeText={(text) => {
        onValueChange(text);
      }}
    />
  );
};

const Summary = ({
  results
}) => {
  return (
    <View>
      <Text>Gross: {results.get('salary')}</Text>
      <Text>Taxable: {results.get('taxable')}</Text>
    </View>
  );
};

class CalculationContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{marginTop: 70}}>
        <SalaryInput
          value={this.props.state.get('salary')}
          onValueChange={(value) => {
            this.props.dispatch({
              type: 'SET_SALARY',
              value
            });
          }}
        />
        <Summary results={this.props.state.get('summary')} />
      </View>
    );
  }
};

// Auto inject Redux state and export main
export default connect(state => ({
  state: state
}))(CalculationContainer);
