import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, fetchCart} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin, userId}) => (
  <div>
    <br />
    <nav>
      <a href="/">
        <h1>PUZZLE PARTY</h1>
      </a>
      <div>
        <Link to="/puzzles">
          <i className="fa fa-puzzle-piece" aria-hidden="true"></i>
          Shop
        </Link>
      </div>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links AFTER you log in */}
          <Link to="/home">
            <i className="fa fa-user" aria-hidden="true"></i>
            Home
          </Link>
          <a href="#" onClick={handleClick}>
            <i className="fa fa-sign-out" aria-hidden="true"></i>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links BEFORE you log in */}
          <Link to="/login">
            <i className="fa fa-user" aria-hidden="true"></i>
            Login
          </Link>
          <Link to="/signup">
            <i className="fa fa-check" aria-hidden="true"></i>
            Sign Up
          </Link>
        </div>
      )}
      {isAdmin && (
        <div>
          {/* Shows these links only to Admin */}
          <Link to="/admin/puzzle/create">
            <i className="fa fa-plus" aria-hidden="true"></i>
            Create Puzzle{' '}
          </Link>
        </div>
      )}
      <div>
        <Link to={`/cart/${userId || 'guest'}`}>
          <i className="fa fa-fw fa-shopping-cart"></i>
          Cart
        </Link>
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
