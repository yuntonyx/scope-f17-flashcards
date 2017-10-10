import { connect } from 'react-redux'
import FavoriteScreen from '../components/FavoriteScreen'

const mapStateToProps = (state, ownProps) => {
  return {
    favoriteBooks: state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const FavoriteScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteScreen)

export default FavoriteScreenContainer