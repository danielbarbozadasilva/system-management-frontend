import http from '~/config/http'

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

export const remove = (id) => http.delete(`${baseUrl}/${id}`)

export const create = (fornecedorId, data, config = {}) =>
  http.post(`fornecedor/${fornecedorId}/produto`, data, config)

export const getAllProdutoCategoria = (id) =>
  http.get(`/categoria/advanced/${id}`)
export const getCategoryProduct = (id, nameFilter) =>
  http.get(`/categoria/${id}/produto`)
