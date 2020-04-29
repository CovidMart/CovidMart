import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import UserInfoForm from './UserInfoForm'
import {fetchCart, mergeMyCart} from '../store/cart'
import OrderHistory from './OrderHistory'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  componentDidMount() {
    const user = this.props.singleUser
    this.props.getCart(user)
    if (window.localStorage.guestCart) {
      const cartData = JSON.parse(window.localStorage.guestCart)
      if (typeof cartData === 'object') {
        this.props.mergeCart(cartData, user)
      }
    }
  }

  render() {
    const {
      email,
      firstName,
      lastName,
      phone,
      address,
      id
    } = this.props.singleUser

    return (
      <div>
        <h2>Welcome, {firstName}!</h2>
        <img src="/happyPuzzlePiece.png" width="220" height="280" />
        <h3>Current User Info On File:</h3>
        <p>
          <strong>Name:</strong> {firstName} {lastName}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Phone Number:</strong> {phone}
        </p>
        <p>
          <strong>Address:</strong> {address}
        </p>
        <UserInfoForm userId={id} />
        <div>
          <OrderHistory userId={id} />
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    singleUser: state.user.singleUser
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: userData => dispatch(fetchCart(userData)),
    mergeCart: (cartData, user, fetch) =>
      dispatch(mergeMyCart(cartData, user, fetch))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
