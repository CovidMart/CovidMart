const router = require('express').Router()
const {isAdmin} = require('./isAdmin')

router.use('/users', isAdmin, require('./users')) // we do want to protect all user info, isAdmin here is fine
router.use('/puzzles', require('./puzzles'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
