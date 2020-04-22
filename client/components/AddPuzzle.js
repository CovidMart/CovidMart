import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAddPuzzle} from '../store/addPuzzle'

class CreatePuzzle extends Component {
  handleChangeTitle(event) {
    this.setState({
      title: event.target.value
    })
  }

  handleChangePrice(event) {
    this.setState({
      price: event.target.value
    })
  }

  handleChangePieceCnt(event) {
    this.setState({
      pieceCount: event.target.value
    })
  }

  handleChangeCategory(event) {
    this.setState({
      category: event.target.value
    })
  }

  handleChangeDimension(event) {
    this.setState({
      dimensions: event.target.value
    })
  }

  handleChangeImage(event) {
    this.setState({
      imageUrl: event.target.value
    })
  }

  handleChangeDescription(event) {
    this.setState({
      description: event.target.value
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="center"> Add New Product: </div>

        <br />

        <div className="formInput">
          <label htmlFor="title"> Puzzle Title </label>
          <input
            type="text"
            name="title"
            onChange={this.handleChangeName}
            value={this.state.name}
          />
        </div>

        <div className="formInput">
          <label htmlFor="imageUrl"> Product ImageUrl: </label>
          <input
            type="text"
            name="imageUrl"
            onChange={this.handleChangeImage}
            value={this.state.imageUrl}
          />
        </div>

        <div className="formInput">
          <label htmlFor="dimensions"> Product Dimensions: </label>
          <input
            type="text"
            name="dimensions"
            onChange={this.handleChangeDimension}
            value={this.state.dimensions}
          />
        </div>

        <div className="formInput">
          <label htmlFor="price"> Product Prices: </label>
          <textarea
            type="text"
            name="price"
            onChange={this.handleChangePrice}
            value={this.state.price}
          />
        </div>

        <div className="formInput">
          <label htmlFor="pieceCount"> Product Inventory: </label>
          <textarea
            type="text"
            name="pieceCount"
            onChange={this.handleChangePieceCnt}
            value={this.state.pieceCount}
          />
        </div>

        <div className="formInput">
          <label htmlFor="category"> Category Product Belongs To: </label>
          <textarea
            type="text"
            name="category"
            onChange={this.handleChangeCategory}
            value={this.state.category}
          />
        </div>

        <div className="formInput">
          <label htmlFor="description">Product Descriptions: </label>
          <textarea
            type="text"
            name="description"
            onChange={this.handleChangeDescription}
            value={this.state.description}
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
    puzzle: state.addPuzzle
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAddPuzzle: () => dispatch(fetchAddPuzzle())
  }
}

export default connect(mapState, mapDispatch)(CreatePuzzle)
