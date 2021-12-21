import http from '~/config/http'
const baseUrl = '/provider'

export const ServiceListAllProvider = (like, alphabetical) =>
  http.get(`${baseUrl}/filterorder/${like}/${alphabetical}`)

export const ServiceListProviderById = providerid =>
  http.get(`${baseUrl}/${providerid}`)

export const ServiceCreateProvider = data => http.post(baseUrl, data)

export const ServiceUpdateProvider = (providerid, data) =>
  http.put(`${baseUrl}/${providerid}`, data)

export const ServiceRemoveProvider = providerid =>
  http.delete(`${baseUrl}/${providerid}`)

export const ServiceListProvidersByLocation = data =>
  http.get(
    `${baseUrl}/filter?uf=${data.uf}&city=${data.city ? data.city : 'x'}`
  )

export const ServiceChangeStatus = (providerid, data) =>
  http.put(`${baseUrl}/${providerid}`, data)

export const ServiceSearchLikeProviderProduct = providerid =>
  http.get(`${baseUrl}/${providerid}/product`)

export const ServiceCreateLikeProviderProduct = (providerid, productid) =>
  http.post(`${baseUrl}/${providerid}/product/${productid}/like`)

export const ServiceRemoveLikeProviderProduct = (providerid, productid) =>
  http.delete(`${baseUrl}/${providerid}/product/${productid}/like`)
