import {
  create as ClienteCreate,
  getAll as getAllCliente,
  getById
} from '~/services/cliente.service'

import TYPES from '~/store/types'
import { toastr } from 'react-redux-toastr'
import { navigate } from '@reach/router'

export const create = (data) => {
  return async (dispatch) => {
    try {
      const result = await ClienteCreate(data)
      toastr.success('Cliente', 'Cliente cadastrada com sucesso')
      navigate('/signin')
    } catch (error) {
      toastr.error('Cliente', 'deu ruim')
    }
  }
}

export const getAll = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.CLIENTE_LOADING, status: true })
      const result = await getAllCliente()

      dispatch({ type: TYPES.CLIENTE_ALL, data: result.data })
    } catch (error) {
      toastr.error('aconteceu um erro', error)
    }
  }
}

export const getAllCurtidas = () => {
  return async (dispatch, getState) => {
    const {
      auth: {
        usuario: { id: clienteId }
      }
    } = getState()

    try {
      dispatch({ type: TYPES.CLIENTE_CURTIDA_LOADING, status: true })
      const result = await getById(clienteId)
      dispatch({ type: TYPES.CLIENTE_CURTIDA_ALL, data: result.data.data })
    } catch (error) {
      toastr.error('aconteceu um erro', error)
    }
    return false
  }
}
