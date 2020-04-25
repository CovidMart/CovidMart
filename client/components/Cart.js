import React from 'react'

const Cart = props => {
  const {orderArray, lineItemSubtotal} = props
  //handlers for add and delete will have to be passed in as well
  //2. If nothing is in the cart guide the user back to shopping
  return (
    <div>
      <h1>Party Carty!</h1>
      <ol>
        {orderArray.map(item => (
          <li key={item.id}>
            <h4>{item.title}</h4>
            <p>
              {`Qty: ${item.qty ? item.qty : item.PuzzleOrders.quantity}
            -- Subtotal: ${lineItemSubtotal(item)}`}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Cart
