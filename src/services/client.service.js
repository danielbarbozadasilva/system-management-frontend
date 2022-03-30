import http from '~/config/http'
const baseUrl = '/client'

export const listAllClientService = () => http.get(baseUrl)

export const listByIdClientService = (id) => http.get(`${baseUrl}/${id}`)

export const listLikeByIdClientService = (id) => http.get(`${baseUrl}/${id}/like`)

export const createClientService = (data) => http.post(baseUrl, data)
