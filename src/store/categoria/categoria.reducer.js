import Types from '../types'

const INITIAL_STATE = {
  loading: false,
  all: [],
  upload: {},
  selected: {},
  dadosById: []
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.CATEGORY_LOADING:
      state.error = []
      state.loading = action.status
      return state
    case Types.CATEGORY_ALL:
      state.all = action.data
      console.log(state.all)
      state.loading = false
      return state
    case Types.CATEGORY_EDIT:
      state.selected = action.data
      state.loading = false
      return state

    case Types.CATEGORY_ID:
      state.dadosById = action.data
      state.loading = false
      return state
    case Types.CATEGORY_UPLOAD:
      state.upload = action.upload
      return state
    case Types.CATEGORY_CREATE:
      state.loading = false
      return state
    default:
      return state
  }
}
export default reducer
