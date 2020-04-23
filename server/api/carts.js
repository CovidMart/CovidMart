const router = require('express').Router()
const {User, Puzzle, Order} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  res.send('Welcome to Guest Cart!')
})

router.get('/:userId', (req, res, next) => {
  //logged in user should route here
  res.send('Welcome to logged-in cart!')
})
