import React from 'react'
// TBD -- this is PLACEHOLDER
// A dumb rendering component

const Cart = props => {
  //array pf puzzles should include
  //all puzzle table data for puzzles in cart
  //as well as quantity of each puzzle
  const {orderArr} = props
  //handlers for add and delete will have to be passed in as well
  //If nothing is in the cart guide the user back to shopping
  console.log('Got proprs?', orderArr)
  return (
    <div>
      <h1>Party Carty!</h1>
      <ol>
        {orderArr.map(item => (
          <li key={item.id}>
            <h4>{item.title}</h4>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Cart
