import http from '~/config/http'
const baseUrl = '/client'

export const listAllClientService = () => http.get(baseUrl)

export const listByIdClientService = (id) => http.get(`${baseUrl}/${id}`)

export const listLikeByIdClientService = (id) =>
  http.get(`${baseUrl}/${id}/like`)

export const createClientService = (data) => http.post(baseUrl, data)

export const createLikeProviderService = (providerid, clientid) =>
  http.post(`${baseUrl}/${clientid}/provider/${providerid}/like`)

export const removeLikeProviderService = (providerid, clientid) =>
  http.delete(`${baseUrl}/${clientid}/provider/${providerid}/like`)
