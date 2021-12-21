import http from '~/config/http'
const baseUrl = '/product'

export const ServiceSearchProduct = filter => {
  return http.get(baseUrl, filter)
}
export const ServiceListProductById = productid =>
  http.get(`${baseUrl}/${productid}`)

export const ServiceCreateProduct = (providerid, data) =>
  http.post(`provider/${providerid}/product`, data)

export const ServiceDeleteProduct = productid =>
  http.delete(`${baseUrl}/${productid}`)

export const ServiceUpdateProduct = (providerid, productid, data) =>
  http.put(`${baseUrl}/${providerid}/product/${productid}`, data)
