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

const TaxBands = ({
  bands,
  taxDue
}) => {
  if (!bands) {
    return (<View></View>);
  }
  const totalTax = taxDue.reduce((x, y) => x + y);
  return (
    <View>
      <Text>
        Total : {totalTax}
      </Text>
      {bands.keySeq().map(index => {
        const info = bands.get(index);
        const tax = taxDue.get(index);
        return (
        <Text key={index}>
          {info.get('rate')}% : {tax}
        </Text>
        );
      })}
    </View>
  );
};

const Summary = ({
  results
}) => {
  return (
    <View>
      <Text>Gross: {results.get('salary')}</Text>
      <Text>Taxable: {results.get('taxable')}</Text>
      <TaxBands bands={results.get('bands')} taxDue={results.get('taxDue')}/>
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
