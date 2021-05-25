import http from '~/config/http'

export const getAllCategories = () => http.get('/categoria')

export const categoryCreate = (data, config = {}) => http.post('/categoria', data, config)
