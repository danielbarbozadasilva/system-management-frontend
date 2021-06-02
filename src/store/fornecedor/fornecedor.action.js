import {
  create as FornecedorCreate,
  getAll as getAllFornecedor,
  getbyId as getFornecedorById,
  update as updateFornecedor,
  remove as removeFornecedor,
  ativarFornecedor,
  inativaFornecedor
} from '~/services/fornecedor.service'
import TYPES from '~/store/types'
import { toastr } from 'react-redux-toastr'

export const create = (data) => {
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
          type: TYPES.FORNECEDOR_UPLOAD,
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
      const result = await FornecedorCreate(formData, config)
      dispatch({ type: TYPES.FORNECEDOR_CREATE, data: result.data })
      toastr.success('Fornecedor', 'Fornecedor cadastrada com sucesso')
      dispatch(getAll())
    } catch (error) {
      toastr.error('Fornecedor', 'deu ruim')
    }
    console.log('disparar...', data)
  }
}
export const edit = (id) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.FORNECEDOR_UPLOAD,
      upload: 0
    })
    try {
      const result = await getFornecedorById(id)
      dispatch({ type: TYPES.FORNECEDOR_EDIT, data: result.data })
    } catch (error) {
      toastr.error('aconteceu um erro', error)
    }
  }
}
export const getAll = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.FORNECEDOR_LOADING, status: true })
      const result = await getAllFornecedor()
      dispatch({ type: TYPES.FORNECEDOR_ALL, data: result.data.data })
    } catch (error) {
      toastr.error('aconteceu um erro', error)
    }
  }
}
export const update = ({ id, ...data }) => {
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
        console.log('percentCompleted', percentCompleted)

        dispatch({
          type: TYPES.FORNECEDOR_UPLOAD,
          upload: percentCompleted
        })
      }
    }

    const formData = new FormData()
    Object.keys(data).map((k) => formData.append(k, data[k]))
    updateFornecedor(id, formData, config)
      .then((result) => {
        dispatch(edit(id))
        dispatch(getAll())
        toastr.success('Fornecedor', 'Fornecedor atualizada com sucesso')
        dispatch({ type: TYPES.FORNECEDOR_UPDATE })
      })
      .catch((error) => {
        dispatch({ type: TYPES.SIGN_ERROR, data: error })
        toastr.error('Fornecedor', error.toString())
      })
  }
}
export const remove = (id) => {
  return async (dispatch) => {
    try {
      const result = await removeFornecedor(id)
      dispatch({ type: TYPES.FORNECEDOR_EDIT, data: result.data })
      toastr.success('Fornecedor', 'Removido com sucesso')
      dispatch(getAll())
    } catch (error) {
      toastr.error('aconteceu um erro', error)
      toastr.error('Fornecedor', error.toString())
    }
  }
}

export const setStatusFornecedor = (id, ativo) => {
  console.log('fornecedor mudar status', ativo)
  return async (dispatch, getState) => {
    let result
    try {
      if (ativo) {
        result = await inativaFornecedor(id)
        toastr.success(
          `Fornecedor ${result.data.data.nomeFantasia}`,
          'Desativado com sucesso'
        )
      } else {
        result = await ativarFornecedor(id)
        toastr.success(
          `Fornecedor ${result.data.data.nomeFantasia}`,
          'Ativado com sucesso'
        )
      }
      const all = getState().fornecedor.all
      const index = all.findIndex((item) => item.id === id)
      all[index].status = result.data.data.status

      dispatch({ type: TYPES.FORNECEDOR_ALL, data: [...all] })
    } catch (err) {
      console.log('###', err)
    }
  }
}
