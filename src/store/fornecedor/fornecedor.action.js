import {
  ServiceListAllProvider,
  ServiceListProviderById,
  ServiceCreateProvider,
  ServiceUpdateProvider,
  ServiceRemoveProvider,
  ServiceListProvidersByLocation,
  ServiceChangeStatus,
  ServiceSearchLikeProviderProduct,
  ServiceCreateLikeProviderProduct,
  ServiceRemoveLikeProviderProduct
} from '~/services/provider.service'
import TYPES from '~/store/types'
import { toastr } from 'react-redux-toastr'
import { navigate } from '@reach/router'

export const getAllProviders = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.FORNECEDOR_LOADING, status: true })
      const result = await ServiceListAllProvider()
      dispatch({ type: TYPES.FORNECEDOR_ALL, data: result.data.data })
    } catch (error) {
      toastr.error('aconteceu um erro', error)
    }
  }
}

export const getFornById = id => {
  return async dispatch => {
    try {
      const result = await ServiceListProviderById(id)
      dispatch({ type: TYPES.FORNECEDOR_PRODUTOS_ID, data: result.data })
    } catch (error) {
      toastr.error('Fornecedor', 'Erro ao carregar produtos')
    }
  }
}

export const create = data => {
  return async dispatch => {
    try {
      const result = await ServiceCreateProvider(data)
      toastr.success('Fornecedor', 'Fornecedor cadastrado com sucesso!')
      navigate('/signin')
    } catch (error) {
      toastr.error('Fornecedor', 'Preencha todos os campos!')
    }
  }
}
export const edit = id => {
  return async dispatch => {
    dispatch({
      type: TYPES.FORNECEDOR_UPLOAD,
      upload: 0
    })
    try {
      const result = await ServiceUpdateProvider(id)
      dispatch({ type: TYPES.FORNECEDOR_EDIT, data: result.data })
    } catch (error) {
      toastr.error('aconteceu um erro', error)
    }
  }
}

export const update = ({ id, ...data }) => {
  return dispatch => {
    dispatch({ type: TYPES.FORNECEDOR_LOADING, status: true })
    dispatch({
      type: TYPES.FORNECEDOR_UPLOAD,
      upload: 0
    })
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: function(progressEvent) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        dispatch({
          type: TYPES.FORNECEDOR_UPLOAD,
          upload: percentCompleted
        })
      }
    }

    const formData = new FormData()
    Object.keys(data).map(k => formData.append(k, data[k]))
    updateFornecedor(id, formData, config)
      .then(result => {
        dispatch(edit(id))
        dispatch(getAll())
        toastr.success('Fornecedor', 'Fornecedor atualizada com sucesso')
        dispatch({ type: TYPES.FORNECEDOR_UPDATE })
      })
      .catch(error => {
        dispatch({ type: TYPES.SIGN_ERROR, data: error })
        toastr.error('Fornecedor', error.toString())
      })
  }
}

export const excluirFornecedor = id => {
  return async dispatch => {
    try {
      const result = await ServiceRemoveProvider(id)
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
  return async (dispatch, getState) => {
    let result
    try {
      if (ativo) {
        result = await ServiceChangeStatus(id, 'ENABLE')
        toastr.success(
          `Fornecedor ${result.data.data.nomeFantasia}`,
          'Desativado com sucesso'
        )
      } else {
        result = await ServiceChangeStatus(id, 'DISABLE')
        toastr.success(
          `Fornecedor ${result.data.data.nomeFantasia}`,
          'Ativado com sucesso'
        )
      }
      const all = getState().fornecedor.all
      const index = all.findIndex(item => item.id === id)
      all[index].status = result.data.data.status

      dispatch({ type: TYPES.FORNECEDOR_ALL, data: [...all] })
    } catch (err) {}
  }
}

export const obterProduto = id => {
  return async dispatch => {
    try {
      dispatch({ type: TYPES.FORNECEDOR_LOADING, status: true })
      const result = await ServiceListProviderById(id)
      dispatch({ type: TYPES.FORNECEDOR_ALL, data: result.data.data })
    } catch (error) {
      toastr.error('Fornecedor', 'Erro ao carregar produtos')
    }
  }
}

export const getAllCurtidasFornecedor = () => {
  return async (dispatch, getState) => {
    const {
      auth: {
        usuario: { id: clienteId }
      }
    } = getState()

    try {
      dispatch({ type: TYPES.FORNECEDOR_LOADING, status: true })
      const result = await ServiceSearchLikeProviderProduct(clienteId)
      dispatch({
        type: TYPES.FORNECEDOR_CURTIDA_ALL,
        data: result.data.data.data
      })
    } catch (error) {}
    return false
  }
}

export const likeProduto = ({ nome, fornecedorId }) => {
  return async dispatch => {
    try {
      const result = await ServiceCreateLikeProviderProduct(fornecedorId)
      toastr.success('Curtida', `o Produto ${nome} curtido com sucesso.`)
    } catch (error) {
      toastr.error('Curtida', 'Erro ao fazer curtida')
    }
  }
}

export const getFornPesquisarUfCidade = (data) => {
  return async dispatch => {
    try {
      dispatch({ type: TYPES.FORNECEDOR_LOADING, status: true })
      const result = await ServiceListProvidersByLocation(data)

      dispatch({ type: TYPES.FORNECEDOR_ALL, data: result.data.data })
    } catch (error) {
      toastr.error('Aconteceu um erro', error)
    }
  }
}
