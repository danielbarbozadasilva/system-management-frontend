import {
  create as createProduto,
  getAll as getAllProduto,
  getProductById,
  updateProd
} from '~/services/produto.service'
import TYPES from '~/store/types'
import { toastr } from 'react-redux-toastr'
import { removeProduto } from '~/services/fornecedor.service'
import { getUser } from '~/config/storage'

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

      const fornecedorId = getState().auth.usuario.id
      const result = await createProduto(fornecedorId, formData, config)

      dispatch({ type: TYPES.PRODUTO_CREATE, data: result.data })
      toastr.success('Produto', 'Produto cadastrado com sucesso')

      dispatch(getAll())
    } catch (error) {
      toastr.error('Produto', 'ocorreu um erro!')
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

      const prod = data.id
      const result = await updateProd(prod, formData, config)

      dispatch({ type: TYPES.PRODUTO_UPLOAD, data: result.data })
      toastr.success('Produto', 'Produto cadastrado com sucesso')

      dispatch(getAll())
      
    } catch (error) {
      toastr.error('Produto', 'ocorreu um erro!')
    }
  }
}


export const getAll = (query = null) => {
  return async (dispatch) => {
    try {
    
      dispatch({ type: TYPES.PRODUTO_LOADING, status: true })
      const result = await getAllProduto(query)
      
      dispatch({ type: TYPES.PRODUTO_ALL, data: result.data.data })
    } catch (error) {
      toastr.error('aconteceu um erro', error)
    }
  }
}

export const remove = (idProd) => {
  return async (dispatch) => {
    try {
      const id = getUser().id
      const result = await removeProduto(id, idProd)
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
      const result = await getProductById(id)
      console.log(result)
      dispatch({ type: TYPES.PRODUTO_EDIT, data: result.data.data.data })
    } catch (error) {
      toastr.error('Aconteceu um erro', error)
    }
  }
}


export const getProducts = (id, nameFilter) => {
  return async (dispatch) => {
    try {
      const params = { [nameFilter]: id }
      dispatch({ type: TYPES.PRODUTO_LOADING, status: true })
      const result = await getAllProduto(params)
      if (result.data.data.length === 0) {
        toastr.info('Nenhum produto cadastrado!')
      }
      dispatch({ type: TYPES.PRODUTO_ALL_FILTER, data: result.data.data })
    } catch (error) {}
  }
}
