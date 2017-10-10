export const favBook = book => {
  return {
    type: 'FAV_BOOK',
    book
  }
}

export const unfavBook = title => {
  return {
    type: 'UNFAV_BOOK',
    title
  }
}