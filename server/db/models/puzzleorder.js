const Sequelize = require('sequelize')
const db = require('../db')
const Puzzle = require('./puzzle')

const PuzzleOrders = db.define('PuzzleOrders', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  subtotal: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
})

// PuzzleOrders.pullQuantity = function() {
//   return 2
// }
// PuzzleOrders.pullPrice = function() {
//   if (PuzzleOrders.puzzleId === Puzzle.id) return Puzzle.price
// }

// PuzzleOrders.generateSubtotal = function(quantity, price) {
//   return quantity * price
// }

// /**
//  * hooks
//  */
// const generateOrderData = PuzzleOrders => {
//   const quantity = (PuzzleOrders.quantity = PuzzleOrders.pullQuantity())
//   const price = (PuzzleOrders.price = PuzzleOrders.pullPrice())
//   PuzzleOrders.subtotal = PuzzleOrders.generateSubtotal(quantity, price)
// }

// PuzzleOrders.beforeCreate(generateOrderData)
// PuzzleOrders.beforeUpdate(generateOrderData)
// PuzzleOrders.beforeBulkCreate(puzzle => {
//   puzzle.forEach(generateOrderData)
// })

module.exports = PuzzleOrders
