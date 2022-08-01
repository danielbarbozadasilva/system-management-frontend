import axios from 'axios'
import { getToken } from './storage'
import store from '../store'
import { logoutAction } from '../store/auth/auth.action'
import { navigate } from '@reach/router'
import { toastr } from 'react-redux-toastr'

const { REACT_APP_VERSION: version, REACT_APP_API: api } = process.env
const urlApi = api + version

const http = axios.create({
  baseURL: urlApi
})

http.defaults.headers['content-type'] = 'application/json'
if (getToken()) {
  http.defaults.headers.token = getToken()
}

http.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response.status) {
      case 401:
        if (getToken()) {
          store.dispatch(logoutAction())
          navigate('/signin')
          toastr.info('Token temporário expirado!')
        }
        return Promise.reject(error)
      case 403:
        navigate('/error403')
        return Promise.reject(error)
      case 500:
        navigate('/error500')
        return Promise.reject(error)
      default:
        return Promise.reject(error)
    }
  }
)

export default http
