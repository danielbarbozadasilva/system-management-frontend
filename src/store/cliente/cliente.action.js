import {
  ServiceListAllClient,
  ServiceSearchByIdClient,
  ServiceCreateClient
} from '~/services/client.service'

import TYPES from '~/store/types'
import { toastr } from 'react-redux-toastr'
import { navigate } from '@reach/router'

export const getAllClients = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.CLIENTE_LOADING, status: true })
      const result = await ServiceListAllClient()
      dispatch({ type: TYPES.CLIENTE_ALL, data: result.data })
    } catch (error) {
      toastr.error('Aconteceu um erro', error)
    }
  }
}

export const create = (data) => {
  return async (dispatch) => {
    try {
      const result = await ServiceCreateClient(data)
      toastr.success('Cliente', 'Cliente cadastrado com sucesso!')
      navigate('/signin')
    } catch (error) {
      toastr.error('Cliente', 'ocorreu um erro!')
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
      const result = await ServiceSearchByIdClient(clienteId)

      dispatch({ type: TYPES.CLIENTE_CURTIDA_ALL, data: result.data.data })
    } catch (error) {
      toastr.error('aconteceu um erro', error)
    }
    return false
  }
}
