import React from 'react'

export default class CheckoutButton extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="cart">
        <div>
          <button type="button">CHECKOUT</button>
        </div>
      </div>
    )
  }
}
