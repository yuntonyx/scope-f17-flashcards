

import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableHighlight, 
  ScrollView, 
  Modal,
  TextInput
} from 'react-native';

/*
  Import our two custom components
*/
import NewCardModal from './NewCardModal';
import Card from './Card';

/*
  Default set of cards
*/
const DEFAULT_CARDS = [
  {
    term: "Tommy Trojan",
    definition: "The most popular unofficial mascot of the university",
    fav: true,
    time: new Date()
  }, {
    term: "Hecuba",
    definition: 'Queen of Troy and centerpiece of USC Village’s Central Piazza',
    fav: false,
    time: new Date()
  }
];

class App extends Component {
  // Fill this out
  state = {
    cards: DEFAULT_CARDS,
    modalVisible: false,
    filterFav: false
  }
 
  /*
    Toggles the new card modal
  */
  _toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  _toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  _toggleFilterFav = (index) => {
    this.setState({
      filterFav: !this.state.filterFav
    });
  }

  _toggleCardFav = (index) => {
    const cards = this.state.cards;
    cards[index].fav = !cards[index].fav;
    this.setState({
      cards: cards
    });
  }

  /*
    Passed to the new card modal.
    Called when user decides to add new card.
    Creates card object and adds it to our state
  */
  _addCard = (_term, _definition) => {
    const cards = this.state.cards;

    cards.push({
      term: _term,
      definition: _definition,
      fav: false,
      time: new Date()
    });

    this.setState({
      cards: cards
    });

    this.setState({
      modalVisible: false
    });
  }

  _deleteCard = (index) => {
    const cards = this.state.cards;
    cards.splice(index, 1);
    this.setState({
      cards: cards
    });
  }

  render() {
    // Loop through the cards array in state and create Card component for each card
    const cards = this.state.cards
    .filter((card) => {
      if(this.state.filterFav && !card.fav){
        return false;
      }
      return true;
    }).map((card, index) => {
      return <Card cardData={card} key={index} id={index} deleteCard={this._deleteCard} toggleCardFav={this._toggleCardFav}/>
    });

    return (
      <View style={styles.container}>
        <NewCardModal 
          modalVisible={this.state.modalVisible} 
          toggleModal={this._toggleModal}
          addCard={this._addCard}
        />
        <ScrollView>
          {cards}
        </ScrollView>
        <TouchableHighlight 
          style={styles.filterFavButton} 
          onPress={this._toggleFilterFav} 
          underlayColor='#e67e22'
        >
          <Text style={styles.addButtonText}>{this.state.filterFav ? 'Show All Cards' : 'Show Favorited Cards'}</Text>
        </TouchableHighlight>
        <TouchableHighlight 
          style={styles.addButton} 
          onPress={this._toggleModal} 
          underlayColor='#2980b9'
        >
          <Text style={styles.addButtonText}>Add Card</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1'
  },
  addButton: {
    backgroundColor: '#3498db',
    paddingTop: 10,
    paddingBottom: 10
  },
  addButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 15
  },
  filterFavButton: {
    backgroundColor: '#f39c12',
    paddingTop: 10,
    paddingBottom: 10
  }
});

export default App;