import React from 'react'

const Cart = props => {
  const {orderArray, lineItemSubtotal} = props
  //handlers for add and delete will have to be passed in as well
  if (orderArray.length) {
    console.log(orderArray, 'orderArray')
    let totalOrderCost = orderArray.reduce(
      (sum, currOrder) => sum + currOrder.price
    )
    console.log(totalOrderCost, 'totalOrderCost')

    return (
      <div>
        <h1>Party Carty!</h1>
        <ol>
          {orderArray.map(item => (
            <li key={item.id}>
              <h4>{item.title}</h4>
              <p>
                {`Qty: ${item.qty ? item.qty : item.PuzzleOrders.quantity}
            -- Subtotal: $${(lineItemSubtotal(item) / 100).toFixed(2)}`}
              </p>
            </li>
          ))}
        </ol>
        <p>
          <strong>TOTAL ORDER COST: $38.97</strong>
        </p>
      </div>
    )
  }
  return (
    <div>
      <h1>Party Carty!</h1>
      <p>Nothing in your cart?</p>
      <p>Let's find a corner piece!</p>
    </div>
  )
}

export default Cart
