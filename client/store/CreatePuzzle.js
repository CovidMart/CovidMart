import axios from 'axios'

const initialState = {
  title: '',
  imageUrl: '',
  dimensions: '',
  price: 0,
  pieceCount: 0,
  category: '',
  description: '',
  message: ''
}

const SET_VALUE = 'SET_VALUE'

const setValue = (name, value) => {
  return {
    type: SET_VALUE,
    name: name, // name denoted different property under same attribute as "name" in CreatePuzzle componnet
    value: value // set property value accordingly
  }
}

// thunk creator
const AddPuzzle = () => {
  return async (dispatch, getState) => {
    const state = getState().CreatePuzzle //global store, getState instead of passing in value
    try {
      await axios.post('/api/puzzles', {
        title: state.title,
        imageUrl: state.imageUrl,
        dimensions: state.dimensions,
        price: state.price,
        pieceCount: state.pieceCount,
        category: state.category,
        description: state.description
      })
      dispatch(setValue('message', 'Save Successfully!'))
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
