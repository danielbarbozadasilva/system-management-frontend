import http from '~/config/http'
const baseUrl = '/provider'

export const listAllProviderService = (namefilter) =>
  http.get(`${baseUrl}/filter/${namefilter}`)

export const listProviderByIdService = (providerid) =>
  http.get(`${baseUrl}/${providerid}`)

export const createProviderService = (data) => http.post(baseUrl, data)

export const updateProviderService = (providerid, data, config = {}) =>
  http.put(`${baseUrl}/${providerid}`, data, config)

export const removeProviderService = (providerid) =>
  http.delete(`${baseUrl}/${providerid}`)

export const listProvidersByLocationService = (uf, city) =>
  http.get(`${baseUrl}/filter/uf/${uf}/city/${city}`)

export const changeStatusService = (providerid, status) =>
  http.put(`${baseUrl}/${providerid}/status/${status}`)

export const searchLikeProviderProductService = (providerid) =>
  http.get(`${baseUrl}/${providerid}/like`)

export const createLikeProductService = (providerid, productid) =>
  http.post(`${baseUrl}/${providerid}/product/${productid}/like`)

export const removeLikeProviderProductService = (providerid, productid) =>
  http.delete(`${baseUrl}/${providerid}/product/${productid}/like`)
