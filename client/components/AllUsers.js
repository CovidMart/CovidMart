import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllUsers} from '../store/user'

export class AllUsers extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchAllUsers()
  }

  render() {
    console.log('hey')
    console.log(this.props)
    let AllUsers = this.props.user
    return (
      <div>
        {allUsers &&
          allUsers.map(user => (
            <div key={user.id}>
              <Link to={`/user/${user.id}`}>
                <h3>{user.name}</h3>
              </Link>
              <h3>{user.address}</h3>
            </div>
          ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    users: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers())
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
