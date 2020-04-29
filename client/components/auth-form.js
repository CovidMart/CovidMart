import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
class AuthForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.validatePassword = this.validatePassword.bind(this)
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: ''
    }
  }

  handleEmailChange() {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        this.validateEmail()
      }
    )
    console.log(this.state, '<---handleEmailChange')
  }

  handlePasswordChange() {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        this.validatePassword()
        console.log(this.state, '<---handleEmailChange')
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

  validatePassword() {
    const {password} = this.state
    this.setState({
      phoneError:
        password.length > 8
          ? null
          : '**Please enter password greater than 8 characters'
    })
  }

  render() {
    const {name, displayName, handleSubmit, error} = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">{displayName}</h5>
                <form
                  className="form-signin"
                  onSubmit={handleSubmit}
                  name={name}
                >
                  <div className="form-label-group">
                    <input
                      name="email"
                      type="text"
                      id="inputEmail"
                      className="form-control"
                      onChange={this.handleEmailChange}
                      onBlur={this.validateEmail}
                    />
                    <label htmlFor="email">Email address</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      name="password"
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      onChange={this.handlePasswordChange}
                      onBlur={this.validatePassword}
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="invalid-feedback">
                    <small>{this.state.passwordError}</small>
                  </div>
                  <div className="invalid-feedback">
                    <small>{this.state.emailError}</small>
                  </div>
                  <div className="custom-control custom-checkbox mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    >
                      Remember password
                    </label>
                  </div>
                  <button
                    className="checkoutBtn btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    {displayName}
                  </button>
                  <hr className="my-4" />
                  <button
                    className="btn btn-lg btn-google btn-block text-uppercase"
                    type="submit"
                  >
                    <i className="fa fa-google fa-2x" aria-hidden="true"></i>
                    {displayName} with Google
                  </button>
                  <button
                    className="btn btn-lg btn-facebook btn-block text-uppercase"
                    type="submit"
                  >
                    <i
                      className="fa fa-facebook-square fa-2x"
                      aria-hidden="true"
                    ></i>
                    {displayName} with Facebook
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
