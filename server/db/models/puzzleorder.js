const Sequelize = require('sequelize')
const db = require('../db')
const Order = require('./order')
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

PuzzleOrders.pullQuantity = function() {
  return 2
}
PuzzleOrders.pullPrice = function() {
  return Puzzle.price
}

PuzzleOrders.generateSubtotal = function(quantity, subtotal) {
  return quantity * subtotal
}

/**
 * hooks
 */
const generateOrderData = PuzzleOrders => {
  const quant = (PuzzleOrders.quantity = PuzzleOrders.pullQuantity())
  const sub = (PuzzleOrders.price = PuzzleOrders.pullPrice())
  PuzzleOrders.subtotal = PuzzleOrders.generateSubtotal(quant, sub)
}

PuzzleOrders.beforeCreate(generateOrderData)
PuzzleOrders.beforeUpdate(generateOrderData)
PuzzleOrders.beforeBulkCreate(puzzle => {
  puzzle.forEach(generateOrderData)
})

module.exports = PuzzleOrders
