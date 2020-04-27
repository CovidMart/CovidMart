const Sequelize = require('sequelize')
const db = require('../db')
const PuzzleOrders = require('./puzzleorder')

const Order = db.define('orders', {
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
    type: Sequelize.INTEGER,
    defaultValue: 0
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

// Hook is working but not saving to the DB???

const calculateOrderTotal = async order => {
  let totalPrice = 0
  const subtotals = await order.getLineItems()
  subtotals.forEach(item => {
    totalPrice += item.subtotal
  })
  order.pricePaid = totalPrice
}

Order.beforeUpdate(calculateOrderTotal)

module.exports = Order
