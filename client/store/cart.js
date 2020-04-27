import axios from 'axios'

const SET_CART = 'SET_CART'

const setCart = cart => ({
  type: SET_CART,
  cart
})

const calculateTotal = puzzleArr => {
  return puzzleArr.reduce((a, c) => {
    a += c.PuzzleOrders.subtotal
    return a
  }, 0)
}

export const fetchCart = userData => {
  if (userData) {
    return async dispatch => {
      try {
        const {data} = await axios.get(`/api/cart/${userData.id}`)
        let {id, pricePaid, puzzles, userId} = data
        if (pricePaid <= 0) {
          pricePaid = calculateTotal(puzzles)
        }
        dispatch(setCart({id, pricePaid, puzzles, userId}))
      } catch (error) {
        console.error(error)
      }
    }
  } else if (window.localStorage.guestCart) {
    const guestCart = {}
    guestCart.cartData = JSON.parse(window.localStorage.guestCart)
    if (typeof guestCart.cartData === 'object') {
      return async dispatch => {
        try {
          const {data} = await axios.post('/api/cart', guestCart)
          console.log('Guest cart API req returns as DATA:', data)
          //modify data with any missing vals
          dispatch(setCart(data))
        } catch (error) {
          console.error(error)
        }
      }
    } else window.localStorage.setItem('guestCart', '{}')
  } else {
    window.localStorage.setItem('guestCart', '{}')
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

// const initialState = {
//   activeCart: {
//     userId: 0,
//     puzzleOrders: [],
//     totalOrderPrice: 0
//   }
// }
