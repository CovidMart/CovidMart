const router = require('express').Router()
const {User, Puzzle, PuzzleOrders} = require('../db/models')
module.exports = router

// ----Guest Cart----//

router.post('/', async (req, res, next) => {
  const guestCart = JSON.parse(req.body.guestCart)
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

// ----User Cart----//
// NOTE: This route must be protected (TBD)!!!

router.get('/', async (req, res, next) => {
  try {
    const orders = await PuzzleOrders.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  const uid = req.params.userId
  try {
    const currentUser = await User.findByPk(uid)
    const activeOrders = await currentUser.getOrders({
      where: {stillInCart: true},
      include: [{model: Puzzle}]
    })
    const puzzleOrder = activeOrders.puzzles ? activeOrders.puzzles : []
    res.json(activeOrders)
  } catch (error) {
    next(error)
  }
})

///route to add item to the cart
router.post('/:userId', async (req, res, next) => {
  try {
    const newOrderItem = await PuzzleOrders.create(req.body)
    res.json(newOrderItem)
  } catch (err) {
    next(err)
  }
})

// route to update items once in the cart
router.put('/:id', async (req, res, next) => {
  try {
    const orderItem = await PuzzleOrders.findByPk(req.params.id)
    const update = await orderItem.update(req.body)
    res.json(update)
  } catch (err) {
    next(err)
  }
})
