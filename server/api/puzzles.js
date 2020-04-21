const router = require('express').Router()
const {Puzzle} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allPuzzle = await Puzzle.findAll()
    res.json(allPuzzle)
  } catch (err){
    next(err)
  }
})
