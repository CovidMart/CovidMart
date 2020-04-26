const router = require('express').Router()
const {User, Puzzle} = require('../db/models')
const {userLoggedIn} = require('./gatekeepers')
module.exports = router

//----Guest Cart----//

router.put('/', async (req, res, next) => {
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
