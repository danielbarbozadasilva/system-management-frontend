import {
  listProductService,
  listProductWithFilterService,
  listProductByIdService,
  deleteProductService,
  createProductService,
  updateProductService
} from '~/services/product.service'
import { getProduct } from '../provider/provider.action'
import TYPES from '~/store/types'
import { toastr } from 'react-redux-toastr'
import { getUser } from '~/config/storage'

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.PRODUCT_LOADING, status: true })
      const result = await listProductService()
      dispatch({ type: TYPES.PRODUCT_ALL, data: result.data.data })
    } catch (error) {}
  }
}

export const getAllProductsWithFilter = (name, filter) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.PRODUCT_LOADING, status: true })
      const result = await listProductWithFilterService(name, filter)
      dispatch({ type: TYPES.PRODUCT_WITH_FILTER, data: result.data.data })
    } catch (error) {}
  }
}

export const createProduct = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: function (progressEvent) {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        dispatch({
          type: TYPES.PRODUCT_UPLOAD,
          upload: {
            finish: percent === 100,
            percent: percent
          }
        })
      }
    }
    try {
      const formData = new FormData()
      Object.keys(data).map((k) => formData.append(k, data[k]))
      const provider = getUser().id
      const result = await createProductService(provider, formData, config)
      dispatch({ type: TYPES.PRODUCT_CREATE, data: result.data })
      toastr.success('Produto', 'Produto cadastrado com sucesso')
      dispatch(getProduct())
    } catch (error) {
      toastr.error('Produto', 'ocorreu um erro ao realizar a operação!')
    }
  }
}

export const updateProduct = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: function (progressEvent) {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        dispatch({
          type: TYPES.PRODUCT_UPLOAD,
          upload: {
            finish: percent === 100,
            percent: percent
          }
        })
      }
    }
    try {
      const formData = new FormData()
      Object.keys(data).map((k) => formData.append(k, data[k]))
      const productId = data.id
      const providerId = getUser().id
      const result = await updateProductService(
        providerId,
        productId,
        formData,
        config
      )
      dispatch({ type: TYPES.PRODUCT_UPDATE, data: result.data })
      toastr.success('Produto', 'Produto atualizado com sucesso')
      dispatch(getProduct())
    } catch (error) {
      toastr.error('Produto', 'ocorreu um erro ao realizar a operação!')
    }
  }
}

export const removeProduct = (productId) => {
  return async (dispatch) => {
    try {
      const providerId = getUser().id
      const result = await deleteProductService(providerId, productId)
      dispatch({ type: TYPES.PRODUCT_REMOVE, data: result.data })
      toastr.success('Produto', 'removido com sucesso')
      dispatch(getProduct())
    } catch (error) {
      toastr.error('Produto', 'ocorreu um erro ao realizar a operação!')
    }
  }
}

export const editProduct = (productId) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.PRODUCT_UPLOAD,
      upload: 0
    })
    try {
      const providerId = getUser().id
      const result = await listProductByIdService(providerId, productId)
      dispatch({ type: TYPES.PRODUCT_EDIT, data: result.data.data })
    } catch (error) {
      toastr.error('Produto', 'ocorreu um erro ao realizar a operação!')
    }
  }
}
