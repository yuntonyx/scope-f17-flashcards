import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TextInput, 
  Button, 
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image, 
  Keyboard,
  Platform
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import BookItem from './BookItem';

/* 
  SearchScreen will define the user interface and behavior for our search screen
  In this screen, users can search for a book via title by hitting the Google Books API
*/

export default class SearchScreen extends Component {

  /*
    We keep track of and update two variables:
    books - An array of book data
    searchTerm - The title users are searching for
  */
  state = {
    books: [],
    searchTerm: ''
  }

  keyExtractor = (item, index) => item.id;
 
  /*
    Called when we hit Search
    fetch is a function in ReactNative that allows us to make HTTP requests
    What we do here is hit the Google books API and pass a parameter
    We get the response, convert it a JavaScript object
    Then get the 'items' array from the object and set it to our books state
  */
  searchBooks = () => {
    fetch('https://www.googleapis.com/books/v1/volumes?q=' + this.state.searchTerm)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          books: data.items
        });
      });

    Keyboard.dismiss()
  } 

  keyExtractor = (item, index) => item.id;

  /*
    For every item in our books array, we render a BookItem component
    This is a custom component that displays the book title and description
  */
  renderBook = ({item}) => {
      return <BookItem book={item.volumeInfo} navigation={this.props.navigation} />
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchView}>
            <View style={styles.searchBar}>
              <Icon style={styles.searchIcon} name="search"/>
              <TextInput 
                onChangeText={(text) => { 
                  this.setState({
                    searchTerm: text
                  });
                }}
                onSubmitEditing={this.searchBooks}
                value={this.state.searchTerm}
                style={styles.searchTextInput}
                placeholder='Search books...'
                placeholderTextColor='#edeaea'
              />
            </View>
        </View>

        <FlatList
          data={this.state.books}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderBook}
          style={styles.bookList}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  },
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
  searchView: {
    width: '100%',
    padding: 20,
    paddingTop: (Platform.OS === 'ios') ? 40 : 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#6f7ec3',
    marginBottom: 20
  },
  searchBar: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#444d77',
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8
  },
  searchIcon: {
    fontSize: 20,
    color: 'white',
    width: '10%',
    paddingLeft: 12,
  },
  searchTextInput: {
    width: '90%',
    color: 'white'
  }
});