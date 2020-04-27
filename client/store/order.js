import axios from 'axios'
import store from './index'

const ADD_TO_CART = 'ADD_TO_CART'

export const addPuzzleOrder = order => {
  return {
    type: ADD_TO_CART,
    order
  }
}

export const addToCart = newOrder => {
  const state = store.getState()
  const userId = state.user.singleUser.id

  //Guest User Add to Cart
  if (userId === undefined) {
    return async dispatch => {
      try {
        const getState = localStorage.getItem('guestCart')

        let orderInfo = {}
        let quantity = newOrder.quantity
        let puzzle = parseInt(newOrder.puzzleId, 10)

        if (getState === null) {
          orderInfo[puzzle] = quantity.toString()
          const newState = JSON.stringify(orderInfo)
          localStorage.setItem('guestCart', newState)
        } else if (getState) {
          orderInfo[puzzle] = quantity.toString()
          pullOrder.map(item => (item[puzzle] = quantity))
          const newState = JSON.stringify(pullOrder)
          localStorage.setItem('guestCart', newState)
        }
      } catch (error) {
        dispatch(console.error(error))
      }
    }
    //Logged In User Add to Cart
  } else {
    return async dispatch => {
      try {
        const {data} = await axios.post(`/api/cart/${userId}`, newOrder)
        dispatch(addPuzzleOrder(data))
      } catch (error) {
        dispatch(console.error(error))
      }
    }
  }
}

const initialState = {
  purchasedPuzzle: []
}

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {...state, purchasedPuzzle: action.order}
    default:
      return state
  }
}
