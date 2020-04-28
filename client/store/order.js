import axios from 'axios'

export const addToLocalStorage = (
  newOrder,
  addFromShop = false,
  fetchCart = null
) => {
  return () => {
    const cartState = JSON.parse(localStorage.getItem('guestCart')) || {}
    const {puzzleId, newRow, quantity} = newOrder
    if (newRow || !addFromShop) cartState[puzzleId] = quantity
    else {
      let qty = cartState[puzzleId]
      qty = parseInt(qty, 10) + quantity
      cartState[puzzleId] = qty
    }
    window.localStorage.setItem('guestCart', JSON.stringify(cartState))
    if (fetchCart) fetchCart(null) //dispatch(fetchCart(null))
  }
}

export const addToCart = (newOrder, addFromShop = false, fetchCart = null) => {
  const {userId, newRow, quantity} = newOrder
  const user = {id: userId}
  newOrder.addFromShop = addFromShop //api check this whether to increment
  return async () => {
    try {
      if (newRow) await axios.post(`/api/cart/${userId}`, newOrder)
      else await axios.put(`/api/cart/${userId}`, newOrder)
      if (fetchCart) fetchCart(user)
    } catch (error) {
      console.error(error)
    }
  }
}
