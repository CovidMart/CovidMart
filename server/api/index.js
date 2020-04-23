const router = require('express').Router()

module.exports = router

router.use('/users', isAdmin, require('./users')) // we do want to protect all user info, isAdmin here should be fine
router.use('/puzzles', require('./puzzles'))
router.use('/cart', require('./carts'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
