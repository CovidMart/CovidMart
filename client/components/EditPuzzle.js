import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchEditPuzzle, setValue} from '../store/CreatePuzzle'

class EditPuzzle extends Component {
  handleChange(name, event) {
    this.props.changeValue(name, event.target.value)
  }

  render() {
    let puzzle = this.props.puzzle
    let submit = this.props.submitPuzzle

    return (
      <form onSubmit={submit}>
        <div className="center"> Add New Product: </div>

        <br />

        <div className="formInput">
          <label htmlFor="title"> Puzzle Title </label>
          <input
            type="text"
            name="title"
            onChange={this.handleChange.bind(this, 'title')}
            value={puzzle.name}
          />
        </div>

        <div className="formInput">
          <label htmlFor="imageUrl"> Product ImageUrl: </label>
          <input
            type="text"
            name="imageUrl"
            onChange={this.handleChange.bind(this, 'imageUrl')}
            value={puzzle.imageUrl}
          />
        </div>

        <div className="formInput">
          <label htmlFor="dimensions"> Product Dimensions: </label>
          <input
            type="text"
            name="dimensions"
            onChange={this.handleChange.bind(this, 'dimensions')}
            value={puzzle.dimensions}
          />
        </div>

        <div className="formInput">
          <label htmlFor="price"> Product Prices: </label>
          <textarea
            type="text"
            name="price"
            onChange={this.handleChange.bind(this, 'price')}
            value={puzzle.price}
          />
        </div>

        <div className="formInput">
          <label htmlFor="pieceCount"> Product Inventory: </label>
          <textarea
            type="text"
            name="pieceCount"
            onChange={this.handleChange.bind(this, 'pieceCount')}
            value={puzzle.pieceCount}
          />
        </div>

        <div className="formInput">
          <label htmlFor="category"> Category Product Belongs To: </label>
          <textarea
            type="text"
            name="category"
            onChange={this.handleChange.bind(this, 'category')}
            value={puzzle.category}
          />
        </div>

        <div className="formInput">
          <label htmlFor="description">Product Descriptions: </label>
          <textarea
            type="text"
            name="description"
            onChange={this.handleChange.bind(this, 'description')}
            value={puzzle.description}
          />
        </div>

        <br />
        <br />
        <br />
        <div className="center">
          <button type="submit">Submit</button>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </form>
    )
  }
}

const mapState = state => {
  return {
    puzzle: state.CreatePuzzle
  }
}

const mapDispatch = dispatch => {
  return {
    submitPuzzle: () => dispatch(fetchEditPuzzle()),
    changeValue: (name, value) => dispatch(setValue(name, value))
  }
}

export default connect(mapState, mapDispatch)(EditPuzzle)
