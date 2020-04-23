const router = require('express').Router()
// const {isAdmin} = require('./isAdmin')

module.exports = router

router.use('/users', require('./users')) // we do want to protect all user info, isAdmin here should be fine
router.use('/puzzles', require('./puzzles'))
router.use('/cart', require('./carts'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
