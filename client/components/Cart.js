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
    const {userId} = this.props || 0
    const user = {id: userId}
    this.props.fetchCart(user)
    this.setState({mounted: true})
  }

  render() {
    const {userId} = this.props.activeCart || 0
    if (this.state.mounted) {
      const {activeCart} = this.props
      return (
        <div className="cartView">
          <CartList activeCart={activeCart} fetchCart={this.props.fetchCart} />
          <div>
            <h3>Party Carty!</h3>
            {this.props.match &&
              this.props.match.path === `/cart/${userId || 'guest'}` && (
                <Link to={`/cart/${userId || 'guest'}/checkout`}>
                  <button type="button" className="checkoutBtn">
                    CHECKOUT NOW
                  </button>
                </Link>
              )}
          </div>
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
    activeCart: state.cart.activeCart,
    userId: state.user.singleUser.id
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: userData => dispatch(fetchCart(userData))
  }
}

export default connect(mapState, mapDispatch)(Cart)
