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
  if (userId === undefined) {
    return async dispatch => {
      try {
        const getState = localStorage.getItem('state')
        if (getState === null) {
          console.log('got here')
          let orderInfo = {}
          let key = newOrder.puzzleId
          let testThis = [(orderInfo[key] = newOrder.quantity)]
          const newState = JSON.parse(7)
          console.log(newState)
          // localStorage.setItem('state', newState)
        }

        // return JSON.parse(getState);
      } catch (err) {
        return undefined
      }
    }
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
