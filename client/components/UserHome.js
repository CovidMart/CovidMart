import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props, 'this.props')
    const {email, firstName, lastName, phone, address} = this.props.singleUser

    return (
      <div>
        <h2>Welcome, {firstName}!</h2>
        <img src="/happyPuzzlePiece.png" width="265" height="300" />
        <h3>Account Info:</h3>
        <p>
          <strong>Name:</strong> {firstName} {lastName}
        </p>
        <h3>
          <strong>Email:</strong> {email}
        </h3>
        <p>
          <strong>Phone Number:</strong> {phone}
        </p>
        <p>
          <strong>Address:</strong> {address}
        </p>
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
