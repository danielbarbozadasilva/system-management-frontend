import TYPES from '../types'

const INITIAL_STATE = {
  loading: false,
  all: [],
  upload: {},
  selected: {},
  produtos: []
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.FORNECEDOR_LOADING:
      state.error = []
      state.loading = action.status
      return state
    case TYPES.FORNECEDOR_ALL:
      state.all = action.data
      state.loading = false
      return state
    case TYPES.FORNECEDOR_EDIT:
      state.selected = action.data
      state.loading = false
      return state
    case TYPES.FORNECEDOR_UPLOAD:
      state.upload = action.upload
      return state
    case TYPES.FORNECEDOR_SELECT:
      state.selected = action.data
      return state
    case TYPES.FORNECEDOR_PRODUTOS:
      state.produtos = action.data
      return state
    case TYPES.FORNECEDOR_CREATE:
      state.loading = false
      return state
    default:
      return state
  }
}

export default reducer
