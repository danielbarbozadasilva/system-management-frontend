import {
  listAllCategoryService,
  listCategoryByIdService,
  listCategoryByIdProductService,
  insertCategoryService,
  updateCategoryService,
  removeCategoryProductService
} from '~/services/category.service'
import TYPES from '~/store/types'
import { toastr } from 'react-redux-toastr'

export const getAllCategories = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.CATEGORY_LOADING, status: true })
      const result = await listAllCategoryService()
      dispatch({ type: TYPES.CATEGORY_ALL, data: result.data.data })
    } catch (error) {}
  }
}

export const getCategoryByProductId = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.CATEGORY_LOADING, status: true })
      const result = await listCategoryByIdProductService(id)
      dispatch({ type: TYPES.PRODUCT_WITH_FILTER, data: result.data.data })
    } catch (error) {}
  }
}

export const createCategory = (data) => {
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
      const result = await insertCategoryService(formData, config)
      dispatch({ type: TYPES.CATEGORY_CREATE, data: result.data })
      toastr.success('Categoria', 'cadastrada com sucesso!')
      dispatch(getAllCategories())
    } catch (error) {
      toastr.error('Categoria', 'ocorreu um erro ao realizar a operação!')
    }
  }
}

export const editCategory = (id) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.CATEGORY_UPLOAD,
      upload: 0
    })
    try {
      const result = await listCategoryByIdService(id)
      dispatch({ type: TYPES.CATEGORY_EDIT, data: result.data.data })
    } catch (error) {}
  }
}

export const updateCategory = ({ id, ...data }) => {
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
    updateCategoryService(id, formData, config)
      .then((result) => {
        dispatch(editCategory(id, formData))
        dispatch(getAllCategories())
        toastr.success('Categoria', 'atualizada com sucesso')
        return true
      })
      .catch((error) => {
        dispatch({ type: TYPES.CATEGORY_LOADING, status: false })
        dispatch({ type: TYPES.SIGN_ERROR, data: error })
        toastr.error('Categoria', 'ocorreu um erro ao realizar a operação!')
      })
      .finally(() => {
        dispatch({ type: TYPES.CATEGORY_LOADING, status: false })
      })
  }
}

export const removeCategory = (id) => {
  return async (dispatch) => {
    try {
      const result = await removeCategoryProductService(id)
      dispatch({ type: TYPES.CATEGORY_REMOVE, data: result.data })
      toastr.success('Categoria', 'removida com sucesso')
      dispatch(getAllCategories())
    } catch (error) {
      toastr.error('Categoria', 'ocorreu um erro ao realizar a operação!')
    }
  }
}
