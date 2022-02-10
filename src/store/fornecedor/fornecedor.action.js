import {
  listAllProviderService,
  listProviderByIdService,
  createProviderService,
  updateProviderService,
  removeProviderService,
  listProvidersByLocationService,
  changeStatusService,
  searchLikeProviderProductService,
  createLikeProductService
} from '~/services/provider.service'

import TYPES from '~/store/types'
import { toastr } from 'react-redux-toastr'
import { navigate } from '@reach/router'

export const getAllProviders = (namefilter) => {
  return async (dispatch) => {
    try {
      const namefilter = ''
      dispatch({ type: TYPES.PROVIDER_LOADING, status: true })
      const result = await listAllProviderService(namefilter)
      console.log(result.data.data)
      dispatch({ type: TYPES.PROVIDER_ALL, data: result.data.data })
    } catch (error) {
      toastr.error('aconteceu um erro', error)
    }
  }
}

export const getProviderById = (providerId) => {
  return async (dispatch) => {
    try {
      const result = await listProviderByIdService(providerId)
      dispatch({ type: TYPES.PROVIDER_PRODUCT_ID, data: result.data })
    } catch (error) {
      toastr.error('Fornecedor', 'Erro ao carregar produtos')
    }
  }
}

export const createProvider = (data) => {
  return async (dispatch) => {
    try {
      const result = await createProviderService(data)
      toastr.success('Fornecedor', 'Fornecedor cadastrado com sucesso!')
      navigate('/signin')
    } catch (error) {
      toastr.error('Fornecedor', 'Preencha todos os campos!')
    }
  }
}

export const editProvider = (providerId) => {
  return async dispatch => {
    dispatch({
      type: TYPES.PROVIDER_UPLOAD,
      upload: 0
    })
    try {
      const result = await updateProviderService(providerId)
      dispatch({ type: TYPES.PROVIDER_EDIT, data: result.data })
    } catch (error) {
      toastr.error('aconteceu um erro', error)
    }
  }
}

export const updateProvider = ({ providerId, ...data }) => {
  return (dispatch) => {
    dispatch({ type: TYPES.FORNECEDOR_LOADING, status: true })
    dispatch({
      type: TYPES.FORNECEDOR_UPLOAD,
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
          type: TYPES.FORNECEDOR_UPLOAD,
          upload: percentCompleted
        })
      }
    }
    const formData = new FormData()
    Object.keys(data).map(k => formData.append(k, data[k]))
    updateProviderService(providerId, formData)
      .then(result => {
        dispatch(editProvider(providerId))
        dispatch(listAllProviderService())
        toastr.success('Fornecedor', 'Fornecedor atualizada com sucesso')
        dispatch({ type: TYPES.PROVIDER_UPLOAD })
      })
      .catch(error => {
        dispatch({ type: TYPES.SIGN_ERROR, data: error })
        toastr.error('Fornecedor', error.toString())
      })
  }
}

export const removeProvider = (providerId) => {
  return async dispatch => {
    try {
      const result = await removeProviderService(providerId)
      dispatch({ type: TYPES.PROVIDER_EDIT, data: result.data })
      toastr.success('Fornecedor', 'Removido com sucesso')
      dispatch(listAllProviderService())
    } catch (error) {
      toastr.error('aconteceu um erro', error)
      toastr.error('Fornecedor', error.toString())
    }
  }
}

export const setStatusProvider = (id, ativo) => {
  return async (dispatch, getState) => {
    let result
    try {
      if (ativo) {
        result = await changeStatusService(id, 'ENABLE')
        toastr.success(
          `Fornecedor ${result.data.data.nomeFantasia}`,
          'Desativado com sucesso'
        )
      } else {
        result = await changeStatusService(id, 'DISABLE')
        toastr.success(
          `Fornecedor ${result.data.data.nomeFantasia}`,
          'Ativado com sucesso'
        )
      }
      const all = getState().fornecedor.all
      const index = all.findIndex(item => item.id === id)
      all[index].status = result.data.data.status

      dispatch({ type: TYPES.PROVIDER_ALL, data: [...all] })
    } catch (err) {}
  }
}

export const getProduct = (id) => {
  return async dispatch => {
    try {
      dispatch({ type: TYPES.PROVIDER_LOADING, status: true })
      const result = await listProviderByIdService(id)
      dispatch({ type: TYPES.PROVIDER_ALL, data: result.data.data })
    } catch (error) {
      toastr.error('Fornecedor', 'Erro ao carregar produtos')
    }
  }
}

export const getAllLikesProduct = () => {
  return async (dispatch, getState) => {
    const {
      auth: {
        usuario: { id: clienteId }
      }
    } = getState()

    try {
      dispatch({ type: TYPES.PROVIDER_LOADING, status: true })
      const result = await searchLikeProviderProductService(clienteId)
      dispatch({
        type: TYPES.PROVIDER_LIKE_LIST,
        data: result.data.data.data
      })
    } catch (error) {}
    return false
  }
}

export const likeProduct = ({ nome, providerId }) => {
  return async dispatch => {
    try {
      const result = await createLikeProductService(providerId)
      toastr.success('Curtida', `O produto ${nome} foi curtido com sucesso.`)
    } catch (error) {
      toastr.error('Curtida', 'Erro ao fazer a curtida')
    }
  }
}

export const getListProviderUfCity = (data) => {
  return async dispatch => {
    try {
      dispatch({ type: TYPES.PROVIDER_LOADING, status: true })
      const result = await listProvidersByLocationService(data)

      console.log(JSON.stringify(result.data))
      dispatch({ type: TYPES.PROVIDER_ALL, data: result.data.data })
    } catch (error) {
      toastr.error('Aconteceu um erro', error)
    }
  }
}
