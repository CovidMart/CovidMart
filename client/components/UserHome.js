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
      userImg
    } = this.props.singleUser

    return (
      <div>
        <h2>Welcome, {firstName}!</h2>
        <img
          src="https://w7.pngwing.com/pngs/874/225/png-transparent-happiness-smile-puzzle-symbol-jigsaw-piece-love-smiley-anger.png"
          width="400"
          height="300"
        />
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
        <UserInfoForm />
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
