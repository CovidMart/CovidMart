import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllPuzzles} from '../store/puzzles'

export class AllPuzzles extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchAllPuzzles()
  }

  render() {
    let allPuzzles = this.props.puzzles
    return (
      <div>
        {allPuzzles &&
          allPuzzles.map(puzzle => (
            <div key={puzzle.id}>
              <Link to={`/puzzles/${puzzle.id}`}>
                <img src={puzzle.imageUrl} />
                <h3>{puzzle.title}</h3>
              </Link>
              <h3>${puzzle.price / 100}</h3>
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
