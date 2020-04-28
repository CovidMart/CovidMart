import React, {Component} from 'react'
import {connect} from 'react-redux'
import {AddPuzzle, setValue} from '../../store/CreatePuzzle'

class CreatePuzzle extends Component {
  handleChange(name, event) {
    this.props.changeValue(name, event.target.value)
  }

  onSubmit(evt) {
    evt.preventDefault() //preventDefault stop browser submit
    this.props.submitPuzzle() // use action creator to submit instead
  }

  componentDidMount() {
    this.props.changeValue('message', '')
  }

  render() {
    let puzzle = this.props.puzzle
    let submit = this.onSubmit.bind(this) // need to bind(this) for function

    return (
      <form className="edit-container" onSubmit={submit}>
        <h2 className="center"> Add New Product: </h2>

        <br />

        <div className="formInput">
          <img className="image" src={puzzle.imageUrl} />
        </div>

        <div className="formInput">
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
            value={puzzle.name}
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
          <label htmlFor="category"> Category: </label>
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

        <div>{puzzle.message}</div>

        <div>
          <input type="submit" value="Submit" onClick={submit} />
        </div>
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
    submitPuzzle: () => dispatch(AddPuzzle()),
    changeValue: (name, value) => dispatch(setValue(name, value))
  }
}

export default connect(mapState, mapDispatch)(CreatePuzzle)
