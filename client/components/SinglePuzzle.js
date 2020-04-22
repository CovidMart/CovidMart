import React from 'react'
import {connect} from 'react-redux'
import {fetchOnePuzzle} from '../store/puzzles'

/**
 * COMPONENT
 */
export class SinglePuzzle extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const id = this.props.match.params.puzzleId
    this.props.fetchOnePuzzle(id)
  }

  render() {
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
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    title: state.puzzles.title,
    price: state.puzzles.price,
    description: state.puzzles.description,
    pieceCount: state.puzzles.pieceCount,
    dimensions: state.puzzles.dimensions,
    imageUrl: state.puzzles.imageUrl,
    category: state.puzzles.category
  }
}

const mapDispatch = dispatch => {
  return {
    fetchOnePuzzle: () => dispatch(fetchOnePuzzle())
  }
}

export default connect(mapState, mapDispatch)(SinglePuzzle)

/**
 * PROP TYPES
 //  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
