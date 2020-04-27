import React from 'react'
import {connect} from 'react-redux'
import {addToCart} from '../store/order'

export class AddCartButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.quantity || 0
    }
    this.clickAddToCart = this.clickAddToCart.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  clickAddToCart(event) {
    event.preventDefault()
    try {
      const newOrder = {
        quantity: parseInt(this.state.quantity, 10),
        puzzleId: parseInt(this.props.id, 10)
      }
      const fetchCart = this.props.fetchCart
      this.props.addToCart(newOrder, fetchCart)
    } catch (err) {
      console.error(err)
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <div className="cart">
        <div>
          <button type="button" onClick={this.clickAddToCart}>
            {this.props.text}
          </button>
        </div>
        <div />
        <input
          name="quantity"
          type="number"
          onChange={this.handleChange}
          value={this.state.quantity}
        />
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  addToCart: (event, fetchCart) => dispatch(addToCart(event, fetchCart))
})

export default connect(null, mapDispatch)(AddCartButton)
