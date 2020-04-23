import React from 'react'
import {connect} from 'react-redux'
import Cart from './Cart'

export default class CartGuest extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   cartObj: {},
    // }
  }

  componentDidMount() {
    this.props.cartObj = window.localStorage
    console.log('Got Cart??-->\n', this.props.cartObj)
  }

  render() {
    //if stuff on the props-state (array of puzzles)
    //load the cart, else...
    if (this.props.cartObj) {
      //(this.props.cartArray) {
      return (
        <div>
          <Cart puzzleArr={this.props.cartObj} />
        </div>
      )
    } else {
      return (
        <div>
          <h2>Loading cart...</h2>
          <img src="loadingPuzzleGif.webp" alt="Animated Puzzle Pieces" />
        </div>
      )
    }
  }
}

// on mount, this component will fetch data from window.localStorage
// which is written as key (puzzle id): value (quantity in cart)
// and thunk will dispatch api request for the corresponding puzzle data
// by sending the window.localStorage cartObj in the req.body as guestCart
// the returned puzzles go on state for info display in the cart
// quantity is added to the json data (array of puzzles) before res.jsoning it
