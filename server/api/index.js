const router = require('express').Router()
const isAdmin = require('./isAdmin')

router.use('/users', require('./users'))
router.use('/puzzles', require('./puzzles'))
router.use('/cart', require('./carts'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
