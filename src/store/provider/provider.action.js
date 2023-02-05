import TYPES from '~/store/types'
import { toastr } from 'react-redux-toastr'
import { navigate } from '@reach/router'
import {
  listAllProviderService,
  listProviderByIdService,
  createProviderService,
  listProvidersByLocationService,
  changeStatusService,
  searchLikeProviderProductService,
  createLikeProductService,
  removeLikeProviderProductService
} from '~/services/provider.service'

export const getAllProviders = (namefilter) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.PROVIDER_LOADING, status: true })
      const result = await listAllProviderService(namefilter)
      dispatch({ type: TYPES.PROVIDER_ALL, data: result.data.data })
    } catch (error) {}
  }
}

export const getProviderById = (providerId) => {
  return async (dispatch) => {
    try {
      const result = await listProviderByIdService(providerId)
      dispatch({ type: TYPES.PRODUCT_WITH_FILTER, data: result.data.data })
    } catch (error) {}
  }
}

export const createProvider = (data) => {
  return async (dispatch) => {
    try {
      await createProviderService(data)
      dispatch({ type: TYPES.SIGN_UP, data: data })
      toastr.success('Fornecedor', 'cadastrado com sucesso!')
      navigate('/analysis')
    } catch (error) {
      toastr.error('Erro', error.response.data.message)
    }
  }
}

export const setStatusProvider = (id, status) => {
  return async (dispatch, getState) => {
    try {
      const result = await changeStatusService(id, status)
      const msg = status === 'ENABLE' ? 'Ativado' : 'Desativado'
      toastr.success(
        `Fornecedor ${result.data.data.name}`,
        `${msg} com sucesso`
      )
      const all = getState().provider.all
      const index = all.findIndex((item) => item.id === id)
      all[index].status = result.data.data.status
      dispatch({ type: TYPES.PROVIDER_ALL, data: [...all] })
    } catch (err) {}
  }
}

export const getProduct = () => {
  return async (dispatch, getState) => {
    const {
      auth: {
        user: { id: clientId }
      }
    } = getState()
    try {
      dispatch({ type: TYPES.PROVIDER_LOADING, status: true })
      const result = await listProviderByIdService(clientId)
      dispatch({ type: TYPES.PROVIDER_PRODUCT_ID, data: result.data.data })
    } catch (error) {}
  }
}

export const getAllLikesProviderProduct = () => {
  return async (dispatch, getState) => {
    const {
      auth: {
        user: { id: providerId }
      }
    } = getState()

    try {
      dispatch({ type: TYPES.PROVIDER_LOADING, status: true })
      const result = await searchLikeProviderProductService(providerId)
      dispatch({
        type: TYPES.PROVIDER_LIKE_LIST,
        data: result.data.data.likes
      })
    } catch (error) {}
  }
}

export const updateLikeProduct = (productid, providerid, name, statusLike) => {
  return async (dispatch) => {
    try {
      if (statusLike) {
        await removeLikeProviderProductService(providerid, productid)
        toastr.success('Curtida', 'curtida removida com sucesso.')
      } else {
        await createLikeProductService(providerid, productid)
        toastr.success('Curtida', `O produto ${name} foi curtido com sucesso.`)
      }
    } catch (error) {
      const { data } = error.response
      toastr.error('Curtida', data.message)
    }
    dispatch(getProduct())
  }
}

export const getListProviderUfCity = (uf, city) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.PROVIDER_LOADING, status: true })
      const result = await listProvidersByLocationService(uf, city)
      dispatch({ type: TYPES.PROVIDER_ALL, data: result.data.data })
    } catch (error) {}
  }
}
