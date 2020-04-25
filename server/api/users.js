const router = require('express').Router()
const {User} = require('../db/models')
const {isAdmin, userLoggedIn} = require('./gatekeepers')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', userLoggedIn, async (req, res, next) => {
  console.log('Got User???', req.params.userId)
  const uid = req.params.userId
  try {
    const user = await User.findByPk(uid)
    if (user) {
      if (user.isAdmin) {
        req.session.passport.isAdmin = true
      }
      res.send(user)
    } else {
      res.status(404).send()
    }
  } catch (error) {
    next(error)
  }
})
