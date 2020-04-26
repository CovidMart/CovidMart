const Sequelize = require('sequelize')
const db = require('../db')
const PuzzleOrders = require('./puzzleorder')

const Order = db.define('orders', {
  //order date: automatically included as createdAt field
  stillInCart: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  shippingStatus: {
    type: Sequelize.STRING,
    defaultValue: 'Processing',
    validate: {
      isIn: [['Processing', 'Shipped', 'Delivered']] //consider using enum
    }
  },
  pricePaid: {
    type: Sequelize.INTEGER
  }
})

Order.prototype.isInCart = function() {
  return this.stillInCart
}

Order.prototype.getLineItems = async function() {
  const lineItems = await PuzzleOrders.findAll({
    where: {orderId: this.id}
  })
  return lineItems
}

const calculateOrderTotalPrice = async order => {
  let totalPrice = 0
  const subtotals = await order.getLineItems()
  subtotals.forEach(item => {
    totalPrice += item.subtotal
  })
  order.pricePaid = totalPrice
}

Order.beforeUpdate(calculateOrderTotalPrice)
Order.beforeBulkCreate(order => {
  order.forEach(calculateOrderTotalPrice)
})

module.exports = Order
