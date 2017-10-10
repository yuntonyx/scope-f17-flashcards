import React, { Component } from 'react';
import { 
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Image
} from 'react-native';

export default class BookItem extends Component {
  render() {
    const book = this.props.book;

    /*
      Sometimes the description can be super long. 
      This code will shorten the description to be 120 characters max
    */

    let title = book.title;
    let description = book.description;

    if (description) {
      if (description.length >= 30) {
        description = description.slice(0, 30) + '...';
      }
    }else{
      description = 'This book has no description...';
    }

    if(title.length > 40){
      title = title.slice(0, 40) + '...';
    }
    
    return (
      <TouchableWithoutFeedback 
        onPress={() => {
          this.props.navigation.navigate('Book', { book: book })
        }}
      >
        <View style={styles.listItem}>
          <View style={styles.bookImage}>
            <View style={styles.bookImageShadow}>
              {book.imageLinks && book.imageLinks.thumbnail ? (<Image 
                style={styles.bookThumbnail}
                resizeMode='cover'
                source={{uri: book.imageLinks.thumbnail}}
              />) : (<View style={styles.bookThumbnail}></View>)}
            </View>
          </View>
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{title}</Text>
            <Text style={styles.bookDescription}>{description}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    ); 
  }
}

const styles = StyleSheet.create({
  listItem: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderColor: '#f4f4f6'
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'ArialRoundedMTBold'
  },
  bookDescription: {
    fontSize: 12,
    color: '#34495E',
    fontFamily: 'ArialRoundedMTBold'
  },
  bookThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  bookImageShadow: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'black',
    borderColor: '#f4f4f6'
  },
  bookImage: {
    flex: 1,
    display: 'flex',
    alignItems: 'center'
  },
  bookInfo: {
    flex: 3
  }
});