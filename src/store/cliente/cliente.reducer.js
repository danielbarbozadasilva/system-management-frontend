import TYPES from '../types'

const INITIAL_STATE = {
  loading: false,
  all: [],
  upload: {},
  curtidas: []
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.CLIENTE_LOADING:
      state.error = []
      state.loading = action.status
      return state
    case TYPES.CLIENTE_ALL:
      state.all = action.data
      state.loading = false
      return state
    case TYPES.CLIENTE_CREATE:
      state.loading = false
      return state

    case TYPES.CLIENTE_CURTIDA_LOADING:
      state.error = []
      state.loading = action.status
      return state

    case TYPES.CLIENTE_CURTIDA_ALL:
      state.curtidas = action.data
      state.loading = false
      return state

    default:
      return state
  }
}

export default reducer
