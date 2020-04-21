import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, firstName, lastName, phone, address, userImg} = props

  return (
    <div>
      <h2>Welcome, {firstName}!</h2>
      <img src={userImg} width="300" height="300" />
      <h3>Account Info:</h3>
      <p>
        <strong>Name:</strong> {firstName} {lastName}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Phone Number:</strong> {phone}
      </p>
      <p>
        <strong>Address:</strong> {address}
      </p>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    phone: state.user.phone,
    address: state.user.address,
    userImg: state.user.userImg
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
