import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const UPDATE_USER = 'UPDATE_USER'
const GET_ALL_USERS = 'GET_ALL_USERS'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
let initialState = {
  singleUser: {},
  userLoading: true,
  allUsers: [],
  allUsersLoading: true
}
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const updateUser = user => ({type: UPDATE_USER, user})
const getAllUsers = users => ({type: GET_ALL_USERS, users})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = fetchCart => async dispatch => {
  try {
    const {data} = await axios.get('/auth/me')
    console.log('What this DATA???', data)
    dispatch(getUser(data || defaultUser))
    if (data) dispatch(fetchCart(data.id || null))
  } catch (err) {
    console.error(err)
  }
}

export const fetchAllUsers = () => async dispatch => {
  //only admin
  try {
    const res = await axios.get('/api/users')
    dispatch(getAllUsers(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const updateUserInStore = (user, id) => async dispatch => {
  try {
    const {firstName, lastName, address, phone} = user
    const res = await axios.put(`/api/users/${id}`, {
      firstName,
      lastName,
      address,
      phone
    })
    dispatch(updateUser(res.data, id))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, singleUser: action.user}
    case GET_ALL_USERS:
      return {...state, allUsers: action.users, allUsersLoading: false}
    case UPDATE_USER:
      return {...state, singleUser: action.user}
    case REMOVE_USER:
      return {...state, singleUser: {}}
    default:
      return state
  }
}
