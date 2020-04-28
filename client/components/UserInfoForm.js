import React from 'react'
import {connect} from 'react-redux'
import {updateUserInStore} from '../store/user'

// on mount, this component copies data from window.localStorage
// which thunk will dispatch in api request for the corresponding puzzle data
// by sending the window.localStorage cartObj in the req.body as guestCart
// the returned puzzles go on state for info display in the cart
// quantity is added to the json data (array of puzzles) before res.jsoning it

class UserInfoForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      phone: ''
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const user = this.state
    const {id} = this.props.user
    this.props.updateUser(user, id)
  }

  render() {
    return (
      <div className="userInfo">
        <h4>Update User Info:</h4>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="firstName"
            onChange={this.handleChange}
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            onChange={this.handleChange}
            placeholder="Last Name"
          />
          <input
            type="text"
            name="address"
            onChange={this.handleChange}
            placeholder="Address"
          />
          <input
            type="text"
            name="phone"
            onChange={this.handleChange}
            placeholder="Phone Number"
          />
          <p>
            <button type="submit">Update Info</button>
          </p>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user.singleUser
  }
}

const mapDispatch = dispatch => ({
  updateUser: (user, id) => {
    dispatch(updateUserInStore(user, id))
  }
})

export default connect(mapState, mapDispatch)(UserInfoForm)
