import TYPES from '../types'

const INITIAL_STATE = {
  loading: false,
  all: [],
  upload: {}
}

const reducer = (state = INITIAL_STATE, action) => {
  // tamara recebe
  switch (action.type) {
    case TYPES.CATEGORY_LOADING:
      state.error = []
      state.loading = action.status
      return state
    case TYPES.CATEGORY_ALL:
      state.all = action.data
      state.loading = false
      return state
    case TYPES.CATEGORY_UPLOAD:
      state.upload = action.upload
      return state
    case TYPES.CATEGORY_CREATE:
      state.loading = false
      return state
    default:
      return state
  }
}

export default reducer
