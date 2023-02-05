import http from '~/config/http'
const baseUrl = '/category'

export const listAllCategoryService = () => http.get(baseUrl)

export const listCategoryByIdService = (id) => http.get(`${baseUrl}/${id}`)

export const listCategoryByIdProductService = (id) =>
  http.get(`${baseUrl}/${id}/product`)

export const insertCategoryService = (data, config = {}) =>
  http.post(baseUrl, data, config)

export const updateCategoryService = (id, data, config = {}) =>
  http.put(`${baseUrl}/${id}`, data, config)

export const removeCategoryProductService = (id) =>
  http.delete(`${baseUrl}/${id}`)
