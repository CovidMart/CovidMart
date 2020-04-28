import axios from 'axios'

export const addToLocalStorage = (
  newOrder,
  addFromShop = false,
  fetchCart = null
) => {
  return dispatch => {
    const cartState = JSON.parse(localStorage.getItem('guestCart')) || {}
    const {puzzleId, newRow, quantity} = newOrder
    if (newRow || !addFromShop) cartState[puzzleId] = quantity
    else {
      let qty = cartState[puzzleId]
      qty = parseInt(qty, 10) + quantity
      cartState[puzzleId] = qty
    }
    if (fetchCart) dispatch(fetchCart(null))
  }
}

export const addToCart = (newOrder, addFromShop = false, fetchCart = null) => {
  const {userId, newRow} = newOrder
  newOrder.addFromShop = addFromShop //api check this whether to increment
  return async dispatch => {
    try {
      if (newRow) await axios.post(`/api/cart/${userId}`, newOrder)
      else await axios.put(`/api/cart/${userId}`, newOrder)
      if (fetchCart) dispatch(fetchCart(userId))
    } catch (error) {
      console.error(error)
    }
  }
}
