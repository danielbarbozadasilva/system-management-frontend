import {
  create as clienteCreate,
  getAll as getAllcliente
} from '~/services/cliente.service'
import TYPES from '~/store/types'
import { toastr } from 'react-redux-toastr'
import { navigate } from '@reach/router'

export const create = (data) => {
  return async (dispatch) => {
    try {
      const result = await clienteCreate(data)
      toastr.success('Cliente', 'Cliente cadastrado com sucesso')
      navigate('/signin')
    } catch (error) {
      toastr.error('Cliente', 'Preencha todos os campos!')
    }
    console.log('disparar...', data)
  }
}

export const getAll = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.CLIENTE_LOADING, status: true })
      const result = await getAllcliente()
      dispatch({ type: TYPES.CLIENTE_ALL, data: result.data })
    } catch (error) {
      toastr.error('aconteceu um erro', error)
    }
  }
}
