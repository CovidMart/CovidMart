const Sequelize = require('sequelize')
const db = require('../db')

//Currently does NOT include storage
//of payment method. Favoring 3rd party
//tracking of user payment data, for
//security purposes.
//Later, we can create a hash table to
//store payment methods if we wish,
//though 3rd party apps will still be
//used for transactions (stripe, paypal, etc)

const Order = db.define('orders', {
  //order date: use createdAt field
  //userId added by User.hasMany(Order) relationship

  puzzleId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  puzzleTitle: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  qty: {
    //set at creation by calculation from cart
    type: Sequelize.INTEGER
  },
  price: {
    //When adding prices together for total order price
    //use (total).toFixed(2) to keep 2 digits after decimal
    type: Sequelize.FLOAT,
    allowNull: false
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
