import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email, firstName, lastName, phone, address, userImg} = props

  return (
    <div>
      <h3>
        Welcome, {firstName} {lastName}!
      </h3>
      <h2>Account Info:</h2>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    phone: state.user.phone,
    address: state.user.address,
    userImg: state.user.userImg,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
}
