import React from 'react'
import AddCartButton from './AddCartButton'

const Cart = props => {
  const {orderArray, lineItemSubtotal, isUser} = props
  //handlers for add and delete will have to be passed in as well
  if (orderArray.length) {
    return (
      <div>
        <h3>Party Carty!</h3>
        <ul>
          {orderArray.map(item => (
            <li key={item.id}>
              <h4>{item.title}</h4>
              <p>
                {`Qty: ${item.qty ? item.qty : item.PuzzleOrders.quantity}
            -- Subtotal: $${(lineItemSubtotal(item) / 100).toFixed(2)}`}
              </p>
              {isUser && (
                <AddCartButton
                  id={item.id}
                  price={item.price}
                  text="Update Cart"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  return (
    <div>
      <h1>Party Carty!</h1>
      <p>Nothing in your cart?</p>
      <p>Let's find a corner piece!</p>
      {/* button/link to return to all puzzles */}
    </div>
  )
}

export default Cart
