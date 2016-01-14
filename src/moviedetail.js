'use strict';
import React from 'react-native';

var {
  BackAndroid,
  Image,
  Text,
  View,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
    marginRight: 10
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'left',
  },
  year: {
    textAlign: 'left',
  },
  thumbnail: {
    width: 53,
    height: 81,
  }
});

export default class MovieDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    const movie = this.props.movie;
    return (
      <View
        ref={component => this._root = component}
        style={styles.container}
        onClick={() => this.props.clickMovie(this.props.movie)}>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
          <Text style={styles.year}>{movie.synopsis}</Text>
        </View>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
      </View>
    );
  }
}
