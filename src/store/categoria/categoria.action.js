import {
  categoryCreate,
  getAllCategories,
  getCategoryById,
  updateCategory,
  removeCategory
} from '~/services/categoria.service'
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
          type: TYPES.CATEGORY_UPLOAD,
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
      const result = await categoryCreate(formData, config)
      dispatch({ type: TYPES.CATEGORY_CREATE, data: result.data })
      toastr.success('Categoria', 'Categoria cadastrada com sucesso')
      dispatch(getAll())
    } catch (error) {
      toastr.error('Categoria', 'deu ruim')
    }
    console.log('disparar...', data)
  }
}

export const edit = (id) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.CATEGORY_UPLOAD,
      upload: 0
    })
    try {
      const result = await getCategoryById(id)
      dispatch({ type: TYPES.CATEGORY_EDIT, data: result.data })
    } catch (error) {
      toastr.error('aconteceu um erro', error)
    }
  }
}
export const getAll = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.CATEGORY_LOADING, status: true })
      const result = await getAllCategories()
      dispatch({ type: TYPES.CATEGORY_ALL, data: result.data.data })
    } catch (error) {
      toastr.error('aconteceu um erro', error)
    }
  }
}

export const update = ({ id, ...data }) => {
  return (dispatch) => {
    dispatch({ type: TYPES.CATEGORY_LOADING, status: true })
    dispatch({
      type: TYPES.CATEGORY_UPLOAD,
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
          type: TYPES.CATEGORY_UPLOAD,
          upload: percentCompleted
        })
      }
    }

    const formData = new FormData()
    Object.keys(data).map((k) => formData.append(k, data[k]))
    updateCategory(id, formData, config)
      .then((result) => {
        dispatch(edit(id))
        dispatch(getAll())
        toastr.success('Categoria', 'Categoria atualizada com sucesso')
        return true
      })
      .catch((error) => {
        dispatch({ type: TYPES.CATEGORY_LOADING, status: false })
        dispatch({ type: TYPES.SIGN_ERROR, data: error })
        toastr.error('Categoria', error.toString())
      })
      .finally(() => {
        dispatch({ type: TYPES.CATEGORY_LOADING, status: false })
      })
  }
}
export const remove = (id) => {
  return async (dispatch) => {
    try {
      const result = await removeCategory(id)
      dispatch({ type: TYPES.CATEGORY_EDIT, data: result.data })
      toastr.success('Categoria', 'Removido com sucesso')
      dispatch(getAll())
    } catch (error) {
      toastr.error('aconteceu um erro', error)
      toastr.error('Categoria', error.toString())
    }
  }
}
