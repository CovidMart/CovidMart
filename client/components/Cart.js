import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CartList from './CartList'
import {fetchCart} from '../store/cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted: false
    }
  }

  componentDidMount() {
    const {userId} = this.props.activeCart
    const user = {id: userId}
    this.props.fetchCart(user)
    this.setState({mounted: true})
  }

  render() {
    const {userId} = this.props.activeCart
    if (this.state.mounted) {
      const {activeCart} = this.props
      return (
        <div>
          <CartList activeCart={activeCart} fetchCart={this.props.fetchCart} />
          {this.props.match.path == `/cart/${userId || 'guest'}` && (
            <Link to={`checkout/${userId || 'guest'}`}>
              <button type="button">CHECKOUT NOW</button>
            </Link>
          )}
        </div>
      )
    } else {
      return (
        <div>
          <h2>Loading cart...</h2>
          <img
            src="/loadingPuzzleGif.webp"
            alt="Animated Puzzle Pieces"
            height="160"
            width="160"
          />
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    activeCart: state.cart.activeCart
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: userData => dispatch(fetchCart(userData)) //takes obj w/ id on it
  }
}

export default connect(mapState, mapDispatch)(Cart)
