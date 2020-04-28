import React from 'react'
import {connect} from 'react-redux'
import Cart from './Cart'
import {fetchCart} from '../store/cart'

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

  lineItem(item) {
    return item.PuzzleOrders.subtotal
  }

  render() {
    if (this.state.mounted) {
      const {activeCart, refreshCart} = this.props
      return (
        <div>
          <Cart activeCart={activeCart} refreshCart={refreshCart} />
        </div>
      )
    } else {
      return (
        <div>
          <h2>Loading cart...</h2>
          <img
            src="/loadingPuzzleGif.webp"
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
    activeCart: state.cart.activeCart
  }
}

const mapDispatch = dispatch => {
  return {
    refreshCart: userId => dispatch(fetchCart(userId))
  }
}

export default connect(mapState, mapDispatch)(CartUser)
