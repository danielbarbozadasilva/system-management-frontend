import http from '~/config/http'

export const authService = (data) => http.post('/auth', data)
