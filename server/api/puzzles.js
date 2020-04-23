const router = require('express').Router()
const {Puzzle} = require('../db/models')
const isAdmin = require('./isAdmin')

router.get('/', async (req, res, next) => {
  try {
    const puzzle = await Puzzle.findAll()
    res.json(puzzle)
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
      dimentions: req.body.dimentions,
      imageUrl: req.body.imageUrl,
      category: req.body.category,
      description: req.body.description
    })
    res.send(puzzle)
  } catch (error) {
    next(error)
  }
})

router.put('/:puzzleId', async (req, res, next) => {
  Puzzle.findByPk(req.params.puzzleId)
    .then(puzzle => puzzle.update(req.body))
    .catch(next)
})

router.delete('/:puzzleId', async (req, res, next) => {
  Puzzle.destroy({
    where: {
      id: req.params.puzzleId
    }
  })
})

module.exports = router
