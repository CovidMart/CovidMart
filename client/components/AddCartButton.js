import React from 'react'
import {connect} from 'react-redux'
import {addToCart} from '../store/order'

export class AddCartButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0,
      puzzleId: this.props.id || this.props.singleId,
      price: this.props.price || this.props.singlePrice,
      orderId: 4,
      userId: 3
    }
    this.clickAddToCart = this.clickAddToCart.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  clickAddToCart(event) {
    event.preventDefault()
    try {
      const newOrder = {
        quantity: this.state.quantity,
        puzzleId: this.state.puzzleId,
        price: this.state.price,
        orderId: this.state.orderId,
        userId: this.state.userId
      }
      this.props.addToCart(newOrder)
      // this.setState({
      //   quantity: 0
      // })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    console.log(this.props)
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
          defaultValue="0"
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
