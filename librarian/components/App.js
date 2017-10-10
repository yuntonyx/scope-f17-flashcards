import { TabNavigator, StackNavigator } from 'react-navigation';
import SearchScreen from './SearchScreen';
import BookScreenContainer from '../containers/BookScreenContainer';
import HomeScreen from './HomeScreen';
import FavoriteScreenContainer from '../containers/FavoriteScreenContainer';

import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';

/* 
  Our App will rely on a StackNavigator to move between screens
  Here we define 2 screens: search and book
  Search - Allows us to search books by title
  Book - Allows us to see details about a particular book
*/

const SearchStack = StackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: {
    	header: null
    }
  },
  Book: {
    screen: BookScreenContainer
  },
});

const App  = TabNavigator({
  	Home: { 
  		screen: HomeScreen,
  		navigationOptions: {
			tabBarLabel: 'Home',
			tabBarIcon: ({ tintColor }) => (
				<Icon style={[{color: tintColor}]} size={25} name="home"/>
			)
		}
	},
	Search: { 
  		screen: SearchStack,
  		navigationOptions: {
			tabBarLabel: 'Search',
			tabBarIcon: ({ tintColor }) => (
				<Icon style={[{color: tintColor}]} size={18} name="search"/>
			)
		}
  	},
  	Favorite: { 
  		screen: FavoriteScreenContainer,
  		navigationOptions: {
			tabBarLabel: 'Starred',
			tabBarIcon: ({ tintColor }) => (
				<Icon style={[{color: tintColor}]} size={22} name="star"/>
			)
		}
	}
}, 
{
	tabBarPosition: 'bottom',
	animationEnabled: true,
	tabBarOptions: {
		activeTintColor: '#e91e63'
	}
});

export default App;