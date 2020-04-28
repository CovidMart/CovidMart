import axios from 'axios'

export const addToLocalStorage = (newOrder, fetchCart = null) => {
  return () => {
    try {
      const getState = localStorage.getItem('guestCart')
      let orderInfo = {}
      let quantity = newOrder.quantity
      let puzzle = parseInt(newOrder.puzzleId, 10)

      //create new order for new guest
      //if state does not exist, create it and add the puzzleID:quantity as a key-value pair object to the array
      if (getState === null) {
        orderInfo[puzzle] = quantity.toString()
        const newState = JSON.stringify(orderInfo)
        localStorage.setItem('guestCart', newState)
      } else if (getState) {
        //if state exists, add new puzzle to it
        const pullOrder = JSON.parse(getState)
        //if puzzle ID exists, then update the quantity
        if (puzzle in pullOrder) {
          pullOrder[puzzle] = quantity
        } else {
          pullOrder[puzzle] = quantity.toString()
        }

        const newState = JSON.stringify(pullOrder)
        localStorage.setItem('guestCart', newState)
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export const addToCart = (newOrder, fetchCart = null) => {
  const userId = newOrder.userId
  return async () => {
    try {
      await axios.post(`/api/cart/${userId}`, newOrder)
      if (fetchCart) fetchCart(userId)
    } catch (error) {
      console.error(error)
    }
  }
}
