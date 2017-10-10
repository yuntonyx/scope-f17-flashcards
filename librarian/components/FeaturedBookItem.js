import React, { Component } from 'react';
import { 
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Image
} from 'react-native';

export default class FeaturedBookItem extends Component {
  render() {
    const book = this.props.book;

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
      <TouchableWithoutFeedback onPress={() => {
        this.props.navigation.navigate('Book', { book: book });
      }}>
        <View style={styles.bookContainer}>
          <Image 
            style={styles.bookThumbnail}
            resizeMode='contain'
            source={{uri: book.imageLinks.thumbnail}}
          />
          <Text style={styles.bookTitle}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    ); 
  }
}

const styles = StyleSheet.create({
  bookContainer: {
    borderWidth: 1,
    borderColor: '#f4f4f6',
    width: 130,
    height: 220,
    padding: 20,
    margin: 10,
    backgroundColor: 'white'
  },
  bookThumbnail: {
    height: 100,
    marginBottom: 10
  },
  bookTitle: {

  },
});