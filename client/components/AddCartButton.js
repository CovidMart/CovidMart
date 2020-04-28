import React from 'react'
import {connect} from 'react-redux'
import {addToLocalStorage, addToCart} from '../store/order'

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
    const cart = this.props.activeCart
    const {addFromShop, fetchCart} = this.props
    event.preventDefault()
    //check if this puzzleOrder already exists on state
    const puzzleId = parseInt(this.props.id, 10)
    const prePuzzles = cart.puzzles.map(pzl => pzl.id)
    const newRow = prePuzzles.indexOf(puzzleId) < 0
    const userId = parseInt(cart.userId, 10)
    const newOrder = {
      userId,
      puzzleId,
      newRow,
      quantity: parseInt(this.state.quantity, 10)
    }
    if (userId) this.props.addToCart(newOrder, addFromShop, fetchCart)
    else this.props.addToLocalStorage(newOrder, addFromShop, fetchCart)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <div className="cart">
        <div>
          <button type="button" onClick={this.clickAddToCart}>
            {this.props.addFromShop ? 'Add to Cart' : 'Update Cart'}
          </button>
        </div>
        <div />
        <input
          name="quantity"
          type="number"
          min="0"
          onChange={this.handleChange}
          value={this.state.quantity}
        />
      </div>
    )
  }
}

const mapState = state => ({
  activeCart: state.cart.activeCart
})

const mapDispatch = dispatch => ({
  addToLocalStorage: (newOrder, addFromShop, fetchCart) =>
    dispatch(addToLocalStorage(newOrder, addFromShop, fetchCart)),
  addToCart: (newOrder, addFromShop, fetchCart) =>
    dispatch(addToCart(newOrder, addFromShop, fetchCart))
})

export default connect(mapState, mapDispatch)(AddCartButton)
