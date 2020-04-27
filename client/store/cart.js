import axios from 'axios'

const GET_LOCALSTORAGE_PUZZLES = 'GET_LOCALSTORAGE_PUZZLES'
const GET_LOGGED_IN_CART = 'GET_LOGGED_IN_CART'
const CHECKOUT_USER = 'CHECKOUT_USER'

const getPuzzlesForCart = guestPuzzles => ({
  type: GET_LOCALSTORAGE_PUZZLES,
  guestPuzzles
})

const getUserOrdersForCart = userPuzzles => ({
  type: GET_LOGGED_IN_CART,
  userPuzzles
})

const checkoutUser = order => ({
  type: CHECKOUT_USER,
  order
})

export const fetchPuzzlesForCart = localStor => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/cart', localStor)
      dispatch(getPuzzlesForCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchUserOrdersForCart = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart/${userId}`)
      dispatch(getUserOrdersForCart(data[0].puzzles))
    } catch (error) {
      console.error(error)
    }
  }
}

export const checkoutUserCart = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cart/checkout/${userId}`, {
        stillInCart: false
      })
      dispatch(checkoutUser(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  guestCart: [],
  userCart: []
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOCALSTORAGE_PUZZLES:
      return {...state, guestCart: action.guestPuzzles}
    case GET_LOGGED_IN_CART:
      return {...state, userCart: action.userPuzzles}
    case CHECKOUT_USER:
      return {...state, userCart: {}}
    case CHECKOUT_GUEST:
      return {...state, guestCart: {}}
    default:
      return state
  }
}
