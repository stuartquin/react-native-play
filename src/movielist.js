'use strict';
import React from 'react-native';
import MovieRow from './movierow';
import MovieDetail from './moviedetail';

const API_KEY = '7waqfqbprs7pajbz28mqf6vz';
const API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
const PAGE_SIZE = 25;
const PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
const REQUEST_URL = API_URL + PARAMS;


let {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});


class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie.bind(this)}
        style={styles.listView}
      />
    );
  }

  renderMovie(movie, rowSection, rowID) {
    return  <TouchableHighlight onPress={() => this.clickMovie(movie)}>
      <MovieRow
        clickMovie={this.clickMovie}
        movie={movie} />
    </TouchableHighlight>
  }

  clickMovie(movie) {
    console.log(this.props);
    console.log(movie);
    this.props.navigator.push({
      title: movie.title,
      component: MovieDetail,
      hello: 'world',
      props: {movie: movie}
    });
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }
}

export default MovieList;
