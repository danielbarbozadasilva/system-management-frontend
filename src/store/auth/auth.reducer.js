import TYPES from '../types'
import { getToken, getUser } from '../../config/storage'

const INITIAL_STATE = {
  loading: false,
  token: getToken() || '',
  user: getUser() || {},
  error: [],
  registered: false
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.SIGN_LOADING:
      state.error = []
      state.loading = action.status
      return state
    case TYPES.SIGN_IN:
      state.token = action.data.token
      state.user = action.data.userDTO
      state.loading = false
      return state
    case TYPES.SIGN_UP:
      state.registered = true
      state.token = action.data.token
      state.user = action.data.user
      state.loading = false
      return state
    case TYPES.SIGN_ERROR:
      state.loading = false
      return state
    case TYPES.SIGN_OUT:
      state.token = ''
      state.user = {}
      state.isAdmin = false
      state.error = []
      return state
    default:
      return state
  }
}

export default reducer
