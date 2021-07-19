import TYPES from '../types'

const INITIAL_STATE = {
  loading: false,
  all: [],
  selected: [],
  upload: {}
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.PRODUTO_LOADING:
      state.error = []
      state.loading = action.status
      return state
    case TYPES.PRODUTO_ALL:
      state.all = action.data
      state.loading = false
      return state
    case TYPES.PRODUTO_ALL_FILTER:
      state.all = action.data
      state.loading = false
      return state
    case TYPES.PRODUTO_REMOVE:
      state.all = action.data
      state.loading = false
      return state
    case TYPES.PRODUTO_EDIT:
      state.selected = action.data
      state.loading = false
      return state
    case TYPES.PRODUTO_UPLOAD:
      state.upload = action.upload
      return state
    case TYPES.PRODUTO_CREATE:
      state.loading = false
      return state
    default:
      return state
  }
}

export default reducer
