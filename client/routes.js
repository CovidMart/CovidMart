import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllPuzzles,
  SinglePuzzle,
  CartGuest,
  CartUser,
  AllUsers,
  CreatePuzzle,
  EditPuzzle
} from './components'

import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/puzzles" component={AllPuzzles} />
        <Route exact path="/users" component={AllUsers} />
        <Route exact path="/puzzles/:puzzleId" component={SinglePuzzle} />
        <Route exact path="/admin/puzzle/create" component={CreatePuzzle} />
        {!isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available if NOT logged in */}
            <Route exact path="/cart" component={CartGuest} />
          </Switch>
        )}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route exact path="/cart/:userId" component={CartUser} />
          </Switch>
        )}

        {isLoggedIn &&
          isAdmin && (
            <Switch>
              {/* Routes placed here are only available after admin logging in */}
              <Route
                exact
                path="/admin/puzzle/create"
                component={CreatePuzzle}
              />
              <Route exact path="/admin/puzzle/edit" component={EditPuzzle} />
            </Switch>
          )}

        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.singleUser.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
