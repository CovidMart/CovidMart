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

router.get('/:userId', userLoggedIn, async (req, res, next) => {
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
router.post('/:userId', async (req, res, next) => {
  if (req.session.passport) {
    const uid = req.session.passport.user
    const {quantity, puzzleId} = req.body
    console.log('Api route got qty & pid?', quantity, puzzleId)
    try {
      //grab the puzzle the user wants to buy
      const orderedPuzzle = await Puzzle.findByPk(puzzleId)
      //check if user has an active order
      const activeOrder = await Order.findOne({
        where: {userId: uid, stillInCart: true}
      })
      if (activeOrder) {
        //check if this puzzle is already in the order
        const currPuzzle = await activeOrder.getPuzzles({
          where: {id: puzzleId}
        })
        if (currPuzzle.length) {
          //get the existing puzzle row in OrderPuzzles to update qty
          const updatePuzzle = await PuzzleOrders.findOne({
            where: {puzzleId}
          })
          //if desired qty is now 0, delete the PuzzleOrder row
          if (quantity <= 0) {
            await updatePuzzle.destroy()
          } else {
            await updatePuzzle.update({quantity})
          }
        } else {
          //add new puzzle to the existing order
          await activeOrder.addPuzzle(orderedPuzzle, {
            through: {quantity, price: orderedPuzzle.price}
          })
        }
      } else {
        //create new order
        const newOrder = await Order.create()
        await newOrder.addPuzzle(orderedPuzzle, {
          through: {quantity, price: orderedPuzzle.price}
        })
        await newOrder.calculateOrderTotal()
        await newOrder.setUser(uid)
      }
      res.sendStatus(201)
    } catch (err) {
      next(err)
    }
  } else {
    //user is not logged in
    res.sendStatus(202)
  }
})
