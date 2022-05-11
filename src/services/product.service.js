import http from '~/config/http'
const baseUrl = '/product'

export const listProductService = () => http.get(`${baseUrl}`)

export const listProductWithFilterService = (name, filter) =>
  http.get(`${baseUrl}?name=${name}&filter=${filter}`)

export const listProductByIdService = (productid) =>
  http.get(`${baseUrl}/${productid}`)

export const createProductService = (providerid, data) =>
  http.post(`provider/${providerid}/product`, data)

export const deleteProductService = (providerid, productid) =>
  http.delete(`provider/${providerid}/product/${productid}`)

export const updateProductService = (providerid, productid, data, config) =>
  http.put(`/provider/${providerid}/product/${productid}`, data, config)
