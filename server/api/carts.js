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
    if (activeOrders) res.json(activeOrders[0])
    else res.json({})
  } catch (error) {
    next(error)
  }
})

//---POST User New Order---//

router.post('/:userId', userLoggedIn, async (req, res, next) => {
  const uid = req.params.userId
  const {puzzleId, quantity} = req.body
  try {
    const orderedPuzzle = await Puzzle.findByPk(puzzleId)
    const activeOrder = await Order.findOne({
      where: {userId: uid, stillInCart: true}
    })
    if (activeOrder) {
      //add new puzzle order to it
      await activeOrder.addPuzzle(orderedPuzzle, {
        through: {quantity, price: orderedPuzzle.price}
      })
    } else {
      //create new order
      const newOrder = await Order.create()
      await newOrder.addPuzzle(orderedPuzzle, {
        through: {quantity, price: orderedPuzzle.price}
      })
      await newOrder.setUser(uid)
    }
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

//---PUT User Cart Qty---//

router.put('/:userId', userLoggedIn, async (req, res, next) => {
  const {orderId, puzzleId, quantity, addFromShop} = req.body
  try {
    const orderToChange = await PuzzleOrders.findOne({
      where: {orderId, puzzleId}
    })
    if (addFromShop) {
      const total = orderToChange.quantity + quantity
      await orderToChange.update({quantity: total})
    } else if (quantity < 1) {
      await orderToChange.destroy()
    } else {
      await orderToChange.update({quantity})
    }
    res.sendStatus(201)
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
