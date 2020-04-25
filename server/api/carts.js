const router = require('express').Router()
const {User, Puzzle, Order, PuzzleOrders} = require('../db/models')
module.exports = router

//----Guest Cart----//

router.post('/', async (req, res, next) => {
  console.log('What is on REQBODY???', req.body)
  const guestCart = JSON.parse(req.body.guestCart)
  const cartPuzzles = []
  console.log('Route received from thunk:', guestCart)
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
    console.log('API route response:', cartPuzzles)
    res.json(cartPuzzles)
  } catch (error) {
    next(error)
  }
})

//----User Cart----//

router.get('/:userId', (req, res, next) => {
  //logged in user should route here
  res.send('Welcome to logged-in cart!')
})

///route to add item to the cart
router.post('/:orderId', async (req, res, next) => {
  try {
    const newOrderItem = await PuzzleOrders.create(req.body)
    res.json(newOrderItem)
  } catch (err) {
    next(err)
  }
})

//route to update items once in the cart
router.put('/:orderId', async (req, res, next) => {
  try {
    const orderItem = await PuzzleOrders.findByPk(req.params.id)
    const update = await orderItem.update(req.body)
    res.json(update)
  } catch (err) {
    next(err)
  }
})
