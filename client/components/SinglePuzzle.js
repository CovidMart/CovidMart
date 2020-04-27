import React from 'react'
import {connect} from 'react-redux'
import {fetchOnePuzzle} from '../store/puzzles'
import AddCartButton from './AddCartButton'

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
    if (this.props.loadingSingle === true) {
      return <div>LOADING!!!</div>
    }
    return (
      <div>
        <img src={this.props.imageUrl} height="300" width="300" />
        <h2>{this.props.title}</h2>
        <h3>${this.props.price / 100}</h3>
        <p>
          <strong>Number of Pieces:</strong> {this.props.pieceCount}
        </p>
        <p>
          <strong>Dimensions:</strong> {this.props.dimensions} inches
        </p>
        <p>
          <strong>Category:</strong> {this.props.category}
        </p>
        <p>
          <strong>Description: </strong>
          {this.props.description}
        </p>
        {this.props.price && (
          <AddCartButton
            id={this.props.match.params.puzzleId}
            price={this.props.price}
          />
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    title: state.puzzles.singlePuzzle.title,
    price: state.puzzles.singlePuzzle.price,
    description: state.puzzles.singlePuzzle.description,
    pieceCount: state.puzzles.singlePuzzle.pieceCount,
    dimensions: state.puzzles.singlePuzzle.dimensions,
    category: state.puzzles.singlePuzzle.category,
    imageUrl: state.puzzles.singlePuzzle.imageUrl
  }
}

const mapDispatch = dispatch => {
  return {
    fetchOnePuzzle: id => dispatch(fetchOnePuzzle(id))
  }
}

export default connect(mapState, mapDispatch)(SinglePuzzle)

/**
 * PROP TYPES
 //  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
