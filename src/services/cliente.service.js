import http from '~/config/http'

const baseUrl = '/cliente'

export const getAll = () => http.get(baseUrl)

export const getById = (id) => http.get(`${baseUrl}/${id}`)

export const create = (data) => http.post(baseUrl, data)
