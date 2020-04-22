import axios from 'axios'

const ALL_PUZZLES = 'ALL_PUZZLES'

export const allPuzzles = allPuzzles => {
  return {
    type: ALL_PUZZLES,
    allPuzzles
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

const initialState = {
  puzzles: []
}

export default function puzzleReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_PUZZLES:
      return {...state, puzzles: action.allPuzzles}
  }
}
