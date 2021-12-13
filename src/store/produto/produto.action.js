import {
  ServiceSearchProduct,
  ServiceListProductById,
  ServiceDeleteProduct,
  ServiceCreateProduct,
  ServiceUpdateProduct
} from '~/services/product.service'
import TYPES from '~/store/types'
import { toastr } from 'react-redux-toastr'
import { getUser } from '~/config/storage'

export const getAllProducts = (filter) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.PRODUTO_LOADING, status: true })
      const result = await ServiceSearchProduct(filter)

      dispatch({ type: TYPES.PRODUTO_ALL, data: result.data.data })
    } catch (error) {
      toastr.error('aconteceu um erro', error)
    }
  }
}

export const create = (data) => {
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
      const provider_id = getState().auth.usuario.id
      const result = await ServiceCreateProduct(provider_id, formData, config)
      dispatch({ type: TYPES.PRODUTO_UPLOAD, data: result.data })
      toastr.success('Produto', 'Produto cadastrado com sucesso')
      dispatch(getAll())
    } catch (error) {
      toastr.error('Produto', 'deu ruim')
    }
  }
}

export const updateProduto = (data) => {
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

      const product_id = data.id
      const result = await ServiceUpdateProduct(product_id, formData, config)

      dispatch({ type: TYPES.PRODUTO_UPLOAD, data: result.data })
      toastr.success('Produto', 'Produto cadastrado com sucesso')

      dispatch(getAll())
    } catch (error) {
      toastr.error('Produto', 'ocorreu um erro!')
    }
  }
}

export const remove = (idProd) => {
  return async (dispatch) => {
    try {
      const id = getUser().id
      const result = await ServiceDeleteProduct(id, idProd)
      dispatch({ type: TYPES.PRODUTO_REMOVE, data: result.data })
      toastr.success('Produto', 'Removido com sucesso')
      dispatch(getAll())
    } catch (error) {
      toastr.error('Produto', error.toString())
    }
  }
}

export const editProd = (id) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.PRODUTO_UPLOAD,
      upload: 0
    })
    try {
      const result = await ServiceListProductById(id)
      dispatch({ type: TYPES.PRODUTO_EDIT, data: result.data.data.data })
    } catch (error) {
      toastr.error('Aconteceu um erro', error)
    }
  }
}
