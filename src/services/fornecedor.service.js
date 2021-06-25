import http from '~/config/http'

const baseUrl = '/fornecedor'

export const getAll = () => http.get(baseUrl)

export const getbyId = (id) => http.get(`${baseUrl}/${id}`)

export const update = (id, data, config = {}) =>
  http.put(`${baseUrl}/${id}`, data, config)

export const remove = (id) => http.delete(`${baseUrl}/${id}`)

export const create = (data) => http.post(baseUrl, data)

export const ativarFornecedor = (id) => http.put(`${baseUrl}/${id}/ativa`)

export const inativaFornecedor = (id) => http.put(`${baseUrl}/${id}/inativa`)

export const obterListadeProduto = (id) => http.get(`${baseUrl}/${id}/produto`)
