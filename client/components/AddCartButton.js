import React from 'react'
import {connect} from 'react-redux'
import {addToCart} from '../store/order'

export class AddCartButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0,
      puzzleId: this.props.id,
      price: this.props.price
    }
    this.clickAddToCart = this.clickAddToCart.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  clickAddToCart(event) {
    event.preventDefault()
    const newOrder = {
      quantity: this.state.quantity,
      puzzleId: this.state.puzzleId,
      price: this.state.price
    }
    this.props.addToCart(newOrder)
    this.setState({
      quantity: 0
    })
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
    console.log(this.state)
  }

  render() {
    return (
      <div className="allbuttons">
        <div>
          <button type="button" onClick={this.clickAddToCart}>
            ADD TO CART
          </button>
        </div>
        <div />
        <input name="quantity" type="number" onChange={this.handleChange} />
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
