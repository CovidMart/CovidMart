const router = require('express').Router()
const {User, Puzzle, Order} = require('../db/models')
module.exports = router

//----Guest Cart----//

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

//----User Cart----//

router.get('/:userId', (req, res, next) => {
  //logged in user should route here
  res.send('Welcome to logged-in cart!')
})
