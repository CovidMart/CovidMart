import axios from 'axios'

const GET_LOCALSTORAGE_PUZZLES = 'GET_LOCALSTORAGE_PUZZLES'

const getPuzzlesForCart = guestPuzzles => ({
  type: GET_LOCALSTORAGE_PUZZLES,
  guestPuzzles
})

export const fetchPuzzlesForCart = guestCartObj => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/cart', guestCartObj)
      dispatch(getPuzzlesForCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  cart: {}
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOCALSTORAGE_PUZZLES:
      return {...state, cart: action.guestPuzzles}

    default:
      return state
  }
}
