import { connect } from 'react-redux'
import { favBook, unfavBook } from '../actions'
import BookScreen from '../components/BookScreen'

const mapStateToProps = (state, ownProps) => {
  return {
    isFav: ((state, ownProps) => {
      for(var i = 0; i < state.length; i++){
        if(state[i].title === ownProps.navigation.state.params.book.title){
          return true;
        }
      }
      return false;
    })(state, ownProps)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    favBook: (book) => {
      dispatch(favBook(book))
    },
    unfavBook: (title) => {
      dispatch(unfavBook(title))
    }
  }
}

const BookScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookScreen)

export default BookScreenContainer