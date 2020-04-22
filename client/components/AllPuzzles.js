import React from 'react'
import {connect} from 'react-redux'
import {fetchAllPuzzles} from '../store/puzzles'

export class AllPuzzles extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchAllPuzzles()
  }

  render() {
    let allPuzzles = this.props.puzzle

    return (
      <div>
        {allPuzzles &&
          allPuzzles.map(puzzle => (
            <div key={puzzle.id}>
              <img src={puzzle.imageUrl} />
              <h3>{puzzle.title}</h3>
              <h3>{puzzle.price}</h3>
            </div>
          ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    puzzles: state.puzzles.allPuzzles
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllPuzzles: () => dispatch(fetchAllPuzzles())
  }
}

export default connect(mapState, mapDispatch)(AllPuzzles)
