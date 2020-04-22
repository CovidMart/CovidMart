const Sequelize = require('sequelize')
const db = require('../db')

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
      isIn: [['Processing', 'Shipped', 'Delivered']]
    }
  },
  pricePaid: {
    type: Sequelize.DECIMAL(10, 2)
  }
})

module.exports = Order
