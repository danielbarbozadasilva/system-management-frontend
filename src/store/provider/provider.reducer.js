import TYPES from '../types'

const INITIAL_STATE = {
  loading: false,
  all: [],
  upload: {},
  selected: {},
  products: [],
  providerById: [],
  search: []
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.PROVIDER_LOADING:
      state.error = []
      state.loading = action.status
      return state
    case TYPES.PROVIDER_ALL:
      state.all = action.data
      state.loading = false
      return state
    case TYPES.PROVIDER_ALL_SEARCH:
      state.search = action.data
      state.loading = false
      return state
    case TYPES.PROVIDER_EDIT:
      state.selected = action.data
      state.loading = false
      return state
    case TYPES.PROVIDER_UPLOAD:
      state.upload = action.upload
      state.loading = false
      return state
    case TYPES.PROVIDER_SELECT:
      state.selected = action.data
      state.loading = false
      return state
    case TYPES.PROVIDER_PRODUCTS:
      state.products = action.data
      state.loading = false
      return state
    case TYPES.PROVIDER_PRODUCT_ID:
      state.providerById = action.data
      state.loading = false
      return state
    case TYPES.PROVIDER_CREATE:
      state.loading = false
      return state
    default:
      return state
  }
}

export default reducer
