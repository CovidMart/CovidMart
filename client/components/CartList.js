import React from 'react'
import AddCartButton from './AddCartButton'

const CartList = props => {
  const {puzzles, pricePaid} = props.activeCart
  const {fetchCart} = props
  //handlers for add and delete will have to be passed in as well
  if (puzzles && puzzles.length) {
    return (
      <div>
        <h3>Party Carty!</h3>
        <h5>Running Total: ${(pricePaid / 100).toFixed(2)}</h5>
        <ul>
          {puzzles
            .filter(item => item.qty || item.PuzzleOrders)
            .map(item => (
              <li key={item.id}>
                <h4>{item.title}</h4>
                <p>
                  {`Qty: ${item.qty ? item.qty : item.PuzzleOrders.quantity}
            -- at $${(item.price / 100).toFixed(2)} each`}
                </p>
                <AddCartButton
                  id={item.id}
                  fetchCart={fetchCart}
                  quantity={item.qty ? item.qty : item.PuzzleOrders.quantity}
                />
              </li>
            ))}
        </ul>
      </div>
    )
  }
  return (
    <div>
      <h3>Party Carty!</h3>
      <p>Nothing in your cart?</p>
      <p>Let's find a corner piece!</p>
    </div>
  )
}

export default CartList
