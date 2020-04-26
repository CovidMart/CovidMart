/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../../index')
const User = db.model('user')
const Puzzle = db.model('puzzle')
const Order = require('../order')
const PuzzleOrders = require('../puzzleorder')

describe('Model Associations', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('PuzzleOrder through-table', () => {
    describe('correct subtotal for user line item', () => {
      let sandra
      let orderedPuzzle
      const qty = 2
      let orderPrice
      let newOrder
      let puzzleOrder

      beforeEach(async () => {
        sandra = await User.create({
          firstName: 'Sandra',
          lastName: 'Dee',
          email: 'puzzlemaniac@gollygeemail.com',
          password: 'i<3puzzles'
        })

        orderedPuzzle = await Puzzle.create({
          title: 'Hotrod at Sunset',
          price: 1888,
          pieceCount: 800,
          dimensions: '16" x 22"',
          category: 'Sports'
        })

        orderPrice = orderedPuzzle.price * qty

        newOrder = await Order.create({
          pricePaid: orderPrice
        })

        await newOrder.setUser(sandra.id)

        await newOrder.addPuzzle(orderedPuzzle, {
          through: {quantity: qty, price: orderedPuzzle.price}
        })

        puzzleOrder = await PuzzleOrders.findOne({
          where: {puzzleId: orderedPuzzle.id}
        })
      })

      it('populates PuzzleOrders with correct data', () => {
        expect(puzzleOrder.subtotal).to.be.equal(3776)
      })
    })
  })
})
