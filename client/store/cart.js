import axios from 'axios'

const GET_LOCALSTORAGE_PUZZLES = 'GET_LOCALSTORAGE_PUZZLES'

const getPuzzlesForCart = guestPuzzles => ({
  type: GET_LOCALSTORAGE_PUZZLES,
  guestPuzzles
})

export const fetchPuzzlesForCart = localStor => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/cart', localStor)
      console.log('Redux Fetched DATA:', data)
      dispatch(getPuzzlesForCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  guestCart: []
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOCALSTORAGE_PUZZLES:
      return {...state, guestCart: action.guestPuzzles}

    default:
      return state
  }
}
