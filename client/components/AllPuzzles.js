import React from 'react'
import {connect} from 'react-redux'
import {fetchAllPuzzles, allPuzzles} from '../store/puzzles'
import {Link} from 'react-router-dom'
import axios from 'axios'

export class AllPuzzles extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchAllPuzzles()
  }

  async removePuzzle(id) {
    await axios.delete(`api/puzzles/${id}`)
    this.props.fetchAllPuzzles()
  }

  render() {
    let allPuzzles = this.props.puzzles

    return (
      <div>
        {allPuzzles &&
          allPuzzles.map(puzzle => (
            <div key={puzzle.id}>
              <div>
                <input
                  type="button"
                  value="x"
                  onClick={this.removePuzzle.bind(this, puzzle.id)}
                />
                <Link to={`puzzles/${puzzles.id}`}> {puzzles.name} </Link>
              </div>

              <img src={puzzle.imageUrl} />
              <h3>{puzzle.title}</h3>
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
