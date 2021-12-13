import {
  ServiceSearchAllCategory,
  ServiceSearchCategoryById,
  ServiceInsertCategory,
  ServiceUpdateCategory,
  ServiceRemoveCategoryProducts
} from '~/services/category.service'
import TYPES from '~/store/types'
import { toastr } from 'react-redux-toastr'

export const getAllCategories = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.CATEGORY_LOADING, status: true })
      const result = await ServiceSearchAllCategory()
      console.log(JSON.stringify(result))
      dispatch({ type: TYPES.CATEGORY_ALL, data: result.data.data })
    } catch (error) {
      toastr.error('aconteceu um erro', error)
    }
  }
}

export const getCategoriaById = (id) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.CATEGORY_ID
    })
    try {
      const result = await ServiceSearchCategoryById(id)
      dispatch({ type: TYPES.CATEGORY_ID, data: result.data })
    } catch (error) {
      toastr.error('aconteceu um erro', error)
    }
  }
}

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
      const result = await ServiceInsertCategory(formData, config)
      dispatch({ type: TYPES.CATEGORY_CREATE, data: result.data })
      toastr.success('Categoria', 'Categoria cadastrada com sucesso!')
      dispatch(getAll())
    } catch (error) {
      toastr.error('Categoria', 'Preencha todos os campos!')
    }
  }
}

export const edit = (id, formData) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.CATEGORY_UPLOAD,
      upload: 0
    })
    try {
      const result = await ServiceUpdateCategory(id, formData)
      dispatch({ type: TYPES.CATEGORY_EDIT, data: result.data })
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
        dispatch(edit(id, formData))
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
      const result = await ServiceRemoveCategoryProducts(id)
      dispatch({ type: TYPES.CATEGORY_EDIT, data: result.data })
      toastr.success('Categoria', 'Removido com sucesso')
      dispatch(getAll())
    } catch (error) {
      toastr.error('aconteceu um erro', error)
      toastr.error('Categoria', error.toString())
    }
  }
}
