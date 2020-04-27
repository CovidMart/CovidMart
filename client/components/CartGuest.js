import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Cart from './Cart'
import {fetchPuzzlesForCart} from '../store/cart'

class CartGuest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted: false
    }
    this.lineItem = this.lineItem.bind(this)
  }

  componentDidMount() {
    const cartData = window.localStorage
    console.log('Component CartData to fetch with:', cartData)
    this.props.fetchCart(cartData)
    this.setState({mounted: true})
  }

  lineItem(item) {
    return item.qty * item.price
  }

  render() {
    console.log(this.props, 'this.props from CartGuest')
    if (this.state.mounted) {
      const {cartArray} = this.props
      return (
        <div>
          <Cart orderArray={cartArray} lineItemSubtotal={this.lineItem} />
          {this.props.match !== undefined &&
            this.props.match.path == '/cart' && (
              <Link to="/checkout">
                <button type="button">CHECKOUT NOW</button>
              </Link>
            )}
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
    cartArray: state.cart.guestCart
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: cartData => dispatch(fetchPuzzlesForCart(cartData))
  }
}

export default connect(mapState, mapDispatch)(CartGuest)
