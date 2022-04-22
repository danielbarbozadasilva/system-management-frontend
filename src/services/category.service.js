import http from '~/config/http'
const baseUrl = '/category'

export const listAllCategoryService = () => http.get(baseUrl)

export const listCategoryByIdService = (id) => http.get(`${baseUrl}/${id}`)

export const insertCategoryService = (data) => http.post(baseUrl, data)

export const updateCategoryService = (id, data) =>
  http.put(`${baseUrl}/${id}`, data)

export const removeCategoryProductService = (id) =>
  http.delete(`${baseUrl}/${id}`)
