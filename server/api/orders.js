const router = require('express').Router()
const {User, Puzzle, Order, PuzzleOrders} = require('../db/models')
const {userLoggedIn} = require('./gatekeepers')
module.exports = router
const db = require('../db/db')

router.get('/:userId', userLoggedIn, async (req, res, next) => {
  try {
    const userOrders = await Order.findAll({
      where: {
        userId: req.params.userId,
        stillInCart: false
      }
    })
    res.json(userOrders)
  } catch (err) {
    next(err)
  }
})
