import React from 'react'
import {connect} from 'react-redux'
import {fetchOrderHistory} from '../store/orderHistory'

export class OrderHistory extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchOrderHistory()
  }

  render() {
    console.log('PROPPSSS', this.state)
    return (
      <div>
        <div><h2>HELLLOOOOOO</h2></div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    orderHistory: state.orders
  }
}

const mapDispatch = dispatch => {
  return {
    fetchOrderHistory: () => dispatch(fetchOrderHistory())
  }
}

export default connect(mapState, mapDispatch)(OrderHistory)
