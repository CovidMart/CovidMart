const router = require('express').Router()
const isAdmin = require('./isAdmin')

module.exports = router

router.use('/users', require('./users'))
router.use('/puzzles', require('./puzzles'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
