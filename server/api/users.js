const router = require('express').Router()
const {User} = require('../db/models')
const isAdmin = require('./isAdmin')
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

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    if (user) {
      res.send(user)
    } else {
      res.status(404).send()
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const foundUser = await User.findByPk(req.params.userId)
    if (foundUser) {
      const updatedUser = await foundUser.update(req.body)
      res.json(updatedUser)
    } else {
      res.status(404).send('Sorry, User Not Found!')
    }
  } catch (error) {
    next(error)
  }
})
