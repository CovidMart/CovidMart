const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
  //order date: automatically included as createdAt field

  qty: {
    //set on creation by calculation from cart
    type: Sequelize.INTEGER
  },
  stillInCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  shippingStatus: {
    type: Sequelize.STRING,
    defaultValue: 'Processing',
    validate: {
      isIn: [['Processing', 'Shipped', 'Delivered']]
    }
  }
})

module.exports = Order
