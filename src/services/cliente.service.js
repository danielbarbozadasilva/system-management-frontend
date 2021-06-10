import http from '~/config/http'

const baseUrl = '/cliente'

export const getAll = () => http.get(baseUrl)

export const getbyId = (id) => http.get(`${baseUrl}/${id}`)

export const update = (id, data, config = {}) =>
  http.put(`${baseUrl}/${id}`, data, config)

export const remove = (id) => http.delete(`${baseUrl}/${id}`)

export const create = (data, config = {}) => http.post(baseUrl, data, config)

export const ativarCliente = (id) => http.put(`${baseUrl}/${id}/ativa`)

export const inativaCliente = (id) => http.put(`${baseUrl}/${id}/inativa`)
