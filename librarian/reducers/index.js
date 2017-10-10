const favBooks = (state = [], action) => {
  switch (action.type) {
    case 'FAV_BOOK':
      for(var i = 0; i < state.length; i++){
        if(state[i].title === action.book.title){
          return state;
        }
      }
      return [
        ...state,
        action.book
      ]
    case 'UNFAV_BOOK':
      return state.filter((book) => book.title !== action.title);
    default:
      return state
  }
}

export default favBooks