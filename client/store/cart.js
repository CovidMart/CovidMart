import axios from 'axios'

const GET_CART = 'GET_CART'

const getCart = cart => ({
  type: GET_CART,
  cart
})

export const fetchCart = userId => {
  //If there's a user Id, get their cart
  if (userId) {
    return async dispatch => {
      try {
        const {data} = await axios.get(`/api/cart/${userId}`)
        dispatch(getCart(data))
      } catch (error) {
        console.error(error)
      }
    }
  } else {
    //get localStorage, or else create it
  }
}

const initialState = {
  activeCart: []
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, cart: action.cart}
    default:
      return state
  }
}
