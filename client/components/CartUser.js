import React from 'react'
import {connect} from 'react-redux'
import Cart from './Cart'
import {fetchUserOrdersForCart} from '../store/cart'

class CartUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted: false
    }
  }

  componentDidMount() {
    const {userId} = this.props
    this.props.fetchCart(userId)
    this.setState({mounted: true})
  }

  render() {
    if (this.state.mounted) {
      const {cartArray} = this.props
      return (
        <div>
          <Cart orderArray={cartArray} />
        </div>
      )
    } else {
      return (
        <div>
          <h2>Loading cart...</h2>
          <img
            src="loadingPuzzleGif.webp"
            alt="Animated Puzzle Pieces"
            height="160"
            width="160"
          />
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    cartArray: state.cart.userCart
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: userId => dispatch(fetchUserOrdersForCart(userId))
  }
}

export default connect(mapState, mapDispatch)(CartUser)
