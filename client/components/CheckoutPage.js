import React from 'react'
import {connect} from 'react-redux'
import UserInfoForm from './UserInfoForm'
import CartUser from './CartUser'
import CartGuest from './CartGuest'
import {fetchPuzzlesForCart} from '../store/cart'

// on mount, this component copies data from window.localStorage
// which thunk will dispatch in api request for the corresponding puzzle data
// by sending the window.localStorage cartObj in the req.body as guestCart
// the returned puzzles go on state for info display in the cart
// quantity is added to the json data (array of puzzles) before res.jsoning it

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
    console.log('clicked!!!')
  }

  render() {
    console.log(this.props, 'checkoutpage this.props')
    if (this.state.mounted) {
      return (
        <div>
          <UserInfoForm />
          <CartUser {...this.props} userId={this.props.userId} />
          <button type="button" onClick={this.handleClick}>
            CHECKOUT{' '}
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
    userId: state.user.singleUser.id
  }
}

// const mapDispatch = dispatch => {
//   return {
//     fetchCart: cartData => dispatch(fetchPuzzlesForCart(cartData))
//   }
// }

export default connect(mapState)(CheckoutPage)
