'use strict';

import React from 'react-native';
import MK from 'react-native-material-kit';
import { connect } from 'react-redux';

var {
  ListView,
  Text,
  TextInput,
  View
} = React;

const MaterialButton = MK.MKButton.button().build();


const ThoughtList = ({
  thoughts
}) => {
  return (
    <ListView
      dataSource={thoughts}
      renderRow={(rowData) => <Text>{rowData}</Text>}
    />
  );
};

const AddThought = ({
  onAdd
}) => {
  let currentValue;
  return (
    <View>
      <TextInput
        onChangeText={(text) => {
          currentValue = text
        }}
      />
      <MaterialButton
        onPress={() => {
          onAdd(currentValue);
          currentValue = '';
        }}>
        <Text>Add</Text>
      </MaterialButton>
    </View>
  );
};


class ThoughtsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
  }

  getThoughtsDataSource(thoughts) {
    return this.dataSource.cloneWithRows(thoughts);
  }

  render() {
    const thoughts = this.props.state.thoughts;

    return (
      <View style={{marginTop: 70}}>
        <ThoughtList
          thoughts={this.getThoughtsDataSource(thoughts)} />
        <AddThought
          onAdd={(value) => {
            this.props.dispatch({
              type: 'ADD_THOUGHT',
              value
            });
          }}
        />
      </View>
    );
  }
};

export default connect(state => ({
  state: state
}))(ThoughtsContainer);
