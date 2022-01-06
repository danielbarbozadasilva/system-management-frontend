import http from '~/config/http'
const baseUrl = '/product'

export const listProductService = (filter) => {
  return http.get(baseUrl, filter)
}
export const listProductByIdService = (productid) =>
  http.get(`${baseUrl}/${productid}`)

export const createProductService = (providerid, data) =>
  http.post(`provider/${providerid}/product`, data)

export const deleteProductService = (productid) =>
  http.delete(`${baseUrl}/${productid}`)

export const updateProductService = (providerid, productid, data) =>
  http.put(`${baseUrl}/${providerid}/product/${productid}`, data)
