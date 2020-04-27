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
  //Pulls userID off store if loggedin
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

        //create new order for new guest
        //if state does not exist, create it and add the puzzleID:quantity as a key-value pair object to the array
        if (getState === null) {
          orderInfo[puzzle] = quantity.toString()
          const newState = JSON.stringify(orderInfo)
          localStorage.setItem('guestCart', newState)
        } else if (getState) {
          //if state exists, add new puzzle to it
          const pullOrder = JSON.parse(getState)
          //if puzzle ID exists, then update the quantity
          if (puzzle in pullOrder) {
            pullOrder[puzzle] = quantity
          } else {
            pullOrder[puzzle] = quantity.toString()
          }

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
