import axios from 'axios'

const SET_CART = 'SET_CART'

const setCart = cart => ({
  type: SET_CART,
  cart
})

const calculateTotal = puzzleArr => {
  return puzzleArr.reduce((a, c) => {
    if (c.PuzzleOrders) a += c.PuzzleOrders.subtotal
    else a += c.price * c.qty
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
          const configuredCart = {
            id: 0, //guest order 0
            pricePaid: calculateTotal(data),
            puzzles: data, //arr w/ qty stored directly on each el
            userId: 0 //guest ID 0
          }
          dispatch(setCart(configuredCart))
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
