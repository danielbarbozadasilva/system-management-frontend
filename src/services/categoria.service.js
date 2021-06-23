import http from '~/config/http'

export const getAllCategories = () => http.get('/categoria')

export const getCategoryById = (id) => http.get(`/categoria/${id}`)

export const updateCategory = (id, data, config = {}) =>
  http.put(`/categoria/${id}`, data, config)

export const removeCategory = (id) => http.delete(`/categoria/${id}`)

export const categoryCreate = (data, config = {}) =>
  http.post('/categoria', data, config)


