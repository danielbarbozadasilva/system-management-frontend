import { removeToken, saveAuth } from '~/config/storage'
import { authService } from '~/services/auth.service'
import history from '~/config/history'
import http from '~/config/http'
import types from '~/store/types'

export const signInAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: types.SIGN_LOADING, status: true })

    try {
      const result = await authService(data) // liguei para o ezer
      if (result.data) {
        saveAuth(result.data)
        http.defaults.headers.token = result.data.token
      }
      // mandando informação para o reducer
      dispatch({
        type: types.SIGN_IN,
        data: result.data // mandei para a tamara
      })
      history.push('/admin')
    } catch (error) {
      dispatch({ type: types.SIGN_ERROR, data: error })
    }
  }
}
// export const signUpAction = (data) => {
//   return async (dispatch) => {
//     dispatch({ type: types.SIGN_LOADING, status: true })
//     try {
//       const result = await registerUserService(data) // liguei para o ezer
//       if (result.data) {
//         saveAuth(result.data)
//         http.defaults.headers.token = result.data.token
//       }
//       dispatch({
//         type: types.SIGN_UP,
//         data: result.data // mandei para a tamara
//       })

//       setTimeout(() => {
//         history.push('/')
//       }, 5000)
//     } catch (error) {
//       dispatch({ type: types.SIGN_ERROR, data: error })
//     }
//   }
// }
export const logoutAction = (data) => {
  return async (dispatch) => {
    removeToken()
    dispatch({ type: types.SIGN_OUT })
    history.push('/signin')
  }
}
