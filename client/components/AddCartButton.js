import React from 'react'

export default class AllPuzzles extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="cart">
        <div>
          <button type="button">ADD TO CART</button>
        </div>
        <div />
        <button type="button" className="minus" value="-">
          -
        </button>
        <input type="number" step="1" min="1" value="0" />
        <button type="button" className="plus" value="+">
          +
        </button>
      </div>
    )
  }
}
