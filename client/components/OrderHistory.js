import React from 'react'
import {connect} from 'react-redux'
import {render} from 'enzyme'

export class OrderHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderHistory: []
    }
  }
  render() {
    return <div />
  }
}
