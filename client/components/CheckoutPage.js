import React from 'react'
import {connect} from 'react-redux'
import UserInfoForm from './UserInfoForm'
import Cart from './Cart'
import Checkout from '../../src/Checkout'
import {checkoutUserCart, checkoutGuestCart} from '../store/cart'

export class CheckoutPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.setState({mounted: true})
  }

  handleClick() {
    if (this.props.isLoggedIn) {
      let userId = this.props.userId
      this.props.checkoutUserCart(userId)
    } else {
      window.localStorage.clear()
      this.props.checkoutGuestCart()
    }
  }

  render() {
    if (this.state.mounted) {
      return (
        <div>
          <h3>Current User Info On File</h3>
          {this.props.isLoggedIn && (
            <div>
              {this.props.user.firstName} {this.props.user.lastName},{' '}
              {this.props.user.address}, {this.props.user.phone}
            </div>
          )}
          <UserInfoForm />
          <Cart />
          <Checkout
            amount={100}
            name="Puzzle Party"
            description="Thank you for your order!"
          />
          <button type="button" onClick={this.handleClick}>
            CLEAR CART
          </button>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Loading Checkout Page...</h2>
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
    isLoggedIn: !!state.user.singleUser.id,
    userId: state.user.singleUser.id,
    user: state.user.singleUser
  }
}

const mapDispatch = dispatch => {
  return {
    checkoutUserCart: userId => dispatch(checkoutUserCart(userId)),
    checkoutGuestCart: () => dispatch(checkoutGuestCart())
  }
}

export default connect(mapState, mapDispatch)(CheckoutPage)
