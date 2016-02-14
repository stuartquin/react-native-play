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

const popOverStyles = StyleSheet.create({
  contaner: {
    position: 'absolute'
  }
});

const TagPopOver = ({
  tags,
  onTagSelected
}) => {
  return (
    <ListView
      dataSource={tags}
      horizontal={true}
      renderRow={tag => <Tag tag={tag} onTagClick={onTagSelected} />}
    />
  );
};

const tagStyles = StyleSheet.create({
  container: {
    marginRight: 10,
    backgroundColor: '#3FB0AC',
    padding: 10
  },

  text: {
    color: '#FFFFFF'
  }
});

const Tag = ({
  tag,
  onTagClick
}) => {
  return (
    <MaterialButton
    onPress={() => {
      onTagClick(tag)
    }}>
      <Text text={tagStyles.text}>{tag}</Text>
    </MaterialButton>
  );
};

const getTagPrefix = (text) => {
  const chunk = text.split(' ').reverse()[0];
  if (chunk.startsWith('#')) {
    return chunk.replace(/^#+/, "");
  }
  return null;
};

class AddThought extends React.Component {
  render() {
    const onAdd = this.props.onAdd;
    const suggestedTags = this.props.suggestedTags;
    const onSuggestTags = this.props.onSuggestTags;

    let tagPrefix = null;

    return (
      <View>
        <TextInput
          ref={component => this._textInput = component}
          onChangeText={(text) => {
            this.currentValue = text;
            this.tagPrefix = getTagPrefix(this.currentValue);
            onSuggestTags(this.tagPrefix);
          }}
        />
        <TagPopOver 
          tags={suggestedTags}
          onTagSelected={(tag) => {
            const reg = new RegExp(`#${this.tagPrefix}(\\s|$)`);
            this.currentValue = this.currentValue.replace(reg, `#${tag} `);
            this._textInput.setNativeProps({
              text: this.currentValue
            });
            this.forceUpdate();
          }}/>
        <MaterialButton
          onPress={() => {
            onAdd(this.currentValue);
            onSuggestTags(null);
            this._textInput.setNativeProps({text: ''});
          }}>
          <Text>Add</Text>
        </MaterialButton>
      </View>
    );
  };
}

class ThoughtsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
  }

  getThoughtsDataSource(thoughts) {
    return 
  }

  render() {
    const thoughts = this.props.state.get('thoughts').toJS();
    const suggestedTags = this.props.state.get('suggestedTags').toJS();
    return (
      <View style={{marginTop: 70}}>
        <ThoughtList
          thoughts={this.dataSource.cloneWithRows(thoughts)} />
        <AddThought
          suggestedTags={this.dataSource.cloneWithRows(suggestedTags)}
          onAdd={(value) => {
            this.props.dispatch({
              type: 'ADD_THOUGHT',
              value
            });
          }}
          onSuggestTags={(value) => {
            console.log('onSuggestTags', value);
            this.props.dispatch({
              type: 'SUGGEST_TAGS',
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
