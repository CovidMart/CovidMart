const Sequelize = require('sequelize')
const db = require('../db')

const Puzzle = db.define('puzzle', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  pieceCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  dimensions: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://atzcart.s3.ap-south-1.amazonaws.com/uploads/images/categories/default.png'
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: ''
  }
})

Puzzle.beforeSave(Puzzle => {
  if (Puzzle.pieceCount === 0) {
    Puzzle.imageUrl =
      'https://media.istockphoto.com/vectors/sold-out-stamp-sold-out-square-grunge-sign-sold-out-vector-id1172420644'
  }
})

module.exports = Puzzle
