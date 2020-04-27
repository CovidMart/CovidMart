import axios from 'axios'
import store from './index'

export const addToCart = (newOrder, fetchCart = null) => {
  const state = store.getState()
  const userId = state.user.singleUser.id
  return async () => {
    try {
      await axios.post(`/api/cart/${userId}`, newOrder)
      if (fetchCart) fetchCart(userId)
    } catch (error) {
      console.error(error)
    }
  }
}
