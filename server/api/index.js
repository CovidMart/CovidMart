const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/puzzles', require('./puzzles'))
router.use('/cart', require('./carts'))
router.use('/checkout', require('./checkout'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
