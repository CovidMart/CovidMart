import axios from 'axios'

const SET_CART = 'SET_CART'

const setCart = cart => ({
  type: SET_CART,
  cart
})

export const fetchCart = async userId => {
  if (userId) {
    return async dispatch => {
      try {
        const {data} = await axios.get(`/api/cart/${userId}`)
        console.log('Data from fetchCart api req--->', data)
        dispatch(setCart(data))
      } catch (error) {
        console.error(error)
      }
    }
  } else {
    // eslint-disable-next-line no-lonely-if
    if (window.localStorage.guestCart) {
      const guestCart = {}
      guestCart[cartData] = JSON.parse(window.localStorage.guestCart)
      if (
        typeof guestCart[cartData] === 'object' &&
        guestCart[cartData].length > 0
      ) {
        const {data} = await axios.post(`api/cart`, guestCart)
        console.log('Guest cart API req returns as DATA:', data)
        //modify data with any missing vals
        dispatch(setCart(data))
      }
      //populate cart state
    } else {
      window.localStorage.setItem('guestCart', '{}')
    }
  }
}

const initialState = {
  activeCart: {}
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return {...state, activeCart: action.cart}
    default:
      return state
  }
}
