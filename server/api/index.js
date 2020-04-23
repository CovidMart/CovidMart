const router = require('express').Router()

module.exports = router

router.use('/users', require('./users')) // (removed IsAdmin middldeware)
//we cannot put isAdmin here ^^ because non-admin users must access their own pages
router.use('/puzzles', require('./puzzles'))
router.use('/cart', require('./carts'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
