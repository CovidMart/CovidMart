import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, fetchCart} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin, userId}) => (
  <div>
    <br />
    <br />
    <h1>PUZZLE PARTY</h1>
    <nav>
      <div>
        <Link to="/puzzles">Shop</Link>
        <Link to={`/cart/${userId || 'guest'}`}>Cart</Link>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links AFTER you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links BEFORE you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
        {isAdmin && (
          <div>
            {/* Shows these links only to Admin */}
            <Link to="/admin/puzzle/create"> Create Puzzle </Link>
          </div>
        )}
      </div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.singleUser.id,
    isAdmin: state.user.singleUser.isAdmin,
    userId: state.user.singleUser.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(fetchCart(null))
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
