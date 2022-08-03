import TYPES from '~/store/types'
import { saveAuth } from '../../config/storage'
import http from '../../config/http'
import { toastr } from 'react-redux-toastr'
import { navigate } from '@reach/router'
import {
  listAllProviderService,
  listProviderByIdService,
  createProviderService,
  updateProviderService,
  removeProviderService,
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
      const result = await createProviderService(data)

      if (result.data.data) {
        saveAuth(result.data.data)
        http.defaults.headers.token = result.data.data.token
        dispatch({ type: TYPES.SIGN_IN, data: result.data?.data })
        toastr.success('Fornecedor', 'cadastrado com sucesso!')
        navigate('/analysis')
      }
    } catch (error) {
      const { data } = error?.response
      toastr.error('Erro', ...data?.message?.details)
      dispatch({ type: TYPES.SIGN_ERROR, data: error })
    }
  }
}

export const editProvider = (providerId) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.PROVIDER_UPLOAD,
      upload: 0
    })
    try {
      const result = await updateProviderService(providerId)
      dispatch({ type: TYPES.PROVIDER_EDIT, data: result.data })
    } catch (error) {
      toastr.error('Erro', 'ocorreu um erro ao realizar a operação!')
    }
  }
}

export const updateProvider = ({ providerId, ...data }) => {
  return (dispatch) => {
    dispatch({ type: TYPES.PROVIDER_LOADING, status: true })
    dispatch({
      type: TYPES.PROVIDER_UPLOAD,
      upload: 0
    })
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: function (progressEvent) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        dispatch({
          type: TYPES.PROVIDER_UPLOAD,
          upload: percentCompleted
        })
      }
    }
    const formData = new FormData()
    Object.keys(data).map((k) => formData.append(k, data[k]))
    updateProviderService(providerId, formData)
      .then((result) => {
        dispatch(editProvider(providerId))
        dispatch(getAllProviders())
        toastr.success('Fornecedor', 'atualizado com sucesso')
        dispatch({ type: TYPES.PROVIDER_UPLOAD })
      })
      .catch((error) => {
        dispatch({ type: TYPES.SIGN_ERROR, data: error })
        toastr.error('Erro', 'ocorreu um erro ao realizar a operação!')
      })
  }
}

export const removeProvider = (providerId) => {
  return async (dispatch) => {
    try {
      const result = await removeProviderService(providerId)
      dispatch({ type: TYPES.PROVIDER_EDIT, data: result.data })
      toastr.success('Fornecedor', 'Removido com sucesso')
      dispatch(getAllProviders())
    } catch (error) {
      toastr.error('Erro', 'ocorreu um erro ao realizar a operação!')
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
        data: result.data.data.result_likes
      })
    } catch (error) {}
  }
}

export const updateLikeProduct = (
  productid,
  providerid,
  nameProduct,
  statusLike
) => {
  return async (dispatch) => {
    if (statusLike) {
      try {
        await removeLikeProviderProductService(providerid, productid)
        toastr.success('Curtida', 'curtida removida com sucesso.')
      } catch (error) {
        toastr.error('Curtida', 'erro ao remover a curtida')
      }
    } else {
      try {
        await createLikeProductService(providerid, productid)
        toastr.success(
          'Curtida',
          `O produto ${nameProduct} foi curtido com sucesso.`
        )
      } catch (error) {
        const { data } = error.response
        toastr.error('Curtida', data.message.details)
      }
    }
    dispatch(getProduct())
  }
}

export const getListProviderUfCity = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.PROVIDER_LOADING, status: true })
      const result = await listProvidersByLocationService(data)
      dispatch({ type: TYPES.PROVIDER_ALL, data: result.data.data })
    } catch (error) {}
  }
}
