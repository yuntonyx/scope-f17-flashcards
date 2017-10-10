import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  FlatList,
  Platform
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import BookItem from './BookItem';

export default class FavoriteScreen extends Component {

  keyExtractor = (item, index) => index;

  /*
    For every ite
    m in our books array, we render a BookItem component
    This is a custom component that displays the book title and description
  */
  renderBook = ({item}) => {
      return <BookItem book={item} navigation={this.props.navigation} />
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Starred Books</Text>
        </View>
        <FlatList
          data={this.props.favoriteBooks}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderBook}
          style={styles.bookList}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e3e4ea'
  },
  textInput: {
    fontSize: 20,
    color: 'red',
    flexBasis: '20%',
    width: '100%'
  },
  bookList: {
    width: '100%'
  },
  header: {
    width: '100%',
    padding: 20,
    paddingTop: (Platform.OS === 'ios') ? 40 : 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#6f7ec3',
    marginBottom: 20
  },
  headerTitle: {
    textAlign: 'center',
    flex: 1,
    fontSize: 18,
    color: 'white'
  }
});