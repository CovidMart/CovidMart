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
    this.handleEmailChange = this.handleChange.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.handleAddressChange = this.handleChange.bind(this)
    this.validateAddress = this.validateAddress.bind(this)
    this.handlePhoneNumberChange = this.handleChange.bind(this)
    this.validatePhone = this.validatePhone.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      email: null,
      firstName: null,
      lastName: null,
      address: null,
      phone: null,
      phoneError: '',
      emailError: '',
      addressError: ''
    }
  }

  handleChange(event) {
    console.log('regular handlechange')
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleEmailChange = event => {
    console.log('handleEmailChange')
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        this.validateEmail()
      }
    )
  }

  validateEmail() {
    const {email} = this.state
    this.setState({
      emailError:
        email.length > 5 ? null : '**Please enter a valid email address'
    })
  }

  handlePhoneNumberChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        this.validatePhone()
      }
    )
  }

  validatePhone() {
    const {phone} = this.state
    this.setState({
      phoneError:
        phone.length > 7 ? null : '**Please enter a valid phone number'
    })
  }

  handleAddressChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        this.validateAddress()
      }
    )
  }

  validateAddress() {
    const {address} = this.state
    this.setState({
      phoneError: address.length > 7 ? null : '**Please enter a valid address'
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phone: this.state.phone
    }
    const {id} = this.props.user
    this.props.updateUser(user, id)
  }

  render() {
    return (
      <div className="userInfo">
        <h4>Update User Info:</h4>
        <form onSubmit={this.handleSubmit}>
          {!this.props.user.id && (
            <input
              type="text"
              name="email"
              onChange={this.handleEmailChange}
              placeholder="Email Address"
              onBlur={this.validateEmail}
            />
          )}
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
            onBlur={this.validateAddress}
          />
          <input
            type="text"
            name="phone"
            onChange={this.handlePhoneNumberChange}
            placeholder="Phone Number"
            onBlur={this.validatePhone}
          />
          <div className="invalid-feedback">
            <small>{this.state.phoneError}</small>
          </div>
          <div className="invalid-feedback">
            <small>{this.state.emailError}</small>
          </div>
          <div className="invalid-feedback">
            <small>{this.state.addressError}</small>
          </div>
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
