import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleOrder} from '../store/orderHistory'

export default class SingleOrder extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <h2>HIIIIII</h2>
      </div>
    )
  }
}
