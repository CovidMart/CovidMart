import axios from 'axios'
import store from './index'

export const ORDER_HISTORY = 'ORDER_HISTORY'

export const setOrders = orders => ({
  type: ORDER_HISTORY,
  orders
})

export const fetchOrderHistory = () => {
  return async dispatch => {
    try {
      // store.subscribe(()=>{
      //   this.setState({
      //     userId: store.getState().user.singleUser.id
      //   })
      // })
      const {data} = axios.get('/api/orders/27')
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
