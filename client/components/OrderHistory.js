import React from 'react'
import {connect} from 'react-redux'
import {fetchOrderHistory} from '../store/orderHistory'

export class OrderHistory extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    await this.props.fetchOrderHistory(this.props.userId)
  }

  render() {
    let orderInfo = this.props.orderHistory
    return (
      <div>
        <h2>Order History:</h2>
        <div>
          <table>
            <tr>
              <th>Order Number</th>
              <th>Total</th>
              <th>Shipping Status</th>
            </tr>
            {orderInfo &&
              orderInfo.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>${order.pricePaid / 100}</td>
                  <td>{order.shippingStatus}</td>
                </tr>
              ))}
          </table>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    orderHistory: state.orderHistory.orderHistory
  }
}

const mapDispatch = dispatch => {
  return {
    fetchOrderHistory: userId => dispatch(fetchOrderHistory(userId))
  }
}

export default connect(mapState, mapDispatch)(OrderHistory)
