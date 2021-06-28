import { clearStorage, saveAuth } from '~/config/storage'
import { authService } from '~/services/auth.service'
import http from '~/config/http'
import TYPES from '~/store/types'
import { navigate } from '@reach/router'
import { toastr } from 'react-redux-toastr'

export const signInAction = (data) => {
  return (dispatch) => {
    dispatch({ type: TYPES.SIGN_LOADING, status: true })

    authService(data)
      .then((result) => {
        if (result.data) {
          saveAuth(result.data?.data)
          http.defaults.headers.token = result.data.data.token
        }
        dispatch({
          type: TYPES.SIGN_IN,
          data: result.data?.data
        })
        navigate('/admin')
      })
      .catch((error) => {
        dispatch({ type: TYPES.SIGN_ERROR, data: error })
        toastr.error(
          'Login',
          error.response?.data?.mensagem || 'Erro ao tentar fazer login'
        )
      })
  }
}

export const logoutAction = (data) => {
  return async (dispatch) => {
    clearStorage()
    dispatch({ type: TYPES.SIGN_OUT })
    navigate('/')
  }
}
