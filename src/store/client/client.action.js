import TYPES from '~/store/types'
import { toastr } from 'react-redux-toastr'
import { navigate } from '@reach/router'
import {
  listAllClientService,
  createClientService,
  listLikeByIdClientService
} from '~/services/client.service'

export const getAllClients = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.CLIENT_LOADING, status: true })
      const result = await listAllClientService()
      dispatch({ type: TYPES.CLIENT_ALL, data: result.data.data })
    } catch (error) {
      toastr.error('Aconteceu um erro', error)
    }
  }
}

export const createClient = (data) => {
  return async (dispatch) => {
    try {
      await createClientService(data)
      toastr.success('Cadastrado!', 'Cliente cadastrado com sucesso!')
      navigate('/signin')
    } catch (error) {
      toastr.error('Erro!', 'ocorreu um erro!')
    }
  }
}

export const getAllLikesClient = () => {
  return async (dispatch, getState) => {
    const {
      auth: {
        user: { id: clientId }
      }
    } = getState()
    try {
      dispatch({ type: TYPES.CLIENT_LIKE_LOADING, status: true })
      const result = await listLikeByIdClientService(clientId)
      dispatch({ type: TYPES.CLIENT_LIKE, data: result.data.data })
    } catch (error) {
      toastr.error('aconteceu um erro', error)
    }
    return false
  }
}
