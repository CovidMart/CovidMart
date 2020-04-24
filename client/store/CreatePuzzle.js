import axios from 'axios'

const initialState = {
  title: '',
  imageUrl: '',
  dimensions: '',
  price: 0,
  pieceCount: 0,
  category: '',
  description: ''
}

const SET_VALUE = 'SET_VALUE'

const setValue = (name, value) => {
  return {
    type: SET_VALUE,
    name: name,
    value: value
  }
}

// thunk creator
const AddPuzzle = () => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/puzzles', {
        title: this.state.title,
        imageUrl: this.state.imageUrl,
        dimensions: this.state.dimensions,
        price: this.state.price,
        pieceCount: this.state.pieceCount,
        category: this.state.category,
        description: this.state.description
      })
      dispatch(setValue(data))
    } catch (error) {
      dispatch(console.error(error))
    }
  }
}

function addPuzzleReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VALUE:
      const copy = {...state}
      copy[action.name] = action.value //modifying original copy, not copy of copy
      return copy
    default:
      return state
  }
}

export {setValue, AddPuzzle}
export default addPuzzleReducer
