import http from '~/config/http'

const baseUrl = '/produto'

const transformarURL = (objeto) => {
  let urlQuery = ''
  if (objeto) {
    console.log(objeto)
    if (objeto.nomeLike) {
      urlQuery += '?nomeLike=' + objeto.nomeLike
    } else if (objeto) {
      urlQuery += '?fornecedor=' + objeto
    } else {
      urlQuery += '?categoria=' + objeto
    }
  }
  return urlQuery
}

export const getProductById = (id) => http.get(`${baseUrl}/${id}`)

export const getAll = (objeto) => {
  return http.get(`${baseUrl}${transformarURL(objeto)}`)
}

export const remove = (id) => http.delete(`${baseUrl}/${id}`)

export const create = (fornecedorId, data, config = {}) =>
  http.post(`fornecedor/${fornecedorId}/produto`, data, config)

export const updateProd = (id, data, config = {}) =>
  http.put(`produto/${id}`, data, config)
