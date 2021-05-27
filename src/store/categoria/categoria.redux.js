import TYPES from '../types'

const INITIAL_STATE = {
  loading: false,
  all: [],
  upload: {},
  selected: {}
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.CATEGORY_LOADING:
      state.error = []
      state.loading = action.status
      return state
    case TYPES.CATEGORY_ALL:
      state.all = action.data
      state.loading = false
      return state
    case TYPES.CATEGORY_EDIT:
      state.selected = action.data
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
