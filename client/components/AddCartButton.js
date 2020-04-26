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
      orderId: 6
    }
    this.clickAddToCart = this.clickAddToCart.bind(this)
    this.handleChange = this.handleChange.bind(this)
    // this.createOrderNumber=this.createOrderNumber.bind(this)
  }

  clickAddToCart(event) {
    event.preventDefault()
    try {
      const newOrder = {
        quantity: this.state.quantity,
        puzzleId: this.state.puzzleId,
        price: this.state.price,
        orderId: this.state.orderId
      }
      // this.createOrderNumber(newOrder.userId)
      this.props.addToCart(newOrder)
      console.log(newOrder)
      this.setState({
        quantity: 0
      })
    } catch (err) {
      console.log(err)
    }
  }

  // createOrderNumber(userid){
  //   if(userid){
  //     orderId= this.state.orderId
  //     orderId=+1
  //   }
  // }

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
