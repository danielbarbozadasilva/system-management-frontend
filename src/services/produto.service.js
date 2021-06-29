// import http from '~/config/http'

// const baseUrl = '/produto'

// export const remove = (id) => http.delete(`${baseUrl}/${id}`)

// export const create = (fornecedorId, data, config = {}) =>
//   http.post(`fornecedor/${fornecedorId}/produto`, data, config)

// export const getAllProdutoCategoria = (id) =>
//   http.get(`/categoria/advanced/${id}`)

// export const getCategoryProduct = (id, nameFilter) =>
//   http.get(`/categoria/${id}/produto`)

import http from '~/config/http'
import { parsedToQuery } from '~/util/helpers'

const baseUrl = '/produto'

const transformarURL = (objeto) => {
  let urlQuery = ''
  if (objeto) {
    if (objeto.nomeLike) {
      urlQuery += '?nomeLike=' + objeto.nomeLike
    }
    if (objeto.categoria) {
      urlQuery += '?categoria=' + objeto.categoria
    }
    if (objeto.fornecedor) {
      urlQuery += '?fornecedor=' + objeto.fornecedor
    }
  }
  return urlQuery
}

export const getAll = (objeto) => {
  return http.get(`${baseUrl}${transformarURL(objeto)}`)
}

// export const getAll = (query) => {
//   const q = query ? parsedToQuery(query) : ''
//   return http.get(`${baseUrl}?${q}`)
// }

export const remove = (id) => http.delete(`${baseUrl}/${id}`)

export const create = (fornecedorId, data, config = {}) =>
  http.post(`fornecedor/${fornecedorId}/produto`, data, config)
