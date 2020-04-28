import axios from 'axios'
import store from './index'

export const ORDER_HISTORY = 'ORDER_HISTORY'

export const setOrders = orders => ({
  type: ORDER_HISTORY,
  orders
})

export const fetchOrderHistory = () => {
  const state = store.getState()
  const userId = state.user.singleUser.id
  return async dispatch => {
    try {
      console.log('USERID', userId)

      const {data} = userID && axios.get(`/api/orders/${userId}`)
      dispatch(setOrders(data))
    } catch (error) {
      dispatch(console.error(error))
    }
  }
}

const initialState = {
  orderHistory: []
}

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case ORDER_HISTORY:
      console.log(action)
      return {...state, orderHistory: action.orders}
    default:
      return state
  }
}
