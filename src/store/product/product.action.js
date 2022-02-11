import {
  listProductService,
  listProductByIdService,
  deleteProductService,
  createProductService,
  updateProductService
} from '~/services/product.service'

import TYPES from '~/store/types'
import { toastr } from 'react-redux-toastr'
import { getUser } from '~/config/storage'

export const getAllProducts = (filter = '') => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.PRODUCT_LOADING, status: true })
      const result = await listProductService(filter)
      console.log(result.data.data)
      dispatch({ type: TYPES.PRODUCT_ALL, data: result.data.data })
    } catch (error) {
      toastr.error('aconteceu um erro', error)
    }
  }
}

export const createProduct = (data) => {
  return async (dispatch, getState) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: function (progressEvent) {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        dispatch({
          type: TYPES.PRODUTO_UPLOAD,
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
      const result = await createProductService(formData)
      dispatch({ type: TYPES.PRODUCT_UPLOAD, data: result.data })
      toastr.success('Produto', 'Produto cadastrado com sucesso')
      dispatch(getAllProducts())
    } catch (error) {
      toastr.error('Produto', 'deu ruim')
    }
  }
}

export const updateProduct = (data) => {
  return async (dispatch, getState) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: function (progressEvent) {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        dispatch({
          type: TYPES.PRODUTO_UPLOAD,
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
      const result = await updateProductService(productId, formData)

      dispatch({ type: TYPES.PRODUCT_UPDATE, data: result.data })
      toastr.success('Produto', 'Produto cadastrado com sucesso')

      dispatch(getAllProducts())
    } catch (error) {
      toastr.error('Produto', 'ocorreu um erro!')
    }
  }
}

export const removeProduct = (productId) => {
  return async (dispatch) => {
    try {
      const providerId = getUser().id
      const result = await deleteProductService(providerId, productId)
      dispatch({ type: TYPES.PRODUCT_REMOVE, data: result.data })
      toastr.success('Produto', 'Removido com sucesso')
      dispatch(getAllProducts())
    } catch (error) {
      toastr.error('Produto', error.toString())
    }
  }
}

export const editProduct = (id) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.PRODUCT_UPLOAD,
      upload: 0
    })
    try {
      const result = await listProductByIdService(id)
      dispatch({ type: TYPES.PRODUCT_EDIT, data: result.data.data.data })
    } catch (error) {
      toastr.error('Aconteceu um erro', error)
    }
  }
}
