import axios from 'axios'
import { getToken } from './storage'
import store from '../store'
import { logoutAction } from '../store/auth/auth.action'
import { toastr } from 'react-redux-toastr'

const { REACT_APP_VERSION: version, REACT_APP_API: api } = process.env
const urlApi = api + version

// criando um client http através do AXIOS
const http = axios.create({
  baseURL: urlApi
})

// Definindo o header padrão da aplicação
http.defaults.headers['content-type'] = 'application/json'
if (getToken()) {
  http.defaults.headers.token = getToken()
}

http.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response.status) {
      case 401:
        store.dispatch(logoutAction())
        // history.push('/signin')
        break

      case 400:
        toastr.error(error.response.data.mensagem, error.response.data.detalhes.join(','))
        break
      default:
        toastr.error('Erro: ' + error.response.status, 'Ocorreu um erro!')
        break
    }
  }
)

export default http
