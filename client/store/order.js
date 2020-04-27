import axios from 'axios'
import store from './index'

// const ADD_TO_CART = 'ADD_TO_CART'

// export const addPuzzleOrder = quantity => {
//   return {
//     type: ADD_TO_CART,
//     quantity
//   }
// }

export const addToCart = (newOrder, fetchCart = null) => {
  const state = store.getState()
  const userId = state.user.singleUser.id
  return async () => {
    //dispatch => {
    try {
      await axios.post(`/api/cart/${userId}`, newOrder)
      //dispatch(addPuzzleOrder(qty))
      if (fetchCart) fetchCart(userId)
    } catch (error) {
      console.error(error)
    }
  }
}

// const initialState = {
// }

// export default function orderReducer(state = initialState, action) {
//   switch (action.type) {
//     case ADD_TO_CART:
//       return {...state, quantity: action.quantity}
//     default:
//       return state
//   }
// }
