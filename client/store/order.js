import axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'

export const addPuzzleOrder = order => {
  return {
    type: ADD_TO_CART,
    order
  }
}

export const addToCart = event => {
  return async dispatch => {
    try {
      const {data} = await Axios.post('/api/cart', event)
      dispatch(addPuzzleOrder(data))
    } catch (error) {
      dispatch(console.error(error))
    }
  }
}

const initialState = {
  purchasedPuzzle: []
}

export default function orderReducer(state = initialState, action) {
  switch (Action.type) {
    case ADD_TO_CART:
      return {...state, purchasedPuzzle: action.puzzle}
    default:
      return state
  }
}
