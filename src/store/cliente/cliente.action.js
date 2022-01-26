import {
  listAllClientService,
  createClientService,
  listByIdClientService
} from '~/services/client.service'

import TYPES from '~/store/types'
import { toastr } from 'react-redux-toastr'
import { navigate } from '@reach/router'

export const getAllClients = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.CLIENT_LOADING, status: true })
      const result = await listAllClientService()
      dispatch({ type: TYPES.CLIENT_ALL, data: result.data })
    } catch (error) {
      toastr.error('Aconteceu um erro', error)
    }
  }
}

export const create = (data) => {
  return async (dispatch) => {
    try {
      await createClientService(data)
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
      dispatch({ type: TYPES.CLIENT_LIKE_LOADING, status: true })
      const result = await listByIdClientService(clienteId)

      dispatch({ type: TYPES.CLIENT_LIKE_ALL, data: result.data.data })
    } catch (error) {
      toastr.error('aconteceu um erro', error)
    }
    return false
  }
}
