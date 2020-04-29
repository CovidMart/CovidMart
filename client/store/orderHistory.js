import axios from 'axios'
import store from './index'
import user from './user'

export const ORDER_HISTORY = 'ORDER_HISTORY'

export const setOrders = orders => {
  return {
    type: ORDER_HISTORY,
    orders
  }
}

export const fetchOrderHistory = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/${userId}`)
      dispatch(setOrders(data))
    } catch (error) {
      dispatch(console.error(error))
    }
  }
}

export const fetchSingleHistory = (userId, orderId) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/${userId}/${orderId}`)
      dispatch(setsingleOrder(data))
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
      return {...state, orderHistory: action.orders}
    default:
      return state
  }
}
