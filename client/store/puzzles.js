import axios from 'axios'
import store from './index'

const ALL_PUZZLES = 'ALL_PUZZLES'
const SINGLE_PUZZLE = 'SINGLE_PUZZLE'

export const allPuzzles = allPuzzles => {
  return {
    type: ALL_PUZZLES,
    allPuzzles
  }
}

export const getSinglePuzzle = puzzle => {
  return {
    type: SINGLE_PUZZLE,
    puzzle
  }
}

export const fetchAllPuzzles = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/puzzles')
      dispatch(allPuzzles(data))
    } catch (error) {
      dispatch(console.error(error))
    }
  }
}

export const fetchOnePuzzle = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/puzzles/${id}`)
      dispatch(getSinglePuzzle(data))
    } catch (error) {
      dispatch(console.error(error))
    }
  }
}

export const removePuzzle = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/puzzles/${id}`)
      dispatch(fetchAllPuzzles())
    } catch (error) {
      dispatch(console.error(error))
    }
  }
}

const initialState = {
  allPuzzles: [],
  loadingAll: true,
  singlePuzzle: {},
  loadingSingle: true
}

export default function puzzleReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_PUZZLES:
      return {...state, allPuzzles: action.allPuzzles}
    case SINGLE_PUZZLE:
      return {...state, singlePuzzle: action.puzzle, loadingSingle: false}
    default:
      return state
  }
}
