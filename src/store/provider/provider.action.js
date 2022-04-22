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
import { getAllProducts } from '~/store/product/product.action'
import TYPES from '~/store/types'
import { toastr } from 'react-redux-toastr'
import { navigate } from '@reach/router'

export const getAllProviders = (namefilter) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.PROVIDER_LOADING, status: true })
      const result = await listAllProviderService(namefilter)
      dispatch({ type: TYPES.PROVIDER_ALL, data: result.data.data })
    } catch (error) {
      toastr.error('Aconteceu um erro', error)
    }
  }
}

export const getProviderById = (providerId) => {
  return async (dispatch) => {
    try {
      const result = await listProviderByIdService(providerId)
      dispatch({ type: TYPES.PROVIDER_PRODUCT_ID, data: result.data })
    } catch (error) {
      toastr.error('Fornecedor', 'erro ao carregar os produtos')
    }
  }
}

export const createProvider = (data) => {
  return async (dispatch) => {
    try {
      await createProviderService(data)
      toastr.success('Fornecedor', 'cadastrado com sucesso!')
      navigate('/signin')
    } catch (error) {
      toastr.error('Erro', 'Preencha todos os campos!')
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
    Object.keys(data).map(k => formData.append(k, data[k]))
    updateProviderService(providerId, formData)
      .then(result => {
        dispatch(editProvider(providerId))
        dispatch(listAllProviderService())
        toastr.success('provider', 'provider atualizada com sucesso')
        dispatch({ type: TYPES.PROVIDER_UPLOAD })
      })
      .catch(error => {
        dispatch({ type: TYPES.SIGN_ERROR, data: error })
        toastr.error('provider', error.toString())
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
      toastr.error('Aconteceu um erro', error.toString())
    }
  }
}

export const setStatusProvider = (id, status) => {
  return async (dispatch, getState) => {
    try {
      const result = await changeStatusService(id, status)
      const msg = status === 'ENABLE' ? 'Ativado' : 'Desativado'
      toastr.success(`Fornecedor ${result.data.data.name}`, `${msg} com sucesso`)
      const all = getState().provider.all
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
      toastr.error('provider', 'Erro ao carregar os produtos')
    }
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
        data: result.data.data
      })
    } catch (error) {

    }
  }
}

export const updateLikeProduct = (productid, providerid, nameProduct, statusLike) => {
  return async dispatch => {
    if (statusLike) {
      try {
        await removeLikeProviderProductService(providerid, productid)
        toastr.success('Curtida', 'A curtida foi removida com sucesso.')
      } catch (error) {
        toastr.error('Curtida', 'Erro ao remover a curtida o produto')
      }
    } else {
      try {
        await createLikeProductService(providerid, productid)
        toastr.success('Curtida', `O produto ${nameProduct} foi curtido com sucesso.`)
      } catch (error) {
        const { data } = error.response
        toastr.error('Curtida', data.message.details)
      }
    }
    dispatch(getAllProducts())
  }
}

export const getListProviderUfCity = (data) => {
  return async dispatch => {
    try {
      dispatch({ type: TYPES.PROVIDER_LOADING, status: true })
      const result = await listProvidersByLocationService(data)
      dispatch({ type: TYPES.PROVIDER_ALL, data: result.data.data })
    } catch (error) {
      toastr.error('Aconteceu um erro', error)
    }
  }
}
