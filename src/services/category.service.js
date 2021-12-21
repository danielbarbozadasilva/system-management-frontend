import http from '~/config/http'

const baseUrl = '/category'

export const ServiceSearchAllCategory = () => http.get(baseUrl)

export const ServiceSearchCategoryById = id => http.get(`${baseUrl}/${id}`)

export const ServiceInsertCategory = data => http.post(baseUrl, data)

export const ServiceUpdateCategory = (id, data) =>
  http.put(`${baseUrl}/${id}`, data)

export const ServiceRemoveCategoryProducts = id =>
  http.delete(`${baseUrl}/${id}`)
