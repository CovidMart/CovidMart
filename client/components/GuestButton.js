import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class GuestButton extends Component {
  render() {
    return (
      <div>
        <div> New Customer </div>
        <div> Checkout as Guest </div>
        <div>
          <Link to="/cart/guest">Continue to Checkout</Link>
        </div>
      </div>
    )
  }
}

export default GuestButton
