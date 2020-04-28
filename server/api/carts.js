const router = require('express').Router()
const {User, Puzzle, Order, PuzzleOrders} = require('../db/models')
const {userLoggedIn} = require('./gatekeepers')
module.exports = router

// ----'GET' Guest Cart----//

router.post('/guest', async (req, res, next) => {
  const guestCart = req.body.cartData
  const cartPuzzles = []
  try {
    // eslint-disable-next-line guard-for-in
    for (let puzzleId in guestCart) {
      let foundPuzzle = await Puzzle.findByPk(puzzleId)
      if (foundPuzzle) {
        foundPuzzle.dataValues.qty = guestCart[puzzleId]
        cartPuzzles.push(foundPuzzle)
      }
    }
    res.json(cartPuzzles)
  } catch (error) {
    next(error)
  }
})

//----GET User Cart----//

router.get('/:userId', userLoggedIn, async (req, res, next) => {
  const uid = req.params.userId
  try {
    const currentUser = await User.findByPk(uid)
    const activeOrders = await currentUser.getOrders({
      where: {stillInCart: true},
      include: [{model: Puzzle}]
    })
    res.json(activeOrders[0])
  } catch (error) {
    next(error)
  }
})

//---POST User Cart Qty---//

router.post('/:userId', userLoggedIn, async (req, res, next) => {
  const uid = req.params.userId
  const {quantity, puzzleId} = req.body
  try {
    //create new puzzleorder and add to user
    //create order, add puzzle, add userId
  } catch (error) {
    next(error)
  }
})

//---PUT User Cart Qty---//

router.put('/:userId', userLoggedIn, async (req, res, next) => {
  const uid = req.params.userId
  //Some req.body property tells us whether to increment or straight-change
  try {
    //if addNew
    //if Increment
  } catch (error) {
    next(error)
  }
})

//---PUT Checkout Cart---//

router.put('/:userId/checkout', userLoggedIn, async (req, res, next) => {
  const uid = req.params.userId
  try {
    const currentUser = await User.findByPk(uid)
    const activeOrders = await currentUser.getOrders({
      where: {stillInCart: true}
    })
    const mostRecentOrder = activeOrders[0]
    const checkedOutOrder = await mostRecentOrder.update(req.body)
    res.json(checkedOutOrder)
  } catch (error) {
    next(error)
  }
})

//---DELETE Puzzle from Order---//

router.delete('/:userId', userLoggedIn, async (req, res, next) => {
  //delete user's order for this puzzle from the puzzleOrders
})
