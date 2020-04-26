const router = require('express').Router()
const {User, Puzzle, Order, PuzzleOrders} = require('../db/models')
const {userLoggedIn} = require('./gatekeepers')
module.exports = router

// ----Guest Cart----//

router.post('/', async (req, res, next) => {
  const guestCart = req.body.guestCart ? JSON.parse(req.body.guestCart) : {}
  console.log('Routes guest car', guestCart)
  const cartPuzzles = []
  try {
    // eslint-disable-next-line guard-for-in
    for (let puzzleId in guestCart) {
      let foundPuzzle = await Puzzle.findByPk(puzzleId)
      if (foundPuzzle) {
        //add qty to puzzle just for guest vv
        foundPuzzle.dataValues.qty = guestCart[puzzleId]
        cartPuzzles.push(foundPuzzle)
      }
    }
    res.json(cartPuzzles)
  } catch (error) {
    next(error)
  }
})

//----User Cart----//

router.get('/:userId', async (req, res, next) => {
  const uid = req.params.userId
  try {
    const currentUser = await User.findByPk(uid)
    const activeOrders = await currentUser.getOrders({
      where: {stillInCart: true},
      include: [{model: Puzzle}]
    })
    res.json(activeOrders)
  } catch (error) {
    next(error)
  }
})

///route to add item to the cart
router.post('/:userId', userLoggedIn, async (req, res, next) => {
  if (req.session.passport) {
    try {
      const currentUser = await User.findByPk(req.session.passport.user)
      const newOrder = Order.create(req.body)
      res.json(newOrder)
      ///res.send status
    } catch (err) {
      next(err)
    }
  }
})

// route to update items once in the cart
router.put('/:userId', async (req, res, next) => {
  try {
    const orderItem = await PuzzleOrders.findByPk(req.params.id)
    const update = await orderItem.update(req.body)
    res.json(update)
  } catch (err) {
    next(err)
  }
})
