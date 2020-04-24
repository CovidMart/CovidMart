import React from 'react'
import {connect} from 'react-redux'
import {fetchAllPuzzles, removePuzzle} from '../store/puzzles'
import {Link} from 'react-router-dom'
import AddCartButton from './AddCartButton'

/**
 * COMPONENT
 */
export class AllPuzzles extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchAllPuzzles()
  }

  render() {
    let allPuzzles = this.props.puzzles
    const deletePuzzle = this.props.deletePuzzle

    return (
      <div>
        {allPuzzles &&
          allPuzzles.map(puzzle => (
            <div key={puzzle.id}>
              <div>
                <input
                  type="button"
                  value="x"
                  onClick={deletePuzzle.bind(this, puzzle.id)}
                />
              </div>

              <Link to={`/puzzles/${puzzle.id}`}>
                <img src={puzzle.imageUrl} />
                <h3>{puzzle.title}</h3>
              </Link>
              <h3>${puzzle.price / 100}</h3>
              <AddCartButton id={puzzle.id} price={puzzle.price} />
            </div>
          ))}
      </div>
    )
  }
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    puzzles: state.puzzles.allPuzzles
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllPuzzles: () => dispatch(fetchAllPuzzles()),
    deletePuzzle: () => dispatch(removePuzzle())
  }
}

export default connect(mapState, mapDispatch)(AllPuzzles)
