import {
  create as clienteCreate,
  getAll as getAllcliente,
  getbyId as getclienteById,
  update as updatecliente,
  remove as removecliente
} from '~/services/cliente.service'
import TYPES from '~/store/types'
import { toastr } from 'react-redux-toastr'
import { navigate } from '@reach/router'

export const create = (data) => {
  return async (dispatch) => {
    try {
      const result = await clienteCreate(data)
      toastr.success('cliente', 'cliente cadastrada com sucesso')
      navigate('/signin')
    } catch (error) {
      toastr.error('cliente', 'deu ruim')
    }
    console.log('disparar...', data)
  }
}

export const edit = (id) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.CLIENTE_UPLOAD,
      upload: 0
    })
    try {
      const result = await getclienteById(id)
      dispatch({ type: TYPES.CLIENTE_EDIT, data: result.data })
    } catch (error) {
      toastr.error('aconteceu um erro', error)
    }
  }
}

export const getAll = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.CLIENTE_LOADING, status: true })
      const result = await getAllcliente()
      dispatch({ type: TYPES.CLIENTE_ALL, data: result.data.data })
    } catch (error) {
      toastr.error('aconteceu um erro', error)
    }
  }
}

export const update = ({ id, ...data }) => {
  return (dispatch) => {
    dispatch({ type: TYPES.CLIENTE_LOADING, status: true })
    dispatch({
      type: TYPES.CLIENTE_UPLOAD,
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
          type: TYPES.CLIENTE_UPLOAD,
          upload: percentCompleted
        })
      }
    }

    const formData = new FormData()
    Object.keys(data).map((k) => formData.append(k, data[k]))
    updatecliente(id, formData, config)
      .then((result) => {
        dispatch(edit(id))
        dispatch(getAll())
        toastr.success('cliente', 'cliente atualizada com sucesso')
        dispatch({ type: TYPES.CLIENTE_UPDATE })
      })
      .catch((error) => {
        dispatch({ type: TYPES.CLIENTEROR, data: error })
        toastr.error('cliente', error.toString())
      })
  }
}

export const remove = (id) => {
  return async (dispatch) => {
    try {
      const result = await removecliente(id)
      dispatch({ type: TYPES.CLIENTE_EDIT, data: result.data })
      toastr.success('cliente', 'Removido com sucesso')
      dispatch(getAll())
    } catch (error) {
      toastr.error('aconteceu um erro', error)
      toastr.error('cliente', error.toString())
    }
  }
}

// export const setStatuscliente = (id, ativo) => {
//   console.log('cliente mudar status', ativo)
//   return async (dispatch, getState) => {
//     let result
//     try {
//       if (ativo) {
//         result = await inativacliente(id)
//         toastr.success(
//           `cliente ${result.data.data.nomeFantasia}`,
//           'Desativado com sucesso'
//         )
//       } else {
//         result = await ativarcliente(id)
//         toastr.success(
//           `cliente ${result.data.data.nomeFantasia}`,
//           'Ativado com sucesso'
//         )
//       }
//       const all = getState().cliente.all
//       const index = all.findIndex((item) => item.id === id)
//       all[index].status = result.data.data.status

//       dispatch({ type: TYPES.CLIENTE_ALL, data: [...all] })
//     } catch (err) {
//       console.log('###', err)
//     }
