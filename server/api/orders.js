const router = require('express').Router()
const {User, Puzzle, Order, PuzzleOrders} = require('../db/models')
const {userLoggedIn} = require('./gatekeepers')
module.exports = router

router.get('/:userId', userLoggedIn, async (req, res, next) => {
  console.log(req.params)
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
