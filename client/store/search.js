import axios from 'axios'

const initialState = {
  keyword: '',
  results: []
}

const SET_KEYWORD = 'SET_KEYWORD'
const SET_RESULTS = 'SET_RESULTS'

const SetKeyword = keyword => {
  return {
    type: SET_KEYWORD,
    keyword: keyword
  }
}

const SetResults = results => {
  return {
    type: SET_RESULTS,
    results: results
  }
}

const FindPuzzle = keyword => {
  return async (dispatch, getState) => {
    // const { keyword } = getState().Search //global store, getState instead of passing in value
    try {
      const {data} = await axios.get(`/api/puzzles/search/${keyword}`)
      dispatch(SetResults(data))
    } catch (error) {
      dispatch(console.error(error))
    }
  }
}

function SearchReducer(state = initialState, action) {
  switch (action.type) {
    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword
      }
    case SET_RESULTS:
      return {
        ...state,
        results: action.results
      }
    default:
      return state
  }
}

export {SetKeyword, FindPuzzle}
export default SearchReducer
