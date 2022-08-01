import TYPES from '~/store/types'
import { toastr } from 'react-redux-toastr'
import { navigate } from '@reach/router'
import { getAllProviders } from '~/store/provider/provider.action'
import { saveAuth } from '../../config/storage'
import http from '../../config/http'
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
    } catch (error) {}
  }
}

export const createClient = (data) => {
  return async (dispatch) => {
    try {
      const result = await createClientService(data)

      if (result.data.data) {
        saveAuth(result.data.data)
        http.defaults.headers.token = result.data.data.token
        dispatch({ type: TYPES.SIGN_IN, data: result.data?.data })
        toastr.success('Cadastrado!', 'Cliente cadastrado com sucesso!')
        navigate('/admin')
      }
    } catch (error) {
      const { data } = error?.response
      toastr.error('Erro', ...data?.message?.details)
      dispatch({ type: TYPES.SIGN_ERROR, data: error })
    }
  }
}

export const updateLikeClientProvider = (
  providerid,
  clientid,
  name,
  statusLike
) => {
  return async (dispatch) => {
    try {
      if (statusLike) {
        await removeLikeProviderService(providerid, clientid)
        toastr.success('Curtida', 'A curtida foi removida com sucesso.')
      } else {
        await createLikeProviderService(providerid, clientid)
        toastr.success(
          'Curtida',
          `O fornecedor ${name} foi curtido com sucesso.`
        )
      }
      dispatch(getAllProviders())
    } catch (error) {
      const { data } = error.response
      toastr.error('Curtida', data.message.details)
    }
  }
}

export const getAllLikesClient = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.CLIENT_LIKE_LOADING, status: true })
      const result = await listLikeByIdClientService(id)
      dispatch({ type: TYPES.CLIENT_LIKE, data: result.data.data.provider })
    } catch (error) {}
  }
}
