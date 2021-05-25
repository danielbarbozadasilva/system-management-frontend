import { categoryCreate } from '~/services/categoria.service'
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
    } catch (error) {
      toastr.error('Categoria', 'deu ruim')
    }
    console.log('disparar...', data)
  }
}
