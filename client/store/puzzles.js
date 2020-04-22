import axios from 'axios'

const ALL_PUZZLES = 'ALL_PUZZLES'
const SINGLE_PUZZLE = 'SINGLE_PUZZLE'

export const allPuzzles = puzzles => {
  return {
    type: ALL_PUZZLES,
    puzzles
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

const initialState = {
  allPuzzles: [],
  loadingAll: true,
  singlePuzzle: {},
  loadingSingle: true
}

export default function puzzleReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_PUZZLES:
      return {...state, allPuzzles: action.puzzles}
    case SINGLE_PUZZLE:
      return {...state, single: action.puzzle}
    default:
      return state
  }
}
