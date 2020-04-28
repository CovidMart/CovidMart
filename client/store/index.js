import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import puzzles from './puzzles'
import CreatePuzzle from './CreatePuzzle'
import EditPuzzle from './EditPuzzle'
import cart from './cart'
import order from './order'

const reducer = combineReducers({
  user,
  puzzles,
  cart,
  CreatePuzzle,
  EditPuzzle,
  order
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
