import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const SinglePuzzle = props => {
  const {
    title,
    price,
    pieceCount,
    dimensions,
    imageUrl,
    category,
    description
  } = props

  return (
    <div>
      <img src={imageUrl} width="600" height="600" />
      <h2>{title}</h2>
      <h3>${price}</h3>
      <p>
        <strong>Number of Pieces:</strong> {pieceCount}
      </p>
      <p>
        <strong>Dimensions:</strong> {dimensions}
      </p>
      <p>
        <strong>Category:</strong> {category}
      </p>
      <p>{description}</p>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    title: state.user.title,
    price: state.user.price,
    description: state.user.description,
    pieceCount: state.user.pieceCount,
    dimensions: state.user.dimensions,
    imageUrl: state.user.imageUrl,
    category: state.user.category
  }
}

export default connect(mapState)(SinglePuzzle)

/**
 * PROP TYPES
 //  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
