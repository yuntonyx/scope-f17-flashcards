import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

export default class BookScreen extends Component {
  /*
    Set the StackNavigator options so our screen's title says Book
  */
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.state.params.book.title,
      
    };
  };

  render() {
    /*
      Grab the data that may have been passed to this screen through the navigator
    */
    const { params } = this.props.navigation.state;
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TouchableOpacity
            onPress={() => {
                if(this.props.isFav){
                  this.props.unfavBook(params.book.title);
                }else{
                  this.props.favBook(params.book);
                }
            }}
            style={
              {
                flexDirection: 'row',
                alignItems: 'center'
              }
            }
          >
            <Text style={this.props.isFav ? styles.favStar : styles.notFavStar}>{this.props.isFav ? '★' : '☆'}</Text>
            <Text style={styles.starText}>{this.props.isFav ? ' Starred' : ' Tap to Star'}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{params.book.title}</Text>
          {params.book.imageLinks && params.book.imageLinks.thumbnail ? (<Image 
            style={styles.thumbnail}
            resizeMode='contain'
            source={{uri: params.book.imageLinks.thumbnail}}
          />) : null}
          <Text style={styles.description}>{'Page Count: ' + params.book.pageCount}</Text>
          <Text style={styles.description}>{'Authors: ' + params.book.authors}</Text>
          <Text style={styles.description}>{'Description: ' + params.book.description}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  thumbnail: {
    width: 200,
    height: 200,
    flex: 1,
    marginTop: 20,
    marginBottom: 20
  },
  description: {
    fontSize: 15,
    lineHeight: 20,
    padding: 15
  },
  favStar: {
    fontSize: 25,
    color: '#f3b812',
    marginBottom: -5
  },
  notFavStar: {
    marginTop: 5,
    fontSize: 20
  },
  starText: {
    marginTop: 6,
    fontSize: 16
  }
});