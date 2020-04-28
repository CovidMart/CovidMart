import axios from 'axios'

const initialState = {
  title: '',
  imageUrl: '',
  dimensions: '',
  price: 0.0,
  pieceCount: 0,
  category: '',
  description: '',
  message: ''
}

const SET_VALUE = 'SET_VALUE'
const GET_PUZZLE_DATA = 'GET_PUZZLE_DATA'

const setValue = (name, value) => {
  return {
    type: SET_VALUE,
    name: name,
    value: value
  }
}

const getPuzzleData = puzzle => {
  return {
    type: GET_PUZZLE_DATA,
    puzzle
  }
}

const fetchEditPuzzle = id => {
  return async (dispatch, getState) => {
    const state = getState().EditPuzzle
    try {
      await axios.put(`/api/puzzles/${id}`, {
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

const fetchPuzzleData = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/puzzles/${id}`)
      dispatch(getPuzzleData(data))
    } catch (error) {
      dispatch(console.error(error))
    }
  }
}

function EditPuzzleReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VALUE:
      const copy = {...state}
      copy[action.name] = action.value
      return copy
    case GET_PUZZLE_DATA:
      return {...state, ...action.puzzle}
    default:
      return state
  }
}

export {setValue, getPuzzleData, fetchEditPuzzle, fetchPuzzleData}
export default EditPuzzleReducer
