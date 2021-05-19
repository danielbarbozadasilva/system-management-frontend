import Types from '../types'
import { getToken, getUser } from '../../config/storage'

const INITIAL_STATE = {
  isAdmin: getUser().tipo === '1' || false,
  loading: false,
  token: getToken() || '',
  usuario: getUser() || {},
  registered: false,
  error: []
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.SIGN_LOADING:
      state.error = []
      state.loading = action.status
      return state

    case Types.SIGN_IN:
      // atribui apenas o token do back
      state.token = action.data.token

      // atribui apenas o objeto usuario (email, senha, tipo) do back
      state.usuario = action.data.usuario

      // para de carregar
      state.loading = false

      state.isAdmin = action.data.usuario.tipo === '1'

      return state

    case Types.SIGN_ERROR:
      // let err = [...state.error, action.data]
      state.loading = false
      // state.error = err
      return state

    case Types.SIGN_OUT: // disponibiliza na mesa
      state.token = ''
      state.usuario = {}
      state.isAdmin = false
      state.error = []
      return state

    case Types.SIGN_UP:
      state.registered = true
      state.token = action.data.token
      state.usuario = action.data.usuario
      state.isAdmin = action.data.usuario.tipo === '1'
      state.loading = false
      return state

    case Types.SIGN_UPDATE_REGISTER:
      state.registered = false
      return state

    default:
      return state
  }
}

export default reducer
