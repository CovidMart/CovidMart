import React from 'react'
import {connect} from 'react-redux'
import {removePuzzle} from '../store/puzzles'
import {FindPuzzle, SetKeyword} from '../store/search'
import {Link} from 'react-router-dom'
import AddCartButton from './AddCartButton'

/**
 * COMPONENT
 */
export class Search extends React.Component {
  // componentDidMount() {
  //   const keyword = this.props.match.params.keyword
  //   this.props.foundPuzzle(keyword)
  // }
  submit(evt) {
    evt.preventDefault()
    this.props.search(this.props.keyword)
  }

  onChange(evt) {
    this.props.setKeyword(evt.target.value)
  }

  render() {
    let allPuzzles = this.props.puzzles
    const keyword = this.props.keyword
    const deletePuzzle = this.props.deletePuzzle

    return (
      <div>
        <div>
          <form onSubmit={this.submit.bind(this)}>
            <input
              type="text"
              value={keyword}
              onChange={this.onChange.bind(this)}
            />
            <input type="submit" value="Search" />
          </form>
        </div>
        <div className="container">
          {allPuzzles &&
            allPuzzles.map(puzzle => (
              <div className="allPuzzles" key={puzzle.id}>
                <Link to={`/puzzles/${puzzle.id}`}>
                  <img className="images" src={puzzle.imageUrl} />
                  <h3>{puzzle.title}</h3>
                </Link>
                <h3>${puzzle.price / 100}</h3>
                {/* puzzle.pieceCount > 0 is to ensured only shows pieceCount when it's not out-of-stocks */}
                {puzzle.pieceCount > 0 && (
                  <AddCartButton id={puzzle.id} addFromShop={true} />
                )}

                {this.props.isAdmin && (
                  <div>
                    <Link
                      className="edit-button"
                      to={`/admin/puzzle/edit/${puzzle.id}`}
                    >
                      {' '}
                      Edit{' '}
                    </Link>
                    {puzzle.pieceCount > 0 && (
                      <input
                        type="button"
                        value="delete"
                        className="deleteButton"
                        onClick={deletePuzzle.bind(this, puzzle.id)}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    keyword: state.search.keyword,
    puzzles: state.search.results,
    isAdmin: state.user.singleUser.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    setKeyword: keyword => dispatch(SetKeyword(keyword)),
    search: keyword => dispatch(FindPuzzle(keyword)),
    deletePuzzle: id => dispatch(removePuzzle(id))
  }
}

export default connect(mapState, mapDispatch)(Search)
