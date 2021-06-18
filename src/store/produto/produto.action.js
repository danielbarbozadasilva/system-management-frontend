import {
  create as createProduto,
  getAll as getAllProduto,
  remove as removeProduto,
  getAllProdutoCategoria
} from '~/services/produto.service'
import TYPES from '~/store/types'
import { toastr } from 'react-redux-toastr'

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
      toastr.error('Produto', 'deu ruim')
    }
  }
}
export const getAll = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.PRODUTO_LOADING, status: true })
      const result = await getAllProduto()
      dispatch({ type: TYPES.PRODUTO_ALL, data: result.data.data })
    } catch (error) {
      toastr.error('aconteceu um erro', error)
    }
  }
}

export const getProdutoPorCategoria = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.PRODUTO_LOADING, status: true })
      const result = await getAllProdutoCategoria(id)
      dispatch({ type: TYPES.PRODUTO_ALL, data: result.data })
    } catch (error) {
      toastr.error('aconteceu um erro', error)
    }
  }
}

export const remove = (id) => {
  return async (dispatch) => {
    try {
      const result = await removeProduto(id)
      dispatch({ type: TYPES.PRODUTO_EDIT, data: result.data })
      toastr.success('Categoria', 'Removido com sucesso')
      dispatch(getAll())
    } catch (error) {
      toastr.error('aconteceu um erro', error)
      toastr.error('Categoria', error.toString())
    }
  }
}
