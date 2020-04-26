import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import UserInfoForm from './UserInfoForm'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props, 'this.props')
    const {
      email,
      firstName,
      lastName,
      phone,
      address,
      id
    } = this.props.singleUser

    return (
      <div>
        <h2>Welcome, {firstName}!</h2>
        <img src="/happyPuzzlePiece.png" width="220" height="280" />
        <h3>Current User Info On File:</h3>
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
        <UserInfoForm userId={id} />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    singleUser: state.user.singleUser
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
