import React from 'react'
import {connect} from 'react-redux'
import UserInfoForm from './UserInfoForm'
import Cart from './Cart'
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
  }

  componentDidMount() {
    this.setState({mounted: true})
  }

  render() {
    if (this.state.mounted) {
      return (
        <div>
          <h1>USER INFO FORM:</h1>
          <UserInfoForm />
        </div>
      )
    } else {
      return (
        <div>
          <h2>Loading user info...</h2>
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
    hi: 'hey'
  }
}

// const mapDispatch = dispatch => {
//   return {
//     fetchCart: cartData => dispatch(fetchPuzzlesForCart(cartData))
//   }
// }

export default connect(mapState)(CheckoutPage)
