import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  fetchEditPuzzle,
  setValue,
  fetchPuzzleData
} from '../../store/EditPuzzle'

class EditPuzzle extends Component {
  handleChange(name, event) {
    this.props.changeValue(name, event.target.value)
  }

  onSubmit(evt) {
    evt.preventDefault()
    const id = this.props.match.params.puzzleId
    this.props.submitPuzzle(id)
  }

  componentDidMount() {
    const id = this.props.match.params.puzzleId
    this.props.getPuzzle(id)
    this.props.changeValue('message', '')
  }

  render() {
    let puzzle = this.props.puzzle
    let submit = this.onSubmit.bind(this)

    return (
      <form className="edit-container" onSubmit={submit}>
        <div className="center"> Edit Product: </div>

        <br />
        <div className="formInput">
          <img className="image" src={puzzle.imageUrl} />
        </div>

        <div>
          <label htmlFor="imageUrl"> Product ImageUrl: </label>
          <input
            className="input"
            type="text"
            name="imageUrl"
            onChange={this.handleChange.bind(this, 'imageUrl')}
            value={puzzle.imageUrl}
          />
        </div>

        <div className="formInput">
          <label htmlFor="title"> Puzzle Title </label>
          <input
            className="input"
            type="text"
            name="title"
            onChange={this.handleChange.bind(this, 'title')}
            value={puzzle.title}
          />
        </div>

        <div className="formInput">
          <label htmlFor="dimensions"> Product Dimensions: </label>
          <input
            className="input"
            type="text"
            name="dimensions"
            onChange={this.handleChange.bind(this, 'dimensions')}
            value={puzzle.dimensions}
          />
        </div>

        <div className="formInput">
          <label htmlFor="price"> Product Prices: </label>
          <input
            className="input"
            type="text"
            name="price"
            onChange={this.handleChange.bind(this, 'price')}
            value={puzzle.price}
          />
        </div>

        <div className="formInput">
          <label htmlFor="pieceCount"> Product Inventory: </label>
          <input
            className="input"
            type="text"
            name="pieceCount"
            onChange={this.handleChange.bind(this, 'pieceCount')}
            value={puzzle.pieceCount}
          />
        </div>

        <div className="formInput">
          <label htmlFor="category"> Category Product Belongs To: </label>
          <input
            className="input"
            type="text"
            name="category"
            onChange={this.handleChange.bind(this, 'category')}
            value={puzzle.category}
          />
        </div>

        <div className="formInput">
          <label htmlFor="description">Product Descriptions: </label>
          <textarea
            className="textarea"
            type="text"
            name="description"
            onChange={this.handleChange.bind(this, 'description')}
            value={puzzle.description}
          />
        </div>

        <br />
        <div>{puzzle.message}</div>
        <br />
        <div className="center">
          <button type="submit">Submit</button>
        </div>
        <br />
      </form>
    )
  }
}

const mapState = state => {
  return {
    puzzle: state.EditPuzzle
  }
}

const mapDispatch = dispatch => {
  return {
    submitPuzzle: id => dispatch(fetchEditPuzzle(id)),
    changeValue: (name, value) => dispatch(setValue(name, value)),
    getPuzzle: id => dispatch(fetchPuzzleData(id))
  }
}

export default connect(mapState, mapDispatch)(EditPuzzle)
