import TYPES from '~/store/types'
import { toastr } from 'react-redux-toastr'
import { navigate } from '@reach/router'
import { getAllProviders } from '~/store/provider/provider.action'
import {
  listAllClientService,
  createClientService,
  listLikeByIdClientService,
  createLikeProviderService,
  removeLikeProviderService
} from '~/services/client.service'

export const getAllClients = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.CLIENT_LOADING, status: true })
      const result = await listAllClientService()
      dispatch({ type: TYPES.CLIENT_ALL, data: result.data.data })
    } catch (error) {
      toastr.error('Ocorreu um erro', error)
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

export const updateLikeClientProvider = (providerid, clientid, name, statusLike) => {
  return async dispatch => {
    try {
      if (statusLike) {
        await removeLikeProviderService(providerid, clientid)
        toastr.success('Curtida', 'A curtida foi removida com sucesso.')
      } else {
        await createLikeProviderService(providerid, clientid)
        toastr.success('Curtida', `O fornecedor ${name} foi curtido com sucesso.`)
      }
      dispatch(getAllProviders())
    } catch (error) {
      const { data } = error.response
      toastr.error('Curtida', data.message.details)
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
      toastr.error('Ocorreu um erro', error)
    }
    return false
  }
}
