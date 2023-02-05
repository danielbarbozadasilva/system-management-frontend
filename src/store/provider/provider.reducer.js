import TYPES from '../types'

const INITIAL_STATE = {
  loading: false,
  all: [],
  upload: {},
  selected: {},
  providerById: [],
  likes: []
}

const reducer = ({ ...state } = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.PROVIDER_LOADING:
      state.error = []
      state.loading = action.status
      return state
    case TYPES.PROVIDER_ALL:
      state.all = action.data
      state.loading = false
      return state
    case TYPES.PROVIDER_PRODUCT_ID:
      state.providerById = action.data
      state.loading = false
      return state
    case TYPES.PROVIDER_LIKE_LIST:
      state.likes = action.data
      state.loading = false
      return state
    default:
      return state
  }
}

export default reducer
