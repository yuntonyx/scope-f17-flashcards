import React from 'react';
import { 
  StyleSheet, 
  Button, 
  Text, 
  View, 
  TouchableWithoutFeedback,
  TouchableHighlight,
  Animated,
  Dimensions
} from 'react-native';

export default class Card extends React.Component {

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    });
    this.state = {
      isDefSide: true
    };
  }

  /*
    Flips the showTerm flag in our state
  */
  flipCard = () => {
    this.setState({isDefSide: !this.state.isDefSide});
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 15,
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 15
      }).start();
    }
  }

  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate}
      ]
    };
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    };

    const defSideStyles = [styles.container, frontAnimatedStyle];
    const termSideStyles = [styles.container, backAnimatedStyle, styles.backContainer];

    if(this.state.isDefSide){
      defSideStyles.push(styles.frontZIndex);
    }else{
      termSideStyles.push(styles.frontZIndex);
    }

    return (
      <TouchableWithoutFeedback onPress={this.flipCard}>
        <View>
          <Animated.View style={defSideStyles}>
            <Text style={styles.cardTitle}>{"Definition"}</Text>
            <Text style={styles.definitionText}>{this.props.cardData.definition}</Text>
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
          </Animated.View>
          <Animated.View style={termSideStyles}>
            <Text style={styles.cardTitle}>Term</Text>
            <Text style={styles.termText}>{this.props.cardData.term}</Text>
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
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  } 
}

const styles = StyleSheet.create({
  frontZIndex: {
    zIndex: 999999
  },
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
    height: 300,
    backfaceVisibility: 'hidden',
    width: Dimensions.get('window').width - 20 * 2
  }, 
  backContainer: {
    position: 'absolute',
    top: 0
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
    fontSize: 30,
    color: '#f3b812'
  },
  notFavStar: {
    fontSize: 25
  }
}); 