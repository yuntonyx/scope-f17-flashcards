import React from 'react';
import { 
  StyleSheet, 
  Button, 
  Text, 
  View, 
  TouchableWithoutFeedback,
  TouchableHighlight
} from 'react-native';

export default class Card extends React.Component {
  state = {
    showTerm: false
  }

  /*
    Flips the showTerm flag in our state
  */
  flipCard = () => {
    this.setState({
      showTerm: !this.state.showTerm
    });
  }

  render() {
    const textStyle = (this.state.showTerm) ? (styles.termText) : (styles.definitionText);
    return (
      <TouchableWithoutFeedback onPress={this.flipCard}>
        <View style={[styles.container]}>
          <Text style={styles.cardTitle}>{(this.state.showTerm) ? ("Term") : ("Definition")}</Text>
          <Text style={textStyle}>{(this.state.showTerm) ? (this.props.cardData.term) : (this.props.cardData.definition)}</Text>
          <Text style={styles.timeText}>Created at {this.props.cardData.time.toLocaleString()}</Text>
          <TouchableHighlight 
            onPress={() => this.props.deleteCard(this.props.id)} 
            underlayColor='transparent'
            style={styles.closeButton}
          >
             <Text style={styles.closeButtonText}>✕</Text>
          </TouchableHighlight>
          <TouchableHighlight 
            onPress={() => this.props.toggleCardFav(this.props.id)} 
            underlayColor='transparent'
            style={this.props.cardData.fav ? styles.starButtonFav : styles.starButtonNotFav}
          >
             <Text style={this.props.cardData.fav ? styles.favStar : styles.notFavStar}>{this.props.cardData.fav ? '★' : '☆'}</Text>
          </TouchableHighlight>
        </View>
      </TouchableWithoutFeedback>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    flexBasis: '50%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding: 20,
    height: 300
  }, 
  cardTitle: {
    color: '#7f8c8d',
    fontSize: 18,
    fontFamily: 'Georgia',
    position: 'absolute',
    left: 20,
    top: 20
  },
  termText: {
    fontSize: 50,
    fontFamily: 'Georgia-Bold'
  },
  definitionText: {
    fontSize: 30,
    fontFamily: 'Georgia'
  },
  timeText: {
    fontSize: 10,
    color: '#7f8c8d',
    position: 'absolute',
    bottom: 20,
    left: 20
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  closeButtonText: {
    textAlign: 'center',
    fontSize: 30,
    color: 'black',
    fontWeight: '200'
  },
  starButtonFav: {
    position: 'absolute',
    bottom: 14,
    right: 20
  },
  starButtonNotFav: {
    position: 'absolute',
    bottom: 18,
    right: 20
  },
  favStar: {
    fontSize: 23,
    color: '#f3b812'
  },
  notFavStar: {
    fontSize: 18
  }
}); 