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
  if (userData && userData.id) {
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
          const {data} = await axios.post('/api/cart/guest', guestCart)
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

export const mergeMyCart = (guestCart, user) => async () => {
  try {
    const {data} = await axios.get(`/api/cart/${user.id}`)
    let {id, puzzles} = data
    if (!id) {
      puzzles = []
    }
    // eslint-disable-next-line guard-for-in
    for (let p in guestCart) {
      let quantity = guestCart[p]
      let pid = parseInt(p, 10)
      for (let i = 0; i < puzzles.length; i++) {
        let puzzleId = parseInt(puzzles[i].id)
        if (pid === puzzleId) {
          await axios.put(`/api/cart/${user.id}`, {
            orderId: id,
            puzzleId,
            quantity,
            addFromShop: true
          })
        } else {
          await axios.post(`/api/cart/${user.id}`, {puzzleId, quantity})
        }
      }
    }
    window.localStorage.clear()
    fetchCart(user)
  } catch (error) {
    console.error(error)
  }
}

export const checkoutUserCart = userId => {
  return async dispatch => {
    try {
      await axios.put(`/api/cart/${userId}/checkout`, {
        stillInCart: false
      })
      dispatch(setCart({}))
    } catch (error) {
      console.error(error)
    }
  }
}

export const checkoutGuestCart = () => {
  window.localStorage.setItem('guestCart', '{}')
  return dispatch => {
    dispatch(setCart({}))
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
