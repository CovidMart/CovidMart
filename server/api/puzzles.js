const router = require('express').Router()
const {Puzzle} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const allPuzzle = await Puzzle.findAll()
    res.json(allPuzzle)
  } catch (err) {
    next(err)
  }
})

router.get('/:puzzleId', async (req, res, next) => {
  try {
    const onePuzzle = await Puzzle.findByPk(req.params.puzzleId)
    res.json(onePuzzle)
  } catch (err) {
    next(err)
  }
})

module.exports = router
