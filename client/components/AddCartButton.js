import React from 'react'
import {connect} from 'react-redux'
import {addToCart} from '../store/order'

export class AddCartButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0,
      puzzleId: this.props.id,
      price: this.props.price,
      orderId: 1
    }
    this.clickAddToCart = this.clickAddToCart.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  clickAddToCart(event) {
    event.preventDefault()
    try {
      const newOrder = {
        quantity: parseInt(this.state.quantity, 10),
        puzzleId: parseInt(this.state.puzzleId, 10),
        price: this.state.price,
        orderId: this.state.orderId
      }
      this.props.addToCart(newOrder)
      this.setState({
        quantity: 0
      })
    } catch (err) {
      console.log(err)
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
            ADD TO CART
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
const mapState = state => ({
  quantity: state.quantity
})

const mapDispatch = dispatch => ({
  addToCart: event => dispatch(addToCart(event))
})

export default connect(mapState, mapDispatch)(AddCartButton)
