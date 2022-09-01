import http from '~/config/http'
const baseUrl = '/client'

export const listAllClientService = () => http.get(baseUrl)

export const listByIdClientService = (clientId) =>
  http.get(`${baseUrl}/${clientId}`)

export const listLikeByIdClientService = (clientId) =>
  http.get(`${baseUrl}/${clientId}/like`)

export const createClientService = (data) => http.post(baseUrl, data)

export const createLikeProviderService = (providerId, clientId) =>
  http.post(`${baseUrl}/${clientId}/provider/${providerId}/like`)

export const removeLikeProviderService = (providerId, clientId) =>
  http.delete(`${baseUrl}/${clientId}/provider/${providerId}/like`)
