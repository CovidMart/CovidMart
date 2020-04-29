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
      // mounted: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    // this.setState({mounted: true})
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
    console.log('---CHECKOUT PAGE IS RENDERED-----')
    console.log(this.props, 'checkoutpage this.props')
    // if (this.state.mounted) {
    return (
      <div>
        {this.props.isLoggedIn && (
          <div>
            <h4>Current User Info On File</h4>
            <div>
              {this.props.user.firstName} {this.props.user.lastName}
            </div>
            <div>{this.props.user.address}</div>
            <div>{this.props.user.phone}</div>
          </div>
        )}
        <UserInfoForm />
        <Cart />
        <h2>Order Total: ${this.props.cart.pricePaid / 100}</h2>
        <Checkout
          amount={this.props.cart.pricePaid / 100}
          name="Puzzle Party"
          description="Thank you for your order!"
          bitcoin
          email={this.props.user.email}
        />
        <button type="button" onClick={this.handleClick}>
          CLEAR CART
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.singleUser.id,
    userId: state.user.singleUser.id,
    user: state.user.singleUser,
    cart: state.cart.activeCart
  }
}

const mapDispatch = dispatch => {
  return {
    checkoutUserCart: userId => dispatch(checkoutUserCart(userId)),
    checkoutGuestCart: () => dispatch(checkoutGuestCart())
  }
}

export default connect(mapState, mapDispatch)(CheckoutPage)
