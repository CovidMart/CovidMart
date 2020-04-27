const router = require('express').Router()
const {Puzzle} = require('../db/models')
const {isAdmin} = require('./gatekeepers')

router.get('/', async (req, res, next) => {
  try {
    const puzzle = await Puzzle.findAll()
    res.json(puzzle)
  } catch (err) {
    next(err)
  }
})

router.get('/:puzzleId', async (req, res, next) => {
  const pid = req.params.puzzleId
  try {
    const onePuzzle = await Puzzle.findByPk(pid)
    res.json(onePuzzle)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    if (!req.body.imageUrl) {
      req.body.imageUrl =
        'https://atzcart.s3.ap-south-1.amazonaws.com/uploads/images/categories/default.png'
    }
    const puzzle = await Puzzle.create({
      title: req.body.title,
      price: req.body.price,
      pieceCount: req.body.pieceCount,
      dimensions: req.body.dimensions,
      imageUrl: req.body.imageUrl,
      category: req.body.category,
      description: req.body.description
    })
    res.send(puzzle)
  } catch (error) {
    next(error)
  }
})

router.put('/:puzzleId', isAdmin, async (req, res, next) => {
  const pid = req.params.puzzleId
  try {
    const updatePuzzle = await Puzzle.findByPk(pid)
    await updatePuzzle.update({
      title: req.body.title,
      price: req.body.price,
      pieceCount: req.body.pieceCount,
      dimensions: req.body.dimensions,
      imageUrl: req.body.imageUrl,
      category: req.body.category,
      description: req.body.description
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.delete('/:puzzleId', isAdmin, async (req, res, next) => {
  const id = req.params.puzzleId
  await Puzzle.destroy({
    where: {
      id
    }
  })
})

module.exports = router
