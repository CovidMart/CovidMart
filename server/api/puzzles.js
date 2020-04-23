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

router.get('/:puzzleId', async (req, res, next) => {
  try {
    const onePuzzle = await Puzzle.findByPk(req.params.puzzleId)
    res.json(onePuzzle)
  } catch (err) {
    next(err)
  }
})

//want to destructure req.body first so all info cant be seen
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

//want to destructure req.body first so all info cant be seen
router.put('/:puzzleId', isAdmin, async (req, res, next) => {
  Puzzle.findByPk(req.params.puzzleId)
    .then(puzzle =>
      puzzle.update({
        title: req.body.title,
        price: req.body.price,
        pieceCount: req.body.pieceCount,
        dimentions: req.body.dimentions,
        imageUrl: req.body.imageUrl,
        category: req.body.category,
        description: req.body.description
      })
    )
    .catch(next)
})

router.delete('/:puzzleId', isAdmin, async (req, res, next) => {
  Puzzle.destroy({
    where: {
      id: req.params.puzzleId
    }
  })
})

module.exports = router
